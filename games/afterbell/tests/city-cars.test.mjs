import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {buildCar,CAR_BRANDS,poseCarWheels,stepCarWheels,WHEEL_RADIUS} from '../src/city-cars.js';
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
 const axle=front.meshes[0].position.clone();
 stepCarWheels(car,WHEEL_RADIUS,.4,.2);
 poseCarWheels(car);
 assert.equal(rear.meshes[0].rotation.x,1);
 assert.equal(front.meshes[0].rotation.x,1);
 assert.equal(rear.meshes[0].rotation.y,0);
 assert.ok(front.meshes.every(mesh=>mesh.rotation.y>.35));
 assert.ok(front.meshes[0].position.equals(axle));
 stepCarWheels(car,-WHEEL_RADIUS,0,1);
 poseCarWheels(car);
 assert.equal(front.meshes[0].rotation.x,0);
 assert.equal(front.meshes[0].rotation.y,0);
});
