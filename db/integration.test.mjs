import { test } from 'node:test';
import assert from 'node:assert/strict';
import { connect } from './client.mjs';
import { migrate } from './migrate.mjs';
import { seed } from './seed.mjs';
import { verify } from './verify.mjs';
import { extractContent } from './extract.mjs';
import { storeSubmission, markEmail } from './submissions.mjs';
import * as content from './content.mjs';

const url = process.env.TEST_DATABASE_URL;
// This test drops the public schema, so only ever run it against a throwaway database.
if (url && !/test/i.test(new URL(url).pathname)) throw new Error('TEST_DATABASE_URL must point at a database whose name contains "test"');

test('migrate, seed twice, verify, store a submission, read content', { skip: !url && 'TEST_DATABASE_URL not set' }, async () => {
  const sql = await connect(url);
  try {
    await sql`DROP SCHEMA public CASCADE`; await sql`CREATE SCHEMA public`; // test database only
    assert.deepEqual(await migrate(sql), ['001_init.sql', '002_references.sql', '003_practice_results.sql', '004_attempts_codes_ai.sql', '005_checkbox_type.sql']);
    assert.deepEqual(await migrate(sql), []);
    const first = await seed(sql);
    assert.equal(first.questions.inserted, 129);
    assert.equal(first.study_references.inserted, 4);
    const second = await seed(sql);
    assert.ok(Object.values(second).every((r) => r.inserted === 0 && r.updated === 0));
    assert.deepEqual(await verify(sql), []);
    assert.deepEqual((await sql`SELECT id, code FROM exams ORDER BY id`).map((r) => [r.id, r.code]),
      [['hebrew-v1-garden', 'HEB-001'], ['hebrew-v2-library', 'HEB-002'], ['physics-v1-assessment', 'PHY-001']]);
    // a code is unique, and verify reports a changed one
    await assert.rejects(sql`UPDATE exams SET code = 'HEB-001' WHERE id = 'hebrew-v2-library'`);
    await sql`UPDATE exams SET code = 'HEB-009' WHERE id = 'hebrew-v2-library'`;
    assert.deepEqual(await verify(sql), ['exam hebrew-v2-library: code HEB-009 in db, HEB-002 in source']);
    await seed(sql);
    assert.deepEqual(await verify(sql), []);
    // an unapplied shipped migration (stale container / unmigrated db) is reported by verify
    await sql`DELETE FROM schema_migrations WHERE version = '002_references.sql'`;
    assert.ok((await verify(sql)).includes('migration 002_references.sql not applied'));
    await sql`INSERT INTO schema_migrations (version) VALUES ('002_references.sql')`;
    assert.deepEqual(await verify(sql), []);

    const source = extractContent();
    const libraryAnswers = source.questions.filter((q) => q.exam_id === 'hebrew-v2-library').slice(0, 20).map((q, i) => ({
      question: `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`,
      answer: q.type === 'open' ? 'תשובה פתוחה' : q.choices[i % 2 === 0 ? q.correct : (q.correct + 1) % q.choices.length]
    }));
    const key = 'k'.repeat(64);
    const id = await storeSubmission(sql, { key, name: 'בדיקה', answers: libraryAnswers });
    assert.equal(await storeSubmission(sql, { key, name: 'בדיקה', answers: libraryAnswers }), id);
    await markEmail(sql, id, { status: 'accepted', resendId: 'r1', httpStatus: 200 });
    const [sub] = await sql`SELECT exam_id, attempt_count, email_status FROM submissions WHERE id = ${id}`;
    assert.deepEqual({ ...sub }, { exam_id: 'hebrew-v2-library', attempt_count: 2, email_status: 'accepted' });
    const [{ n }] = await sql`SELECT count(*)::int AS n FROM submission_answers WHERE submission_id = ${id}`;
    assert.equal(n, 20);
    const graded = await sql`SELECT auto_correct FROM submission_answers WHERE submission_id = ${id} AND auto_correct IS NOT NULL`;
    assert.ok(graded.length >= 10 && graded.some((r) => r.auto_correct) && graded.some((r) => !r.auto_correct));

    const garden = source.questions.filter((q) => q.exam_id === 'hebrew-v1-garden').map((q) => ({ question: q.prompt, answer: 'תשובה' }));
    const gid = await storeSubmission(sql, { key: 'g'.repeat(64), name: 'גינה', answers: garden });
    assert.equal((await sql`SELECT exam_id FROM submissions WHERE id = ${gid}`)[0].exam_id, 'hebrew-v1-garden');
    const other = await storeSubmission(sql, { key: 'o'.repeat(64), name: 'x', answers: garden.map((a, i) => ({ ...a, question: `שאלה ${i}` })) });
    assert.equal((await sql`SELECT exam_id FROM submissions WHERE id = ${other}`)[0].exam_id, null);

    // a concurrent retry rejected by Resend must not downgrade an accepted email
    await markEmail(sql, id, { status: 'failed', httpStatus: 409 });
    assert.deepEqual({ ...(await sql`SELECT email_status, resend_id FROM submissions WHERE id = ${id}`)[0] }, { email_status: 'accepted', resend_id: 'r1' });

    // the content version changes when only non-question content changes
    const before = await content.contentVersion(sql);
    await sql`UPDATE exams SET detail = detail || ' ' WHERE id = 'hebrew-v1-garden'`;
    assert.notEqual(await content.contentVersion(sql), before);
    await seed(sql);
    assert.equal(await content.contentVersion(sql), before);

    const quiz = await content.getQuiz(sql, 'physics-pole');
    assert.equal(quiz.questions.length, 11);
    const exam = await content.getExam(sql, 'hebrew-v2-library');
    assert.equal(exam.questions.length, 20);
    assert.ok(exam.passage_html.includes('<p>'));
    assert.deepEqual((await content.getSubject(sql, 'hebrew')).exams.map((e) => e.id), ['hebrew-v1-garden', 'hebrew-v2-library']);
    assert.match(await content.contentVersion(sql), /^[0-9a-f]{32}$/);

    // references: every question points at an existing reference (FK) and the API returns them
    const [{ missing }] = await sql`SELECT count(*)::int AS missing FROM questions WHERE reference_id IS NULL`;
    assert.equal(missing, 0);
    const physics = await content.getExam(sql, 'physics-v1-assessment');
    assert.equal(physics.questions.length, 27);
    assert.deepEqual(physics.references.map((r) => r.id), ['physics-pdf', 'physics-site']);
    assert.equal(physics.references[0].parts.length, 6);
    assert.deepEqual(physics.questions[11].correct, { value: 325, tolerance: 1e-8, unit: 'ס״מ' });
    assert.deepEqual(physics.questions[16].ref, { id: 'physics-pdf', part: 'עמוד 4' });
    assert.deepEqual(quiz.references.map((r) => r.id), ['physics-pdf']);
    assert.deepEqual(quiz.questions[0].ref, { id: 'physics-pdf', part: 'עמוד 5' });
    assert.deepEqual((await content.getSubject(sql, 'physics')).exams.map((e) => [e.id, e.references.map((r) => r.id)]),
      [['physics-v1-assessment', ['physics-pdf', 'physics-site']]]);
    // a reference change is detected by verify and the content version, and the reseed restores it
    await sql`UPDATE study_references SET title = title || ' ' WHERE id = 'physics-pdf'`;
    assert.deepEqual(await verify(sql), ['reference physics-pdf differs from source']);
    assert.notEqual(await content.contentVersion(sql), before);
    await seed(sql);
    assert.deepEqual(await verify(sql), []);
    // the migration on a database that already has 001 is additive: a dangling reference is refused by the FK
    await assert.rejects(sql`UPDATE questions SET reference_id = 'nope' WHERE id = 'garden-01'`);
  } finally { await sql.end(); }
});

