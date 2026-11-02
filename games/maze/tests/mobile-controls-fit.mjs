import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createState} from '../core.js';
import {normalizeMazeContent} from '../content.js';
import snapshot from '../content-snapshot.js';
import {joystickStep} from './joystick-touch.mjs';
const content=normalizeMazeContent(snapshot.quizzes[0]);
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
for(const complete of [false,true]){
 const state=createState(content.questions);if(complete){delete state.giftsSeen;state.answers=Object.fromEntries(content.questions.map(q=>[q.id,{choice:q.correct,correct:true}]));}
 const context=await browser.newContext({viewport:{width:390,height:720},isMobile:true,hasTouch:true});
 await context.addInitScript(f=>{window.requestAnimationFrame=()=>0;sessionStorage.setItem('prepx-shadow-maze-session-v1',JSON.stringify(f));},{content,state});
 await context.route('**/api/**',r=>r.fulfill({status:200,body:'{}',contentType:'application/json'}));
 const page=await context.newPage();await page.goto(process.env.MAZE_QA_URL||'http://127.0.0.1:4399/games/maze/play/index.html');
 await page.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});await page.locator('#start-button').tap();
 for(const [width,height] of [[390,720],[360,640],[320,568],[390,600]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>window.advanceTime(0));
  for(const id of ['movement-joystick','interact-button','map-button','journal-button','world-map-button']){
   const r=await page.locator('#'+id).boundingBox();assert(r&&r.y>=0&&r.y+r.height<=height&&r.x>=0&&r.x+r.width<=width,`${id} clipped at ${width}x${height}, complete=${complete}: ${JSON.stringify(r)}`);
  }
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:`output/controls-fit-${width}-${height}-${complete}.png`,fullPage:true});console.log('PASS controls fully visible',width,height,'complete',complete);
 }
 if(!complete){await joystickStep(page,'down');assert.equal(await page.evaluate(()=>JSON.parse(window.render_game_to_text()).player.y),2);console.log('PASS visible joystick accepts actual touch movement');}
 await context.close();
}
}finally{await browser.close();}
