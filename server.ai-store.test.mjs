// What the server keeps of an attempt in the database (code, attempt, AI grading) and the retry that grades the STORED
// answers (docs/TESTING.md §6, §9). Database, Resend and OpenAI are fakes; nothing leaves the process.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import './test-fixtures/use-fake-rubrics.mjs';
import { createApp } from './server.mjs';
import { extractContent } from './db/extract.mjs';
import { plainText } from './db/submissions.mjs';

const origin = 'https://hitech.agnon.online';
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>', OPENAI_API_KEY: 'sk-test' };
const libraryRows = extractContent().questions.filter(q => q.exam_id === 'hebrew-v2-library');
const openIds = libraryRows.filter(q => q.type === 'open').map(q => q.id);

const libraryPayload = (extra = {}) => ({
  exam: 'hebrew-v2-library', name: 'שם', attempt: 3, score: { earned: 75, pending: 25 },
  answers: libraryRows.map(q => ({ questionId: q.id, question: plainText(q.prompt), answer: q.type === 'open' ? `פתוחה ${q.id}` : 'תשובה', ...(q.type === 'open' ? {} : { correct: true }) })),
  ...extra
});

// A fake OpenAI: `fail` makes it answer 500; otherwise it grades each question with its max score and records the texts it saw.
function openAi({ fail = false } = {}) {
  const seen = [];
  const fetchImpl = async (url, config) => {
    if (fail) return new Response('{}', { status: 500 });
    const body = JSON.parse(config.body);
    const document = JSON.parse(body.messages[1].content.slice(body.messages[1].content.indexOf('\n') + 1));
    seen.push(document.questions.map(q => [q.questionId, q.studentAnswer]));
    const results = document.questions.map(q => ({ questionId: q.questionId, score: q.maxScore, reason: 'טוב' }));
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ results }) } }] }), { status: 200 });
  };
  return { fetchImpl, seen };
}

function fakeDb(overrides = {}) {
  const calls = [];
  const record = (name, result) => async value => { calls.push([name, value]); return typeof result === 'function' ? result(value) : result; };
  return {
    calls, flags: { write: true, read: false },
    storeSubmission: record('storeSubmission', 41), markEmail: record('markEmail'),
    updateAiScores: record('updateAiScores', true), getSubmissionForGrading: record('getSubmissionForGrading', null),
    ...overrides
  };
}

async function withServer(run, { db, ai = openAi() } = {}) {
  const quiet = console.error; console.error = () => {};
  const server = createApp({ env, db, aiFetch: ai.fetchImpl, sendFetch: async () => new Response(JSON.stringify({ id: 'e1' }), { status: 200 }) });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body) => fetch(base + path, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try { await run({ submit: body => post('/api/submit-exam', body), grade: body => post('/api/grade-open', body), ai, db }); }
  finally { console.error = quiet; await new Promise(resolve => server.close(resolve)); }
}
const settle = () => new Promise(resolve => setTimeout(resolve, 20));

test('submit: the exam code and attempt are stored, the response carries submissionRef, the AI result is saved with reasons and total', () => {
  const db = fakeDb();
  return withServer(async ({ submit }) => {
    const body = await (await submit(libraryPayload())).json();
    await settle();
    assert.match(body.submissionRef, /^[0-9a-f]{64}$/);
    const store = db.calls.find(c => c[0] === 'storeSubmission')[1];
    assert.equal(store.key, body.submissionRef);
    assert.deepEqual([store.examId, store.examCode, store.attempt], ['hebrew-v2-library', 'HEB-002', 3]);
    const update = db.calls.find(c => c[0] === 'updateAiScores')[1];
    assert.equal(update.id, 41);
    assert.equal(update.status, 'ok');
    assert.deepEqual(Object.keys(update.scores).sort(), [...openIds].sort());
    assert.equal(update.scores[openIds[0]].reason, 'טוב');
    assert.equal(update.total, Math.round(Object.values(update.scores).reduce((sum, s) => sum + s.score, 0) * 100) / 100);
    assert.ok(!JSON.stringify(body).includes('טוב'), 'reasons never reach the browser');
  }, { db });
});

test('submit: a failed grading is recorded as failed without scores; legacy payloads store nulls and no AI result', async () => {
  const db = fakeDb();
  await withServer(async ({ submit }) => {
    assert.equal((await submit(libraryPayload())).status, 200);
    await settle();
    const update = db.calls.find(c => c[0] === 'updateAiScores')[1];
    assert.deepEqual([update.status, update.scores, update.total], ['failed', undefined, undefined]);
  }, { db, ai: openAi({ fail: true }) });
  const legacyDb = fakeDb();
  await withServer(async ({ submit }) => {
    const response = await submit({ name: 'x', answers: Array.from({ length: 20 }, (_, i) => ({ question: `ש${i}`, answer: 'א' })) });
    assert.deepEqual(await response.json(), { success: true });
    await settle();
    const store = legacyDb.calls.find(c => c[0] === 'storeSubmission')[1];
    assert.deepEqual([store.examCode, store.attempt, 'examId' in store], [undefined, undefined, false]);
    assert.ok(!legacyDb.calls.some(c => c[0] === 'updateAiScores'));
  }, { db: legacyDb });
});

