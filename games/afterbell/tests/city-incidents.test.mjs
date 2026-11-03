import test from 'node:test';
import assert from 'node:assert/strict';
import {cityIncidentsAt,incidentTrafficAt,incidentLaneBlocked} from '../src/city-incidents.js';

const occurrence=(t,type)=>cityIncidentsAt(t).find(e=>e.type===type);
const offset=(e,along,across=0)=>[
 e.lane.x+along*Math.sin(e.heading)+across*Math.cos(e.heading),
 e.lane.z+along*Math.cos(e.heading)-across*Math.sin(e.heading)
];
const speed=(e,along,across=0,heading=e.heading)=>incidentTrafficAt([e],...offset(e,along,across),heading);

test('new shifts open with a neighborhood event visible from home',()=>{
 const [e]=cityIncidentsAt(0);
 assert.equal(e.type,'fight');assert.equal(e.phase,'reported');
 assert.ok(Math.hypot(e.x+16,e.z-20)<20);
 for(const t of [NaN,Infinity,-1])assert.deepEqual(cityIncidentsAt(t),[]);
});
test('calls have four distinct phases and leave no restriction after clearance',()=>{
 for(const [type,t] of [['fight',0],['fire',36],['crash',86],['jam',136]]){
   const first=occurrence(t,type),stages=new Set(),details=new Set(),end=t-first.age+first.duration;
   for(let n=t;n<end;n+=.5){
     const e=occurrence(n,type);
     assert.equal(e.id,first.id);assert.ok(e.phaseProgress>=0&&e.phaseProgress<1);
     stages.add(e.phase);details.add(e.detail);
   }
   assert.deepEqual([...stages],['reported','responding','working','clearing']);
   assert.equal(details.size,4);
   assert.ok(!cityIncidentsAt(end).some(e=>e.id===first.id));
   assert.equal(incidentTrafficAt(cityIncidentsAt(end),...offset(first,-6),first.heading),1);
 }
});
test('activity covers older and newly expanded neighborhoods without crowding the scene',()=>{
 const positions=new Set(),types=new Set();let peak=0;
 for(let t=0;t<2*394;t++){
   const events=cityIncidentsAt(t);peak=Math.max(peak,events.length);
   for(const e of events){
     positions.add(e.place);types.add(e.type);
     assert.ok(!incidentLaneBlocked(events,e.observer.x,e.observer.z));
     assert.ok(Math.hypot(e.observer.x-e.x,e.observer.z-e.z)>=8);
   }
 }
 assert.equal(positions.size,8);assert.equal(types.size,6);assert.equal(peak,3);
});
test('odd rounds swap two sites for a cargo spill and a tree rescue with the same timing',()=>{
 const first=occurrence(90,'crash'),spill=occurrence(394+90,'spill'),rescue=occurrence(394+185,'rescue');
 assert.ok(spill&&rescue);assert.equal(spill.place,first.place);assert.equal(spill.age,first.age);
 assert.equal(occurrence(394+90,'crash'),undefined);assert.equal(occurrence(394+185,'fight'),undefined);
 assert.ok(occurrence(2*394+90,'crash'));
 // A spill lets traffic crawl past while it is only reported, then closes the lane.
 assert.ok(speed(spill,-6)>0);assert.equal(incidentLaneBlocked([spill],...offset(spill,0)),false);
 const closed=occurrence(394+90+30,'spill');assert.equal(closed.phase,'working');
 assert.equal(speed(closed,-6),0);assert.equal(incidentLaneBlocked([closed],...offset(closed,0)),true);
 assert.equal(speed(closed,-6,0,closed.heading+Math.PI),1);
 // A rescue stays on the sidewalk like a fight.
 const climbing=occurrence(394+185+30,'rescue');assert.equal(climbing.phase,'working');
 assert.ok(speed(climbing,-6)>0);assert.equal(incidentLaneBlocked([climbing],...offset(climbing,0)),false);
});
test('time jumps, repeated reads and a two-shift boundary preserve the same calls',()=>{
 const t=390.75,expected=cityIncidentsAt(t);
 for(let n=0;n<395;n+=.25)cityIncidentsAt(n);
 assert.deepEqual(cityIncidentsAt(t),expected);
 const a=occurrence(0,'fight'),next=occurrence(394,'fight');
 assert.notEqual(next.id,a.id);assert.equal(next.age,a.age);
 // The last older call survives the cycle boundary until the crew leaves.
 assert.equal(cityIncidentsAt(394).find(e=>e.type==='jam').id,cityIncidentsAt(389).find(e=>e.type==='jam').id);
});
test('a crash stops its approach, leaves the other direction open and allows vehicles already inside to exit',()=>{
 const e=occurrence(90,'crash');
 assert.equal(speed(e,-6),0);assert.ok(speed(e,-18)>0&&speed(e,-18)<1);
 assert.equal(speed(e,-6,4),1);assert.equal(speed(e,-6,0,e.heading+Math.PI),1);
 assert.ok(speed(e,1)>0);
 assert.equal(incidentLaneBlocked([e],...offset(e,0)),true);
 assert.equal(incidentLaneBlocked([e],...offset(e,0,4)),false);
});
test('a fire slows nearby traffic first, closes the response lane, then releases it',()=>{
 const report=occurrence(36,'fire'),working=occurrence(72,'fire'),clear=occurrence(155,'fire');
 assert.ok(speed(report,-6)>0);assert.equal(speed(working,-6),0);
 assert.ok(speed(clear,-6)>0);assert.equal(incidentLaneBlocked([clear],...offset(clear,0)),false);
});
test('a jam releases platoons in alternating intervals while traffic inside the taper keeps moving',()=>{
 const green=occurrence(136+25+2,'jam'),red=occurrence(136+25+8,'jam');
 assert.equal(green.phase,'working');assert.equal(red.phase,'working');
 assert.ok(speed(green,-7)>0);assert.equal(speed(red,-7),0);assert.ok(speed(red,0)>0);
 assert.equal(incidentLaneBlocked([red],...offset(red,0)),false);
});
test('a sidewalk fight never blocks either road lane',()=>{
 const e=occurrence(25,'fight');
 assert.ok(speed(e,-6)>0);assert.equal(incidentLaneBlocked([e],...offset(e,0)),false);
 assert.equal(speed(e,-50),1);
});
