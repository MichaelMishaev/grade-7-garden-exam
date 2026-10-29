import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.AFTERBELL_URL || 'http://127.0.0.1:5177';
const out = 'output/playwright/mobile-qa';
await mkdir(out, { recursive: true });
const checks = [], failures = [], errors = [], screenshots = [];
const check = (name, ok, detail = null) => {
  const result = { name, passed: Boolean(ok), ...(detail ? { detail } : {}) };
  checks.push(result);
  if (!ok) failures.push(result);
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
};
const state = page => page.evaluate(() => JSON.parse(render_game_to_text()));
const ready = page => page.waitForFunction(() => window.__afterbell && !document.getElementById('start').disabled, { timeout: 30000 });
const advance = (page, ms = 0) => page.evaluate(ms => advanceTime(ms), ms);
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const noOverflow = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
const rectFits = (page, selector) => page.locator(selector).evaluate(el => {
  const r = el.getBoundingClientRect();
  return r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1;
});
async function shot(page, name) {
  await advance(page, 16);
  await page.waitForTimeout(120); // Allow the HUD's 80 ms projection/interaction update to settle.
  const path = `${out}/${name}.png`;
  await page.screenshot({ path, animations: 'disabled', timeout: 15000 });
  screenshots.push(path);
}
async function targets(page, selector, label) {
  const undersized = await page.locator(selector).evaluateAll(elements => elements
    .filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden')
    .map(el => ({ id: el.id || el.className || el.tagName, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width < 43.5 || r.height < 43.5)
    .map(({ id, r }) => ({ id, width: r.width, height: r.height })));
  check(label, undersized.length === 0, undersized.length ? undersized : null);
}
async function touchDrag(page, cdp, dx, dy, cancel = false) {
  const r = await page.locator('#joystick').boundingBox(), x = r.x + r.width / 2, y = r.y + r.height / 2;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx, y: y + dy }] });
  await advance(page, 700);
  await cdp.send('Input.dispatchTouchEvent', { type: cancel ? 'touchCancel' : 'touchEnd', touchPoints: [] });
}
async function missionControls(page, size, cdp) {
  await page.waitForTimeout(120);
  const layout=await page.evaluate(()=>{
    const box=id=>{const r=document.querySelector(id).getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom};};
    return {hud:box('.quest-panel'),journal:box('#journal'),map:box('#map-toggle')};
  });
  check(`${size} journal and map stay below the expanded HUD`,layout.journal.y>=layout.hud.bottom+8&&layout.map.y>=layout.hud.bottom+8);
  check(`${size} journal and map do not overlap`,layout.map.right<=layout.journal.x||layout.journal.right<=layout.map.x);
  check(`${size} journal aligns with map`,Math.abs(layout.journal.y-layout.map.y)<3);
  const initial=await state(page);
  check(`${size} objective identifies the next person or action`,await page.locator('#objective').textContent()===initial.mission.objective.title&&initial.mission.objective.title!=='מחזירים 3 מערכות לפעולה');
  check(`${size} objective hint is visible`,await page.locator('#quest-sub').isVisible()&&!!await page.locator('#quest-sub').textContent());
  await targets(page,'.mission-controls button',`${size} mission controls have 44px touch targets`);
  await page.locator('#mission-hint').tap();
  check(`${size} hint dialog opens and fits`,(await state(page)).mode==='hint'&&await rectFits(page,'#dialog'));
  await targets(page,'#dialog button',`${size} hint dialog targets are 44px`);
  await shot(page,`mission-hint-${size}`);
  await page.locator('#hint-return').tap();
  check(`${size} hint returns to exploration`,(await state(page)).mode==='explore');
  await page.locator('#side-task').tap();
  check(`${size} five side quests are available`,await page.locator('[data-side-mission]').count()===5);
  check(`${size} side quest list fits viewport`,await rectFits(page,'#dialog'));
  await targets(page,'#dialog button',`${size} side quest targets are 44px`);
  await shot(page,`side-quests-${size}`);
  await page.locator('[data-side-mission="water"]').tap();
  check(`${size} side quest updates the destination`,(await state(page)).mission.target.id==='water');
  await page.locator('#mission-hint').tap();await page.locator('#hint-main').tap();
  const restored=await state(page);
  check(`${size} hint can restore the main objective`,restored.mission.target.id===restored.mission.objective.id);
  await shot(page,`mission-hud-${size}`);
  if(cdp){
    const before=(await state(page)).player;
    await page.locator('#follow-path').tap();await advance(page,600);
    check(`${size} touch guide starts walking along the route`,(await state(page)).mission.navigation.following&&distance(before,(await state(page)).player)>1);
    await shot(page,`guided-walk-${size}`);
    await touchDrag(page,cdp,32,0);
    check(`${size} manual joystick cancels guide`,!(await state(page)).mission.navigation.following);
    const manual=(await state(page)).player;await advance(page,500);
    check(`${size} movement stays stopped after manual override release`,distance(manual,(await state(page)).player)<.01);
    await page.evaluate(()=>__afterbell.walkTo(0,9));await advance(page,16);
  }
}
async function solveFieldCheck(page) {
  if(!await page.locator('#collect-equipment').isDisabled())return;
  const id=(await state(page)).mission.fieldCheck.id;
  check(`equipment ${id} remains locked before its check`,await page.locator('#collect-equipment').isDisabled());
  check(`equipment ${id} puzzle fits viewport`,await rectFits(page,'#dialog')&&await page.locator('#dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
  await targets(page,'#dialog button',`equipment ${id} puzzle targets are 44px`);
  await shot(page,`field-check-${id}-${page.viewportSize().width}`);
  if(id==='antenna'){
    await page.locator('#test-signal').tap();
    check('wrong antenna channel keeps collection locked',await page.locator('#collect-equipment').isDisabled());
    await page.locator('#channel-down').tap();
    check('antenna lower channel bound is one',await page.locator('#radio-channel').textContent()==='1');
    for(let i=0;i<4;i++)await page.locator('#channel-up').tap();
    check('touch tuner reaches the indicated channel',await page.locator('#radio-channel').textContent()==='5');
    await page.locator('#test-signal').tap();
  }else{
    await page.locator(`[data-operation="${id==='card'?2:0}"]`).tap();
    check(`wrong ${id} pattern keeps collection locked`,await page.locator('#collect-equipment').isDisabled()&&(await state(page)).mission.fieldCheck.step===0);
    for(const n of id==='card'?[0,1,2]:[2,0,1])await page.locator(`[data-operation="${n}"]`).tap();
  }
  check(`equipment ${id} unlocks after touch puzzle solution`,!await page.locator('#collect-equipment').isDisabled()&&(await state(page)).environmentState.checkedEquipment.includes(id));
}
async function positionEnvironment(page, id) {
  return page.evaluate(id => {
      const e = JSON.parse(render_game_to_text()).environment.find(x => x.id === id);
      for (const [dx,dz] of [[0,1.8],[0,.5],[1.7,0],[-1.7,0],[0,-1.7],[0,0]]) {
        if (__afterbell.world.blocked(e.x+dx,e.z+dz)) continue;
        __afterbell.walkTo(e.x+dx,e.z+dz);
        const target=JSON.parse(render_game_to_text()).target;
        if (target?.type === 'environment' && target.id === id) return true;
      }
      return false;
  }, id);
}
async function approach(page, type, index) {
  const positioned = await page.evaluate(({ type, index }) => {
    const s = JSON.parse(render_game_to_text());
    const n = type === 'npc' ? s.npcs[index] : s.equipment[index];
    for (const [dx, dz] of [[0, 1.8], [1.7, 0], [-1.7, 0], [0, -1.8]]) {
      if (!__afterbell.world.blocked(n.x + dx, n.z + dz)) {
        __afterbell.walkTo(n.x + dx, n.z + dz);
        return JSON.parse(render_game_to_text()).target?.type === type;
      }
    }
    return false;
  }, { type, index });
  check(`${type} ${index + 1} has a reachable interaction point`, positioned);
  await page.locator('#interact').tap();
}
async function station(page, index) {
  await approach(page, 'npc', index);
  if (await page.locator('.social').count()) await page.locator('.social[data-choice="0"]').tap();
  if (await page.locator('#track-equipment').count()) {
    check(`station ${index + 1} waits for equipment`, !(await state(page)).question);
    await page.locator('#track-equipment').tap();
    await approach(page, 'equipment', index);
    await solveFieldCheck(page);await page.locator('#collect-equipment').tap();
    check(`equipment ${index + 1} collected by touch`, (await state(page)).equipment[index].collected);
    await approach(page, 'npc', index);
  }
  if (await page.locator('#begin-questions').count()) await page.locator('#begin-questions').tap();
}
function watch(page) {
  page.on('pageerror', e => errors.push({ kind: 'pageerror', message: e.message }));
  page.on('console', m => { if (m.type() === 'error' && !m.text().includes('Failed to load resource')) errors.push({ kind: 'console', message: m.text() }); });
}
async function start(page, viewport) {
  await page.goto(base + '/?test=1&quiz=facts', { waitUntil: 'domcontentloaded' });
  await ready(page); await advance(page);
  check(`${viewport} uses Hebrew RTL`, await page.evaluate(() => document.documentElement.lang === 'he' && document.documentElement.dir === 'rtl'));
  check(`${viewport} source fallback is explicit`, (await state(page)).source === 'snapshot' && (await page.locator('#source-status').textContent()).includes('לא מקוון'));
  check(`${viewport} welcome has no horizontal overflow`, await noOverflow(page));
  await page.locator('#start').tap();
  check(`${viewport} name is required`, (await state(page)).mode === 'menu');
  await targets(page, '#welcome button, #welcome input, #welcome select, .topbar button, .topbar a', `${viewport} welcome touch targets are at least 44px`);
  await page.locator('#welcome').evaluate(el => el.scrollTop = 0);
  await shot(page, `welcome-${viewport}`);
  await page.locator('#player-name').fill('בדיקת מגע');
  await page.locator('#start').tap();
  check(`${viewport} tutorial fits the screen`, await rectFits(page, '#dialog'));
  await page.locator('#begin-adventure').tap(); await advance(page);
}

const browser = await chromium.launch({ headless: true, args: ['--enable-webgl'] });
try {
  if (process.env.QA_MOBILE_PUZZLES_ONLY === '1') {
    const context=await browser.newContext({viewport:{width:360,height:780},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
    const page=await context.newPage();watch(page);
    await page.route('**/api/afterbell/quizzes/**',route=>route.abort());
    await start(page,'360x780-puzzles');
    for(const index of [0,1,2]){
      await approach(page,'equipment',index);await solveFieldCheck(page);
      await page.locator('#collect-equipment').tap();
      check(`360px equipment ${index+1} collects after touch solution`,(await state(page)).equipment[index].collected);
    }
    check('360px all three equipment checks are saved',(await state(page)).environmentState.checkedEquipment.length===3);
    check('360px puzzle run has no browser errors',errors.length===0,errors);
    await context.close();
  } else if (process.env.QA_MOBILE_VISUAL_ONLY === '1') {
    for (const viewport of [{width:390,height:844},{width:360,height:780}]) {
      const size=`${viewport.width}x${viewport.height}`;
      const context=await browser.newContext({viewport,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
      const page=await context.newPage();watch(page);
      await page.route('**/api/afterbell/quizzes/**',route=>route.abort());
      await page.goto(base+'/?test=1&quiz=facts',{waitUntil:'domcontentloaded'});await ready(page);await advance(page);
      await shot(page,`welcome-final-${size}`);
      await page.locator('#player-name').fill('בדיקת מגע');await page.locator('#start').tap();await page.locator('#begin-adventure').tap();await advance(page);
      check(`${size} final gameplay has no horizontal overflow`,await noOverflow(page));
      check(`${size} final HUD fits viewport`,await rectFits(page,'.quest-panel'));
      const journal=await page.locator('#journal').boundingBox(),map=await page.locator('#map-toggle').boundingBox();
      check(`${size} journal aligns with map toggle`,Math.abs(journal.y-map.y)<3);
      check(`${size} compact HUD remains unobstructed to input`,await page.locator('.quest-panel').evaluate(el=>{
        const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.left+r.width/2,r.top+20));
      }));
      await targets(page,'#hud button, .topbar button, #joystick',`${size} final touch targets are at least 44px`);
      await page.locator('#map-toggle').tap();check(`${size} map opens and fits`,await page.locator('.map-panel').isVisible()&&await rectFits(page,'.map-panel'));
      await shot(page,`map-final-${size}`);await page.locator('#map-toggle').tap();
      await page.locator('#journal').tap();check(`${size} repositioned journal remains usable`,(await state(page)).mode==='journal');await page.locator('#close-dialog').tap();
      await page.locator('#jump').tap();await advance(page,140);check(`${size} touch jump remains usable`,(await state(page)).player.y>0);await advance(page,1000);
      await page.waitForTimeout(3400);await advance(page,0);
      await shot(page,`exploration-final-${size}`);
      if (viewport.width === 390) {
        await page.evaluate(()=>__afterbell.walkTo(-8,18.5));await advance(page,16);
        await page.locator('#interact').tap();await page.locator('#env-primary').tap();await advance(page,16);
        check('observation camera is active after a rendered frame',(await state(page)).observing);
        await shot(page,'environment-observation-final-390x844');
        await page.locator('#interact').tap();
      }
      await context.close();
    }
    check('no uncaught errors during visual regression',errors.length===0,errors);
  } else {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage(); watch(page);
  await page.route('**/api/afterbell/quizzes/**', route => route.abort());
  let completedSave = false;
  page.on('response', async response => {
    if (response.url().endsWith('/api/afterbell/attempts') && response.request().method() === 'POST') {
      try { completedSave ||= response.ok() && (await response.json()).saved === true; } catch {}
    }
  });
  await start(page, '390x844');
  check('390px gameplay has no horizontal overflow', await noOverflow(page));
  check('390px HUD objective is visible', await page.locator('#objective').isVisible() && await rectFits(page, '.quest-panel'));
  check('reduced motion preference reaches CSS', await page.locator('.vignette').evaluate(el => getComputedStyle(el).transitionDuration === '0s'));
  await targets(page, '#hud button, .topbar button, #joystick', '390px gameplay touch targets are at least 44px');
  const cdp = await context.newCDPSession(page);
  await missionControls(page,'390x844',cdp);
  const before = (await state(page)).player;
  await touchDrag(page, cdp, 32, 0);
  const afterRelease = (await state(page)).player;
  check('real touch joystick drag moves player', distance(before, afterRelease) > 1);
  await advance(page, 600);
  check('touch release stops movement', distance(afterRelease, (await state(page)).player) < 0.01);
  const beforeCancel = (await state(page)).player;
  await touchDrag(page, cdp, -32, 0, true);
  const afterCancel = (await state(page)).player;
  check('touch cancel path had active movement', distance(beforeCancel, afterCancel) > 1);
  await advance(page, 600);
  check('touch cancel stops movement', distance(afterCancel, (await state(page)).player) < 0.01);
  check('joystick visually recenters', await page.locator('#stick').evaluate(el => el.style.transform === ''));
  await page.locator('#jump').tap(); await advance(page, 140);
  check('touch jump lifts the player', (await state(page)).player.y > 0);
  await advance(page, 1000);
  check('touch jump lands', (await state(page)).player.y === 0);
  await page.locator('#pause').tap();
  const paused = await state(page); await advance(page, 1000);
  check('touch pause freezes player and wildlife', paused.mode === 'paused' && JSON.stringify(paused.animals) === JSON.stringify((await state(page)).animals));
  await page.locator('#show-controls').tap();
  check('guide opens and fits mobile', await rectFits(page, '#dialog'));
  await targets(page, '#dialog button', 'guide controls have 44px targets');
  await page.locator('#got-it').tap();
  check('guide resumes exploration', (await state(page)).mode === 'explore');
  await page.locator('#journal').tap();
  check('journal fits mobile', await rectFits(page, '#dialog'));
  check('journal can scroll content', await page.locator('#dialog').evaluate(el => { el.scrollTop = el.scrollHeight; return el.scrollTop > 0 || el.scrollHeight <= el.clientHeight; }));
  await page.locator('#close-dialog').tap();
  check('dialog close restores focus and exploration', (await state(page)).mode === 'explore' && await page.locator('#journal').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Escape');
  check('mobile keyboard Escape can pause', (await state(page)).mode === 'paused');
  await page.keyboard.press('Escape');
  check('mobile keyboard Escape closes pause', (await state(page)).mode === 'explore');
  await shot(page, 'exploration-390x844');

  if (await page.locator('#map-toggle').count()) {
    await page.locator('#map-toggle').tap();
    check('mobile map toggle opens map', await page.locator('.map-panel').isVisible());
    check('opened map fits mobile viewport', await rectFits(page, '.map-panel'));
    await shot(page, 'map-390x844');
    await page.locator('#map-toggle').tap();
    check('mobile map toggle closes map', !await page.locator('.map-panel').isVisible());
  }

  const envChecks = {
    bench: s => s.seated,
    door: s => s.doorOpen,
    lamp: s => !s.lampOn,
    basketball: s => s.shots === 1,
    locker: s => s.lockerOpen,
    noticeboard: s => s.visited.includes('noticeboard'),
    telescope: s => s.observations === 1,
    water: s => s.waterFilled,
    planter: s => s.watered,
    recycling: s => s.recycled,
    solar: s => s.switches[0] && !s.switches[1] && s.switches[2],
    bike: s => s.bells === 1,
  };
  const environment = (await state(page)).environment;
  check('twelve optional environment activities are available', environment.length === 12);
  for (const item of environment) {
    const reached = await positionEnvironment(page, item.id);
    check(`environment ${item.id} has reachable touch action`, reached);
    if (!reached) continue;
    await page.locator('#interact').tap();
    check(`environment ${item.id} dialog fits mobile`, await rectFits(page, '#dialog'));
    await targets(page, '#dialog button', `environment ${item.id} touch targets are 44px`);
    if (item.id === 'solar') {
      await page.locator('[data-env-switch="0"]').tap();
      await page.locator('[data-env-switch="2"]').tap();
      await shot(page, 'environment-solar-390x844');
      await page.locator('#env-leave').tap();
    } else {
      await page.locator('#env-primary').tap();
    }
    check(`environment ${item.id} changes its state`, envChecks[item.id]((await state(page)).environmentState));
    if (item.id === 'bench') {
      const seated=(await state(page)).player;
      await touchDrag(page, cdp, 32, 0);
      check('joystick stands up and resumes movement from bench', !(await state(page)).environmentState.seated && distance(seated,(await state(page)).player) > .5);
      await page.evaluate(() => __afterbell.walkTo(-6,11.8));
      await page.locator('#interact').tap(); await page.locator('#env-primary').tap();
      await page.locator('#interact').tap(); await page.locator('#env-primary').tap();
      check('bench stand button leaves player outside collision', !(await state(page)).environmentState.seated && await page.evaluate(() => {const p=__afterbell.world.getPlayer();return !__afterbell.world.blocked(p.x,p.z);}));
      const stood=(await state(page)).player; await touchDrag(page,cdp,32,0);
      check('movement works after explicit bench stand', distance(stood,(await state(page)).player) > 1);
    }
    if (item.id === 'door') check('opened door changes physical collision', await page.evaluate(() => !__afterbell.world.blocked(-2,-16.86)));
    if (item.id === 'basketball') {
      check('basketball starts physical flight', (await state(page)).environmentAnimation.basketballInFlight);
      await advance(page, 2300);
      check('basketball returns for another shot', !(await state(page)).environmentAnimation.basketballInFlight);
    }
    if (item.id === 'locker') {
      check('open locker reveals readable clue', (await state(page)).mode === 'environment' && (await page.locator('.dialog-copy').textContent()).includes('האנטנה'));
      await page.locator('#close-dialog').tap();
    }
    if (item.id === 'telescope') {
      check('telescope enters observation mode', (await state(page)).observing);
      await shot(page, 'environment-observation-390x844');
      await page.locator('#interact').tap();
      check('touch exits observation and restores exploration', !(await state(page)).observing && (await state(page)).mode === 'explore');
    }
    if (item.id === 'bike') {
      check('bike bell visibly animates', (await state(page)).environmentAnimation.bellRinging);
      await advance(page,1500);
      check('bike bell animation completes', !(await state(page)).environmentAnimation.bellRinging);
    }
    check(`environment ${item.id} resumes world`, (await state(page)).mode === 'explore');
  }
  await page.locator('#side-task').tap();
  check('four side quests complete through environment activities',await page.locator('.side-mission.side-done').count()===4);
  await page.locator('[data-side-mission="basketball"]').tap();
  for(let i=0;i<2;i++){
    check(`basketball repeat ${i+1} has a reachable selected target`,await positionEnvironment(page,'basketball'));
    await advance(page,16);await page.waitForTimeout(120);
    check(`basketball repeat ${i+1} selected goal owns the action`,(await state(page)).target?.type==='environment'&&(await state(page)).target?.id==='basketball');
    await page.locator('#interact').tap();await page.locator('#env-primary[data-environment="basketball"]').tap();await advance(page,2300);
  }
  await page.waitForTimeout(120);
  check('third basketball shot completes fifth side quest',(await state(page)).mission.sideCompleted===5);
  await page.locator('#side-task').tap();
  check('all five side quests show completed',await page.locator('.side-mission.side-done').count()===5);
  await shot(page,'side-quests-complete-390x844');await page.locator('#side-main').tap();
  check('all twelve discoveries are recorded', (await state(page)).environmentState.visited.length === 12);
  check('optional exploration does not answer questions or inflate score', (await state(page)).answered === 0 && (await state(page)).score === 0);
  const environmentBefore = (await state(page)).environmentState;
  await page.reload({waitUntil:'domcontentloaded'}); await ready(page);
  await page.locator('#resume').tap(); await advance(page);
  check('environment progress persists on mobile reload', JSON.stringify(environmentBefore) === JSON.stringify((await state(page)).environmentState));
  await page.locator('#journal').tap();
  await page.locator('[data-track-environment="basketball"]').tap();
  check('journal can guide to environment activity', (await state(page)).mode === 'explore' && await page.locator('.map-panel').isVisible());
  await page.locator('#map-toggle').tap();

  await station(page, 0);
  check('question dialog fits mobile', await rectFits(page, '#dialog'));
  await targets(page, '#dialog button, #dialog a', 'question targets are at least 44px');
  await shot(page, 'question-390x844');
  const firstChoice = await page.locator('.answer').first().getAttribute('data-choice');
  await page.locator('.answer').first().tap();
  await page.locator('#hold-feedback').tap();
  check('touch answer locks every choice', (await state(page)).question.locked && await page.locator('.answer').evaluateAll(xs => xs.every(x => x.disabled)));
  const orderBefore = await page.evaluate(() => __afterbell.round().questions.map(q => ({ id: q.id, order: q.options.map(o => o.original) })));
  const stateBefore = await state(page);
  await page.reload({ waitUntil: 'domcontentloaded' }); await ready(page);
  await page.locator('#resume').tap(); await advance(page);
  check('mobile reload restores answers and equipment', (await state(page)).answered === stateBefore.answered && (await state(page)).equipment[0].collected);
  check('mobile reload retains shuffled order', JSON.stringify(orderBefore) === await page.evaluate(() => JSON.stringify(__afterbell.round().questions.map(q => ({ id: q.id, order: q.options.map(o => o.original) })))));
  await page.locator('#journal').tap();
  await page.locator('details summary').first().tap();
  check('mobile journal review is read-only', await page.locator('.review-item').count() === 1 && await page.locator('#dialog-body input, #dialog-body .answer').count() === 0);
  await page.locator('#close-dialog').tap();
  for (const index of [2, 0, 1]) {
    await station(page, index);
    while ((await state(page)).mode === 'question') {
      const correct = await page.evaluate(() => { const s = JSON.parse(render_game_to_text()); return __afterbell.round().questions.find(q => q.id === s.question.id).correct; });
      await page.locator(`.answer[data-choice="${correct}"]`).tap();
      await page.waitForFunction(() => JSON.parse(render_game_to_text()).mode !== 'feedback');
    }
    check(`mobile station ${index + 1} completed`, (await state(page)).npcs[index].sealed);
    await page.locator('#continue-world').tap();
  }
  check('mobile complete round unlocks exit', (await state(page)).exit.open && (await state(page)).answered === (await state(page)).total);
  await page.evaluate(() => __afterbell.walkTo(3, -24.5));
  await page.locator('#interact').tap();
  await page.waitForFunction(() => document.getElementById('save-status')?.textContent.includes('✓'));
  check('mobile completion saves actual local history', completedSave && (await state(page)).mode === 'complete');
  check('completion fits mobile viewport', await rectFits(page, '#dialog'));
  check('best score saved after full round', await page.evaluate(() => Number(localStorage.getItem('prepx-best-facts')) === JSON.parse(render_game_to_text()).score));
  await shot(page, 'complete-390x844');
  await page.locator('#review-results').tap();
  check('completion review contains full round', await page.locator('#final-review .review-item').count() === (await state(page)).total);
  await page.locator('#replay').tap();
  check('replay returns to clean start', (await state(page)).mode === 'menu' && await page.evaluate(() => sessionStorage.getItem('prepx-afterbell-draft-v1') === null));
  await context.close();

  const small = await browser.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const compact = await small.newPage(); watch(compact);
  await compact.route('**/api/afterbell/quizzes/**', route => route.abort());
  await start(compact, '360x780');
  await missionControls(compact,'360x780',await small.newCDPSession(compact));
  check('360px gameplay has no horizontal overflow', await noOverflow(compact));
  check('360px HUD fits viewport', await rectFits(compact, '.quest-panel'));
  await targets(compact, '#hud button, .topbar button, #joystick', '360px gameplay targets are at least 44px');
  await shot(compact, 'exploration-360x780');
  await station(compact, 1);
  check('360px question has no horizontal overflow', await noOverflow(compact));
  check('360px question dialog fits', await rectFits(compact, '#dialog'));
  await targets(compact, '#dialog button, #dialog a', '360px question targets are at least 44px');
  await shot(compact, 'question-360x780');
  await small.close();
  check('no uncaught browser errors', errors.length === 0, errors);
  }
} catch (error) {
  failures.push({ name: 'QA execution', passed: false, error: error.message });
  console.error('QA execution failed: ' + error.message);
} finally {
  await browser.close();
  await writeFile(`${out}/${process.env.QA_MOBILE_PUZZLES_ONLY === '1' ? 'puzzle-report' : process.env.QA_MOBILE_VISUAL_ONLY === '1' ? 'visual-report' : 'report'}.json`, JSON.stringify({ checks, failures, errors, screenshots }, null, 2));
}
console.log(JSON.stringify({ passed: checks.filter(x => x.passed).length, failures, errors, report: `${out}/${process.env.QA_MOBILE_PUZZLES_ONLY === '1' ? 'puzzle-report' : process.env.QA_MOBILE_VISUAL_ONLY === '1' ? 'visual-report' : 'report'}.json` }, null, 2));
if (failures.length) process.exitCode = 1;
