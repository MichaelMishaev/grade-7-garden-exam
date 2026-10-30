import * as THREE from 'three';
import {bridgeTile,bossPhase,attackLane,LANES} from './arcade-core.js';
export function createArcadeRenderer(canvas) {
  const gl=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power'});
  gl.setPixelRatio(Math.min(devicePixelRatio||1,1.5));gl.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();scene.background=new THREE.Color('#0b1922');scene.fog=new THREE.Fog('#0b1922',24,48);
  const camera=new THREE.OrthographicCamera(-7,7,8,-8,.1,80);camera.position.set(0,13,-9);camera.lookAt(0,0,6);
  scene.add(new THREE.HemisphereLight('#d6e9df','#213140',2.8));
  const sun=new THREE.DirectionalLight('#ffdcac',3);sun.position.set(-6,12,-4);scene.add(sun);
  const mats={};for(const [name,color] of Object.entries({stone:'#385560',dark:'#172c36',gold:'#f2c477',mint:'#9be3ce',purple:'#9271bd',ink:'#10151e',skin:'#ddbb8e',red:'#ef8e7f'}))mats[name]=new THREE.MeshStandardMaterial({color,roughness:.8});
  const make=(geo,mat,parent=scene,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m;};
  const box=(w,h,d,mat,parent,x,y,z)=>make(new THREE.BoxGeometry(w,h,d),mat,parent,x,y,z);
  const ring=(radius,mat,parent,x,y,z)=>{const m=make(new THREE.TorusGeometry(radius,.035,6,32),mat,parent,x,y,z);m.rotation.x=-Math.PI/2;return m;};
  box(22,.2,28,mats.ink,scene,0,-1.5,6);
  box(5,.5,3.2,mats.stone,scene,0,-.3,1);
  box(5,.5,3,mats.stone,scene,0,-.3,10.7);
  const arena=box(5,.5,10,mats.stone,scene,0,-.3,5.8);
  for(const side of [-1,1]){
    for(const z of [0,2.2,9.5,12]){box(.5,1.3,.5,mats.dark,scene,side*2.8,.4,z);make(new THREE.ConeGeometry(.43,.5,4),mats.gold,scene,side*2.8,1.3,z);}
    box(.18,.3,13,mats.dark,scene,side*2.7,-.1,6);
    for(const z of [1,10]){const flame=make(new THREE.OctahedronGeometry(.12),mats.gold,scene,side*2.2,.9,z);const light=new THREE.PointLight('#ffc872',3,5);light.position.copy(flame.position);scene.add(light);}
  }
  const tiles=[];
  for(let row=0;row<4;row++)for(const x of LANES){
    const material=mats.mint.clone();
    const tile=box(1.08,.18,1.45,material,scene,x,-.06,3.75+row*1.5);
    const edge=new THREE.LineSegments(new THREE.EdgesGeometry(tile.geometry),new THREE.LineBasicMaterial({color:'#9bd5c9'}));tile.add(edge);
    const cross=new THREE.Group();tile.add(cross);
    for(const side of [-1,1]){const line=box(.68,.025,.065,mats.gold,cross,0,.12,0);line.rotation.y=side*Math.PI/4;}
    tiles.push({tile,row,cross});
  }
  const player=new THREE.Group();scene.add(player);
  box(.4,.55,.32,mats.gold,player,0,.46,0);
  make(new THREE.SphereGeometry(.22,12,10),mats.skin,player,0,.93,0);
  make(new THREE.SphereGeometry(.235,12,8),mats.ink,player,0,1.02,.035).scale.y=.55;
  for(const x of [-.13,.13]){box(.13,.25,.18,mats.ink,player,x,.12,0);box(.11,.35,.12,mats.skin,player,x*2,.49,0);}
  const playerHalo=ring(.37,mats.mint,player,0,.02,0);
  const shield=make(new THREE.SphereGeometry(.65,20,12),new THREE.MeshBasicMaterial({color:'#a3e4dc',transparent:true,opacity:.15,wireframe:true}),player,0,.6,0);
  const boss=new THREE.Group();boss.position.set(0,0,11.7);scene.add(boss);
  make(new THREE.ConeGeometry(.72,1.6,7),mats.purple,boss,0,1,0);
  const head=make(new THREE.SphereGeometry(.5,16,10),mats.ink,boss,0,2,0);
  for(const side of [-1,1]){
    make(new THREE.SphereGeometry(.08,10,8),mats.mint,head,side*.18,.04,-.45);
    const horn=make(new THREE.ConeGeometry(.17,.6,5),mats.purple,head,side*.36,.6,0);horn.rotation.z=-side*.3;
    const arm=box(.25,1,.25,mats.purple,boss,side*.8,1.3,0);arm.rotation.z=side*.5;
  }
  const segments=[];
  for(let i=0;i<3;i++){
    const arc=make(new THREE.TorusGeometry(1.12,.07,6,24,Math.PI*.55),mats.gold,boss,0,1.6,0);
    arc.rotation.z=i*Math.PI*2/3;segments.push(arc);
  }
  const gate=new THREE.Group();gate.position.z=10.3;scene.add(gate);
  for(const x of [-1.6,-.8,0,.8,1.6])box(.08,2.3,.08,mats.gold,gate,x,1.1,0);
  box(3.5,.12,.12,mats.gold,gate,0,2.3,0);
  const zone=make(new THREE.PlaneGeometry(1.2,5),new THREE.MeshBasicMaterial({color:'#f2c477',transparent:true,opacity:.3,depthWrite:false}),scene,0,.045,6);zone.rotation.x=-Math.PI/2;
  const firing=LANES.map(x=>ring(.37,mats.gold,scene,x,.04,7.5));
  const gems=[];for(let i=0;i<3;i++)gems.push(make(new THREE.OctahedronGeometry(.16),mats.gold,scene,(i-1)*.6,.55,1));
  const particles=[];for(let i=0;i<18;i++)particles.push(make(new THREE.OctahedronGeometry(.07),i%2?mats.gold:mats.mint,scene,Math.sin(i*4)*2,1+i%4*.4,8+Math.cos(i*4)*2));
  function render(state,{reducedMotion=false}={}){
    const r=canvas.getBoundingClientRect();if(r.width<=0||r.height<=0)return;
    const ratio=r.width/r.height,vertical=Math.max(7.8,5.5/ratio);
    if(canvas.width!==Math.round(r.width*gl.getPixelRatio())||canvas.height!==Math.round(r.height*gl.getPixelRatio()))gl.setSize(r.width,r.height,false);
    camera.left=-vertical*ratio;camera.right=vertical*ratio;camera.top=vertical;camera.bottom=-vertical;camera.updateProjectionMatrix();
    const bossMode=['boss-ready','boss','victory'].includes(state.phase),time=reducedMotion?0:state.activeMs/1000;
    arena.visible=bossMode;gate.visible=!bossMode;boss.visible=true;
    tiles.forEach(({tile,row,cross})=>{
      tile.visible=!bossMode;const status=bridgeTile(state,row);cross.visible=status==='closed';
      tile.material.color.set(status==='open'?'#7cc5b6':status==='warning'?'#edb85f':'#492e3d');
      tile.position.y=status==='closed'&&!reducedMotion?-.55:-.06;
      tile.rotation.x=status==='closed'&&!reducedMotion?.12:0;
    });
    player.position.set(state.player.x,0,state.player.z);
    const walking=state.phase==='bridge'||state.phase==='boss';
    player.rotation.z=walking&&!state.paused&&!reducedMotion?Math.sin(time*8)*.025:0;
    playerHalo.visible=state.protectionMs>0||state.recoverMs>0;
    shield.visible=state.purchases.some(p=>p.item==='shield'&&p.status==='ready');
    const bp=bossPhase(state);zone.visible=state.phase==='boss'&&!state.assist&&['telegraph','attack'].includes(bp);
    zone.position.x=attackLane(state);zone.material.color.set(bp==='attack'?'#f18f83':'#f2c477');zone.material.opacity=bp==='attack'?.7:.28;
    firing.forEach(m=>m.visible=bossMode&&state.phase!=='victory');
    segments.forEach((m,i)=>{m.visible=i>=state.boss.hits.length;m.rotation.z=i*Math.PI*2/3+(reducedMotion?0:Math.sin(time)*.04);});
    boss.position.y=state.phase==='victory'?-.4:reducedMotion?0:Math.sin(time*2)*.06;
    boss.rotation.z=state.phase==='victory'?.2:0;
    gems.forEach((m,i)=>{m.visible=!!state.answers[i]&&i>=state.boss.hits.length;m.rotation.y=time;});
    particles.forEach((m,i)=>{m.visible=state.phase==='victory';m.rotation.y=time+i;});
    gl.render(scene,camera);
  }
  return {render,dispose(){scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});gl.dispose();}};
}
