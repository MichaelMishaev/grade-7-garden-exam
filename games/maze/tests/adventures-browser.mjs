import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import snapshot from '../content-snapshot.js';
const url=process.env.MAZE_QA_URL||'http://127.0.0.1:4328/games/maze/play/index.html';
const output=new URL('../../../output/maze/adventures/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const browser=await chromium.launch({args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await context.addInitScript(()=>{window.requestAnimationFrame=()=>0;});
const page=await context.newPage(),checks=[],errors=[],writes=[];
page.on('pageerror',error=>errors.push(error.message));page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
await page.route('**/api/quizzes/**',route=>route.fulfill({status:404,body:'{}',contentType:'application/json'}));
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
const read=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
const advance=(ms=900)=>page.evaluate(ms=>window.advanceTime(ms),ms);
const ready=()=>page.waitForFunction(()=>window.render_game_to_text&&document.querySelector('#start-button')?.disabled===false,null,{polling:50,timeout:60000});
const start=async()=>{await ready();await page.locator('#start-button').tap();};
const shot=async name=>{await advance(0);await page.screenshot({path:output+name+'.png',fullPage:true});};
async function reload(){await page.reload();await start();}
function path(maze,from,to){
 const queue=[{...from,path:[]}],seen=new Set([`${from.x},${from.y}`]);
 for(const current of queue){if(current.x===to.x&&current.y===to.y)return current.path;
 for(const [dx,dy]of [[0,-1],[1,0],[0,1],[-1,0]]){const x=current.x+dx,y=current.y+dy,key=`${x},${y}`;if(maze[y]?.[x]&&maze[y][x]!=='#'&&!seen.has(key)){seen.add(key);queue.push({x,y,path:[...current.path,{x,y}]});}}}
 throw new Error('No route');
}
async function answer(correct=true){
 if(await page.locator('#skip-trap-entry').isVisible())await page.locator('#skip-trap-entry').tap();
 const state=await read(),q=snapshot.quizzes.flatMap(bank=>bank.questions).find(q=>q.id===state.currentQuestion.id);
 await page.locator(`[data-choice="${correct?q.correct:(q.correct+1)%q.choices.length}"]`).tap();
 const after=await read();
 if(after.phase==='feedback')await page.waitForFunction(()=>JSON.parse(window.render_game_to_text()).phase!=='feedback',null,{polling:50,timeout:15000});
 else if(after.phase==='review-feedback')await page.locator('#continue-button').tap();
}
async function collect(){
 const before=await read();
 check('gift has a named visual keepsake and reachable button',await page.locator('.gift-gem').isVisible()&&await page.locator('#collect-gift').isVisible());
 await page.locator('#collect-gift').tap();
 const after=await read();check('gift collection never changes coins answers or hearts',before.coins===after.coins&&before.progress.answered===after.progress.answered&&before.hearts===after.hearts);
}
async function reach(target){
 for(let i=0;i<250;i++){
 const state=await read();
 if(state.phase==='complete'||state.player.x===target.x&&state.player.y===target.y)return;
 if(state.pendingGift){await collect();continue;}
 if(state.phase==='question'){if(target.id===state.activeEncounter)return;await answer();continue;}
 if(state.phase==='complete'||state.player.x===target.x&&state.player.y===target.y)return;
 assert.equal(state.phase,'explore');const next=path(state.maze,state.player,target)[0];
 const direction=next.x>state.player.x?'right':next.x<state.player.x?'left':next.y>state.player.y?'down':'up';
 await page.locator(`[data-direction="${direction}"]`).tap();await advance();
 }throw new Error('Walk did not terminate');
}
async function picker(){
 if(await page.locator('#encounter-menu').isVisible())await page.locator('#encounter-menu').tap();
 else if(!(await read()).started)await page.locator('#new-adventure-button').tap();
 else if((await read()).phase!=='complete')await page.locator('#pause-button').tap();
 if(!await page.locator('#new-subject').isVisible())await page.locator('#change-subject').tap();
}
async function switchTo(id,resume=false){
 await picker();await page.locator('#new-subject').selectOption(id);
 await Promise.all([page.waitForEvent('domcontentloaded'),page.locator(resume?'#resume-subject':'#new-subject-start').tap()]);
 await start();
}
try{
 await page.goto(url);await start();check('fresh run uses classic maze',(await read()).layoutId==='classic');
 await reach((await read()).encounters[0]);while((await read()).phase==='question')await answer();
 check('cleared trap opens gift celebration',(await read()).pendingGift==='floor');
 await shot('mobile-gift');const gift=await read();await reload();
 check('uncollected gift survives refresh without extra score',(await read()).pendingGift==='floor'&&(await read()).coins===gift.coins);
 await page.emulateMedia({reducedMotion:'reduce'});check('reduced motion keeps the gift visible with no animation',await page.locator('.gift-gem').evaluate(el=>getComputedStyle(el).animationName==='none'));await shot('reduced-motion-gift');await page.emulateMedia({reducedMotion:'no-preference'});
 await collect();await reload();check('collected gift never reappears on refresh',!(await read()).pendingGift&&(await read()).gifts.includes('floor'));
 await page.reload();await ready();await page.locator('#new-adventure-button').tap();await page.keyboard.press('Escape');check('Escape closes the intro subject picker without losing the run',!await page.locator('#game-dialog').evaluate(el=>el.open));await start();
 const original=await read();await page.locator('#pause-button').tap();await page.locator('#change-subject').tap();
 await page.locator('#cancel-subject').tap();check('cancel subject change resumes the same run',(await read()).quizId===original.quizId&&(await read()).coins===original.coins&&!(await read()).paused);
 await switchTo('physics-pole');check('different subject opens fresh run in a different maze',(await read()).quizId==='physics-pole'&&(await read()).layoutId==='moon'&&(await read()).progress.answered===0);
 await reload();check('new maze stays fixed after refresh',(await read()).layoutId==='moon');await shot('moon-maze');
 await switchTo('facts',true);check('returning to Hebrew restores answers coins gift and position',(await read()).quizId==='facts'&&(await read()).coins===original.coins&&(await read()).progress.answered===original.progress.answered&&JSON.stringify((await read()).player)===JSON.stringify(original.player)&&(await read()).gifts.includes('floor'));
 // A failed archive must leave the active saved run byte-for-byte intact.
 await picker();await page.evaluate(()=>{window.savedBeforeFailure=sessionStorage.getItem('prepx-shadow-maze-session-v1');const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.includes('-run-'))throw new DOMException('quota','QuotaExceededError');return original.call(this,k,v);};});
 await page.locator('#new-subject-start').tap();await page.waitForFunction(()=>document.querySelector('#subject-error')?.textContent,null,{polling:50,timeout:10000});check('archive failure offers retry and preserves active save',await page.locator('#subject-error').textContent()&&await page.evaluate(()=>sessionStorage.getItem('prepx-shadow-maze-session-v1')===window.savedBeforeFailure));
 await page.reload();await start();
 const layouts=[],artIndices=[];
 for(let n=0;n<3;n++){
  if(n)await switchTo('facts');
  const layout=(await read()).layoutId;layouts.push(layout);
  const rooms=(await read()).encounters;
  check(`${layout}: every trap contains 1 to 3 questions`,rooms.every(r=>r.questions>=1&&r.questions<=3));
  for(const room of rooms) {await reach(room);while((await read()).phase==='question')await answer();if((await read()).pendingGift)await collect();}
  await reach((await read()).exit);const done=await read();
  check(`${layout}: touch-only expedition reaches exit with all gifts`,done.phase==='complete'&&done.gifts.length===rooms.length&&done.progress.answered===6&&done.coins===60);
  const art=await page.locator('[data-completion-art]').getAttribute('data-completion-art');artIndices.push(art);
  check(`${layout}: completion has an illustrated home action`,await page.locator('[data-completion-art]').isVisible()&&await page.locator('#completion-home').isVisible());
  await reload();check(`${layout}: completion survives refresh`,(await read()).phase==='complete'&&(await read()).coins===60);
  check(`${layout}: completion picture stays stable after refresh`,await page.locator('[data-completion-art]').getAttribute('data-completion-art')===art);
  await page.locator('#review-result').tap();check(`${layout}: review keeps the same picture`,await page.locator('[data-completion-art]').getAttribute('data-completion-art')===art);
  await shot(layout+'-complete');
 }
 check('three consecutive adventures have different route networks',new Set(layouts).size===3);
 check('three genuine completed adventures show three different pictures',new Set(artIndices).size===3);
 // Capture in the middle of the cage must still return to its remaining original question.
 await switchTo('facts');
 await reach((await read()).encounters[0]);while((await read()).phase==='question')await answer(false);
 if((await read()).pendingGift)await collect();
 await reach((await read()).encounters[1]);
 if(await page.locator('#skip-trap-entry').isVisible())await page.locator('#skip-trap-entry').tap();
 const cage=await read(),wrong=(cage.currentQuestion.options.find(o=>o.original!==snapshot.quizzes.flatMap(b=>b.questions).find(q=>q.id===cage.currentQuestion.id).correct)).original;
 await page.locator(`[data-choice="${wrong}"]`).tap();
 check('three mistakes still enter capture without a restart',(await read()).phase==='capture');
 await reload();await page.locator('#skip-capture').tap();
 for(let i=0;i<2;i++)await answer();
 check('cage escape preserves the first three answers and restores hearts',(await read()).phase==='explore'&&(await read()).hearts===3&&(await read()).progress.answered===3);
 await reach((await read()).encounters[1]);while((await read()).phase==='question')await answer();
 check('cage completed after recovery awards its gift',(await read()).pendingGift==='cage');await collect();
 await picker();await page.setViewportSize({width:320,height:568});await shot('narrow-subject-picker');
 check('320px subject picker has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.querySelector('#game-dialog').scrollWidth<=document.querySelector('#game-dialog').clientWidth));
 check('subject picker touch controls are at least 44px',await page.locator('#new-subject-start').evaluate(el=>el.getBoundingClientRect().height>=44));
 await page.locator('#cancel-subject').tap();
 check('cancelling narrow subject picker returns to the current game',!(await read()).paused&&(await read()).phase==='explore');
 // Run with real animation frames and deliberately stall the reload: the retiring
 // page must never autosave its old subject over the newly selected adventure.
 const liveContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const live=await liveContext.newPage();live.on('pageerror',e=>errors.push(e.message));
 await live.route('**/api/quizzes/**',r=>r.fulfill({status:404,body:'{}',contentType:'application/json'}));
 await live.goto(url);await live.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled);
 await live.locator('#start-button').tap();await live.locator('#pause-button').tap();await live.locator('#change-subject').tap();await live.locator('#new-subject').selectOption('physics-pole');
 let release,notify;const heldNavigation=new Promise(resolve=>release=resolve),navigationBlocked=new Promise(resolve=>notify=resolve);
 await live.route('**/games/maze/play/index.html',async route=>{notify();await heldNavigation;await route.continue();});
 const switching=live.locator('#new-subject-start').tap();await navigationBlocked;
 await live.waitForTimeout(2300);
 const loaded=live.waitForEvent('domcontentloaded');release();await switching;await loaded;await live.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled);
 check('slow navigation cannot autosave the old subject over the new run',await live.evaluate(()=>JSON.parse(sessionStorage.getItem('prepx-shadow-maze-session-v1')).content.id==='physics-pole'));
 await live.locator('#start-button').tap();
 check('slow-reload subject switch actually enters the chosen new maze',(await live.evaluate(()=>JSON.parse(window.render_game_to_text()))).layoutId==='moon');await liveContext.close();
 check('zero page errors or data writes' ,errors.length===0&&writes.length===0);
 await writeFile(output+'report.json',JSON.stringify({url,checks,errors,writes,layouts,artIndices},null,2));
} catch(error){await shot('failure').catch(()=>{});await writeFile(output+'failure-state.json',JSON.stringify(await read(),null,2));throw error;}
finally{await browser.close();}
