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
    return Response.json({ choices: [{ message: { content: JSON.stringify({ conclusion: 'זיהיתם את הרעיון המרכזי. בפעם הבאה הוסיפו דוגמה מהטקסט.', results: document.questions.map(q => ({ questionId: q.questionId, score: q.maxScore, reason: 'בדיקת תרגול' })) }) } }] });
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
    assert.match(await page.locator('#ai-conclusion').innerText(), /הוסיפו דוגמה מהטקסט/);
    await page.reload(); await page.locator('#done-banner:visible').waitFor();
    assert.equal(tries, 2, 'reload never resends');
    assert.equal(await page.locator('#question-stage').isVisible(), false);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close(); await new Promise(resolve => server.close(resolve));
  }
});

test('English mobile: a queued result appears automatically after reload, with no resubmission', { skip: !chromium }, async () => {
  const server = createApp({ env: {}, db: null });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const order = questions.map(q => q.id);
    const answers = Object.fromEntries(questions.map(q => [q.id, q.type === 'open' ? 'Synthetic answer' : q.correct]));
    await page.addInitScript(({ order, answers }) => {
      if (sessionStorage.getItem('english-exam-draft-v1')) return;
      sessionStorage.setItem('english-exam-draft-v1', JSON.stringify({
        name: 'Synthetic QA', order, answers, locked: order, finished: false, sent: false
      }));
    }, { order, answers });
    let posts = 0, lookups = 0, token;
    await page.route('**/api/submit-exam', async route => {
      posts++;
      token = route.request().postDataJSON().resultToken;
      assert.match(token, /^[0-9a-f]{32}$/);
      await route.fulfill({ status: 202, json: { success: true, grading: { status: 'pending', scores: {} } } });
    });
    await page.route('**/api/exam-result', async route => {
      lookups++;
      assert.deepEqual(route.request().postDataJSON(), { resultToken: token });
      if (lookups === 1) return route.abort('internetdisconnected');
      await route.fulfill({ status: 200, json: { grading: { status: 'ok', finalScore: 0, conclusion: 'כדאי להוסיף דוגמה מתוך הטקסט.', scores: {}, emailSent: false } } });
    });
    await page.clock.install();
    await page.goto(base + '/english-exam.html?source=inline');
    await page.locator('#begin').click();
    await page.locator('#review-button').click();
    await page.locator('#finish').click();
    await page.getByText('סיימתם! התשובות נשמרו.').waitFor();
    assert.match(await page.locator('#score').textContent(), /לאחר השלמת הבדיקה/);
    assert.equal(await page.locator('#regrade').isVisible(), false);
    assert.doesNotMatch(await page.locator('#score').textContent(), /מתוך 100/);
    assert.equal(await page.locator('#ai-conclusion').isVisible(), false);
    await page.reload();
    await page.getByText('סיימתם! התשובות נשמרו.').waitFor();
    const firstLookup = page.waitForEvent('requestfailed', request => request.url().endsWith('/api/exam-result'));
    await page.clock.fastForward(5001);
    await firstLookup;
    const retry = page.waitForResponse(response => response.url().endsWith('/api/exam-result'));
    await page.clock.runFor(10100);
    await retry;
    await page.getByText('ציון סופי: 0 מתוך 100.').waitFor();
    await page.getByText('סיכום בדיקת הבינה המלאכותית: כדאי להוסיף דוגמה מתוך הטקסט.').waitFor();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.locator('#finish').isVisible(), false);
    await page.reload();
    await page.getByText('ציון סופי: 0 מתוך 100.').waitFor();
    await page.getByText('סיכום בדיקת הבינה המלאכותית: כדאי להוסיף דוגמה מתוך הטקסט.').waitFor();
    await page.clock.fastForward(65000);
    assert.equal(posts, 1);
    assert.equal(lookups, 2);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
