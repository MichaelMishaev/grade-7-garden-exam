import {onRoad} from './city-roads.js';
import {clearSegment} from './navigation.js';
import {vansTouch} from './city-traffic.js';

// A complete lane change, pass and merge, with room to finish before the next turn.
export function overtakeRoute(start,heading,obstruction,traffic,blocked){
 const sx=Math.sin(heading),sz=Math.cos(heading),lx=Math.cos(heading),lz=-Math.sin(heading);
 if(Math.cos(heading-obstruction.rotation.y)<.9)return null;
 const dx=obstruction.position.x-start.x,dz=obstruction.position.z-start.z;
 const ahead=dx*sx+dz*sz;
 if(ahead<11||ahead>26)return null;
 const points=[
  {x:start.x+sx*5+lx*4,z:start.z+sz*5+lz*4},
  {x:start.x+sx*(ahead+11)+lx*4,z:start.z+sz*(ahead+11)+lz*4},
  {x:start.x+sx*(ahead+18),z:start.z+sz*(ahead+18)}
 ];
 let from=start,travelled=0;
 for(const to of points){
   if(!clearSegment(from,to,(x,z)=>blocked(x,z)||!onRoad(x,z)))return null;
   const length=Math.hypot(to.x-from.x,to.z-from.z),angle=Math.atan2(to.x-from.x,to.z-from.z);
   for(let distance=0;distance<=length;distance+=.5){
     const fraction=distance/length,x=from.x+(to.x-from.x)*fraction,z=from.z+(to.z-from.z)*fraction;
     const t=(travelled+distance)/42;
     if(traffic.some(g=>{
       const p=g.position,v=g.userData;
       return vansTouch(x,z,angle,p.x+v.vx*t,p.z+v.vz*t,g.rotation.y,.15);
     }))return null;
   }
   travelled+=length;from=to;
 }
 return points;
}
