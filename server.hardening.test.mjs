// Server hardening (docs/TESTING.md "Security"): per-client rate limits, the server's own verdicts and score in the
// email, email text hygiene, security headers, caches and the practice key check. Resend and OpenAI are mocked; no
// real network call is made.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createApp } from './server.mjs';
import { extractContent } from './db/extract.mjs';
import { plainText } from './db/submissions.mjs';
import { legacyPayloads } from './test-fixtures/legacy-email-inputs.mjs';
import './test-fixtures/use-fake-rubrics.mjs';
import './practice-history.js';

const origin = 'https://hitech.agnon.online';
const baseEnv = { RESEND_RPS: '1000', NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };
const rows = extractContent().questions;
const physicsRows = rows.filter((q) => q.exam_id === 'physics-v1-assessment');
const libraryRows = rows.filter((q) => q.exam_id === 'hebrew-v2-library');
const libraryPrefix = 'גרסה 2 · הספרייה בהפסקה · ';
const RLO = String.fromCodePoint(0x202e);
const LRI = String.fromCodePoint(0x2066);
const PDI = String.fromCodePoint(0x2069);
const LRM = String.fromCodePoint(0x200e);
const NUL = String.fromCodePoint(0);
const BEL = String.fromCodePoint(7);

// The page's details for a matched question (library-exam.js / physics-exam.js `answerDetails`), as an honest page sends them.
const detailsOf = (q) => ({
  ...(q.choices ? { options: q.choices } : {}),
  ...(typeof q.correct === 'number' ? { correctAnswer: q.choices[q.correct] } : q.correct && typeof q.correct === 'object' ? { correctAnswer: `${q.correct.value} ${q.correct.unit ?? ''}`.trim() } : {}),
  reference: `${{ 'physics-pdf': 'סיכום המורה', 'physics-site': 'אתר התרגול', 'library-passage': 'הקטע' }[q.reference_id]}, ${q.reference_part}`
});
// An honest page: right answers marked ✓, except every task listed in `wrongAt`, answered wrongly and marked ✕.
function physicsPayload({ name = 'תלמידת פיזיקה', wrongAt = [1, 5, 9], overrides = {} } = {}) {
  return {
    exam: 'physics-v1-assessment', name, attempt: 1, startedAt: new Date(Date.now() - 40 * 60000).toISOString(),
    answers: physicsRows.map((q, i) => {
      const wrong = wrongAt.includes(i);
      return {
        questionId: q.id, question: plainText(q.prompt), ...detailsOf(q),
        answer: q.type === 'open' ? 'הסבר כתוב'
          : q.type === 'fill' ? `${wrong ? q.correct.value + 1 : q.correct.value}\nדרך חישוב: צעדים`
            : q.choices[wrong ? (q.correct + 1) % q.choices.length : q.correct],
        ...(q.type === 'open' ? {} : { correct: !wrong })
      };
    }),
    ...overrides
  };
}
const libraryPayload = () => ({
  exam: 'hebrew-v2-library', name: 'תלמידה', attempt: 1,
  answers: libraryRows.map((q) => ({
    questionId: q.id, question: libraryPrefix + plainText(q.prompt), ...detailsOf(q),
    answer: q.type === 'open' ? 'תשובה פתוחה' : q.choices[q.correct], ...(q.type === 'open' ? {} : { correct: true })
  }))
});
const score = (examRows, verdicts) => globalThis.QuizCore.scoreQuiz(examRows, Object.fromEntries(examRows.map((q, i) => [q.id, verdicts[i] ? 1 : 0])));

