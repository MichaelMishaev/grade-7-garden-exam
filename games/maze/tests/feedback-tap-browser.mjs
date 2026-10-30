import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import snapshot from '../content-snapshot.js';
import {pathTo} from '../core.js';
const base=process.env.MAZE_QA_URL||'http://127.0.0.1:5188/';
const output=new URL('../../../output/maze/feedback-tap/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await context.addInitScript(()=>{Math.random=()=>.999999;window.requestAnimationFrame=()=>0;});
await context.route('**/api/quizzes/**',route=>route.fulfill({status:404,body:'{}',contentType:'application/json'}));
const page=await context.newPage(),checks=[],errors=[],writes=[];
page.on('pageerror',error=>errors.push(error.message));page.on('request',request=>{if(request.method()!=='GET')writes.push(request.url());});
const read=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
const advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
const ready=()=>page.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});
const questions=new Map(snapshot.quizzes.flatMap(bank=>bank.questions).map(q=>[q.id,q]));
const choose=async(correct=true)=>{
 if(await page.locator('#skip-trap-entry').isVisible())await page.locator('#skip-trap-entry').tap();
 const state=await read(),q=questions.get(state.currentQuestion.id),choice=correct?q.correct:(q.correct+1)%q.choices.length;
 await page.locator(`[data-choice="${choice}"]`).tap();
};
const continueRead=async()=>{await page.locator('#read-feedback').tap();await page.locator('#continue-button').tap();};
const shot=async name=>{await advance(0);await page.screenshot({path:output+name+'.png',fullPage:true});};
try{
 await page.goto(base);await ready();await page.locator('#start-button').tap();
 for(const direction of ['down','down','down','down','right','right','right']){await page.locator(`[data-direction="${direction}"]`).tap();await advance(900);}
 await choose();check('ordinary feedback has no disappearing continue button',await page.locator('#continue-button').count()===0&&!await page.locator('#dialog-content').textContent().then(text=>text.includes('להמשיך בדרך')));
 const first=await read();
 const cdp=await context.newCDPSession(page),box=await page.locator('#read-feedback').boundingBox();
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+box.width/2,y:box.y+box.height/2}]});
 await page.waitForFunction(id=>JSON.parse(window.render_game_to_text()).currentQuestion?.id!==id,first.currentQuestion.id,{polling:50,timeout:5000});
 const incoming=await page.locator('[data-choice]').first().boundingBox();
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:incoming.x+incoming.width/2,y:incoming.y+incoming.height/2}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 check('held finger released across auto-advance cannot answer next question',(await read()).phase==='question'&&(await read()).progress.answered===1&&(await read()).coins===10);
 await page.locator('[data-choice]').first().evaluate(el=>el.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1})));
 check('late compatibility click without a fresh press is rejected',(await read()).progress.answered===1&&(await read()).phase==='question');
 await choose();check('a fresh deliberate mobile tap still answers normally',(await read()).progress.answered===2&&(await read()).coins===20);
 await page.locator('#feedback-explanation summary').tap();await page.locator('#continue-button').waitFor({state:'visible'});
 check('opening explanation reveals deliberate reading continuation',await page.locator('#continue-button').isVisible()&&await page.locator('#feedback-explanation').evaluate(el=>el.open));
 await page.waitForTimeout(1800);check('reading stops auto-advance and keeps disclosure open',(await read()).phase==='feedback'&&await page.locator('#feedback-explanation').evaluate(el=>el.open));
 await shot('reading-feedback');await page.locator('#continue-button').tap();
 check('manual reading continuation exits the completed trap',(await read()).phase==='explore');
 if(await page.locator('#collect-gift').isVisible())await page.locator('#collect-gift').tap();
 // Reach cage with real buttons, then test keyboard and review controls.
 for(let i=0;i<60;i++){
  const state=await read();if(state.phase==='question')break;
  const next=pathTo(state.player,state.encounters[1])[0];assert.ok(next);
  const direction=next.x>state.player.x?'right':next.x<state.player.x?'left':next.y>state.player.y?'down':'up';
  await page.locator(`[data-direction="${direction}"]`).tap();await advance(900);
 }
 if(await page.locator('#skip-trap-entry').isVisible())await page.locator('#skip-trap-entry').tap();
 check('second trap reached for input regression',(await read()).phase==='question');
 const q=(await read()).currentQuestion,qCorrect=questions.get(q.id).correct;
 await page.locator(`[data-choice="${qCorrect}"]`).focus();await page.keyboard.press('Enter');
 check('keyboard activation remains available',(await read()).phase==='feedback'&&(await read()).progress.answered===3);
 await page.locator('#read-feedback').tap();check('read button reveals a stable resume action',await page.locator('#continue-button').isVisible());
 await page.locator('#continue-button').focus();await page.keyboard.down('Enter');
 const next=await read();
 if(next.phase==='question'){
  await page.keyboard.down('Enter');await page.keyboard.up('Enter');
  check('held-key repeat does not submit an incoming question',(await read()).progress.answered===3);
 }
 check('zero runtime errors and data writes',errors.length===0&&writes.length===0);
 await writeFile(output+'report.json',JSON.stringify({base,checks,errors,writes},null,2));
}catch(error){await shot('failure').catch(()=>{});await writeFile(output+'failure-state.json',JSON.stringify(await read(),null,2));throw error;}
finally{await browser.close();}
