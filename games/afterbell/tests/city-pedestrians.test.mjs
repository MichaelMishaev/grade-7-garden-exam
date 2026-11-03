import test from 'node:test';
import assert from 'node:assert/strict';
import {pedestrianReaction,touchesPedestrian} from '../src/city-pedestrians.js';
test('one bump lifts a pedestrian, lands clear of a wall, and recovers without repeating contact',()=>{
 const p={x:0,z:3.5},v={x:0,z:0,heading:0,speed:31},blocked=(x,z)=>z>5;
 assert.ok(touchesPedestrian(0,0,0,p));
 assert.ok(pedestrianReaction(p,v,0,blocked).started);
 const air=pedestrianReaction(p,v,.2,blocked);assert.ok(air.y>0);assert.ok(air.z<=5);
 const landed=pedestrianReaction(p,v,1.2,blocked);assert.equal(landed.y,0);assert.equal(p.reaction,null);
 assert.equal(pedestrianReaction(p,v,1.3,blocked).started,false);
});
test('walking or stationary contact does not throw people and reduced motion keeps feet on the ground',()=>{
 const v={x:0,z:0,heading:0,speed:0},p={x:0,z:3.5};
 assert.equal(pedestrianReaction(p,v,0,()=>false).started,false);
 v.speed=20;pedestrianReaction(p,v,0,()=>false,true);
 assert.equal(pedestrianReaction(p,v,.2,()=>false,true).y,0);
});
