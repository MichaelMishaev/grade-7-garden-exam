import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile} from 'node:fs/promises';
const snapshot=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url)));
const quiz=snapshot.quizzes.find(q=>q.id==='facts');
const base=process.env.CITY_QA_URL||'http://127.0.0.1:5189/';
const out='output/city-discovery';await mkdir(out,{recursive:true});
const state=p=>p.evaluate(()=>JSON.parse(render_game_to_text()));
const browser=await (process.env.CITY_QA_ENGINE==='webkit'?webkit:chromium).launch({headless:process.env.CITY_QA_HEADED!=='1'});
let checks=0;const check=(v,label)=>{assert.ok(v,label);checks++;};
try{
 for(const width of [1280,390]){
  const p=await browser.newPage({viewport:{width,height:844},hasTouch:width<600,isMobile:width<600});
  const errors=[];let saves=0;
  async function clickMissionControl(selector){
   if(!await p.locator(selector).isVisible())await p.click('#mission-toggle');
   await p.click(selector);
  }

  p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await p.route('**/api/afterbell/quizzes/*',r=>r.fulfill({json:quiz}));
  await p.route('**/api/afterbell/attempts',r=>{saves++;return r.fulfill({json:{saved:true}});});
  await p.goto(base+'?quiz=facts');await p.locator('#start:enabled').waitFor();await p.fill('#player-name','QA');await p.click('#start');
  check((await state(p)).discovery.done.length===0,'fresh career');
  await p.click('#map');check(await p.locator('[data-place="station"]').isDisabled(),'north map locked');check(await p.locator('[data-place="ferry"]').isDisabled(),'east map locked');await p.click('#close-map');
  await p.click('#vehicle');check((await state(p)).vehicle.vehicle.brand==='toyota','physical starter entry');
  await p.keyboard.down('ArrowUp');await p.evaluate(()=>advanceTime(600));await p.keyboard.up('ArrowUp');
  await p.keyboard.down('ArrowUp');
  if(width<600){const box=await p.locator('#boost').boundingBox();await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();}else await p.keyboard.down('Shift');
  await p.evaluate(()=>advanceTime(500));const boosted=await state(p);
  // Urban obstacles can stop the car; qa-car-performance checks unobstructed top speeds.
  check(boosted.vehicle.speed<=149,'boost respects starter performance limit');check(boosted.vehicle.boost<100,'boost consumes energy');
  if(width<600)await p.mouse.up();else await p.keyboard.up('Shift');
  if(width<600){await p.mouse.move(...await p.locator('#brake').evaluate(el=>{const r=el.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]}));await p.mouse.down();}else await p.keyboard.down('Space');
  await p.evaluate(()=>advanceTime(150));check((await state(p)).vehicle.speed<=boosted.vehicle.speed,'brake reduces speed even with throttle held');
  if(width<600)await p.mouse.up();else await p.keyboard.up('Space');
  await p.keyboard.up('ArrowUp');await p.evaluate(()=>advanceTime(5500));check((await state(p)).vehicle.boost===100,'boost recharges');
  const carId=(await state(p)).vehicle.vehicle.id;
  await p.click('#vehicle');const exited=await state(p);check(!exited.driving,'exit');
  const parked=exited.vehicles.find(v=>v.id===carId);check(Math.hypot(parked.x-exited.player.x,parked.z-exited.player.z)>3,'player exits beside parked car');
  await p.reload();await p.locator('#resume').click();check(!(await state(p)).driving,'walking reload');
  const restored=(await state(p)).vehicles.find(v=>v.id===carId);check(Math.hypot(restored.x-parked.x,restored.z-parked.z)<.1,'car parked position persists');
  await p.click('#vehicle');check((await state(p)).driving,'take same car again');
  await p.reload();await p.click('#resume');check((await state(p)).vehicle.vehicle.id===carId,'occupied reload');
  const places={home:{x:-16,z:18},radio:{x:-72,z:-40},market:{x:40,z:-96},park:{x:-128,z:98},station:{x:-140,z:-298},court:{x:-28,z:-248},ferry:{x:306,z:158}};
  async function mainJob(){await clickMissionControl('#discoveries');await p.click('#main-job');}
  async function reachTask(){
   if(await p.locator('#action').isVisible())return;
   await clickMissionControl('#route');for(let i=0;i<5&&!await p.locator('#action').isVisible();i++)await p.evaluate(()=>advanceTime(20000));
   if(!await p.locator('#action').isVisible()&&(await state(p)).driving){
    await p.click('#vehicle');if(!await p.locator('#action').isVisible()){await clickMissionControl('#route');for(let i=0;i<5&&!await p.locator('#action').isVisible();i++)await p.evaluate(()=>advanceTime(20000));}
   }
   check(await p.locator('#action').isVisible(),'task reachable by car or final pedestrian approach');
  }
  async function findCar(){
   await p.click('#map');await p.locator('[data-car]').filter({hasText:'🚘'}).first().click();
   for(let i=0;i<5;i++){await p.evaluate(()=>advanceTime(20000));if((await state(p)).nearbyVehicle?.available)break;}
   await p.click('#vehicle');check((await state(p)).driving,'find and take a parked car');
  }
  async function jobStage(){
   await mainJob();
   await reachTask();
   await p.click('#action');
   const hint=await p.locator('#sheet-body p').first().innerText();
   for(const b of await p.locator('[data-tool]').all())if(hint.includes(await b.innerText())){await b.click();break;}
   await reachTask();
   if(!await p.locator('#action').isVisible()){const s=await state(p);throw Error('Delivery route failed '+JSON.stringify({player:s.player,target:s.target,driving:s.driving,nearby:s.vehicles.filter(v=>Math.hypot(v.x-s.player.x,v.z-s.player.z)<18)}));}
   await p.click('#action');check((await state(p)).mode==='question','delivery opens source questions');
   while((await state(p)).mode==='question'){
    const prompt=await p.locator('#sheet-title').innerText(),q=quiz.questions.find(q=>q.prompt===prompt);
    const choice=(await state(p)).answered===0?(q.correct+1)%q.choices.length:q.correct;
    await p.click('[data-opt="'+choice+'"]');check(await p.locator('[data-opt]').first().isDisabled(),'answer locked');
    if((await state(p)).answered===1){await p.reload();await p.click('#resume');check(await p.locator('[data-opt]').first().isDisabled(),'locked feedback reload');}
    await p.click('#next-q');
   }
  }
  await jobStage();check((await state(p)).discovery.learning===1,'first learning task');
  async function contract(id,place,drive){
   const before=(await state(p)).discovery.done.length;
   // Walking discoveries use pedestrian routes; a solid car cannot drive through every forecourt.
   if(!drive&&(await state(p)).driving)await p.click('#vehicle');
   if(drive&&!(await state(p)).driving)await findCar();
   await clickMissionControl('#discoveries');await p.click('[data-contract="'+id+'"]');
   // Board selection starts travel. Follow it to the actual endpoint.
   for(let i=0;i<6;i++){await p.evaluate(()=>advanceTime(20000));const s=await state(p);if(Math.hypot(s.player.x-places[place].x,s.player.z-places[place].z)<=4.3)break;}
   const s=await state(p);check(Math.hypot(s.player.x-places[place].x,s.player.z-places[place].z)<=4.3,'physical contract arrival '+id+' '+JSON.stringify({x:s.player.x,z:s.player.z,driving:s.driving,target:s.target,route:await p.locator('#route').innerText(),nearby:s.vehicles.filter(v=>Math.hypot(v.x-s.player.x,v.z-s.player.z)<22)}));
   if(s.driving!==drive){await p.click('#action');check((await state(p)).discovery.done.length===before,'wrong transport rejected');await p.click('#vehicle');}
   // Leaving the car can put the player four metres to the side, still in task range.
   await p.click('#action');check((await state(p)).discovery.done.includes(id),'contract awarded '+id);
   if(!drive)await findCar();
  }
  await contract('radio-walk','radio',false);await contract('park-drive','park',true);
  check((await state(p)).discovery.done.length===3,'north milestone');
  await p.click('#map');check(await p.locator('[data-place="station"]').isEnabled(),'north map unlocked');check(await p.locator('[data-place="ferry"]').isDisabled(),'east still locked');await p.click('#close-map');
  await contract('market-walk','market',false);await jobStage();check((await state(p)).discovery.learning===2,'second learning task');
  await contract('station-drive','station',true);check((await state(p)).discovery.done.length===6,'east milestone');
  await contract('court-walk','court',false);await contract('ferry-drive','ferry',true);
  check((await state(p)).vehicles.every(v=>v.available),'all brands unlocked');
  await clickMissionControl('#discoveries');await p.screenshot({path:out+'/board-'+width+'.png'});check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');await p.click('#close-discoveries');
  await p.screenshot({path:out+'/harbor-'+width+'.png'});
  const done=(await state(p)).discovery.done.length;await p.reload();await p.click('#resume');check((await state(p)).discovery.done.length===done,'career reload');
  await jobStage();check((await state(p)).discovery.learning===3,'third learning task');
  await clickMissionControl('#route');for(let i=0;i<5&&!await p.locator('#action').isVisible();i++)await p.evaluate(()=>advanceTime(20000));
  if((await state(p)).mode==='explore')await p.click('#action');await p.locator('#again:enabled').waitFor();check(saves===1,'one intercepted result save');
  await p.click('#again');await p.click('#start');check((await state(p)).discovery.done.length===done+1,'new shift retains career');
  check(errors.length===0,'browser errors: '+errors.join('; '));
  console.log('PASS '+width+' physical cars, boost/brake, all contracts/district unlocks, 3 learning groups, persistence and replay');await p.close();
 }
 console.log('PASS '+checks+' checks');
}finally{await browser.close();}
