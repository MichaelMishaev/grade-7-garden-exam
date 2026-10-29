// Server resilience: malformed URLs never crash the process, rubric/context lookups fail safe, Resend calls are paced
// and retried with the same Idempotency-Key, Resend 409 idempotency answers, body cap, database reconnect.
// Resend and OpenAI are always mocked; time is a fast-forwarded clock (1 real ms = SCALE virtual ms).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import { createApp } from './server.mjs';
import { createDb } from './db/runtime.mjs';
import { extractContent } from './db/extract.mjs';
import { plainText } from './db/submissions.mjs';
import './test-fixtures/use-fake-rubrics.mjs';
import { openRubricFor, setLibraryHtmlReader } from './open-rubrics.mjs';
import { legacyPayloads } from './test-fixtures/legacy-email-inputs.mjs';

const origin = 'https://hitech.agnon.online';
const baseEnv = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };
const SCALE = 20;
const t0 = Date.now();
const now = () => t0 + (Date.now() - t0) * SCALE;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms / SCALE));
const ok = (id = 'test-email-id') => new Response(JSON.stringify({ id }), { status: 200 });
const reply = (status, body, headers = {}) => new Response(JSON.stringify(body), { status, headers });

const libraryRows = extractContent().questions.filter((q) => q.exam_id === 'hebrew-v2-library');
const libraryPayload = (name = 'תלמידת ספרייה') => ({
  exam: 'hebrew-v2-library', name, attempt: 1,
  answers: libraryRows.map((q) => ({
    questionId: q.id, question: plainText(q.prompt),
    answer: q.type === 'open' ? 'תשובה פתוחה' : q.choices[q.correct], ...(q.type === 'open' ? {} : { correct: true })
  }))
});
const named = (index, name) => ({ ...legacyPayloads[index], name });

const unhandled = [];
const onFault = (error) => unhandled.push(error);
process.on('unhandledRejection', onFault);
process.on('uncaughtException', onFault);

