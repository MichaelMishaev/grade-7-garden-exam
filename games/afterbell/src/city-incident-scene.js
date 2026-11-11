import * as T from 'three';
import {bodyShapes} from './city-materials.js';

const clamp=t=>Math.min(1,Math.max(0,t));
const ease=t=>{t=clamp(t);return t*t*(3-2*t);};

// Local +z follows the affected traffic lane; local +x is across the street.
export function createIncidentScene({scene,reduced=false,dynamicUsage}){
 const material=new T.MeshStandardMaterial({roughness:.78});
 function batch(shape){
   const mesh=new T.InstancedMesh(shape,material,384);
   mesh.instanceMatrix.setUsage(dynamicUsage);
   // Instances can be in different districts; a bounding sphere from a prior
   // frame would incorrectly cull new events when the dispatch moves.
   mesh.frustumCulled=false;mesh.count=0;scene.add(mesh);return mesh;
 }
 const boxes=batch(new T.BoxGeometry(1,1,1)),stones=batch(new T.IcosahedronGeometry(1,0));
 // People share the rounded body shapes of the residents.
 const body=bodyShapes(),figures=[body.limb,body.head,body.hair,body.torso].map(batch),[limbs,heads,hairs,torsos]=figures;
 const pose=new T.Group(),color=new T.Color();
 let originX=0,originZ=0,heading=0,sin=0,cos=1;
 function origin(x,z,angle){
   originX=x;originZ=z;heading=angle;sin=Math.sin(angle);cos=Math.cos(angle);
 }
 function piece(mesh,c,x,y,z,w,h,d,pitch=0,roll=0){
   pose.position.set(originX+x*cos+z*sin,y,originZ-x*sin+z*cos);
   pose.rotation.set(pitch,heading,roll,'YXZ');pose.scale.set(w,h,d);pose.updateMatrix();
   mesh.setMatrixAt(mesh.count,pose.matrix);mesh.setColorAt(mesh.count,color.set(c));mesh.count++;
 }
 const box=(...v)=>piece(boxes,...v),rock=(...v)=>piece(stones,...v),limb=(...v)=>piece(limbs,...v);
 function at(anchor,dx,dz,turn=0){
   const a=anchor.heading,s=Math.sin(a),c=Math.cos(a);
   origin(anchor.x+dx*c+dz*s,anchor.z-dx*s+dz*c,a+turn);
 }
 function cone(x,z){
   box('#513e38',x,.54,z,.9,.16,.9);
   rock('#f2833b',x,.94,z,.45,.68,.45);
   box('#fff4ce',x,1,z,.47,.14,.47);
 }
 function person(anchor,x,z,turn,shirt,gesture=0,uniform=false,lean=0){
   at(anchor,x,z,turn);
   limb('#334851',-.36,1.04,0,.54,1.3,.6);
   limb('#334851',.36,1.04,.1,.54,1.3,.6);
   piece(torsos,shirt,0,2.12,lean*.42,1.36,1.3,.78,lean);
   for(const side of [-1,1]){
     const pitch=side>0?gesture:gesture*.45;
     limb(shirt,side*.87,2.07,.12+Math.sin(pitch)*.4,.36,1.05,.42,-pitch);
     piece(heads,'#be896a',side*.87,1.67+Math.abs(pitch)*.23,.16+Math.sin(pitch)*.85,.36,.38,.38);
   }
   piece(heads,'#cf9875',0,3.24,lean,1,1.08,.98);
   piece(hairs,uniform?'#efbc50':'#3d3231',0,3.4,lean-.06,1.1,1,1.1);
   if(uniform)box('#ebe780',0,2.13,0,1.48,.19,.86);
 }
 // Branded silhouettes mirror src/city-cars.js: no textures here, so each make is
 // told apart by its shape and light signature (Tesla tail bar, Ford bed, SUV cabin).
 const branded={
   tesla(body){
     box('#303f4c',0,1.02,0,3.05,.75,5.6);box(body,0,1.62,0,3.25,1.2,5.9);
     box('#1b2530',0,2.6,-.4,3,1,3.3);box(body,0,3.12,-.4,2.9,.14,3.1);
     box('#1b2530',0,2.28,1.55,2.9,.12,1.25,-.5);
     box('#ff2f3f',0,1.95,-2.97,3.1,.16,.08);
     box('#ffffff',0,1.78,2.97,2.9,.07,.08);
     box('#1b2530',0,1.42,2.98,.12,.5,.06);box('#1b2530',0,1.68,2.98,.5,.1,.06);
   },
   cybertruck(){
     const steel='#aeb6bb';
     box('#303f4c',0,1,0,3.1,.7,5.9);box(steel,0,1.6,0,3.4,1.1,6);
     box(steel,0,2.35,-1.2,3.3,.5,3.4);
     box('#12181d',0,2.2,1.4,3,.5,1.7,-.3);
     box(steel,0,2.58,.75,3.32,.16,3.5,-.28);
     box('#ffffff',0,1.88,2.98,3.3,.08,.08);box('#ff2f3f',0,2.3,-2.98,3.3,.14,.08);
   },
   pickup(body){
     box('#303f4c',0,1.02,0,3.05,.75,5.8);box(body,0,1.62,0,3.25,1.25,5.9);
     box(body,0,2.75,1,3,1.4,2.4);box('#3d5565',0,2.85,2.22,2.6,.8,.08);
     for(const side of [-1,1]){
       box('#3d5565',side*1.52,2.85,.9,.08,.8,1.7);
       box(body,side*1.6,2.5,-1.6,.14,.55,3);
       box('#fff0c9',side*1.1,1.75,2.98,.6,.3,.08);box('#e5382f',side*1.35,2,-2.98,.6,.3,.08);
     }
     box('#2a3036',0,2.2,-1.6,3,.12,2.9);box(body,0,2.5,-2.95,3.3,.55,.14);
     box('#d4d8d9',0,1.3,2.98,2.5,.6,.08);box('#25496f',0,1.3,3.03,.9,.3,.06);
   },
   suv(body){
     box('#303f4c',0,1.02,0,3.05,.75,5.6);box(body,0,1.65,0,3.25,1.3,5.9);
     box('#27343e',0,2.9,-.5,3.1,1.35,4.2);box(body,0,3.6,-.5,3,.14,4.1);
     for(const side of [-1,1]){
       box(body,side*1.56,2.9,-.5,.08,1.3,.5);
       box('#fff0c9',side*1.1,1.75,2.98,.6,.3,.08);box('#e5382f',side*1.3,2.1,-2.98,.6,.3,.08);
     }
     box('#14181a',0,1.3,2.98,2,.3,.08);
   }
 };
 function vehicle(anchor,x,z,turn,body,kind){
   at(anchor,x,z,turn);
   if(branded[kind]){
     for(const side of [-1,1])for(const end of [-1,1])box('#29363d',side*1.58,.98,end*1.75,.46,1.12,1.1);
     branded[kind](body);return;
   }
   const truck=kind==='fire'||kind==='tow',length=truck?7.4:5.4;
   box('#303f4c',0,1.02,0,3.05,.75,length);
   box(body,0,1.62,0,3.25,1.25,length);
   for(const side of [-1,1]){
     for(const end of [-1,1])box('#29363d',side*1.58,.98,end*(length/2-1.03),.46,1.12,1.1);
     box('#fff0c9',side*1.04,1.67,length/2+.04,.69,.39,.1);
   }
   const cab=truck?1.95:0;
   box(body,0,2.77,cab,2.97,1.42,truck?2.56:3.35);
   box('#597d8c',0,2.84,cab+(truck?1.3:1.7),2.62,.83,.08);
   for(const side of [-1,1])box('#597d8c',side*1.5,2.82,cab,.08,.82,truck?1.78:2.28);
   if(kind==='fire'){
     box('#a83930',0,2.67,-1.06,3.04,1.68,3.48);
     for(const side of [-1,1]){
       box('#cbcfc1',side*1.53,2.6,-1.1,.08,1.13,2.9);
       box('#cad2c8',side*.67,3.68,-1.2,.12,.14,4);
     }
     for(let z=-2.85;z<.6;z+=.65)box('#cad2c8',0,3.68,z,1.45,.15,.13);
   }else if(kind==='tow'){
     box('#425864',0,2.29,-1.5,2.93,.25,3.9);
     box('#dd9e40',0,2.79,-1.37,.36,.45,3.7,.32);
   }
   if(['fire','tow','police','traffic'].includes(kind)){
     box('#283944',0,3.53,cab,1.87,.17,.55);
     for(const side of [-1,1])box(kind==='tow'||kind==='traffic'?'#fdc35a':side<0?'#438ec9':'#ed6352',side*.65,3.72,cab,.57,.26,.5);
   }
 }
 // Dispatch is reported first; crews drive in, work in place, then depart.
 function responder(e,kind,c,parking){
   if(e.phase==='reported')return;
   const p=e.phaseProgress;
   const approach=e.phase==='responding'?-36*(1-ease(p)):0;
   const depart=e.phase==='clearing'?24*ease((p-.28)/.72):0;
   // The tow truck passes the disabled cars in the adjacent lane, then pulls in ahead.
   const bypass=kind==='tow'&&e.phase==='responding'?-3.9*(1-ease((p-.68)/.32)):0;
   vehicle(e.lane,bypass,parking+approach+depart,0,c,kind);
 }
 function fire(e,t){
   at(e,0,0);box('#60766d',0,1.62,0,1.8,2.32,1.25);
   box('#d5c475',0,1.8,.65,.58,.51,.06);
   const work=e.phase==='working',strength=e.phase==='clearing'?0:work?1-ease((e.phaseProgress-.13)/.8):.64+.28*ease(e.phaseProgress);
   for(let i=0;strength>.06&&i<4;i++){
     const flicker=reduced?1:.91+.09*Math.sin(t*6+i);
     rock(i%2?'#ffc357':'#ed6c36',(i%2-.5)*.79,2.3+strength*.62,i*.21-.35,.58*strength,1.7*strength*flicker,.57*strength);
   }
   const smoke=e.phase==='clearing'?.25*(1-e.phaseProgress):Math.max(.16,strength);
   for(let i=0;smoke>.05&&i<5;i++){
     const u=reduced?(i+.5)/5:(i/5+t*.21)%1,size=smoke*(.53+1.6*u)*(1-u*.72);
     rock(i%2?'#8f8e80':'#b1aba0',.62+u*2.9,2.64+u*7,.12+.5*u,size,size*1.2,size);
   }
   const retreat=e.phase==='reported'?ease(e.phaseProgress):1;
   person(e,-2.3-retreat*2.2,-.8,-1.9,'#8e75a0');
   responder(e,'fire','#c34a3c',-8);
   if(e.phase==='responding')person(e,-2.15,-1.4,.85,'#d27542',.55,true);
   if(work||e.phase==='clearing'){
     at(e,-2,-3);cone(0,0);cone(3.5,.4);
     const exit=e.phase==='clearing'?ease(e.phaseProgress):0;
     person(e,-2.8-exit*2,-3.3-exit*2,.65,'#3b5262',.86,true);
     if(work&&e.phaseProgress<.93){
       at(e,0,0);
       for(let i=1;i<=6;i++){
         const u=i/7;
         rock('#a7dddf',-2.55*(1-u),2.48+1.1*Math.sin(u*Math.PI),-2.8*(1-u),.13,.12,.19);
       }
     }
   }
 }
 function fight(e,t){
   const separate=e.phase==='working'?ease(e.phaseProgress):e.phase==='clearing'?1:0;
   const leave=e.phase==='clearing'?ease(e.phaseProgress)*5:0;
   const motion=reduced?0:Math.sin(t*4.3),distance=1.1+separate*2.4+leave;
   const active=e.phase==='reported'||e.phase==='responding';
   person(e,0,-distance+(active ? .2*motion:0),0,'#ab6250',active ? .98+.48*motion:.2,false,active ? .14*motion:0);
   person(e,-.3,distance+.17,Math.PI,'#628ba1',active ? .98-.48*motion:.2,false,active ? -.14*motion:0);
   const back=e.phase==='reported'?ease(e.phaseProgress)*2.1:2.1;
   const curb=Math.sign((e.x-e.lane.x)*Math.cos(e.heading)-(e.z-e.lane.z)*Math.sin(e.heading))||1;
   person(e,curb*(1.2+back),3.3+back,Math.PI,'#92779d');
   responder(e,'police','#e5e6d6',-8);
   if(!active)person(e,-.3,leave*.5,0,'#3e6382',.72*(1-separate));
 }
 function crash(e){
   const clear=e.phase==='clearing'?ease((e.phaseProgress-.28)/.72):0;
   // The tow truck hooks onto the disabled van before pulling it out.
   vehicle(e.lane,0,2.75+clear*23,0,'#e6b269','van');
   vehicle(e.lane,-.16,-2.7+clear*15,.09,'#f4f5f4','tesla');
   box('#dfe3e2',0,2.31,2.16,2.6,.2,.76,-.25,.05);
   if(e.phase!=='reported'){
     at(e.lane,0,0);cone(-1.5,-7);cone(-2,-11);
   }
   person(e.lane,4.6,-.1,-Math.PI/2,'#986b96');
   person(e.lane,4.9,2.65,-2.5,'#698e87');
   responder(e,'tow','#e1a248',8.4);
   if(e.phase==='working'){
     person(e.lane,2.7,4.8,-Math.PI/2,'#d8a247',.55,true);
     at(e.lane,0,0);box('#687276',0,1.19,5.76,.13,.13,1.32);
   }
 }
 function jam(e,t,traffic){
   const clearing=e.phase==='clearing',open=clearing?ease(e.phaseProgress):0;
   at(e,0,0);
   box('#77695b',0,.43,0,1.62,.1,4.7*(1-open)+.05);
   for(let i=0;i<4;i++)if(open<i*.22+.22)cone(-1.1+i*.25,-1.85-i*1.5);
   const forming=e.phase==='reported'?ease(e.phaseProgress):1;
   // As the marshal releases the head of the queue, the next two drivers move
   // up one car length. Cars leave downstream before another joins at the tail.
   const flowing=e.phase==='working'||clearing;
   const elapsed=clearing?e.workDuration:e.stageAge;
   const cycle=Math.floor(elapsed/10),progress=elapsed%10;
   const kinds=['car','tesla','suv','cybertruck'],colours=['#b2acc9','#f4f5f4','#2f5fa8','#aeb6bb'];
   // A local city block is 56 m wide. Its circuit vans form the actual queue;
   // use staged arrivals only on streets with no ambient vehicles in the block.
   const liveQueue=traffic.some(g=>Math.hypot(g.position.x-e.lane.x,g.position.z-e.lane.z)<75);
   for(let i=0;!liveQueue&&i<3;i++){
     const roll=flowing?ease(progress/5):0;
     let z=-10-i*7.4-(1-forming)*(i+1)*3.4;
     let x=0;
     if(flowing&&i===0){
       z+=roll*30;
       x=-3.25*Math.sin(roll*Math.PI);
       if(progress>=5)continue;
     }else if(flowing)z+=roll*7.4;
     if(clearing){
       const depart=ease((e.phaseProgress-i*.15)/.68);
       z+=depart*27;x-=2.6*Math.sin(depart*Math.PI);
     }
     const k=(i+(flowing?cycle:0))%kinds.length;
     vehicle(e.lane,x,z,0,colours[k],kinds[k]);
   }
   if(e.phase!=='reported'){
     // Marshal stands beside the taper to signal the waiting lane.
     const move=e.phase==='responding'?1-ease(e.phaseProgress):0;
     const wave=e.phase==='working'&&e.stageAge%10<5&&!reduced ? .35*Math.sin(t*2.2):0;
     person(e.lane,3.8,-6.3-12*move,Math.PI,'#c78c32',open>.5 ? .32:1.12+wave,true);
   }
 }
 function spill(e){
   const working=e.phase==='working',done=e.phase==='clearing';
   // The pickup that lost its load waits a few metres ahead of the boxes.
   vehicle(e.lane,0,4.6+(done?ease(e.phaseProgress)*26:0),0,'#2c4f87','pickup');
   const total=7,left=working?Math.round(total*(1-ease(e.phaseProgress))):done?0:total;
   at(e.lane,0,0);
   for(let i=0;i<left;i++)box(i%2?'#d9b074':'#c89a5c',-1.2+(i*1.7)%3.1,.46,-1.4-i*1.05,.92,.9,.92,0,i*.6);
   if(e.phase!=='reported'){at(e.lane,0,0);cone(-1.5,-7);cone(-2,-11);}
   person(e.lane,4.5,2.4,-Math.PI/2,'#8d6a4e',working?.6:0);
   responder(e,'traffic','#f1c24d',8.4);
   if(working)person(e.lane,.6,-1.4-(total-left)*1.05,0,'#c78c32',.9,true);
 }
 function rescue(e,t){
   const working=e.phase==='working',down=e.phase==='clearing';
   at(e,0,0);
   box('#7a5537',0,3,0,.7,6,.7);rock('#5f9a5a',0,6.7,0,2.3,1.9,2.3);rock('#6fae63',.9,6.1,.6,1.5,1.3,1.5);
   const reach=working?ease(e.phaseProgress):0;
   const catY=down?.5:5.5-reach*.3,catX=down?1.6:1.1;
   box('#e9a241',catX,catY,.9,.55,.45,.95);box('#e9a241',catX+.1,catY+.35,1.35,.42,.4,.42);
   const wobble=reduced||down?0:.12*Math.sin(t*5);
   person(e,-2.4,2.2,.3,'#d26a8c',.9+wobble,false,.08);
   responder(e,'fire','#c34a3c',-8);
   if(working||down){
     // Ladder leans from the sidewalk up into the crown; it folds back down as the crew leaves.
     const lift=down?1-ease(e.phaseProgress):1,span=5.8*lift+.1,pitch=1.05*lift;
     at(e,0,0);
     for(const side of [-1,1])box('#e8ecef',-1.2+side*.42,2.9*lift+.3,1.6,.16,.16,span,pitch);
     for(let i=0;i<5;i++){
       const u=(i+.5)/5-.5,dz=u*span;
       box('#e8ecef',-1.2,2.9*lift+.3+dz*Math.sin(-pitch),1.6+dz*Math.cos(pitch),.84,.14,.16,pitch);
     }
     if(working){
       // Firefighter climbs the rungs toward the cat, drawn a touch larger than the crowd.
       // person() keeps feet on the ground, so the climber is built by hand on the rungs.
       const climb=reach*3.2,y=.3+climb;
       at(e,-1.2,1.6-climb*.45);
       box('#334851',-.3,y+.7,0,.5,1.3,.6,-.3);box('#334851',.3,y+.7,0,.5,1.3,.6,-.3);
       box('#c34a3c',0,y+1.95,-.1,1.4,1.4,.9,-.3);
       for(const side of [-1,1])box('#c34a3c',side*.85,y+2.3,.35,.38,.9,.4,-1);
       box('#cf9875',0,y+3.05,0,1,.95,.9);box('#efbc50',0,y+3.6,0,1.15,.3,1.05);
     }
   }
 }
 let lastTime=-Infinity,lastState='';
 return {update(events,time,traffic=[]){
   const state=events.map(e=>e.id+e.phase).join('|');
   if(time>=lastTime&&time-lastTime<1/24&&lastState===state)return;
   lastTime=time;lastState=state;boxes.count=stones.count=0;for(const mesh of figures)mesh.count=0;
   for(const e of events){
     if(e.type==='fire')fire(e,time);
     else if(e.type==='fight')fight(e,time);
     else if(e.type==='crash')crash(e);
     else if(e.type==='jam')jam(e,time,traffic);
     else if(e.type==='spill')spill(e);
     else if(e.type==='rescue')rescue(e,time);
   }
   for(const mesh of [boxes,stones,...figures]){
     mesh.visible=mesh.count>0;mesh.instanceMatrix.needsUpdate=true;
     if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
   }
 }};
}
