import test from 'node:test';
import assert from 'node:assert/strict';
import {sceneryTouch,kickObject,stepObject} from '../src/city-objects.js';
test('full van footprint catches walls, side clipping and diagonal contact',()=>{
 const o={x:0,z:0,w:5,d:4};
 assert.ok(sceneryTouch(0,6.9,0,o));assert.ok(!sceneryTouch(0,7.1,0,o));
 assert.ok(sceneryTouch(7,0,Math.PI/4,o));assert.ok(!sceneryTouch(10,0,Math.PI/4,o));
 assert.ok(sceneryTouch(0,0,0,o));
});
test('loose objects travel, land and settle; blocked motion bounces outside wall',()=>{
 const o={x:0,z:0,y:0};kickObject(o,1,0,31);
 for(let i=0;i<300;i++){stepObject(o,1/60,x=>x>3);assert.ok(o.x<=3);}
 assert.equal(o.y,0);assert.equal(o.moving,false);assert.ok(o.x>0);
});
