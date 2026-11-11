import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile} from 'node:fs/promises';
const snapshot=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url)));
const base=process.env.CITY_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/index.html';
const b=process.env.CITY_QA_ENGINE==='webkit'?await webkit.launch():await chromium.launch({args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
const state=p=>p.evaluate(()=>JSON.parse(render_game_to_text()));
await mkdir('output',{recursive:true});
try{
 for(const [role,width] of [['courier',390],['tech',320],['press',390],['press',1280]]){
  const p=await b.newPage({viewport:{width,height:width===320?568:844},isMobile:width<600,hasTouch:width<600});
  const errors=[];let saves=0;const selected=process.env.CITY_QA_QUIZ?snapshot.quizzes.find(q=>q.id===process.env.CITY_QA_QUIZ):role==='tech'?snapshot.quizzes.find(q=>q.subject_id==='physics'):snapshot.quizzes.find(q=>q.id==='facts');
  p.on('pageerror',e=>errors.push(e.message));
  await p.route('**/api/afterbell/attempts',async r=>{saves++;assert.equal(r.request().postDataJSON().quizId,selected.id);await r.fulfill({json:{saved:true}});});
  await p.goto(base+'?quiz='+selected.id+'&playSeed=11');await p.locator('#start:enabled').waitFor();
  await p.screenshot({path:'output/city-menu-'+width+'.png'});
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await p.click('[data-role="'+role+'"]');await p.fill('#player-name','QA');await p.click('#start');
  assert.equal((await state(p)).role,role);assert.ok(await p.locator('#action').isVisible());
  let earned=0,run=0;
  const tick=ms=>p.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
  const far=(s,g)=>Math.hypot(s.player.x-g.x,s.player.z-g.z);
  // Phones start with the mission card collapsed: the shop, guidance and dispatch sit behind the mission toggle.
  const press=async sel=>{if(!await p.locator(sel).isVisible()){await p.click('#mission-toggle');assert.equal(await p.getAttribute('#mission-toggle','aria-expanded'),'true');}await p.click(sel);};
  // Practice pay recorded for this shift. The wallet also earns from ranks, daily challenges, badges and stars now.
  const paid=()=>p.evaluate(()=>{const d=JSON.parse(sessionStorage.getItem('prepx-festival-city-v1'));return JSON.parse(localStorage.getItem('prepx-city-wallet-v1:'+d.round.participantName))?.earnings[d.round.attemptId]||0;});
  const payday=n=>p.waitForFunction(n=>{const d=JSON.parse(sessionStorage.getItem('prepx-festival-city-v1')),w=JSON.parse(localStorage.getItem('prepx-city-wallet-v1:'+d.round.participantName));return (w?.earnings[d.round.attemptId]||0)===n&&JSON.parse(render_game_to_text()).wallet.coins===w.coins;},n);
  const travel=async(goal,radius,limit=240)=>{
   let s;for(let n=0;n<limit;n++){s=await tick(1000);if(far(s,goal)<radius)return s;}
   assert.fail('did not arrive '+JSON.stringify({goal:[goal.x,goal.z],player:s.player,driving:s.driving,mode:s.mode,target:s.target,notice:await p.locator('#notice').textContent(),status:await p.locator('#status').textContent()}));
  };
  // Guided driving parks a few metres short of an occupied forecourt; finish on foot like a player.
  const reach=async goal=>{
   await press('#route');let s=await travel(goal,14);s=await tick(1500);
   if(far(s,goal)>4.3){if(s.driving)await p.click('#vehicle');await press('#route');await travel(goal,4.3);}
   return tick(300);
  };
  // There is no always-available van: take the car next to the player, or walk to the nearest open one on the map.
  const takeCar=async()=>{
   let s=await state(p);if(s.driving)return;
   if(!s.nearbyVehicle?.available){await p.click('#map');await p.locator('[data-car]',{hasText:'🚘'}).first().click();for(let n=0;n<240&&!s.nearbyVehicle?.available;n++)s=await tick(500);}
   await p.click('#vehicle');s=await state(p);assert.ok(s.driving,'took a car '+JSON.stringify({near:s.nearbyVehicle,player:s.player,notice:await p.locator('#notice').textContent()}));
  };
  const buy=async(id,price,label)=>{
   const item=p.locator('[data-item="'+id+'"]'),before=(await state(p)).wallet.coins;
   await item.click();await item.filter({hasText:label}).waitFor();assert.equal((await state(p)).wallet.coins,before-price,id+' costs '+price);
  };
  await press('#shop');assert.ok(await p.locator('[data-item="cap"]').isDisabled());
  await p.click('#leave-shop');
  const initialLife=(await state(p)).life;
  await p.evaluate(()=>advanceTime(5000));
  const life=(await state(p)).life;
  for(const actor of ['car','walker','plane'])assert.notDeepEqual(life[actor],initialLife[actor]);
  const prepare=async()=>{
   if(role==='courier'){const place=await p.locator('#sheet-body p').first().innerText();const buttons=p.locator('[data-tool]');for(const btn of await buttons.all()){if(place.includes(await btn.innerText())){await btn.click();break;}}}
   else if(role==='tech'){await p.click('[data-tool="0"]');await p.click('[data-tool="1"]');}
   else{
    const shutter=p.locator('#shutter');
    assert.ok(await shutter.evaluate(el=>{const r=el.getBoundingClientRect();return el===document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);}), 'camera shutter is visible immediately');
    await p.click('#lens');await shutter.click();
   }
  };
  await p.click('#action');await prepare();assert.equal((await state(p)).phase,'deliver');assert.equal((await state(p)).answered,0);
  await p.click('#vehicle');assert.ok((await state(p)).driving,'took the car parked by the team house');
  await p.click('#map');await p.locator('[data-place="park"]').click();
  {await travel({x:-128,z:98},14);const s=await tick(3000);assert.ok(far(s,{x:-128,z:98})<4,'free drive to the park '+JSON.stringify(s.player));}
  await p.reload();await p.click('#resume');assert.equal((await state(p)).phase,'deliver');assert.ok((await state(p)).driving);
  async function arrive(){
   const s=await state(p),goal=s.target.point;
   if(far(s,goal)>4.3){if(!s.driving&&s.nearbyVehicle?.available)await p.click('#vehicle');await reach(goal);}
   assert.ok(await p.locator('#action').isVisible(),JSON.stringify({state:await state(p),route:await p.locator('#route').textContent(),notice:await p.locator('#notice').textContent()}));await p.click('#action');
  }
  for(let i=0;i<3;i++){
   if(i){await arrive();await prepare();}
   await arrive();assert.equal((await state(p)).mode,'question');
   const title=await p.locator('#sheet-title').boundingBox();assert.ok(title&&title.height>20&&title.y>=0&&title.y<580);
   assert.ok(await p.locator('[data-opt]').first().isVisible());
   if(i===0)await p.screenshot({path:'output/city-question-'+width+'.png'});
   while((await state(p)).mode==='question'){
    const awaitTitle=await p.locator('#sheet-title').innerText();
    const raw=selected.questions.find(q=>q.prompt===awaitTitle);
    const correct=(await state(p)).answered>0;
    const choice=correct?raw.correct:(raw.correct+1)%raw.choices.length;
    await p.click('[data-opt="'+choice+'"]');assert.ok(await p.locator('[data-opt]').first().isDisabled());assert.ok(await p.locator('.explain').isVisible());
    if(correct){earned+=5;run++;if(run%3===0)earned+=5;}else run=0;
    if(i===0 && (await state(p)).answered===2){await p.reload();await p.click('#resume');}
    await payday(earned);
    await p.click('#next-q');
   }
   earned+=15;
   await payday(earned);
   if(i===1){
    await press('#shop');await p.click('#hero-stock');await buy('drone',35,'להסיר');
    await p.waitForFunction(()=>JSON.parse(render_game_to_text()).wallet.equipped.includes('drone'));
    await p.screenshot({path:'output/city-store-'+width+'.png'});
    await p.click('#leave-shop');await p.reload();await p.click('#resume');
    // The saved wallet is applied a moment after resuming; the drone must come back with it.
    await p.waitForFunction(()=>JSON.parse(render_game_to_text()).life.assistant);
    const near=async()=>{const s=await state(p);assert.ok(Math.hypot(s.life.assistant[0]-s.player.x,s.life.assistant[1]-s.player.z)<6);};
    // Keys in a car are car-relative: Up drives along the heading.
    await near();await takeCar();await near();await p.keyboard.down('ArrowUp');await p.evaluate(()=>advanceTime(600));await p.keyboard.up('ArrowUp');await near();await p.click('#vehicle');assert.equal((await state(p)).driving,false);
   }
   if(i===2){
    await press('#shop');await p.click('#hero-stock');
    for(const [id,price] of [['cap',10],['jacket',20]]){
     // Buying costs the price once; taking the item off and on again is free.
     await buy(id,price,'להסיר');await buy(id,0,'לצייד');await buy(id,0,'להסיר');
    }
    assert.equal(await paid(),earned);await p.click('#leave-shop');await takeCar();
    await p.evaluate(()=>advanceTime(500));await p.screenshot({path:'output/city-outfit-'+width+'.png'});
    await p.click('#vehicle');assert.equal((await state(p)).driving,false);
   }
   if(i===1)await p.screenshot({path:'output/city-driving-'+width+'.png'});
  }
  await arrive();await p.waitForFunction(()=>document.querySelector('#saved')?.textContent.includes('✓')).catch(async e=>{const s=await state(p);assert.fail('result not saved '+JSON.stringify({mode:s.mode,stage:s.stage,phase:s.phase,player:s.player,target:s.target,action:s.action,play:s.play,saves,saved:await p.locator('#saved').textContent().catch(()=>null),title:await p.locator('#sheet-title').textContent().catch(()=>null),notice:await p.locator('#notice').textContent()}));});assert.equal(saves,1);
  assert.equal((await state(p)).answered,selected.questions.length);assert.deepEqual(errors,[]);assert.equal(await paid(),earned);
  const kept=(await state(p)).wallet.coins;await p.click('#again');await p.click('#start');const next=await state(p);
  await p.waitForFunction(n=>JSON.parse(render_game_to_text()).wallet.coins===n,kept);assert.equal(next.wallet.equipped.length,3);assert.equal(next.role,role);assert.equal(next.stage,0);assert.ok(next.target.title.includes({courier:'כרזות',tech:'שלט',press:'מצלמת שטח'}[role]));
  await p.close();console.log('PASS '+role+' '+width+' full festival, free driving, reload, 3 deliveries, '+selected.questions.length+' locked questions, visible dialogs, one intercepted save and alternate replay');
 }
}finally{await b.close();}
