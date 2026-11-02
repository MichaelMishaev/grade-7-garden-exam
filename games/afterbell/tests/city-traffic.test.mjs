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
