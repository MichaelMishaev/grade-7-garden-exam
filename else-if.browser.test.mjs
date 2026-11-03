import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';
let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}

test('else if: ordered checks, skipped elif, bilingual state and five locked checkpoints', { skip: !chromium && 'global Playwright unavailable' }, async () => {
  const server = createApp({ env: {}, db: null, sendFetch: async () => { throw new Error('No email in lesson QA'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width:390, height:844 } });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.route('https://hitech.agnon.online/**', route => route.abort());
    await page.clock.install();
    await page.goto(`http://127.0.0.1:${server.address().port}/explanations.html?lang=he`);
    await page.locator('[data-lesson="else-if.html"]').click();
    await page.waitForFunction(() => document.getElementById('playground-title')?.lang === 'he');
    assert.equal(await page.locator('.decision-board').isVisible(), true);
    await page.getByRole('button', { name:'English', exact:true }).click();
    for (const [score, branch] of [['59','else'],['60','elif'],['79','elif'],['80','if'],['90','if']]) {
      await page.locator('#score-slider').fill(score);
      assert.equal(await page.locator('.branch-path.selected').getAttribute('id'), `${branch}-path`);
      if (branch === 'if') assert.equal(await page.locator('#second-result').textContent(), 'Not checked');
    }
    await page.locator('#play').click();
    assert.equal(await page.locator('#first-result').textContent(), 'Waiting');
    await page.clock.fastForward(2000);
    assert.match(await page.locator('#step-description').textContent(), /1\/4/);
    await page.clock.fastForward(1100);
    assert.equal(await page.locator('#second-result').textContent(), 'Not checked');
    await page.locator('#play').click();
    await page.locator('#step').click();
    assert.equal(await page.locator('#output-branch').textContent(), 'Great work!');
    await page.locator('#step').click();
    assert.equal(await page.locator('#output-end').textContent(), 'Next lesson');
    await page.locator('#score').fill('70');
    await page.locator('#play').click();
    await page.clock.fastForward(3100);
    assert.equal(await page.locator('#second-result').textContent(), 'Waiting');
    await page.getByRole('button', { name:'עברית', exact:true }).click();
    assert.match(await page.locator('#step-description').textContent(), /2\/5/);
    await page.locator('#play').click(); // pause
    await page.locator('#step').click();
    assert.equal(await page.locator('#second-result').textContent(), 'True');
    await page.locator('#step').click();
    assert.equal(await page.locator('#output-branch').textContent(), 'You passed!');
    await page.locator('#score').fill('');
    assert.equal(await page.locator('#play').isDisabled(), true);
    assert.equal(await page.locator('.branch-path.selected').count(), 0);
    await page.locator('#score').fill('70');
    await page.locator('#rule-settings summary').click();
    await page.locator('#second-threshold').fill('80');
    assert.equal(await page.locator('#input-error').isVisible(), true);
    await page.locator('#second-threshold').fill('60');
    assert.equal(await page.locator('#input-error').isVisible(), false);
    await page.locator('#rule-settings summary').click();
    for (const width of [390,1280]) {
      await page.setViewportSize({width,height:900});
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    await page.locator('.lesson-nav a[href="#questions"]').click();
    await page.locator('#questions').waitFor({state:'visible'});
    const keys = [1,0,1,2,0];
    for (let i=0; i<keys.length; i++) {
      if (i===0) {
        await page.locator('#question-card input').nth(0).check();
        await page.locator('[data-retry]').click();
        assert.equal(await page.locator('#question-card input:disabled').count(),0);
        assert.equal(await page.locator('#question-card input').first().evaluate(el => el === document.activeElement),true);
      }
      await page.locator('#question-card input').nth(keys[i]).check();
      assert.match(await page.locator('.answer-feedback').textContent(), /נכון/);
      assert.equal(await page.locator('#question-card input:disabled').count(), 3);
      if (i===0) {
        await page.getByRole('button',{name:'English',exact:true}).click();
        assert.match(await page.locator('.answer-feedback').textContent(), /Correct/);
        await page.getByRole('button',{name:'עברית',exact:true}).click();
      }
      await page.locator('#next-question').click();
    }
    assert.equal(await page.locator('#check-complete').isVisible(),true);
    await page.locator('#restart-questions').click();
    assert.equal(await page.locator('#next-question').isDisabled(),true);
    assert.deepEqual(errors,[]);
  } finally {
    await browser.close(); await new Promise(resolve => server.close(resolve));
  }
});
