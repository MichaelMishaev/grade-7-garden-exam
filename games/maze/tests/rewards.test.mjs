import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,restoreState,transition,rewardBalance} from '../core.js';
import snapshot from '../content-snapshot.js';
const questions=snapshot.quizzes[0].questions;
function earned(){
 const state=createState(questions,()=>.999999);
 for(const id of state.assignments.floor){const q=questions.find(q=>q.id===id);state.answers[id]={choice:q.correct};}
 const restored=restoreState(state,questions);
 return transition(restored,{type:'collect-gift',id:'floor'},questions);
}
test('collected gifts create one diamond each without duplicates or changing answers',()=>{
 const state=earned();assert.equal(rewardBalance(state),1);
 assert.strictEqual(transition(state,{type:'collect-gift',id:'floor'},questions),state);
 assert.equal(rewardBalance(restoreState(state,questions)),1);
});
test('buying an upgrade spends once, keeps the gift, and survives refresh',()=>{
 const state={...earned(),paused:true};
 const bought=transition(state,{type:'buy-reward',item:'compass'},questions);
 assert.equal(rewardBalance(bought),0);assert.deepEqual(bought.giftsSeen,state.giftsSeen);
 assert.deepEqual(bought.rewardPurchases,['compass']);assert.deepEqual(bought.answers,state.answers);assert.equal(bought.coins,state.coins);
 assert.strictEqual(transition(bought,{type:'buy-reward',item:'compass'},questions),bought);
 const restored=restoreState(bought,questions);assert.deepEqual(restored.rewardPurchases,['compass']);assert.equal(rewardBalance(restored),0);
 assert.deepEqual(state.rewardPurchases,[]);
});
test('missing-heart purchase has a real effect and cannot buy at full health or without diamonds',()=>{
 const full={...earned(),paused:true};assert.strictEqual(transition(full,{type:'buy-reward',item:'heart'},questions),full);
 const injured={...full,hearts:2},healed=transition(injured,{type:'buy-reward',item:'heart'},questions);
 assert.equal(healed.hearts,3);assert.equal(rewardBalance(healed),0);assert.equal(healed.coins,injured.coins);
 assert.strictEqual(transition(healed,{type:'buy-reward',item:'lantern'},questions),healed);
 const restored=restoreState(healed,questions);assert.equal(restored.hearts,3);assert.equal(rewardBalance(restored),0);
});
test('purchases are rejected outside the paused exploration shop',()=>{
 const state=earned();
 for(const phase of ['question','feedback','capture','review','review-feedback','complete']){
  const blocked={...state,phase,paused:true};assert.strictEqual(transition(blocked,{type:'buy-reward',item:'lantern'},questions),blocked);
 }
 assert.strictEqual(transition(state,{type:'buy-reward',item:'lantern'},questions),state);
 const paused={...state,paused:true};assert.strictEqual(transition(paused,{type:'buy-reward',item:'unknown'},questions),paused);
});
test('legacy gifts are credited; corrupt purchase lists cannot overspend or duplicate upgrades',()=>{
 const state=earned();delete state.rewardPurchases;
 assert.equal(rewardBalance(restoreState(state,questions)),1);
 const restored=restoreState({...state,rewardPurchases:['unknown','compass','compass','lantern','heart']},questions);
 assert.deepEqual(restored.rewardPurchases,['compass']);assert.equal(rewardBalance(restored),0);
});
