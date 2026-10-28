import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { extractContent, contentHash } from './extract.mjs';

const content = extractContent();
const perParent = Object.groupBy(content.questions, (q) => q.exam_id ?? q.quiz_id);
const refs = new Map(content.study_references.map((r) => [r.id, r]));

test('extracts every subject, exam, quiz, reference and question from the source files', () => {
  assert.deepEqual(['subjects', 'passages', 'exams', 'quizzes', 'study_references', 'questions'].map((k) => content[k].length), [2, 2, 3, 7, 4, 129]);
  assert.deepEqual(Object.fromEntries(Object.entries(perParent).map(([k, v]) => [k, v.length])), {
    'hebrew-v1-garden': 20, 'hebrew-v2-library': 20, 'physics-v1-assessment': 27, facts: 6, questions: 6, instructions: 6,
    'physics-basics': 11, 'physics-units': 11, 'physics-precision': 11, 'physics-pole': 11
  });
});

test('ids are unique and every question belongs to exactly one parent', () => {
  assert.equal(new Set(content.questions.map((q) => q.id)).size, 129);
  for (const q of content.questions) assert.equal(Number(q.exam_id !== null) + Number(q.quiz_id !== null), 1);
});

test('graded questions have a valid answer and positions are 1..n', () => {
  for (const [parent, list] of Object.entries(perParent)) {
    assert.deepEqual(list.map((q) => q.position), list.map((_, i) => i + 1), parent);
    for (const q of list) {
      if (q.type === 'mcq' || q.type === 'truefalse') assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.choices.length, q.id);
      if (q.type === 'fill') {
        assert.equal(q.choices, null, q.id);
        assert.ok(Number.isFinite(q.correct.value) && q.correct.tolerance === 1e-8 && 'unit' in q.correct, q.id);
      }
    }
  }
});

test('garden stays open-answer in source order; library keeps its ids; physics keeps empty English', () => {
  assert.ok(perParent['hebrew-v1-garden'].every((q) => q.type === 'open' && q.correct === null));
  assert.equal(perParent['hebrew-v1-garden'][0].id, 'garden-01');
  assert.equal(perParent['hebrew-v2-library'][0].id, 'library-01');
  assert.ok(perParent['physics-pole'].every((q) => q.explanation_en === ''));
});

test('the physics exam maps the teacher task types to allowed DB types', () => {
  const types = perParent['physics-v1-assessment'].reduce((n, q) => ({ ...n, [q.type]: (n[q.type] ?? 0) + 1 }), {});
  assert.deepEqual(types, { mcq: 9, open: 7, fill: 11 });
  assert.equal(perParent['physics-v1-assessment'][0].id, 'physics-exam-01');
});

test('quizzes link to the right subject and exam, and the Hebrew exams have a passage', () => {
  assert.deepEqual(content.quizzes.filter((q) => q.exam_id === 'hebrew-v1-garden').map((q) => q.id), ['facts', 'questions', 'instructions']);
  assert.deepEqual(content.quizzes.filter((q) => q.exam_id === 'physics-v1-assessment').map((q) => q.id),
    ['physics-basics', 'physics-units', 'physics-precision', 'physics-pole']);
  assert.ok(content.quizzes.every((q) => q.list_title && q.list_detail));
  for (const e of content.exams.filter((x) => x.subject_id === 'hebrew')) {
    assert.ok(content.passages.some((p) => p.id === e.passage_id && p.body_html.includes('<p>')), e.id);
  }
});

test('every exam version has its own study references, with known kinds and parts', () => {
  assert.deepEqual(content.exams.map((e) => [e.id, content.study_references.filter((r) => r.exam_id === e.id).map((r) => r.id)]), [
    ['hebrew-v1-garden', ['garden-passage']], ['hebrew-v2-library', ['library-passage']], ['physics-v1-assessment', ['physics-pdf', 'physics-site']]
  ]);
  for (const r of content.study_references) {
    assert.ok(['pdf', 'site', 'passage'].includes(r.kind) && r.title && r.url, r.id);
    assert.ok(Array.isArray(r.parts) && r.parts.length && r.parts.every((p) => p.part && p.title), r.id);
  }
  assert.deepEqual(refs.get('physics-pdf').parts.map((p) => p.part), ['עמוד 1', 'עמוד 2', 'עמוד 3', 'עמוד 4', 'עמוד 5', 'עמוד 6']);
  assert.equal(refs.get('physics-pdf').url, 'assets/materials/physics-measurements-grade-7.pdf');
  assert.equal(refs.get('physics-pdf').attribution, 'שרית שרת');
  assert.equal(refs.get('physics-site').attribution, 'שרית שרת');
});

test('every question follows a reference of its own subject, at a part that exists (no dangling refs)', () => {
  const subjectOf = (q) => (q.exam_id ? content.exams.find((e) => e.id === q.exam_id) : content.quizzes.find((x) => x.id === q.quiz_id)).subject_id;
  for (const q of content.questions) {
    const r = refs.get(q.reference_id);
    assert.ok(r, `${q.id} has no reference`);
    assert.equal(r.subject_id, subjectOf(q), q.id);
    if (q.reference_part !== null) assert.ok(r.parts.some((p) => p.part === q.reference_part), `${q.id}: ${q.reference_part} is not a part of ${r.id}`);
  }
  // physics always names the page (1-6) or the site chapter
  for (const q of content.questions.filter((x) => subjectOf(x) === 'physics')) {
    assert.ok(q.reference_part, q.id);
    assert.match(`${q.reference_id}:${q.reference_part}`, /^(physics-pdf:עמוד [1-6]|physics-site:פרק [1-4])$/, q.id);
  }
  // exam questions follow their own exam's references
  for (const q of content.questions.filter((x) => x.exam_id)) assert.equal(refs.get(q.reference_id).exam_id, q.exam_id, q.id);
});

test('the 44 physics practice questions point at the expected pages of the summary', () => {
  const pages = (quiz) => perParent[quiz].map((q) => Number(q.reference_part.slice(-1)));
  assert.deepEqual(pages('physics-basics'), [1, 1, 1, 3, 3, 3, 1, 1, 1, 3, 3]);
  assert.ok(pages('physics-units').every((p) => p === 2));
  assert.ok(pages('physics-precision').every((p) => p === 4));
  assert.deepEqual(pages('physics-pole'), [5, 5, 6, 6, 6, 5, 5, 6, 6, 5, 6]);
  assert.ok(content.questions.filter((q) => q.quiz_id?.startsWith('physics-')).every((q) => q.reference_id === 'physics-pdf'));
});

test('the reference lists in practice.js and physics-exam.js agree with subject.html', () => {
  const practice = readFileSync(new URL('../practice.js', import.meta.url), 'utf8');
  const practiceRefs = runInNewContext(practice.slice(practice.indexOf('const references = {'), practice.indexOf('const sourceIn')) + '\nreferences;');
  const exam = readFileSync(new URL('../physics-exam.js', import.meta.url), 'utf8');
  const examRefs = runInNewContext(exam.slice(exam.indexOf('const references = {'), exam.indexOf('const sourceIn')) + '\nreferences;');
  for (const [id, r] of [...Object.entries(practiceRefs), ...Object.entries(examRefs)]) {
    assert.ok(refs.has(id), id);
    assert.deepEqual({ kind: r.kind, title: r.title, url: r.url }, { kind: refs.get(id).kind, title: refs.get(id).title, url: refs.get(id).url }, id);
  }
});

test('extraction is deterministic', () => assert.equal(contentHash(extractContent()), contentHash(content)));
