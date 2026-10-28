import http from 'node:http';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { renderExamEmail } from './email-template.mjs';

const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.pdf': 'application/pdf'
};

export function createApp({ env = process.env, sendFetch = fetch } = {}) {
  let attempts = [];
  return http.createServer(async (request, response) => {
  const json = (status, body) => response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'
  }).end(JSON.stringify(body));

  if (request.url === '/api/submit-exam') {
    const allowedOrigins = new Set([
      env.APP_ORIGIN || 'https://hitech.agnon.online',
      'https://web-production-1a642.up.railway.app',
      'https://michaelmishaev.github.io',
      ...(env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000'])
    ]);
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
    if (!payload || !validText(payload.name, 120) || !Array.isArray(payload.answers) || payload.answers.length !== 20 ||
        !payload.answers.every(item => item && validText(item.question, 1000) && validText(item.answer, 3000))) {
      return json(400, { error: 'Name and all 20 answers are required' });
    }
    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return json(503, { error: 'Email service unavailable' });
    const now = Date.now();
    attempts = attempts.filter(time => now - time < 3600000);
    if (attempts.length >= 100) {
      response.setHeader('Retry-After', '3600');
      return json(429, { error: 'Please try again later' });
    }
    attempts.push(now);
    const name = payload.name.trim();
    const answers = payload.answers.map(item => ({ question: item.question.trim(), answer: item.answer.trim() }));
    const key = createHash('sha256').update(JSON.stringify({ name, answers })).digest('hex');
    try {
      const result = await sendFetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `garden-exam/${key}` },
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: ['345287@gmail.com'],
          subject: 'תשובות למבחן הבנת הנקרא - כיתה ז׳',
          text: `שם התלמיד/ה: ${name}\n\n` + answers.map((item, i) => `${i + 1}. ${item.question}\n${item.answer}`).join('\n\n'),
          html: renderExamEmail({ name, answers, origin: env.APP_ORIGIN || 'https://hitech.agnon.online' })
        }),
        signal: AbortSignal.timeout(15000)
      });
      const data = await result.json();
      if (!result.ok || typeof data.id !== 'string' || !data.id) {
        console.error('Resend rejected submission', result.status);
        return json(502, { error: 'Email submission failed' });
      }
      console.info('Exam email accepted by Resend', data.id);
      return json(200, { success: true });
    } catch {
      console.error('Resend submission unavailable');
      return json(502, { error: 'Email submission failed' });
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
  if (!type || !file.startsWith(root + sep) || pathname.split('/').some(part => part.startsWith('.'))) {
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
