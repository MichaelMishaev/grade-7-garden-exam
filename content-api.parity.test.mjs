import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { readFileSync } from 'node:fs';
import './content-api.js';
import { extractContent } from './db/extract.mjs';
import { question as apiQuestion } from './db/content.mjs';

const { quizFromApi, quizMatches, examFromApi, subjectFromApi } = globalThis.ContentApi;
const content = extractContent();

// Inline quizzes exactly as practice.js builds them.
const practiceJs = readFileSync(new URL('./practice.js', import.meta.url), 'utf8');
const inline = JSON.parse(JSON.stringify(runInNewContext(practiceJs.slice(0, practiceJs.indexOf('const byId')) + '\nquizzes;')));

// What GET /api/quizzes/:id returns (db/content.mjs getQuiz + question()).
const refRow = ({ id, kind, title, url, attribution, parts }) => ({ id, kind, title, url, attribution, parts });
const apiQuiz = (quiz) => {
  const questions = content.questions.filter((q) => q.quiz_id === quiz.id).sort((a, b) => a.position - b.position);
  const used = new Set(questions.map((q) => q.reference_id));
  return {
    id: quiz.id, subject_id: quiz.subject_id, exam_id: quiz.exam_id, title: quiz.title, description: quiz.description,
    references: content.study_references.filter((r) => used.has(r.id)).map(refRow),
    questions: questions.map(apiQuestion)
  };
};

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

// What GET /api/exams/:id and /api/subjects/:id return (db/content.mjs getExam / getSubject + question()).
const apiExam = (id) => {
  const e = content.exams.find((x) => x.id === id);
  const p = content.passages.find((x) => x.id === e.passage_id);
  return {
    id: e.id, subject_id: e.subject_id, title: e.title, detail: e.detail, date_label: e.date_label, href: e.href,
    question_count: e.question_count, passage_title: p?.title ?? null, passage_html: p?.body_html ?? null,
    references: content.study_references.filter((r) => r.exam_id === id).map(refRow),
    questions: content.questions.filter((q) => q.exam_id === id).sort((a, b) => a.position - b.position).map(apiQuestion)
  };
};
const apiSubject = (id) => ({
  ...(({ title, description, art_path }) => ({ id, title, description, art_path }))(content.subjects.find((s) => s.id === id)),
  exams: content.exams.filter((e) => e.subject_id === id).sort((a, b) => a.sort_order - b.sort_order)
    .map(({ id, title, detail, date_label, href, question_count }) => ({ id, title, detail, date_label, href, question_count,
      references: content.study_references.filter((r) => r.exam_id === id).map(refRow) })),
  quizzes: content.quizzes.filter((q) => q.subject_id === id).sort((a, b) => a.sort_order - b.sort_order)
    .map(({ id, exam_id, title, description, list_title, list_detail }) => ({ id, exam_id, title, description, list_title, list_detail }))
});

const between = (text, start, end) => text.slice(text.indexOf(start), text.indexOf(end, text.indexOf(start)));
const evaluate = (code) => JSON.parse(JSON.stringify(runInNewContext(code)));
const source = (file) => readFileSync(new URL(file, import.meta.url), 'utf8');
const inlineGarden = evaluate(between(source('garden-exam.html'), 'const questions = [', '];') + '];\nquestions;');
const inlineLibrary = evaluate(between(source('library-exam.js'), 'const questions', 'const $') + '\nquestions;');
const inlinePhysics = evaluate(between(source('physics-exam.js'), 'const questions', 'const sections') + '\nquestions;');
const inlineSubjects = evaluate(between(source('subject.html'), 'const subjects = {', 'const key =') + '\nsubjects;');

test('API-shaped garden exam maps to the inline prompt strings (the submit payload) in order', () => {
  const mapped = examFromApi(apiExam('hebrew-v1-garden'), inlineGarden);
  assert.equal(inlineGarden.length, 20);
  assert.deepEqual(mapped, inlineGarden);
  assert.equal(JSON.stringify(mapped.map((question) => ({ question }))), JSON.stringify(inlineGarden.map((question) => ({ question }))));
});

test('API-shaped library exam maps to the inline question objects (same ids, order, answers)', () => {
  const mapped = examFromApi(apiExam('hebrew-v2-library'), inlineLibrary);
  assert.equal(inlineLibrary.length, 20);
  assert.deepEqual(mapped, inlineLibrary);
  assert.deepEqual(mapped.map((q) => `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`), inlineLibrary.map((q) => `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`));
});

test('API-shaped physics exam maps to the inline question objects (ids, order, answers, references)', () => {
  const mapped = examFromApi(apiExam('physics-v1-assessment'), inlinePhysics);
  assert.equal(inlinePhysics.length, 27);
  assert.deepEqual(mapped, inlinePhysics);
  const moved = apiExam('physics-v1-assessment'); moved.questions[0].ref = { id: 'physics-pdf', part: 'עמוד 2' };
  assert.equal(examFromApi(moved, inlinePhysics), null, 'a changed reference part is rejected');
  const tolerance = apiExam('physics-v1-assessment'); tolerance.questions[11].correct = { ...tolerance.questions[11].correct, value: 326 };
  assert.equal(examFromApi(tolerance, inlinePhysics), null, 'a changed numeric answer is rejected');
});

test('API subjects with different references are rejected', () => {
  const data = apiSubject('physics');
  data.exams[0].references = data.exams[0].references.slice(1);
  assert.equal(subjectFromApi(data, inlineSubjects.physics), null);
});

test('API exams that differ from the inline data in any way are rejected', () => {
  const swapped = apiExam('hebrew-v1-garden'); swapped.questions.reverse();
  assert.equal(examFromApi(swapped, inlineGarden), null);
  const edited = apiExam('hebrew-v2-library'); edited.questions[3].prompt += ' ';
  assert.equal(examFromApi(edited, inlineLibrary), null);
  assert.equal(examFromApi(apiExam('hebrew-v2-library'), inlineGarden), null);
});

for (const id of ['hebrew', 'physics']) {
  test(`API-shaped subject ${id} maps back to the inline subject`, () => {
    assert.deepEqual(subjectFromApi(apiSubject(id), inlineSubjects[id]), inlineSubjects[id]);
  });
}
