import test from 'node:test';
import assert from 'node:assert/strict';
import {overtakeRoute} from '../src/city-overtake.js';
const lead={position:{x:18,z:2},rotation:{y:Math.PI/2},userData:{vx:6,vz:0}};
test('urgent passing can leave its lane, pass a slower car and merge back',()=>{
 const path=overtakeRoute({x:0,z:2},Math.PI/2,lead,[lead],()=>false);
 assert.ok(path);assert.ok(Math.abs(path[0].z+2)<1e-8);assert.ok(Math.abs(path.at(-1).z-2)<1e-8);
});
test('urgent passing waits for opposing traffic and blocked shoulders',()=>{
 const oncoming={position:{x:26,z:-2},rotation:{y:-Math.PI/2},userData:{vx:-8,vz:0}};
 assert.equal(overtakeRoute({x:0,z:2},Math.PI/2,lead,[lead,oncoming],()=>false),null);
 assert.equal(overtakeRoute({x:0,z:2},Math.PI/2,lead,[lead],(x,z)=>z<0),null);
});
