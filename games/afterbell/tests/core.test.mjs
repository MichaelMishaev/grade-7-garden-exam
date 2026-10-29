import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { makeRound, validQuiz, answer, progress, canEscape, academicScore, restoreRound, NPCS, EQUIPMENT } from '../src/core.js';
const {quizzes}=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url),'utf8'));

test('all 62 source questions retain valid answers, explanations and existing source references',()=>{
  assert.equal(quizzes.reduce((n,q)=>n+q.questions.length,0),62);
  for(const q of quizzes)assert.ok(validQuiz(q));
});

test('a shuffled round covers each source question and answer option exactly once across freely selectable quests',()=>{
  for(const quiz of quizzes){
    const r=makeRound(quiz);
    assert.equal(new Set(r.assignments.flat()).size,quiz.questions.length);
    assert.equal(r.assignments.flat().length,quiz.questions.length);
    for(const question of r.questions){
      const original=quiz.questions.find(q=>q.id===question.id);
      assert.deepEqual(question.options.map(o=>o.original).sort(),original.choices.map((_,i)=>i).sort());
      for(const option of question.options)assert.equal(option.text,original.choices[option.original]);
    }
  }
});

test('answers lock; first attempts determine score; every question and station is needed to exit',()=>{
  const r=makeRound(quizzes[0]),first=r.questions[0];
  assert.equal(answer(r,first.id,1-first.correct).correct,false);
  assert.equal(answer(r,first.id,first.correct),null);
  assert.equal(canEscape(r),false);
  for(const q of r.questions.slice(1))answer(r,q.id,q.correct);
  assert.equal(canEscape(r),false);
  r.items=EQUIPMENT.map(e=>e.id);r.understood=NPCS.map(n=>n.id);r.seals=NPCS.map(n=>n.id);
  assert.equal(canEscape(r),true);assert.equal(academicScore(r),83);
  assert.equal(progress(r,0).next,undefined);
});

test('malformed content or out-of-range choices do not score',()=>{
  const q=structuredClone(quizzes[0]);q.questions[0].correct=99;assert.equal(validQuiz(q),false);
  const r=makeRound(quizzes[0]);
  for(const value of [99,-1,1.5,null,'0'])assert.equal(answer(r,r.questions[0].id,value),null);
  assert.equal(academicScore(r),0);
});

test('reload preserves locked answers, item collection, source order and position while deriving seals',()=>{
  const q=quizzes[0],r=makeRound(q);r.understood=['owl'];r.items=['card'];
  for(const id of r.assignments[0])answer(r,id,r.questions.find(q=>q.id===id).correct);
  r.player={x:3,z:7};r.collected=[1,2];
  const restored=restoreRound(JSON.stringify(r),q);assert.ok(restored);
  assert.deepEqual(restored.seals,['owl']);assert.deepEqual(restored.items,['card']);
  assert.deepEqual(restored.answers,r.answers);assert.deepEqual(restored.player,r.player);
  assert.deepEqual(restored.questions,r.questions);
  const broken=structuredClone(r);broken.questions[0].correct=5;
  assert.equal(restoreRound(JSON.stringify(broken),q),null);
});

test('restoration cannot grant a station without both its equipment and conversation',()=>{
  const q=quizzes[0],r=makeRound(q);
  for(const question of r.questions)answer(r,question.id,question.correct);
  r.seals=NPCS.map(n=>n.id);r.understood=NPCS.map(n=>n.id);
  assert.deepEqual(restoreRound(JSON.stringify(r),q).seals,[]);
  r.items=['card','card','unknown','fuse'];r.understood=['owl'];
  const restored=restoreRound(JSON.stringify(r),q);
  assert.deepEqual(restored.items,['card','fuse']);assert.deepEqual(restored.seals,['owl']);
  assert.equal(canEscape(restored),false);
  r.items=EQUIPMENT.map(e=>e.id);r.understood=NPCS.map(n=>n.id);
  assert.equal(canEscape(restoreRound(JSON.stringify(r),q)),true);
});

test('collectibles, equipment and social discoveries never alter the academic score',()=>{
  const r=makeRound(quizzes[0]);answer(r,r.questions[0].id,r.questions[0].correct);
  const before=academicScore(r);
  r.items=EQUIPMENT.map(e=>e.id);r.collected=Array.from({length:12},(_,i)=>i);r.understood=NPCS.map(n=>n.id);
  assert.equal(academicScore(r),before);
});

test('restoration rejects changed source data and invalid stored participant values',()=>{
  const q=quizzes[0],r=makeRound(q),changed=structuredClone(q);
  changed.questions[0].difficulty='hard';
  assert.equal(restoreRound(JSON.stringify(r),changed),null);
  for(const participantName of ['',42,'x'.repeat(61)])assert.equal(restoreRound(JSON.stringify({...r,participantName}),q),null);
});
