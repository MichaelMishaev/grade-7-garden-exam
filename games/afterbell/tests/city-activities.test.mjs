import test from 'node:test';
import assert from 'node:assert/strict';
import {createPlay,RACES,medalFor,starCandidates,formatTime,zoneOf} from '../src/city-activities.js';
import {places,inCity,northSouthStreets,eastWestStreets} from '../src/city-data.js';
import {districtOpen,careerFrom} from '../src/city-discovery.js';
import {onRoad} from '../src/city-roads.js';

test('every race runs along real streets and its medal times are ordered',()=>{
 assert.equal(new Set(RACES.map(r=>r.id)).size,RACES.length);
 for(const r of RACES){
  for(const p of [r.start,...r.checkpoints]){assert.ok(inCity(p.x,p.z),r.id);assert.ok(onRoad(p.x,p.z),r.id+' '+JSON.stringify(p));}
  assert.ok(r.times[1]>r.times[2]&&r.times[2]>r.times[3]&&r.times[3]>5,r.id);
  assert.equal(medalFor(r,r.times[3]),3);assert.equal(medalFor(r,r.times[3]+.1),2);assert.equal(medalFor(r,r.times[1]+.1),0);
  // A whole race lies in one district, so a locked district hides it completely.
  assert.equal(new Set([r.start,...r.checkpoints].map(p=>zoneOf(p.x,p.z))).size,1,r.id);
 }
 const fresh=careerFrom(null);
 assert.equal(RACES.filter(r=>districtOpen(fresh,r.start.x,r.start.z)).length,3);
 assert.equal(formatTime(75.25),'1:15.3');assert.equal(formatTime(9),'0:09.0');
});

test('star candidates are unique, inside the city and spread over all three zones',()=>{
 const stars=starCandidates();
 assert.ok(stars.length>=40&&stars.length<=60,String(stars.length));
 assert.equal(new Set(stars.map(s=>s.id)).size,stars.length);
 for(const s of stars){assert.ok(inCity(s.x,s.z),s.id);assert.match(s.id,/^s-\d{1,2}-\d{1,2}$/);}
 for(const zone of ['central','north','east'])assert.ok(stars.filter(s=>s.zone===zone).length>=4,zone);
 // No star sits in the middle of a carriageway.
 for(const s of stars)assert.ok(!onRoad(s.x,s.z)&&!northSouthStreets.some(x=>Math.abs(s.x-x)<4)&&!eastWestStreets.some(z=>Math.abs(s.z-z)<4),s.id);
});

const make=(extra={})=>createPlay({places,stars:[{id:'s-1-1',x:10,z:10,zone:'central'}],seed:7,...extra});
test('stars are collected once, by proximity',()=>{
 const play=make();
 assert.deepEqual(play.tick({x:40,z:40,dt:.1,driving:false}),[]);
 const got=play.tick({x:10,z:11,dt:.1,driving:false});assert.equal(got[0].type,'star');assert.equal(got[0].star.id,'s-1-1');
 assert.deepEqual(play.tick({x:10,z:11,dt:.1,driving:false}),[]);
 assert.deepEqual(make({collected:['s-1-1']}).tick({x:10,z:10,dt:.1,driving:false}),[]);
 assert.deepEqual(make({isOpen:()=>false}).tick({x:10,z:10,dt:.1,driving:false}).filter(e=>e.type==='star'),[]);
});

test('a race needs a car, follows its checkpoints in order and ends with a medal',()=>{
 const play=make(),r=RACES[0];
 assert.equal(play.near({...r.start,driving:false}).kind,'hint');
 assert.equal(play.act({...r.start,driving:false})[0].type,'hint');
 assert.equal(play.near({x:r.start.x+40,z:r.start.z,driving:true}),null);
 assert.equal(play.act({...r.start,driving:true})[0].type,'race-start');
 assert.ok(play.racing());assert.equal(play.target().x,r.checkpoints[0].x);
 // Touching a later checkpoint first does nothing.
 assert.deepEqual(play.tick({...r.checkpoints[1],dt:1,driving:true}).filter(e=>e.type==='checkpoint'),[]);
 const seen=[];
 for(const p of r.checkpoints)seen.push(...play.tick({...p,dt:2,driving:true}));
 assert.equal(seen.filter(e=>e.type==='checkpoint').length,r.checkpoints.length-1);
 const done=seen.at(-1);assert.equal(done.type,'race-finish');assert.equal(done.time,1+2*r.checkpoints.length);assert.equal(done.medal,medalFor(r,done.time));
 assert.ok(!play.busy());assert.equal(play.target(),null);
});

