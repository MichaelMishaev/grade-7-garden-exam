// Browser check for the free-roam layer of Bay City: rank, rides, stars, a full shift,
// persistence, the paint shop, night and the phone layout. Result saves are intercepted.
// Run against the dev server or a built page: CITY_QA_URL=http://127.0.0.1:5177/index.html
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {places} from '../src/city-data.js';

const base=process.env.CITY_QA_URL||'http://127.0.0.1:5177/index.html';
// Hardware rendering keeps the simulated minutes fast; software WebGL times out on long runs.
const browser=await chromium.launch({headless:process.env.CITY_QA_HEADED!=='1',args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
await mkdir('output/freeroam',{recursive:true});
let checks=0;const ok=(value,label)=>{assert.ok(value,label);checks++;};
async function open(viewport,name){
 const phone=Math.min(viewport.width,viewport.height)<500;
 const page=await browser.newPage({viewport,hasTouch:phone,isMobile:phone});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
 // A fixed seed makes the waiting passengers, and so the whole run, repeatable.
 await page.goto(base+(base.includes('?')?'&':'?')+'playSeed='+(process.env.CITY_QA_SEED||11));await page.fill('#player-name',name);await page.waitForSelector('#start:not([disabled])');
 const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
 const tick=ms=>page.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
 async function arrive(goal,radius=5,limit=420){
  for(let i=0;i<limit;i++){const s=await tick(1000);if(Math.hypot(s.player.x-goal.x,s.player.z-goal.z)<radius)return s;}
  const v=await state();
  assert.fail('did not arrive '+JSON.stringify({goal:[goal.x,goal.z],player:[v.player.x,v.player.z],mode:v.mode,driving:v.driving,speed:v.vehicle.speed,target:v.target,play:{run:v.play.run,gig:v.play.gig},events:v.life.events.map(e=>[e.type,e.phase,e.x,e.z]),notice:await page.locator('#notice').textContent(),status:await page.locator('#status').textContent(),route:await page.locator('#route').textContent()}));
 }
 // Guided travel can park a few metres short of an occupied forecourt; finish on foot like a player.
 async function reach(goal){
  let s=await tick(600);
  if(Math.hypot(s.player.x-goal.x,s.player.z-goal.z)<=4.3)return s;
  await page.click('#route');s=await arrive(goal,14);s=await tick(1500);
  if(Math.hypot(s.player.x-goal.x,s.player.z-goal.z)>4.3){
   if(s.driving)await page.click('#vehicle');
   await page.click('#route');s=await arrive(goal,4.3);
  }
  return tick(300);
 }
 return {page,errors,state,tick,arrive,reach};
}
const boxOf=(page,selector)=>page.locator(selector).evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});
const apart=(a,b)=>a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y;

