import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import './quiz-core.js';

const source = readFileSync(new URL('./library-exam.js', import.meta.url), 'utf8');
const questions = runInNewContext(source.slice(source.indexOf('const questions'), source.indexOf('const $')) + '\nquestions;');

test('second Hebrew exam follows the question content rules', () => {
  assert.equal(questions.length, 20);
  assert.equal(new Set(questions.map(q => q.id)).size, 20);
  assert.equal(new Set(questions.map(q => q.type)).size, 3);
  for (const [level, count] of [['easy', 8], ['medium', 8], ['hard', 4]]) {
    assert.equal(questions.filter(q => q.difficulty === level).length, count);
  }
  for (const q of questions) {
    assert.ok(q.topic && q.prompt);
    if (q.type === 'open') continue;
    assert.ok(q.explanation.he);
    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.choices.length);
    assert.equal(new Set(q.choices).size, q.choices.length);
  }
});

test('teacher-graded answers stay pending and mistakes never subtract points', () => {
  const correct = Object.fromEntries(questions.filter(q => q.type !== 'open').map(q => [q.id, 1]));
  const score = QuizCore.scoreQuiz(questions, correct);
  assert.deepEqual(score, { earned: 75, pending: 25, max: 100, percent: 100 });
  assert.equal(QuizCore.scoreQuiz(questions, {}).earned, 0);
  assert.equal(QuizCore.scoreQuiz(questions, {}).pending, 25);
});

test('results source line is plain text and never navigates away from the results screen', async () => {
  const { readFileSync } = await import('node:fs');
  const js = readFileSync(new URL('./library-exam.js', import.meta.url), 'utf8');
  const results = js.slice(js.indexOf('function results()'), js.indexOf("$('student-name').addEventListener"));
  assert.match(results, /source-line/);
  assert.doesNotMatch(results, /show\('start'/);
  assert.doesNotMatch(results, /createElement\('a'\)/);
});