async function withApp(run, { env = {}, resend = () => ok(), fast = true, ...options } = {}) {
  const calls = [];
  const original = { error: console.error, info: console.info, warn: console.warn };
  console.error = console.info = console.warn = () => {};
  const server = createApp({
    env: { ...baseEnv, ...env }, db: null, sleep: fast ? sleep : async () => {}, now: fast ? now : Date.now,
    sendFetch: async (url, config) => { calls.push({ url, headers: config.headers, body: JSON.parse(config.body), at: now() }); return resend(calls.length, calls.at(-1)); },
    ...options
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  const post = (path, body, headers = {}) => fetch(base + path, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  try { await run({ calls, base, port, post, submit: (body, headers) => post('/api/submit-exam', body, headers) }); }
  finally { Object.assign(console, original); await new Promise((resolve) => server.close(resolve)); }
}

const raw = (port, text) => new Promise((resolve, reject) => {
  const socket = net.connect(port, '127.0.0.1', () => socket.write(text));
  let data = '';
  socket.on('data', (chunk) => { data += chunk; });
  socket.on('close', () => resolve(data));
  socket.on('error', reject);
  setTimeout(() => socket.destroy(), 1500).unref();
});

// ---- 1. malformed request URLs ----

test('malformed request lines are answered and the process keeps serving', () => withApp(async ({ port, base }) => {
  for (const line of ['GET // HTTP/1.1', 'GET //h:99999 HTTP/1.1', 'GET //%zz HTTP/1.1', 'POST //x:1 HTTP/1.1', 'GET /api/teacher/practice//\\ HTTP/1.1']) {
    const answer = await raw(port, `${line}\r\nHost: x\r\nConnection: close\r\n\r\n`);
    assert.match(answer, /^HTTP\/1\.1 (400|404|405)/, line);
  }
  assert.equal((await fetch(`${base}/robots.txt`)).status, 200);
  assert.deepEqual(unhandled, []);
}, { db: null }));

test('an unexpected error inside a handler becomes a 500 JSON answer, not a dead process', async () => {
  let armed = false;
  const db = { get flags() { if (armed) throw new Error('boom'); return { write: false, read: true }; } };
  await withApp(async ({ base }) => {
    armed = true;
    const response = await fetch(`${base}/api/subjects`);
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { error: 'Server error' });
    armed = false;
    assert.equal((await fetch(`${base}/robots.txt`)).status, 200);
    assert.deepEqual(unhandled, []);
  }, { db });
});

// ---- 2. rubric lookups fail safe ----

test('a throwing rubric lookup turns AI off for the attempt; the email is still sent exactly once', () => withApp(async ({ submit, calls }) => {
  const response = await submit(libraryPayload());
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal((await response.json()).grading.status, 'none');
}, { env: { OPENAI_API_KEY: 'sk-test' }, rubricLookup: () => { throw new Error('rubrics broke'); }, aiFetch: async () => { throw new Error('must not be called'); } }));

test('a missing or changed library page gives an empty context instead of an error', () => {
  try {
    for (const reader of [() => { throw Object.assign(new Error('gone'), { code: 'ENOENT' }); }, () => '<html>no article here</html>']) {
      setLibraryHtmlReader(reader);
      process.env.OPEN_RUBRICS_JSON += ' '; // a new configuration key forces the records to be rebuilt
      const original = console.error; console.error = () => {};
      try {
        const rubric = openRubricFor('hebrew-v2-library', 'library-15');
        assert.ok(rubric, 'the rubric itself is still there');
        assert.equal(rubric.context, '');
      } finally { console.error = original; }
    }
  } finally {
    setLibraryHtmlReader(null);
    process.env.OPEN_RUBRICS_JSON += ' ';
  }
  assert.match(openRubricFor('hebrew-v2-library', 'library-15').context, /\S/);
});

// ---- 3. Resend pacing and retries ----

test('30 students finishing together: Resend limited to 2 a second gets every email exactly once, none lost', () => {
  const seen = []; // virtual start time of every call
  const accepted = new Set();
  return withApp(async ({ submit, calls }) => {
    const responses = await Promise.all(Array.from({ length: 30 }, (_, i) => submit(named(1, `תלמיד ${i}`))));
    assert.deepEqual(responses.map((r) => r.status), Array(30).fill(200));
    assert.equal(accepted.size, 30);
    assert.ok(calls.length >= 30 && calls.length < 40, 'pacing spreads the load; at most a few jittered calls needed a retry');
  }, {
    env: { RESEND_RPS: '2' },
    resend: (_n, call) => {
      const at = call.at;
      const recent = seen.filter((t) => at - t < 500).length; // 'more than 2 a second' with margin for timer jitter
      seen.push(at);
      if (recent >= 2) return reply(429, { name: 'rate_limit_exceeded' }, { 'retry-after': '1' });
      accepted.add(call.headers['Idempotency-Key']);
      return ok(`id-${accepted.size}`);
    }
  });
});

test('a burst above the limit with pacing off: retries recover what they can, nothing is accepted twice', () => {
  const seen = [];
  const accepted = new Set();
  return withApp(async ({ submit }) => {
    const responses = await Promise.all(Array.from({ length: 30 }, (_, i) => submit(named(1, `תלמיד ${i}`))));
    // With pacing at 1000 a second the first wave is rejected; retries only get 3 more tries, so some may still fail:
    // what must hold is that nothing is accepted twice and every 200 corresponds to one accepted email.
    const successes = responses.filter((r) => r.status === 200).length;
    assert.equal(accepted.size, successes);
    assert.ok(responses.every((r) => [200, 502].includes(r.status)));
  }, {
    env: { RESEND_RPS: '1000' },
    resend: (_n, call) => {
      const recent = seen.filter((t) => call.at - t < 900).length;
      seen.push(call.at);
      if (recent >= 2) return reply(429, { name: 'rate_limit_exceeded' }, { 'retry-after': '1' });
      accepted.add(call.headers['Idempotency-Key']);
      return ok();
    }
  });
});

test('a 429 or 5xx is retried with the same Idempotency-Key and honours retry-after; a network error too', () => withApp(async ({ submit, calls }) => {
  const response = await submit(named(1, 'חוזרת'));
  assert.equal(response.status, 200);
  assert.equal(calls.length, 4);
  assert.equal(new Set(calls.map((c) => c.headers['Idempotency-Key'])).size, 1);
  assert.ok(calls[1].at - calls[0].at >= 2000 - SCALE * 3, 'retry-after: 2 was honoured');
  assert.ok(calls[3].at - calls[2].at >= 500);
}, {
  resend: (n) => {
    if (n === 1) return reply(429, {}, { 'retry-after': '2' });
    if (n === 2) return reply(503, {});
    if (n === 3) throw new Error('network');
    return ok();
  }
}));

test('retries give up after 3 times: 502, four calls, and the rate-limit slot is released (429 included)', async () => {
  for (const failure of [() => reply(429, {}), () => reply(500, {}), () => { throw new Error('network'); }]) {
    await withApp(async ({ submit, calls }) => {
      assert.equal((await submit(named(1, 'א'))).status, 502);
      assert.equal(calls.length, 4);
      assert.equal((await submit(named(1, 'א'))).status, 502); // not 429: the slot came back
      assert.equal(calls.length, 8);
    }, { env: { SUBMIT_LIMIT_PER_CLIENT: '1', RESEND_RPS: '1000' }, resend: failure });
  }
});

test('a 4xx other than 429 is not retried', () => withApp(async ({ submit, calls }) => {
  assert.equal((await submit(named(1, 'ב'))).status, 502);
  assert.equal(calls.length, 1);
}, { resend: () => reply(422, { name: 'validation_error' }) }));

test('the pacing queue is bounded: a pile-up is refused (502), the rest are sent, nothing is sent twice', () => withApp(async ({ submit, calls }) => {
  const responses = await Promise.all(Array.from({ length: 40 }, (_, i) => submit(named(1, `תור ${i}`))));
  const statuses = responses.map((r) => r.status);
  assert.ok(statuses.every((s) => s === 200 || s === 502));
  assert.ok(statuses.includes(502));
  assert.equal(statuses.filter((s) => s === 200).length, calls.length);
  assert.equal(new Set(calls.map((c) => c.headers['Idempotency-Key'])).size, calls.length);
}, { fast: false, env: { RESEND_RPS: '1' } }));

// ---- 4. Resend idempotency conflicts ----

test('409 invalid_idempotent_request means the email was accepted earlier: 200, no second row marked, one call', () => {
  const marks = [];
  const db = { flags: { write: true, read: false }, storeSubmission: async () => 7, markEmail: async (id, update) => { marks.push([id, update]); }, updateAiScores: async () => {} };
  return withApp(async ({ submit, calls }) => {
    const response = await submit(libraryPayload('נשלח שוב'));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).success, true);
    assert.equal(calls.length, 1);
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.deepEqual(marks, []);
  }, { db, resend: () => reply(409, { name: 'invalid_idempotent_request', statusCode: 409, message: 'x' }) });
});

