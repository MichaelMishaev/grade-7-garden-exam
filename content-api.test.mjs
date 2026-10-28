import { test } from 'node:test';
import assert from 'node:assert/strict';
import './content-api.js';

const { loadContent } = globalThis.ContentApi;
const fallback = { source: 'inline' };
const respond = (body, status = 200) => async () => new Response(JSON.stringify(body), { status });

test('uses the API data when it is valid', async () => {
  assert.deepEqual(await loadContent('quizzes/facts', fallback, { fetchImpl: respond({ source: 'api' }) }), { source: 'api' });
});

test('falls back on HTTP errors, network errors, timeouts and invalid shapes', async () => {
  assert.equal(await loadContent('x', fallback, { fetchImpl: respond({}, 503) }), fallback);
  assert.equal(await loadContent('x', fallback, { fetchImpl: async () => { throw new TypeError('offline'); } }), fallback);
  assert.equal(await loadContent('x', fallback, { timeout: 20, fetchImpl: (url, { signal }) => new Promise((_, reject) => signal.addEventListener('abort', () => reject(signal.reason))) }), fallback);
  assert.equal(await loadContent('x', fallback, { valid: () => false, fetchImpl: respond({ source: 'api' }) }), fallback);
});
