import * as T from 'three';
import {places,inCity,CITY_EDGE} from './city-data.js';
import {findRoute,clearSegment} from './navigation.js';

export function cityWorld(host,onMove){
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
 block('#8bc796',0,-.6,-30,490,1,436);
 block('#6ac7cb',0,-.4,236,540,.8,102);block('#eed39b',0,.05,180,486,.22,16);
 for(let x=-224;x<=224;x+=56){
   block('#ddd6bc',x,.08,-24,12,.15,423);block('#71848a',x,.18,-24,8,.15,423);
   for(let z=-228;z<178;z+=14)block('#f5dfa6',x,.29,z,.28,.1,4);
 }
 for(let z=-224;z<=168;z+=56){
   block('#e1d8bd',0,.12,z,486,.18,12);block('#778b91',0,.25,z,486,.14,8);
   for(let x=-235;x<235;x+=14)block('#f5dfa6',x,.35,z,4,.08,.28);
 }
 for(let x=-224;x<=224;x+=56)for(let z=-224;z<=168;z+=56){
   for(let k=-3;k<=3;k++)block('#ede8d1',x+k,.43,z+5.4,.6,.07,1.6);
   block('#789497',x+7,2.9,z+7,.3,5.8,.3);block('#fff0c2',x+6.3,5.8,z+7,1.7,.45,.7);
 }
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
 for(const p of Object.values(places)){
   const x=p.x,z=p.z-11;
   block('#f3dfb4',x,.26,p.z,17,.45,8);
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
 const drone=new T.Group();
 part(drone,ball,'#f3ba4e',0,0,0,.85,.65,.85);
 for(const side of [-1,1])part(drone,tube,'#326c71',side*.93,.28,0,.55,.12,.55);
 const arrow=part(drone,roof,'#ad412e',0,.88,.28,.55,.98,.55);arrow.rotation.x=Math.PI/2;
 scene.add(drone);drone.visible=false;
 // Closed city-block circuits keep actors on the street or sidewalk at every turn.
 function circuit(g,x,z,size,speed,offset,dwell=0){
   return time=>{
     const duration=size/speed+dwell,t=time+offset,leg=Math.floor(t/duration)%4;
     const distance=Math.min(size,(t%duration)*speed);
     const corners=[[0,0],[size,0],[size,size],[0,size]],dx=[1,0,-1,0],dz=[0,1,0,-1];
     g.position.set(x+corners[leg][0]+dx[leg]*distance,0,z+corners[leg][1]+dz[leg]*distance);
     g.rotation.y=Math.atan2(dx[leg],dz[leg]);
   };
 }
 const traffic=[],walkers=[],routes=[];
 for(let i=0;i<20;i++){
   const x=((i%5)-2)*56,z=(Math.floor(i/5)-2)*56;
   const g=van(palette[i%6]);traffic.push(g);routes.push(circuit(g,x+2,z+2,52,6+i%3,i*4.1));
 }
 for(let i=0;i<32;i++){
   const x=(i%8-4)*56,z=(Math.floor(i/8)-2)*56;
   const g=person(palette[i%6]);walkers.push(g);routes.push(circuit(g,x+5,z+5,46,1.6+i%3*.25,i*7,2+i%3));
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
   routes.forEach(move=>move(time));
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
 const keys=new Set();let stick={x:0,z:0},px=places.home.x,pz=places.home.z+2,heading=0,time=0,destination=places.home,path=[],active=false,paused=false,driving=false,loaded=false,manual=false,jump=0,vy=0;
 const forward=new T.Vector3(-.58,0,-.815),right=new T.Vector3(.815,0,-.58);
 function fit(){const h=active?(innerWidth<600?45:53):(innerWidth<600?98:128),w=h*innerWidth/innerHeight;camera.left=-w/2;camera.right=w/2;camera.top=h/2;camera.bottom=-h/2;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
 function position(x,z){px=x;pz=z;path=[];}
 function go(x,z){const route=findRoute({x:px,z:pz},{x,z},blocked,{step:2,radius:2,bound:CITY_EDGE});path=route||[];return route!==null;}
 function update(dt,draw=true){
   if(!paused)time+=dt;
   if(active&&!paused){
     let sx=stick.x+Number(keys.has('ArrowRight')||keys.has('KeyD'))-Number(keys.has('ArrowLeft')||keys.has('KeyA'));
     let sy=-stick.z+Number(keys.has('ArrowUp')||keys.has('KeyW'))-Number(keys.has('ArrowDown')||keys.has('KeyS'));
     let dx=sx*right.x+sy*forward.x,dz=sx*right.z+sy*forward.z;
     if(sx||sy)path=[];
     while(path.length&&Math.hypot(path[0].x-px,path[0].z-pz)<.001)path.shift();
     if(path.length){dx=path[0].x-px;dz=path[0].z-pz;}
     const len=Math.hypot(dx,dz);
     if(len>.0001){const speed=driving?31:10,step=path.length?Math.min(len,speed*dt):speed*dt,nx=px+dx/len*step,nz=pz+dz/len*step;
       if(path.length){if(clearSegment({x:px,z:pz},{x:nx,z:nz},blocked)){px=nx;pz=nz;}else path=[];}
       else{if(!blocked(nx,pz))px=nx;if(!blocked(px,nz))pz=nz;}
       heading=Math.atan2(dx,dz);
     }
     vy-=20*dt;jump=Math.max(0,jump+vy*dt);if(!jump)vy=0;onMove(px,pz,dt);
   }
   avatar.position.set(px,jump,pz);avatar.rotation.y=heading;avatar.visible=active&&!driving;
   car.position.set(driving?px:px+3.6,0,driving?pz:pz+2);car.rotation.y=heading;car.visible=active&&driving;
   parcel.visible=active&&loaded;parcel.position.set(px+(driving?0:Math.sin(heading)),driving?3.9:2.1+jump,pz+(driving?0:Math.cos(heading)));
   marker.visible=ring.visible=active&&!!destination;
   if(destination){marker.position.set(destination.x,6+(reduced?0:Math.sin(time*3)*.5),destination.z);marker.rotation.y=time*.65;ring.position.set(destination.x,.5,destination.z);}
   if(draw)moveStreetActors();
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
   const cx=active?px:places.home.x+6,cz=active?pz:places.home.z-13;
   camera.position.set(cx+88,active?108:92,cz+124);camera.lookAt(cx,1,cz);
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
     cap.visible=gear.includes('cap');drone.visible=gear.includes('drone');update(0);
   },life(){
     const point=g=>[g.position.x,g.position.z].map(n=>Number(n.toFixed(2)));
     return {cars:traffic.length,residents:walkers.length,planes:planes.length,car:point(traffic[0]),walker:point(walkers[0]),plane:point(planes[0]),assistant:drone.visible?point(drone):null};
   },start(x,z){position(x,z);active=true;manual=false;fit();},position,go,stop(){path=[];},setPaused(v){paused=v;keys.clear();stick={x:0,z:0};},setStick(x,z){stick={x,z};},drive(v){driving=v;},cargo(v){loaded=v;},target(p){destination=p;},celebrate(){party.visible=true;},reset(){drone.visible=false;active=false;party.visible=false;paused=false;path=[];fit();},jump(){if(!driving&&!jump)vy=8;},moving:()=>path.length>0,
   getPlayer:()=>({x:px,z:pz,y:jump}),project(p){const v=new T.Vector3(p.x,6,p.z).project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2,visible:Math.abs(v.x)<.9&&Math.abs(v.y)<.85};},
   advance(ms){manual=true;for(let t=0;t<Math.min(ms,90000);t+=1000/60)update(1/60,false);update(0);},pixelRatio:renderer.getPixelRatio()};
}
