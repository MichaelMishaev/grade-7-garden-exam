import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
// Branded cars for Bay City. Every model keeps the shared 3.6 x 6 footprint so collision,
// yielding and the garage accessories (roof beacon, spoiler, surfboard) fit all of them.
// Front of a car is +z. children[0] of the shell is always the paint body.
export const CAR_BRANDS={
 model3:{make:'Tesla',name:'Tesla Model 3',style:'sedan',colors:['#f4f5f4','#c8312f','#8e9aa3'],glass:'#1b2530',tail:'bar',mark:'T'},
 modelY:{make:'Tesla',name:'Tesla Model Y',style:'suv',colors:['#2f5fa8','#f4f5f4','#2a2e33'],glass:'#1b2530',tail:'bar',mark:'T'},
 cybertruck:{make:'Tesla',name:'Tesla Cybertruck',style:'wedge',colors:['#aeb6bb'],glass:'#12181d',tail:'bar',mark:'T'},
 bmw:{make:'BMW',name:'BMW סדרה 3',style:'sedan',colors:['#254f9c','#1f2326'],glass:'#27343e',grille:'kidney',mark:'BMW'},
 mercedes:{make:'Mercedes-Benz',name:'Mercedes C-Class',style:'sedan',colors:['#c9ced2','#1d2328'],glass:'#27343e',grille:'star',mark:'Mercedes'},
 toyota:{make:'Toyota',name:'Toyota Corolla',style:'hatch',colors:['#d7d9d6','#b4322f','#31506d'],glass:'#3d5565',grille:'slim',mark:'TOYOTA'},
 ford:{make:'Ford',name:'Ford F-150',style:'pickup',colors:['#2c4f87','#c7cbc9'],glass:'#3d5565',grille:'wide',mark:'FORD'},
 vw:{make:'Volkswagen',name:'Volkswagen Bus',style:'bus',colors:['#e3b24f','#69b3a6'],glass:'#3d5565',grille:'vee',mark:'VW'}
};
export const BRAND_IDS=Object.keys(CAR_BRANDS);
// Role vehicles: every shift starts in a recognisable branded car.
export const ROLE_CARS={courier:'modelY',tech:'ford',press:'cybertruck'};
// Ambient traffic cycles through all brands; Teslas appear twice because Bay City is electric.
export const TRAFFIC_MIX=['model3','toyota','modelY','bmw','cybertruck','vw','mercedes','ford','model3'];
export function trafficBrand(index){
 const id=TRAFFIC_MIX[index%TRAFFIC_MIX.length],brand=CAR_BRANDS[id];
 return {id,color:brand.colors[Math.floor(index/TRAFFIC_MIX.length)%brand.colors.length]};
}

// Original automotive geometry. Shared meshes retain the same silhouette in the fleet batches.
const models=new Map(),materials=new Map();let reflectionMap=null;
export function configureCarReflections(texture){reflectionMap=texture;for(const m of materials.values()){m.envMap=texture;m.needsUpdate=true;}}
function finish(T,role,color){
 if(role==='chrome')color='#b7c2ca';if(role==='interior')color='#222a32';
 const key=role+color;if(materials.has(key))return materials.get(key);
 const options={color,roughness:.3,metalness:.65,envMap:reflectionMap,envMapIntensity:.9};
 if(role==='paint')Object.assign(options,{roughness:.22,metalness:.72,clearcoat:1,clearcoatRoughness:.12});
 if(role==='glass')Object.assign(options,{roughness:.09,metalness:.4,clearcoat:1,color:'#172b38'});
 if(role==='rubber')Object.assign(options,{roughness:.92,metalness:0});
 if(role==='interior')Object.assign(options,{roughness:.8,metalness:0});
 if(role==='chrome')Object.assign(options,{roughness:.17,metalness:1});
 if(role==='lamp')Object.assign(options,{roughness:.15,metalness:.2,emissive:color,emissiveIntensity:.7});
 const m=new T.MeshPhysicalMaterial(options);materials.set(key,m);return m;
}
export const WHEEL_RADIUS = .61;
export const MAX_STEER = .54;
const wheelGeometry = new Map();

function wheelParts(T, side) {
 if (wheelGeometry.has(side)) return wheelGeometry.get(side);
 const tire = new T.CylinderGeometry(WHEEL_RADIUS, WHEEL_RADIUS, .42, 24).rotateZ(Math.PI / 2);
 const hub = new T.CylinderGeometry(.33, .33, .447, 24).rotateZ(Math.PI / 2);
 const alloy = [
  new T.CylinderGeometry(.43, .43, .435, 24).rotateZ(Math.PI / 2),
  new T.CylinderGeometry(.12, .12, .47, 16).rotateZ(Math.PI / 2)
 ];
 for (let spoke = 0; spoke < 5; spoke++) {
  alloy.push(new T.BoxGeometry(.055, .59, .065).rotateX(spoke * Math.PI * 2 / 5).translate(side * .23, 0, 0));
 }
 const rim = mergeGeometries(alloy);
 for (const part of alloy) part.dispose();
 const parts = [
  {geometry: tire, material: finish(T, 'rubber', '#161a1e')},
  {geometry: hub, material: finish(T, 'interior', '#202932')},
  {geometry: rim, material: finish(T, 'chrome', '#a8b0b8')}
 ];
 wheelGeometry.set(side, parts);
 return parts;
}

