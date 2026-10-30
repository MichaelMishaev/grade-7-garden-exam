import test from 'node:test';
import assert from 'node:assert/strict';
import { MAZE, START, EXIT, isWalkable, pathTo, createState, transition, restoreState, currentQuestion, progress } from '../core.js';
import { WORLD_ENTITIES, WATER_BOWL, createWorld, normalizeWorld, worldEntityPosition, nearbyWorldEntity, interactWorld, updateWorld } from '../world.js';
const QUESTIONS = Array.from({ length: 6 }, (_, i) => ({ id: `world-fixture-${i}`, prompt: 'שאלה לבדיקה', choices: ['א', 'ב'], correct: 0, difficulty: 'medium', explanation: { he: 'הסבר בדיקה' }, ref: { id: 'test', part: '1' } }));
const entity = id => WORLD_ENTITIES.find(item => item.id === id);
const fresh = () => createState(QUESTIONS, () => 0.999999);
const academic = state => JSON.stringify({ answers: state.answers, coins: state.coins, hearts: state.hearts, seals: state.seals, sealProofs: state.sealProofs, resolved: state.resolved, progress: progress(state, QUESTIONS) });
const interact = (world, id, at = entity(id), ms = 0) => interactWorld(world, id, at, ms).world;

// Pin the previous footprint so larger worlds cannot invalidate an active saved position.
const ORIGINAL = [
  '#################', '#S..#.....#....X#', '#.#.#.###.#.###.#', '#.#...#...#.....#', '#.#####.#####.#.#',
  '#...A...#..B..#.#', '###.#.###.#.###.#', '#...#.....#.....#', '#.#######.#####.#', '#...C...#...G...#',
  '#.###.#.###.#.#.#', '#.....#.....#T..#', '#################'
];

test('larger connected map preserves all previous walkable coordinates and adds garden/ruins loops', () => {
  assert.equal(MAZE.length, 17); assert.ok(MAZE.every(row => row.length === 23));
  for (let y = 0; y < ORIGINAL.length; y++) for (let x = 0; x < ORIGINAL[y].length; x++) if (ORIGINAL[y][x] !== '#') assert.ok(isWalkable(x, y), `saved tile ${x},${y} stays walkable`);
  let count = 0;
  for (let y = 0; y < MAZE.length; y++) for (let x = 0; x < MAZE[y].length; x++) if (isWalkable(x, y)) { count++; assert.ok(pathTo(START, { x, y }), `new tile ${x},${y} connects`); }
  assert.ok(count > 180, 'larger world has substantial new exploration space');
  for (const y of [3, 7, 11]) assert.ok(isWalkable(16, y));
  for (const x of [3, 9, 15]) assert.ok(isWalkable(x, 12));
});

test('all people, animals, objects and their movement paths remain reachable', () => {
  assert.equal(WORLD_ENTITIES.filter(item => item.kind === 'human').length, 2);
  for (const item of WORLD_ENTITIES) {
    assert.ok(pathTo(START, item)); assert.ok(pathTo(item, EXIT));
    for (const point of item.path || []) assert.ok(isWalkable(point.x, point.y));
  }
  assert.ok(pathTo(START, WATER_BOWL));
});

test('human movement is smooth and stays within collision-safe shared corridor waypoints', () => {
  for (const item of WORLD_ENTITIES.filter(item => item.path)) {
    let previous = worldEntityPosition(item, 0, createWorld());
    for (let ms = 100; ms < 15000; ms += 100) {
      const position = worldEntityPosition(item, ms, createWorld());
      assert.ok(isWalkable(Math.round(position.x), Math.round(position.y)));
      assert.ok(Math.hypot(position.x - previous.x, position.y - previous.y) < 0.1, 'no waypoint teleport');
      previous = position;
    }
  }
});

test('nearby interaction follows authoritative moving NPC position and rejects remote or invalid requests', () => {
  const world = createWorld(), scout = entity('scout');
  assert.equal(nearbyWorldEntity(START, world), null);
  assert.equal(interactWorld(world, scout.id, START), null);
  assert.equal(interactWorld(world, 'unknown', scout), null);
  assert.equal(interactWorld(world, scout.id, { x: NaN, y: scout.y }), null);
  assert.equal(nearbyWorldEntity(scout, world).id, scout.id);
  assert.equal(interactWorld(world, scout.id, { x: 2, y: 7 }, 2400).entity.id, scout.id);
});

test('all friendly interactions have idempotent effects without changing academic state or resources', () => {
  let state = fresh();
  for (const item of WORLD_ENTITIES) {
    state.player = { x: item.x, y: item.y };
    const before = academic(state);
    state = transition(state, { type: 'world-interact', entityId: item.id }, QUESTIONS);
    assert.equal(state.phase, 'explore'); assert.equal(academic(state), before);
    assert.equal(state.world.interactions[item.id], 1);
    const once = JSON.stringify(state.world);
    state = transition(state, { type: 'world-interact', entityId: item.id }, QUESTIONS);
    assert.equal(JSON.stringify(state.world), once, `${item.id} repeated effect is stable`);
  }
  assert.equal(Object.keys(state.world.interactions).length, WORLD_ENTITIES.length);
  assert.ok(state.world.scoutGuided); assert.ok(state.world.lightsOn); assert.ok(state.world.waterFilled);
  assert.ok(state.world.rabbitCalm); assert.ok(state.world.owlObserved); assert.ok(state.world.benchRested);
});

