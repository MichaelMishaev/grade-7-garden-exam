import { createHash, timingSafeEqual } from 'node:crypto';
import { clientOf } from './limits.mjs';

// Teacher-only history (docs/TESTING.md §7): /api/teacher/practice, /api/teacher/submissions[/<id>].
// There are no student accounts and the names are personal data of minors, so everything here needs TEACHER_TOKEN.
// The token is a server-only variable: never logged, never returned. Without it (or without a database that can
// read) every route answers 404, so the endpoints do not advertise themselves.
const FAILURES_PER_MINUTE = 10;
const MIN_TOKEN_LENGTH = 32;

// Both sides are hashed first, so the comparison is constant-time and does not reveal the token length.
export function tokenMatches(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string' || !expected) return false;
  const digest = (value) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(given), digest(expected));
}

const clampLimit = (value, fallback, max) => {
  const number = Number(value);
  return Number.isInteger(number) && number >= 1 ? Math.min(number, max) : fallback;
};
const text = (value, max) => (typeof value === 'string' && value.trim() && value.length <= max ? value.trim() : undefined);

// Per question: score and maximum only. The reasons are shown on the detail route.
const scoreOnly = (scores) => (scores && typeof scores === 'object'
  ? Object.fromEntries(Object.entries(scores).map(([id, { score, max }]) => [id, { score, max }])) : null);
const summary = (row) => ({
  id: String(row.id), examCode: row.exam_code, attempt: row.attempt, name: row.student_name,
  startedAt: row.started_at, finishedAt: row.finished_at, receivedAt: row.first_received_at,
  emailStatus: row.email_status, aiStatus: row.ai_status, aiTotal: row.ai_total === null || row.ai_total === undefined ? null : Number(row.ai_total)
});

// Returns a function (request, response, { allowedOrigins, json }) that answers teacher routes and returns true, or
// returns false for any other URL so the caller continues.
export function createHistoryHandler({ env, db }) {
  // A short token is as good as none: history stays off (404) until the variable is long enough. Never log its content.
  const token = typeof env.TEACHER_TOKEN === 'string' && env.TEACHER_TOKEN.length >= MIN_TOKEN_LENGTH ? env.TEACHER_TOKEN : undefined;
  if (env.TEACHER_TOKEN && !token) console.warn(`TEACHER_TOKEN is shorter than ${MIN_TOKEN_LENGTH} characters: teacher history is disabled`);
  const failures = new Map(); // ip -> failure timestamps
  const recent = (ip) => (failures.get(ip) ?? []).filter((time) => Date.now() - time < 60000);
  const failed = (ip) => {
    failures.set(ip, [...recent(ip), Date.now()]);
    if (failures.size > 1000) for (const key of failures.keys()) if (!recent(key).length) failures.delete(key);
  };

  return async function handle(request, response, { allowedOrigins, json }) {
    let url;
    try { url = new URL(request.url, 'http://localhost'); } catch { return json(400, { error: 'Bad request' }), true; }
    if (url.pathname !== '/api/teacher/practice' && !/^\/api\/teacher\/submissions(\/[^/]+)?$/.test(url.pathname)) return false;
    const ready = token && db && typeof db.listPracticeHistory === 'function' && typeof db.listSubmissionHistory === 'function' && typeof db.getSubmissionDetail === 'function';
    if (!ready) return json(404, { error: 'Not found' }), true;
    const origin = request.headers.origin;
    if (origin) {
      if (!allowedOrigins.has(origin)) return json(403, { error: 'Origin not allowed' }), true;
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Vary', 'Origin');
    }
    if (request.method === 'OPTIONS') {
      response.writeHead(204, { 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Cache-Control': 'no-store' }).end();
      return true;
    }
    if (request.method !== 'GET') {
      response.setHeader('Allow', 'GET, OPTIONS');
      return json(405, { error: 'Method not allowed' }), true;
    }
    // The token is checked first and only FAILED attempts count: other students on the same address (a school NAT)
    // cannot lock the teacher out, and a correct token always gets in. The 429 only answers further wrong guesses.
    // Behind Railway's proxy the last X-Forwarded-For entry is the one the proxy added.
    const ip = clientOf(request);
    const bearer = /^Bearer (.+)$/.exec(request.headers.authorization ?? '')?.[1];
    if (!tokenMatches(bearer, token)) {
      if (recent(ip).length >= FAILURES_PER_MINUTE) {
        response.setHeader('Retry-After', '60');
        return json(429, { error: 'Please try again later' }), true;
      }
      failed(ip);
      response.setHeader('WWW-Authenticate', 'Bearer');
      return json(401, { error: 'Unauthorized' }), true;
    }
    try {
      // No student name in the URL: the page filters by name itself on the rows it gets back (history.js).
      const query = url.searchParams;
      if (url.pathname === '/api/teacher/practice') {
        const { rows, best } = await db.listPracticeHistory({ quiz: text(query.get('quiz'), 80), limit: clampLimit(query.get('limit'), 100, 200) });
        json(200, {
          results: rows.map((row) => ({ id: String(row.id), quizId: row.quiz_id, quizCode: row.quiz_code, name: row.student_name, score: row.score, stars: row.stars, createdAt: row.created_at })),
          best: best.map((row) => ({ name: row.student_name, quizId: row.quiz_id, quizCode: row.quiz_code, score: row.score, rounds: row.rounds }))
        });
      } else if (url.pathname === '/api/teacher/submissions') {
        const rows = await db.listSubmissionHistory({ code: text(query.get('code'), 20), limit: clampLimit(query.get('limit'), 50, 100) });
        json(200, { submissions: rows.map((row) => ({ ...summary(row), aiScores: scoreOnly(row.ai_scores) })) });
      } else {
        const id = url.pathname.split('/')[4];
        if (!/^[1-9]\d{0,17}$/.test(id)) return json(404, { error: 'Not found' }), true;
        const row = await db.getSubmissionDetail(id);
        if (!row) return json(404, { error: 'Not found' }), true;
        json(200, {
          submission: {
            ...summary(row),
            answers: row.answers.map((a) => {
              const ai = row.ai_scores?.[a.question_id];
              return { position: a.position, questionId: a.question_id, question: a.question_text, answer: a.answer_text, autoCorrect: a.auto_correct,
                ai: ai ? { score: ai.score, max: ai.max, reason: ai.reason } : null };
            })
          }
        });
      }
    } catch (error) {
      console.error('history lookup failed', error?.code ?? error?.name);
      json(503, { error: 'History unavailable' });
    }
    return true;
  };
}
