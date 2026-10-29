// Practice history. The answers are the student's first attempt at each question of one full round.
export async function storePracticeResult(sql, { quizId, quizCode, name, score, stars, answers }) {
  return sql.begin(async (tx) => {
    const [row] = await tx`
      INSERT INTO practice_results (quiz_id, quiz_code, student_name, score, stars)
      VALUES (${quizId}, ${quizCode}, ${name}, ${score}, ${stars})
      RETURNING id`;
    const rows = answers.map((a, i) => ({ result_id: row.id, position: i + 1, question_id: a.questionId, choice: a.choice, correct: a.correct }));
    await tx`INSERT INTO practice_result_answers ${tx(rows)}`;
    return row.id;
  });
}

// Newest first; the name match ignores case and surrounding spaces. Not exposed over HTTP.
export async function listPracticeResults(sql, name, limit = 100) {
  return sql`
    SELECT r.id, r.quiz_id, r.quiz_code, r.student_name, r.score, r.stars, r.created_at,
      COALESCE(json_agg(json_build_object('questionId', a.question_id, 'choice', a.choice, 'correct', a.correct) ORDER BY a.position)
        FILTER (WHERE a.result_id IS NOT NULL), '[]') AS answers
    FROM practice_results r LEFT JOIN practice_result_answers a ON a.result_id = r.id
    WHERE lower(r.student_name) = lower(${String(name).trim()})
    GROUP BY r.id ORDER BY r.created_at DESC, r.id DESC LIMIT ${limit}`;
}

// Teacher history (history-api.mjs): newest first, optional name (case-insensitive) and quiz (id or code) filters, with
// no per-question answers. `best` is the highest score per name and quiz over all matching rows, not only the page.
export async function listPracticeHistory(sql, { name, quiz, limit = 100 } = {}) {
  const nameFilter = name ? sql`AND lower(student_name) = lower(${name})` : sql``;
  const quizFilter = quiz ? sql`AND (quiz_id = ${quiz} OR quiz_code = ${quiz})` : sql``;
  const rows = await sql`
    SELECT id, quiz_id, quiz_code, student_name, score, stars, created_at FROM practice_results
    WHERE true ${nameFilter} ${quizFilter} ORDER BY created_at DESC, id DESC LIMIT ${limit}`;
  const best = await sql`
    SELECT min(student_name) AS student_name, quiz_id, quiz_code, max(score) AS score, count(*)::int AS rounds FROM practice_results
    WHERE true ${nameFilter} ${quizFilter} GROUP BY lower(student_name), quiz_id, quiz_code ORDER BY min(student_name), quiz_code`;
  return { rows, best };
}
