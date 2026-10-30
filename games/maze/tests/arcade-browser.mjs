import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import snapshot from '../content-snapshot.js';
const base=process.env.ARCADE_QA_URL||'http://127.0.0.1:5192/arcade.html';
const output=new URL('../../../output/maze/arcade-e2e/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const checks=[],errors=[],writes=[];
const check=(name,pass)=>{assert.ok(pass,name);checks.push(name);console.log('PASS',name);};
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const questions=new Map(snapshot.quizzes.flatMap(q=>q.questions).map(q=>[q.id,q]));
let page;
async function setup({reducedMotion='no-preference',raw=null,storageFault=null}={}){
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion});
 await context.addInitScript(({raw,storageFault})=>{
  Math.random=()=>.999999;window.requestAnimationFrame=()=>0;
  if(!sessionStorage.getItem('arcade-test-init')){
   sessionStorage.setItem('prepx-shadow-maze-session-v1','normal-maze-sentinel');sessionStorage.setItem('physics-exam-draft-v1','exam-sentinel');
   if(raw!==null)sessionStorage.setItem('prepx-shadow-maze-arcade-v1',raw);sessionStorage.setItem('arcade-test-init','1');
  }
  if(storageFault==='read'){const get=Storage.prototype.getItem;Storage.prototype.getItem=function(k){if(k==='prepx-shadow-maze-arcade-v1')throw new Error('synthetic read fault');return get.call(this,k);};}
  if(storageFault==='write'){const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='prepx-shadow-maze-arcade-v1')throw new Error('synthetic write fault');return set.call(this,k,v);};}
 },{raw,storageFault});
 await context.route('**/api/quizzes/**',r=>r.fulfill({status:200,body:'{}',contentType:'application/json'}));
 const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()!=='GET')writes.push(r.method()+' '+r.url());});
 await p.goto(base,{waitUntil:'domcontentloaded'});await p.locator('#new-run').waitFor();return {context,p};
}
const read=p=>p.evaluate(()=>JSON.parse(window.render_game_to_text()));
const advance=(p,ms)=>p.evaluate(ms=>window.advanceTime(ms),ms);
async function shot(p,name){await advance(p,0);await p.screenshot({path:output+name+'.png',fullPage:true});}
async function hold(p,dx,dz,ms){
 const recovery=(await read(p)).recoverMs;if(recovery)await advance(p,recovery);
 const el=p.locator('#movement-joystick');await el.scrollIntoViewIfNeeded();
 const b=await el.boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2,cdp=await p.context().newCDPSession(p);
 try{await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*44,y:y-dz*44}]});await advance(p,ms);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}finally{await cdp.detach();}
}
async function reload(p){await p.reload({waitUntil:'domcontentloaded'});await p.locator('#resume-run').waitFor();await p.locator('#resume-run').tap();}
async function bridge(p){await p.locator('#start-challenge').tap();await hold(p,0,1,3200);check('actual joystick crossing reaches the source question',(await read(p)).phase==='question');}
async function answer(p,correct){const s=await read(p),q=questions.get(s.currentQuestion.id);await p.locator(`[data-choice="${correct?q.correct:(q.correct+1)%q.choices.length}"]`).tap();}
async function bossHit(p){
 let s=await read(p);if(s.recoverMs)await advance(p,s.recoverMs+16);
 s=await read(p);await hold(p,s.boss.target===-1.5?1:-1,0,480);await hold(p,0,1,1500);
 check('safe lane and reachable firing pad expose a valid boss shot',(await read(p)).boss.canFire);
 await p.locator('#fire-button').tap();
}
try{
 let run=await setup();page=run.p;
 check('first entry offers new run, not a nonexistent saved run',await page.locator('#resume-run').count()===0);
 await page.locator('#new-run').tap();await page.locator('#start-challenge').waitFor();check('new run has three unique pinned questions',new Set((await read(page)).selected).size===3);
 for(let i=0;i<3;i++){
  await bridge(page);if(i===0){await reload(page);check('question and selection survive refresh',(await read(page)).phase==='question');}
  await answer(page,false);check('wrong answer still earns exactly one crystal',(await read(page)).answered===i+1&&(await read(page)).crystals===i+1);
  await page.locator('#continue-feedback').tap();
 }
 check('all-wrong no-purchase run reaches safe boss staging',(await read(page)).phase==='boss-ready'&&(await read(page)).hearts===3&&(await read(page)).diamonds===0);
 await shot(page,'boss-ready-all-wrong');await page.locator('#start-challenge').tap();
 for(let hit=1;hit<=3;hit++){
  await bossHit(page);check('each boss hit spends exactly one funded crystal',(await read(page)).boss.hits.length===hit&&(await read(page)).crystals===3-hit);
  if(hit===1){await reload(page);check('partial boss refresh preserves hit and remaining crystals',(await read(page)).boss.hits.length===1&&(await read(page)).crystals===2);}
 }
 check('all-wrong run wins and settles every gift plus bonus',(await read(page)).phase==='victory'&&(await read(page)).score===0&&(await read(page)).diamonds===4&&(await read(page)).claimed.length===3);
 await shot(page,'victory-no-purchases');await reload(page);check('victory payout survives reload exactly once',(await read(page)).diamonds===4);
 await page.locator('#victory-collection').tap();check('completed collection keeps all three gifts',await page.locator('.collection-gift').count()===3);await shot(page,'completed-collection');await page.locator('#close-panel').tap();
 await page.locator('#another-run').tap();await page.locator('#quiz-select').selectOption('physics-basics');await page.locator('#new-run').tap();await page.locator('#start-challenge').waitFor();
 check('another subject starts fresh and retains last completed collection',(await read(page)).quizId==='physics-basics'&&(await read(page)).diamonds===0&&(await read(page)).hasLastCompleted);
 check('normal maze and formal exam drafts remain byte-identical',await page.evaluate(()=>sessionStorage.getItem('prepx-shadow-maze-session-v1')==='normal-maze-sentinel'&&sessionStorage.getItem('physics-exam-draft-v1')==='exam-sentinel'));
 await page.locator('#stage-pause').tap();await page.locator('#choose-run').tap();await page.locator('#last-summary').tap();check('previous completed collection remains accessible',await page.locator('.collection-gift').count()===3&&await page.locator('#dialog-title').textContent().then(t=>t.includes('הקודם')));
 await run.context.close();
 // Boosted run uses ordinary source answers and actual joystick input.
 run=await setup();page=run.p;await page.locator('#new-run').tap();await page.locator('#start-challenge').waitFor();await bridge(page);await answer(page,true);await page.locator('#claim-feedback').tap();await page.locator('#continue-feedback').tap();await page.locator('#stage-collection').tap();await page.locator('[data-buy="shield"]').tap();check('shop spends one diamond for one shield',(await read(page)).diamonds===0&&(await read(page)).purchases[0].status==='ready');await page.locator('#close-panel').tap();
 await page.locator('#start-challenge').tap();await hold(page,1,1,1100);let s=await read(page);check('shield blocks physical damage and is consumed once',s.hearts===3&&s.purchases[0].status==='used');
 await reload(page);check('refresh cannot re-arm a consumed shield',(await read(page)).purchases[0].status==='used');
 await page.locator('#assist-button').tap();await hold(page,0,1,5000);check('assistance returns an actual bridge path to completion',(await read(page)).phase==='question');await answer(page,true);await page.locator('#claim-feedback').tap();await page.locator('#continue-feedback').tap();await page.locator('#stage-collection').tap();await page.locator('[data-buy="slow"]').tap();await page.locator('#close-panel').tap();await page.locator('#start-challenge').tap();await page.locator('#slow-button').tap();await advance(page,1000);const boost=await read(page);
 await page.keyboard.press('Escape');await advance(page,5000);check('pause freezes boost and hazard clocks',(await read(page)).slowMs===boost.slowMs&&(await read(page)).clock===boost.clock);
 await page.locator('#resume-button').tap();await advance(page,500);check('safe resume cue does not consume boost',(await read(page)).slowMs===boost.slowMs);
 await shot(page,'boosted-bridge');await hold(page,0,1,3400);check('slow-motion bridge can still finish',(await read(page)).phase==='question');await answer(page,true);await page.locator('#continue-feedback').tap();await page.locator('#start-challenge').tap();
 for(let h=0;h<3;h++)await bossHit(page);
 check('boosted run finishes with correct ledger and score',(await read(page)).phase==='victory'&&(await read(page)).score===100&&(await read(page)).diamonds===2&&(await read(page)).coins===30);
 await run.context.close();
 // Reduced motion and mobile layout finish the same optional mode.
 run=await setup({reducedMotion:'reduce'});page=run.p;await page.locator('#new-run').tap();await page.locator('#start-challenge').waitFor();await page.locator('#start-challenge').tap();await page.locator('#assist-button').tap();
 for(let i=0;i<3;i++){if(i)await page.locator('#start-challenge').tap();await hold(page,0,1,3400);await answer(page,true);await page.locator('#continue-feedback').tap();}
 await page.locator('#start-challenge').tap();for(let i=0;i<3;i++)await bossHit(page);check('reduced-motion run reaches victory',(await read(page)).phase==='victory');
 for(const [width,height] of [[320,568],[844,390]]){await page.setViewportSize({width,height});await page.locator('#another-run').scrollIntoViewIfNeeded();check(`dialog fits and actions are reachable at ${width}x${height}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)&&await page.locator('#arcade-dialog').evaluate(e=>e.scrollWidth<=e.clientWidth));await shot(page,'victory-'+width);}
 await run.context.close();
 for(const fault of ['read','write','corrupt']){
  run=await setup({raw:'broken-save-kept-for-recovery',storageFault:fault==='corrupt'?null:fault});page=run.p;
  if(fault==='corrupt'||fault==='write')check(fault+' offers explicit unsaved recovery',(await read(page)).recovery);
  await page.locator('#new-run').tap();await page.locator('#start-challenge').waitFor();check(fault+' can play without overwriting old save',await page.evaluate(()=>{const get=Storage.prototype.getItem;if(window.render_game_to_text){try{return sessionStorage.getItem('prepx-shadow-maze-arcade-v1')==='broken-save-kept-for-recovery';}catch{return JSON.parse(window.render_game_to_text()).storageAvailable===false;}}return false;}));
  check(fault+' displays unsaved warning',await page.locator('#storage-warning').isVisible());await run.context.close();
 }
 check('all cases have zero page errors and outbound writes',errors.length===0&&writes.length===0);
} catch(e){if(page&&!page.isClosed()){await shot(page,'failure').catch(()=>{});await writeFile(output+'failure-state.json',JSON.stringify(await read(page),null,2));}throw e;}
finally{await writeFile(output+'report.json',JSON.stringify({base,checks,errors,writes},null,2));await browser.close();}
