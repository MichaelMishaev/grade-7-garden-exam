// Draws what city-crash.js computes: struck residents, cars that rock or roll over, loose parts and smoke.
// city-world.js owns the cars and residents; this module only poses them while a crash is playing out
// and puts them back exactly as they were.
import {walkerReaction,launchWalker,stepWalker,walkBack,walkerCentre,carTumble,stepTumble,tumbleLift,crashParts,smokePuff,stepPart,seeded} from './city-crash.js';

const CAR_HALF_WIDTH=1.8,CAR_HALF_LENGTH=3,PERSON_RADIUS=.55;

export function createCrashScene(T,scene,{box,tube,ball},{walkers,routes,locals,blocked}){
 const random=seeded(7);
 function pool(geometry,capacity,material,shadow){
  const mesh=new T.InstancedMesh(geometry,material,capacity);
  mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);mesh.frustumCulled=false;mesh.castShadow=shadow;mesh.receiveShadow=shadow;
  // Colours exist before the first frame, so the shader is built once with per-part colour.
  const white=new T.Color('#ffffff');for(let i=0;i<capacity;i++)mesh.setColorAt(i,white);
  mesh.count=0;mesh.visible=false;scene.add(mesh);return {mesh,capacity};
 }
 const pools={
  box:pool(box,72,new T.MeshStandardMaterial({roughness:.5,metalness:.3}),true),
  wheel:pool(tube,6,new T.MeshStandardMaterial({roughness:.9}),true),
  smoke:pool(ball,48,new T.MeshStandardMaterial({roughness:1,transparent:true,opacity:.5,depthWrite:false}),false)
 };
 const poolOf=p=>p.kind==='wheel'?pools.wheel:p.kind==='smoke'?pools.smoke:pools.box;
 let parts=[];
 function addParts(list){
  for(const p of list){
   p.color=new T.Color(p.color);
   // A full pool gives up its oldest piece.
   const kin=parts.filter(o=>poolOf(o)===poolOf(p));
   if(kin.length>=poolOf(p).capacity)parts.splice(parts.indexOf(kin[0]),1);
   parts.push(p);
  }
 }

 // Residents on a walking circuit return to it; residents waiting at a place return to their spot.
 const people=[
  ...walkers.map((g,i)=>({g,home:routes[i]})),
  ...locals.map(g=>{const x=g.position.x,z=g.position.z;return {g,home(){g.position.x=x;g.position.z=z;}};})
 ];
 const tumbles=new Map(),smokers=new Map();
 let playerTumble=null,now=0;
 const stats={walkerHits:0,dodges:0,flips:0,landings:0,spawned:0};
 const paintOf=g=>'#'+(g.userData.body?.material?.color?.getHexString?.()||'9aa3ab');
 // Shove direction (x,z) seen from a car heading `yaw`: across it and along it.
 const inFrame=(x,z,yaw)=>[x*Math.cos(yaw)-z*Math.sin(yaw),x*Math.sin(yaw)+z*Math.cos(yaw)];

 // The player's car met car `g`. (tx,tz): unit direction of the player's motion relative to `g`;
 // `at`: the contact point. A parked car keeps its place and only rocks.
 function carHit(g,power,tx,tz,at,{fixed,heading}){
  const before=parts.length;
  addParts(crashParts(power,at.x,at.z,tx,tz,paintOf(g),random));stats.spawned+=parts.length-before;
  if(!tumbles.get(g)?.air){
   const [lateral,along]=inFrame(tx,tz,g.rotation.y),s=carTumble(fixed?Math.min(power,.42):power,lateral,along);
   tumbles.set(g,s);if(s.turns)stats.flips++;
  }
  // Only the hardest crashes roll the player's own car; lighter ones keep the short rebound.
  if(power>=.8&&!playerTumble?.air){
   const [lateral,along]=inFrame(-tx,-tz,heading);
   playerTumble=carTumble(power*.85,lateral,along);if(playerTumble.turns)stats.flips++;
  }
  if(power>=.55){smokers.set(g,{until:now+3+6*power,next:0});smokers.set('player',{until:now+2+4*power,next:0});}
 }
 // The player's car met a wall, tree or pole at `at`, travelling along (tx,tz): pieces fly back off it.
 function wallHit(power,at,tx,tz,color){
  const before=parts.length;addParts(crashParts(power,at.x,at.z,-tx,-tz,color,random));stats.spawned+=parts.length-before;
  if(power>=.7)smokers.set('player',{until:now+2+3*power,next:0});
 }
 const airborne=g=>tumbles.get(g)?.air===true;

 function poseCar(g,s,live){
  g.rotation.order='YXZ';
  g.position.y=live?tumbleLift(s,g.userData.roofHeight||3.2):0;
  g.rotation.z=live&&s.axis==='roll'?s.angle:0;
  g.rotation.x=live&&s.axis==='pitch'?s.angle:0;
 }
 function landing(x,z){
  stats.landings++;const a=random()*6.283;
  addParts(crashParts(.3,x,z,Math.sin(a),Math.cos(a),'#8d949a',random));
 }

 // car: the player's car while they drive ({x,z,heading,speed,guided}; speed is negative in reverse), else null.
 // Returns the strength (0..1) of the hardest resident hit in this step, 0 when nobody was struck.
 function step(dt,time,car){
  now+=dt;let struck=0;
  for(const [g,s] of tumbles){
   const live=stepTumble(s,dt);
   if(s.landed&&s.power>=.5)landing(g.position.x,g.position.z);
   poseCar(g,s,live);if(!live)tumbles.delete(g);
  }
  if(playerTumble){
   const live=stepTumble(playerTumble,dt);
   if(playerTumble.landed&&car)landing(car.x,car.z);
   if(!live)playerTumble=null;
  }
  for(const a of people){
   const g=a.g,m=g.userData,s=m.hit;
   if(s){
    if(s.phase!=='back'){stepWalker(s,dt,blocked);continue;}
    // A moment to find their feet, then back to where they were going.
    s.pause-=dt;if(s.pause>0)continue;
    a.home(time);s.walk+=4.5*dt;
    if(walkBack(s,g.position.x,g.position.z,dt)){m.hit=null;m.lastX=g.position.x;m.lastZ=g.position.z;g.rotation.x=0;}
    continue;
   }
   if(!car||Math.abs(car.speed)<1.5)continue;
   a.home(time);
   const dx=g.position.x-car.x,dz=g.position.z-car.z;
   if(Math.abs(dx)>12||Math.abs(dz)>12)continue;
   const way=Math.sign(car.speed),speed=Math.abs(car.speed),dirX=Math.sin(car.heading)*way,dirZ=Math.cos(car.heading)*way;
   const ahead=dx*dirX+dz*dirZ,across=dx*dirZ-dz*dirX,kind=walkerReaction(speed,car.guided);
   // People see a slow car coming and jump before it reaches them; a fast one arrives first.
   const reach=CAR_HALF_LENGTH+PERSON_RADIUS+(kind==='dodge'?Math.min(4,speed*.3):0);
   if(!kind||Math.abs(across)>CAR_HALF_WIDTH+PERSON_RADIUS||ahead>reach||ahead<-.5)continue;
   m.hit=launchWalker(kind,speed,dirX,dirZ,across<0?-1:1,g.position.x,g.position.z);
   m.hit.pause=kind==='dodge'?1.1:.5;m.hit.walk=0;g.rotation.order='YXZ';
   if(kind==='thrown'){stats.walkerHits++;struck=Math.max(struck,Math.min(1,Math.max(.25,speed/31)));}
   else stats.dodges++;
  }
  for(const [g,s] of smokers){
   if(now>=s.until||(g==='player'&&!car)){smokers.delete(g);continue;}
   if(now<s.next)continue;
   s.next=now+.11;
   const x=g==='player'?car.x:g.position.x,z=g==='player'?car.z:g.position.z,yaw=g==='player'?car.heading:g.rotation.y;
   addParts([smokePuff(x+Math.sin(yaw)*2.3,1.7+(g==='player'?0:g.position.y),z+Math.cos(yaw)*2.3,random)]);
  }
  parts=parts.filter(p=>stepPart(p,dt,blocked));
  return struck;
 }

 // Adds the roll-over to the player's car after city-world.js has posed it.
 function posePlayer(car){
  car.rotation.order='YXZ';
  if(!playerTumble)return;
  car.position.y+=tumbleLift(playerTumble,car.userData.shell?.userData.roofHeight||3.2);
  if(playerTumble.axis==='roll')car.rotation.z+=playerTumble.angle;else car.rotation.x+=playerTumble.angle;
 }

 const pose=new T.Object3D(),turn=new T.Quaternion(),axisY=new T.Vector3(0,1,0),axisZ=new T.Vector3(0,0,1);
 // Limb order is the contract of person() in city-world.js: 3/4 left leg and arm, 6/7 right leg and arm.
 function posePerson(g,s,swingLimb){
  const sin=Math.sin(s.pitch),cos=Math.cos(s.pitch);
  // Turn about the middle of the body (2 m up), not about the feet.
  g.rotation.set(s.pitch,s.yaw,0);
  g.position.set(s.x-2*sin*Math.sin(s.yaw),.16+walkerCentre(s)-2*cos,s.z-2*sin*Math.cos(s.yaw));
  let legL=0,legR=0,armL=0,armR=0;
  if(s.phase==='air'&&s.kind==='dodge'){legL=.7;legR=-.5;armL=armR=-2.1;}
  else if(s.phase==='air'){const f=Math.sin(s.t*17);legL=f*1.1;legR=-f*1.1;armL=-1.9-f*.9;armR=-1.9+f*.9;}
  else if(s.phase==='slide'||s.phase==='down'){legL=.28;legR=-.18;armL=-2.7;armR=-2.95;}
  else if(s.phase==='up'){const k=1-Math.min(1,s.t/.8);legL=.28*k;legR=-.18*k;armL=-2.7*k;armR=-2.95*k;}
  else if(s.pause<=0){const f=Math.sin(s.walk*1.9)*.6;legL=f;legR=-f;armL=-f*.8;armR=f*.8;}
  swingLimb(g.children[3],-.44,1.575,1.55,legL);swingLimb(g.children[4],-1.03,2.775,1.35,armL);
  swingLimb(g.children[6],.44,1.575,1.55,legR);swingLimb(g.children[7],1.03,2.775,1.35,armR);
 }
 function draw(swingLimb){
  for(const a of people)if(a.g.userData.hit)posePerson(a.g,a.g.userData.hit,swingLimb);
  for(const p of Object.values(pools))p.used=0;
  for(const p of parts){
   const target=poolOf(p),k=p.scale??1;
   pose.position.set(p.x,p.y,p.z);
   if(p.kind==='wheel'){
    // Upright and spinning about its axle while it rolls, then tipping over onto its side.
    pose.quaternion.setFromAxisAngle(axisY,p.yaw);
    pose.quaternion.multiply(turn.setFromAxisAngle(axisZ,Math.PI/2*(1-p.topple)));
    pose.quaternion.multiply(turn.setFromAxisAngle(axisY,p.spin));
   }else if(p.kind==='smoke')pose.quaternion.identity();
   else pose.rotation.set(p.rx,p.ry,p.rz);
   pose.scale.set(p.size[0]*k,p.size[1]*k,p.size[2]*k);pose.updateMatrix();
   target.mesh.setMatrixAt(target.used,pose.matrix);target.mesh.setColorAt(target.used,p.color);target.used++;
  }
  for(const {mesh,used} of Object.values(pools)){
   mesh.count=used;mesh.visible=used>0;
   if(used){mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;}
  }
 }
 return {carHit,wallHit,airborne,step,posePlayer,draw,
  // Read by the browser checks.
  stats:()=>({...stats,parts:parts.length,wheels:parts.filter(p=>p.kind==='wheel').length,smoke:parts.filter(p=>p.kind==='smoke').length,down:people.filter(a=>a.g.userData.hit).length,tumbling:tumbles.size+(playerTumble?1:0),
   people:people.filter(a=>a.g.userData.hit).map(a=>({phase:a.g.userData.hit.phase,kind:a.g.userData.hit.kind,x:a.g.userData.hit.x,z:a.g.userData.hit.z,y:a.g.userData.hit.y})),
   cars:[...tumbles].map(([g,s])=>({id:g.userData.id,axis:s.axis,angle:s.angle,y:s.y,air:s.air}))})};
}