test('a race is cancelled by leaving the car, by idling, or by the player',()=>{
 const r=RACES[0];let play=make();play.act({...r.start,driving:true});
 assert.equal(play.tick({...r.start,dt:.1,driving:false}).at(-1).reason,'left');assert.ok(!play.busy());
 play=make();play.act({...r.start,driving:true});let last;
 for(let i=0;i<60&&!last;i++)last=play.tick({...r.start,dt:1,driving:true}).find(e=>e.type==='race-cancel');
 assert.equal(last.reason,'timeout');
 play=make();play.act({...r.start,driving:true});assert.equal(play.cancel()[0].type,'race-cancel');assert.deepEqual(play.cancel(),[]);
});

test('rides pay by comfort and time, express parcels by time, and offers refill',()=>{
 const play=make();play.tick({x:0,z:0,dt:.1,driving:false});
 let {offers}=play.state();assert.equal(offers.length,3);
 assert.equal(new Set(offers.map(o=>o.from)).size,3);
 for(const o of offers){assert.ok(Math.hypot(places[o.from].x-places[o.to].x,places[o.from].z-places[o.to].z)>=110);assert.ok(o.fare>=7&&o.par>15);}
 const ride=offers.find(o=>o.kind==='ride');
 assert.equal(play.near({x:ride.x,z:ride.z,driving:false}).kind,'hint');
 assert.equal(play.act({x:ride.x,z:ride.z,driving:true})[0].type,'gig-board');
 assert.equal(play.state().offers.length,3);assert.ok(!play.state().offers.some(o=>o.id===ride.id));
 assert.equal(play.near({x:ride.x,z:ride.z,driving:true}),null);
 play.crash(1);assert.equal(play.state().gig.comfort,50);
 const dest=places[ride.to];
 // Passing the destination at speed does not drop the passenger off.
 assert.deepEqual(play.tick({x:dest.x,z:dest.z,dt:1,driving:true,speed:20}).filter(e=>e.type==='gig-done'),[]);
 const done=play.tick({x:dest.x+5,z:dest.z,dt:1,driving:true,speed:2}).find(e=>e.type==='gig-done');
 assert.ok(done);assert.equal(done.clean,false);assert.equal(done.inTime,true);assert.equal(done.coins,Math.round(ride.fare*.6)+3);

 const express=play.state().offers.find(o=>o.kind==='express');
 play.act({x:express.x,z:express.z,driving:true});
 play.tick({x:0,z:0,dt:express.par+1,driving:true,speed:10});
 const late=play.tick({...places[express.to],dt:.1,driving:true,speed:0}).find(e=>e.type==='gig-done');
 assert.equal(late.inTime,false);assert.equal(late.coins,Math.round(express.fare*.6));
});

test('a passenger waits a few seconds when the driver steps out, then leaves',()=>{
 const play=make();play.tick({x:0,z:0,dt:.1,driving:false});
 const o=play.state().offers[0];play.act({x:o.x,z:o.z,driving:true});
 assert.deepEqual(play.tick({x:o.x,z:o.z,dt:5,driving:false}).filter(e=>e.type==='gig-cancel'),[]);
 assert.equal(play.tick({x:o.x,z:o.z,dt:4,driving:false}).find(e=>e.type==='gig-cancel').reason,'left');
});

test('offers and showers stay inside unlocked districts',()=>{
 const career=careerFrom(null),isOpen=(x,z)=>districtOpen(career,x,z);
 const play=make({isOpen,seed:99});let shower=null;
 for(let t=0;t<400&&!shower;t++){const e=play.tick({x:0,z:0,dt:1,driving:false}).find(e=>e.type==='shower-start');if(e)shower=e.shower;}
 assert.ok(shower);assert.ok(shower.stars.length>=4);
 for(const s of shower.stars)assert.ok(isOpen(s.x,s.z));
 for(const o of play.state().offers){assert.ok(isOpen(places[o.from].x,places[o.from].z));assert.ok(isOpen(places[o.to].x,places[o.to].z));}
 const first=shower.stars[0],got=play.tick({x:first.x,z:first.z,dt:.1,driving:false}).find(e=>e.type==='star');
 assert.ok(got.shower);
 let ended=null;for(let t=0;t<100&&!ended;t++)ended=play.tick({x:-999,z:-999,dt:1,driving:false}).find(e=>e.type==='shower-end');
 assert.deepEqual({got:ended.got,total:ended.total},{got:1,total:shower.total});
});
