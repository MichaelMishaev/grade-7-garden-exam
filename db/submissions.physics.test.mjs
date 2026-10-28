import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchExam, autoCorrect, plainText } from './submissions.mjs';

const numeric = { id: 'p-12', exam_id: 'p', position: 1, type: 'fill', prompt: 'כמה?<br><br>בסנטימטרים', choices: null, correct: { value: 325, tolerance: 1e-8, unit: 'ס״מ' } };
const open = { id: 'p-06', exam_id: 'p', position: 2, type: 'open', prompt: 'הסבירו', choices: null, correct: 'מפתח' };
const choice = { id: 'p-01', exam_id: 'p', position: 3, type: 'mcq', prompt: 'בחרו', choices: ['א', 'ב'], correct: 1 };
const other = { id: 'o-01', exam_id: 'o', position: 1, type: 'open', prompt: 'הסבירו', choices: null, correct: null };

test('plain-text prompts (<br> -> newline, tags removed) match the stored HTML prompt', () => {
  assert.equal(plainText('a<br><br>b <bdi dir="ltr">1</bdi>'), 'a\nb 1');
  const answers = [{ question: 'כמה?\nבסנטימטרים' }, { question: 'הסבירו' }, { question: 'בחרו' }];
  assert.deepEqual(matchExam([numeric, open, choice, other], answers).matched.map((q) => q.id), ['p-12', 'p-06', 'p-01']);
});

test('a named exam is matched only against its own questions', () => {
  assert.equal(matchExam([numeric, open, choice, other], [{ question: 'הסבירו' }], 'o').examId, 'o');
  assert.equal(matchExam([numeric, open, choice, other], [{ question: 'בחרו' }], 'o').examId, null);
  assert.equal(matchExam([numeric, open, choice], [{ question: 'בחרו' }], 'missing').examId, null);
});

test('numeric answers are graded by the server from the first line; the client mark is only a fallback', () => {
  assert.equal(autoCorrect(numeric, '325\nדרך חישוב: 3.25 × 100', false), true);
  assert.equal(autoCorrect(numeric, '325,0', false), true);
  assert.equal(autoCorrect(numeric, '32.5', true), false);
  assert.equal(autoCorrect(numeric, '325 ס״מ', true), false); // like the teacher site: no units in the number
  assert.equal(autoCorrect({ ...numeric, correct: null }, '325', true), true);
  assert.equal(autoCorrect({ ...numeric, correct: null }, '325', undefined), null);
});

test('choice grading is unchanged and written answers stay for the teacher', () => {
  assert.equal(autoCorrect(choice, 'ב', false), true);
  assert.equal(autoCorrect(choice, 'א', true), false);
  assert.equal(autoCorrect(open, 'מפתח', true), null);
  assert.equal(autoCorrect(null, '325', true), null);
});
