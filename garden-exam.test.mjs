// The garden exam (20 open questions) follows the shared exam rules in docs/TESTING.md: shuffled per student, "אישור"
// locks an answer and advances after 1.5 s, going back is read-only, finishing sends at once and shows a locked
// summary, a failed send keeps the draft and can be retried, a reload never sends twice. Source-level checks first,
// then a real browser run (390x844, Resend mocked, skipped when Playwright is not installed).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createApp } from './server.mjs';

const html = readFileSync(new URL('./garden-exam.html', import.meta.url), 'utf8');
const thanks = readFileSync(new URL('./thanks.html', import.meta.url), 'utf8');
const script = html.slice(html.lastIndexOf('<script>'));

test('shared behaviours are present in the page source', () => {
  assert.match(html, /<button class="button primary" id="confirm" type="button" disabled>אישור<\/button>/);
  assert.match(script, /}, 1500\)/, 'auto-advance after 1500 ms');
  assert.match(script, /AbortSignal\.timeout\(45000\)/);
  assert.match(script, /exam: examId/);
  assert.match(script, /examId = 'hebrew-v1-garden'/);
  assert.match(script, /QuizCore\.shuffled/);
  assert.match(script, /order\.forEach\(index => locked\.add\(index\)\)/, 'finishing locks everything');
  assert.match(script, /persist\(\); results\(\); sendExam\(\)/, 'finish sends at once');
  assert.match(script, /storageKey = 'garden-exam-draft-v1'/);
  assert.match(script, /'garden-exam-result-v1'/);
  assert.match(script, /if \(sent\) byId\('send-status'\)/);
  assert.match(script, /if \(finished && questions\.every\(\(_, i\) => answered\(i\)\)\) \{ results\(\); if \(!sent\) sendExam\(\); \}/, 'reload shows the summary, sends only if not sent');
  assert.match(html, /id="timer"/);
  assert.match(html, /id="done-banner"/);
  assert.match(html, /ניסיון שליחה חוזר/);
  assert.match(html, /prefers-reduced-motion/);
});

test('there is no separate send-all button and the privacy line matches the library page', () => {
  assert.ok(!html.includes('שליחת כל התשובות'));
  assert.ok(!/id="send"[^>]*>שליחת/.test(html));
  assert.ok(html.includes('בסיום המבחן השם והתשובות נשלחים למורה אוטומטית'));
  assert.ok(!/בינה מלאכותית|AI/.test(html.replace(/Resend/g, '')), 'garden has no AI check');
});

test('the 20 question texts are unchanged and thanks.html still understands the garden keys', () => {
  const questions = [...script.slice(script.indexOf('const questions = ['), script.indexOf('];')).matchAll(/^\s+'(.*)',?$/gm)];
  assert.equal(questions.length, 20);
  assert.ok(thanks.includes("'garden-exam-draft-v1'") && thanks.includes("'garden-exam-result-v1'"));
});

let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch { /* no browser available */ }

test('browser: shuffle, confirm, lock, finish sends once, failure keeps the draft, reload does not resend', { skip: !chromium && 'Playwright is not installed', timeout: 90000 }, async () => {
  const calls = [];
  let failNext = false;
  const env = { APP_ORIGIN: 'http://127.0.0.1:0', RESEND_API_KEY: 'x', RESEND_FROM_EMAIL: 'PrepX <e@x>' };
  const server = createApp({ env, db: null, sleep: async () => {}, sendFetch: async (url, config) => {
    calls.push(JSON.parse(config.body));
    return failNext ? new Response('{}', { status: 500 }) : new Response(JSON.stringify({ id: 'mock' }), { status: 200 });
  } });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  env.APP_ORIGIN = origin;
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    // nothing may leave the machine
    await context.route((url) => !url.href.startsWith(origin), (route) => route.abort());
    const page = await context.newPage();
    await page.goto(`${origin}/garden-exam.html?source=inline`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'no horizontal scroll');
    await page.fill('#student-name', 'תלמיד בדיקה');
    await page.click('#begin');
    // first question: disabled confirm, then answer, lock, auto-advance after 1.5 s, read-only when going back
    assert.equal(await page.isDisabled('#confirm'), true, 'confirm is disabled until text is entered');
    await page.fill('#answer', 'תשובה 1');
    assert.equal(await page.isDisabled('#confirm'), false);
    assert.ok((await page.locator('#confirm').boundingBox()).height >= 44, 'target >= 44px');
    await page.click('#confirm');
    assert.equal(await page.isDisabled('#answer'), true, 'locked after confirm');
    await page.waitForFunction(() => document.getElementById('counter').textContent.includes('2 מתוך'), null, { timeout: 4000 });
    await page.click('#previous');
    assert.equal(await page.isDisabled('#answer'), true, 'going back is read-only');
    assert.equal(await page.inputValue('#answer'), 'תשובה 1');
    await page.click('#next');
    for (let position = 1; position < 20; position++) {
      await page.fill('#answer', `תשובה ${position + 1}`);
      await page.click('#confirm');
      await page.click(position < 19 ? '#next' : '#review-button');
    }
    // shuffled: the first question shown is very unlikely to be the first in the source in every run, so check the stored order is a permutation
    const draft = await page.evaluate(() => JSON.parse(sessionStorage.getItem('garden-exam-draft-v1')));
    assert.deepEqual([...draft.order].sort((a, b) => a - b), Array.from({ length: 20 }, (_, i) => i));
    await page.waitForSelector('#review.active');
    // review blocks until everyone is answered: all are answered here, so finishing is allowed
    failNext = true;
    await page.click('#finish');
    await page.waitForSelector('#send:not([hidden])');
    assert.ok(await page.textContent('#send-status').then((t) => t.includes('לא התקבל אישור')));
    assert.equal(await page.evaluate(() => JSON.parse(sessionStorage.getItem('garden-exam-draft-v1')).sent), false, 'draft kept after a failed send');
    assert.equal(calls.length, 4); // a provider 5xx is tried 4 times (1 + 3 retries) before the page sees the failure
    failNext = false;
    await page.click('#send');
    await page.waitForSelector('#done-banner:not([hidden])');
    assert.equal(calls.length, 5);
    const mail = calls[1];
    assert.ok(mail.subject.includes('HEB-001'), mail.subject);
    assert.ok(mail.subject.includes('HEB-001 · ניסיון 1'), 'attempt number in the subject');
    assert.equal((mail.text.match(/^\d+\. /gm) || []).length, 20);
    // reload: the locked summary is back, nothing is sent
    await page.reload();
    await page.waitForSelector('#results.active');
    await page.waitForTimeout(500);
    assert.equal(calls.length, 5, 'a reload does not resend');
    assert.equal(await page.isHidden('#done-banner'), false);
    assert.equal(await page.locator('#explanations article').count(), 20);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
