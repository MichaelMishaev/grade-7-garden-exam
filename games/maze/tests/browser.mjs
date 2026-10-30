import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ENCOUNTERS, EXIT, START, CREATURES, CLUE, TREASURE, pathTo, isWalkable, createState, transition, encountersFor } from '../core.js';
import { normalizeMazeContent } from '../content.js';
import snapshot from '../content-snapshot.js';

const base = process.env.MAZE_QA_URL || 'http://127.0.0.1:5188';
const output = fileURLToPath(new URL('../../../output/maze/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const checks = [], errors = [], posts = [];
const questions = new Map(snapshot.quizzes.flatMap(quiz => quiz.questions).map(question => [question.id, question]));
const state = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const check = (name, value) => { assert.ok(value, name); checks.push(name); console.log(`PASS ${name}`); };
const shot = (page, name) => page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
const sameProgress = value => JSON.stringify({ hearts: value.hearts, coins: value.coins, seals: value.seals, progress: value.progress });
const observedOriginals = new WeakMap();
async function cellView(page, label) {
  const value = await state(page);
  check(`${label} uses the actual first-person cage view`, value.view === 'first-person-cage');
  const dimensions = await page.evaluate(() => {
    const canvas = document.querySelector('#maze-canvas').getBoundingClientRect();
    const sheet = document.querySelector('#game-dialog').getBoundingClientRect();
    const backdrop = getComputedStyle(document.querySelector('#game-dialog'), '::backdrop');
    return { exposed: Math.min(canvas.bottom, sheet.top) - Math.max(canvas.top, 0), width: canvas.width, sheetTop: sheet.top, canvasTop: canvas.top, clear: backdrop.backgroundColor === 'rgba(0, 0, 0, 0)' && ['none', ''].includes(backdrop.backdropFilter), sheet: document.querySelector('#game-dialog').classList.contains('cell-sheet') };
  });
  check(`${label} keeps a clear visible 3D cell above the question sheet`, dimensions.sheet && dimensions.clear && dimensions.exposed >= 180 && dimensions.width >= 250);
}
async function cellActions(page) {
  const original = sameProgress(await state(page));
  await page.locator('#cell-tools summary').click();
  for (const action of ['look-left', 'look-right', 'lantern', 'rattle', 'inspect']) {
    const before = (await state(page)).interaction;
    await page.locator(`[data-cell-action="${action}"]`).click();
    const after = await state(page), interaction = after.interaction;
    const changed = action.startsWith('look-') ? interaction.lookYaw !== before.lookYaw : action === 'lantern' ? interaction.lanternRaised !== before.lanternRaised : action === 'rattle' ? interaction.notice.includes('השומר') : interaction.lockInspected === true;
    check(`cell action ${action} changes scene interaction while preserving academic progress`, changed && sameProgress(after) === original && after.phase === 'question');
  }
}

async function context(options = {}) {
  const context = await browser.newContext(options);
  await context.route('**/api/quizzes/**', route => route.abort());
  context.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  context.on('response', response => { if (response.status() >= 400 && !response.url().includes('/api/')) errors.push(`HTTP ${response.status()} ${response.url()}`); });
  context.on('page', page => {
    page.on('pageerror', error => errors.push(`${page.url()}: ${error.message}`));
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().includes('net::ERR_FAILED') && !message.text().includes('Failed to load resource')) errors.push(message.text());
    });
  });
  return context;
}
async function ready(page) {
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function' && !document.querySelector('#start-button')?.disabled);
}
async function start(page) {
  await ready(page);
  if (await page.locator('#start-button').isVisible()) await page.locator('#start-button').click();
  await page.waitForFunction(() => JSON.parse(window.render_game_to_text()).phase !== 'loading');
}
async function holdFeedback(page) {
  const hold = page.locator('#read-feedback');
  if (await hold.isVisible()) await hold.click();
}
async function clickContinue(page) {
  const guided = page.locator('#guided-continue');
  if (await guided.isVisible()) await guided.click();
  else await page.locator('#continue-button').click();
}
async function choose(page, correct) {
  const before = await state(page);
  const question = before.currentQuestion;
  assert.ok(question?.id && Array.isArray(question.options), 'visible question includes stable original option indices');
  if (before.phase === 'question') {
    let observed = observedOriginals.get(page);
    if (!observed) { observed = new Map(); observedOriginals.set(page, observed); }
    const ids = observed.get(before.activeEncounter) || new Set(); ids.add(question.id); observed.set(before.activeEncounter, ids);
    assert.ok(ids.size <= 3, `trap ${before.activeEncounter} never asks more than three original questions`);
  }
  const original = questions.get(question.id);
  assert.ok(original, 'question is from the existing source-backed snapshot');
  const option = question.options.find(option => correct ? option.original === original.correct : option.original !== original.correct);
  await page.locator(`[data-choice="${option.original}"]`).click();
  await holdFeedback(page);
  return before;
}
async function direction(page, from, to) {
  const name = to.x > from.x ? 'right' : to.x < from.x ? 'left' : to.y > from.y ? 'down' : 'up';
  await page.locator(`[data-direction="${name}"]`).click();
  await page.evaluate(() => window.advanceTime(900));
  await page.waitForFunction(() => {const value=JSON.parse(window.render_game_to_text());return value.phase!=='explore'||!value.movement?.target;});
}