async function withApp(run, { env = {}, db = null, resend = () => new Response(JSON.stringify({ id: 'test-email-id' }), { status: 200 }), ai } = {}) {
  const emails = [];
  const aiRequests = [];
  const originalError = console.error; const originalInfo = console.info; const originalWarn = console.warn;
  console.error = console.info = console.warn = () => {};
  const server = createApp({
    sleep: async () => {}, env: { ...baseEnv, ...env }, db,
    sendFetch: async (url, config) => { emails.push({ url, headers: config.headers, body: JSON.parse(config.body) }); return resend(emails.length); },
    aiFetch: async (url, config) => {
      aiRequests.push(JSON.parse(config.body));
      if (ai) return ai(config);
      const body = JSON.parse(config.body);
      const document = JSON.parse(body.messages[1].content.slice(body.messages[1].content.indexOf('\n') + 1));
      return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ results: document.questions.map((q) => ({ questionId: q.questionId, score: q.maxScore, reason: 'טוב' })) }) } }] }), { status: 200 });
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body, headers = {}) => fetch(base + path, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  try { await run({ base, post, submit: (body, headers) => post('/api/submit-exam', body, headers), emails, aiRequests }); }
  finally { console.error = originalError; console.info = originalInfo; console.warn = originalWarn; await new Promise((resolve) => server.close(resolve)); }
}
const from = (ip) => ({ 'X-Forwarded-For': ip });

// ---- 1. rate limits ----

test('a spoofed-Origin flood from one client uses up only that client; a second client is not blocked', () => withApp(async ({ submit, emails }) => {
  // The attacker's Origin must be an allowed one to pass the origin check, which is public knowledge: that is the point.
  for (let i = 0; i < 150; i++) assert.equal((await submit(legacyPayloads[1], from('198.51.100.1'))).status, 200);
  const blocked = await submit(legacyPayloads[1], from('198.51.100.1'));
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get('retry-after'), '3600');
  assert.equal((await submit(physicsPayload(), from('198.51.100.2'))).status, 200); // a student elsewhere
  assert.equal(emails.length, 151);
}));

test('the client is the LAST X-Forwarded-For hop; a spoofed first hop does not give a fresh budget', () => withApp(async ({ submit }) => {
  const env = { SUBMIT_LIMIT_PER_CLIENT: '2' };
  assert.equal((await submit(legacyPayloads[1], from('1.1.1.1, 203.0.113.5'))).status, 200);
  assert.equal((await submit(legacyPayloads[1], from('2.2.2.2, 203.0.113.5'))).status, 200);
  assert.equal((await submit(legacyPayloads[1], from('3.3.3.3, 203.0.113.5'))).status, 429);
  assert.equal((await submit(legacyPayloads[1], from('1.1.1.1, 203.0.113.6'))).status, 200);
}, { env: { SUBMIT_LIMIT_PER_CLIENT: '2' } }));

test('without a proxy header the socket address is the client', () => withApp(async ({ submit }) => {
  assert.equal((await submit(legacyPayloads[1])).status, 200);
  assert.equal((await submit(legacyPayloads[1])).status, 429);
}, { env: { SUBMIT_LIMIT_PER_CLIENT: '1' } }));

test('the global budget (SUBMIT_LIMIT_GLOBAL) also holds, across clients', () => withApp(async ({ submit }) => {
  assert.equal((await submit(legacyPayloads[1], from('10.0.0.1'))).status, 200);
  assert.equal((await submit(legacyPayloads[1], from('10.0.0.2'))).status, 200);
  assert.equal((await submit(legacyPayloads[1], from('10.0.0.3'))).status, 429);
}, { env: { SUBMIT_LIMIT_GLOBAL: '2' } }));

