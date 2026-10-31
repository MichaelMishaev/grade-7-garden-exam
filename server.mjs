import http from 'node:http';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { renderExamEmail, renderExamText, testLabel, cleanText, cleanLine } from './email-template.mjs';
import { judgeAnswers } from './exam-truth.mjs';
import { judgePractice } from './practice-truth.mjs';
import { clientOf, intFrom, createLimiter, createCounter, cachedFor } from './limits.mjs';
import { gradeOpenAnswers } from './ai-grading.mjs';
import { openRubricFor as lookupRubric } from './open-rubrics.mjs';
import { createResendSender, isAlreadyAccepted } from './resend-send.mjs';
import { createDb } from './db/runtime.mjs';
import { createHistoryHandler } from './history-api.mjs';
import './quiz-core.js';
import './practice-history.js';

const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};
const defaultTeacher = '345287@gmail.com';

// Exams that identify themselves with the payload field `exam`. Every exam uses the same endpoint, Resend account,
// sender, teacher, limits and origin rules; only the answer count, subject, idempotency prefix and email title differ.
// A payload WITHOUT `exam` is one of the original Hebrew exams (garden, library) and keeps the original 20-answer
// rules, subject and idempotency key byte for byte. An unknown `exam` value is rejected.
const legacyExam = { count: 20, idempotencyPrefix: 'garden-exam', subject: 'תשובות למבחן הבנת הנקרא - כיתה ז׳' };
// `code` is the permanent, unique test code (docs/TESTING.md §1); it is never reused or changed.
export const exams = Object.assign(Object.create(null), {
  'hebrew-v1-garden': {
    code: 'HEB-001', count: 20, idempotencyPrefix: 'garden-exam', subject: legacyExam.subject,
    title: 'תשובות למבחן הבנת הנקרא', subtitle: 'כיתה ז׳2 · שי עגנון, נתניה'
  },
  'hebrew-v2-library': {
    code: 'HEB-002', count: 20, idempotencyPrefix: 'library-exam', subject: legacyExam.subject,
    title: 'תשובות למבחן הבנת הנקרא', subtitle: 'כיתה ז׳2 · שי עגנון, נתניה'
  },
  'physics-v1-assessment': {
    code: 'PHY-001', count: 27, idempotencyPrefix: 'physics-exam', subject: 'תשובות למשימת הערכה במדידות - פיזיקה - כיתה ז׳',
    title: 'תשובות למשימת הערכה במדידות', subtitle: 'פיזיקה · כיתה ז׳2 · שי עגנון, נתניה'
  }
});

// A rubric lookup must never take a request down: any error means "no rubric", so AI grading is simply off for it.
const safeRubric = lookup => (examId, questionId) => {
  try { return lookup(examId, questionId); } catch (error) { console.error('rubric lookup failed', error?.code ?? error?.name); return undefined; }
};

// Shared by the POST endpoints that take an exam payload (/api/submit-exam, /api/grade-open): origin allow-list, CORS
// preflight, method, content type and body size. Returns the parsed JSON body, or undefined after answering itself.
async function readExamPost(request, response, json, allowedOrigins, { maxBytes, tooLarge }) {
  if (!allowedOrigins.has(request.headers.origin)) return void json(403, { error: 'Origin not allowed' });
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
  response.setHeader('Vary', 'Origin');
  if (request.method === 'OPTIONS') {
    response.writeHead(204, { 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }).end();
    return;
  }
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS');
    return void json(405, { error: 'Method not allowed' });
  }
  if (request.headers['content-type']?.split(';')[0] !== 'application/json') return void json(415, { error: 'JSON required' });
  try {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > maxBytes) return void json(413, { error: tooLarge });
      chunks.push(chunk);
    }
    return { payload: JSON.parse(Buffer.concat(chunks).toString('utf8')) };
  } catch { return void json(400, { error: 'Invalid JSON' }); }
}

// Takes one slot of a per-client + global limiter (limits.mjs); answers 429 and returns null when full.
function takeSlot(limiter, request, response, json, retryAfter = 3600) {
  const slot = limiter.take(clientOf(request));
  if (!slot) {
    response.setHeader('Retry-After', String(retryAfter));
    json(429, { error: 'Please try again later' });
  }
  return slot;
}

