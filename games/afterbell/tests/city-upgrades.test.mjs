import test from 'node:test';
import assert from 'node:assert/strict';
import {UPGRADES,MISSIONS,MAX_TIER,upgradesFrom,nextTier,buyUpgrade,carStats,tyreGrip,totalTiers,carRating} from '../src/city-upgrades.js';
import {CAR_SPEED} from '../src/city-discovery.js';
import {emptyWallet} from '../src/city-wallet.js';
import {gripAt} from '../src/city-atmosphere.js';
import {manualDrive} from '../src/city-traffic.js';

test('five lines with three priced, rising tiers and plain-word steps',()=>{
 assert.deepEqual(UPGRADES.map(u=>u.id),['engine','turbo','brakes','tyres','bumper']);
 for(const u of UPGRADES){assert.equal(u.price.length,MAX_TIER);assert.equal(u.steps.length,MAX_TIER);for(let i=1;i<MAX_TIER;i++)assert.ok(u.price[i]>u.price[i-1]);}
 assert.deepEqual(MISSIONS,[1,4,6]);
});

test('stored tiers are sanitised and old wallets without upgrades still read as zero',()=>{
 assert.deepEqual(upgradesFrom(undefined),{engine:0,turbo:0,brakes:0,tyres:0,bumper:0});
 assert.deepEqual(upgradesFrom({engine:9,turbo:-2,brakes:'2',tyres:1.5,bumper:null,rocket:3}),{engine:3,turbo:0,brakes:2,tyres:0,bumper:0});
 assert.deepEqual(carStats(emptyWallet().upgrades),{speed:1,accel:1,boostTime:1,recharge:1,brake:1,rainLoss:1,bounce:1,comfort:1});
 assert.equal(totalTiers({engine:3,brakes:1}),4);
});

test('buying refuses when locked or unaffordable and charges once per tier',()=>{
 const w={...emptyWallet(),coins:30};
 assert.equal(buyUpgrade(w,'engine',0),false);assert.equal(nextTier(w,'engine',0).state,'locked');
 assert.equal(buyUpgrade(w,'engine',1),true);assert.equal(w.coins,5);assert.equal(w.upgrades.engine,1);
 assert.equal(nextTier(w,'engine',9).state,'poor');assert.equal(buyUpgrade(w,'engine',9),false);assert.equal(w.coins,5);
 w.coins=1000;assert.equal(buyUpgrade(w,'engine',3),false,'tier 2 needs 4 missions');
 assert.equal(buyUpgrade(w,'engine',4),true);assert.equal(buyUpgrade(w,'engine',5),false,'tier 3 needs 6');
 assert.equal(buyUpgrade(w,'engine',6),true);assert.equal(nextTier(w,'engine',6).state,'max');assert.equal(buyUpgrade(w,'engine',6),false);
 assert.equal(w.coins,1000-50-90);assert.equal(buyUpgrade(w,'nitro',6),false);assert.deepEqual(w.owned,[]);
});

test('top tiers improve each line by 10–25% and keep the car order',()=>{
 const top=carStats({engine:3,turbo:3,brakes:3,tyres:3,bumper:3});
 for(const k of ['speed','accel','boostTime','recharge','brake'])assert.ok(top[k]>=1.1&&top[k]<=1.25,k);
 for(const k of ['bounce','comfort'])assert.ok(top[k]>=.75&&top[k]<=.9,k);
 const rain=tyreGrip(gripAt(1),top);assert.ok(rain>gripAt(1)*1.1&&rain<=gripAt(1)*1.25);assert.equal(tyreGrip(1,top),1);
 const order=Object.entries(CAR_SPEED).sort((a,b)=>a[1]-b[1]);
 for(let i=0;i<order.length-1;i++)assert.ok(order[i][1]*top.speed<=order[i+1][1]*1.05,'upgraded '+order[i][0]+' vs base '+order[i+1][0]);
 assert.ok(CAR_SPEED.toyota*top.speed<CAR_SPEED.ford);
});

test('manualDrive accel and brakeForce default to the old behaviour and scale the rates',()=>{
 const base={heading:0,throttle:1,speed:0,limit:30,brake:false,boost:false,dt:.1};
 assert.deepEqual(manualDrive(base),manualDrive({...base,accel:1,brakeForce:1}));
 assert.ok(Math.abs(manualDrive({...base,accel:1.25}).speed-manualDrive(base).speed*1.25)<1e-9);
 const stop={...base,speed:20,brake:true};
 assert.ok(Math.abs(manualDrive({...stop,brakeForce:1.25}).speed-(20-(32+20*.28)*1.25*.1))<1e-9);
});