test('requests that fail validation never use a slot (400, 403, 413, 415, 405, 503 paths)', () => withApp(async ({ submit, post, base, emails }) => {
  const ip = from('198.51.100.9');
  for (let i = 0; i < 30; i++) {
    assert.equal((await submit({ ...legacyPayloads[1], name: ' ' }, ip)).status, 400);
    assert.equal((await submit({ ...legacyPayloads[1], answers: [] }, ip)).status, 400);
    assert.equal((await submit({ ...legacyPayloads[1], exam: 'nope' }, ip)).status, 400);
    assert.equal((await submit(legacyPayloads[1], { ...ip, Origin: 'https://evil.example' })).status, 403);
    assert.equal((await submit('{bad', ip)).status, 400);
    assert.equal((await post('/api/submit-exam', legacyPayloads[1], { ...ip, 'Content-Type': 'text/plain' })).status, 415);
    assert.equal((await fetch(`${base}/api/submit-exam`, { method: 'GET', headers: { Origin: origin, ...ip } })).status, 405);
  }
  assert.equal((await submit({ ...legacyPayloads[1], name: 'x'.repeat(250001) }, ip)).status, 413);
  for (let i = 0; i < 2; i++) assert.equal((await submit(legacyPayloads[1], ip)).status, 200);
  assert.equal((await submit(legacyPayloads[1], ip)).status, 429);
  assert.equal(emails.length, 2);
}, { env: { SUBMIT_LIMIT_PER_CLIENT: '2', SUBMIT_LIMIT_GLOBAL: '2' } }));

test('an email provider failure (5xx or no answer) gives the slot back; a 4xx does not', async () => {
  await withApp(async ({ submit, emails }) => {
    for (let i = 0; i < 5; i++) assert.equal((await submit(legacyPayloads[1])).status, 502);
    assert.equal((await submit(legacyPayloads[1])).status, 502); // would be 429 if the failures had been counted
    assert.equal(emails.length, 24); // each submission tried 4 times (1 + 3 retries, same Idempotency-Key)
  }, { env: { SUBMIT_LIMIT_PER_CLIENT: '2' }, resend: () => new Response('{}', { status: 500 }) });
  await withApp(async ({ submit }) => {
    for (let i = 0; i < 4; i++) assert.equal((await submit(legacyPayloads[1])).status, 502);
  }, { env: { SUBMIT_LIMIT_PER_CLIENT: '2' }, resend: () => { throw new Error('network'); } });
  await withApp(async ({ submit }) => {
    assert.equal((await submit(legacyPayloads[1])).status, 502);
    assert.equal((await submit(legacyPayloads[1])).status, 502);
    assert.equal((await submit(legacyPayloads[1])).status, 429);
  }, { env: { SUBMIT_LIMIT_PER_CLIENT: '2' }, resend: () => new Response('{}', { status: 403 }) });
});

test('the limits are configurable and a bad value falls back to the default', () => withApp(async ({ submit }) => {
  for (let i = 0; i < 150; i++) assert.equal((await submit(legacyPayloads[1])).status, 200);
  assert.equal((await submit(legacyPayloads[1])).status, 429);
}, { env: { SUBMIT_LIMIT_PER_CLIENT: 'lots', SUBMIT_LIMIT_GLOBAL: '-3' } }));

const gradeBody = () => ({
  exam: 'hebrew-v2-library',
  answers: ['library-15', 'library-16'].map((id) => ({ questionId: id, question: plainText(libraryRows.find((q) => q.id === id).prompt), answer: `תשובה ${id}` }))
});

test('/api/grade-open: 40 an hour per client and 200 in all', () => withApp(async ({ post }) => {
  for (let client = 0; client < 5; client++) for (let i = 0; i < 40; i++) assert.equal((await post('/api/grade-open', gradeBody(), from(`192.0.2.${client}`))).status, 200);
  assert.equal((await post('/api/grade-open', gradeBody(), from('192.0.2.0'))).status, 429); // that client is full
  assert.equal((await post('/api/grade-open', gradeBody(), from('192.0.2.77'))).status, 429); // the whole budget is full
}, { env: { OPENAI_API_KEY: 'sk-test', OPENAI_DAILY_CAP: '1000' } }));

test('/api/grade-open: invalid requests cost nothing', () => withApp(async ({ post }) => {
  for (let i = 0; i < 40; i++) assert.equal((await post('/api/grade-open', { exam: 'nope', answers: [] })).status, 400);
  assert.equal((await post('/api/grade-open', gradeBody())).status, 200);
}, { env: { OPENAI_API_KEY: 'sk-test' } }));

