// Deterministic fuzz of the HTTP surface (fixed seed, a few seconds). Resend and OpenAI are mocked; the database is
// either off or a fake that throws. Invariants for every request:
//   - the answer is a documented status (never an unexpected 5xx);
//   - nothing reaches `process` as an unhandled rejection / uncaught exception;
//   - a 200 sent exactly one email, anything else sent none;
//   - mutations known to be valid are accepted, known to be invalid are 4xx;
//   - afterwards a normal request is still served.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import { createApp } from './server.mjs';
import { extractContent } from './db/extract.mjs';
import { plainText } from './db/submissions.mjs';
import './test-fixtures/use-fake-rubrics.mjs';
import { legacyPayloads } from './test-fixtures/legacy-email-inputs.mjs';

const origin = 'https://hitech.agnon.online';
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>',
  SUBMIT_LIMIT_PER_CLIENT: '1000000', SUBMIT_LIMIT_GLOBAL: '1000000', RESEND_RPS: '100000' };

function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rows = extractContent().questions;
const libraryRows = rows.filter((q) => q.exam_id === 'hebrew-v2-library');
const physicsRows = rows.filter((q) => q.exam_id === 'physics-v1-assessment');
const libraryPayload = () => ({
  exam: 'hebrew-v2-library', name: 'תלמידת ספרייה', attempt: 1, startedAt: new Date(Date.now() - 600000).toISOString(),
  answers: libraryRows.map((q) => ({
    questionId: q.id, question: plainText(q.prompt), answer: q.type === 'open' ? 'תשובה פתוחה' : q.choices[q.correct],
    ...(q.type === 'open' ? {} : { correct: true, options: q.choices, correctAnswer: q.choices[q.correct], reference: 'הקטע, פסקה 1' })
  }))
});
const physicsPayload = () => ({
  exam: 'physics-v1-assessment', name: 'תלמיד פיזיקה', attempt: 2, startedAt: new Date(Date.now() - 2400000).toISOString(),
  answers: physicsRows.map((q) => ({
    questionId: q.id, question: plainText(q.prompt),
    answer: q.type === 'open' ? 'הסבר' : q.type === 'fill' ? `${q.correct.value}\nדרך חישוב: צעדים` : q.choices[q.correct],
    ...(q.type === 'open' ? {} : { correct: true })
  }))
});
const bases = [
  ['garden', () => structuredClone(legacyPayloads[0])],
  ['legacy-min', () => structuredClone(legacyPayloads[1])],
  ['library', libraryPayload],
  ['physics', physicsPayload]
];

const TEXTS = ['א', 'x'.repeat(3000), '😀'.repeat(1400), '‮abc⁦def⁩', 'a\u0000b\u0007c', 'שורה\nשנייה\r\nשלישית', '<script>alert(1)</script>',
  '‎‏؜ x', '٥', '5,7', ' 5.7 ', '5.7\nדרך חישוב: <b>x</b>', '\ud800 lone surrogate', '\\u0000 "quote" \'single\'', '0'.repeat(500)];
const NAMES = ['דנה', 'ד'.repeat(120), '  רווחים  ', 'name <b>x</b>', 'שם‮', '😀 שם'];

