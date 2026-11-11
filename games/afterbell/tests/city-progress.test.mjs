import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyProgress,progressFrom,levelFor,apply,learningGain,recordRace,dailyFor,dailyStatus,dayKey,RANKS,BADGES,XP,DAILY_COINS,DAILY_SWEEP_COINS,BADGE_COINS,levelCoins} from '../src/city-progress.js';

test('ranks rise with experience and the last rank has no next step',()=>{
 assert.deepEqual(levelFor(0),{level:1,title:RANKS[0][1],into:0,span:60,next:60,max:false});
 assert.equal(levelFor(59).level,1);assert.equal(levelFor(60).level,2);
 const top=levelFor(999999);assert.equal(top.level,RANKS.length);assert.ok(top.max);assert.equal(top.span,0);
 for(let i=1;i<RANKS.length;i++)assert.ok(RANKS[i][0]>RANKS[i-1][0]);
});

test('a level-up pays coins once and reports every level crossed',()=>{
 const p=emptyProgress(),r=apply(p,{xp:160},{},'2026-01-01');
 assert.deepEqual(r.events.filter(e=>e.type==='level').map(e=>e.level),[2,3]);
 assert.equal(r.coins,levelCoins(2)+levelCoins(3));
 assert.equal(apply(p,{xp:0},{},'2026-01-01').coins,0);
});

test('every day offers one learning challenge and two different city challenges',()=>{
 for(let d=1;d<=60;d++){
  const day='2026-03-'+String(d%28+1).padStart(2,'0')+'x'.repeat(d>28?1:0),list=dailyFor(day);
  assert.equal(list.length,3);assert.ok(['correct','delivery'].includes(list[0].stat));
  assert.notEqual(list[1].stat,list[2].stat);
  assert.ok(!['medal,race','cleanRide,rides'].includes([list[1].stat,list[2].stat].sort().join()));
  assert.deepEqual(dailyFor(day),list);
 }
});

test('daily challenges pay once, sweep bonus once, and reset on a new day',()=>{
 const p=emptyProgress(),day='2026-05-04',[learning,a,b]=dailyFor(day);
 let r=apply(p,{stats:{[learning.stat]:learning.goal}},{},day);
 assert.equal(r.events.filter(e=>e.type==='daily').length,1);assert.equal(p.days,1);
 assert.equal(apply(p,{stats:{[learning.stat]:5}},{},day).events.filter(e=>e.type==='daily').length,0);
 r=apply(p,{stats:{[a.stat]:a.goal,[b.stat]:b.goal}},{},day);
 assert.equal(r.events.filter(e=>e.type==='daily').length,2);assert.equal(r.events.filter(e=>e.type==='sweep').length,1);
 assert.ok(r.coins>=2*DAILY_COINS+DAILY_SWEEP_COINS);assert.equal(p.days,1);
 assert.ok(dailyStatus(p,day).every(c=>c.done));
 assert.ok(dailyStatus(p,'2026-05-05').every(c=>!c.done&&c.have===0));
 apply(p,{stats:{crashes:1}},{},'2026-05-05');assert.deepEqual(p.daily.claimed,[]);assert.equal(p.stats[learning.stat]>=learning.goal,true);
});

test('badges are granted once, including the ones that need world totals',()=>{
 const p=emptyProgress();
 let r=apply(p,{stats:{rides:1}},{totalStars:3,totalRaces:1},'2026-01-01');
 assert.ok(r.events.some(e=>e.type==='badge'&&e.name===BADGES.find(b=>b.id==='first-ride').name));
 assert.ok(r.coins>=BADGE_COINS);
 assert.ok(!apply(p,{stats:{rides:1}},{totalStars:3,totalRaces:1},'2026-01-01').events.some(e=>e.type==='badge'));
 p.stars=['s-1-1','s-1-2','s-1-3'];recordRace(p,'gardens',10,3);
 r=apply(p,{},{totalStars:3,totalRaces:1},'2026-01-01');
 for(const id of ['stars-all','gold-1','gold-all'])assert.ok(p.badges.includes(id),id);
 assert.ok(!apply(emptyProgress(),{},{totalStars:0,totalRaces:0},'2026-01-01').events.length);
});

test('learning experience is reconciled against the ledger and never paid twice',()=>{
 const p=emptyProgress(),round={attemptId:'a1',answers:{q1:{correct:true},q2:{correct:false},q3:{correct:true}}};
 let g=learningGain(p,round,0);assert.deepEqual(g,{xp:2*XP.correct,stats:{correct:2,delivery:0}});
 assert.equal(learningGain(p,round,0),null);
 round.answers.q4={correct:true};g=learningGain(p,round,1);
 assert.deepEqual(g,{xp:XP.correct+XP.delivery,stats:{correct:1,delivery:1}});
 g=learningGain(p,round,3,{stars:2,perfect:false});
 assert.equal(g.xp,2*XP.delivery+XP.shift+2*XP.scoreStar);assert.equal(g.stats.shifts,1);assert.equal(g.stats.delivery,2);assert.equal(g.stats.perfect,undefined);
 assert.equal(learningGain(p,round,3,{stars:2,perfect:false}),null);
 const restored=progressFrom(JSON.parse(JSON.stringify(p)));assert.equal(learningGain(restored,round,3,{stars:2,perfect:false}),null);
});

test('race records keep the best time and the best medal',()=>{
 const p=emptyProgress();
 assert.deepEqual(recordRace(p,'gardens',30,1),{improved:true,better:true,previous:null});
 assert.deepEqual(recordRace(p,'gardens',35,0),{improved:false,better:false,previous:30});
 assert.deepEqual(recordRace(p,'gardens',20,3),{improved:true,better:true,previous:30});
 assert.deepEqual(p.races.gardens,{best:20,medal:3});
});

test('stored progress is sanitised',()=>{
 const p=progressFrom({xp:-5,stats:{rides:'9',correct:12.7,evil:4},stars:['s-1-2','s-1-2','../x',7],badges:['first-ride','nope'],races:{gardens:{best:12.5,medal:9},'__proto__':{best:1},bad:{best:-1}},daily:{day:'2026-01-01',claimed:[0,0,5,'1'],counts:{rides:2,evil:1},sweep:1},ledger:{a:10,b:'x'},days:3.9});
 assert.equal(p.xp,0);assert.equal(p.stats.rides,0);assert.equal(p.stats.correct,12);assert.equal(p.stats.evil,undefined);
 assert.deepEqual(p.stars,['s-1-2']);assert.deepEqual(p.badges,['first-ride']);
 assert.deepEqual(p.races,{gardens:{best:12.5,medal:3}});
 assert.deepEqual(p.daily,{day:'2026-01-01',counts:{rides:2},claimed:[0],sweep:false});
 assert.deepEqual(p.ledger,{a:10});assert.equal(p.days,3);
 assert.deepEqual(progressFrom(null),emptyProgress());assert.deepEqual(progressFrom('x'),emptyProgress());
 assert.match(dayKey(new Date(2026,0,5)),/^2026-01-05$/);
});
