// Render-only QA fixtures: gameplay/rotation acceptance is in adventures-browser.mjs.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {createState,EXIT} from '../core.js';
import {normalizeMazeContent} from '../content.js';
import snapshot from '../content-snapshot.js';
const url=process.env.MAZE_QA_URL||'http://127.0.0.1:5188/';
const output=new URL('../../../output/maze/completion/',import.meta.url).pathname;await mkdir(output,{recursive:true});
const content=normalizeMazeContent(snapshot.quizzes[0]);
const completedFixture=()=>{
 const state=createState(content.questions);state.phase='complete';state.player={...EXIT};state.checkpoint={...EXIT};
 state.answers=Object.fromEntries(content.questions.map(q=>[q.id,{choice:q.correct,correct:true}]));
 return {content,state};
};
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await context.addInitScript(fixture=>{if(!sessionStorage.getItem('prepx-shadow-maze-session-v1'))sessionStorage.setItem('prepx-shadow-maze-session-v1',JSON.stringify(fixture));},completedFixture());
const page=await context.newPage(),checks=[],errors=[],writes=[],endings=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
const start=async()=>{await page.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});await page.locator('#start-button').tap();await page.evaluate(()=>{window.requestAnimationFrame=()=>0;window.advanceTime(0);});};
const art=()=>page.locator('[data-completion-art]').getAttribute('data-completion-art');
async function ensureImage(){
 return page.locator('.completion-picture').evaluate(async el=>{
  const src=getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];const image=new Image();image.src=src;await image.decode();return {width:image.naturalWidth,height:image.naturalHeight,src};
 });
}
try{
 await page.goto(url,{waitUntil:'commit'});console.log('READY document');await start();console.log('READY completion');
 const pictures=[];
 for(let i=0;i<1;i++){
  if(i){await page.evaluate(fixture=>sessionStorage.setItem('prepx-shadow-maze-session-v1',JSON.stringify(fixture)),completedFixture());await page.reload({waitUntil:'commit'});await start();}
  const index=await art();pictures.push(index);console.log('READY art',index);const image=await ensureImage();
  check(`fixture ${i}: packaged illustration loads and has accessible description`,image.width===1024&&image.height===1536&&!!await page.locator('.completion-picture').getAttribute('aria-label'));
  check(`fixture ${i}: clear Home, new adventure and review controls exist`,await page.locator('#completion-home').isVisible()&&await page.locator('#completion-home').getAttribute('href')==='/index.html'&&await page.locator('#change-subject').isVisible()&&await page.locator('#review-result').isVisible());
  await page.screenshot({path:output+`scene-${index}-mobile.png`,fullPage:true});
  await page.locator('#review-result').tap();check(`fixture ${i}: reviewing keeps the same illustration`,await art()===index&&await page.locator('.review-item').count()===6);
  await page.locator('#back-to-celebration').tap();await page.reload({waitUntil:'commit'});await start();
  check(`fixture ${i}: refresh preserves illustration and original results`,await art()===index&&await page.evaluate(()=>{const saved=JSON.parse(sessionStorage.getItem('prepx-shadow-maze-session-v1'));return saved.state.coins===60&&Object.keys(saved.state.answers).length===6;}));
 }
 check('the completed fixture selects one of the three atlas panels',['0','1','2'].includes(pictures[0]));
 for(const [width,height]of [[320,568],[375,812],[768,1024],[1024,768],[1440,900],[844,390]]){
  await page.setViewportSize({width,height});await ensureImage();
  check(`${width}x${height}: completion has no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.querySelector('#game-dialog').scrollWidth<=document.querySelector('#game-dialog').clientWidth));
  check(`${width}x${height}: main touch actions are at least 44px`,await page.locator('#completion-home,#change-subject,#review-result').evaluateAll(elements=>elements.every(el=>el.getBoundingClientRect().height>=44)));
  await page.locator('#completion-home').scrollIntoViewIfNeeded();
  check(`${width}x${height}: Home remains reachable inside the scrollable dialog`,await page.locator('#completion-home').evaluate(el=>{const r=el.getBoundingClientRect(),d=document.querySelector('#game-dialog').getBoundingClientRect();return r.top>=d.top&&r.bottom<=d.bottom&&r.bottom<=innerHeight;}));
  await page.locator('#review-result').scrollIntoViewIfNeeded();
  check(`${width}x${height}: final action is reachable`,await page.locator('#review-result').evaluate(el=>{const r=el.getBoundingClientRect(),d=document.querySelector('#game-dialog').getBoundingClientRect();return r.top>=d.top&&r.bottom<=d.bottom;}));
  await page.locator('.completion-score-note').scrollIntoViewIfNeeded();
  const ending=await page.locator('.completion-score-note').evaluate(el=>{const note=el.getBoundingClientRect(),sheet=document.querySelector('#game-dialog').getBoundingClientRect();return {clearance:sheet.bottom-note.bottom,scrollHeight:document.querySelector('#game-dialog').scrollHeight,clientHeight:document.querySelector('#game-dialog').clientHeight};});
  endings.push({width,height,...ending});check(`${width}x${height}: scroll ends without obscuring final text or excess blank space`,ending.clearance>=0&&ending.clearance<=32);
  if(width===320||width===1440||width===844)await page.screenshot({path:output+`completion-${width}x${height}.png`,fullPage:true});
 }
 await page.emulateMedia({reducedMotion:'reduce'});check('reduced motion keeps the completion illustration and Home visible',await page.locator('.completion-picture').count()===1&&await page.locator('#completion-home').isVisible());
 check('no page errors or student writes',errors.length===0&&writes.length===0);
 await writeFile(output+'report.json',JSON.stringify({url,kind:'synthetic completed-run UI fixtures; not gameplay acceptance',checks,errors,writes,pictures,endings},null,2));
}catch(e){await page.screenshot({path:output+'failure.png',fullPage:true}).catch(()=>{});throw e;}finally{await browser.close();}
