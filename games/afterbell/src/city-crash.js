// Crash physics for Bay City: residents struck by the player's car, cars that rock or roll over,
// and the loose parts a crash throws off. Plain numbers only (no three.js), so node can test it.
// Units: metres, seconds, radians. Ground is y=0.
export const GRAVITY=22;
const HALF_PI=Math.PI/2;

// ---- Residents ---------------------------------------------------------------------------------
// A slow car gives people time to jump clear; a fast one throws them. Guided (autopilot) trips never
// hurt anyone: people always get out of the way.
export function walkerReaction(closing,guided=false){
 if(!(closing>=1.5))return null;
 return guided||closing<9?'dodge':'thrown';
}

// (dirX,dirZ): unit direction the car travels. side: +1/-1, which side of the car's centre line the
// person stands on, measured along (dirZ,-dirX).
export function launchWalker(kind,closing,dirX,dirZ,side,x,z){
 const lx=dirZ*side,lz=-dirX*side;
 if(kind==='dodge'){
  const leap=5+closing*.22,carry=Math.min(6,closing*.25);
  return {kind,phase:'air',x,z,y:0,vx:lx*leap+dirX*carry,vz:lz*leap+dirZ*carry,vy:6.5,pitch:0,spin:0,rest:0,yaw:Math.atan2(lx,lz),t:0,bounces:0};
 }
 // The body leaves at most of the car's speed, lifted over the bonnet and turned by an off-centre hit.
 const out=Math.min(20,closing*.85),up=Math.min(12,3.5+closing*.3),off=Math.min(5,closing*.18);
 return {kind,phase:'air',x,z,y:0,vx:dirX*out+lx*off,vz:dirZ*out+lz*off,vy:up,pitch:0,spin:Math.min(14,4+closing*.35),rest:0,yaw:Math.atan2(dirX,dirZ),t:0,bounces:0};
}

// Advances one struck resident. Phases: air → slide → down → up → back ('dodge' goes air → back).
// 'back' means "on their feet again"; walkBack() then returns them to their route.
export function stepWalker(s,dt,blocked=()=>false){
 s.t+=dt;
 const move=()=>{
  const nx=s.x+s.vx*dt,nz=s.z+s.vz*dt;
  // A wall stops the flight; the body drops beside it instead of passing through.
  if(blocked(nx,nz)){s.vx*=-.25;s.vz*=-.25;}else{s.x=nx;s.z=nz;}
 };
 if(s.phase==='air'){
  s.vy-=GRAVITY*dt;move();s.y+=s.vy*dt;s.pitch+=s.spin*dt;
  if(s.y<=0){
   s.y=0;
   if(s.kind==='dodge'){s.phase='back';s.vx=s.vz=s.vy=0;s.t=0;}
   else if(s.vy<-5&&s.bounces<2){s.bounces++;s.vy*=-.32;s.vx*=.6;s.vz*=.6;s.spin*=.6;}
   else{
    // Come to rest flat: face down or face up, whichever the tumble is closer to.
    s.phase='slide';s.vy=0;
    s.rest=Math.round((s.pitch-HALF_PI)/Math.PI)*Math.PI+HALF_PI;
   }
  }
 }else if(s.phase==='slide'){
  const speed=Math.hypot(s.vx,s.vz),left=Math.max(0,speed-14*dt);
  if(speed>0){s.vx*=left/speed;s.vz*=left/speed;}
  move();s.pitch+=(s.rest-s.pitch)*Math.min(1,dt*12);
  if(left<.3){
   s.phase='down';s.t=0;s.vx=s.vz=0;
   s.rest=Math.atan2(Math.sin(s.rest),Math.cos(s.rest));s.pitch=s.rest;
  }
 }else if(s.phase==='down'){
  if(s.t>2.4){s.phase='up';s.t=0;}
 }else if(s.phase==='up'){
  const k=Math.min(1,s.t/.8),ease=k*k*(3-2*k);
  s.pitch=s.rest*(1-ease);
  if(k>=1){s.pitch=0;s.phase='back';s.t=0;}
 }
 return s.phase;
}

