import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {skyGates} from '../src/territory.js';
const b=await chromium.launch({args:['--enable-webgl']});
try{
  const p=await b.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  await p.goto((process.env.AFTERBELL_URL||'http://127.0.0.1:5202')+'/?test=1');
  await p.fill('#player-name','QA');await p.tap('#relay-start');await p.tap('#begin-adventure');
  await p.evaluate(()=>advanceTime(0));
  for(const [i,[x,z]] of skyGates.entries()){
    await p.evaluate(([x,z])=>{__afterbell.walkTo(x,z);advanceTime(50);},[x,z]);
    assert.equal(await p.evaluate(()=>JSON.parse(render_game_to_text()).territory.skyGates.length),i);
    await p.tap('#jump');await p.evaluate(()=>advanceTime(300));
    const t=await p.evaluate(()=>JSON.parse(render_game_to_text()).territory);
    assert.ok(t.skyGates.includes(i),'jump collects gate '+i);assert.ok(t.wind.boost>0);
    await p.evaluate(()=>advanceTime(1200));
  }
  // Hold at the edge of the first spirit's orbit, then advance in short bursts.
  await p.evaluate(()=>{__afterbell.walkTo(52,12);});
  let gust=false;
  for(let n=0;n<50&&!gust;n++){
    gust=await p.evaluate(()=>{advanceTime(150);return JSON.parse(render_game_to_text()).territory.wind.gust>0;});
  }
  assert.ok(gust,'a grounded player meets the wind spirit');
  await p.reload();await p.tap('#resume');assert.equal(await p.evaluate(()=>JSON.parse(render_game_to_text()).territory.skyGates.length),9);
  console.log('PASS nine touch jumps, ground-level misses, boost and resume');
}finally{await b.close();}
