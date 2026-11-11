import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
import {places} from '../src/city-data.js';

const browser=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch(process.env.CITY_QA_ENGINE==='webkit'?{}:{args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
await mkdir('output',{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1100,height:780}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
 const tick=ms=>page.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 await page.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
 await page.goto(base);await page.fill('#player-name','QA');await page.click('#start');await tick(1);
 // The incidents and landmarks span all three districts, so this player already has them open.
 await page.addInitScript(()=>{
  const key='prepx-festival-city-v1',draft=JSON.parse(sessionStorage.getItem(key));
  if(draft&&!sessionStorage.getItem('qa-open')){sessionStorage.setItem('qa-open','1');draft.city.career={done:[],legacyNorth:true,legacyEast:true};sessionStorage.setItem(key,JSON.stringify(draft));localStorage.setItem('prepx-city-discovery-v1:QA',JSON.stringify(draft.city.career));}
 });
 await page.reload();await page.click('#resume');await tick(1);
 // Urgent driving needs a car: take the one parked by the team house.
 await page.click('#vehicle');assert.ok((await state()).driving,'took the car');
 // A guided car parks a few metres short of an occupied forecourt, so arrival is judged from the car.
 async function arrive(goal,radius=14){
   const trail=[];
   for(let i=0;i<260;i++){
     const {player,vehicle,life}=await tick(1000);
     if(Math.hypot(player.x-goal.x,player.z-goal.z)<radius)return;
     trail.push([Math.round(player.x),Math.round(player.z),vehicle.speed,Math.round(life.shiftTime)]);
   }
   assert.fail(JSON.stringify({goal:[goal.x,goal.z],status:await page.locator('#status').textContent(),route:await page.locator('#route').textContent(),events:(await state()).life.events.map(e=>[e.type,e.phase,e.x,e.z]),trail:trail.filter((_,i)=>i%4===0)}));
 }
 for(const [type,start,workAt] of [['fight',0,25],['fire',38,71],['crash',88,122],['jam',138,170]]){
   let s=await state();if(s.life.shiftTime<start)s=await tick((start-s.life.shiftTime)*1000+20);
   const event=s.life.events.find(e=>e.type===type);assert.ok(event,JSON.stringify(s.life));
   await page.click('#dispatch');const i=s.life.events.findIndex(e=>e.id===event.id);
   assert.ok(await page.locator('.city-report h3').nth(i).isVisible());await page.click('[data-observe="'+i+'"]');
   assert.ok((await state()).driving);
   if(type==='fire'){
     assert.ok((await state()).life.urgent);
     await page.keyboard.down('ArrowRight');await tick(40);await page.keyboard.up('ArrowRight');
     assert.equal((await state()).life.urgent,false);
     await page.click('#dispatch');const index=(await state()).life.events.findIndex(e=>e.id===event.id);
     await page.click('[data-observe="'+index+'"]');
   }
   await arrive(event.observer,11.5);await tick(1500);
   s=await state();if(s.life.shiftTime<workAt)s=await tick((workAt-s.life.shiftTime)*1000+20);
   assert.ok(s.life.events.some(e=>e.id===event.id&&e.phase==='working'),JSON.stringify({type,life:s.life}));
   assert.equal(s.stage,0);await page.waitForTimeout(250);assert.ok(await page.locator('#scene-guide').isVisible(),'on-scene guide at '+type+': '+JSON.stringify({player:[s.player.x,s.player.z],observer:event.observer,distance:Math.hypot(s.player.x-event.observer.x,s.player.z-event.observer.z),route:await page.locator('#route').textContent(),near:s.vehicles.filter(v=>Math.hypot(v.x-event.observer.x,v.z-event.observer.z)<20).map(v=>[v.id,Math.round(v.x),Math.round(v.z)])}));
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
 const nextJam=136+480*(Math.floor((current-136)/480)+1);
 while(current<nextJam){current=(await tick(Math.min(80000,(nextJam-current)*1000+25))).life.shiftTime;}
 const jam=(await state()).life.events.find(e=>e.type==='jam');assert.ok(jam);
 const waiting=[];
 for(let n=0;n<65;n++){
   const e=(await tick(2000)).life.events.find(e=>e.id===jam.id);
   if(!e)break;
   waiting.push(e.queued);
 }
 assert.ok(Math.max(...waiting)>=2,'multiple real vehicles must queue: '+JSON.stringify({jam,current,waiting,player:(await state()).player,near:(await state()).vehicles.filter(v=>Math.hypot(v.x-jam.x,v.z-jam.z)<70).map(v=>[v.id,Math.round(v.x),Math.round(v.z),v.parked])}));
 assert.ok(waiting.some((n,i)=>i&&n<waiting[i-1]),'vehicles must leave the queue: '+JSON.stringify({waiting,events:(await state()).life.events.map(e=>[e.type,e.phase,e.x,e.z]),near:(await state()).vehicles.filter(v=>v.x>224).map(v=>[v.id,Math.round(v.x),Math.round(v.z),Number(v.heading.toFixed(2)),v.parked])}));
 assert.ok(!(await state()).life.events.some(e=>e.id===jam.id),'closed report must disappear: '+JSON.stringify(waiting));
 assert.deepEqual(errors,[]);console.log('PASS four incident scenes, dispatch approach, clock resume, six new landmarks and return to home');
}finally{await browser.close();}
