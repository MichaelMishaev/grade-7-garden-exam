import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';
let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}

test('calendar frame scrolls by wheel, keyboard and mobile swipe without moving the page', { skip: !chromium && 'global Playwright not available' }, async () => {
  const productionUrl = process.env.PREPX_CALENDAR_QA_URL;
  const server = productionUrl ? null : createApp({ env: {}, sendFetch: async () => { throw new Error('no email in scroll checks'); } });
  if (server) await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.clock.install({ time: new Date('2026-11-02T12:00:00Z') });
    await page.goto(productionUrl || `http://127.0.0.1:${server.address().port}/`);
    const frame = page.locator('#calendar-upcoming');
    assert.equal(await frame.evaluate(el => el.scrollHeight > el.clientHeight), true, 'later exams must be reachable inside the frame');
    const pageY = await page.evaluate(() => scrollY);
    await frame.hover();
    await page.mouse.wheel(0, 140);
    await page.waitForFunction(() => document.getElementById('calendar-upcoming').scrollTop > 50);
    assert.equal(await page.evaluate(() => scrollY), pageY);
    await frame.focus();
    await page.keyboard.press('End');
    await page.waitForFunction(() => {
      const el = document.getElementById('calendar-upcoming');
      return el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    });
    assert.equal(await page.evaluate(() => scrollY), pageY);
    await frame.evaluate(el => { el.scrollTop = 0; });
    const box = await frame.boundingBox();
    const cdp = await context.newCDPSession(page);
    const x = box.x + box.width / 2, start = box.y + box.height - 20;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: start }] });
    for (const dy of [20, 40, 60, 80, 100]) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: start - dy }] });
      await page.waitForTimeout(20);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForFunction(() => document.getElementById('calendar-upcoming').scrollTop > 30);
    assert.equal(await page.evaluate(() => scrollY), pageY);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.locator('.calendar-expand').click();
    assert.equal(await frame.evaluate(el => el.scrollHeight <= el.clientHeight + 1), true, 'expanded view shows the full table');
    await page.keyboard.press('Escape');
    await page.locator('#exam-calendar #calendar-content').waitFor();
    assert.equal(await frame.evaluate(el => el.scrollHeight > el.clientHeight), true);
  } finally {
    await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
});
