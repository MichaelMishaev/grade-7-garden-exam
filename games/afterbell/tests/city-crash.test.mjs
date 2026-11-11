import test from 'node:test';
import assert from 'node:assert/strict';
import {walkerReaction,launchWalker,stepWalker,walkBack,walkerCentre,carTumble,stepTumble,tumbleLift,crashParts,stepPart,smokePuff,seeded} from '../src/city-crash.js';

const run=(step,limit=2000)=>{let n=0;while(step()&&++n<limit);return n;};

test('slow cars make residents jump clear, fast cars throw them, guided trips never hurt anyone',()=>{
 assert.equal(walkerReaction(.5),null);
 assert.equal(walkerReaction(5),'dodge');
 assert.equal(walkerReaction(20),'thrown');
 assert.equal(walkerReaction(30,true),'dodge');
});

test('a dodging resident leaps sideways, away from the car, and lands on their feet',()=>{
 // Car drives +z; the resident stands on the +side of its centre line.
 const s=launchWalker('dodge',6,0,1,1,0,0);let top=0;
 run(()=>{stepWalker(s,1/60);top=Math.max(top,s.y);return s.phase==='air';});
 assert.equal(s.phase,'back');assert.equal(s.pitch,0);
 assert.ok(s.x>1.5,'moved to their own side: '+s.x);assert.ok(top>.5&&top<1.5,'a hop, not a flight: '+top);
});

test('a struck resident flies along the car direction, tumbles, lies flat, gets up and walks back',()=>{
 const s=launchWalker('thrown',24,0,1,-1,10,10);let top=0,turned=0;const phases=[s.phase];
 const steps=run(()=>{const p=stepWalker(s,1/60);if(p!==phases.at(-1))phases.push(p);top=Math.max(top,s.y);if(p==='air')turned=Math.abs(s.pitch);return p!=='back';});
 assert.deepEqual(phases,['air','slide','down','up','back']);
 assert.ok(top>1.5&&top<4.5,'height '+top);assert.ok(turned>Math.PI,'tumbles in the air');
 assert.ok(s.z-10>12&&s.z-10<45,'thrown forward '+(s.z-10));assert.ok(s.x<10,'pushed to their side');
 assert.ok(steps/60>3.5,'stays down for a moment');
 assert.equal(s.pitch,0);assert.equal(s.y,0);assert.ok(Math.abs(walkerCentre(s)-2)<1e-9);
 let back=false;const n=run(()=>!(back=walkBack(s,10,10,1/60)));
 assert.ok(back&&n>60);assert.deepEqual([s.x,s.z],[10,10]);
});

test('a lying resident is flat on the ground and a harder hit throws further',()=>{
 const s=launchWalker('thrown',15,1,0,1,0,0);
 run(()=>stepWalker(s,1/60)!=='down');
 assert.ok(Math.abs(Math.abs(s.pitch)-Math.PI/2)<1e-9);assert.ok(walkerCentre(s)<.5);
 const far=v=>{const w=launchWalker('thrown',v,1,0,1,0,0);run(()=>stepWalker(w,1/60)!=='down');return w.x;};
 assert.ok(far(22)>far(11)+4);
});

test('walls stop a thrown resident',()=>{
 const s=launchWalker('thrown',24,0,1,1,0,0),wall=(x,z)=>z>6;
 run(()=>stepWalker(s,1/60,wall)!=='back');
 assert.ok(s.z<=6);
});

