import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import snapshot from '../content-snapshot.js';
import {pathTo} from '../core.js';
import {joystickStep} from './joystick-touch.mjs';
const base=process.env.MAZE_QA_URL||'http://127.0.0.1:5192/';
const output=new URL('../../../output/maze/rewards/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=[],errors=[],writes=[];
const check=(name,pass)=>{assert.ok(pass,name);checks.push(name);console.log('PASS',name);};
const questions=new Map(snapshot.quizzes.flatMap(q=>q.questions).map(q=>[q.id,q]));
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await context.addInitScript(()=>{Math.random=()=>.999999;window.requestAnimationFrame=()=>0;});
await context.route('**/api/quizzes/**',r=>r.fulfill({status:200,contentType:'application/json',body:'{}'}));
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
const read=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
const advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
const start=async()=>{await page.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});await page.locator('#start-button').tap();};
const shot=async name=>{await advance(0);await page.screenshot({path:output+name+'.png',fullPage:true});};
async function walk(target){
 for(let guard=0;guard<200;guard++){
  const s=await read();if(s.phase!=='explore'||s.pendingGift||s.player.x===target.x&&s.player.y===target.y)return;
  const next=pathTo(s.player,target)?.[0];assert.ok(next);
  await joystickStep(page,next.x>s.player.x?'right':next.x<s.player.x?'left':next.y>s.player.y?'down':'up');
 }
 throw new Error('Walk did not arrive');
}
async function finishTrap(wrongFirst=false){
 let s=await read();await walk(s.encounters.find(e=>!e.resolved));
 if(await page.locator('#skip-trap-entry').isVisible())await page.locator('#skip-trap-entry').tap();
 let answered=0;
 for(let guard=0;guard<6;guard++){
  s=await read();if(s.pendingGift)return;
  assert.equal(s.phase,'question');const q=questions.get(s.currentQuestion.id);
  await page.locator(`[data-choice="${wrongFirst&&answered===0?(q.correct+1)%q.choices.length:q.correct}"]`).tap();
  await page.locator('#read-feedback').tap();await page.locator('#continue-button').tap();answered++;
 }
 throw new Error('Trap did not resolve');
}
try{
 await page.goto(base);await start();
 await page.locator('#rewards-button').tap();
 check('empty collection shows locked gifts and explains missing currency',await page.locator('.collection-item.locked').count()===3&&await page.locator('[data-buy-reward="compass"]').isDisabled());
 await shot('empty');await page.locator('#close-panel').tap();
 await finishTrap(true);
 check('gift explains its diamond value',await page.locator('.gift-description').textContent().then(t=>t.includes('+1 יהלום')));
 await page.locator('#collect-and-shop').tap();
 check('collected diamond and gift appear in inventory',(await read()).rewards.balance===1&&await page.locator('.collection-item.earned').count()===1);
 await shot('first-gift');
 const before=(await read()).progress;
 await page.locator('[data-buy-reward="heart"]').tap();
 check('diamond buys one missing heart and keeps the gift',(await read()).hearts===3&&(await read()).rewards.balance===0&&await page.locator('.collection-item.earned').count()===1);
 check('purchase keeps score and coins',JSON.stringify((await read()).progress)===JSON.stringify(before)&&(await read()).coins===10);
 check('empty wallet prevents further spending',await page.locator('[data-buy-reward="lantern"]').isDisabled());
 check('purchase feedback receives keyboard focus',await page.locator('.reward-status').evaluate(el=>document.activeElement===el));
 await page.reload();await start();await page.locator('#rewards-button').tap();
 check('refresh preserves collection, balance and purchased heart',(await read()).hearts===3&&(await read()).rewards.balance===0&&(await read()).rewards.purchases[0]==='heart'&&await page.locator('.collection-item.earned').count()===1);
 await page.locator('#close-panel').tap();
 await finishTrap();await page.locator('#collect-and-shop').tap();await page.locator('[data-buy-reward="compass"]').tap();
 check('compass is purchased once and calculates an objective path',(await read()).rewards.purchases.includes('compass')&&(await read()).guidePath.length>0&&await page.locator('[data-buy-reward="compass"]').isDisabled());
 await page.locator('#close-panel').tap();await shot('compass-world');
 await finishTrap();await page.locator('#collect-and-shop').tap();
 check('all collected gifts remain visible after earlier spending',await page.locator('.collection-item.earned').count()===3&&(await read()).rewards.earned===3&&(await read()).rewards.balance===1);
 await page.locator('#close-panel').tap();await shot('lantern-before');
 await page.locator('#rewards-button').tap();await page.locator('[data-buy-reward="lantern"]').tap();
 check('lantern unlock and all three spends are shown',(await read()).rewards.purchases.includes('lantern')&&(await read()).rewards.balance===0&&await page.locator('[data-buy-reward="lantern"]').textContent().then(t=>t.includes('פעיל')));
 await shot('all-gifts-upgrades');await page.locator('#close-panel').tap();await shot('lantern-after');
 const completeProgress=(await read()).progress;
 check('compass points toward final exit',(await read()).guidePath.at(-1)?.x===(await read()).exit.x&&(await read()).guidePath.at(-1)?.y===(await read()).exit.y);
 await walk((await read()).exit);if((await read()).phase!=='complete')await page.locator('#interact-button').tap();
 check('upgraded adventure still completes normally',(await read()).phase==='complete'&&(await read()).progress.score===completeProgress.score);
 await page.locator('#completion-rewards').tap();
 check('collection is accessible after completion',await page.locator('.collection-item.earned').count()===3);
 await page.locator('#close-panel').tap();await page.reload();await start();await page.locator('#completion-rewards').tap();
 check('completed collection and upgrades survive refresh',(await read()).rewards.earned===3&&(await read()).rewards.balance===0&&(await read()).rewards.purchases.length===3);
 for(const [width,height] of [[320,568],[844,390]]){
  await page.setViewportSize({width,height});check(`rewards fit ${width}x${height}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)&&await page.locator('.rewards-sheet').evaluate(el=>el.scrollWidth<=el.clientWidth));
  await page.locator('#close-panel').scrollIntoViewIfNeeded();await shot('collection-'+width);
 }
 check('zero page errors or data writes',errors.length===0&&writes.length===0);
} catch(error){await shot('failure').catch(()=>{});await writeFile(output+'failure-state.json',JSON.stringify(await read(),null,2));throw error;}
finally{await writeFile(output+'report.json',JSON.stringify({base,checks,errors,writes},null,2));await browser.close();}
