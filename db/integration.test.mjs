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
    assert.deepEqual(await migrate(sql), ['001_init.sql', '002_references.sql']);
    assert.deepEqual(await migrate(sql), []);
    const first = await seed(sql);
    assert.equal(first.questions.inserted, 129);
    assert.equal(first.study_references.inserted, 4);
    const second = await seed(sql);
    assert.ok(Object.values(second).every((r) => r.inserted === 0 && r.updated === 0));
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
