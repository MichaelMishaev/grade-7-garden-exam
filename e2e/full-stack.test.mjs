// Full-stack e2e: real Postgres, real HTTP, Resend replaced by a fake fetch. Skipped unless E2E_DATABASE_URL is set.
// WARNING: resets the public schema of E2E_DATABASE_URL, so point it at a throwaway database only.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { connect } from '../db/client.mjs';
import { migrate } from '../db/migrate.mjs';
import { seed } from '../db/seed.mjs';
import { extractContent } from '../db/extract.mjs';
import { createDb } from '../db/runtime.mjs';
import { createApp } from '../server.mjs';

const url = process.env.E2E_DATABASE_URL;
const skip = !url && 'E2E_DATABASE_URL not set';
const source = extractContent();
const resendCalls = [];
let sql, server, dbOn, base, baseOff, serverOff;

const fakeSend = async (endpoint, init) => {
  resendCalls.push({ endpoint, init });
  return new Response(JSON.stringify({ id: `fake-resend-${resendCalls.length}` }), { status: 200, headers: { 'content-type': 'application/json' } });
};
const listen = (app) => new Promise((ok) => { const s = app.listen(0, '127.0.0.1', () => ok(s)); });
const urlOf = (s) => `http://127.0.0.1:${s.address().port}`;
const post = (b, body) => fetch(`${b}/api/submit-exam`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' }, body: JSON.stringify(body)
});
const getJson = async (path) => { const r = await fetch(base + path); assert.equal(r.status, 200, path); return r.json(); };
const eventually = async (fn, ms = 3000) => {
  const end = Date.now() + ms; let last;
  while (Date.now() < end) { last = await fn(); if (last) return last; await new Promise((r) => setTimeout(r, 50)); }
  return last;
};

const libraryRows = source.questions.filter((q) => q.exam_id === 'hebrew-v2-library');
const gardenRows = source.questions.filter((q) => q.exam_id === 'hebrew-v1-garden');
const gardenPayload = (name) => ({ name, answers: gardenRows.map((q, i) => ({ question: q.prompt, answer: `תשובה ${i + 1}` })) });
const libraryPayload = (name) => ({
  name, answers: libraryRows.slice(0, 20).map((q, i) => ({
    question: `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`,
    answer: q.type === 'open' ? 'תשובה פתוחה' : q.choices[q.correct]
  }))
});
const rowFor = async (name) => (await sql`SELECT * FROM submissions WHERE student_name = ${name}`);

before(async () => {
  if (skip) return;
  sql = await connect(url);
  // This drops the public schema, so only ever run it against a throwaway database.
  if (!/test|e2e/i.test(new URL(process.env.E2E_DATABASE_URL).pathname)) throw new Error('E2E_DATABASE_URL database name must contain "test" or "e2e"');
  await sql`DROP SCHEMA public CASCADE`; await sql`CREATE SCHEMA public`; // throwaway e2e database only
  await migrate(sql);
  await seed(sql);
  const env = { DATABASE_URL: url, DB_WRITE_SUBMISSIONS: '1', DB_READ_API: '1', NODE_ENV: 'development', RESEND_API_KEY: 're_fake', RESEND_FROM_EMAIL: 'x <x@example.invalid>' };
  server = await listen(createApp({ env, sendFetch: fakeSend, db: createDb(env) }));
  base = urlOf(server);
  const envOff = { ...env, DB_WRITE_SUBMISSIONS: '0', DB_READ_API: '0' };
  serverOff = await listen(createApp({ env: envOff, sendFetch: fakeSend, db: createDb(envOff) }));
  baseOff = urlOf(serverOff);
});

after(async () => {
  server?.close(); serverOff?.close(); server?.closeAllConnections?.(); serverOff?.closeAllConnections?.();
  await sql?.end();
  // the app's own pooled connection is unref-free; force exit so node --test does not hang
  setTimeout(() => process.exit(process.exitCode ?? 0), 200).unref();
});

test('health reports db up', { skip }, async () => {
  assert.deepEqual(await getJson('/api/health'), { ok: true, db: 'up' });
});

test('read API matches extracted content', { skip }, async () => {
  const subjects = await getJson('/api/subjects');
  assert.equal(subjects.length, source.subjects.length);
  const facts = await getJson('/api/quizzes/facts');
  assert.equal(facts.questions.length, source.questions.filter((q) => q.quiz_id === 'facts').length);
  const exam = await getJson('/api/exams/hebrew-v2-library');
  assert.equal(exam.questions.length, libraryRows.length);
  assert.equal(exam.questions.length, 20);
  assert.ok(exam.passage_html.includes('<p>'));
  const hebrew = await getJson('/api/subjects/hebrew');
  assert.equal(hebrew.exams.length, source.exams.filter((e) => e.subject_id === 'hebrew').length);
  assert.equal(hebrew.quizzes.length, source.quizzes.filter((q) => q.subject_id === 'hebrew').length);
  assert.equal((await fetch(`${base}/api/quizzes/nope`)).status, 404);
  const physics = await getJson('/api/exams/physics-v1-assessment');
  assert.equal(physics.questions.length, 27);
  assert.deepEqual(physics.references.map((r) => [r.id, r.kind, r.attribution]), [['physics-pdf', 'pdf', 'שרית שרת'], ['physics-site', 'site', 'שרית שרת']]);
  assert.ok(physics.questions.every((q) => q.ref && physics.references.some((r) => r.id === q.ref.id && r.parts.some((p) => p.part === q.ref.part))));
  const subject = await getJson('/api/subjects/physics');
  assert.deepEqual(subject.exams.map((e) => e.id), ['physics-v1-assessment']);
  assert.equal(subject.exams[0].date_label, '2.11');
  assert.ok((await getJson('/api/exams/hebrew-v1-garden')).questions.every((q) => q.ref?.id === 'garden-passage'));
});