// Runs after the test above (same file, sequential), on the migrated and seeded test database.
test('a physics submission is stored with its exam id, question links and server-side numeric grading', { skip: !url && 'TEST_DATABASE_URL not set' }, async () => {
  const { plainText } = await import('./submissions.mjs');
  const sql = await connect(url);
  try {
    const physics = extractContent().questions.filter((q) => q.exam_id === 'physics-v1-assessment');
    const answers = physics.map((q, i) => ({
      question: plainText(q.prompt),
      answer: q.type === 'mcq' ? q.choices[q.correct] : q.type === 'fill' ? `${i % 2 ? q.correct.value : q.correct.value + 1}\nדרך חישוב: x` : 'הסבר',
      ...(q.type === 'open' ? {} : { correct: true }) // the client claims all correct: the server must not trust it for numbers
    }));
    const id = await storeSubmission(sql, { key: 'p'.repeat(64), name: 'פיזיקה', answers, examId: 'physics-v1-assessment' });
    assert.equal((await sql`SELECT exam_id FROM submissions WHERE id = ${id}`)[0].exam_id, 'physics-v1-assessment');
    const rows = await sql`SELECT a.question_id, q.type, a.auto_correct, a.position FROM submission_answers a LEFT JOIN questions q ON q.id = a.question_id
      WHERE a.submission_id = ${id} ORDER BY a.position`;
    assert.equal(rows.length, 27);
    assert.deepEqual(rows.map((r) => r.question_id), physics.map((q) => q.id));
    assert.ok(rows.filter((r) => r.type === 'mcq').every((r) => r.auto_correct === true));
    assert.ok(rows.filter((r) => r.type === 'open').every((r) => r.auto_correct === null));
    assert.deepEqual(rows.filter((r) => r.type === 'fill').map((r) => r.auto_correct), rows.filter((r) => r.type === 'fill').map((r) => (r.position - 1) % 2 === 1));
  } finally { await sql.end(); }
});

