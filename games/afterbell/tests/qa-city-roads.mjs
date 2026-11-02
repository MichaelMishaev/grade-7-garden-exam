import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
import {onRoad} from '../src/city-roads.js';
import {places} from '../src/city-data.js';
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
await mkdir('output',{recursive:true});
const b=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch();
try{
 const p=await b.newPage({viewport:{width:390,height:700},hasTouch:true,isMobile:true});
 const state=()=>p.evaluate(()=>JSON.parse(render_game_to_text()));
 await p.goto(base);
 await p.evaluate(()=>localStorage.setItem('prepx-city-wallet-v1:QA',JSON.stringify({coins:178,owned:[],equipped:[],earnings:{}})));
 await p.fill('#player-name','QA');await p.click('#start');await p.click('#shop');
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
 await p.click('#vehicle');await p.click('#shop');
 assert.equal(await p.locator('#van-stock').getAttribute('aria-pressed'),'true');
 await p.click('#leave-shop');let samples=0;
 for(const id of ['clinic','library','market','depot','park','radio','pier','home']){
  const start=(await state()).player,goal=places[id];
  await p.click('#map');await p.click('[data-place="'+id+'"]');
  const trail=await p.evaluate((goal)=>{
   const positions=[];
   for(let tick=0;tick<160;tick++){
    advanceTime(250);const {x,z}=JSON.parse(render_game_to_text()).player;positions.push({x,z});
    if(Math.hypot(x-goal.x,z-goal.z)<1)break;
   }
   return positions;
  },goal);
  for(const pos of trail){
   if(Math.hypot(pos.x-start.x,pos.z-start.z)>32&&Math.hypot(pos.x-goal.x,pos.z-goal.z)>32){samples++;assert.ok(onRoad(pos.x,pos.z),JSON.stringify({id,pos}));}
  }
  const last=trail.at(-1);assert.ok(Math.hypot(last.x-goal.x,last.z-goal.z)<1,JSON.stringify({id,last}));
 }
 assert.ok(samples>100);console.log('PASS nine purchases, saved gear and eight landmark routes;',samples,'mid-trip positions on roads');
 await p.screenshot({path:'output/city-van-beacon.png'});
}finally{await b.close();}
