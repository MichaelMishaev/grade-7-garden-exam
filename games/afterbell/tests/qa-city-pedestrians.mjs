import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {mkdir} from 'node:fs/promises';
const b=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch();
try{
 const p=await b.newPage({viewport:{width:390,height:700}});
 await p.goto(process.env.CITY_QA_URL||'http://127.0.0.1:4398/games/afterbell/play/index.html');
 await p.fill('#player-name','QA');await p.click('#start');
 await p.addInitScript(()=>{
  const key='prepx-festival-city-v1',s=JSON.parse(sessionStorage.getItem(key));
  if(s){Object.assign(s.city,{x:-205,z:-105,driving:true});sessionStorage.setItem(key,JSON.stringify(s));}
 });
 await p.reload();await p.click('#resume');
 const tick=ms=>p.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 await tick(1);await p.keyboard.down('ArrowLeft');await p.keyboard.down('ArrowUp');
 let state;
 for(let i=0;i<25;i++){state=await tick(20);if(state.life.pedestrianHits)break;}
 assert.equal(state.life.pedestrianHits,1,JSON.stringify({player:state.player,people:state.life.pedestrians}));
 await p.keyboard.up('ArrowLeft');await p.keyboard.up('ArrowUp');
 state=await tick(200);assert.ok(state.life.pedestrians.some(g=>g.y>.1));
 await mkdir('output',{recursive:true});await p.screenshot({path:'output/city-pedestrian-bump.png'});
 state=await tick(1400);assert.equal(state.life.pedestrianHits,1,JSON.stringify({player:state.player,people:state.life.pedestrians}));
 assert.ok(state.life.pedestrians.every(g=>g.y===0&&!g.reacting));
 const before=state.life.pedestrians[0];state=await tick(1000);
 assert.ok(Math.hypot(state.life.pedestrians[0].x-before.x,state.life.pedestrians[0].z-before.z)>0);
 console.log('PASS pedestrian hop, one contact, landing, recovery and resumed patrol');
}finally{await b.close();}
