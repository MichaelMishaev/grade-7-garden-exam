import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceMovement, createMovement, syncMovement } from '../movement.js';

const start = { x: 1, y: 1 };
const canWalk = (x, y) => x >= 1 && x <= 5 && y >= 1 && y <= 5;
const east = { direction: { dx: 1, dy: 0 }, canWalk };
const step = (movement, options = {}) => advanceMovement(movement, { ...east, dt: 1 / 60, ...options });

test('walking accelerates from the tile center instead of teleporting', () => {
  const initial = Object.freeze(createMovement(start));
  const { movement, arrived } = step(initial);
  assert.equal(arrived, null);
  assert.ok(movement.position.x > 1 && movement.position.x < 1.01);
  assert.equal(movement.position.y, 1);
  assert.ok(movement.speed > 0 && movement.speed < 3.2);
  assert.equal(initial.position.x, 1);
});

test('analytic walking profile matches at 50, 60 and 120 fps', () => {
  const positions = [];
  for (const fps of [50, 60, 120]) {
    let movement = createMovement(start);
    for (let i = 0; i < fps / 2; i++) movement = step(movement, { dt: 1 / fps }).movement;
    positions.push(movement.position.x);
    assert.ok(movement.position.x > 1.9 && movement.position.x < 2);
    assert.ok(movement.speed < 1.3);
  }
  assert.ok(Math.max(...positions) - Math.min(...positions) < 1e-12);
});

test('release finishes the accepted cell, brakes and reports one exact arrival', () => {
  let movement = step(createMovement(start)).movement;
  let arrivals = 0;
  for (let i = 0; i < 80; i++) {
    const result = advanceMovement(movement, { dt: 1 / 60, canWalk });
    movement = result.movement;
    if (result.arrived) {
      arrivals++;
      assert.deepEqual(result.arrived, { x: 2, y: 1, dx: 1, dy: 0 });
    }
    assert.ok(movement.position.x <= 2);
  }
  assert.equal(arrivals, 1);
  assert.deepEqual(movement.position, { x: 2, y: 1 });
  assert.equal(movement.speed, 0);
  assert.equal(movement.moving, false);
});

test('walls, diagonal directions, distant route cells and invalid inputs do not move', () => {
  const movement = createMovement(start);
  for (const options of [
    { direction: { dx: -1, dy: 0 } }, { direction: { dx: 1, dy: 1 } },
    { direction: { dx: NaN, dy: 0 } }, { direction: { dx: 0.5, dy: 0 } },
    { direction: null, nextCell: { x: 3, y: 1 } },
    { direction: null, nextCell: { x: 2, y: 2 } }, { canWalk: null },
    { dt: 0 }, { dt: -1 }, { dt: Infinity }, { dt: NaN },
  ]) assert.strictEqual(step(movement, options).movement, movement);
  assert.throws(() => createMovement({ x: 0.2, y: 1 }), TypeError);
});

test('pause freezes position, velocity, heading and segment time', () => {
  const movement = step(createMovement(start)).movement;
  assert.strictEqual(step(movement, { paused: true, dt: 10 }).movement, movement);
});

test('retargeting cannot change a segment or cut a corner; sync aligns jumps', () => {
  const movement = step(createMovement(start)).movement;
  const turned = step(movement, { direction: { dx: 0, dy: 1 } }).movement;
  assert.equal(turned.position.y, 1);
  assert.deepEqual(turned.target, { x: 2, y: 1 });
  assert.strictEqual(syncMovement(turned, start), turned);
  const reset = syncMovement(turned, { x: 4, y: 5 });
  assert.deepEqual(reset.position, { x: 4, y: 5 });
  assert.equal(reset.target, null);
  assert.equal(reset.speed, 0);
});

test('held input repeats after commits, routes accept only adjacent walkable cells', () => {
  let movement = createMovement(start);
  const arrivals = [];
  for (let i = 0; i < 180; i++) {
    const result = step(movement);
    movement = result.movement;
    if (result.arrived) arrivals.push(result.arrived.x);
  }
  assert.deepEqual(arrivals, [2, 3, 4, 5]);
  assert.deepEqual(movement.position, { x: 5, y: 1 });
  const routed = advanceMovement(createMovement(start), { nextCell: { x: 1, y: 2 }, canWalk, dt: 0.02 });
  assert.ok(routed.movement.position.y > 1);
  assert.equal(routed.movement.position.x, 1);
});

test('long frame gaps are clamped and headings remain finite', () => {
  const result = step(createMovement(start), { dt: 500 });
  assert.ok(result.movement.position.x < 1.1);
  assert.equal(result.arrived, null);
  assert.ok(Number.isFinite(result.movement.heading));
});

test('continuous held walking carries velocity across internal cell boundaries', () => {
  let movement = createMovement(start);
  const speeds = [];
  for (let i = 0; i < 180; i++) {
    const result = step(movement, { continuous: true });
    movement = result.movement;
    if (result.arrived) speeds.push(movement.speed);
  }
  assert.equal(speeds.length, 4);
  assert.ok(speeds.slice(0, 3).every(speed => Math.abs(speed - 2.7) < 1e-12));
  assert.equal(speeds[3], 0);
});

test('release during continuous travel finishes at the next center with zero speed', () => {
  for (const frames of [8, 20, 28]) {
    let movement = createMovement(start);
    for (let i = 0; i < frames; i++) movement = step(movement, { continuous: true }).movement;
    const target = { ...movement.target };
    let arrived = null;
    for (let i = 0; i < 120 && !arrived; i++) {
      const result = advanceMovement(movement, { dt: 1 / 60, canWalk, continuous: false });
      movement = result.movement;
      arrived = result.arrived;
    }
    assert.deepEqual(movement.position, target);
    assert.equal(movement.speed, 0);
  }
});

test('north-facing heading uses the renderer Three.js convention', () => {
  const movement = createMovement({ x: 2, y: 2 });
  const result = step(movement, { direction: { dx: 0, dy: -1 } });
  assert.equal(result.movement.heading, 0);
  assert.ok(step(movement).movement.heading < 0);
});
