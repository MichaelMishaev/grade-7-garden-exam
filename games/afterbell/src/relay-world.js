import * as THREE from 'three';
import { charged, sparksAt, station } from './relay.js';

export function createRelayLights(scene, reduced){
  const root=new THREE.Group();
  scene.add(root);
  const gold=new THREE.MeshBasicMaterial({color:'#f3c574'});
  const mint=new THREE.MeshBasicMaterial({color:'#9ef5dc'});
  const gem=new THREE.OctahedronGeometry(.34);
  const hoop=new THREE.TorusGeometry(1.05,.085,8,36);
  const mirror=new THREE.BoxGeometry(.55,.76,.12);
  function mesh(geometry,parent,x,y,z){
    const m=new THREE.Mesh(geometry,gold);
    m.position.set(x,y,z);parent.add(m);return m;
  }
  const markers=Array.from({length:3},()=>{
    const group=new THREE.Group();root.add(group);
    const ring=mesh(hoop,group,0,1.65,0);
    const diamond=mesh(gem,group,0,2.9,0);diamond.scale.setScalar(1.6);
    const panels=[-1,0,1].map(i=>mesh(mirror,group,i*.75,.65,0));
    const sparks=Array.from({length:3},()=>mesh(gem,root,0,1,0));
    return {group,ring,diamond,panels,sparks};
  });
  const sky=new THREE.Group();root.add(sky);sky.position.set(0,5,-25);
  const points=[[-3,0,0],[-1,2,0],[1,1,0],[3,3,0],[4,1,0]];
  for(const [x,y,z] of points)mesh(gem,sky,x,y,z);
  sky.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),new THREE.LineBasicMaterial({color:'#f3c574'})));
  root.visible=false;
  return {
    sync(round){
      root.visible=!!round.relay;
      if(!root.visible)return;
      sky.visible=round.seals.length===3;
      markers.forEach(({group,ring,diamond,panels,sparks},i)=>{
        const s=station(round.relay,i),lit=charged(round.relay,i);
        group.position.set(s.x,0,s.z);
        diamond.material=ring.material=lit?mint:gold;
        ring.rotation.x=s.task==='ring'?0:Math.PI/2;
        ring.position.y=s.task==='ring'?1.65:.16;
        panels.forEach((p,j)=>{p.visible=s.task==='mirror';p.material=round.relay.steps[i]>j?mint:gold;});
        sparksAt(s).forEach((p,j)=>{sparks[j].position.set(p.x,1,p.z);sparks[j].visible=s.task==='sparks'&&!(round.relay.steps[i]&(1<<j));});
      });
    },
    tick(time){
      if(!root.visible||reduced)return;
      markers.forEach(({diamond,sparks},i)=>{
        diamond.rotation.y=time;diamond.position.y=2.9+.17*Math.sin(time*2+i);
        for(const spark of sparks)if(spark.visible){spark.rotation.y=time*2;spark.position.y=1+.18*Math.sin(time*3+spark.position.x);}
      });
      sky.position.y=5+.3*Math.sin(time);
    }
  };
}
