import test from 'node:test';
import assert from 'node:assert/strict';
import {skyAt,rainAt,gripAt,hourAt,clockLabel,DAY} from '../src/city-atmosphere.js';
import {manualDrive} from '../src/city-traffic.js';

test('a shift starts in full daylight and reaches night within one session',()=>{
 const start=skyAt(0);assert.equal(start.glow,0);assert.equal(start.night,false);assert.equal(clockLabel(0),'08:00');
 assert.ok(skyAt(DAY*.25).glow===0,'still day after a quarter of the cycle');
 assert.ok(skyAt(DAY*.6).night);assert.equal(skyAt(DAY*.6).glow,1);
 assert.ok(Math.abs(hourAt(DAY)-8)<1e-9);
});

test('light changes smoothly and stays bright enough to play at night',()=>{
 let previous=skyAt(0);
 for(let t=1;t<=DAY;t++){
  const now=skyAt(t);
  assert.ok(Math.abs(now.ambient-previous.ambient)<.05&&Math.abs(now.glow-previous.glow)<.05,'step at '+t);
  assert.ok(now.ambient>=1.1&&now.sun>=.6,'too dark at '+t);
  assert.match(now.sky,/^#[0-9a-f]{6}$/);assert.ok(now.sunDirection.y>=.45);
  previous=now;
 }
});

test('rain follows the shift clock, fades in and out, and lengthens braking',()=>{
 assert.equal(rainAt(0),0);assert.equal(rainAt(-5),0);assert.equal(rainAt(NaN),0);
 assert.ok(rainAt(155)>0&&rainAt(155)<1);assert.equal(rainAt(180),1);assert.equal(rainAt(230),0);
 assert.equal(rainAt(180+1080),1);
 assert.equal(gripAt(0),1);assert.ok(gripAt(1)<.6);
 const stop=grip=>{let speed=30,metres=0;for(let i=0;i<600&&speed>0;i++){const s=manualDrive({heading:0,throttle:1,speed,limit:30,brake:true,boost:false,dt:1/60,grip});metres+=Math.hypot(s.dx,s.dz);speed=s.speed;}return metres;};
 assert.ok(stop(gripAt(1))>stop(1)*1.5);
});
