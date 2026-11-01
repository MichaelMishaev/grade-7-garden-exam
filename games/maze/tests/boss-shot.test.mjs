import {test} from 'node:test';
import assert from 'node:assert/strict';
import {acceptedBossShot,advanceBossShot,bossShotPose,SHOT_DURATION_MS} from '../boss-shot.js';

test('only a newly accepted hit creates a shot from the player position before checkpoint movement',()=>{
  const before={player:{x:-1.5,z:7.2},boss:{hits:[0]}},after={player:{x:0,z:1},boss:{hits:[0,1]}};
  const shot=acceptedBossShot(before,after);
  assert.deepEqual(shot,{elapsedMs:0,from:{x:-1.5,z:7.2},hit:2});
  assert.equal(acceptedBossShot(before,before),null);
  assert.deepEqual(before.player,{x:-1.5,z:7.2});
});

test('flight reaches boss before bounded impact and reduced motion retains static hit confirmation',()=>{
  let shot={elapsedMs:0,from:{x:0,z:7},hit:3};
  assert.equal(bossShotPose(shot).inFlight,true);
  assert.equal(bossShotPose(shot).impactVisible,false);
  const reduced=bossShotPose(shot,true);
  assert.equal(reduced.inFlight,false);assert.equal(reduced.impactVisible,true);assert.equal(reduced.recoil,0);
  shot=advanceBossShot(shot,240);
  assert.equal(bossShotPose(shot).inFlight,false);assert.equal(bossShotPose(shot).impactVisible,true);
  assert.equal(advanceBossShot(shot,SHOT_DURATION_MS-240),null);
  assert.equal(advanceBossShot(null,100),null);
});
