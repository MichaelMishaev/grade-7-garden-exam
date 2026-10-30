import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

const origin = 'https://hitech.agnon.online';
const payload = { name: 'תלמיד בדיקה <script>', answers: Array.from({ length: 20 }, (_, i) => ({ question: `שאלה ${i + 1}`, answer: 'תשובה <img src=x>' })) };
const env = { RESEND_RPS: '1000', NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };

async function withServer(run, options = {}) {
  const calls = [];
  const server = createApp({ sleep: async () => {}, env, sendFetch: async (url, config) => {
    calls.push({ url, ...config, body: JSON.parse(config.body) });
    return new Response(JSON.stringify({ id: 'test-email-id' }), { status: 200 });
  }, ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/submit-exam`;
  const submit = (body = payload, headers = {}) => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  try { await run({ calls, submit, url }); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('sends all Hebrew answers to the fixed teacher and escapes HTML', () => withServer(async ({ submit, calls }) => {
  const response = await submit({ ...payload, to: 'attacker@example.com' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.deepEqual(calls[0].body.to, ['345287@gmail.com']);
  assert.match(calls[0].body.text, /20\. שאלה 20/);
  assert.match(calls[0].body.html, /&lt;script&gt;/);
  assert.doesNotMatch(calls[0].body.html, /<img src=x>/);
  assert.match(calls[0].body.text, /תלמיד בדיקה/);
}));

test('identical retries use the same provider idempotency key', () => withServer(async ({ submit, calls }) => {
  await submit(); await submit();
  assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key']);
  await submit({ ...payload, name: 'Different student' });
  assert.notEqual(calls[0].headers['Idempotency-Key'], calls[2].headers['Idempotency-Key']);
}));

test('rejects incomplete, oversized, and cross-origin submissions before sending', () => withServer(async ({ submit, calls }) => {
  assert.equal((await submit({ ...payload, answers: payload.answers.slice(1) })).status, 400);
  assert.equal((await submit({ ...payload, name: '' })).status, 400);
  assert.equal((await submit({ ...payload, name: 'x'.repeat(250001) })).status, 413);
  assert.equal((await submit(payload, { Origin: 'https://untrusted.example' })).status, 403);
  assert.equal((await submit(payload, { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal(calls.length, 0);
}));

test('GitHub Pages preflight is allowed without sending email', () => withServer(async ({ url, calls }) => {
  const response = await fetch(url, { method: 'OPTIONS', headers: { Origin: 'https://michaelmishaev.github.io' } });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://michaelmishaev.github.io');
  assert.equal(calls.length, 0);
}));

test('provider failures and missing config never report success or expose secrets', async () => {
  await withServer(async ({ submit }) => {
    const response = await submit();
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: 'Email submission failed' });
  }, { sendFetch: async () => new Response(JSON.stringify({ message: 'private provider details' }), { status: 403 }) });
  await withServer(async ({ submit, calls }) => {
    assert.equal((await submit()).status, 503);
    assert.equal(calls.length, 0);
  }, { env: {} });
});

test('bounds email attempts per client (150 an hour)', () => withServer(async ({ submit, calls }) => {
  for (let i = 0; i < 150; i++) assert.equal((await submit()).status, 200);
  const response = await submit();
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '3600');
  assert.equal(calls.length, 150);
}));

test('teacher email is designed HTML with logo and app link', () => withServer(async ({ submit, calls }) => {
  await submit();
  assert.match(calls[0].body.html, /https:\/\/hitech\.agnon\.online\/assets\/branding\/prepx-logo\.png/);
  assert.match(calls[0].body.html, /href="https:\/\/hitech\.agnon\.online\/"/);
  assert.match(calls[0].body.html, /dir="rtl"/);
}));

test('score and per-answer marks reach the teacher email; bad score is ignored', () => withServer(async ({ submit, calls }) => {
  const answers = payload.answers.map((item, i) => ({ ...item, ...(i < 2 ? { correct: i === 0 } : {}) }));
  await submit({ ...payload, answers, score: { earned: 34, pending: 25 } });
  assert.match(calls[0].body.text, /ציון חלקי: 34 מתוך 75 · 25 נקודות ממתינות/);
  assert.match(calls[0].body.text, /1\. ✓ /);
  assert.match(calls[0].body.text, /2\. ✕ /);
  assert.match(calls[0].body.html, /✓ נכון/);
  assert.match(calls[0].body.html, /✕ שגוי/);
  await submit({ ...payload, score: { earned: 90, pending: 50 } });
  assert.doesNotMatch(calls[1].body.text, /ציון חלקי/);
}));

test('start, finish and duration reach the teacher email; bad times are ignored', () => withServer(async ({ submit, calls }) => {
  await submit({ ...payload, startedAt: '2026-10-28T10:00:00.000Z', finishedAt: '2026-10-28T10:25:00.000Z' });
  assert.match(calls[0].body.text, /משך: 25 דקות/);
  assert.match(calls[0].body.html, /משך: 25 דקות/);
  await submit({ ...payload, startedAt: '2026-10-28T10:00:00.000Z', finishedAt: '2026-10-28T10:00:40.000Z' });
  assert.match(calls[1].body.text, /משך: דקה אחת/);
  await submit({ ...payload, startedAt: 'nonsense', finishedAt: '2026-10-28T10:25:00.000Z' });
  assert.doesNotMatch(calls[2].body.text, /משך:/);
}));

test('physics submission requires 27 answers and sends a correctly titled email', () => withServer(async ({ submit, calls }) => {
  const answers = Array.from({ length: 27 }, (_, i) => ({ question: `שאלה ${i + 1}`, answer: `תשובה ${i + 1}` }));
  assert.equal((await submit({ exam: 'physics-v1-assessment', name: 'בדיקה', answers: answers.slice(0, 20) })).status, 400);
  assert.equal((await submit({ name: 'בדיקה', answers })).status, 400);
  assert.equal((await submit({ exam: 'unknown', name: 'בדיקה', answers })).status, 400);
  assert.equal((await submit({ exam: 'physics-v1-assessment', name: 'בדיקה', answers })).status, 200);
  assert.equal(calls.length, 1);
  assert.match(calls[0].body.subject, /מדידות/);
  assert.match(calls[0].body.html, /משימת הערכה במדידות/);
  assert.match(calls[0].body.text, /27\. שאלה 27/);
}));

test('game entry pages revalidate while versioned game assets stay cacheable', () => withServer(async ({ url, calls }) => {
  for (const path of ['/games/afterbell/play/index.html', '/games/maze/play/index.html']) {
    const pageUrl = new URL(path, url);
    const response = await fetch(pageUrl);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-cache');
    const html = await response.text();
    const asset = html.match(/<script[^>]+src="([^"]+)"/)[1];
    const script = await fetch(new URL(asset, pageUrl));
    assert.equal(script.status, 200);
    assert.equal(script.headers.get('Cache-Control'), 'public, max-age=300');
  }
  assert.equal(calls.length, 0);
}));
