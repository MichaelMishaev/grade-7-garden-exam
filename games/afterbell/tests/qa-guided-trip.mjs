import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const base=process.env.PREPX_QA_URL||'http://127.0.0.1:4321';
const browser=await chromium.launch();const errors=[],posts=[];
try{
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3.5,userAgent:'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'});
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/afterbell/attempts',r=>{posts.push('attempt');return r.abort();});
 await page.route('**/api/submit-exam',r=>{posts.push('exam');return r.abort();});
 const response=await page.goto(base+'/games/afterbell/play/index.html?v=guided-2',{waitUntil:'load'});
 assert.equal(response.headers()['cache-control'],'no-cache');
 await page.waitForFunction(()=>typeof render_game_to_text==='function'&&!document.querySelector('#start').disabled);
 assert.equal(await page.evaluate(()=>typeof window.__afterbell),'undefined');
 const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
 assert.equal((await state()).source,'database');
 await page.locator('#player-name').fill('בדיקת מסלול');await page.locator('#start').tap();await page.locator('#begin-adventure').tap();
 async function walk(){
   if(!(await state()).mission.navigation.arrived)await page.locator('#follow-path').tap();
   for(let i=0;i<25&&!(await state()).mission.navigation.arrived;i++)await page.evaluate(()=>advanceTime(2000));
   if(!(await state()).mission.navigation.arrived){const s=await state();console.log(JSON.stringify({failurePlayer:s.player,mission:s.mission,mode:s.mode,target:s.target}));await page.screenshot({path:'output/live-guided-failure.png',scale:'css'});}assert.ok((await state()).mission.navigation.arrived);assert.ok(!(await state()).mission.navigation.blocked);
   await page.locator('#follow-path').tap();
 }
 assert.equal((await state()).mission.objective.id,'raccoon:meet');await walk();assert.equal((await state()).mode,'dialogue');
 await page.locator('.social[data-choice="0"]').tap();await page.locator('#track-equipment').tap();
 assert.equal((await state()).mission.objective.id,'antenna:find');await walk();
 assert.ok(await page.locator('#collect-equipment').isDisabled());
 for(let i=0;i<4;i++)await page.locator('#channel-up').tap();await page.locator('#test-signal').tap();
 assert.ok(await page.locator('#collect-equipment').isEnabled());await page.locator('#collect-equipment').tap();
 assert.equal((await state()).mission.objective.id,'raccoon:return');await walk();assert.equal((await state()).mode,'question');
 assert.equal((await state()).answered,0);assert.equal(posts.length,0);assert.deepEqual(errors,[]);
 await page.screenshot({path:'output/live-guided-question.png',scale:'css',timeout:20000});
 const result={publicHttps:new URL(base).protocol==='https:',cache:'no-cache',source:(await state()).source,noDevHooks:true,androidProfile:'S24 Ultra / Chromium emulation',guidedMeeting:true,guidedEquipment:true,antennaPuzzle:true,guidedReturn:true,sourceQuestionOpened:true,productionAttemptOrEmailPosts:posts.length,errors};
 await writeFile('output/live-guided-report.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}
