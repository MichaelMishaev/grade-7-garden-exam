import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base='http://127.0.0.1:5177';
await mkdir('output',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl']});
const errors=[],checks=[];
const state=p=>p.evaluate(()=>JSON.parse(window.render_game_to_text()));
const check=(name,condition)=>{assert.ok(condition,name);checks.push(name);console.log('PASS '+name);};
const ready=page=>page.waitForFunction(()=>window.render_game_to_text&&!document.getElementById('start').disabled);
const shot=async(page,name)=>{await page.evaluate(()=>advanceTime(0));await page.screenshot({path:`output/${name}.png`});};
async function approach(page,type,index){
  await page.evaluate(({type,index})=>{
    const s=JSON.parse(render_game_to_text()),n=type==='npc'?s.npcs[index]:s.equipment[index];
    // Campus props can block a fixed approach point, and wildlife can stand
    // nearby. Choose reachable ground where the requested object is nearest.
    for(const radius of [1.2,.8,1.8,2.2])for(const [dx,dz]of [[0,1],[1,0],[-1,0],[0,-1],[.7,.7],[-.7,.7]]){
      const x=n.x+dx*radius,z=n.z+dz*radius;if(__afterbell.world.blocked(x,z))continue;
      __afterbell.walkTo(x,z);const target=JSON.parse(render_game_to_text()).target;
      if(target?.type===type&&target.i===index)return;
    }
    throw new Error(`No reachable approach for ${type} ${index}`);
  },{type,index});
  await page.keyboard.press('KeyE');
}
async function station(page,index){
  await approach(page,'npc',index);
  if(await page.locator('.social').count())await page.locator('.social[data-choice="0"]').click();
  if(await page.locator('#track-equipment').count()){
    check(`station ${index+1} requires its equipment`,!(await state(page)).question);
    await page.locator('#track-equipment').click();await approach(page,'equipment',index);
    await page.locator('#collect-equipment').click();
    check(`equipment ${index+1} is collected`,(await state(page)).equipment[index].collected);
    await approach(page,'npc',index);
  }
  if(await page.locator('#begin-questions').count())await page.locator('#begin-questions').click();
}
function captureErrors(page){
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!m.location().url.includes('/api/'))errors.push(m.text());});
}
try {
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();captureErrors(page);
  await page.goto(base+'/?test=1',{waitUntil:'domcontentloaded'});await ready(page);
  await shot(page,'welcome-desktop');
  await page.locator('#start').click();check('name is required',(await state(page)).mode==='menu');
  await page.locator('#player-name').fill('בדיקת משחק');await page.locator('#start').click();await page.locator('#begin-adventure').click();
  const initial=await state(page);await page.keyboard.down('ArrowLeft');await page.evaluate(()=>advanceTime(600));await page.keyboard.up('ArrowLeft');
  const moved=await state(page);check('keyboard moves the player in 3D',Math.hypot(moved.player.x-initial.player.x,moved.player.z-initial.player.z)>1);
  await page.keyboard.down('Space');await page.evaluate(()=>advanceTime(150));await page.keyboard.up('Space');check('jump lifts player above ground',(await state(page)).player.y>0);await page.evaluate(()=>advanceTime(1000));
  const animalsBefore=(await state(page)).animals;await page.evaluate(()=>advanceTime(2500));const animalsAfter=(await state(page)).animals;
  check('wildlife roams independently',animalsBefore.some((a,i)=>Math.hypot(a.x-animalsAfter[i].x,a.z-animalsAfter[i].z)>.2));
  await shot(page,'exploration-desktop');
  await page.keyboard.press('Escape');const paused=await state(page);await page.evaluate(()=>advanceTime(1000));
  check('Escape pauses and freezes the world',paused.mode==='paused'&&JSON.stringify(paused.animals)===JSON.stringify((await state(page)).animals));
  await page.locator('#unpause').click();
  await page.locator('#sound').click();check('sound toggle exposes its state',await page.locator('#sound').getAttribute('aria-pressed')==='true');await page.locator('#sound').click();
  await page.keyboard.press('KeyF');check('F enters fullscreen',await page.evaluate(()=>!!document.fullscreenElement));
  await page.keyboard.press('KeyF');check('F exits fullscreen',await page.evaluate(()=>!document.fullscreenElement));
  await approach(page,'npc',0);await page.locator('.social[data-choice="1"]').click();
  check('social clue gives constructive feedback',!!(await page.locator('#social-feedback').textContent()));
  await page.locator('.social[data-choice="0"]').click();check('practice waits for collected equipment',await page.locator('#track-equipment').isVisible());
  await page.locator('#track-equipment').click();await approach(page,'equipment',0);await shot(page,'equipment-desktop');
  await page.locator('#collect-equipment').click();check('equipment updates the world state',(await state(page)).equipment[0].collected);
  await approach(page,'npc',0);
  const first=await state(page);const chosen=await page.evaluate(()=>{const r=__afterbell.round(),q=r.questions.find(q=>q.id===JSON.parse(render_game_to_text()).question.id);return 1-q.correct;});
  await page.locator(`.answer[data-choice="${chosen}"]`).click();await page.locator('#hold-feedback').click();
  check('answer locks immediately',await page.locator('.answer:disabled').count()===first.question.options.length);
  check('wrong answer has explanation and source',await page.locator('.feedback').isVisible()&&await page.locator('.reference').count()>0);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));delete document.hidden;});
  await page.waitForTimeout(1700);check('held feedback stays paused after returning to the tab',(await state(page)).mode==='feedback'&&(await state(page)).answered===1);
  await shot(page,'question-desktop');
  const orderBefore=await page.evaluate(()=>__afterbell.round().questions.map(q=>({id:q.id,options:q.options.map(o=>o.original)})));
  await page.reload({waitUntil:'domcontentloaded'});await ready(page);await page.locator('#resume').click();
  const restored=await state(page),orderAfter=await page.evaluate(()=>__afterbell.round().questions.map(q=>({id:q.id,options:q.options.map(o=>o.original)})));
  check('reload restores locked answer, item and shuffled order',restored.answered===1&&restored.equipment[0].collected&&JSON.stringify(orderBefore)===JSON.stringify(orderAfter));
  await page.locator('#journal').click();await page.locator('details summary').first().click();check('journal offers read-only answer review',await page.locator('.review-item').count()===1&&await page.locator('#dialog-body input').count()===0);await page.locator('#close-dialog').click();
  // Visit stations in an open-world order and complete through normal answer controls.
  for(const index of [2,0,1]){
    await station(page,index);
    while((await state(page)).mode==='question'){
      const choice=await page.evaluate(()=>{const s=JSON.parse(render_game_to_text());return __afterbell.round().questions.find(q=>q.id===s.question.id).correct;});
      await page.locator(`.answer[data-choice="${choice}"]`).click();
      await page.waitForFunction(()=>JSON.parse(render_game_to_text()).mode!=='feedback');
    }
    check(`station ${index+1} restores its system`,(await state(page)).npcs[index].sealed);await page.locator('#continue-world').click();
  }
  check('all three items and completed stations unlock the gate',(await state(page)).exit.open&&(await state(page)).equipment.every(e=>e.collected));
  let saveOffline=true;
  await page.route('**/api/afterbell/attempts',route=>saveOffline?route.fulfill({status:503,contentType:'application/json',body:'{"error":"offline"}'}):route.continue());
  await page.evaluate(()=>{__afterbell.walkTo(3,-24.5);__afterbell.interact();});
  await page.waitForFunction(()=>document.getElementById('save-status')?.textContent.includes('ממתינה'));
  check('offline completion retains a durable queued result and draft',await page.evaluate(()=>JSON.parse(localStorage.getItem('prepx-afterbell-pending-v1')).length===1&&!!sessionStorage.getItem('prepx-afterbell-draft-v1')));
  await page.getByRole('button',{name:'לנסות לשמור שוב'}).click();
  await page.waitForFunction(()=>!Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='לנסות לשמור שוב')?.disabled);
  check('failed save retry keeps the queued result',await page.evaluate(()=>JSON.parse(localStorage.getItem('prepx-afterbell-pending-v1')).length===1));
  saveOffline=false;await page.reload({waitUntil:'domcontentloaded'});await ready(page);
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('prepx-afterbell-pending-v1')||'[]').length===0);
  check('reload retries the queued result after connection recovery',true);
  await page.locator('#resume').click();await page.evaluate(()=>{__afterbell.walkTo(3,-24.5);__afterbell.interact();});
  await page.waitForFunction(()=>document.getElementById('save-status')?.textContent.includes('✓'));
  check('completed result is saved to the separate database',await page.locator('#save-status').textContent().then(x=>x.includes('✓')));
  check('first-attempt score survives offline retry and reload',(await state(page)).score===83);
  await shot(page,'escape-desktop');await page.locator('#review-results').click();
  check('all six answers are reviewable on completion',await page.locator('#final-review .review-item').count()===6);
  await page.locator('#replay').click();check('replay returns to start',(await state(page)).mode==='menu');await context.close();
  // Close the desktop context before testing mobile to avoid simultaneous WebGL contexts.
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),m=await mobile.newPage();captureErrors(m);
  await m.route('**/api/afterbell/quizzes/**',r=>r.abort());await m.goto(base+'/?test=1',{waitUntil:'domcontentloaded'});await ready(m);
  check('offline uses the unchanged database snapshot',(await state(m)).source==='snapshot');await shot(m,'welcome-mobile');
  check('390px welcome has no horizontal overflow',await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await m.locator('#player-name').fill('בדיקת מגע');await m.locator('#start').tap();await m.locator('#begin-adventure').tap();
  check('touch controls are available',await m.locator('#joystick').isVisible());
  const before=await state(m),stick=await m.locator('#joystick').boundingBox();
  await m.mouse.move(stick.x+stick.width/2,stick.y+stick.height/2);await m.mouse.down();await m.mouse.move(stick.x+stick.width/2+30,stick.y+stick.height/2);await m.evaluate(()=>advanceTime(700));await m.mouse.up();
  check('pointer joystick moves the player',Math.hypot((await state(m)).player.x-before.player.x,(await state(m)).player.z-before.player.z)>.5);
  await m.locator('#jump').tap();await m.evaluate(()=>advanceTime(140));check('touch jump works',(await state(m)).player.y>0);await m.evaluate(()=>advanceTime(1000));await shot(m,'exploration-mobile');
  await station(m,1);await shot(m,'question-mobile');
  check('mobile question dialog fits the viewport',await m.locator('#dialog').evaluate(el=>el.getBoundingClientRect().width<=390));
  check('mobile answer targets are at least 44px',await m.locator('.answer').evaluateAll(elements=>elements.every(el=>el.getBoundingClientRect().height>=44)));
  check('390px gameplay has no horizontal overflow',await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await m.locator('.answer').first().tap();check('touch selection locks the answer',(await state(m)).question.locked);await mobile.close();
  check('no uncaught browser errors',errors.length===0);
  await writeFile('output/browser-report.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({passed:checks.length,checks,errors},null,2));
} finally {await browser.close();}
