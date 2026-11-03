import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyWallet,pay,toggleItem,witness,streakBonus,bestStreak} from '../src/city-wallet.js';

test('reward reconciliation survives retries, earlier drafts and a second shift',()=>{
 const w=emptyWallet(),round={attemptId:'one',answers:{a:{correct:true},b:{correct:false}}};
 pay(w,round,1);pay(w,round,1);pay(w,round,0);
 assert.equal(w.coins,20);
 toggleItem(w,'drone');assert.deepEqual(w.owned,[]);
 toggleItem(w,'cap');assert.equal(w.coins,10);assert.deepEqual(w.equipped,['cap']);
 toggleItem(w,'cap');assert.deepEqual(w.equipped,[]);
 toggleItem(w,'cap');assert.equal(w.coins,10);
 pay(w,{...round,attemptId:'two'},2);
 toggleItem(w,'drone');assert.equal(w.coins,10);
 assert.deepEqual(w.equipped,['cap','drone']);
});

test('a witness report pays once per incident per shift and never disturbs delivery pay',()=>{
 const w=emptyWallet(),round={attemptId:'one',answers:{a:{correct:true}}};
 pay(w,round,1);assert.equal(w.coins,20);
 assert.equal(witness(w,round,'0-gardens'),true);assert.equal(w.coins,30);
 assert.equal(witness(w,round,'0-gardens'),false);assert.equal(w.coins,30);
 pay(w,round,1);assert.equal(w.coins,30);
 assert.equal(witness(w,round,'0-market'),true);assert.equal(witness(w,{...round,attemptId:'two'},'0-gardens'),true);
 assert.equal(w.coins,50);
});

test('every third correct answer in a row pays a 5 coin bonus that survives reconciliation',()=>{
 const seq=[1,1,1,0,1,1,1,1,1,1].map((c,i)=>[String(i),{correct:Boolean(c)}]);
 const round={attemptId:'s',answers:Object.fromEntries(seq)};
 assert.equal(streakBonus(round),15);assert.equal(bestStreak(round),6);
 const w=emptyWallet();pay(w,round,0);assert.equal(w.coins,9*5+15);pay(w,round,0);assert.equal(w.coins,60);
 assert.equal(streakBonus({attemptId:'t',answers:{}}),0);
});