test('OPENAI_DAILY_CAP: after the cap no OpenAI call is made; the email is still sent and grading is off', () => withApp(async ({ submit, post, emails, aiRequests }) => {
  const grading = [];
  for (let i = 0; i < 3; i++) {
    const response = await submit({ ...libraryPayload(), name: `תלמיד ${i}` }, from(`198.51.100.${i}`));
    assert.equal(response.status, 200);
    grading.push((await response.json()).grading.status);
  }
  assert.deepEqual(grading, ['ok', 'ok', 'none']);
  assert.equal(aiRequests.length, 2);
  assert.equal(emails.length, 3);
  assert.match(emails[2].body.html, /✎ ממתינה לבדיקת המורה/);
  assert.doesNotMatch(emails[2].body.text, /בדיקת AI נכשלה/);
  const retry = await post('/api/grade-open', gradeBody(), from('198.51.100.9'));
  assert.equal(retry.status, 503);
  assert.deepEqual(await retry.json(), { grading: { status: 'off' } });
  assert.equal(aiRequests.length, 2);
}, { env: { OPENAI_API_KEY: 'sk-test', OPENAI_DAILY_CAP: '2' } }));

test('OPENAI_DAILY_CAP counts requests actually made, not rejected ones', () => withApp(async ({ submit, post, aiRequests }) => {
  assert.equal((await post('/api/grade-open', { exam: 'nope' })).status, 400);
  assert.equal((await submit({ ...libraryPayload(), name: ' ' })).status, 400);
  assert.equal(aiRequests.length, 0);
  assert.equal((await submit(libraryPayload())).status, 200);
  assert.equal(aiRequests.length, 1);
  assert.equal((await submit({ ...libraryPayload(), name: 'תלמיד אחר' })).status, 200); // cap of 1 reached: no second call
  assert.equal(aiRequests.length, 1);
}, { env: { OPENAI_API_KEY: 'sk-test', OPENAI_DAILY_CAP: '1' } }));

// ---- 2. server-side truth ----

const mailLine = (text, number) => text.split('\n').find((line) => line.startsWith(`${number}. `));

test('a forged all-correct payload gets the real score, the server verdicts and a mismatch line per forged answer', () => withApp(async ({ submit, emails }) => {
  const forged = physicsPayload({ wrongAt: [] });
  forged.answers.forEach((a, i) => { if (a.correct !== undefined) { a.answer = physicsRows[i].type === 'fill' ? '99999' : physicsRows[i].choices[(physicsRows[i].correct + 1) % physicsRows[i].choices.length]; a.correct = true; } });
  forged.score = { earned: 100, pending: 0 };
  assert.equal((await submit(forged)).status, 200);
  const { text, html } = emails[0].body;
  const gradable = physicsRows.filter((q) => q.type !== 'open').length;
  assert.match(text, /ציון חלקי: 0 מתוך \d+ · \d+ נקודות ממתינות/);
  assert.doesNotMatch(text, /100 מתוך 100/);
  assert.equal(text.match(/הדפדפן דיווח ✓, השרת חישב ✕/g).length, gradable);
  assert.match(text, new RegExp(`ב־${gradable} תשובות הדפדפן דיווח תוצאה שונה`));
  assert.equal(text.match(/^\d+\. ✓ /gm), null);
  assert.equal(text.match(/^\d+\. ✕ /gm).length, gradable);
  assert.match(html, /השרת חישב ✕/);
  assert.equal(html.match(/✓ נכון/g), null);
}));