try{
 // Desktop: a ride, a star, a whole shift, then free roam.
 const d=await open({width:1280,height:800},'QA-Free');
 await d.page.click('#start');let s=await d.tick(200);
 ok(await d.page.locator('#profile').isVisible()&&await d.page.locator('#minimap').isVisible(),'rank chip and minimap are on the HUD');
 ok(/^..? ?\d\d:\d\d$/u.test((await d.page.locator('#clock').textContent()).trim()),'the game clock shows the time of day');
 ok(s.progress.level===1&&s.progress.xp===0,'a new player starts at level 1');
 ok(s.totalStars>=35&&s.play.offers.length===3,'stars and three waiting passengers exist: '+s.totalStars);
 ok(s.atmosphere.night===false&&s.atmosphere.glow===0,'the shift starts in daylight');

 await d.page.click('#vehicle');s=await d.state();ok(s.driving,'took the car by the team house');
 await d.page.keyboard.press('KeyP');
 ok(await d.page.locator('.daily li').count()===3,'the profile lists three daily challenges');
 ok(await d.page.locator('[data-race]').count()===5&&await d.page.locator('[data-race]:not([disabled])').count()===3,'three races are open at the start, two are locked');
 await d.page.screenshot({path:'output/freeroam/profile-1280.png'});
 const offer=s.play.offers[0];await d.page.click('[data-offer="0"]');
 await d.arrive(offer,11);s=await d.tick(1500);
 ok(s.action?.kind==='gig','the action button offers the pickup: '+JSON.stringify(s.action));
 await d.page.click('#action');s=await d.state();
 ok(s.play.gig&&s.target.auto,'the passenger is on board and the destination is the target');
 ok(await d.page.locator('#activity').isVisible(),'the activity banner shows the ride');
 await d.page.click('#route');
 for(let i=0;i<260&&s.play.gig;i++)s=await d.tick(1000);
 ok(!s.play.gig,'the ride finished at the destination '+JSON.stringify({player:[s.player.x,s.player.z],to:s.target.point&&[s.target.point.x,s.target.point.z],gig:s.play.gig,speed:s.vehicle.speed,driving:s.driving,impacts:s.life.impacts,events:s.life.events.map(e=>[e.type,e.phase,e.x,e.z]),status:await d.page.locator('#status').textContent(),route:await d.page.locator('#route').textContent(),notice:await d.page.locator('#notice').textContent()}));
 await d.page.waitForTimeout(150);s=await d.state();
 ok(s.progress.xp>=20&&s.wallet.coins>0,'the ride paid experience and coins: '+s.progress.xp+' XP, '+s.wallet.coins+' coins');
 ok(s.progress.badges.includes('first-ride'),'first ride badge');
 ok(s.target.place==='home','the delivery is the objective again');
 await d.page.screenshot({path:'output/freeroam/after-ride-1280.png'});

 // The whole shift still works, and every answer now also pays experience.
 const xpBeforeShift=s.progress.xp;
 for(let stage=0;stage<3;stage++){
  s=await d.state();await d.reach(s.target.point);
  s=await d.state();ok(s.action?.kind==='mission','at the pickup '+stage+' '+JSON.stringify({action:s.action,mode:s.mode,player:[s.player.x,s.player.z],target:s.target,driving:s.driving,play:{run:s.play.run,gig:s.play.gig}}));
  await d.page.click('#action');
  const destination=places[['market','park','pier'][stage]].name;
  await d.page.locator('[data-tool]',{hasText:destination}).first().click();
  s=await d.state();ok(s.phase==='deliver','cargo ready '+stage);
  await d.reach(s.target.point);await d.page.click('#action');
  for(let guard=0;guard<40&&(await d.state()).mode==='question';guard++){
   if(await d.page.locator('[data-opt]:not([disabled])').count())await d.page.locator('[data-opt]').first().click();
   await d.page.click('#next-q');
  }
  s=await d.state();ok(s.stage===stage+1,'delivery '+stage+' complete');
 }
 await d.reach(places.pier);await d.page.click('#action');
 await d.page.waitForSelector('#watch:not([disabled])');
 ok(await d.page.locator('.rank-line').isVisible(),'the shift summary shows the rank');
 s=await d.state();
 ok(s.progress.xp>=xpBeforeShift+3*30+60,'deliveries and the finished shift paid experience: '+s.progress.xp);
 ok(s.progress.stats.shifts===1&&s.progress.stats.delivery===3,'shift statistics recorded');
 await d.page.screenshot({path:'output/freeroam/shift-summary-1280.png'});
 await d.page.click('#watch');s=await d.tick(200);
 ok(s.mode==='explore'&&s.target.point===null,'after the shift the city is free roam');
 const xp=s.progress.xp,starsBefore=s.progress.stars;

 // A star next to the player is collected on the next step, once.
 await d.page.addInitScript(()=>{
  const key='prepx-festival-city-v1',draft=JSON.parse(sessionStorage.getItem(key));
  if(draft&&!sessionStorage.getItem('qa-moved')){sessionStorage.setItem('qa-moved','1');Object.assign(draft.city,{x:-230,z:-99,driving:false,fleet:null});sessionStorage.setItem(key,JSON.stringify(draft));}
 });
 await d.page.reload();await d.page.click('#resume');
 await d.page.waitForSelector('#watch:not([disabled])');await d.page.click('#watch');
 s=await d.tick(200);
 ok(s.progress.stars===starsBefore+1,'standing next to a festival star collects it: '+s.progress.stars);
 ok(s.progress.xp===xp+6,'progress survives a reload and the star adds its experience: '+xp+' → '+s.progress.xp);
 s=await d.tick(2000);ok(s.progress.stars===starsBefore+1,'a star is collected only once');

 // Paint shop: buy and equip a colour when the wallet allows it.
 await d.page.waitForTimeout(150);s=await d.state();
 if(s.wallet.coins>=30){
  await d.page.click('#shop');await d.page.click('#van-stock');await d.page.click('[data-item="paint-coral"]');
  await d.page.waitForTimeout(200);await d.page.click('#leave-shop');s=await d.state();
  ok(s.wallet.equipped.includes('paint-coral'),'bought and equipped a paint colour');
 }
 // Night arrives within the session and the lights come on.
 for(let t=0;t<360&&!(s.atmosphere.night&&s.atmosphere.glow===1);t+=30)s=await d.tick(30000);
 ok(s.atmosphere.night&&s.atmosphere.glow===1,'night falls: '+JSON.stringify(s.atmosphere));
 await d.page.waitForTimeout(300);await d.page.screenshot({path:'output/freeroam/night-1280.png'});
 ok(!d.errors.length,'no page errors on desktop: '+d.errors.join(' | '));
 await d.page.close();

 // Phone layouts: the new HUD pieces do not cover the controls.
 for(const viewport of [{width:390,height:844},{width:320,height:568},{width:844,height:390},{width:1000,height:520}]){
  const m=await open(viewport,'QA-Phone');await m.page.click('#start');await m.tick(200);await m.page.click('#vehicle');await m.tick(200);
  const kit=await boxOf(m.page,'#sidekit'),card=await boxOf(m.page,'.jobcard'),stick=await boxOf(m.page,'#joystick'),pedals=await boxOf(m.page,'#drive-controls'),speed=await boxOf(m.page,'#drive-status');
  const label=viewport.width+'×'+viewport.height;
  ok(apart(kit,card),label+' minimap clears the mission card '+JSON.stringify({kit,card}));
  ok(apart(kit,stick)&&apart(kit,pedals)&&apart(stick,pedals),label+' minimap, joystick and pedals do not overlap '+JSON.stringify({kit,stick,pedals}));
  ok(kit.x>=0&&kit.y>=0&&pedals.x+pedals.w<=viewport.width+1,label+' controls stay on screen');
  ok(apart(kit,speed),label+' minimap clears the speed readout '+JSON.stringify({kit,speed}));
  await m.page.screenshot({path:'output/freeroam/hud-'+viewport.width+'.png'});
  ok(!m.errors.length,label+' no page errors: '+m.errors.join(' | '));
  await m.page.close();
 }
 console.log('PASS '+checks+' free-roam checks: HUD, ride, full shift with experience, free roam, reload, star, paint, night and phone layouts');
}finally{await browser.close();}
