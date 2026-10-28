const question = (q) => ({
  id: q.id, position: q.position, type: q.type, topic: q.topic, difficulty: q.difficulty, prompt: q.prompt,
  choices: q.choices, correct: q.correct, explanation: { he: q.explanation_he, en: q.explanation_en }
});

const withQuestions = async (sql, column, id) =>
  (await sql`SELECT * FROM questions WHERE ${sql(column)} = ${id} ORDER BY position`).map(question);

export async function listSubjects(sql) {
  return sql`SELECT id, title, description, art_path FROM subjects ORDER BY sort_order`;
}

export async function getSubject(sql, id) {
  const [subject] = await sql`SELECT id, title, description, art_path FROM subjects WHERE id = ${id}`;
  if (!subject) return null;
  const exams = await sql`SELECT id, title, detail, date_label, href, question_count FROM exams WHERE subject_id = ${id} ORDER BY sort_order`;
  const quizzes = await sql`SELECT id, exam_id, title, description, list_title, list_detail FROM quizzes WHERE subject_id = ${id} ORDER BY sort_order`;
  return { ...subject, exams, quizzes };
}

export async function getQuiz(sql, id) {
  const [quiz] = await sql`SELECT id, subject_id, exam_id, title, description FROM quizzes WHERE id = ${id}`;
  return quiz ? { ...quiz, questions: await withQuestions(sql, 'quiz_id', id) } : null;
}

export async function getExam(sql, id) {
  const [exam] = await sql`SELECT e.id, e.subject_id, e.title, e.detail, e.date_label, e.href, e.question_count,
      p.title AS passage_title, p.body_html AS passage_html
    FROM exams e LEFT JOIN passages p ON p.id = e.passage_id WHERE e.id = ${id}`;
  return exam ? { ...exam, questions: await withQuestions(sql, 'exam_id', id) } : null;
}

// Changes whenever any seeded content changes; used as the ETag.
export async function contentVersion(sql) {
  const [{ version }] = await sql`SELECT md5(concat_ws('|',
    (SELECT string_agg(t::text, ',' ORDER BY id) FROM subjects t),
    (SELECT string_agg(t::text, ',' ORDER BY id) FROM passages t),
    (SELECT string_agg(t::text, ',' ORDER BY id) FROM exams t),
    (SELECT string_agg(t::text, ',' ORDER BY id) FROM quizzes t),
    (SELECT string_agg(id || source_hash, ',' ORDER BY id) FROM questions))) AS version`;
  return version;
}
