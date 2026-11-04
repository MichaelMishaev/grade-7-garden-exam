import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createApp } from './server.mjs';

let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch {}

test('if/else terminal: missions, kid-friendly errors, indent help, bilingual copy, no overflow', { skip: !chromium && 'global Playwright not available' }, async () => {
  const server = createApp({ env: {}, db: null, sendFetch: async () => { throw new Error('Email forbidden in explanation checks'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('https://hitech.agnon.online/**', route => route.abort());
    await page.goto(`http://127.0.0.1:${server.address().port}/if-else.html#terminal`);
    await page.locator('#terminal').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#playground').isVisible(), false);
    assert.equal(await page.locator('.lesson-nav a[aria-current]').textContent(), '3 Write code');
    assert.match(await page.locator('#code-editor').inputValue(), /^score = 75/);
    assert.deepEqual(await page.locator('#code-gutter span').allTextContents(), ['1', '2', '3', '4', '5', '6']);
    assert.equal(await page.locator('#mission-next').isDisabled(), true);

    // Suggestions edit the code for the learner and explain what to look for.
    await page.locator('.mission-support summary').click();
    await page.locator('.extra-code-tools summary').click();
    assert.equal(await page.locator('#idea-buttons button').count(), 6);
    assert.equal(await page.locator('#idea-buttons button:disabled').count(), 0);
    await page.locator('[data-idea="number"]').click();
    assert.match(await page.locator('#code-editor').inputValue(), /^score = 40/);
    assert.match(await page.locator('#idea-note').textContent(), /score is now 40/);
    assert.equal(await page.locator('.code-change-before code').textContent(), 'score = 75');
    assert.equal(await page.locator('.code-change-after code').textContent(), 'score = 40');
    assert.equal(await page.locator('.code-change-before mark').textContent(), '75');
    assert.equal(await page.locator('.code-change-after mark').textContent(), '40');
    await page.locator('.editor-change-after').waitFor();
    assert.equal(await page.locator('.editor-change-after').textContent(), '40');
    assert.equal(await page.locator('.editor-change-view').getAttribute('aria-hidden'), 'true');
    assert.equal(await page.locator('.editor-change-view pre').textContent(), (await page.locator('#code-editor').inputValue()) + '\n');
    await mkdir('output/playwright', { recursive: true });
    await page.locator('#editor-shell').screenshot({ path: 'output/playwright/terminal-editor-change.png' });


    await page.locator('[data-idea="elif"]').click();
    assert.match(await page.locator('#code-editor').inputValue(), /elif score >= 40:\n    print\("Almost!"\)\nelse:/);
    assert.equal(await page.locator('[data-idea="elif"]').isDisabled(), true, 'a second elif is not offered');
    assert.match(await page.locator('.code-change-after code').textContent(), /elif score >= 40/);
    assert.equal(await page.locator('.code-change-before code').textContent(), '(no lines)');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('[data-idea="number"]').click();
    assert.equal(await page.locator('.code-change-after').evaluate(el => el.getAnimations()[0]?.effect.getKeyframes().some(frame => frame.transform && frame.transform !== 'none') ?? false), false);
    assert.equal(await page.locator('.editor-change-before').count(), 0);
    assert.equal(await page.locator('.editor-change-after').textContent(), '75');
    await page.locator('#code-editor').focus();
    assert.equal(await page.locator('.editor-change-view').count(), 0, 'editing immediately removes the presentation layer');
    assert.equal(await page.locator('#code-editor').evaluate(el => getComputedStyle(el).color), 'rgb(242, 243, 245)');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await mkdir('output/playwright', { recursive: true });
    await page.locator('#idea-note').screenshot({ path: 'output/playwright/terminal-code-diff.png' });

    const rapid = await page.locator('[data-idea="number"]').evaluate(button => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
      button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
      return {
        old: document.querySelector('.editor-change-before').textContent,
        current: document.getElementById('code-editor').value,
        layers: document.querySelectorAll('.editor-change-view').length
      };
    });
    assert.equal(rapid.old, '40', 'the second click replaces the first presentation');
    assert.match(rapid.current, /^score = 75/);
    assert.equal(rapid.layers, 1);
    await page.locator('#mission-reset').click();
    assert.equal(await page.locator('.editor-change-view').count(), 0, 'reset cancels an in-progress replacement');
    assert.equal(await page.locator('#idea-note').isVisible(), false);

    // Mission 1: just press Run. The card turns green and tells the kid what to tap next.
    assert.equal(await page.locator('.terminal-help').evaluate(el => el.open), false);
    assert.match(await page.locator('#mission-step').textContent(), /Press “Run the code”/);
    await page.locator('#run').click();
    assert.match(await page.locator('#terminal-output').textContent(), /Running your code…\nYou passed!\nNext lesson\n/);
    assert.equal(await page.locator('.terminal-success').count(), 1);
    assert.equal(await page.locator('#mission-card').getAttribute('data-done'), 'true');
    assert.match(await page.locator('#mission-step').textContent(), /Done! Tap Next mission/);
    assert.equal(await page.locator('.mac-badge').first().textContent(), 'YOUR CODE · tap to edit');
    await page.locator('#mission-next').click();

    // Mission 2: one suggestion chip, then Run. No typing.
    assert.match(await page.locator('#mission-label').textContent(), /MISSION 2 of 6/);
    assert.equal(await page.locator('[data-mission-dot]').count(), 6);
    await page.locator('#run').click();
    assert.equal(await page.locator('.terminal-note').count(), 1, 'runs but mission not done');
    assert.equal(await page.locator('#mission-hint-text').isVisible(), false);
    await page.locator('#run').click();
    assert.equal(await page.locator('#mission-hint-text').isVisible(), true, 'second miss opens the hint automatically');
    assert.match(await page.locator('#mission-hint-text').textContent(), /^💡 Here is a hint:/);
    await page.locator('[data-idea="number"]').click();
    await page.locator('#run').click();
    assert.equal(await page.locator('.terminal-success').count(), 1);
    assert.equal(await page.locator('#mission-status').getAttribute('data-done'), 'true');
    await page.locator('#mission-next').click();

    // Mission 3: broken program shows a red line-numbered message; Show me fixes it.
    assert.match(await page.locator('#mission-label').textContent(), /MISSION 3 of 6/);
    await page.locator('#run').click();
    assert.match(await page.locator('.terminal-error').textContent(), /^✕ Line 2: add a colon/);
    assert.equal(await page.locator('#code-gutter .gutter-error').textContent(), '2');
    await page.locator('#code-editor').press('End');
    assert.equal(await page.locator('#code-gutter .gutter-error').count(), 1, 'marker stays until the code changes');
    await page.locator('#code-editor').type(' ');
    assert.equal(await page.locator('#code-gutter .gutter-error').count(), 0, 'editing clears the marker');
    await page.locator('#mission-hint').click();
    assert.equal(await page.locator('#mission-hint-text').isVisible(), true);
    await page.locator('#mission-solution').click();
    await page.locator('#run').click();
    assert.equal(await page.locator('.terminal-success').count(), 1);
    await page.locator('#mission-next').click();

    // Mission 4: write from scratch with Tab and the Indent button; Enter auto-indents after a colon.
    await page.locator('#code-editor').fill('age = 13\nif age >= 13:');
    await page.locator('#code-editor').focus();
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    await page.keyboard.type('print("Teen")');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Backspace', { delay: 0 });
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('else:');
    await page.keyboard.press('Enter');
    await page.keyboard.type('print("Kid")');
    assert.equal(await page.locator('#code-editor').inputValue(), 'age = 13\nif age >= 13:\n    print("Teen")\nelse:\n    print("Kid")');
    await page.keyboard.press('Control+Enter');
    assert.equal(await page.locator('.terminal-success').count(), 1);
    await page.locator('#code-editor').fill('age = 13\nif age >= 13:\nprint("Teen")');
    await page.locator('#code-editor').evaluate(el => el.setSelectionRange(23, 23));
    await page.locator('#indent').click();
    assert.equal(await page.locator('#code-editor').inputValue(), 'age = 13\nif age >= 13:\n    print("Teen")');

    // Hebrew copy flips the instructions but keeps the code and output LTR.
    await page.getByRole('button', { name: 'עברית', exact: true }).click();
    assert.equal(await page.locator('#mission-task').getAttribute('dir'), 'rtl');
    assert.match(await page.locator('#run').textContent(), /הפעלה/);
    await page.locator('#run').click();
    assert.match(await page.locator('.terminal-success').textContent(), /המשימה הושלמה/);
    assert.equal(await page.locator('.editor-body').evaluate(el => getComputedStyle(el).direction), 'ltr');
    await page.getByRole('button', { name: 'English', exact: true }).click();

    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('kid missions: Hebrew RTL, clear steps/results, local actions, optional help and English switch', { skip: !chromium && 'global Playwright not available' }, async () => {
  const { missions } = await import('./code-runner.js');
  const server = createApp({ env: {}, db: null, sendFetch: async () => { throw new Error('Email forbidden'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/if-else.html?lang=he#terminal`);
    assert.equal(await page.locator('#mission-card').evaluate(el => getComputedStyle(el).direction), 'rtl');
    assert.equal(await page.locator('.mission-actions').evaluate(el => getComputedStyle(el).direction), 'rtl');
    assert.equal(await page.locator('.lesson-nav').evaluate(el => getComputedStyle(el).direction), 'rtl');
    assert.equal(await page.locator('.terminal-help').evaluate(el => el.open), false);
    assert.equal(await page.locator('.mission-support summary').textContent(), 'רוצים עזרה?');
    assert.match(await page.locator('.extra-code-tools summary').textContent(), /לא חובה/);
    assert.equal(await page.locator('.mission-support').evaluate(el => el.open), false);
    assert.equal(await page.locator('.extra-code-tools').evaluate(el => el.open), false);
    assert.equal(await page.locator('#mission-action').isVisible(), false);
    assert.equal(await page.locator('#mission-run').isVisible(), true);
    assert.equal(await page.locator('#mission-step li').count(), 2);
    const positions = await page.locator('.mission-head').evaluate(el => ({ label: el.children[0].getBoundingClientRect().x, status: el.children[1].getBoundingClientRect().x }));
    assert.ok(positions.label > positions.status, 'Hebrew progress starts on the right');
    assert.equal(await page.locator('#mission-expected bdi').first().getAttribute('dir'), 'ltr');
    await mkdir('output/playwright', { recursive: true });
    await page.screenshot({ path: 'output/playwright/kid-mission-hebrew-mobile.png', fullPage: true });
    await page.locator('#mission-card').screenshot({ path: 'output/playwright/kid-mission-card.png' });
    await page.locator('#mission-run').click();
    assert.equal(await page.locator('#mission-continue').isVisible(), true);
    await page.locator('#mission-continue').click();
    await page.locator('#mission-action').click();
    assert.match(await page.locator('#code-editor').inputValue(), /^score = 40/);
    await page.locator('#mission-run').click();
    assert.match(await page.locator('#terminal-output').textContent(), /Keep practicing!/);
    await page.locator('#mission-continue').click();
    for (let i = 2; i < missions.length; i++) {
      assert.equal(await page.locator('#mission-card').getAttribute('dir'), 'rtl');
      assert.ok(await page.locator('#mission-step li').count() >= 2);
      assert.ok((await page.locator('#mission-expected').textContent()).length > 10);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      if (!(await page.locator('.mission-support').evaluate(el => el.open))) await page.locator('.mission-support summary').click();
      await page.locator('#mission-solution').click();
      await page.locator('#mission-run').click();
      assert.equal(await page.locator('#mission-card').getAttribute('data-done'), 'true');
      await page.locator('#mission-continue').click();
    }
    await page.locator('#terminal-restart').click();
    await page.getByRole('button', { name: 'English', exact: true }).click();
    assert.equal(await page.locator('#mission-card').getAttribute('dir'), 'ltr');
    assert.equal(await page.locator('.mission-actions').evaluate(el => getComputedStyle(el).direction), 'ltr');
    await page.getByRole('button', { name: 'עברית', exact: true }).click();
    assert.equal(await page.locator('#mission-card').getAttribute('dir'), 'rtl');
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