// What the browser may see of the AI grading: score and maximum per question, never the reason (teacher only).
// Sum of the AI points of one attempt, to two decimals (the precision of the rubric maxima).
const totalScore = scores => Math.round(Object.values(scores).reduce((sum, { score }) => sum + score, 0) * 100) / 100;

// The stored submission behind a `submissionRef`, as { id, done } (already graded 'ok': its scores) or { id, items } (the
// open answers as saved, matched to question ids by the database layer). null means "use the browser's answers": no row,
// another exam, nothing mappable to a rubric, a database error or no answer within 2 seconds.
async function storedGrading(db, examId, ref, openRubricFor) {
  let timer;
  try {
    const row = await Promise.race([db.getSubmissionForGrading(ref), new Promise(resolve => { timer = setTimeout(() => resolve(null), 2000); })]);
    if (!row || row.examId !== examId) return null;
    if (row.aiStatus === 'ok' && row.aiScores && typeof row.aiScores === 'object') return { id: row.id, done: row.aiScores };
    const items = row.answers.filter(a => a.questionId && openRubricFor(examId, a.questionId))
      .map(a => ({ questionId: a.questionId, question: a.question, answer: a.answer }));
    return items.length ? { id: row.id, items } : null;
  } catch (error) {
    console.error('stored grading lookup failed', error?.code ?? error?.name);
    return null;
  } finally { clearTimeout(timer); }
}

// No OPENAI_API_KEY = AI grading is off (not a failure): no call, no failure note, no retry.
const aiConfigured = env => typeof env.OPENAI_API_KEY === 'string' && env.OPENAI_API_KEY.trim() !== '';

const exposedScores = scores => Object.fromEntries(Object.entries(scores).map(([id, { score, max }]) => [id, { score, max }]));

