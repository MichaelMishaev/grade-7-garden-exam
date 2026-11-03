import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';
let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}

const APP_URL = 'https://hitech.agnon.online/';

test('app sharing uses only the public home URL, with native, copy and manual fallbacks', { skip: !chromium && 'global Playwright not available' }, async () => {
  const server = createApp({ env: {}, db: null, sendFetch: async () => { throw Error('Email forbidden in app-share checks'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    const native = await browser.newContext();
    await native.addInitScript(() => {
      window.shareCalls = []; window.copyCalls = [];
      Object.defineProperty(navigator, 'share', { configurable: true, value: async payload => window.shareCalls.push(payload) });
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => window.copyCalls.push(value) } });
    });
    const page = await native.newPage();
    await page.goto(`${base}/?attempt=demo#exam-calendar`);
    await page.locator('#share-app').waitFor({ state: 'visible' });
    for (const width of [320, 375, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => {
        const share = document.getElementById('share-app').getBoundingClientRect();
        const install = document.getElementById('install-app').getBoundingClientRect();
        const calendar = document.querySelector('.calendar-link').getBoundingClientRect();
        const logo = document.querySelector('.prepx-brand').getBoundingClientRect();
        return document.documentElement.scrollWidth <= innerWidth && share.width >= 44 && share.height >= 44 && install.left >= 0 && install.right <= share.left && share.right <= calendar.left && calendar.right <= logo.left;
      }), true, `share and existing actions fit ${width}px`);
    }
    await page.locator('#share-app').focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.shareCalls.length === 1);
    assert.deepEqual(await page.evaluate(() => window.shareCalls), [{ title: 'PrepX', url: APP_URL }]);
    assert.deepEqual(await page.evaluate(() => window.copyCalls), []);
    assert.equal(await page.locator('#app-share-help').isVisible(), false);
    await page.evaluate(() => Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new DOMException('Cancelled', 'AbortError'); } }));
    await page.locator('#share-app').click();
    assert.equal(await page.locator('#share-app').isEnabled(), true);
    assert.equal(await page.locator('#app-share-help').isVisible(), false);
    assert.deepEqual(await page.evaluate(() => window.copyCalls), []);

    // With native sharing absent, copy and give clear feedback without sending anything.
    await page.evaluate(() => Object.defineProperty(navigator, 'share', { configurable: true, value: undefined }));
    await page.locator('#share-app').click();
    await page.locator('#app-share-help').waitFor({ state: 'visible' });
    assert.deepEqual(await page.evaluate(() => window.copyCalls), [APP_URL]);
    assert.match(await page.locator('#app-share-status').textContent(), /הקישור הועתק/);
    assert.equal(await page.locator('#app-share-url').inputValue(), APP_URL);
    await page.locator('#app-share-copy').click();
    await page.waitForFunction(() => window.copyCalls.length === 2);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.activeElement.id === 'share-app');

    // A denied native share and clipboard still leave a selectable canonical URL and retry.
    await page.evaluate(() => {
      window.denyCopy = true;
      Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new DOMException('Denied', 'NotAllowedError'); } });
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { if (window.denyCopy) throw new DOMException('Denied', 'NotAllowedError'); window.copyCalls.push(value); } } });
    });
    await page.locator('#share-app').click();
    await page.locator('#app-share-help').waitFor({ state: 'visible' });
    assert.match(await page.locator('#app-share-status').textContent(), /לנסות שוב/);
    assert.equal(await page.locator('#app-share-url').getAttribute('readonly'), '');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'app-share-url');
    assert.equal(await page.evaluate(() => { const input = document.getElementById('app-share-url'); return input.value.slice(input.selectionStart, input.selectionEnd); }), APP_URL);
    await page.evaluate(() => { window.denyCopy = false; });
    await page.locator('#app-share-copy').click();
    await page.waitForFunction(() => document.getElementById('app-share-status').textContent.includes('הקישור הועתק'));
    await page.locator('#app-share-help button').last().click();
    await page.waitForFunction(() => document.activeElement.id === 'share-app');

    const standalone = await browser.newContext();
    await standalone.addInitScript(() => {
      Object.defineProperty(navigator, 'standalone', { get: () => true });
      Object.defineProperty(navigator, 'share', { configurable: true, value: async payload => { window.sharedAppURL = payload.url; } });
    });
    const installed = await standalone.newPage();
    await installed.goto(base);
    await installed.locator('#share-app').waitFor({ state: 'visible' });
    assert.equal(await installed.locator('#install-app').isHidden(), true);
    await installed.locator('#share-app').click();
    assert.equal(await installed.evaluate(() => window.sharedAppURL), APP_URL);
    await standalone.close();
    await native.close();
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