test('an honest payload: no mismatch lines, the score is the page\'s score, details come from the key', () => withApp(async ({ submit, emails }) => {
  const payload = physicsPayload();
  assert.equal((await submit({ ...payload, score: { earned: 1, pending: 0 } })).status, 200); // the browser's score is ignored
  const { text, html } = emails[0].body;
  const expected = score(physicsRows, payload.answers.map((a) => a.correct === true));
  assert.match(text, new RegExp(`ציון חלקי: ${expected.earned} מתוך ${100 - expected.pending} · ${expected.pending} נקודות ממתינות`));
  assert.doesNotMatch(text, /הדפדפן דיווח|לא זוהתה שאלה|⚠/);
  assert.doesNotMatch(html, /⚠/);
  assert.ok(mailLine(text, 1).startsWith('1. ✓ '));
  assert.ok(mailLine(text, 2).startsWith('2. ✕ ')); // task 2 was answered wrongly by this honest page
}));

test('options, correct answer and source in the email come from the key, not from the browser', () => withApp(async ({ submit, emails }) => {
  const payload = physicsPayload();
  payload.answers[0] = { ...payload.answers[0], options: ['שקר א', 'שקר ב'], correctAnswer: 'התשובה המזויפת', reference: 'מקור מזויף' };
  assert.equal((await submit(payload)).status, 200);
  const { text, html } = emails[0].body;
  assert.doesNotMatch(text, /התשובה המזויפת|מקור מזויף|שקר א/);
  assert.doesNotMatch(html, /התשובה המזויפת|מקור מזויף/);
  assert.match(text, new RegExp(`תשובה נכונה: ${physicsRows[0].choices[physicsRows[0].correct]}`));
  assert.match(text, /מקור: אתר התרגול, פרק 1/);
}));

test('physics numeric formats: 5,7 and 5.7 are both right for 5.7, 57 is wrong; the browser mark is ignored', () => withApp(async ({ submit, emails }) => {
  const at = physicsRows.findIndex((q) => q.type === 'fill' && q.correct.value === 5.7);
  assert.ok(at >= 0);
  for (const [answer, claimed, verdict] of [['5,7', false, '✓'], ['5.7', false, '✓'], ['57', true, '✕']]) {
    const payload = physicsPayload({ name: `מספר ${answer}`, wrongAt: [] });
    payload.answers[at] = { ...payload.answers[at], answer: `${answer}\nדרך חישוב: חישוב`, correct: claimed };
    assert.equal((await submit(payload)).status, 200);
    const text = emails.at(-1).body.text;
    assert.ok(mailLine(text, at + 1).startsWith(`${at + 1}. ${verdict} `), `${answer}: ${mailLine(text, at + 1)}`);
    assert.match(text, /הדפדפן דיווח/);
  }
}, { env: { SUBMIT_LIMIT_PER_CLIENT: '10' } }));

test('library: the version prefix is recognised, the score is the server\'s, shuffled order gives the same result', () => withApp(async ({ submit, emails }) => {
  const payload = libraryPayload();
  assert.equal((await submit({ ...payload, score: { earned: 3, pending: 0 } })).status, 200);
  const shuffled = { ...payload, answers: [...payload.answers].reverse() };
  assert.equal((await submit(shuffled)).status, 200);
  for (const { body } of emails) {
    assert.match(body.text, /ציון חלקי: 75 מתוך 75 · 25 נקודות ממתינות/);
    assert.doesNotMatch(body.text, /⚠/);
  }
  assert.equal(emails[1].body.text.match(/^\d+\. ✓ /gm).length, 16);
}, { env: { OPENAI_API_KEY: '' } }));

test('an answer that matches no question is kept as the browser sent it and flagged "לא זוהתה שאלה"', () => withApp(async ({ submit, emails }) => {
  const payload = physicsPayload();
  payload.answers[3] = { ...payload.answers[3], question: 'שאלה שלא קיימת במבחן', correct: true, correctAnswer: 'תשובה של הדפדפן' };
  payload.answers[4] = { ...payload.answers[4], question: payload.answers[3].question + ' 2' };
  assert.equal((await submit(payload)).status, 200);
  const { text, html } = emails[0].body;
  assert.equal(text.match(/⚠ לא זוהתה שאלה/g).length, 2);
  assert.match(text, /2 תשובות לא זוהו/);
  assert.match(text, /תשובה נכונה: תשובה של הדפדפן/);
  assert.match(html, /לא זוהתה שאלה/);
}));

