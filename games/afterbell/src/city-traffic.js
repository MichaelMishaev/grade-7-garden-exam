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
     if(!vansTouch(x+sx*limit*t,z+sz*limit*t,angle,p.x+g.userData.vx*t,p.z+g.userData.vz*t,g.rotation.y,.22))continue;
     const allowed=Math.max(0,(t-.15)*limit);
     if(allowed<speed){speed=allowed;obstruction=g;}
     break;
   }
 }
 return {speed,obstruction};
}
