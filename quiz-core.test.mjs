import { test } from 'node:test';
import assert from 'node:assert/strict';
import './quiz-core.js';

const { scoreQuiz, starsFor, feedbackTier, shuffled, shuffleChoices, missedQuestions, scheduleReask, streakCelebrates, WEIGHT } = globalThis.QuizCore;

const mixed = [
  ...[1, 2, 3].map(n => ({ id: `e${n}`, type: 'mc', difficulty: 'easy' })),
  ...[1, 2, 3].map(n => ({ id: `m${n}`, type: 'mc', difficulty: 'medium' })),
  ...[1, 2, 3, 4].map(n => ({ id: `h${n}`, type: 'mc', difficulty: 'hard' }))
];
const allCorrect = Object.fromEntries(mixed.map(q => [q.id, 1]));

// small deterministic LCG
const seeded = seed => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

test('WEIGHT values', () => {
  assert.deepEqual(WEIGHT, { easy: 1, medium: 1.5, hard: 2 });
});

test('perfect score is exactly 100 for mixed difficulties', () => {
  assert.deepEqual(scoreQuiz(mixed, allCorrect), { earned: 100, pending: 0, max: 100, percent: 100 });
});

test('scores are always whole numbers', () => {
  for (let seed = 1; seed <= 50; seed++) {
    const rng = seeded(seed);
    const results = Object.fromEntries(mixed.map(q => [q.id, rng()]));
    const s = scoreQuiz(mixed, results);
    for (const key of ['earned', 'pending', 'max', 'percent']) assert.ok(Number.isInteger(s[key]), `${key} ${s[key]}`);
  }
});

test('partial credit fraction', () => {
  const qs = [{ id: 'a', difficulty: 'easy' }, { id: 'b', difficulty: 'easy' }];
  assert.deepEqual(scoreQuiz(qs, { a: 0.75, b: 0.75 }), { earned: 75, pending: 0, max: 100, percent: 75 });
  assert.equal(scoreQuiz(qs, { a: 0.75, b: 0 }).earned, 38);
});

test('open questions are pending and excluded from earned and denominator', () => {
  const qs = [
    { id: 'a', type: 'mc', difficulty: 'medium' },
    { id: 'b', type: 'mc', difficulty: 'medium' },
    { id: 'o', type: 'open', difficulty: 'medium' }
  ];
  const s = scoreQuiz(qs, { a: 1, b: 1, o: 1 });
  assert.deepEqual(s, { earned: 67, pending: 33, max: 100, percent: 100 });
  assert.equal(scoreQuiz(qs, { a: 1, b: 0, o: 1 }).percent, 49);
  assert.deepEqual(scoreQuiz([{ id: 'o', type: 'open' }], {}), { earned: 0, pending: 100, max: 100, percent: 0 });
});

test('empty input', () => {
  assert.deepEqual(scoreQuiz([], {}), { earned: 0, pending: 0, max: 100, percent: 0 });
});

test('missing result counts as 0 and unknown difficulty as medium', () => {
  assert.deepEqual(scoreQuiz(mixed, {}), { earned: 0, pending: 0, max: 100, percent: 0 });
  const qs = [{ id: 'a' }, { id: 'b', difficulty: 'bogus' }, { id: 'c', difficulty: 'medium' }];
  assert.deepEqual(scoreQuiz(qs, { a: 1, b: 1, c: 1 }), { earned: 100, pending: 0, max: 100, percent: 100 });
});

test('out-of-range fractions are clamped', () => {
  const qs = [{ id: 'a', difficulty: 'easy' }, { id: 'b', difficulty: 'easy' }];
  assert.equal(scoreQuiz(qs, { a: 5, b: -3 }).earned, 50);
  assert.equal(scoreQuiz(qs, { a: 5, b: 5 }).percent, 100);
});

test('starsFor boundaries', () => {
  const cases = [[0, 0], [49, 0], [50, 1], [74, 1], [75, 2], [89, 2], [90, 3], [100, 3]];
  for (const [pct, stars] of cases) assert.equal(starsFor(pct), stars, String(pct));
});

test('feedbackTier boundaries', () => {
  const cases = [[0, 'low'], [49, 'low'], [50, 'ok'], [74, 'ok'], [75, 'ok'], [89, 'ok'], [90, 'great'], [100, 'great']];
  for (const [pct, tier] of cases) assert.equal(feedbackTier(pct), tier, String(pct));
});

