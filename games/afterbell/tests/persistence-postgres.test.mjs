import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createGameService, contentHash } from '../service.mjs';

const databaseUrl = process.env.TEST_DATABASE_URL;
const { quizzes } = JSON.parse(await readFile(new URL('../src/content-snapshot.json', import.meta.url), 'utf8'));
const makePayload = q => ({ id: crypto.randomUUID(), name: 'בדיקת משחק', quizId: q.id, contentHash: contentHash(q), startedAt: Date.now() - 1000, answers: q.questions.map(x => ({ id: x.id, choice: x.correct })) });
async function withService(fetchImpl, run) {
  const app = await createGameService({ databaseUrl, fetchImpl });
  await new Promise(resolve => app.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${app.address().port}`;
  const post = payload => fetch(`${base}/api/afterbell/attempts`, { method: 'POST', headers: { Origin: 'http://127.0.0.1:5177', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  try { await run({ base, post }); } finally { await new Promise(resolve => app.close(resolve)); }
}

test('PostgreSQL saves, rejects concurrent conflicts, and preserves verified source versions across restart', { skip: !databaseUrl }, async () => {
  assert.match(new URL(databaseUrl).pathname, /test/i, 'Use an explicitly disposable test database');
  const earlier = structuredClone(quizzes[0]), later = structuredClone(quizzes[0]);
  earlier.questions[0].prompt += ' ';
  later.questions[0].prompt += '  ';
  const completed = makePayload(earlier), pending = makePayload(earlier);
  await withService(async () => Response.json(earlier), async ({ base, post }) => {
    assert.equal((await fetch(`${base}/api/afterbell/quizzes/${earlier.id}`)).status, 200);
    const result = await post({ ...completed, score: 0 });
    assert.equal(result.status, 200);
    assert.equal((await result.json()).score, 100);
    const race = makePayload(earlier), conflicting = structuredClone(race);
    conflicting.answers[0].choice = (conflicting.answers[0].choice + 1) % earlier.questions[0].choices.length;
    const outcomes = await Promise.all([post(race), post(conflicting)]);
    assert.deepEqual(outcomes.map(response => response.status).sort(), [200, 409]);
    const repeats = await Promise.all([post(completed), post(completed)]);
    assert.deepEqual(repeats.map(response => response.status), [200, 200]);
  });
  await withService(async () => Response.json(later), async ({ base, post }) => {
    assert.equal((await fetch(`${base}/api/afterbell/quizzes/${later.id}`)).status, 200);
    assert.equal((await post({ ...completed, answers: [...completed.answers].reverse() })).status, 200);
    const result = await post(pending);
    assert.equal(result.status, 200);
    assert.equal((await result.json()).score, 100);
  });
  await withService(async () => { throw new Error('offline'); }, async ({ post }) => {
    assert.equal((await post(pending)).status, 200);
  });
});
