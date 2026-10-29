import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createApp } from './server.mjs';
import { tokenMatches } from './history-api.mjs';

const origin = 'https://hitech.agnon.online';
const TOKEN = 'teacher-secret-token-0123456789-abcdef';
const env = { NODE_ENV: 'production', TEACHER_TOKEN: TOKEN };
const SECRET_NAME = 'שם סודי של תלמיד';
const SECRET_ANSWER = 'תשובה סודית מלאה של התלמיד';

function fakeDb() {
  const calls = [];
  return {
    calls, flags: { write: true, read: true },
    listPracticeHistory: async (args) => {
      calls.push(['practice', args]);
      return {
        rows: [{ id: 7n, quiz_id: 'facts', quiz_code: 'PRA-001', student_name: SECRET_NAME, score: 80, stars: 2, created_at: '2026-10-01T10:00:00.000Z' }],
        best: [{ student_name: SECRET_NAME, quiz_id: 'facts', quiz_code: 'PRA-001', score: 90, rounds: 3 }]
      };
    },
    listSubmissionHistory: async (args) => {
      calls.push(['submissions', args]);
      return [{
        id: 5n, exam_code: 'HEB-002', attempt: 2, student_name: SECRET_NAME, started_at: '2026-10-01T10:00:00.000Z', finished_at: '2026-10-01T10:20:00.000Z',
        first_received_at: '2026-10-01T10:20:01.000Z', email_status: 'accepted', ai_status: 'ok', ai_total: '12.5',
        ai_scores: { q1: { score: 4, max: 5, reason: 'סיבה פנימית' } }
      }];
    },
    getSubmissionDetail: async (id) => {
      calls.push(['detail', id]);
      if (id !== '5') return null;
      return {
        id: 5n, exam_code: 'HEB-002', attempt: 2, student_name: SECRET_NAME, started_at: null, finished_at: null, first_received_at: '2026-10-01T10:20:01.000Z',
        email_status: 'accepted', ai_status: 'ok', ai_total: '4', ai_scores: { q1: { score: 4, max: 5, reason: 'סיבה פנימית' } },
        answers: [{ position: 1, question_id: 'q1', question_text: 'שאלה?', answer_text: SECRET_ANSWER, auto_correct: null }]
      };
    }
  };
}

async function withServer(run, { db = fakeDb(), appEnv = env } = {}) {
  const server = createApp({ env: appEnv, db });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const get = (path, { token = TOKEN, headers = {} } = {}) => fetch(base + path, {
    headers: { Origin: origin, ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers }
  });
  try { await run({ get, base, db }); } finally { await new Promise((resolve) => server.close(resolve)); }
}

const routes = ['/api/teacher/practice', '/api/teacher/submissions', '/api/teacher/submissions/5'];

test('404 without TEACHER_TOKEN, even with a bearer header', () => withServer(async ({ get }) => {
  for (const path of routes) assert.equal((await get(path)).status, 404);
}, { appEnv: { NODE_ENV: 'production' } }));

test('404 without a database that can read', async () => {
  await withServer(async ({ get }) => {
    for (const path of routes) assert.equal((await get(path)).status, 404);
  }, { db: null });
  await withServer(async ({ get }) => {
    assert.equal((await get('/api/teacher/practice')).status, 404);
  }, { db: { flags: { write: true, read: false }, storePracticeResult: async () => 1 } });
});

test('401 for a missing or wrong token and no data is touched', () => withServer(async ({ get, db }) => {
  let n = 1;
  for (const path of routes) {
    for (const token of [null, 'wrong', TOKEN + 'x', TOKEN.slice(1)]) {
      const response = await get(path, { token, headers: { 'X-Forwarded-For': `198.51.100.${n++}` } });
      assert.equal(response.status, 401);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.ok(!JSON.stringify(await response.json()).includes(SECRET_NAME));
    }
  }
  assert.equal(db.calls.length, 0);
  const basic = await get('/api/teacher/practice', { token: null, headers: { Authorization: `Basic ${TOKEN}` } });
  assert.equal(basic.status, 401);
}));

