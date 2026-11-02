import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { editions, sparksAt, station } from '../src/relay.js';
const base=process.env.AFTERBELL_URL||'http://127.0.0.1:5177';
const mockSave=process.env.AFTERBELL_MOCK_SAVE==='1';
const output=process.env.AFTERBELL_QA_OUTPUT||'output';
let mockedSaves=0;
const browser=await chromium.launch({args:['--enable-webgl']});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
const page=await context.newPage(),errors=[];
if(mockSave)await page.route('**/api/**',route=>{
  const request=route.request();
  if(['GET','HEAD'].includes(request.method()))return route.continue();
  if(new URL(request.url()).pathname==='/api/afterbell/attempts'){
    mockedSaves++;const body=request.postDataJSON();
    return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({saved:true,id:body.id,score:0})});
  }
  return route.abort();
});
page.on('pageerror',e=>errors.push(e.message));
const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
const click=id=>page.locator('#'+id).click();
async function guide(){
  const nav=(await state()).mission.navigation;
  assert.ok(!nav.blocked,'guide has route');
  if(!nav.arrived){
    await click('follow-path');
    await page.evaluate(()=>advanceTime(55000));
    await page.waitForTimeout(120);
  }
}
await mkdir(output,{recursive:true});
try{
  const entry=new URL(base);
  if(!entry.pathname.endsWith('.html')&&!entry.pathname.endsWith('/'))entry.pathname+='/';
  if(entry.pathname.endsWith('/'))entry.pathname+='campus.html';
  entry.searchParams.set('test','1');
  await page.goto(entry.href);
  await page.locator('#player-name').fill('בדיקת מסילה');
  await page.selectOption('#quiz',process.env.AFTERBELL_QA_QUIZ||await page.locator('#quiz optgroup').last().locator('option').first().getAttribute('value'));
  await click('relay-start');await click('begin-adventure');
  // All editions use the real scene's collision map and the same planner as the HUD.
  const destinations=editions.flatMap((_,edition)=>[0,1,2].flatMap(i=>{
    const s=station({edition,territory:1},i);return s.task==='sparks'?[s,...sparksAt(s)]:[s];
  }));
  if(await page.evaluate(()=>typeof window.__afterbell!=='undefined')){
    const blocked=await page.evaluate(list=>list.filter(s=>!__afterbell.world.guideTo(s.x,s.z)).map(s=>[s.x,s.z]),destinations);
    assert.deepEqual(blocked,[]);
  }else{
    assert.equal((await state()).source,'database');
  }
  const initial=await state();
  await page.reload();await click('resume');
  assert.deepEqual((await state()).relay,initial.relay);
  const sites=initial.relay.stations;
  for(const task of ['ring','mirror','sparks']){
    const i=sites.findIndex(s=>s.task===task);await page.locator('[data-npc="'+i+'"]').click();
    await guide();
    if(task==='sparks'){
      for(let n=0;n<7&&(await state()).relay.steps[i]!==7;n++){
        await guide();
        if((await state()).target?.type==='spark')await click('interact');
      }
      assert.equal((await state()).relay.steps[i],7);
      await guide();await click('interact');
    }else if(task==='ring'){
      await page.screenshot({path:`${output}/relay-ring-mobile.png`});
      await page.locator('#jump').tap();await page.evaluate(()=>advanceTime(240));
      assert.equal((await state()).relay.steps[i],1);
      await click('interact');
    }else{
      await click('interact');const seq=editions[initial.relay.edition].sequence;
      await page.locator('[data-mirror="'+((seq[0]+1)%3)+'"]').click();assert.equal((await state()).relay.steps[i],0);
      await page.locator('[data-mirror="'+seq[0]+'"]').click();
      await page.reload();await click('resume');assert.equal((await state()).relay.steps[i],1);
      await click('interact');
      for(const v of seq.slice(1))await page.locator('[data-mirror="'+v+'"]').click();
    }
    while((await state()).mode==='question'){
      await page.locator('.answer').first().click();
      assert.ok(await page.locator('.answer').first().isDisabled());
      await page.waitForFunction(()=>JSON.parse(render_game_to_text()).mode!=='feedback');
    }
    await click('continue-world');
  }
  assert.ok((await state()).exit.open);await guide();
  await page.screenshot({path:`${output}/relay-stars-mobile.png`});
  await click('interact');await page.waitForFunction(()=>document.querySelector('#save-status')?.textContent.includes('✓'));
  assert.ok(await page.locator('.relay-finale').isVisible());await page.screenshot({path:`${output}/relay-finale.png`});
  await click('replay');await click('relay-start');await click('begin-adventure');
  const next=await state();assert.notEqual(next.relay.edition,initial.relay.edition);
  const ri=next.relay.stations.findIndex(s=>s.task==='ring');await page.locator('[data-npc="'+ri+'"]').click();await guide();const atRing=await state();assert.equal(atRing.target?.i,ri,JSON.stringify({player:atRing.player,target:atRing.target,goal:atRing.mission.target}));await click('interact');await click('ground-switch');assert.equal((await state()).relay.steps[ri],1);
  assert.deepEqual(errors,[]);
  if(mockSave){assert.equal(mockedSaves,1);console.log('PASS production write isolation: one mocked game save; no actual save or teacher email');}
  console.log('PASS relay layout, complete quiz, touch jump, mirror retry, resume, academic locking, all sparks, gate, history, different replay and ground switch');
}finally{await browser.close();}