test('a reinforced bumper softens the passenger comfort lost in a crash',async()=>{
 const {createPlay}=await import('../src/city-activities.js'),{places}=await import('../src/city-data.js');
 const comfortAfter=cushion=>{
  const play=createPlay({places,seed:7});play.tick({x:0,z:0,dt:.1,driving:false});
  const ride=play.state().offers.find(o=>o.kind==='ride');play.act({x:ride.x,z:ride.z,driving:true});
  play.crash(1,cushion);return play.state().gig.comfort;
 };
 assert.equal(comfortAfter(undefined),50);
 assert.equal(comfortAfter(carStats({bumper:3}).comfort),Math.round(100-50*.75));
});

test('every car has a handling profile that never falls as the unlock tier rises',async()=>{
 const {CAR_HANDLING,CAR_TASKS}=await import('../src/city-discovery.js');
 const {CAR_BRANDS}=await import('../src/city-cars.js').catch(()=>({CAR_BRANDS:CAR_TASKS}));
 assert.deepEqual(Object.keys(CAR_HANDLING).sort(),Object.keys(CAR_SPEED).sort());
 for(const b of Object.keys(CAR_BRANDS))assert.ok(CAR_HANDLING[b],b);
 const tiers=[...new Set(Object.values(CAR_TASKS))].sort((a,b)=>a-b);
 for(const k of ['accel','brake','turn','grip'])for(let i=1;i<tiers.length;i++){
  const of=t=>Object.keys(CAR_TASKS).filter(b=>CAR_TASKS[b]===t).map(b=>CAR_HANDLING[b][k]);
  assert.ok(Math.min(...of(tiers[i]))>=Math.max(...of(tiers[i-1])),k+' tier '+tiers[i]);
 }
 // The bus and the pickup are heavier than their tier mates.
 assert.ok(CAR_HANDLING.vw.accel<CAR_HANDLING.toyota.accel&&CAR_HANDLING.ford.turn<CAR_HANDLING.modelY.turn);
 assert.ok(CAR_SPEED.toyota<CAR_SPEED.ford&&CAR_SPEED.vw<CAR_SPEED.toyota,'speed order unchanged');
});

// Simulate a full-throttle turn of `angle` radians from cruise speed; returns seconds to align.
function turnTime(hand,cruise,angle){
 let heading=0,speed=cruise,t=0;
 while(Math.abs(heading-angle)>.01&&t<10){const r=manualDrive({heading,aim:angle,turnRate:hand.turn,throttle:1,speed,limit:cruise,dt:1/60,accel:hand.accel});heading=r.heading;speed=r.speed;t+=1/60;}
 return t;
}
test('higher cars turn sharper; turning is gradual at speed, free at a standstill, and instant by default',async()=>{
 const {CAR_HANDLING}=await import('../src/city-discovery.js');
 const a=manualDrive({heading:0,aim:Math.PI/2,turnRate:2,throttle:1,speed:20,limit:25,dt:1/60});
 assert.ok(a.heading>0&&a.heading<.2,'one frame turns only part of the way');
 assert.ok(a.speed<20,'a sharp turn eases off');
 assert.equal(manualDrive({heading:0,aim:Math.PI/2,turnRate:2,throttle:1,speed:0,limit:25,dt:1/60}).heading,Math.PI/2,'pivot from rest');
 assert.equal(manualDrive({heading:0,aim:1,throttle:1,speed:20,limit:25,dt:1/60}).heading,1,'no turn rate keeps the old snap');
 const wet=manualDrive({heading:0,aim:1,turnRate:2,throttle:1,speed:20,limit:25,dt:1/60,grip:.55});
 assert.ok(wet.heading<manualDrive({heading:0,aim:1,turnRate:2,throttle:1,speed:20,limit:25,dt:1/60}).heading,'wet road turns wider');
 const low=turnTime(CAR_HANDLING.toyota,CAR_SPEED.toyota,Math.PI/2),high=turnTime(CAR_HANDLING.cybertruck,CAR_SPEED.cybertruck,Math.PI/2);
 assert.ok(high<low,'cybertruck turns 90° faster at its own cruise speed '+high+' < '+low);
 assert.ok(low<1,'the starter still turns 90° within a second at full speed: '+low);
 const r=carRating('toyota',{engine:3,turbo:3,brakes:3,tyres:3,bumper:3}),f=carRating('ford',{});
 assert.ok(!(r.speed>f.speed&&r.handling>f.handling),'a fully upgraded starter does not beat the next car on both');
});
