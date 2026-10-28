import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractContent, contentHash } from './extract.mjs';

const content = extractContent();
const perParent = Object.groupBy(content.questions, (q) => q.exam_id ?? q.quiz_id);

test('extracts every subject, exam, quiz and question from the source files', () => {
  assert.deepEqual(['subjects', 'passages', 'exams', 'quizzes', 'questions'].map((k) => content[k].length), [2, 2, 2, 7, 102]);
  assert.deepEqual(Object.fromEntries(Object.entries(perParent).map(([k, v]) => [k, v.length])), {
    'hebrew-v1-garden': 20, 'hebrew-v2-library': 20, facts: 6, questions: 6, instructions: 6,
    'physics-basics': 11, 'physics-units': 11, 'physics-precision': 11, 'physics-pole': 11
  });
});

test('ids are unique and every question belongs to exactly one parent', () => {
  assert.equal(new Set(content.questions.map((q) => q.id)).size, 102);
  for (const q of content.questions) assert.equal(Number(q.exam_id !== null) + Number(q.quiz_id !== null), 1);
});

test('graded questions have a valid correct index and positions are 1..n', () => {
  for (const [parent, list] of Object.entries(perParent)) {
    assert.deepEqual(list.map((q) => q.position), list.map((_, i) => i + 1), parent);
    for (const q of list.filter((x) => x.type !== 'open')) {
      assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.choices.length, q.id);
    }
  }
});

test('garden stays open-answer in source order; library keeps its ids; physics keeps empty English', () => {
  assert.ok(perParent['hebrew-v1-garden'].every((q) => q.type === 'open' && q.correct === null));
  assert.equal(perParent['hebrew-v1-garden'][0].id, 'garden-01');
  assert.equal(perParent['hebrew-v2-library'][0].id, 'library-01');
  assert.ok(perParent['physics-pole'].every((q) => q.explanation_en === ''));
});

test('quizzes link to the right subject and exam, and every exam has a passage', () => {
  assert.deepEqual(content.quizzes.filter((q) => q.exam_id).map((q) => q.id), ['facts', 'questions', 'instructions']);
  assert.ok(content.quizzes.every((q) => q.list_title && q.list_detail));
  assert.ok(content.exams.every((e) => content.passages.some((p) => p.id === e.passage_id && p.body_html.includes('<p>'))));
});

test('extraction is deterministic', () => assert.equal(contentHash(extractContent()), contentHash(content)));