test('garden submission is stored, graded-by-shape, emailed, and deduplicated', { skip }, async () => {
  const body = gardenPayload('תלמיד גינה');
  assert.equal((await post(base, body)).status, 200);
  const [row] = await rowFor('תלמיד גינה');
  assert.equal(row.exam_id, 'hebrew-v1-garden');
  const done = await eventually(async () => (await rowFor('תלמיד גינה'))[0].email_status === 'accepted' && (await rowFor('תלמיד גינה'))[0]);
  assert.ok(done, 'email_status should become accepted');
  assert.match(done.resend_id, /^fake-resend-\d+$/);
  const [{ n }] = await sql`SELECT count(*)::int AS n FROM submission_answers WHERE submission_id = ${row.id}`;
  assert.equal(n, 20);
  assert.equal(resendCalls.at(-1).endpoint, 'https://api.resend.com/emails');

  assert.equal((await post(base, body)).status, 200);
  const rows = await eventually(async () => { const r = await rowFor('תלמיד גינה'); return r[0].attempt_count === 2 && r; });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].attempt_count, 2);
  const [{ n: n2 }] = await sql`SELECT count(*)::int AS n FROM submission_answers WHERE submission_id = ${row.id}`;
  assert.equal(n2, 20);
});

test('library submission is stored with exam id and 20 answers', { skip }, async () => {
  assert.equal((await post(base, libraryPayload('תלמידת ספרייה'))).status, 200);
  const rows = await rowFor('תלמידת ספרייה');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].exam_id, 'hebrew-v2-library');
  const done = await eventually(async () => (await rowFor('תלמידת ספרייה'))[0].email_status === 'accepted');
  assert.ok(done);
  const [{ n }] = await sql`SELECT count(*)::int AS n FROM submission_answers WHERE submission_id = ${rows[0].id}`;
  assert.equal(n, 20);
  const [{ linked }] = await sql`SELECT count(question_id)::int AS linked FROM submission_answers WHERE submission_id = ${rows[0].id}`;
  assert.equal(linked, 20);
  assert.equal((await post(base, libraryPayload('תלמידת ספרייה'))).status, 200);
  const again = await eventually(async () => { const r = await rowFor('תלמידת ספרייה'); return r[0].attempt_count === 2 && r; });
  assert.equal(again.length, 1);
});

test('unknown questions store with NULL exam_id', { skip }, async () => {
  const body = { name: 'לא מוכר', answers: Array.from({ length: 20 }, (_, i) => ({ question: `שאלה לא מוכרת ${i}`, answer: 'א' })) };
  assert.equal((await post(base, body)).status, 200);
  const rows = await rowFor('לא מוכר');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].exam_id, null);
});

test('static pages are still served', { skip }, async () => {
  for (const path of ['/', '/practice.html', '/physics-exam.html']) {
    const r = await fetch(base + path);
    assert.equal(r.status, 200, path);
    assert.match(r.headers.get('content-type'), /text\/html/);
  }
  const pdf = await fetch(`${base}/assets/materials/physics-measurements-grade-7.pdf`, { method: 'HEAD' });
  assert.equal(pdf.status, 200);
  assert.equal(pdf.headers.get('content-type'), 'application/pdf');
  assert.equal((await fetch(`${base}/test-fixtures/sarit-physics7-sections.json`)).status, 404, 'the test fixture is not served');
});

test('with db flags off nothing is written and the API is absent', { skip }, async () => {
  const before = (await sql`SELECT count(*)::int AS n FROM submissions`)[0].n;
  const calls = resendCalls.length;
  assert.equal((await post(baseOff, gardenPayload('דגלים כבויים'))).status, 200);
  assert.equal(resendCalls.length, calls + 1, 'email still sent');
  assert.equal((await sql`SELECT count(*)::int AS n FROM submissions`)[0].n, before);
  assert.equal((await rowFor('דגלים כבויים')).length, 0);
  assert.equal((await fetch(`${baseOff}/api/health`)).status, 404);
  assert.equal((await fetch(`${baseOff}/api/subjects`)).status, 404);
});

