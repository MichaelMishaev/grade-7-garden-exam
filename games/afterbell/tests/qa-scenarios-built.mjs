import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import snapshot from '../src/content-snapshot.json' with {type:'json'};
import {SCENARIOS} from '../src/scenarios.js';
const url=process.env.PREPX_QA_URL||'http://127.0.0.1:4328/games/afterbell/play/campus.html';
const out=new URL('../../../output/playwright/scenarios-r2-built/',import.meta.url).pathname;await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true}),checks=[],errors=[];let posts=0;
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
try{
 for(const mobile of [false,true]){
  const ctx=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},hasTouch:mobile,isMobile:mobile,reducedMotion:mobile?'reduce':'no-preference'}),p=await ctx.newPage();p.setDefaultTimeout(45000);
  p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await p.route('**/api/afterbell/quizzes/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify(snapshot.quizzes.find(q=>r.request().url().endsWith('/'+q.id)))}));await p.route('**/api/afterbell/attempts',r=>{posts++;return r.fulfill({status:200,contentType:'application/json',body:'{"saved":true}'});});
  const press=sel=>mobile?p.locator(sel).tap():p.locator(sel).click(),state=()=>p.evaluate(()=>JSON.parse(render_game_to_text())),advance=ms=>p.evaluate(ms=>advanceTime(ms),ms);
  const ready=async()=>{await p.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#scenario-start').disabled);await advance(0);};
  const start=async id=>{await p.locator('#scenario').selectOption(id);await p.locator('#player-name').fill('בדיקת משחק מקומית');await press('#scenario-start');await press('#begin-adventure');await advance(0);await press('#side-task');check('one exclusive bonus objective',await p.locator('[data-side-mission]').count()===1);await press('#side-main');await press('#follow-path');await advance(30000);await p.waitForFunction(()=>JSON.parse(render_game_to_text()).mission.navigation.arrived);};
  const menu=async()=>{await p.keyboard.press('Escape');await press('#menu');await advance(0);};
  await p.goto(url,{waitUntil:'domcontentloaded'});await ready();check('no production positioning hooks',await p.evaluate(()=>!window.__afterbell));check('all ten adventures',await p.locator('#scenario option').count()===10);
  for(const q of snapshot.quizzes){await p.locator('#quiz').selectOption(q.id);await ready();const id=await p.locator('#scenario').inputValue();check(`${q.id} recommendation`,SCENARIOS.find(s=>s.id===id).quizzes.includes(q.id));}
  await start('robot');await press('#interact');check('larger robot grid has 25 cells',await p.locator('#task-workspace svg rect').count()===25);
  for(const n of [0,0,0,0,1,1,1,1])await press(`[data-action="command"][data-value="${n}"]`);await press('[data-action="execute"]');check('own robot program completes',(await state()).scenario.completed.includes(0));check('robot reaches new goal',await p.locator('#task-robot').getAttribute('cx')==='180'&&await p.locator('#task-robot').getAttribute('cy')==='180');await p.screenshot({path:`${out}/${mobile?'mobile':'desktop'}-robot.png`});await press('#field-to-quiz');await press('.answer:first-child');await press('#hold-feedback');check('source answer locks',(await state()).question.locked);await press('#close-dialog');await menu();
  await start('evidence');await press('#interact');await press('[data-action="inspect"][data-value="1"]');check('evidence details remain readable', (await p.locator('#task-workspace .task-card').first().boundingBox()).width>200);await press('[data-action="collect"][data-value="1"]');await press('[data-action="submit"]');check('speculation cannot finish investigation',!(await state()).scenario.completed.includes(0));await press('[data-action="collect"][data-value="1"]');for(const n of [0,2,4]){await press(`[data-action="inspect"][data-value="${n}"]`);await press(`[data-action="collect"][data-value="${n}"]`);}await press('[data-action="submit"]');check('actual evidence completes investigation',(await state()).scenario.completed.includes(0));await p.screenshot({path:`${out}/${mobile?'mobile':'desktop'}-evidence.png`});await press('#close-dialog');await menu();
  await start('rescue');await press('#crouch');await advance(1200);const trust=(await state()).scenario.data.trust;check('trust fills over physical time',trust>0&&trust<3);await p.keyboard.press('Escape');await advance(3000);check('pause freezes animal trust',(await state()).scenario.data.trust===trust);await press('#unpause');await advance(3000);await press('#interact');check('quiet proximity befriends physical fox',(await state()).scenario.completed.includes(0)&&(await state()).movement.companion.type==='fox');await advance(16);await p.screenshot({path:`${out}/${mobile?'mobile':'desktop'}-fox.png`});
  if(mobile){const rects=await Promise.all(['#interact','#crouch','#dash','#jump'].map(s=>p.locator(s).boundingBox()));check('mobile movement controls do not overlap',rects.every((a,i)=>rects.slice(i+1).every(b=>!a||!b||a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y)));}
  check('no horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await ctx.close();console.log(`PASS built ${mobile?'mobile':'desktop'} robot / evidence / wildlife`);
 }
 check('no console/page errors',errors.length===0);check('zero real result writes',posts===0);await writeFile(`${out}/report.json`,JSON.stringify({revision:2,checks:checks.length,errors,posts},null,2));console.log(`PASS ${checks.length} built checks`);
}finally{await browser.close();}
