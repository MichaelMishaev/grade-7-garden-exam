// docs/TESTING.md §2: the checkbox question type (select several, graded all or nothing). No real question uses it yet,
// so these tests run the pages' own helper lines on synthetic questions: grading, the email details, the server-side
// key check and the quiz score. The browser flow was checked separately at 390×844 (see the task report).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { autoCorrect } from './db/submissions.mjs';
import './quiz-core.js';

const libraryJs = readFileSync(new URL('./library-exam.js', import.meta.url), 'utf8');
const physicsJs = readFileSync(new URL('./physics-exam.js', import.meta.url), 'utf8');
const line = (js, name) => new RegExp(`  const ${name} = .*;`).exec(js)?.[0];
const block = (js, name) => { const start = js.indexOf(`  function ${name}(`); return js.slice(start, js.indexOf('\n  }\n', start) + 4); };

const q = { id: 'x-01', type: 'checkbox', topic: 'נושא', difficulty: 'medium', prompt: 'בחרו את כל הנכונים', choices: ['א', 'ב', 'ג', 'ד'], correct: [0, 2], explanation: { he: 'הסבר' }, ref: { id: 'library-passage', part: 'פסקה 1' } };

test('the grading helpers are the same code in the library and the physics page', () => {
  for (const name of ['checkboxCorrect', 'checkboxTexts', 'validPick']) {
    assert.ok(line(libraryJs, name), `library ${name}`);
    assert.equal(line(physicsJs, name), line(libraryJs, name), name);
  }
  for (const name of ['showCheckboxFeedback', 'renderCheckboxes']) {
    assert.ok(block(libraryJs, name).length > 200, `library ${name}`);
    assert.equal(block(physicsJs, name), block(libraryJs, name), name);
  }
  const details = (js) => /const answerDetails = q => .*;/.exec(js)[0];
  assert.equal(details(physicsJs), details(libraryJs));
});

test('checkboxCorrect is all or nothing: the exact set, in any order, nothing else', () => {
  const grade = runInNewContext(`${line(libraryJs, 'checkboxCorrect')}\ncheckboxCorrect;`);
  assert.equal(grade([0, 2], [0, 2]), true);
  assert.equal(grade([2, 0], [0, 2]), true);
  assert.equal(grade([0], [0, 2]), false); // partial
  assert.equal(grade([0, 1, 2], [0, 2]), false); // an extra option
  assert.equal(grade([1, 3], [0, 2]), false);
  assert.equal(grade([0, 0], [0, 2]), false); // duplicates do not count twice
  assert.equal(grade([], [0, 2]), false);
  assert.equal(grade(undefined, [0, 2]), false);
  assert.equal(grade('0,2', [0, 2]), false);
});

test('a restored answer is validated before it counts as answered', () => {
  const valid = runInNewContext(`${line(libraryJs, 'validPick')}\nvalidPick;`);
  assert.equal(valid(q, [0, 2]), true);
  for (const bad of [[], [4], [-1], [0, 0], [1.5], ['0'], 2, null, undefined, { 0: 1 }]) assert.equal(valid(q, bad), false, JSON.stringify(bad));
});

test('both pages put the selected texts, the correct set and the key in the email details', () => {
  for (const file of [libraryJs, physicsJs]) {
    const refNames = /const refNames = (\{[^;]*\});/.exec(file)[1];
    const texts = runInNewContext(`${line(file, 'checkboxTexts')}\ncheckboxTexts;`);
    const details = runInNewContext(`const refNames = ${refNames};\n${/const answerDetails = q => .*;/.exec(file)[0]}\nanswerDetails;`);
    assert.equal(texts(q, [0, 2]), 'א · ג');
    const sent = details(q);
    assert.deepEqual(sent.options, q.choices);
    assert.equal(sent.correctAnswer, 'א · ג');
    assert.ok(sent.reference.includes('פסקה 1'));
    // the single-answer types are unchanged
    assert.equal(details({ choices: ['א', 'ב'], correct: 1 }).correctAnswer, 'ב');
    assert.equal(details({ correct: { value: 5, unit: 'ס״מ' } }).correctAnswer, '5 ס״מ');
  }
});

test('autoCorrect grades a stored checkbox question all or nothing from the answer text', () => {
  const stored = { type: 'checkbox', choices: q.choices, correct: [2, 0] };
  assert.equal(autoCorrect(stored, 'א · ג', false), true);
  assert.equal(autoCorrect(stored, 'א', true), false);
  assert.equal(autoCorrect(stored, 'א · ב · ג', true), false);
  assert.equal(autoCorrect(stored, 'ג · א', true), false); // the page always sends option order
  assert.equal(autoCorrect(stored, 'לא נכתבה תשובה', true), false);
  assert.equal(autoCorrect({ ...stored, correct: null }, 'א · ג', true), null); // no usable key: the teacher decides
  assert.equal(autoCorrect({ ...stored, correct: [9] }, 'א · ג', true), null);
  assert.equal(autoCorrect({ ...stored, correct: [] }, '', true), null);
});

test('scoreQuiz counts a checkbox question as auto-graded (1 or 0) without changing the other weights', () => {
  const { scoreQuiz, WEIGHT } = globalThis.QuizCore;
  assert.deepEqual(WEIGHT, { easy: 1, medium: 1.5, hard: 2 });
  const list = [
    { id: 'a', type: 'mcq', difficulty: 'easy' },
    { id: 'b', type: 'checkbox', difficulty: 'easy' },
    { id: 'c', type: 'open', difficulty: 'easy' },
    { id: 'd', type: 'mcq', difficulty: 'easy' }
  ];
  assert.deepEqual(scoreQuiz(list, { a: 1, b: 1, d: 1 }), { earned: 75, pending: 25, max: 100, percent: 100 });
  assert.deepEqual(scoreQuiz(list, { a: 1, b: 0, d: 1 }), { earned: 50, pending: 25, max: 100, percent: 67 });
  assert.equal(scoreQuiz([{ id: 'b', type: 'checkbox' }], { b: 1 }).earned, 100);
  assert.equal(scoreQuiz([{ id: 'b', type: 'checkbox' }], { b: 0 }).earned, 0);
  assert.equal(globalThis.QuizCore.missedQuestions(list, { a: 1, b: 0, d: 1 }).map((x) => x.id).join(), 'b');
});
