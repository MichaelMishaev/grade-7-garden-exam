// docs/TESTING.md §8: every question the library and physics pages send carries its options, correct answer and
// reference. This runs the pages' own `answerDetails` on every real question and sends the result through the server
// (Resend mocked), so a page change that the server would reject, or an email without a reference, fails here.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createApp } from './server.mjs';
import { extractContent } from './db/extract.mjs';
import { plainText } from './db/submissions.mjs';

const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };
const origin = 'https://hitech.agnon.online';
const rows = extractContent().questions;

// The page's own helper, taken from its source (with the page's reference names).
function pageDetails(file) {
  const js = readFileSync(new URL(file, import.meta.url), 'utf8');
  const refNames = /const refNames = (\{[^;]*\});/.exec(js)[1];
  const helper = /const answerDetails = q => .*;/.exec(js)[0];
  return runInNewContext(`const refNames = ${refNames};\n${helper}\nanswerDetails;`);
}

async function submitAll(examId, file, prefix = '') {
  const details = pageDetails(file);
  const questions = rows.filter((q) => q.exam_id === examId);
  const answers = questions.map((q) => {
    const asked = { choices: q.choices ?? undefined, correct: q.correct, ref: { id: q.reference_id, part: q.reference_part } };
    return { question: prefix + plainText(q.prompt), answer: 'תשובה', ...details(asked) };
  });
  const calls = [];
  const server = createApp({ env, db: null, sendFetch: async (url, config) => {
    calls.push(JSON.parse(config.body));
    return new Response(JSON.stringify({ id: 'test-email-id' }), { status: 200 });
  } });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/submit-exam`, {
      method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: JSON.stringify({ exam: examId, name: 'תלמיד', attempt: 2, answers })
    });
    return { status: response.status, mail: calls[0], answers, questions };
  } finally { await new Promise((resolve) => server.close(resolve)); }
}

for (const [examId, file, code, prefix] of [
  ['hebrew-v2-library', 'library-exam.js', 'HEB-002', 'גרסה 2 · הספרייה בהפסקה · '],
  ['physics-v1-assessment', 'physics-exam.js', 'PHY-001', '']
]) {
  test(`${examId}: the page's details for every question are accepted and appear in the email`, async () => {
    const { status, mail, answers, questions } = await submitAll(examId, file, prefix);
    assert.equal(status, 200);
    assert.match(mail.subject, new RegExp(`· ${code} · ניסיון 2$`));
    answers.forEach((a, i) => {
      assert.ok(a.reference, `${questions[i].id}: reference`);
      assert.ok(mail.text.includes(`מקור: ${a.reference}`), `${questions[i].id}: reference in email`);
      // The email shows the SERVER's key text. For a task with no unit the page sends "10 null" (unit is null); the server key says "10".
      if (questions[i].type !== 'open') assert.ok(mail.text.includes(`תשובה נכונה: ${a.correctAnswer.replace(/ null$/, '')}`), `${questions[i].id}: correct answer in email`);
      if (questions[i].type === 'mcq' || questions[i].type === 'truefalse') assert.deepEqual(a.options, questions[i].choices);
    });
  });
}
