import http from 'node:http';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { renderExamEmail, timeLines, scoreLine } from './email-template.mjs';
import { createDb } from './db/runtime.mjs';

const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.pdf': 'application/pdf'
};

// Exams that identify themselves with the payload field `exam`. Every exam uses the same endpoint, Resend account,
// sender, teacher, limits and origin rules; only the answer count, subject, idempotency prefix and email title differ.
// A payload WITHOUT `exam` is one of the original Hebrew exams (garden, library) and keeps the original 20-answer
// rules, subject and idempotency key byte for byte. An unknown `exam` value is rejected.
const legacyExam = { count: 20, idempotencyPrefix: 'garden-exam', subject: 'תשובות למבחן הבנת הנקרא - כיתה ז׳' };
export const exams = Object.assign(Object.create(null), {
  'physics-v1-assessment': {
    count: 27, idempotencyPrefix: 'physics-exam', subject: 'תשובות למשימת הערכה במדידות - מדעים - כיתה ז׳',
    title: 'תשובות למשימת הערכה במדידות', subtitle: 'מדעים · כיתה ז׳2 · שי עגנון, נתניה'
  }
});

export function createApp({ env = process.env, sendFetch = fetch, db = createDb(env) } = {}) {
  let attempts = [];
  return http.createServer(async (request, response) => {
  const allowedOrigins = new Set([
    env.APP_ORIGIN || 'https://hitech.agnon.online',
    'https://web-production-1a642.up.railway.app',
    'https://michaelmishaev.github.io',
    ...(env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000'])
  ]);
  const json = (status, body) => response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'
  }).end(JSON.stringify(body));

  if (request.url === '/api/submit-exam') {
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
        if (bytes > 100000) return json(413, { error: 'Submission too large' });
        chunks.push(chunk);
      }
      payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return json(400, { error: 'Invalid JSON' }); }
    const validText = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
    const examId = payload?.exam;
    if (examId !== undefined && !(typeof examId === 'string' && Object.hasOwn(exams, examId))) return json(400, { error: 'Unknown exam' });
    const exam = examId === undefined ? legacyExam : exams[examId];
    if (!payload || !validText(payload.name, 120) || !Array.isArray(payload.answers) || payload.answers.length !== exam.count ||
        !payload.answers.every(item => item && validText(item.question, 1000) && validText(item.answer, 3000))) {
      return json(400, { error: `Name and all ${exam.count} answers are required` });
    }
    const validTime = value => typeof value === 'string' && value.length <= 40 && !Number.isNaN(Date.parse(value));
    const timed = validTime(payload.startedAt) && validTime(payload.finishedAt) && Date.parse(payload.finishedAt) >= Date.parse(payload.startedAt);
    const times = timed ? { startedAt: payload.startedAt, finishedAt: payload.finishedAt } : {};
    const points = value => Number.isInteger(value) && value >= 0 && value <= 100;
    const score = points(payload.score?.earned) && points(payload.score?.pending) && payload.score.earned + payload.score.pending <= 100
      ? { earned: payload.score.earned, pending: payload.score.pending } : undefined;
    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return json(503, { error: 'Email service unavailable' });
    const now = Date.now();
    attempts = attempts.filter(time => now - time < 3600000);
    if (attempts.length >= 100) {
      response.setHeader('Retry-After', '3600');
      return json(429, { error: 'Please try again later' });
    }
    attempts.push(now);
    const name = payload.name.trim();
    const answers = payload.answers.map(item => ({ question: item.question.trim(), answer: item.answer.trim(), correct: typeof item.correct === 'boolean' ? item.correct : undefined }));
    const key = createHash('sha256').update(JSON.stringify(examId === undefined ? { name, answers } : { exam: examId, name, answers })).digest('hex');
    // Best effort: a slow or failing database must never block or fail the email.
    // A write that outlives the 2s wait still completes, and the email status is recorded once it does.
    const storing = db?.flags.write ? db.storeSubmission({ key, name, answers, ...times, ...(examId === undefined ? {} : { examId }) }) : null;
    storing?.catch(error => console.error('submission store failed', error?.code ?? error?.name));
    if (storing) {
      let timer;
      await Promise.race([storing.catch(() => {}), new Promise(resolve => { timer = setTimeout(resolve, 2000); })]);
      clearTimeout(timer);
    }
    const markEmail = update => storing?.then(id => db.markEmail(id, update)).catch(() => {});
    try {
      const result = await sendFetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `${exam.idempotencyPrefix}/${key}` },
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: ['345287@gmail.com'],
          subject: exam.subject,
          text: `שם התלמיד/ה: ${name}\n${timeLines(times)}${score ? scoreLine(score) + '\n' : ''}\n` + answers.map((item, i) => `${i + 1}. ${item.correct === true ? '✓ ' : item.correct === false ? '✕ ' : ''}${item.question}\n${item.answer}`).join('\n\n'),
          // Table exams label answers without a `correct` mark (written tasks) as waiting for the teacher.
          html: renderExamEmail({ name, answers, score, ...times, origin: env.APP_ORIGIN || 'https://hitech.agnon.online',
            ...(exam.title ? { title: exam.title, subtitle: exam.subtitle, markPending: true } : {}) })
        }),
        signal: AbortSignal.timeout(15000)
      });
      const data = await result.json();
      if (!result.ok || typeof data.id !== 'string' || !data.id) {
        console.error('Resend rejected submission', result.status);
        markEmail({ status: 'failed', httpStatus: result.status });
        return json(502, { error: 'Email submission failed' });
      }
      console.info('Exam email accepted by Resend', data.id);
      markEmail({ status: 'accepted', resendId: data.id, httpStatus: result.status });
      return json(200, { success: true });
    } catch {
      console.error('Resend submission unavailable');
      markEmail({ status: 'failed' });
      return json(502, { error: 'Email submission failed' });
    }
  }

  if (db && (request.method === 'GET' || request.method === 'HEAD') && (request.url === '/api/health' || request.url.startsWith('/api/health?'))) {
    return json(200, { ok: true, db: await db.health() ? 'up' : 'down' });
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
    const [, , kind, rawId] = new URL(request.url, 'http://localhost').pathname.split('/');
    let id;
    try { id = rawId === undefined ? undefined : decodeURIComponent(rawId); } catch { return json(400, { error: 'Bad request' }); }
    const lookup = { subjects: id ? db.getSubject : db.listSubjects, quizzes: db.getQuiz, exams: db.getExam }[kind];
    if (!lookup || (kind !== 'subjects' && !id)) return json(404, { error: 'Not found' });
    try {
      const data = await lookup(id ?? '');
      if (!data) return json(404, { error: 'Not found' });
      const etag = `"${await db.contentVersion()}"`;
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
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
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
    response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'public, max-age=300' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end();
  }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  createApp().listen(Number(process.env.PORT || 3000), '0.0.0.0');
}
