import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchExam, autoCorrect } from './submissions.mjs';

const prefix = 'גרסה 2 · הספרייה בהפסקה · ';
const rows = [
  ...[1, 2].map((n) => ({ id: `garden-0${n}`, exam_id: 'g', position: n, type: 'open', prompt: `גינה ${n}`, choices: null, correct: null })),
  ...[1, 2].map((n) => ({ id: `library-0${n}`, exam_id: 'l', position: n, type: 'mcq', prompt: `ספרייה ${n}`, choices: ['א', 'ב'], correct: 0 }))
];

test('recognises each exam from the question texts it sent', () => {
  assert.equal(matchExam(rows, [{ question: 'גינה 2' }, { question: 'גינה 1' }]).examId, 'g');
  assert.equal(matchExam(rows, [{ question: `${prefix}ספרייה 2` }, { question: `${prefix}ספרייה 1` }]).examId, 'l');
});

test('duplicate, unknown or mixed questions are not attributed to an exam', () => {
  assert.equal(matchExam(rows, [{ question: 'גינה 1' }, { question: 'גינה 1' }]).examId, null);
  assert.equal(matchExam(rows, [{ question: 'גינה 1' }, { question: 'משהו אחר' }]).examId, null);
  assert.equal(matchExam(rows, [{ question: 'גינה 1' }, { question: `${prefix}ספרייה 1` }]).examId, null);
});

test('auto-grading only applies to graded questions', () => {
  assert.equal(autoCorrect(rows[2], 'א'), true);
  assert.equal(autoCorrect(rows[2], 'ב'), false);
  assert.equal(autoCorrect(rows[0], 'כל דבר'), null);
  assert.equal(autoCorrect(null, 'א'), null);
});
