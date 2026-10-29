import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const base = process.env.AFTERBELL_URL || 'http://127.0.0.1:5177';
const out = 'output/playwright/mission-qa';
const routeOnly = process.env.AFTERBELL_ROUTE_ONLY === '1';
const { quizzes } = JSON.parse(await readFile(new URL('../src/content-snapshot.json', import.meta.url), 'utf8'));
const checks = [], errors = [];
const check = (name, ok) => { checks.push({ name, passed: Boolean(ok) }); assert.ok(ok, name); console.log(`PASS ${name}`); };
const state = page => page.evaluate(() => JSON.parse(render_game_to_text()));
const advance = (page, ms) => page.evaluate(ms => advanceTime(ms), ms);
const ready = page => page.waitForFunction(() => window.__afterbell && !document.querySelector('#start').disabled);
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const press = (page, selector, touch) => touch ? page.locator(selector).tap() : page.locator(selector).click();

async function start(page, touch) {
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/afterbell/quizzes/**', route => {
    const q = quizzes.find(q => route.request().url().endsWith(`/quizzes/${q.id}`));
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(q) });
  });
  await page.route('**/api/afterbell/attempts', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ saved: true, id: route.request().postDataJSON().id, score: 100 }) }));
  await page.goto(`${base}/?test=1&quiz=facts`, { waitUntil: 'domcontentloaded' });
  await ready(page);
  await page.locator('#player-name').fill('בדיקת משחק');
  await press(page, '#start', touch);
  await press(page, '#begin-adventure', touch);
  await advance(page, 16);
}

// Position only the setup. Interaction, checks, questions, and guide movement
// always go through the same controls a player uses.
async function approach(page, type, index, touch) {
  const found = await page.evaluate(({ type, index }) => {
    const s = JSON.parse(render_game_to_text());
    const point = type === 'npc' ? s.npcs[index] : type === 'equipment' ? s.equipment[index] : s.environment.find(e => e.id === index);
    for (const radius of [1.2, .8, 1.8, 2.2]) for (const [dx, dz] of [[0,1],[1,0],[-1,0],[0,-1],[.7,.7],[-.7,.7],[.7,-.7],[-.7,-.7]]) {
      const x = point.x + dx * radius, z = point.z + dz * radius;
      if (__afterbell.world.blocked(x,z)) continue;
      __afterbell.walkTo(x,z);
      const target = JSON.parse(render_game_to_text()).target;
      if (target?.type === type && (type === 'environment' ? target.id === index : target.i === index)) return true;
    }
    return false;
  }, { type, index });
  check(`${type} ${index} has a reachable action`, found);
  await press(page, '#interact', touch);
}

