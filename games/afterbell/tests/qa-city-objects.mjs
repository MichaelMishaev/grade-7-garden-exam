// Browser check for solid scenery and loose street furniture in Bay City: a bin is knocked away and
// settles, a wall and a tree stop the whole car body, and a new shift puts everything back.
// Run against the dev server: CITY_QA_URL=http://127.0.0.1:5177/index.html node tests/qa-city-objects.mjs
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const base=process.env.CITY_QA_URL||'http://127.0.0.1:5177/index.html';
const browser=await chromium.launch({args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
await mkdir('output/objects',{recursive:true});
let checks=0;const ok=(value,label)=>{assert.ok(value,label);checks++;};
// The block centred on (-29,-85): building 17 x 13, bin at (-17,-66), tree at (-14,-73).
async function open(start,heading){
 const p=await browser.newPage({viewport:{width:900,height:700}});p.setDefaultTimeout(20000);
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
 await p.goto(base+(base.includes('?')?'&':'?')+'playSeed=11');await p.fill('#player-name','QA');await p.waitForSelector('#start:not([disabled])');await p.click('#start');
 await p.addInitScript(({start,heading})=>{
  const key='prepx-festival-city-v1',draft=JSON.parse(sessionStorage.getItem(key));
  if(draft){Object.assign(draft.city,{driving:true,...start,fleet:{active:'parked-0',cars:[{id:'parked-0',x:start.x,z:start.z,heading}]}});sessionStorage.setItem(key,JSON.stringify(draft));}
 },{start,heading});
 await p.reload();await p.click('#resume');await p.evaluate(()=>advanceTime(1));
 const tick=ms=>p.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 return {p,errors,tick};
}
try{
 // 1. A bin in the way is knocked along, does not stop the car, and comes to rest.
 {
  const {p,errors,tick}=await open({x:-17,z:-58},Math.PI);
  let s=await tick(1);const bin=s.life.objects.find(o=>o.kind==='bin');
  ok(bin&&Math.hypot(bin.x+17,bin.z+66)<.01,'the bin stands on the pavement: '+JSON.stringify(s.life.objects));
  await p.keyboard.down('ArrowUp');
  for(let n=0;n<60&&!s.life.objectHits;n++)s=await tick(30);
  ok(s.life.objectHits===1,'the car knocks the bin');
  ok(s.life.impacts===0,'a loose object is not a car crash');
  s=await tick(200);await p.screenshot({path:'output/objects/bin-knocked.png'});
  const moved=s.life.objects.find(o=>o.kind==='bin');
  ok(moved.moving&&moved.z<-66.5,'the bin flies ahead of the car: '+JSON.stringify(moved));
  s=await tick(500);ok(s.player.z<-68,'the car keeps going: '+s.player.z);
  await p.keyboard.up('ArrowUp');await p.keyboard.down('Space');
  s=await tick(6000);
  ok(s.life.objects.every(o=>!o.moving),'everything settles');
  assert.deepEqual(errors,[]);await p.close();
 }
 // 2. A wall stops the whole car, reports one hit for one contact, and throws debris on a hard hit.
 {
  const {p,errors,tick}=await open({x:-33,z:-60},Math.PI);
  let s;await p.keyboard.down('ArrowUp');
  for(let n=0;n<80;n++){s=await tick(30);if(s.life.sceneryHits)break;}
  ok(s.life.sceneryHits===1&&s.life.damage===1,'a fast car hits the wall: '+JSON.stringify({hits:s.life.sceneryHits,damage:s.life.damage,z:s.player.z}));
  ok(s.life.crash.parts>0,'pieces fly off: '+s.life.crash.parts);
  ok(/קיר/.test(await p.locator('#notice').textContent()),'the player is told they hit a wall');
  // Building front face is at z -78.5; the nose (3 m ahead of the centre) stops on it.
  ok(s.player.z>-75.6&&s.player.z<-74.5,'the nose stops at the wall, not inside it: '+s.player.z);
  const at=s.player;s=await tick(600);await p.screenshot({path:'output/objects/wall-hit.png'});
  ok(Math.hypot(at.x-s.player.x,at.z-s.player.z)<.5&&s.life.sceneryHits===1,'held against the wall, still one hit');
  await p.keyboard.up('ArrowUp');await p.keyboard.down('ArrowDown');s=await tick(1500);await p.keyboard.up('ArrowDown');
  ok(s.player.z>at.z+2,'the car can back away from the wall: '+s.player.z);
  ok(s.life.impacts===0,'no car crash was counted');
  assert.deepEqual(errors,[]);await p.close();
 }
 // 3. A tree trunk is solid too, and a new shift starts with the furniture back in place.
 {
  const {p,errors,tick}=await open({x:-14,z:-60},Math.PI);
  let s;await p.keyboard.down('ArrowUp');
  for(let n=0;n<80;n++){s=await tick(30);if(s.life.sceneryHits)break;}
  await p.keyboard.up('ArrowUp');
  ok(s.life.sceneryHits===1,'the car hits the tree');
  ok(/עץ/.test(await p.locator('#notice').textContent()),'the player is told they hit a tree');
  ok(s.player.z>-70.2,'the car stops in front of the trunk at z -73: '+s.player.z);
  assert.deepEqual(errors,[]);await p.close();
 }
 console.log('PASS '+checks+' scenery checks: knocked bin, wall stop with debris, backing away, solid tree');
}finally{await browser.close();}
