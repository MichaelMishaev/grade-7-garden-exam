import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const base = process.env.MAZE_QA_URL || 'http://127.0.0.1:4328/games/maze/play/index.html';
const output = fileURLToPath(new URL('../../../output/maze/world-critic/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], posts = [];
const check = (label, value) => { assert.ok(value, label); checks.push(label); console.log(`PASS ${label}`); };
const read = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const advance = (page, ms = 900) => page.evaluate(ms => window.advanceTime(ms), ms);
let page;
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 844, height: 390 }]) {
    const context = await browser.newContext({ viewport, isMobile: true, hasTouch: true });
    await context.route('**/api/quizzes/**', route => route.abort());
    context.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
    context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
    page = await context.newPage();
    async function fresh() {
      await page.goto(base);
      await page.evaluate(() => sessionStorage.removeItem('prepx-shadow-maze-session-v1'));
      await page.reload();
      await page.locator('#start-button').click();
      // Keep controls in the physical viewport before sending actual touch points.
      await page.locator('.dpad').scrollIntoViewIfNeeded();
    }
    const cdp = await context.newCDPSession(page);
    const touch = (type, touchPoints) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints });
    async function point(direction, id) {
      const box = await page.locator(`[data-direction="${direction}"]`).boundingBox();
      return { x: box.x + box.width / 2, y: box.y + box.height / 2, id };
    }
    await fresh();
    let down = await point('down', 1), up = await point('up', 2);
    await touch('touchStart', [down]); await advance(page, 150);
    await touch('touchStart', [down, up]);
    // CDP touchEnd names the finger being lifted, not the remaining fingers.
    await touch('touchEnd', [down]); await advance(page, 1600);
    let value = await read(page);
    check(`${viewport.width}: lifting the older finger keeps the newer direction held`, value.player.y === 1 && value.movement.target === null);
    await touch('touchEnd', []);

    await fresh(); down = await point('down', 1); up = await point('up', 2);
    await touch('touchStart', [down]); await advance(page, 150);
    await touch('touchStart', [down, up]); await touch('touchEnd', [up]); await advance(page, 1600);
    value = await read(page);
    check(`${viewport.width}: lifting the newer finger resumes the still-held older direction`, value.player.y === 5 && value.movement.target === null);
    await touch('touchEnd', []);

    await fresh(); down = await point('down', 1);
    await touch('touchStart', [down]); await advance(page, 100);
    const accepted = (await read(page)).movement.target;
    await touch('touchCancel', []); await advance(page, 1600);
    value = await read(page);
    check(`${viewport.width}: touch cancellation settles only the accepted step`, value.player.x === accepted.x && value.player.y === accepted.y && value.movement.target === null && value.movement.speed === 0);
    await page.locator('[data-direction="up"]').tap(); await advance(page);
    check(`${viewport.width}: movement works again immediately after touch cancellation`, (await read(page)).player.y === 1);

    // Interrupt between pointerdown and the next animation frame. No stale queued
    // direction may start moving after a canceled touch or a focus interruption.
    for (const interruption of ['pointercancel', 'blur']) {
      await fresh();
      await page.evaluate(interruption => {
        const button = document.querySelector('[data-direction="down"]');
        button.setPointerCapture = () => {};
        button.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 99, button: 0, bubbles: true }));
        if (interruption === 'blur') window.dispatchEvent(new Event('blur'));
        else button.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 99, bubbles: true }));
        window.advanceTime(1200);
      }, interruption);
      check(`${viewport.width}: ${interruption} clears input queued before the first frame`, (await read(page)).player.y === 1 && (await read(page)).movement.target === null);
    }

    await fresh(); down = await point('down', 1);
    await touch('touchStart', [down]); await advance(page, 100);
    await page.locator('#pause-button').click(); await touch('touchEnd', []);
    const paused = await read(page); await advance(page, 1500);
    check(`${viewport.width}: pause during touch freezes position and simulation`, JSON.stringify((await read(page)).movement) === JSON.stringify(paused.movement) && (await read(page)).elapsedMs === paused.elapsedMs);
    await page.locator('#resume-button').click(); await advance(page, 1800);
    value = await read(page);
    check(`${viewport.width}: resume finishes one step without a stale held finger`, value.player.y === 2 && value.movement.target === null);
    const stable = JSON.stringify({ player: value.player, progress: value.progress, coins: value.coins, world: value.world.interactions });
    await page.reload(); await page.locator('#start-button').click(); value = await read(page);
    check(`${viewport.width}: interrupted movement reload retains the committed tile and progress`, JSON.stringify({ player: value.player, progress: value.progress, coins: value.coins, world: value.world.interactions }) === stable);
    check(`${viewport.width}: all traps still contain only 1–3 original questions`, value.encounters.every(room => room.questions >= 1 && room.questions <= 3));
    await page.screenshot({ path: `${output}/mobile-${viewport.width}.png`, fullPage: true });
    await context.close();
  }
  check('critic flows produce no application errors', errors.length === 0);
  check('critic flows never submit student data', posts.length === 0);
} catch (error) {
  if (page && !page.isClosed()) await page.screenshot({ path: `${output}/failure.png`, fullPage: true }).catch(() => {});
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ base, count: checks.length, checks, errors, posts }, null, 2));
  await browser.close();
}
