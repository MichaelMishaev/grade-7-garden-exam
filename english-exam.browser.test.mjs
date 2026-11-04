import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import './test-fixtures/use-fake-rubrics.mjs';
import { createApp } from './server.mjs';
let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}
const source = readFileSync(new URL('./english-exam.js', import.meta.url), 'utf8');
const questions = JSON.parse(JSON.stringify(runInNewContext(source.slice(source.indexOf('const questions'), source.indexOf('const $')) + '\nquestions;')));

test('English mobile: local entry, required name, locks, reload, review, failed send, retry and read-only completion', { skip: !chromium && 'global Playwright not available' }, async () => {
  let tries = 0; const emails = [];
  const env = { OPENAI_API_KEY: 'mock-ai', RESEND_RPS: '1000', RESEND_API_KEY: 'mock', RESEND_FROM_EMAIL: 'qa@example.invalid' };
  const aiRequests = [];
  const server = createApp({ env, db: null, aiFetch: async (_url, init) => {
    const body = JSON.parse(init.body);
    const document = JSON.parse(body.messages[1].content.slice(body.messages[1].content.indexOf('\n') + 1));
    aiRequests.push(document);
    return Response.json({ choices: [{ message: { content: JSON.stringify({ results: document.questions.map(q => ({ questionId: q.questionId, score: q.maxScore, reason: 'בדיקת תרגול' })) }) } }] });
  }, sendFetch: async (url, init) => {
    if (++tries === 1) return Response.json({}, { status: 422 });
    emails.push(JSON.parse(init.body)); return Response.json({ id: 'mock-english' });
  }});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = env.APP_ORIGIN = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.locator('a[href="subject.html?subject=english"]').click();
    await page.locator('.variant-start').waitFor();
    assert.match(await page.locator('.variant-meta').innerText(), /9\.11/);
    assert.equal(await page.locator('.practice-shortcut').count(), 0);
    await page.locator('.variant-start').click();
    await page.clock.install();
    await page.locator('#begin').click();
    assert.match(await page.locator('#name-error').innerText(), /יש לכתוב שם/);
    await page.locator('#student-name').fill('QA English');
    await page.locator('#begin').click();
    await page.locator('#question-stage.active').waitFor();
    const draft = () => page.evaluate(() => JSON.parse(sessionStorage.getItem('english-exam-draft-v1')));
    const initial = await draft();
    for (let i = 0; i < 20; i++) {
      const q = questions.find(q => q.id === initial.order[i]);
      if (q.type === 'open') {
        await page.locator('#answer').fill(q.modelAnswer);
        await page.locator('#confirm').click();
        assert.equal(await page.locator('#answer').isDisabled(), true);
      } else {
        const index = i === 0 ? (q.correct + 1) % q.choices.length : q.correct;
        await page.locator(`#choices input[value="${index}"]`).check();
        assert.equal(await page.locator('#choices input').first().isDisabled(), true);
        assert.match(await page.locator('#choice-feedback').innerText(), i === 0 ? /לא נכון/ : /נכון מאוד/);
      }
      await page.clock.fastForward(1501);
      if (i === 0) {
        await page.locator('#previous').click();
        if (q.type === 'open') assert.equal(await page.locator('#answer').isDisabled(), true);
        else assert.equal(await page.locator('#choices input').first().isDisabled(), true);
        await page.reload(); await page.locator('#begin').click();
        assert.equal((await draft()).startedAt, initial.startedAt);
        await page.locator('#review-button').click(); await page.locator('#finish').click();
        assert.match(await page.locator('#review-error').innerText(), /יש להשלים/);
        await page.locator('#back-to-questions').click(); await page.locator('#next').click();
      }
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.locator('#finish').click();
    await page.locator('#send:visible').waitFor();
    assert.equal((await draft()).sent, false);
    await page.locator('#send').click();
    await page.locator('#done-banner:visible').waitFor();
    assert.equal((await draft()).sent, true);
    assert.equal(emails.length, 1);
    assert.match(emails[0].subject, /ENG-001/);
    assert.match(emails[0].text, /20\./);
    assert.match(emails[0].text, /ציון כולל \(כולל בדיקת AI\): \d+ מתוך 100/);
    assert.doesNotMatch(emails[0].html, /ממתינה לבדיקת המורה/);
    assert.equal(aiRequests.length, 2, 'each submit attempt grades all open questions');
    assert.deepEqual(aiRequests[0].questions.map(q => q.questionId).sort(), ['english-05', 'english-19', 'english-20']);
    assert.match(await page.locator('#score').innerText(), /מתוך 100/);
    await page.reload(); await page.locator('#done-banner:visible').waitFor();
    assert.equal(tries, 2, 'reload never resends');
    assert.equal(await page.locator('#question-stage').isVisible(), false);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close(); await new Promise(resolve => server.close(resolve));
  }
});
