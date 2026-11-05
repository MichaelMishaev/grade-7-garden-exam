import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {makeRound} from '../src/core.js';
const q=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url))).quizzes.find(q=>q.id==='facts');
const base=process.env.CITY_QA_URL||'http://127.0.0.1:5189/';
const b=await chromium.launch({headless:process.env.CITY_QA_HEADED!=='1'});let checks=0;const errors=[];
const state=p=>p.evaluate(()=>JSON.parse(render_game_to_text()));
const ok=(v,label)=>{assert.ok(v,label);checks++;};
const done=['radio-walk','park-drive','market-walk'];
async function fixture(x,z,extra={},storageFails=false){
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 p.on('pageerror',e=>errors.push(e.message));
 const round=makeRound(q);round.participantName='QA';
 const city={role:'courier',edition:0,stage:0,phase:'pickup',x,z,driving:false,discoveryRevision:1,...extra};
 await p.addInitScript(({draft,storageFails})=>{
  if(!sessionStorage.getItem('qa-fixture')){sessionStorage.setItem('qa-fixture','1');sessionStorage.setItem('prepx-festival-city-v1',JSON.stringify(draft));}
  if(storageFails){const set=Storage.prototype.setItem;Storage.prototype.setItem=function(...args){if(this===localStorage)throw Error('unavailable');return set.apply(this,args);};}
 },{draft:{city,round},storageFails});
 await p.route('**/api/afterbell/quizzes/*',r=>r.fulfill({json:q}));
 await p.route('**/api/afterbell/attempts',()=>{throw Error('Unexpected result POST');});
 await p.goto(base+'?quiz=facts');await p.click('#resume');return p;
}
try{
 for(const [x,z,key,axis,limit] of [[0,-220,'ArrowUp','z',-224],[220,0,'ArrowRight','x',224]]){
  const p=await fixture(x,z);await p.keyboard.down(key);await p.evaluate(()=>advanceTime(3000));await p.keyboard.up(key);
  const v=(await state(p)).player[axis];ok(axis==='z'?v>=limit:v<=limit,'manual locked boundary '+axis);await p.close();
 }
 let p=await fixture(-32,0);await p.click('#vehicle');ok(!(await state(p)).driving,'no summoning away from cars');await p.close();
 p=await fixture(-16,20);
 await p.click('#map');await p.locator('[data-car]').filter({hasText:'BMW'}).first().click();await p.evaluate(()=>advanceTime(10000));
 await p.click('#vehicle');ok(!(await state(p)).driving,'locked BMW rejects taking');ok((await p.locator('#notice').innerText()).includes('3'),'locked car explains threshold');await p.close();
 p=await fixture(-16,20,{career:{done}});
 await p.click('#map');await p.locator('[data-car]').filter({hasText:'BMW'}).first().click();await p.evaluate(()=>advanceTime(10000));await p.click('#vehicle');
 ok((await state(p)).vehicle.vehicle.brand==='bmw','take a newly unlocked BMW');const bmwId=(await state(p)).vehicle.vehicle.id;
 await p.click('#map');await p.locator('[data-car]').filter({hasText:'Volkswagen'}).first().click();await p.evaluate(()=>advanceTime(15000));await p.click('#vehicle');await p.click('#vehicle');
 ok((await state(p)).vehicle.vehicle.brand==='vw','switch to selected nearby car '+JSON.stringify({player:(await state(p)).player,vehicle:(await state(p)).vehicle,nearby:(await state(p)).nearbyVehicle}));ok((await state(p)).vehicles.some(v=>v.id===bmwId&&v.parked),'previous car remains parked');
 await p.evaluate(()=>advanceTime(100));await p.screenshot({path:'output/city-discovery/switch-390.png'});
 const boxes=await p.locator('#boost,#brake,#joystick,#action').evaluateAll(els=>els.filter(e=>!e.hidden).map(e=>({id:e.id,r:e.getBoundingClientRect().toJSON()})));
 for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i].r,c=boxes[j].r;ok(!(a.x<c.x+c.width&&c.x<a.x+a.width&&a.y<c.y+c.height&&c.y<a.y+a.height),'touch controls do not overlap '+boxes[i].id+'/'+boxes[j].id);}
 await p.close();
 p=await fixture(-110,-108,{career:{done}});await p.click('#vehicle');ok((await state(p)).vehicle.vehicle?.id.startsWith('traffic-'),'take a moving traffic car');const before=(await state(p)).player;await p.keyboard.down('ArrowUp');await p.evaluate(()=>advanceTime(1100));await p.keyboard.up('ArrowUp');const after=(await state(p)).player;ok(Math.hypot(after.x-before.x,after.z-before.z)>8,'taken traffic car can actually drive away');await p.click('#vehicle');await p.reload();await p.click('#resume');ok((await state(p)).vehicles.some(v=>v.id.startsWith('traffic-')&&v.parked),'taken traffic car remains parked after reload');await p.close();
 p=await fixture(308,-72,{discoveryRevision:undefined,driving:true});ok((await state(p)).driving,'old driving draft resumes in car');ok((await state(p)).discovery.legacyEast,'legacy outer-district access retained');await p.close();
 p=await fixture(-16,20,{fleet:{cars:{bad:true}}},true);ok((await state(p)).mode==='explore','malformed fleet and unavailable local storage recover');if(await p.locator('#mission-toggle').isVisible())await p.click('#mission-toggle');await p.click('#discoveries');ok(await p.locator('#sheet-title').isVisible(),'career remains playable without storage');await p.close();
 assert.deepEqual(errors,[]);console.log('PASS '+checks+' edge checks: boundaries, locked/taken/switched/traffic cars, mobile layout, legacy saves and storage recovery');
}finally{await b.close();}
