import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {mkdir} from 'node:fs/promises';
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
const browser=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch();
try{
 const p=await browser.newPage({viewport:{width:390,height:700},hasTouch:true});
 await p.goto(base);await p.fill('#player-name','QA');await p.click('#start');
 // Resume a valid shift just ahead of the first traffic van on its eastbound leg.
 await p.addInitScript(()=>{
  const key='prepx-festival-city-v1',draft=JSON.parse(sessionStorage.getItem(key));
  if(draft){Object.assign(draft.city,{driving:true,x:-96,z:-109});sessionStorage.setItem(key,JSON.stringify(draft));}
 });
 await p.reload();await p.click('#resume');await p.evaluate(()=>advanceTime(1));
 await p.keyboard.down('ArrowLeft');await p.keyboard.down('ArrowUp');
 const tick=ms=>p.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 let state;
 for(let i=0;i<30;i++){state=await tick(20);if(state.life.impacts)break;}
 assert.equal(state.life.impacts,1);
 assert.match(await p.locator('#notice').textContent(),/התנגשות/);
 assert.ok((await tick(50)).life.impactVisible);await mkdir('output',{recursive:true});await p.screenshot({path:'output/city-impact.png'});
 const held=await tick(500);assert.equal(held.life.impacts,1);
 assert.ok(Math.hypot(held.player.x-state.player.x,held.player.z-state.player.z)<1);
 await p.keyboard.up('ArrowLeft');await p.keyboard.up('ArrowUp');await p.keyboard.down('ArrowRight');
 const free=await tick(600);await p.keyboard.up('ArrowRight');
 assert.ok(Math.hypot(free.player.x-held.player.x,free.player.z-held.player.z)>6);
 await p.emulateMedia({reducedMotion:'reduce'});await p.reload();await p.click('#resume');
 const parked=await tick(2300);assert.equal(parked.life.impacts,1);assert.equal(parked.life.impactVisible,false);
 assert.match(await p.locator('#notice').textContent(),/התנגשות/);
 console.log('PASS reduced-motion cue and manual impact, single contact cue, blocked penetration and steering recovery');
}finally{await browser.close();}
