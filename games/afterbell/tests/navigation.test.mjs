import {test} from 'node:test';
import assert from 'node:assert/strict';
import {findRoute,clearSegment,arrivedAtGoal} from '../src/navigation.js';
const verify=(start,path,blocked)=>{assert.ok(path);for(const p of path){assert.ok(clearSegment(start,p,blocked));start=p;}};
test('route goes around a wall and ends in normal interaction range',()=>{const blocked=(x,z)=>Math.abs(x)<1&&Math.abs(z)<5;const start={x:-6,z:0},goal={x:6,z:0},path=findRoute(start,goal,blocked);verify(start,path,blocked);assert.ok(path.some(p=>Math.abs(p.z)>5));assert.ok(Math.hypot(path.at(-1).x-goal.x,path.at(-1).z-goal.z)<=1.7);});
test('an obstructed objective gets a reachable approach, not a teleport',()=>{const blocked=(x,z)=>Math.hypot(x,z)<1.5;const path=findRoute({x:-7,z:0},{x:0,z:0},blocked);verify({x:-7,z:0},path,blocked);assert.ok(Math.hypot(path.at(-1).x,path.at(-1).z)<=1.7);});
test('closed rooms and corner cutting are not traversable',()=>{const blocked=(x,z)=>Math.abs(x)>3.8&&Math.abs(x)<4.6||Math.abs(z)>3.8&&Math.abs(z)<4.6;assert.equal(findRoute({x:0,z:0},{x:10,z:0},blocked),null);assert.equal(clearSegment({x:0,z:0},{x:6,z:6},blocked),false);});
test('click walking reaches the exact clear point and a nearby goal needs no movement',()=>{const start={x:0,z:0},goal={x:2.13,z:2.17};assert.deepEqual(findRoute(start,goal,()=>false,{radius:.1}).at(-1),goal);assert.deepEqual(findRoute(start,{x:1,z:0},()=>false),[]);});

test('arrival survives the follower stopping within its waypoint tolerance',()=>{const goal={x:10,z:14};assert.equal(arrivedAtGoal({x:9.592445786639697,z:15.693297282435175},goal),true);assert.equal(arrivedAtGoal({x:10,z:15.81},goal),false);});