// Walks a recovered resident toward (tx,tz). True once they are back on their route (or took too long).
export function walkBack(s,tx,tz,dt,speed=4.5){
 s.t+=dt;
 const dx=tx-s.x,dz=tz-s.z,d=Math.hypot(dx,dz),step=speed*dt;
 if(d<=Math.max(.4,step)||s.t>8){s.x=tx;s.z=tz;return true;}
 s.x+=dx/d*step;s.z+=dz/d*step;s.yaw=Math.atan2(dx,dz);
 return false;
}

// Height of the body's centre above the ground: 2 m standing, about .45 m lying flat.
export function walkerCentre(s){return .45+1.55*Math.abs(Math.cos(s.pitch))+s.y;}

// ---- Cars ----------------------------------------------------------------------------------------
// (lateral,along): unit direction the car is shoved, in its own frame (x across, z forward).
// A side hit rolls the car over, a hit along its length pitches it end over end; weaker hits only lift
// two wheels and rock on the suspension. Rotations are complete turns, so the car lands on its wheels.
export function carTumble(power,lateral,along){
 const roll=Math.abs(lateral)>=.4,axis=roll?'roll':'pitch';
 // The roof leads in the direction of the shove.
 const sign=roll?-Math.sign(lateral):Math.sign(along)||1;
 const flips=power>=(roll?.5:.7);
 const s={axis,sign,angle:0,rate:0,y:0,vy:0,air:false,turns:0,age:0,landed:false,power};
 if(flips){
  s.turns=power>=.85?2:1;s.vy=5+7*power;s.air=true;
  s.rate=sign*2*Math.PI*s.turns*GRAVITY/(2*s.vy);
 }else{
  s.rate=sign*7*power;s.vy=3*power;s.air=s.vy>0;
 }
 return s;
}

// True while the car is still moving. `landed` is set for the one step in which the wheels come down.
export function stepTumble(s,dt){
 s.age+=dt;s.landed=false;
 if(s.air){
  s.vy-=GRAVITY*dt;s.y+=s.vy*dt;
  if(s.turns)s.angle+=s.rate*dt;
  if(s.y<=0&&s.vy<0){
   s.y=0;s.vy=0;s.air=false;s.landed=true;
   // Back on its wheels: what is left of the turn becomes a rock on the springs.
   if(s.turns){s.angle=0;s.rate=s.sign*3;s.turns=0;}
  }
 }
 if(!s.turns){
  // Suspension: a lightly damped spring brings the body level again.
  s.rate-=(81*s.angle+4.5*s.rate)*dt;s.angle+=s.rate*dt;
 }
 return s.air||Math.abs(s.angle)>.004||Math.abs(s.rate)>.03;
}

// How far the car's base point must rise so no corner of the turned body is below the road.
// half: 1.8 for a roll (half the width), 3 for a pitch (half the length).
export function tumbleLift(s,roofHeight=3.2){
 const half=s.axis==='roll'?1.8:3;
 return s.y+half*Math.abs(Math.sin(s.angle))+Math.max(0,-roofHeight*Math.cos(s.angle));
}

// ---- Loose parts ---------------------------------------------------------------------------------
// Small deterministic generator: a crash looks the same in every test run.
export function seeded(seed=1){
 let n=seed>>>0||1;
 return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};
}

