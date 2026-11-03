import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyWallet,pay,toggleItem,witness} from '../src/city-wallet.js';

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
