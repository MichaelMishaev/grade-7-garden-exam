import {CITY_EDGE,CITY_BOUNDS,STREET_STEP,northSouthStreets,eastWestStreets,streetEnds} from './city-data.js';
import {clearSegment,findRoute} from './navigation.js';

const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const grid={step:2,radius:1,bound:CITY_EDGE};

// Two metres on either side of the centre line leaves room for the van's body.
export function onRoad(x,z){
 const street=Math.round(x/STREET_STEP)*STREET_STEP, cross=Math.round(z/STREET_STEP)*STREET_STEP;
 return (Math.abs(x-street)<=2.000001 && street>=northSouthStreets[0] && street<=northSouthStreets.at(-1) && z>=streetEnds.north && z<=streetEnds.south)
   || (Math.abs(z-cross)<=2.000001 && cross>=eastWestStreets[0] && cross<=eastWestStreets.at(-1) && x>=CITY_BOUNDS.west && x<=CITY_BOUNDS.east);
}

function access(point,blocked){
 if(onRoad(point.x,point.z))return [point];
 const nearby=[
   ...northSouthStreets.map(x=>({x,z:clamp(point.z,streetEnds.north,streetEnds.south)})),
   ...eastWestStreets.map(z=>({x:point.x,z}))
 ].filter(p=>distance(point,p)<=56&&!blocked(p.x,p.z)).sort((a,b)=>distance(point,a)-distance(point,b));
 for(const p of nearby)if(clearSegment(point,p,blocked))return [point,p];
 // A building may hide the nearest street from a courtyard.
 for(const p of nearby){
   const path=findRoute(point,p,blocked,grid);
   if(path?.length && clearSegment(path.at(-1),p,blocked))return [point,...path,p];
 }
 return null;
}

// Long road segments use the same directional lanes as the ambient circuits.
// Keep the planner's collision-checked corners and merge into the lane between them.
function followLanes(start,points,outside){
 const result=[];
 for(const end of points){
   const dx=end.x-start.x,dz=end.z-start.z;
   const horizontal=Math.abs(dx)>12&&Math.abs(dz)<=4;
   const vertical=Math.abs(dz)>12&&Math.abs(dx)<=4;
   if(horizontal||vertical){
     const sign=Math.sign(horizontal?dx:dz);
     const lane=horizontal?Math.round(start.z/56)*56+2*sign:Math.round(start.x/56)*56-2*sign;
     const enter=horizontal?{x:start.x+4*sign,z:lane}:{x:lane,z:start.z+4*sign};
     const leave=horizontal?{x:end.x-4*sign,z:lane}:{x:lane,z:end.z-4*sign};
     if(clearSegment(start,enter,outside)&&clearSegment(enter,leave,outside)&&clearSegment(leave,end,outside))result.push(enter,leave);
   }
   result.push(end);start=end;
 }
 return result;
}

export function drivingRoute(start,goal,blocked,accessBlocked=blocked){
 if(blocked(start.x,start.z)||blocked(goal.x,goal.z))return null;
 if(distance(start,goal)<1)return [];
 const entry=access(start,accessBlocked),exit=access(goal,accessBlocked);
 if(!entry||!exit)return null;
 const a=entry.at(-1),b=exit.at(-1);
 const outside=(x,z)=>!onRoad(x,z)||blocked(x,z);
 const road=findRoute(a,b,outside,grid);
 if(!road||!clearSegment(road.at(-1)||a,b,outside))return null;
 return [...entry.slice(1),...followLanes(a,[...road,b],outside),...exit.reverse().slice(1)];
}