// What a crash of this strength throws off. (dirX,dirZ): the direction of the hit; parts scatter
// around it. `paint` is the struck car's colour.
export function crashParts(power,x,z,dirX,dirZ,paint,random){
 const parts=[],lx=dirZ,lz=-dirX;
 const throwPart=(kind,size,color,speed,life)=>{
  const fan=(random()-.5)*2.2,v=speed*(.45+random()*.75);
  parts.push({kind,size,color,life,
   x:x+(random()-.5)*2.4,y:.5+random()*1.2,z:z+(random()-.5)*2.4,
   vx:(dirX+lx*fan)*v,vy:3+random()*(4+7*power),vz:(dirZ+lz*fan)*v,
   rx:random()*6,ry:random()*6,rz:random()*6,wx:(random()-.5)*18,wy:(random()-.5)*12,wz:(random()-.5)*18});
 };
 // Glass and lamp fragments on every hit.
 const shards=Math.round(4+9*power);
 for(let i=0;i<shards;i++){
  const s=.14+random()*.2;
  throwPart('shard',[s,s*.5,s],['#cfeef3','#cfeef3','#ffd27a','#c8322b'][i%4],5+13*power,4+random()*2);
 }
 if(power>=.4){
  const panels=power>=.75?3:power>=.55?2:1;
  for(let i=0;i<panels;i++)throwPart('panel',[1+random()*.6,.07,.7+random()*.4],paint,4+8*power,6+random()*2);
  throwPart('panel',[.34,.24,.2],'#22272b',6+8*power,6);
 }
 if(power>=.55)throwPart('panel',[2.9,.3,.36],'#2b3035',3+6*power,7);
 if(power>=.7){
  // One wheel breaks free and rolls away on its own.
  const fan=(random()-.5)*1.6,v=7+9*power;
  parts.push({kind:'wheel',size:[.62,.42,.62],color:'#1c1f22',life:8,x,y:.62,z,vx:(dirX+lx*fan)*v,vy:0,vz:(dirZ+lz*fan)*v,spin:0,topple:0,yaw:Math.atan2(dirX+lx*fan,dirZ+lz*fan)});
 }
 return parts;
}

export function smokePuff(x,y,z,random){
 return {kind:'smoke',size:[.45,.45,.45],color:'#5d6166',life:1.5+random()*.5,x:x+(random()-.5)*.6,y,z:z+(random()-.5)*.6,vx:(random()-.5)*.8,vy:2.2+random(),vz:(random()-.5)*.8,age:0};
}

// Advances one loose part; false when it should be removed. `scale` shrinks it away at the end.
export function stepPart(p,dt,blocked=()=>false){
 p.age=(p.age||0)+dt;
 if(p.age>=p.life)return false;
 const fade=Math.min(1,(p.life-p.age)/.5);
 if(p.kind==='smoke'){
  p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
  // Grows as it rises and thins out.
  p.scale=(1+2.6*p.age/p.life)*Math.min(1,p.age/.15)*fade;
  return true;
 }
 p.scale=fade;
 const nx=p.x+p.vx*dt,nz=p.z+p.vz*dt;
 if(blocked(nx,nz)){p.vx*=-.3;p.vz*=-.3;}else{p.x=nx;p.z=nz;}
 if(p.kind==='wheel'){
  const speed=Math.hypot(p.vx,p.vz),left=Math.max(0,speed-2.6*dt);
  if(speed>0){p.vx*=left/speed;p.vz*=left/speed;}
  p.spin+=speed*dt/p.size[0];
  // A wheel that runs out of speed wobbles and falls flat.
  if(left<1.2)p.topple=Math.min(1,p.topple+dt*2.5);
  p.y=p.size[0]*(1-p.topple)+p.size[1]/2*p.topple;
  return true;
 }
 const floor=p.size[1]/2+.03;
 if(p.y>floor||p.vy>0){
  p.vy-=GRAVITY*dt;p.y+=p.vy*dt;
  p.rx+=p.wx*dt;p.ry+=p.wy*dt;p.rz+=p.wz*dt;
  if(p.y<=floor){
   p.y=floor;
   if(p.vy<-3){p.vy*=-.35;p.vx*=.6;p.vz*=.6;p.wx*=.5;p.wy*=.5;p.wz*=.5;}
   else{p.vy=0;p.wx=p.wz=0;}
  }
 }else{
  // On the road: scrape to a stop and lie flat.
  const speed=Math.hypot(p.vx,p.vz),left=Math.max(0,speed-16*dt);
  if(speed>0){p.vx*=left/speed;p.vz*=left/speed;}
  p.ry+=p.wy*dt;p.wy*=Math.exp(-dt*5);
  const flat=a=>Math.round(a/Math.PI)*Math.PI;
  p.rx+=(flat(p.rx)-p.rx)*Math.min(1,dt*14);p.rz+=(flat(p.rz)-p.rz)*Math.min(1,dt*14);
 }
 return true;
}