test('core guards against interacting remotely, during questions, capture or pause', () => {
  let state = fresh();
  assert.equal(transition(state, { type: 'world-interact', entityId: 'pump' }, QUESTIONS), state);
  state.player = { x: 17, y: 11 };
  for (const phase of ['question', 'feedback', 'capture', 'review', 'complete']) {
    const blocked = { ...state, phase };
    assert.equal(transition(blocked, { type: 'world-interact', entityId: 'pump' }, QUESTIONS), blocked);
  }
  const paused = { ...state, paused: true };
  assert.equal(transition(paused, { type: 'world-interact', entityId: 'pump' }, QUESTIONS), paused);
});

test('filling water moves the fox along actual paths until it visibly drinks at the bowl', () => {
  let world = interact(createWorld(), 'pump');
  assert.ok(world.waterFilled); assert.equal(world.foxFollowing, false);
  let previous = { x: world.fox.x, y: world.fox.y };
  for (let ms = 650; ms <= 30000; ms += 650) {
    world = updateWorld(world, { type: 'tick', elapsedMs: ms, player: START }, pathTo);
    assert.ok(isWalkable(world.fox.x, world.fox.y));
    assert.ok(Math.abs(world.fox.x - previous.x) + Math.abs(world.fox.y - previous.y) <= 1, 'fox only takes adjacent waypoints');
    const interpolated = worldEntityPosition(entity('fox'), ms + 275, world);
    assert.ok(isWalkable(Math.round(interpolated.x), Math.round(interpolated.y)));
    previous = { x: world.fox.x, y: world.fox.y };
  }
  assert.equal(world.fox.x, WATER_BOWL.x); assert.equal(world.fox.y, WATER_BOWL.y); assert.ok(world.foxDrinking);
});

test('helped fox follows around walls and stops adjacent to the player rather than teleporting', () => {
  let world = interact(createWorld(), 'pump');
  for (let ms = 650; ms <= 15000; ms += 650) world = updateWorld(world, { type: 'tick', elapsedMs: ms, player: START }, pathTo);
  world = interact(world, 'fox', WATER_BOWL, 15000);
  assert.ok(world.foxFollowing); assert.equal(world.foxDrinking, false);
  const player = { x: 15, y: 11 };
  for (let ms = 15600; ms <= 40000; ms += 650) {
    const previous = { x: world.fox.x, y: world.fox.y };
    world = updateWorld(world, { type: 'tick', elapsedMs: ms, player }, pathTo);
    assert.ok(isWalkable(world.fox.x, world.fox.y));
    assert.ok(Math.abs(world.fox.x - previous.x) + Math.abs(world.fox.y - previous.y) <= 1);
  }
  assert.equal(pathTo({ x: world.fox.x, y: world.fox.y }, player).length, 1);
});

test('world changes survive reload and capture recovery without touching original progress', () => {
  let state = fresh(); state.player = { x: 17, y: 11 };
  state = transition(state, { type: 'world-interact', entityId: 'pump' }, QUESTIONS);
  state.world = interact(state.world, 'keeper');
  state = restoreState(JSON.stringify(state), QUESTIONS);
  assert.ok(state.world.waterFilled); assert.ok(state.world.lightsOn);
  const expected = { ...state.world, dialogue: null };
  state.hearts = 0; state.phase = 'capture';
  state = transition(state, { type: 'skip-capture' }, QUESTIONS);
  state = transition(state, { type: 'guided-continue' }, QUESTIONS);
  assert.equal(state.phase, 'explore'); assert.deepEqual(state.world, expected);
});

test('older saved expeditions gain default world state while retaining answers and seals', () => {
  const saved = fresh(); const q = QUESTIONS[0];
  saved.answers[q.id] = { choice: q.correct, correct: true }; saved.coins = 10;
  delete saved.world;
  const restored = restoreState(saved, QUESTIONS);
  assert.deepEqual(restored.world, createWorld()); assert.deepEqual(restored.answers, saved.answers); assert.equal(restored.coins, 10);
});

test('corrupt world movement repairs safely and never renders saved arbitrary dialogue', () => {
  const raw = createWorld(); raw.fox = { x: 0, y: 0, previous: { x: 200, y: 200 }, startedMs: Number.MAX_VALUE };
  raw.foxFollowing = true; raw.dialogue = { text: '<script>bad</script>' }; raw.interactions = { unknown: 99, owl: 1 };
  const normalized = normalizeWorld(raw, isWalkable, 1000);
  assert.equal(normalized.fox.x, 19); assert.equal(normalized.fox.y, 7); assert.equal(normalized.foxFollowing, false);
  assert.equal(normalized.dialogue, null); assert.deepEqual(normalized.interactions, { owl: 1 });
  raw.waterFilled = true; raw.fox = { x: 19, y: 7, previous: { x: 1, y: 1 }, startedMs: 100000 }; raw.foxMoveMs = 100000;
  const repaired = normalizeWorld(raw, isWalkable, 1000);
  assert.deepEqual(repaired.fox.previous, { x: 19, y: 7 }); assert.equal(repaired.fox.startedMs, 0); assert.equal(repaired.foxMoveMs, 0);
});

test('resting visibly records a bench visit and walking ends the resting state', () => {
  let state = fresh(); state.player = { x: 9, y: 15 };
  state = transition(state, { type: 'world-interact', entityId: 'bench' }, QUESTIONS);
  assert.ok(state.world.benchRested); assert.ok(state.world.playerResting);
  state = transition(state, { type: 'move', dx: 1, dy: 0 }, QUESTIONS);
  assert.ok(state.world.benchRested); assert.equal(state.world.playerResting, false);
});
