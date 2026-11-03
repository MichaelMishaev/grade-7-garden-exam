import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}
const skip = !chromium && 'global Playwright not available';

async function withPage(run) {
  const app = createApp({ env: {}, sendFetch: async () => { throw new Error('Unexpected email'); } });
  await new Promise(resolve => app.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route('https://hitech.agnon.online/**', route => route.abort());
    await run(page, `http://127.0.0.1:${app.address().port}`);
  } finally {
    await browser.close();
    await new Promise(resolve => app.close(resolve));
  }
}

test('share each exam and quiz: exact links, native sharing, mobile and keyboard', { skip }, () => withPage(async (page, base) => {
  for (const [subject, count] of [['hebrew', 5], ['physics', 5], ['english', 1]]) {
    const subjectUrl = `${base}/subject.html?subject=${subject}${subject === 'hebrew' ? '' : '&source=inline'}`;
    await page.goto(subjectUrl);
    await page.locator('.test-share-button').first().waitFor();
    await page.locator('.variant-group').evaluateAll(groups => groups.forEach(group => group.open = true));
    assert.equal(await page.locator('.test-share-button').count(), count);
    await page.evaluate(() => {
      window.shares = [];
      Object.defineProperty(navigator, 'share', { configurable: true, value: async data => window.shares.push(data) });
    });
    const links = page.locator('.variant-start, a.quiz-row');
    for (let i = 0; i < count; i++) {
      const button = page.locator('.test-share-button').nth(i);
      const href = await links.nth(i).getAttribute('href');
      const box = await button.boundingBox();
      assert.ok(box.width >= 44 && box.height >= 44);
      await button.focus();
      assert.equal(await button.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
      await button.press('Enter');
      await page.waitForFunction(n => window.shares.length === n, i + 1);
      const data = await page.evaluate(() => window.shares.at(-1));
      assert.equal(data.url, new URL(href, base + '/').href);
      assert.deepEqual(Object.keys(data).sort(), ['title', 'url']);
      assert.match(data.title, /PrepX/);
      assert.equal(page.url(), subjectUrl);
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await links.first().click();
    assert.match(page.url(), /-exam.html$/);
  }
}));

test('copy fallback, silent cancellation, manual selection, retry and subdirectory URLs', { skip }, () => withPage(async (page, base) => {
  await page.goto(`${base}/subject.html?subject=hebrew&source=inline`);
  const button = page.locator('.test-share-button').first();
  const status = page.locator('.test-share-status').first();
  await page.evaluate(() => {
    history.replaceState(null, '', '/school/subject.html?subject=hebrew&name=private#draft');
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => window.copied = text } });
  });
  await button.click();
  assert.equal(await page.evaluate(() => window.copied), `${base}/school/garden-exam.html`);
  assert.match(await status.textContent(), /הקישור הועתק/);
  await page.evaluate(() => Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new DOMException('cancel', 'AbortError'); } }));
  await button.click();
  assert.equal(await status.textContent(), '');
  assert.equal(await button.isEnabled(), true);
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new Error('blocked'); } });
    navigator.clipboard.writeText = async () => { throw new Error('denied'); };
  });
  await button.click();
  const input = page.locator('.test-share-manual input').first();
  assert.equal(await input.isVisible(), true);
  assert.equal(await input.inputValue(), `${base}/school/garden-exam.html`);
  assert.equal(await input.evaluate(el => el.selectionEnd - el.selectionStart), `${base}/school/garden-exam.html`.length);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.evaluate(() => navigator.clipboard.writeText = async text => window.copied = text);
  await button.click();
  assert.match(await status.textContent(), /הקישור הועתק/);
  assert.equal(await input.isVisible(), false);
}));
