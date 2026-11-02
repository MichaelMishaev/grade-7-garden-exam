import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile,rm} from 'node:fs/promises';
import {SCENARIOS} from '../src/scenarios.js';
import {TASK_SOLUTIONS} from './task-solutions.mjs';
import snapshot from '../src/content-snapshot.json' with {type:'json'};
const base=process.env.AFTERBELL_URL||'http://127.0.0.1:5177';
const out=new URL('../../../output/playwright/scenarios-r2/',import.meta.url).pathname;await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const checks=[],errors=[],touchPages=new Set();let mockedSaves=0;
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
const state=p=>p.evaluate(()=>JSON.parse(render_game_to_text()));
const advance=(p,ms)=>p.evaluate(ms=>advanceTime(ms),ms);
const press=(p,selector)=>touchPages.has(p)?p.locator(selector).tap():p.locator(selector).click();
async function ready(p){await p.waitForFunction(()=>window.__afterbell&&!document.querySelector('#scenario-start').disabled);await advance(p,0);}
async function position(p,goal){const ok=await p.evaluate(goal=>{if(!__afterbell.world.guideTo(goal.x,goal.z))return false;for(const [dx,dz]of [[0,0],[.7,0],[-.7,0],[0,.7],[0,-.7],[1.4,0],[0,1.4],[-1.4,0],[0,-1.4]])if(!__afterbell.world.blocked(goal.x+dx,goal.z+dz)){__afterbell.walkTo(goal.x+dx,goal.z+dz);return true;}return false;},goal);check('field destination has safe approach',ok);await advance(p,16);}
async function interact(p){await press(p,'#interact');}
async function guide(p){await press(p,'#follow-path');for(let tries=0;tries<8;tries++){await advance(p,8000);const s=await state(p),g=s.mission.target;if(Math.hypot(s.player.x-g.x,s.player.z-g.z)<2.2&&(!s.movement.companion||s.movement.companion.type!=='robot'||Math.hypot(s.movement.companion.x-g.x,s.movement.companion.z-g.z)<3))return;await p.waitForTimeout(100);}throw new Error('guided physical task did not reach destination');}
async function uiAction(p,a){
 const root=p.locator('#task-workspace');
 if(a.type==='set'||a.type==='clear'){
  const input=root.locator(`input[data-key="${a.key}"]`);
  if(await input.count()){await input.fill(a.type==='clear'?'':String(a.value));return;}
  await press(p,`#task-workspace button[data-action="set"][data-key="${a.key}"][data-value="${a.value}"]`);return;
 }
 if(a.type==='link'){await root.locator(`select[data-link-row="${a.row}"]`).selectOption(String(a.value));return;}
 if(a.type==='wire')await press(p,`#task-workspace button[data-action="set"][data-key="selected"][data-value="${a.row}"]`);
 let selector=`#task-workspace button[data-action="${a.type}"]`;
 if(a.value!==undefined)selector+=`[data-value="${a.value}"]`;
 if(a.row!==undefined)selector+=`[data-row="${a.row}"]`;
 await press(p,selector);
}
async function field(p,mobile){
 let s=await state(p),step=s.scenario.step,index=s.scenario.stage;
 if(step.kind==='robot-escort'){
  const initial=s.movement.companion;check('robot companion exists',initial?.type==='robot');
  for(let i=0;i<3;i++){await guide(p);check('robot actually walks',(await state(p)).movement.companion&&Math.hypot((await state(p)).movement.companion.x-initial.x,(await state(p)).movement.companion.z-initial.z)>.1||i===0);await interact(p);}
 }else if(step.kind==='rescue-trust'){
  await position(p,s.mission.target);await interact(p);check('trust cannot skip quiet proximity',!(await state(p)).scenario.completed.includes(index));
  await press(p,'#crouch');await advance(p,1700);check('trust accumulates gradually',(await state(p)).scenario.data.trust>0&&(await state(p)).scenario.data.trust<3);
  await p.reload({waitUntil:'domcontentloaded'});await ready(p);await press(p,'#resume');await advance(p,16);check('partial fox trust survives reload',(await state(p)).scenario.data.trust>0);
  await press(p,'#crouch');await advance(p,3500);await interact(p);
 }else if(step.kind==='courier-course'){
  for(let i=0;i<4;i++){s=await state(p);await position(p,s.mission.target);if(i===1){if(mobile)await press(p,'#dash');else await p.keyboard.press('q');await advance(p,100);}else if(i<3){if(mobile)await press(p,'#jump');else await p.keyboard.press('Space');await advance(p,300);}await advance(p,1500);}
 }else{
  await position(p,s.mission.target);await interact(p);await uiAction(p,{type:step.kind==='robot-route'?'execute':step.kind==='witness-search'?'find':step.kind==='courier-lockers'?'deliver':'submit',value:step.kind==='courier-lockers'?0:undefined});
  check(`${step.kind} incomplete action cannot finish`,!(await state(p)).scenario.completed.includes(index));
  const actions=TASK_SOLUTIONS[step.kind];
  for(let j=0;j<actions.length;j++){
   const a=actions[j];s=await state(p);
   if(s.mode==='explore'){if(['witness-search','courier-lockers'].includes(step.kind))await guide(p);else await position(p,s.mission.target);await interact(p);}
   await uiAction(p,a);
   if(j===1&&step.kind==='freight-packing'){
    const saved=(await state(p)).scenario.data.placements;await p.reload({waitUntil:'domcontentloaded'});await ready(p);await press(p,'#resume');await advance(p,16);check('partial packing survives reload',JSON.stringify((await state(p)).scenario.data.placements)===JSON.stringify(saved));await interact(p);
   }
  }
 }
 s=await state(p);check(`${step.kind} solved`,s.scenario.completed.includes(index));
 check('task interface has no horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await advance(p,0);await p.screenshot({path:`${out}/${mobile?'mobile':'desktop'}-${step.kind}.png`});
 if(s.mode==='field')await press(p,'#field-to-quiz');else await interact(p);
 check('field unlocks source questions',(await state(p)).mode==='question');
}
try{
 for(const mobile of [false,true]){
  const ctx=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},hasTouch:mobile,isMobile:mobile,reducedMotion:mobile?'reduce':'no-preference'}),p=await ctx.newPage();if(mobile)touchPages.add(p);
  p.setDefaultTimeout(45000);p.on('pageerror',e=>{errors.push(e.message);console.error('PAGE ERROR',e.message);});
  await p.addInitScript(()=>{const schedule=window.setTimeout.bind(window);window.setTimeout=(fn,ms,...args)=>schedule(fn,ms===1500?250:ms,...args);});
  await p.route('**/api/afterbell/quizzes/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify(snapshot.quizzes.find(q=>r.request().url().endsWith('/'+q.id)))}));
  await p.route('**/api/afterbell/attempts',r=>{mockedSaves++;return r.fulfill({status:200,contentType:'application/json',body:'{"saved":true}'});});
  await p.route('**/api/submit-exam',r=>{throw new Error('Email must never be called');});
  for(const scenario of SCENARIOS){
   if(scenario===SCENARIOS[0]){await p.goto(base+'/?test=1',{waitUntil:'domcontentloaded'});await ready(p);}
   else{if((await state(p)).mode==='complete')await press(p,'#replay');else{await p.keyboard.press('Escape');await press(p,'#menu');}await advance(p,0);}
   await p.locator('#quiz').selectOption(scenario.quizzes[0]);await ready(p);await p.locator('#player-name').fill('בדיקת תרחישים');await p.locator('#scenario').selectOption(scenario.id);await press(p,'#scenario-start');await press(p,'#begin-adventure');await advance(p,0);
   for(let i=0;i<3;i++){
    console.log(`${mobile?'mobile':'desktop'} ${scenario.steps[i].kind}`);await field(p,mobile);let s;
    while((s=await state(p)).mode==='question'){
     const q=snapshot.quizzes.find(q=>q.id===s.quiz).questions.find(q=>q.id===s.question.id);await press(p,`.answer[data-choice="${q.correct}"]`);check('source first answer locks',(await state(p)).question.locked);
     await p.waitForFunction(()=>['question','reward'].includes(JSON.parse(render_game_to_text()).mode));
    }
    check('stage and questions both required',(await state(p)).npcs[i].sealed);await press(p,'#continue-world');
   }
   check('all source questions covered',(await state(p)).answered===(await state(p)).total);check('gate unlocks only after all three tasks',(await state(p)).exit.open);
   if(scenario.id==='courier'){await position(p,(await state(p)).exit);await interact(p);await p.waitForFunction(()=>document.querySelector('#save-status')?.textContent.includes('✓'));}
   console.log(`PASS ${mobile?'mobile':'desktop'} ${scenario.id}`);
  }
  await ctx.close();
 }
 check('no browser errors',errors.length===0);check('only two mocked final saves',mockedSaves===2);
 await rm(`${out}/failure.txt`,{force:true});await writeFile(`${out}/report.json`,JSON.stringify({revision:2,checks:checks.length,errors,taskTypes:30,journeys:20,mockedSaves,realWrites:0},null,2));console.log(`PASS ${checks.length} checks / 30 task types / 20 journeys`);
}catch(error){await writeFile(`${out}/failure.txt`,String(error));throw error;}finally{await browser.close();}
