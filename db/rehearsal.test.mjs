import { test } from 'node:test';
import assert from 'node:assert/strict';
import { connect } from './client.mjs';
import { migrate } from './migrate.mjs';
import { seed } from './seed.mjs';
import { verify } from './verify.mjs';
import * as submissions from './submissions.mjs';
import * as practice from './practice.mjs';
import * as content from './content.mjs';
import { createApp } from '../server.mjs';

// Real-Postgres check of every teacher/history read function and the teacher endpoints. Runs in its own throwaway
// schema (search_path), so it cannot collide with the other database tests that reset `public`.
const url = process.env.TEST_DATABASE_URL;
const schema = `rh_${process.pid}_${Date.now()}`;
const TOKEN = 'teacher-token-for-rehearsal-0123456789abcdef';
const INJECTIONS = ["'; DROP TABLE practice_results;--", "x' OR '1'='1", '%', '_', '%%', '\\', 'a\\', '"; select 1;--', '₪', 'דנה%'];

const quizAnswers = (n, correctCount) => Array.from({ length: n }, (_, i) => ({ questionId: `facts-${String(i + 1).padStart(2, '0')}`, choice: i % 4, correct: i < correctCount }));
const examAnswers = (n, tag) => Array.from({ length: n }, (_, i) => ({ question: `שאלה ${i + 1} ${tag}`, answer: `תשובה ${i + 1} ${tag}` }));