test('429 after repeated WRONG tokens from one address, but the right token always gets in (no lock-out by a classmate)', () => withServer(async ({ get }) => {
  for (let i = 0; i < 10; i++) assert.equal((await get('/api/teacher/practice', { token: 'bad' })).status, 401);
  const locked = await get('/api/teacher/practice', { token: 'bad' });
  assert.equal(locked.status, 429);
  assert.equal(locked.headers.get('retry-after'), '60');
  // The teacher on the same address (same school network) still gets in, and that request does not count as a failure.
  assert.equal((await get('/api/teacher/practice')).status, 200);
  assert.equal((await get('/api/teacher/practice', { token: 'bad' })).status, 429);
  assert.equal((await get('/api/teacher/practice')).status, 200);
  // Another client address is not affected.
  assert.equal((await get('/api/teacher/practice', { token: 'bad', headers: { 'X-Forwarded-For': '203.0.113.9' } })).status, 401);
}));

test('a token shorter than 32 characters disables the history and logs one warning without the token', async () => {
  const warnings = [];
  const original = console.warn;
  console.warn = (...args) => warnings.push(args.join(' '));
  try {
    await withServer(async ({ get }) => {
      for (const path of routes) assert.equal((await get(path, { token: 'short-token-0123456789' })).status, 404);
    }, { appEnv: { NODE_ENV: 'production', TEACHER_TOKEN: 'short-token-0123456789' } });
  } finally { console.warn = original; }
  assert.equal(warnings.length, 1);
  assert.ok(!warnings[0].includes('short-token'));
  assert.match(warnings[0], /TEACHER_TOKEN/);
});

test('the client is the last X-Forwarded-For hop: a spoofed first hop does not reset the failure count', () => withServer(async ({ get }) => {
  for (let i = 0; i < 10; i++) assert.equal((await get('/api/teacher/practice', { token: 'bad', headers: { 'X-Forwarded-For': `10.0.0.${i}, 198.51.100.7` } })).status, 401);
  assert.equal((await get('/api/teacher/practice', { token: 'bad', headers: { 'X-Forwarded-For': '10.9.9.9, 198.51.100.7' } })).status, 429);
}));

test('practice history: shape, filters and limit clamp', () => withServer(async ({ get, db }) => {
  const response = await get('/api/teacher/practice?name=%20%D7%A9%20&quiz=PRA-001&limit=9999');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('access-control-allow-origin'), origin);
  const body = await response.json();
  assert.deepEqual(body.results, [{ id: '7', quizId: 'facts', quizCode: 'PRA-001', name: SECRET_NAME, score: 80, stars: 2, createdAt: '2026-10-01T10:00:00.000Z' }]);
  assert.deepEqual(body.best, [{ name: SECRET_NAME, quizId: 'facts', quizCode: 'PRA-001', score: 90, rounds: 3 }]);
  // The name in the query is never passed on: names are not put in URLs, the page filters the rows itself.
  assert.deepEqual(db.calls[0], ['practice', { quiz: 'PRA-001', limit: 200 }]);
  await get('/api/teacher/practice?limit=abc');
  await get('/api/teacher/practice');
  assert.equal(db.calls[1][1].limit, 100);
  assert.equal('name' in db.calls[2][1], false);
}));

test('submissions list: summary and scores, never the answers or the AI reasons', () => withServer(async ({ get, db }) => {
  const response = await get('/api/teacher/submissions?code=HEB-002&limit=500');
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.ok(!text.includes(SECRET_ANSWER));
  assert.ok(!text.includes('סיבה פנימית'));
  assert.ok(!text.includes('"answers"'));
  assert.deepEqual(JSON.parse(text).submissions, [{
    id: '5', examCode: 'HEB-002', attempt: 2, name: SECRET_NAME, startedAt: '2026-10-01T10:00:00.000Z', finishedAt: '2026-10-01T10:20:00.000Z',
    receivedAt: '2026-10-01T10:20:01.000Z', emailStatus: 'accepted', aiStatus: 'ok', aiTotal: 12.5, aiScores: { q1: { score: 4, max: 5 } }
  }]);
  assert.deepEqual(db.calls[0], ['submissions', { code: 'HEB-002', limit: 100 }]);
}));

