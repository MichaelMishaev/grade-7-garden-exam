import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

const origin = 'https://hitech.agnon.online';
const payload = { name: 'שם סודי של תלמיד', answers: Array.from({ length: 20 }, (_, i) => ({ question: `שאלה ${i + 1}`, answer: `תשובה סודית ${i + 1}` })) };
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };

function fakeDb(overrides = {}) {
  const calls = [];
  const record = (name, result) => async (...args) => { calls.push([name, ...args]); return typeof result === 'function' ? result(...args) : result; };
  return {
    calls,
    flags: { write: true, read: true },
    health: record('health', true),
    storeSubmission: record('storeSubmission', 7),
    markEmail: record('markEmail', undefined),
    listSubjects: record('listSubjects', [{ id: 'hebrew' }]),
    getSubject: record('getSubject', (id) => (id === 'hebrew' ? { id } : null)),
    getQuiz: record('getQuiz', (id) => (id === 'facts' ? { id, questions: [] } : null)),
    getExam: record('getExam', null),
    contentVersion: record('contentVersion', 'v1'),
    ...overrides
  };
}

async function withServer(run, { db, resend = { id: 'email-1' }, status = 200, ...rest } = {}) {
  const sent = [];
  const server = createApp({ env, db, sendFetch: async (url, config) => {
    sent.push(config);
    return new Response(JSON.stringify(resend), { status });
  }, ...rest });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const submit = () => fetch(`${base}/api/submit-exam`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  try { await run({ base, submit, sent }); } finally { await new Promise((resolve) => server.close(resolve)); }
}

test('with no database the server behaves exactly as before: no health or content routes', () => withServer(async ({ base, submit, sent }) => {
  assert.equal((await submit()).status, 200);
  assert.equal(sent.length, 1);
  assert.equal((await fetch(`${base}/api/health`)).status, 404);
  assert.equal((await fetch(`${base}/api/health`, { method: 'POST' })).status, 405);
  assert.equal((await fetch(`${base}/api/subjects`)).status, 404);
}));

test('submission is stored before the email and the email result is recorded', () => {
  const db = fakeDb();
  return withServer(async ({ submit }) => {
    assert.equal((await submit()).status, 200);
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(db.calls.map((c) => c[0]), ['storeSubmission', 'markEmail']);
    assert.equal(db.calls[0][1].name, payload.name);
    assert.deepEqual(db.calls[1].slice(1), [7, { status: 'accepted', resendId: 'email-1', httpStatus: 200 }]);
  }, { db });
});

test('a failing database does not stop the email and never logs student data', async () => {
  const logged = [];
  const original = console.error;
  console.error = (...args) => logged.push(args.join(' '));
  try {
    const db = fakeDb({ storeSubmission: async () => { throw Object.assign(new Error(`insert ${payload.name} ${payload.answers[0].answer}`), { code: '08006' }); } });
    await withServer(async ({ submit, sent }) => {
      assert.equal((await submit()).status, 200);
      assert.equal(sent.length, 1);
    }, { db });
  } finally { console.error = original; }
  assert.ok(logged.some((line) => line.includes('08006')));
  assert.ok(!logged.join('\n').includes('סודי'));
});

test('a hanging database delays the email by about two seconds at most', () => {
  const db = fakeDb({ storeSubmission: () => new Promise(() => {}) });
  return withServer(async ({ submit, sent }) => {
    const started = Date.now();
    assert.equal((await submit()).status, 200);
    assert.equal(sent.length, 1);
    assert.ok(Date.now() - started < 3500);
  }, { db });
});

test('the response still depends only on the email provider', () => {
  const db = fakeDb();
  return withServer(async ({ submit }) => {
    assert.equal((await submit()).status, 502);
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(db.calls[1].slice(1), [7, { status: 'failed', httpStatus: 500 }]);
  }, { db, resend: { message: 'nope' }, status: 500 });
});

test('write flag off means no storage even when the db is present', () => {
  const db = fakeDb({ flags: { write: false, read: true } });
  return withServer(async ({ submit }) => {
    assert.equal((await submit()).status, 200);
    assert.deepEqual(db.calls, []);
  }, { db });
});

test('content endpoints return JSON with an ETag, 404s and CORS only for allowed origins', () => {
  const db = fakeDb();
  return withServer(async ({ base }) => {
    const list = await fetch(`${base}/api/subjects`, { headers: { Origin: origin } });
    assert.equal(list.status, 200);
    assert.equal(list.headers.get('etag'), '"v1"');
    assert.equal(list.headers.get('access-control-allow-origin'), origin);
    assert.deepEqual(await list.json(), [{ id: 'hebrew' }]);
    assert.equal((await fetch(`${base}/api/subjects/hebrew`)).status, 200);
    assert.equal((await fetch(`${base}/api/subjects/nope`)).status, 404);
    assert.equal((await fetch(`${base}/api/quizzes/facts`)).status, 200);
    assert.equal((await fetch(`${base}/api/exams/x`)).status, 404);
    assert.equal((await fetch(`${base}/api/unknown`)).status, 404);
    assert.equal((await fetch(`${base}/api/subjects`, { headers: { Origin: 'https://evil.example' } })).status, 403);
    assert.equal((await fetch(`${base}/api/subjects`, { headers: { 'If-None-Match': '"v1"' } })).status, 304);
  }, { db });
});

test('health reports a down database and read errors become 503', () => {
  const db = fakeDb({ health: async () => false, listSubjects: async () => { throw new Error('boom'); } });
  return withServer(async ({ base }) => {
    assert.deepEqual(await (await fetch(`${base}/api/health`)).json(), { ok: true, db: 'down' });
    assert.equal((await fetch(`${base}/api/subjects`)).status, 503);
  }, { db });
});

test('a slow write that finishes after the wait still records the email result', () => {
  const db = fakeDb({ storeSubmission: () => new Promise((resolve) => setTimeout(() => resolve(9), 2300)) });
  return withServer(async ({ submit }) => {
    assert.equal((await submit()).status, 200);
    assert.deepEqual(db.calls.map((c) => c[0]), []);
    await new Promise((resolve) => setTimeout(resolve, 600));
    assert.deepEqual(db.calls.map((c) => c[0]), ['markEmail']);
    assert.equal(db.calls[0][1], 9);
  }, { db });
});

test('a malformed id in a content URL is a 400, not a server error', () => withServer(async ({ base }) => {
  assert.equal((await fetch(`${base}/api/quizzes/%E0`)).status, 400);
}, { db: fakeDb() }));

test('installed packages are never served as static files', () => withServer(async ({ base }) => {
  assert.equal((await fetch(`${base}/node_modules/postgres/src/index.js`)).status, 404);
}));