test('history reads, AI score updates and teacher endpoints on a real database', { skip: !url && 'TEST_DATABASE_URL not set' }, async (t) => {
  const admin = await connect(url);
  await admin.unsafe(`CREATE SCHEMA ${schema}`);
  const sql = await connect(url, { connection: { search_path: schema } });
  const logs = [];
  const realError = console.error;
  console.error = (...a) => logs.push(a.map(String).join(' '));
  t.after(async () => {
    console.error = realError;
    await sql.end();
    await admin.unsafe(`DROP SCHEMA ${schema} CASCADE`); // only the schema this test created
    await admin.end();
  });

  await migrate(sql);
  await seed(sql);
  assert.deepEqual(await verify(sql), []);

  const db = {
    flags: { write: true, read: true },
    health: async () => true,
    storeSubmission: (a) => submissions.storeSubmission(sql, a),
    markEmail: (...a) => submissions.markEmail(sql, ...a),
    updateAiScores: (a) => submissions.updateAiScores(sql, a),
    getSubmissionForGrading: (k) => submissions.getSubmissionForGrading(sql, k),
    storePracticeResult: (a) => practice.storePracticeResult(sql, a),
    listPracticeResults: (...a) => practice.listPracticeResults(sql, ...a),
    listPracticeHistory: (a) => practice.listPracticeHistory(sql, a),
    listSubmissionHistory: (a) => submissions.listSubmissionHistory(sql, a),
    getSubmissionDetail: (id) => submissions.getSubmissionDetail(sql, id),
    listSubjects: (...a) => content.listSubjects(sql, ...a), getSubject: (...a) => content.getSubject(sql, ...a),
    getQuiz: (...a) => content.getQuiz(sql, ...a), getExam: (...a) => content.getExam(sql, ...a), contentVersion: () => content.contentVersion(sql)
  };

  await t.test('empty database: every read returns an empty result, never throws', async () => {
    for (const args of [[{}], []]) {
      const e = await practice.listPracticeHistory(sql, ...args);
      assert.equal(e.rows.length + e.best.length, 0);
    }
    assert.deepEqual([...(await practice.listPracticeResults(sql, 'מישהו'))], []);
    assert.deepEqual([...(await submissions.listSubmissionHistory(sql, {}))], []);
    assert.equal(await submissions.getSubmissionDetail(sql, '1'), null);
    assert.equal(await submissions.getSubmissionForGrading(sql, 'a'.repeat(64)), null);
    assert.equal(await submissions.updateAiScores(sql, { id: 1, status: 'failed' }), false);
    assert.equal(await submissions.updateAiScores(sql, { status: 'failed' }), false, 'neither id nor key: nothing may be updated');
  });

  // ----- sample data -----
  await practice.storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'דנה כהן', score: 50, stars: 1, answers: quizAnswers(6, 3) });
  await practice.storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'דנה כהן', score: 100, stars: 3, answers: quizAnswers(6, 6) });
  await practice.storePracticeResult(sql, { quizId: 'questions', quizCode: 'PRA-002', name: 'דנה כהן', score: 83, stars: 2, answers: quizAnswers(6, 5) });
  await practice.storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'Dana Cohen', score: 67, stars: 2, answers: quizAnswers(6, 4) });
  await practice.storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: 'dana cohen', score: 33, stars: 1, answers: quizAnswers(6, 2) });
  await practice.storePracticeResult(sql, { quizId: 'instructions', quizCode: 'PRA-003', name: 'אורי', score: 0, stars: 0, answers: quizAnswers(6, 0) });
  await practice.storePracticeResult(sql, { quizId: 'facts', quizCode: 'PRA-001', name: '100%_name', score: 17, stars: 0, answers: quizAnswers(6, 1) });

  const physics = 'physics-v1-assessment';
  const garden = (await sql`SELECT prompt FROM questions WHERE exam_id = 'hebrew-v1-garden' ORDER BY position`).map((r) => ({ question: r.prompt, answer: 'תשובה סודית של התלמיד' }));
  const idA = await submissions.storeSubmission(sql, { key: 'a'.repeat(64), name: 'דנה כהן', answers: garden, examId: undefined, examCode: undefined, attempt: undefined, startedAt: '2026-10-01T08:00:00Z', finishedAt: '2026-10-01T08:40:00Z' });
  const pq = (await sql`SELECT id, prompt, type FROM questions WHERE exam_id = ${physics} ORDER BY position`);
  const idP1 = await submissions.storeSubmission(sql, { key: 'b'.repeat(64), name: 'דנה כהן', answers: pq.map((q) => ({ question: submissions.plainText(q.prompt), answer: q.type === 'open' ? 'ניסוח פתוח' : '5' })), examId: physics, examCode: 'PHY-001', attempt: 1 });
  const idP2 = await submissions.storeSubmission(sql, { key: 'c'.repeat(64), name: 'DANA COHEN', answers: pq.map((q) => ({ question: submissions.plainText(q.prompt), answer: '6' })), examId: physics, examCode: 'PHY-001', attempt: 2 });
  await submissions.markEmail(sql, idP1, { status: 'accepted', resendId: 'secret-resend-id', httpStatus: 200 });
  assert.equal(new Set([idA, idP1, idP2]).size, 3);
  assert.equal((await sql`SELECT count(*)::int n FROM submission_answers WHERE question_id IS NOT NULL`)[0].n, 20 + 27 + 27);

  await t.test('listPracticeResults: case/space-insensitive exact name, newest first, with answers', async () => {
    const rows = await practice.listPracticeResults(sql, '  דנה כהן ');
    assert.deepEqual(rows.map((r) => [r.quiz_code, r.score]), [['PRA-002', 83], ['PRA-001', 100], ['PRA-001', 50]]);
    assert.equal(rows[0].answers.length, 6);
    assert.deepEqual((await practice.listPracticeResults(sql, 'DANA COHEN')).map((r) => r.score), [33, 67]);
    assert.equal((await practice.listPracticeResults(sql, 'דנה', 100)).length, 0, 'a prefix is not a match');
    assert.equal((await practice.listPracticeResults(sql, 'דנה כהן', 1)).length, 1);
    assert.equal((await practice.listPracticeResults(sql, 'דנה כהן', 1_000_000_000)).length, 3);
    assert.equal((await practice.listPracticeResults(sql, undefined)).length, 0, 'undefined name -> "undefined": no rows');
  });

  await t.test('listPracticeHistory: filters, best per name+quiz, no answers in the rows', async () => {
    const all = await practice.listPracticeHistory(sql, {});
    assert.equal(all.rows.length, 7);
    assert.ok(all.rows.every((r) => !('answers' in r)));
    assert.deepEqual(all.rows.map((r) => r.id), [...all.rows.map((r) => r.id)].sort((a, b) => b - a), 'newest (highest id) first');
    const dana = await practice.listPracticeHistory(sql, { name: 'דנה כהן' });
    assert.equal(dana.rows.length, 3);
    assert.deepEqual(dana.best.map((b) => [b.quiz_code, b.score, b.rounds]), [['PRA-001', 100, 2], ['PRA-002', 83, 1]]);
    // case-insensitive name merges "Dana Cohen" and "dana cohen" into one best row; the quiz filter takes id or code
    const latin = await practice.listPracticeHistory(sql, { name: 'DANA cohen' });
    assert.equal(latin.rows.length, 2);
    assert.deepEqual(latin.best.map((b) => [b.score, b.rounds]), [[67, 2]]);
    assert.equal((await practice.listPracticeHistory(sql, { quiz: 'facts' })).rows.length, 5);
    assert.equal((await practice.listPracticeHistory(sql, { quiz: 'PRA-001' })).rows.length, 5);
    assert.equal((await practice.listPracticeHistory(sql, { quiz: 'PRA-002', name: 'דנה כהן' })).rows.length, 1);
    assert.equal((await practice.listPracticeHistory(sql, { quiz: 'nope' })).rows.length, 0);
    assert.equal((await practice.listPracticeHistory(sql, { limit: 2 })).rows.length, 2);
    const limited = await practice.listPracticeHistory(sql, { limit: 1 });
    assert.equal(limited.best.length, 5, 'best is computed over all matching rows, not only the page');
    assert.equal((await practice.listPracticeHistory(sql, { limit: 9_000_000_000 })).rows.length, 7, 'huge limit is accepted by Postgres (bigint)');
  });

  await t.test('listPracticeHistory: LIKE wildcards are literal, injection strings are inert', async () => {
    assert.equal((await practice.listPracticeHistory(sql, { name: '%' })).rows.length, 0, '% must not match everything');
    assert.equal((await practice.listPracticeHistory(sql, { name: '_' })).rows.length, 0);
    assert.equal((await practice.listPracticeHistory(sql, { name: '100%_name' })).rows.length, 1, 'a real % and _ in a name match literally');
    assert.equal((await practice.listPracticeHistory(sql, { quiz: '%' })).rows.length, 0);
    assert.equal((await practice.listPracticeHistory(sql, { quiz: "x' OR '1'='1" })).rows.length, 0);
    for (const bad of INJECTIONS) {
      assert.equal((await practice.listPracticeHistory(sql, { name: bad, quiz: bad })).rows.length, 0, bad);
      assert.equal((await submissions.listSubmissionHistory(sql, { name: bad, code: bad })).length, 0, bad);
      assert.equal((await practice.listPracticeResults(sql, bad)).length, 0, bad);
    }
    assert.equal((await sql`SELECT count(*)::int n FROM practice_results`)[0].n, 7, 'the table still exists with all rows');
  });

  await t.test('listSubmissionHistory: filters, order, no answer text, AI columns', async () => {
    const all = await submissions.listSubmissionHistory(sql, {});
    assert.equal(all.length, 3);
    assert.deepEqual(all.map((r) => r.id), [idP2, idP1, idA], 'newest first');
    assert.ok(all.every((r) => !('answers' in r) && !('dedupe_key' in r) && !('resend_id' in r)));
    assert.deepEqual([...(await submissions.listSubmissionHistory(sql, { code: 'PHY-001' }))].map((r) => r.attempt), [2, 1]);
    assert.equal((await submissions.listSubmissionHistory(sql, { code: 'phy-001' })).length, 0, 'codes are exact (upper case)');
    assert.equal((await submissions.listSubmissionHistory(sql, { name: 'dana cohen' })).length, 1, 'name is case-insensitive');
    assert.equal((await submissions.listSubmissionHistory(sql, { name: 'dana cohen', code: 'PHY-001' })).length, 1);
    assert.equal((await submissions.listSubmissionHistory(sql, { limit: 1 })).length, 1);
    assert.equal((await submissions.listSubmissionHistory(sql, { code: '%' })).length, 0);
    assert.equal((await submissions.listSubmissionHistory(sql, { name: '%' })).length, 0);
    const legacy = all.find((r) => r.id === idA);
    assert.equal(legacy.exam_code, null); assert.equal(legacy.ai_status, null);
  });

  const keyP = 'b'.repeat(64);
  await t.test('updateAiScores / getSubmissionForGrading', async () => {
    const forGrading = await submissions.getSubmissionForGrading(sql, keyP);
    assert.equal(forGrading.id, idP1); assert.equal(forGrading.examId, physics); assert.equal(forGrading.aiStatus, null);
    assert.equal(forGrading.answers.length, 27);
    assert.ok(forGrading.answers.every((a) => a.questionId && a.question && a.answer));
    assert.equal(await submissions.getSubmissionForGrading(sql, 'z'.repeat(64)), null);
    assert.equal(await submissions.getSubmissionForGrading(sql, "' OR 1=1 --"), null);

    assert.equal(await submissions.updateAiScores(sql, { id: idP1, status: 'failed' }), true);
    assert.equal((await submissions.getSubmissionForGrading(sql, keyP)).aiStatus, 'failed');
    const reason = 'התלמיד ציין את היחידה הנכונה אך לא נימק';
    const scores = { [pq.find((q) => q.type === 'open').id]: { score: 1.5, max: 3, reason } };
    assert.equal(await submissions.updateAiScores(sql, { key: keyP, status: 'ok', scores, total: 1.5 }), true, 'failed -> ok by key');
    assert.equal(await submissions.updateAiScores(sql, { id: idP1, status: 'failed' }), false, 'ok is never overwritten (by id)');
    assert.equal(await submissions.updateAiScores(sql, { key: keyP, status: 'ok', scores: {}, total: 0 }), false, 'ok is never overwritten (by key)');
    const [row] = await sql`SELECT ai_status, ai_total, ai_scores, ai_updated_at FROM submissions WHERE id = ${idP1}`;
    assert.equal(row.ai_status, 'ok'); assert.equal(Number(row.ai_total), 1.5); assert.equal(Object.values(row.ai_scores)[0].reason, reason); assert.ok(row.ai_updated_at);
    // id wins over nothing: an unrelated submission is untouched
    assert.equal((await sql`SELECT ai_status FROM submissions WHERE id = ${idP2}`)[0].ai_status, null);
    // an id that matches one row and a key that matches another updates both (documented OR); none is 'ok' yet
    assert.equal((await sql`SELECT count(*)::int n FROM submissions WHERE ai_status IS NOT NULL`)[0].n, 1);
    assert.equal((await submissions.getSubmissionForGrading(sql, keyP)).aiScores[Object.keys(scores)[0]].score, 1.5);
  });

  await t.test('getSubmissionDetail: answers in order with auto_correct; unknown id is null', async () => {
    const d = await submissions.getSubmissionDetail(sql, String(idP1));
    assert.equal(d.exam_code, 'PHY-001'); assert.equal(d.answers.length, 27);
    assert.deepEqual(d.answers.map((a) => a.position), Array.from({ length: 27 }, (_, i) => i + 1));
    assert.equal(d.email_status, 'accepted');
    assert.ok(!('dedupe_key' in d) && !('resend_id' in d));
    assert.equal(await submissions.getSubmissionDetail(sql, '999999'), null);
    assert.equal((await submissions.getSubmissionDetail(sql, idP1)).id, idP1);
    await assert.rejects(submissions.getSubmissionDetail(sql, 'abc'), (e) => e.code === '22P02', 'non-numeric id reaches Postgres as 22P02 (the endpoint regex keeps it away)');
    await assert.rejects(submissions.getSubmissionDetail(sql, '99999999999999999999'), (e) => e.code === '22003', 'bigint overflow is 22003 (the endpoint allows at most 18 digits)');
  });

  // ----- HTTP -----
  const mkApp = async (env) => {
    const app = createApp({ env: { RESEND_API_KEY: 'k', RESEND_FROM_EMAIL: 'a@b.c', ...env }, db, sendFetch: async () => new Response('{"id":"r"}', { status: 200 }) });
    await new Promise((r) => app.listen(0, '127.0.0.1', r));
    return { app, base: `http://127.0.0.1:${app.address().port}` };
  };
  const { app, base } = await mkApp({ TEACHER_TOKEN: TOKEN });
  t.after(() => { app.close(); app.closeAllConnections(); });
  const get = async (path, { token = TOKEN, headers = {}, method = 'GET' } = {}) => {
    const r = await fetch(base + path, { method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers } });
    const text = await r.text();
    let body; try { body = JSON.parse(text); } catch { body = text; }
    return { status: r.status, body, text, headers: r.headers };
  };

  await t.test('endpoints: auth, method, origin', async () => {
    const off = await mkApp({}); // no TEACHER_TOKEN: the routes do not exist
    for (const p of ['/api/teacher/practice', '/api/teacher/submissions', '/api/teacher/submissions/1']) {
      const r = await fetch(off.base + p, { headers: { Authorization: `Bearer ${TOKEN}` } });
      assert.equal(r.status, 404, p);
    }
    off.app.close(); off.app.closeAllConnections();
    assert.equal((await get('/api/teacher/practice', { token: null })).status, 401);
    assert.equal((await get('/api/teacher/practice', { token: 'wrong' })).status, 401);
    assert.equal((await get('/api/teacher/practice', { headers: { Authorization: `bearer ${TOKEN}` }, token: null })).status, 401, 'scheme is case-sensitive');
    assert.equal((await get('/api/teacher/practice', { method: 'POST' })).status, 405);
    assert.equal((await get('/api/teacher/practice', { method: 'HEAD' })).status, 405, 'HEAD is not supported');
    assert.equal((await get('/api/teacher/practice', { headers: { Origin: 'https://evil.example' } })).status, 403);
    const ok = await get('/api/teacher/practice', { headers: { Origin: 'http://localhost:3000' } });
    assert.equal(ok.status, 200); assert.equal(ok.headers.get('cache-control'), 'no-store'); assert.equal(ok.headers.get('access-control-allow-origin'), 'http://localhost:3000');
    assert.equal((await get('/api/teacher/other')).status, 404, 'other paths fall through to the normal routes');
  });

  await t.test('endpoints: practice list and filters', async () => {
    const r = await get('/api/teacher/practice');
    assert.equal(r.status, 200);
    assert.equal(r.body.results.length, 7);
    assert.deepEqual(Object.keys(r.body.results[0]).sort(), ['createdAt', 'id', 'name', 'quizCode', 'quizId', 'score', 'stars']);
    assert.ok(!r.text.includes('questionId'), 'no per-question answers in the practice list');
    assert.equal(typeof r.body.results[0].id, 'string');
    const q = (s) => get(`/api/teacher/practice?${s}`);
    assert.equal((await q(`name=${encodeURIComponent('דנה כהן')}`)).body.results.length, 7, 'name is not applied by the server any more');
    assert.equal((await q('name=DANA%20COHEN')).body.results.length, 7);
    assert.equal((await q('quiz=PRA-002')).body.results.length, 1);
    assert.equal((await q('quiz=facts&name=dana%20cohen')).body.results.length, 5);
    assert.equal((await q('name=%25')).body.results.length, 7);
    assert.equal((await q('name=_')).body.results.length, 7);
    assert.equal((await q(`name=${encodeURIComponent("'; DROP TABLE practice_results;--")}`)).body.results.length, 7);
    assert.equal((await q('name=a&name=b')).body.results.length, 7);
    // limit clamp: junk -> default 100, 0/negative/fraction -> default, 1 -> 1, huge -> clamped to 200
    for (const [raw, expected] of [['1', 1], ['2', 2], ['0', 7], ['-5', 7], ['abc', 7], ['1.5', 7], ['', 7], ['1e3', 7], ['999999999999', 7]]) assert.equal((await q(`limit=${raw}`)).body.results.length, expected, `limit=${raw}`);
    // over-long filters are silently ignored (documented in the report): name > 120 chars returns EVERYTHING
    assert.equal((await q(`name=${'x'.repeat(121)}`)).body.results.length, 7);
  });

  await t.test('endpoints: practice limit is clamped to 200 on a larger table', async () => {
    await sql`INSERT INTO practice_results (quiz_id, quiz_code, student_name, score, stars) SELECT 'facts', 'PRA-001', 'bulk' || (g % 50), g % 101, g % 4 FROM generate_series(1, 450) g`;
    const r = await get('/api/teacher/practice?limit=100000');
    assert.equal(r.body.results.length, 200);
    assert.equal((await get('/api/teacher/practice')).body.results.length, 100);
    assert.equal((await practice.listPracticeHistory(sql, { name: 'bulk7' })).best[0].rounds, 9);
    await sql`DELETE FROM practice_results WHERE student_name LIKE 'bulk%'`; // rows this test inserted into its own schema
  });

  await t.test('endpoints: submissions list has no answers and no reasons; detail has both', async () => {
    const list = await get('/api/teacher/submissions');
    assert.equal(list.status, 200); assert.equal(list.body.submissions.length, 3);
    assert.ok(!list.text.includes('תשובה סודית'), 'no answer text in the list');
    assert.ok(!list.text.includes('התלמיד ציין את היחידה'), 'no AI reason in the list');
    assert.ok(!/dedupe|resend|secret-resend-id|b{64}/.test(list.text), 'no keys / provider ids in the list');
    const p1 = list.body.submissions.find((s) => s.id === String(idP1));
    assert.equal(p1.aiStatus, 'ok'); assert.equal(p1.aiTotal, 1.5); assert.equal(p1.examCode, 'PHY-001'); assert.equal(p1.attempt, 1);
    assert.deepEqual(Object.values(p1.aiScores)[0], { score: 1.5, max: 3 });
    assert.equal(list.body.submissions.find((s) => s.id === String(idA)).aiScores, null);
    assert.equal((await get('/api/teacher/submissions?code=PHY-001')).body.submissions.length, 2);
    assert.equal((await get('/api/teacher/submissions?code=%25')).body.submissions.length, 0);
    assert.equal((await get('/api/teacher/submissions?name=DANA%20COHEN')).body.submissions.length, 3);
    assert.equal((await get('/api/teacher/submissions?limit=1')).body.submissions.length, 1);
    assert.equal((await get('/api/teacher/submissions?limit=100000')).body.submissions.length, 3);
    assert.equal((await get(`/api/teacher/submissions?code=${encodeURIComponent("' OR 1=1;--")}`)).body.submissions.length, 0);

    const d = await get(`/api/teacher/submissions/${idP1}`);
    assert.equal(d.status, 200); assert.equal(d.body.submission.answers.length, 27);
    assert.ok(d.text.includes('התלמיד ציין את היחידה'), 'AI reason is on the detail route');
    assert.ok(d.text.includes('ניסוח פתוח'), 'answer text is on the detail route');
    assert.ok(!/dedupe|resend_id|secret-resend-id/.test(d.text));
    assert.equal(d.body.submission.answers.filter((a) => a.ai).length, 1);
    const dg = await get(`/api/teacher/submissions/${idA}`);
    assert.equal(dg.body.submission.answers.length, 20); assert.ok(dg.body.submission.answers.every((a) => a.ai === null));
    for (const bad of ['0', '01', 'abc', '1.5', '-1', '1%20OR%201=1', '9'.repeat(19), '%00']) assert.equal((await get(`/api/teacher/submissions/${bad}`)).status, 404, bad);
    assert.equal((await get('/api/teacher/submissions/99999')).status, 404);
    assert.equal((await get(`/api/teacher/submissions/${idP1}/extra`)).status, 404);
    console.log(`# GET /api/teacher/submissions/ (trailing slash) -> ${(await get('/api/teacher/submissions/')).status}`);
  });

  await t.test('endpoints: a NUL byte in a filter is a 503 (code logged), not a crash', async () => {
    logs.length = 0;
    const r = await get('/api/teacher/practice?quiz=a%00b');
    assert.ok([200, 503].includes(r.status), `status ${r.status}`);
    assert.ok(!logs.some((l) => l.includes('a\u0000b')));
    console.log(`# NUL in name -> HTTP ${r.status}; logged: ${JSON.stringify(logs)}`);
  });

  await t.test('endpoints: failed-auth rate limit (10 per minute per IP) then 429 for wrong guesses, the right token still gets in', async () => {
    const fresh = await mkApp({ TEACHER_TOKEN: TOKEN });
    for (let i = 0; i < 10; i++) assert.equal((await fetch(fresh.base + '/api/teacher/practice', { headers: { Authorization: 'Bearer nope' } })).status, 401);
    assert.equal((await fetch(fresh.base + '/api/teacher/practice', { headers: { Authorization: 'Bearer nope' } })).status, 429);
    const locked = await fetch(fresh.base + '/api/teacher/practice', { headers: { Authorization: `Bearer ${TOKEN}` } });
    assert.equal(locked.status, 200, 'only failed attempts are limited: the teacher is never locked out');
    fresh.app.close(); fresh.app.closeAllConnections();
  });

  await t.test('end to end: a submission through /api/submit-exam is visible to the teacher with code and attempt', async () => {
    const { PHYSICS_COUNT } = { PHYSICS_COUNT: 27 };
    const answers = pq.map((q) => ({ questionId: q.id, question: q.prompt.replace(/\s*(?:<br\s*\/?>\s*)+/gi, '\n').replace(/<[^>]*>/g, '').trim(), answer: '7', correct: q.type === 'open' ? undefined : false }));
    assert.equal(answers.length, PHYSICS_COUNT);
    const r = await fetch(base + '/api/submit-exam', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' }, body: JSON.stringify({ exam: physics, name: 'נועה E2E', attempt: 3, answers }) });
    assert.equal(r.status, 200);
    await new Promise((res) => setTimeout(res, 300));
    const list = (await get('/api/teacher/submissions')).body.submissions.filter((x) => x.name === 'נועה E2E');
    assert.equal(list.length, 1);
    assert.deepEqual([list[0].examCode, list[0].attempt, list[0].aiStatus, list[0].emailStatus], ['PHY-001', 3, 'none', 'accepted']);
  });

  await t.test('EXPLAIN (report only): plans for the history queries on 30k practice rows and 6k submissions', async (tt) => {
    await sql`INSERT INTO practice_results (quiz_id, quiz_code, student_name, score, stars, created_at)
      SELECT 'facts', 'PRA-001', 'student' || (g % 400), g % 101, g % 4, now() - (g || ' minutes')::interval FROM generate_series(1, 30000) g`;
    await sql`INSERT INTO submissions (exam_id, dedupe_key, student_name, exam_code, attempt, first_received_at)
      SELECT 'physics-v1-assessment', md5(g::text) || md5((g+1)::text), 'student' || (g % 400), 'PHY-001', 1 + g % 3, now() - (g || ' minutes')::interval FROM generate_series(1, 6000) g`;
    await sql`ANALYZE`;
    const plan = async (query) => (await query).map((r) => r['QUERY PLAN']).join('\n');
    const plans = {
      'practice list no filter': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT id, quiz_id, quiz_code, student_name, score, stars, created_at FROM practice_results WHERE true ORDER BY created_at DESC, id DESC LIMIT 100`),
      'practice list by name': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT id FROM practice_results WHERE true AND lower(student_name) = lower(${'student7'}) ORDER BY created_at DESC, id DESC LIMIT 100`),
      'practice best by name': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT min(student_name), quiz_id, quiz_code, max(score), count(*) FROM practice_results WHERE true AND lower(student_name) = lower(${'student7'}) GROUP BY lower(student_name), quiz_id, quiz_code`),
      'practice best no filter': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT min(student_name), quiz_id, quiz_code, max(score), count(*) FROM practice_results WHERE true GROUP BY lower(student_name), quiz_id, quiz_code`),
      'listPracticeResults by name': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT r.id FROM practice_results r LEFT JOIN practice_result_answers a ON a.result_id = r.id WHERE lower(r.student_name) = lower(${'student7'}) GROUP BY r.id ORDER BY r.created_at DESC, r.id DESC LIMIT 100`),
      'submissions list no filter': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT id FROM submissions WHERE true ORDER BY first_received_at DESC, id DESC LIMIT 50`),
      'submissions list by code': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT id FROM submissions WHERE true AND exam_code = ${'PHY-001'} ORDER BY first_received_at DESC, id DESC LIMIT 50`),
      'submissions list by name': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT id FROM submissions WHERE true AND lower(student_name) = lower(${'student7'}) ORDER BY first_received_at DESC, id DESC LIMIT 50`),
      'submission detail by id': await plan(sql`EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF) SELECT position FROM submission_answers WHERE submission_id = ${idP1} ORDER BY position`),
      'updateAiScores by key': await plan(sql`EXPLAIN (COSTS OFF) SELECT id FROM submissions WHERE (id = ${idP2} OR dedupe_key = ${'q'.repeat(64)}) AND ai_status IS DISTINCT FROM 'ok'`)
    };
    for (const [k, v] of Object.entries(plans)) console.log(`# EXPLAIN ${k}\n${v.split('\n').map((l) => '#   ' + l).join('\n')}`);
    tt.diagnostic('plans printed above');
  });

  assert.ok(!logs.some((l) => /דנה|נועה|תשובה|TOKEN|teacher-token/.test(l)), 'nothing logged contains names, answers or the token');
});