test('physics submission (exam field, 27 answers) is emailed with its own subject and stored with its exam id', { skip }, async () => {
  const { plainText } = await import('../db/submissions.mjs');
  const physicsRows = source.questions.filter((q) => q.exam_id === 'physics-v1-assessment');
  const body = {
    exam: 'physics-v1-assessment', name: 'תלמידת פיזיקה',
    answers: physicsRows.map((q) => ({ question: plainText(q.prompt), answer: q.type === 'mcq' ? q.choices[q.correct] : q.type === 'fill' ? String(q.correct.value) : 'הסבר', ...(q.type === 'open' ? {} : { correct: true }) }))
  };
  const calls = resendCalls.length;
  assert.equal((await post(base, body)).status, 200);
  assert.equal(resendCalls.length, calls + 1);
  const sent = JSON.parse(resendCalls.at(-1).init.body);
  assert.equal(sent.subject, 'תשובות למשימת הערכה במדידות - פיזיקה - כיתה ז׳ · PHY-001');
  assert.match(resendCalls.at(-1).init.headers['Idempotency-Key'], /^physics-exam\//);
  const rows = await rowFor('תלמידת פיזיקה');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].exam_id, 'physics-v1-assessment');
  assert.ok(await eventually(async () => (await rowFor('תלמידת פיזיקה'))[0].email_status === 'accepted'));
  const [{ n, linked, graded }] = await sql`SELECT count(*)::int AS n, count(question_id)::int AS linked, count(*) FILTER (WHERE auto_correct)::int AS graded
    FROM submission_answers WHERE submission_id = ${rows[0].id}`;
  assert.deepEqual({ n, linked, graded }, { n: 27, linked: 27, graded: 20 });
  assert.equal((await post(base, { ...body, answers: body.answers.slice(1) })).status, 400);
});

test('library attempt: code and attempt are stored, a failed AI grading is retried from the STORED answers and saved', { skip }, async () => {
  const { plainText } = await import('../db/submissions.mjs');
  let aiWorks = false;
  const seen = [];
  const aiFetch = async (endpoint, init) => {
    if (!aiWorks) return new Response('{}', { status: 500 });
    const document = JSON.parse(JSON.parse(init.body).messages[1].content.split('\n').slice(1).join('\n'));
    seen.push(document.questions.map((q) => q.studentAnswer));
    const results = document.questions.map((q) => ({ questionId: q.questionId, score: q.maxScore, reason: 'טוב' }));
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ results }) } }] }), { status: 200 });
  };
  const env = { DATABASE_URL: url, DB_WRITE_SUBMISSIONS: '1', NODE_ENV: 'development', RESEND_API_KEY: 're_fake', RESEND_FROM_EMAIL: 'x <x@example.invalid>', OPENAI_API_KEY: 'sk-fake' };
  const app = await listen(createApp({ env, sendFetch: fakeSend, aiFetch, db: createDb(env) }));
  try {
    const body = (attempt) => ({
      exam: 'hebrew-v2-library', name: 'תלמידת ניסיונות', attempt,
      answers: libraryRows.map((q) => ({ questionId: q.id, question: plainText(q.prompt), answer: q.type === 'open' ? `תשובה שמורה ${q.id}` : q.choices[q.correct], ...(q.type === 'open' ? {} : { correct: true }) }))
    });
    const first = await (await post(urlOf(app), body(1))).json();
    assert.match(first.submissionRef, /^[0-9a-f]{64}$/);
    assert.equal(first.grading.status, 'failed');
    const row = () => sql`SELECT * FROM submissions WHERE dedupe_key = ${first.submissionRef}`.then((r) => r[0]);
    const failed = await eventually(async () => (await row())?.ai_status === 'failed' && row());
    assert.deepEqual([failed.exam_code, failed.attempt, failed.ai_scores], ['HEB-002', 1, null]);
    // the same answers as attempt 2 are a new row
    assert.notEqual((await (await post(urlOf(app), body(2))).json()).submissionRef, first.submissionRef);
    assert.equal((await rowFor('תלמידת ניסיונות')).length, 2);

    // retry: the browser sends different text, the stored one is graded and saved, and no new email goes out
    aiWorks = true;
    const emails = resendCalls.length;
    const openIds = libraryRows.filter((q) => q.type === 'open').map((q) => q.id);
    const retry = await fetch(`${urlOf(app)}/api/grade-open`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' },
      body: JSON.stringify({ exam: 'hebrew-v2-library', submissionRef: first.submissionRef, answers: openIds.map((id) => ({ questionId: id, question: 'ש', answer: 'טקסט מזויף' })) })
    });
    assert.equal(retry.status, 200);
    const graded = (await retry.json()).grading;
    assert.equal(graded.status, 'ok');
    assert.deepEqual(Object.keys(graded.scores).sort(), [...openIds].sort());
    assert.ok(seen[0].every((text) => text.startsWith('תשובה שמורה ')));
    const saved = await eventually(async () => (await row()).ai_status === 'ok' && row());
    assert.deepEqual(Object.keys(saved.ai_scores).sort(), [...openIds].sort());
    assert.equal(saved.ai_scores[openIds[0]].reason, 'טוב');
    assert.equal(Number(saved.ai_total), Math.round(Object.values(saved.ai_scores).reduce((sum, s) => sum + s.score, 0) * 100) / 100);
    assert.equal(resendCalls.length, emails);
  } finally { app.close(); app.closeAllConnections?.(); }
});
