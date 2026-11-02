import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

let chromium;
try {
  ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs'));
} catch { /* Browser checks skip when global Playwright is unavailable. */ }

test('compact home shows three dates; calendar expands, closes and rolls over in Israel time', { skip: !chromium && 'global Playwright not available' }, async () => {
  const server = createApp({ env: {}, sendFetch: async () => { throw new Error('no email in calendar checks'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Pacific/Honolulu' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.install({ time: new Date('2026-11-02T12:00:00Z') });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    const rows = page.locator('#calendar-upcoming-rows tr:visible');
    assert.equal(await rows.count(), 3);
    assert.equal(await rows.first().locator('time').getAttribute('datetime'), '2026-11-02');
    assert.equal(await page.locator('.calendar-today-badge').textContent(), 'היום');
    assert.equal(await page.locator('#calendar-past-rows').isVisible(), false);
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `no horizontal overflow at ${width}`);
      assert.equal(await page.locator('footer').evaluate(el => el.getBoundingClientRect().bottom <= 844), true, `core content fits first screen at ${width}`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.calendar-expand').click();
    assert.equal(await page.locator('#calendar-dialog').isVisible(), true);
    assert.equal(await rows.count(), 12);
    assert.equal(await page.locator('.calendar-close').evaluate(el => el === document.activeElement), true);
    assert.equal(await page.locator('#calendar-dialog').evaluate(el => el.scrollWidth <= el.clientWidth), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('#calendar-dialog')), true, 'focus stays inside expanded calendar');
    await page.locator('#calendar-past summary').click();
    assert.equal(await page.locator('#calendar-past-rows tr:visible').count(), 3);
    await page.locator('#calendar-past summary').click();
    await page.keyboard.press('Escape');
    await page.locator('#exam-calendar #calendar-content').waitFor();
    assert.equal(await page.locator('#calendar-dialog').isVisible(), false);
    assert.equal(await rows.count(), 3);
    assert.equal(await page.locator('.calendar-expand').evaluate(el => el === document.activeElement), true);
    await page.locator('.calendar-show-all').click();
    await page.locator('.calendar-close').click();
    await page.locator('#exam-calendar #calendar-content').waitFor();
    assert.equal(await rows.count(), 3);
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('calendar-is-open')), false);
    await page.clock.setSystemTime(new Date('2026-11-02T21:59:59Z'));
    await page.clock.fastForward(61_000);
    assert.equal(await rows.first().locator('time').getAttribute('datetime'), '2026-11-09');
    assert.equal(await page.locator('#calendar-past-count').textContent(), '4');
    assert.equal(await page.locator('.calendar-today-badge').count(), 0);
    await page.clock.setSystemTime(new Date('2027-01-06T12:00:00Z'));
    await page.reload();
    assert.equal(await rows.count(), 1);
    await page.clock.setSystemTime(new Date('2027-02-01T12:00:00Z'));
    await page.reload();
    assert.equal(await rows.count(), 0);
    assert.equal(await page.locator('#calendar-empty').isVisible(), true);
    await page.locator('.calendar-expand').click();
    await page.locator('#calendar-past summary').click();
    assert.equal(await page.locator('#calendar-past-rows tr:visible').count(), 15);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
