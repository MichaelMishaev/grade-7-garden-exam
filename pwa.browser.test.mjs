import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';
let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}

test('PWA header, prompt recovery, installed state and offline retry preserve study navigation', { skip: !chromium }, async () => {
  const server = createApp({ env: {}, db: null, sendFetch: async () => { throw Error('Email forbidden in PWA QA'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(base);
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => {
        const button = document.querySelector('#install-app').getBoundingClientRect();
        const logo = document.querySelector('.prepx-brand').getBoundingClientRect();
        const calendar = document.querySelector('.calendar-link').getBoundingClientRect();
        return document.documentElement.scrollWidth <= innerWidth && button.width >= 44 && button.height >= 44 && button.left >= logo.right && calendar.right <= logo.left;
      }), true, `header fits at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      window.promptCount = 0;
      const event = new Event('beforeinstallprompt', { cancelable: true });
      event.prompt = async () => { window.promptCount++; };
      event.userChoice = Promise.resolve({ outcome: 'dismissed' });
      window.dispatchEvent(event);
    });
    await page.locator('#install-app').click();
    assert.equal(await page.evaluate(() => window.promptCount), 1);
    await page.locator('#install-app').click();
    assert.equal(await page.getByRole('dialog').isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'install-app');
    await page.evaluate(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      event.prompt = async () => { throw Error('unavailable'); };
      window.dispatchEvent(event);
    });
    await page.locator('#install-app').click();
    assert.equal(await page.getByRole('dialog').isVisible(), true);
    assert.equal(await page.locator('#install-app').isEnabled(), true);
    await page.getByRole('button', { name: 'הבנתי' }).click();
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload();
    assert.equal(await page.evaluate(() => !!navigator.serviceWorker.controller), true);
    // Warm this URL first, then stop the real server. This also detects stale HTTP-cache fallback.
    await page.goto(`${base}/subject.html?subject=physics`);
    await new Promise(resolve => server.close(resolve));
    await page.goto(`${base}/subject.html?subject=physics`);
    await page.getByRole('heading', { name: 'אין חיבור לאינטרנט' }).waitFor();
    await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
    await page.getByRole('button', { name: 'ניסיון נוסף' }).click();
    await page.getByRole('heading', { name: 'פיזיקה', exact: true }).waitFor();
    const cached = await page.evaluate(async () => (await Promise.all((await caches.keys()).map(async key => (await (await caches.open(key)).keys()).map(request => request.url)))).flat());
    assert.deepEqual(cached, [`${base}/offline.html`]);
    await page.goto(base);
    await page.evaluate(() => window.dispatchEvent(new Event('appinstalled')));
    assert.equal(await page.locator('#install-app').isHidden(), true);
    const apple = await browser.newContext({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1' });
    const ios = await apple.newPage();
    await ios.goto(base);
    await ios.locator('#install-app').click();
    assert.match(await ios.locator('#install-instructions').textContent(), /Safari/);
    await apple.close();
    const standalone = await browser.newContext();
    await standalone.addInitScript(() => Object.defineProperty(navigator, 'standalone', { get: () => true }));
    const installed = await standalone.newPage();
    await installed.goto(base);
    assert.equal(await installed.locator('#install-app').isHidden(), true);
    await standalone.close();
  } finally {
    await browser.close();
    if (server.listening) await new Promise(resolve => server.close(resolve));
  }
});
