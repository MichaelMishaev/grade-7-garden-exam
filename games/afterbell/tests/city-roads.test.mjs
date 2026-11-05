import test from 'node:test';
import assert from 'node:assert/strict';
import {drivingRoute,onRoad} from '../src/city-roads.js';
import {clearSegment} from '../src/navigation.js';

test('guided van detours at intersections when a street is blocked',()=>{
 const start={x:0,z:10},goal={x:0,z:105};
 const blocked=(x,z)=>Math.abs(x)<5&&z>28&&z<40;
 const route=drivingRoute(start,goal,blocked);
 assert.ok(route?.some(p=>Math.abs(p.x)>=54));
 let previous=start;
 for(const p of route){
   assert.ok(clearSegment(previous,p,(x,z)=>blocked(x,z)||!onRoad(x,z)));
   previous=p;
 }
 assert.deepEqual(previous,goal);
});

test('a trip from a doorstep to another doorstep uses the street between them',()=>{
 const start={x:12,z:14},goal={x:10,z:100};
 const route=drivingRoute(start,goal,()=>false);
 assert.deepEqual(route[0],{x:0,z:14});assert.deepEqual(route.at(-1),goal);
 for(let i=1;i<route.length-1;i++)assert.ok(clearSegment(route[i-1],route[i],(x,z)=>!onRoad(x,z)));
});

test('a parked-car clearance circle gets a road detour rather than a route through the car',()=>{
 const start={x:0,z:10},goal={x:0,z:48},blocked=(x,z)=>x*x+(z-28)**2<49;
 const route=drivingRoute(start,goal,blocked);assert.ok(route?.length);
 let previous=start;
 for(const p of route){assert.ok(clearSegment(previous,p,blocked));previous=p;}
 assert.deepEqual(route.at(-1),goal);
});
