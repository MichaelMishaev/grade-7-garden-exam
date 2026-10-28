// The per-exam table in server.mjs: physics (exam: 'physics-v1-assessment', 27 answers) goes through the same endpoint,
// Resend account, sender, teacher, limits and origin rules as garden/library; payloads without `exam` are unchanged
// byte for byte (legacy-email-snapshots.json was recorded from the code before the table existed). Resend is mocked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createApp, exams } from './server.mjs';
import { renderExamEmail } from './email-template.mjs';
import { extractContent } from './db/extract.mjs';
import { plainText } from './db/submissions.mjs';
import { legacyPayloads, renderCalls } from './test-fixtures/legacy-email-inputs.mjs';

const snapshots = JSON.parse(readFileSync(new URL('./test-fixtures/legacy-email-snapshots.json', import.meta.url), 'utf8'));
const origin = 'https://hitech.agnon.online';
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };

const physicsRows = extractContent().questions.filter((q) => q.exam_id === 'physics-v1-assessment');
// What physics-exam.js sends: plain-text prompt, the answer, and `correct` on choice/numeric tasks.
const physicsPayload = (name = 'תלמידת מדעים <i>') => ({
  exam: 'physics-v1-assessment', name, startedAt: '2026-12-30T08:00:00.000Z', finishedAt: '2026-12-30T08:40:00.000Z',
  score: { earned: 52, pending: 26 },
  answers: physicsRows.map((q, i) => ({
    question: plainText(q.prompt),
    answer: q.type === 'mcq' ? q.choices[q.correct] : q.type === 'fill' ? `${q.correct.value}\nדרך חישוב: חישוב <b>${i}</b>` : 'הסבר כתוב',
    ...(q.type === 'open' ? {} : { correct: i % 4 !== 1 })
  }))
});

