// Browser check for overtaking on an urgent drive in Bay City: the guided car comes up behind a slower
// traffic car on a straight, moves into the clear next lane, passes it, merges back and reaches the scene.
// Run against the dev server: CITY_QA_URL=http://127.0.0.1:5177/index.html node tests/qa-city-overtake.mjs
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {vansTouch} from '../src/city-traffic.js';

const base=process.env.CITY_QA_URL||'http://127.0.0.1:5177/index.html';
const browser=await chromium.launch({args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
await mkdir('output/overtake',{recursive:true});
let checks=0;const ok=(value,label)=>{assert.ok(value,label);checks++;};
// The shift resumes in a car on the southbound lane (x=-2), 268 s in, when the fire by the radio tower is
// reported 112 m away; the route there runs down this lane. traffic-1 turns into the lane from the cross street
// about 3 s after the city starts, at 7 m/s. (The first report, the gardens argument, is not used: the same pass
// happens on the way there, but that drive ends with the car standing at (-1,35) on the centre line of the
// street, where the next northbound traffic car runs into it about 1.5 s after arrival.)
const START={x:-2,z:-124},HEADING=0,LEAD='traffic-1',LANE=-2,ELAPSED=268,REPORT='0-radio-fire';
try{
 const page=await browser.newPage({viewport:{width:1100,height:780}});page.setDefaultTimeout(20000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
 const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
 const tick=ms=>page.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 const lead=s=>s.vehicles.find(v=>v.id===LEAD);
 await page.goto(base+(base.includes('?')?'&':'?')+'playSeed=11');await page.fill('#player-name','QA');await page.waitForSelector('#start:not([disabled])');await page.click('#start');
 await page.addInitScript(({start,heading,elapsed})=>{
  const key='prepx-festival-city-v1',draft=JSON.parse(sessionStorage.getItem(key));
  if(draft){draft.round.elapsed=elapsed;Object.assign(draft.city,{driving:true,...start,fleet:{active:'parked-0',cars:[{id:'parked-0',x:start.x,z:start.z,heading}]}});sessionStorage.setItem(key,JSON.stringify(draft));}
 },{start:START,heading:HEADING,elapsed:ELAPSED});
 await page.reload();await page.click('#resume');await page.evaluate(()=>advanceTime(1));
 // Wait in the lane until the traffic car has turned in ahead and is driving away down the same lane.
 let s=await tick(4000);
 ok(s.driving&&s.life.passes===0&&s.life.impacts===0,'waiting in the car, nothing passed or hit yet');
 const event=s.life.events.find(e=>e.id===REPORT);ok(event&&event.type==='fire'&&event.phase==='reported','the radio tower fire is reported: '+JSON.stringify(s.life.events.map(e=>e.id)));
 const gap=lead(s).z-s.player.z;
 ok(Math.abs(lead(s).x-LANE)<.1&&Math.abs(s.player.x-LANE)<.1&&Math.cos(lead(s).heading-HEADING)>.99&&gap>11&&gap<26,'a slower car is ahead in the same lane, heading the same way: '+gap.toFixed(1)+' m');
 await page.click('#dispatch');
 ok(/נסיעה דחופה/.test(await page.locator('[data-observe="'+s.life.events.findIndex(e=>e.id===event.id)+'"]').textContent()),'the report offers an urgent drive');
 await page.click('[data-observe="'+s.life.events.findIndex(e=>e.id===event.id)+'"]');
 s=await state();ok(s.life.urgent,'the car is on an urgent drive');
 // The pass: out of the lane, alongside with room between the cars, ahead of the other car, back in the lane.
 // A guided car that is held against another car counts no impact, so the two footprints are compared as well.
 let out=0,side=Infinity,merged=null,shot=false;
 for(let i=0;i<120&&!merged;i++){
  s=await tick(50);const l=lead(s),across=s.player.x-l.x,along=s.player.z-l.z;
  assert.equal(s.life.impacts,0,'no crash during the pass');
  assert.ok(!vansTouch(s.player.x,s.player.z,s.vehicle.vehicle.heading,l.x,l.z,l.heading),'the cars never touch: '+JSON.stringify([s.player.x,s.player.z,s.vehicle.vehicle.heading,l.x,l.z]));
  out=Math.max(out,s.player.x-LANE);
  if(Math.abs(along)<3){side=Math.min(side,Math.abs(across));if(!shot){shot=true;await page.screenshot({path:'output/overtake/alongside.png'});}}
  if(s.life.passes&&along>6&&Math.abs(s.player.x-LANE)<.1)merged={along,urgent:s.life.urgent,leadX:l.x};
 }
 ok(s.life.passes>=1,'the urgent drive planned a pass: '+s.life.passes);
 ok(out>3.5&&out<4.5,'it moved one lane over: '+out.toFixed(2));
 ok(side>3.7&&side<Infinity,'and went by a full lane apart, never touching: '+side.toFixed(2));
 ok(merged&&Math.abs(merged.leadX-LANE)<.1,'then merged back ahead of the other car, which kept its lane: '+JSON.stringify(merged));
 ok(merged.urgent,'still on the urgent drive after the pass');
 await page.screenshot({path:'output/overtake/merged.png'});
 const near=s=>Math.hypot(s.player.x-event.observer.x,s.player.z-event.observer.z);
 for(let i=0;i<60&&s.life.urgent;i++){s=await tick(500);assert.equal(s.life.impacts,0,'no crash on the way');}
 s=await tick(1500);await page.waitForTimeout(250);
 ok(!s.life.urgent,'the urgent drive ended');
 ok(near(s)<12,'arrived by the scene: '+JSON.stringify([s.player.x,s.player.z,event.observer]));
 ok(s.life.passes>=1&&s.life.impacts===0&&s.life.crash.walkerHits===0,'with the pass counted, no car crash and nobody hit: '+JSON.stringify([s.life.passes,s.life.impacts,s.life.crash.walkerHits]));
 ok(await page.locator('#scene-guide').isVisible(),'the on-scene guide is shown');
 await page.screenshot({path:'output/overtake/arrived.png'});
 ok(!errors.length,'no page errors: '+errors.join(' | '));
 console.log('PASS '+checks+' overtake checks: car ahead in lane, urgent drive, lane change, clean pass, merge, arrival without a crash');
}finally{await browser.close();}
