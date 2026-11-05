import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import '../test-fixtures/use-fake-rubrics.mjs';
import { connect } from './client.mjs';
import { migrate } from './migrate.mjs';
import { seed } from './seed.mjs';
import { extractContent } from './extract.mjs';
import { createDb } from './runtime.mjs';
import { createApp } from '../server.mjs';

const url = process.env.FINAL_MAIL_TEST_DATABASE_URL;
if (url && !/^\/prepx_final_mail_test$/.test(new URL(url).pathname)) {
  throw new Error('Use an isolated prepx_final_mail_test database');
}

test('production submission survives grading failure and restart, then emails a final grade once', { skip: !url }, async () => {
  const sql = await connect(url);
  const env = { DATABASE_URL: url, DB_WRITE_SUBMISSIONS: '1', NODE_ENV: 'production', OPENAI_API_KEY: 'mock', RESEND_API_KEY: 'mock', RESEND_FROM_EMAIL: 'qa@example.invalid' };
  const db = createDb(env, { connector: async () => sql });
  const calls = [];
  const emailAttempts = [];
  const emails = [];
  let gradingAvailable = false;
  let server;
  let base;
  async function start(mailPollMs) {
    server = createApp({
      env, db, finalExamMail: true, mailPollMs,
      aiFetch: async (_url, init) => {
        const prompt = JSON.parse(init.body).messages[1].content;
        const questions = JSON.parse(prompt.slice(prompt.indexOf('\n') + 1)).questions;
        calls.push(questions.map(q => q.questionId).sort());
        if (!gradingAvailable) return Response.json({}, { status: 503 });
        const results = questions.map(q => ({ questionId: q.questionId, score: q.maxScore, reason: 'בדיקת תרגול מלאה' }));
        return Response.json({ choices: [{ message: { content: JSON.stringify({ results }) } }] });
      },
      sendFetch: async (_url, init) => {
        const email = { body: JSON.parse(init.body), key: init.headers['Idempotency-Key'] };
        emailAttempts.push(email);
        if (emailAttempts.length === 1) return Response.json({}, { status: 422 });
        emails.push(email);
        return Response.json({ id: 'mock-final-email' });
      }
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  }
  const stop = async () => { if (server?.listening) await new Promise(resolve => server.close(resolve)); };
  try {
    await migrate(sql);
    await seed(sql);
    const exam = 'english-v1-practice';
    const questions = extractContent().questions.filter(q => q.exam_id === exam);
    const payload = { exam, attempt: 1, name: `Synthetic QA ${randomUUID()}`, answers: questions.map(q => ({
      question: q.prompt, answer: q.type === 'open' ? 'Synthetic written answer' : q.choices[q.correct]
    })) };
    const post = (submission = payload) => fetch(base + '/api/submit-exam', { method: 'POST', headers: {
      Origin: 'https://hitech.agnon.online', 'Content-Type': 'application/json'
    }, body: JSON.stringify(submission) });
    await start(60_000);
    const pending = await post();
    assert.equal(pending.status, 202);
    assert.equal((await pending.json()).grading.status, 'pending');
    assert.equal(emails.length, 0);
    const [saved] = await sql`SELECT id, ai_status, email_status FROM submissions WHERE exam_code = 'ENG-001' AND student_name = ${payload.name}`;
    assert.deepEqual([saved.ai_status, saved.email_status], ['failed', 'pending']);
    await stop();

    gradingAvailable = true;
    await sql`UPDATE submissions SET final_mail_due_at = now() WHERE id = ${saved.id}`;
    await start(25);
    await assertEventually(async () => {
      const [status] = await sql`SELECT ai_status, final_mail_due_at < now() + interval '1 minute' AS deferred
        FROM submissions WHERE id = ${saved.id}`;
      return emailAttempts.length === 1 && status.ai_status === 'ok' && status.deferred;
    });
    assert.equal(emails.length, 0);
    await sql`UPDATE submissions SET final_mail_due_at = now() WHERE id = ${saved.id}`;
    await assertEventually(async () => (await db.finalMailStatus(saved.id)).email_status === 'accepted');
    assert.equal(emails.length, 1);
    assert.deepEqual(emailAttempts, [emails[0], emails[0]], 'the provider retry uses the same email and idempotency key');
    assert.match(emails[0].body.text, /ציון כולל \(כולל בדיקת AI\): 100 מתוך 100/);
    assert.equal((emails[0].body.text.match(/^AI: /gm) ?? []).length, 3);
    assert.doesNotMatch(emails[0].body.html, /ממתינה לבדיקת המורה/);
    assert.deepEqual(calls, Array(2).fill(['english-05', 'english-19', 'english-20']));

    const duplicates = await Promise.all([post(), post()]);
    for (const duplicate of duplicates) {
      assert.equal(duplicate.status, 200);
      assert.equal((await duplicate.json()).grading.status, 'ok');
    }
    assert.equal(emails.length, 1);
    assert.equal(calls.length, 2);

    // The same production path handles each other exam, including a garden tab
    // opened before the browser started including an exam id.
    for (const [id, code, openCount] of [
      ['hebrew-v1-garden', 'HEB-001', 20],
      ['hebrew-v2-library', 'HEB-002', 4],
      ['physics-v1-assessment', 'PHY-001', 7]
    ]) {
      const rows = extractContent().questions.filter(q => q.exam_id === id);
      const result = await post({
        ...(code === 'HEB-001' ? {} : { exam: id, attempt: 1 }),
        name: `Synthetic QA ${randomUUID()}`,
        answers: rows.map(q => ({
          question: q.prompt,
          answer: q.type === 'open' ? 'Synthetic written answer' : q.type === 'fill' ? String(q.correct.value) : q.choices[q.correct]
        }))
      });
      assert.ok([200, 202].includes(result.status), code);
      await assertEventually(() => emails.some(email => email.body.subject.includes(code)));
      const { body } = emails.find(email => email.body.subject.includes(code));
      assert.match(body.text, /ציון כולל \(כולל בדיקת AI\): 100 מתוך 100/);
      assert.equal((body.text.match(/^AI: /gm) ?? []).length, openCount, code);
    }
  } finally {
    await stop();
    await sql.end();
  }
});

async function assertEventually(check) {
  const deadline = Date.now() + 4000;
  while (Date.now() < deadline) {
    if (await check()) return;
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  assert.fail('The queued email never reached accepted status');
}
