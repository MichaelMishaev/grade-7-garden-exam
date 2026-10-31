import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createApp } from './server.mjs';

test('PWA manifest and icon files are served with correct types and dimensions', async t => {
  const server = createApp({ env: {} });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(`${base}/manifest.webmanifest`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/manifest\+json/);
  assert.equal(response.headers.get('cache-control'), 'no-cache');
  const manifest = await response.json();
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.scope, './');
  for (const icon of manifest.icons) {
    const image = await fetch(`${base}/${icon.src}`);
    assert.equal(image.headers.get('content-type'), 'image/png');
    const png = Buffer.from(await image.arrayBuffer());
    assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`, icon.sizes);
  }
  assert.equal((await fetch(`${base}/sw.js`)).headers.get('cache-control'), 'no-cache');
});

test('worker leaves API and non-navigation requests alone and recovers failed navigation', async () => {
  const listeners = {};
  const offline = { offline: true };
  let requests = 0;
  vm.runInNewContext(await readFile('sw.js', 'utf8'), {
    URL,
    self: { registration: { scope: 'https://example.com/prepx/' }, location: { origin: 'https://example.com' }, addEventListener: (name, fn) => { listeners[name] = fn; } },
    fetch: async () => { requests++; throw new Error('offline'); },
    caches: { match: async url => { assert.equal(url, 'https://example.com/prepx/offline.html'); return offline; } }
  });
  const invoke = request => {
    let result;
    listeners.fetch({ request, respondWith: response => { result = response; } });
    return result;
  };
  for (const request of [
    { method: 'POST', mode: 'navigate', url: 'https://example.com/api/submit-exam' },
    { method: 'GET', mode: 'cors', url: 'https://example.com/api/subjects' },
    { method: 'GET', mode: 'no-cors', url: 'https://example.com/prepx/practice.js' },
    { method: 'GET', mode: 'navigate', url: 'https://other.example/' }
  ]) assert.equal(invoke(request), undefined);
  assert.equal(requests, 0);
  assert.equal(await invoke({ method: 'GET', mode: 'navigate', url: 'https://example.com/prepx/physics-exam.html' }), offline);
  assert.equal(requests, 1);
});