// Same file so it runs after the migration test, on the migrated test database (files run in parallel and share one schema).
test('practice results are stored under the name with their answers and read back newest first', { skip: !url && 'TEST_DATABASE_URL not set' }, async () => {
  const { storePracticeResult, listPracticeResults } = await import('./practice.mjs');
  const sql = await connect(url);
  try {
    const answers = (right) => Array.from({ length: 6 }, (_, i) => ({ questionId: `facts-0${i + 1}`, choice: i % 2, correct: i < right }));
    const first = await storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'דנה כהן', score: 50, stars: 1, answers: answers(3) });
    const second = await storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'דנה כהן', score: 100, stars: 3, answers: answers(6) });
    await storePracticeResult(sql, { quizId: 'physics-pole', quizCode: 'PRA-007', name: 'אחר', score: 0, stars: 0, answers: answers(0) });
    assert.ok(second > first);
    const history = await listPracticeResults(sql, ' דנה כהן ');
    assert.deepEqual(history.map((r) => [r.quiz_code, r.score, r.stars]), [['PRA-001', 100, 3], ['PRA-001', 50, 1]]);
    assert.equal(history[1].answers.length, 6);
    assert.deepEqual(history[1].answers.map((a) => a.correct), [true, true, true, false, false, false]);
    assert.deepEqual(history[0].answers[0], { questionId: 'facts-01', choice: 0, correct: true });
    assert.equal((await listPracticeResults(sql, 'לא קיים')).length, 0);
    // the schema refuses an out-of-range score, and a failed insert leaves no half-written round behind
    await assert.rejects(storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'x', score: 101, stars: 0, answers: answers(0) }));
    await assert.rejects(storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'x', score: 0, stars: 0, answers: [{ questionId: 'facts-01', choice: null, correct: true }] }));
    assert.equal((await listPracticeResults(sql, 'x')).length, 0);
  } finally { await sql.end(); }
});