const evidence = { question: false, capture: false, review: false, reviewReload: false, correct: false, exploreReturn: false };
async function settle(page, correctness, recoveryCorrect = false) {
  for (let guard = 0; guard < 80; guard++) {
    let value = await state(page);
    if (value.phase === 'explore' || value.phase === 'complete') {
      if (value.phase === 'explore' && evidence.question && !evidence.exploreReturn) { check('finishing an encounter restores maze exploration camera', value.view === 'maze'); evidence.exploreReturn = true; }
      return value;
    }
    if (value.phase === 'question') {
      if (!evidence.question) {
        await cellView(page, 'mobile question at 390px');
        await page.setViewportSize({ width: 320, height: 844 }); await page.waitForTimeout(80);
        await cellView(page, 'mobile question at 320px');
        await page.locator('[data-choice]').last().scrollIntoViewIfNeeded();
        check('question answers remain reachable by scrolling the 320px sheet', await page.locator('[data-choice]').last().evaluate(element => { const answer=element.getBoundingClientRect(), sheet=document.querySelector('#game-dialog').getBoundingClientRect(); return answer.top >= sheet.top && answer.bottom <= sheet.bottom; }));
        await shot(page, 'first-person-question-320');
        await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(80);
        await cellActions(page);
        const beforePause = await state(page);
        await page.locator('#encounter-menu').click();
        await page.locator('#resume-button').waitFor({ state: 'visible' });
        await page.evaluate(() => window.advanceTime(1500));
        const inMenu = await state(page);
        check('question offers a pause and safe-leave menu without changing original progress', inMenu.paused && inMenu.view === 'first-person-cage' && sameProgress(inMenu) === sameProgress(beforePause) && await page.locator('a.dialog-link').isVisible());
        await page.locator('#resume-button').click();
        check('resuming question menu returns to the same unanswered question', (await state(page)).currentQuestion.id === beforePause.currentQuestion.id && (await state(page)).phase === 'question');
        await shot(page, 'mobile-question'); evidence.question = true;
      }
      const before = await choose(page, correctness);
      value = await state(page);
      if (correctness && !evidence.correct) {
        check('correct original answer awards exactly ten coins', value.coins === before.coins + 10);
        check('original answer choices lock immediately', await page.locator('[data-choice]:enabled').count() === 0);
        evidence.correct = true;
      }
      if (!correctness) check(`wrong original answer ${value.progress.answered} earns no coins`, value.coins === before.coins);
      continue;
    }
    if (value.phase === 'feedback') { await clickContinue(page); continue; }
    if (value.phase === 'capture') {
      if (!evidence.capture) {
        check('zero hearts enters capture', value.hearts === 0);
        await cellView(page, 'mobile capture');
        await shot(page, 'mobile-capture');
        const before = sameProgress(value);
        await page.reload({ waitUntil: 'domcontentloaded' }); await start(page);
        value = await state(page);
        check('reload during capture preserves original progress and treasure', sameProgress(value) === before);
        evidence.capture = true;
      }
      if (await page.locator('#skip-capture').isVisible()) await page.locator('#skip-capture').click();
      else await page.waitForFunction(() => JSON.parse(window.render_game_to_text()).phase !== 'capture');
      continue;
    }
    if (value.phase === 'review') {
      if (!evidence.review) { await cellView(page, 'mobile guided recovery'); await shot(page, 'mobile-recovery'); evidence.review = true; }
      if (!value.currentQuestion) { await clickContinue(page); continue; }
      const before = sameProgress(value);
      await choose(page, recoveryCorrect);
      value = await state(page);
      check('escape-room attempt leaves original academic progress and coins unchanged', sameProgress(value) === before);
      if (!evidence.reviewReload) {
        await page.reload({ waitUntil: 'domcontentloaded' }); await start(page);
        value = await state(page);
        check('reload preserves review progress without changing first attempts', sameProgress(value) === before && ['review', 'review-feedback'].includes(value.phase));
        evidence.reviewReload = true;
      }
      continue;
    }
    if (value.phase === 'review-feedback') {
      await clickContinue(page);
      const after = await state(page);
      if (after.phase === 'explore') {
        check(`recovery ${after.captureCount} restores exploration camera`, after.view === 'maze');
        check(`recovery ${after.captureCount} returns near the capture instead of the entrance`, after.player.x !== START.x || after.player.y !== START.y);
        check(`recovery ${after.captureCount} returns to reachable ground outside creature patrols`, isWalkable(after.player.x, after.player.y) && Boolean(pathTo(after.player, EXIT)) && !CREATURES.flatMap(creature => creature.path).some(point => point.x === after.player.x && point.y === after.player.y) && !ENCOUNTERS.some(point => point.x === after.player.x && point.y === after.player.y));
      }
      continue;
    }
    assert.fail(`Unexpected gameplay phase: ${value.phase}`);
  }
  assert.fail('Encounter/recovery did not release player within bounded interactions');
}
async function travel(page, destination, correctness, recoveryCorrect = false) {
  for (let steps = 0; steps < 350; steps++) {
    const value = await settle(page, correctness, recoveryCorrect);
    if (value.phase === 'complete') return value;
    if (value.player.x === destination.x && value.player.y === destination.y) return value;
    const route = pathTo(value.player, destination);
    assert.ok(route?.length, 'next objective is reachable through real maze movement');
    await direction(page, value.player, route[0]);
  }
  assert.fail('Movement did not reach objective; possible collision or recovery loop');
}
async function openPanel(page, selector, label) {
  await page.locator(selector).click();
  await page.locator('#close-panel').waitFor({ state: 'visible' });
  const before = await state(page);
  await page.evaluate(() => window.advanceTime(1500));
  const after = await state(page);
  check(`${label} freezes player and hazards`, JSON.stringify(after.player) === JSON.stringify(before.player) && after.elapsedMs === before.elapsedMs);
  if (label === 'map') await shot(page, 'mobile-map');
  await page.locator('#close-panel').click();
}

