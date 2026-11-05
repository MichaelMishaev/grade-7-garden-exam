import test from 'node:test';
import assert from 'node:assert/strict';
import {careerFrom,awardTask,carAvailable,districtOpen,completeContract,contracts,learningTasks} from '../src/city-discovery.js';
import {places} from '../src/city-data.js';
const study=(c,n)=>{for(let i=0;i<n;i++)awardTask(c,'round-'+i+':delivery:0');};
test('vehicles and districts require actual task and learning milestones',()=>{
 const c=careerFrom(null);assert.ok(carAvailable(c,'toyota'));assert.ok(carAvailable(c,'vw'));assert.ok(!carAvailable(c,'cybertruck'));
 for(const t of contracts.slice(0,3))awardTask(c,t.id);
 assert.ok(carAvailable(c,'bmw'));assert.ok(!districtOpen(c,0,-225));
 study(c,1);assert.ok(districtOpen(c,0,-225));assert.ok(!districtOpen(c,225,0));
 awardTask(c,'station-drive');awardTask(c,'court-walk');assert.equal(c.done.length,6);assert.ok(!districtOpen(c,225,0));
 study(c,2);assert.ok(districtOpen(c,225,0));assert.ok(carAvailable(c,'cybertruck'));
 assert.ok(districtOpen(c,224,-224));assert.ok(!carAvailable(c,'unknown'));
});
test('exploration contracts require proximity, the proper transport and accessible district',()=>{
 const c=careerFrom(null),task=contracts[0],p=places[task.place];
 assert.ok(!completeContract(c,task.id,{x:p.x+5,z:p.z,driving:false},places));
 assert.ok(!completeContract(c,task.id,{...p,driving:true},places));
 assert.ok(completeContract(c,task.id,{...p,driving:false},places));
 assert.ok(!completeContract(c,task.id,{...p,driving:false},places));
 assert.ok(!completeContract(c,'station-drive',{...places.station,driving:true},places));
});
test('career recovery deduplicates tasks, rejects invalid records and preserves legacy access',()=>{
 const c=careerFrom({done:['radio-walk','radio-walk',null,5,'fake','abc:delivery:0','abc:delivery:9'],legacyEast:true});
 assert.deepEqual(c.done,['radio-walk','abc:delivery:0']);assert.equal(learningTasks(c),1);
 assert.ok(!awardTask(c,'abc:delivery:0'));assert.ok(!awardTask(c,'fake'));
 assert.ok(districtOpen(c,300,0));assert.ok(!districtOpen(c,0,-300));
 assert.deepEqual(careerFrom(JSON.parse(JSON.stringify(c))),c);
});
test('the career can progress from the original city to every contract without a locked-task cycle',()=>{
 const c=careerFrom(null);study(c,1);
 for(const t of contracts.slice(0,3))assert.ok(completeContract(c,t.id,{...places[t.place],driving:t.drive},places));
 for(const t of contracts.slice(3,5))assert.ok(completeContract(c,t.id,{...places[t.place],driving:t.drive},places));
 assert.ok(!districtOpen(c,300,100));study(c,2);
 const t=contracts[5];assert.ok(completeContract(c,t.id,{...places[t.place],driving:true},places));
 assert.ok(carAvailable(c,'cybertruck'));
});
