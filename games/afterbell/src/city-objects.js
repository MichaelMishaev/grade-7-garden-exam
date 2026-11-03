// SAT between a van's oriented footprint and an axis-aligned scenery rectangle.
export function sceneryTouch(x,z,angle,o,margin=0){
 const sx=Math.sin(angle),sz=Math.cos(angle),dx=x-o.x,dz=z-o.z;
 const w=o.w,d=o.d,a=1.8+margin,b=3+margin;
 return Math.abs(dx)<w+a*Math.abs(sz)+b*Math.abs(sx)
   &&Math.abs(dz)<d+a*Math.abs(sx)+b*Math.abs(sz)
   &&Math.abs(dx*sz-dz*sx)<a+w*Math.abs(sz)+d*Math.abs(sx)
   &&Math.abs(dx*sx+dz*sz)<b+w*Math.abs(sx)+d*Math.abs(sz);
}
export function kickObject(o,dx,dz,speed){
 const n=Math.hypot(dx,dz)||1;
 o.vx=dx/n*Math.min(18,speed*.7);o.vz=dz/n*Math.min(18,speed*.7);
 o.vy=Math.min(5,speed*.14);o.spin=(dx-dz>=0?1:-1)*Math.min(9,speed*.35);o.moving=true;
}
export function stepObject(o,dt,blocked){
 if(!o.moving)return;
 const x=o.x+o.vx*dt,z=o.z+o.vz*dt;
 if(blocked(x,z,o)){o.vx*=-.25;o.vz*=-.25;}else{o.x=x;o.z=z;}
 o.y=Math.max(0,(o.y||0)+(o.vy||0)*dt);o.vy=(o.vy||0)-18*dt;
 o.angle=(o.angle||0)+o.spin*dt;
 const drag=Math.exp(-dt*(o.y>0?1:5));o.vx*=drag;o.vz*=drag;o.spin*=drag;
 if(o.y===0){o.vy=0;if(Math.hypot(o.vx,o.vz)<.15){o.moving=false;o.angle=0;}}
}
