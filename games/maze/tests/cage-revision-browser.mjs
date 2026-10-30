import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createState, ENCOUNTERS, pathTo } from '../core.js';
import { normalizeMazeContent } from '../content.js';
import snapshot from '../content-snapshot.js';

const base = process.env.MAZE_QA_URL || 'http://127.0.0.1:4328/games/maze/play/index.html';
const output = fileURLToPath(new URL('../../../output/maze/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], posts = [];
const check = (name, condition) => { assert.ok(condition, name); checks.push(name); console.log(`PASS ${name}`); };
const state = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const key = 'prepx-shadow-maze-session-v1';
const questions = new Map(snapshot.quizzes.flatMap(quiz => quiz.questions).map(question => [question.id, question]));
async function context() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.route('**/api/quizzes/**', route => route.abort());
  context.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  context.on('response', response => { if (response.status() >= 400 && !response.url().includes('/api/')) errors.push(`${response.status()} ${response.url()}`); });
  context.on('page', page => {
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && !message.text().includes('net::ERR_FAILED') && !message.text().includes('Failed to load resource')) errors.push(message.text()); });
  });
  return context;
}
async function start(page) {
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function' && !document.querySelector('#start-button').disabled);
  await page.locator('#start-button').click();
}
async function answerCorrect(page) {
  const before = await state(page), question = questions.get(before.currentQuestion.id);
  await page.locator(`[data-choice="${question.correct}"]`).click();
  return before;
}
async function walkToQuestion(page, destination) {
  for (let step = 0; step < 100; step++) {
    const value = await state(page);
    if (value.phase === 'question') return value;
    assert.equal(value.phase, 'explore');
    const path = pathTo(value.player, destination); assert.ok(path?.length);
    const next = path[0], direction = next.x > value.player.x ? 'right' : next.x < value.player.x ? 'left' : next.y > value.player.y ? 'down' : 'up';
    await page.locator(`[data-direction="${direction}"]`).click();
    await page.evaluate(() => window.advanceTime(900));
  }
  assert.fail('Question entrance must remain reachable');
}
let page;
try {
  // Restore-only fixture: the old three-room mapping gave cage original indices
  // 4..7. All four were answered, so its earned seal must survive the new 3-cap map.
  const content = normalizeMazeContent(structuredClone(snapshot.quizzes.find(quiz => quiz.id === 'physics-units')));
  const legacy = createState(content.questions, () => .999999);
  legacy.assignments = Object.fromEntries(ENCOUNTERS.map((room, i) => [room.id, legacy.order.filter((_, index) => Math.min(2, Math.floor(index * 3 / legacy.order.length)) === i)]));
  delete legacy.sealProofs; delete legacy.resolved;
  for (const id of legacy.assignments.cage) {
    const question = content.questions.find(question => question.id === id);
    legacy.answers[id] = { choice: question.correct, correct: true };
  }
  legacy.seals = ['cage']; legacy.coins = 40; legacy.player = { x: 11, y: 5 };
  const oldIds = [...legacy.assignments.cage];
  const restored = await context();
  await restored.addInitScript(({ content, state, key }) => {
    if (['http:', 'https:'].includes(location.protocol) && !sessionStorage.getItem(key)) sessionStorage.setItem(key, JSON.stringify({ content, state }));
  }, { content, state: legacy, key });
  page = await restored.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await start(page);
  check('focused acceptance targets the built game assets', (await page.locator('script[type="module"]').getAttribute('src')).includes('/assets/index-'));
  let value = await state(page), cage = value.encounters.find(room => room.id === 'cage');
  check('legacy earned cage seal and original four-answer reward survive migration', value.seals.includes('cage') && value.progress.answered === 4 && value.coins === 40);
  check('migrated cage remains capped at three with its newly assigned question pending', cage.questions === 3 && cage.answered === 2 && cage.resolved === false);
  await page.reload({ waitUntil: 'domcontentloaded' }); await start(page);
  value = await state(page);
  const persisted = await page.evaluate(key => JSON.parse(sessionStorage.getItem(key)).state, key);
  check('earned seal proof and recorded answers survive a second browser reload', value.seals.includes('cage') && value.coins === 40 && value.progress.answered === 4 && oldIds.every(id => persisted.answers[id]?.correct) && JSON.stringify(persisted.sealProofs.cage) === JSON.stringify(oldIds));
  if (value.phase === 'explore') await page.locator('#interact-button').click();
  value = await state(page);
  check('pending new cage question remains accessible after preserving the earned seal', value.phase === 'question' && value.currentQuestion.id === legacy.order[3] && value.view === 'first-person-cage');
  await answerCorrect(page); await page.locator('#read-feedback').click();
  value = await state(page);
  check('answering the pending capped question preserves the earned seal and adds one payout', value.seals.includes('cage') && value.encounters.find(room => room.id === 'cage').resolved && value.progress.answered === 5 && value.coins === 50);
  await page.reload({ waitUntil: 'domcontentloaded' }); await start(page); await page.locator('#read-feedback').click();
  value = await state(page);
  check('subsequent save/reload retains the earned seal, all five original answers and fifty coins', value.seals.includes('cage') && value.progress.answered === 5 && value.coins === 50 && value.phase !== 'complete' && value.progress.complete === false);
  await restored.close();

  const regular = await context();
  page = await regular.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await start(page);
  await walkToQuestion(page, ENCOUNTERS[0]); await answerCorrect(page);
  const feedback = await state(page);
  check('regular correct answer enters feedback with one original payout', feedback.phase === 'feedback' && feedback.coins === 10 && feedback.progress.answered === 1);
  await page.locator('[data-cell-action="lantern"]').click();
  await page.locator('[data-cell-action="rattle"]').click();
  await page.evaluate(() => window.advanceTime(2000)); await page.waitForTimeout(1600);
  value = await state(page);
  check('inspecting the feedback cage stops automatic advance while retaining the first answer', value.phase === 'feedback' && value.currentQuestion.id === feedback.currentQuestion.id && value.coins === feedback.coins && value.progress.answered === feedback.progress.answered && value.progress.score === feedback.progress.score);
  check('feedback scene interactions remain visible without changing the learning result', value.view === 'first-person-cage' && value.interaction.lanternRaised && value.interaction.notice.includes('השומר'));
  await page.screenshot({ path: `${output}/feedback-scene-interaction-mobile.png`, fullPage: true });
  await page.locator('#continue-button').click();
  value = await state(page);
  check('explicit continue still advances normally after inspecting the cage', value.phase === 'question' && value.currentQuestion.id !== feedback.currentQuestion.id && value.coins === 10 && value.progress.answered === 1);
  await regular.close();
  check('focused checks send no answers or names', posts.length === 0);
  check('focused checks have no application or asset errors', errors.length === 0);
} catch (error) {
  if (page && !page.isClosed()) await page.screenshot({ path: `${output}/cage-revision-failure.png`, fullPage: true }).catch(() => {});
  throw error;
} finally {
  await writeFile(`${output}/cage-revision-report.json`, JSON.stringify({ base, checks, count: checks.length, errors, posts }, null, 2));
  await browser.close();
}
