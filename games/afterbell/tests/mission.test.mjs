import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { makeRound, NPCS, EQUIPMENT, academicScore } from '../src/core.js';
import { nextObjective, sideMission, SIDE_MISSIONS, checkOperation } from '../src/mission.js';
const {quizzes}=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url),'utf8'));
test('next step chooses nearby unfinished teammate then equipment and return, preserving player choice',()=>{
 const r=makeRound(quizzes[0]);let goal=nextObjective(r,null);assert.equal(goal.index,2);assert.equal(goal.kind,'npc');
 goal=nextObjective(r,0);assert.equal(goal.index,0);r.understood.push(NPCS[0].id);assert.equal(nextObjective(r,0).kind,'equipment');assert.equal(nextObjective(r,null).index,0);
 r.items.push(EQUIPMENT[0].id);assert.match(nextObjective(r,0).title,/החזירו/);r.seals.push(NPCS[0].id);assert.notEqual(nextObjective(r,0).index,0);
});
test('side missions require their actions, not merely visiting; rewards never change academic score',()=>{
 const r=makeRound(quizzes[0]),before=academicScore(r);assert.equal(sideMission(r).id,'water');r.environment.waterFilled=true;assert.equal(sideMission(r).id,'locker');
 r.environment.visited.push('locker');r.environment.switches=[true,false,true];r.environment.shots=2;assert.equal(sideMission(r).id,'basketball');r.environment.shots=3;r.environment.observations=1;assert.equal(sideMission(r),null);assert.equal(SIDE_MISSIONS.filter(m=>m.done(r.environment)).length,5);assert.equal(academicScore(r),before);
});
test('equipment challenge sequences reject out-of-order actions',()=>{assert.ok(checkOperation('card',0,0));assert.ok(!checkOperation('card',1,2));assert.ok(checkOperation('fuse',0,2));assert.ok(checkOperation('fuse',1,0));assert.ok(checkOperation('fuse',2,1));});
