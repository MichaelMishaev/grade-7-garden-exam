import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { pathTo, EXIT, isWalkable } from '../core.js';
import snapshot from '../content-snapshot.js';

const base = process.env.MAZE_QA_URL || 'https://hitech.agnon.online/games/maze/play/index.html';
const output = process.env.MAZE_QA_OUTPUT || fileURLToPath(new URL('../../../output/maze/deployed-refresh/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], writes = [], milestones = [];
const source = new Map(snapshot.quizzes.flatMap(bank => bank.questions).map(question => [question.id, question]));
const check = (label, value) => { assert.ok(value, label); checks.push(label); console.log(`PASS ${label}`); };
const read = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const advance = (page, ms = 900) => page.evaluate(ms => window.advanceTime(ms), ms);
const hash = buffer => createHash('sha256').update(buffer).digest('hex');
const learning = value => JSON.stringify({ hearts: value.hearts, coins: value.coins, seals: value.seals, progress: value.progress, captureCount: value.captureCount, interactions: value.world.interactions });
const resumable = value => JSON.stringify({ learning: learning(value), player: value.player, phase: value.phase, currentQuestion: value.currentQuestion?.id, review: value.review, encounters: value.encounters.map(room => ({ id: room.id, answered: room.answered, resolved: room.resolved })) });
let page, asset;
async function holdFeedback() {
  if ((await read(page)).phase === 'feedback') await page.locator('#read-feedback').tap();
}
async function start() {
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function' && !document.querySelector('#start-button').disabled, null, { polling: 50 });
  await page.locator('#start-button').tap();
  await holdFeedback();
}
async function shot(name) {
  // The test controls RAF; render restored/resized scenes without spending time.
  await advance(page, 0);
  const value = await read(page);
  milestones.push({ name, phase: value.phase, player: value.player, hearts: value.hearts, coins: value.coins, answered: value.progress.answered, review: value.review, captureCount: value.captureCount });
  await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
}
async function refresh(label, times = 1) {
  const expected = resumable(await read(page));
  for (let i = 0; i < times; i++) {
    await page.reload({ waitUntil: 'domcontentloaded' }); await start();
    check(`${label} refresh${i + 1} retains exact phase question review progress and resources`, resumable(await read(page)) === expected);
  }
}
async function walk(target, expectQuestion = false) {
  for (let guard = 0; guard < 150; guard++) {
    const value = await read(page);
    if (expectQuestion && value.phase === 'question') return value;
    if (value.player.x === target.x && value.player.y === target.y) return value;
    assert.equal(value.phase, 'explore');
    const route = pathTo(value.player, target); assert.ok(route?.length);
    const next = route[0], direction = next.x > value.player.x ? 'right' : next.x < value.player.x ? 'left' : next.y > value.player.y ? 'down' : 'up';
    await page.locator(`[data-direction="${direction}"]`).tap(); await advance(page);
    const moved = await read(page);
    assert.ok(isWalkable(moved.player.x, moved.player.y));
  }
  assert.fail('Touch navigation must reach its objective');
}
async function answer(correct, reviewing = false) {
  const before = await read(page), question = source.get(before.currentQuestion?.id); assert.ok(question);
  if (before.trapEntry) await page.locator('#skip-trap-entry').tap();
  const option = before.currentQuestion.options.find(option => correct ? option.original === question.correct : option.original !== question.correct);
  await page.locator(`[data-choice="${option.original}"]`).tap(); await holdFeedback();
  const after = await read(page);
  if (reviewing) check('review submission never changes original rewards or recorded answers', learning(after) === learning(before));
  else check('original submission has one exact answer and payout change', after.progress.answered === before.progress.answered + 1 && after.coins === before.coins + (correct ? 10 : 0));
  return after;
}
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.addInitScript(() => { Math.random = () => 0.999999; window.requestAnimationFrame = () => 0; });
  await context.route('**/*', route => {
    const request = route.request();
    if (!['GET', 'HEAD'].includes(request.method())) { writes.push(request.method()); return route.abort(); }
    if (request.url().includes('/api/quizzes/')) return route.abort();
    return route.continue();
  });
  context.on('page', p => p.on('pageerror', error => errors.push(error.message)));
  context.on('response', response => { if (response.status() >= 400 && !response.url().includes('/api/')) errors.push(`${response.status()} ${new URL(response.url()).pathname}`); });
  page = await context.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await start();
  asset = await page.locator('script[type="module"]').last().getAttribute('src');
  check('deployed game loads a complete six-question bank and active touch controls', (await read(page)).progress.total === 6 && await page.locator('[data-direction="down"]').isEnabled());
  const cdp = await context.newCDPSession(page);
  const touch = (type, touchPoints) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints });
  async function point(direction, id) {
    await page.locator('.dpad').scrollIntoViewIfNeeded();
    const box = await page.locator(`[data-direction="${direction}"]`).boundingBox();
    return { id, x: box.x + box.width / 2, y: box.y + box.height / 2 };
  }
  let down = await point('down', 1), up = await point('up', 2);
  await touch('touchStart', [down]); await advance(page, 120);
  await touch('touchStart', [down, up]); await touch('touchEnd', [down]); await advance(page, 1600);
  check('lifting the earlier finger preserves the newer held direction', (await read(page)).player.y === 1 && !(await read(page)).movement.target);
  await touch('touchEnd', []);
  down = await point('down', 1); up = await point('up', 2);
  await touch('touchStart', [down]); await advance(page, 120);
  await touch('touchStart', [down, up]); await touch('touchEnd', [up]); await advance(page, 1900);
  check('lifting the newer finger restores the still-held earlier direction', (await read(page)).player.y === 5 && !(await read(page)).movement.target);
  await touch('touchEnd', []);

  const right = await point('right', 3);
  await touch('touchStart', [right]); await advance(page, 80);
  const fractional = await read(page);
  check('touch movement actually enters a fractional unfinished segment', fractional.movement.target && fractional.movement.position.x > fractional.player.x && fractional.movement.position.x < fractional.player.x + 1);
  await shot('mid-move-before-refresh');
  await page.reload(); await start(); await touch('touchEnd', []); await advance(page, 1500);
  const restored = await read(page);
  check('refresh mid-move restores the last committed safe tile and all academic progress', JSON.stringify(restored.player) === JSON.stringify(fractional.player) && learning(restored) === learning(fractional) && !restored.movement.target && restored.movement.speed === 0);
  await touch('touchStart', [await point('right', 4)]); await advance(page, 100);
  const accepted = (await read(page)).movement.target;
  await touch('touchCancel', []); await advance(page, 1500);
  check('touch cancellation finishes only its accepted tile without stuck input', JSON.stringify((await read(page)).player) === JSON.stringify(accepted) && !(await read(page)).movement.target);
  await walk({ x: 2, y: 7 });
  for (let i = 0; i < 20 && (await read(page)).nearbyEntity !== 'scout'; i++) await advance(page, 200);
  assert.equal((await read(page)).nearbyEntity, 'scout');
  await page.locator('#interact-button').tap(); await page.locator('#close-panel').tap();
  check('discovery can be earned before questions without coins', (await read(page)).world.scoutGuided && (await read(page)).coins === 0);
  await refresh('scout discovery');

  await walk({ x: 4, y: 5 }, true);
  let entry = await read(page);
  check('touching the trap starts a visible skippable cage-entry animation', entry.trapEntry?.active && await page.locator('#skip-trap-entry').isVisible());
  const beforePixels = hash(await page.locator('#maze-canvas').screenshot()); await advance(page, 150);
  check('trap animation changes rendered cage pixels without changing original answers', hash(await page.locator('#maze-canvas').screenshot()) !== beforePixels && (await read(page)).progress.answered === 0);
  await page.locator('#encounter-menu').tap(); entry = await read(page); assert.ok(entry.trapEntry?.active && entry.paused);
  await advance(page, 2500);
  check('paused active trap animation does not run down its remaining time', (await read(page)).trapEntry.remainingMs === entry.trapEntry.remainingMs);
  await refresh('paused trap entry');
  check('refresh cannot leave a stale entry overlay over a valid question', !(await read(page)).trapEntry && await page.locator('[data-choice]').first().isVisible());
  await shot('question-after-entry-refresh');
  await answer(false); await refresh('first wrong locked feedback', 2);
  await page.locator('#continue-button').tap(); await answer(false); await page.locator('#continue-button').tap();
  assert.equal((await read(page)).phase, 'explore');
  await walk({ x: 11, y: 5 }, true); await answer(false);
  const captured = await read(page);
  check('third original mistake captures exactly once while cage retains one pending original', captured.phase === 'capture' && captured.hearts === 0 && captured.captureCount === 1 && captured.progress.answered === 3 && captured.encounters.find(room => room.id === 'cage').answered === 1 && !captured.encounters.find(room => room.id === 'cage').resolved);
  await shot('capture-partial-cage'); await refresh('capture with partial original trap', 2);
  await page.locator('#skip-capture').tap(); await refresh('first unanswered review');
  await answer(false, true); const firstHint = await read(page);
  check('first review mistake records one hint and no extra heart loss', firstHint.review.wrong === 1 && firstHint.review.hint === 1 && firstHint.hearts === 0);
  await refresh('first review feedback exact hint and mistake count', 2);
  await page.locator('#continue-button').tap(); await refresh('hinted first review question');
  await answer(false, true); await refresh('guided first-chain feedback');
  await page.locator('#continue-button').tap();
  check('only explicit continuation advances to the second recovery chain', (await read(page)).phase === 'review' && (await read(page)).review.index === 1 && (await read(page)).review.wrong === 0);
  await refresh('second unanswered review chain');
  await page.setViewportSize({ width: 320, height: 568 });
  await page.locator('[data-choice]').last().scrollIntoViewIfNeeded();
  check('short phone recovery answers remain reachable after refresh', await page.locator('[data-choice]').last().isVisible() && await page.locator('[data-choice]').last().isEnabled());
  await shot('short-phone-review'); await answer(false, true); await refresh('short phone review feedback');
  await page.setViewportSize({ width: 844, height: 390 }); await page.locator('#continue-button').tap();
  await shot('landscape-review'); await answer(false, true); await refresh('landscape guided escape feedback');
  await page.locator('#continue-button').tap();
  const escaped = await read(page);
  check('guided escape restores hearts near the capture without answering the pending original', escaped.phase === 'explore' && escaped.hearts === 3 && escaped.captureCount === 1 && escaped.progress.answered === 3 && escaped.coins === 0 && escaped.world.scoutGuided && escaped.player.x + escaped.player.y > 2 && escaped.encounters.find(room => room.id === 'cage').answered === 1);
  await shot('escaped-with-pending-cage-question'); await refresh('escaped partial trap', 2);
  await page.setViewportSize({ width: 390, height: 844 });
  await walk({ x: 11, y: 5 }, true);
  check('returning to the partial cage presents only its remaining original question', (await read(page)).encounters.find(room => room.id === 'cage').answered === 1 && (await read(page)).progress.answered === 3);
  await answer(true); await refresh('first correct payout after cage escape', 3);
  check('repeated refresh never duplicates the ten-coin original payout', (await read(page)).coins === 10 && (await read(page)).progress.answered === 4);
  await page.locator('#continue-button').tap(); await refresh('completed partial cage');
  check('completing the previously partial cage releases movement with its earned seal', (await read(page)).phase === 'explore' && (await read(page)).encounters.find(room => room.id === 'cage').resolved && (await read(page)).seals.length === 2);
  await walk({ x: 12, y: 9 }, true); await answer(true); await page.locator('#continue-button').tap(); await answer(true); await page.locator('#continue-button').tap();
  await walk(EXIT);
  check('refresh-heavy expedition still reaches the final exit with exact original accounting', (await read(page)).phase === 'complete' && (await read(page)).progress.answered === 6 && (await read(page)).progress.score === 50 && (await read(page)).coins === 30 && (await read(page)).captureCount === 1);
  await refresh('complete refresh-heavy expedition', 2); await shot('completed-after-refresh-matrix');
  check('every original trap remains within one to three questions', (await read(page)).encounters.every(room => room.questions >= 1 && room.questions <= 3));
  check('refresh touch and cage paths generate no application errors', errors.length === 0);
  check('QA never sends student or result data', writes.length === 0);
} catch (error) {
  if (page && !page.isClosed()) { await shot('failure').catch(() => {}); await writeFile(`${output}/failure-state.json`, JSON.stringify(await read(page), null, 2)).catch(() => {}); }
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ base, asset, count: checks.length, checks, errors, writes, milestones, clock: 'deterministic advanceTime with real touch inputs' }, null, 2));
  await browser.close();
}
