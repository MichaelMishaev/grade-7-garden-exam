import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';

const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const errors=[];
await context.addInitScript(()=>{window.requestAnimationFrame=()=>0;});
await context.route('**/api/quizzes/**',r=>r.fulfill({status:200,body:'{}',contentType:'application/json'}));
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
const read=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
const advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
try{
  await page.goto(process.env.ARCADE_QA_URL||'http://127.0.0.1:5196/arcade.html',{waitUntil:'domcontentloaded'});
  await page.locator('#new-run').tap();
  await page.locator('#start-challenge').tap();
  await page.locator('#assist-button').tap();
  const joystick=page.locator('#movement-joystick');
  await joystick.scrollIntoViewIfNeeded();
  const b=await joystick.boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2;
  const cdp=await context.newCDPSession(page);
  const touch=(type,dx=0,dy=0)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x:x+dx,y:y+dy}]});
  for(const [dx,dy,axis,sign] of [[8,-44,'dz',1],[-8,-44,'dz',1],[8,44,'dz',-1],[44,8,'dx',1],[-44,-8,'dx',-1]]){
    await touch('touchStart');await touch('touchMove',dx,dy);
    const s=await read(),other=axis==='dx'?'dz':'dx';
    assert.equal(s.joystick[other],0,'small sideways offset must not cause diagonal movement');
    assert.equal(Math.sign(s.joystick[axis]),sign);
    const before=s.player;
    await advance(100);
    const after=(await read()).player;
    assert.equal(after[axis==='dz'?'x':'z'],before[axis==='dz'?'x':'z'],'movement stays on its intended axis');
    await touch('touchEnd');
    const stopped=(await read()).player;await advance(100);
    assert.deepEqual((await read()).player,stopped,'release stops movement');
  }
  await touch('touchStart');await touch('touchMove',32,-32);
  let s=await read();assert.ok(s.joystick.dx>0&&s.joystick.dz>0,'intentional diagonal is preserved');
  await touch('touchMove',4,-4);s=await read();assert.equal(s.joystick.dx,0);assert.equal(s.joystick.dz,0);
  await touch('touchMove',-8,-44);
  const before=(await read()).player;
  await advance(500);assert.equal((await read()).player.x,before.x);
  const output=new URL('../../../output/maze/straight-movement/',import.meta.url).pathname;
  await mkdir(output,{recursive:true});
  await page.screenshot({path:output+'mobile-straight.png',fullPage:true});
  await advance(6000);assert.equal((await read()).phase,'question','off-center upward drag completes bridge');
  await touch('touchEnd');assert.equal((await read()).joystick.active,false);
  assert.deepEqual(errors,[]);
  console.log('PASS mobile touch: cardinal tolerance, actual straight movement, diagonal, dead zone, release, bridge completion; no page errors');
}finally{await browser.close();}
