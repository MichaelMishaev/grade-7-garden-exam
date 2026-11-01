import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import snapshot from '../content-snapshot.js';
import {normalizeMazeContent} from '../content.js';
import {createArcade,arcadeTransition,arcadeQuestion} from '../arcade-core.js';

const base=process.env.ARCADE_QA_URL||'http://127.0.0.1:5196/arcade.html';
const output=new URL('../../../output/maze/arcade-shot/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const checks=[],errors=[],writes=[];
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);console.log('PASS',name);};
let fixture=createArcade(normalizeMazeContent(snapshot.quizzes[0]),()=>.999999);
for(let i=0;i<3;i++){
  fixture=arcadeTransition(fixture,{type:'start'});
  fixture=arcadeTransition(fixture,{type:'assist'});
  for(let ms=0;ms<3500;ms+=20)fixture=arcadeTransition(fixture,{type:'tick',ms:20,dz:1});
  fixture=arcadeTransition(fixture,{type:'answer',choice:arcadeQuestion(fixture).correct});
  fixture=arcadeTransition(fixture,{type:'continue'});
}
assert.equal(fixture.phase,'boss-ready');
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const read=p=>p.evaluate(()=>JSON.parse(window.render_game_to_text()));
const advance=(p,ms)=>p.evaluate(ms=>window.advanceTime(ms),ms);
async function screenshot(p,name){await advance(p,0);return p.locator('#maze-canvas').screenshot({path:output+name+'.png'});}
async function setup(reducedMotion='no-preference'){
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion});
  await context.addInitScript(raw=>{
    window.requestAnimationFrame=()=>0;
    if(!sessionStorage.getItem('shot-test-init')){
      sessionStorage.setItem('prepx-shadow-maze-arcade-v1',raw);sessionStorage.setItem('shot-test-init','1');
    }
  },JSON.stringify({version:1,active:fixture,lastCompleted:null}));
  await context.route('**/*',r=>['GET','HEAD'].includes(r.request().method())?r.continue():r.abort());
  await context.route('**/api/quizzes/**',r=>r.fulfill({status:200,body:'{}',contentType:'application/json'}));
  const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
  p.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());});
  await p.goto(base,{waitUntil:'domcontentloaded'});
  await p.locator('#resume-run').tap();await p.locator('#start-challenge').tap();
  return {p,context};
}
async function reachPad(p){
  const s=await read(p);if(s.recoverMs)await advance(p,s.recoverMs+16);
  await p.keyboard.down('ArrowUp');await advance(p,1700);await p.keyboard.up('ArrowUp');
  check('actual movement reaches valid firing pad',(await read(p)).boss.canFire);
}
async function fire(p){await p.locator('#fire-button').tap();await advance(p,0);}
try{
  let {p,context}=await setup();
  await p.keyboard.press('e');let s=await read(p);
  check('rejected out-of-range shot has no animation or spent crystal',s.shot===null&&s.boss.hits.length===0&&s.crystals===3);
  for(let hit=1;hit<=3;hit++){
    await reachPad(p);const from=(await read(p)).player;
    await fire(p);s=await read(p);
    check(`accepted shot ${hit} starts at the firing player's position`,s.shot?.hit===hit&&s.shot.from.x===from.x&&s.shot.from.z===from.z&&s.shot.elapsedMs===0);
    check(`accepted shot ${hit} spends exactly one crystal and preserves score`,s.boss.hits.length===hit&&s.crystals===3-hit&&s.score===100&&s.coins===30);
    await p.keyboard.press('e');s=await read(p);
    check(`repeated shot ${hit} during recovery cannot restart animation or spend again`,s.shot?.hit===hit&&s.shot.elapsedMs===0&&s.boss.hits.length===hit&&s.crystals===3-hit);
    const initial=await screenshot(p,`hit-${hit}-launch`);
    await advance(p,120);s=await read(p);
    check(`shot ${hit} visibly travels before impact`,s.shot.inFlight&&s.shot.flight>0&&s.shot.flight<1&&!s.shot.impactVisible);
    const travel=await screenshot(p,`hit-${hit}-flight`);
    check(`shot ${hit} changes actual canvas pixels during flight`,!initial.equals(travel));
    if(hit===1){
      const elapsed=s.shot.elapsedMs;
      await p.locator('#pause-button').tap();await advance(p,1500);
      check('pause freezes the in-flight crystal',(await read(p)).shot.elapsedMs===elapsed);
      await p.locator('#resume-button').tap();await advance(p,1);
      check('resume continues the same shot',(await read(p)).shot.elapsedMs===elapsed+1);
    }
    if(hit===3){
      check('final accepted hit saves victory without covering its flight',s.phase==='victory'&&!await p.locator('#arcade-dialog').evaluate(e=>e.open));
      const elapsed=(await read(p)).shot.elapsedMs;
      await p.evaluate(()=>window.dispatchEvent(new Event('blur')));await advance(p,1000);
      check('focus loss freezes final-hit animation',(await read(p)).shot.elapsedMs===elapsed);
      await p.locator('#resume-button').tap();
    }
    await advance(p,180);s=await read(p);
    check(`shot ${hit} reaches shield impact`,s.shot?.impactVisible&&!s.shot.inFlight&&s.shot.recoil>0);
    const impact=await screenshot(p,`hit-${hit}-impact`);
    check(`shot ${hit} changes canvas pixels at impact`,!travel.equals(impact));
    if(hit===3)check('victory dialog remains deferred through final impact',!await p.locator('#arcade-dialog').evaluate(e=>e.open));
    await advance(p,300);s=await read(p);
    check(`shot ${hit} clears after its bounded duration`,s.shot===null);
    if(hit===1){
      await p.reload({waitUntil:'domcontentloaded'});await p.locator('#resume-run').tap();s=await read(p);
      check('reload preserves first hit but does not replay cosmetic shot',s.shot===null&&s.boss.hits.length===1&&s.crystals===2);
    }
  }
  s=await read(p);
  check('victory opens after final hit and payout remains exact',await p.locator('#another-run').isVisible()&&s.diamonds===4&&s.claimed.length===3&&s.score===100);
  await p.reload({waitUntil:'domcontentloaded'});await p.locator('#resume-run').tap();s=await read(p);
  check('completed reload shows summary immediately without replay or duplicate payout',s.shot===null&&s.diamonds===4&&await p.locator('#another-run').isVisible());
  await context.close();
  ({p,context}=await setup());
  await reachPad(p);await fire(p);await advance(p,80);
  check('cosmetic shot is excluded from the immediately persisted game snapshot',await p.evaluate(()=>!Object.hasOwn(JSON.parse(sessionStorage.getItem('prepx-shadow-maze-arcade-v1')).active,'shot')));
  await p.reload({waitUntil:'domcontentloaded'});await p.locator('#resume-run').tap();s=await read(p);
  check('reload during flight keeps the accepted hit and never replays the projectile',s.shot===null&&s.boss.hits.length===1&&s.crystals===2&&s.score===100);
  await context.close();
  ({p,context}=await setup('reduce'));
  await reachPad(p);await fire(p);s=await read(p);
  check('reduced motion replaces moving projectile and recoil with static impact',!s.shot.inFlight&&s.shot.impactVisible&&s.shot.recoil===0);
  await screenshot(p,'reduced-motion-impact');await advance(p,600);
  check('reduced motion settles without altering authoritative hit',(await read(p)).shot===null&&(await read(p)).boss.hits.length===1);
  await context.close();
  check('all checks have zero page errors and outbound writes',errors.length===0&&writes.length===0);
}finally{
  await writeFile(output+'report.json',JSON.stringify({base,checks,errors,writes},null,2));
  await browser.close();
}
