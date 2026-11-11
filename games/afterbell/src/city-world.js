import * as T from 'three';
import {createSurfaces,skyEnvironment,canopyGeometry,bodyShapes} from './city-materials.js';
import {places,inCity,CITY_EDGE,CITY_BOUNDS,northSouthStreets,eastWestStreets,streetEnds} from './city-data.js';
import {drawCityGroundAndRoads,drawOuterDistricts,drawDistrictLandmark} from './city-districts.js';
import {overtakeRoute} from './city-overtake.js';
import {sceneryTouch,kickObject,stepObject} from './city-objects.js';
import {cityIncidentsAt,incidentTrafficAt,incidentLaneBlocked} from './city-incidents.js';
import {createIncidentScene} from './city-incident-scene.js';
import {runningPose} from './city-motion.js';
import {vansTouch,safeSpeed,sweptVehicleContact,headingDelta,manualDrive,keyboardDrive,crashKick} from './city-traffic.js';
import {drivingRoute} from './city-roads.js';
import {findRoute,clearSegment} from './navigation.js';
import {CAR_SPEED,CAR_TASKS,CAR_HANDLING,carAvailable,districtOpen} from './city-discovery.js';
import {buildCar,trafficBrand,CAR_BRANDS,configureCarReflections,carReflectionStrength,stepCarWheels,poseCarWheels} from './city-cars.js';
import {skyAt,rainAt,gripAt,clockLabel} from './city-atmosphere.js';
import {carStats,tyreGrip} from './city-upgrades.js';
import {createActivityScene} from './city-activity-scene.js';
import {RACES,starCandidates} from './city-activities.js';
import {createCrashScene} from './city-crash-scene.js';

