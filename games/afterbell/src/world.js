import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { NPCS, EXIT } from './core.js';
import { createCampusEnvironment, normalizeEnvironment } from './environment.js';
import { findRoute, clearSegment, arrivedAtGoal } from './navigation.js';

export function createWorld(container, { reduced = false, onMove, onInteract, onCollect, onEnvironmentChange }) {
  let seed = 7919;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1a2833');
  scene.fog = new THREE.FogExp2('#1a2833', .011);
  const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, .1, 210);
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 600 ? 1.15 : 1.5));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute('aria-label', 'קמפוס בית הספר בתלת־ממד. זזים בחצים או במקשי WASD; אפשר ללחוץ על הקרקע.');
  container.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight('#b3c5de', '#374039', 1.25));
  const moonlight = new THREE.DirectionalLight('#a4bdd5', 2.0);
  moonlight.position.set(-22, 34, 12); moonlight.castShadow = true;
  moonlight.shadow.mapSize.set(innerWidth < 600 ? 1024 : 1536, innerWidth < 600 ? 1024 : 1536);
  Object.assign(moonlight.shadow.camera, { left: -38, right: 38, top: 38, bottom: -38, near: .1, far: 100 });
  moonlight.shadow.bias = -.0006; moonlight.shadow.normalBias = .035;
  scene.add(moonlight);
  const rim = new THREE.DirectionalLight('#d7a270', .65); rim.position.set(12, 7, -40); scene.add(rim);
  const mats = new Map();
  function mat(color, emissive = false) {
    const key = `${color}/${emissive}`;
    if (!mats.has(key)) mats.set(key, new THREE.MeshStandardMaterial({ color, roughness: .9,
      ...(emissive ? { emissive: color, emissiveIntensity: 1.15 } : {}) }));
    return mats.get(key);
  }
  function texture(kind) {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = kind === 'grass' ? '#798073' : kind === 'brick' ? '#9b8a79' : '#969a9b'; ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 11000; i++) {
      const v = Math.floor(rand() * 60), x = rand() * 256, y = rand() * 256;
      ctx.fillStyle = `rgba(${v},${v},${v},${rand() * .13})`; ctx.fillRect(x, y, kind === 'grass' ? 1 : 2, kind === 'grass' ? 4 : 2);
    }
    if (kind === 'brick') {
      ctx.strokeStyle = '#6b6f6b'; ctx.lineWidth = 2;
      for (let y = 0; y < 256; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke(); for (let x = (y % 64 ? 32 : 0); x < 256; x += 64) {ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+32);ctx.stroke();} }
    }
    const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(kind === 'grass' ? 26 : 3, kind === 'grass' ? 26 : 3); t.anisotropy = 4;
    return t;
  }
  const grassMat = new THREE.MeshStandardMaterial({ color: '#667560', map: texture('grass'), roughness: 1 });
  const concreteMat = new THREE.MeshStandardMaterial({ color: '#a8aba5', map: texture('concrete'), roughness: .95 });
  const brickMat = new THREE.MeshStandardMaterial({ color: '#b0a698', map: texture('brick'), roughness: 1 });
  const asphaltMat = new THREE.MeshStandardMaterial({ color: '#717677', map: texture('concrete'), roughness: .95 });
  function mesh(geo, color, x, y, z, parent = scene, emissive = false) {
    const material = typeof color === 'string' ? mat(color, emissive) : color;
    const m = new THREE.Mesh(geo, material); m.position.set(x, y, z);
    m.castShadow = !emissive; m.receiveShadow = !emissive; parent.add(m); return m;
  }
  const box = (x,y,z,w,h,d,c,p=scene,e=false) => mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z,p,e);
  const ball = (x,y,z,r,c,p=scene,detail=1,e=false) => mesh(new THREE.SphereGeometry(r,12,8),c,x,y,z,p,e);
  const cone = (x,y,z,r,h,c,p=scene,s=8) => mesh(new THREE.ConeGeometry(r,h,s),c,x,y,z,p);
  const cyl = (x,y,z,r,h,c,p=scene,s=10) => mesh(new THREE.CylinderGeometry(r,r,h,s),c,x,y,z,p);
  function ellipsoid(x,y,z,rx,ry,rz,color,parent=scene) {const m=ball(x,y,z,1,color,parent);m.scale.set(rx,ry,rz);return m;}
  function segment(a,b,r,color,parent=scene) {const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),delta=to.clone().sub(from);const m=mesh(new THREE.CylinderGeometry(r*.7,r,delta.length(),7),color,...from.clone().add(to).multiplyScalar(.5).toArray(),parent);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;}
  const obstacles = [];
  const circleObstacle = (x,z,r) => obstacles.push({ x,z,r });
  function blocked(x,z) {return Math.abs(x)>27||Math.abs(z)>27||obstacles.some(o=>!o.disabled&&(o.hx!==undefined?Math.abs(x-o.x)<o.hx+.28&&Math.abs(z-o.z)<o.hz+.28:o.r?Math.hypot(x-o.x,z-o.z)<o.r+.35:((x-o.x)/(o.rx+.3))**2+((z-o.z)/(o.rz+.3))**2<1));}
  function groundDisc(x,z,rx,rz,c,y=.03) {const m=mesh(new THREE.CylinderGeometry(1,1,.045,48),c,x,y,z);m.scale.set(rx,1,rz);return m;}
  // Continuous terrain and a real perimeter replace the floating toy island.
  const terrain=box(0,-.2,0,180,.3,180,grassMat);terrain.castShadow=false;
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2, hill=ellipsoid(Math.cos(a)*72,3,Math.sin(a)*72,24,9+rand()*9,20,'#273c3d');hill.castShadow=false;}
  function path(points,width=2.3) {
    for(let i=0;i<points.length-1;i++) {const a=points[i],b=points[i+1],d=Math.hypot(b[0]-a[0],b[1]-a[1]);const p=box((a[0]+b[0])/2,.015,(a[1]+b[1])/2,width,.055,d,asphaltMat);p.rotation.y=Math.atan2(b[0]-a[0],b[1]-a[1]);groundDisc(a[0],a[1],width/2,width/2,asphaltMat,.046);}
  }
  path([[0,25],[0,12],[-3,4],[0,-4],[0,-12]],3.1);
  path([[-3,4],[-10,1],[-13,-9],[-15,-17]],2.5);
  path([[0,-4],[8,-5],[13,-7],[20,-13]],2.5);
  path([[0,12],[10,14],[19,18]],2.5);
  path([[-13,-9],[-7,-15],[0,-16],[8,-17],[13,-7]],2.1);
  path([[0,-12],[7,-17],[7,-24],[0,-25]],2.2);
  groundDisc(0,9,4.6,3.8,concreteMat,.05);
  // Pond uses a dark, reflective material instead of a bright decorative disk.
  groundDisc(-17,13,7.1,5.5,'#4c5c52',.025);
  const waterMat=new THREE.MeshStandardMaterial({color:'#214d5b',roughness:.18,metalness:.45});
  groundDisc(-17,13,6.7,5.2,waterMat,.06);
  obstacles.push({x:-17,z:13,rx:6.5,rz:5});
  for(let i=0;i<28;i++){const a=rand()*Math.PI*2,x=-17+Math.cos(a)*7,z=13+Math.sin(a)*5.5;for(let j=0;j<3;j++)segment([x+j*.1,0,z],[x+j*.1+.08,.5+rand()*.5,z],.018,'#7a8464');}
  for(let i=0;i<7;i++){const a=i*.9;groundDisc(-17+Math.cos(a)*4.6,13+Math.sin(a)*3,.28,.23,'#71836b',.09);}
  const windowMat=new THREE.MeshStandardMaterial({color:'#687b83',roughness:.22,metalness:.55});
  const warmWindow=new THREE.MeshStandardMaterial({color:'#c7b38d',emissive:'#b38551',emissiveIntensity:.55,roughness:.35});
  const doorLeaves=[]; const doorBlocker={x:-2,z:-16.86,hx:1.34,hz:.09};
  function school() {
    const g=new THREE.Group();g.position.set(-2,0,-20);scene.add(g);
    box(0,4.9,0,12,3.2,6,brickMat,g);box(0,6.65,0,12.6,.35,6.6,concreteMat,g);
    box(0,.03,0,12,.08,6,concreteMat,g);box(0,1.65,-2.85,12,3.3,.3,brickMat,g);
    for(const side of [-1,1]){box(side*5.85,1.65,0,.3,3.3,6,brickMat,g);box(side*3.68,1.65,2.9,4.64,3.3,.2,brickMat,g);}
    box(0,1.2,-2.65,5,1.4,.04,'#526660',g);box(0,1.2,-2.6,2.2,.9,.04,'#d6cfb6',g);
    box(0,.2,3.5,13,.4,1.5,concreteMat,g);box(0,.08,4.15,6,.16,.7,concreteMat,g);
    for(const side of [-1,1]){const leaf=new THREE.Group();leaf.position.set(side*1.34,0,3.14);g.add(leaf);box(-side*.67,1.65,0,1.32,3.3,.07,windowMat,leaf);cyl(-side*1.13,1.5,.08,.025,.5,'#b5b9b6',leaf);doorLeaves.push(leaf);}
    box(0,3.7,3.8,3.4,.13,1.5,'#45555d',g);
    for(const x of [-4.75,-3.15,3.15,4.75])for(const y of [1.9,4.65]){
      box(x,y,3.045,1.3,1.7,.12,'#34424a',g);box(x,y,3.115,1.12,1.5,.03,(x+y)%2>.9?warmWindow:windowMat,g);box(x,y,3.14,.04,1.55,.05,'#9a9e98',g);box(x,y+.02,3.14,1.16,.04,.05,'#9a9e98',g);
    }
    for(const x of [-5.2,-1.7,1.7,5.2])box(x,3.25,3.11,.15,6.5,.15,'#c4c2b8',g);
    box(-3.9,7.05,-.8,2,.7,1.1,'#626e73',g);for(let i=0;i<7;i++)box(-4.7+i*.25,7.1,-.2,.05,.45,.05,'#34434b',g);
    cyl(4,8,-1,.06,2.7,'#7a868b',g);segment([3.5,8.5,-1],[4.5,8.5,-1],.025,'#929a9b',g);
    obstacles.push(doorBlocker,{x:-2,z:-22.85,hx:6,hz:.15},{x:-7.85,z:-20,hx:.15,hz:3},{x:3.85,z:-20,hx:.15,hz:3},{x:-5.68,z:-17.1,hx:2.32,hz:.1},{x:1.68,z:-17.1,hx:2.32,hz:.1});
  } school();
  function annex(x,z,glass=false) {
    const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
    box(0,1.9,0,5.5,3.8,4.4,glass?'#445e60':brickMat,g);box(0,3.95,0,5.8,.25,4.7,concreteMat,g);
    if(glass){for(const xx of [-2,-.7,.7,2]){box(xx,2,2.23,1.05,2.9,.08,windowMat,g);box(xx,2,2.3,.06,3.6,.08,'#a2b2ab',g);}for(const zz of [-1.5,0,1.5])box(-2.8,2,zz,.08,2.9,1.1,windowMat,g);}
    else {box(-1.8,2.1,2.25,1.3,1.5,.08,warmWindow,g);box(1.8,2.1,2.25,1.3,1.5,.08,windowMat,g);}
    box(0,1.5,2.3,1.2,3,.1,'#293b42',g);box(0,1.6,2.37,.9,2.5,.05,windowMat,g);box(0,.12,2.8,3,.24,1.1,concreteMat,g);circleObstacle(x,z,3.45);return g;
  }
  annex(-17,-12);annex(18,-11,true);
  // Steel communications tower, with no fairytale roof.
  const tower=new THREE.Group();tower.position.set(16,0,16);scene.add(tower);
  for(const x of [-.85,.85])for(const z of [-.85,.85])segment([x,0,z],[x*.6,8,z*.6],.085,'#737b7d',tower);
  for(let y=0;y<8;y+=2){segment([-.85,y,-.85],[.85,y+2,-.85],.04,'#646f73',tower);segment([-.85,y,.85],[.85,y+2,.85],.04,'#646f73',tower);box(0,y,0,1.8,.08,1.8,'#566269',tower);}
  box(0,8.2,0,2.8,.2,2.8,'#59666b',tower);cyl(0,9.5,0,.045,2.6,'#9aa9ad',tower);box(0,10.4,0,1.7,.05,.05,'#9aa9ad',tower);
  const aerial=mesh(new THREE.SphereGeometry(.65,16,10,0,Math.PI*2,0,Math.PI/2),'#819398',.85,7.8,.9,tower);aerial.rotation.x=-Math.PI/2;circleObstacle(16,16,1.7);
  // Perimeter fencing makes the bounded space legible as a school campus.
  function fence(a,b){const d=Math.hypot(b[0]-a[0],b[1]-a[1]),steps=Math.ceil(d/2.5);for(let i=0;i<=steps;i++){const t=i/steps;box(a[0]+(b[0]-a[0])*t,1.05,a[1]+(b[1]-a[1])*t,.07,2.1,.07,'#48585e');}for(const y of [.5,1.4,2.05])segment([a[0],y,a[1]],[b[0],y,b[1]],.018,'#738184');}
  fence([-27,-27],[-3,-27]);fence([3,-27],[27,-27]);fence([-27,-27],[-27,27]);fence([27,-27],[27,27]);fence([-27,27],[27,27]);
  box(-2.5,2.4,-25,.38,4.8,.5,concreteMat);box(2.5,2.4,-25,.38,4.8,.5,concreteMat);box(0,4.8,-25,5.4,.3,.6,'#5b686c');
  const gate=new THREE.Group();scene.add(gate);
  const leaves=[-1,1].map(side=>{const g=new THREE.Group();g.position.set(side*2.2,0,-25);gate.add(g);for(let i=0;i<7;i++)box(-side*i*.32,1.9,0,.045,3.8,.08,'#66757a',g);for(const y of [.7,2.7,3.8])box(-side*1, y,0,2.15,.06,.08,'#66757a',g);return g;});
  const seals=[-1.15,0,1.15].map(x=>box(x,4.8,-24.65,.28,.13,.06,'#b66c4f',scene,true));
  const exitLight=new THREE.PointLight('#accca0',0,8,2);exitLight.position.set(0,3.5,-25);scene.add(exitLight);
  function softPool(x,z,size,color='#d9b574') {
    const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),grad=ctx.createRadialGradient(32,32,1,32,32,32);grad.addColorStop(0,'rgba(244,211,153,.24)');grad.addColorStop(1,'rgba(244,211,153,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,64,64);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false,color}));m.rotation.x=-Math.PI/2;m.position.set(x,.11,z);scene.add(m);return m;
  }
  function lamp(x,z) {cyl(x,1.9,z,.045,3.8,'#43525b');box(x,3.75,z+.24,.15,.13,.65,'#b8b6a3',scene);const bulb=box(x,3.68,z+.35,.11,.025,.4,'#d6b884',scene,true);const pool=softPool(x,z+1.1,4.8);return {bulb,pool};}
  const lampFixture=lamp(-2,10);[[2,-4],[-12,-7],[12,-5],[10,12],[-5,-13],[6,-22],[2,-25],[-8,2],[18,4]].forEach(p=>lamp(...p));
  const porchLight=new THREE.PointLight('#e5b777',12,14,2);porchLight.position.set(-2,3.8,-15.5);scene.add(porchLight);
  function bench(x,z,r=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=r;scene.add(g);for(let i=0;i<4;i++)box(0,.56,-.33+i*.22,2.5,.06,.17,'#837864',g);for(let i=0;i<3;i++)box(0,.95+i*.17,-.48,2.5,.12,.06,'#837864',g);for(const xx of [-.9,.9]){box(xx,.27,0,.07,.54,.73,'#3d4a51',g);box(xx,.98,-.48,.06,.84,.06,'#3d4a51',g);}circleObstacle(x,z,1.15);}
  bench(8,15);bench(-10,-8,Math.PI/2);bench(-6,10);
  // Familiar campus details: basketball court, bicycle rack, air conditioning and utility cabinets.
  box(11,.015,22,11,.05,7,'#606f6c');for(const x of [5.6,16.4])box(x,.06,22,.04,.01,6.7,'#b8b9ad');for(const z of [18.7,25.3])box(11,.06,z,10.8,.01,.04,'#b8b9ad');
  const courtLine=mesh(new THREE.RingGeometry(1.75,1.78,48),'#b8b9ad',11,.07,22);courtLine.rotation.x=-Math.PI/2;
  cyl(16.3,1.65,22,.07,3.3,'#6e7b7d');box(15.95,3.1,22,.08,1.05,1.6,'#9da9a5');box(15.89,3.05,22,.02,.5,.75,'#c1c6b5');const hoop=mesh(new THREE.TorusGeometry(.27,.025,5,18),'#a87957',15.58,2.83,22);hoop.rotation.x=Math.PI/2;circleObstacle(16.3,22,.25);
  for(let i=0;i<3;i++){const x=-20.5+i*.5;const rack=mesh(new THREE.TorusGeometry(.35,.035,5,12,Math.PI),'#7e898a',x,.35,-8.5);rack.rotation.y=Math.PI/2;}
  for(const x of [-22,-21]){const wheel=mesh(new THREE.TorusGeometry(.31,.035,5,18),'#26353d',x,.35,-8.5);wheel.rotation.y=Math.PI/2;}segment([-22,.35,-8.5],[-21.5,.9,-8.5],.025,'#93624d');segment([-21,.35,-8.5],[-21.5,.9,-8.5],.025,'#93624d');segment([-22,.35,-8.5],[-21,.35,-8.5],.025,'#93624d');
  // Natural foliage: irregular crowns, tapered branches, muted colors and varied silhouette.
  function tree(x,z,scale=1) {
    const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(scale);scene.add(g);
    const lean=(rand()-.5)*.6;segment([0,0,0],[lean,4.6,0],.19,'#665f51',g);
    for(let i=0;i<4;i++){const a=i*Math.PI*.5+rand()*.5,xx=Math.cos(a)*(1+rand()*.5),zz=Math.sin(a)*(1+rand()*.5),yy=3.5+rand()*2;segment([lean*.6,2.4+i*.4,0],[xx,yy,zz],.075,'#605c4e',g);const crown=ellipsoid(xx,yy+.7,zz,1.4+rand()*.6,1.5+rand()*.6,1.3+rand()*.6,['#344a3e','#405947','#465b49','#51634c'][i],g);crown.rotation.z=(rand()-.5)*.8;}
    circleObstacle(x,z,.45*scale);
  }
  for(let i=0;i<56;i++){const side=i%4,t=-29+Math.floor(i/4)*4.1,jitter=rand()*2;tree(side<2?t:(side===2?-29:29)+jitter,side<2?(side===0?-29:29)+jitter:t,.75+rand()*.45);}
  [[-23,-8],[-24,-3],[-22,1],[-20,-3],[-8,20],[-5,23],[6,26],[21,5],[24,1],[21,-2],[8,-13],[-7,-5],[-9,-18],[22,22],[-24,22],[-9,16]].forEach(([x,z])=>tree(x,z,.65+rand()*.4));
  for(let i=0;i<120;i++){const x=(rand()-.5)*54,z=(rand()-.5)*54;if(Math.abs(x)<4||obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<(o.r||7)+.8))continue;if(i%5===0){const rock=ellipsoid(x,.2,z,.45+rand()*.3,.25,.4,'#737b72');rock.rotation.y=rand()*6;}else{for(let j=0;j<3;j++)segment([x+j*.1,0,z],[x+j*.1+.08,.25+rand()*.25,z+.06],.012,'#6c7c5d');}}
  // All signage is rendered locally and uses the school's exact identity.
  function sign(x,y,z,width,title,subtitle='') {
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#243139';ctx.fillRect(0,0,1024,256);ctx.strokeStyle='#a5a894';ctx.lineWidth=4;ctx.strokeRect(12,12,1000,232);ctx.textAlign='center';ctx.direction='rtl';ctx.fillStyle='#e1dfd1';ctx.font='bold 62px Arial';ctx.fillText(title,512,subtitle?108:150);if(subtitle){ctx.font='34px Arial';ctx.fillStyle='#bfc6bb';ctx.fillText(subtitle,512,190);}
    const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;const board=new THREE.Mesh(new THREE.PlaneGeometry(width,width/4),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));board.position.set(x,y,z);scene.add(board);return board;
  }
  sign(-2,5.75,-16.75,10,'בית הספר שי עגנון','כיתה ז׳ איינשטיין · כיתת הייטק');
  sign(-17,3.55,-9.65,4.4,'01 · ספריית איינשטיין');sign(18,3.55,-8.65,4.4,'02 · מעבדת ההייטק');sign(16,3.2,17.1,3.2,'03 · תחנת הקשר');sign(0,5.55,-24.8,4.8,'יציאה');
  box(-4,1.1,5,.07,2.2,.07,'#64716d');sign(-4,2.1,5.1,3.5,'קמפוס שי עגנון','ז׳ איינשטיין · כיתת הייטק');
  // Warm, low-contrast skyline; the moon is distant rather than an oversized decorative mascot.
  ball(-38,30,-57,1.7,'#bbcbd3',scene,3,true);
  const starPoints=[];for(let i=0;i<85;i++){const a=rand()*Math.PI*2,r=65+rand()*35;starPoints.push(Math.cos(a)*r,25+rand()*40,Math.sin(a)*r);}
  const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPoints,3));scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:'#bbcad6',size:.08,transparent:true,opacity:.65})));
  // Quest objects are tangible equipment, with restrained markers. They stay independent from static batching.
  const equipment=new Map();
  function equipmentBase(id,x,z) {const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);box(0,.45,0,.85,.9,.6,'#4b575a',g);box(0,.95,0,1.05,.1,.8,'#7c8580',g);equipment.set(id,g);return g;}
  const card=equipmentBase('card',-21,-3);box(0,1.05,0,.48,.035,.3,'#c7c8b8',card);box(-.11,1.073,0,.12,.005,.18,'#507c86',card);for(let i=0;i<3;i++)box(.08,1.073,-.07+i*.065,.17,.005,.015,'#606765',card);
  const fuse=equipmentBase('fuse',21,3);const fuseBody=cyl(0,1.09,0,.07,.45,'#d6ccac',fuse);fuseBody.rotation.z=Math.PI/2;for(const x of [-.21,.21]){const end=cyl(x,1.09,0,.075,.07,'#a6b0b2',fuse);end.rotation.z=Math.PI/2;}
  const antenna=equipmentBase('antenna',-8,22);box(0,1.12,0,.35,.25,.22,'#2e3e48',antenna);segment([0,1.25,0],[.24,2.05,.02],.018,'#bbc5c1',antenna);box(0,1.14,.12,.19,.1,.025,'#718576',antenna);
  const stations=NPCS.map((n,i)=>{const g=new THREE.Group();g.position.set(n.x+1.2,0,n.z-.9);scene.add(g);box(0,.65,0,.7,1.3,.45,'#4a585d',g);const screen=box(0,1.05,.24,.48,.34,.025,'#a4784e',g,true);box(0,.67,.25,.45,.06,.05,'#7b8988',g);const light=new THREE.PointLight('#e3ae72',0,7,2);light.position.set(n.x,2.5,n.z);scene.add(light);return {g,screen,light};});
  const campus=createCampusEnvironment({scene,box,ball,cyl,mesh,segment,mat,sign,softPool,doorLeaves,doorBlocker,lampFixture});
  // Batch immutable scenery by material to keep the richer geometry inexpensive to render.
  scene.updateMatrixWorld(true);const movingScenery=new Set([gate,...seals,...equipment.values(),...stations.map(s=>s.g),...campus.dynamic]),batches=new Map(),originals=[];
  scene.traverse(node=>{if(!node.isMesh)return;let parent=node;while(parent){if(movingScenery.has(parent))return;parent=parent.parent;}if(node.material.transparent)return;const batch=batches.get(node.material)||[];batch.push(node.geometry.clone().applyMatrix4(node.matrixWorld));batches.set(node.material,batch);originals.push(node);});
  for(const [material,geometries] of batches){const geometry=mergeGeometries(geometries);if(!geometry)continue;const combined=new THREE.Mesh(geometry,material);combined.castShadow=!material.isMeshBasicMaterial&&!(material.emissiveIntensity>1);combined.receiveShadow=true;scene.add(combined);for(const g of geometries)g.dispose();}
  for(const node of originals){node.removeFromParent();node.geometry.dispose();}
  function person(jacket='#a26e4e',skin='#c7a78b',hair='#313236',backpack=true) {
    const g=new THREE.Group(),legs=[],arms=[];
    // 1.85m silhouette, small head, practical clothing and a restrained facial treatment.
    for(const side of [-1,1]){const leg=new THREE.Group();leg.position.set(side*.13,.91,0);g.add(leg);mesh(new THREE.CapsuleGeometry(.10,.59,4,8),'#3e4b55',0,-.36,0,leg);ellipsoid(0,-.83,.09,.115,.08,.23,'#27343a',leg);legs.push(leg);}
    mesh(new THREE.CapsuleGeometry(.235,.40,4,10),jacket,0,1.22,0,g).scale.z=.7;
    ellipsoid(0,1.48,-.08,.24,.16,.18,jacket,g);cyl(0,1.57,0,.075,.15,skin,g);
    ellipsoid(0,1.77,.015,.17,.215,.16,skin,g);ellipsoid(0,1.89,-.035,.177,.12,.17,hair,g);ellipsoid(0,1.82,-.12,.17,.16,.06,hair,g);
    for(const x of [-.065,.065])ball(x,1.79,.169,.015,'#343833',g);ellipsoid(0,1.73,.18,.025,.035,.045,skin,g);
    for(const side of [-1,1]){const arm=new THREE.Group();arm.position.set(side*.27,1.47,0);g.add(arm);mesh(new THREE.CapsuleGeometry(.075,.36,4,8),jacket,0,-.21,0,arm);ellipsoid(0,-.49,0,.07,.1,.065,skin,arm);arm.rotation.z=side*.09;arms.push(arm);}
    if(backpack){const pack=mesh(new THREE.CapsuleGeometry(.19,.26,4,8),'#33434a',0,1.2,-.24,g);pack.scale.z=.55;for(const side of [-1,1])box(side*.14,1.31,.16,.04,.43,.025,'#c0b69b',g);box(0,1.2,-.37,.21,.1,.035,'#8b9b91',g);}
    g.userData={legs,arms};return g;
  }
  const player=person();player.position.set(0,0,9);scene.add(player);
  const torch=mesh(new THREE.CylinderGeometry(.035,.045,.18,8),'#303c42',.30,.92,.13,player);torch.rotation.x=Math.PI/2;ball(.30,.92,.23,.03,'#e6d4a5',player,1,true);
  const flashTarget=new THREE.Object3D();flashTarget.position.set(.3,.1,6);player.add(flashTarget);
  const flashlight=new THREE.SpotLight('#f0dab1',18,13,.36,.65,1.6);flashlight.position.set(.3,.95,.24);flashlight.target=flashTarget;player.add(flashlight);
  const playerRing=mesh(new THREE.RingGeometry(.43,.46,40),'#b9c2b3',0,.1,9,scene,true);playerRing.rotation.x=-Math.PI/2;
  function fox(color='#9f704e',small=false) {
    const g=new THREE.Group(),legs=[];ellipsoid(0,.48,0,.21,.26,.56,color,g);ellipsoid(0,.67,.43,.22,.24,.24,color,g);
    const muzzle=cone(0,.61,.7,.115,.35,'#c7c3ac',g,10);muzzle.rotation.x=Math.PI/2;ball(0,.61,.88,.04,'#293533',g);
    for(const x of [-.13,.13]){cone(x,.99,.42,.10,.3,color,g,4);cone(x,.99,.45,.055,.18,'#62564c',g,4);ball(x,.73,.59,.022,'#252d2d',g);}
    for(const x of [-.14,.14])for(const z of [-.31,.32]){const leg=new THREE.Group();leg.position.set(x,.45,z);g.add(leg);cyl(0,-.19,0,.045,.4,'#514c44',leg,7);ellipsoid(0,-.39,.03,.05,.04,.1,'#353c39',leg);legs.push(leg);}
    const tail=ellipsoid(0,.56,-.76,.16,.17,.49,color,g);tail.rotation.x=-.4;ellipsoid(0,.72,-1.1,.13,.13,.2,'#c6c4ae',g);g.userData={legs};if(small)g.scale.setScalar(.85);return g;
  }
  function critter(type,color) {
    const g=new THREE.Group();
    if(type==='rabbit'){ellipsoid(0,.24,0,.19,.22,.32,color,g);ellipsoid(0,.43,.24,.15,.17,.16,color,g);for(const x of [-.075,.075]){const ear=ellipsoid(x,.71,.2,.04,.21,.045,color,g);ear.rotation.z=x>0?-.15:.15;ball(x,.47,.37,.014,'#263330',g);}ellipsoid(0,.16,-.28,.085,.09,.08,'#bcbdb0',g);for(const x of [-.15,.15])ellipsoid(x,.07,.13,.08,.06,.16,color,g);}
    else{ellipsoid(0,.32,0,.18,.23,.3,color,g);ellipsoid(0,.59,.18,.13,.14,.13,color,g);const beak=cone(0,.57,.37,.035,.15,'#ad9367',g,8);beak.rotation.x=Math.PI/2;for(const x of [-.09,.09])ball(x,.62,.28,.012,'#222e30',g);for(const x of [-.075,.075])cyl(x,.08,.04,.016,.16,'#887c62',g,6);ellipsoid(-.16,.34,-.02,.04,.17,.25,'#58676b',g);ellipsoid(.16,.34,-.02,.04,.17,.25,'#58676b',g);}
    return g;
  }
  const npcMeshes=NPCS.map((n,i)=>{const g=person(['#65747c','#6c7357','#7c5350'][i],['#b5947b','#c7a88a','#af8c72'][i],['#353231','#3c332c','#292e31'][i],i!==1);g.position.set(n.x,0,n.z);g.rotation.y=.3-i*.45;scene.add(g);const ring=mesh(new THREE.RingGeometry(.65,.68,36),n.color,n.x,.1,n.z,scene,true);ring.rotation.x=-Math.PI/2;const marker=ball(n.x,2.35,n.z,.065,'#c1b995',scene,1,true);return {g,marker,ring};});
  const animals=[];
  for(let i=0;i<16;i++){const type=i%3===0?'fox':i%3===1?'rabbit':'bird';const g=type==='fox'?fox('#947553',true):critter(type,type==='rabbit'?'#9d9d8c':'#7d8a8b');let x=(rand()-.5)*43,z=(rand()-.5)*43;for(let tries=0;tries<80&&blocked(x,z);tries++){x=(rand()-.5)*43;z=(rand()-.5)*43;}g.position.set(x,0,z);scene.add(g);animals.push({g,type,angle:rand()*Math.PI*2,speed:.3+rand()*.55,turn:rand()*4});}
  for(let i=0;i<3;i++){const g=critter('duck','#8f947b');g.scale.setScalar(1.05);scene.add(g);animals.push({g,type:'duck',angle:i*2,speed:.3,turn:0});}
  const fireflies=Array.from({length:12},(_,i)=>{const positions=[[-4,12],[-8,4],[-14,-3],[-9,-12],[4,-10],[10,-2],[18,2],[19,11],[9,21],[-7,20],[-23,-1],[5,-23]];const [x,z]=positions[i];return {x,z,mesh:ball(x,1.1,z,.055,'#c9c693',scene,1,true)};});
  const destination=mesh(new THREE.RingGeometry(.26,.30,24),'#c1c9b4',0,.12,0,scene,true);destination.rotation.x=-Math.PI/2;destination.visible=false;
  const keys=new Set();let joystick={x:0,z:0},target=null,active=false,paused=false,velocityY=0,jumpY=0,worldTime=0,manual=false,environment=normalizeEnvironment(),observing=false,seatedPose=false;
  const guide={goal:null,endpoint:null,route:[],following:false,arrived:false,blocked:false,anchor:null,lastPlan:-10};
  let walkRoute=[],walkKind=null,lastTrail=-1;
  // One instanced draw call for the whole route; no lights, textures or pulsing.
  const trail=new THREE.InstancedMesh(new THREE.RingGeometry(.09,.16,8),new THREE.MeshBasicMaterial({color:'#efd09b',transparent:true,opacity:.82,depthWrite:false,side:THREE.DoubleSide}),160);trail.count=0;trail.frustumCulled=false;scene.add(trail);
  const beacon=new THREE.Group();scene.add(beacon);beacon.visible=false;
  const beaconRing=mesh(new THREE.RingGeometry(.56,.63,32),'#e4be7d',0,.16,0,beacon,true);beaconRing.rotation.x=-Math.PI/2;
  const beaconArrow=cone(0,2.8,0,.22,.5,'#e4be7d',beacon,4);beaconArrow.rotation.z=Math.PI;
  const beaconStem=mesh(new THREE.CylinderGeometry(.025,.025,2.3,6),new THREE.MeshBasicMaterial({color:'#e4be7d',transparent:true,opacity:.3,depthWrite:false}),0,1.4,0,beacon);
  const trailMatrix=new THREE.Matrix4(),trailRotation=new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2,0,0)),trailScale=new THREE.Vector3(1,1,1);
  function drawGuide(){
    trail.count=0;beacon.visible=active&&!!guide.goal;if(!active||!guide.goal)return;
    const endpoint=guide.endpoint||guide.goal;beacon.position.set(endpoint.x,0,endpoint.z);
    let previous={x:player.position.x,z:player.position.z},count=0;
    for(const point of guide.route){const distance=Math.hypot(point.x-previous.x,point.z-previous.z),steps=Math.ceil(distance/.75);for(let i=1;i<=steps&&count<160;i++){const t=i/steps;trailMatrix.compose(new THREE.Vector3(previous.x+(point.x-previous.x)*t,.15,previous.z+(point.z-previous.z)*t),trailRotation,trailScale);trail.setMatrixAt(count++,trailMatrix);}previous=point;}
    trail.count=count;trail.instanceMatrix.needsUpdate=true;lastTrail=worldTime;
  }
  function planGuide(){
    if(!guide.goal)return;const start={x:player.position.x,z:player.position.z};const path=arrivedAtGoal(start,guide.goal)?[]:findRoute(start,guide.goal,blocked);
    guide.route=path||[];guide.endpoint=path===null?null:(path.at(-1)||start);guide.blocked=path===null;guide.arrived=path!==null&&path.length===0;guide.anchor=start;guide.lastPlan=worldTime;
    if(guide.following){walkRoute=[...guide.route];walkKind=guide.blocked||guide.arrived?null:'guide';if(!walkKind)guide.following=false;}
    drawGuide();
  }
  function guideTo(x,z){
    if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>27||Math.abs(z)>27)return false;
    guide.goal={x,z};guide.following=false;walkRoute=[];walkKind=null;target=null;planGuide();return !guide.blocked;
  }
  function stopGuide(){guide.following=false;walkRoute=[];walkKind=null;target=null;destination.visible=false;}
  function followGuide(){
    if(!active||paused||!guide.goal)return false;standUp();observing=false;planGuide();
    if(guide.blocked||guide.arrived)return false;guide.following=true;walkKind='guide';walkRoute=[...guide.route];keys.clear();joystick={x:0,z:0};return true;
  }
  function guidance(){let remaining=0,p=player.position;for(const next of guide.route){remaining+=Math.hypot(next.x-p.x,next.z-p.z);p=next;}return {following:guide.following,arrived:guide.arrived,blocked:guide.blocked,goal:guide.goal&&{...guide.goal},remaining:+remaining.toFixed(1),route:guide.route.map(p=>({...p})),endpoint:guide.endpoint&&{...guide.endpoint}};}
  function walkToPoint(point){
    standUp();observing=false;stopGuide();const path=findRoute({x:player.position.x,z:player.position.z},point,blocked,{radius:.1});
    if(!path?.length)return;walkRoute=path;walkKind='click';destination.position.set(path.at(-1).x,.12,path.at(-1).z);destination.visible=true;
  }

  const cameraTarget=new THREE.Vector3();
  function jump(){if(active&&!paused&&jumpY===0){standUp();observing=false;stopGuide();velocityY=5.8;}}
  function standUp(){if(!environment.seated)return;environment.seated=false;player.position.set(-6,0,11.8);onEnvironmentChange?.({seated:false});}
  function applyEnvironment(next,options){environment=next;campus.sync(next,options);if(next.seated){player.position.set(-6,-.35,10.1);player.rotation.y=0;seatedPose=true;}else if(seatedPose){player.position.set(-6,0,11.8);seatedPose=false;}npcMeshes.forEach((n,i)=>{const helped=next.helped.includes(NPCS[i].id);n.g.userData.arms[0].rotation.x=helped?-1.1:0;n.g.userData.arms[1].rotation.x=helped?-.45:0;n.ring.material=mat(helped?'#bbd0ab':NPCS[i].color,true);});}
  function setActive(value){active=value;stopGuide();keys.clear();observing=false;drawGuide();}
  function setPaused(value){paused=value;keys.clear();joystick={x:0,z:0};target=null;destination.visible=false;}
  function clearInputs(){keys.clear();joystick={x:0,z:0};stopGuide();}
  window.addEventListener('blur',clearInputs);
  window.addEventListener('keydown',e=>{if(!active||paused||e.target.matches('input,select,textarea'))return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyW','KeyA','KeyS','KeyD'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='Space')jump();if(e.code==='KeyE'&&!e.repeat)onInteract();});
  window.addEventListener('keyup',e=>keys.delete(e.code));
  const ray=new THREE.Raycaster(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);let pointerStart=null;
  renderer.domElement.addEventListener('pointerdown',e=>{pointerStart={x:e.clientX,y:e.clientY};});
  renderer.domElement.addEventListener('pointerup',e=>{if(!active||paused||!pointerStart||Math.hypot(e.clientX-pointerStart.x,e.clientY-pointerStart.y)>10)return;ray.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2),camera);const hit=new THREE.Vector3();if(ray.ray.intersectPlane(plane,hit)&&Math.abs(hit.x)<27&&Math.abs(hit.z)<27){walkToPoint({x:hit.x,z:hit.z});}});
  // Lower camera reads as being inside a place, while retaining the same input basis.
  const followOffset=new THREE.Vector3(11.5,12.5,15.55);
  function update(dt,draw=true){
    if(!paused)worldTime+=dt;
    if(active&&!paused){let dx=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0)+joystick.x;let dz=(keys.has('KeyS')||keys.has('ArrowDown')?1:0)-(keys.has('KeyW')||keys.has('ArrowUp')?1:0)+joystick.z;let mx=dx*.806+dz*.592,mz=-dx*.592+dz*.806;
      if(dx||dz){standUp();observing=false;stopGuide();}
      else if(walkKind){
        while(walkRoute.length&&Math.hypot(walkRoute[0].x-player.position.x,walkRoute[0].z-player.position.z)<.10){walkRoute.shift();if(walkKind==='guide')guide.route.shift();}
        if(!walkRoute.length){if(walkKind==='guide'){guide.arrived=true;guide.following=false;}walkKind=null;target=null;destination.visible=false;mx=mz=0;drawGuide();}
        else{target=walkRoute[0];mx=target.x-player.position.x;mz=target.z-player.position.z;}
      }
      if(target){standUp();observing=false;}const len=Math.hypot(mx,mz),moving=len>.05&&!environment.seated&&!observing;
      if(moving){const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?7.2:4.5,step=target?Math.min(len,dt*speed):dt*speed,nx=player.position.x+mx/len*step,nz=player.position.z+mz/len*step;
        if(target){if(clearSegment(player.position,{x:nx,z:nz},blocked)){player.position.x=nx;player.position.z=nz;}else{const wasGuide=walkKind==='guide';stopGuide();if(wasGuide){guide.blocked=true;guide.lastPlan=worldTime;}}}
        else{if(!blocked(nx,player.position.z))player.position.x=nx;if(!blocked(player.position.x,nz))player.position.z=nz;}
        player.rotation.y=Math.atan2(mx,mz);
      }
      if(guide.goal&&!guide.following&&worldTime-guide.lastPlan>=1&&(!guide.anchor||Math.hypot(player.position.x-guide.anchor.x,player.position.z-guide.anchor.z)>1.1||guide.blocked))planGuide();
      if(worldTime-lastTrail>.3)drawGuide();
      if(jumpY>0||velocityY>0){velocityY-=14*dt;jumpY=Math.max(0,jumpY+velocityY*dt);if(jumpY===0)velocityY=0;}
      player.position.y=environment.seated?-.35:jumpY+(!reduced&&moving?Math.sin(worldTime*14)*.025:0);
      player.userData.legs.forEach((l,i)=>l.rotation.x=environment.seated?-1.3:!reduced&&moving?Math.sin(worldTime*10+i*Math.PI)*.5:0);player.userData.arms.forEach((a,i)=>a.rotation.x=environment.seated?-.35:!reduced&&moving?Math.sin(worldTime*10+i*Math.PI+Math.PI)*.3:0);
      playerRing.position.set(player.position.x,.1,player.position.z);for(let i=0;i<fireflies.length;i++){const f=fireflies[i];if(f.mesh.visible&&Math.hypot(player.position.x-f.x,player.position.z-f.z)<.95){f.mesh.visible=false;onCollect(i);}}onMove(player.position.x,player.position.z,dt);
    }
    if(!paused){campus.update(dt,reduced);animals.forEach((a,i)=>{if(a.type==='duck'){a.g.position.set(-17+Math.cos(worldTime*.13+i*2)*3,.08,13+Math.sin(worldTime*.13+i*2)*2);a.g.rotation.y=-(worldTime*.13+i*2);return;}const follow=environment.following===i;const destinationPoint=follow?player.position:environment.waterFilled&&i===1?{x:-8.5,z:8}:null;let speed=a.speed;if(destinationPoint){const dx=destinationPoint.x-a.g.position.x,dz=destinationPoint.z-a.g.position.z;a.angle=Math.atan2(dx,dz);speed=Math.hypot(dx,dz)>(follow?1.7:.6)?(follow?3.2:1):0;}else{a.turn-=dt;if(a.turn<=0){a.angle+=(rand()-.5)*2.4;a.turn=2+rand()*4;}}const x=a.g.position.x+Math.sin(a.angle)*dt*speed,z=a.g.position.z+Math.cos(a.angle)*dt*speed;if(blocked(x,z)){a.angle+=Math.PI*.7;}else{a.g.position.x=x;a.g.position.z=z;}a.g.rotation.y=a.angle;if(!reduced&&a.g.userData.legs)a.g.userData.legs.forEach((leg,j)=>leg.rotation.x=Math.sin(worldTime*7+j%2*Math.PI)*.35);if(!reduced)a.g.position.y=a.type==='rabbit'?Math.abs(Math.sin(worldTime*4+i))*.07:Math.abs(Math.sin(worldTime*5+i))*.015;});if(!reduced)fireflies.forEach((f,i)=>{f.mesh.position.y=1.1+Math.sin(worldTime*1.3+i)*.12;});}
    if(active&&observing){cameraTarget.set(-17,.6,13);camera.position.set(-9,3.7,18.5);camera.lookAt(cameraTarget);}
    else if(active){const next=new THREE.Vector3(player.position.x,1,player.position.z);cameraTarget.lerp(next,reduced?1:1-Math.exp(-dt*5));const offset=followOffset.clone().multiplyScalar(innerWidth<600?1.2:1);camera.position.copy(cameraTarget).add(offset);camera.lookAt(cameraTarget);}
    else{const mobile=innerWidth<600;cameraTarget.set(mobile?0:7,1,mobile?-7:-2);camera.position.set(mobile?35:38,mobile?25:27,mobile?39:38);camera.lookAt(cameraTarget);}
    if(draw)renderer.render(scene,camera);
  }
  let last=performance.now();function loop(now){const dt=Math.min((now-last)/1000,.05);last=now;if(!manual)update(dt);requestAnimationFrame(loop);}requestAnimationFrame(loop);
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();setPaused(true);container.dispatchEvent(new CustomEvent('worldlost'));});
  update(0);
  return {setActive,setPaused,jump,guideTo,followGuide,stopGuide,guidance,setJoystick(x,z){joystick={x,z};if(x||z)stopGuide();},setPlayer(x,z){if(environment.seated)standUp();observing=false;stopGuide();player.position.set(x,0,z);cameraTarget.set(x,1,z);if(guide.goal)planGuide();},getPlayer:()=>({x:player.position.x,z:player.position.z,y:jumpY}),animals:()=>animals.map((a,id)=>({id,type:a.type,x:+a.g.position.x.toFixed(1),z:+a.g.position.z.toFixed(1),following:environment.following===id,observed:environment.animalNotes.includes(id)})),
    setEnvironment:applyEnvironment,observe(value){observing=value;stopGuide();keys.clear();joystick={x:0,z:0};},isObserving:()=>observing,environmentAnimation:()=>campus.animation,performance:()=>({drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,pixelRatio:renderer.getPixelRatio()}),
    project(x,y,z){const p=new THREE.Vector3(x,y,z).project(camera);return {x:(p.x+1)/2*innerWidth,y:(1-p.y)/2*innerHeight,visible:p.z<1&&Math.abs(p.x)<1&&Math.abs(p.y)<1};},
    setProgress(round){fireflies.forEach((f,i)=>f.mesh.visible=!round.collected.includes(i));npcMeshes.forEach((n,i)=>n.marker.visible=!round.seals.includes(NPCS[i].id));for(const [id,g]of equipment)g.visible=!(round.items||[]).includes(id);stations.forEach((s,i)=>{const done=round.seals.includes(NPCS[i].id);s.screen.material=mat(done?'#91aa8b':'#a4784e',true);s.light.intensity=done?12:0;});seals.forEach((s,i)=>s.material=mat(round.seals.length>i?'#a7c1a0':'#9f684f',true));leaves.forEach((g,i)=>g.rotation.y=round.seals.length===3?(i===0?-1.35:1.35):0);exitLight.intensity=round.seals.length===3?10:0;},
    advanceTime(ms){manual=true;for(let t=0;t<Math.min(ms,60000);t+=1000/60)update(1/60,false);renderer.render(scene,camera);},resumeRealtime(){manual=false;last=performance.now();},blocked,dispose(){renderer.dispose();}
  };
}
