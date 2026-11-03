// Test a pedestrian's small footprint against the van's oriented bumper and sides.
export function touchesPedestrian(x,z,heading,person){
 const dx=person.x-x,dz=person.z-z,sin=Math.sin(heading),cos=Math.cos(heading);
 const side=Math.max(0,Math.abs(dx*cos-dz*sin)-1.8);
 const front=Math.max(0,Math.abs(dx*sin+dz*cos)-3);
 return side*side+front*front<.65*.65;
}

export function pedestrianReaction(person,vehicle,time,blocked,reduced=false){
 let hit=person.reaction,started=false;
 if(person.contact&&Math.hypot(person.x-vehicle.x,person.z-vehicle.z)>6)person.contact=false;
 if(!hit&&!person.contact&&vehicle.speed>1&&touchesPedestrian(vehicle.x,vehicle.z,vehicle.heading,person)){
   const dx=person.x-vehicle.x,dz=person.z-vehicle.z,d=Math.hypot(dx,dz)||1;
   const power=Math.min(3,.9+vehicle.speed*.07);
   let distance=0;
   // Check the complete shove so a narrow wall cannot be crossed.
   while(distance+.1<=power&&!blocked(person.x+dx/d*(distance+.1),person.z+dz/d*(distance+.1)))distance+=.1;
   hit=person.reaction={time,x:person.x,z:person.z,dx:dx/d*Math.max(0,distance),dz:dz/d*Math.max(0,distance)};
   person.contact=true;started=true;
 }
 if(!hit)return {x:person.x,z:person.z,y:0,tilt:0,started};
 const age=time-hit.time,u=Math.min(1,age/.55);
 const progress=1-(1-u)**2;
 const result={x:hit.x+hit.dx*progress,z:hit.z+hit.dz*progress,y:reduced||u>=1?0:Math.sin(u*Math.PI)*.95,tilt:reduced||age>=1.1?0:Math.sin(age/1.1*Math.PI)*.65,started};
 if(age>=1.1){
   person.reaction=null;person.x=result.x;person.z=result.z;
 }
 return result;
}
