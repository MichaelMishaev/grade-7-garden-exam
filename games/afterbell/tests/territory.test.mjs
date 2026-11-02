import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {makeRound,restoreRound} from '../src/core.js';
import {newRelay,station} from '../src/relay.js';
import {inRiver,landmarks,WORLD_EDGE} from '../src/territory.js';
const quiz=JSON.parse(readFileSync(new URL('../src/content-snapshot.json',import.meta.url))).quizzes[0];

test('every new edition visits three different outer regions and a legacy edition stays on campus',()=>{
  for(let edition=0;edition<3;edition++){
    const sites=[0,1,2].map(i=>station({edition,territory:1},i));
    assert.equal(new Set(sites.map(s=>s.region)).size,3);
    assert.ok(sites.every(s=>Math.max(Math.abs(s.x),Math.abs(s.z))>27));
    assert.ok([0,1,2].every(i=>Math.abs(station({edition},i).x)<=27));
  }
});
test('discovery and gates restore at an outer landmark and reject positions outside the world',()=>{
  const round=makeRound(quiz);round.relay=newRelay(-1);round.player={x:-86,z:60};
  round.stones=[landmarks[0].id,'invalid',landmarks[0].id];round.skyGates=[0,0,8,9];
  const saved=restoreRound(JSON.stringify(round),quiz);
  assert.deepEqual(saved.stones,[landmarks[0].id]);assert.deepEqual(saved.skyGates,[0,8]);assert.deepEqual(saved.player,round.player);
  round.player.z=WORLD_EDGE+1;assert.equal(restoreRound(JSON.stringify(round),quiz),null);
});
test('the eastern watercourse admits crossings only at the bridge decks or around the ends',()=>{
  assert.ok(inRiver(45,0));assert.ok(inRiver(45,40));
  for(const z of [12,54,94])assert.equal(inRiver(45,z),false);
});