test('shuffled returns a new array, keeps elements, does not mutate', () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8];
  const copy = input.slice();
  const out = shuffled(input, seeded(7));
  assert.notEqual(out, input);
  assert.deepEqual(input, copy);
  assert.deepEqual(out.slice().sort((a, b) => a - b), copy);
  assert.deepEqual(shuffled(input, seeded(7)), out);
  assert.ok([1, 2, 3, 4, 5].some(seed => shuffled(input, seeded(seed)).join() !== copy.join()));
  assert.deepEqual(shuffled([], seeded(1)), []);
});

test('shuffleChoices keeps correct pointing at the same original choice', () => {
  const question = { id: 'q', prompt: 'p', choices: ['a', 'b', 'c', 'd'], correct: 2, he: 'x' };
  const dup = { id: 'd', choices: ['same', 'same', 'other', 'same'], correct: 1 };
  for (let seed = 1; seed <= 200; seed++) {
    const out = shuffleChoices(question, seeded(seed));
    assert.equal(out.choices[out.correct], 'c');
    assert.deepEqual(out.choices.slice().sort(), ['a', 'b', 'c', 'd']);
    assert.equal(out.id, 'q');
    assert.equal(out.he, 'x');

    // with duplicates, track by index: the 'other' choice is unique so mark it correct
    const d = shuffleChoices({ ...dup, correct: 2 }, seeded(seed));
    assert.equal(d.choices[d.correct], 'other');
    assert.equal(d.choices.filter(c => c === 'same').length, 3);

    // correct on a duplicated string must land on a duplicate, never on 'other'
    const e = shuffleChoices(dup, seeded(seed));
    assert.equal(e.choices[e.correct], 'same');
  }
});

test('shuffleChoices maps the exact original index when duplicates exist', () => {
  const q = { choices: ['x', 'x'], correct: 1 };
  // rng() = 0 swaps position 1 with 0 => original index 1 moves to position 0
  const out = shuffleChoices(q, () => 0);
  assert.equal(out.correct, 0);
});

test('shuffleChoices does not mutate input', () => {
  const question = { choices: ['a', 'b', 'c'], correct: 1 };
  const snapshot = structuredClone(question);
  const out = shuffleChoices(question, seeded(3));
  assert.deepEqual(question, snapshot);
  assert.notEqual(out, question);
  assert.notEqual(out.choices, question.choices);
});

test('missedQuestions', () => {
  const qs = [
    { id: 'a', type: 'mc' },
    { id: 'b', type: 'mc' },
    { id: 'c', type: 'mc' },
    { id: 'd', type: 'mc' },
    { id: 'o', type: 'open' }
  ];
  const missed = missedQuestions(qs, { a: 1, b: 0.5, c: 0 });
  assert.deepEqual(missed.map(q => q.id), ['b', 'c', 'd']);
  assert.deepEqual(missedQuestions(qs, { a: 1, b: 1, c: 1, d: 1 }), []);
});

test('scheduleReask positions', () => {
  const queue = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(id => ({ id }));
  const q = { id: 'x', prompt: 'p' };
  const mid = scheduleReask(queue, 0, q);
  assert.deepEqual(mid.map(i => i.id), ['a', 'b', 'c', 'd', 'x', 'e', 'f', 'g', 'h']);
  assert.equal(mid[4].reask, true);

  const near = scheduleReask(queue, 6, q);
  assert.equal(near.length, 9);
  assert.equal(near[8].id, 'x');
  assert.equal(near[8].reask, true);

  assert.deepEqual(scheduleReask(queue, 0, q, 1).map(i => i.id).slice(0, 3), ['a', 'b', 'x']);
  assert.equal(scheduleReask([], 0, q)[0].id, 'x');
});

test('scheduleReask does not mutate inputs', () => {
  const queue = [{ id: 'a' }, { id: 'b' }];
  const q = { id: 'x' };
  const out = scheduleReask(queue, 0, q);
  assert.equal(queue.length, 2);
  assert.equal(q.reask, undefined);
  assert.notEqual(out.find(i => i.id === 'x'), q);
});

test('streakCelebrates', () => {
  const cases = [[0, false], [1, false], [2, false], [3, true], [4, false], [6, true]];
  for (const [streak, expected] of cases) assert.equal(streakCelebrates(streak), expected, String(streak));
});
