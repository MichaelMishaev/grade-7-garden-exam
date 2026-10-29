import * as THREE from 'three';
import { ENVIRONMENT, normalizeEnvironment, puzzleSolved, environmentStatus, environmentAction } from './environment-state.js';
export { ENVIRONMENT, normalizeEnvironment, puzzleSolved, environmentStatus, environmentAction } from './environment-state.js';

export function createCampusEnvironment({ scene, box, ball, cyl, mesh, segment, mat, sign, softPool, doorLeaves, doorBlocker, lampFixture }) {
  const dynamic = new Set(), marks = new Map();
  const moving = object => { dynamic.add(object); return object; };
  for (const e of ENVIRONMENT) {
    const ring = moving(mesh(new THREE.RingGeometry(.36,.40,24), '#c6b387', e.x,.09,e.z));
    ring.rotation.x = -Math.PI/2; marks.set(e.id, ring);
  }
  doorLeaves.forEach(moving); moving(lampFixture.bulb);
  // A locker with an actual hinged panel and visible paper inside.
  box(-10,1.05,-13,.95,2.1,.6,'#50676e');
  box(-10,1.05,-12.68,.76,1.9,.02,'#293941');
  const lockerDoor = new THREE.Group(); lockerDoor.position.set(-10.46,0,-12.63); scene.add(lockerDoor);moving(lockerDoor);
  box(.46,1.05,0,.9,2.08,.055,'#718380',lockerDoor);box(.78,1.03,.04,.045,.23,.05,'#c2bfa9',lockerDoor);
  const lockerNote = moving(box(-10,1.1,-12.65,.48,.34,.025,'#d9cfac'));
  sign(-10,2.35,-12.6,2.5,'איינשטיין · ציוד משותף');
  // Grounded clues appear on a paper pinned to the existing campus board.
  const pin = moving(ball(-4,2.35,5.13,.055,'#b47e56'));
  // A short telescope aimed at the pond.
  for(const dx of [-.35,.35])segment([-8,1.25,16.7],[-8+dx,0,16.7+.35],.025,'#8b9491');
  segment([-8,1.25,16.7],[-8,0,16.25],.025,'#8b9491');
  const scope=mesh(new THREE.CylinderGeometry(.14,.18,.95,12),'#6b777b',-8,1.45,16.7);scope.rotation.z=Math.PI/2;scope.rotation.y=-.35;
  const lens=ball(-8.46,1.45,16.54,.13,'#7fabb1');lens.scale.x=.17;
  // Water bowl, a visibly growing planter and cleanup props.
  cyl(-8.5,.12,8,.42,.22,'#9caaa1');
  const water=moving(cyl(-8.5,.245,8,.36,.015,'#5696a3'));
  box(23,.3,-6,2,.6,1.2,'#79644d');box(23,.62,-6,1.85,.03,1.05,'#3e493c');
  const plants=new THREE.Group();plants.position.set(23,.62,-6);scene.add(plants);moving(plants);
  for(const x of [-.6,0,.6]){segment([x,0,0],[x,.72,0],.025,'#708762',plants);for(const side of [-1,1]){const leaf=ball(x+side*.14,.45,0,.19,'#7b936c',plants);leaf.scale.set(.8,.35,1.9);leaf.rotation.z=side*.7;}}
  cyl(24.1,.3,-5.8,.25,.55,'#809595');segment([24.1,.4,-5.8],[24.6,.6,-5.8],.065,'#809595');
  box(5,.6,10,.85,1.2,.85,'#536d67');box(5,1.23,10,.96,.12,.96,'#718b7e');sign(5,1.45,10.44,1.7,'מחזור');
  const litter=new THREE.Group();scene.add(litter);moving(litter);
  for(let i=0;i<3;i++){const can=cyl(4.1+i*.4,.12,10.8+(i%2)*.4,.10,.3,['#a5aaa0','#a98b71','#7b979b'][i],litter);can.rotation.z=1.2+i*.2;}
  // Puzzle has obvious physical switches; labels are repeated in the touch dialog.
  box(19,.8,8,1.4,1.6,.55,'#465a61');
  const toggles=[-.43,0,.43].map(x=>moving(box(19+x,1.05,8.32,.14,.35,.10,'#b39e78')));
  sign(19,1.9,8.33,2.7,'תאורת השביל','ירח · שמש · עץ');
  const pathLights=[];
  for(const [x,z]of [[16,7],[13,6],[10,5]]){cyl(x,.32,z,.08,.64,'#52615f');const bulb=moving(ball(x,.67,z,.13,'#d0bd8c'));const pool=softPool(x,z,3.2);pathLights.push({bulb,pool});}
  const bell=moving(ball(-21.48,.99,-8.5,.085,'#b6b7a5'));
  const soundRings=[0,1,2].map(i=>{const r=moving(mesh(new THREE.RingGeometry(.22,.24,24),'#d1c49f',-21.48,1.05,-8.4));r.visible=false;return r;});
  const basketball=moving(ball(12,.25,22,.24,'#a87848'));
  const seam=moving(mesh(new THREE.TorusGeometry(.242,.01,4,24),'#3d3933',0,0,0,basketball));seam.rotation.x=Math.PI/2;
  let state=normalizeEnvironment(),shotTime=-1,bellTime=-1,lastShots=0,lastBells=0;
  function sync(next, { animate = true } = {}) {
    state=next;
    doorLeaves.forEach((leaf,i)=>{leaf.rotation.y=state.doorOpen?(i===0?-Math.PI*.46:Math.PI*.46):0;});doorBlocker.disabled=state.doorOpen;
    lampFixture.bulb.material=mat(state.lampOn?'#d6b884':'#566368',state.lampOn);lampFixture.pool.visible=state.lampOn;
    lockerDoor.rotation.y=state.lockerOpen?-Math.PI*.65:0;lockerNote.visible=state.lockerOpen;
    pin.material=mat(state.visited.includes('noticeboard')?'#a4c4a3':'#b47e56');
    water.visible=state.waterFilled;plants.scale.y=state.watered?1.3:.58;litter.visible=!state.recycled;
    const lit=puzzleSolved(state);toggles.forEach((t,i)=>{t.rotation.x=state.switches[i]?-.55:.55;t.material=mat(state.switches[i]?'#b8cdb0':'#b39e78');});
    pathLights.forEach(p=>{p.bulb.material=mat(lit?'#dfc58e':'#66716a',lit);p.pool.visible=lit;});
    for(const [id,ring] of marks)ring.material=mat(state.visited.includes(id)?'#8da892':'#c6b387');
    if(animate&&state.shots>lastShots)shotTime=0;if(animate&&state.bells>lastBells)bellTime=0;
    lastShots=state.shots;lastBells=state.bells;
  }
  function update(dt,reduced) {
    if(shotTime>=0){shotTime+=dt;const t=Math.min(shotTime/1.35,1);basketball.position.set(12+3.58*t,.25+2.58*t+Math.sin(t*Math.PI)*2.45,22);basketball.rotation.z-=dt*4;if(t===1){const bounce=Math.min((shotTime-1.35)/.8,1);basketball.position.set(15.58-(3.58*bounce),2.83*(1-bounce)+Math.sin(bounce*Math.PI)*.45,22);if(bounce===1){shotTime=-1;basketball.position.set(12,.25,22);}}}
    if(bellTime>=0){bellTime+=dt;bell.rotation.z=reduced?0:Math.sin(bellTime*34)*.2;soundRings.forEach((r,i)=>{r.visible=bellTime<1.2;const scale=.6+(bellTime+i*.16)*2;r.scale.setScalar(scale);r.rotation.y=.6;});if(bellTime>1.2){bellTime=-1;bell.rotation.z=0;}}
  }
  return { dynamic, sync, update, get animation(){return { basketballInFlight:shotTime>=0,bellRinging:bellTime>=0 };} };
}
