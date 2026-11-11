// Draws the free-roam activities: festival stars, race arches and checkpoints, waiting passengers.
// The rules live in city-activities.js; this file only mirrors that state into the scene.
import * as T from 'three';

function iconTexture(text,background){
 const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');
 ctx.fillStyle=background;ctx.beginPath();ctx.arc(64,58,52,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.moveTo(44,100);ctx.lineTo(64,126);ctx.lineTo(84,100);ctx.fill();
 ctx.font='64px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,64,62);
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}
function checkerTexture(){
 const c=document.createElement('canvas');c.width=256;c.height=32;const ctx=c.getContext('2d');
 for(let x=0;x<16;x++)for(let y=0;y<2;y++){ctx.fillStyle=(x+y)%2?'#1c2a30':'#fff9e6';ctx.fillRect(x*16,y*16,16,16);}
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}

export function createActivityScene({scene,person,label,races,stars,reduced}){
 const starGeometry=new T.OctahedronGeometry(1,0);
 const starMesh=new T.InstancedMesh(starGeometry,new T.MeshStandardMaterial({color:'#ffd24a',emissive:'#ff9d1f',emissiveIntensity:.9,roughness:.3,metalness:.4,flatShading:true}),stars.length+8);
 starMesh.frustumCulled=false;starMesh.count=0;scene.add(starMesh);
 const glints=new T.InstancedMesh(new T.RingGeometry(.9,1.25,20),new T.MeshBasicMaterial({color:'#ffe9a3',transparent:true,opacity:.55,depthWrite:false}),stars.length+8);
 glints.frustumCulled=false;glints.count=0;glints.renderOrder=9;scene.add(glints);
 const pose=new T.Object3D(),flat=new T.Object3D();flat.rotation.x=-Math.PI/2;

 // Start arches stay in the world, so players can find races by driving around.
 const checker=checkerTexture();
 const arches=races.map(r=>{
  const g=new T.Group(),next=r.checkpoints[0],heading=Math.atan2(next.x-r.start.x,next.z-r.start.z);
  const post=new T.MeshStandardMaterial({color:'#e9513f',roughness:.6,flatShading:true});
  for(const side of [-1,1]){const m=new T.Mesh(new T.BoxGeometry(.6,7,.6),post);m.position.set(side*6.4,3.5,0);m.castShadow=true;g.add(m);}
  const banner=new T.Mesh(new T.PlaneGeometry(13.4,1.7),new T.MeshBasicMaterial({map:checker,side:T.DoubleSide}));banner.position.y=6.6;g.add(banner);
  g.position.set(r.start.x,0,r.start.z);g.rotation.y=heading;scene.add(g);
  const sign=label('🏁 '+r.name,r.start.x,9.1,r.start.z,11,'#8a2f25');sign.rotation.y=heading;
  return {group:g,sign,race:r};
 });
 const ringGeometry=new T.CylinderGeometry(9,9,2.6,40,1,true);
 const rings=[.75,.3].map(opacity=>{
  const m=new T.Mesh(ringGeometry,new T.MeshBasicMaterial({color:'#39e6ff',transparent:true,opacity,side:T.DoubleSide,depthWrite:false}));
  m.visible=false;m.renderOrder=8;scene.add(m);return m;
 });
 const beam=new T.Mesh(new T.CylinderGeometry(.5,.5,60,8,1,true),new T.MeshBasicMaterial({color:'#bff6ff',transparent:true,opacity:.35,depthWrite:false}));
 beam.visible=false;scene.add(beam);

 const icons={ride:iconTexture('🚕','#ffd24a'),express:iconTexture('⚡','#ff8a4a'),drop:iconTexture('🏁','#7be0a2')};
 const waiting=[0,1,2].map(i=>{
  const g=person(['#e8b23f','#d96a8a','#5aa7c9'][i]);g.visible=false;scene.add(g);
  const sprite=new T.Sprite(new T.SpriteMaterial({map:icons.ride,depthTest:false}));sprite.scale.set(4.2,4.2,1);sprite.position.y=8.2;sprite.renderOrder=11;g.add(sprite);
  return {g,sprite,arm:g.children[4]};
 });

 function update(time,state){
  let n=0;
  const place=(s,scale)=>{
   const bob=reduced?0:Math.sin(time*2.4+s.x*.3)*.35;
   pose.position.set(s.x,2.3+bob,s.z);pose.rotation.set(0,reduced?0:time*1.8+s.z,0);pose.scale.set(scale*.9,scale*1.35,scale*.9);pose.updateMatrix();starMesh.setMatrixAt(n,pose.matrix);
   flat.position.set(s.x,.62,s.z);flat.scale.setScalar(scale*(1.1+(reduced?0:Math.sin(time*3+s.x)*.18)));flat.updateMatrix();glints.setMatrixAt(n,flat.matrix);n++;
  };
  if(state){
   for(const s of stars)if(!state.collected.has(s.id)&&s.open!==false)place(s,1);
   if(state.shower)for(const s of state.shower.stars)if(!s.got)place(s,.72);
  }
  starMesh.count=glints.count=n;starMesh.instanceMatrix.needsUpdate=glints.instanceMatrix.needsUpdate=true;
  const run=state?.run;
  for(const a of arches)a.group.visible=a.sign.visible=Boolean(state)&&a.race.open!==false&&(!run||run.id===a.race.id);
  rings.forEach((ring,i)=>{
   const p=run?.checkpoints[run.next+i];ring.visible=Boolean(p);if(!p)return;
   const last=run.next+i===run.total-1;ring.material.color.set(last?'#ffd24a':'#39e6ff');
   ring.position.set(p.x,1.6,p.z);ring.scale.setScalar(i||reduced?1:1+Math.sin(time*5)*.05);
  });
  const nextPoint=run?.checkpoints[run.next];beam.visible=Boolean(nextPoint);
  if(nextPoint)beam.position.set(nextPoint.x,30,nextPoint.z);
  waiting.forEach((w,i)=>{
   const o=state&&!state.run&&!state.gig?state.offers[i]:null;w.g.visible=Boolean(o);if(!o)return;
   w.g.position.set(o.x,0,o.z);w.g.rotation.y=reduced?0:Math.sin(time*.8+i)*.5;
   w.sprite.material.map=icons[o.kind];w.sprite.position.y=8.2+(reduced?0:Math.sin(time*3+i)*.3);
   if(w.arm)w.arm.rotation.z=reduced?-2.4:-2.4+Math.sin(time*7+i)*.45;
  });
 }
 return {update,setOpen(isOpen){for(const s of stars)s.open=isOpen(s.x,s.z);for(const a of arches)a.race.open=isOpen(a.race.start.x,a.race.start.z);}};
}
