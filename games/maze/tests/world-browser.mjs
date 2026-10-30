import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { MAZE, ENCOUNTERS, CREATURES, START, pathTo, isWalkable } from '../core.js';
import { WORLD_ENTITIES, WATER_BOWL, nearbyWorldEntity } from '../world.js';
import snapshot from '../content-snapshot.js';

const base = process.env.MAZE_QA_URL || 'http://127.0.0.1:4328/games/maze/play/index.html';
const output = fileURLToPath(new URL('../../../output/maze/world/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], posts = [];
const check = (name, condition) => { assert.ok(condition, name); checks.push(name); console.log(`PASS ${name}`); };
const read = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const academic = value => JSON.stringify({ coins: value.coins, hearts: value.hearts, progress: value.progress, seals: value.seals });
const flags = world => JSON.stringify({ scoutGuided: world.scoutGuided, lightsOn: world.lightsOn, waterFilled: world.waterFilled, foxFollowing: world.foxFollowing, rabbitCalm: world.rabbitCalm, owlObserved: world.owlObserved, benchRested: world.benchRested, interactions: Object.keys(world.interactions).sort() });
const questions = new Map(snapshot.quizzes.flatMap(quiz => quiz.questions).map(question => [question.id, question]));
const advance = (page, ms = 900) => page.evaluate(ms => window.advanceTime(ms), ms);
async function start(page) { await page.waitForFunction(() => typeof window.render_game_to_text === 'function' && !document.querySelector('#start-button').disabled); await page.locator('#start-button').click(); }
async function step(page, from, to) {
  const direction = to.x > from.x ? 'right' : to.x < from.x ? 'left' : to.y > from.y ? 'down' : 'up';
  await page.locator(`[data-direction="${direction}"]`).click(); await advance(page);
}
// This route planner only selects reachable UI walking destinations. Avoiding trap
// cells lets the world-only checks prove that discoveries do not alter scores.
const blocked = new Set([...ENCOUNTERS, ...CREATURES.flatMap(creature => creature.path)].map(point => `${point.x},${point.y}`));
function worldRoute(from, to) {
  const queue = [{ ...from, path: [] }], seen = new Set([`${from.x},${from.y}`]);
  for (let i = 0; i < queue.length; i++) {
    const point = queue[i]; if (point.x === to.x && point.y === to.y) return point.path;
    for (const [dx, dy] of [[0,-1],[1,0],[0,1],[-1,0]]) {
      const next = { x: point.x + dx, y: point.y + dy }, key = `${next.x},${next.y}`;
      if (isWalkable(next.x, next.y) && !blocked.has(key) && !seen.has(key)) { seen.add(key); queue.push({ ...next, path: [...point.path, next] }); }
    }
  }
  return null;
}
async function approach(page, id) {
  for (let steps = 0; steps < 350; steps++) {
    const value = await read(page); assert.equal(value.phase, 'explore', 'world route does not consume academic questions');
    if (value.nearbyEntity === id && !value.movement.target) return value;
    const entity = value.worldEntities.find(entity => entity.id === id), candidates = [];
    for (let y = Math.max(1, Math.floor(entity.position.y) - 1); y <= Math.ceil(entity.position.y) + 1; y++) for (let x = Math.max(1, Math.floor(entity.position.x) - 1); x <= Math.ceil(entity.position.x) + 1; x++) {
      const point = { x, y };
      if (!isWalkable(x, y) || nearbyWorldEntity(point, value.world, value.elapsedMs)?.id !== id) continue;
      const path = worldRoute(value.player, point); if (path) candidates.push(path);
    }
    candidates.sort((a, b) => a.length - b.length);
    assert.ok(candidates.length, `a safe approach exists for ${id}`);
    if (!candidates[0].length) { await advance(page, 150); continue; }
    await step(page, value.player, candidates[0][0]);
  }
  assert.fail(`World entity ${id} must remain reachable`);
}
async function interact(page, id) {
  await approach(page, id); const before = await read(page);
  const entity = WORLD_ENTITIES.find(entity => entity.id === id);
  if (['human', 'fox', 'rabbit', 'owl'].includes(entity.kind)) {
    check(`${id} acknowledges an approach with an accessible nonmodal greeting`, await page.evaluate(name => window.observedGreetings.some(item => item.name === name && item.text.length > 5), entity.name));
    if (id === 'scout') {
      await page.screenshot({ path: `${output}/scout-greeting-mobile.png`, fullPage: true });
      const greeting = before.greeting;
      await page.locator('#pause-button').click(); await advance(page, 2000);
      check('pausing hides proximity speech without advancing or spending progress', await page.locator('#nearby-greeting').isHidden() && (await read(page)).paused && academic(await read(page)) === academic(before));
      await page.locator('#resume-button').click();
      check('resume restores the same nearby greeting without repeating its announcement', (await read(page)).greeting?.sequence === greeting.sequence && await page.locator('#nearby-greeting').isVisible());
    }
  }
  await page.locator('#interact-button').click();
  const after = await read(page);
  check(`${id} interaction has a saved discovery and leaves academic rewards unchanged`, after.world.interactions[id] === 1 && academic(after) === academic(before));
  if (WORLD_ENTITIES.find(entity => entity.id === id).kind === 'human') {
    check(`${id} opens an actual local conversation`, after.panel === 'world' && after.paused && await page.locator('#world-topic').isVisible());
    await page.locator('#world-topic').click(); check(`${id} conversation offers another useful topic`, (await page.locator('#world-topic-text').innerText()).length > 35);
    await page.locator('#close-panel').click();
  }
  return read(page);
}
async function reachCapture(page) {
  for (const room of ENCOUNTERS) for (let guard = 0; guard < 250; guard++) {
    const value = await read(page);
    if (value.phase === 'capture' || value.phase === 'review') return value;
    if (value.phase === 'question') {
      const question = questions.get(value.currentQuestion.id), wrong = value.currentQuestion.options.find(option => option.original !== question.correct);
      await page.locator(`[data-choice="${wrong.original}"]`).click();
      if (await page.locator('#read-feedback').isVisible()) await page.locator('#read-feedback').click();
    } else if (value.phase === 'feedback') await page.locator('#continue-button').click();
    else if (value.phase === 'explore') {
      if (value.player.x === room.x && value.player.y === room.y && value.encounters.find(item => item.id === room.id).resolved) break;
      const path = pathTo(value.player, room); assert.ok(path?.length);
      await step(page, value.player, path[0]);
    } else assert.fail(`Unexpected phase ${value.phase}`);
  }
  assert.fail('Three original mistakes must lead to capture');
}
let page, asset;
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.route('**/api/quizzes/**', route => route.abort());
  context.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  context.on('response', response => { if (response.status() >= 400 && !response.url().includes('/api/')) errors.push(`${response.status()} ${response.url()}`); });
  context.on('page', page => { page.on('pageerror', error => errors.push(error.message)); page.on('console', message => { if (message.type() === 'error' && !message.text().includes('net::ERR_FAILED') && !message.text().includes('Failed to load resource')) errors.push(message.text()); }); });
  page = await context.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await start(page);
  await page.evaluate(() => {
    window.observedGreetings = [];
    new MutationObserver(() => {
      const bubble = document.querySelector('#nearby-greeting');
      if (!bubble.hidden) window.observedGreetings.push({ name: document.querySelector('#greeting-name').textContent, text: document.querySelector('#greeting-text').textContent });
    }).observe(document.querySelector('#greeting-text'), { childList: true, subtree: true, characterData: true });
  });
  asset = await page.locator('script[type="module"]').last().getAttribute('src');
  check('expanded world has a 23 by 17 map with eight visible positioned entities', MAZE.length === 17 && MAZE.every(row => row.length === 23) && (await read(page)).worldEntities.length === 8);
  const humansBefore = (await read(page)).worldEntities.filter(entity => entity.kind === 'human'); await advance(page, 1000);
  const humansAfter = (await read(page)).worldEntities.filter(entity => entity.kind === 'human');
  check('both human characters walk independently', humansBefore.every((entity, i) => entity.position.x !== humansAfter[i].position.x || entity.position.y !== humansAfter[i].position.y));
  const initial = await read(page);
  await page.keyboard.down('ArrowDown'); await advance(page, 30);
  const midpoint = await read(page);
  check('movement accelerates through a real fractional midpoint instead of teleporting', midpoint.player.y === initial.player.y && midpoint.movement.position.y > initial.player.y && midpoint.movement.position.y < initial.player.y + 1 && midpoint.movement.speed > 0 && midpoint.movement.target !== null);
  await advance(page, 950); const held = await read(page);
  check('held movement crosses a tile boundary without dropping speed to zero', held.movement.origin.y > START.y && held.movement.speed > 0 && held.movement.position.y > held.movement.origin.y);
  await page.keyboard.up('ArrowDown'); await advance(page);
  check('releasing movement settles at a reachable tile center', (await read(page)).movement.target === null && isWalkable((await read(page)).player.x, (await read(page)).player.y));
  const wallStart = await read(page), left = await page.locator('[data-direction="left"]').boundingBox();
  await page.mouse.move(left.x + left.width / 2, left.y + left.height / 2); await page.mouse.down(); await advance(page, 1200); await page.mouse.up(); await advance(page);
  const wallEnd = await read(page);
  check('held touch direction cannot clip through the maze boundary', wallEnd.player.x === wallStart.player.x && wallEnd.movement.position.x === wallStart.movement.position.x && wallEnd.player.x >= 1);
  await page.keyboard.down('ArrowUp'); await advance(page, 60); await page.locator('#pause-button').click();
  const paused = await read(page); await advance(page, 1500);
  check('pausing freezes physical fractional movement and the world simulation', JSON.stringify((await read(page)).movement.position) === JSON.stringify(paused.movement.position) && (await read(page)).elapsedMs === paused.elapsedMs);
  await page.keyboard.up('ArrowUp'); await page.locator('#resume-button').click(); await advance(page);
  await interact(page, 'scout'); check('scout enables a persistent guide to an unfinished trap', (await read(page)).world.scoutGuided);
  const greetingsBefore = await page.evaluate(() => window.observedGreetings.length);
  await advance(page, 15000);
  check('lingering near a resident does not repeatedly announce hello', await page.evaluate(() => window.observedGreetings.length) === greetingsBefore && (await read(page)).phase === 'explore' && !(await read(page)).greeting);
  await page.screenshot({ path: `${output}/scout-guidance-mobile.png`, fullPage: true });
  await interact(page, 'keeper'); check('keeper lights the garden', (await read(page)).world.lightsOn);
  await interact(page, 'lamp'); await interact(page, 'pump');
  check('pump fills the bowl without awarding academic points or coins', (await read(page)).world.waterFilled && (await read(page)).progress.answered === 0 && (await read(page)).coins === 0);
  await advance(page, 7500); const drinking = await read(page);
  check('fox travels to the water bowl and drinks after it is filled', drinking.world.foxDrinking && drinking.world.fox.x === WATER_BOWL.x && drinking.world.fox.y === WATER_BOWL.y);
  await page.screenshot({ path: `${output}/garden-water-mobile.png`, fullPage: true });
  await interact(page, 'fox'); check('helped fox switches from drinking to following', (await read(page)).world.foxFollowing && !(await read(page)).world.foxDrinking);
  await interact(page, 'rabbit'); check('quiet approach calms the rabbit', (await read(page)).world.rabbitCalm);
  await interact(page, 'owl'); check('owl observation is recorded', (await read(page)).world.owlObserved);
  await interact(page, 'bench'); check('bench offers a rest without resetting exploration', (await read(page)).world.benchRested && (await read(page)).world.playerResting);
  const explored = await read(page), discoveries = flags(explored.world);
  check('all eight world discoveries are independent of academic answers and coins', Object.keys(explored.world.interactions).length === 8 && explored.progress.answered === 0 && explored.coins === 0);
  await page.reload({ waitUntil: 'domcontentloaded' }); await start(page);
  check('all persistent world discoveries survive browser reload', flags((await read(page)).world) === discoveries);
  await page.locator('#journal-button').click();
  check('journal exposes completed world discovery count', (await page.locator('#dialog-content').innerText()).includes('8 מתוך 8'));
  await page.locator('#close-panel').click();
  const captured = await reachCapture(page);
  check('three original wrong answers still trigger capture in the expanded world', captured.captureCount === 1 && captured.progress.answered === 3 && captured.coins === 0);
  check('capture preserves humans, animals and environmental discoveries', flags(captured.world) === discoveries);
  await page.reload({ waitUntil: 'domcontentloaded' }); await start(page);
  check('world discoveries persist through capture reload', flags((await read(page)).world) === discoveries);
  if (await page.locator('#skip-capture').isVisible()) await page.locator('#skip-capture').click();
  for (let guard = 0; guard < 30; guard++) {
    const value = await read(page); if (value.phase === 'explore') break;
    if (value.phase === 'review') {
      const q = questions.get(value.currentQuestion.id), wrong = value.currentQuestion.options.find(option => option.original !== q.correct);
      await page.locator(`[data-choice="${wrong.original}"]`).click();
    } else if (value.phase === 'review-feedback') await page.locator('#continue-button').click();
    else assert.fail(`Unexpected recovery phase ${value.phase}`);
  }
  const escaped = await read(page);
  check('guided recovery preserves the expanded world without restarting or inflating score', escaped.phase === 'explore' && escaped.hearts === 3 && escaped.coins === 0 && escaped.progress.score === 0 && flags(escaped.world) === discoveries);
  await page.screenshot({ path: `${output}/world-preserved-after-recovery.png`, fullPage: true });
  check('expanded-world mobile layout has no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  check('world flow sends no student answers or names', posts.length === 0); check('world flow has no application or asset errors', errors.length === 0);
  await context.close();
} catch (error) {
  if (page && !page.isClosed()) await page.screenshot({ path: `${output}/failure.png`, fullPage: true }).catch(() => {});
  throw error;
} finally { await writeFile(`${output}/report.json`, JSON.stringify({ base, asset, count: checks.length, checks, errors, posts }, null, 2)); await browser.close(); }
