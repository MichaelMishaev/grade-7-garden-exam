import * as THREE from 'three';
import {bridges,landmarks,roads,skyGates} from './territory.js';

export function buildFrontier({scene,box,cyl,cone,segment,ellipsoid,path,groundDisc,sign,circleObstacle}){
  groundDisc(69,28,38,53,'#496d60',-.012);
  groundDisc(-71,32,36,65,'#806749',-.012);
  groundDisc(15,-71,76,30,'#505b70',-.012);
  for(const road of roads)path(road,3.3);
  box(45,.078,25.5,7.2,.07,131,'#478e94');
  for(const z of bridges){
    for(let i=-5;i<=5;i++)box(45+i,.18,z,.93,.24,4.3,'#a58155');
    for(const side of [-1,1]){
      for(const x of [40,45,50])box(x,.8,z+side*2.25,.18,1.55,.18,'#695941');
      box(45,1.25,z+side*2.25,10.3,.13,.13,'#bb9c72');
    }
  }
  for(let i=0;i<36;i++){const z=-38+i*3.5;if(bridges.some(b=>Math.abs(z-b)<4))continue;
    const x=45+(i%2?4.3:-4.3);
    for(let j=0;j<3;j++)segment([x+j*.32,0,z],[x+j*.35+.25,1+(i+j)%3*.35,z+.15],.07,'#9b9f69');
  }
  const rotor=new THREE.Group();rotor.position.set(57,6.4,6.2);scene.add(rotor);
  cyl(57,3,5,.95,6,'#ccb38c');cone(57,6.4,5,1.8,2,'#885c48');
  for(let i=0;i<4;i++){
    const blade=new THREE.Group();blade.rotation.z=i*Math.PI/2;rotor.add(blade);
    box(0,1.9,0,.14,3.9,.14,'#735845',blade);box(.37,2.5,0,.66,2.4,.12,'#e0c598',blade);
  }
  circleObstacle(57,5,1.1);
  for(let i=0;i<6;i++){box(84+i, .3,60, .93,.5,7,'#967453');box(84+i,1.45,63.5,.2,2.9,.2,'#675642');}
  // The quarry silhouettes are solid where the stone touches the ground.
  for(const [x,z] of [[-69,9],[-58,9]]){
    ellipsoid(x,2.6,z,2.6,4.8,2.4,'#b07f52');circleObstacle(x,z,2.5);
  }
  box(-63.5,6.7,9,11.8,2.4,3.7,'#be9464');
  for(let i=0;i<22;i++){
    const a=i*.81,x=-85+Math.cos(a)*(7+i%3),z=60+Math.sin(a)*8;
    const crystal=cone(x,1+(i%4)*.4,z,.85,2.7+i%4,['#cf9b54','#d9b870','#8fa9a8'][i%3],scene,5);
    crystal.rotation.z=Math.sin(a)*.23;circleObstacle(x,z,.58);
  }
  cyl(-16,2,-80,5,4,'#829391');ellipsoid(-16,4,-80,5.3,4.5,5.3,'#adb3b4');circleObstacle(-16,-80,5.3);
  segment([-17,6,-80],[-20,9,-76],.67,'#5f7282');
  for(let i=0;i<5;i++){
    const x=62+Math.cos(i*1.25)*7,z=-82+Math.sin(i*1.25)*7;
    cyl(x,2,z,.14,4,'#8196a0');const dish=ellipsoid(x,4,z,1.8,.42,1.8,'#b2c2c8');dish.rotation.z=.42;circleObstacle(x,z,.35);
  }
  // Groups of distant pines, mesas and boulders break up the routes beyond each site.
  for(let i=0;i<84;i++){
    const x=Math.sin(i*7.13)*98,z=Math.cos(i*3.71)*99;
    if(Math.max(Math.abs(x),Math.abs(z))<35||landmarks.some(s=>Math.hypot(x-s.x,z-s.z)<12)||Math.abs(x-45)<9)continue;
    if(x<-32&&z>-38){
      ellipsoid(x,.65,z,2.1,1.6+i%3,1.6,'#967451');circleObstacle(x,z,1.6);
    }else{
      cyl(x,1.4,z,.28,2.8,'#655b50');cone(x,3.8,z,1.7,4+i%4,z<-38?'#53677a':'#486f5b');circleObstacle(x,z,.35);
    }
  }
  for(const s of landmarks){
    groundDisc(s.x,s.z,4,4,s.color,.07);box(s.x+3,1.2,s.z-3,.32,2.4,.32,'#d2b682');
    sign(s.x+3,2.8,s.z-3,4.4,s.name,s.region);
  }
  return rotor;
}

export function createSkyGates(scene,reduced){
  const geo=new THREE.TorusGeometry(1.15,.10,7,28),mat=new THREE.MeshBasicMaterial({color:'#ffdb8d'});
  const gates=skyGates.map(([x,z])=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,1.7,z);scene.add(m);return m;});
  // Each region has a wind spirit patrolling one ring. Its orbit and collision
  // position use the same simulation clock, including when reduced motion is on.
  const spiritMaterial=new THREE.MeshStandardMaterial({color:'#ac8ac3',emissive:'#633f80',emissiveIntensity:.75});
  const body=new THREE.IcosahedronGeometry(.66,0),eye=new THREE.SphereGeometry(.11,8,6);
  const spirits=[1,4,7].map(i=>{
    const g=new THREE.Group(), shell=new THREE.Mesh(body,spiritMaterial);g.add(shell);
    for(const x of [-.21,.21]){const dot=new THREE.Mesh(eye,mat);dot.position.set(x,.12,.55);g.add(dot);}
    scene.add(g);return {g,i};
  });
  return {
    touches(x,z){return spirits.some(({g})=>Math.hypot(g.position.x-x,g.position.z-z)<1.25);},
    sync(round){gates.forEach((m,i)=>m.visible=!(round.skyGates||[]).includes(i));},
    tick(t){
      for(const {g,i} of spirits){
        const [x,z]=skyGates[i],a=t*.85+i;g.position.set(x+Math.sin(a)*2,.72,z+Math.cos(a)*1.3);g.rotation.y=a;
      }
      if(!reduced)gates.forEach((m,i)=>{m.rotation.y=t*.65+i;m.position.y=1.7+Math.sin(t*2+i)*.12;});}
  };
}