test('409 concurrent_idempotent_requests is retried with the same key until the first request finishes', () => withApp(async ({ submit, calls }) => {
  assert.equal((await submit(named(1, 'במקביל'))).status, 200);
  assert.equal(calls.length, 3);
  assert.equal(new Set(calls.map((c) => c.headers['Idempotency-Key'])).size, 1);
}, { resend: (n) => (n < 3 ? reply(409, { name: 'concurrent_idempotent_requests', statusCode: 409, message: 'x' }) : ok()) }));

test('409 concurrent that never clears ends as 502 and gives the slot back', () => withApp(async ({ submit, calls }) => {
  assert.equal((await submit(named(1, 'תקוע'))).status, 502);
  assert.equal(calls.length, 4);
  assert.equal((await submit(named(1, 'תקוע'))).status, 502);
}, { env: { SUBMIT_LIMIT_PER_CLIENT: '1', RESEND_RPS: '1000' }, resend: () => reply(409, { name: 'concurrent_idempotent_requests' }) }));

// ---- 6. body cap ----

test('a 150 KB garden payload is accepted, a 300 KB one is 413 (submit-exam and grade-open)', () => withApp(async ({ submit, post, calls }) => {
  const big = {
    name: 'ענקית', answers: Array.from({ length: 20 }, (_, i) => ({
      question: `ש${i} ${'ש'.repeat(900)}`, answer: 'ת'.repeat(3000), options: Array.from({ length: 12 }, () => 'א'.repeat(60))
    }))
  };
  const size = Buffer.byteLength(JSON.stringify(big));
  assert.ok(size > 150000 && size < 250000, String(size));
  assert.equal((await submit(big)).status, 200);
  assert.equal(calls.length, 1);
  assert.equal((await submit({ ...big, name: 'x'.repeat(300000) })).status, 413);
  assert.equal((await post('/api/grade-open', { pad: 'x'.repeat(300000) })).status, 413);
  assert.equal(calls.length, 1);
}));

// ---- 7. database reconnect ----

test('a failed database connect is not cached: the next call after a short pause connects again', async () => {
  let clock = 1000;
  let attempts = 0;
  const connector = async () => {
    attempts++;
    if (attempts === 1) throw Object.assign(new Error('refused'), { code: 'ECONNREFUSED' });
    return async () => [];
  };
  const db = createDb({ DATABASE_URL: 'postgres://fake/none', DB_WRITE_SUBMISSIONS: '1' }, { connector, now: () => clock });
  assert.equal(await db.health(), false);
  assert.equal(await db.health(), false, 'within a second of the failure it does not hammer the database');
  assert.equal(attempts, 1);
  clock += 1500;
  assert.equal(await db.health(), true);
  assert.equal(await db.health(), true);
  assert.equal(attempts, 2);
});

// Fail closed: if the server's answer keys cannot be used, a table exam is still emailed, but nothing the browser
// claims is shown as verified (no score, no ✓/✕), AI grading is not run under browser-supplied question ids, and the
// teacher is told why.
test('server keys unavailable: email still sent, browser claims not trusted, no AI call, teacher warned', async () => {
  let aiCalls = 0;
  await withApp(async ({ submit, calls }) => {
    const payload = { ...libraryPayload(), score: { earned: 100, pending: 0 } };
    const response = await submit(payload);
    assert.equal(response.status, 200);
    assert.equal(calls.length, 1);
    const { text } = calls[0].body;
    assert.match(text, /אימות השרת לא זמין/);
    assert.doesNotMatch(text, /ציון חלקי|ציון כולל/); // the forged 100 score is not shown
    assert.doesNotMatch(text, /^\d+\. [✓✕]/m); // and no answer carries a verdict mark
    assert.equal(aiCalls, 0);
    assert.deepEqual((await response.json()).grading, { status: 'none', scores: {} });
  }, { env: { OPENAI_API_KEY: 'k' }, judge: () => { throw new Error('keys missing'); }, aiFetch: async () => { aiCalls++; return new Response('{}', { status: 500 }); } });
});

test.after(() => {
  process.off('unhandledRejection', onFault);
  process.off('uncaughtException', onFault);
  assert.deepEqual(unhandled, []);
});
