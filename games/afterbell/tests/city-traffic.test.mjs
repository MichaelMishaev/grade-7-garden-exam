import test from 'node:test';
import assert from 'node:assert/strict';
import {safeSpeed,vansTouch} from '../src/city-traffic.js';
const car=(x,z,angle,vx,vz)=>({position:{x,z},rotation:{y:angle},userData:{vx,vz}});
test('the bumper and side use different clearances',()=>{
 assert.equal(vansTouch(0,0,0,0,5.8,0),true);
 assert.equal(vansTouch(0,0,0,4,0,0),false);
 assert.equal(vansTouch(0,0,0,4,0,Math.PI/2),true);
});
test('a guided driver anticipates crossing traffic and ignores a car behind',()=>{
 assert.ok(safeSpeed(0,0,0,31,[car(-8,12,Math.PI/2,10,0)]).speed<31);
 assert.equal(safeSpeed(0,0,0,31,[car(0,-7,0,0,6)]).speed,31);
});

test('swept contact blocks boosted tunneling, sideways crossings and rotation',async()=>{
 const {sweptVehicleContact}=await import('../src/city-traffic.js');
 assert.ok(sweptVehicleContact({x:0,z:-15,angle:0},{x:0,z:15,angle:0},car(0,0,0,0,0)));
 assert.ok(sweptVehicleContact({x:-15,z:0,angle:Math.PI/2},{x:15,z:0,angle:Math.PI/2},car(0,0,0,0,0)));
 assert.ok(sweptVehicleContact({x:0,z:0,angle:0},{x:0,z:0,angle:Math.PI/2},car(4.5,0,0,0,0)));
 assert.equal(sweptVehicleContact({x:0,z:-15,angle:0},{x:0,z:15,angle:0},car(8,0,0,0,0)),false);
});
test('legacy overlap can separate but cannot be driven deeper; parked cars also trigger anticipation',async()=>{
 const {sweptVehicleContact}=await import('../src/city-traffic.js'),other=car(0,4,0,0,0);
 assert.equal(sweptVehicleContact({x:0,z:0,angle:0},{x:0,z:-1,angle:0},other),false);
 assert.equal(sweptVehicleContact({x:0,z:0,angle:0},{x:0,z:1,angle:0},other),true);
 assert.equal(sweptVehicleContact({x:0,z:3.9,angle:0},{x:0,z:14,angle:0},other),true,'overlap recovery cannot cross through the other car');
 assert.ok(safeSpeed(0,-10,0,31,[car(0,0,0)]).speed<31);
});


test('braking overrides throttle and slows the car faster than coasting', async()=>{
 const {manualDrive}=await import('../src/city-traffic.js');
 const start={heading:0,speed:15,limit:25,dt:.1};
 const coast=manualDrive({...start,throttle:0});
 const brake=manualDrive({...start,throttle:1,brake:true,boost:true});
 assert.ok(brake.speed>0&&brake.speed<coast.speed&&coast.speed<start.speed);
 assert.ok(brake.dz>0&&coast.dz>brake.dz);
 assert.equal(manualDrive({...start,throttle:1,brake:true,dt:1}).speed,0);
});

test('sustained throttle reaches the model limit without overshooting it', async()=>{
 const {manualDrive}=await import('../src/city-traffic.js');
 const {CAR_SPEED}=await import('../src/city-discovery.js');
 for(const limit of Object.values(CAR_SPEED)){
  for(const boost of [false,true]){
   const cap=boost?limit*1.65:limit;
   let speed=0;
   for(let i=0;i<600;i++){
    speed=manualDrive({heading:0,throttle:1,speed,limit:cap,boost,dt:1/60}).speed;
    assert.ok(speed<=cap);
   }
   assert.equal(speed,cap);
  }
 }
});

test('a crash shoves the other car harder than it bounces the player, and only an off-centre hit spins it',async()=>{
 const {crashKick}=await import('../src/city-traffic.js');
 const slow=crashKick(6,0,1,0,-6),fast=crashKick(31,0,1,0,-6),side=crashKick(31,0,1,2,-5),other=crashKick(31,0,1,-2,-5);
 assert.ok(fast.shove>fast.bounce&&fast.shove>slow.shove&&fast.power>slow.power);
 assert.ok(Math.abs(fast.spin)<1e-9);
 assert.ok(side.spin*other.spin<0);
 assert.ok(crashKick(200,0,1,0,-6).bounce<=8);
});

test('keyboardDrive: Up always accelerates along the heading, Down brakes then reverses',async()=>{
 const {keyboardDrive}=await import('../src/city-traffic.js');
 for(const heading of [0,1,2.4,-2,Math.PI]){
  const up=keyboardDrive({heading,keyY:1,speed:5,limit:30,dt:1/60});
  assert.ok(up.speed>5,'accelerates at heading '+heading);
  assert.ok(Math.abs(up.dx*Math.sin(heading)+up.dz*Math.cos(heading)-Math.hypot(up.dx,up.dz))<1e-9,'moves along the heading');
  const down=keyboardDrive({heading,keyY:-1,speed:10,limit:30,dt:1/60});
  assert.ok(down.speed<10&&down.speed>0,'brakes while rolling forward');
 }
 let speed=0;for(let i=0;i<120;i++)speed=keyboardDrive({heading:0,keyY:-1,speed,limit:30,dt:1/60}).speed;
 assert.ok(speed<-5,'reverses once stopped');
 assert.ok(keyboardDrive({heading:0,keyY:1,speed:-5,limit:30,dt:1/60}).speed>-5,'Up while backing brakes first');
 const l=keyboardDrive({heading:0,keyX:-1,keyY:1,sideSign:1,speed:10,limit:30,dt:1/60}),r=keyboardDrive({heading:0,keyX:1,keyY:1,sideSign:1,speed:10,limit:30,dt:1/60});
 assert.ok(l.heading<0&&r.heading>0&&l.speed>10,'steering turns the car while still accelerating');
});
