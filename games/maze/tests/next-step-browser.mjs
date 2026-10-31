import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createState} from '../core.js';
import {normalizeMazeContent} from '../content.js';
import snapshot from '../content-snapshot.js';
const content=normalizeMazeContent(snapshot.quizzes[0]),state=createState(content.questions);
delete state.giftsSeen;
state.answers=Object.fromEntries(content.questions.map(q=>[q.id,{choice:q.correct,correct:true}]));
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
await context.addInitScript(f=>{window.requestAnimationFrame=()=>0;if(!sessionStorage.getItem('prepx-shadow-maze-session-v1'))sessionStorage.setItem('prepx-shadow-maze-session-v1',JSON.stringify(f));},{content,state});
const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await context.route('**/api/**',r=>r.fulfill({status:200,body:'{}',contentType:'application/json'}));
async function start(){await page.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});await page.locator('#start-button').tap();await page.evaluate(()=>window.advanceTime(0));}
const read=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
try{
await page.goto('http://127.0.0.1:4399/games/maze/play/index.html');await start();
assert(await page.locator('#exit-next-step').isVisible());assert((await read()).guidePath.length>0);await page.screenshot({path:'output/next-step-guidance.png',fullPage:true});console.log('PASS resumed traps show free exit route and guidance');
await page.reload();await start();assert(await page.locator('#exit-next-step').isVisible());const before=await read();
await page.locator('#guide-exit').tap();
for(let i=0;i<500&&(await read()).phase!=='complete';i++)await page.evaluate(()=>window.advanceTime(100));
assert.equal((await read()).phase,'complete');assert.equal((await read()).coins,before.coins);
assert.equal(await page.locator('#next-challenge').getAttribute('href'),'./arcade.html?quiz=facts');
assert(await page.locator('#completion-home').isVisible());assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.screenshot({path:'output/next-step-finish.png',fullPage:true});console.log('PASS guidance reaches finish and boss link retains subject');assert.deepEqual(errors,[]);
const fresh=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
await fresh.route('**/api/**',r=>r.fulfill({status:200,body:'{}',contentType:'application/json'}));
const intro=await fresh.newPage();await intro.goto('http://127.0.0.1:4399/games/maze/play/index.html');await intro.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});await intro.locator('#start-button').tap();assert(await intro.locator('#exit-next-step').isHidden());await fresh.close();console.log('PASS fresh run keeps normal exploration');
}finally{await browser.close();}
