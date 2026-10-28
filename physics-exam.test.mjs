// The physics exam must be EXACTLY the teacher's practice site (שרית שרת): same chapters, tasks, order, texts,
// options, answers, explanations, model answers and figures. The fixture is her original data, copied verbatim
// from the site's app.js (`let sections=[...]`). No network.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const plain = (v) => JSON.parse(JSON.stringify(v)); // realm-free data, as in db/extract.mjs

const fixture = JSON.parse(readFileSync(new URL('./test-fixtures/sarit-physics7-sections.json', import.meta.url), 'utf8'));
const source = readFileSync(new URL('./physics-exam.js', import.meta.url), 'utf8');
const slice = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
const questions = plain(runInNewContext(slice('const questions', 'const sections') + '\nquestions;'));
const sections = plain(runInNewContext(slice('const sections', 'const $') + '\nsections;'));
const figures = plain(runInNewContext(slice('const figures = {', '// Questions come from') + '\nfigures;'));
const checklist = runInNewContext(slice('const checklist = q => {', 'function show(') + '\nchecklist;');
const tasks = fixture.sections.flatMap((s, si) => s.qs.map((t) => ({ si, t })));

test('fixture is the teacher data with attribution', () => {
  assert.match(fixture.attribution, /שרית שרת/);
  assert.deepEqual(fixture.sections.map((s) => s.qs.length), [11, 5, 6, 5]);
});

test('same chapters, titles and intros, in the same order', () => {
  assert.deepEqual(sections.map((s) => [s.title, s.intro]), fixture.sections.map((s) => [s.title, s.intro]));
});

test('same 27 tasks in the same order and chapter', () => {
  assert.equal(questions.length, tasks.length);
  questions.forEach((q, i) => {
    assert.equal(q.id, `physics-exam-${String(i + 1).padStart(2, '0')}`);
    assert.equal(q.topic, fixture.sections[tasks[i].si].title, q.id);
  });
});

test('prompts, options, answers, explanations and model answers are byte-identical', () => {
  const typeOf = { choice: 'mcq', num: 'fill', text: 'open' };
  questions.forEach((q, i) => {
    const [prompt, type, options, answer, explanation, , notes] = tasks[i].t;
    assert.equal(q.type, typeOf[type], q.id);
    assert.equal(q.prompt, prompt, q.id);
    assert.equal(q.explanation.he, explanation, q.id);
    assert.equal(notes, type === 'num', `${q.id}: the page shows the notes field for numeric tasks only`);
    if (type === 'choice') {
      assert.deepEqual(q.choices, options, q.id);
      assert.equal(q.choices[q.correct], answer, q.id);
    } else assert.equal(q.choices, undefined, q.id);
    if (type === 'num') assert.deepEqual({ value: q.correct.value, tolerance: q.correct.tolerance }, { value: answer, tolerance: 1e-8 }, q.id);
    if (type === 'text') assert.equal(q.correct, answer, q.id);
  });
});

test('figures are the teacher SVGs, verbatim, on the same tasks', () => {
  const expected = Object.fromEntries(questions.flatMap((q, i) => (tasks[i].t[5] ? [[q.id, tasks[i].t[5]]] : [])));
  assert.deepEqual(Object.keys(expected), ['physics-exam-17', 'physics-exam-18', 'physics-exam-21']);
  assert.deepEqual({ ...figures }, expected);
});

test('the self-check list keeps every word of the model answer', () => {
  const norm = (s) => s.replace(/<br>/g, ' ').replace(/[;\s]+/g, ' ').trim();
  for (const q of questions.filter((x) => x.type === 'open')) {
    const { model, items } = checklist(q);
    assert.ok(items.length >= 1, q.id);
    assert.equal(norm(`${model} <strong>בדקו:</strong> ${items.join(' ')}`), norm(q.explanation.he), q.id);
  }
});

test('every task has a reference part in the summary or the teacher site', () => {
  for (const q of questions) assert.match(`${q.ref.id}:${q.ref.part}`, /^(physics-pdf:עמוד [1-6]|physics-site:פרק [1-4])$/, q.id);
});

test('subject page lists the physics exam with its date', async () => {
  const html = (await import('node:fs')).readFileSync(new URL('./subject.html', import.meta.url), 'utf8');
  assert.match(html, /id: 'physics-v1-assessment'[^\n]*date: '30\.12', count: '27 שאלות'/);
});
