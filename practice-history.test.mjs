import { test } from 'node:test';
import assert from 'node:assert/strict';
import './quiz-core.js';
import './practice-history.js';
import { extractContent } from './db/extract.mjs';

const { QUIZZES, cleanName, questionId, endpointFor, buildPayload, validatePracticeResult } = globalThis.PracticeHistory;
const { shuffleChoices } = globalThis.QuizCore;

// A full round of `quiz` where the first `right` questions are answered correctly.
function round(quiz = 'facts', right = 6) {
  const { count } = QUIZZES[quiz];
  const answers = Array.from({ length: count }, (_, index) => ({ index, choice: index % 2, correct: index < right }));
  const score = Math.round(right / count * 100);
  const stars = score >= 90 ? 3 : score >= 75 ? 2 : score >= 50 ? 1 : 0;
  return buildPayload({ quizId: quiz, name: 'דנה', answers, score, stars });
}

test('every practice quiz has a unique permanent code, in order, and the right question count', () => {
  const content = extractContent();
  assert.deepEqual(Object.keys(QUIZZES), content.quizzes.map((q) => q.id));
  assert.deepEqual(Object.values(QUIZZES).map((q) => q.code), ['PRA-001', 'PRA-002', 'PRA-003', 'PRA-004', 'PRA-005', 'PRA-006', 'PRA-007']);
  for (const q of content.quizzes) assert.equal(QUIZZES[q.id].count, content.questions.filter((x) => x.quiz_id === q.id).length, q.id);
});

test('question ids match the database seed ids', () => {
  const ids = new Set(extractContent().questions.map((q) => q.id));
  for (const [quiz, { count }] of Object.entries(QUIZZES)) for (let i = 0; i < count; i++) assert.ok(ids.has(questionId(quiz, i)), questionId(quiz, i));
});

test('cleanName trims, collapses spaces, and rejects empty, long or control-character names', () => {
  assert.equal(cleanName('  דנה   כהן '), 'דנה כהן');
  assert.equal(cleanName('   '), '');
  assert.equal(cleanName(null), '');
  assert.equal(cleanName('א'.repeat(61)), '');
  assert.equal(cleanName('א'.repeat(60)).length, 60);
  assert.equal(cleanName('דנה\u0007'), '');
});

test('endpointFor calls the canonical host from GitHub Pages only', () => {
  assert.equal(endpointFor('michaelmishaev.github.io'), 'https://hitech.agnon.online/api/practice-result');
  assert.equal(endpointFor('hitech.agnon.online'), '/api/practice-result');
  assert.equal(endpointFor('localhost'), '/api/practice-result');
});

test('buildPayload returns null without a name or for an unknown quiz', () => {
  assert.equal(buildPayload({ quizId: 'facts', name: '  ', answers: [], score: 0, stars: 0 }), null);
  assert.equal(buildPayload({ quizId: 'nope', name: 'דנה', answers: [], score: 0, stars: 0 }), null);
  assert.equal(round().answers[0].questionId, 'facts-01');
});

test('a valid round passes and is returned cleaned with the quiz code', () => {
  const checked = validatePracticeResult(round('physics-pole', 8));
  assert.equal(checked.ok, true);
  assert.equal(checked.value.quizCode, 'PRA-007');
  assert.equal(checked.value.score, 73);
  assert.equal(checked.value.answers.length, 11);
});

test('validation rejects bad shapes, wrong counts, duplicates, foreign ids and inconsistent score or stars', () => {
  const bad = (mutate) => { const p = structuredClone(round()); mutate(p); return validatePracticeResult(p).ok; };
  assert.equal(validatePracticeResult(null).ok, false);
  assert.equal(validatePracticeResult([]).ok, false);
  assert.equal(bad((p) => { p.quiz = 'nope'; }), false);
  assert.equal(bad((p) => { p.quiz = '__proto__'; }), false);
  assert.equal(bad((p) => { p.name = ' '; }), false);
  assert.equal(bad((p) => { p.extra = 1; }), false);
  assert.equal(bad((p) => { p.score = 99.5; }), false);
  assert.equal(bad((p) => { p.score = 90; }), false);
  assert.equal(bad((p) => { p.stars = 2; }), false);
  assert.equal(bad((p) => { p.answers.pop(); }), false);
  assert.equal(bad((p) => { p.answers[1].questionId = 'facts-01'; }), false);
  assert.equal(bad((p) => { p.answers[0].questionId = 'questions-01'; }), false);
  assert.equal(bad((p) => { p.answers[0].questionId = 'facts-07'; }), false);
  assert.equal(bad((p) => { p.answers[0].choice = -1; }), false);
  assert.equal(bad((p) => { p.answers[0].choice = '1'; }), false);
  assert.equal(bad((p) => { p.answers[0].correct = 1; }), false);
  assert.equal(bad((p) => { p.answers[0].more = true; }), false);
  assert.equal(bad(() => {}), true);
});

test('the pause is 1.5 s and review items report the shown answer, the right one and the explanations', () => {
  assert.equal(globalThis.PracticeHistory.AUTO_ADVANCE_MS, 1500);
  const question = { text: 'ש', choices: ['א', 'ב', 'ג'], correct: 2, he: 'הסבר', en: 'Why' };
  assert.deepEqual(globalThis.PracticeHistory.reviewItem(question, 0), { text: 'ש', picked: 'א', right: 'ג', correct: false, he: 'הסבר', en: 'Why' });
  assert.equal(globalThis.PracticeHistory.reviewItem(question, 2).correct, true);
  assert.equal(globalThis.PracticeHistory.reviewItem({ ...question, en: undefined }, 1).en, '');
});

test('shuffleChoices reports the original index of every displayed choice', () => {
  const question = { choices: ['a', 'b', 'c', 'd'], correct: 2 };
  for (let i = 0; i < 50; i++) {
    const out = shuffleChoices(question);
    assert.deepEqual(out.order.map((original) => question.choices[original]), out.choices);
    assert.equal(out.order[out.correct], question.correct);
  }
});
