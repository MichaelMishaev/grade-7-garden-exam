import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {landmarks} from '../src/territory.js';
const base=process.env.AFTERBELL_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
const browser=await chromium.launch({args:['--enable-webgl']});
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/api/afterbell/attempts',route=>route.abort());
const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
const atlas=async()=>{await page.keyboard.press('m');await page.waitForSelector('.atlas-chart');};
try{
  await mkdir('output',{recursive:true});await page.goto(base);
  await page.fill('#player-name','QA');await page.tap('#relay-start');await page.tap('#begin-adventure');
  await atlas();assert.equal(await page.locator('[data-travel]').count(),1);
  await page.screenshot({path:'output/wilderness-atlas.png'});
  for(const s of landmarks){
    await page.tap(`[data-walk="${s.id}"]`);
    assert.equal((await state()).mission.navigation.blocked,false,'reachable '+s.id);
    await page.evaluate(()=>advanceTime(55000));const current=await state();
    assert.ok(Math.hypot(current.player.x-s.x,current.player.z-s.z)<3,s.name);
    assert.ok(current.territory.stones.includes(s.id));console.log('PASS walked to '+s.id);
    if(s.id==='mill'||s.id==='dome'||s.id==='mine')await page.screenshot({path:'output/wilderness-'+s.id+'.png'});
    await atlas();
  }
  await page.tap('[data-travel="mill"]');assert.equal((await state()).player.x,59);
  await page.reload();await page.tap('#resume');const saved=await state();assert.equal(saved.player.x,59);assert.equal(saved.territory.stones.length,6);
  await atlas();await page.tap('[data-travel="campus"]');assert.equal((await state()).player.z,9);
  assert.deepEqual(errors,[]);console.log('PASS six reachable waystones, locked travel, cross-region travel, outer-world resume and return to campus');
}finally{await browser.close();}
