// Browser check for a manual car impact in Bay City: one counted contact with its notice and dust cue, no
// driving through the other car, backing out afterwards, and the reduced-motion version of the cue.
// Run against the dev server: CITY_QA_URL=http://127.0.0.1:5177/index.html node tests/qa-city-impact.mjs
import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {mkdir} from 'node:fs/promises';
const base=process.env.CITY_QA_URL||'http://127.0.0.1:5177/index.html';
const browser=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch(process.env.CITY_QA_ENGINE==='webkit'?{}:{args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
// The car faces the oncoming van; Up accelerates along the heading (car-relative keys).
const DRIVE={x:-.986,z:-.166},HEADING=Math.atan2(DRIVE.x,DRIVE.z),START={x:-96,z:-109};
try{
 const p=await browser.newPage({viewport:{width:390,height:700},hasTouch:true});p.setDefaultTimeout(20000);
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
 await p.goto(base+(base.includes('?')?'&':'?')+'playSeed=11');await p.fill('#player-name','QA');await p.waitForSelector('#start:not([disabled])');await p.click('#start');
 // Resume a valid shift in the first parked car, just ahead of the first traffic car on its eastbound leg.
 await p.addInitScript(({start,heading})=>{
  const key='prepx-festival-city-v1',draft=JSON.parse(sessionStorage.getItem(key));
  if(draft){Object.assign(draft.city,{driving:true,...start,fleet:{active:'parked-0',cars:[{id:'parked-0',x:start.x,z:start.z,heading}]}});sessionStorage.setItem(key,JSON.stringify(draft));}
 },{start:START,heading:HEADING});
 await p.reload();await p.click('#resume');await p.evaluate(()=>advanceTime(1));
 const tick=ms=>p.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 const move=(a,b)=>Math.hypot(a.player.x-b.player.x,a.player.z-b.player.z);
 // Distance between the player's car and the first traffic car (life.car), both 6 m long and nose to nose.
 const gap=s=>Math.hypot(s.player.x-s.life.car[0],s.player.z-s.life.car[1]);
 let state=await tick(0);
 assert.equal(state.driving,true);assert.equal(state.life.impacts,0);
 await p.keyboard.down('ArrowUp');
 for(let i=0;i<30;i++){state=await tick(20);if(state.life.impacts)break;}
 assert.equal(state.life.impacts,1);
 assert.match(await p.locator('#notice').textContent(),/התנגשות/);
 let held=await tick(50);assert.ok(held.life.impactVisible);await mkdir('output',{recursive:true});await p.screenshot({path:'output/city-impact.png'});
 // The struck car is shoved back (it no longer stands like a wall), so the player's car follows it a little
 // way with the pedal still down. It must never enter the other car, count a second contact, or keep going.
 let closest=gap(held),before=held;
 for(let i=0;i<9;i++){before=held;held=await tick(50);closest=Math.min(closest,gap(held));}
 assert.equal(held.life.impacts,1);
 assert.ok(closest>6,'the cars never overlap: '+closest.toFixed(2));
 assert.ok(move(held,state)<4,'pushed along a short way only: '+move(held,state).toFixed(2));
 assert.ok(move(held,before)<.1,'then held at the bumper: '+move(held,before).toFixed(2));
 // Steering alone cannot turn a car out of a bumper-to-bumper stop any more; it backs out while steering.
 await p.keyboard.up('ArrowUp');await p.keyboard.down('ArrowDown');await p.keyboard.down('ArrowRight');
 const free=await tick(1000);await p.keyboard.up('ArrowDown');await p.keyboard.up('ArrowRight');
 assert.ok(move(free,held)>6,'backed clear: '+move(free,held).toFixed(2));
 assert.ok(gap(free)>gap(held)+1,'and away from the other car, which drives on behind: '+gap(free).toFixed(2));
 assert.ok(Math.abs(Math.atan2(Math.sin(free.vehicle.vehicle.heading-held.vehicle.vehicle.heading),Math.cos(free.vehicle.vehicle.heading-held.vehicle.vehicle.heading)))>.15,'and turned while backing');
 assert.equal(free.life.impacts,1);
 // Reduced motion: the traffic car reaches the standing car; the contact is counted and announced with no dust.
 await p.emulateMedia({reducedMotion:'reduce'});await p.reload();await p.click('#resume');
 const parked=await tick(2300);assert.equal(parked.life.impacts,1);assert.equal(parked.life.impactVisible,false);
 assert.match(await p.locator('#notice').textContent(),/התנגשות/);
 assert.deepEqual(errors,[]);
 console.log('PASS reduced-motion cue and manual impact, single contact cue, blocked penetration and reversing recovery');
}finally{await browser.close();}
