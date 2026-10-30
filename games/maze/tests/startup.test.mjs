import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const guard = html.match(/<script id="file-open-guard">([\s\S]*?)<\/script>/)?.[1];

test('direct-file startup recovers before blocked game modules with a playable HTTPS link', () => {
  assert.ok(guard);
  assert.ok(html.indexOf('id="file-open-guard"') < html.indexOf('type="module"'));
  const nodes = new Map();
  const node = key => { if (!nodes.has(key)) nodes.set(key, {}); return nodes.get(key); };
  let replacement;
  node('start-button').replaceWith = link => { replacement = link; };
  runInNewContext(guard, {
    location: { protocol: 'file:' },
    document: { querySelector: node, getElementById: node, createElement: () => ({}) }
  });
  assert.equal(replacement.id, 'file-open-game');
  assert.equal(replacement.href, 'https://hitech.agnon.online/games/maze/play/index.html');
  assert.ok(replacement.textContent.includes('לפתוח את המשחק'));
  assert.equal(node('quiz-select').hidden, true);
  assert.equal(node('.controls').hidden, true);
  assert.equal(node('pause-button').disabled, true);
  assert.ok(node('notice').textContent.includes('הקישור'));
});

test('served startup leaves the existing game and expedition untouched', () => {
  for (const protocol of ['http:', 'https:']) {
    runInNewContext(guard, { location: { protocol }, document: new Proxy({}, { get: () => { throw new Error('Served page must remain untouched'); } }) });
  }
});
