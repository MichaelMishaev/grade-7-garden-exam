import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}

test('explanations: picture, bilingual discovery, visual playground and immediate feedback', { skip: !chromium && 'global Playwright not available' }, async () => {
  const server = createApp({ env: {}, db: null, sendFetch: async () => { throw new Error('Email forbidden in explanation checks'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('https://hitech.agnon.online/**', route => route.abort());
    await page.clock.install();
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    const picture = page.locator('.home-explanations img');
    await picture.scrollIntoViewIfNeeded();
    await picture.evaluate(img => img.decode());
    assert.ok(await picture.evaluate(img => img.complete && img.naturalWidth > 0));
    await page.locator('.home-explanations a').click();
    await page.getByRole('button', { name: 'עברית', exact: true }).click();
    assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
    assert.deepEqual(await page.locator('.lesson-preview').evaluateAll(nodes => nodes.map(node => node.dir)), ['ltr', 'ltr']);
    assert.equal(await page.getByRole('heading', { name: 'הסברים', exact: true }).count(), 1);
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('lang'), 'he');
    assert.equal(await page.locator('.discovery-card').count(), 2);
    assert.equal(await page.locator('[data-lesson="else-if.html"]').getAttribute('href'), 'else-if.html?lang=he#playground');
    await page.locator('.discovery-start[data-lesson="if-else.html"]').click();
    await page.locator('#playground').waitFor({ state: 'visible' });
    await page.locator('#playground-title[lang="he"]').waitFor(); // the lesson module graph may still be loading
    assert.equal(await page.locator('#playground-title').getAttribute('lang'), 'he');
    assert.equal(await page.locator('.decision-board').isVisible(), true);
    assert.equal(await page.locator('.code-panel').isVisible(), false);
    await page.locator('#score-slider').fill('60');
    assert.equal(await page.locator('#score').inputValue(), '60');
    assert.equal(await page.locator('#condition-result').textContent(), 'True');
    await page.locator('#rule-settings summary').click();
    await page.locator('#operator').selectOption('>');
    assert.equal(await page.locator('#condition-result').textContent(), 'False');
    assert.equal(await page.locator('#output-branch').textContent(), 'Keep practicing!');
    await page.locator('#rule-settings summary').click();
    await page.locator('#play').click();
    assert.equal(await page.locator('[data-node="input"]').evaluate(el => el.classList.contains('current')), true);
    await page.clock.fastForward(2000);
    assert.equal(await page.locator('[data-node="input"]').evaluate(el => el.classList.contains('current')), true);
    await page.clock.fastForward(1100);
    assert.equal(await page.locator('[data-node="condition"]').evaluate(el => el.classList.contains('current')), true);
    await page.getByRole('button', { name: 'English', exact: true }).click();
    assert.match(await page.locator('#step-description').textContent(), /^2 of 4/);
    assert.equal(await page.locator('#score').inputValue(), '60');
    await page.locator('#play').click(); // pause
    await page.locator('#step').click();
    assert.equal(await page.locator('.branch-path.selected').count(), 1);
    await page.locator('[data-view="code"]').click();
    assert.equal(await page.locator('.code-panel').isVisible(), true);
    assert.equal(await page.locator('.output-panel').getAttribute('data-result'), 'false');
    await page.locator('#score').fill('');
    assert.equal(await page.locator('#play').isDisabled(), true);
    assert.equal(await page.locator('.output-panel').getAttribute('data-result'), 'waiting');
    await page.locator('#score').fill('75');
    assert.equal(await page.locator('#play').isDisabled(), false);
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    await page.getByRole('link', { name: 'Quick check', exact: true }).click();
    await page.locator('#questions').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.question-card:visible').count(), 1);
    await page.getByRole('radio', { name: 'True or False', exact: true }).check();
    assert.match(await page.locator('.question-card:visible .answer-feedback').textContent(), /Correct!/);
    assert.equal(await page.locator('.question-card:visible input:disabled').count(), 3);
    await page.locator('#next-question').click();
    assert.equal(await page.locator('#question-progress-label').textContent(), 'Question 2 of 5');
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