async function fieldCheck(page, id, touch, reload = false) {
  check(`${id} is unavailable before its field check`, await page.locator('#collect-equipment').isDisabled());
  const before = await state(page);
  // A browser click on a disabled native control must never collect the object.
  await page.locator('#collect-equipment').evaluate(button => button.click());
  check(`${id} disabled collection does not change inventory`, !(await state(page)).equipment.find(e => e.id === id).collected);
  if (id === 'antenna') {
    check('antenna starts on channel 1', (await page.locator('#radio-channel').textContent()).trim() === '1');
    await press(page, '#test-signal', touch);
    check('wrong antenna channel explains the target and stays locked', await page.locator('#collect-equipment').isDisabled() && (await page.locator('#field-status').textContent()).includes('5'));
    for (let i = 0; i < 4; i++) await press(page, '#channel-up', touch);
    check('channel 5 alone does not skip the signal test', (await page.locator('#radio-channel').textContent()).trim() === '5' && await page.locator('#collect-equipment').isDisabled());
    await press(page, '#test-signal', touch);
  } else {
    const sequence = id === 'card' ? [0,1,2] : [2,0,1];
    await press(page, `[data-operation="${sequence[0]}"]`, touch);
    await press(page, `[data-operation="${sequence[2]}"]`, touch);
    check(`${id} wrong sequence resets progress and explains retry`, (await state(page)).mission.fieldCheck.step === 0 && await page.locator('.operation-done').count() === 0 && (await page.locator('#field-status').textContent()).includes('מההתחלה'));
    check(`${id} wrong sequence cannot release equipment`, await page.locator('#collect-equipment').isDisabled());
    for (const operation of sequence) await press(page, `[data-operation="${operation}"]`, touch);
  }
  check(`${id} correct field operation releases equipment`, await page.locator('#collect-equipment').isEnabled() && (await state(page)).environmentState.checkedEquipment.includes(id));
  check(`${id} field check does not answer academic questions or alter score`, (await state(page)).answered === before.answered && (await state(page)).score === before.score);
  if (reload) {
    await page.reload({ waitUntil: 'domcontentloaded' });await ready(page);await press(page, '#resume', touch);
    check('solved but uncollected field check survives reload', (await state(page)).environmentState.checkedEquipment.includes(id) && !(await state(page)).equipment.find(e => e.id === id).collected);
    await approach(page, 'equipment', 2, touch);
    check('restored field check can be collected without repeating', await page.locator('#collect-equipment').isEnabled() && await page.locator('#test-signal').count() === 0);
  }
  await press(page, '#collect-equipment', touch);
  check(`${id} enters inventory only after collection`, (await state(page)).equipment.find(e => e.id === id).collected);
}

async function guideArrival(page, touch, label) {
  if (!(await state(page)).mission.navigation?.arrived) await press(page, '#follow-path', touch);
  for (let i = 0; i < 20 && !(await state(page)).mission.navigation?.arrived; i++) {
    await advance(page, 2000);
    check(`${label} guidance stays on collision-free ground ${i + 1}`, await page.evaluate(() => { const p = __afterbell.world.getPlayer();return !__afterbell.world.blocked(p.x,p.z); }));
  }
  const arrived = await state(page);
  check(`${label} guided walking arrives and stops`, arrived.mission.navigation?.arrived && !arrived.mission.navigation?.following);
  check(`${label} arrival offers an action without auto-answering`, arrived.mode === 'explore');
}

