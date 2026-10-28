import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

const origin = 'https://hitech.agnon.online';
const payload = { name: 'תלמיד בדיקה <script>', answers: Array.from({ length: 20 }, (_, i) => ({ question: `שאלה ${i + 1}`, answer: 'תשובה <img src=x>' })) };
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };

async function withServer(run, options = {}) {
  const calls = [];
  const server = createApp({ env, sendFetch: async (url, config) => {
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
  assert.equal((await submit({ ...payload, name: 'x'.repeat(100001) })).status, 413);
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

test('bounds email attempts per server instance', () => withServer(async ({ submit, calls }) => {
  for (let i = 0; i < 100; i++) assert.equal((await submit()).status, 200);
  const response = await submit();
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '3600');
  assert.equal(calls.length, 100);
}));

test('teacher email is designed HTML with logo and app link', () => withServer(async ({ submit, calls }) => {
  await submit();
  assert.match(calls[0].body.html, /https:\/\/hitech\.agnon\.online\/assets\/branding\/prepx-logo\.png/);
  assert.match(calls[0].body.html, /href="https:\/\/hitech\.agnon\.online\/"/);
  assert.match(calls[0].body.html, /dir="rtl"/);
}));
