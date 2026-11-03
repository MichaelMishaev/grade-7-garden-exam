import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {mkdir} from 'node:fs/promises';
const b=await(process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch();
try{
 const p=await b.newPage({viewport:{width:390,height:700}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.CITY_QA_URL||'http://127.0.0.1:4399/games/afterbell/play/index.html');
 await p.fill('#player-name','QA');await p.click('#start');
 const tick=ms=>p.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 async function at(x,z){await p.addInitScript(({x,z})=>{const key='prepx-festival-city-v1',s=JSON.parse(sessionStorage.getItem(key));Object.assign(s.city,{x,z,driving:true});sessionStorage.setItem(key,JSON.stringify(s));},{x,z});await p.reload();await p.click('#resume');return tick(1);}
 await mkdir('output',{recursive:true});
 let s=await at(-85,-72);await p.keyboard.down('ArrowUp');
 for(let i=0;i<30;i++){s=await tick(30);if(s.life.damage)break;}
 await p.keyboard.up('ArrowUp');
 assert.ok(s.life.damage>0,JSON.stringify(s));assert.ok(s.life.debris>0);
 const wall=s.player;await p.keyboard.down('ArrowUp');s=await tick(500);await p.keyboard.up('ArrowUp');
 assert.ok(Math.hypot(wall.x-s.player.x,wall.z-s.player.z)<1,'wall stops van');assert.equal(s.life.damage,1,'sustained contact emits once');
 await p.screenshot({path:'output/city-building-damage.png'});
 s=await at(-94,-60);assert.equal(s.life.damage,0);
 await p.keyboard.down('ArrowUp');
 for(let i=0;i<35;i++){s=await tick(30);if(s.life.objectHits)break;}
 await p.keyboard.up('ArrowUp');
 assert.ok(s.life.objectHits>0,JSON.stringify(s));s=await tick(150);
 assert.ok(s.life.objects.some(o=>o.moving));await p.screenshot({path:'output/city-object-bump.png'});
 await p.click('#shop');await p.locator('#leave-shop').waitFor();const paused=await tick(1);s=await tick(1000);assert.deepEqual(s.life.objects,paused.life.objects,'pause freezes loose objects');await p.click('#leave-shop');
 s=await tick(6000);assert.ok(s.life.objects.every(o=>!o.moving));assert.deepEqual(errors,[]);
 console.log('PASS full-body wall stop, bounded visible damage, repair on new shift, loose-object impulse and settling');
}finally{await b.close();}
