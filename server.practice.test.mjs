import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';
import './practice-history.js';

const origin = 'https://hitech.agnon.online';
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };
const { QUIZZES, buildPayload } = globalThis.PracticeHistory;

const result = (quiz = 'facts', right = 5) => {
  const { count } = QUIZZES[quiz];
  const score = Math.round(right / count * 100);
  return buildPayload({ quizId: quiz, name: 'שם סודי של תלמיד', score, stars: score >= 90 ? 3 : score >= 75 ? 2 : score >= 50 ? 1 : 0,
    answers: Array.from({ length: count }, (_, index) => ({ index, choice: 0, correct: index < right })) });
};

function fakeDb(overrides = {}) {
  const calls = [];
  return { calls, flags: { write: true, read: false }, health: async () => true,
    storePracticeResult: async (value) => { calls.push(value); return 1; }, ...overrides };
}

async function withServer(run, { db, ...rest } = {}) {
  const sent = [];
  const server = createApp({ env, db, sendFetch: async (...args) => { sent.push(args); return new Response('{}', { status: 200 }); }, ...rest });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/practice-result`;
  const post = (body = result(), headers = {}) => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  try { await run({ post, url, sent }); } finally { await new Promise((resolve) => server.close(resolve)); }
}

test('with the database off it validates, answers stored:false and sends no email', () => withServer(async ({ post, sent }) => {
  const response = await post();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, stored: false });
  assert.equal(response.headers.get('access-control-allow-origin'), origin);
  assert.equal(sent.length, 0);
}));

test('with the database writing, the cleaned result is stored with the quiz code', () => {
  const db = fakeDb();
  return withServer(async ({ post, sent }) => {
    const response = await post(buildPayload({ quizId: 'physics-units', name: 'בדיקה', score: 100, stars: 3, answers: [325, 5.7, 2400, 9.6, 85].map((value, index) => ({index, answer: String(value), correct: true})) }));
    assert.deepEqual(await response.json(), { success: true, stored: true });
    assert.equal(db.calls.length, 1);
    assert.equal(db.calls[0].quizCode, 'PRA-005');
    assert.equal(db.calls[0].quizId, 'physics-units');
    assert.equal(db.calls[0].answers.length, 5);
    assert.equal(sent.length, 0);
  }, { db });
});

test('write flag off (read only) stores nothing', () => {
  const db = fakeDb({ flags: { write: false, read: true } });
  return withServer(async ({ post }) => {
    assert.deepEqual(await (await post()).json(), { success: true, stored: false });
    assert.equal(db.calls.length, 0);
  }, { db });
});

test('a failing database never fails the request and never logs the name or the error object', async () => {
  const logged = [];
  const original = console.error;
  console.error = (...args) => logged.push(args);
  try {
    const db = fakeDb({ storePracticeResult: async () => { throw Object.assign(new Error('insert שם סודי של תלמיד'), { code: '08006' }); } });
    await withServer(async ({ post, sent }) => {
      const response = await post();
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { success: true, stored: false });
      assert.equal(sent.length, 0);
    }, { db });
  } finally { console.error = original; }
  assert.deepEqual(logged, [['practice result store failed', '08006']]);
});

test('a database slower than 2 seconds does not delay or fail the request', () => {
  const db = fakeDb({ storePracticeResult: () => new Promise((resolve) => setTimeout(() => resolve(1), 2600)) });
  return withServer(async ({ post }) => {
    const started = Date.now();
    const response = await post();
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true, stored: false });
    assert.ok(Date.now() - started < 2500);
  }, { db });
});

test('origin, method, content type, size and JSON rules', () => withServer(async ({ post, url }) => {
  assert.equal((await post(result(), { Origin: 'https://evil.example' })).status, 403);
  assert.equal((await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status, 403);
  assert.equal((await post(result(), { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await post('{not json')).status, 400);
  assert.equal((await post(JSON.stringify({ ...result(), pad: 'x'.repeat(11000) }))).status, 413);
  assert.equal((await fetch(url, { headers: { Origin: origin } })).status, 405);
  const preflight = await fetch(url, { method: 'OPTIONS', headers: { Origin: 'https://michaelmishaev.github.io' } });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), 'https://michaelmishaev.github.io');
}));

test('invalid results get 400 and are not stored', () => {
  const db = fakeDb();
  return withServer(async ({ post }) => {
    assert.equal((await post({ ...result(), quiz: 'nope' })).status, 400);
    assert.equal((await post({ ...result(), name: '' })).status, 400);
    assert.equal((await post({ ...result(), score: 100 })).status, 400);
    assert.equal((await post({ ...result(), answers: result().answers.slice(1) })).status, 400);
    assert.equal((await post(null)).status, 400);
    assert.equal(db.calls.length, 0);
  }, { db });
});

test('the practice endpoint has its own rate limit of 400 an hour per client', () => withServer(async ({ post }) => {
  for (let i = 0; i < 400; i++) assert.equal((await post()).status, 200);
  const limited = await post();
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '3600');
}));
