import '../numeric-answer.js';

const libraryPrefix = 'גרסה 2 · הספרייה בהפסקה · ';

// Exam pages send prompts as plain text (physics prompts contain <br>). physics-exam.js has the same one-line
// function; physics-exam.parity.test.mjs checks both agree on every prompt.
export const plainText = (html) => String(html).replace(/\s*(?:<br\s*\/?>\s*)+/gi, '\n').replace(/<[^>]*>/g, '').trim();

// Question lists per exam, loaded once; the content never changes without a reseed + restart.
let examQuestions;
async function loadExamQuestions(sql) {
  if (examQuestions) return examQuestions;
  const rows = await sql`SELECT id, exam_id, position, type, prompt, choices, correct FROM questions WHERE exam_id IS NOT NULL ORDER BY exam_id, position`;
  if (rows.length) examQuestions = rows; // never cache an empty (not yet seeded) result
  return rows;
}

// The garden and library payloads carry no exam id, so recognise the exam from the question texts it sent.
// A payload that names its exam (physics) is only matched against that exam's questions.
export function matchExam(rows, answers, onlyExam) {
  const byExam = Map.groupBy(onlyExam ? rows.filter((r) => r.exam_id === onlyExam) : rows, (r) => r.exam_id);
  for (const [examId, questions] of byExam) {
    const lookup = new Map(questions.map((q) => [q.prompt, q]));
    // Also the form sent by the first physics page version (6de9cd8): each <br> -> one space, trimmed.
    for (const q of questions) for (const text of [plainText(q.prompt), q.prompt.replace(/<br\s*\/?>/gi, ' ').trim()]) if (!lookup.has(text)) lookup.set(text, q);
    const matched = answers.map((a) => lookup.get(a.question.startsWith(libraryPrefix) ? a.question.slice(libraryPrefix.length) : a.question));
    if (matched.every(Boolean) && new Set(matched.map((q) => q.id)).size === answers.length) return { examId, matched };
  }
  return { examId: null, matched: answers.map(() => null) };
}

// mcq/truefalse: as before. fill (numeric): computed by the server with numeric-answer.js from the first line of the
// answer (the page puts the number there and the written working below it); the client's `correct` mark is used
// only when the stored question has no numeric key. Written answers stay null (the teacher grades them).
export const autoCorrect = (question, answer, clientCorrect) => {
  if (question && (question.type === 'mcq' || question.type === 'truefalse') && Array.isArray(question.choices)) return question.choices[question.correct] === answer;
  // checkbox: all or nothing. The page sends the selected option texts joined with ' · ' in option order, so the answer is
  // right only when it equals exactly the key's option texts joined the same way (a missing or an extra option differs).
  if (question?.type === 'checkbox') {
    const key = question.correct;
    if (!Array.isArray(question.choices) || !Array.isArray(key) || !key.length || !key.every((i) => Number.isInteger(i) && i >= 0 && i < question.choices.length)) return null;
    return [...new Set(key)].sort((a, b) => a - b).map((i) => question.choices[i]).join(' · ') === answer;
  }
  if (question?.type === 'fill') {
    if (Number.isFinite(question.correct?.value)) return globalThis.NumericAnswer.checkNumber(String(answer).split('\n')[0], question.correct) === true;
    return typeof clientCorrect === 'boolean' ? clientCorrect : null;
  }
  return null;
};

