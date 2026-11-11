import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyWallet,pay,toggleItem,witness,streakBonus,bestStreak,items,itemOpen,newlyUnlocked,nextUnlock} from '../src/city-wallet.js';

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

test('missions put items on sale and the purchase rule enforces it',()=>{
 const w={...emptyWallet(),coins:200};
 toggleItem(w,'crown',12,7);assert.deepEqual(w.owned,[]);assert.equal(w.coins,200);
 toggleItem(w,'crown',12,8);assert.deepEqual(w.owned,['crown']);assert.equal(w.coins,155);
 // A rank-gated paint needs both the rank and the missions.
 toggleItem(w,'paint-mint',3,10);toggleItem(w,'paint-mint',9,5);assert.ok(!w.owned.includes('paint-mint'));
 toggleItem(w,'paint-mint',4,6);assert.ok(w.equipped.includes('paint-mint'));
 assert.equal(itemOpen(items.find(i=>i.id==='cap'),1,0),true);
});

test('an owned item stays usable whatever its requirement',()=>{
 const w={coins:0,owned:['crown','paint-gold'],equipped:[],earnings:{}};
 toggleItem(w,'crown',1,0);toggleItem(w,'paint-gold',1,0);
 assert.deepEqual(w.equipped,['crown','paint-gold']);assert.equal(w.coins,0);
 toggleItem(w,'crown',1,0);assert.deepEqual(w.equipped,['paint-gold']);
});

test('the shop grows after nearly every one of the first ten missions',()=>{
 assert.ok(items.every(i=>Number.isInteger(i.tasks)));
 const starter=items.filter(i=>i.tasks===0);assert.ok(starter.length>=3&&starter.length<=6);
 assert.ok(starter.some(i=>i.vehicle)&&starter.some(i=>!i.vehicle));
 const steps=[1,2,3,4,5,6,7,8,9,10].filter(n=>newlyUnlocked(n-1,n).length);assert.ok(steps.length>=9,String(steps));
 assert.equal(new Set(items.map(i=>i.id)).size,items.length);
});

test('newly unlocked items come from the count before and after, so a replay announces nothing',()=>{
 assert.deepEqual(newlyUnlocked(2,3).map(i=>i.id).sort(),items.filter(i=>i.tasks===3).map(i=>i.id).sort());
 assert.deepEqual(newlyUnlocked(3,3),[]);
 assert.deepEqual(newlyUnlocked(0,2).map(i=>i.id).sort(),items.filter(i=>i.tasks===1||i.tasks===2).map(i=>i.id).sort());
 // A paint whose rank is not reached yet is not announced as on sale.
 assert.ok(!newlyUnlocked(5,6,3).some(i=>i.id==='paint-mint'));assert.ok(newlyUnlocked(5,6,4).some(i=>i.id==='paint-mint'));
 assert.equal(nextUnlock(0).tasks,1);assert.ok(nextUnlock(0).items.length);
 assert.equal(nextUnlock(Math.max(...items.map(i=>i.tasks))),null);
});
