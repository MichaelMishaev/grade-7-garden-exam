import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { academicScore, answer, canEscape, makeRound, restoreRound } from '../src/core.js';
import { editions, newRelay, station, charged } from '../src/relay.js';
const quiz=JSON.parse(readFileSync(new URL('../src/content-snapshot.json',import.meta.url))).quizzes[0];
test('every fresh edition changes its challenge locations and excludes the last edition',()=>{
  for(let i=0;i<editions.length;i++)for(const rng of [0,.999]){
    const r=newRelay(i,()=>rng);assert.notEqual(r.edition,i);
    for(let j=0;j<3;j++)assert.notEqual(station(r,j).task,station({edition:i},j).task);
  }
});
test('resume validates partial relay steps and reconstructs seals independently of classic items',()=>{
  const round=makeRound(quiz);round.relay={edition:0,steps:[5,0,2]};round.seals=['owl'];
  const restore=()=>restoreRound(JSON.stringify(round),quiz);
  assert.deepEqual(restore().relay,round.relay);assert.deepEqual(restore().seals,[]);
  round.relay.steps[1]=4;assert.equal(restore(),null);round.relay.edition=99;assert.equal(restore(),null);
});
test('short quizzes finish after three challenges and score only the first academic answers',()=>{
  for(const count of [1,2,quiz.questions.length]){
    const q={...quiz,questions:quiz.questions.slice(0,count)},round=makeRound(q);
    round.relay={edition:0,steps:[7,1,3]};
    q.questions.forEach((s,i)=>{answer(round,s.id,i===0?(s.correct+1)%s.choices.length:s.correct);assert.equal(answer(round,s.id,s.correct),null);});
    const saved=restoreRound(JSON.stringify(round),q);
    assert.equal(canEscape(saved),true);assert.ok(charged(saved.relay,1));
    assert.equal(academicScore(saved),academicScore({...saved,relay:undefined}));
  }
});