export function stepCarWheels(car, distance, steer, dt) {
 if (!dt) return;
 const state = car.userData;
 state.wheelRoll = (state.wheelRoll + distance / WHEEL_RADIUS) % (Math.PI * 2);
 state.wheelSteer += (Math.max(-MAX_STEER, Math.min(MAX_STEER, steer)) - state.wheelSteer) * (1 - Math.exp(-dt * 14));
 if (!steer && Math.abs(state.wheelSteer) < .001) state.wheelSteer = 0;
}

export function poseCarWheels(car) {
 const state = car.userData;
 for (const wheel of state.wheels) for (const mesh of wheel.meshes) {
  mesh.rotation.set(state.wheelRoll, wheel.front ? state.wheelSteer : 0, 0, 'YXZ');
  mesh.updateMatrix();
 }
}

export function buildCar(T,part,box,tube,brandId,color){
 const id=CAR_BRANDS[brandId]?brandId:'model3',b=CAR_BRANDS[id],paint=color||b.colors[0],key=id+paint;
 if(!models.has(key)){
  const pieces=new Map();
  function add(geo,role,c,x=0,y=0,z=0,rx=0,ry=0,rz=0){
   const mat=finish(T,role,c),m=new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromEuler(new T.Euler(rx,ry,rz)),new T.Vector3(1,1,1));
   geo.applyMatrix4(m);if(!pieces.has(mat))pieces.set(mat,[]);pieces.get(mat).push(geo);
  }
  function block(role,c,x,y,z,w,h,d,r=.04){add(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)),role,c,x,y,z);}
  // Cross sections follow the longitudinal axis: [z, half width, lower y, shoulder y, top y].
  function hull(sections,role,c){
   const verts=[],indices=[];
   for(const [z,w,bottom,shoulder,top] of sections){
    for(const [x,y] of [[-.87*w,bottom],[-w,bottom+.12],[-w,shoulder],[-.85*w,top],[.85*w,top],[w,shoulder],[w,bottom+.12],[.87*w,bottom]])verts.push(x,y,z);
   }
   for(let i=0;i<sections.length-1;i++)for(let j=0;j<8;j++){const a=i*8+j,b=i*8+(j+1)%8,c=a+8,d=b+8;indices.push(a,c,b,b,c,d);}
   for(let j=1;j<7;j++){indices.push(0,j,j+1);const end=(sections.length-1)*8;indices.push(end,end+j+1,end+j);}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(verts.length/3*2),2));g.setIndex(indices);g.computeVertexNormals();add(g,role,c);
  }
  const S=b.style,bus=S==='bus',pickup=S==='pickup',wedge=S==='wedge',suv=S==='suv';
  const half=bus?1.45:pickup?1.5:id==='bmw'?1.42:id==='mercedes'?1.44:1.38,top=bus?1.75:pickup?1.64:suv?1.55:1.43;
  hull([[-3,.86*half,.69,top-.17,top-.08],[-2.65,half,.58,top-.16,top],[-1.8,half,.57,top-.1,top+.04],[.9,half,.57,top-.12,top+.04],[2.1,.98*half,.6,top-.2,top-.02],[2.8,.91*half,.68,top-.24,top-.12],[3,.78*half,.77,top-.25,top-.18]],'paint',paint);
  const roofY=bus?3.05:pickup?2.67:wedge?2.6:suv?2.72:2.43;
  const back=bus?-2.55:pickup?-.42:wedge?-2.3:-1.8,front=bus?2.45:pickup?1.9:wedge?1.75:1.65;
  if(wedge){
   hull([[back,1.3,top-.05,top+.02,top+.05],[-.55,1.12,top,roofY-.04,roofY],[front,1.29,top,top+.1,top+.17]],'glass',b.glass);
   block('paint',paint,0,roofY+.015,-.55,2.3,.09,.12);
  }else{
   hull([[back,half*.93,top-.06,top+.06,top+.12],[back+.65,half*.78,top,roofY-.1,roofY],[front-.7,half*.79,top,roofY-.08,roofY],[front,half*.93,top-.06,top+.07,top+.14]],'glass',b.glass);
   const roofBack=back+.65,roofFront=front-.7;
   block('paint',paint,0,roofY+.035,(roofBack+roofFront)/2,half*1.63,.11,roofFront-roofBack+.12,.05);
   // Fine pillars divide the doors and wrap the roof instead of a single block cabin.
   for(const side of [-1,1]){
    block('interior','#1c2328',side*half*.91,(top+roofY)/2,(back+front)/2,.085,roofY-top,.11,.02);
    block('chrome','#87939a',side*half*.94,top+.05,(back+front)/2,.035,.055,front-back,.015);
   }
  }
  if(bus){
   for(const side of [-1,1])block('paint','#e8e6df',side*half,1.57,0,.055,.32,5.15);
   block('paint','#e8e6df',0,roofY+.03,0,2.43,.12,4.03,.05);
   for(const side of [-1,1])for(const z of [-1.48,-.35,.8,1.85])block('paint',paint,side*half*.89,2.32,z,.075,1.17,.09,.02);
  }
  if(pickup){
   block('interior','#252a2d',0,top+.035,-1.75,2.45,.055,2.06);
   for(const side of [-1,1])block('paint',paint,side*1.36,top+.2,-1.8,.17,.4,2.2);
   block('paint',paint,0,top+.2,-2.86,2.65,.4,.15);
  }
  const wheelbase=bus?1.96:pickup?2.03:1.91;
  const wheels=[];
  for(const side of [-1,1]){
   for(const z of [-wheelbase,wheelbase]){
    const y=.63;
    wheels.push({side,x:side*(half+.025),y:y+.3,z});
    // Rounded fender lips track the tires and leave the dark wheel face exposed.
    const arch=new T.TorusGeometry(.66,.055,6,24,Math.PI);add(arch,'paint',paint,side*(half+.015),y,z,0,Math.PI/2,0);
   }
   // Door cuts, two handles, side sill and aero mirrors.
   block('interior','#26313a',side*(half+.018),.72,0,.045,.12,2.25,.015);
   for(const z of pickup?[.15,1.1]:[-.72,.74]){
    block('interior','#344048',side*(half+.018),1.17,z,.018,.62,.025,.005);
    block('chrome',id==='cybertruck'?'#adb8bd':'#9eabb0',side*(half+.045),top-.12,z-.15,.075,.055,.28,.015);
   }
   block('interior','#29323a',side*(half+.1),top+.26,1.15,.23,.085,.13);
   block('paint',paint,side*(half+.28),top+.31,1.16,.37,.19,.4,.07);
   block('chrome','#98acb6',side*(half+.29),top+.32,.95,.25,.11,.025,.02);
  }
  // Separate lamp lenses, lower intakes, chrome bumper trim and model-specific grilles.
  const nose=2.91;
  block('interior','#151d24',0,.9,nose,1.95,.28,.12);
  block('chrome','#7c8a94',0,.72,2.91,2.32,.055,.1,.02);
  block('chrome','#aebac1',0,.74,-2.99,2.32,.055,.07,.02);
  if(b.grille==='kidney')for(const side of [-1,1])block('interior','#101820',side*.28,1.18,nose,.47,.35,.1,.07);
  else if(b.grille)block('interior','#19222a',0,1.16,nose,1.35,.27,.1,.05);
  if(b.grille==='star'){add(new T.TorusGeometry(.13,.025,6,18),'chrome','#d2dbdf',0,1.17,3.005,Math.PI/2,0,0);}
  if(wedge||b.tail==='bar'){
   block('lamp','#eef8ff',0,top-.12,2.93,2.42,.065,.07,.02);
   block('lamp','#fc243d',0,top-.07,-3.015,2.44,.085,.055,.02);
  }else for(const side of [-1,1]){
   block('lamp','#e9f4ff',side*1.01,top-.12,2.86,.55,.15,.15,.05);
   block('lamp','#e72b3b',side*1.03,top-.12,-2.99,.49,.19,.065,.035);
  }
  block('interior','#e1e5df',0,.94,-3.025,.58,.15,.025,.02);
  const entries=[];
  // Paint stays first to preserve the existing car outfit contract.
  for(const [material,geometries] of pieces){const geometry=mergeGeometries(geometries.map(g=>g.index?g.toNonIndexed():g),false);entries.push({geometry,material});for(const g of geometries)g.dispose();}
  models.set(key,{entries,wheels});
 }
 const shell=new T.Group();
 const {entries,wheels}=models.get(key);
 for(const {geometry,material} of entries){const mesh=new T.Mesh(geometry,material);mesh.position.y=.3;mesh.userData.carShared=true;if(material.emissive?.r>.2&&material.emissive?.g<.3)mesh.userData.tail=true;shell.add(mesh);}
 shell.userData.wheelRoll=0;
 shell.userData.wheelSteer=0;
 shell.userData.wheels=wheels.map(({side,x,y,z})=>{
  const meshes=wheelParts(T,side).map(({geometry,material})=>{
   const mesh=new T.Mesh(geometry,material);
   mesh.position.set(x,y,z);mesh.userData.carShared=true;shell.add(mesh);
   return mesh;
  });
  return {front:z>0,meshes};
 });
 shell.userData.brand=id;shell.userData.body=shell.children[0];shell.userData.roofHeight=new T.Box3().setFromObject(shell).max.y;shell.userData.detail='sculpted-pbr';return shell;
}
