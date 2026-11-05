import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {readFile,mkdir} from 'node:fs/promises';
import {makeRound} from '../src/core.js';
const q=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url))).quizzes.find(q=>q.id==='facts');
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4359/games/afterbell/play/index.html';
const b=await chromium.launch(),p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),errors=[];
const round=makeRound(q);round.participantName='QA';
await p.addInitScript(d=>{sessionStorage.setItem('prepx-festival-city-v1',JSON.stringify(d));},{round,city:{role:'courier',edition:0,stage:0,phase:'pickup',x:0,z:-180,driving:false,discoveryRevision:1,fleet:{active:null,cars:[{id:'parked-0',x:0,z:-180,heading:0}]}}});
p.on('pageerror',e=>errors.push(e.message));
await p.route('**/api/afterbell/quizzes/*',r=>r.fulfill({json:q}));
await p.route('**/api/afterbell/attempts',()=>{throw Error('Unexpected submission');});
const state=()=>p.evaluate(()=>JSON.parse(render_game_to_text()));
const distance=(a,c)=>Math.hypot(a.player.x-c.player.x,a.player.z-c.player.z);
try{
 await p.goto(base+'?quiz=facts');await p.click('#resume');await p.evaluate(()=>advanceTime(0));
 await p.click('#vehicle');assert.equal((await state()).vehicle.maxSpeed,90,'Toyota cruise speed unchanged');await p.click('#vehicle');
 const start=await state();await p.keyboard.down('ArrowUp');await p.keyboard.down('ArrowRight');await p.evaluate(()=>advanceTime(500));await p.keyboard.up('ArrowUp');await p.keyboard.up('ArrowRight');
 const keyboard=await state();assert.ok(Math.abs(distance(start,keyboard)-8)<.05,'default keyboard running is 16 units/s without Shift');
 const r=await p.locator('#joystick').boundingBox();await p.mouse.move(r.x+r.width/2+17.4,r.y+r.height/2-24.45);await p.mouse.down();await p.evaluate(()=>advanceTime(500));await p.mouse.up();
 const touch=await state();assert.ok(Math.abs(distance(keyboard,touch)-8)<.05,'default joystick running matches keyboard');
 await p.click('#route');await p.evaluate(()=>advanceTime(500));const guided=await state();assert.ok(distance(touch,guided)>7.5,'guided travel also runs by default');
 await mkdir('output/default-run',{recursive:true});await p.screenshot({path:'output/default-run/mobile.png'});assert.deepEqual(errors,[]);
 console.log('PASS default running: keyboard/touch/guidance 16 units/s; vehicle entry and 90 km/h Toyota unchanged; 390×844, no page errors');
}finally{await b.close();}