test('the idempotency key is unchanged: it hashes the browser\'s payload exactly as before', () => withApp(async ({ submit, emails }) => {
  const payload = physicsPayload();
  assert.equal((await submit(payload)).status, 200);
  const answers = payload.answers.map((a) => ({ question: a.question.trim(), answer: a.answer.trim(), correct: a.correct, options: a.options?.map((o) => o.trim()), correctAnswer: a.correctAnswer?.trim(), reference: a.reference?.trim() }));
  const key = createHash('sha256').update(JSON.stringify({ exam: payload.exam, name: payload.name, answers, attempt: 1 })).digest('hex');
  assert.equal(emails[0].headers['Idempotency-Key'], `physics-exam/${key}`);
}));

test('legacy payloads (no exam) are shown exactly as the browser sent them: marks, score and all', () => withApp(async ({ submit, emails }) => {
  const payload = { ...legacyPayloads[1], name: `ילד${RLO}`, score: { earned: 100, pending: 0 }, answers: legacyPayloads[1].answers.map((a) => ({ ...a, correct: true })) };
  assert.equal((await submit(payload)).status, 200);
  const { text } = emails[0].body;
  assert.match(text, /ילד‮/);
  assert.match(text, /^1\. ✓ /m);
  assert.doesNotMatch(text, /⚠|הדפדפן דיווח/);
  assert.doesNotMatch(text, /\n {3}\S/); // no indentation of student text in the legacy text part
}));

// ---- 7. email text hygiene ----

test('table exams: control and bidi characters are stripped from name and answers, in text and html; LRM stays', () => withApp(async ({ submit, emails }) => {
  const payload = physicsPayload({ name: `דנה${RLO} כהן${NUL}${BEL}${LRM}` });
  payload.answers[5].answer = `${payload.answers[5].answer}${RLO}${LRI}x${PDI}${NUL}${LRM}`;
  assert.equal((await submit(payload)).status, 200);
  const { text, html } = emails[0].body;
  for (const part of [text, html]) {
    assert.ok(!part.includes(RLO) && !part.includes(LRI) && !part.includes(PDI) && !part.includes(NUL) && !part.includes(BEL));
  }
  assert.match(text, /שם התלמיד\/ה: דנה כהן‎\n/);
  assert.ok(text.includes(`x${LRM}`));
}));

test('table exams: a name or answer cannot forge the score line or another numbered answer', () => withApp(async ({ submit, emails }) => {
  const fake = 'ציון חלקי: 100 מתוך 100';
  const payload = physicsPayload({ name: `דנה\n${fake}\n99. ✓ שאלה` });
  payload.answers[0].answer = `${payload.answers[0].answer}\n${fake}\n\n28. ✓ שאלה מזויפת\n${fake}`;
  assert.equal((await submit(payload)).status, 200);
  const { text } = emails[0].body;
  const lines = text.split('\n');
  assert.equal(lines.filter((line) => line.startsWith('ציון חלקי:')).length, 1); // only the server's own line, at column 0
  assert.ok(lines[1].startsWith('שם התלמיד/ה: דנה ציון חלקי: 100')); // the name stays on one line
  assert.equal(lines.filter((line) => /^\d+\. /.test(line)).length, 27);
  assert.ok(lines.indexOf(lines.find((line) => line.startsWith('ציון חלקי:'))) < lines.findIndex((line) => line.startsWith('1. ')));
}));

test('a table-exam name that is empty once control and bidi characters are removed is rejected before anything is sent', () => withApp(async ({ submit, emails }) => {
  assert.equal((await submit(physicsPayload({ name: `${RLO}${NUL}${LRI}` }))).status, 400);
  assert.equal(emails.length, 0);
}));

