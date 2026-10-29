import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { contentHash } from '../service.mjs';

const base = 'http://127.0.0.1:5177';
const { quizzes } = JSON.parse(await readFile(new URL('../src/content-snapshot.json', import.meta.url), 'utf8'));
const checks = [], pageErrors = [], layout = {};
const check = (label, pass) => { assert.ok(pass, label); checks.push(label); console.log(`PASS ${label}`); };
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl'] });
const ready = page => page.waitForFunction(() => window.render_game_to_text && !document.querySelector('#start').disabled);
const state = page => page.evaluate(() => JSON.parse(render_game_to_text()));

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.route('**/api/afterbell/quizzes/**', route => {
    const q = quizzes.find(q => route.request().url().endsWith(`/api/afterbell/quizzes/${q.id}`));
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(q) });
  });
  const makePayload = () => ({ id: crypto.randomUUID(), name: 'בדיקת משחק', quizId: quizzes[0].id,
    contentHash: contentHash(quizzes[0]), startedAt: Date.now() - 5000,
    answers: quizzes[0].questions.map(q => ({ id: q.id, choice: q.correct })) });
  const rejected = { ...makePayload(), contentHash: 'no-longer-valid' }, accepted = makePayload();
  let rejectedRequests = 0, acceptedRequests = 0;
  await page.addInitScript(({ rejected, accepted }) => {
    if (!sessionStorage.getItem('qa-queue-seeded')) {
      localStorage.setItem('prepx-afterbell-pending-v1', JSON.stringify([rejected, accepted]));
      sessionStorage.setItem('qa-queue-seeded', '1');
    }
  }, { rejected, accepted });
  await page.route('**/api/afterbell/attempts', route => {
    const payload = route.request().postDataJSON(), ok = payload.id === accepted.id;
    if (ok) acceptedRequests++; else rejectedRequests++;
    return route.fulfill({ status: ok ? 200 : 400, contentType: 'application/json', body: JSON.stringify(ok ? { saved: true, id: accepted.id, score: 100 } : { error: 'invalid_attempt' }) });
  });
  await page.goto(`${base}/?test=1&quiz=physics-units`, { waitUntil: 'domcontentloaded' });
  await ready(page);
  check('URL preselects the requested original practice set', (await state(page)).quiz === 'physics-units' && (await state(page)).total === 11);
  check('all seven original practice sets are selectable', await page.locator('#quiz option').count() === 7);
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('prepx-afterbell-pending-v1') || '[]').length === 1);
  check('a rejected pending result does not block a later valid result', rejectedRequests === 1 && acceptedRequests === 1);
  check('an unaccepted result stays durably queued', await page.evaluate(id => JSON.parse(localStorage.getItem('prepx-afterbell-pending-v1'))[0].id === id, rejected.id));
  layout.viewport = { width: 1280, height: 720 };
  layout.name = await page.locator('#player-name').boundingBox();
  layout.start = await page.locator('#start').boundingBox();
  await page.locator('#player-name').fill('בדיקת משחק');
  await page.locator('#start').click();
  layout.begin = await page.locator('#begin-adventure').boundingBox();
  await page.locator('#begin-adventure').click();
  const before = (await state(page)).player;
  const point = await page.evaluate(() => __afterbell.world.project(2, 0, 9));
  await page.mouse.click(point.x, point.y);
  await page.evaluate(() => advanceTime(600));
  const after = (await state(page)).player;
  check('clicking visible ground walks the character without test positioning', Math.hypot(after.x - before.x, after.z - before.z) > 0.5);
  await page.evaluate(() => __afterbell.walkTo(-13, -7.2));
  await page.keyboard.press('KeyE');
  await page.locator('.social[data-choice="0"]').click();
  await page.locator('#track-equipment').click();
  await page.evaluate(() => __afterbell.walkTo(-21, -1.2));
  await page.keyboard.press('KeyE');
  await page.locator('#collect-equipment').click();
  await page.evaluate(() => __afterbell.walkTo(-13, -7.2));
  await page.keyboard.press('KeyE');
  const pendingQuestion = (await state(page)).question.id;
  await page.locator('[data-npc-chat="0"]').click();
  await page.locator('[data-chat-topic="0"]').click();
  check('optional NPC conversation responds from the question screen', !!(await page.locator('#npc-chat-reply').textContent()));
  await page.locator('#npc-help').click();
  check('optional team assistance records its own progress without answering a question', (await state(page)).environmentState.helped.includes('owl') && (await state(page)).answered === 0);
  await page.locator('#npc-back').click();
  check('returning from NPC conversation preserves the unanswered question', (await state(page)).question.id === pendingQuestion && !(await state(page)).question.locked);
  await page.locator('#close-dialog').click();
  const animalId = await page.evaluate(() => {
    const animal = JSON.parse(render_game_to_text()).animals.find(a => a.type !== 'duck' && !__afterbell.world.blocked(a.x, a.z));
    __afterbell.walkTo(animal.x, animal.z);return animal.id;
  });
  await page.keyboard.press('KeyE');
  await page.locator('#animal-follow').click();
  check('wildlife encounter records observation and enables companionship', (await state(page)).environmentState.following === animalId && (await state(page)).environmentState.animalNotes.includes(animalId));
  await page.keyboard.press('KeyE');
  await page.locator('#animal-follow').click();
  check('a companion can leave without changing the academic score', (await state(page)).environmentState.following === null && (await state(page)).score === 0 && (await state(page)).answered === 0);
  const equipmentPath = await page.evaluate(() => {
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      const direction = { x: Math.cos(angle), z: Math.sin(angle) };
      const clear = Array.from({ length: 15 }, (_, i) => 1.2 + i * .2).every(r => !__afterbell.world.blocked(21 + direction.x * r, 3 + direction.z * r));
      if (clear) { __afterbell.walkTo(21 + direction.x * 4, 3 + direction.z * 4);advanceTime(20);return __afterbell.world.project(21 + direction.x * 1.2, 0, 3 + direction.z * 1.2); }
    }
    throw new Error('Equipment lacks a clear nearby approach');
  });
  await page.mouse.click(equipmentPath.x, equipmentPath.y);
  await page.evaluate(() => advanceTime(850));
  check('the backup equipment can be reached by walking around its nearby obstacle', (await state(page)).target?.type === 'equipment' && (await state(page)).target?.i === 1);
  await page.keyboard.press('KeyE');
  check('real movement leads to the backup equipment action', await page.locator('#collect-equipment').isVisible());
  await page.locator('#close-dialog').click();
  await page.locator('#pause').click();
  await page.locator('#menu').click();
  await page.unroute('**/api/afterbell/quizzes/**');
  await page.route('**/api/afterbell/quizzes/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"id":"invalid","questions":[]}' }));
  await page.locator('#quiz').selectOption('questions');
  await ready(page);
  check('malformed live content falls back to the verified original snapshot', (await state(page)).quiz === 'questions' && (await state(page)).source === 'snapshot' && (await state(page)).total === 6);
  await context.close();

  const noGpu = await browser.newContext();
  const unavailable = await noGpu.newPage();
  await unavailable.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) { return /webgl/.test(type) ? null : original.call(this, type, ...args); };
  });
  await unavailable.route('**/api/afterbell/quizzes/**', route => route.abort());
  await unavailable.goto(base, { waitUntil: 'domcontentloaded' });
  await unavailable.waitForFunction(() => document.querySelector('#source-status').textContent.includes('לא מקוון'));
  check('WebGL failure keeps Start disabled and offers normal practice', await unavailable.locator('#start').isDisabled() && await unavailable.locator('#loading a').getAttribute('href') === 'https://hitech.agnon.online/');
  await noGpu.close();

  const production = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const built = await production.newPage();
  built.on('pageerror', error => pageErrors.push(error.message));
  await built.goto('http://127.0.0.1:4319/?test=1', { waitUntil: 'domcontentloaded' });
  await ready(built);
  check('built standalone game serves usable content', (await state(built)).total === 6);
  check('production bundle does not expose development positioning hooks', await built.evaluate(() => typeof window.__afterbell === 'undefined'));
  check('production mobile welcome has no horizontal overflow', await built.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await production.close();
  check('functional scenarios have no uncaught page errors', pageErrors.length === 0);
  await mkdir('output', { recursive: true });
  await writeFile('output/qa-functional.json', JSON.stringify({ checks, pageErrors }, null, 2));
  await writeFile('output/qa-functional-layout.json', JSON.stringify(layout, null, 2));
  console.log(JSON.stringify({ passed: checks.length, pageErrors }));
} finally { await browser.close(); }