export function cityWorld(host,onMove,onImpact){
 const scene=new T.Scene();scene.background=new T.Color('#a8dce2');scene.fog=new T.Fog('#b8e1df',225,430);
 const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});host.append(renderer.domElement);
 // Sharp on phone screens; watchFrameRate() lowers this first when a phone cannot keep up.
 const phone=Math.min(innerWidth,innerHeight)<700,fullRatio=Math.min(devicePixelRatio,phone?2:1.6);renderer.setPixelRatio(fullRatio);
 // Filmic tone mapping lets the sun be much brighter than the shade without washing colours out.
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 // One outdoor sky lights every surface softly and is what cars, windows and wet roads reflect.
 const skyLight=skyEnvironment(renderer);scene.environment=skyLight;configureCarReflections(skyLight);
 const {surface,uniforms:surfaceUniforms}=createSurfaces();
 const camera=new T.OrthographicCamera(-1,1,1,-1,.1,650);
 const hemi=new T.HemisphereLight('#fff6d7','#819b9a',2.3);scene.add(hemi);
 const sun=new T.DirectionalLight('#ffe5bf',2.1);sun.position.set(-65,110,50);scene.add(sun,sun.target);
 // One shadow map follows the player. It is re-centred in steps so the shadow edges stay still.
 // The map covers only what the camera can see, so shadow edges stay crisp on a phone.
 sun.castShadow=true;sun.shadow.mapSize.set(phone?1536:2048,phone?1536:2048);
 Object.assign(sun.shadow.camera,{near:1,far:520});sun.shadow.bias=-.0004;sun.shadow.normalBias=.14;sun.shadow.radius=2.2;
 let shadowX=Infinity,shadowZ=Infinity,shadowReach=0,sky=skyAt(0),skyAt0=-1,rain=0;
 // Smooth shading everywhere; the four-sided roof keeps its hard ridges through split vertices.
 const box=new T.BoxGeometry(1,1,1),ball=new T.IcosahedronGeometry(1,1),roof=new T.ConeGeometry(1,1,4).toNonIndexed(),tube=new T.CylinderGeometry(1,1,1,10);roof.computeVertexNormals();
 const canopy=canopyGeometry(),body=bodyShapes();
 // Moving figures use a plain material: world-anchored grain would slide across them.
 const material=new T.MeshStandardMaterial({roughness:.74});
 // Windows and lamp heads share one glass material whose glow follows the time of day.
 const glowMaterial=surface('glass',{emissive:'#ffc46b',emissiveIntensity:0});
 const lampSpots=[];
 const batches=new Map(),obstacles=[],loose=[],parkedSpawns=[{x:-10,z:20,brand:'toyota'},{x:-10,z:30,brand:'vw'},{x:3,z:35,brand:'modelY'},{x:3,z:45,brand:'bmw'},{x:3,z:65,brand:'mercedes'}];
 let career={done:[]};
 // kind picks the surface material (see city-materials.js); one instanced batch per shape and kind.
 function prop(shape,color,x,y,z,w,h,d,ry=0,kind='plain'){
   const key=shape.uuid+'|'+kind;
   if(!batches.has(key))batches.set(key,{shape,kind,instances:[]});
   const matrix=new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),ry),new T.Vector3(w,h,d));
   batches.get(key).instances.push([matrix,color]);
 }
 const surfaced=kind=>(c,x,y,z,w,h,d,ry=0)=>prop(box,c,x,y,z,w,h,d,ry,kind);
 const block=surfaced('plain');
 for(const kind of ['wall','asphalt','pave','grass','sand','glass'])block[kind]=surfaced(kind);
 const glow=(c,x,y,z,w,h,d)=>{prop(box,c,x,y,z,w,h,d,0,'glow');if(w<2&&h<1)lampSpots.push([x,z]);};
 // Fixed scenery. Looked up through a coarse grid, because trees, poles and hedges are solid too.
 const CELL=28,cells=new Map();let indexed=false;
 function solid(x,z,w,d,kind='building'){obstacles.push({x,z,w:w/2+.7,d:d/2+.7,halfW:w/2,halfD:d/2,kind});indexed=false;}
 function around(x,z){
   if(!indexed){
     cells.clear();indexed=true;
     for(const o of obstacles)for(let cx=Math.floor((o.x-o.w-4)/CELL);cx<=Math.floor((o.x+o.w+4)/CELL);cx++)for(let cz=Math.floor((o.z-o.d-4)/CELL);cz<=Math.floor((o.z+o.d+4)/CELL);cz++){
       const key=cx+':'+cz;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(o);
     }
   }
   return cells.get(Math.floor(x/CELL)+':'+Math.floor(z/CELL))||[];
 }
 const solidAt=(x,z)=>!inCity(x,z)||around(x,z).some(o=>Math.abs(x-o.x)<o.w&&Math.abs(z-o.z)<o.d);
 function blocked(x,z){return !districtOpen(career,x,z)||solidAt(x,z);}
 // The car's whole footprint against fixed scenery, used while the player steers.
 function fixedTouch(x,z,angle){return around(x,z).find(o=>Math.abs(x-o.x)<o.halfW+3.6&&Math.abs(z-o.z)<o.halfD+3.6&&sceneryTouch(x,z,angle,{x:o.x,z:o.z,w:o.halfW,d:o.halfD}));}
 const gapTo=(o,x,z)=>Math.hypot(Math.max(0,Math.abs(x-o.x)-o.halfW),Math.max(0,Math.abs(z-o.z)-o.halfD));
 function objectBlocked(x,z,o){return !inCity(x,z)||around(x,z).some(b=>Math.abs(x-b.x)<b.halfW+o.w&&Math.abs(z-b.z)<b.halfD+o.d);}
 // Benches, bins, cones and crates stand loose: a car knocks them away and they settle where they land.
 function streetObject(kind,x,z){
   const g=new T.Group();let w=.65,d=.65;
   if(kind==='bench'){w=1.65;d=.7;part(g,box,'#a78160',0,1,0,3.3,.4,1.3);part(g,box,'#a78160',0,1.6,-.5,3.3,.9,.25);for(const dx of [-1.2,1.2])part(g,box,'#465e63',dx,.5,0,.25,1,1);}
   else if(kind==='cone'){part(g,box,'#465e63',0,.12,0,1.2,.24,1.2);part(g,roof,'#f28b38',0,.85,0,.7,1.5,.7);part(g,box,'#fff0cd',0,.8,0,.65,.22,.65);}
   else if(kind==='bin'){part(g,box,'#426e67',0,.85,0,1.2,1.7,1.2);part(g,box,'#325650',0,1.75,0,1.4,.18,1.4);}
   else{part(g,box,'#c39462',0,.7,0,1.4,1.4,1.4);for(const dx of [-.5,.5])part(g,box,'#896443',dx,.7,.72,.12,1.4,.08);w=d=.75;}
   const o={kind,x,z,w,d,y:0,angle:0,vx:0,vz:0,vy:0,spin:0,moving:false,g,homeX:x,homeZ:z};loose.push(o);g.position.set(x,0,z);
 }
 const leafTint=new T.Color(),leafHsl={};
 function tree(x,z,c='#6bb789',scale=1){
   // Every tree differs a little in size, turn and green, decided by where it stands.
   const r=Math.abs(Math.sin(x*12.9898+z*78.233)*43758.5453)%1,size=(.86+r*.34)*scale;
   leafTint.set(c).getHSL(leafHsl);leafTint.setHSL(leafHsl.h-.03+r*.05,Math.min(.62,leafHsl.s+.2),leafHsl.l*(.5+r*.12));
   solid(x,z,.5,.5,'tree');prop(tube,'#5d4a38',x,2.1*size,z,.36,4.2*size,.36);
   prop(canopy,'#'+leafTint.getHexString(),x,5.9*size,z,4*size,4.3*size,4*size,r*6.28,'leaf');
 }
 function label(text,x,y,z,width,bg='#245552'){
   const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d');
   ctx.fillStyle=bg;ctx.fillRect(0,0,512,96);ctx.fillStyle='#fff9df';ctx.font='bold 52px Arial';ctx.textAlign='center';ctx.direction='rtl';ctx.fillText(text,256,64,485);
   const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;
   const m=new T.Mesh(new T.PlaneGeometry(width,width*96/512),new T.MeshBasicMaterial({map:texture,side:T.DoubleSide}));m.position.set(x,y,z);scene.add(m);return m;
 }
 // Lamp posts are solid: the road painter draws each one as a .26 x 5.8 box.
 const roadBlock=Object.assign((...args)=>{block(...args);const [,x,,z,w,h,d]=args;if(h===5.8&&w===.26)solid(x,z,w,d,'pole');},block);
 drawCityGroundAndRoads(roadBlock,glow);
 // The bay surrounds the city: one large sheet of moving water that fades into the haze.
 const sea=new T.Mesh(new T.PlaneGeometry(2600,2600).rotateX(-Math.PI/2),surface('water',{color:'#1b6c8c'}));sea.position.set(56,-.15,-80);sea.receiveShadow=true;scene.add(sea);
 const palette=['#d8b79c','#e2d2b0','#c3ccce','#cfc1b8','#e0c9b6','#b7c6bb'];
 // Flat roofs carry what local roofs carry: solar water heaters, air-conditioning units and a stair head.
 function rooftop(x,y,z,id){
   for(let k=0;k<2+id%2;k++){
     const rx=x-6+k*4.4,rz=z-3.5;
     prop(tube,'#e6e9e8',rx,y+1.5,rz,.6,1.5,.6);block('#77807f',rx,y+.45,rz,1,.9,1);block.glass('#1c2b3d',rx,y+.5,rz+1.5,1.9,.18,1.5);
   }
   block('#bfc4c0',x+5.5,y+.55,z+3,1.5,1.1,1.1);block('#bfc4c0',x+3.2,y+.55,z+3.4,1.5,1.1,1.1);
   block.wall('#d6cfbd',x+5,y+1.4,z-3,3.4,2.8,3);block('#8a8f8c',x+5,y+2.9,z-3,3.8,.2,3.4);
 }
 function windows(x,y,z,w,count){
   for(let i=0;i<count;i++){const wx=x-w/2+(i+.5)*w/count;block('#e9e2cf',wx,y,z,2.65,2.7,.24);((i+Math.round(x*3+y+z))%3?glow:block.glass)('#4b6b7c',wx,y+.1,z+.16,2.16,2.14,.12);block('#d8d2c0',wx,y-1.32,z+.1,2.85,.14,.5);}
 }
 function sideWindows(x,y,z,d,count){
   for(let i=0;i<count;i++){const wz=z-d/2+(i+.5)*d/count;block('#e9e2cf',x,y,wz,.24,2.7,2.65);((i+Math.round(x+y*3+z))%3?glow:block.glass)('#4b6b7c',x+.16,y+.1,wz,.12,2.14,2.16);block('#d8d2c0',x+.1,y-1.32,wz,.5,.14,2.85);}
 }
 function house(x,z,c,w=11,h=6){
   block.pave('#cfc8b4',x,.24,z,w+3,.4,12);block.wall(c,x,h/2,z,w,h,9);
   prop(roof,'#a4553f',x,h+1.75,z,(w+2)*.72,3.5,8,.785,'tile');block('#8d857a',x+w*.28,h+2.3,z-1.5,1,2.6,1);
   windows(x,h*.58,z+4.55,w,3);sideWindows(x+w/2+.05,h*.58,z,9,2);block('#37636b',x,1.5,z+4.7,1.7,3,.45);
   solid(x,z,w,9);
 }
 for(let ix=-4;ix<=3;ix++)for(let iz=-4;iz<=2;iz++){
   const x=ix*56+27,z=iz*56+27,id=(ix+4)*7+iz+4;
   if(Object.values(places).some(p=>Math.hypot(x-p.x,z-p.z)<28))continue;
   if(id%5===0){for(let k=0;k<4;k++)tree(x-9+(k%2)*16,z-8+Math.floor(k/2)*16);continue;}
   if(x<-80||z<-110){house(x-7,z,palette[id%6]);house(x+10,z-9,palette[(id+2)%6],9,5);}
   else{const h=10+(id%4)*5;block.wall(palette[id%6],x,h/2,z,17,h,13);solid(x,z,17,13);block('#e8e0cc',x,h,z,18,1,14);for(let y=3;y<h;y+=4){windows(x,y,z+6.6,17,4);sideWindows(x+8.6,y,z,13,3);}rooftop(x,h+.5,z,id);block('#3f5560',x,1.6,z+6.6,2.4,3.2,.3);block('#d9d2bf',x,3.5,z+7.3,4.2,.3,1.7);}
   tree(x+15,z+12);
   block('#e6d9b7',x,.22,z+17,3,.12,14);block.grass('#4f7a45',x-10,.95,z+13,8,1.8,1.8);solid(x-10,z+13,8,1.8,'hedge');
   streetObject('bench',x+8,z+19);streetObject('bin',x+12,z+19);streetObject(id%2?'crate':'cone',x-13,z+19);
   if(id%3!==0){const vx=ix*56+3,vz=iz*56+21;
     parkedSpawns.push({x:vx,z:vz,brand:trafficBrand(id).id});
   }
 }
 drawOuterDistricts({block,prop,ball,tube,solid,tree,house,windows});
 const nearPlace=(x,z)=>Object.values(places).some(p=>Math.abs(x-p.x)<24&&Math.abs(z-p.z)<24);
 for(const x of northSouthStreets)for(const z of eastWestStreets){
   for(const along of [19,37])if(z+along<streetEnds.south-12&&!nearPlace(x-7.6,z+along))tree(x-7.6,z+along,'#6fae7c',.72);
   if(x+28<CITY_BOUNDS.east-4&&!nearPlace(x+28,z-7.6))tree(x+28,z-7.6,'#79b07a',.72);
 }
 for(const p of Object.values(places)){
   const x=p.x,z=p.z-11;
   block.pave('#d9c9a4',x,.26,p.z,17,.45,8);
   if(drawDistrictLandmark(p,{block,prop,ball,tube,solid,tree})){
     label(p.name,x,5.4,z+7.4,13);continue;
   }
   if(p.kind==='house'){house(x,z,p.color,14,7);}
   else if(p.kind==='park'){
     for(const dx of [-8,8])tree(x+dx,z,p.color);
     prop(tube,'#f5dfba',x,.75,z,3,1.4,3);prop(ball,'#ed8967',x,4,z,2.4,3.4,2.4);solid(x,z,5,5);
   }else if(p.kind==='stage'){
     block('#b87b54',x,.8,z,20,1.5,10);
     for(const dx of [-9,9])block('#345960',x+dx,5,z,1,10,1);
     block('#f0a558',x,10,z,20,1,2);block('#397b81',x,4,z-4,18,7,.7);solid(x,z,20,10);
     for(let i=0;i<6;i++)prop(ball,palette[i],x-7+i*2.8,9,z+.5,.7,.7,.7);
   }else{
     const h=p.kind==='clinic'?13:9;block.wall(p.color,x,h/2,z,18,h,12);solid(x,z,18,12);
     block('#e8e0cc',x,h,z,19,1,13);windows(x,h-2.4,z+6.1,18,4);sideWindows(x+9.1,h-2.4,z,12,3);
     block('#345963',x,1.9,z+6.25,3.2,3.8,.3);
     if(p.kind==='market'){for(let j=0;j<9;j++)block(j%2?'#fff0c6':'#da5f73',x-8+2*j,4.6,z+7.7,2,.55,3.2);}
     if(p.kind==='clinic'){block('#fff9e5',x,h+2,z,1,4,.8);block('#fff9e5',x,h+2,z,4,1,.8);}
     if(p.kind==='studio'){block('#6b7483',x,h+3,z,.55,6,.55);for(let j=0;j<3;j++)block('#e9cd92',x,h+2+j*1.55,z,4-j,.27,.32);}
     if(p.kind==='depot'){for(let j=0;j<4;j++)block('#597579',x-5+j*3.4,2,z+6.2,2.7,3.7,.3);}
     if(p.kind==='library'){for(const dx of [-7,-3,3,7])prop(tube,'#fae5c9',x+dx,2.2,z+7,.48,4.4,.48);}
   }
   label(p.name,x,p.kind==='stage'?7:5.4,z+7.4,13);
 }
 for(let x=-220;x<220;x+=15){tree(x,174,'#74b78a');block('#a77457',x,.85,187,14,1.2,3);}
 // Boardwalk booths, awnings and moored sailboats give the seafront its own silhouette.
 for(let i=0;i<8;i++){
   const x=-82+i*22;if(Math.abs(x-places.pier.x)<8)continue;block('#e6be87',x,1.25,160,5,2.5,4);
   for(let j=0;j<5;j++)block(j%2?'#fff3d4':palette[i%6],x-2+j,3.5,160,1,.5,5.6);
 }
 for(let i=0;i<9;i++){
   const x=-186+i*43,z=202+(i%3)*7;prop(ball,palette[i%6],x,.65,z,2.7,.9,6);
   block('#835f49',x,4,z,.23,7,.23);prop(roof,'#fff1c5',x+1.2,4.6,z,2.4,5.5,.3);
 }
 for(const {shape,kind,instances} of batches.values()){
   const batch=new T.InstancedMesh(shape,kind==='glow'?glowMaterial:surface(kind),instances.length);
   instances.forEach(([matrix,c],i)=>{batch.setMatrixAt(i,matrix);batch.setColorAt(i,new T.Color(c));});batch.castShadow=batch.receiveShadow=true;scene.add(batch);
 }
 const objectBatches=[];
 for(const shape of [box,roof]){
   const entries=loose.flatMap(o=>o.g.children.filter(m=>m.geometry===shape).map(m=>({o,m})));
   if(!entries.length)continue;
   const mesh=new T.InstancedMesh(shape,material,entries.length);mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);mesh.frustumCulled=false;mesh.castShadow=mesh.receiveShadow=true;
   entries.forEach(({m},i)=>{m.updateMatrix();mesh.setColorAt(i,m.material.color);m.material.dispose();});scene.add(mesh);objectBatches.push({mesh,entries});
 }
 const objectMatrix=new T.Matrix4();
 function renderObjects(){
   for(const o of loose){o.g.position.set(o.x,o.y,o.z);o.g.rotation.z=reduced?0:Math.sin(o.angle)*.7;o.g.updateMatrix();}
   for(const {mesh,entries} of objectBatches){entries.forEach(({o,m},i)=>mesh.setMatrixAt(i,objectMatrix.multiplyMatrices(o.g.matrix,m.matrix)));mesh.instanceMatrix.needsUpdate=true;}
 }
 function part(g,shape,c,x,y,z,w,h,d){
   const m=new T.Mesh(shape,new T.MeshStandardMaterial({color:c,roughness:.72}));m.position.set(x,y,z);m.scale.set(w,h,d);m.castShadow=true;g.add(m);return m;
 }
 const skins=['#c98f66','#e0b48e','#a8704a','#8a5a3c','#d9a47c'],hairs=['#2e2622','#4a3526','#1f1d1f','#6b4a2e','#3a3a40'],trousers=['#364d62','#3b3b44','#5a5246','#2f3e50'];let people=0;
 function person(color){
   // Rounded bodies with varied skin, hair and trousers. The order of the parts is a contract:
   // 0 torso, 1 head, 2 hair, then for each side leg, arm, eye (outfits and the gait index into it).
   const g=new T.Group(),n=people++,skin=skins[n%skins.length],legs=trousers[n%trousers.length];
   part(g,body.torso,color,0,2.15,0,1.45,1.6,.82);part(g,body.head,skin,0,3.55,0,1.12,1.24,1.1);
   part(g,body.hair,hairs[(n*3+1)%hairs.length],0,3.72,-.1,1.2,1.1,1.2);
   for(const side of [-1,1]){part(g,body.limb,legs,side*.44,.8,0,.6,1.55,.62);part(g,body.limb,color,side*1.03,2.1,0,.42,1.35,.5);part(g,box,'#262c30',side*.24,3.5,.53,.12,.14,.06);}
   return g;
 }
 function van(brand,c){return buildCar(T,part,box,tube,brand,c);}
 const avatar=person('#df745d'),car=new T.Group(),parcel=new T.Group();
 const limbs=[-1,1].map((side,i)=>{
   const leg=avatar.children[3+i*3],arm=avatar.children[4+i*3];leg.scale.y=.82;arm.scale.y=.72;
   const shin=part(avatar,body.limb,'#364d62',side*.44,.5,0,.55,.79,.6);
   const shoe=part(avatar,box,'#202c35',side*.44,.12,.16,.65,.25,1.02);
   const forearm=part(avatar,body.limb,skins[0],side*1.03,1.3,0,.36,.66,.46);
   return {leg,arm,shin,shoe,forearm};
 });
 let runDistance=0,runAmount=0;
 function animateRunner(dt,distance){
   if(dt>0){runDistance+=distance;const target=distance>dt*.5&&!driving&&!jump?1:0;runAmount+=(target-runAmount)*Math.min(1,dt*16);}
   const poses=runningPose(runDistance,runAmount);
   function segment(mesh,x,y,z,angle,length){mesh.rotation.x=angle;mesh.position.set(x,y-Math.cos(angle)*length/2,z-Math.sin(angle)*length/2);return {y:y-Math.cos(angle)*length,z:z-Math.sin(angle)*length};}
   limbs.forEach((r,i)=>{const side=i?1:-1,p=poses[i];
     const knee=segment(r.leg,side*.44,1.57,0,p.hip,.82),ankle=segment(r.shin,side*.44,knee.y,knee.z,p.hip+p.knee,.79);
     r.shoe.position.set(side*.44,ankle.y+.12,ankle.z+.16);r.shoe.rotation.x=p.hip+p.knee*.4;
     const elbow=segment(r.arm,side*1.03,2.75,0,p.shoulder,.72);segment(r.forearm,side*1.03,elbow.y,elbow.z,p.shoulder-p.elbow,.66);
   });
 }

 part(parcel,box,'#ffe0a1',0,0,0,1.2,1.05,1);part(parcel,box,'#bc7950',0,.54,0,.2,.08,1.05);scene.add(avatar,car,parcel);
 let paint=null;
 function setCar(brand,wheelState){
   const old=car.userData.shell;if(old){car.remove(old);for(const m of old.children){if(m.userData.dynamicMaterial)m.material.dispose();if(!m.userData.carShared){m.material?.dispose();if(m.geometry!==box&&m.geometry!==tube)m.geometry?.dispose();}}}
   const shell=van(brand,paint||undefined);for(const m of shell.children)m.castShadow=true;if(wheelState){shell.userData.wheelRoll=wheelState.wheelRoll;shell.userData.wheelSteer=wheelState.wheelSteer;}for(const m of shell.children)if(m.userData.tail){m.material=m.material.clone();m.userData.dynamicMaterial=true;}car.add(shell);car.userData.shell=shell;car.userData.brand=brand;car.userData.body=shell.userData.body;
   car.userData.refit?.();
 }
 setCar('toyota');
 const gateSigns=[];
 for(const [x,z,text] of [[0,-222,'הצפון · 3 משימות + תרגול'],[222,0,'הנמל · 6 משימות + 2 תרגולים']]){
  const gate=new T.Group();part(gate,box,'#e7a44c',0,1.2,0,8,2.4,.5);part(gate,box,'#393f46',0,1.25,.3,7,.35,.1);gate.position.set(x,0,z);scene.add(gate);const sign=label(text,x,5,z,16,'#493e33');gateSigns.push({gate,sign,x,z});
 }
 const cap=new T.Group();part(cap,box,'#129c9e',0,4.38,0,1.46,.43,1.26);part(cap,box,'#166869',0,4.22,.78,1.52,.16,.62);avatar.add(cap);cap.visible=false;
 const accessories={scarf:new T.Group(),glasses:new T.Group(),pack:new T.Group(),beacon:new T.Group()};
 const {scarf,glasses,pack,beacon}=accessories;
 part(scarf,box,'#c54339',0,2.99,0,1.46,.36,1.16);part(scarf,box,'#f5b751',.36,2.61,.54,.38,.63,.18);
 part(glasses,box,'#35689a',0,3.65,.58,1.38,.14,.15);
 for(const side of [-1,1])part(glasses,box,'#233442',side*.34,3.62,.63,.52,.34,.16);
 part(pack,box,'#e16e36',0,2.05,-.69,1.46,1.46,.72);part(pack,box,'#9d482c',0,1.76,-1.05,1.1,.67,.22);
 part(beacon,box,'#374b50',0,3.57,-1.35,1.52,.22,.85);part(beacon,tube,'#ffc640',0,3.91,-1.35,.55,.56,.55);
 avatar.add(scarf,glasses,pack);car.add(beacon);
 const stripes=new T.Group(),spare=new T.Group(),spoiler=new T.Group(),underglow=new T.Group(),surfboard=new T.Group();
 for(const side of [-1,1]){
   part(stripes,box,'#193c83',side*.65,2.01,2.27,.32,.05,1.42);
   part(stripes,box,'#193c83',side*.65,3.51,-.42,.32,.05,3.62);
   part(spoiler,box,'#394254',side*1.18,2.24,-2.72,.22,.84,.28);
   part(spoiler,box,'#f34850',side*1.94,2.75,-2.72,.18,.54,.92);
   const rail=part(underglow,box,'#16ffe6',side*1.81,.62,0,.15,.18,4.8);
   rail.material.emissive.set('#16ffe6');
 }
 part(spoiler,box,'#253447',0,2.65,-2.72,3.96,.21,.9);
 part(spare,tube,'#263142',0,1.42,-3.19,.86,.42,.86).rotation.x=Math.PI/2;
 part(spare,tube,'#ed715d',0,1.42,-3.44,.48,.12,.48).rotation.x=Math.PI/2;
 const halo=new T.Mesh(new T.RingGeometry(0,1,32),new T.MeshBasicMaterial({color:'#39ffdb',transparent:true,opacity:.36,depthWrite:false}));
 halo.rotation.x=-Math.PI/2;halo.scale.set(2.68,3.72,1);halo.position.y=.49;underglow.add(halo);
 for(const z of [-1.45,.75])part(surfboard,box,'#3c5361',1.27,3.65,z,1.12,.22,.27);
 part(surfboard,ball,'#f74d90',1.37,3.94,-.34,.66,.22,2.56);
 part(surfboard,roof,'#374280',1.37,4.26,-1.72,.23,.61,.64);
 Object.assign(accessories,{stripes,spare,spoiler,underglow,surfboard});
 car.add(stripes,spare,spoiler,underglow,surfboard);
 for(const mesh of Object.values(accessories))mesh.visible=false;
 const drone=new T.Group();
 part(drone,ball,'#f3ba4e',0,0,0,.85,.65,.85);
 for(const side of [-1,1])part(drone,tube,'#326c71',side*.93,.28,0,.55,.12,.55);
 const arrow=part(drone,roof,'#ad412e',0,.88,.28,.55,.98,.55);arrow.rotation.x=Math.PI/2;
 scene.add(drone);drone.visible=false;
 // Shop cosmetics unlocked by missions. Hero gear rides on the avatar; car gear is placed
 // each frame from the current shell's measured body and roof (see fitCarGear), so it fits all eight models.
 const glowPart=(g,shape,c,x,y,z,w,h,d,i=1.2)=>{const m=part(g,shape,c,x,y,z,w,h,d);m.material.emissive.set(c);m.material.emissiveIntensity=i;return m;};
 const extras={};for(const id of ['headphones','cape','balloon','crown','medal','roofbox','flags','antenna','bullbar','exhaust','lightbar'])extras[id]=new T.Group();
 const {headphones,cape,balloon,crown,medal,roofbox,flags,antenna,bullbar,exhaust,lightbar}=extras;
 part(headphones,box,'#f4f4f4',0,4.36,0,1.5,.14,.3);
 for(const side of [-1,1]){part(headphones,box,'#f4f4f4',side*.72,4.0,0,.1,.75,.2);part(headphones,box,'#ff5fa2',side*.7,3.62,0,.24,.56,.52);}
 part(cape,box,'#c8323c',0,2.2,-.53,1.5,1.9,.1).rotation.x=.12;part(cape,box,'#8f1f2a',0,3.02,-.42,1.55,.18,.26);
 part(balloon,box,'#e8e8e8',1.25,4.35,-.4,.04,4.7,.04);part(balloon,ball,'#ffc93a',1.25,7.25,-.4,.9,1.1,.9);part(balloon,roof,'#d99a17',1.25,6.12,-.4,.16,.2,.16);
 part(crown,box,'#e2b23a',0,4.42,0,1.3,.3,1.15);
 for(const x of [-.5,.5])for(const z of [-.45,.45])part(crown,roof,'#f0c64a',x,4.76,z,.2,.42,.2);
 glowPart(crown,ball,'#e0323f',0,4.44,.6,.13,.13,.06,.5);
 for(const side of [-1,1])part(medal,box,'#2f5fb8',side*.24,2.72,.46,.18,.72,.05).rotation.z=side*.35;
 part(medal,tube,'#e5b53b',0,2.3,.48,.28,.06,.28).rotation.x=Math.PI/2;
 avatar.add(headphones,cape,balloon,crown,medal);
 part(roofbox,box,'#2f3a44',0,.07,0,1.62,.12,1);part(roofbox,box,'#eef1f2',0,.36,0,1.5,.5,.94);part(roofbox,box,'#c9d0d4',0,.62,0,1.3,.06,.8);
 part(lightbar,box,'#2b2f33',0,.07,0,2.1,.14,.3);glowPart(lightbar,box,'#fff7d6',0,.19,.05,1.9,.12,.2,1.6);
 part(antenna,box,'#262c31',0,1.2,0,.05,2.4,.05);part(antenna,box,'#ff8a1f',0,2.15,-.32,.03,.42,.6);part(antenna,ball,'#262c31',0,.05,0,.14,.1,.14);
 for(const side of [-1,1]){
  const f=new T.Group();f.userData.side=side;part(f,box,'#dfe3e6',0,.5,0,.05,1,.05);part(f,box,side<0?'#2f6ee0':'#f2c230',side*.02,.82,-.32,.03,.42,.6);part(f,box,'#ffffff',side*.03,.82,-.32,.03,.1,.6);flags.add(f);
  part(exhaust,tube,'#c9ced3',side*.72,.55,-.12,.17,.5,.17).rotation.x=Math.PI/2;part(exhaust,tube,'#1d2125',side*.72,.55,-.38,.11,.04,.11).rotation.x=Math.PI/2;
  part(bullbar,box,'#24282c',side*.95,.95,.05,.14,.95,.14).userData.post=side;glowPart(bullbar,ball,'#ffd86b',side*.62,1.0,.14,.16,.16,.08,1.4);
 }
 for(const y of [.72,1.32])part(bullbar,box,'#24282c',0,y,.05,2.1,.13,.13).userData.bar=true;
 car.add(roofbox,lightbar,antenna,flags,bullbar,exhaust);
 for(const mesh of Object.values(extras))mesh.visible=false;
 // Body box and roof panel (vertices within 30 cm of the top) of the current shell. Car bodies are
 // merged meshes, so the roof is read from vertices; measured once per shell.
 function carExtent(shell){
  if(shell.userData.gearExtent)return shell.userData.gearExtent;
  const body=new T.Box3(),top=new T.Box3(),v=new T.Vector3(),m4=new T.Matrix4(),roofY=shell.userData.roofHeight;
  // Vertices in the car group's frame, at any depth of the shell.
  shell.updateMatrixWorld(true);const toCar=new T.Matrix4().copy(shell.parent?.matrixWorld||new T.Matrix4()).invert();
  shell.traverse(m=>{const pos=m.geometry?.attributes.position;if(!pos||m.isInstancedMesh)return;m4.multiplyMatrices(toCar,m.matrixWorld);
   for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i).applyMatrix4(m4);body.expandByPoint(v);if(v.y>roofY-.3)top.expandByPoint(v);}});
  // A shell with nothing measurable gets a typical car's box, so gear never lands at infinity.
  if(top.isEmpty())top.set(new T.Vector3(-1.3,roofY,-1.2),new T.Vector3(1.3,roofY,1));
  if(body.isEmpty())body.set(new T.Vector3(-1.85,0,-3),new T.Vector3(1.85,roofY,3));
  return shell.userData.gearExtent={body,top};
 }
 function fitCarGear(time){
  const shell=car.userData.shell,roofY=shell.userData.roofHeight,{body,top}=carExtent(shell);
  const front=top.max.z,back=top.min.z,length=Math.max(.6,front-back),cabin=Math.max(.6,Math.max(-top.min.x,top.max.x));
  // Roof box between the beacon at the back and the light bar at the front edge.
  roofbox.position.set(-.25,roofY,(front+back)/2-.05);roofbox.scale.set(Math.min(1,cabin/1.05),1,Math.min(2,Math.max(.9,length-.8)));
  lightbar.position.set(0,roofY-.04,front-.1);lightbar.scale.x=Math.min(1.05,(cabin*2-.1)/2.1);
  antenna.position.set(-Math.max(.3,cabin-.2),roofY-.05,back+.1);
  for(const f of flags.children)f.position.set(f.userData.side*(cabin+.04),roofY-.62,front-.35);
  bullbar.position.set(0,0,body.max.z+.08);const half=Math.min(1.2,body.max.x-.3);
  for(const m of bullbar.children){if(m.userData.bar)m.scale.x=half*2;if(m.userData.post)m.position.x=m.userData.post*(half-.15);}
  exhaust.position.set(0,0,body.min.z);
  balloon.rotation.z=reduced?0:Math.sin(time*1.3)*.05;
 }
 // The original garage gear sits on the anchor points each car model measures on its own body
 // (roof, bonnet, boot deck, tail, sill), so it fits all eight shapes. Parts were authored around
 // the old van: roof top 3.46, bonnet stripe z 2.27, wing struts down to y 1.82 at z -2.72.
 function fitClassicGear(a){
  if(!a||fitClassicGear.last===a)return;fitClassicGear.last=a;
  const roofMid=(a.roof.front+a.roof.back)/2,roofLength=a.roof.front-a.roof.back;
  beacon.position.set(0,a.roof.y-3.46,a.roof.back+.5+1.35);
  surfboard.position.set(Math.min(a.roof.w,1.1)-1.32,a.roof.y-3.54,roofMid+.35);
  stripes.children.forEach((m,i)=>{const side=i<2?-1:1;
   if(i%2===0){m.position.set(side*.62,a.hood.y+.4*Math.tan(a.hood.slope)+.03,a.hood.z-.4);m.rotation.x=a.hood.slope;m.scale.z=1.15;}
   else{m.position.set(side*.62,a.roof.y+.005,roofMid);m.scale.z=Math.max(.4,roofLength+.2);}});
  spoiler.position.set(0,a.deck.y-1.82,a.deck.z+2.72);spoiler.scale.x=Math.min(1,(a.side+.2)/2.03);
  spare.position.set(0,a.tail.y-1.42,a.tail.z-.24+3.19);
  underglow.children.forEach(m=>{if(m.geometry===box)m.position.set(Math.sign(m.position.x)*(a.side+.03),a.sill+.08,0);else m.scale.set(a.side*2.05,3.72,1);});
 }
 // Closed city-block circuits keep actors on the street or sidewalk at every turn.
 function circuit(g,x,z,size,speed,offset,dwell=0){
   return time=>{
     const duration=size/speed+dwell,period=4*duration,t=((time+offset)%period+period)%period,leg=Math.floor(t/duration);
     const distance=Math.min(size,(t%duration)*speed);
     const corners=[[0,0],[size,0],[size,size],[0,size]],dx=[1,0,-1,0],dz=[0,1,0,-1];
     g.position.set(x+corners[leg][0]+dx[leg]*distance,0,z+corners[leg][1]+dz[leg]*distance);
     g.rotation.y=Math.atan2(dx[leg],dz[leg]);
   };
 }
 const traffic=[],walkers=[],routes=[];
 const parked=parkedSpawns.map((p,i)=>{const g=van(p.brand);g.position.set(p.x,0,p.z);g.userData.id='parked-'+i;return g;});
 function addTraffic(x,z,speed,offset){
   const tb=trafficBrand(traffic.length),g=van(tb.id,tb.color);traffic.push(g);
   g.userData.move=circuit(g,x+2,z+2,52,speed,offset);
   Object.assign(g.userData,{id:'traffic-'+(traffic.length-1),clock:0,vx:0,vz:0,kx:0,kz:0,kyaw:0,kvx:0,kvz:0,kw:0,stun:0,hitAge:1,hitPower:0});g.userData.move(0);
 }
 function addResident(x,z,i){
   const g=person(palette[i%6]);walkers.push(g);const walk=circuit(g,x+5,z+5,46,1.6+i%3*.25,i*7,2+i%3);
   // sideX/sideZ: how far this resident has stepped off their route to let a guided car pass.
   const move=t=>{walk(t);g.position.x+=g.userData.sideX||0;g.position.z+=g.userData.sideZ||0;};routes.push(move);move(0);g.userData.clock=0;
 }
 for(let i=0;i<20;i++)addTraffic(((i%5)-2)*56,(Math.floor(i/5)-2)*56,6+i%3,i*4.1);
 for(let i=0;i<32;i++)addResident((i%8-4)*56,(Math.floor(i/8)-2)*56,i);
 // Work traffic circulates between the docks, repair yards and the northern station.
 for(const [x,z,count] of [[280,-56,3],[280,56,4],[280,112,3],[-168,-336,2],[56,-336,2],[-56,-280,1],[168,56,2]]){
   for(let i=0;i<count;i++)addTraffic(x,z,7,i*28/count);
   addResident(x,z,walkers.length);addResident(x,z,walkers.length);
 }
 // All street actors use box parts. Batch their transforms into one draw call on phones.
 const fleet=[...parked,...traffic];
 let occupied=null,desiredCar=null,boost=false,boostEnergy=1,velocity=0,driveSpeed=0,boostActive=false;
 // Garage upgrade multipliers (see city-upgrades.js); they follow the player into any car, manual driving only.
 let perf=carStats(null),upgradeTiers={};
 let driveAngle=0;
 const initialFleet=fleet.map(g=>({id:g.userData.id,x:g.position.x,z:g.position.z,heading:g.rotation.y}));
 function nearbyCar(){const wanted=fleet.find(g=>g.userData.id===desiredCar&&Math.hypot(g.position.x-px,g.position.z-pz)<=6);if(wanted)return wanted;return fleet.filter(g=>g!==occupied).map(g=>({g,d:Math.hypot(g.position.x-px,g.position.z-pz)})).filter(v=>v.d<=6).sort((a,b)=>a.d-b.d)[0]?.g||null;}
 function vehicleInfo(g){return g?{id:g.userData.id,brand:g.userData.brand,name:CAR_BRANDS[g.userData.brand].name,x:g.position.x,z:g.position.z,heading:g.rotation.y,available:carAvailable(career,g.userData.brand),parked:parked.includes(g)||g.userData.parked===true}:null;}
 function fleetState(){return {active:occupied?.userData.id||null,cars:fleet.filter(g=>g.userData.parked||parked.includes(g)||g===occupied).map(g=>({id:g.userData.id,x:g===occupied?px:g.position.x,z:g===occupied?pz:g.position.z,heading:g===occupied?heading:g.rotation.y}))};}
 function restoreFleet(saved){
   occupied=null;desiredCar=null;driving=false;boost=false;boostEnergy=1;velocity=driveSpeed=0;boostActive=false;
   for(const [i,g] of fleet.entries()){const p=initialFleet[i];g.position.set(p.x,0,p.z);g.rotation.y=p.heading;g.userData.parked=false;g.userData.clock=0;g.userData.wheelRoll=0;g.userData.wheelSteer=0;g.visible=true;}
   for(const p of Array.isArray(saved?.cars)?saved.cars:[]){if(!p)continue;const g=fleet.find(g=>g.userData.id===p.id);if(g&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&inCity(p.x,p.z)&&Number.isFinite(p.heading)){g.position.set(p.x,0,p.z);g.rotation.y=p.heading;g.userData.parked=true;}}
   const g=fleet.find(g=>g.userData.id===saved?.active);
   if(g&&carAvailable(career,g.userData.brand)){occupied=g;driving=true;g.visible=false;heading=g.rotation.y;setCar(g.userData.brand,g.userData);}
 }
 function toggleVehicle(){
   path=[];momentum=velocity=driveSpeed=0;boostActive=false;
   if(driving&&occupied){
     const desired=fleet.find(g=>g.userData.id===desiredCar);
     const exits=[{x:px+Math.cos(heading)*4,z:pz-Math.sin(heading)*4},{x:px-Math.cos(heading)*4,z:pz+Math.sin(heading)*4},{x:px+Math.sin(heading)*4,z:pz+Math.cos(heading)*4},{x:px-Math.sin(heading)*4,z:pz-Math.cos(heading)*4}].filter(p=>!blocked(p.x,p.z));
     const exitGoal=desired?{x:desired.position.x,z:desired.position.z}:destination;
     if(exitGoal)exits.sort((a,b)=>Math.hypot(a.x-exitGoal.x,a.z-exitGoal.z)-Math.hypot(b.x-exitGoal.x,b.z-exitGoal.z));
     const side=exits[0];
     if(!side)return {error:'אין מקום לצאת כאן. התקדמו לשטח פתוח.'};
     occupied.userData.wheelRoll=car.userData.shell.userData.wheelRoll;
     occupied.userData.wheelSteer=car.userData.shell.userData.wheelSteer;
     occupied.position.set(px,0,pz);occupied.rotation.y=heading;occupied.userData.parked=true;occupied.visible=true;occupied=null;driving=false;boost=false;position(side.x,side.z);return {driving:false};
   }
   const g=nearbyCar();if(!g)return {error:'התקרבו לרכב כדי להיכנס · עד 6 מטרים.'};
   if(!carAvailable(career,g.userData.brand))return {error:'🔒 '+CAR_BRANDS[g.userData.brand].name+' · נדרשות '+CAR_TASKS[g.userData.brand]+' משימות; השלמתם '+career.done.length+'.'};
   occupied=g;desiredCar=null;g.visible=false;setCar(g.userData.brand,g.userData);position(g.position.x,g.position.z);heading=g.rotation.y;driving=true;return {driving:true};
 }
 // Residents at handoff locations stay close enough to receive the cargo.
 const locals=Object.values(places).map((p,i)=>{const g=person(palette[i%6]);g.position.set(p.x+3,0,p.z-1);return g;});
 const actors=[...fleet,...walkers,...locals],actorBatches=new Map(),actorParts=[],batchParts=new Map();
 for(const g of actors)for(const m of g.children){
   m.updateMatrix();const key=m.userData.carShared?m.geometry.uuid+':'+m.material.uuid:'residents:'+m.geometry.uuid;
   if(!batchParts.has(key))batchParts.set(key,[]);batchParts.get(key).push({g,m});
 }
 for(const [key,parts] of batchParts){
   const sample=parts[0].m,batch=new T.InstancedMesh(sample.geometry,sample.userData.carShared?sample.material:material,parts.length);
   batch.instanceMatrix.setUsage(T.DynamicDrawUsage);batch.frustumCulled=false;batch.castShadow=true;batch.receiveShadow=true;
   parts.forEach(({g,m},index)=>{if(!sample.userData.carShared)batch.setColorAt(index,m.material.color);actorParts.push({g,m,batch,index});});
   scene.add(batch);actorBatches.set(key,batch);
 }
 const transform=new T.Matrix4(),zeroScale=new T.Vector3(0,0,0);
 function swingLimb(mesh,x,pivot,length,angle){mesh.rotation.x=angle;mesh.position.set(x,pivot-Math.cos(angle)*length/2,-Math.sin(angle)*length/2);mesh.updateMatrix();}
 function moveStreetActors(){
   routes.forEach((move,i)=>{
     const g=walkers[i];
     // A resident struck by the car is posed by the crash scene until they are back on their route.
     if(g.userData.hit)return;
     move(time);
     for(const e of events){
       const dx=g.position.x-e.x,dz=g.position.z-e.z,d=Math.hypot(dx,dz);
       if(d>=14||d<.01)continue;
       // Keep a clear space at the scene and turn toward the activity from the sidewalk.
       if(d<8){
         const x=e.x+dx/d*8,z=e.z+dz/d*8;
         if(!blocked(x,z)){g.position.x=x;g.position.z=z;}
       }
       g.rotation.y=Math.atan2(e.x-g.position.x,e.z-g.position.z);break;
     }
     // Legs and arms swing with the distance actually walked, so residents stand still while they wait.
     const m=g.userData,step=Math.hypot(g.position.x-(m.lastX??g.position.x),g.position.z-(m.lastZ??g.position.z));m.lastX=g.position.x;m.lastZ=g.position.z;
     m.stride=(m.stride??i)+Math.min(step,1)*1.9;const swing=reduced?0:Math.sin(m.stride)*.6*Math.min(1,step*40);
     g.position.y=.16;
     for(const [index,side,sign] of [[3,-1,1],[6,1,-1]]){swingLimb(g.children[index],side*.44,1.575,1.55,swing*sign);swingLimb(g.children[index+1],side*1.03,2.775,1.35,-swing*sign*.8);}
   });
   crashFx.draw(swingLimb);
   for(const g of fleet)poseCarWheels(g);
   for(const {g,m,batch,index} of actorParts){
     g.updateMatrix();transform.multiplyMatrices(g.matrix,m.matrix);
     if(g===occupied)transform.scale(zeroScale);
     batch.setMatrixAt(index,transform);
   }
   for(const batch of actorBatches.values())batch.instanceMatrix.needsUpdate=true;
 }
 const planes=Array.from({length:3},(_,i)=>{
   const g=new T.Group();part(g,ball,'#fff3ce',0,0,0,.86,.72,4.2);
   part(g,box,palette[i],0,.12,0,8.8,.24,1.55);part(g,box,palette[i],0,.5,-2.95,3.2,.22,1);
   part(g,box,palette[i],0,.82,-2.85,.22,1.5,1.2);scene.add(g);return g;
 });
 const marker=new T.Group();part(marker,roof,'#ffc954',0,0,0,1.65,2.4,1.65).rotation.z=Math.PI;
 const ring=new T.Mesh(new T.RingGeometry(2.8,3.15,36),new T.MeshBasicMaterial({color:'#ffbd43',side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;scene.add(marker,ring);
 const party=new T.Group();for(let i=0;i<45;i++)part(party,box,palette[i%6],Math.sin(i*4.1)*12,2+i%13,Math.cos(i*3.4)*8,.36,.55,.2);
 party.position.set(places.pier.x,0,places.pier.z);scene.add(party);party.visible=false;
 const trail=new T.InstancedMesh(new T.CircleGeometry(.8,12),new T.MeshBasicMaterial({color:'#ffcf54',side:T.DoubleSide}),240);
 trail.rotation.x=-Math.PI/2;trail.renderOrder=10;trail.frustumCulled=false;trail.count=0;scene.add(trail);
 const trailMatrix=new T.Matrix4();let trailAnchor=null,trailGoal=null,trailDriving=null,trailEvents='',trailPlanned=-Infinity;
 let guidedMission=null,trailPath=null,trailWaypoint=null;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const incidentScene=createIncidentScene({scene,reduced,dynamicUsage:T.DynamicDrawUsage});
 let shiftTime=0,events=[],incidentKey='',observing=null,urgent=false,passAt=0,passes=0;
 const starSpots=starCandidates().filter(s=>!solidAt(s.x,s.z)&&!solidAt(s.x+1.5,s.z)&&!solidAt(s.x-1.5,s.z)&&!solidAt(s.x,s.z+1.5)&&!solidAt(s.x,s.z-1.5));
 const activityScene=createActivityScene({scene,person,label,races:RACES,stars:starSpots,reduced});
 let playState=()=>null;
 // Night lighting: a soft pool under every street lamp and a beam ahead of each car.
 const additive={transparent:true,depthWrite:false,blending:T.AdditiveBlending};
 const pools=new T.InstancedMesh(new T.CircleGeometry(7.5,20),new T.MeshBasicMaterial({color:'#ffcb7a',opacity:0,...additive}),lampSpots.length);
 const flatMatrix=new T.Matrix4(),flatTurn=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-Math.PI/2),unit=new T.Vector3(1,1,1);
 lampSpots.forEach(([x,z],i)=>pools.setMatrixAt(i,flatMatrix.compose(new T.Vector3(x-1.5,.52,z),flatTurn,unit)));pools.renderOrder=6;pools.visible=false;scene.add(pools);
 const beamTexture=(()=>{const c=document.createElement('canvas');c.width=64;c.height=128;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(32,118,2,32,70,74);g.addColorStop(0,'#fff6d8');g.addColorStop(.45,'#7d7558');g.addColorStop(1,'#000');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(22,128);ctx.lineTo(42,128);ctx.lineTo(64,0);ctx.lineTo(0,0);ctx.fill();const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;})();
 const beams=new T.InstancedMesh(new T.PlaneGeometry(9,20),new T.MeshBasicMaterial({map:beamTexture,opacity:0,...additive}),fleet.length+1);
 beams.frustumCulled=false;beams.renderOrder=7;beams.visible=false;scene.add(beams);
 const beamPose=new T.Object3D();beamPose.rotation.order='YXZ';
 const nightLight=new T.PointLight('#ffe2b0',0,46,1.4);scene.add(nightLight);
 // Rain falls in a column around the camera focus; the streaks wrap instead of respawning.
 const drops=new T.InstancedMesh(new T.BoxGeometry(.07,2.6,.07),new T.MeshBasicMaterial({color:'#e6f6ff',transparent:true,opacity:.5,depthWrite:false}),300);
 drops.frustumCulled=false;drops.count=0;drops.renderOrder=12;scene.add(drops);
 const dropPose=new T.Object3D();dropPose.rotation.z=.16;
 const flame=new T.Group();
 for(const side of [-1,1]){const f=part(flame,roof,'#ffb13d',side*.8,.9,-3.6,.34,1.5,.34);f.rotation.x=-Math.PI/2;f.material.emissive.set('#ff7a1a');f.material.emissiveIntensity=2.4;f.castShadow=false;}
 car.add(flame);flame.visible=false;
 // Visible garage upgrades: exhaust tips (engine), a reinforced bar (bumper) and coloured callipers (brakes).
 // Placed from the shell's own bounds, because every model has a different length and height.
 const kit=new T.Group();car.add(kit);
 const kitColor=['','#c9ced2','#e0473c','#f2b632'],chrome='#d6dadd';
 function upgradeParts(){
   for(const m of [...kit.children]){kit.remove(m);m.material.dispose();}
   const shell=car.userData.shell,t=upgradeTiers;if(!shell||!(t.engine||t.bumper||t.brakes))return;
   const saved=[car.position.clone(),car.rotation.clone(),car.scale.clone()];car.position.set(0,0,0);car.rotation.set(0,0,0);car.scale.set(1,1,1);
   car.updateMatrixWorld(true);const b=new T.Box3().setFromObject(shell);
   car.position.copy(saved[0]);car.rotation.copy(saved[1]);car.scale.copy(saved[2]);car.updateMatrixWorld(true);
   const w=(b.max.x-b.min.x)/2,low=b.min.y+.55;
   if(t.engine)for(const side of t.engine>1?[-1,1]:[1]){
     const tip=part(kit,tube,chrome,side*w*.45,low,b.min.z-.08,.24+.06*t.engine,.5,.24+.06*t.engine);tip.rotation.x=Math.PI/2;tip.material.metalness=.8;tip.material.roughness=.3;
   }
   if(t.bumper){part(kit,box,'#2b3138',0,low,b.max.z+.06,w*1.7,.34+.08*t.bumper,.22);if(t.bumper>2)part(kit,box,'#2b3138',0,low,b.min.z+.02,w*1.5,.3,.18);}
   if(t.brakes)for(const sx of [-1,1])for(const z of [b.max.z-.26*(b.max.z-b.min.z),b.min.z+.26*(b.max.z-b.min.z)])part(kit,box,kitColor[t.brakes],sx*(w-.1),.72,z,.06,.36,.42);
   for(const m of kit.children)m.castShadow=false;
 }
 car.userData.refit=upgradeParts;
 const dayColor=new T.Color(),rainSky=new T.Color('#8fa3ad');
 function applyAtmosphere(){
   const clock=active?shiftTime:0;
   if(Math.abs(clock-skyAt0)<.25)return;skyAt0=clock;sky=skyAt(clock);rain=active?rainAt(clock):0;
   scene.background.set(sky.sky).lerp(rainSky,rain*.55);scene.fog.color.set(sky.fog).lerp(rainSky,rain*.55);scene.fog.far=430-110*rain;
   hemi.color.set(dayColor.set('#fff6d7').lerp(new T.Color('#9fb4ea'),sky.glow));hemi.groundColor.set(sky.ground);// A strong sun over a weak fill gives real shade; the sky map adds the soft bounce in between.
   hemi.intensity=sky.ambient*(.2+.18*sky.glow)*(1-.18*rain);
   sun.color.set(sky.sunColor);sun.intensity=sky.sun*1.5*(1-.5*rain);
   scene.environmentIntensity=(.3+.16*(1-sky.glow))*(1-.2*rain);carReflectionStrength(.4+.6*(1-sky.glow));
   glowMaterial.emissiveIntensity=sky.glow*2.4;
   pools.visible=beams.visible=sky.glow>.05;pools.material.opacity=sky.glow*.3;beams.material.opacity=sky.glow*.5;
   shadowX=Infinity;
 }
 const sunDir=new T.Vector3(),sunRight=new T.Vector3(),sunUp=new T.Vector3(),sunAt=new T.Vector3(),worldUp=new T.Vector3(0,1,0);
 function moveShadow(cx,cz){
   const reach=(active?72:112)*(phone?1.12:1.45);
   if(reach!==shadowReach){shadowReach=reach;Object.assign(sun.shadow.camera,{left:-reach,right:reach,top:reach,bottom:-reach});sun.shadow.camera.updateProjectionMatrix();shadowX=Infinity;}
   if(cx===shadowX&&cz===shadowZ)return;shadowX=cx;shadowZ=cz;
   // Follow the camera in whole shadow-map texels, so shadow edges do not shimmer while driving.
   sunDir.copy(sky.sunDirection).normalize();sunRight.crossVectors(worldUp,sunDir).normalize();sunUp.crossVectors(sunDir,sunRight);
   const texel=2*reach/sun.shadow.mapSize.x,snap=axis=>Math.round((cx*axis.x+cz*axis.z)/texel)*texel;
   sunAt.set(0,0,0).addScaledVector(sunRight,snap(sunRight)).addScaledVector(sunUp,snap(sunUp)).addScaledVector(sunDir,cx*sunDir.x+cz*sunDir.z);
   sun.target.position.copy(sunAt);sun.position.copy(sunAt).addScaledVector(sunDir,230);
 }
 function drawWeather(cx,cz){
   const count=reduced?0:Math.floor(300*rain);drops.count=count;if(!count)return;
   for(let i=0;i<count;i++){
     const a=i*12.9898,b=i*78.233,fall=((a*7.3-time*(52+i%7*3))%64+64)%64;
     dropPose.position.set(cx+((Math.sin(a)*43758.5453)%1)*70+fall*.16-5,fall+1,cz+((Math.sin(b)*24634.6345)%1)*70);
     dropPose.updateMatrix();drops.setMatrixAt(i,dropPose.matrix);
   }
   drops.instanceMatrix.needsUpdate=true;
 }
 function drawBeams(){
   if(!beams.visible)return;let n=0;
   const add=(x,z,angle)=>{beamPose.position.set(x+Math.sin(angle)*12.6,.58,z+Math.cos(angle)*12.6);beamPose.rotation.set(-Math.PI/2,angle+Math.PI,0);beamPose.updateMatrix();beams.setMatrixAt(n++,beamPose.matrix);};
   if(active&&driving)add(px,pz,heading);
   for(const g of traffic)if(g!==occupied&&!g.userData.parked&&Math.abs(g.position.x-px)<150&&Math.abs(g.position.z-pz)<150)add(g.position.x,g.position.z,g.rotation.y);
   beams.count=n;beams.instanceMatrix.needsUpdate=true;
 }
 let viewX=.58,viewZ=.815,viewHeight=108,focusX=0,focusZ=0;
 let visHeading=0,turnLean=0,momentum=0,moving=false;
 const keys=new Set();let stick={x:0,z:0},px=places.home.x,pz=places.home.z+2,heading=0,time=0,destination=places.home,path=[],active=false,paused=false,driving=false,loaded=false,manual=false,jump=0,vy=0;
 const forward=new T.Vector3(-.58,0,-.815),right=new T.Vector3(.815,0,-.58);
 const dust=new T.Group();
 for(let i=0;i<9;i++)part(dust,ball,i%3?'#d5c4a5':'#ffb347',0,0,0,.2,.2,.2);
 scene.add(dust);dust.visible=false;
 let impactAge=1,impactPower=0,impactSide=0,impacts=0,yieldTime=0,blockedTime=0,replanAt=0,braking=false,brakeTicks=0;
 const contacts=new Set();
 // Roll-overs, loose parts and struck residents (city-crash-scene.js). Off with reduced motion.
 const crashFx=createCrashScene(T,scene,{box,tube,ball},{walkers,routes,locals,blocked});
 let kvx=0,kvz=0;
 // (tx,tz): unit direction of the player's motion relative to the car it meets.
 function impact(g,speed,tx,tz){
   if(contacts.has(g))return;
   const kick=crashKick(speed,tx,tz,px-g.position.x,pz-g.position.z),m=g.userData;
   contacts.add(g);impactAge=0;impactPower=kick.power;impacts++;
   // Against moving traffic the player's car bounces back and the other car is thrown along the hit, spun,
   // and stops for a moment. A parked car stays put (its saved spot must not drift), so there is no bounce either.
   if(!reduced&&!m.parked&&m.move){kvx=-tx*kick.bounce*perf.bounce;kvz=-tz*kick.bounce*perf.bounce;m.kvx=tx*kick.shove;m.kvz=tz*kick.shove;m.kw=kick.spin;m.hitAge=0;m.hitPower=kick.power;}
   if(m.move)m.stun=.4+kick.power;
   impactSide=Math.sign((g.position.x-px)*Math.cos(heading)-(g.position.z-pz)*Math.sin(heading));
   dust.position.set((px+g.position.x)/2,.6,(pz+g.position.z)/2);
   if(!reduced)crashFx.carHit(g,kick.power,tx,tz,dust.position,{fixed:!!m.parked||!m.move,heading});
   onImpact(kick.power);
 }
 // A wall, tree, pole or hedge stops the car. One report per contact; a hard hit throws debris.
 let sceneryContact=null,contactX=0,contactZ=0,sceneryHits=0,damage=0,objectHits=0;
 function sceneryImpact(o,speed,way){
   if(sceneryContact===o)return;sceneryContact=o;contactX=px;contactZ=pz;
   if(speed<3)return;
   const power=Math.min(1,Math.max(.25,speed/31)),sx=Math.sin(heading)*way,sz=Math.cos(heading)*way;
   impactAge=0;impactPower=power;impactSide=0;sceneryHits++;
   dust.position.set(px+sx*3,.6,pz+sz*3);
   if(speed>=8){damage++;if(!reduced)crashFx.wallHit(power,dust.position,sx,sz,paint||'#'+(car.userData.body?.material?.color?.getHexString?.()||'9aa3ab'));}
   onImpact(power,o.kind);
 }
 function resetObjects(){
   for(const o of loose)Object.assign(o,{x:o.homeX,z:o.homeZ,y:0,angle:0,vx:0,vz:0,vy:0,spin:0,moving:false});
   damage=objectHits=sceneryHits=0;sceneryContact=null;
 }
 // Residents on a walking circuit step to the side of a guided car coming up behind or toward them.
 function stepAside(dt){
   const guided=active&&driving&&path.length>0,sx=Math.sin(heading),sz=Math.cos(heading),decay=Math.exp(-dt*1.4);
   for(const g of walkers){
     const m=g.userData;if(m.hit)continue;
     const dx=g.position.x-px,dz=g.position.z-pz;
     if(guided&&Math.abs(dx)<12&&Math.abs(dz)<12){
       const ahead=dx*sx+dz*sz,side=dx*sz-dz*sx;
       if(ahead>-1&&ahead<11&&Math.abs(side)<3.2){
         const way=side<0?-1:1,nx=(m.sideX||0)+sz*way*dt*3,nz=(m.sideZ||0)-sx*way*dt*3;
         if(Math.hypot(nx,nz)<4&&!blocked(g.position.x-(m.sideX||0)+nx,g.position.z-(m.sideZ||0)+nz)){m.sideX=nx;m.sideZ=nz;}
         continue;
       }
     }
     if(m.sideX||m.sideZ){m.sideX*=decay;m.sideZ*=decay;if(Math.hypot(m.sideX,m.sideZ)<.02)m.sideX=m.sideZ=0;}
   }
 }
 function advanceTraffic(dt){
   for(const g of traffic){
     if(g===occupied||g.userData.parked){g.userData.vx=g.userData.vz=0;continue;}
     const m=g.userData,p=g.position,x=p.x,z=p.z,angle=g.rotation.y;
     // At a blocked junction, a driver already yielding can back up to clear the van's turn.
     const reversing=path.length&&m.reverseUntil>time;
     let pace=events.length?incidentTrafficAt(events,x,z,angle):1;
     // Brake behind a slow leader before reaching its bumper; the queue then drains from the front.
     if(!reversing&&events.length&&events.some(e=>Math.hypot(x-e.x,z-e.z)<48)){
       const sx=Math.sin(angle),sz=Math.cos(angle);
       for(const leader of traffic){
         if(leader===g)continue;
         const dx=leader.position.x-x,dz=leader.position.z-z,ahead=dx*sx+dz*sz;
         if(ahead>0&&ahead<13&&Math.abs(dx*sz-dz*sx)<2.6&&Math.cos(angle-leader.rotation.y)>.85)
           pace=Math.min(pace,Math.max(0,(ahead-7)/6));
       }
     }
     m.stun=Math.max(0,m.stun-dt);m.hitAge+=dt;
     const clockStep=m.stun?0:reversing?-dt*.65:dt*pace;
     // A hit car leaves its lane, then its driver steers back (critically damped spring on the lane position).
     const lane=crashFx.airborne(g)?.25:1;
     for(const [o,v] of [['kx','kvx'],['kz','kvz'],['kyaw','kw']]){m[v]-=(16*m[o]+8*m[v])*dt*lane;m[o]+=m[v]*dt;}
     m.move(m.clock+clockStep);
     p.x+=m.kx;p.z+=m.kz;g.rotation.y+=m.kyaw;
     g.rotation.x=m.hitAge<.6?Math.sin(m.hitAge*26)*Math.exp(-m.hitAge*7)*m.hitPower*.2:0;
     const hit=fleet.find(other=>{
       if(other===g)return false;
       const dx=other.position.x-x,dz=other.position.z-z;
       // Leave room ahead for a parked/queued driver to turn out, without blocking adjacent lanes.
       const following=dx*Math.sin(angle)+dz*Math.cos(angle)>0&&Math.abs(dx*Math.cos(angle)-dz*Math.sin(angle))<2.8;
       return sweptVehicleContact({x,z,angle},{x:p.x,z:p.z,angle:g.rotation.y},other,following ? .9 : .08);
     });
     if(hit){
       const cvx=p.x-x,cvz=p.z-z,cs=Math.hypot(cvx,cvz)||1;
       // Held where it was: keep that spot as its offset from the lane until the way clears.
       m.move(m.clock);m.kx=x-p.x;m.kz=z-p.z;m.kvx=m.kvz=0;
       p.set(x,0,z);g.rotation.y=angle;
       if(hit===occupied&&active&&driving){if(!path.length){
         // Strength comes from both cars' speeds: a head-on meeting is harder than this car's own pace.
         const rvx=Math.sin(heading)*driveSpeed-cvx/dt,rvz=Math.cos(heading)*driveSpeed-cvz/dt,rv=Math.hypot(rvx,rvz)||1,hx=x-px,hz=z-pz;
         impact(g,Math.max(cs/dt,(rvx*hx+rvz*hz)/Math.max(.01,Math.hypot(hx,hz))),rvx/rv,rvz/rv);
       }else if(yieldTime>.65&&!reversing)m.reverseUntil=time+2.5;}
     }else m.clock+=clockStep;
     const distance=(p.x-x)*Math.sin(g.rotation.y)+(p.z-z)*Math.cos(g.rotation.y);
     const steer=Math.abs(distance)>.001?Math.atan(3.8*headingDelta(angle,g.rotation.y)/distance):0;
     stepCarWheels(g,distance,steer,dt);
     m.vx=(p.x-x)/dt;m.vz=(p.z-z)/dt;
     if(impactAge>1&&!vansTouch(px,pz,heading,p.x,p.z,g.rotation.y,3))contacts.delete(g);
   }
 }
 function fit(){const h=active?(innerWidth<600?52:60):(innerWidth<600?98:128),w=h*innerWidth/innerHeight;camera.left=-w/2;camera.right=w/2;camera.top=h/2;camera.bottom=-h/2;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
 function position(x,z){px=x;pz=z;path=[];velocity=driveSpeed=0;}
 function roadPlan(x,z,extraBlock=()=>false){
   const start={x:px,z:pz},goal={x,z};
   const parkedObstacles=fleet.filter(g=>g!==occupied&&(parked.includes(g)||g.userData.parked)).map(g=>({x:g.position.x,z:g.position.z,r:Math.max(0,Math.min(7,Math.hypot(px-g.position.x,pz-g.position.z)-.1))}));
   const base=(x,z)=>blocked(x,z)||extraBlock(x,z)||parkedObstacles.some(p=>(x-p.x)**2+(z-p.z)**2<p.r*p.r);
   if(events.length){
     const route=drivingRoute(start,goal,(x,z)=>base(x,z)||incidentLaneBlocked(events,x,z));
     if(route)return route;
   }
   // If every approach is temporarily closed, keep the destination and wait at the cordon.
   return drivingRoute(start,goal,base);
 }
 function planRoute(x,z){
   if(!districtOpen(career,x,z))return null;
   if(driving){
     const obstruction=fleet.find(g=>g!==occupied&&(parked.includes(g)||g.userData.parked)&&Math.hypot(x-g.position.x,z-g.position.z)<7);
     const goals=obstruction?[[8,0],[-8,0],[0,8],[0,-8]].map(([dx,dz])=>({x:obstruction.position.x+dx,z:obstruction.position.z+dz})).filter(p=>!blocked(p.x,p.z)).sort((a,b)=>Math.hypot(a.x-px,a.z-pz)-Math.hypot(b.x-px,b.z-pz)):[{x,z}];
     for(const goal of goals){const route=roadPlan(goal.x,goal.z);if(route!==null)return route;}
     return null;
   }
   return findRoute({x:px,z:pz},{x,z},blocked,{step:2,radius:2,bound:CITY_EDGE});
 }
 function go(x,z){
   urgent=false;
   const route=planRoute(x,z);
   path=route||[];
   guidedMission=destination?.x===x&&destination.z===z?destination:null;
   if(driving&&route!==null)driveSpeed=0;
   return route!==null;
 }
 function updateTrail(){
   if(!active||!destination||Math.hypot(px-destination.x,pz-destination.z)<=4.3){trail.count=0;trailAnchor=null;return;}
   // Use the remaining waypoints of mission guidance, including any live traffic detour.
   const guidedPath=driving&&guidedMission===destination&&path.length?path:null;
   const waypoint=guidedPath?.[0]??null;
   const eventKey=events.map(e=>e.id+'-'+e.phase).join('|');
   const changed=trailGoal!==destination||trailDriving!==driving||trailEvents!==eventKey||trailPath!==guidedPath||trailWaypoint!==waypoint;
   if(!changed&&trailAnchor&&Math.hypot(px-trailAnchor.x,pz-trailAnchor.z)<4)return;
   if(!changed&&!guidedPath&&time-trailPlanned<.5)return;
   trailAnchor={x:px,z:pz};trailGoal=destination;trailDriving=driving;trailEvents=eventKey;trailPlanned=time;
   trailPath=guidedPath;trailWaypoint=waypoint;
   const route=guidedPath??planRoute(destination.x,destination.z);
   let count=0,previous=trailAnchor,until=3;
   for(const point of route||[]){
     const dx=point.x-previous.x,dz=point.z-previous.z,length=Math.hypot(dx,dz);
     for(;until<=length&&count<240;until+=4){
       // The mesh is rotated onto the ground, so its local y corresponds to world -z.
       trailMatrix.makeTranslation(previous.x+dx*until/length,-(previous.z+dz*until/length),.6);
       trail.setMatrixAt(count++,trailMatrix);
     }
     until-=length;previous=point;
   }
   trail.count=count;trail.instanceMatrix.needsUpdate=true;
 }
 function advanceEvents(dt){
   shiftTime+=dt;events=cityIncidentsAt(shiftTime);
   const key=events.map(e=>e.id+'-'+e.phase).join('|');
   if(key!==incidentKey&&driving&&path.length){
     const goal=path.at(-1),route=roadPlan(goal.x,goal.z);
     if(route)path=route;
   }
   incidentKey=key;
 }
 function incidentReports(){
   return events.map(e=>{
     const sx=Math.sin(e.heading),sz=Math.cos(e.heading);
     const queued=traffic.filter(g=>{
       const dx=g.position.x-e.lane.x,dz=g.position.z-e.lane.z,along=dx*sx+dz*sz;
       return along<0&&along>-45&&Math.abs(dx*sz-dz*sx)<2.6&&Math.cos(e.heading-g.rotation.y)>.85&&Math.hypot(g.userData.vx,g.userData.vz)<2;
     }).length;
     return {...e,queued};
   });
 }
 function frameIncident(dt){
   const e=events.find(e=>e.id===observing);
   let aimX=.58,aimZ=.815,height=driving&&moving&&momentum>.5?122:108,offsetX=0,offsetZ=0;
   if(e&&Math.hypot(px-e.observer.x,pz-e.observer.z)<9){
     // View from the safe shoulder, so the building across the road cannot hide the scene.
     const dx=e.observer.x-e.x,dz=e.observer.z-e.z,distance=Math.hypot(dx,dz)||1;
     aimX=dx/distance;aimZ=dz/distance;height=205;
     offsetX=(e.x-px)*.75;offsetZ=(e.z-pz)*.75;
   }
   const ease=reduced?1:1-Math.exp(-dt*4);
   viewX+=(aimX-viewX)*ease;viewZ+=(aimZ-viewZ)*ease;viewHeight+=(height-viewHeight)*ease;
   focusX+=(offsetX-focusX)*ease;focusZ+=(offsetZ-focusZ)*ease;
   const len=Math.hypot(viewX,viewZ)||1;
   forward.set(-viewX/len,0,-viewZ/len);right.set(viewZ/len,0,-viewX/len);
 }
 function update(dt,draw=true){
   const startX=px,startZ=pz,startHeading=heading,previousVelocity=velocity;
   let manualBrake=false,wheelSteering=null;
   if(!paused&&dt>0){time+=dt;impactAge+=dt;if(active)advanceEvents(dt);advanceTraffic(dt);
     if(!reduced){const struck=crashFx.step(dt,time,active&&driving?{x:px,z:pz,heading,speed:path.length?velocity:driveSpeed,guided:path.length>0}:null);if(struck)onImpact(struck);}}
   applyAtmosphere();
   for(const g of contacts)if(impactAge>1&&!vansTouch(px,pz,heading,g.position.x,g.position.z,g.rotation.y,3))contacts.delete(g);
   if(!paused)frameIncident(dt);
   braking=false;
   if(sceneryContact&&Math.hypot(px-contactX,pz-contactZ)>1.2)sceneryContact=null;
   if(!paused&&dt>0){
     for(const o of loose)stepObject(o,dt,objectBlocked);
     stepAside(dt);
   }
   if(active&&!paused){
     if(driving&&(kvx||kvz)){
       const nx=px+kvx*dt,nz=pz+kvz*dt,fade=Math.exp(-dt*12);
       if(clearSegment({x:px,z:pz},{x:nx,z:nz},blocked)&&!fleet.some(g=>g!==occupied&&sweptVehicleContact({x:px,z:pz,angle:heading},{x:nx,z:nz,angle:heading},g))){px=nx;pz=nz;}
       kvx*=fade;kvz*=fade;if(Math.hypot(kvx,kvz)<.2)kvx=kvz=0;
     }
     const keyX=Number(keys.has('ArrowRight')||keys.has('KeyD'))-Number(keys.has('ArrowLeft')||keys.has('KeyA'));
     const keyY=Number(keys.has('ArrowUp')||keys.has('KeyW'))-Number(keys.has('ArrowDown')||keys.has('KeyS'));
     const keyboardDirection=keyX!==0||keyY!==0;
     const useStick=!driving||(!keyboardDirection&&Math.hypot(stick.x,stick.z)>.12);
     const sx=keyX+(useStick?stick.x:0);
     const sy=keyY-(useStick?stick.z:0);
     let dx=sx*right.x+sy*forward.x,dz=sx*right.z+sy*forward.z;
     if(sx||sy){path=[];urgent=false;}
     while(path.length&&Math.hypot(path[0].x-px,path[0].z-pz)<.001){const reached=path.shift();px=reached.x;pz=reached.z;}
     if(path.length){dx=path[0].x-px;dz=path[0].z-pz;}
     const len=Math.hypot(dx,dz),guided=path.length>0;
     const manualCar=driving&&!guided;
     // Keyboard in a car is car-relative: Up/W always accelerates along the heading, Down/S brakes then reverses, Left/Right steer.
     const keyDrive=driving&&keyboardDirection,throttle=keyDrive?keyY!==0:len>.0001;
     manualBrake=manualCar&&keys.has('Space');
     const boostRequested=manualCar&&throttle&&!manualBrake&&(boost||keys.has('ShiftLeft')||keys.has('ShiftRight'));
     boostActive=boostRequested&&boostEnergy>0;
     if(throttle||(manualCar&&driveSpeed!==0)){
       const angle=keyDrive?heading:throttle?Math.atan2(dx,dz):driveAngle;
       let vehicleAngle=driving&&Math.cos(angle-heading)<-.35?heading:angle;
       let speed=driving?(CAR_SPEED[car.userData.brand]||31)*(manualCar?perf.speed:1):16;
       momentum=reduced?1:Math.min(1,momentum+dt/.4);
       moving=true;
       if(driving&&guided&&urgent)speed*=1.35;
       if(!manualCar)speed*=.3+.7*momentum;
       const limit=speed;
       if(boostActive)boostEnergy=Math.max(0,boostEnergy-dt/(3*perf.boostTime));
       if(driving&&guided){
         // Do not predict travel beyond the stopping point and brake for a car past our goal.
         const goal=path.at(-1),approachLimit=Math.min(speed,Math.max(.5,Math.hypot(goal.x-px,goal.z-pz)/.7));
         const ahead=safeSpeed(px,pz,angle,approachLimit,fleet.filter(g=>g!==occupied));
         const pace=events.length?incidentTrafficAt(events,px,pz,angle):1;
         speed=Math.min(ahead.speed,speed*pace);braking=speed<limit;
         if(braking&&dt>0)brakeTicks++;
         if(urgent&&ahead.obstruction&&time>=passAt){
           passAt=time+.5;
           const pass=ahead.obstruction.userData.move&&!ahead.obstruction.userData.parked&&overtakeRoute({x:px,z:pz},angle,ahead.obstruction,traffic.filter(g=>g!==occupied),(x,z)=>blocked(x,z)||incidentLaneBlocked(events,x,z));
           if(pass){

             // Stay on the current straight before merging into the remaining route.
             const next=path.find(p=>Math.hypot(p.x-px,p.z-pz)>20);
             if(next&&Math.abs((next.x-px)*dz/len-(next.z-pz)*dx/len)<4.5&&(next.x-px)*dx/len+(next.z-pz)*dz/len>Math.hypot(pass.at(-1).x-px,pass.at(-1).z-pz)+3){
               const rejoin=path.findIndex(p=>Math.hypot(p.x-px,p.z-pz)>Math.hypot(pass.at(-1).x-px,pass.at(-1).z-pz));
               if(rejoin>=0&&clearSegment(pass.at(-1),path[rejoin],blocked)){path=[...pass,...path.slice(rejoin)];speed=0;passes++;}
             }
           }
         }
         yieldTime=speed<4?yieldTime+dt:0;
         if(yieldTime>(urgent?.25:.9)&&time>=replanAt&&ahead.obstruction){
           replanAt=time+2;
           const p=ahead.obstruction.position;
           const clearance=Math.min(6,Math.hypot(px-p.x,pz-p.z)-.2);
           const goal=path.at(-1),detour=roadPlan(goal.x,goal.z,(x,z)=>Math.hypot(x-p.x,z-p.z)<clearance);
           if(detour?.length){path=detour;speed=0;yieldTime=0;}
         }
       }else yieldTime=0;
       // A guided car slows for a resident crossing ahead of it.
       if(driving&&guided)for(const g of walkers){
         const wx=g.position.x-px,wz=g.position.z-pz;if(g.userData.hit||Math.abs(wx)>13||Math.abs(wz)>13)continue;
         const sin=Math.sin(angle),cos=Math.cos(angle),ahead=wx*sin+wz*cos;
         if(ahead>0&&ahead<12&&Math.abs(wx*cos-wz*sin)<2.7){speed=Math.min(speed,Math.max(2,(ahead-4)*3));braking=true;}
       }
       let nx=px,nz=pz;
       if(manualCar){
         // Each model has its own handling (CAR_HANDLING), upgrades multiply it. The car swings toward the stick
         // at its turn rate. Asking for the way behind while slow, or while already backing, reverses with the
         // body kept straight as before; asking forward while still rolling back brakes first.
         const hand=CAR_HANDLING[car.userData.brand]||CAR_HANDLING.toyota;
         const backing=driveSpeed>0&&Math.cos(driveAngle-heading)<-.35,behind=throttle&&Math.cos(angle-heading)<-.35;
         const common={throttle:Math.min(1,len),steering:wheelSteering??0,speed:driveSpeed,limit:speed*(boostActive?1.65:1),brake:manualBrake,boost:boostActive,dt,
           grip:tyreGrip(gripAt(rain),{rainLoss:perf.rainLoss/hand.grip}),accel:perf.accel*hand.accel,brakeForce:perf.brake*hand.brake};
         let travel;
         if(keyDrive){
           // sideSign: which way positive yaw turns toward screen-right when the car faces up the screen.
           const sideSign=Math.sign(headingDelta(Math.atan2(forward.x,forward.z),Math.atan2(right.x,right.z)))||1;
           travel=keyboardDrive({...common,heading,keyX,keyY,sideSign,turn:hand.turn});
           vehicleAngle=driveAngle=travel.heading;
         }
         else if(!throttle||behind&&(backing||driveSpeed<3)){travel=manualDrive({...common,heading:angle});driveAngle=angle;}
         else if(backing&&driveSpeed>=1.5){travel=manualDrive({...common,heading:driveAngle,throttle:0,brake:true});vehicleAngle=heading;}
         else{travel=manualDrive({...common,heading,aim:angle,turnRate:hand.turn});vehicleAngle=driveAngle=travel.heading;}
         nx+=travel.dx;nz+=travel.dz;driveSpeed=travel.speed;
       }else{
         const step=Math.min(guided?len:Infinity,speed*dt);
         nx+=dx/len*step;nz+=dz/len*step;
       }
       const hit=driving&&fleet.find(g=>g!==occupied&&sweptVehicleContact({x:px,z:pz,angle:heading},{x:nx,z:nz,angle:vehicleAngle},g));
       const cordon=driving&&incidentLaneBlocked(events,nx,nz)&&!incidentLaneBlocked(events,px,pz);
       if(cordon){braking=true;}
       else if(hit){
         if(guided){
           // Held bumper to bumper while guided: the look-ahead cannot see this contact when the car
           // is backing out, so ask the other driver to back off, then plan around a car that stays.
           braking=true;blockedTime+=dt;
           if(blockedTime>1&&hit.userData.move&&!hit.userData.parked&&!(hit.userData.reverseUntil>time))hit.userData.reverseUntil=time+2.5;
           if(blockedTime>4&&time>=replanAt){
             replanAt=time+2;const p=hit.position,goal=path.at(-1),clearance=Math.min(6,Math.hypot(px-p.x,pz-p.z)-.2);
             const detour=roadPlan(goal.x,goal.z,(x,z)=>Math.hypot(x-p.x,z-p.z)<clearance);
             if(detour?.length){path=detour;blockedTime=0;}
           }
         }
         else if(dt>0){
           const hx=hit.position.x-px,hz=hit.position.z-pz;
           const closing=(((nx-px)/dt-(hit.userData.vx||0))*hx+((nz-pz)/dt-(hit.userData.vz||0))*hz)/Math.max(.01,Math.hypot(hx,hz));
           const rvx=(nx-px)/dt-(hit.userData.vx||0),rvz=(nz-pz)/dt-(hit.userData.vz||0),rv=Math.hypot(rvx,rvz)||1;
           impact(hit,Math.max(0,closing),rvx/rv,rvz/rv);
         }
       }
       else if(guided){if(clearSegment({x:px,z:pz},{x:nx,z:nz},blocked)){px=nx;pz=nz;}else path=[];}
       else if(driving){
         // The whole body stops at scenery. A car already against it may still slide along or back away.
         const wall=fixedTouch(nx,nz,vehicleAngle);
         if(wall&&gapTo(wall,nx,nz)<gapTo(wall,px,pz)-1e-6)sceneryImpact(wall,Math.abs(driveSpeed),Math.sign(driveSpeed)||1);
         else if(clearSegment({x:px,z:pz},{x:nx,z:nz},blocked)){px=nx;pz=nz;}
       }else{if(!blocked(nx,pz))px=nx;if(!blocked(px,nz))pz=nz;}
       // Loose street furniture in the car's way is knocked along its direction of travel.
       if(driving&&(px!==startX||pz!==startZ)){
         const mx=px-startX,mz=pz-startZ,pace=dt>0?Math.hypot(mx,mz)/dt:0;
         for(const o of loose){
           if(Math.abs(o.x-px)>6||Math.abs(o.z-pz)>6||!sceneryTouch(px,pz,vehicleAngle,o))continue;
           if(!o.moving){objectHits++;if(!guided)onImpact(Math.min(.3,.1+pace/90),'object');}
           kickObject(o,mx,mz,Math.max(6,pace));
           if(!objectBlocked(o.x+mx,o.z+mz,o)){o.x+=mx;o.z+=mz;}
         }
       }
       const moved=px!==startX||pz!==startZ;
       if(moved)blockedTime=0;
       if(manualCar&&!moved&&dt>0)driveSpeed=0;
       if(!hit&&!cordon&&(!manualCar||moved))heading=vehicleAngle;
     }
     if(!manualCar)driveSpeed=0;
     moving=manualCar?driveSpeed!==0:throttle;
     if(!moving)momentum=0;
     if(!boostRequested)boostEnergy=Math.min(1,boostEnergy+dt*perf.recharge/5);
     velocity=dt>0?(manualCar?Math.abs(driveSpeed):driving?Math.hypot(px-startX,pz-startZ)/dt:0):previousVelocity;
     vy-=20*dt;jump=Math.max(0,jump+vy*dt);if(!jump)vy=0;onMove(px,pz,dt,{driving,speed:velocity,guided:path.length>0});
   }
   if(dt>0){
     let diff=Math.atan2(Math.sin(heading-visHeading),Math.cos(heading-visHeading));
     const turn=reduced?1:1-Math.exp(-dt*12);visHeading+=diff*turn;
     turnLean+=((reduced?0:Math.max(-.14,Math.min(.14,diff*.22)))-turnLean)*Math.min(1,dt*10);
   }else{visHeading=heading;turnLean=0;}
   if(driving&&!paused){
     const middleHeading=startHeading+headingDelta(startHeading,heading)/2;
     const distance=(px-startX)*Math.sin(middleHeading)+(pz-startZ)*Math.cos(middleHeading);
     const steer=wheelSteering??(Math.abs(distance)>.001?Math.atan(3.8*headingDelta(startHeading,heading)/distance):0);
     stepCarWheels(car.userData.shell,distance,steer,dt);
     if(draw)poseCarWheels(car.userData.shell);
   }
   if(!path.length)urgent=false;
   animateRunner(dt,Math.hypot(px-startX,pz-startZ));
   const bob=!reduced&&moving&&!driving&&!jump?Math.abs(Math.sin(time*14))*.32:0;
   avatar.position.set(px,jump+bob,pz);avatar.rotation.y=visHeading;avatar.visible=active&&!driving;
   car.position.set(driving?px:px+3.6,0,driving?pz:pz+2);car.rotation.y=heading;car.visible=active&&driving;
   const rebound=!reduced&&impactAge<.55?Math.sin(impactAge*26)*Math.exp(-impactAge*7)*impactPower:0;
   dust.visible=car.visible&&!reduced&&impactAge<.38;
   if(dust.visible)dust.children.forEach((p,i)=>{
     const spread=(.4+impactPower)*impactAge*4;
     p.position.set(Math.sin(i*2.4)*spread,impactAge*(1+i%2),Math.cos(i*2.4)*spread);
     p.scale.setScalar((.19+.25*impactPower)*(1-impactAge/.38));
   });
   car.rotation.x=rebound*.18;car.rotation.z=-rebound*impactSide*.13-(driving?turnLean:0);car.position.y=Math.abs(rebound)*.3;crashFx.posePlayer(car);
   fitClassicGear(car.userData.shell.userData.anchors);
   fitCarGear(time);
   const glow=driving&&(manualBrake||braking||impactAge<.3||(!moving&&momentum===0))?2.8:.8;
   if(car.userData.glow!==glow){car.userData.glow=glow;for(const m of car.userData.shell?.children||[])if(m.userData.tail)m.material.emissiveIntensity=glow;}
   parcel.visible=active&&loaded;parcel.position.set(px+(driving?0:Math.sin(heading)),driving?3.9:2.1+jump,pz+(driving?0:Math.cos(heading)));
   updateTrail();
   marker.visible=ring.visible=active&&!!destination;
   if(destination){marker.position.set(destination.x,6+(reduced?0:Math.sin(time*3)*.5),destination.z);marker.rotation.y=time*.65;ring.position.set(destination.x,.5,destination.z);}
   for(const {gate,sign,x,z} of gateSigns)gate.visible=sign.visible=active&&!districtOpen(career,x===222?225:x,z===-222?-225:z);
   if(occupied){occupied.position.set(px,0,pz);occupied.rotation.y=heading;}
   if(draw){renderObjects();moveStreetActors();incidentScene.update(events,shiftTime,traffic);activityScene.update(time,active?playState():null);drawBeams();}
   flame.visible=driving&&boostActive&&!reduced;if(flame.visible)flame.scale.z=.8+Math.sin(time*60)*.25;
   planes.forEach((g,i)=>{
     const angle=time*(.053+i*.007)+i*2;
     g.position.set(-16+Math.sin(angle)*105,30+i*3,18+Math.cos(angle)*62+i*12);
     g.rotation.y=Math.atan2(Math.cos(angle)*105,-Math.sin(angle)*62);
   });
   if(drone.visible){
     const trail=driving?4.1:2.3, x=px-Math.sin(heading)*trail+1.2,z=pz-Math.cos(heading)*trail;
     drone.position.set(x,4.8+jump+(reduced?0:Math.sin(time*3)*.2),z);
     drone.rotation.y=destination?Math.atan2(destination.x-x,destination.z-z):heading;
   }
   locals.forEach((g,i)=>{if(!reduced)g.rotation.y=.5+Math.sin(time*.45+i)*.25;});
   if(party.visible&&!reduced)party.children.forEach((m,i)=>{m.position.y=2+(i+time*3)%13;m.rotation.z=time+i;});
   const cx=active?px+focusX:places.home.x+6,cz=active?pz+focusZ:places.home.z-13;
   const shake=!reduced&&active&&impactAge<.5?impactPower*Math.exp(-impactAge*9)*1.8:0;
   camera.position.set(cx+(active?viewX*152:88)+Math.sin(time*83)*shake,(active?viewHeight:92)+Math.cos(time*67)*shake,cz+(active?viewZ*152:124));camera.lookAt(cx,1,cz);
   // Pull the view back as the car gathers speed, so fast streets stay readable.
   const zoomGoal=active&&driving&&!reduced?1-.24*Math.min(1,velocity/58):1;
   if(Math.abs(zoomGoal-camera.zoom)>.001){camera.zoom+=(zoomGoal-camera.zoom)*(dt>0?Math.min(1,dt*2.2):1);camera.updateProjectionMatrix();}
   moveShadow(cx,cz);drawWeather(cx,cz);
   // Roads get wet quickly and dry slowly; the sea keeps moving.
   const wet=surfaceUniforms.uWet,wetGoal=Math.min(1,rain*1.6);wet.value+=(wetGoal-wet.value)*Math.min(1,dt*(wetGoal>wet.value?.9:.06));
   surfaceUniforms.uTime.value=reduced?0:time;
   nightLight.intensity=active?sky.glow*(driving?150:90):0;nightLight.position.set(px+Math.sin(heading)*(driving?7:1.5),driving?5:6,pz+Math.cos(heading)*(driving?7:1.5));
   if(draw)renderer.render(scene,camera);
 }
 // Phones that cannot hold the frame rate give up sharpness first, then shadow detail, and shadows last.
 let slowFrames=0,sampled=0,quality=3;
 function watchFrameRate(ms){
   if(document.hidden||ms>400)return;sampled++;if(ms>30)slowFrames++;
   if(sampled<150)return;
   if(slowFrames>90&&quality>0){
     quality--;
     if(quality===2)renderer.setPixelRatio(Math.min(fullRatio,1.4));
     else if(quality===1){sun.shadow.mapSize.set(1024,1024);sun.shadow.map?.dispose();sun.shadow.map=null;shadowReach=0;}
     else{sun.castShadow=false;renderer.setPixelRatio(1);}
   }
   sampled=slowFrames=0;
 }
 let last=performance.now();function frame(now){if(!manual){watchFrameRate(now-last);update(Math.max(0,Math.min(.05,(now-last)/1000)));}last=now;requestAnimationFrame(frame);}fit();requestAnimationFrame(frame);
 addEventListener('resize',fit);
 const movementKeys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD','Space','ShiftLeft','ShiftRight'];
 addEventListener('keydown',e=>{if(!active||paused||!movementKeys.includes(e.code))return;e.preventDefault();keys.add(e.code);if(e.code==='Space'&&!jump&&!driving)vy=8;});addEventListener('keyup',e=>keys.delete(e.code));
 addEventListener('blur',()=>{keys.clear();stick={x:0,z:0};});
 const ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),0);
 renderer.domElement.addEventListener('pointerup',e=>{if(!active||paused)return;ray.setFromCamera(new T.Vector2(2*e.clientX/innerWidth-1,1-2*e.clientY/innerHeight),camera);const hit=new T.Vector3();if(ray.ray.intersectPlane(plane,hit)&&!blocked(hit.x,hit.z))go(hit.x,hit.z);});
 return {carName:()=>CAR_BRANDS[car.userData.brand].name,
   // The car the garage preview shows: the one being driven, else the nearest, else the last one driven.
   // Bought paint follows the player into every car, so the preview wears it too.
   garageCar:()=>{const g=(driving?null:nearbyCar())||car.userData.shell;return {brand:g.userData.brand,paint:paint||'#'+g.children[0].material.color.getHexString()};},
   setCareer(v){career=v;activityScene.setOpen((x,z)=>districtOpen(career,x,z));},seekCar(id){desiredCar=id;},fleetState,restoreFleet,toggleVehicle,
   nearbyVehicle:()=>vehicleInfo(nearbyCar()),
   vehicles:()=>fleet.map(vehicleInfo),
   drivingState:()=>({vehicle:vehicleInfo(occupied),maxSpeed:Math.round((CAR_SPEED[car.userData.brand]||0)*3.6),speed:Math.round(velocity*3.6),wheelRoll:car.userData.shell.userData.wheelRoll,frontSteer:car.userData.shell.userData.wheelSteer,boost:Math.round(boostEnergy*100),boosting:boostActive,topSpeed:Math.round((CAR_SPEED[car.userData.brand]||0)*perf.speed*3.6),upgrades:{...upgradeTiers}}),
   setUpgrades(tiers){upgradeTiers={...tiers};perf=carStats(tiers);upgradeParts();},
   setBoost(v){boost=v;},setBrake(v){if(v)keys.add('Space');else keys.delete('Space');},
   outfit(color,gear,role,nextPaint=null){
     if(nextPaint!==paint){paint=nextPaint;setCar(car.userData.brand,car.userData.shell.userData);}
     const jacket=gear.includes('jacket')?'#9236ab':color;
     for(const i of [0,4,7])avatar.children[i].material.color.set(jacket);
     for(const [id,mesh] of Object.entries(accessories))mesh.visible=gear.includes(id);
     for(const [id,mesh] of Object.entries(extras))mesh.visible=gear.includes(id);
     crown.position.y=cap.visible||gear.includes('cap')?.28:0;
     const kicks=gear.includes('kicks');for(const r of limbs){r.shoe.material.color.set(kicks?'#f5f7fa':'#202c35');r.shoe.material.emissive.set(kicks?'#ff3d9a':'#000000');r.shoe.material.emissiveIntensity=kicks?.45:0;}
     cap.visible=gear.includes('cap');drone.visible=gear.includes('drone');update(0);
   },life(){
     const point=g=>[g.position.x,g.position.z].map(n=>Number(n.toFixed(2)));
     return {trailDots:trail.count,shiftTime:Math.round(shiftTime*100)/100,events:incidentReports().map(({id,type,phase,x,z,observer,queued})=>({id,type,phase,x,z,observer,queued})),cars:traffic.length,residents:walkers.length,planes:planes.length,impacts,crash:crashFx.stats(),urgent,passes,damage,sceneryHits,objectHits,objects:loose.filter(o=>Math.hypot(o.x-px,o.z-pz)<24).slice(0,8).map(({kind,x,z,moving})=>({kind,x,z,moving})),brakeTicks,impactVisible:dust.visible,knock:Number(Math.max(...traffic.map(g=>Math.hypot(g.userData.kx,g.userData.kz))).toFixed(2)),car:point(traffic[0]),walker:point(walkers[0]),plane:point(planes[0]),assistant:drone.visible?point(drone):null};
   },respondTo(event){
     // Urgent driving needs a car; on foot the player is simply led to the lookout.
     if(!go(event.observer.x,event.observer.z))return false;
     observing=event.id;urgent=driving;return true;
   },observe(id){observing=id;},events:incidentReports,yielding:()=>braking,start(x,z,elapsed=0){resetObjects();urgent=false;passes=0;shiftTime=elapsed;events=cityIncidentsAt(shiftTime);observing=events.find(e=>Math.hypot(e.observer.x-x,e.observer.z-z)<4)?.id||null;viewX=.58;viewZ=.815;viewHeight=108;focusX=focusZ=0;incidentKey='';impactAge=1;impacts=brakeTicks=yieldTime=replanAt=kvx=kvz=0;contacts.clear();position(x,z);active=true;manual=false;fit();},position,go,stop(){path=[];urgent=false;velocity=driveSpeed=0;},setPaused(v){paused=v;boost=boostActive=false;keys.clear();stick={x:0,z:0};},setStick(x,z){stick={x,z};},cargo(v){loaded=v;},target(p){destination=p;},celebrate(){party.visible=true;},reset(){events=[];shiftTime=0;drone.visible=false;active=false;party.visible=false;paused=false;path=[];fit();},jump(){if(!driving&&!jump)vy=8;},moving:()=>path.length>0,
   pose:()=>({x:px,z:pz,heading}),solidAt,stars:()=>starSpots,setPlay(read){playState=read;},openChanged(){activityScene.setOpen((x,z)=>districtOpen(career,x,z));},
   atmosphere:()=>({clock:clockLabel(shiftTime),hour:sky.hour,night:sky.night,glow:sky.glow,rain,shadows:sun.castShadow,quality}),
   // Work done for the last frame, shadow pass included; used by the browser checks.
   renderStats:()=>({calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,pixelRatio:renderer.getPixelRatio()}),
   getPlayer:()=>({x:px,z:pz,y:jump,gait:{amount:runAmount,phase:runDistance,poses:runningPose(runDistance,runAmount),limbs:limbs.map(r=>({leg:r.leg.rotation.x,shin:r.shin.rotation.x,arm:r.arm.rotation.x,forearm:r.forearm.rotation.x}))}}),project(p){const v=new T.Vector3(p.x,6,p.z).project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2,visible:Math.abs(v.x)<.9&&Math.abs(v.y)<.85};},
   advance(ms){manual=true;for(let t=0;t<Math.min(ms,90000);t+=1000/60)update(1/60,false);update(0);},get pixelRatio(){return renderer.getPixelRatio();}};
}
