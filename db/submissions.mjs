const libraryPrefix = 'גרסה 2 · הספרייה בהפסקה · ';

// Question lists per exam, loaded once; the content never changes without a reseed + restart.
let examQuestions;
async function loadExamQuestions(sql) {
  if (examQuestions) return examQuestions;
  const rows = await sql`SELECT id, exam_id, position, type, prompt, choices, correct FROM questions WHERE exam_id IS NOT NULL ORDER BY exam_id, position`;
  if (rows.length) examQuestions = rows; // never cache an empty (not yet seeded) result
  return rows;
}

// The API payload carries no exam id, so recognise the exam from the question texts it sent.
export function matchExam(rows, answers) {
  const byExam = Map.groupBy(rows, (r) => r.exam_id);
  for (const [examId, questions] of byExam) {
    const lookup = new Map(questions.map((q) => [q.exam_id === 'physics-v1-assessment' ? q.prompt.replace(/<br\s*\/?>/gi, ' ').trim() : q.prompt, q]));
    const matched = answers.map((a) => lookup.get(a.question.startsWith(libraryPrefix) ? a.question.slice(libraryPrefix.length) : a.question));
    if (matched.every(Boolean) && new Set(matched.map((q) => q.id)).size === answers.length) return { examId, matched };
  }
  return { examId: null, matched: answers.map(() => null) };
}

export const autoCorrect = (question, answer) =>
  question && (question.type === 'mcq' || question.type === 'truefalse') && Array.isArray(question.choices)
    ? question.choices[question.correct] === answer
    : null;

// Stores (or re-counts) a submission before the email is sent. Returns the submission id.
export async function storeSubmission(sql, { key, name, answers, startedAt, finishedAt }) {
  const { examId, matched } = matchExam(await loadExamQuestions(sql), answers);
  return sql.begin(async (tx) => {
    const [row] = await tx`
      INSERT INTO submissions (exam_id, dedupe_key, student_name, started_at, finished_at)
      VALUES (${examId}, ${key}, ${name}, ${startedAt ?? null}, ${finishedAt ?? null})
      ON CONFLICT (dedupe_key) DO UPDATE SET attempt_count = submissions.attempt_count + 1, last_attempt_at = now()
      RETURNING id, (xmax = 0) AS created`;
    if (row.created) {
      const rows = answers.map((a, i) => ({
        submission_id: row.id, position: i + 1, question_id: matched[i]?.id ?? null,
        question_text: a.question, answer_text: a.answer, auto_correct: autoCorrect(matched[i], a.answer)
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