test('detail: answers with the AI score and reason, only here', () => withServer(async ({ get }) => {
  const body = await (await get('/api/teacher/submissions/5')).json();
  assert.equal(body.submission.answers[0].answer, SECRET_ANSWER);
  assert.deepEqual(body.submission.answers[0].ai, { score: 4, max: 5, reason: 'סיבה פנימית' });
  assert.equal((await get('/api/teacher/submissions/6')).status, 404);
  assert.equal((await get('/api/teacher/submissions/abc')).status, 404);
  assert.equal((await get('/api/teacher/submissions/5%2F..')).status, 404);
}));

test('GET only, and CORS uses the allow-list with no wildcard', () => withServer(async ({ get, base }) => {
  const post = await fetch(`${base}/api/teacher/practice`, { method: 'POST', headers: { Origin: origin, Authorization: `Bearer ${TOKEN}` } });
  assert.equal(post.status, 405);
  const foreign = await get('/api/teacher/practice', { headers: { Origin: 'https://evil.example' } });
  assert.equal(foreign.status, 403);
  assert.equal(foreign.headers.get('access-control-allow-origin'), null);
  const preflight = await fetch(`${base}/api/teacher/practice`, { method: 'OPTIONS', headers: { Origin: origin } });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), origin);
  assert.match(preflight.headers.get('access-control-allow-headers'), /Authorization/);
  const same = await fetch(`${base}/api/teacher/practice`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  assert.equal(same.status, 200);
  assert.equal(same.headers.get('access-control-allow-origin'), null);
}));

test('a database failure answers 503 and logs only the error code', async () => {
  const lines = [];
  const original = { log: console.log, info: console.info, warn: console.warn, error: console.error };
  for (const level of Object.keys(original)) console[level] = (...args) => lines.push(args.map(String).join(' '));
  try {
    const db = fakeDb();
    db.listPracticeHistory = async () => { throw Object.assign(new Error(`failed for ${SECRET_NAME}`), { code: '08006' }); };
    await withServer(async ({ get }) => {
      const response = await get('/api/teacher/practice');
      assert.equal(response.status, 503);
      assert.ok(!(await response.text()).includes(SECRET_NAME));
      await get('/api/teacher/practice', { token: 'wrong' });
      await get('/api/teacher/submissions');
      await get('/api/teacher/submissions/5');
    }, { db });
  } finally { Object.assign(console, original); }
  assert.deepEqual(lines, ['history lookup failed 08006']);
  for (const line of lines) for (const secret of [SECRET_NAME, SECRET_ANSWER, TOKEN, 'wrong']) assert.ok(!line.includes(secret));
});

test('the token is compared in constant time', async () => {
  assert.equal(tokenMatches(TOKEN, TOKEN), true);
  assert.equal(tokenMatches(TOKEN + 'x', TOKEN), false);
  assert.equal(tokenMatches('', TOKEN), false);
  assert.equal(tokenMatches(undefined, TOKEN), false);
  assert.equal(tokenMatches('', ''), false);
  const source = await readFile(new URL('./history-api.mjs', import.meta.url), 'utf8');
  assert.match(source, /timingSafeEqual/);
  assert.doesNotMatch(source, /===?\s*token|token\s*===?|expected\s*===/);
});

test('history.html has no external hosts, no token in a URL, is noindex and is not linked from the public pages', async () => {
  const files = await Promise.all(['history.html', 'history.js', 'history.css'].map((file) => readFile(new URL(`./${file}`, import.meta.url), 'utf8')));
  const [html, js, css] = files;
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(html, /lang="he" dir="rtl"/);
  assert.match(html, /history\.css\?v=\d+/);
  assert.match(html, /history\.js\?v=\d+/);
  for (const source of files) assert.ok(!/https?:\/\/(?!hitech\.agnon\.online)/.test(source.replace(/http:\/\/www\.w3\.org\/\d+\/svg/g, '')), 'external host');
  assert.doesNotMatch(js, /[?&]token=|localStorage/);
  for (const page of ['index.html', 'subject.html', 'practice.html']) assert.ok(!(await readFile(new URL(`./${page}`, import.meta.url), 'utf8')).includes('history.html'));
});
