import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile} from 'node:fs/promises';
const snapshot=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url)));
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
const b=process.env.CITY_QA_ENGINE==='webkit'?await webkit.launch():await chromium.launch({args:['--enable-webgl']});
const state=p=>p.evaluate(()=>JSON.parse(render_game_to_text()));
await mkdir('output',{recursive:true});
try{
 for(const [role,width] of [['courier',390],['tech',320],['press',1280]]){
  const p=await b.newPage({viewport:{width,height:width===320?568:844},isMobile:width<600,hasTouch:width<600});
  const errors=[];let saves=0;const selected=process.env.CITY_QA_QUIZ?snapshot.quizzes.find(q=>q.id===process.env.CITY_QA_QUIZ):role==='tech'?snapshot.quizzes.find(q=>q.subject_id==='physics'):snapshot.quizzes.find(q=>q.id==='facts');
  p.on('pageerror',e=>errors.push(e.message));
  await p.route('**/api/afterbell/attempts',async r=>{saves++;assert.equal(r.request().postDataJSON().quizId,selected.id);await r.fulfill({json:{saved:true}});});
  await p.goto(base+'?quiz='+selected.id);await p.locator('#start:enabled').waitFor();
  await p.screenshot({path:'output/city-menu-'+width+'.png'});
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await p.click('[data-role="'+role+'"]');await p.fill('#player-name','QA');await p.click('#start');
  assert.equal((await state(p)).role,role);assert.ok(await p.locator('#action').isVisible());
  const prepare=async()=>{
   if(role==='courier'){const place=await p.locator('#sheet-body p').first().innerText();const buttons=p.locator('[data-tool]');for(const btn of await buttons.all()){if(place.includes(await btn.innerText())){await btn.click();break;}}}
   else if(role==='tech'){await p.click('[data-tool="0"]');await p.click('[data-tool="1"]');}
   else{await p.click('#lens');await p.click('#shutter');}
  };
  await p.click('#action');await prepare();assert.equal((await state(p)).phase,'deliver');assert.equal((await state(p)).answered,0);
  await p.click('#vehicle');assert.ok((await state(p)).driving);
  await p.click('#map');await p.locator('[data-place="park"]').click();await p.evaluate(()=>advanceTime(40000));
  assert.ok(Math.hypot((await state(p)).player.x+128,(await state(p)).player.z-98)<4);
  await p.reload();await p.click('#resume');assert.equal((await state(p)).phase,'deliver');assert.ok((await state(p)).driving);
  async function arrive(){
   if(!await p.locator('#action').isVisible()){await p.click('#route');await p.evaluate(()=>advanceTime(40000));}
   assert.ok(await p.locator('#action').isVisible(),JSON.stringify({state:await state(p),route:await p.locator('#route').textContent(),notice:await p.locator('#notice').textContent()}));await p.click('#action');
  }
  for(let i=0;i<3;i++){
   if(i){await arrive();await prepare();}
   await arrive();assert.equal((await state(p)).mode,'question');
   const title=await p.locator('#sheet-title').boundingBox();assert.ok(title&&title.height>20&&title.y>=0&&title.y<580);
   assert.ok(await p.locator('[data-opt]').first().isVisible());
   if(i===0)await p.screenshot({path:'output/city-question-'+width+'.png'});
   while((await state(p)).mode==='question'){
    await p.locator('[data-opt]').first().click();assert.ok(await p.locator('[data-opt]').first().isDisabled());assert.ok(await p.locator('.explain').isVisible());
    await p.click('#next-q');
   }
   if(i===1)await p.screenshot({path:'output/city-driving-'+width+'.png'});
  }
  await arrive();await p.waitForFunction(()=>document.querySelector('#saved')?.textContent.includes('✓'));assert.equal(saves,1);
  assert.equal((await state(p)).answered,selected.questions.length);assert.deepEqual(errors,[]);await p.click('#again');await p.click('#start');const next=await state(p);
  assert.equal(next.role,role);assert.equal(next.stage,0);assert.ok(next.target.title.includes({courier:'כרזות',tech:'שלט',press:'מצלמת שטח'}[role]));
  await p.close();console.log('PASS '+role+' '+width+' full festival, free driving, reload, 3 deliveries, '+selected.questions.length+' locked questions, visible dialogs, one intercepted save and alternate replay');
 }
}finally{await b.close();}
