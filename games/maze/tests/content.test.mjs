import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import snapshot from '../content-snapshot.js';
import { createState, encountersFor } from '../core.js';
import { DEFAULT_QUIZ_ID, MAZE_QUIZZES, loadMazeContent, normalizeMazeContent, validateMazeContent } from '../content.js';

const down = async () => { throw new Error('offline'); };

test('offline catalog is the existing public question snapshot without changed questions', async () => {
  const original = JSON.parse(await readFile(new URL('../../afterbell/src/content-snapshot.json', import.meta.url), 'utf8'));
  assert.deepEqual(snapshot, original);
  assert.equal(DEFAULT_QUIZ_ID, 'facts');
  assert.equal(MAZE_QUIZZES.find(quiz => quiz.id === DEFAULT_QUIZ_ID).count, Math.min(...MAZE_QUIZZES.map(quiz => quiz.count)));
  for (const originalQuiz of original.quizzes) {
    const quiz = await loadMazeContent({ quizId: originalQuiz.id, fetchImpl: down });
    assert.equal(quiz.source, 'snapshot'); assert.equal(quiz.offline, true);
    assert.equal(quiz.questions.length, originalQuiz.questions.length);
    for (const question of quiz.questions) {
      const source = originalQuiz.questions.find(item => item.id === question.id);
      assert.equal(question.prompt, source.prompt); assert.deepEqual(question.choices, source.choices);
      assert.equal(question.correct, source.correct); assert.deepEqual(question.explanation, source.explanation);
      assert.deepEqual(question.ref, source.ref); assert.equal(question.weight, 1.5);
      assert.ok(question.reference.url.includes('garden-exam.html') || question.reference.url.includes('physics-measurements-grade-7.pdf'));
    }
  }
});

test('validated live source preserves correct indices and can be pinned through serialization', async () => {
  const raw = structuredClone(snapshot.quizzes.find(quiz => quiz.id === 'physics-units'));
  const quiz = await loadMazeContent({ quizId: raw.id, fetchImpl: async (url, options) => {
    assert.ok(url.endsWith('/api/quizzes/physics-units')); assert.equal(options.credentials, 'omit');
    return { ok: true, json: async () => raw };
  } });
  assert.equal(quiz.offline, false); assert.equal(quiz.questions[0].correct, 1);
  const restored = normalizeMazeContent(JSON.parse(JSON.stringify(quiz)));
  assert.deepEqual(restored, quiz);
});

test('invalid live content falls back without inventing or silently truncating a set', async () => {
  const cases = [null, { ...snapshot.quizzes[0], id: 'other' }, { ...snapshot.quizzes[0], questions: [] }, { ...snapshot.quizzes[0], questions: snapshot.quizzes[0].questions.slice(1) }];
  for (const raw of cases) {
    const quiz = await loadMazeContent({ fetchImpl: async () => ({ ok: true, json: async () => raw }) });
    assert.equal(quiz.source, 'snapshot'); assert.equal(quiz.questions.length, 6);
  }
  await assert.rejects(loadMazeContent({ quizId: 'invented', fetchImpl: down }), /Unknown maze quiz/);
});

test('validation rejects wrong answer indices, missing explanations, unsafe references and duplicate IDs', () => {
  const change = mutate => { const raw = structuredClone(snapshot.quizzes[0]); mutate(raw); return raw; };
  for (const raw of [
    change(q => { q.questions[0].correct = 99; }),
    change(q => { q.questions[0].explanation.he = ''; }),
    change(q => { q.questions[0].ref.id = 'missing'; }),
    change(q => { q.questions[0].ref.part = 'invented'; }),
    change(q => { q.references[0].url = 'javascript:alert(1)'; }),
    change(q => { q.questions[1].id = q.questions[0].id; })
  ]) assert.equal(validateMazeContent(raw), false);
});

test('content version changes with academic content but not source metadata', () => {
  const raw = structuredClone(snapshot.quizzes[0]);
  const before = normalizeMazeContent(raw);
  assert.equal(normalizeMazeContent(raw, { source: 'live' }).version, before.version);
  raw.questions[0].correct = 1;
  assert.notEqual(normalizeMazeContent(raw).version, before.version);
});

test('homepage keeps both distinct game links with Hebrew titles and separate stylesheet', async () => {
  const html = await readFile(new URL('../../../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="games\/afterbell\/play\/index.html"/);
  assert.match(html, /href="games\/maze\/play\/index.html"/);
  assert.match(html, /id="maze-title">מבוך הצללים/);
  assert.match(html, /maze-entry.css\?v=1/);
});

test('hanging live source is bounded even when fetch ignores abort', async () => {
  const started = Date.now();
  const quiz = await loadMazeContent({ fetchImpl: () => new Promise(() => {}) });
  assert.equal(quiz.source, 'snapshot');
  assert.ok(Date.now() - started < 3000);
});

test('a pinned older full set survives a later snapshot count change without permitting truncated live sets', () => {
  // Simulate an earlier version of facts with five questions; today's bundled version has six.
  const oldRaw = structuredClone(snapshot.quizzes[0]);
  oldRaw.questions.pop();
  assert.throws(() => normalizeMazeContent(oldRaw), /Invalid maze content/);
  const oldPinned = normalizeMazeContent(oldRaw, { pinned: true });
  const restored = normalizeMazeContent(JSON.parse(JSON.stringify(oldPinned)), { pinned: true });
  assert.equal(restored.questions.length, 5);
  assert.deepEqual(restored, oldPinned);
  assert.throws(() => normalizeMazeContent({ ...oldRaw, questions: [] }, { pinned: true }), /Invalid maze content/);
});


test('an eleven-question source bank is preserved across capped trap assignments', async () => {
  const quiz = await loadMazeContent({ quizId: 'physics-units', fetchImpl: down });
  const state = createState(quiz.questions, () => .999999);
  const rooms = encountersFor(quiz.questions);
  assert.equal(quiz.questions.length, 11);
  assert.equal(rooms.length, 4);
  assert.ok(Object.values(state.assignments).every(ids => ids.length >= 1 && ids.length <= 3));
  assert.equal(Object.values(state.assignments).flat().length, 11);
  assert.deepEqual(new Set(Object.values(state.assignments).flat()), new Set(quiz.questions.map(question => question.id)));
});
