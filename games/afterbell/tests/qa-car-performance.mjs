import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {readFile,mkdir} from 'node:fs/promises';
import {makeRound} from '../src/core.js';
import {CAR_SPEED,CAR_TASKS} from '../src/city-discovery.js';
const q=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url))).quizzes.find(q=>q.id==='facts');
const base=process.env.CITY_QA_URL||'http://127.0.0.1:5191/';
const b=await chromium.launch({headless:process.env.CITY_QA_HEADED!=='1',args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1280,height:844},reducedMotion:'reduce'}),errors=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await p.addInitScript(()=>{const raw=sessionStorage.getItem('qa-performance-draft');if(raw){const d=JSON.parse(raw);sessionStorage.setItem('prepx-festival-city-v1',raw);localStorage.setItem('prepx-city-discovery-v1:QA',JSON.stringify(d.city.career));}});
await p.route('**/api/afterbell/quizzes/*',r=>r.fulfill({json:q}));
await p.route('**/api/afterbell/attempts',()=>{throw Error('Unexpected submission');});
const state=()=>p.evaluate(()=>JSON.parse(render_game_to_text()));
await mkdir('output/car-performance',{recursive:true});
try{
 await p.goto(base+'?quiz=facts');await p.locator('#start:enabled').waitFor();await p.fill('#player-name','QA');await p.click('#start');
 const cars=(await state()).vehicles,done=Array.from({length:7},(_,i)=>'qa-'+i+':delivery:0'),results={};
 for(const brand of Object.keys(CAR_SPEED)){
  const id=cars.find(c=>c.brand===brand&&c.parked)?.id||cars.find(c=>c.brand===brand).id;
  const round=makeRound(q);round.participantName='QA';
  const draft={round,city:{role:'courier',edition:0,stage:0,phase:'pickup',x:0,z:-180,driving:true,discoveryRevision:1,career:{done},fleet:{active:id,cars:[{id,x:0,z:-180,heading:Math.PI}]}}};
  async function reset(){await p.evaluate(d=>{sessionStorage.setItem('qa-performance-draft',JSON.stringify(d));localStorage.setItem('prepx-city-discovery-v1:QA',JSON.stringify(d.city.career));},draft);await p.reload();await p.click('#resume');await p.evaluate(()=>advanceTime(0));}
  await reset();await p.keyboard.down('ArrowUp');await p.evaluate(()=>advanceTime(350));await p.keyboard.up('ArrowUp');
  const cruise=await state();const distance=Math.hypot(cruise.player.x,cruise.player.z+180);
  assert.equal(cruise.vehicle.vehicle.brand,brand);assert.equal(cruise.vehicle.maxSpeed,Math.round(CAR_SPEED[brand]*3.6),'model speed limit '+brand);
  assert.ok(cruise.vehicle.speed>0&&cruise.vehicle.speed<cruise.vehicle.maxSpeed,'speed builds from rest '+brand);
  await reset();await p.keyboard.down('ArrowUp');await p.keyboard.down('Shift');await p.evaluate(()=>advanceTime(350));await p.keyboard.up('Shift');await p.keyboard.up('ArrowUp');
  const boosted=await state(),boostDistance=Math.hypot(boosted.player.x,boosted.player.z+180);
  assert.ok(boostDistance>distance*1.5,'boost actually moves faster '+brand+' cruise='+distance+' boost='+boostDistance);results[brand]=cruise.vehicle.maxSpeed;
  await p.evaluate(()=>advanceTime(100));const coast=await state();assert.ok(coast.vehicle.speed>0&&coast.vehicle.speed<boosted.vehicle.speed,'coasting speedometer');
  await p.keyboard.down('Space');await p.evaluate(()=>advanceTime(1000));await p.keyboard.up('Space');assert.equal((await state()).vehicle.speed,0,'braked speedometer');
  if(['bmw','cybertruck','vw'].includes(brand))await p.screenshot({path:'output/car-performance/'+brand+'.png'});
 }
 for(const a of Object.keys(results))for(const c of Object.keys(results))if(CAR_TASKS[a]>CAR_TASKS[c])assert.ok(results[a]>results[c],'higher tier has a higher speed limit '+a+'/'+c);
 await p.click('#discoveries');assert.ok((await p.locator('#sheet-body').innerText()).includes('223 קמ״ש'));await p.screenshot({path:'output/car-performance/speed-board.png'});
 assert.deepEqual(errors,[]);console.log('PASS 8 models: acceleration, boost distance, ordered model speed limits, coasting and braking, unlock-board speeds and no browser errors');
}finally{await b.close();}