// Each mutation: [label, expectation, apply(payload, random) -> payload], expectation: 'ok' (must be accepted),
// 'bad' (must be a 4xx; 'tableBad' only for table exams, legacy payloads ignore the field) or 'any' (accepted or 4xx, never a 5xx).
const pick = (random, list) => list[Math.floor(random() * list.length)];
const withAnswer = (payload, random, change) => {
  const i = Math.floor(random() * payload.answers.length);
  payload.answers[i] = change(payload.answers[i], i);
  return payload;
};
const mutations = [
  ['valid answer text', 'any', (p, r) => withAnswer(p, r, (a) => ({ ...a, answer: pick(r, TEXTS) }))],
  ['answer at the limit', 'ok', (p, r) => withAnswer(p, r, (a) => ({ ...a, answer: 'ת'.repeat(3000) }))],
  ['question at the limit', 'ok', (p, r) => withAnswer(p, r, (a) => ({ ...a, question: 'ש'.repeat(1000) }))],
  ['unmatched question text', 'ok', (p, r) => withAnswer(p, r, (a) => ({ ...a, question: `שאלה שלא קיימת ${r()}` }))],
  ['duplicate question texts', 'ok', (p) => { for (const a of p.answers) a.question = p.answers[0].question; return p; }],
  ['name variants', 'any', (p, r) => ({ ...p, name: pick(r, NAMES) })],
  ['name at the limit', 'ok', (p) => ({ ...p, name: 'ש'.repeat(120) })],
  ['optional fields missing', 'ok', (p) => { delete p.startedAt; delete p.finishedAt; delete p.score; delete p.attempt; return p; }],
  ['optional answer fields missing', 'ok', (p) => { for (const a of p.answers) { delete a.options; delete a.correctAnswer; delete a.reference; delete a.questionId; } return p; }],
  ['non-boolean correct', 'ok', (p, r) => withAnswer(p, r, (a) => ({ ...a, correct: pick(r, ['yes', 1, 0, null, {}, [], 'true']) }))],
  ['extra unknown fields', 'ok', (p, r) => ({ ...p, __proto__: { polluted: true }, extra: { deep: [r()] }, constructor: 'x', answers: p.answers.map((a) => ({ ...a, unknown: pick(r, [1, 'x', null, [], {}]) })) })],
  ['attempt edge ok', 'ok', (p, r) => ({ ...p, attempt: pick(r, [1, 2, 98, 99]) })],
  ['attempt edge bad', 'bad', (p, r) => ({ ...p, attempt: pick(r, [0, 100, 1.5, '2', null, -1, [], {}, true, 1e21]) })],
  ['odd startedAt', 'ok', (p, r) => ({ ...p, startedAt: pick(r, ['', 'not a date', 12345, null, {}, '9999-12-31T00:00:00Z', 'x'.repeat(100), '2020-01-01', '\u0000']) })],
  ['odd finishedAt', 'ok', (p, r) => ({ ...p, finishedAt: pick(r, ['', 'nope', 0, null, '1970-01-01T00:00:00Z', 'x'.repeat(100)]) })],
  ['odd score', 'ok', (p, r) => ({ ...p, score: pick(r, [null, 5, 'x', { earned: -1, pending: 200 }, { earned: 1.5 }, { earned: 100, pending: 100 }, []]) })],
  ['options array ok', 'ok', (p, r) => withAnswer(p, r, (a) => ({ ...a, options: Array.from({ length: Math.floor(r() * 12) + 1 }, (_, i) => `אפשרות ${i}`) }))],
  ['options weird', 'bad', (p, r) => withAnswer(p, r, (a) => ({ ...a, options: pick(r, ['abc', null, 7, {}, [''], [' '], [1], [[]], Array(13).fill('x'), ['x'.repeat(501)], [null]]) }))],
  ['correctAnswer/reference weird', 'bad', (p, r) => withAnswer(p, r, (a) => pick(r, [{ ...a, correctAnswer: 5 }, { ...a, correctAnswer: '' }, { ...a, reference: 'x'.repeat(201) }, { ...a, reference: [] }, { ...a, correctAnswer: 'x'.repeat(3001) }]))],
  ['empty answer', 'bad', (p, r) => withAnswer(p, r, (a) => ({ ...a, answer: pick(r, ['', ' ', '\n\t ', null, 5, [], {}]) }))],
  ['empty question', 'bad', (p, r) => withAnswer(p, r, (a) => ({ ...a, question: pick(r, ['', '   ', null, 7, {}]) }))],
  ['too long', 'bad', (p, r) => withAnswer(p, r, (a) => pick(r, [{ ...a, answer: 'x'.repeat(3001) }, { ...a, question: 'x'.repeat(1001) }]))],
  ['bad name', 'bad', (p, r) => ({ ...p, name: pick(r, ['', '   ', null, 5, {}, [], 'x'.repeat(121), undefined]) })],
  ['wrong answer count', 'bad', (p, r) => ({ ...p, answers: pick(r, [[], p.answers.slice(1), [...p.answers, p.answers[0]], null, 'x', {}, [null], [undefined], [[]]]) })],
  ['bad exam value', 'bad', (p, r) => ({ ...p, exam: pick(r, ['nope', '', '__proto__', 'constructor', 'toString', 5, null, [], {}, 'hebrew-v1-garden-x']) })],
  ['bad questionId', 'tableBad', (p, r) => withAnswer(p, r, (a) => ({ ...a, questionId: pick(r, [5, '', ' ', 'x'.repeat(81), null, {}]) }))]
];

