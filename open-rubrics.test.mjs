// The rubric structure is public, its content private (open-rubrics.schema.md). With rubric content available every
// open question of the library and physics exams has a server-side rubric, every rubric belongs to a real open
// question, and `max` matches what the question is worth in QuizCore.scoreQuiz (so auto + AI scores add up to 100).
// These tests use invented content (test-fixtures/fake-rubrics.mjs) and never need open-rubrics.private.json.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import './quiz-core.js';
import './test-fixtures/use-fake-rubrics.mjs';
import { fakeRubrics } from './test-fixtures/fake-rubrics.mjs';
import { extractContent } from './db/extract.mjs';
import { openRubricsFor, openRubricFor, openQuestionStructure } from './open-rubrics.mjs';

const rows = extractContent().questions;
const { WEIGHT } = globalThis.QuizCore;

for (const examId of ['hebrew-v2-library', 'physics-v1-assessment']) {
  const questions = rows.filter(q => q.exam_id === examId);
  const open = questions.filter(q => q.type === 'open');
  const rubrics = openRubricsFor(examId);

  test(`${examId}: every open question has a rubric and every rubric id is a real open question`, () => {
    assert.ok(open.length > 0);
    assert.deepEqual(Object.keys(openQuestionStructure(examId)).sort(), open.map(q => q.id).sort());
    assert.deepEqual(Object.keys(rubrics).sort(), open.map(q => q.id).sort());
    for (const q of open) {
      const rubric = openRubricFor(examId, q.id);
      assert.ok(rubric.modelAnswer.length > 10, q.id);
      assert.match(rubric.modelAnswer, /^FAKE/, 'tests run on the invented fixture');
      assert.ok(rubric.rubric.length >= 2 && rubric.rubric.every(point => point.length > 3), q.id);
      assert.ok(rubric.context.length > 20, q.id);
    }
  });

  test(`${examId}: max is the question's share of 100 in QuizCore.scoreQuiz and the shares add up to its pending points`, () => {
    const weightOf = q => (Object.hasOwn(WEIGHT, q.difficulty) ? WEIGHT[q.difficulty] : WEIGHT.medium);
    const total = questions.reduce((sum, q) => sum + weightOf(q), 0);
    let sum = 0;
    for (const q of open) {
      assert.equal(openRubricFor(examId, q.id).max, Math.round(weightOf(q) / total * 10000) / 100, q.id);
      sum += openRubricFor(examId, q.id).max;
    }
    const { earned, pending } = globalThis.QuizCore.scoreQuiz(questions, {});
    assert.equal(earned, 0);
    assert.ok(Math.abs(sum - pending) <= 1, `${sum} vs scoreQuiz pending ${pending}`);
    // A perfect run: all auto answers right + full AI marks is exactly 100 once rounded like the server does.
    const perfect = globalThis.QuizCore.scoreQuiz(questions, Object.fromEntries(questions.map(q => [q.id, 1])));
    assert.equal(Math.min(100, perfect.earned + Math.round(sum)), 100);
  });
}

test('library rubrics send just the paragraph named by the question reference', () => {
  const byId = Object.fromEntries(rows.filter(q => q.exam_id === 'hebrew-v2-library').map(q => [q.id, q]));
  assert.equal(byId['library-16'].reference_part, 'פסקה 3');
  assert.match(openRubricFor('hebrew-v2-library', 'library-16').context, /סידרו ספרים/);
  assert.doesNotMatch(openRubricFor('hebrew-v2-library', 'library-16').context, /סקר בקרב 60/);
  assert.match(openRubricFor('hebrew-v2-library', 'library-15').context, /בסוף אוקטובר/);
  assert.match(openRubricFor('hebrew-v2-library', 'library-19').context, /סקר בקרב 60/);
  assert.equal(openRubricFor('hebrew-v2-library', 'library-19').context, openRubricFor('hebrew-v2-library', 'library-20').context);
});

test('unknown exams and ids have no rubric (including prototype keys)', () => {
  assert.equal(openRubricFor('nope', 'library-15'), undefined);
  assert.equal(openRubricFor('hebrew-v2-library', 'library-01'), undefined);
  assert.equal(openRubricFor('hebrew-v2-library', '__proto__'), undefined);
  assert.deepEqual(openRubricsFor('constructor'), {});
});

// Run `fn` with the rubric env set to `env` (and the private file untouched), then restore.
async function withEnv(env, fn) {
  const saved = { json: process.env.OPEN_RUBRICS_JSON, file: process.env.OPEN_RUBRICS_FILE };
  const set = (name, value) => (value === undefined ? delete process.env[name] : (process.env[name] = value));
  set('OPEN_RUBRICS_JSON', env.json);
  set('OPEN_RUBRICS_FILE', env.file);
  const quiet = console.error;
  console.error = () => {};
  try { return await fn(); } finally {
    console.error = quiet;
    set('OPEN_RUBRICS_JSON', saved.json);
    set('OPEN_RUBRICS_FILE', saved.file);
  }
}

