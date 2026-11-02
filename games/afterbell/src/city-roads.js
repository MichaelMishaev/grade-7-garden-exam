import {CITY_EDGE} from './city-data.js';
import {clearSegment,findRoute} from './navigation.js';

const streets=Array.from({length:9},(_,i)=>(i-4)*56);
const crossStreets=streets.slice(0,-1);
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const grid={step:2,radius:1,bound:CITY_EDGE};

// Two metres on either side of the centre line leaves room for the van's body.
export function onRoad(x,z){
 const street=Math.round(x/56)*56, cross=Math.round(z/56)*56;
 return (Math.abs(x-street)<=2 && Math.abs(street)<=224 && z>=-234 && z<=186)
   || (Math.abs(z-cross)<=2 && cross>=-224 && cross<=168 && Math.abs(x)<=CITY_EDGE);
}

function access(point,blocked){
 if(onRoad(point.x,point.z))return [point];
 const nearby=[
   ...streets.map(x=>({x,z:clamp(point.z,-234,186)})),
   ...crossStreets.map(z=>({x:point.x,z}))
 ].filter(p=>distance(point,p)<=56&&!blocked(p.x,p.z)).sort((a,b)=>distance(point,a)-distance(point,b));
 for(const p of nearby)if(clearSegment(point,p,blocked))return [point,p];
 // A building may hide the nearest street from a courtyard.
 for(const p of nearby){
   const path=findRoute(point,p,blocked,grid);
   if(path?.length && clearSegment(path.at(-1),p,blocked))return [point,...path,p];
 }
 return null;
}

export function drivingRoute(start,goal,blocked){
 if(blocked(start.x,start.z)||blocked(goal.x,goal.z))return null;
 if(distance(start,goal)<1)return [];
 const entry=access(start,blocked),exit=access(goal,blocked);
 if(!entry||!exit)return null;
 const a=entry.at(-1),b=exit.at(-1);
 const outside=(x,z)=>!onRoad(x,z)||blocked(x,z);
 const road=findRoute(a,b,outside,grid);
 if(!road||!clearSegment(road.at(-1)||a,b,outside))return null;
 return [...entry.slice(1),...road,...exit.reverse()];
}
