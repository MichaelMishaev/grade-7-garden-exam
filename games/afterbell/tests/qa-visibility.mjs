import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base=process.env.PREPX_QA_URL||'http://127.0.0.1:5183';
const out='output/visibility';
await mkdir(out,{recursive:true});
const browser=await chromium.launch();
const errors=[],checks=[];
try {
  for(const viewport of [{width:390,height:844},{width:1440,height:1000}]){
    const page=await browser.newPage({viewport,reducedMotion:'reduce'});
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('net::ERR_FAILED'))errors.push(m.text());});
    await page.route('**/api/**',r=>r.abort());
    await page.goto(`${base}/?test=1`);
    await page.waitForFunction(()=>typeof __afterbell!=='undefined'&&!document.querySelector('#start').disabled);
    await page.locator('#player-name').fill('Visibility QA');
    await page.locator('#start').click();
    await page.locator('#begin-adventure').click();
    await page.evaluate(()=>advanceTime(0));
    for(const [name,x,z] of [['north-gate',0,-25],['school',-2,-20],['annex',-19,-16],['trees',21,0],['open-path',0,9]]){
      const result=await page.evaluate(({x,z})=>{
        __afterbell.world.setPlayer(x,z);advanceTime(16);
        const p=__afterbell.world.getPlayer();
        return {p,screen:__afterbell.world.project(x,1,z),blocked:__afterbell.world.blocked(x,z)};
      },{x,z});
      assert.equal(result.blocked,false,`${name} reachable`);
      assert.equal(result.screen.visible,true,`${name} in view`);
      await page.screenshot({path:`${out}/${name}-${viewport.width}.png`});
      checks.push({viewport:viewport.width,name,...result});
    }
    const before=await page.evaluate(()=>__afterbell.world.getPlayer());
    await page.keyboard.down('ArrowRight');await page.evaluate(()=>advanceTime(500));await page.keyboard.up('ArrowRight');
    const after=await page.evaluate(()=>__afterbell.world.getPlayer());
    assert.ok(Math.hypot(after.x-before.x,after.z-before.z)>1);
    if(viewport.width<600)await page.locator('#jump').click();else await page.keyboard.press('Space');
    await page.evaluate(()=>advanceTime(200));
    assert.ok((await page.evaluate(()=>__afterbell.world.getPlayer())).y>0);
    await page.evaluate(()=>advanceTime(1500));
    assert.equal((await page.evaluate(()=>__afterbell.world.getPlayer())).y,0);
    await page.evaluate(()=>{__afterbell.world.setPlayer(0,9);advanceTime(16);});
    await page.locator('#follow-path').click();
    await page.evaluate(()=>advanceTime(1000));
    assert.equal(JSON.parse(await page.evaluate(()=>render_game_to_text())).mission.navigation.following,true);
    await page.screenshot({path:`${out}/guided-${viewport.width}.png`});
    await page.close();
  }
  assert.deepEqual(errors,[]);
  await writeFile(`${out}/report.json`,JSON.stringify({checks,errors},null,2));
  console.log(`Passed ${checks.length} visibility scenarios, movement, jumping and guided navigation in both viewports; no browser errors.`);
} finally {await browser.close();}
