import * as T from 'three';
import {places,inCity,CITY_EDGE} from './city-data.js';
import {drawCityGroundAndRoads,drawOuterDistricts,drawDistrictLandmark} from './city-districts.js';
import {cityIncidentsAt,incidentTrafficAt,incidentLaneBlocked} from './city-incidents.js';
import {createIncidentScene} from './city-incident-scene.js';
import {vansTouch,safeSpeed} from './city-traffic.js';
import {drivingRoute} from './city-roads.js';
import {findRoute,clearSegment} from './navigation.js';

export function cityWorld(host,onMove,onImpact){
 const scene=new T.Scene();scene.background=new T.Color('#a8dce2');scene.fog=new T.Fog('#b8e1df',225,430);
 const renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));host.append(renderer.domElement);
 const camera=new T.OrthographicCamera(-1,1,1,-1,.1,650);
 const hemi=new T.HemisphereLight('#fff6d7','#819b9a',2.3);scene.add(hemi);
 const sun=new T.DirectionalLight('#ffe5bf',2.1);sun.position.set(-65,110,50);scene.add(sun);
 const box=new T.BoxGeometry(1,1,1),ball=new T.IcosahedronGeometry(1,1),roof=new T.ConeGeometry(1,1,4),tube=new T.CylinderGeometry(1,1,1,12);
 const material=new T.MeshStandardMaterial({roughness:.87,flatShading:true});
 const batches=new Map(),obstacles=[];
 function prop(shape,color,x,y,z,w,h,d,ry=0){
   if(!batches.has(shape))batches.set(shape,[]);
   const matrix=new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),ry),new T.Vector3(w,h,d));
   batches.get(shape).push([matrix,color]);
 }
 const block=(...args)=>prop(box,...args);
 function solid(x,z,w,d){obstacles.push({x,z,w:w/2+.7,d:d/2+.7});}
 function blocked(x,z){return !inCity(x,z)||obstacles.some(o=>Math.abs(x-o.x)<o.w&&Math.abs(z-o.z)<o.d);}
 function tree(x,z,c='#6bb789'){
   block('#856e54',x,2,z,.9,4,.9);prop(ball,c,x,5.5,z,3.4,4.3,3.3);prop(ball,'#91c489',x-1.6,5,z+1,2.2,2.8,2.4);
 }
 function label(text,x,y,z,width,bg='#245552'){
   const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d');
   ctx.fillStyle=bg;ctx.fillRect(0,0,512,96);ctx.fillStyle='#fff9df';ctx.font='bold 52px Arial';ctx.textAlign='center';ctx.direction='rtl';ctx.fillText(text,256,64,485);
   const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;
   const m=new T.Mesh(new T.PlaneGeometry(width,width*96/512),new T.MeshBasicMaterial({map:texture,side:T.DoubleSide}));m.position.set(x,y,z);scene.add(m);
 }
 drawCityGroundAndRoads(block);
 const palette=['#dfa186','#edc080','#8fb6bd','#af9fbb','#e9ad9c','#90bead'];
 function windows(x,y,z,w,count){
   for(let i=0;i<count;i++){const wx=x-w/2+(i+.5)*w/count;block('#fff1d1',wx,y,z,2.65,2.7,.24);block('#638c9d',wx,y+.1,z+.16,2.16,2.14,.12);}
 }
 function house(x,z,c,w=11,h=6){
   block('#e2dcc4',x,.24,z,w+3,.4,12);block(c,x,h/2,z,w,h,9);
   prop(roof,'#b06557',x,h+1.75,z,(w+2)*.72,3.5,8,.785);
   windows(x,h*.58,z+4.55,w,3);block('#37636b',x,1.5,z+4.7,1.7,3,.45);
   solid(x,z,w,9);
 }
 for(let ix=-4;ix<=3;ix++)for(let iz=-4;iz<=2;iz++){
   const x=ix*56+27,z=iz*56+27,id=(ix+4)*7+iz+4;
   if(Object.values(places).some(p=>Math.hypot(x-p.x,z-p.z)<28))continue;
   if(id%5===0){for(let k=0;k<4;k++)tree(x-9+(k%2)*16,z-8+Math.floor(k/2)*16);continue;}
   if(x<-80||z<-110){house(x-7,z,palette[id%6]);house(x+10,z-9,palette[(id+2)%6],9,5);}
   else{const h=10+(id%4)*5;block(palette[id%6],x,h/2,z,17,h,13);solid(x,z,17,13);block('#fff0cd',x,h,z,18,1,14);for(let y=3;y<h;y+=4)windows(x,y,z+6.6,17,4);}
   tree(x+15,z+12);
   block('#e6d9b7',x,.22,z+17,3,.12,14);block('#75aa77',x-10,.95,z+13,8,1.8,1.8);
   block('#a78160',x+8,1.05,z+19,3,.38,1);for(const dx of [7,9])block('#465e63',x+dx,.55,z+19,.22,1,.65);
   if(id%3!==0){const vx=ix*56+3,vz=iz*56+21;
     block(palette[(id+3)%6],vx,.94,vz,2.6,1.2,4.6);block('#557789',vx,1.82,vz-.2,2.25,.85,2.6);
   }
 }
 drawOuterDistricts({block,prop,ball,tube,solid,tree,house,windows});
 for(const p of Object.values(places)){
   const x=p.x,z=p.z-11;
   block('#f3dfb4',x,.26,p.z,17,.45,8);
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
     const h=p.kind==='clinic'?13:9;block(p.color,x,h/2,z,18,h,12);solid(x,z,18,12);
     block('#fff0ce',x,h,z,19,1,13);windows(x,h-2.4,z+6.1,18,4);
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
 for(let i=0;i<28;i++){const x=-230+i*17;block('#c4efdf',x,.15,202+(i%5)*6,4+(i%4)*2,.1,.4);}
 // Boardwalk booths, awnings and moored sailboats give the seafront its own silhouette.
 for(let i=0;i<8;i++){
   const x=-82+i*22;if(Math.abs(x-places.pier.x)<8)continue;block('#e6be87',x,1.25,160,5,2.5,4);
   for(let j=0;j<5;j++)block(j%2?'#fff3d4':palette[i%6],x-2+j,3.5,160,1,.5,5.6);
 }
 for(let i=0;i<9;i++){
   const x=-186+i*43,z=202+(i%3)*7;prop(ball,palette[i%6],x,.65,z,2.7,.9,6);
   block('#835f49',x,4,z,.23,7,.23);prop(roof,'#fff1c5',x+1.2,4.6,z,2.4,5.5,.3);
 }
 for(const [shape,instances] of batches){
   const batch=new T.InstancedMesh(shape,material,instances.length);
   instances.forEach(([matrix,c],i)=>{batch.setMatrixAt(i,matrix);batch.setColorAt(i,new T.Color(c));});scene.add(batch);
 }
 function part(g,shape,c,x,y,z,w,h,d){
   const m=new T.Mesh(shape,new T.MeshStandardMaterial({color:c,roughness:.78,flatShading:true}));m.position.set(x,y,z);m.scale.set(w,h,d);g.add(m);return m;
 }
 function person(color){
   const g=new T.Group();part(g,box,color,0,2.15,0,1.6,1.6,.88);part(g,box,'#ce976e',0,3.55,0,1.22,1.18,1.05);
   part(g,box,'#514b51',0,4.13,-.05,1.3,.36,1.1);
   for(const side of [-1,1]){part(g,box,'#364d62',side*.44,.8,0,.64,1.55,.7);part(g,box,color,side*1.03,2.1,0,.43,1.35,.66);part(g,box,'#313e45',side*.26,3.65,.54,.13,.15,.05);}
   return g;
 }
 function van(c){
   const g=new T.Group();part(g,box,c,0,1.26,0,3.6,1.45,6);part(g,box,'#fff3d5',0,2.66,-.42,3.15,1.65,3.7);
   part(g,box,'#577d8e',0,2.7,1.46,2.85,1.12,.12);
   for(const side of [-1,1]){
     part(g,box,'#577d8e',side*1.61,2.75,-.35,.12,.95,2.5);
     for(const z of [-1.88,1.88])part(g,box,'#33464a',side*1.82,.69,z,.46,1.18,1.15);
     part(g,box,'#ffe6a9',side*1.15,1.35,3.04,.7,.45,.12);
   }return g;
 }
 const avatar=person('#df745d'),car=van('#e99943'),parcel=new T.Group();
 part(parcel,box,'#ffe0a1',0,0,0,1.2,1.05,1);part(parcel,box,'#bc7950',0,.54,0,.2,.08,1.05);scene.add(avatar,car,parcel);
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
 function addTraffic(x,z,speed,offset){
   const g=van(palette[traffic.length%6]);traffic.push(g);
   g.userData.move=circuit(g,x+2,z+2,52,speed,offset);
   Object.assign(g.userData,{clock:0,vx:0,vz:0});g.userData.move(0);
 }
 function addResident(x,z,i){
   const g=person(palette[i%6]);walkers.push(g);routes.push(circuit(g,x+5,z+5,46,1.6+i%3*.25,i*7,2+i%3));
 }
 for(let i=0;i<20;i++)addTraffic(((i%5)-2)*56,(Math.floor(i/5)-2)*56,6+i%3,i*4.1);
 for(let i=0;i<32;i++)addResident((i%8-4)*56,(Math.floor(i/8)-2)*56,i);
 // Work traffic circulates between the docks, repair yards and the northern station.
 for(const [x,z,count] of [[280,-56,3],[280,56,4],[280,112,3],[-168,-336,2],[56,-336,2],[-56,-280,1],[168,56,2]]){
   for(let i=0;i<count;i++)addTraffic(x,z,7,i*28/count);
   addResident(x,z,walkers.length);addResident(x,z,walkers.length);
 }
 // All street actors use box parts. Batch their transforms into one draw call on phones.
 const actors=[...traffic,...walkers];
 const ambient=new T.InstancedMesh(box,material,actors.reduce((n,g)=>n+g.children.length,0));
 ambient.instanceMatrix.setUsage(T.DynamicDrawUsage);ambient.frustumCulled=false;
 let ambientIndex=0;
 for(const g of actors)for(const m of g.children){
   m.updateMatrix();ambient.setColorAt(ambientIndex++,m.material.color);m.material.dispose();
 }
 scene.add(ambient);
 const transform=new T.Matrix4();
 function moveStreetActors(){
   routes.forEach((move,i)=>{
     move(time);
     const g=walkers[i];
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
   });
   let index=0;
   for(const g of actors){
     g.updateMatrix();
     for(const m of g.children)ambient.setMatrixAt(index++,transform.multiplyMatrices(g.matrix,m.matrix));
   }
   ambient.instanceMatrix.needsUpdate=true;
 }
 // Residents at handoff locations stay close enough to receive the cargo.
 const locals=Object.values(places).map((p,i)=>{const g=person(palette[i%6]);g.position.set(p.x+3,0,p.z-1);scene.add(g);return g;});
 const planes=Array.from({length:3},(_,i)=>{
   const g=new T.Group();part(g,ball,'#fff3ce',0,0,0,.86,.72,4.2);
   part(g,box,palette[i],0,.12,0,8.8,.24,1.55);part(g,box,palette[i],0,.5,-2.95,3.2,.22,1);
   part(g,box,palette[i],0,.82,-2.85,.22,1.5,1.2);scene.add(g);return g;
 });
 const marker=new T.Group();part(marker,roof,'#ffc954',0,0,0,1.65,2.4,1.65).rotation.z=Math.PI;
 const ring=new T.Mesh(new T.RingGeometry(2.8,3.15,36),new T.MeshBasicMaterial({color:'#ffbd43',side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;scene.add(marker,ring);
 const party=new T.Group();for(let i=0;i<45;i++)part(party,box,palette[i%6],Math.sin(i*4.1)*12,2+i%13,Math.cos(i*3.4)*8,.36,.55,.2);
 party.position.set(places.pier.x,0,places.pier.z);scene.add(party);party.visible=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const incidentScene=createIncidentScene({scene,reduced,dynamicUsage:T.DynamicDrawUsage});
 let shiftTime=0,events=[],incidentKey='',observing=null;
 let viewX=.58,viewZ=.815,viewHeight=108,focusX=0,focusZ=0;
 const keys=new Set();let stick={x:0,z:0},px=places.home.x,pz=places.home.z+2,heading=0,time=0,destination=places.home,path=[],active=false,paused=false,driving=false,loaded=false,manual=false,jump=0,vy=0;
 const forward=new T.Vector3(-.58,0,-.815),right=new T.Vector3(.815,0,-.58);
 const dust=new T.Group();
 for(let i=0;i<5;i++)part(dust,ball,'#d5c4a5',0,0,0,.2,.2,.2);
 scene.add(dust);dust.visible=false;
 let impactAge=1,impactPower=0,impactSide=0,impacts=0,yieldTime=0,replanAt=0,braking=false,brakeTicks=0;
 const contacts=new Set();
 function impact(g,speed){
   if(contacts.has(g))return;
   contacts.add(g);impactAge=0;impactPower=Math.min(1,Math.max(.25,speed/31));impacts++;
   impactSide=Math.sign((g.position.x-px)*Math.cos(heading)-(g.position.z-pz)*Math.sin(heading));
   dust.position.set((px+g.position.x)/2,.6,(pz+g.position.z)/2);
   onImpact();
 }
 function advanceTraffic(dt){
   for(const g of traffic){
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
     const clockStep=reversing?-dt*.65:dt*pace;
     m.move(m.clock+clockStep);
     const closer=(p.x-px)**2+(p.z-pz)**2<(x-px)**2+(z-pz)**2;
     if(active&&driving&&closer&&vansTouch(px,pz,heading,p.x,p.z,g.rotation.y,path.length ? .18 : 0)){
       if(!path.length)impact(g,Math.hypot(p.x-x,p.z-z)/dt);
       else if(yieldTime>.65&&!reversing)m.reverseUntil=time+2.5;
       p.set(x,0,z);g.rotation.y=angle;
     }else m.clock+=clockStep;
     m.vx=(p.x-x)/dt;m.vz=(p.z-z)/dt;
     if(!vansTouch(px,pz,heading,p.x,p.z,g.rotation.y,.75))contacts.delete(g);
   }
 }
 function fit(){const h=active?(innerWidth<600?52:60):(innerWidth<600?98:128),w=h*innerWidth/innerHeight;camera.left=-w/2;camera.right=w/2;camera.top=h/2;camera.bottom=-h/2;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
 function position(x,z){px=x;pz=z;path=[];}
 function roadPlan(x,z,extraBlock=()=>false){
   const start={x:px,z:pz},goal={x,z};
   const base=(x,z)=>blocked(x,z)||extraBlock(x,z);
   if(events.length){
     const route=drivingRoute(start,goal,(x,z)=>base(x,z)||incidentLaneBlocked(events,x,z));
     if(route)return route;
   }
   // If every approach is temporarily closed, keep the destination and wait at the cordon.
   return drivingRoute(start,goal,base);
 }
 function go(x,z){const route=driving?roadPlan(x,z):findRoute({x:px,z:pz},{x,z},blocked,{step:2,radius:2,bound:CITY_EDGE});path=route||[];return route!==null;}
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
   let aimX=.58,aimZ=.815,height=108,offsetX=0,offsetZ=0;
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
   if(!paused&&dt>0){time+=dt;impactAge+=dt;if(active)advanceEvents(dt);advanceTraffic(dt);}
   if(!paused)frameIncident(dt);
   braking=false;
   if(active&&!paused){
     let sx=stick.x+Number(keys.has('ArrowRight')||keys.has('KeyD'))-Number(keys.has('ArrowLeft')||keys.has('KeyA'));
     let sy=-stick.z+Number(keys.has('ArrowUp')||keys.has('KeyW'))-Number(keys.has('ArrowDown')||keys.has('KeyS'));
     let dx=sx*right.x+sy*forward.x,dz=sx*right.z+sy*forward.z;
     if(sx||sy)path=[];
     while(path.length&&Math.hypot(path[0].x-px,path[0].z-pz)<.001){const reached=path.shift();px=reached.x;pz=reached.z;}
     if(path.length){dx=path[0].x-px;dz=path[0].z-pz;}
     const len=Math.hypot(dx,dz);
     if(len>.0001){
       const angle=Math.atan2(dx,dz),guided=path.length>0;
       let speed=driving?31:10;
       if(driving&&guided){
         const ahead=safeSpeed(px,pz,angle,speed,traffic);
         const pace=events.length?incidentTrafficAt(events,px,pz,angle):1;
         speed=Math.min(ahead.speed,speed*pace);braking=speed<31;
         if(braking&&dt>0)brakeTicks++;
         yieldTime=speed<4?yieldTime+dt:0;
         if(yieldTime>.9&&time>=replanAt&&ahead.obstruction){
           replanAt=time+2;
           const p=ahead.obstruction.position;
           const clearance=Math.min(6,Math.hypot(px-p.x,pz-p.z)-.2);
           const goal=path.at(-1),detour=roadPlan(goal.x,goal.z,(x,z)=>Math.hypot(x-p.x,z-p.z)<clearance);
           if(detour?.length){path=detour;speed=0;yieldTime=0;}
         }
       }else yieldTime=0;
       if(driving&&!guided&&impactAge<.24)speed*=impactAge/.24;
       const step=Math.min(guided?len:Infinity,speed*dt),nx=px+dx/len*step,nz=pz+dz/len*step;
       const hit=driving&&traffic.find(g=>{
         const p=g.position;
         return vansTouch(nx,nz,angle,p.x,p.z,g.rotation.y) &&
           Math.hypot(nx-p.x,nz-p.z)<=Math.hypot(px-p.x,pz-p.z);
       });
       const cordon=driving&&incidentLaneBlocked(events,nx,nz)&&!incidentLaneBlocked(events,px,pz);
       if(cordon){braking=true;}
       else if(hit){
         if(guided)braking=true;
         else if(dt>0){
           const hx=hit.position.x-px,hz=hit.position.z-pz;
           const closing=((dx/len*speed-hit.userData.vx)*hx+(dz/len*speed-hit.userData.vz)*hz)/Math.max(.01,Math.hypot(hx,hz));
           impact(hit,Math.max(0,closing));
         }
       }
       else if(guided){if(clearSegment({x:px,z:pz},{x:nx,z:nz},blocked)){px=nx;pz=nz;}else path=[];}
       else{if(!blocked(nx,pz))px=nx;if(!blocked(px,nz))pz=nz;}
       if(!hit)heading=angle;
     }
     vy-=20*dt;jump=Math.max(0,jump+vy*dt);if(!jump)vy=0;onMove(px,pz,dt);
   }
   avatar.position.set(px,jump,pz);avatar.rotation.y=heading;avatar.visible=active&&!driving;
   car.position.set(driving?px:px+3.6,0,driving?pz:pz+2);car.rotation.y=heading;car.visible=active&&driving;
   const rebound=!reduced&&impactAge<.55?Math.sin(impactAge*26)*Math.exp(-impactAge*7)*impactPower:0;
   dust.visible=car.visible&&!reduced&&impactAge<.38;
   if(dust.visible)dust.children.forEach((p,i)=>{
     const spread=(.4+impactPower)*impactAge*4;
     p.position.set(Math.sin(i*2.4)*spread,impactAge*(1+i%2),Math.cos(i*2.4)*spread);
     p.scale.setScalar((.19+.25*impactPower)*(1-impactAge/.38));
   });
   car.rotation.x=rebound*.18;car.rotation.z=-rebound*impactSide*.13;car.position.y=Math.abs(rebound)*.3;
   parcel.visible=active&&loaded;parcel.position.set(px+(driving?0:Math.sin(heading)),driving?3.9:2.1+jump,pz+(driving?0:Math.cos(heading)));
   marker.visible=ring.visible=active&&!!destination;
   if(destination){marker.position.set(destination.x,6+(reduced?0:Math.sin(time*3)*.5),destination.z);marker.rotation.y=time*.65;ring.position.set(destination.x,.5,destination.z);}
   if(draw){moveStreetActors();incidentScene.update(events,shiftTime,traffic);}
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
   camera.position.set(cx+(active?viewX*152:88),active?viewHeight:92,cz+(active?viewZ*152:124));camera.lookAt(cx,1,cz);
   if(draw)renderer.render(scene,camera);
 }
 let last=performance.now();function frame(now){if(!manual)update(Math.max(0,Math.min(.05,(now-last)/1000)));last=now;requestAnimationFrame(frame);}fit();requestAnimationFrame(frame);
 addEventListener('resize',fit);
 const movementKeys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD','Space'];
 addEventListener('keydown',e=>{if(!active||paused||!movementKeys.includes(e.code))return;e.preventDefault();keys.add(e.code);if(e.code==='Space'&&!jump&&!driving)vy=8;});addEventListener('keyup',e=>keys.delete(e.code));
 addEventListener('blur',()=>{keys.clear();stick={x:0,z:0};});
 const ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),0);
 renderer.domElement.addEventListener('pointerup',e=>{if(!active||paused)return;ray.setFromCamera(new T.Vector2(2*e.clientX/innerWidth-1,1-2*e.clientY/innerHeight),camera);const hit=new T.Vector3();if(ray.ray.intersectPlane(plane,hit)&&!blocked(hit.x,hit.z))go(hit.x,hit.z);});
 return {outfit(color,gear){
     car.children[0].material.color.set(color);
     const jacket=gear.includes('jacket')?'#9236ab':color;
     for(const i of [0,4,7])avatar.children[i].material.color.set(jacket);
     for(const [id,mesh] of Object.entries(accessories))mesh.visible=gear.includes(id);
     cap.visible=gear.includes('cap');drone.visible=gear.includes('drone');update(0);
   },life(){
     const point=g=>[g.position.x,g.position.z].map(n=>Number(n.toFixed(2)));
     return {shiftTime:Math.round(shiftTime*100)/100,events:incidentReports().map(({id,type,phase,x,z,observer,queued})=>({id,type,phase,x,z,observer,queued})),cars:traffic.length,residents:walkers.length,planes:planes.length,impacts,brakeTicks,impactVisible:dust.visible,car:point(traffic[0]),walker:point(walkers[0]),plane:point(planes[0]),assistant:drone.visible?point(drone):null};
   },observe(id){observing=id;},events:incidentReports,yielding:()=>braking,start(x,z,elapsed=0){shiftTime=elapsed;events=cityIncidentsAt(shiftTime);observing=events.find(e=>Math.hypot(e.observer.x-x,e.observer.z-z)<4)?.id||null;viewX=.58;viewZ=.815;viewHeight=108;focusX=focusZ=0;incidentKey='';impactAge=1;impacts=brakeTicks=yieldTime=replanAt=0;contacts.clear();position(x,z);active=true;manual=false;fit();},position,go,stop(){path=[];},setPaused(v){paused=v;keys.clear();stick={x:0,z:0};},setStick(x,z){stick={x,z};},drive(v){if(driving===v)return;const goal=path.at(-1);driving=v;if(goal)go(goal.x,goal.z);},cargo(v){loaded=v;},target(p){destination=p;},celebrate(){party.visible=true;},reset(){events=[];shiftTime=0;drone.visible=false;active=false;party.visible=false;paused=false;path=[];fit();},jump(){if(!driving&&!jump)vy=8;},moving:()=>path.length>0,
   getPlayer:()=>({x:px,z:pz,y:jump}),project(p){const v=new T.Vector3(p.x,6,p.z).project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2,visible:Math.abs(v.x)<.9&&Math.abs(v.y)<.85};},
   advance(ms){manual=true;for(let t=0;t<Math.min(ms,90000);t+=1000/60)update(1/60,false);update(0);},pixelRatio:renderer.getPixelRatio()};
}
