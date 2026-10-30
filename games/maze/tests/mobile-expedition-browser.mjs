import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pathTo, EXIT, isWalkable } from '../core.js';
import snapshot from '../content-snapshot.js';

const base = process.env.MAZE_QA_URL || 'http://127.0.0.1:4328/games/maze/play/index.html';
const output = fileURLToPath(new URL('../../../output/maze/mobile-expedition/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], writes = [], milestones = [], seen = new Map();
const source = new Map(snapshot.quizzes.flatMap(bank => bank.questions).map(q => [q.id, q]));
const check = (name, value) => { assert.ok(value, name); checks.push(name); console.log(`PASS ${name}`); };
const read = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const advance = (page, ms = 900) => page.evaluate(ms => window.advanceTime(ms), ms);
const stable = state => JSON.stringify({ player: state.player, hearts: state.hearts, coins: state.coins, seals: state.seals, progress: state.progress, captureCount: state.captureCount, interactions: state.world.interactions });
const learning = state => JSON.stringify({ coins: state.coins, seals: state.seals, progress: state.progress, interactions: state.world.interactions });
let page, context, reloadCapture = false, reloadReview = false, reloadEscape = false, entryChecked = false, entryPauseExercised = false, originalCount = 0;
async function record(name) {
  const state = await read(page);
  milestones.push({ name, phase: state.phase, player: state.player, hearts: state.hearts, coins: state.coins, answered: state.progress.answered, captureCount: state.captureCount, reviewIndex: state.review?.index });
  await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
}
async function start() {
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function' && !document.querySelector('#start-button').disabled);
  await page.locator('#start-button').tap();
}
async function restore(label) {
  const before = await read(page), beforeStable = stable(before);
  await page.reload({ waitUntil: 'domcontentloaded' }); await start();
  check(`${label} reload preserves position resources learning and discovery`, stable(await read(page)) === beforeStable);
}
async function oneStep(next) {
  const from = (await read(page)).player;
  const direction = next.x > from.x ? 'right' : next.x < from.x ? 'left' : next.y > from.y ? 'down' : 'up';
  await page.locator(`[data-direction="${direction}"]`).tap(); await advance(page);
  const after = await read(page);
  check(`touch walk reaches ${next.x},${next.y} without clipping`, after.player.x === next.x && after.player.y === next.y && isWalkable(after.player.x, after.player.y));
}
async function walkPlain(target) {
  for (let i = 0; i < 150; i++) {
    const state = await read(page); assert.equal(state.phase, 'explore');
    if (state.player.x === target.x && state.player.y === target.y) return;
    const path = pathTo(state.player, target); assert.ok(path?.length);
    await oneStep(path[0]);
  }
  assert.fail('reachable exploration path must terminate');
}
async function answer(correct, reviewing = false) {
  const before = await read(page);
  if (await page.locator('#skip-trap-entry').isVisible()) {
    if (!entryChecked) {
      const beforeEntry = learning(before); await page.locator('#encounter-menu').tap();
      const paused = await read(page); await advance(page, 2000);
      if (paused.paused && paused.trapEntry?.active) {
        entryPauseExercised = true;
        check('trap entry pause freezes an active entry duration', (await read(page)).paused && (await read(page)).trapEntry?.active && (await read(page)).trapEntry.remainingMs === paused.trapEntry.remainingMs);
      } else milestones.push({ name: 'entry-pause-not-exercised', reason: 'The short entry completed before the pause control was tapped.' });
      await page.locator('#resume-button').tap();
      check('trap entry pause does not spend progress', learning(await read(page)) === beforeEntry);
      entryChecked = true;
    }
    // The900ms presentation may finish while a real touch is dispatched.
    // Treat that as completion only when the actual answer UI is available.
    await page.locator('#skip-trap-entry').tap({ timeout: 1200 }).catch(async error => {
      const current = await read(page);
      if (current.trapEntry || current.phase !== 'question' || !await page.locator('[data-choice]').first().isVisible()) throw error;
    });
  }
  const state = await read(page), q = source.get(state.currentQuestion.id);
  assert.ok(q);
  if (!reviewing) {
    const trapSeen = seen.get(state.activeEncounter) || new Set(); trapSeen.add(q.id); seen.set(state.activeEncounter, trapSeen);
    check(`${state.activeEncounter} has at most three original questions`, trapSeen.size <= 3 && state.encounters.every(room => room.questions >= 1 && room.questions <= 3));
    originalCount++;
    check('all pole tasks have visible self-contained setup', await page.locator('#question-context').isVisible());
  }
  const chosen = state.currentQuestion.options.find(option => correct ? option.original === q.correct : option.original !== q.correct);
  await page.locator(`[data-choice="${chosen.original}"]`).tap();
  if (await page.locator('#read-feedback').isVisible()) await page.locator('#read-feedback').tap();
  const after = await read(page);
  if (reviewing) check('review answer does not change original learning coins seals or discoveries', learning(after) === learning(state));
  else check('an original answer locks and applies exactly one expected payout', after.progress.answered === state.progress.answered + 1 && after.coins === state.coins + (correct ? 10 : 0) && await page.locator('[data-choice]:enabled').count() === 0);
}
async function settle() {
  for (let guard = 0; guard < 90; guard++) {
    const state = await read(page);
    if(state.pendingGift){await page.locator('#collect-gift').tap();continue;}
    if (state.phase === 'explore' || state.phase === 'complete') return;
    if (state.phase === 'question') {
      await answer(originalCount >= 3);
    } else if (state.phase === 'feedback') {
      const before = learning(state);
      await page.locator('#feedback-explanation summary').tap();
      await page.locator('#encounter-menu').tap(); await advance(page, 1800); await page.locator('#resume-button').tap();
      check('feedback pause and disclosure leave original result unchanged', learning(await read(page)) === before);
      await page.locator('#continue-button').tap();
    } else if (state.phase === 'capture') {
      if (!reloadCapture) {
        check('third wrong original answer captures once without losing discoveries', state.hearts === 0 && state.captureCount === 1 && state.progress.answered === 3 && state.world.scoutGuided);
        await record('captured-portrait'); await restore('capture'); reloadCapture = true;
      }
      if (await page.locator('#skip-capture').isVisible()) await page.locator('#skip-capture').tap();
      else await advance(page, 3100);
    } else if (state.phase === 'review') {
      if (!reloadReview) {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.locator('[data-choice]').last().scrollIntoViewIfNeeded();
        check('short320 phone can reach every cage answer', await page.locator('[data-choice]').last().isVisible() && await page.locator('[data-choice]').last().isEnabled());
        await record('review-short320');
        await page.setViewportSize({ width: 844, height: 390 });
        await record('review-landscape');
        check('landscape cage sheet can still reach answers', await page.locator('[data-choice]').last().isVisible());
        await page.setViewportSize({ width: 390, height: 844 });
      }
      await answer(false, true);
      if (!reloadReview) { await restore('review feedback'); reloadReview = true; }
    } else if (state.phase === 'review-feedback') {
      const before = learning(state);
      await page.locator('#continue-button').tap();
      const after = await read(page);
      check('guided review continuation never inflates learning rewards', learning(after) === before);
      if (after.phase === 'explore' && !reloadEscape) {
        check('two guided review steps restore hearts near capture without restart', after.hearts === 3 && after.player.x + after.player.y > 2 && after.progress.answered === 3 && after.world.scoutGuided);
        await record('escaped-cage'); await restore('escaped cage'); reloadEscape = true;
      }
    } else assert.fail(`Unexpected phase ${state.phase}`);
  }
  assert.fail('encounter must settle without infinite cage/review loop');
}
try {
  const slow = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  let heldRequest = false;
  await slow.route('**/api/quizzes/**', () => { heldRequest = true; return new Promise(() => {}); });
  const slowPage = await slow.newPage(), loadStarted = Date.now();
  await slowPage.goto(base, { waitUntil: 'domcontentloaded' });
  await slowPage.waitForFunction(() => !document.querySelector('#start-button').disabled, null, { timeout: 8000 });
  const loadElapsed = Date.now() - loadStarted;
  check('an unanswered API request falls back within8s instead of leaving loading stuck', heldRequest && loadElapsed >= 2300 && loadElapsed < 8000 && await slowPage.locator('#start-button').isEnabled());
  check('slow-loading fallback retains the entire selected six-question bank', (await read(slowPage)).progress.total === 6 && await slowPage.locator('#quiz-select option').count() === 7);
  milestones.push({ name: 'slow-content-fallback', elapsedMs: loadElapsed });
  await slowPage.screenshot({ path: `${output}/slow-loading-fallback.png`, fullPage: true });
  await slow.close();
  context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.route('**/api/quizzes/**', route => route.abort());
  context.on('request', request => { if (!['GET','HEAD'].includes(request.method())) writes.push(request.method()); });
  context.on('page', p => p.on('pageerror', error => errors.push(error.message)));
  page = await context.newPage(); await page.goto(base);
  await page.waitForFunction(() => !document.querySelector('#start-button').disabled);
  check('offline content fallback leaves loading screen within timeout with enabled start', await page.locator('#start-button').isEnabled() && await page.locator('#quiz-select option').count() === 7);
  await page.locator('#quiz-select').selectOption('physics-pole'); await start();
  check('fresh expedition contains all eleven questions and four capped traps', (await read(page)).progress.total === 11 && (await read(page)).encounters.length === 4);
  await record('fresh-mobile');
  await walkPlain({ x: 2, y: 7 });
  for (let i = 0; i < 20 && (await read(page)).nearbyEntity !== 'scout'; i++) await advance(page, 200);
  check('the scout remains approachable without a trapping conversation', (await read(page)).nearbyEntity === 'scout');
  await page.locator('#interact-button').tap(); await page.locator('#world-topic').tap(); await page.locator('#close-panel').tap();
  check('exploration earns a persistent discovery without answering questions', (await read(page)).world.scoutGuided && (await read(page)).progress.answered === 0);
  await restore('discovered scout');
  // Each objective is approached through physical touch walking. Incidental traps
  // are settled before the route is recalculated; no position/state is injected.
  for (let guard = 0; guard < 650; guard++) {
    const state = await read(page);
    if (state.phase === 'complete') break;
    if (state.phase !== 'explore') { await settle(); continue; }
    const target = state.encounters.find(room => !room.resolved) || EXIT;
    if (state.player.x === target.x && state.player.y === target.y) {
      await page.locator('#interact-button').tap(); await settle();
    } else {
      const path = pathTo(state.player, target); assert.ok(path?.length); await oneStep(path[0]);
    }
  }
  const completed = await read(page);
  check('mobile expedition reaches the final exit after all eleven original questions', completed.phase === 'complete' && completed.progress.answered === 11 && completed.player.x === EXIT.x && completed.player.y === EXIT.y);
  check('only one capture occurs and original payouts remain exact after all reloads', completed.captureCount === 1 && completed.coins === 80 && completed.progress.score === 73 && completed.world.scoutGuided);
  check('all four traps stayed within1–3 original question limit', seen.size === 4 && [...seen.values()].every(ids => ids.size <= 3));
  check('capture review and escape reload scenarios were actually exercised', reloadCapture && reloadReview && reloadEscape);
  await record('completed-mobile'); await restore('completed expedition');
  check('completion survives reload with a safe return route', (await read(page)).phase === 'complete' && await page.locator('a.dialog-link').isVisible());
  const completedStable = stable(await read(page));
  await page.locator('a.dialog-link').tap();
  await page.locator('a[href="games/maze/play/index.html"]').waitFor({ state: 'visible' });
  check('completion return opens the actual homepage with both games available', await page.locator('a[href="games/afterbell/play/index.html"]').count() === 1 && await page.locator('a[href="games/maze/play/index.html"]').count() === 1);
  await page.locator('a[href="games/maze/play/index.html"]').tap(); await start();
  check('leaving for homepage and reopening retains the completed expedition exactly', (await read(page)).phase === 'complete' && stable(await read(page)) === completedStable);
  await record('returned-completed');
  check('fresh expedition has zero application errors and zero data writes', errors.length === 0 && writes.length === 0);
} catch (error) {
  if (page && !page.isClosed()) { await record('failure').catch(() => {}); await writeFile(`${output}/failure-state.json`, JSON.stringify(await read(page), null, 2)).catch(() => {}); }
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ base, count: checks.length, checks, errors, writes, milestones, entryPauseExercised, observedTraps: [...seen].map(([trap, ids]) => ({ trap, count: ids.size })) }, null, 2));
  await browser.close();
}
