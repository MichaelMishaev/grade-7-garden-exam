import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
import {onRoad} from '../src/city-roads.js';
import {places} from '../src/city-data.js';
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
await mkdir('output',{recursive:true});
const b=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch(process.env.CITY_QA_ENGINE==='webkit'?{}:{args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
try{
 const p=await b.newPage({viewport:{width:390,height:700},hasTouch:true,isMobile:true});
 const state=()=>p.evaluate(()=>JSON.parse(render_game_to_text()));
 // On a phone the shop button is inside the collapsed mission card.
 const openShop=async()=>{if(!await p.locator('#shop').isVisible())await p.click('#mission-toggle');await p.click('#shop');};
 await p.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
 await p.goto(base);
 await p.evaluate(()=>localStorage.setItem('prepx-city-wallet-v1:QA',JSON.stringify({coins:178,owned:[],equipped:[],earnings:{}})));
 // Shop items unlock by completed missions; nine opens every accessory bought below.
 await p.evaluate(()=>localStorage.setItem('prepx-city-discovery-v1:QA',JSON.stringify({done:['radio-walk','park-drive','market-walk','station-drive','court-walk','ferry-drive','qa:delivery:0','qa:delivery:1','qa:delivery:2']})));
 await p.fill('#player-name','QA');await p.click('#start');await openShop();
 for(const id of ['scarf','glasses','pack','beacon','stripes','spare','spoiler','underglow','surfboard']){
  if(id==='beacon')await p.click('#van-stock');
  const item=p.locator('[data-item="'+id+'"]');await item.click();await item.filter({hasText:'להסיר'}).waitFor();
 }
 const spoiler=p.locator('[data-item="spoiler"]');
 await spoiler.click();await spoiler.filter({hasText:'לצייד'}).waitFor();
 await spoiler.click();await spoiler.filter({hasText:'להסיר'}).waitFor();
 assert.equal((await state()).wallet.coins,17);
 await p.click('#leave-shop');await p.reload();await p.click('#resume');
 await p.waitForFunction(()=>JSON.parse(render_game_to_text()).wallet.equipped.length===9);
 await p.evaluate(()=>advanceTime(1));await p.screenshot({path:'output/city-shop-accessories.png'});
 await p.click('#vehicle');await openShop();
 assert.equal(await p.locator('#van-stock').getAttribute('aria-pressed'),'true');
 await p.click('#leave-shop');let samples=0;
 for(const id of ['clinic','library','market','depot','park','radio','pier','home']){
  const start=(await state()).player,goal=places[id];
  await p.click('#map');await p.click('[data-place="'+id+'"]');
  const trail=await p.evaluate((goal)=>{
   const positions=[];
   // Two minutes per trip: guided cars yield to moving traffic and wait at incident cordons.
   for(let tick=0;tick<480;tick++){
    advanceTime(250);const {x,z}=JSON.parse(render_game_to_text()).player;positions.push({x,z});
    if(Math.hypot(x-goal.x,z-goal.z)<1)break;
   }
   return positions;
  },goal);
  // The planner joins and leaves the street grid within 56 m of each end (access() in city-roads.js).
  for(const pos of trail){
   if(Math.hypot(pos.x-start.x,pos.z-start.z)>56&&Math.hypot(pos.x-goal.x,pos.z-goal.z)>56){samples++;assert.ok(onRoad(pos.x,pos.z),JSON.stringify({id,pos}));}
  }
  const last=trail.at(-1);assert.ok(Math.hypot(last.x-goal.x,last.z-goal.z)<1,JSON.stringify({id,last,ticks:trail.length,tail:trail.slice(-120).filter((q,i)=>i%8===0).map(q=>[+q.x.toFixed(1),+q.z.toFixed(1)]),status:await p.locator('#status').textContent(),route:await p.locator('#route').textContent(),events:(await state()).life.events.map(e=>[e.type,e.phase,e.x,e.z]),speed:(await state()).vehicle.speed,near:(await state()).vehicles.filter(v=>Math.hypot(v.x-last.x,v.z-last.z)<20).map(v=>[v.id,v.x,v.z,v.heading,v.parked]),objects:(await state()).life.objects}));
 }
 const {brakeTicks,impacts}=(await state()).life;
 assert.ok(brakeTicks>0,'guided van must brake for real traffic');
 assert.equal(impacts,0,'guided trips must avoid impacts');
 assert.ok(samples>100,'mid-trip samples: '+samples);console.log('PASS nine purchases, saved gear and eight landmark routes;',samples,'mid-trip positions on roads');
 await p.screenshot({path:'output/city-van-beacon.png'});
}finally{await b.close();}
