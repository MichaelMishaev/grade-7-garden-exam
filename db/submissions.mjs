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
  if (question?.type === 'fill') {
    if (Number.isFinite(question.correct?.value)) return globalThis.NumericAnswer.checkNumber(String(answer).split('\n')[0], question.correct) === true;
    return typeof clientCorrect === 'boolean' ? clientCorrect : null;
  }
  return null;
};

// Stores (or re-counts) a submission before the email is sent. Returns the submission id.
export async function storeSubmission(sql, { key, name, answers, startedAt, finishedAt, examId: namedExam }) {
  const { examId, matched } = matchExam(await loadExamQuestions(sql), answers, namedExam);
  return sql.begin(async (tx) => {
    const [row] = await tx`
      INSERT INTO submissions (exam_id, dedupe_key, student_name, started_at, finished_at)
      VALUES (${examId}, ${key}, ${name}, ${startedAt ?? null}, ${finishedAt ?? null})
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
