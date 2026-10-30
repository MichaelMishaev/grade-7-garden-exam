import test from 'node:test';
import assert from 'node:assert/strict';
import { allowedActions, createInteractions, reduceInteraction } from '../interactions.js';

const active = { phase: 'question', answered: 1, total: 3 };

test('looking is bounded in either direction and can return to center', () => {
  let state = createInteractions();
  for (let i = 0; i < 20; i++) state = reduceInteraction(state, 'look-left', active);
  assert.equal(state.lookYaw, 0.42);
  for (let i = 0; i < 20; i++) state = reduceInteraction(state, 'look-right', active);
  assert.equal(state.lookYaw, -0.42);
  assert.equal(reduceInteraction(state, 'look-center', active).lookYaw, 0);
});

test('lantern changes the scene light state reversibly', () => {
  const raised = reduceInteraction(createInteractions(), 'lantern', active);
  assert.equal(raised.lanternRaised, true);
  assert.equal(reduceInteraction(raised, 'lantern', active).lanternRaised, false);
});

test('bar rattle expires in less than 600ms and ignores invalid deltas', () => {
  const shaken = reduceInteraction(createInteractions(), 'rattle', active);
  assert.equal(shaken.rattleMs, 480);
  const ticking = reduceInteraction(shaken, { type: 'tick', ms: 200 }, active);
  assert.equal(ticking.rattleMs, 280);
  assert.equal(shaken.rattleMs, 480);
  for (const ms of [NaN, Infinity, -10, 0]) assert.strictEqual(reduceInteraction(ticking, { type: 'tick', ms }, active), ticking);
  assert.equal(reduceInteraction(ticking, { type: 'tick', ms: 400 }, active).rattleMs, 0);
});

test('pause freezes interactions and ticking; other phases reject scene actions', () => {
  const state = reduceInteraction(createInteractions(), 'rattle', active);
  for (const type of [...allowedActions, 'tick']) {
    assert.strictEqual(reduceInteraction(state, { type, ms: 500 }, { ...active, paused: true }), state);
    for (const phase of ['explore', 'complete', 'menu', undefined]) {
      assert.strictEqual(reduceInteraction(state, { type, ms: 500 }, { phase }), state);
    }
  }
});

test('reduced motion retains the reaction notice without shaking', () => {
  const state = reduceInteraction(createInteractions(), 'rattle', { ...active, reducedMotion: true });
  assert.equal(state.rattleMs, 0);
  assert.match(state.notice, /השומר/);
});

test('inspect reports encounter or recovery progress without unlocking', () => {
  assert.match(reduceInteraction(createInteractions(), 'inspect', active).notice, /1 מתוך 3/);
  assert.match(reduceInteraction(createInteractions(), 'inspect', { phase: 'capture' }).notice, /סגור/);
  for (const phase of ['review', 'review-feedback']) {
    const state = reduceInteraction(createInteractions(), 'inspect', { phase, reviewIndex: 1 });
    assert.equal(state.lockInspected, true);
    assert.match(state.notice, /שלב חילוץ 2/);
  }
});

test('all actions leave the academic context untouched and reset only scene state', () => {
  const context = Object.freeze({ ...active, hearts: 1, coins: 20, answers: Object.freeze({ q1: false }), review: Object.freeze({ index: 0 }) });
  const before = JSON.stringify(context);
  let state = Object.freeze(createInteractions());
  for (const type of allowedActions) state = reduceInteraction(Object.freeze(state), { type }, context);
  assert.equal(JSON.stringify(context), before);
  assert.deepEqual(Object.keys(state).sort(), Object.keys(createInteractions()).sort());
  assert.deepEqual(reduceInteraction(state, 'reset', { paused: true }), createInteractions());
  assert.strictEqual(reduceInteraction(state, 'unknown', active), state);
});
