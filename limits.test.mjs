import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLimiter, createCounter, cachedFor, clientOf, intFrom } from './limits.mjs';

test('the limiter holds per client and in all, expires after the window and gives released slots back', () => {
  let t = 0;
  const limiter = createLimiter({ perClient: 2, global: 3, windowMs: 1000, now: () => t });
  const a1 = limiter.take('a'); limiter.take('a');
  assert.equal(limiter.take('a'), null);
  assert.ok(limiter.take('b'));
  assert.equal(limiter.take('c'), null); // global 3 used
  a1.release();
  assert.ok(limiter.take('c'));
  t = 1500;
  assert.ok(limiter.take('a') && limiter.take('a') && limiter.take('b'));
});

test('the number of remembered clients is bounded (and expired ones are dropped first)', () => {
  let t = 0;
  const limiter = createLimiter({ perClient: 5, global: 1e6, windowMs: 1000, maxClients: 50, now: () => t });
  for (let i = 0; i < 500; i++) { t += 1; limiter.take(`client-${i}`); }
  assert.ok(limiter.size() <= 50);
  t += 5000;
  limiter.take('late');
  for (let i = 0; i < 60; i++) limiter.take(`other-${i}`);
  assert.ok(limiter.size() <= 50);
});

test('the daily counter never holds more than its cap and forgets old calls', () => {
  let t = 0;
  const counter = createCounter({ cap: 3, windowMs: 1000, now: () => t });
  for (let i = 0; i < 10; i++) counter.spend();
  assert.equal(counter.used(), 3);
  assert.equal(counter.available(), false);
  t = 2000;
  assert.equal(counter.available(), true);
  assert.equal(createCounter({ cap: 0 }).available(), false);
});

test('cachedFor shares concurrent calls, caches for the time given and does not cache a failure', async () => {
  let t = 0; let calls = 0; let fail = true;
  const read = cachedFor(15000, async () => { calls++; if (fail) throw new Error('down'); return calls; }, () => t);
  await assert.rejects(read());
  fail = false;
  const [x, y] = await Promise.all([read(), read()]);
  assert.equal(x, y);
  assert.equal(calls, 2);
  t = 14000; await read(); assert.equal(calls, 2);
  t = 16000; await read(); assert.equal(calls, 3);
});

test('clientOf takes the last forwarded hop, else the socket; intFrom accepts only plain positive integers', () => {
  assert.equal(clientOf({ headers: { 'x-forwarded-for': 'spoof, 9.9.9.9' }, socket: { remoteAddress: '::1' } }), '9.9.9.9');
  assert.equal(clientOf({ headers: {}, socket: { remoteAddress: '::1' } }), '::1');
  assert.equal(clientOf({ headers: { 'x-forwarded-for': ' ' }, socket: { remoteAddress: '::2' } }), '::2');
  assert.deepEqual(['5', ' 7 ', '0', '-1', '1e3', 'x', undefined, '12345678901'].map((v) => intFrom(v, 99)), [5, 7, 99, 99, 99, 99, 99, 99]);
  assert.equal(intFrom('0', 400, { min: 0 }), 0);
});
