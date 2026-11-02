import test from 'node:test';
import assert from 'node:assert/strict';
import {SCENARIOS,newScenario,recommendedScenario,scenarioGoal,scenarioStage,scenarioStep,fieldAction,tickField,taskData,restoreScenario,packingCells,runProgram,routeCost} from '../src/scenarios.js';
import {makeRound,answer,academicScore,NPCS,EQUIPMENT,canEscape,restoreRound} from '../src/core.js';
import {TASK_SOLUTIONS} from './task-solutions.mjs';
import snapshot from '../src/content-snapshot.json' with {type:'json'};
const roundFor=s=>({...makeRound(snapshot.quizzes.find(q=>s.quizzes.includes(q.id))),scenario:newScenario(s.id)});
const motion=(r)=>({crouching:true,dashing:r.scenario.checkpoint===1,companion:{...scenarioGoal(r)}});
function apply(r,a){const goal=scenarioGoal(r);return fieldAction(r,a,{...goal,y:r.scenario.checkpoint===3?0:1},motion(r));}
function award(r,i){r.items.push(EQUIPMENT[i].id);r.understood.push(NPCS[i].id);for(const id of r.assignments[i])answer(r,id,r.questions.find(q=>q.id===id).correct);r.seals.push(NPCS[i].id);}
test('30 exclusive task types, no shared puzzle types across any adventures; seven subject recommendations',()=>{
 assert.equal(SCENARIOS.length,10);const kinds=SCENARIOS.flatMap(s=>s.steps.map(x=>x.kind));assert.equal(kinds.length,30);assert.equal(new Set(kinds).size,30);assert.deepEqual(new Set(kinds),new Set(Object.keys(TASK_SOLUTIONS)));
 for(const s of SCENARIOS)assert.ok(s.steps.every(t=>t.kind.startsWith(s.id+'-')));
 for(const q of snapshot.quizzes)assert.ok(SCENARIOS.find(s=>s.id===recommendedScenario(q.id)).quizzes.includes(q.id));
});
for(const s of SCENARIOS)for(let index=0;index<3;index++)test(`${s.id}: ${s.steps[index].kind} requires its own complete solution, rejects empty/distant confirmation, survives intermediate reload`,()=>{
 let r=roundFor(s);for(let i=0;i<index;i++){r.scenario.completed.push(i);award(r,i);}
 const step=scenarioStep(r),score=academicScore(r);assert.ok(!apply(r,{type:'submit'}).complete);assert.ok(!fieldAction(r,{type:'submit'},{x:26,z:26}).complete);
 if(step.kind==='rescue-trust'){assert.ok(!apply(r,{type:'befriend'}).complete);tickField(r,scenarioGoal(r),{crouching:false},4);assert.equal(taskData(r).trust,0);tickField(r,scenarioGoal(r),{crouching:true},3.1);}
 const actions=TASK_SOLUTIONS[step.kind];let result;
 for(let i=0;i<actions.length;i++){result=apply(r,actions[i]);if(i===Math.floor(actions.length/2)&&!result.complete){const restored=restoreRound(JSON.stringify(r),snapshot.quizzes.find(q=>q.id===r.quizId));assert.ok(restored,'partial state must restore');r=restored;}}
 assert.ok(result.complete,step.kind);assert.equal(academicScore(r),score);assert.ok(!canEscape(r));assert.equal(scenarioStage(r),index);assert.equal(apply(r,{type:'submit'}).complete,true);
 award(r,index);if(index===2)assert.equal(canEscape(r),true);
});
test('escort, quiet trust, and courier course require physical conditions',()=>{
 const r=roundFor(SCENARIOS.find(s=>s.id==='robot'));r.scenario.completed=[0,1];award(r,0);award(r,1);const goal=scenarioGoal(r);assert.equal(fieldAction(r,{type:'checkpoint'},goal,{companion:{x:0,z:0}}).ok,false);assert.equal(r.scenario.checkpoint,0);
 const fox=roundFor(SCENARIOS.find(s=>s.id==='rescue'));tickField(fox,{x:26,z:26},{crouching:true},20);assert.equal(taskData(fox).trust,0);tickField(fox,scenarioGoal(fox),{crouching:true},2);tickField(fox,scenarioGoal(fox),{crouching:false},1);assert.equal(taskData(fox).trust,1.5);
 const courier=roundFor(SCENARIOS.find(s=>s.id==='courier'));courier.scenario.completed=[0];award(courier,0);assert.equal(fieldAction(courier,{type:'checkpoint'},scenarioGoal(courier),{}).ok,false);apply(courier,{type:'checkpoint'});assert.equal(courier.scenario.checkpoint,1);assert.equal(fieldAction(courier,{type:'checkpoint'},scenarioGoal(courier),{dashing:false}).ok,false);
});
test('packing overlaps/bounds, robot walls, route budget, and incomplete Morse remain unsolved',()=>{
 assert.equal(packingCells([{x:0,y:0,rotate:false},{x:0,y:0,rotate:false},null]),null);assert.equal(packingCells([{x:3,y:2,rotate:false},null,null]),null);assert.equal(runProgram([0,1]).ok,false);assert.ok(routeCost([1,0,2])>14);
 const r=roundFor(SCENARIOS.find(s=>s.id==='relay'));r.scenario.completed=[0];award(r,0);apply(r,{type:'symbol',value:'.'});assert.equal(apply(r,{type:'letter'}).ok,false);assert.ok(!apply(r,{type:'submit'}).complete);
});
test('revision 1 drafts upgrade unfinished operations without losing completed fields or locked answers; invalid structures rejected',()=>{
 const r=roundFor(SCENARIOS[0]);r.scenario.completed=[0];award(r,0);const old={...r.scenario};delete old.revision;delete old.data;old.checkpoint=2;r.scenario=old;
 const restored=restoreRound(JSON.stringify(r),snapshot.quizzes.find(q=>q.id===r.quizId));assert.equal(restored.scenario.revision,2);assert.equal(restored.scenario.checkpoint,0);assert.deepEqual(restored.scenario.completed,[0]);assert.deepEqual(restored.answers,r.answers);
 assert.equal(restoreScenario({...newScenario('evidence'),data:{order:1}}),null);assert.equal(restoreScenario({...newScenario('evidence'),data:{order:[]}}),null);assert.equal(restoreScenario({...newScenario('evidence'),checkpoint:99}),null);
 const legacy=makeRound(snapshot.quizzes[0]);assert.ok(restoreRound(JSON.stringify(legacy),snapshot.quizzes[0]));
});
for(const s of SCENARIOS)test(`${s.id}: all three wider tasks advance consecutively without leaking checkpoint/data`,()=>{
 const r=roundFor(s);
 for(let i=0;i<3;i++){
  const step=scenarioStep(r);taskData(r);assert.equal(r.scenario.checkpoint,0);assert.equal(taskData(r).task,step.kind);
  if(step.kind==='rescue-trust')tickField(r,scenarioGoal(r),{crouching:true},3.1);
  for(const a of TASK_SOLUTIONS[step.kind])apply(r,a);
  assert.ok(r.scenario.completed.includes(i));award(r,i);
 }
 assert.equal(canEscape(r),true);assert.equal(academicScore(r),100);
});
test('each adventure has an exclusive bonus objective; no shared legacy errand list',async()=>{
 const {extraMissions}=await import('../src/mission.js');const extras=SCENARIOS.map(s=>extraMissions(roundFor(s)));
 assert.ok(extras.every(a=>a.length===1));assert.equal(new Set(extras.map(a=>a[0].id)).size,10);
 for(let i=0;i<extras.length;i++)assert.equal(extras[i][0].done(roundFor(SCENARIOS[i]).environment),false);
});