let page;
try {
  const mobile = await context({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  page = await mobile.newPage();
  await page.goto(base, { waitUntil: 'domcontentloaded' }); await ready(page);
  await shot(page, 'mobile-intro'); await start(page);
  check('mobile starts with three hearts and no artificial rewards', (await state(page)).hearts === 3 && (await state(page)).coins === 0);
  check('offline source fallback is visibly identified', await page.locator('#offline-badge').isVisible());
  check('touch movement targets are at least 44 pixels', await page.locator('[data-direction]').evaluateAll(elements => elements.every(element => { const r = element.getBoundingClientRect(); return r.width >= 44 && r.height >= 44; })));
  check('game uses Hebrew RTL', await page.locator('html').getAttribute('lang') === 'he' && await page.locator('html').getAttribute('dir') === 'rtl');
  await shot(page, 'mobile-exploration');
  const wallStart = await state(page); await page.locator('[data-direction="left"]').click(); await page.evaluate(() => window.advanceTime(900));
  check('touch movement respects maze walls', JSON.stringify((await state(page)).player) === JSON.stringify(wallStart.player));
  const canvasBox = await page.locator('#maze-canvas').boundingBox();
  const beforeTap = await state(page);
  // This floor position was selected from the inspected 390px mobile screenshot.
  // Scale the visible corridor point with the canvas; no internal positioning hook is used.
  await page.locator('#maze-canvas').tap({ position: { x: canvasBox.width * .353, y: canvasBox.height * .385 } });
  await page.evaluate(() => window.advanceTime(900));
  await page.waitForFunction(previous => { const value = JSON.parse(window.render_game_to_text()); return value.player.x !== previous.x || value.player.y !== previous.y; }, beforeTap.player);
  check('tapping a visible floor tile walks the explorer through the maze', JSON.stringify((await state(page)).player) !== JSON.stringify(beforeTap.player));
  await openPanel(page, '#map-button', 'map'); await openPanel(page, '#journal-button', 'journal');
  await page.locator('#pause-button').click();
  const paused = await state(page); await page.evaluate(() => window.advanceTime(1500));
  check('pause freezes simulation', (await state(page)).elapsedMs === paused.elapsedMs);
  const resume = page.locator('#resume-button');
  if (await resume.isVisible()) await resume.click(); else await page.locator('#close-panel').click();
  for (const room of ENCOUNTERS) await travel(page, room, false, false);
  await travel(page, EXIT, false, false);
  const failedRun = await state(page);
  check('every original answer can be wrong and player still finishes', failedRun.phase === 'complete' && failedRun.progress.answered === failedRun.progress.total && failedRun.progress.correct === 0);
  check('guided recovery never inflates learning score or coins', failedRun.progress.score === 0 && failedRun.coins === 0);
  check('three seals survive capture and unlock the exit', failedRun.seals.length === 3);
  check('all-wrong run exercises two captures without reset', failedRun.captureCount === 2);
  await shot(page, 'mobile-complete');
  await mobile.close();

  const desktop = await context({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  page = await desktop.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await start(page);
  if (await page.evaluate(() => document.fullscreenEnabled)) {
    await page.keyboard.press('KeyF');
    await page.waitForFunction(() => Boolean(document.fullscreenElement));
    check('F enters fullscreen through a normal keyboard gesture', await page.evaluate(() => Boolean(document.fullscreenElement)));
    await page.keyboard.press('KeyF');
    await page.waitForFunction(() => !document.fullscreenElement);
    check('F exits fullscreen without resetting the expedition', (await state(page)).progress.answered === 0);
  }
  await page.keyboard.press('Escape');
  await page.locator('#resume-button').waitFor({ state: 'visible' });
  check('Escape opens the keyboard pause menu', (await state(page)).paused);
  await page.locator('#resume-button').click();
  const keyboardStart = await state(page); await page.keyboard.press('ArrowDown'); await page.evaluate(() => window.advanceTime(900));
  check('keyboard movement works', (await state(page)).player.y > keyboardStart.player.y);
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
    await page.waitForTimeout(60);
    check(`no horizontal overflow at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    check(`movement controls fit viewport at ${width}px`, await page.locator('[data-direction="down"]').evaluate(element => { const r = element.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight; }));
    if (width === 320) await shot(page, 'small-mobile-exploration');
    if (width === 1440) await shot(page, 'desktop-exploration');
  }
  await travel(page, CLUE, true); await travel(page, TREASURE, true);
  for (const room of ENCOUNTERS) await travel(page, room, true);
  await travel(page, EXIT, true);
  const success = await state(page);
  check('all-correct full run earns source-weighted 100 and exactly one payout per question', success.phase === 'complete' && success.progress.score === 100 && success.coins === success.progress.total * 10);
  check('optional exploration never inflates original score', success.progress.correct === success.progress.total);
  await shot(page, 'desktop-complete');
  const completeBeforeOtherTab = sameProgress(await state(page));
  const secondTab = await desktop.newPage();
  await secondTab.goto(base, { waitUntil: 'domcontentloaded' }); await start(secondTab);
  check('a separate tab starts its own expedition without sharing the completed tab', (await state(secondTab)).progress.answered === 0 && (await state(secondTab)).seals.length === 0);
  await secondTab.locator('[data-direction="down"]').click(); await secondTab.evaluate(() => window.advanceTime(900));
  check('movement in a separate tab cannot overwrite the first tab', sameProgress(await state(page)) === completeBeforeOtherTab);
  await secondTab.close();
  const returnLink = page.locator('a.dialog-link');
  check('completion return link targets the actual project homepage', new URL(await returnLink.getAttribute('href'), page.url()).pathname === '/index.html');
  await returnLink.click();
  await page.waitForURL(url => url.pathname === '/index.html');
  check('homepage keeps separate Afterbell and Shadow Maze entry buttons', await page.locator('a[href="games/afterbell/play/index.html"]').isVisible() && await page.locator('a[href="games/maze/play/index.html"]').isVisible());
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
    await page.waitForTimeout(60);
    check(`homepage has no horizontal overflow at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    if (width === 390) await shot(page, 'homepage-mobile');
    if (width === 1440) await shot(page, 'homepage-desktop');
  }
  await desktop.close();

  const accessible = await context({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  await accessible.addInitScript(() => {
    const native = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (this === window.sessionStorage) throw new DOMException('Test storage denied', 'QuotaExceededError');
      return native.call(this, key, value);
    };
  });
  page = await accessible.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await start(page);
  check('denied session storage displays an honest warning', await page.locator('#storage-warning').isVisible());
  const noSaveStart = await state(page); await page.locator('[data-direction="down"]').click(); await page.evaluate(() => window.advanceTime(900));
  check('denied session storage leaves in-memory movement playable', (await state(page)).player.y > noSaveStart.player.y);
  // Complete the first two original answers normally, then enter the next encounter.
  await travel(page, ENCOUNTERS[0], false, false);
  for (let step = 0; step < 100 && (await state(page)).phase === 'explore'; step++) {
    const value = await state(page), route = pathTo(value.player, ENCOUNTERS[1]);
    assert.ok(route?.length, 'next reduced-motion encounter remains reachable');
    await direction(page, value.player, route[0]);
  }
  check('reduced-motion flow reaches the third original question', (await state(page)).phase === 'question' && (await state(page)).progress.answered === 2);
  await choose(page, false);
  await page.waitForFunction(() => JSON.parse(window.render_game_to_text()).phase === 'review');
  const reducedCapture = await state(page);
  check('reduced motion skips capture animation into equivalent guided recovery', reducedCapture.hearts === 0 && reducedCapture.captureCount === 1 && reducedCapture.progress.answered === 3 && !(await page.locator('.capture-art').isVisible()));
  await cellView(page, 'reduced-motion recovery');
  await shot(page, 'reduced-motion-recovery');
  await settle(page, false, false);
  const recovered = await state(page);
  check('reduced-motion all-wrong recovery restores hearts without restarting or inflating score', recovered.phase === 'explore' && recovered.hearts === 3 && recovered.progress.answered === 3 && recovered.progress.score === 0 && recovered.coins === 0);
  check('denied-storage recovery retains the original in-memory progress', recovered.seals.length >= 1 && (recovered.player.x !== 1 || recovered.player.y !== 1));
  await accessible.close();

  const physics = await context({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  page = await physics.newPage();
  const physicsUrl = new URL(base); physicsUrl.searchParams.set('quiz', 'physics-units');
  await page.goto(physicsUrl.href, { waitUntil: 'domcontentloaded' }); await start(page);
  const physicsStart = await state(page), physicsRooms = encountersFor(snapshot.quizzes.find(quiz => quiz.id === 'physics-units').questions);
  check('eleven-question bank adds enough traps while preserving all source questions', physicsStart.progress.total === 11 && physicsStart.encounters.length === physicsRooms.length && physicsStart.encounters.length >= 4);
  check('every active eleven-question trap has one to three questions', physicsStart.encounters.every(room => room.questions >= 1 && room.questions <= 3) && physicsStart.encounters.reduce((sum, room) => sum + room.questions, 0) === 11);
  for (const room of physicsRooms) await travel(page, room, true);
  await travel(page, EXIT, true);
  const physicsComplete = await state(page), observedPhysics = observedOriginals.get(page);
  check('eleven-question mobile maze completes the entire original bank', physicsComplete.phase === 'complete' && physicsComplete.progress.answered === 11 && physicsComplete.progress.correct === 11 && physicsComplete.coins === 110 && physicsComplete.progress.score === 100);
  check('actual UI never presents a fourth original question in any trap', observedPhysics.size === physicsRooms.length && [...observedPhysics.values()].every(ids => ids.size >= 1 && ids.size <= 3) && new Set([...observedPhysics.values()].flatMap(ids => [...ids])).size === 11);
  await shot(page, 'physics-eleven-question-complete'); await physics.close();

  const corrupted = await context({ viewport: { width: 375, height: 844 }, isMobile: true, hasTouch: true });
  await corrupted.addInitScript(() => {
    if (location.protocol === 'http:' || location.protocol === 'https:') sessionStorage.setItem('prepx-shadow-maze-session-v1', '{broken-save');
  });
  page = await corrupted.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'לנסות לשחזר שוב' }).waitFor({ state: 'visible' });
  check('corrupt session explicitly offers retry and safe return instead of silent reset', (await page.locator('#notice').textContent()).includes('נשארה ללא שינוי') && await page.locator('a.dialog-link[href="/index.html"]').isVisible());
  check('corrupt session is preserved rather than overwritten by a fresh game', await page.evaluate(() => sessionStorage.getItem('prepx-shadow-maze-session-v1')) === '{broken-save');
  await shot(page, 'corrupt-save-recovery');
  await corrupted.close();
  const invalidQuiz = await context({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  page = await invalidQuiz.newPage();
  const invalidUrl = new URL(base); invalidUrl.searchParams.set('quiz', 'physic');
  await page.goto(invalidUrl.href, { waitUntil: 'domcontentloaded' }); await ready(page);
  check('unknown quiz parameter visibly falls back to an available source-backed set', (await page.locator('#notice').textContent()).includes('לא מוכר') && await page.locator('#quiz-select').inputValue() === 'facts');
  await start(page);
  check('unknown quiz link starts a playable default maze', (await state(page)).phase === 'explore' && (await state(page)).progress.total === 6);
  await invalidQuiz.close();

  // An explicit restoration fixture models a saved five-question content version
  // predating the current six-question catalog. Normal play above never injects state.
  const oldContent = normalizeMazeContent({ ...structuredClone(snapshot.quizzes[0]), questions: structuredClone(snapshot.quizzes[0].questions.slice(0, 5)) }, { pinned: true });
  let oldState = createState(oldContent.questions, () => .999999);
  for (const cell of pathTo(oldState.player, ENCOUNTERS[0])) oldState = transition(oldState, { type: 'move', dx: cell.x - oldState.player.x, dy: cell.y - oldState.player.y }, oldContent.questions);
  const oldQuestionId = oldState.assignments[ENCOUNTERS[0].id][0];
  const oldQuestion = oldContent.questions.find(question => question.id === oldQuestionId);
  oldState = transition(oldState, { type: 'answer', choice: oldQuestion.correct }, oldContent.questions);
  const olderPinned = await context({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await olderPinned.addInitScript(({ content, state }) => {
    if (location.protocol === 'http:' || location.protocol === 'https:') sessionStorage.setItem('prepx-shadow-maze-session-v1', JSON.stringify({ content, state }));
  }, { content: oldContent, state: oldState });
  page = await olderPinned.newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await start(page);
  const oldRestored = await state(page);
  check('older five-question pinned content resumes without replacing it with the new catalog', oldRestored.progress.total === 5 && oldRestored.progress.answered === 1 && oldRestored.coins === 10 && oldRestored.currentQuestion.id === oldQuestionId && oldRestored.phase === 'feedback');
  await holdFeedback(page); await shot(page, 'older-pinned-restore'); await clickContinue(page); await choose(page, true);
  const oldContinued = await state(page);
  check('older pinned expedition remains playable and preserves original reward accounting', oldContinued.progress.total === 5 && oldContinued.progress.answered === 2 && oldContinued.coins === 20);
  await olderPinned.close();
  check('game never posts names or answers', posts.length === 0);
  check('browser has no uncaught or application console errors', errors.length === 0);
} catch (error) {
  if (page && !page.isClosed()) { await shot(page, 'failure').catch(() => {}); }
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ base, checks, errors, posts, evidence, count: checks.length }, null, 2));
  await browser.close();
}