const garbageBodies = ['', ' ', '{', '}', 'null', '[]', '"str"', '123', 'true', '{"name":', '\u0000', '{"exam":"physics-v1-assessment"}', '[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]',
  '{"a":'.repeat(2000), '﻿{"name":"x"}', '{"name":"x","answers":' + '1'.repeat(50000) + '}', '{"__proto__":{"exam":"physics-v1-assessment"}}'];

const FAULT_DB = {
  flags: { write: true, read: true },
  storeSubmission: () => { throw new Error('db down (sync)'); },
  markEmail: async () => { throw new Error('db down'); },
  updateAiScores: () => { throw new Error('db down'); },
  storePracticeResult: () => { throw new Error('db down (sync)'); },
  getSubmissionForGrading: () => { throw new Error('db down'); },
  health: async () => { throw new Error('db down'); },
  contentVersion: async () => { throw new Error('db down'); },
  listSubjects: async () => { throw new Error('db down'); }, getSubject: async () => null, getQuiz: async () => null, getExam: async () => null
};

const unhandled = [];
const onFault = (error) => unhandled.push(error);
process.on('unhandledRejection', onFault);
process.on('uncaughtException', onFault);

async function withApp(run, db) {
  const calls = [];
  const original = { error: console.error, info: console.info, warn: console.warn };
  console.error = console.info = console.warn = () => {};
  const server = createApp({ env, db, sleep: async () => {}, sendFetch: async (url, config) => { calls.push(JSON.parse(config.body)); return new Response(JSON.stringify({ id: 'fuzz-id' }), { status: 200 }); } });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  try { await run({ calls, base, port }); } finally { Object.assign(console, original); await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }); }
}

const rawRequest = (port, bytes) => new Promise((resolve) => {
  const socket = net.connect(port, '127.0.0.1', () => socket.write(bytes));
  let data = '';
  socket.on('data', (chunk) => { data += chunk; });
  socket.on('close', () => resolve(data));
  socket.on('error', () => resolve(data));
  setTimeout(() => socket.destroy(), 1000).unref();
});

