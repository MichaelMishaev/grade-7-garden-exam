import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
import {places} from '../src/city-data.js';

const browser=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch();
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
await mkdir('output',{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:390,height:700},isMobile:true,hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
 const tick=ms=>page.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 await page.goto(base);await page.fill('#player-name','QA');await page.click('#start');await tick(1);
 async function arrive(goal){
   for(let i=0;i<80;i++){
     const {player}=await tick(1000);
     if(Math.hypot(player.x-goal.x,player.z-goal.z)<2.5)return;
   }
   assert.fail(JSON.stringify({goal,state:await state()}));
 }
 for(const [type,start,workAt] of [['fight',0,25],['fire',38,71],['crash',88,122],['jam',138,170]]){
   let s=await state();if(s.life.shiftTime<start)s=await tick((start-s.life.shiftTime)*1000+20);
   const event=s.life.events.find(e=>e.type===type);assert.ok(event,JSON.stringify(s.life));
   await page.click('#dispatch');const i=s.life.events.findIndex(e=>e.id===event.id);
   assert.ok(await page.locator('.city-report h3').nth(i).isVisible());await page.click('[data-observe="'+i+'"]');
   assert.ok((await state()).driving);
   if(type==='fire'){
     assert.ok((await state()).life.urgent);
     await page.keyboard.press('ArrowRight');await tick(40);
     assert.equal((await state()).life.urgent,false);
     await page.click('#dispatch');const index=(await state()).life.events.findIndex(e=>e.id===event.id);
     await page.click('[data-observe="'+index+'"]');
   }
   await arrive(event.observer);
   s=await state();if(s.life.shiftTime<workAt)s=await tick((workAt-s.life.shiftTime)*1000+20);
   assert.ok(s.life.events.some(e=>e.id===event.id&&e.phase==='working'),JSON.stringify({type,life:s.life}));
   assert.equal(s.stage,0);assert.ok(await page.locator('#scene-guide').isVisible());
   assert.ok((await page.locator('#scene-now').innerText()).length>4);
   assert.ok((await page.locator('#scene-next').innerText()).length>4);
   await page.screenshot({path:'output/city-incident-'+type+'.png'});
   if(type==='fight'){
     await page.reload();await page.click('#resume');s=await tick(1);
     assert.equal(s.life.events.find(e=>e.id===event.id)?.phase,'working');
     if(!(await state()).driving)await page.click('#vehicle');
   }
 }
 await page.click('#map');assert.equal(await page.locator('[data-place]').count(),14);
 await page.screenshot({path:'output/city-expanded-map.png'});
 await page.click('[data-place="station"]');await arrive(places.station);
 for(const place of ['court','firehouse','shipworks','freight','ferry','home']){
   await page.click('#map');await page.click('[data-place="'+place+'"]');await arrive(places[place]);
 }
 let current=(await state()).life.shiftTime;
 const nextJam=136+394*(Math.floor((current-136)/394)+1);
 while(current<nextJam){current=(await tick(Math.min(80000,(nextJam-current)*1000+25))).life.shiftTime;}
 const jam=(await state()).life.events.find(e=>e.type==='jam');assert.ok(jam);
 const waiting=[];
 for(let n=0;n<65;n++){
   const e=(await tick(2000)).life.events.find(e=>e.id===jam.id);
   if(!e)break;
   waiting.push(e.queued);
 }
 assert.ok(Math.max(...waiting)>=2,'multiple real vehicles must queue');
 assert.ok(waiting.some((n,i)=>i&&n<waiting[i-1]),'vehicles must leave the queue');
 assert.ok(!(await state()).life.events.some(e=>e.id===jam.id),'closed report must disappear');
 assert.deepEqual(errors,[]);console.log('PASS four incident scenes, dispatch approach, clock resume, six new landmarks and return to home');
}finally{await browser.close();}