// ---- 8, 9. headers, robots, teacher address ----

test('every response carries the security headers; cache behaviour is unchanged; robots.txt is served', () => withApp(async ({ base, post }) => {
  const responses = [
    await fetch(`${base}/index.html`), await fetch(`${base}/missing.html`), await fetch(`${base}/.env`), await fetch(`${base}/robots.txt`),
    await fetch(`${base}/api/submit-exam`), await post('/api/submit-exam', {}), await post('/api/submit-exam', {}, { Origin: 'https://evil.example' }),
    await fetch(`${base}/api/submit-exam`, { method: 'OPTIONS', headers: { Origin: origin } }), await fetch(base, { method: 'DELETE' }),
    await fetch(`${base}/api/teacher/practice`), await post('/api/practice-result', {})
  ];
  for (const response of responses) {
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', response.url);
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer', response.url);
    assert.equal(response.headers.get('content-security-policy'), "frame-ancestors 'self'", response.url);
  }
  assert.equal(responses[0].headers.get('cache-control'), 'public, max-age=300');
  assert.equal(responses[5].headers.get('cache-control'), 'no-store');
  const robots = responses[3];
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get('content-type'), /^text\/plain/);
  const body = await robots.text();
  assert.match(body, /^Disallow: \/history\.html$/m);
  assert.match(body, /^Disallow: \/api\/$/m);
}));

test('the teacher address is TEACHER_EMAIL, with the current address as the default', async () => {
  await withApp(async ({ submit, emails }) => {
    await submit(legacyPayloads[1]);
    assert.deepEqual(emails[0].body.to, ['345287@gmail.com']);
  });
  await withApp(async ({ submit, emails }) => {
    await submit(legacyPayloads[1]);
    assert.deepEqual(emails[0].body.to, ['teacher@example.org']);
  }, { env: { TEACHER_EMAIL: ' teacher@example.org ' } });
  await withApp(async ({ submit, emails }) => {
    await submit(legacyPayloads[1]);
    assert.deepEqual(emails[0].body.to, ['345287@gmail.com']); // not an address: ignored, never several recipients
  }, { env: { TEACHER_EMAIL: 'a@b.c, other@x.y' } });
});

// ---- 6. cache and limit on the database-backed GET endpoints ----

function readDb() {
  const calls = { health: 0, version: 0, subjects: 0 };
  return {
    calls, flags: { write: false, read: true },
    health: async () => { calls.health++; return true; },
    contentVersion: async () => { calls.version++; return 'v1'; },
    listSubjects: async () => { calls.subjects++; return [{ id: 'hebrew' }]; }
  };
}

test('/api/health and the content version are cached for 15 seconds', () => {
  const db = readDb();
  return withApp(async ({ base }) => {
    for (let i = 0; i < 10; i++) assert.deepEqual(await (await fetch(`${base}/api/health`)).json(), { ok: true, db: 'up' });
    for (let i = 0; i < 10; i++) assert.equal((await fetch(`${base}/api/subjects`)).status, 200);
    assert.equal(db.calls.health, 1);
    assert.equal(db.calls.version, 1);
    assert.equal(db.calls.subjects, 10); // the lookup itself is not cached
  }, { db });
});

test('the unauthenticated database endpoints are limited to 240 a minute per client', () => withApp(async ({ base }) => {
  const get = (path, ip) => fetch(base + path, { headers: from(ip) });
  for (let i = 0; i < 240; i++) assert.equal((await get(i % 2 ? '/api/health' : '/api/subjects', '198.51.100.1')).status, 200);
  const blocked = await get('/api/health', '198.51.100.1');
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get('retry-after'), '60');
  assert.equal((await get('/api/subjects', '198.51.100.1')).status, 429);
  assert.equal((await get('/api/health', '198.51.100.2')).status, 200);
}, { db: readDb() }));

