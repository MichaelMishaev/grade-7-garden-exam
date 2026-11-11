import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {buildCar,CAR_BRANDS,poseCarWheels,stepCarWheels} from '../src/city-cars.js';
import {CAR_TASKS,CAR_SPEED} from '../src/city-discovery.js';
test('every higher task tier unlocks strictly faster driving and boost',()=>{
 for(const a of Object.keys(CAR_BRANDS))for(const b of Object.keys(CAR_BRANDS))if(CAR_TASKS[a]>CAR_TASKS[b]){
  assert.ok(CAR_SPEED[a]>CAR_SPEED[b],`${a} must outrun ${b}`);assert.ok(CAR_SPEED[a]*1.65>CAR_SPEED[b]*1.65);
 }
});
test('all eight cars have valid sculpted meshes and reflective physical materials',()=>{
 const shapes=new Set();
 for(const id of Object.keys(CAR_BRANDS)){
  const g=buildCar(T,null,null,null,id);
  assert.equal(g.userData.brand,id);assert.equal(g.userData.detail,'sculpted-pbr');
  assert.equal(g.userData.wheels.length,4);
  assert.ok(g.children.length<=24,'merged materials keep draw calls bounded');
  let triangles=0;
  for(const mesh of g.children){
   assert.ok(mesh.geometry&&mesh.material.isMeshPhysicalMaterial);const pos=mesh.geometry.getAttribute('position');
   assert.ok(Array.from(pos.array).every(Number.isFinite));triangles+=pos.count/3;
  }
  assert.ok(triangles>1000,'bodywork, round wheels and detail geometry');
  assert.equal(g.children[0].material.clearcoat,1);
  assert.ok(g.children.some(m=>m.material.metalness===1),'metal alloy/chrome');
  assert.ok(g.children.some(m=>m.material.roughness===.09),'separate recessed glazing');
  g.children[0].geometry.computeBoundingBox();const size=new T.Vector3();g.children[0].geometry.boundingBox.getSize(size);shapes.add(size.toArray().join(','));
  assert.equal(buildCar(T,null,null,null,id).children[0].geometry,g.children[0].geometry,'shared geometry cache');
 }
 assert.ok(shapes.size>=5,'distinct body silhouettes');
});

test('wheel meshes roll around their own axles and only the front axle steers',()=>{
 const car=buildCar(T,null,null,null,'toyota');
 const [rear,front]=car.userData.wheels;
 const axle=front.meshes[0].position.clone(),radius=car.userData.wheelRadius;
 // Each model rolls on its own tyre size, so one radius of travel is one radian.
 assert.ok(radius>.38&&radius<.56);
 stepCarWheels(car,radius,.4,.2);
 poseCarWheels(car);
 assert.equal(rear.meshes[0].rotation.x,1);
 assert.equal(front.meshes[0].rotation.x,1);
 assert.equal(rear.meshes[0].rotation.y,0);
 assert.ok(front.meshes.every(mesh=>mesh.rotation.y>.35));
 assert.ok(front.meshes[0].position.equals(axle));
 stepCarWheels(car,-radius,0,1);
 poseCarWheels(car);
 assert.equal(front.meshes[0].rotation.x,0);
 assert.equal(front.meshes[0].rotation.y,0);
});

test('every model stays inside the shared 3.6 x 6 footprint and keeps its wheels on the ground',()=>{
 for(const id of Object.keys(CAR_BRANDS)){
  const g=buildCar(T,null,null,null,id),box=new T.Box3().setFromObject(g);
  assert.ok(box.max.x<=1.85&&box.min.x>=-1.85,id+' width '+box.max.x);
  assert.ok(box.max.z<=3.06&&box.min.z>=-3.06,id+' length '+box.min.z+'..'+box.max.z);
  for(const w of g.userData.wheels){const m=w.meshes[0];m.geometry.computeBoundingBox();assert.ok(Math.abs(m.position.y-m.geometry.boundingBox.max.y-.3)<.02,id+' tyre touches the road');}
 }
});

test('paint colours share one body geometry; tail lamps stay detectable for brake lights',()=>{
 for(const id of Object.keys(CAR_BRANDS)){
  const a=buildCar(T,null,null,null,id),b=buildCar(T,null,null,null,id,'#123456');
  assert.equal(a.children[0].geometry,b.children[0].geometry);assert.notEqual(a.children[0].material,b.children[0].material);
  assert.equal(b.children[0].material.color.getHexString(),new T.Color('#123456').getHexString());
  for(let i=1;i<a.children.length;i++)assert.equal(a.children[i].material,b.children[i].material,'trim, glass and wheels are shared');
  assert.equal(a.children.filter(m=>m.userData.tail).length,1,id+' one tail-lamp mesh');
  assert.ok(a.children.every(m=>m.userData.carShared));
 }
});

test('garage anchors sit on each body: roof above the bonnet, deck behind the cabin, tail at the back',()=>{
 for(const id of Object.keys(CAR_BRANDS)){
  const a=buildCar(T,null,null,null,id).userData.anchors,top=buildCar(T,null,null,null,id).userData.roofHeight;
  assert.ok(a.roof.y<=top+.06&&a.roof.y>top-.5,id+' roof '+a.roof.y+' / '+top);
  assert.ok(a.roof.front>a.roof.back&&a.roof.w>.6&&a.roof.w<1.3,id+' roof span');
  assert.ok(a.hood.y<a.roof.y-.3&&a.hood.z>1.5,id+' bonnet');
  assert.ok(a.deck.z< -2&&a.deck.y>1&&a.tail.z< -2.8&&a.sill>.3&&a.side>1.2,id+' rear and sides');
 }
});