async function routeMatrix(page) {
  const routes = await page.evaluate(() => {
    __afterbell.walkTo(0,9);advanceTime(16);
    const s=JSON.parse(render_game_to_text()),original=s.mission.target;
    const targets=[...s.npcs.map(n=>({...n,label:`npc:${n.id}`})),...s.equipment.map(e=>({...e,label:`equipment:${e.id}`})),...s.environment.filter(e=>['water','locker','solar','basketball','telescope'].includes(e.id)).map(e=>({...e,label:`side:${e.id}`}))];
    const results=targets.map(goal=>{
      __afterbell.world.guideTo(goal.x,goal.z);const nav=__afterbell.world.guidance();
      const route=[{x:0,z:9},...nav.route];let collisionFree=true;
      for(let i=1;i<route.length;i++){
        const a=route[i-1],b=route[i],steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.1));
        for(let step=0;step<=steps;step++)if(__afterbell.world.blocked(a.x+(b.x-a.x)*step/steps,a.z+(b.z-a.z)*step/steps))collisionFree=false;
      }
      return {label:goal.label,blocked:nav.blocked,points:nav.route.length,endpointDistance:nav.endpoint?Math.hypot(nav.endpoint.x-goal.x,nav.endpoint.z-goal.z):Infinity,collisionFree};
    });
    __afterbell.world.guideTo(original.x,original.z);return results;
  });
  check('route matrix includes three stations, three pieces of equipment, and five side quests',routes.length===11);
  for(const route of routes){
    check(`${route.label} has an available actual-world route`,!route.blocked&&route.points>0);
    check(`${route.label} route ends in interaction range`,route.endpointDistance<=1.8);
    check(`${route.label} route segments remain clear at 0.1-unit samples`,route.collisionFree);
  }
  check('route matrix restores the selected main destination',(await state(page)).mission.navigation.goal.x===(await state(page)).mission.target.x&&(await state(page)).mission.navigation.goal.z===(await state(page)).mission.target.z);
}

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl'] });
try {
  if(routeOnly){
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),page=await context.newPage();
    await start(page,true);await routeMatrix(page);await context.close();
    check('actual-world route matrix has no uncaught page errors',errors.length===0);
  }else{
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await mobile.newPage();
  await start(page, true);
  check('initial mission selects nearby Adam', (await state(page)).mission.objective.id === 'raccoon:meet' && (await page.locator('#objective').textContent()).includes('אדם'));
  check('mobile mission controls have 44px targets', await page.locator('.mission-controls button').evaluateAll(buttons => buttons.every(b => { const r=b.getBoundingClientRect();return r.width>=44 && r.height>=44; })));
  const initial = await state(page);
  await press(page, '#mission-hint', true);
  check('initial hint explains the next action without teleporting', distance(initial.player,(await state(page)).player)<.01 && (await state(page)).answered===0);
  await press(page, '#hint-return', true);
  await press(page, '#follow-path', true);await advance(page, 600);
  const walking = await state(page);
  check('mobile guide begins real movement without teleporting', walking.mission.navigation?.following && distance(initial.player,walking.player)>.3 && distance(initial.player,walking.player)<4);
  const cdp = await mobile.newCDPSession(page), stick = await page.locator('#joystick').boundingBox();
  const x=stick.x+stick.width/2,y=stick.y+stick.height/2;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+28,y}]});await advance(page,250);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  check('real joystick input cancels guided walking', !(await state(page)).mission.navigation?.following);
  await guideArrival(page,true,'Adam');
  await press(page,'#follow-path',true);
  check('arrival action opens Adam conversation', (await state(page)).mode==='dialogue' && await page.locator('.social').count()===3);
  await press(page,'.social[data-choice="0"]',true);
  await press(page,'#track-equipment',true);
  check('understanding Adam changes objective to the antenna', (await state(page)).mission.objective.id==='antenna:find');

  for(const [index,id] of [[2,'antenna'],[1,'fuse'],[0,'card']]) {
    if(index!==2){await approach(page,'npc',index,true);await press(page,'.social[data-choice="0"]',true);await press(page,'#track-equipment',true);}
    check(`${id} objective directs the missing equipment`, (await state(page)).mission.objective.kind==='equipment' && (await state(page)).mission.objective.index===index);
    await approach(page,'equipment',index,true);await fieldCheck(page,id,true,id==='antenna');
    check(`${id} collection directs return to its station`, (await state(page)).mission.objective.kind==='npc' && (await state(page)).mission.objective.id.endsWith(':return') && (await state(page)).mission.objective.index===index);
    await approach(page,'npc',index,true);
    if(index===2){
      const beforeHint=await state(page),questionId=beforeHint.question.id;
      await press(page,'#close-dialog',true);await press(page,'#mission-hint',true);
      check('station hint preserves position, unanswered work, and score', distance(beforeHint.player,(await state(page)).player)<.01 && (await state(page)).answered===beforeHint.answered && (await state(page)).score===beforeHint.score);
      await press(page,'#hint-return',true);await press(page,'#interact',true);
      check('returning from a hint keeps the same pending question', (await state(page)).question.id===questionId && !(await state(page)).question.locked);
    }
    while((await state(page)).mode==='question'){
      const choice=await page.evaluate(()=>{const s=JSON.parse(render_game_to_text());return __afterbell.round().questions.find(q=>q.id===s.question.id).correct;});
      await press(page,`.answer[data-choice="${choice}"]`,true);
      await page.waitForFunction(()=>JSON.parse(render_game_to_text()).mode!=='feedback');
    }
    check(`station ${index} completes only after its questions`,(await state(page)).npcs[index].sealed);
    await press(page,'#continue-world',true);
    check(`station ${index} advances the main objective`,(await state(page)).mission.objective.id===(index===2?'pigeon:meet':index===1?'owl:meet':'exit'));
  }
  const mainComplete=await state(page);
  check('all field checks and academic work unlock exit',mainComplete.exit.open && mainComplete.answered===6 && mainComplete.score===100 && mainComplete.environmentState.checkedEquipment.length===3);
  for(const id of ['water','locker','solar','basketball','telescope']){
    await press(page,'#side-task',true);
    check(`${id} is among five selectable side missions`,await page.locator('[data-side-mission]').count()===5);
    await press(page,`[data-side-mission="${id}"]`,true);
    check(`${id} selection changes route without changing the main goal`,(await state(page)).mission.target.id===id && (await state(page)).mission.objective.id==='exit');
    await press(page,'#mission-hint',true);await press(page,'#hint-main',true);
    check(`${id} can return to the main route`,(await state(page)).mission.target.id==='exit');
    await press(page,'#side-task',true);await press(page,`[data-side-mission="${id}"]`,true);
    await approach(page,'environment',id,true);
    if(id==='solar'){await press(page,'[data-env-switch="0"]',true);await press(page,'[data-env-switch="2"]',true);await press(page,'#env-leave',true);}
    else if(id==='basketball'){
      for(let shot=0;shot<3;shot++){if(shot)await approach(page,'environment',id,true);await press(page,'#env-primary',true);await advance(page,2400);}
    }else{await press(page,'#env-primary',true);if(id==='locker')await press(page,'#close-dialog',true);if(id==='telescope')await press(page,'#interact',true);}
    await page.waitForFunction(()=>JSON.parse(render_game_to_text()).mission.target.id==='exit');
    check(`${id} completion returns to main route and leaves academics unchanged`,(await state(page)).answered===mainComplete.answered && (await state(page)).score===mainComplete.score && (await state(page)).exit.open);
  }
  check('all five side quests are independently completed',(await state(page)).mission.sideCompleted===5);
  await page.reload({waitUntil:'domcontentloaded'});await ready(page);await press(page,'#resume',true);
  check('reload retains all completed field checks and side missions',(await state(page)).environmentState.checkedEquipment.length===3 && (await state(page)).mission.sideCompleted===5 && (await state(page)).mission.objective.id==='exit');
  await guideArrival(page,true,'Exit');await press(page,'#follow-path',true);
  check('guided exit action completes the adventure',(await state(page)).mode==='complete');
  await page.screenshot({path:`${out}/mobile-complete.png`,animations:'disabled'});
  await mobile.close();

  const desktop=await browser.newContext({viewport:{width:1280,height:720}}),d=await desktop.newPage();
  await start(d,false);const desktopStart=await state(d);
  check('desktop selects the same clear initial objective',desktopStart.mission.objective.id==='raccoon:meet');
  await press(d,'#follow-path',false);await advance(d,600);await d.keyboard.down('ArrowRight');await advance(d,200);await d.keyboard.up('ArrowRight');
  check('desktop keyboard input cancels guided walking',!(await state(d)).mission.navigation?.following && distance(desktopStart.player,(await state(d)).player)>.3);
  await press(d,'#mission-hint',false);await press(d,'#hint-return',false);
  check('desktop hint returns to the same main task',(await state(d)).mission.objective.id==='raccoon:meet' && (await state(d)).answered===0);
  check('desktop mission interface has no horizontal overflow',await d.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await d.screenshot({path:`${out}/desktop-guidance.png`,animations:'disabled'});await desktop.close();
  check('mission scenarios have no uncaught page errors',errors.length===0);
  }
} finally {
  await mkdir(out,{recursive:true});
  await writeFile(`${out}/${routeOnly?'route-report':'report'}.json`,JSON.stringify({checks,errors},null,2));
  await browser.close();
}
