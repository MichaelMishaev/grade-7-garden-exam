import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { makeRound } from '../src/core.js';

const quiz = JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url))).quizzes.find(q=>q.id==='facts');
const base = process.env.CITY_QA_URL || 'http://127.0.0.1:4359/games/afterbell/play/index.html';
const browser = await chromium.launch({headless:process.env.CITY_QA_HEADED!=='1',args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
const output = 'output/mobile-controls';
await mkdir(output,{recursive:true});

try {
 const desktop=await browser.newPage({viewport:{width:1280,height:844}});
 const desktopRound=makeRound(quiz);
 desktopRound.participantName='QA';
 await desktop.addInitScript(draft=>{
  draft.city.fleet.cars[0].heading=Number(new URLSearchParams(location.search).get('qa-heading'));
  sessionStorage.setItem('prepx-festival-city-v1',JSON.stringify(draft));
 },{
  round:desktopRound,city:{role:'courier',edition:0,stage:0,phase:'pickup',x:0,z:-180,driving:true,discoveryRevision:1,
   fleet:{active:'parked-0',cars:[{id:'parked-0',x:0,z:-180,heading:0}]}}
 });
 const desktopErrors=[];
 desktop.on('pageerror',error=>desktopErrors.push(error.message));
 await desktop.route('**/api/afterbell/quizzes/*',route=>route.fulfill({json:quiz}));
 await desktop.route('**/api/afterbell/attempts',()=>{throw Error('Unexpected submission');});
 const tick=ms=>desktop.evaluate(ms=>advanceTime(ms),ms);
 const read=()=>desktop.evaluate(()=>JSON.parse(render_game_to_text()));
 const hold=async(key,ms)=>{
  await desktop.keyboard.down(key);
  await tick(ms);
  await desktop.keyboard.up(key);
 };
 const heading=s=>s.vehicle.vehicle.heading;
 const brakeDesktop=async()=>{
  await hold('Space',500);
  assert.equal((await read()).vehicle.speed,0,'Space brakes to a stop');
 };
 for(const initial of [0,Math.PI/2,Math.PI,-Math.PI/2]){
  // Keyboard driving is car-relative: Up/W always accelerates along the heading, Down/S backs up, Left/Right steer the car.
  for(const [key,sign] of [['ArrowUp',1],['KeyW',1],['ArrowDown',-1]]){
   await desktop.goto(base+'?quiz=facts&qa-heading='+initial);
   await desktop.locator('#resume').click();
   await tick(0);
   const before=await read();
   await hold(key,450);
   const after=await read();
   const dx=after.player.x-before.player.x,dz=after.player.z-before.player.z,axis=[Math.sin(initial)*sign,Math.cos(initial)*sign];
   assert.ok(dx*axis[0]+dz*axis[1]>1,key+' moves along the car heading at heading '+initial);
   assert.ok(Math.abs(dx*axis[1]-dz*axis[0])<.1,key+' stays on the car axis');
   assert.ok(Math.abs(heading(after)-initial)<1e-6,key+' does not turn the car');
   await brakeDesktop();
  }
 }
 await desktop.keyboard.press('KeyM');
 assert.equal((await read()).mode,'map');
 await desktop.keyboard.press('Escape');
 await desktop.keyboard.press('KeyJ');
 assert.equal((await read()).mode,'discoveries');
 await desktop.keyboard.press('Escape');
 await desktop.keyboard.press('KeyV');
 assert.equal((await read()).driving,false);
 await desktop.keyboard.press('KeyV');
 assert.equal((await read()).driving,true);
 await desktop.screenshot({path:output+'/desktop.png'});
 assert.deepEqual(desktopErrors,[]);
 console.log('PASS desktop car-relative arrows and WASD at four headings, brake and shortcuts');
 await desktop.close();
 for(const viewport of [{width:320,height:568},{width:568,height:320},{width:844,height:390}]){
  const page = await browser.newPage({viewport,isMobile:true,hasTouch:true});
  const round = makeRound(quiz);
  round.participantName = 'QA';
  const heading = viewport.width===844 ? Math.PI : 0;
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(draft=>sessionStorage.setItem('prepx-festival-city-v1',JSON.stringify(draft)),{
   round,city:{role:'courier',edition:0,stage:0,phase:'pickup',x:0,z:-180,driving:true,discoveryRevision:1,
    fleet:{active:'parked-0',cars:[{id:'parked-0',x:0,z:-180,heading}]}}
  });
  await page.route('**/api/afterbell/quizzes/*',route=>route.fulfill({json:quiz}));
  await page.route('**/api/afterbell/attempts',()=>{throw Error('Unexpected submission');});
  await page.goto(base+'?quiz=facts');
  await page.locator('#resume').tap();
  const advance=ms=>page.evaluate(ms=>advanceTime(ms),ms);
  const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
  await advance(0);
  const layout=await page.evaluate(()=>{
   const selectors=['#joystick','#boost','#brake','#drive-status','.jobcard'];
   return {width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,
    boxes:selectors.map(selector=>{
     const el=document.querySelector(selector),r=el.getBoundingClientRect();
     return {selector,...r.toJSON(),hit:el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))};
    })};
  });
  assert.equal(layout.width,viewport.width);
  assert.ok(!layout.overflow);
  for(const [i,a] of layout.boxes.entries()){
   assert.ok(a.x>=0&&a.y>=0&&a.right<=layout.width&&a.bottom<=layout.height,'off-screen '+a.selector);
   if(i<3)assert.ok(a.hit&&a.width>=44&&a.height>=44,'unusable touch target '+a.selector);
   for(const b of layout.boxes.slice(i+1)){
    assert.ok(a.right<=b.left||b.right<=a.left||a.bottom<=b.top||b.bottom<=a.top,'overlap '+a.selector+' / '+b.selector);
   }
  }
  const mission=page.locator('#mission-toggle');
  assert.equal(await mission.getAttribute('aria-expanded'),'false');
  assert.ok((await page.locator('.jobcard').boundingBox()).height<=60,'collapsed HUD fits one row');
  assert.ok(!(await page.locator('.mast').isVisible()),'gameplay has no branding bar');
  assert.ok(await page.evaluate(()=>['#mission-toggle','#vehicle','#map'].every(selector=>{
   const button=document.querySelector(selector),r=button.getBoundingClientRect();
   return r.height>=44&&button.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));
  })),'mission, vehicle and map stay accessible without expanding');
  assert.ok(!(await page.locator('#route').isVisible()));
  await mission.tap();
  assert.equal(await mission.getAttribute('aria-expanded'),'true');
  for(const selector of ['#goal','#status','#route','#dispatch','#discoveries','#shop']){
   assert.ok(await page.locator(selector).isVisible(),selector+' is available in the expanded panel');
  }
  await page.screenshot({path:output+'/expanded-'+viewport.width+'x'+viewport.height+'.png'});
  await mission.tap();
  assert.ok(!(await page.locator('#route').isVisible()));
  await advance(0);
  const [stick,boost,brake]=layout.boxes;
  const thumb={x:stick.x+stick.width/2,y:stick.y+stick.height/2,id:1};
  const pedal={x:brake.x+brake.width/2,y:brake.y+brake.height/2,id:2};
  const turbo={x:boost.x+boost.width/2,y:boost.y+boost.height/2,id:2};
  assert.ok(thumb.x<layout.width/2&&pedal.x>layout.width/2&&turbo.x>layout.width/2);
  assert.ok(brake.bottom>=layout.height-30&&boost.bottom>=layout.height-30,'pedals stay within thumb reach');
  const cdp=await page.context().newCDPSession(page);
  const touch=(type,touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
  const directions=[[1,0],[-1,0],[0,1],[0,-1],[Math.SQRT1_2,Math.SQRT1_2]];
  for(const [x,y] of directions){
   const before=await state();
   const pushed={...thumb,x:thumb.x+30*x,y:thumb.y-30*y};
   await touch('touchStart',[pushed]);
   await advance(300);
   const after=await state();
   const dx=after.player.x-before.player.x,dz=after.player.z-before.player.z;
   const across=(.815*dx-.58*dz)/Math.hypot(.815,.58);
   const up=(-.58*dx-.815*dz)/Math.hypot(.815,.58);
   assert.ok(across*x+up*y>.5&&Math.abs(across*y-up*x)<.03,'touch drives in the pushed screen direction');
   await touch('touchStart',[pushed,pedal]);
   await advance(400);
   assert.equal((await state()).vehicle.speed,0,'second finger brakes while joystick is held');
   await touch('touchEnd',[]);
  }
  const pushed={...thumb,y:thumb.y-30};
  await touch('touchStart',[pushed]);
  await advance(200);
  const moving=await state();
  await touch('touchStart',[pushed,turbo]);
  await advance(200);
  const boosted=await state();
  assert.ok(boosted.vehicle.boosting&&boosted.vehicle.boost<100&&boosted.vehicle.speed>moving.vehicle.speed,'second finger engages turbo');
  await touch('touchEnd',[]);
  await advance(150);
  const coasting=await state();
  assert.ok(coasting.vehicle.speed>0&&coasting.vehicle.speed<boosted.vehicle.speed,'touch release coasts');
  assert.ok(coasting.player.x<boosted.player.x&&coasting.player.z<boosted.player.z,'coast keeps the last screen direction');
  await page.screenshot({path:output+'/'+viewport.width+'x'+viewport.height+'.png'});
  assert.deepEqual(errors,[]);
  console.log('PASS '+viewport.width+'×'+viewport.height+' touch layout, screen directions, two-finger brake and turbo, and coasting');
  await page.close();
 }
}finally{await browser.close();}
