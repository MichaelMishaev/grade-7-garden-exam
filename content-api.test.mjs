import { test } from 'node:test';
import assert from 'node:assert/strict';
import './content-api.js';

const { loadContent } = globalThis.ContentApi;
const fallback = { source: 'inline' };
const respond = (body, status = 200) => async () => new Response(JSON.stringify(body), { status });

test('uses the API data when it is valid', async () => {
  assert.deepEqual(await loadContent('quizzes/facts', fallback, { fetchImpl: respond({ source: 'api' }) }), { source: 'api' });
});

test('falls back on HTTP errors, network errors, timeouts and invalid shapes', async () => {
  assert.equal(await loadContent('x', fallback, { fetchImpl: respond({}, 503) }), fallback);
  assert.equal(await loadContent('x', fallback, { fetchImpl: async () => { throw new TypeError('offline'); } }), fallback);
  assert.equal(await loadContent('x', fallback, { timeout: 20, fetchImpl: (url, { signal }) => new Promise((_, reject) => signal.addEventListener('abort', () => reject(signal.reason))) }), fallback);
  assert.equal(await loadContent('x', fallback, { valid: () => false, fetchImpl: respond({ source: 'api' }) }), fallback);
});

test('sameData compares JSON data structurally, ignoring key order', () => {
  const { sameData } = globalThis.ContentApi;
  assert.equal(sameData({ a: 1, b: [1, { c: 'x' }] }, { b: [1, { c: 'x' }], a: 1 }), true);
  assert.equal(sameData({ a: 1 }, { a: 1, b: undefined }), false);
  assert.equal(sameData([1, 2], [2, 1]), false);
  assert.equal(sameData({}, []), false);
  assert.equal(sameData(null, {}), false);
});

test('examFromApi returns prompts or objects only when identical to the inline exam', () => {
  const { examFromApi } = globalThis.ContentApi;
  const row = (id, prompt, extra = {}) => ({ id, position: 1, type: 'open', topic: null, difficulty: null, prompt, choices: null, correct: null, explanation: { he: null, en: null }, ...extra });
  const garden = { id: 'g', questions: [row('g-01', 'א'), row('g-02', 'ב')] };
  assert.deepEqual(examFromApi(garden, ['א', 'ב']), ['א', 'ב']);
  assert.equal(examFromApi(garden, ['ב', 'א']), null, 'order');
  assert.equal(examFromApi(garden, ['א']), null, 'count');
  assert.equal(examFromApi({ questions: [row('g-01', 'א'), row('g-01', 'ב')] }, ['א', 'ב']), null, 'duplicate ids');
  assert.equal(examFromApi({ questions: [row('g-01', 'א', { type: 'mcq' }), row('g-02', 'ב')] }, ['א', 'ב']), null, 'type');
  assert.equal(examFromApi({ questions: 'nope' }, ['א']), null);
  assert.equal(examFromApi(null, ['א']), null);

  const inline = [
    { id: 'l-01', type: 'mcq', topic: 't', difficulty: 'easy', prompt: 'p', choices: ['x', 'y'], correct: 1, explanation: { he: 'h' } },
    { id: 'l-02', type: 'open', topic: 't', difficulty: 'hard', prompt: 'q' }
  ];
  const library = { questions: [
    row('l-01', 'p', { type: 'mcq', topic: 't', difficulty: 'easy', choices: ['x', 'y'], correct: 1, explanation: { he: 'h', en: null } }),
    row('l-02', 'q', { topic: 't', difficulty: 'hard' })
  ] };
  assert.deepEqual(examFromApi(library, inline), inline);
  const wrongAnswer = structuredClone(library); wrongAnswer.questions[0].correct = 0;
  assert.equal(examFromApi(wrongAnswer, inline), null, 'correct index');
  const wrongId = structuredClone(library); wrongId.questions[1].id = 'l-99';
  assert.equal(examFromApi(wrongId, inline), null, 'id');
});

test('subjectFromApi keeps the inline structure and only takes texts from the API', () => {
  const { subjectFromApi } = globalThis.ContentApi;
  const refs = [{ id: 'r1', kind: 'pdf', title: 'R', url: 'r.pdf', attribution: 'A', parts: [{ part: 'עמוד 1', title: 'p' }] }];
  const inline = { title: 'T', description: 'D', variants: [{ id: 'e1', title: 'v', detail: 'd', date: '1.1', count: '2 שאלות', href: 'a.html', practiceQuizzes: ['q1'], references: refs }], quizzes: [['q1', 'L', 'LD', '1']] };
  const data = { title: 'T2', description: 'D2', exams: [{ id: 'e1', title: 'v2', detail: 'd2', date_label: '2.2', href: 'a.html', question_count: 3, references: [{ ...refs[0], title: 'other' }] }], quizzes: [{ id: 'q1', exam_id: 'e1', list_title: 'L2', list_detail: 'LD2' }] };
  assert.deepEqual(subjectFromApi(data, inline), { title: 'T2', description: 'D2', variants: [{ id: 'e1', title: 'v2', detail: 'd2', date: '2.2', count: '3 שאלות', href: 'a.html', practiceQuizzes: ['q1'], references: refs }], quizzes: [['q1', 'L2', 'LD2', '1']] });
  assert.equal(subjectFromApi({ ...data, exams: [{ ...data.exams[0], references: [] }] }, inline), null, 'references');
  assert.equal(subjectFromApi({ ...data, exams: [{ ...data.exams[0], id: 'e9' }] }, inline), null, 'exam id');
  const undated = { ...inline, variants: [{ ...inline.variants[0], date: undefined }] }; delete undated.variants[0].date;
  assert.equal(subjectFromApi({ ...data, exams: [{ ...data.exams[0], date_label: null }] }, undated).variants[0].date, undefined, 'no date');
  assert.equal(subjectFromApi({ ...data, exams: [{ ...data.exams[0], date_label: null }] }, inline), null, 'missing date');
  assert.equal(subjectFromApi({ ...data, exams: [{ ...data.exams[0], href: 'b.html' }] }, inline), null, 'href');
  assert.equal(subjectFromApi({ ...data, exams: [] }, inline), null, 'exam count');
  assert.equal(subjectFromApi({ ...data, quizzes: [{ ...data.quizzes[0], exam_id: null }] }, inline), null, 'linked quizzes');
  assert.equal(subjectFromApi({ ...data, quizzes: [{ ...data.quizzes[0], id: 'q2', exam_id: 'e1' }] }, inline), null, 'quiz ids');
  assert.equal(subjectFromApi({ ...data, title: 5 }, inline), null);
  assert.equal(subjectFromApi(null, inline), null);
});
