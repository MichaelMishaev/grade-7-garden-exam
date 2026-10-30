import test from 'node:test';
import assert from 'node:assert/strict';
import { createGreetings, advanceGreetings } from '../greetings.js';
import { createWorld } from '../world.js';

const world = createWorld();
const update = (state, options = {}) => advanceGreetings(state, { dt: 16, player: { x: 3, y: 7 }, world, elapsedMs: 0, ...options });

test('approaching either person produces a short greeting without changing saved world state', () => {
  const before = JSON.stringify(world);
  for (const [id, player] of [['scout', { x: 3, y: 7 }], ['keeper', { x: 19, y: 3 }]]) {
    const next = update(createGreetings(), { player });
    assert.equal(next.active.entityId, id);
    assert.match(next.active.text, /היי|שלום/);
    assert.ok(next.active.text.length < 65);
  }
  assert.equal(JSON.stringify(world), before);
});

test('fox rabbit and owl each react to a nearby player, without greeting from static objects', () => {
  for (const [id, player] of [['fox', { x: 19, y: 7 }], ['rabbit', { x: 21, y: 11 }], ['owl', { x: 15, y: 15 }]]) assert.equal(update(createGreetings(), { player }).active.entityId, id);
  for (const player of [{ x: 17, y: 11 }, { x: 9, y: 15 }]) assert.equal(update(createGreetings(), { player }).active, null);
});

test('remaining near a person never repeats or extends the greeting', () => {
  let state = update(createGreetings());
  for (let i = 0; i < 100; i++) state = update(state, { dt: 1000 });
  assert.equal(state.active, null);
  assert.equal(state.sequence, 1);
});

test('edge jitter and a quick return do not retrigger; a later fresh approach does', () => {
  let state = update(createGreetings());
  state = update(state, { dt: 4000, player: { x: 3, y: 5.2 } });
  state = update(state, { dt: 100, player: { x: 3, y: 7 } });
  assert.equal(state.sequence, 1, 'inside the hysteresis band is still the same approach');
  state = update(state, { player: { x: 3, y: 4 } });
  state = update(state);
  assert.equal(state.sequence, 1, 'return during cooldown does not repeat');
  state = update(state, { dt: 15000 });
  assert.equal(state.sequence, 1, 'cooldown expiration while lingering is silent');
  state = update(state, { player: { x: 3, y: 4 } });
  state = update(state);
  assert.equal(state.sequence, 2);
});

test('pause freezes the greeting timer, while questions and capture clear scene messages', () => {
  const state = update(createGreetings());
  assert.strictEqual(update(state, { paused: true, dt: 20000 }), state);
  for (const phase of ['question', 'feedback', 'capture', 'review', 'complete']) {
    const next = update(state, { phase });
    assert.equal(next.active, null);
    assert.equal(next.clockMs, state.clockMs);
    assert.equal(next.sequence, state.sequence);
  }
});

test('proximity follows interpolated human and fox positions rather than their spawn tiles', () => {
  assert.equal(update(createGreetings(), { player: { x: 1, y: 7 }, elapsedMs: 4800 }).active.entityId, 'scout');
  assert.equal(update(createGreetings(), { player: { x: 3, y: 7 }, elapsedMs: 4800 }).active, null);
  const moved = createWorld(); moved.fox = { x: 19, y: 11, previous: { x: 19, y: 10 }, startedMs: 1000 };
  assert.equal(update(createGreetings(), { player: { x: 19, y: 12 }, world: moved, elapsedMs: 1550 }).active.entityId, 'fox');
});

test('invalid coordinates or elapsed deltas do not break an existing greeting', () => {
  const state = update(createGreetings());
  for (const options of [{ dt: NaN }, { dt: -1 }, { dt: Infinity }, { player: null }, { player: { x: NaN, y: 7 } }]) assert.strictEqual(update(state, options), state);
});

test('an animal message cannot swallow a person who approaches before it finishes', () => {
  let state = update(createGreetings(), { player: { x: 19, y: 7 } });
  assert.equal(state.active.entityId, 'fox');
  const accompanying = createWorld(); accompanying.foxFollowing = true;
  accompanying.fox = { x: 19, y: 4, previous: { x: 19, y: 4 }, startedMs: 0 };
  state = update(state, { dt: 100, player: { x: 19, y: 3 }, world: accompanying });
  assert.equal(state.active.entityId, 'fox', 'a readable nearby message finishes first');
  assert.equal(state.nearby.keeper, false, 'the unspoken keeper remains eligible');
  state = update(state, { dt: 3400, player: { x: 19, y: 3 }, world: accompanying });
  assert.equal(state.active.entityId, 'keeper');
  assert.match(state.active.text, /שלום/);
  assert.equal(state.sequence, 2);
});

test('walking out of range immediately clears the old speech and permits a new nearby speaker', () => {
  const initial = update(createGreetings());
  const away = update(initial, { player: { x: 3, y: 4 } });
  assert.equal(away.active, null);
  assert.equal(away.sequence, 1);
  const keeper = update(initial, { player: { x: 19, y: 3 } });
  assert.equal(keeper.active.entityId, 'keeper');
  assert.equal(keeper.sequence, 2);
});
