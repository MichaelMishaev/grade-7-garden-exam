// Separating axes of two oriented van footprints (half-width 1.8 m, half-length 3 m).
export function vansTouch(x,z,angle,otherX,otherZ,otherAngle,margin=0){
 const dx=otherX-x,dz=otherZ-z;
 if(Math.abs(dx)>8+margin||Math.abs(dz)>8+margin)return false;
 const sin=Math.sin(angle),cos=Math.cos(angle),otherSin=Math.sin(otherAngle),otherCos=Math.cos(otherAngle);
 const aligned=Math.abs(cos*otherCos+sin*otherSin),cross=Math.abs(sin*otherCos-cos*otherSin);
 const lateral=1.8*(1+aligned)+3*cross+margin,forward=3*(1+aligned)+1.8*cross+margin;
 return Math.abs(dx*cos-dz*sin)<lateral && Math.abs(dx*sin+dz*cos)<forward
   && Math.abs(dx*otherCos-dz*otherSin)<lateral && Math.abs(dx*otherSin+dz*otherCos)<forward;
}

// Probe the next 0.7 seconds of travel, including the other vehicle's velocity.
export function safeSpeed(x,z,angle,limit,traffic){
 const sx=Math.sin(angle),sz=Math.cos(angle);
 let speed=limit,obstruction=null;
 for(const g of traffic){
   const p=g.position,dx=p.x-x,dz=p.z-z;
   if(Math.abs(dx)>32||Math.abs(dz)>32||dx*sx+dz*sz < -1)continue;
   for(let t=.1;t<=.71;t+=.1){
     if(!vansTouch(x+sx*limit*t,z+sz*limit*t,angle,p.x+(g.userData.vx||0)*t,p.z+(g.userData.vz||0)*t,g.rotation.y,.22))continue;
     const allowed=Math.max(0,(t-.15)*limit);
     if(allowed<speed){speed=allowed;obstruction=g;}
     break;
   }
 }
 return {speed,obstruction};
}

// Sample translation and rotation together so boosted travel cannot skip a footprint.
export function sweptVehicleContact(from,to,other,margin=.08){
 const p=other.position,angle=other.rotation.y;
 if(p.x<Math.min(from.x,to.x)-8-margin||p.x>Math.max(from.x,to.x)+8+margin||p.z<Math.min(from.z,to.z)-8-margin||p.z>Math.max(from.z,to.z)+8+margin)return false;
 if(vansTouch(from.x,from.z,from.angle,p.x,p.z,angle,margin)){
  // Old saves may contain overlapping parked cars. Permit movement that separates them.
  const outward=(from.x-p.x)*(to.x-from.x)+(from.z-p.z)*(to.z-from.z);
  if(outward>=0&&Math.hypot(to.x-p.x,to.z-p.z)>Math.hypot(from.x-p.x,from.z-p.z)+.00001)return false;
  return true;
 }
 const turn=Math.atan2(Math.sin(to.angle-from.angle),Math.cos(to.angle-from.angle));
 const steps=Math.max(1,Math.ceil(Math.hypot(to.x-from.x,to.z-from.z)/.35),Math.ceil(Math.abs(turn)/.1));
 for(let i=1;i<=steps;i++){
  const t=i/steps;
  if(vansTouch(from.x+(to.x-from.x)*t,from.z+(to.z-from.z)*t,from.angle+turn*t,p.x,p.z,angle,margin))return true;
 }
 return false;
}

export function headingDelta(from, to) {
 return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

export function manualDrive({heading, throttle, steering=0, speed, limit, brake, boost, dt}) {
 const requestedSpeed = limit * throttle * (throttle < 0 ? .48 : 1) * (1 - .5 * Math.abs(steering));
 const changingDirection = speed * requestedSpeed < 0;
 const target = brake || changingDirection ? 0 : requestedSpeed;
 const magnitude = Math.abs(speed);
 let rate = boost ? 34 : 19;
 if (brake) rate = 32 + magnitude * .28;
 else if (!throttle) rate = 7 + magnitude * .38;
 else if (changingDirection || Math.abs(target) < magnitude) rate = 19 + magnitude * .22;

 const change = target - speed;
 const nextSpeed = speed + Math.sign(change) * Math.min(Math.abs(change), rate * dt);
 const distance = (speed + nextSpeed) / 2 * dt;
 const yaw = distance * Math.tan(steering) / 3.8;
 const turn = Math.max(-3.2 * dt, Math.min(3.2 * dt, yaw));
 const travelAngle = heading + turn / 2;
 return {dx: Math.sin(travelAngle) * distance, dz: Math.cos(travelAngle) * distance, heading: heading + turn, speed: nextSpeed};
}
