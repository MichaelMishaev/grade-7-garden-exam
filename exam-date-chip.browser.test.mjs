import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}

test('past-date chips label home and exam-version cards without marking today or blocking practice', { skip: !chromium && 'global Playwright not available' }, async () => {
  const server = createApp({ env: {}, sendFetch: async () => { throw new Error('no email in chip checks'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, timezoneId: 'Pacific/Honolulu' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.install({ time: new Date('2026-11-02T21:59:59Z') });
    await page.goto(base);
    assert.equal(await page.locator('a[href*="subject=hebrew"] .exam-date-chip').textContent(), 'מועד המבחן עבר');
    assert.equal(await page.locator('a[href*="subject=physics"] .exam-date-chip').count(), 0, 'today is still upcoming');
    await page.clock.fastForward(61_000);
    assert.equal(await page.locator('.exam-date-chip').count(), 2, 'Israel midnight updates the open page');
    await page.clock.fastForward(120_000);
    assert.equal(await page.locator('.exam-date-chip').count(), 2, 'refreshes do not duplicate chips');
    // The new explanations section extends below the original compact study content.
    assert.equal(await page.locator('.home-games').evaluate(el => el.getBoundingClientRect().bottom <= 844), true);
    assert.equal(await page.locator('.home-explanations').evaluate(el => el.getBoundingClientRect().top >= document.querySelector('.home-games').getBoundingClientRect().bottom), true);
    await page.locator('a[href*="subject=hebrew"]').click();
    await page.locator('.variant-card .exam-date-chip').first().waitFor();
    assert.equal(await page.locator('.variant-card .exam-date-chip').count(), 2);
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    await page.locator('.variant-start').first().click();
    assert.ok(page.url().endsWith('/garden-exam.html'), 'past exam remains accessible');
    // The asynchronous content fallback renders after the chip module has loaded.
    await page.route('**/api/subjects/physics', async route => {
      await new Promise(resolve => setTimeout(resolve, 50));
      await route.abort();
    });
    await page.goto(`${base}/subject.html?subject=physics`);
    await page.locator('.variant-card .exam-date-chip').waitFor();
    assert.equal(await page.locator('.variant-card .exam-date-chip').count(), 1);
    await page.clock.setSystemTime(new Date('2026-10-01T12:00:00Z'));
    await page.goto(`${base}/subject.html?subject=hebrew&source=inline`);
    await page.locator('.variant-card').first().waitFor();
    assert.equal(await page.locator('.exam-date-chip').count(), 0, 'future versions have no past-date chip');
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
