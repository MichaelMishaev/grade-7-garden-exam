import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { readFileSync } from 'node:fs';
import './content-api.js';
import { extractContent } from './db/extract.mjs';

const { quizFromApi, quizMatches } = globalThis.ContentApi;
const content = extractContent();

// Inline quizzes exactly as practice.js builds them.
const practiceJs = readFileSync(new URL('./practice.js', import.meta.url), 'utf8');
const inline = JSON.parse(JSON.stringify(runInNewContext(practiceJs.slice(0, practiceJs.indexOf('const byId')) + '\nquizzes;')));

// What GET /api/quizzes/:id returns (db/content.mjs getQuiz + question()).
const apiQuiz = (quiz) => ({
  id: quiz.id, subject_id: quiz.subject_id, exam_id: quiz.exam_id, title: quiz.title, description: quiz.description,
  questions: content.questions.filter((q) => q.quiz_id === quiz.id).sort((a, b) => a.position - b.position).map((q) => ({
    id: q.id, position: q.position, type: q.type, topic: q.topic, difficulty: q.difficulty, prompt: q.prompt,
    choices: q.choices, correct: q.correct, explanation: { he: q.explanation_he, en: q.explanation_en }
  }))
});

test('every inline quiz is represented in the extracted content', () => {
  assert.deepEqual(content.quizzes.map((q) => q.id).sort(), Object.keys(inline).sort());
});

for (const quiz of content.quizzes) {
  test(`API-shaped ${quiz.id} maps back to the inline quiz`, () => {
    const data = apiQuiz(quiz);
    assert.ok(quizMatches(data, inline[quiz.id].questions.length));
    assert.deepEqual(quizFromApi(data), inline[quiz.id]);
  });
}

test('quizMatches rejects wrong counts and unanswerable questions', () => {
  const data = apiQuiz(content.quizzes[0]);
  assert.equal(quizMatches({ ...data, questions: data.questions.slice(1) }, data.questions.length), false);
  assert.equal(quizMatches({ ...data, questions: [{ ...data.questions[0], correct: 99 }, ...data.questions.slice(1)] }, data.questions.length), false);
  assert.equal(quizMatches(null, 1), false);
});