async function withServer(run, options = {}) {
  const calls = [];
  const stored = [];
  const db = options.db === null ? null : { flags: { write: true, read: false }, storeSubmission: async (s) => { stored.push(s); return 1; }, markEmail: async () => {} };
  const server = createApp({ env, db, sendFetch: async (url, config) => {
    calls.push({ url, ...config, body: JSON.parse(config.body) });
    return new Response(JSON.stringify({ id: 'test-email-id' }), { status: 200 });
  }, ...options, ...(options.db === null ? { db: null } : {}) });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/submit-exam`;
  const submit = (body, headers = {}) => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  try { await run({ calls, submit, stored }); } finally { await new Promise((resolve) => server.close(resolve)); }
}

test('garden/library payloads (no exam field) produce byte-identical Resend requests to the original code', () => withServer(async ({ submit, calls }) => {
  for (const [i, payload] of legacyPayloads.entries()) {
    const before = calls.length;
    const response = await submit(payload);
    const expected = snapshots.requests[i];
    assert.equal(response.status, expected.status, `payload ${i}`);
    assert.deepEqual(await response.json(), expected.response, `payload ${i}`);
    const call = calls.length > before ? calls.at(-1) : null;
    assert.deepEqual(call && { url: call.url, headers: call.headers, body: call.body }, expected.call, `payload ${i}`);
  }
}, { db: null }));

test('renderExamEmail with the original signature is byte-identical to the original template', () => {
  renderCalls.forEach((call, i) => assert.equal(renderExamEmail(call), snapshots.renders[i]));
});

test('physics: 27 answers are emailed once, with the same Resend key, sender and teacher as garden', () => withServer(async ({ submit, calls }) => {
  assert.equal((await submit(legacyPayloads[0])).status, 200);
  const response = await submit(physicsPayload());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(calls.length, 2);
  const [garden, physics] = calls;
  assert.equal(physics.url, 'https://api.resend.com/emails');
  assert.equal(physics.headers.Authorization, garden.headers.Authorization);
  assert.equal(physics.headers.Authorization, 'Bearer test-secret');
  assert.equal(physics.body.from, garden.body.from);
  assert.deepEqual(physics.body.to, garden.body.to);
  assert.deepEqual(physics.body.to, ['345287@gmail.com']);
  assert.equal(physics.body.subject, 'תשובות למשימת הערכה במדידות - מדעים - כיתה ז׳');
  assert.notEqual(physics.body.subject, garden.body.subject);
  const { text, html } = physics.body;
  assert.match(text, /^שם התלמיד\/ה: תלמידת מדעים <i>\n/);
  assert.match(text, /משך: 40 דקות/);
  assert.match(text, /ציון חלקי: 52 מתוך 74 · 26 נקודות ממתינות לבדיקה בשאלות פתוחות/);
  assert.match(text, /\n27\. /);
  assert.match(text, /1\. ✓ תלמידים מכינים תערוכה/);
  assert.match(text, /2\. ✕ /);
  assert.match(text, /\n6\. שני תלמידים דיווחו/); // written task: no mark in the text part
  assert.match(text, /\n325\nדרך חישוב: חישוב <b>11<\/b>/);
  assert.match(html, /<h1[^>]*>תשובות למשימת הערכה במדידות<\/h1>/);
  assert.match(html, /מדעים · כיתה ז׳2 · שי עגנון, נתניה/);
  assert.doesNotMatch(html, /הבנת הנקרא/);
  assert.equal(html.match(/✎ ממתינה לבדיקת המורה/g).length, 7);
  assert.equal(html.match(/✓ נכון|✕ שגוי/g).length, 20);
  assert.match(html, /תלמידת מדעים &lt;i&gt;/);
  assert.match(html, /חישוב &lt;b&gt;11&lt;\/b&gt;/);
  assert.doesNotMatch(html, /<b>11/);
  assert.match(html, /https:\/\/hitech\.agnon\.online\/assets\/branding\/prepx-logo\.png/);
}));

test('physics needs exactly 27 answers; a payload without exam still needs exactly 20', () => withServer(async ({ submit, calls }) => {
  const physics = physicsPayload();
  for (const answers of [physics.answers.slice(1), [...physics.answers, physics.answers[0]], physics.answers.slice(0, 20)]) {
    const response = await submit({ ...physics, answers });
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: 'Name and all 27 answers are required' });
  }
  const { exam, ...noExam } = physics;
  const response = await submit(noExam);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'Name and all 20 answers are required' });
  assert.equal((await submit({ ...physics, name: ' ' })).status, 400);
  assert.equal(calls.length, 0);
}));

test('unknown exam values are rejected before anything is sent', () => withServer(async ({ submit, calls }) => {
  for (const exam of ['nope', '', null, 5, true, ['physics-v1-assessment'], {}, '__proto__', 'constructor', 'toString', 'hasOwnProperty', 'hebrew-v1-garden']) {
    const response = await submit({ ...legacyPayloads[1], exam });
    assert.equal(response.status, 400, JSON.stringify(exam));
    assert.deepEqual(await response.json(), { error: 'Unknown exam' });
  }
  assert.equal(calls.length, 0);
  assert.deepEqual(Object.keys(exams), ['physics-v1-assessment']);
}));

test('physics idempotency key is stable per payload, per student, and never equal to the garden key', () => withServer(async ({ submit, calls }) => {
  const physics = physicsPayload();
  await submit(physics); await submit(physics);
  await submit(physicsPayload('תלמיד אחר'));
  const { exam, ...same } = physics;
  await submit({ ...same, answers: same.answers.slice(0, 20) }); // the same content without exam: the garden rules
  const keys = calls.map((c) => c.headers['Idempotency-Key']);
  assert.equal(keys[0], keys[1]);
  assert.match(keys[0], /^physics-exam\/[0-9a-f]{64}$/);
  assert.notEqual(keys[0], keys[2]);
  assert.match(keys[3], /^garden-exam\/[0-9a-f]{64}$/);
  assert.notEqual(keys[0].split('/')[1], keys[3].split('/')[1]);
}));

test('physics follows the same origin, content-type, size, config and rate-limit rules', async () => {
  await withServer(async ({ submit, calls }) => {
    assert.equal((await submit(physicsPayload(), { Origin: 'https://untrusted.example' })).status, 403);
    assert.equal((await submit(physicsPayload(), { 'Content-Type': 'text/plain' })).status, 415);
    assert.equal((await submit({ ...physicsPayload(), name: 'x'.repeat(100001) })).status, 413);
    assert.equal(calls.length, 0);
    for (let i = 0; i < 100; i++) assert.equal((await submit(i % 2 ? physicsPayload() : legacyPayloads[1])).status, 200);
    assert.equal((await submit(physicsPayload())).status, 429); // one shared budget for every exam
  });
  await withServer(async ({ submit, calls }) => {
    assert.equal((await submit(physicsPayload())).status, 503);
    assert.equal(calls.length, 0);
  }, { env: {} });
});

test('physics submissions reach the database layer with their exam id; garden ones without it', () => withServer(async ({ submit, stored }) => {
  await submit(physicsPayload());
  await submit(legacyPayloads[1]);
  assert.equal(stored[0].examId, 'physics-v1-assessment');
  assert.equal(stored[0].answers.length, 27);
  assert.equal(stored[0].answers[0].correct, true);
  assert.equal('examId' in stored[1], false);
}));

test('physics email render: title, subtitle, marks, pending labels and escaping', () => {
  const html = renderExamEmail({
    name: 'א', origin: 'https://hitech.agnon.online', title: 'כותרת <x>', subtitle: 'משנה & co', markPending: true,
    answers: [{ question: 'q1', answer: 'a', correct: true }, { question: 'q2', answer: 'b', correct: false }, { question: 'q3', answer: 'c' }]
  });
  assert.match(html, /<h1[^>]*>כותרת &lt;x&gt;<\/h1><p[^>]*>משנה &amp; co<\/p>/);
  assert.match(html, /שאלה 1 · <span style="color:#2b8a3e;">✓ נכון<\/span>/);
  assert.match(html, /שאלה 2 · <span style="color:#c92a2a;">✕ שגוי<\/span>/);
  assert.match(html, /שאלה 3 · <span style="color:#1587c2;">✎ ממתינה לבדיקת המורה<\/span>/);
  assert.doesNotMatch(renderExamEmail({ name: 'א', origin: 'x', answers: [{ question: 'q', answer: 'a' }] }), /ממתינה/);
});