for (const [label, db] of [['no database', null], ['a database that throws', FAULT_DB]]) {
  test(`fuzz (${label}): mutated exam payloads`, () => withApp(async ({ calls, base }) => {
    const random = prng(20261029);
    const post = (body, headers = {}) => fetch(`${base}/api/submit-exam`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
    let accepted = 0;
    for (let round = 0; round < 6; round++) {
      for (const [baseName, make] of bases) {
        for (const [mutation, expectation, apply] of mutations) {
          let payload = make();
          // Up to two stacked mutations of the 'any' kind keep the expectation meaningful.
          payload = apply(payload, random);
          const before = calls.length;
          const response = await post(payload);
          const where = `${baseName} / ${mutation} / round ${round}`;
          assert.ok([200, 400, 413].includes(response.status), `${where}: unexpected ${response.status}`);
          await response.arrayBuffer();
          assert.equal(calls.length - before, response.status === 200 ? 1 : 0, `${where}: emails for status ${response.status}`);
          if (expectation === 'ok') assert.equal(response.status, 200, `${where}: should be accepted`);
          if (expectation === 'bad' || (expectation === 'tableBad' && payload.exam !== undefined)) assert.equal(response.status, 400, `${where}: should be rejected`);
          if (response.status === 200) accepted++;
        }
      }
    }
    assert.ok(accepted > 100);
    assert.equal((await fetch(`${base}/robots.txt`)).status, 200);
    assert.deepEqual(unhandled, []);
  }, db));

  test(`fuzz (${label}): garbage bodies, wrong content types, other endpoints`, () => withApp(async ({ calls, base }) => {
    const send = (path, body, headers) => fetch(base + path, { method: 'POST', headers: { Origin: origin, ...headers }, body });
    for (const path of ['/api/submit-exam', '/api/grade-open', '/api/practice-result']) {
      for (const body of garbageBodies) {
        const response = await send(path, body, { 'Content-Type': 'application/json' });
        assert.ok([400, 413].includes(response.status), `${path} ${JSON.stringify(body).slice(0, 30)}: ${response.status}`);
      }
      const bytes = await send(path, new Uint8Array([0xff, 0xfe, 0x7b, 0x80, 0x7d]), { 'Content-Type': 'application/json' });
      assert.equal(bytes.status, 400);
      for (const type of ['text/plain', 'application/jsonx', 'APPLICATION/JSON', 'multipart/form-data; boundary=x', 'application/x-www-form-urlencoded', '']) {
        const response = await send(path, JSON.stringify(legacyPayloads[1]), type ? { 'Content-Type': type } : {});
        assert.ok([415, 400].includes(response.status), `${path} type ${type}: ${response.status}`);
      }
      assert.equal((await send(path, JSON.stringify({}), { 'Content-Type': 'application/json', Origin: 'https://evil.example' })).status, 403);
    }
    // Other methods and paths.
    for (const method of ['PUT', 'DELETE', 'PATCH', 'OPTIONS', 'TRACE']) {
      const response = await fetch(`${base}/api/submit-exam`, { method, headers: { Origin: origin } }).catch(() => ({ status: 0 }));
      assert.ok([204, 405, 0].includes(response.status), `${method}: ${response.status}`);
    }
    for (const path of ['/%00', '/%2e%2e/%2e%2e/etc/passwd', '/..%2fserver.mjs', '/.env', '/node_modules/postgres/package.json', '/api/', '/api/%zz', '/server.mjs', '/open-rubrics.private.json', '/' + 'a'.repeat(5000)]) {
      const response = await fetch(base + path);
      assert.ok([200, 400, 404].includes(response.status), `${path}: ${response.status}`);
      if (path === '/server.mjs' || path.includes('private')) assert.equal(response.status, 404);
    }
    // Fuzzed grade-open and practice bodies that are JSON but nonsense.
    const random = prng(7);
    for (let i = 0; i < 60; i++) {
      const junk = pick(random, [{}, [], { exam: 'hebrew-v2-library', answers: 5 }, { exam: 'hebrew-v2-library', answers: [{}] },
        { exam: 'hebrew-v2-library', answers: [{ questionId: 'library-15', question: 'ש', answer: 'ת' }], submissionRef: 5 },
        { exam: 'hebrew-v2-library', answers: [{ questionId: '__proto__', question: 'ש', answer: 'ת' }] },
        { quizId: 'facts', answers: 'x' }, { quizId: '__proto__' }, { score: 'x' }]);
      for (const path of ['/api/grade-open', '/api/practice-result']) {
        const response = await send(path, JSON.stringify(junk), { 'Content-Type': 'application/json' });
        assert.ok([400, 503].includes(response.status), `${path}: ${response.status}`);
      }
    }
    assert.equal(calls.length, 0);
    assert.equal((await fetch(`${base}/robots.txt`)).status, 200);
    assert.deepEqual(unhandled, []);
  }, db));

  test(`fuzz (${label}): raw malformed requests and huge headers`, () => withApp(async ({ port, base }) => {
    const lines = ['GET // HTTP/1.1', 'GET //h:99999 HTTP/1.1', 'GET http://[::1 HTTP/1.1', 'GET /é HTTP/1.1', 'GET * HTTP/1.1', 'GET /a b c HTTP/1.1', 'BREW / HTTP/1.1',
      'GET /api/teacher/submissions/%zz HTTP/1.1', 'GET /api/subjects/%E0%A4%A HTTP/1.1', 'GET /api/health?%zz HTTP/1.1', 'GET /api/exams/' + '%25'.repeat(3000) + ' HTTP/1.1',
      'POST /api/submit-exam HTTP/1.1', 'GET / HTTP/9.9', 'garbage', ''];
    for (const line of lines) {
      const answer = await rawRequest(port, `${line}\r\nHost: x\r\nConnection: close\r\n\r\n`);
      assert.ok(answer === '' || /^HTTP\/1\.1 [1-4]\d\d/.test(answer), `${JSON.stringify(line)} -> ${answer.slice(0, 40)}`);
    }
    for (const header of [`X-Big: ${'a'.repeat(100000)}`, `Cookie: ${'a=b; '.repeat(20000)}`, 'Content-Length: -1', 'Content-Length: 99999999999999999999', 'Transfer-Encoding: chunked\r\nContent-Length: 5', `Origin: ${'o'.repeat(70000)}`]) {
      const answer = await rawRequest(port, `POST /api/submit-exam HTTP/1.1\r\nHost: x\r\nContent-Type: application/json\r\n${header}\r\n\r\n{}`);
      assert.ok(answer === '' || /^HTTP\/1\.1 [1-4]\d\d/.test(answer), `${header.slice(0, 20)} -> ${answer.slice(0, 40)}`);
    }
    assert.equal((await fetch(`${base}/robots.txt`)).status, 200);
    assert.deepEqual(unhandled, []);
  }, db));
}

test.after(() => {
  process.off('unhandledRejection', onFault);
  process.off('uncaughtException', onFault);
  assert.deepEqual(unhandled, []);
});
