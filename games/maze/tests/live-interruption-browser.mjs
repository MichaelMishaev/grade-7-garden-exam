import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { pathTo, EXIT, isWalkable } from '../core.js';
import snapshot from '../content-snapshot.js';

const base = process.env.MAZE_QA_URL || 'https://hitech.agnon.online/games/maze/play/index.html';
const output = process.env.MAZE_QA_OUTPUT || fileURLToPath(new URL('../../../output/maze/live-interruption/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], writes = [], milestones = [];
const questions = new Map(snapshot.quizzes.flatMap(bank => bank.questions).map(q => [q.id, q]));
const check = (name, value) => { assert.ok(value, name); checks.push(name); console.log(`PASS ${name}`); };
const read = () => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const advance = ms => page.evaluate(ms => window.advanceTime(ms), ms);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const learning = value => JSON.stringify({ hearts: value.hearts, coins: value.coins, seals: value.seals, progress: value.progress, captureCount: value.captureCount, discoveries: value.world.interactions });
const resumable = value => JSON.stringify({ learning: learning(value), player: value.player, phase: value.phase, question: value.currentQuestion?.id, review: value.review, encounters: value.encounters.map(e => [e.id, e.answered, e.resolved]) });
let page, asset, contentSource;
async function holdFeedback() { if ((await read()).phase === 'feedback') await page.locator('#read-feedback').tap(); }
async function start() {
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function' && !document.querySelector('#start-button').disabled, null, { polling: 50 });
  await page.locator('#start-button').tap(); await holdFeedback(); await advance(0);
}
async function shot(name) {
  await advance(0); const value = await read();
  milestones.push({ name, phase: value.phase, player: value.player, hearts: value.hearts, coins: value.coins, answered: value.progress.answered, captureCount: value.captureCount, review: value.review });
  await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
}
async function refresh(label, times = 1) {
  const expected = resumable(await read());
  for (let i = 0; i < times; i++) {
    await page.reload(); await start();
    check(`${label}: refresh${i + 1} preserves exact phase question review and progress`, resumable(await read()) === expected);
  }
}
async function walk(target, stopAtQuestion = false) {
  for (let guard = 0; guard < 150; guard++) {
    const value = await read();
    if (stopAtQuestion && value.phase === 'question') return;
    if (value.player.x === target.x && value.player.y === target.y) return;
    assert.equal(value.phase, 'explore');
    const route = pathTo(value.player, target); assert.ok(route?.length);
    const next = route[0], direction = next.x > value.player.x ? 'right' : next.x < value.player.x ? 'left' : next.y > value.player.y ? 'down' : 'up';
    await page.locator(`[data-direction="${direction}"]`).tap(); await advance(900);
    assert.ok(isWalkable((await read()).player.x, (await read()).player.y));
  }
  assert.fail('Physical touch route must terminate');
}
async function answer(correct, reviewing = false) {
  const before = await read();
  if (before.trapEntry) await page.locator('#skip-trap-entry').tap();
  const q = questions.get(before.currentQuestion.id); assert.ok(q);
  const choice = before.currentQuestion.options.find(o => correct ? o.original === q.correct : o.original !== q.correct);
  await page.locator(`[data-choice="${choice.original}"]`).tap(); await holdFeedback();
  const after = await read();
  check(reviewing ? 'review never modifies original rewards or discoveries' : 'original answer applies exactly once', reviewing ? learning(after) === learning(before) : after.progress.answered === before.progress.answered + 1 && after.coins === before.coins + (correct ? 10 : 0));
}
async function background(label) {
  const before = await read();
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  const paused = await read(); assert.ok(paused.paused);
  await advance(2600);
  const frozen = await read();
  check(`${label}: synthetic visibility interruption freezes simulation and progress`, learning(frozen) === learning(before) && frozen.elapsedMs === paused.elapsedMs && JSON.stringify(frozen.movement) === JSON.stringify(paused.movement));
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  await page.locator('#resume-button').tap();
  check(`${label}: explicit resume restores its previous phase`, !(await read()).paused && (await read()).phase === before.phase);
}
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.addInitScript(() => { Math.random = () => 0.999999; window.requestAnimationFrame = () => 0; });
  await context.route('**/*', route => { const req = route.request(); if (!['GET','HEAD'].includes(req.method())) { writes.push(req.method()); return route.abort(); } return route.continue(); });
  context.on('page', p => p.on('pageerror', e => errors.push(e.message)));
  context.on('response', response => { if (response.status() >= 400 && !response.url().includes('/api/')) errors.push(`${response.status()} ${new URL(response.url()).pathname}`); });
  page = await context.newPage(); await page.goto(base); await start();
  asset = await page.locator('script[type="module"]').last().getAttribute('src'); contentSource = (await read()).source;
  check('deployed game starts with complete question bank and enabled touch movement', (await read()).progress.total === 6 && await page.locator('[data-direction="down"]').isEnabled());
  const cdp = await context.newCDPSession(page);
  const touch = (type, touchPoints) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints });
  async function point(direction, id) { await page.locator('.dpad').scrollIntoViewIfNeeded(); const b = await page.locator(`[data-direction="${direction}"]`).boundingBox(); return { id, x: b.x + b.width / 2, y: b.y + b.height / 2 }; }
  await touch('touchStart', [await point('down', 1)]); await advance(100);
  const accepted = (await read()).movement.target; assert.ok(accepted);
  await page.evaluate(() => window.dispatchEvent(new Event('blur'))); await advance(2300); await touch('touchEnd', []);
  check('synthetic blur stops held touch after only the accepted cell', JSON.stringify((await read()).player) === JSON.stringify(accepted) && !(await read()).movement.target && (await read()).movement.speed === 0);
  await touch('touchStart', [await point('down', 2)]); await advance(100); await background('held touch'); await touch('touchEnd', []); await advance(2200);
  check('background return never retains a held direction', (await read()).player.y === 3 && !(await read()).movement.target);
  await touch('touchStart', [await point('down', 3)]); await advance(90);
  const fractional = await read(); assert.ok(fractional.movement.target);
  await page.reload(); await start(); await touch('touchEnd', []); await advance(2200);
  check('refresh while finger is held resumes committed tile without phantom movement', JSON.stringify((await read()).player) === JSON.stringify(fractional.player) && learning(await read()) === learning(fractional) && !(await read()).movement.target);
  await touch('touchStart', [await point('down', 4)]); await advance(80); const canceled = (await read()).movement.target;
  await touch('touchCancel', []); await advance(2200);
  check('touch cancel recovers normally after focus and refresh interruptions', JSON.stringify((await read()).player) === JSON.stringify(canceled) && !(await read()).movement.target);
  await walk({ x: 2, y: 7 });
  for (let n = 0; n < 25 && (await read()).nearbyEntity !== 'scout'; n++) await advance(200);
  await page.locator('#interact-button').tap(); await page.locator('#close-panel').tap(); assert.ok((await read()).world.scoutGuided);
  await walk({ x: 4, y: 5 }, true);
  const entry = await read(); assert.ok(entry.trapEntry?.active);
  const beforePixels = hash(await page.locator('#maze-canvas').screenshot()); await advance(160);
  check('trap entry visibly animates a real cage before questions', hash(await page.locator('#maze-canvas').screenshot()) !== beforePixels && (await read()).progress.answered === 0);
  await background('trap entry'); await refresh('entry interrupted by background');
  check('refresh clears presentation entry and keeps the same unanswered trap', !(await read()).trapEntry && (await read()).phase === 'question' && await page.locator('[data-choice]').first().isVisible());
  await answer(false); await refresh('first locked original', 2); await page.locator('#continue-button').tap();
  await answer(false); await page.locator('#continue-button').tap();
  await walk({ x: 11, y: 5 }, true); await answer(false);
  check('capture happens once with the original cage only half answered', (await read()).phase === 'capture' && (await read()).progress.answered === 3 && (await read()).encounters.find(e => e.id === 'cage').answered === 1 && (await read()).captureCount === 1);
  await background('capture'); await refresh('captured mid-trap', 2); await shot('capture-refreshed');
  await page.locator('#skip-capture').tap(); await refresh('review before first answer');
  await answer(false, true); await background('first review feedback'); await refresh('review first hint', 2);
  check('first hint survives without inventing another review mistake', (await read()).review.wrong === 1 && (await read()).review.hint === 1 && (await read()).review.index === 0);
  await page.locator('#continue-button').tap(); await answer(false, true); await refresh('guided first-chain feedback'); await page.locator('#continue-button').tap();
  await page.setViewportSize({ width: 320, height: 568 }); await shot('short-review-second-chain');
  await answer(false, true); await refresh('second chain first hint'); await page.locator('#continue-button').tap();
  await page.setViewportSize({ width: 844, height: 390 }); await shot('landscape-review');
  await answer(false, true); await refresh('guided second-chain feedback'); await page.locator('#continue-button').tap();
  check('guided escape preserves the pending original question and discoveries', (await read()).phase === 'explore' && (await read()).hearts === 3 && (await read()).progress.answered === 3 && (await read()).world.scoutGuided && (await read()).encounters.find(e => e.id === 'cage').answered === 1);
  await refresh('escaped partially answered cage', 2); await page.setViewportSize({ width: 390, height: 844 });
  await walk({ x: 11, y: 5 }, true); await answer(true);
  const feedback = await read(), expected = resumable(feedback);
  await page.locator('#encounter-menu').tap();
  await page.locator('a.dialog-link').tap(); await page.waitForURL(new URL('/index.html', base).href);
  check('paused feedback exit has a usable homepage with both games', await page.locator('a[href="games/maze/play/index.html"]').isVisible() && await page.locator('a[href="games/afterbell/play/index.html"]').isVisible());
  await page.goBack();
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function', null, { polling: 50 });
  if (await page.locator('#start-button').isVisible()) await start();
  else if (await page.locator('#resume-button').isVisible()) await page.locator('#resume-button').tap();
  await holdFeedback(); await advance(0);
  check('actual browser history restores locked feedback with one payout', resumable(await read()) === expected && (await read()).coins === 10);
  await refresh('paid original after history return', 3);
  await shot('history-return-paid-feedback');
  await page.locator('#continue-button').tap();
  check('partial cage finally releases the player with its seal', (await read()).phase === 'explore' && (await read()).seals.length === 2);
  await walk({ x: 12, y: 9 }, true); await answer(true); await page.locator('#continue-button').tap(); await answer(true); await page.locator('#continue-button').tap();
  await walk(EXIT); await refresh('complete after interruption matrix'); await shot('completed-interruption-matrix');
  check('live expedition reaches exit with exact first-answer score and rewards', (await read()).phase === 'complete' && (await read()).progress.answered === 6 && (await read()).progress.score === 50 && (await read()).coins === 30 && (await read()).captureCount === 1);
  check('all original traps remain at one to three questions', (await read()).encounters.every(e => e.questions >= 1 && e.questions <= 3));
  check('no application errors or external data writes occurred', errors.length === 0 && writes.length === 0);
} catch (error) {
  if (page && !page.isClosed()) { await shot('failure').catch(() => {}); await writeFile(`${output}/failure-state.json`, JSON.stringify(await read(), null, 2)).catch(() => {}); }
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ base, asset, contentSource, count: checks.length, checks, errors, writes, milestones, lifecycle: 'synthetic blur/document.hidden visibility events; actual touch inputs and browser history' }, null, 2));
  await browser.close();
}
