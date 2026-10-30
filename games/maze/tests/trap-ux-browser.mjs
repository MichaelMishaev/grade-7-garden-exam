import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const base = process.env.MAZE_QA_URL || 'http://127.0.0.1:5188/';
const output = fileURLToPath(new URL('../../../output/maze/trap-ux/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], posts = [], scrollEndings = [];
const check = (name, value) => { assert.ok(value, name); checks.push(name); console.log(`PASS ${name}`); };
const read = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const advance = (page, ms) => page.evaluate(ms => window.advanceTime(ms), ms);
const academic = value => JSON.stringify({ progress: value.progress, coins: value.coins, hearts: value.hearts, seals: value.seals, question: value.currentQuestion?.id });
const hash = buffer => createHash('sha256').update(buffer).digest('hex');
let page;
async function context(reducedMotion = 'no-preference') {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion });
  await context.route('**/api/quizzes/**', route => route.abort());
  await context.addInitScript(() => {
    Math.random = () => 0.999999;
    // Advance actual controls deterministically; do not inject game state.
    window.requestAnimationFrame = () => 0;
  });
  context.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
  return context;
}
async function start(page, quiz) {
  await page.goto(base);
  await page.waitForFunction(() => !document.querySelector('#start-button').disabled, null, { polling: 50 });
  if (quiz) {
    await page.locator('#quiz-select').selectOption(quiz);
    await page.waitForFunction(() => !document.querySelector('#start-button').disabled, null, { polling: 50 });
  }
  await page.locator('#start-button').click();
}
async function enterTrap(page) {
  for (const direction of ['down', 'down', 'down', 'down', 'right', 'right', 'right']) {
    await page.locator(`[data-direction="${direction}"]`).click();
    await advance(page, 900);
  }
}
try {
  const normal = await context(); page = await normal.newPage(); await start(page); await enterTrap(page);
  const entry = await read(page), before = academic(entry);
  check('walking into a trap starts a clear skippable first-person entry beat', entry.phase === 'question' && entry.trapEntry?.active && entry.view === 'first-person-cage' && await page.locator('#skip-trap-entry').isVisible());
  check('entry hides answer choices until the gate has closed', await page.locator('[data-choice]').count() === 0);
  await page.screenshot({ path: `${output}/gate-closing-mobile.png`, fullPage: true });
  const gateBefore = hash(await page.locator('#maze-canvas').screenshot());
  await advance(page, 180);
  const gateAfter = hash(await page.locator('#maze-canvas').screenshot());
  check('the actual rendered gate visibly moves during the entry', gateBefore !== gateAfter && (await read(page)).trapEntry.elapsedMs > entry.trapEntry.elapsedMs);
  await page.locator('#encounter-menu').click();
  const paused = await read(page); await advance(page, 1800);
  check('pausing freezes entry timing and preserves the original question', (await read(page)).trapEntry.elapsedMs === paused.trapEntry.elapsedMs && academic(await read(page)) === before);
  await page.locator('#resume-button').click(); await page.locator('#skip-trap-entry').click();
  check('skip and resume reveal the same question without changing rewards', !(await read(page)).trapEntry && academic(await read(page)) === before && await page.locator('[data-choice]').first().isVisible());
  check('necessary fact statement is visible beside the explicit question', (await page.locator('#dialog-content').innerText()).includes('בפעילות השתתפו שלוש כיתות') && (await page.locator('#dialog-title').innerText()).includes('עובדה או דעה'));
  check('optional source and cage actions start collapsed', await page.locator('#question-source').evaluate(el => !el.open) && await page.locator('#cell-tools').evaluate(el => !el.open));
  await page.locator('#question-source summary').focus(); await page.keyboard.press('Enter');
  check('optional question source is operable with the keyboard', await page.locator('#question-source').evaluate(el => el.open));
  await page.keyboard.press('Enter');
  await page.screenshot({ path: `${output}/concise-question-mobile.png`, fullPage: true });
  await page.locator('#cell-tools summary').click(); await page.locator('[data-cell-action="lantern"]').click();
  check('secondary cage interaction remains reachable without changing the answer', (await read(page)).interaction.lanternRaised && academic(await read(page)) === before);
  await page.locator('[data-choice="0"]').click();
  check('feedback offers an optional explanation instead of showing it all upfront', await page.locator('#feedback-explanation').evaluate(el => !el.open));
  await page.locator('#feedback-explanation summary').click(); await page.waitForTimeout(1700);
  check('opening the explanation stops automatic advancement while reading', (await read(page)).phase === 'feedback' && (await read(page)).coins === 10);
  await page.locator('#continue-button').click();
  check('the next question in the same trap does not replay entry animation', (await read(page)).phase === 'question' && !(await read(page)).trapEntry && (await read(page)).progress.answered === 1);
  await page.reload(); await page.locator('#start-button').click();
  check('reload retains answered progress and never leaves entry blocking the question', (await read(page)).coins === 10 && (await read(page)).progress.answered === 1 && !(await read(page)).trapEntry && await page.locator('[data-choice]').first().isVisible());
  await normal.close();

  const reduce = await context('reduce'); page = await reduce.newPage(); await start(page, 'physics-pole'); await enterTrap(page);
  check('reduced motion opens the question immediately with no moving entry', !(await read(page)).trapEntry && await page.locator('[data-choice]').first().isVisible());
  const apparatus = await page.locator('#dialog-content').innerText();
  check('the first pole question explains its apparatus without printing the angle answer', apparatus.includes('גליל חלול') && apparatus.includes('שווה־שוקיים') && !(await page.locator('.question-context').innerText()).includes('45'));
  await page.locator('[data-choice="0"]').click(); await page.locator('#read-feedback').click(); await page.locator('#continue-button').click();
  await page.locator('[data-choice="0"]').click(); await page.locator('#read-feedback').click(); await page.locator('#continue-button').click();
  const numeric = await page.locator('.question-context').innerText();
  check('the numerical pole task supplies its missing angle ground and measurements visibly', numeric.includes('45°') && numeric.includes('קרקע אופקית') && numeric.includes('6 מ׳') && numeric.includes('1.4 מ׳'));
  await page.screenshot({ path: `${output}/pole-context-mobile.png`, fullPage: true });
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width >= 768 ? 900 : 844 });
    check(`${width}px question layout has no horizontal overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.querySelector('#game-dialog').scrollWidth <= document.querySelector('#game-dialog').clientWidth));
    const last = page.locator('[data-choice]').last(); await last.scrollIntoViewIfNeeded();
    check(`${width}px all answers remain reachable with visible context`, await last.isVisible() && await last.isEnabled() && await page.locator('.question-context').isVisible());
    await page.locator('#encounter-menu').scrollIntoViewIfNeeded();
    const ending = await page.evaluate(() => {
      const action = document.querySelector('#encounter-menu').getBoundingClientRect(), sheet = document.querySelector('#game-dialog').getBoundingClientRect();
      return { width: innerWidth, gap: sheet.bottom - action.bottom, actionTop: action.top, actionBottom: action.bottom, height: innerHeight };
    });
    scrollEndings.push(ending);
    check(`${width}px scroll ending keeps the exit action unobscured without excess padding`, ending.gap >= 0 && ending.gap <= 32 && ending.actionTop >= 0 && ending.actionBottom <= ending.height);
  }
  await reduce.close();
  check('question and entry flows have no application errors', errors.length === 0);
  check('question and entry flows send no student submissions', posts.length === 0);
} catch (error) {
  if (page && !page.isClosed()) await page.screenshot({ path: `${output}/failure.png`, fullPage: true }).catch(() => {});
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ base, count: checks.length, checks, errors, posts, scrollEndings }, null, 2));
  await browser.close();
}
