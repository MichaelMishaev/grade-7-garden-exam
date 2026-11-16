import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { extractContent } from './db/extract.mjs';
import { judgePractice } from './practice-truth.mjs';
import './practice-history.js';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const content = extractContent();
const quizIds = ['math-coordinates', 'math-signed', 'math-area', 'math-geometry'];

test('the November math calendar entry links to all four practice sets', () => {
  const home = read('index.html');
  assert.match(home, /<tr><th scope="row"><a href="subject.html\?subject=math">.*?<\/a><\/th><td>חמישי<\/td><td><time datetime="2026-11-26"/);
  assert.doesNotMatch(home, /datetime="2026-11-24"/);
  assert.deepEqual(content.quizzes.filter(q => q.subject_id === 'math').map(q => q.id), quizIds);
  assert.ok(content.exams.every(exam => exam.subject_id !== 'math'));
  const reference = content.study_references.find(ref => ref.id === 'math-november-topics');
  const guide = read(reference.url);
  for (const { part } of reference.parts) assert.ok(guide.includes(`<h2>${part}</h2>`), part);
});

test('all four math rounds use server grading and score out of 100', () => {
  const { buildPayload, validatePracticeResult, QUIZZES } = globalThis.PracticeHistory;
  for (const id of quizIds) {
    const rows = content.questions.filter(q => q.quiz_id === id);
    assert.equal(rows.length, QUIZZES[id].count, id);
    assert.deepEqual(rows.flatMap((q, i) => q.type === 'fill' ? [i] : []), QUIZZES[id].numeric, id);
    assert.ok(rows.every(q => q.topic === q.reference_part && q.reference_id === 'math-november-topics' && q.explanation_he && q.explanation_en), id);

    const answers = rows.map((q, index) => ({
      index, correct: true, ...(q.type === 'fill' ? { answer: String(q.correct.value).replace('-', '−') } : { choice: q.correct })
    }));
    const validate = answers => validatePracticeResult(buildPayload({ quizId: id, name: 'בדיקה', answers, score: 100, stars: 3 }));
    const full = validate(answers);
    assert.equal(full.ok, true, id);
    assert.equal(judgePractice(full.value).score, 100, id);

    const numeric = rows.findIndex(q => q.type === 'fill');
    const incorrect = answers.map((answer, index) => index === numeric ? { ...answer, answer: '9999' } : answer);
    const checked = validate(incorrect);
    assert.equal(checked.ok, true, id);
    const graded = judgePractice(checked.value);
    assert.equal(graded.answers[numeric].correct, false, id);
    assert.equal(graded.score, 83, id);
  }
});