test('load order: OPEN_RUBRICS_JSON (plain or base64:), then OPEN_RUBRICS_FILE, then the local private file', async () => {
  const json = JSON.stringify(fakeRubrics());
  const other = fakeRubrics();
  other['hebrew-v2-library']['library-15'].modelAnswer = 'FAKE from the file source';
  const dir = mkdtempSync(join(tmpdir(), 'rubrics-'));
  const file = join(dir, 'r.json');
  writeFileSync(file, JSON.stringify(other));

  await withEnv({ json }, () => assert.match(openRubricFor('hebrew-v2-library', 'library-15').modelAnswer, /^FAKE model answer/));
  await withEnv({ json: `base64:${Buffer.from(json).toString('base64')}` }, () =>
    assert.match(openRubricFor('hebrew-v2-library', 'library-15').modelAnswer, /^FAKE model answer/));
  await withEnv({ file }, () => assert.equal(openRubricFor('hebrew-v2-library', 'library-15').modelAnswer, 'FAKE from the file source'));
  // The JSON string wins over the file.
  await withEnv({ json, file }, () => assert.match(openRubricFor('hebrew-v2-library', 'library-15').modelAnswer, /^FAKE model answer/));
  // An unreadable JSON falls through to the next source.
  await withEnv({ json: '{not json', file }, () => assert.equal(openRubricFor('hebrew-v2-library', 'library-15').modelAnswer, 'FAKE from the file source'));
  await withEnv({ json: 'base64:@@@', file: join(dir, 'missing.json') }, () => assert.ok(true));
});

test('no private content: no question is gradable (undefined, never an empty rubric)', async () => {
  // Skip the local private file if one exists by pointing OPEN_RUBRICS_JSON at an object with no exam content.
  await withEnv({ json: '{}' }, () => {
    for (const examId of ['hebrew-v2-library', 'physics-v1-assessment']) {
      assert.deepEqual(openRubricsFor(examId), {});
      for (const id of Object.keys(openQuestionStructure(examId))) assert.equal(openRubricFor(examId, id), undefined, id);
    }
  });
});

test('incomplete or malformed records are skipped: only questions with usable content are gradable', async () => {
  const data = fakeRubrics();
  data['hebrew-v2-library']['library-15'].rubric = [];
  data['hebrew-v2-library']['library-16'].modelAnswer = '   ';
  data['hebrew-v2-library']['library-19'] = 'text';
  data['hebrew-v2-library']['not-a-question'] = { modelAnswer: 'FAKE extra', rubric: ['FAKE point'] };
  await withEnv({ json: JSON.stringify(data) }, () => {
    assert.deepEqual(Object.keys(openRubricsFor('hebrew-v2-library')), ['library-20']);
    assert.equal(openRubricFor('hebrew-v2-library', 'not-a-question'), undefined);
    assert.equal(Object.keys(openRubricsFor('physics-v1-assessment')).length, 7);
  });
});

test('a record may bring its own context; otherwise it comes from the page (library) or the model answer (physics)', async () => {
  const data = fakeRubrics();
  data['hebrew-v2-library']['library-15'].context = 'FAKE own context';
  await withEnv({ json: JSON.stringify(data) }, () => {
    assert.equal(openRubricFor('hebrew-v2-library', 'library-15').context, 'FAKE own context');
    assert.match(openRubricFor('hebrew-v2-library', 'library-16').context, /סידרו ספרים/);
    assert.match(openRubricFor('physics-v1-assessment', 'physics-exam-06').context, /FAKE model answer for physics-exam-06/);
  });
});

const privatePath = new URL('./open-rubrics.private.json', import.meta.url);
const hasPrivate = existsSync(privatePath);

test('open-rubrics.private.json (local only) covers exactly the open questions of library and physics', { skip: !hasPrivate && 'no local open-rubrics.private.json' }, async () => {
  const data = JSON.parse(readFileSync(privatePath, 'utf8'));
  await withEnv({ json: JSON.stringify(data) }, () => {
    for (const examId of ['hebrew-v2-library', 'physics-v1-assessment']) {
      const open = rows.filter(q => q.exam_id === examId && q.type === 'open').map(q => q.id).sort();
      assert.deepEqual(Object.keys(data[examId] ?? {}).sort(), open, examId);
      assert.deepEqual(Object.keys(openRubricsFor(examId)).sort(), open, `${examId}: every record is usable`);
    }
  });
});

test('no committed text contains a real model answer', { skip: !hasPrivate && 'no local open-rubrics.private.json' }, () => {
  const data = JSON.parse(readFileSync(privatePath, 'utf8'));
  const secrets = Object.values(data).flatMap(exam => Object.values(exam).flatMap(record => [record.modelAnswer, ...record.rubric]));
  assert.ok(secrets.length > 10);
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]));
  const files = ['open-rubrics.mjs', 'open-rubrics.schema.md', 'README.md', 'AGENTS.md', 'CLAUDE.md', ...walk('docs')].filter(existsSync);
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const secret of secrets) assert.ok(!text.includes(secret), `${file} contains private rubric text`);
  }
});
