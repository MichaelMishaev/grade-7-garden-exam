import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractContent } from './db/extract.mjs';
import { judgeAnswers } from './exam-truth.mjs';
import { createApp } from './server.mjs';
import './quiz-core.js';
let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}
const bank = extractContent().questions.filter(q => q.exam_id === 'bible-v1-samuel');

test('Bible bank has 40 unique referenced questions and balanced eligible pools', () => {
  assert.equal(bank.length, 40);
  assert.equal(new Set(bank.map(q => q.id)).size, 40);
  assert.ok(bank.every(q => q.reference_id === 'bible-samuel-study' && q.reference_part));
  assert.deepEqual(['easy','medium','hard'].map(d => bank.filter(q => q.difficulty === d).length), [16,16,8]);
});

test('server scores the drawn 20 only and rejects an unbalanced set', () => {
  const pick = [...bank.filter(q => q.difficulty === 'easy').slice(2,10), ...bank.filter(q => q.difficulty === 'medium').slice(2,10), ...bank.filter(q => q.difficulty === 'hard').slice(0,4)];
  const answer = q => ({ question: q.prompt, answer: q.type === 'open' ? 'synthetic' : Array.isArray(q.correct) ? q.correct.map(i => q.choices[i]).join(' · ') : q.choices[q.correct] });
  const truth = judgeAnswers('bible-v1-samuel', pick.map(answer));
  const expected = globalThis.QuizCore.scoreQuiz(pick, Object.fromEntries(pick.filter(q => q.type !== 'open').map(q => [q.id, 1])));
  assert.ok(truth.answers.every(a => a.matched));
  assert.deepEqual(truth.score, { earned: expected.earned, pending: expected.pending });
  const wrongMix = [...pick.slice(1), bank.filter(q => q.difficulty === 'medium').find(q => !pick.includes(q))];
  assert.ok(judgeAnswers('bible-v1-samuel', wrongMix.map(answer)).answers.some(a => !a.matched));
});

test('new rounds draw 20 varied questions and preserve each draft on reload', { skip: !chromium && 'global Playwright not available' }, async () => {
  const server = createApp({ env: {}, db: null });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const url = `http://127.0.0.1:${server.address().port}/bible-exam.html?source=inline`;
    const rounds = [];
    for (let i = 0; i < 12; i++) {
      await page.goto(url);
      await page.evaluate(() => sessionStorage.removeItem('bible-exam-draft-v1'));
      await page.reload();
      await page.locator('#student-name').fill('QA');
      await page.locator('#begin').click();
      const order = await page.evaluate(() => JSON.parse(sessionStorage.getItem('bible-exam-draft-v1')).order);
      const selected = order.map(id => bank.find(q => q.id === id));
      assert.equal(new Set(order).size, 20);
      assert.deepEqual(['easy','medium','hard'].map(d => selected.filter(q => q.difficulty === d).length), [8,8,4]);
      assert.ok(selected.some(q => q.type === 'open') && selected.some(q => q.type === 'checkbox'));
      await page.reload();
      assert.deepEqual(await page.evaluate(() => JSON.parse(sessionStorage.getItem('bible-exam-draft-v1')).order), order);
      rounds.push(order.slice().sort().join(','));
    }
    assert.ok(new Set(rounds).size > 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
});