// ---- 5. practice ----

const { QUIZZES, buildPayload } = globalThis.PracticeHistory;
const quizKey = (quiz) => rows.filter((q) => q.quiz_id === quiz);
// choices: the original choice index reported for each question; `claimedRight` is what the browser claims.
function practicePayload(quiz, choices, claimedRight) {
  const right = claimedRight.filter(Boolean).length;
  const earned = Math.round(right / QUIZZES[quiz].count * 100);
  return buildPayload({ quizId: quiz, name: 'שם', score: earned, stars: earned >= 90 ? 3 : earned >= 75 ? 2 : earned >= 50 ? 1 : 0,
    answers: choices.map((choice, index) => ({ index, choice, correct: claimedRight[index] })) });
}
function practiceDb() {
  const stored = [];
  return { stored, flags: { write: true, read: false }, health: async () => true, storePracticeResult: async (value) => { stored.push(value); return 1; } };
}

test('practice: the server checks each choice against the key and stores its own verdicts, score and stars', () => {
  const db = practiceDb();
  return withApp(async ({ post }) => {
    const key = quizKey('facts');
    const wrong = key.map((q) => (q.correct + 1) % q.choices.length);
    // Forged: wrong choices, all claimed right, with the matching score 100 and 3 stars.
    assert.equal((await post('/api/practice-result', practicePayload('facts', wrong, key.map(() => true)))).status, 200);
    assert.equal(db.stored[0].score, 0);
    assert.equal(db.stored[0].stars, 0);
    assert.ok(db.stored[0].answers.every((a) => a.correct === false));
    // Honest: right choices.
    assert.equal((await post('/api/practice-result', practicePayload('facts', key.map((q) => q.correct), key.map(() => true)))).status, 200);
    assert.equal(db.stored[1].score, 100);
    assert.equal(db.stored[1].stars, 3);
    // An honest page that got the 3rd wrong: the stored verdict matches what it claimed.
    const mixed = key.map((q, i) => (i === 2 ? (q.correct + 1) % q.choices.length : q.correct));
    assert.equal((await post('/api/practice-result', practicePayload('facts', mixed, key.map((q, i) => i !== 2)))).status, 200);
    assert.deepEqual(db.stored[2].answers.map((a) => a.correct), key.map((q, i) => i !== 2));
    assert.equal(db.stored[2].score, Math.round(5 / 6 * 100));
  }, { db });
});

test('practice: the day ceiling (PRACTICE_MAX_ROWS_PER_DAY) answers stored:false without touching the database', () => {
  const db = practiceDb();
  return withApp(async ({ post }) => {
    const key = quizKey('facts');
    const body = practicePayload('facts', key.map((q) => q.correct), key.map(() => true));
    const results = [];
    for (let i = 0; i < 4; i++) results.push(await (await post('/api/practice-result', body)).json());
    assert.deepEqual(results.map((r) => r.stored), [true, true, false, false]);
    assert.ok(results.every((r) => r.success === true));
    assert.equal(db.stored.length, 2);
  }, { db, env: { PRACTICE_MAX_ROWS_PER_DAY: '2' } });
});

test('practice: 400 an hour per client and 2000 in all; invalid results use nothing', () => withApp(async ({ post }) => {
  const key = quizKey('facts');
  const body = practicePayload('facts', key.map((q) => q.correct), key.map(() => true));
  for (let i = 0; i < 50; i++) assert.equal((await post('/api/practice-result', { ...body, score: 5 }, from('198.51.100.1'))).status, 400);
  for (let client = 0; client < 5; client++) for (let i = 0; i < 400; i++) assert.equal((await post('/api/practice-result', body, from(`203.0.113.${client}`))).status, 200);
  assert.equal((await post('/api/practice-result', body, from('203.0.113.0'))).status, 429);
  assert.equal((await post('/api/practice-result', body, from('203.0.113.200'))).status, 429); // the global 2000 is full
}));
