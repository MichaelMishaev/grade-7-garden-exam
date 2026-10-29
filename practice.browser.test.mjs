import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

// Real headless browser check of the practice flow (own Playwright, never the MCP browser; Resend/endpoint mocked).
let chromium;
try {
  const playwright = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs');
  chromium = playwright.chromium ?? playwright.default?.chromium;
} catch { /* not installed: the browser tests are skipped */ }
const skip = !chromium && 'global Playwright not available';

async function withPage(run, { reducedMotion = 'no-preference' } = {}) {
  const server = createApp({ env: { NODE_ENV: 'production' }, sendFetch: async () => { throw new Error('no email in practice'); } });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion });
    await context.addInitScript(() => { if (!localStorage.getItem('prepx-student-name-v1')) localStorage.setItem('prepx-student-name-v1', 'דנה'); });
    const page = await context.newPage();
    const posts = [];
    await page.route('**/api/practice-result', async (route) => {
      posts.push(JSON.parse(route.request().postData()));
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true,"stored":false}' });
    });
    await page.goto(`${base}/practice.html?quiz=facts&source=inline`);
    await run({ page, posts });
  } finally { await browser.close(); await new Promise((resolve) => server.close(resolve)); }
}

const text = (page) => page.locator('#question-text').textContent();

test('a clicked answer is locked, shows the verdict, and the next question opens by itself after about 1.5 s', { skip }, () => withPage(async ({ page }) => {
  const first = await text(page);
  await page.locator('#choices button').first().click();
  assert.ok(await page.locator('#feedback').isVisible());
  assert.equal(await page.locator('#choices button:not(:disabled)').count(), 0);
  await page.waitForTimeout(700);
  assert.equal(await text(page), first, 'still on the same question during the pause');
  await page.waitForFunction((old) => document.getElementById('question-text').textContent !== old, first, { timeout: 2500 });
  assert.match(await page.locator('#progress-count').textContent(), /שאלה 2 מתוך/);
  assert.equal(await page.locator('#feedback').isVisible(), false);
  assert.equal(await page.locator('#choices button:not(:disabled)').count() > 0, true);
}));

test('going back is read-only, stops the automatic advance, and next returns forward', { skip }, () => withPage(async ({ page }) => {
  const first = await text(page);
  await page.locator('#choices button').first().click();
  await page.click('#next-button');
  const second = await text(page);
  await page.click('#back-button');
  assert.equal(await text(page), first);
  assert.match(await page.locator('#question-index').textContent(), /צפייה בלבד/);
  assert.equal(await page.locator('#choices button:not(:disabled)').count(), 0);
  assert.ok(await page.locator('#feedback').isVisible());
  await page.waitForTimeout(1900);
  assert.equal(await text(page), first, 'no automatic advance while reviewing');
  await page.click('#next-button');
  assert.equal(await text(page), second);
  assert.equal(await page.locator('#choices button:not(:disabled)').count() > 0, true);
}));

test('a full round posts once, lists every question with its explanation, and a retry is a new unlocked round', { skip }, () => withPage(async ({ page, posts }) => {
  const play = async () => {
    while (await page.locator('#quiz-screen').isVisible()) { await page.locator('#choices button').first().click(); await page.click('#next-button'); }
  };
  await play();
  await page.waitForTimeout(200);
  assert.equal(posts.length, 1);
  assert.equal(posts[0].answers.length, 6);
  const items = page.locator('#review-list li');
  assert.equal(await items.count(), 6);
  assert.ok((await items.first().textContent()).length > 20);
  await page.waitForTimeout(1800);
  assert.equal(await page.locator('#result-screen').isVisible(), true, 'a stale timer must not leave the summary');
  await page.click('#retry-button');
  assert.equal(await page.locator('#choices button:not(:disabled)').count() > 0, true);
  assert.match(await page.locator('#progress-count').textContent(), /שאלה 1 מתוך/);
  await play();
  await page.waitForTimeout(200);
  assert.equal(posts.length, 2);
}));

test('with reduced motion there is only the pause, then the next question', { skip }, () => withPage(async ({ page }) => {
  const first = await text(page);
  await page.locator('#choices button').first().click();
  await page.waitForTimeout(600);
  assert.equal(await text(page), first);
  await page.waitForFunction((old) => document.getElementById('question-text').textContent !== old, first, { timeout: 2500 });
}, { reducedMotion: 'reduce' }));
