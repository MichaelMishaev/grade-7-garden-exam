// Browser check for the urgent drive to an incident and the on-scene guide in Bay City.
// Run against the dev server: CITY_QA_URL=http://127.0.0.1:5177/index.html node tests/qa-city-urgent.mjs
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const base=process.env.CITY_QA_URL||'http://127.0.0.1:5177/index.html';
const browser=await chromium.launch({args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
await mkdir('output/urgent',{recursive:true});
let checks=0;const ok=(value,label)=>{assert.ok(value,label);checks++;};
const boxOf=(page,selector)=>page.locator(selector).evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});
const apart=(a,b)=>a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y;
try{
 for(const viewport of [{width:1100,height:780},{width:390,height:844}]){
  const phone=viewport.width<500,label=viewport.width+'×'+viewport.height;
  const page=await browser.newPage({viewport,hasTouch:phone,isMobile:phone});page.setDefaultTimeout(20000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/api/afterbell/attempts',r=>r.fulfill({json:{saved:true}}));
  const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
  const tick=ms=>page.evaluate(ms=>{advanceTime(ms);return JSON.parse(render_game_to_text());},ms);
  const menu=async()=>{if(phone&&await page.locator('#mission-toggle').getAttribute('aria-expanded')==='false')await page.click('#mission-toggle');};
  await page.goto(base+(base.includes('?')?'&':'?')+'playSeed=11');await page.fill('#player-name','QA');await page.waitForSelector('#start:not([disabled])');await page.click('#start');
  let s=await tick(200);
  await page.click('#vehicle');ok((await state()).driving,label+' took the car');
  const event=s.life.events.find(e=>e.type==='fight');ok(event,label+' the first report is the sidewalk argument');
  const respond=async()=>{await menu();await page.click('#dispatch');const i=(await state()).life.events.findIndex(e=>e.id===event.id);await page.click('[data-observe="'+i+'"]');};
  await menu();await page.click('#dispatch');
  ok(/נסיעה דחופה/.test(await page.locator('[data-observe]').first().textContent()),label+' from a car the report offers an urgent drive');
  ok(await page.locator('.city-report .next-step').first().isVisible(),label+' the report says what happens next');
  await page.click('#close-dispatch');
  await respond();s=await state();
  ok(s.life.urgent,label+' the car is on an urgent drive');
  if(!phone){
   await page.keyboard.down('ArrowUp');s=await tick(60);await page.keyboard.up('ArrowUp');
   ok(!s.life.urgent,label+' steering yourself ends the urgent drive');
   await page.keyboard.down('Space');await tick(1500);await page.keyboard.up('Space');
   await respond();ok((await state()).life.urgent,label+' and it can be called again');
  }
  for(let i=0;i<120;i++){s=await tick(1000);if(Math.hypot(s.player.x-event.observer.x,s.player.z-event.observer.z)<11.5)break;}
  s=await tick(1500);await page.waitForTimeout(250);
  ok(Math.hypot(s.player.x-event.observer.x,s.player.z-event.observer.z)<12,label+' arrived by the scene: '+JSON.stringify([s.player.x,s.player.z,event.observer]));
  ok(await page.locator('#scene-guide').isVisible(),label+' the on-scene guide is shown');
  ok((await page.locator('#scene-now').innerText()).length>4&&(await page.locator('#scene-next').innerText()).length>4,label+' it says what the crew does now and next');
  // An opened mission card may cover the guide on a phone; the layout is judged with the card closed.
  if(phone&&await page.locator('#mission-toggle').getAttribute('aria-expanded')==='true')await page.click('#mission-toggle');
  const guide=await boxOf(page,'#scene-guide');
  for(const other of ['.jobcard','#sidekit','#drive-controls','#drive-status'].concat(phone?['#joystick']:[]))ok(apart(guide,await boxOf(page,other)),label+' the guide clears '+other+' '+JSON.stringify(guide));
  ok(guide.x>=0&&guide.x+guide.w<=viewport.width&&guide.y>=0,label+' the guide stays on screen');
  await page.screenshot({path:'output/urgent/scene-'+viewport.width+'.png'});
  await page.click('#leave-scene');await page.waitForTimeout(150);
  ok(!await page.locator('#scene-guide').isVisible(),label+' leaving the scene hides the guide');
  ok(!errors.length,label+' no page errors: '+errors.join(' | '));
  await page.close();
 }
 console.log('PASS '+checks+' urgent-drive checks: dispatch offer, urgent state, manual override, arrival, on-scene guide on desktop and phone');
}finally{await browser.close();}