// Stores (or re-counts) a submission before the email is sent. Returns the submission id. `examCode` and `attempt` are
// what the email showed (null for payloads without `exam`); the attempt is part of the dedupe key, so a retake is a new row.
export async function storeSubmission(sql, { key, name, answers, startedAt, finishedAt, examId: namedExam, examCode, attempt }) {
  const { examId, matched } = matchExam(await loadExamQuestions(sql), answers, namedExam);
  return sql.begin(async (tx) => {
    const [row] = await tx`
      INSERT INTO submissions (exam_id, dedupe_key, student_name, started_at, finished_at, exam_code, attempt)
      VALUES (${examId}, ${key}, ${name}, ${startedAt ?? null}, ${finishedAt ?? null}, ${examCode ?? null}, ${attempt ?? null})
      ON CONFLICT (dedupe_key) DO UPDATE SET attempt_count = submissions.attempt_count + 1, last_attempt_at = now()
      RETURNING id, (xmax = 0) AS created`;
    if (row.created) {
      const rows = answers.map((a, i) => ({
        submission_id: row.id, position: i + 1, question_id: matched[i]?.id ?? null,
        question_text: a.question, answer_text: a.answer, auto_correct: autoCorrect(matched[i], a.answer, a.correct)
      }));
      await tx`INSERT INTO submission_answers ${tx(rows)}`;
    }
    return row.id;
  });
}

export async function markEmail(sql, id, { status, resendId = null, httpStatus = null }) {
  // A concurrent retry that Resend rejected must not overwrite an already accepted email.
  await sql`UPDATE submissions SET email_status = ${status}, resend_id = COALESCE(${resendId}, resend_id), email_http_status = ${httpStatus}
    WHERE id = ${id} AND (email_status <> 'accepted' OR ${status} = 'accepted')`;
}

// AI grading result of a submission (docs/TESTING.md §9), found by id or by dedupe key. `scores` keeps the reasons
// ({ [questionId]: { score, max, reason } }); the browser never sees them. A grading that is already 'ok' is never
// overwritten, so a duplicate send or a late retry cannot change it. Returns true when a row was updated.
export async function updateAiScores(sql, { id, key, status, scores, total }) {
  const rows = await sql`
    UPDATE submissions SET ai_status = ${status}, ai_scores = ${scores ? sql.json(scores) : null}, ai_total = ${total ?? null}, ai_updated_at = now()
    WHERE (id = ${id ?? null} OR dedupe_key = ${key ?? null}) AND ai_status IS DISTINCT FROM 'ok'
    RETURNING id`;
  return rows.length > 0;
}

// For the retry of the AI grading: the stored row for a dedupe key with the answers as saved (not as the browser
// claims now). Question ids are the matched ones (null when an answer could not be matched to a question).
export async function getSubmissionForGrading(sql, key) {
  const [row] = await sql`SELECT id, exam_id, ai_status, ai_scores FROM submissions WHERE dedupe_key = ${key}`;
  if (!row) return null;
  const answers = await sql`SELECT position, question_id, question_text, answer_text FROM submission_answers WHERE submission_id = ${row.id} ORDER BY position`;
  return {
    id: row.id, examId: row.exam_id, aiStatus: row.ai_status, aiScores: row.ai_scores,
    answers: answers.map((a) => ({ questionId: a.question_id, question: a.question_text, answer: a.answer_text }))
  };
}

// Teacher history (history-api.mjs). The list carries no answer text; the AI scores keep score and max only.
export async function listSubmissionHistory(sql, { code, name, limit = 50 } = {}) {
  const codeFilter = code ? sql`AND exam_code = ${code}` : sql``;
  const nameFilter = name ? sql`AND lower(student_name) = lower(${name})` : sql``;
  return sql`
    SELECT id, exam_code, attempt, student_name, started_at, finished_at, first_received_at, email_status, ai_status, ai_total, ai_scores
    FROM submissions WHERE true ${codeFilter} ${nameFilter} ORDER BY first_received_at DESC, id DESC LIMIT ${limit}`;
}

// One submission with its answers as saved and the AI score and reason per question.
export async function getSubmissionDetail(sql, id) {
  const [row] = await sql`
    SELECT id, exam_code, attempt, student_name, started_at, finished_at, first_received_at, email_status, ai_status, ai_total, ai_scores
    FROM submissions WHERE id = ${id}`;
  if (!row) return null;
  const answers = await sql`
    SELECT position, question_id, question_text, answer_text, auto_correct FROM submission_answers WHERE submission_id = ${id} ORDER BY position`;
  return { ...row, answers };
}
