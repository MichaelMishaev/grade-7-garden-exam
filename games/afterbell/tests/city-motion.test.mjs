import test from 'node:test';
import assert from 'node:assert/strict';
import {runningPose} from '../src/city-motion.js';
test('running alternates opposite arms and legs with bent knees/elbows and returns to rest',()=>{
 const p=runningPose(1.55,1),next=runningPose(4.65,1);
 assert.ok(p[0].hip>0&&p[1].hip<0);assert.ok(p[0].shoulder<0&&p[1].shoulder>0);
 assert.ok(p.every(x=>x.knee>0&&x.elbow>0));assert.ok(next[0].hip<0&&next[1].hip>0);
 assert.ok(runningPose(2,0).every(p=>Object.values(p).every(x=>x===0)));
});