// Same file, after the tests above (migrated and seeded database).
test('exam code, attempt and AI grading are stored; a retake is a new row; an ok grading is never overwritten', { skip: !url && 'TEST_DATABASE_URL not set' }, async () => {
  const { updateAiScores, getSubmissionForGrading } = await import('./submissions.mjs');
  const sql = await connect(url);
  try {
    const library = extractContent().questions.filter((q) => q.exam_id === 'hebrew-v2-library');
    const answers = library.map((q) => ({
      question: `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`, answer: q.type === 'open' ? `פתוחה ${q.id}` : q.choices[q.correct]
    }));
    const base = { name: 'ניסיונות', answers, examId: 'hebrew-v2-library', examCode: 'HEB-002' };
    const first = await storeSubmission(sql, { ...base, key: '1'.repeat(64), attempt: 1 });
    const retake = await storeSubmission(sql, { ...base, key: '2'.repeat(64), attempt: 2 });
    assert.notEqual(first, retake);
    const rows = await sql`SELECT id, exam_code, attempt, ai_status, ai_scores, ai_total FROM submissions WHERE student_name = 'ניסיונות' ORDER BY id`;
    assert.deepEqual(rows.map((r) => [r.exam_code, r.attempt, r.ai_status, r.ai_scores, r.ai_total]), [['HEB-002', 1, null, null, null], ['HEB-002', 2, null, null, null]]);
    // payloads without an exam keep NULL code and attempt
    const legacy = await storeSubmission(sql, { key: '3'.repeat(64), name: 'ישן', answers: answers.map((a, i) => ({ ...a, question: `שאלה ${i}` })) });
    assert.deepEqual({ ...(await sql`SELECT exam_code, attempt FROM submissions WHERE id = ${legacy}`)[0] }, { exam_code: null, attempt: null });

    // the stored answers come back with their question ids; the open ones are the ones the rubrics know
    const stored = await getSubmissionForGrading(sql, '1'.repeat(64));
    assert.deepEqual([stored.id, stored.examId, stored.aiStatus, stored.answers.length], [first, 'hebrew-v2-library', null, 20]);
    assert.deepEqual(stored.answers.map((a) => a.questionId), library.map((q) => q.id));
    assert.equal(stored.answers[14].answer, 'פתוחה library-15');
    assert.equal(await getSubmissionForGrading(sql, '9'.repeat(64)), null);

    assert.equal(await updateAiScores(sql, { id: first, status: 'failed' }), true);
    assert.deepEqual({ ...(await sql`SELECT ai_status, ai_scores, ai_total FROM submissions WHERE id = ${first}`)[0] }, { ai_status: 'failed', ai_scores: null, ai_total: null });
    const scores = { 'library-15': { score: 5.36, max: 5.36, reason: 'טוב' }, 'library-16': { score: 2.5, max: 5.36, reason: 'חלקי' } };
    assert.equal(await updateAiScores(sql, { key: '1'.repeat(64), status: 'ok', scores, total: 7.86 }), true);
    const [graded] = await sql`SELECT ai_status, ai_scores, ai_total, ai_updated_at FROM submissions WHERE id = ${first}`;
    assert.deepEqual([graded.ai_status, graded.ai_scores, Number(graded.ai_total)], ['ok', scores, 7.86]);
    assert.ok(graded.ai_updated_at);
    // a later failure or second grading cannot replace an ok grading, and the other attempt is untouched
    assert.equal(await updateAiScores(sql, { id: first, status: 'failed' }), false);
    assert.equal(await updateAiScores(sql, { id: first, status: 'ok', scores: {}, total: 0 }), false);
    assert.deepEqual((await getSubmissionForGrading(sql, '1'.repeat(64))).aiScores, scores);
    assert.equal((await getSubmissionForGrading(sql, '2'.repeat(64))).aiStatus, null);
    assert.equal(await updateAiScores(sql, { id: 999999999, status: 'ok', scores: {}, total: 0 }), false);
    await assert.rejects(updateAiScores(sql, { id: retake, status: 'maybe' }));
  } finally { await sql.end(); }
});

// Same file, after the tests above (migrated database); the transaction is rolled back.
test('migration 005: a checkbox question can be stored, an invalid type still fails', { skip: !url && 'TEST_DATABASE_URL not set' }, async () => {
  const sql = await connect(url);
  try {
    const [{ def }] = await sql`SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conname = 'questions_type_check'`;
    assert.match(def, /checkbox/);
    const rollback = new Error('rollback');
    await assert.rejects(sql.begin(async (tx) => {
      await tx`INSERT INTO subjects (id, title, description, sort_order) VALUES ('zz-cbx', 't', 'd', 99)`;
      await tx`INSERT INTO exams (id, subject_id, title, detail, href, question_count, sort_order) VALUES ('zz-cbx-exam', 'zz-cbx', 't', 'd', 'x.html', 1, 99)`;
      await tx`INSERT INTO questions (id, exam_id, position, type, prompt, source_hash) VALUES ('zz-cbx-1', 'zz-cbx-exam', 1, 'checkbox', 'p', 'h')`;
      await assert.rejects(
        tx.savepoint((s) => s`INSERT INTO questions (id, exam_id, position, type, prompt, source_hash) VALUES ('zz-cbx-2', 'zz-cbx-exam', 2, 'bogus', 'p', 'h')`),
        (e) => e.code === '23514'
      );
      throw rollback;
    }), (e) => e === rollback);
  } finally { await sql.end(); }
});