export function createApp({ env = process.env, sendFetch = fetch, aiFetch = fetch, aiTimeoutMs = 12000, db = createDb(env), sleep, now = Date.now, rubricLookup = lookupRubric, judge = judgeAnswers } = {}) {
  const openRubricFor = safeRubric(rubricLookup);
  // Resend is paced and retried (resend-send.mjs); `sleep` and `now` can be replaced by tests.
  const resendSend = createResendSender({ fetchImpl: sendFetch, rps: intFrom(env.RESEND_RPS, 2), now, ...(sleep ? { sleep } : {}) });
  // Every limit is per client AND global, in memory. Requests that fail validation never reach them.
  const submitLimit = createLimiter({ perClient: intFrom(env.SUBMIT_LIMIT_PER_CLIENT, 150), global: intFrom(env.SUBMIT_LIMIT_GLOBAL, 600) });
  const gradeLimit = createLimiter({ perClient: 40, global: 200 });
  const practiceLimit = createLimiter({ perClient: 400, global: 2000 });
  const readLimit = createLimiter({ perClient: 240, global: 20000, windowMs: 60000 });
  // OpenAI calls actually made in the last 24 hours; at the cap grading is simply off (the email is still sent).
  const aiCalls = createCounter({ cap: intFrom(env.OPENAI_DAILY_CAP, 400, { min: 0 }) });
  const countedAiFetch = (...args) => { aiCalls.spend(); return aiFetch(...args); };
  const practiceDay = { day: '', count: 0 };
  const practiceRowsMax = intFrom(env.PRACTICE_MAX_ROWS_PER_DAY, 5000);
  const teacherAddress = /^[^\s@,<>]+@[^\s@,<>]+$/.test(env.TEACHER_EMAIL?.trim() ?? '') ? env.TEACHER_EMAIL.trim() : defaultTeacher;
  // The unauthenticated database-backed GET endpoints answer from a 15 s cache so they cannot keep the pool busy.
  const healthy = db ? cachedFor(15000, async () => (await db.health() ? 'up' : 'down')) : null;
  const contentVersion = db?.flags.read ? cachedFor(15000, () => db.contentVersion()) : null;
  const teacherHistory = createHistoryHandler({ env, db });
  // Nothing a client sends may take the process down: the whole handler runs inside one catch (only the error name is logged).
  let gameService;
  const app = http.createServer((request, response) => {
    handle(request, response).catch(error => {
      console.error('request failed', error?.code ?? error?.name);
      try {
        if (!response.headersSent) response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }).end(JSON.stringify({ error: 'Server error' }));
        else response.end();
      } catch { response.destroy(); }
    });
  });

  app.on('close', () => { gameService?.then(game => game.emit('close')).catch(() => {}); });
  return app;

  async function handle(request, response) {
  const requestStart = now();
  const allowedOrigins = new Set([
    env.APP_ORIGIN || 'https://hitech.agnon.online',
    'https://web-production-1a642.up.railway.app',
    'https://michaelmishaev.github.io',
    ...(env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000'])
  ]);
  // On every response, static or API. Only frame-ancestors: the pages use inline code, so scripts are not restricted.
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  const json = (status, body) => response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'
  }).end(JSON.stringify(body));

  // A request line the URL parser rejects (`//`, `//h:99999`, ...) is answered here, before any route sees it.
  let parsedUrl;
  try { parsedUrl = new URL(request.url, 'http://localhost'); } catch { return void response.writeHead(400).end(); }

  if (parsedUrl.pathname.startsWith('/api/afterbell/')) {
    try {
      gameService ??= import('./games/afterbell/service.mjs').then(({ createGameService }) => createGameService({
        allowedOrigins: [...allowedOrigins], databaseUrl: env.DATABASE_URL,
        ...(env.AFTERBELL_DATABASE_PATH ? { databasePath: env.AFTERBELL_DATABASE_PATH } : {})
      })).catch(error => { gameService = undefined; throw error; });
      const game = await gameService;
      game.emit('request', request, response);
    } catch { json(503, { error: 'Game history unavailable' }); }
    return;
  }

  if (request.url === '/api/submit-exam') {
    const received = await readExamPost(request, response, json, allowedOrigins, { maxBytes: 250000, tooLarge: 'Submission too large' });
    if (!received) return;
    const { payload } = received;
    const validText = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
    const examId = payload?.exam;
    if (examId !== undefined && !(typeof examId === 'string' && Object.hasOwn(exams, examId))) return json(400, { error: 'Unknown exam' });
    const exam = examId === undefined ? legacyExam : exams[examId];
    if (!payload || !validText(payload.name, 120) || !Array.isArray(payload.answers) || payload.answers.length !== exam.count ||
        !payload.answers.every(item => item && validText(item.question, 1000) && validText(item.answer, 3000))) {
      return json(400, { error: `Name and all ${exam.count} answers are required` });
    }
    // Optional per-answer context for the teacher's email (docs/TESTING.md §8) and the attempt number for this name.
    const validOptions = value => value === undefined || (Array.isArray(value) && value.length <= 12 && value.every(item => validText(item, 500)));
    const validOptional = (value, max) => value === undefined || validText(value, max);
    if (!payload.answers.every(item => validOptions(item.options) && validOptional(item.correctAnswer, 3000) && validOptional(item.reference, 200))) {
      return json(400, { error: 'Invalid answer details' });
    }
    // `questionId` (table exams only) names the question, so open answers can be graded against the server-side rubric.
    if (examId !== undefined && !payload.answers.every(item => item.questionId === undefined || validText(item.questionId, 80))) {
      return json(400, { error: 'Invalid answer details' });
    }
    // Table exams: the name is shown on one line of the email, so it must keep something after control and bidi characters go.
    if (examId !== undefined && !cleanLine(payload.name)) return json(400, { error: `Name and all ${exam.count} answers are required` });
    if (payload.attempt !== undefined && !(Number.isInteger(payload.attempt) && payload.attempt >= 1 && payload.attempt <= 99)) return json(400, { error: 'Invalid attempt' });
    const attempt = examId === undefined ? undefined : payload.attempt;
    const validTime = value => typeof value === 'string' && value.length <= 40 && !Number.isNaN(Date.parse(value));
    // Table exams: the finish time is the server's own clock at receipt (docs/TESTING.md §6), so the duration cannot be
    // shortened from the browser; only the start time comes from the page, and a start in the future is ignored.
    // Payloads without `exam` keep the original rule (both times from the page).
    const receivedAt = new Date().toISOString();
    const finishedAtValue = examId === undefined ? payload.finishedAt : receivedAt;
    const timed = validTime(payload.startedAt) && validTime(finishedAtValue) && Date.parse(finishedAtValue) >= Date.parse(payload.startedAt);
    const times = timed ? { startedAt: payload.startedAt, finishedAt: finishedAtValue } : {};
    const points = value => Number.isInteger(value) && value >= 0 && value <= 100;
    const claimedScore = points(payload.score?.earned) && points(payload.score?.pending) && payload.score.earned + payload.score.pending <= 100
      ? { earned: payload.score.earned, pending: payload.score.pending } : undefined;
    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return json(503, { error: 'Email service unavailable' });
    // Only a valid request uses up a slot; one the email provider could not take gives it back below.
    const slot = takeSlot(submitLimit, request, response, json);
    if (!slot) return;
    const name = payload.name.trim();
    const answers = payload.answers.map(item => ({ question: item.question.trim(), answer: item.answer.trim(), correct: typeof item.correct === 'boolean' ? item.correct : undefined,
      ...(examId === undefined ? {} : { options: item.options?.map(option => option.trim()), correctAnswer: item.correctAnswer?.trim(), reference: item.reference?.trim() }) }));
    // The attempt number is part of the key, so a retaken exam with identical answers is still emailed (docs/TESTING.md §6);
    // sending the same attempt twice stays deduplicated. Legacy payloads (no `exam`) keep the original key byte for byte.
    const key = createHash('sha256').update(JSON.stringify(examId === undefined ? { name, answers: answers.map(({ question, answer, correct }) => ({ question, answer, correct })) } : { exam: examId, name, answers, ...(attempt === undefined ? {} : { attempt }) })).digest('hex');
    // Best effort: a slow or failing database must never block or fail the email.
    // A write that outlives the 2s wait still completes, and the email status is recorded once it does.
    const storing = db?.flags.write ? Promise.resolve().then(() => db.storeSubmission({ key, name, answers, ...times, ...(examId === undefined ? {} : { examId, examCode: exam.code, attempt }) })) : null;
    storing?.catch(error => console.error('submission store failed', error?.code ?? error?.name));
    if (storing) {
      let timer;
      await Promise.race([storing.catch(() => {}), new Promise(resolve => { timer = setTimeout(resolve, 2000); })]);
      clearTimeout(timer);
    }
    const markEmail = update => storing?.then(id => db.markEmail(id, update)).catch(() => {});
    // AI grading of open questions (docs/TESTING.md §9): never blocks or changes the email, and is not part of the key.
    // The name is not passed. A failure is only noted for the teacher; the open answers stay unchecked.
    // Server-side truth (exam-truth.mjs): verdicts, score and the key details come from the question keys, not the browser.
    let truth = null;
    if (examId !== undefined) {
      try { truth = judge(examId, answers); } catch { console.error('exam keys unavailable'); }
    }
    // With the keys, an open answer is graded under the id of the question the SERVER matched, so a forged questionId
    // cannot pair an answer with an easier rubric; answers that match no question are not graded.
    // Any error while finding them means AI is off for this attempt; the email is still sent.
    // Fail closed: if the keys cannot be used for a table exam, nothing the browser claims is trusted (no AI grading
    // under browser question ids, no score, no verdict marks) and the email says so.
    const truthFailed = examId !== undefined && !truth;
    let gradingItems = [];
    try {
      gradingItems = examId === undefined || truthFailed ? [] : payload.answers.flatMap((item, i) => {
        const known = truth ? truth.answers[i] : null;
        const questionId = known ? known.questionId : item.questionId;
        const open = known ? known.matched && known.correct === undefined : item.correct === undefined;
        return questionId !== undefined && open && openRubricFor(examId, questionId)
          ? [{ index: i, questionId, question: answers[i].question, answer: answers[i].answer }] : [];
      });
    } catch (error) { console.error('grading items unavailable', error?.code ?? error?.name); }
    const grading = gradingItems.length && aiConfigured(env) && aiCalls.available()
      ? await gradeOpenAnswers({ examId, items: gradingItems, env, fetchImpl: countedAiFetch, timeoutMs: aiTimeoutMs }).catch(() => ({ status: 'failed' }))
      : { status: 'none' };
    // The score is the server's for table exams (the browser's claim is ignored); legacy payloads keep the browser's.
    const score = examId === undefined ? claimedScore : truth ? truth.score : undefined;
    const aiScores = grading.status === 'ok' ? grading.scores : {};
    // Keep the grading (with the reasons) on the stored row so a retry or the teacher can find it later. Best effort:
    // runs once the row exists, never delays or fails the email, and a failure is logged by code only.
    if (examId !== undefined && typeof db?.updateAiScores === 'function') {
      storing?.then(id => db.updateAiScores({ id, status: grading.status, ...(grading.status === 'ok' ? { scores: aiScores, total: totalScore(aiScores) } : {}) }))
        .catch(error => console.error('ai score store failed', error?.code ?? error?.name));
    }
    // Table exams: what the email shows is the server's verdict and key details (browser values only for answers that
    // matched no question), with control and bidi characters removed. Legacy payloads are shown exactly as sent.
    const shown = examId === undefined ? answers : answers.map((item, i) => {
      const known = truth?.answers[i];
      const trusted = known?.matched;
      return {
        question: cleanText(item.question), answer: cleanText(item.answer),
        correct: known ? known.correct : truthFailed ? undefined : item.correct,
        options: (trusted ? known.options : item.options)?.map(cleanText),
        correctAnswer: (trusted ? known.correctAnswer : item.correctAnswer) === undefined ? undefined : cleanText(trusted ? known.correctAnswer : item.correctAnswer),
        reference: (trusted ? known.reference : item.reference) === undefined ? undefined : cleanText(trusted ? known.reference : item.reference),
        flags: known?.flags ?? []
      };
    });
    const emailAnswers = grading.status === 'ok' ? shown.map((item, i) => {
      const ai = aiScores[gradingItems.find(open => open.index === i)?.questionId];
      return ai ? { ...item, ai } : item;
    }) : shown;
    const displayName = examId === undefined ? name : cleanLine(name);
    const emailScore = grading.status === 'ok' && score
      ? { earned: Math.min(100, score.earned + Math.round(Object.values(aiScores).reduce((sum, { score: points }) => sum + points, 0))), pending: 0, final: true } : score;
    const aiNote = grading.status === 'failed' ? 'בדיקת AI נכשלה' : undefined;
    const notes = truth?.notes ?? (truthFailed ? ['⚠ אימות השרת לא זמין: הציון וסימוני ה־✓/✕ אינם מוצגים כי לא ניתן היה לאמת אותם. הבדיקה צריכה להיעשות ידנית.'] : []);
    try {
      const result = await resendSend('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `${exam.idempotencyPrefix}/${key}` },
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: [teacherAddress],
          subject: exam.code ? `${exam.subject} · ${testLabel(exam.code, attempt)}` : exam.subject,
          text: renderExamText({ code: exam.code, attempt, name: displayName, times, score: emailScore, aiNote, notes, answers: emailAnswers, safe: examId !== undefined }),
          // Table exams label answers without a `correct` mark (written tasks) as waiting for the teacher.
          html: renderExamEmail({ name: displayName, answers: emailAnswers, score: emailScore, ...times, origin: env.APP_ORIGIN || 'https://hitech.agnon.online',
            ...(exam.code ? { code: exam.code, attempt } : {}), ...(aiNote ? { aiNote } : {}), ...(notes.length ? { notes } : {}),
            ...(exam.title ? { title: exam.title, subtitle: exam.subtitle, markPending: true } : {}) })
        }),
      }, { deadline: requestStart + 40000 });
      const data = result.data ?? {};
      // The same key was already accepted with another body (a retry after a lost answer): the teacher has that email.
      // No row is marked again; the earlier attempt's status stands.
      if (isAlreadyAccepted(result.status, data)) {
        console.info('Exam email already accepted by Resend', result.status);
        return json(200, examId === undefined ? { success: true } : { success: true, grading: { status: grading.status, scores: exposedScores(aiScores) }, ...(db?.flags.write ? { submissionRef: key } : {}) });
      }
      if (!result.ok || typeof data.id !== 'string' || !data.id) {
        console.error('Resend rejected submission', result.status);
        if (result.status >= 500 || result.status === 429 || result.status === 409) slot.release(); // the provider failed, not the student // the provider failed, not the student: the attempt is not used up
        markEmail({ status: 'failed', httpStatus: result.status });
        return json(502, { error: 'Email submission failed' });
      }
      console.info('Exam email accepted by Resend', data.id);
      markEmail({ status: 'accepted', resendId: data.id, httpStatus: result.status });
      // Table exams also report the grading outcome (scores without the reasons, which are for the teacher only).
      return json(200, examId === undefined ? { success: true } : { success: true, grading: { status: grading.status, scores: exposedScores(aiScores) }, ...(db?.flags.write ? { submissionRef: key } : {}) });
    } catch {
      console.error('Resend submission unavailable');
      slot.release();
      markEmail({ status: 'failed' });
      return json(502, { error: 'Email submission failed' });
    }
  }

  // Stateless retry of the AI grading (docs/TESTING.md §9) for the browser when the grading inside /api/submit-exam failed.
  // Same origin, content type, size and rate-limit rules; no name, no email. 200 { grading: { status: 'ok', scores } } or
  // 502 { grading: { status: 'failed' } }; scores carry no reasons.
  if (request.url === '/api/grade-open') {
    const received = await readExamPost(request, response, json, allowedOrigins, { maxBytes: 250000, tooLarge: 'Request too large' });
    if (!received) return;
    const { payload } = received;
    const validText = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
    const examId = payload?.exam;
    if (!(typeof examId === 'string' && Object.hasOwn(exams, examId))) return json(400, { error: 'Unknown exam' });
    const items = payload.answers;
    if (!Array.isArray(items) || items.length < 1 || items.length > 40 ||
        !items.every(item => item && validText(item.questionId, 80) && openRubricFor(examId, item.questionId) && validText(item.question, 1000) && validText(item.answer, 3000)) ||
        new Set(items.map(item => item.questionId)).size !== items.length) {
      return json(400, { error: 'Open answers are required' });
    }
    // Optional `submissionRef` (the hex key /api/submit-exam returned): when database writes are on and that row exists,
    // the open answers STORED with it are graded instead of the browser's text, and the result is saved on the row.
    const ref = payload.submissionRef;
    if (ref !== undefined && !(typeof ref === 'string' && /^[0-9a-f]{64}$/.test(ref))) return json(400, { error: 'Invalid submission reference' });
    // No key, or the daily cap of OpenAI calls is used up: grading is off (not a failure), nothing is sent to OpenAI.
    if (!aiConfigured(env) || !aiCalls.available()) return json(503, { grading: { status: 'off' } });
    if (!takeSlot(gradeLimit, request, response, json)) return;
    const stored = ref && db?.flags.write && typeof db.getSubmissionForGrading === 'function' ? await storedGrading(db, examId, ref, openRubricFor) : null;
    if (stored?.done) return json(200, { grading: { status: 'ok', scores: exposedScores(stored.done) } });
    const grading = await gradeOpenAnswers({
      examId, env, fetchImpl: countedAiFetch, timeoutMs: aiTimeoutMs,
      items: stored?.items ?? items.map(item => ({ questionId: item.questionId, question: item.question.trim(), answer: item.answer.trim() }))
    }).catch(() => ({ status: 'failed' }));
    if (grading.status !== 'ok') return json(502, { grading: { status: 'failed' } });
    // Best effort, never blocks or fails the response. Only a grading of the stored answers is saved: the browser's own
    // text is not trusted enough to become the record. The email is never re-sent from here.
    if (stored?.items) {
      Promise.resolve().then(() => db.updateAiScores({ id: stored.id, status: 'ok', scores: grading.scores, total: totalScore(grading.scores) }))
        .catch(error => console.error('ai score update failed', error?.code ?? error?.name));
    }
    return json(200, { grading: { status: 'ok', scores: exposedScores(grading.scores) } });
  }

  // Practice history (docs/TESTING.md §7): validates and, when the database writes are on, stores one finished practice
  // round. Sends no email. Own rate limit; never logs names or answers.
  if (request.url === '/api/practice-result') {
    if (!allowedOrigins.has(request.headers.origin)) return json(403, { error: 'Origin not allowed' });
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
    response.setHeader('Vary', 'Origin');
    if (request.method === 'OPTIONS') {
      response.writeHead(204, { 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }).end();
      return;
    }
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST, OPTIONS');
      return json(405, { error: 'Method not allowed' });
    }
    if (request.headers['content-type']?.split(';')[0] !== 'application/json') return json(415, { error: 'JSON required' });
    let payload;
    try {
      const chunks = [];
      let bytes = 0;
      for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 10000) return json(413, { error: 'Result too large' });
        chunks.push(chunk);
      }
      payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return json(400, { error: 'Invalid JSON' }); }
    const checked = globalThis.PracticeHistory.validatePracticeResult(payload);
    if (!checked.ok) return json(400, { error: 'Invalid practice result' });
    if (!takeSlot(practiceLimit, request, response, json)) return;
    if (!db?.flags.write) return json(200, { success: true, stored: false });
    // Best effort ceiling on the rows written per day by this instance; over it the round is accepted but not stored.
    const today = new Date().toISOString().slice(0, 10);
    if (practiceDay.day !== today) Object.assign(practiceDay, { day: today, count: 0 });
    if (practiceDay.count >= practiceRowsMax) return json(200, { success: true, stored: false });
    practiceDay.count++;
    // Which answers are right, the score and the stars come from the stored key, not from the browser's claims.
    let value = checked.value;
    try { value = judgePractice(value); } catch { console.error('practice keys unavailable'); return json(200, { success: true, stored: false }); }
    // Best effort like the submissions: a failing or slow (>2s) database never fails the request.
    const storing = Promise.resolve().then(() => db.storePracticeResult(value));
    storing.catch(error => console.error('practice result store failed', error?.code ?? error?.name));
    let timer;
    const stored = await Promise.race([storing.then(() => true, () => false), new Promise(resolve => { timer = setTimeout(() => resolve(false), 2000); })]);
    clearTimeout(timer);
    return json(200, { success: true, stored });
  }

  // Teacher-only history behind TEACHER_TOKEN (history-api.mjs); 404 unless the token and a database are configured.
  if (await teacherHistory(request, response, { allowedOrigins, json })) return;

  if (db && (request.method === 'GET' || request.method === 'HEAD') && (request.url === '/api/health' || request.url.startsWith('/api/health?'))) {
    if (!takeSlot(readLimit, request, response, json, 60)) return;
    return json(200, { ok: true, db: await healthy().catch(() => 'down') });
  }

  if (db?.flags.read && request.url.startsWith('/api/') && (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS')) {
    const origin = request.headers.origin;
    if (origin) {
      if (!allowedOrigins.has(origin)) return json(403, { error: 'Origin not allowed' });
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Vary', 'Origin');
    }
    if (request.method === 'OPTIONS') {
      response.writeHead(204, { 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Content-Type' }).end();
      return;
    }
    if (!takeSlot(readLimit, request, response, json, 60)) return;
    const [, , kind, rawId] = parsedUrl.pathname.split('/');
    let id;
    try { id = rawId === undefined ? undefined : decodeURIComponent(rawId); } catch { return json(400, { error: 'Bad request' }); }
    const lookup = { subjects: id ? db.getSubject : db.listSubjects, quizzes: db.getQuiz, exams: db.getExam }[kind];
    if (!lookup || (kind !== 'subjects' && !id)) return json(404, { error: 'Not found' });
    try {
      const data = await lookup(id ?? '');
      if (!data) return json(404, { error: 'Not found' });
      const etag = `"${await contentVersion()}"`;
      if (request.headers['if-none-match'] === etag) { response.writeHead(304, { ETag: etag }).end(); return; }
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300', ETag: etag });
      response.end(request.method === 'HEAD' ? undefined : JSON.stringify(data));
      return;
    } catch {
      console.error('content lookup failed');
      return json(503, { error: 'Content unavailable' });
    }
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(parsedUrl.pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  const file = resolve(root, `.${pathname}`);
  const type = types[extname(file)];
  if (!type || !file.startsWith(root + sep) || pathname.split('/').some(part => part.startsWith('.') || part === 'node_modules')) {
    response.writeHead(404).end();
    return;
  }

  try {
    const body = await readFile(file);
    const gameEntry = ['/games/afterbell/play/', '/games/maze/play/'].some(prefix => pathname.startsWith(prefix)) && extname(file) === '.html';
    const cache = pathname === '/sw.js' || pathname === '/manifest.webmanifest' ? 'no-cache' : gameEntry ? 'no-cache' : 'public, max-age=300';
    response.writeHead(200, { 'Content-Type': type, 'Cache-Control': cache });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end();
  }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  // Last line of defence of the real server only (not of createApp, so tests see every failure): log the name, keep serving.
  process.on('unhandledRejection', reason => console.error('unhandled rejection', reason?.code ?? reason?.name));
  process.on('uncaughtException', error => console.error('uncaught exception', error?.code ?? error?.name));
  createApp().listen(Number(process.env.PORT || 3000), '0.0.0.0');
}
