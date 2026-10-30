import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import snapshot from '../content-snapshot.js';
import {pathTo} from '../core.js';
import {joystickStep} from './joystick-touch.mjs';
const base=process.env.MAZE_QA_URL||'http://127.0.0.1:5192/';
const output=new URL('../../../output/maze/answer-reactions/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=[],errors=[],writes=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
const questions=new Map(snapshot.quizzes.flatMap(bank=>bank.questions).map(q=>[q.id,q]));
try{
 for(const reducedMotion of ['no-preference','reduce']){
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion});
  await context.addInitScript(()=>{Math.random=()=>.999999;window.requestAnimationFrame=()=>0;});
  await context.route('**/api/quizzes/**',route=>route.fulfill({status:200,body:JSON.stringify({questions:[]}),contentType:'application/json'}));
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
  const read=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
  const advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
  const shot=async name=>{await advance(0);await page.screenshot({path:output+reducedMotion+'-'+name+'.png',fullPage:true});};
  const start=async()=>{await page.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});await page.locator('#start-button').tap();};
  const reach=async()=>{
   for(let i=0;i<80;i++){
    const s=await read();if(s.phase==='question')break;
    if(await page.locator('#collect-gift').isVisible())await page.locator('#collect-gift').tap();
    const room=s.encounters.find(r=>!r.resolved),next=pathTo(s.player,room)[0];assert.ok(next);
    const d=next.x>s.player.x?'right':next.x<s.player.x?'left':next.y>s.player.y?'down':'up';
    await joystickStep(page,d);await advance(600);
   }
   if(await page.locator('#skip-trap-entry').isVisible())await page.locator('#skip-trap-entry').tap();
  };
  const choose=async correct=>{
   const s=await read(),q=questions.get(s.currentQuestion.id);
   await page.locator(`[data-choice="${correct?q.correct:(q.correct+1)%q.choices.length}"]`).tap();
   if((await read()).phase==='feedback')await page.locator('#read-feedback').tap();
  };
  await page.goto(base);await start();await reach();
  await choose(true);
  check(reducedMotion+' correct answer triggers positive reaction',(await read()).answerReaction?.correct===true);
  await advance(225);await shot('correct');
  const before=await read();
  await page.locator('#encounter-menu').tap();await advance(500);
  check(reducedMotion+' pause freezes reaction',(await read()).answerReaction.elapsedMs===before.answerReaction.elapsedMs);
  await page.locator('#resume-button').tap();await advance(900);
  check(reducedMotion+' settles without changing reward',(await read()).answerReaction===null&&(await read()).coins===10);
  await page.locator('#continue-button').tap();
  for(let i=0;i<3;i++){
   if((await read()).phase==='explore')await reach();
   await choose(false);
   check(reducedMotion+' wrong answer '+(i+1)+' triggers negative reaction',(await read()).answerReaction?.correct===false);
   await advance(225);await shot('wrong-'+i);
   if(i<2)await page.locator('#continue-button').tap();
  }
  if(await page.locator('#skip-capture').isVisible())await page.locator('#skip-capture').tap();
  check(reducedMotion+' zero hearts still enters recovery',['review','review-feedback'].includes((await read()).phase));
  await choose(false);check(reducedMotion+' review mistake reacts',(await read()).answerReaction?.correct===false);
  await page.locator('#continue-button').tap();await choose(true);
  check(reducedMotion+' review success reacts',(await read()).answerReaction?.correct===true);
  await advance(225);await shot('review-correct');
  const saved=await read();await page.reload();await start();
  check(reducedMotion+' reload keeps progress without replaying reaction',(await read()).answerReaction===null&&(await read()).coins===saved.coins&&(await read()).progress.answered===saved.progress.answered);
  check(reducedMotion+' no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await context.close();
 }
 check('zero application errors and data writes',errors.length===0&&writes.length===0);
}finally{
 await writeFile(output+'report.json',JSON.stringify({base,checks,errors,writes},null,2));
 await browser.close();
}