test('a light hit rocks the car, a hard side hit rolls it over and it lands on its wheels',()=>{
 const rock=carTumble(.3,1,0);let lean=0;
 const t=run(()=>{const live=stepTumble(rock,1/60);lean=Math.max(lean,Math.abs(rock.angle));return live;});
 assert.equal(rock.turns,0);assert.ok(lean>.1&&lean<.5,'lean '+lean);assert.ok(t/60<4,'settles');
 assert.ok(Math.abs(rock.angle)<.01);

 const roll=carTumble(.7,1,0);let swept=0,top=0,landings=0,last=0;
 run(()=>{const live=stepTumble(roll,1/60);swept+=Math.abs(roll.angle-last)<1?Math.abs(roll.angle-last):0;last=roll.angle;top=Math.max(top,tumbleLift(roll));landings+=roll.landed;return live;});
 assert.equal(roll.axis,'roll');assert.ok(roll.sign<0,'roof leads toward the shove');
 assert.ok(swept>Math.PI*1.9,'a full turn: '+swept);assert.ok(top>3.2,'clears its own roof '+top);
 assert.equal(landings,1);assert.ok(Math.abs(roll.angle)<.01&&roll.y===0,'upright at rest');
 assert.equal(tumbleLift(roll)<.05,true);
});

test('a hit along the car pitches it, and only the hardest ones flip it or double the turns',()=>{
 assert.equal(carTumble(.6,0,1).axis,'pitch');assert.equal(carTumble(.6,0,1).turns,0);
 assert.equal(carTumble(.75,0,-1).turns,1);assert.equal(carTumble(.75,0,-1).sign,-1);
 assert.equal(carTumble(.9,-1,0).turns,2);assert.equal(carTumble(.45,1,0).turns,0);
});

test('the turned body never dips below the road',()=>{
 for(const [axis,half] of [['roll',1.8],['pitch',3]])for(let a=0;a<6.3;a+=.1){
  const lift=tumbleLift({axis,angle:a,y:0},3.2);
  for(const [x,y] of [[-half,0],[half,0],[-half,3.2],[half,3.2]])assert.ok(lift+x*Math.sin(a)+y*Math.cos(a)>-1e-9);
 }
});

test('harder crashes throw more parts; pieces fall, come to rest on the road and disappear',()=>{
 const light=crashParts(.3,0,0,1,0,'#cc0000',seeded(3)),hard=crashParts(.95,0,0,1,0,'#cc0000',seeded(3));
 assert.ok(hard.length>light.length+5);
 assert.equal(light.some(p=>p.kind==='wheel'),false);assert.equal(hard.filter(p=>p.kind==='wheel').length,1);
 assert.ok(hard.some(p=>p.kind==='panel'&&p.color==='#cc0000'),'body panels keep the car colour');
 assert.deepEqual(crashParts(.95,0,0,1,0,'#cc0000',seeded(3)),hard,'same seed, same crash');
 for(const p of hard){
  let t=0;while(t<3.5&&stepPart(p,1/60))t+=1/60;
  assert.ok(Number.isFinite(p.x+p.y+p.z));assert.ok(p.y>=0,'above ground');
  if(p.kind!=='wheel'){assert.ok(p.y<=p.size[1]/2+.04,'resting '+p.kind+' '+p.y);assert.ok(Math.hypot(p.vx,p.vz)<.01);}
  assert.equal(run(()=>stepPart(p,1/60))<600,true,'removed after its life');
 }
});

test('a loose wheel rolls on, slows and falls flat; smoke rises and thins',()=>{
 const wheel=crashParts(.9,0,0,0,1,'#fff',seeded(8)).find(p=>p.kind==='wheel');
 for(let i=0;i<60;i++)stepPart(wheel,1/60);
 assert.ok(Math.hypot(wheel.x,wheel.z)>6&&wheel.spin>6&&wheel.topple===0);
 for(let i=0;i<360;i++)stepPart(wheel,1/60);
 assert.equal(wheel.topple,1);assert.ok(Math.abs(wheel.y-wheel.size[1]/2)<1e-9);
 const puff=smokePuff(0,1.5,0,seeded(2));stepPart(puff,.5);
 assert.ok(puff.y>2.4&&puff.scale>1.5);
 assert.equal(run(()=>stepPart(puff,1/60))<200,true);
});
