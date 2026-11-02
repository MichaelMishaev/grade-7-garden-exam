import test from 'node:test';
import assert from 'node:assert/strict';
import {CITY_BOUNDS,inCity,places,northSouthStreets,eastWestStreets} from '../src/city-data.js';
import {drivingRoute,onRoad} from '../src/city-roads.js';
import {drawOuterDistricts,drawDistrictLandmark} from '../src/city-districts.js';
import {clearSegment} from '../src/navigation.js';

const solids=[];
const solid=(x,z,width,depth)=>solids.push({x,z,w:width/2+.7,d:depth/2+.7});
const noop=()=>{};
const art={block:noop,prop:noop,tree:noop,windows:noop,house:(x,z,c,w)=>solid(x,z,w,9),solid};
drawOuterDistricts(art);
const outerPlaces=Object.values(places).filter(p=>drawDistrictLandmark(p,art));
const blocked=(x,z)=>!inCity(x,z)||solids.some(o=>Math.abs(x-o.x)<o.w&&Math.abs(z-o.z)<o.d);

test('outer districts are traversable land with roads stopping at the map edges',()=>{
 assert.equal(outerPlaces.length,6);
 for(const p of outerPlaces){assert.ok(inCity(p.x,p.z));assert.equal(blocked(p.x,p.z),false,p.name);}
 assert.equal(inCity(-241,0),false);assert.equal(inCity(0,189),false);
 for(const x of northSouthStreets)for(const z of eastWestStreets)assert.ok(onRoad(x,z)&&!blocked(x,z));
 assert.equal(onRoad(CITY_BOUNDS.east+1,0),false);assert.equal(onRoad(0,CITY_BOUNDS.north-1),false);
});

test('old city and all six outer landmarks are connected by obstruction-free guided routes',()=>{
 const stops=[places.home,...outerPlaces,places.pier];let start=stops[0];
 for(const goal of stops.slice(1)){
   const path=drivingRoute(start,goal,blocked);
   assert.ok(path?.length,goal.name);
   for(const point of path){assert.ok(clearSegment(start,point,blocked),goal.name);start=point;}
   assert.ok(Math.hypot(start.x-goal.x,start.z-goal.z)<.01,goal.name);
 }
});
