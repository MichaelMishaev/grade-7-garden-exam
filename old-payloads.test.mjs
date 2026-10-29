// Deploying during an exam: a tab that loaded the PREVIOUS production page JS posts the PREVIOUS payload shape (garden and
// library without `exam`, physics with `exam` but no `attempt` / `questionId` / answer details). The new server must accept
// every one of them and the teacher's email must carry the right question/answer pairs. Resend is mocked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createApp } from './server.mjs';

const read = (file) => readFileSync(new URL(file, import.meta.url), 'utf8');
const questionsOf = (file, marker, end) => { const source = read(file); const start = source.indexOf(marker) + marker.length - 1; return runInNewContext(`(${source.slice(start, source.indexOf(end, start) + end.indexOf(']') + 1)})`); }; // our own page source
const library = questionsOf('./library-exam.js', 'const questions = [', '\n  ];');
const physics = questionsOf('./physics-exam.js', 'const questions = [', '\n  ];');
const garden = questionsOf('./garden-exam.html', 'const questions = [', '\n    ];');
const plainText = (html) => String(html).replace(/\s*(?:<br\s*\/?>\s*)+/gi, '\n').replace(/<[^>]*>/g, '').trim();
const origin = 'https://hitech.agnon.online';
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'PrepX <exams@netanya.club>' };

// Exactly what origin/main's pages POSTed (git show origin/main:library-exam.js / physics-exam.js / garden-exam.html).
const times = { startedAt: '2026-10-29T08:00:00.000Z', finishedAt: '2026-10-29T08:31:00.000Z' };
const oldGarden = { name: 'דנה ישנה', answers: garden.map((question, i) => ({ question, answer: `תשובה ישנה ${i + 1}` })), ...times };
const oldLibrary = {
  name: 'דנה ישנה',
  answers: library.map((q) => ({ question: `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`, answer: q.type === 'open' ? 'תשובה פתוחה ישנה' : q.choices[q.correct], ...(q.type === 'open' ? {} : { correct: true }) })),
  score: { earned: 80, pending: 20 }, ...times
};
const oldPhysics = {
  exam: 'physics-v1-assessment', name: 'דנה ישנה',
  answers: physics.map((q) => ({ question: plainText(q.prompt), answer: q.type === 'mcq' ? q.choices[q.correct] : q.type === 'fill' ? `${q.correct.value}\nדרך חישוב: חישוב ישן` : 'תשובה פתוחה ישנה', ...(q.type === 'open' ? {} : { correct: true }) })),
  score: { earned: 50, pending: 30 }, ...times
};

async function send(payload) {
  const mails = [];
  const server = createApp({ env, db: null, sendFetch: async (url, config) => { mails.push(JSON.parse(config.body)); return new Response(JSON.stringify({ id: 'mock' }), { status: 200 }); } });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/submit-exam`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    return { response, body: await response.json(), mails };
  } finally { await new Promise((resolve) => server.close(resolve)); }
}

for (const [label, payload, subjectPart] of [['garden', oldGarden, 'תשובות למבחן הבנת הנקרא'], ['library', oldLibrary, 'תשובות למבחן הבנת הנקרא'], ['physics', oldPhysics, 'פיזיקה']]) {
  test(`old ${label} payload (previous page JS) is accepted and emailed with every question/answer pair`, async () => {
    const { response, body, mails } = await send(payload);
    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(mails.length, 1, 'one email');
    assert.ok(mails[0].subject.includes(subjectPart), mails[0].subject);
    assert.ok(mails[0].text.includes(payload.name));
    payload.answers.forEach((pair, i) => {
      assert.ok(mails[0].text.includes(pair.question.split('\n')[0]), `question ${i + 1} in the email text`);
      assert.ok(mails[0].text.includes(pair.answer.split('\n')[0]), `answer ${i + 1} in the email text`);
    });
    assert.equal((mails[0].text.match(/^\d+\. /gm) || []).length, payload.answers.length);
    assert.ok(mails[0].html.includes('דנה ישנה'));
  });
}

test('old payloads: the old physics answer count (27) is still enforced', async () => {
  const first = await send({ ...oldPhysics, answers: oldPhysics.answers.slice(0, 26) });
  assert.equal(first.response.status, 400);
  assert.equal(first.mails.length, 0);
});
