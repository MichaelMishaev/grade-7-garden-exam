import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createGameService, validateAttempt, contentHash } from '../service.mjs';

const { quizzes } = JSON.parse(await readFile(new URL('../src/content-snapshot.json', import.meta.url), 'utf8'));
const quiz = quizzes[0];
const payload = (source = quiz) => ({
  id: crypto.randomUUID(), name: 'בדיקת משחק', quizId: source.id,
  contentHash: contentHash(source), startedAt: Date.now() - 5000,
  answers: source.questions.map(q => ({ id: q.id, choice: q.correct }))
});
async function service(run, options = {}) {
  const app = await createGameService({ databasePath: ':memory:', fetchImpl: async () => { throw new Error('offline'); }, ...options });
  await new Promise(resolve => app.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${app.address().port}`;
  const post = (body, extra = {}) => fetch(`${base}/api/afterbell/attempts`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://127.0.0.1:5177', ...extra },
    body: JSON.stringify(body)
  });
  try { await run({ base, post }); } finally { await new Promise(resolve => app.close(resolve)); }
}

test('server grades source answers and rejects forged, incomplete, repeated or stale questions', () => {
  const p = payload();
  assert.equal(validateAttempt({ ...p, score: 0 }).score, 100);
  assert.equal(validateAttempt({ ...p, answers: p.answers.slice(1) }), null);
  assert.equal(validateAttempt({ ...p, answers: p.answers.map(() => p.answers[0]) }), null);
  assert.equal(validateAttempt({ ...p, contentHash: 'wrong' }), null);
  const difficultyChanged = structuredClone(quiz);
  difficultyChanged.questions[0].difficulty = 'hard';
  assert.notEqual(contentHash(difficultyChanged), contentHash(quiz));
});

test('malformed values fail validation without throwing or recording a result', async () => {
  const p = payload();
  for (const body of [null, [], false, { ...p, id: '-'.repeat(36) }, { ...p, answers: p.answers.map(() => null) }]) {
    assert.equal(validateAttempt(body), null);
  }
  await service(async ({ post }) => {
    for (const body of [null, [], { ...p, answers: p.answers.map(() => null) }]) {
      assert.equal((await post(body)).status, 400);
    }
  });
});

test('completed practice is idempotent, order-independent and rejects conflicting attempt reuse', async () => {
  let fetches = 0;
  await service(async ({ base, post }) => {
    const p = payload();
    assert.equal((await post(p, { Origin: 'https://other.invalid' })).status, 403);
    assert.equal((await post({ ...p, answers: [] })).status, 400);
    const first = await post(p);
    assert.equal(first.status, 200);
    assert.equal((await first.json()).score, 100);
    assert.equal((await post({ ...p, answers: [...p.answers].reverse() })).status, 200);
    const changed = structuredClone(p);
    changed.answers[0].choice = 1 - changed.answers[0].choice;
    assert.equal((await post(changed)).status, 409);
    assert.equal(fetches, 0);
    assert.equal((await fetch(`${base}/api/afterbell/attempts`)).status, 405);
    assert.equal((await fetch(`${base}/.data/attempts.sqlite`)).status, 404);
    assert.equal((await fetch(`${base}/api/submit-exam`, { method: 'POST' })).status, 404);
    assert.equal((await fetch(`${base}/%ZZ`)).status, 400);
    assert.deepEqual(await (await fetch(`${base}/api/afterbell/health`)).json(), { ok: true, history: 'game-database' });
  }, { fetchImpl: async () => { fetches++; throw new Error('offline'); } });
});

test('content adapter retains an in-flight question version when the live source changes', async () => {
  const earlier = structuredClone(quiz), later = structuredClone(quiz);
  earlier.questions[0].prompt += ' ';
  later.questions[0].prompt += '  ';
  let source = earlier;
  const requested = [];
  await service(async ({ base, post }) => {
    assert.equal((await fetch(`${base}/api/quizzes/${quiz.id}`)).status, 200);
    const started = payload(earlier);
    source = later;
    assert.equal((await fetch(`${base}/api/quizzes/${quiz.id}`)).status, 200);
    const saved = await post(started);
    assert.equal(saved.status, 200);
    assert.equal((await saved.json()).score, 100);
    assert.equal((await post(payload())).status, 200);
    assert.equal(requested.length, 2);
    assert.ok(requested.every(x => x.url === `https://hitech.agnon.online/api/quizzes/${quiz.id}` && !x.hasBody));
  }, { fetchImpl: async (url, options) => {
    requested.push({ url, hasBody: Object.hasOwn(options || {}, 'body') });
    return Response.json(source);
  } });
});

test('the attempt endpoint enforces its body size and content-type limits', async () => {
  await service(async ({ post }) => {
    assert.equal((await post(payload(), { 'Content-Type': 'text/plain' })).status, 415);
    assert.equal((await post({ padding: 'x'.repeat(20001) })).status, 413);
  });
});

test('an unsaved live-version attempt remains valid after source change and service restart', async () => {
  const earlier = structuredClone(quiz), later = structuredClone(quiz);
  earlier.questions[0].prompt += ' ';
  later.questions[0].prompt += '  ';
  const databasePath = join(await mkdtemp(join(tmpdir(), 'afterbell-qa-')), 'attempts.sqlite');
  const pending = payload(earlier);
  let source = earlier;
  const options = { databasePath, fetchImpl: async () => Response.json(source) };
  await service(async ({ base }) => {
    assert.equal((await fetch(`${base}/api/quizzes/${quiz.id}`)).status, 200);
  }, options);
  source = later;
  await service(async ({ base, post }) => {
    assert.equal((await fetch(`${base}/api/quizzes/${quiz.id}`)).status, 200);
    const response = await post(pending);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).score, 100);
  }, options);
  await service(async ({ post }) => {
    const response = await post({ ...pending, answers: [...pending.answers].reverse() });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).score, 100);
  }, { databasePath });
});

test('all seven quiz sets save with source choice indices and independently computed grades', async () => {
  await service(async ({ post }) => {
    for (const source of quizzes) {
      const perfect = await post({ ...payload(source), score: -1000 });
      assert.equal(perfect.status, 200);
      assert.equal((await perfect.json()).score, 100);
      const missed = payload(source);
      missed.answers[0].choice = (missed.answers[0].choice + 1) % source.questions[0].choices.length;
      const imperfect = await post({ ...missed, score: 100 });
      assert.equal(imperfect.status, 200);
      const weights = { easy: 1, medium: 1.5, hard: 2 };
      const total = source.questions.reduce((sum, q) => sum + (weights[q.difficulty] || 1.5), 0);
      assert.equal((await imperfect.json()).score, Math.round((total - (weights[source.questions[0].difficulty] || 1.5)) / total * 100));
    }
  });
});

test('origin rejection, invalid JSON and instance rate limit preserve the request boundary', async () => {
  let now = Date.now();
  await service(async ({ base, post }) => {
    assert.equal((await post(payload(), { Origin: 'null' })).status, 403);
    const malformed = await fetch(`${base}/api/afterbell/attempts`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://127.0.0.1:5177' }, body: '{' });
    assert.equal(malformed.status, 400);
    const p = payload();
    for (let i = 0; i < 199; i++) assert.equal((await post(p)).status, 200);
    assert.equal((await post(p)).status, 429);
    now += 3600000;
    assert.equal((await post(p)).status, 200);
  }, { clock: () => now });
});