test('submit: a hanging or failing AI-result write never delays or fails the email; no db means no submissionRef', async () => {
  for (const updateAiScores of [() => new Promise(() => {}), async () => { throw Object.assign(new Error('secret'), { code: 'X9' }); }]) {
    await withServer(async ({ submit }) => {
      const started = Date.now();
      assert.equal((await submit(libraryPayload())).status, 200);
      assert.ok(Date.now() - started < 1500);
    }, { db: fakeDb({ updateAiScores }) });
  }
  await withServer(async ({ submit }) => assert.ok(!('submissionRef' in await (await submit(libraryPayload())).json())), { db: null });
  await withServer(async ({ submit }) => assert.ok(!('submissionRef' in await (await submit(libraryPayload())).json())), { db: fakeDb({ flags: { write: false, read: true } }) });
});

const ref = 'a'.repeat(64);
const gradeBody = (extra = {}) => ({
  exam: 'hebrew-v2-library', submissionRef: ref,
  answers: [{ questionId: 'library-15', question: 'ש', answer: 'טקסט מהדפדפן' }], ...extra
});
const storedRow = (extra = {}) => ({
  id: 41, examId: 'hebrew-v2-library', aiStatus: 'failed', aiScores: null,
  answers: [
    { questionId: 'library-01', question: 'סגורה', answer: 'א' },
    { questionId: 'library-15', question: 'שאלה 15', answer: 'טקסט שמור 15' },
    { questionId: 'library-16', question: 'שאלה 16', answer: 'טקסט שמור 16' },
    { questionId: null, question: 'לא מזוהה', answer: 'x' }
  ], ...extra
});

test('grade-open with a submissionRef grades the STORED open answers, not the browser text, and saves the result', () => {
  const db = fakeDb({ getSubmissionForGrading: async () => storedRow() });
  return withServer(async ({ grade, ai }) => {
    const response = await grade(gradeBody());
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(Object.keys(body.grading.scores).sort(), ['library-15', 'library-16']);
    assert.deepEqual(Object.keys(body.grading.scores['library-15']).sort(), ['max', 'score']);
    assert.deepEqual(ai.seen, [[['library-15', 'טקסט שמור 15'], ['library-16', 'טקסט שמור 16']]]);
    await settle();
    const update = db.calls.find(c => c[0] === 'updateAiScores')[1];
    assert.deepEqual([update.id, update.status, Object.keys(update.scores).sort()], [41, 'ok', ['library-15', 'library-16']]);
    assert.equal(update.scores['library-15'].reason, 'טוב');
  }, { db });
});

test('grade-open with a ref falls back to the browser text when there is no row, another exam, nothing mappable, or a db error', async () => {
  const cases = [
    () => null,
    () => storedRow({ examId: 'physics-v1-assessment' }),
    () => storedRow({ answers: [{ questionId: null, question: 'x', answer: 'y' }] }),
    () => { throw Object.assign(new Error('db secret'), { code: 'X1' }); }
  ];
  for (const getSubmissionForGrading of cases) {
    const db = fakeDb({ getSubmissionForGrading: async () => getSubmissionForGrading() });
    await withServer(async ({ grade, ai }) => {
      assert.equal((await grade(gradeBody())).status, 200);
      assert.deepEqual(ai.seen, [[['library-15', 'טקסט מהדפדפן']]]);
      await settle();
      assert.ok(!db.calls.some(c => c[0] === 'updateAiScores'), 'the browser text is never saved as the record');
    }, { db });
  }
});

test('grade-open: a row that is already graded ok returns the stored scores without calling the AI; the database off ignores the ref', async () => {
  const stored = { 'library-15': { score: 4, max: 5.36, reason: 'פרטי' } };
  await withServer(async ({ grade, ai }) => {
    const body = await (await grade(gradeBody())).json();
    assert.deepEqual(body, { grading: { status: 'ok', scores: { 'library-15': { score: 4, max: 5.36 } } } });
    assert.deepEqual(ai.seen, []);
  }, { db: fakeDb({ getSubmissionForGrading: async () => storedRow({ aiStatus: 'ok', aiScores: stored }) }) });
  await withServer(async ({ grade, ai }) => {
    assert.equal((await grade(gradeBody())).status, 200);
    assert.deepEqual(ai.seen, [[['library-15', 'טקסט מהדפדפן']]]);
  }, { db: null });
});

test('grade-open: an invalid submissionRef is a 400; a failed grading is 502 and writes nothing', async () => {
  const db = fakeDb({ getSubmissionForGrading: async () => storedRow() });
  await withServer(async ({ grade }) => {
    for (const bad of ['xyz', 'A'.repeat(64), 5, null]) assert.equal((await grade(gradeBody({ submissionRef: bad }))).status, 400);
    const failed = await grade(gradeBody());
    assert.equal(failed.status, 502);
    assert.deepEqual(await failed.json(), { grading: { status: 'failed' } });
    await settle();
    assert.ok(!db.calls.some(c => c[0] === 'updateAiScores'));
  }, { db, ai: openAi({ fail: true }) });
});
