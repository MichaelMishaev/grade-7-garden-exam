// Browser check for crash reactions in Bay City: a resident jumps clear of a slow car and is thrown by a
// fast one, a hard crash rolls the other car over and throws parts off, and everything settles again.
// Run against the dev server: CITY_QA_URL=http://127.0.0.1:5177/index.html node tests/qa-city-crash.mjs
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const base=process.env.CITY_QA_URL||'http://127.0.0.1:5177/index.html';
const browser=await chromium.launch({args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
await mkdir('output/crash',{recursive:true});
// The car starts facing this way and Up accelerates along its heading (car-relative keys).
const DRIVE={x:-.986,z:-.166},HEADING=Math.atan2(DRIVE.x,DRIVE.z);
// Resident i of the 32 in the central grid at world time t (circuit() in city-world.js).
function resident(i,t){
 const x=(i%8-4)*56+5,z=(Math.floor(i/8)-2)*56+5,speed=1.6+i%3*.25,dwell=2+i%3,size=46;
 const duration=size/speed+dwell,period=4*duration,u=((t+i*7)%period+period)%period,leg=Math.floor(u/duration),d=Math.min(size,(u%duration)*speed);
 const corner=[[0,0],[size,0],[size,size],[0,size]][leg],dx=[1,0,-1,0][leg],dz=[0,1,0,-1][leg];
 return {x:x+corner[0]+dx*d,z:z+corner[1]+dz*d};
}
async function open(start,reducedMotion){
 const p=await browser.newPage({viewport:{width:900,height:700}});p.setDefaultTimeout(20000);
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 if(reducedMotion)await p.emulateMedia({reducedMotion:'reduce'});
 await p.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
 await p.goto(base+(base.includes('?')?'&':'?')+'playSeed=11');await p.fill('#player-name','QA');await p.waitForSelector('#start:not([disabled])');await p.click('#start');
 await p.addInitScript(({start,heading})=>{
  const key='prepx-festival-city-v1',draft=JSON.parse(sessionStorage.getItem(key));
  // The shift resumes in the first parked car, standing at the chosen spot.
  if(draft){Object.assign(draft.city,{driving:true,...start,fleet:{active:'parked-0',cars:[{id:'parked-0',x:start.x,z:start.z,heading}]}});sessionStorage.setItem(key,JSON.stringify(draft));}
 },{start,heading:HEADING});
 await p.reload();await p.click('#resume');await p.evaluate(()=>advanceTime(1));
 const tick=ms=>p.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 // Page load takes a varying amount of real time. Wait for a fixed world time, so the resident is where the test expects.
 const until=async t=>{let s=await tick(1);assert.ok(s.life.worldTime<=t,'world time already past '+t+': '+s.life.worldTime);while(s.life.worldTime<t-.03)s=await tick(Math.min(50,(t-s.life.worldTime)*1000));return s;};
 return {p,errors,tick,until};
}
const drive=async(p,on)=>{await p.keyboard[on?'down':'up']('ArrowUp');};
let checks=0;const ok=(value,label)=>{assert.ok(value,label);checks++;};
try{
 // 1. A fast car throws a resident: they fly, land, lie still, get up and walk back to their route.
 {
  // Resident 12 stands at a corner of their block from world time 6.25 to 8.25; the car arrives inside that window.
  const w=resident(12,7.2),{p,errors,tick,until}=await open({x:w.x-DRIVE.x*26,z:w.z-DRIVE.z*26});
  await until(4.9);await drive(p,true);let s,top=0;
  for(let n=0;n<45;n++){s=await tick(50);if(s.life.crash.down)break;}
  ok(s.life.crash.walkerHits===1&&s.life.crash.people[0].kind==='thrown','a fast car throws the resident');
  ok(/התנגשות/.test(await p.locator('#notice').textContent()),'the player is told about the hit');
  const from=s.life.crash.people[0];
  for(let n=0;n<8;n++){s=await tick(50);top=Math.max(top,s.life.crash.people[0].y);if(n===3)await p.screenshot({path:'output/crash/resident-air.png'});}
  await drive(p,false);await p.keyboard.down('Space');
  ok(top>1.2,'they leave the ground: '+top);
  for(let n=0;n<40&&s.life.crash.people[0]?.phase!=='down';n++)s=await tick(100);
  const down=s.life.crash.people[0];
  ok(down?.phase==='down'&&down.y===0,'they come to rest on the ground');
  ok(Math.hypot(down.x-from.x,down.z-from.z)>8,'thrown well clear: '+Math.hypot(down.x-from.x,down.z-from.z).toFixed(1));
  await p.screenshot({path:'output/crash/resident-down.png'});
  for(let n=0;n<30&&s.life.crash.down;n++)s=await tick(500);
  ok(s.life.crash.down===0,'they get up and return to their route');
  ok(s.life.crash.walkerHits===1&&s.life.impacts===0,'one hit, and no car crash was counted');
  assert.deepEqual(errors,[]);await p.close();
 }
 // 2. A slow car: the resident jumps clear before it arrives and nobody is hurt.
 {
  const w=resident(12,7.2),{p,errors,tick,until}=await open({x:w.x-DRIVE.x*6.5,z:w.z-DRIVE.z*6.5});
  await until(5.8);await drive(p,true);let s;
  for(let n=0;n<40;n++){s=await tick(25);if(s.life.crash.down)break;}
  await drive(p,false);await p.keyboard.down('Space');
  ok(s.life.crash.dodges===1&&s.life.crash.walkerHits===0&&s.life.crash.people[0].kind==='dodge','a slow car makes the resident jump aside: '+JSON.stringify(s.life.crash));
  s=await tick(150);await p.screenshot({path:'output/crash/resident-dodge.png'});
  ok(s.life.crash.people[0].y>.2,'a real hop');
  for(let n=0;n<20&&s.life.crash.down;n++)s=await tick(500);
  ok(s.life.crash.down===0&&s.life.crash.walkerHits===0,'and walks on');
  assert.deepEqual(errors,[]);await p.close();
 }
 // 3. A hard crash into moving traffic: the other car leaves the road and turns over, parts and a wheel
 //    fly off, the wreck smokes, and then the road is clean and the car upright again.
 {
  const {p,errors,tick}=await open({x:-52,z:-103});
  await drive(p,true);let s;
  for(let n=0;n<130;n++){s=await tick(25);if(s.life.impacts)break;}
  ok(s.life.impacts===1,'crashed into traffic');
  const c=s.life.crash;
  ok(c.flips>=1&&c.cars.some(v=>v.air),'the struck car is thrown into a turn: '+JSON.stringify(c.cars));
  ok(c.parts>=12&&c.wheels===1,'parts and one wheel come off: '+c.parts);
  let top=0,turned=0;
  for(let n=0;n<10;n++){s=await tick(50);for(const v of s.life.crash.cars){top=Math.max(top,v.y);turned=Math.max(turned,Math.abs(v.angle));}if(n===3||n===7)await p.screenshot({path:`output/crash/car-flip-${n}.png`});}
  await drive(p,false);
  ok(top>1&&turned>2,'it is in the air and turning: height '+top.toFixed(2)+', angle '+turned.toFixed(2));
  s=await tick(2500);await p.screenshot({path:'output/crash/car-after.png'});
  ok(s.life.crash.tumbling===0&&s.life.crash.landings>=1,'it lands and settles');
  ok(s.life.crash.smoke>0,'the wreck smokes');
  ok(s.life.impacts===1,'still a single crash');
  s=await tick(14000);
  ok(s.life.crash.parts===0,'the road clears itself: '+s.life.crash.parts);
  assert.deepEqual(errors,[]);await p.close();
 }
 // 4. Reduced motion keeps the notice and removes every crash movement.
 {
  const {p,errors,tick}=await open({x:-52,z:-103},true);
  await drive(p,true);let s;
  for(let n=0;n<130;n++){s=await tick(25);if(s.life.impacts)break;}
  await drive(p,false);s=await tick(300);
  ok(s.life.impacts===1&&s.life.crash.spawned===0&&s.life.crash.tumbling===0&&s.life.crash.parts===0,'reduced motion: no parts, no roll-over');
  assert.deepEqual(errors,[]);await p.close();
 }
 console.log('PASS '+checks+' crash checks: thrown resident, dodge, roll-over with loose parts, reduced motion');
}finally{await browser.close();}
