import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { extractContent } from './db/extract.mjs';
import { question as toApi } from './db/content.mjs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const source = read('practice.js');
const quizzes = JSON.parse(runInNewContext(source.slice(0, source.indexOf('const byId')) + '\nJSON.stringify(quizzes)'));
const { sections } = JSON.parse(read('test-fixtures/sarit-physics7-sections.json'));
const keys = ['physics-basics', 'physics-units', 'physics-precision', 'physics-pole'];

test('four short physics quizzes reproduce all teacher chapters and all 27 tasks verbatim', () => {
  assert.deepEqual(keys.map(key => quizzes[key].questions.length), [11, 5, 6, 5]);
  keys.forEach((key, si) => {
    const quiz = quizzes[key], section = sections[si];
    assert.equal(quiz.title, section.title);
    assert.equal(quiz.description, section.intro);
    quiz.questions.forEach((q, i) => {
      const [prompt, type, choices, correct, model, figure, notes] = section.qs[i];
      const label = `${key} task ${i + 1}`;
      assert.equal(q.text, prompt, label);
      assert.equal(q.he, model, label);
      assert.equal(q.type, { choice: 'mcq', num: 'fill', text: 'open' }[type], label);
      assert.deepEqual(q.choices ?? null, choices, label);
      assert.equal(q.type === 'mcq' ? q.choices[q.correct] : q.type === 'fill' ? q.correct.value : q.correct, correct, label);
      assert.equal(q.figure ?? null, figure, label);
      assert.equal(Boolean(q.notes), notes, label);
      assert.deepEqual(q.ref, { id: 'physics-site', part: `פרק ${si + 1}` }, label);
    });
  });
});

test('dependent conversion retains the preceding task data for a mistakes-only round', () => {
  assert.equal(quizzes['physics-precision'].questions[2].context, sections[2].qs[1][0]);
});

test('physics accepts only matching API content, including when the old quiz has the same count', () => {
  const apiScope = {};
  runInNewContext(read('content-api.js'), apiScope);
  const ContentApi = apiScope.ContentApi;
  const fn = source.slice(source.indexOf('function physicsQuizMatches'), source.indexOf('const readBest'));
  const content = extractContent();
  for (const key of keys) {
    const inlineQuiz = quizzes[key];
    const matches = runInNewContext(fn + '\nphysicsQuizMatches;', { ContentApi, inlineQuiz });
    const api = { title: inlineQuiz.title, description: inlineQuiz.description, questions: content.questions.filter(q => q.quiz_id === key).map(toApi) };
    assert.equal(matches(api), true, key);
    assert.equal(matches({ ...api, questions: api.questions.map((q, i) => i ? q : { ...q, prompt: 'stale question' }) }), false, key);
    assert.equal(matches({ ...api, title: 'old title' }), false, key);
    assert.equal(matches({ ...api, questions: api.questions.slice(1) }), false, key);
    assert.equal(matches({ ...api, questions: api.questions.map((q, i) => i ? q : { ...q, correct: 'wrong answer' }) }), false, key);
  }
});

test('written tasks stay outside automatic score and mistakes, including mixed chapter 4', () => {
  const scope = {};
  runInNewContext(read('quiz-core.js'), scope);
  const qs = quizzes['physics-pole'].questions.map((q, i) => ({ ...q, id: `q${i}` }));
  const correct = Object.fromEntries(qs.filter(q => q.type !== 'open').map(q => [q.id, 1]));
  assert.equal(scope.QuizCore.scoreQuiz(qs, correct).percent, 100);
  assert.equal(scope.QuizCore.missedQuestions(qs, correct).length, 0);
  assert.equal(scope.QuizCore.scoreQuiz(qs, {}).percent, 0);
  assert.equal(scope.QuizCore.missedQuestions(qs, {}).length, 2);
});

test('history validates typed rounds and grades numbers on the server, excluding written tasks', async () => {
  await import('./quiz-core.js');
  await import('./practice-history.js');
  const { judgePractice } = await import('./practice-truth.mjs');
  const { buildPayload, validatePracticeResult } = globalThis.PracticeHistory;
  const payload = buildPayload({ quizId: 'physics-pole', name: 'בדיקה', score: 100, stars: 3, answers: [
    { index: 1, answer: '10', correct: true }, { index: 4, answer: '999', correct: true }
  ] });
  const checked = validatePracticeResult(payload);
  assert.equal(checked.ok, true);
  const judged = judgePractice(checked.value);
  assert.equal(judged.score, 50, 'forged client verdict ignored');
  assert.deepEqual(judged.answers.map(a => a.correct), [true, false]);
  assert.ok(judged.answers.every(a => a.choice === -1));
  const wrongType = structuredClone(payload);
  wrongType.answers[0] = { questionId: 'physics-pole-02', choice: 0, correct: true };
  assert.equal(validatePracticeResult(wrongType).ok, false);
  const includesWritten = structuredClone(payload);
  includesWritten.answers[0].questionId = 'physics-pole-01';
  assert.equal(validatePracticeResult(includesWritten).ok, false);
});

test('all four physics history payloads use the source types and preserve a perfect graded score', async () => {
  await import('./quiz-core.js');
  await import('./practice-history.js');
  const { judgePractice } = await import('./practice-truth.mjs');
  const { buildPayload, validatePracticeResult, QUIZZES } = globalThis.PracticeHistory;
  for (const key of keys) {
    const qs = quizzes[key].questions;
    assert.deepEqual(QUIZZES[key].open || [], qs.flatMap((q, i) => q.type === 'open' ? [i] : []));
    assert.deepEqual(QUIZZES[key].numeric || [], qs.flatMap((q, i) => q.type === 'fill' ? [i] : []));
    const answers = qs.flatMap((q, i) => q.type === 'open' ? [] : [{ index: i, correct: true, ...(q.type === 'fill' ? { answer: String(q.correct.value) } : { choice: q.correct }) }]);
    const checked = validatePracticeResult(buildPayload({ quizId: key, name: 'בדיקה', score: 100, stars: 3, answers }));
    assert.equal(checked.ok, true, key);
    assert.equal(judgePractice(checked.value).score, 100, key);
  }
});
