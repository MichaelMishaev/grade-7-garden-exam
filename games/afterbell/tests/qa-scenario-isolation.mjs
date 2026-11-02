import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {SCENARIOS} from '../src/scenarios.js';
import {makeRound} from '../src/core.js';
import snapshot from '../src/content-snapshot.json' with {type:'json'};
const url=process.env.AFTERBELL_URL||'http://127.0.0.1:5177';
const out=new URL('../../../output/playwright/scenarios-r2-isolation/',import.meta.url).pathname;await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true}),checks=[],errors=[];let writes=0;
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
const state=p=>p.evaluate(()=>JSON.parse(render_game_to_text()));
const advance=(p,ms)=>p.evaluate(ms=>advanceTime(ms),ms);
async function routes(p){p.setDefaultTimeout(45000);p.on('pageerror',e=>errors.push(e.message));await p.route('**/api/afterbell/quizzes/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify(snapshot.quizzes.find(q=>r.request().url().endsWith('/'+q.id)))}));await p.route('**/api/afterbell/attempts',r=>{writes++;return r.abort();});}
const ready=p=>p.waitForFunction(()=>window.__afterbell&&!document.querySelector('#scenario-start').disabled);
try{
 const ctx=await browser.newContext({viewport:{width:1440,height:1000}}),p=await ctx.newPage();await routes(p);await p.goto(url+'/campus.html?test=1',{waitUntil:'domcontentloaded'});await ready(p);await advance(p,0);const extras=[];
 for(const scenario of SCENARIOS){
  await p.locator('#player-name').fill('בדיקת בידוד');await p.locator('#scenario').selectOption(scenario.id);await p.locator('#scenario-start').click();await p.locator('#begin-adventure').click();await advance(p,0);
  await p.locator('#side-task').click();check('one optional objective for '+scenario.id,await p.locator('[data-side-mission]').count()===1);extras.push(await p.locator('[data-side-mission]').getAttribute('data-side-mission'));await p.locator('#side-main').click();
  await p.evaluate(()=>__afterbell.walkTo(-8,22.5));await advance(p,16);check('no invisible legacy equipment in '+scenario.id,(await state(p)).target?.type!=='equipment');
  await p.evaluate(()=>__afterbell.walkTo(-4,5.6));await advance(p,16);check('noticeboard reachable',(await state(p)).target?.id==='noticeboard');await p.locator('#interact').click();const copy=await p.locator('#dialog-body').textContent();check('noticeboard has current tasks for '+scenario.id,copy.includes(scenario.brief)&&scenario.steps.every(step=>copy.includes(step.title))&&!copy.includes('כרטיס הגישה עבר'));await p.locator('#close-dialog').click();
  await p.keyboard.press('Escape');await p.locator('#menu').click();await advance(p,0);
 }
 check('all ten optional objectives differ',new Set(extras).size===10);await ctx.close();
 const legacy=makeRound(snapshot.quizzes[0]);legacy.participantName='בדיקת תאימות';legacy.player={x:-8,z:22.5};const oldCtx=await browser.newContext(),old=await oldCtx.newPage();await routes(old);await old.addInitScript(raw=>{localStorage.setItem('prepx-afterbell-name','בדיקת תאימות');sessionStorage.setItem('prepx-afterbell-draft-v1',raw);},JSON.stringify(legacy));await old.goto(url+'/campus.html?test=1',{waitUntil:'domcontentloaded'});await ready(old);await old.locator('#resume').click();await advance(old,16);check('legacy saved rounds retain original equipment',(await state(old)).target?.type==='equipment');await oldCtx.close();
 check('no errors',errors.length===0);check('no result writes',writes===0);await writeFile(`${out}/report.json`,JSON.stringify({revision:2,checks:checks.length,errors,writes,exclusiveExtras:extras},null,2));console.log(`PASS ${checks.length} isolation checks`);
}finally{await browser.close();}
