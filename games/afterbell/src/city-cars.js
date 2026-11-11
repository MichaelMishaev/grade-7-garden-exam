import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
// Branded cars for Bay City. Every model keeps the shared 3.6 x 6 footprint so collision,
// yielding and the garage accessories (roof beacon, spoiler, surfboard) fit all of them.
// Front of a car is +z. children[0] of the shell is always the paint body.
// Bodies are procedural: lofted cross sections per model after the real proportions, with lamps,
// grilles and badges projected onto the surface. Detailed stylised geometry, not scanned models.
export const CAR_BRANDS={
 model3:{make:'Tesla',name:'Tesla Model 3',style:'sedan',colors:['#f4f5f4','#c8312f','#8e9aa3'],glass:'#0b0f13',tail:'bar',mark:'T'},
 modelY:{make:'Tesla',name:'Tesla Model Y',style:'suv',colors:['#2f5fa8','#f4f5f4','#2a2e33'],glass:'#0b0f13',tail:'bar',mark:'T'},
 cybertruck:{make:'Tesla',name:'Tesla Cybertruck',style:'wedge',colors:['#aeb6bb'],glass:'#10161b',tail:'bar',mark:'T',steel:true},
 bmw:{make:'BMW',name:'BMW סדרה 3',style:'sedan',colors:['#254f9c','#1f2326'],glass:'#1f2c36',grille:'kidney',mark:'BMW'},
 mercedes:{make:'Mercedes-Benz',name:'Mercedes C-Class',style:'sedan',colors:['#c9ced2','#1d2328'],glass:'#1f2c36',grille:'star',mark:'Mercedes'},
 toyota:{make:'Toyota',name:'Toyota Corolla',style:'hatch',colors:['#d7d9d6','#b4322f','#31506d'],glass:'#253844',grille:'slim',mark:'TOYOTA'},
 ford:{make:'Ford',name:'Ford F-150',style:'pickup',colors:['#2c4f87','#c7cbc9'],glass:'#253844',grille:'wide',mark:'FORD'},
 vw:{make:'Volkswagen',name:'Volkswagen Bus',style:'bus',colors:['#e3b24f','#69b3a6'],glass:'#2b3f4b',grille:'vee',mark:'VW'}
};
export const BRAND_IDS=Object.keys(CAR_BRANDS);
// Role vehicles: every shift starts in a recognisable branded car.
export const ROLE_CARS={courier:'modelY',tech:'ford',press:'cybertruck'};
// Ambient traffic cycles through all brands; Teslas appear twice because Bay City is electric.
export const TRAFFIC_MIX=['model3','toyota','modelY','bmw','cybertruck','vw','mercedes','ford','model3'];
export function trafficBrand(index){
 const id=TRAFFIC_MIX[index%TRAFFIC_MIX.length],brand=CAR_BRANDS[id];
 return {id,color:brand.colors[Math.floor(index/TRAFFIC_MIX.length)%brand.colors.length]};
}

// Few shared materials: trim, chrome, plastics and lamps carry their colours per vertex, so a car is
// eight body meshes plus eight wheel meshes. Geometry is cached per model and shared by every paint
// colour, which keeps the number of fleet batches (geometry x material) low.
const models=new Map(),materials=new Map();let reflectionMap=null,plateMap,reflection=.9;
// Night dims what the bodywork reflects; applies to cars built later as well.
export function carReflectionStrength(value){reflection=value;for(const m of materials.values())m.envMapIntensity=value;}
export function configureCarReflections(texture){reflectionMap=texture;for(const m of materials.values()){m.envMap=texture;m.needsUpdate=true;}}
const FINISH={
 paint:{roughness:.24,metalness:.55,clearcoat:1,clearcoatRoughness:.07},
 steel:{roughness:.34,metalness:.9,clearcoat:1,clearcoatRoughness:.45},
 gloss:{roughness:.3,metalness:.2,clearcoat:.5,clearcoatRoughness:.2,vertexColors:true},
 chrome:{roughness:.14,metalness:1,vertexColors:true},
 alloy:{roughness:.3,metalness:.78,vertexColors:true},
 matte:{roughness:.84,metalness:0,vertexColors:true},
 glass:{roughness:.09,metalness:.15,clearcoat:.6,transparent:true,opacity:.72},
 lamp:{roughness:.12,metalness:.1,emissive:'#eef6ff',emissiveIntensity:.8,vertexColors:true},
 tail:{color:'#b81d2b',roughness:.2,metalness:.1,emissive:'#ff1c30',emissiveIntensity:.8},
 plate:{roughness:.45,metalness:.05}
};
function plateTexture(T){
 if(plateMap!==undefined)return plateMap;
 if(typeof document==='undefined')return plateMap=null;
 // Israeli plate: yellow, black digits, blue IL band.
 const c=document.createElement('canvas');c.width=256;c.height=64;const g=c.getContext('2d');
 g.fillStyle='#f6c51b';g.fillRect(0,0,256,64);g.fillStyle='#1d3f9a';g.fillRect(0,0,38,64);
 g.fillStyle='#fff';g.font='bold 17px Arial';g.textAlign='center';g.fillText('IL',19,54);
 g.fillStyle='#141414';g.font='bold 44px Arial';g.fillText('12-345-67',148,48,204);
 g.strokeStyle='#141414';g.lineWidth=4;g.strokeRect(2,2,252,60);
 plateMap=new T.CanvasTexture(c);plateMap.colorSpace=T.SRGBColorSpace;plateMap.anisotropy=4;return plateMap;
}
function finish(T,role,color,opacity){
 const key=role+(color||'')+(opacity||'');if(materials.has(key))return materials.get(key);
 const o={color:color||'#ffffff',envMap:reflectionMap,envMapIntensity:reflection,...FINISH[role]};
 if(role==='plate'){o.map=plateTexture(T);if(!o.map)o.color='#f6c51b';}
 if(opacity)o.opacity=opacity;
 const m=new T.MeshPhysicalMaterial(o);materials.set(key,m);return m;
}
export const WHEEL_RADIUS = .61;
export const MAX_STEER = .54;

export function stepCarWheels(car, distance, steer, dt) {
 if (!dt) return;
 const state = car.userData;
 state.wheelRoll = (state.wheelRoll + distance / (state.wheelRadius || WHEEL_RADIUS)) % (Math.PI * 2);
 state.wheelSteer += (Math.max(-MAX_STEER, Math.min(MAX_STEER, steer)) - state.wheelSteer) * (1 - Math.exp(-dt * 14));
 if (!steer && Math.abs(state.wheelSteer) < .001) state.wheelSteer = 0;
}

export function poseCarWheels(car) {
 const state = car.userData;
 for (const wheel of state.wheels) for (const mesh of wheel.meshes) {
  mesh.rotation.set(state.wheelRoll, wheel.front ? state.wheelSteer : 0, 0, 'YXZ');
  mesh.updateMatrix();
 }
}

// ---------- geometry toolkit ----------
function lin(xs,ys){return x=>{let i=0;while(i<xs.length-2&&x>xs[i+1])i++;const t=(x-xs[i])/(xs[i+1]-xs[i]);return ys[i]+(ys[i+1]-ys[i])*Math.min(1,Math.max(0,t));};}
// Monotone cubic (Fritsch-Carlson): smooth bonnets and roofs without overshoot between key sections.
function mono(xs,ys){
 const n=xs.length,d=[],m=[];if(n<3)return lin(xs,ys);
 for(let i=0;i<n-1;i++)d.push((ys[i+1]-ys[i])/(xs[i+1]-xs[i]));
 m[0]=d[0];m[n-1]=d[n-2];for(let i=1;i<n-1;i++)m[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
 for(let i=0;i<n-1;i++){if(!d[i]){m[i]=m[i+1]=0;continue;}const a=m[i]/d[i],b=m[i+1]/d[i],s=a*a+b*b;if(s>9){const t=3/Math.sqrt(s);m[i]=t*a*d[i];m[i+1]=t*b*d[i];}}
 return x=>{let i=0;while(i<n-2&&x>xs[i+1])i++;const h=xs[i+1]-xs[i],t=Math.min(1,Math.max(0,(x-xs[i])/h)),t2=t*t,t3=t2*t;
  return (2*t3-3*t2+1)*ys[i]+(t3-2*t2+t)*h*m[i]+(-2*t3+3*t2)*ys[i+1]+(t3-t2)*h*m[i+1];};
}
// Range of one coordinate where the line axis=value crosses a closed ring of [x,y] points.
function slice(ring,axis,value){
 let lo=Infinity,hi=-Infinity;
 for(let j=0;j<ring.length;j++){const p=ring[j],q=ring[(j+1)%ring.length],a=p[axis]-value,b=q[axis]-value;if(a*b>0||a===b)continue;const v=p[1-axis]+(q[1-axis]-p[1-axis])*a/(a-b);if(v<lo)lo=v;if(v>hi)hi=v;}
 return [lo,hi];
}
const mirrorHalf=(top,half,bottom)=>[top,...half,bottom,...half.slice().reverse().map(([x,y])=>[-x,y])];
function carSection(s){
 const h=s.t-s.b,k=s.k??.6;
 return mirrorHalf([0,s.t+s.c],[[s.tw*.5,s.t+s.c*.8],[s.tw,s.t+s.c*.2],[s.tw+(s.w-s.tw)*.72,s.t-h*.08],[s.w,s.b+h*k],[s.w*.985,s.b+h*.3],[s.w*.94,s.b+h*.08],[s.w*.84,s.b]],[0,s.b]);
}
function boxSection(s){
 const r=Math.min(s.r??.12,(s.t-s.b)/3);
 return mirrorHalf([0,s.t+s.c],[[s.tw*.5,s.t+s.c*.7],[s.tw-r*.5,s.t],[s.tw+(s.w-s.tw)*.6,s.t-r*.45],[s.w,s.t-r],[s.w,s.b+r*.7],[s.w-r*.25,s.b+r*.15],[s.w-r*.7,s.b]],[0,s.b]);
}

function kit(T){
 const pieces=new Map(),tone=new T.Color();
 const M=new T.Matrix4(),Q=new T.Quaternion(),E=new T.Euler(),V=new T.Vector3(),ONE=new T.Vector3(1,1,1);
 function put(geo,role,c,flat=false){
  if(!flat&&geo.index&&!geo.getAttribute('normal'))geo.computeVertexNormals();
  let g=geo.index?geo.toNonIndexed():geo;if(g!==geo)geo.dispose();
  if(flat||!g.getAttribute('normal')){g.deleteAttribute('normal');g.computeVertexNormals();}
  const n=g.getAttribute('position').count;
  if(!g.getAttribute('uv'))g.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(n*2),2));
  tone.set(c||'#ffffff');const a=new Float32Array(n*3);for(let i=0;i<n;i++){a[i*3]=tone.r;a[i*3+1]=tone.g;a[i*3+2]=tone.b;}
  g.setAttribute('color',new T.Float32BufferAttribute(a,3));
  for(const k of Object.keys(g.attributes))if(!['position','normal','uv','color'].includes(k))g.deleteAttribute(k);
  if(!pieces.has(role))pieces.set(role,[]);pieces.get(role).push(g);
 }
 const place=(g,x=0,y=0,z=0,rx=0,ry=0,rz=0)=>g.applyMatrix4(M.compose(V.set(x,y,z),Q.setFromEuler(E.set(rx,ry,rz)),ONE));
 const box=(role,c,x,y,z,w,h,d,rx,ry,rz)=>put(place(new T.BoxGeometry(w,h,d),x,y,z,rx,ry,rz),role,c);
 const rbox=(role,c,x,y,z,w,h,d,r=.04,rx,ry,rz)=>put(place(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/2.2,h/2.2,d/2.2)),x,y,z,rx,ry,rz),role,c);
 // A box stretched from point a to b, its thickness t along the given up direction.
 function beam(role,c,a,b,w,t,up=[0,1,0]){
  const A=new T.Vector3(...a),B=new T.Vector3(...b),len=A.distanceTo(B);if(len<1e-4)return;
  const m=new T.Matrix4().lookAt(B,A,new T.Vector3(...up).normalize());m.setPosition(A.add(B).multiplyScalar(.5));
  put(new T.BoxGeometry(w,t,len).applyMatrix4(m),role,c);
 }
 function line(role,c,pts,w,t,up){for(let i=0;i<pts.length-1;i++)beam(role,c,pts[i],pts[i+1],w,t,up);}
 function cyl(role,c,x,y,z,r,len,seg=16,axis='x'){
  const g=new T.CylinderGeometry(r,r,len,seg);if(axis==='x')g.rotateZ(-Math.PI/2);else if(axis==='z')g.rotateX(Math.PI/2);put(g.translate(x,y,z),role,c);
 }
 function twoSided(g){
  g=g.index?g.toNonIndexed():g;g.computeVertexNormals();const back=g.clone();
  for(const attr of Object.values(back.attributes)){const s=attr.itemSize,arr=attr.array;for(let i=0;i<attr.count;i+=3)for(let k=0;k<s;k++){const t=arr[(i+1)*s+k];arr[(i+1)*s+k]=arr[(i+2)*s+k];arr[(i+2)*s+k]=t;}}
  back.computeVertexNormals();const out=mergeGeometries([g,back]);g.dispose();back.dispose();return out;
 }
 // A flat outline in surface coordinates, projected onto a body surface by map(u,v) -> [x,y,z].
 function decal(role,c,pts,map,holes){
  const dense=list=>{const out=[];for(let i=0;i<list.length;i++){const [u0,v0]=list[i],[u1,v1]=list[(i+1)%list.length],n=Math.max(1,Math.ceil(Math.hypot(u1-u0,v1-v0)/.2));for(let k=0;k<n;k++)out.push(new T.Vector2(u0+(u1-u0)*k/n,v0+(v1-v0)*k/n));}return out;};
  const shape=new T.Shape(dense(pts));if(holes)for(const h of holes)shape.holes.push(new T.Path(dense(h)));
  // Split large triangles so the decal follows curved panels instead of cutting through them.
  const flat=new T.ShapeGeometry(shape).toNonIndexed(),p=flat.getAttribute('position');let tris=[];
  for(let i=0;i<p.count;i+=3)tris.push([0,1,2].map(k=>[p.getX(i+k),p.getY(i+k)]));flat.dispose();
  const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2],long=([a,b,c])=>Math.max(Math.hypot(a[0]-b[0],a[1]-b[1]),Math.hypot(b[0]-c[0],b[1]-c[1]),Math.hypot(c[0]-a[0],c[1]-a[1]));
  const area=([a,b,c])=>Math.abs((b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]))/2;
  for(let pass=0;pass<3;pass++)tris=tris.flatMap(t=>{if(long(t)<.3||area(t)<.012)return [t];const [a,b,c]=t,ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);return [[a,ab,ca],[ab,b,bc],[ca,bc,c],[ab,bc,ca]];});
  const pos=[];for(const t of tris)for(const [u,v] of t)pos.push(...map(u,v));
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));
  put(twoSided(g),role,c);
 }
 const ellipse=(cx,cy,rx,ry,n=18,a0=0,a1=Math.PI*2)=>Array.from({length:n},(_,i)=>{const a=a0+(a1-a0)*i/(a1-a0>=6.28?n:n-1);return [cx+Math.cos(a)*rx,cy+Math.sin(a)*ry];});
 const rrect=(x0,y0,x1,y1,r,n=4)=>{if(x0>x1)[x0,x1]=[x1,x0];const pts=[];for(const [cx,cy,a] of [[x1-r,y1-r,0],[x0+r,y1-r,Math.PI/2],[x0+r,y0+r,Math.PI],[x1-r,y0+r,Math.PI*1.5]])for(let i=0;i<=n;i++){const t=a+i/n*Math.PI/2;pts.push([cx+Math.cos(t)*r,cy+Math.sin(t)*r]);}return pts;};
 function loft(keys,section,{step=.1,linear=false,flat=false,role='paint',c=null,caps=true}={}){
  keys=[...keys].sort((a,b)=>a.z-b.z);
  const zs=keys.map(k=>k.z),fields=Object.keys(keys[0]).filter(k=>k!=='z'),f={};
  for(const k of fields)f[k]=(linear?lin:mono)(zs,keys.map(o=>o[k]));
  const at=z=>{const o={z};for(const k of fields)o[k]=f[k](z);return o;};
  const set=new Set(zs);for(let z=zs[0]+step;z<zs.at(-1)-step*.3;z+=step)set.add(Math.round(z*1000)/1000);
  const st=[...set].sort((a,b)=>a-b).map(z=>{const s=at(z);return {z,s,ring:section(s)};});
  const n=st[0].ring.length,pos=[],idx=[],mid=st[Math.floor(st.length/2)].ring;let area=0;
  for(let j=0;j<n;j++){const [x1,y1]=mid[j],[x2,y2]=mid[(j+1)%n];area+=x1*y2-x2*y1;}
  for(const {z,ring} of st)for(const [x,y] of ring)pos.push(x,y,z);
  for(let i=0;i<st.length-1;i++)for(let j=0;j<n;j++){const a=i*n+j,b=i*n+(j+1)%n,cc=a+n,d=b+n;if(area>0)idx.push(a,b,cc,b,d,cc);else idx.push(a,cc,b,b,cc,d);}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(idx);put(g,role,c,flat);
  if(caps)for(const [end,dir] of [[st[0],-1],[st.at(-1),1]]){
   const r=end.ring,cx=r.reduce((s,p)=>s+p[0],0)/n,cy=r.reduce((s,p)=>s+p[1],0)/n,cap=[];
   for(let j=0;j<n;j++){const p=r[j],q=r[(j+1)%n],tri=(area>0)===(dir>0)?[[cx,cy],p,q]:[[cx,cy],q,p];for(const [x,y] of tri)cap.push(x,y,end.z);}
   const cg=new T.BufferGeometry();cg.setAttribute('position',new T.Float32BufferAttribute(cap,3));put(cg,role,c,true);
  }
  const pair=z=>{let i=0;while(i<st.length-2&&z>st[i+1].z)i++;return [st[i],st[i+1],Math.min(1,Math.max(0,(z-st[i].z)/(st[i+1].z-st[i].z)))];};
  const along=(z,axis,v)=>{const [a,b,t]=pair(z),va=slice(a.ring,axis,v)[1],vb=slice(b.ring,axis,v)[1];if(!Number.isFinite(va)||!Number.isFinite(vb))return Number.isFinite(va)?va:Number.isFinite(vb)?vb:null;return va+(vb-va)*t;};
  // Inside margin of a point (x,y) in a station; negative outside. Faces are found between stations.
  const margin=(ring,x,y)=>{const [lo,hi]=slice(ring,0,x),[,xh]=slice(ring,1,y),mv=Number.isFinite(lo)?Math.min(y-lo,hi-y):null,mh=Number.isFinite(xh)?xh-Math.abs(x):null;return mv===null?mh??-1:mh===null?mv:Math.min(mv,mh);};
  function face(x,y,dir){
   const list=dir>0?[...st].reverse():st;let prev=null;
   let best=list[0],bm=-Infinity;
   for(const s of list){const m=margin(s.ring,x,y);if(m>=0){if(!prev)return s.z;return s.z+(prev.s.z-s.z)*m/(m-prev.m);}prev={s,m};if(m>bm){bm=m;best=s;}}
   return best.z;
  }
  const ringAt=z=>{const [a,b,t]=pair(z);return a.ring.map((p,i)=>[p[0]+(b.ring[i][0]-p[0])*t,p[1]+(b.ring[i][1]-p[1])*t]);};
  return {st,at,ringAt,top:(x,z)=>along(z,0,x),side:(z,y)=>along(z,1,y),front:(x,y)=>face(x,y,1),rear:(x,y)=>face(x,y,-1)};
 }
 const onFront=(L,off=.016)=>(u,v)=>[u,v,L.front(u,v)+off];
 const onRear=(L,off=.016)=>(u,v)=>[u,v,L.rear(u,v)-off];
 const onTop=(L,off=.012)=>(u,v)=>[u,(L.top(u,v)??0)+off,v];
 const onSide=(L,side,off=.012)=>(u,v)=>[side*((L.side(u,v)??L.side(u,v+.06)??0)+off),v,u];
 function merged(){
  const entries=[];
  for(const [role,list] of pieces){entries.push({role,geometry:mergeGeometries(list,false)});for(const g of list)g.dispose();}
  return entries;
 }
 return {T,twoSided,put,box,rbox,beam,line,cyl,decal,ellipse,rrect,loft,onFront,onRear,onTop,onSide,merged};
}

// ---------- wheels ----------
const wheelGeometry=new Map();
// Tyre sidewall and tread from a rounded lathe profile; a rim design per model on the outer face.
function wheelParts(T,id,side,W){
 const key=id+side;if(wheelGeometry.has(key))return wheelGeometry.get(key);
 const {R,tw,rim:style,rr=R*.7}=W,tyre=[],rim=[];
 const colourise=(g,c)=>{g=g.index?g.toNonIndexed():g;g.computeVertexNormals();const n=g.getAttribute('position').count,col=new T.Color(c),a=new Float32Array(n*3);for(let i=0;i<n;i++)col.toArray(a,i*3);g.setAttribute('color',new T.Float32BufferAttribute(a,3));if(!g.getAttribute('uv'))g.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(n*2),2));return g;};
 const h=tw/2,profile=[[rr,-h+.015],[R-.07,-h],[R-.02,-h+.03],[R,-h+.08],[R,h-.08],[R-.02,h-.03],[R-.07,h],[rr,h-.015]].map(([r,y])=>new T.Vector2(r,y));
 tyre.push(colourise(new T.LatheGeometry(profile,22).rotateZ(-Math.PI/2),'#17191b'));
 const face=h-.025,addRim=(g,c)=>rim.push(colourise(g,c));
 const disc=(r,x,c,seg=20,t=.02)=>addRim(new T.CylinderGeometry(r,r,t,seg).rotateZ(-Math.PI/2).translate(x,0,0),c);
 const spoke=(a,len,w,x,c,inner,t=.035,twist=0)=>addRim(new T.BoxGeometry(t,len,w).rotateY(twist).translate(0,inner+len/2,0).rotateX(a).translate(x,0,0),c);
 addRim(new T.TorusGeometry(rr-.012,.022,4,22).rotateY(Math.PI/2).translate(face,0,0),style==='vw'?'#e9e7df':'#c9ced3');
 const S={
  aero:()=>{disc(rr-.02,face-.012,'#2b2f34');for(let i=0;i<5;i++)for(const o of [-.11,.11])spoke(i*Math.PI*2/5+o,rr-.13,.07,face,'#aeb4ba',.08);disc(.08,face+.01,'#c6ccd1');},
  gemini:()=>{disc(rr-.02,face-.012,'#3b4045');for(let i=0;i<5;i++)spoke(i*Math.PI*2/5,rr-.12,.12,face,'#5c6268',.08,.03,.25);disc(.08,face+.008,'#25282c');},
  cyber:()=>{disc(rr-.02,face,'#b9bfc3',6);for(let i=0;i<6;i++)spoke(i*Math.PI/3,rr-.1,.025,face+.012,'#30353a',.06,.012);disc(.07,face+.015,'#2b3035',6);},
  bmw:()=>{disc(rr-.02,face-.02,'#1c1f22');for(let i=0;i<5;i++)for(const o of [-.13,.13])spoke(i*Math.PI*2/5+o,rr-.11,.045,face,'#c9cdd1',.07);disc(.075,face+.01,'#2a4f9a');},
  merc:()=>{disc(rr-.02,face-.02,'#1c1f22');for(let i=0;i<5;i++)for(const o of [-.09,.09])spoke(i*Math.PI*2/5+o,rr-.1,.06,face,'#b7bcc1',.07,.035,o*1.4);disc(.075,face+.01,'#d9dde0');},
  toyota:()=>{disc(rr-.02,face-.02,'#1c1f22');for(let i=0;i<10;i++)spoke(i*Math.PI/5,rr-.1,.05,face,i%2?'#3b4046':'#c4c9ce',.07);disc(.075,face+.01,'#24282c');},
  ford:()=>{disc(rr-.02,face-.02,'#1c1f22');for(let i=0;i<6;i++)spoke(i*Math.PI/3,rr-.13,.11,face,'#c5c9cd',.1,.045);disc(.12,face+.015,'#2d3236');},
  vw:()=>{disc(rr-.02,face-.005,'#e9e7df');addRim(new T.SphereGeometry(.2,18,8,0,Math.PI*2,0,Math.PI/2.6).rotateZ(-Math.PI/2).scale(.45,1,1).translate(face-.02,0,0),'#dfe5e8');}
 };
 S[style]();
 const parts=[{geometry:mergeGeometries(tyre),role:'matte'},{geometry:mergeGeometries(rim),role:'alloy'}];
 if(side<0)for(const p of parts)p.geometry.rotateZ(Math.PI);
 for(const g of [...tyre,...rim])g.dispose();
 wheelGeometry.set(key,parts);return parts;
}

// ---------- shared car pieces ----------
const DARK='#101316',TRIM='#16191c',RUB='#1b1d20';
// Standard passenger car: lofted body, greenhouse with pillars, painted or glass roof and a cabin.
function standardCar(k,P){
 const body=k.loft(P.body.map(([z,w,b,t,tw,c=0])=>({z,w,b,t,tw,c})),P.section||carSection,{step:.12});
 const ctx={body,P};
 const keys=P.glass.map(([z,rw,ry])=>{const B=body.at(z);return {z,rw:rw??B.tw,ry:ry??B.t};});
 const glassRing=s=>{const B=body.at(s.z),by=B.t-.012,bw=B.tw-.006,ry=Math.max(s.ry,by),h=ry-by,rw=h<.002?bw:s.rw;
  return mirrorHalf([0,ry],[[rw*.5,ry],[rw,ry-Math.min(.035,h*.3)],[(bw+rw)/2+Math.min(.04,h*.09),by+h*.5],[bw,by]],[0,by-.14]);};
 const glass=k.loft(keys,glassRing,{step:.11,role:'glass',caps:false});ctx.glass=glass;
 const zf=P.ws,zr=P.rear,{roofFront:rf,roofBack:rb}=P;
 const span=(a,b)=>glass.st.filter(s=>s.z>=Math.min(a,b)-1e-6&&s.z<=Math.max(a,b)+1e-6);
 for(const side of [-1,1]){
  // Ring point 2 is the roof edge, point 4 the belt line: they trace the pillars and window frames.
  const out=(i,o=.012)=>s=>[side*(s.ring[i][0]+o),s.ring[i][1],s.z];
  k.line(P.aRole||'paint',P.aColor||null,span(rf,zf).map(out(2)),.09,.035,[side,.6,.5]);
  k.line(P.trimRole||'chrome',P.trim||'#c4cbd0',span(zr,zf).map(out(4,.016)),.035,.025,[side,.3,0]);
  if(P.roof!=='glass')k.line(P.trimRole||'chrome',P.trim||'#c4cbd0',span(rb,rf).map(out(2,.02)),.03,.025,[side,1,0]);
  const B=span(P.b-.05,P.b+.05)[0];if(B)k.beam('matte',TRIM,out(4,.014)(B),out(2,.014)(B),.12,.02,[side,.2,0]);
 }
 // C pillar: paint over the side of the greenhouse behind the side windows. P.c gives where the
 // window ends at the roof edge, half way down and at the belt (a forward step there is BMW's kink).
 if(P.c){const rows=[2,3,4],pos=[],n=8,pt=(row,u)=>{const z=P.c[row-2]+(zr-P.c[row-2])*u,p=glass.ringAt(z)[row];return [p[0],p[1],z];};
  for(const side of [-1,1])for(let ri=0;ri<2;ri++)for(let i=0;i<n;i++){const q=[pt(rows[ri],i/n),pt(rows[ri],(i+1)/n),pt(rows[ri+1],(i+1)/n),pt(rows[ri+1],i/n)].map(([x,y,z])=>[side*(x+.014),y,z]);pos.push(...q[0],...q[1],...q[2],...q[0],...q[2],...q[3]);}
  const g=new k.T.BufferGeometry();g.setAttribute('position',new k.T.Float32BufferAttribute(pos,3));k.put(k.twoSided(g),'paint');}
 if(P.roof!=='glass')k.loft(span(rb,rf).map(s=>({z:s.z,rw:s.s.rw,ry:s.s.ry})),s=>mirrorHalf([0,s.ry+.022],[[s.rw*.5,s.ry+.02],[s.rw+.012,s.ry-.028],[s.rw+.002,s.ry-.08]],[0,s.ry-.07]),{linear:true,step:.2});
 else for(const z of [rf,rb]){const s=span(z-.05,z+.05)[0];if(s)k.line('gloss',TRIM,[[-s.ring[2][0],s.ring[2][1]+.004,s.z],[-s.ring[1][0],s.ring[1][1]+.006,s.z],[s.ring[1][0],s.ring[1][1]+.006,s.z],[s.ring[2][0],s.ring[2][1]+.004,s.z]],.05,.012);}
 // Cabin: dark floor at the belt, two front seats, a rear bench, dashboard and steering wheel (left-hand drive).
 const B=body.at((zf+zr)/2),belt=B.t,inner=B.tw-.12;
 k.box('matte','#202428',0,belt+.006,(zf+zr)/2,inner*2,.02,zf-zr-.1);
 const dz=zf-.42,seat=P.seat??(P.b+.25);
 k.rbox('matte','#26292d',0,belt+.07,dz,inner*1.95,.14,.32,.05);
 k.put(new k.T.TorusGeometry(.15,.024,6,16).rotateX(-.45).translate(inner*.42,belt+.22,dz-.32),'matte','#1a1c1f');
 const head=Math.min(belt+.5,glass.ringAt(seat)[0][1]-.2);
 for(const x of [-1,1]){k.rbox('matte','#2f3338',x*inner*.42,head-.3,seat,inner*.62,.5,.15,.06,-.18);k.rbox('matte','#2f3338',x*inner*.42,head-.02,seat-.06,inner*.36,.15,.12,.05);}
 if(P.bench!==false)k.rbox('matte','#2f3338',0,Math.min(belt+.18,glass.ringAt(seat-.95)[0][1]-.42),seat-.95,inner*1.6,.4,.15,.06,-.2);
 return ctx;
}
// Dark wheel-arch openings with a fender lip; shape(z,y,r) gives angular arches for trucks.
function arches(k,ctx,W,{lip='paint',lipColor=null,shape=null,liner='#0c0d0f',lipW=.07}={}){
 const L=ctx.body;
 for(const z of [W.fz,W.rz])for(const side of [-1,1]){
  const r=W.R+.07,y=W.R,b=Math.min(L.at(z+r).b,L.at(z-r).b)+.02;
  const outline=r=>shape?shape(z,y,r,b):[[z+r,b],...k.ellipse(z,y,r,r,14,0,Math.PI),[z-r,b]];
  k.decal('matte',liner,outline(r),k.onSide(L,side,.01));
  k.line(lip,lipColor,outline(r+.035).map(([u,v])=>k.onSide(L,side,.012)(u,v)),lipW,.03,[side,0,0]);
 }
}
function mirrors(k,z,y,x,{role='paint',c=null,size=1}={}){
 for(const side of [-1,1]){
  k.beam('gloss',TRIM,[side*(x-.1),y-.05,z],[side*(x+.12),y-.02,z-.04],.09,.06,[0,1,0]);
  k.rbox(role,c,side*(x+.2),y,z-.08,.24*size,.17*size,.13*size,.05);
  k.box('chrome','#7f8a92',side*(x+.2),y,z-.08-.07*size,.2*size,.13*size,.012);
 }
}
function doorLines(k,ctx,cuts,{top,handles=[],handle='chrome',hc='#c4cbd0',bottom}={}){
 const L=ctx.body;
 for(const side of [-1,1]){
  for(const z of cuts){const b=bottom??L.at(z).b+.1,t=top??L.at(z).t-.03;k.decal('matte','#15181b',[[z-.008,b],[z+.008,b],[z+.008,t],[z-.008,t]],k.onSide(L,side,.008));}
  for(const [z,y] of handles)k.decal(handle,hc,k.rrect(z-.13,y-.025,z+.13,y+.025,.02,2),k.onSide(L,side,.016));
 }
}
function plates(k,L,front,rear,rearZ){
 const plate=(y,z,flip)=>k.put(new k.T.BoxGeometry(.62,.14,.02).rotateY(flip?Math.PI:0).translate(0,y,z),'plate');
 if(front)plate(front,L.front(0,front)+.012,false);
 if(rear)plate(rear,(rearZ??L.rear(0,rear))-.012,true);
}
const tesla=(k,map,y)=>{k.decal('chrome','#d6dbde',[[-.07,y+.035],[.07,y+.035],[.07,y+.02],[-.07,y+.02]],map);k.decal('chrome','#d6dbde',[[-.012,y+.02],[.012,y+.02],[.012,y-.06],[-.012,y-.06]],map);};

// ---------- the eight models ----------
// Ground is y=0 (the shell lifts by .3); body from z=-3 to 3; half widths up to about 1.46.
// Body keys: [z, half width, bottom, top (bonnet, belt or boot), top half width, crown].
// Glass keys: [z, roof half width, roof height]; a key without values is where the glass meets the body.
const MODELS={
 model3(k){
  const W={R:.425,tw:.33,fz:1.9,rz:-1.76,x:1.13,rim:'aero'};
  const P={body:[[-3,.95,.4,1.27,.72,.01],[-2.85,1.15,.33,1.33,.9,.02],[-2.4,1.25,.27,1.36,1.0,.03],[-1.76,1.29,.23,1.33,1.08,.01],[-1.2,1.29,.21,1.3,1.12],[0,1.28,.2,1.26,1.12],[1.22,1.28,.21,1.23,1.1,.03],[1.9,1.27,.22,1.08,1.05,.07],[2.55,1.22,.24,.95,.97,.07],[2.88,1.1,.27,.88,.8,.04],[3,.86,.32,.8,.58,.02]],
   glass:[[1.22],[.55,.86,1.68],[.05,.86,1.79],[-.55,.84,1.83],[-1.25,.79,1.75],[-1.9,.7,1.55],[-2.32]],ws:1.22,rear:-2.32,roofFront:.45,roofBack:-1.5,b:-.38,c:[-1.45,-1.72,-1.98],roof:'glass',aRole:'gloss',aColor:TRIM,trimRole:'gloss',trim:TRIM};
  const ctx=standardCar(k,P),L=ctx.body,F=k.onFront(L),R=k.onRear(L);
  arches(k,ctx,W);mirrors(k,1.0,1.36,1.06);
  doorLines(k,ctx,[1.15,-.38,-1.45],{handles:[[.55,1.14],[-.95,1.16]],handle:'gloss',hc:'#2a2e33'});
  for(const s of [-1,1]){
   // Highland: slim swept headlamp slits; C-shaped tail lamps wrapping the corners.
   k.decal('gloss',DARK,[[s*.5,.79],[s*1.14,.85],[s*1.2,.78],[s*.56,.72]],F);
   k.decal('lamp','#ffffff',[[s*.56,.785],[s*1.1,.835],[s*1.14,.8],[s*.6,.755]],k.onFront(L,.02));
   k.decal('tail',null,[[s*.42,1.25],[s*1.12,1.26],[s*1.2,1.06],[s*1.1,1.02],[s*1.06,1.18],[s*.44,1.19]],R);
   k.decal('matte',RUB,[[s*.7,.33],[s*1.05,.36],[s*1.0,.44],[s*.72,.42]],F);
  }
  k.decal('matte',RUB,[[-.5,.34],[.5,.34],[.46,.44],[-.46,.44]],F);
  k.decal('matte',RUB,[[-1.0,.48],[1.0,.48],[.9,.6],[-.9,.6]],R);
  tesla(k,F,.72);tesla(k,R,1.13);
  // Charge port in the left tail lamp.
  k.decal('gloss','#30353a',k.rrect(-2.78,1.06,-2.6,1.18,.02),k.onSide(L,1,.014));
  plates(k,L,.55,.82);
  return {ctx,W};
 },
 modelY(k){
  const W={R:.45,tw:.35,fz:1.88,rz:-1.78,x:1.17,rim:'gemini'};
  const P={body:[[-3,1.0,.5,1.46,.76],[-2.86,1.18,.42,1.5,.92,.02],[-2.5,1.28,.36,1.52,1.0,.02],[-1.78,1.34,.3,1.5,1.1],[-1.2,1.34,.28,1.47,1.13],[0,1.33,.27,1.44,1.13],[1.18,1.33,.27,1.4,1.12,.03],[1.88,1.32,.28,1.26,1.1,.07],[2.5,1.28,.3,1.13,1.04,.07],[2.86,1.14,.33,1.0,.86,.04],[3,.88,.4,.94,.62,.02]],
   glass:[[1.18],[.45,.9,1.9],[0,.9,2.0],[-.6,.88,2.04],[-1.4,.84,1.96],[-2.1,.76,1.78],[-2.62]],ws:1.18,rear:-2.62,roofFront:.35,roofBack:-1.75,b:-.32,c:[-1.72,-2.0,-2.22],roof:'glass',aRole:'gloss',aColor:TRIM,trimRole:'gloss',trim:TRIM,seat:0};
  const ctx=standardCar(k,P),L=ctx.body,F=k.onFront(L),R=k.onRear(L);
  arches(k,ctx,W);mirrors(k,1.0,1.54,1.1);
  doorLines(k,ctx,[1.12,-.36,-1.5],{handles:[[.5,1.3],[-.95,1.33]],handle:'gloss',hc:'#2a2e33'});
  for(const side of [-1,1])k.decal('matte',RUB,[[2.4,.28],[-2.4,.28],[-2.4,.4],[2.4,.4]],k.onSide(L,side,.01));
  // 2025 Model Y: light bar across the nose and the hatch, headlamps low in the bumper.
  k.decal('lamp','#ffffff',[[-1.08,.9],[1.08,.9],[1.1,.93],[-1.1,.93]],k.onFront(L,.015));
  k.decal('tail',null,[[-1.02,1.39],[1.02,1.39],[1.04,1.43],[-1.04,1.43]],R);
  for(const s of [-1,1]){
   k.decal('gloss',DARK,k.rrect(s*.66,.62,s*1.06,.76,.04),F);
   k.decal('lamp','#ffffff',k.rrect(s*.72,.66,s*.98,.72,.02),k.onFront(L,.02));
   k.decal('tail',null,[[s*.95,.78],[s*1.18,.8],[s*1.16,.86],[s*.95,.84]],R);
  }
  k.decal('matte',RUB,[[-.55,.38],[.55,.38],[.5,.5],[-.5,.5]],F);
  k.decal('matte',RUB,[[-1.05,.58],[1.05,.58],[.95,.7],[-.95,.7]],R);
  tesla(k,F,.9);tesla(k,R,1.3);
  k.decal('gloss','#30353a',k.rrect(-2.8,1.22,-2.62,1.34,.02),k.onSide(L,1,.014));
  plates(k,L,.6,.98);
  return {ctx,W};
 },
 cybertruck(k){
  const W={R:.51,tw:.4,fz:1.99,rz:-2.03,x:1.27,rim:'cyber',rr:.37};
  // Straight lines only: nose up to the apex above the front seats, apex down to the tail. Faceted.
  const top=z=>z>.25?1.12+(3-z)/2.75:2.12-(.25-z)/3.25*.62,tw=z=>z>1.6?1.28:z>.25?1.05-(1.55-z)/1.3*.25:.8+(.25-z)/3.25*.5;
  const keys=[[3,1.28,.62,1.02],[2.9,1.4,.44,1.08],[1.62,1.42,.42,1.5],[1.55,1.42,.42,1.36],[.25,1.42,.42,1.38],[-1.0,1.42,.42,1.4],[-2.9,1.42,.46,1.42],[-3,1.36,.56,1.38]].map(([z,w,b,e])=>({z,w,b,e,t:top(z),tw:z>1.6?Math.min(1.28,w-.1):tw(z)}));
  const section=s=>mirrorHalf([0,s.t],[[s.tw,s.t],[s.w,Math.min(s.e,s.t-.04)],[s.w,s.b+.14],[s.w-.1,s.b]],[0,s.b]);
  const body=k.loft(keys,section,{linear:true,flat:true,step:.12}),ctx={body},F=k.onFront(body),R=k.onRear(body),Top=k.onTop(body,.014);
  // Glass: one huge windscreen on the slope, trapezoid side windows on the slanted sides.
  k.decal('glass','#10161b',[[-1.12,1.58],[1.12,1.58],[.76,.36],[-.76,.36]],Top);
  for(const side of [-1,1]){
   k.decal('glass','#10161b',[[1.52,1.44],[1.45,top(1.45)-.06],[.3,top(.3)-.07],[-.95,top(-.95)-.06],[-.95,1.44]],k.onSide(body,side,.012));
   k.line('gloss',TRIM,[[side*1.43,1.39,1.55],[side*1.43,1.39,-.97]],.03,.02,[side,0,0]);
  }
  k.beam('gloss','#7c858b',[-.86,top(-1)+.006,-1.0],[.86,top(-1)+.006,-1.0],.02,.01);
  // Light bars across the full width, front and rear; black angular arches.
  k.box('lamp','#ffffff',0,1.11,3.0,2.5,.05,.04);k.box('tail',null,0,1.46,-2.998,2.62,.05,.03);
  k.decal('matte',RUB,[[-1.2,.5],[1.2,.5],[1.25,.74],[-1.25,.74]],F);k.decal('matte',RUB,[[-1.3,.58],[1.3,.58],[1.3,.82],[-1.3,.82]],R);
  const hex=(z,y,r,b)=>[[z+r*1.2,b],[z+r*1.2,y+r*.25],[z+r*.62,y+r*1.02],[z-r*.62,y+r*1.02],[z-r*1.2,y+r*.25],[z-r*1.2,b]];
  arches(k,ctx,W,{shape:hex,lip:'matte',lipColor:'#2a2d30',lipW:.13});
  doorLines(k,ctx,[1.5,.15,-1.05],{top:1.38});
  mirrors(k,1.25,1.5,1.4,{role:'gloss',c:TRIM,size:.8});
  for(const [map,y] of [[F,.95],[R,1.3]])k.decal('chrome','#d6dbde',[[-.12,y],[.12,y],[.12,y-.02],[-.12,y-.02]],map);
  plates(k,body,null,.95);
  // The interior shows through the big windscreen.
  k.rbox('matte','#26292d',0,1.5,1.35,2.2,.12,.3,.04);k.put(new k.T.TorusGeometry(.15,.024,4,4).rotateX(-.5).translate(.52,1.62,1.05),'matte','#1a1c1f');
  for(const x of [-.52,.52])k.rbox('matte','#2f3338',x,1.62,.45,.62,.5,.15,.06,-.2);
  return {ctx,W};
 },
 bmw(k){
  const W={R:.42,tw:.32,fz:1.99,rz:-1.64,x:1.14,rim:'bmw'};
  const P={body:[[-3,1.0,.4,1.3,.76],[-2.8,1.18,.32,1.35,.96,.03],[-2.2,1.27,.24,1.36,1.06,.04],[-1.64,1.3,.22,1.33,1.1,.01],[-.5,1.29,.21,1.28,1.12],[.95,1.29,.21,1.24,1.1,.03],[1.95,1.28,.22,1.1,1.07,.08],[2.6,1.24,.23,1.0,1.0,.07],[2.9,1.12,.26,.97,.84,.04],[3,.9,.32,.9,.6,.02]],
   glass:[[.95],[.2,.86,1.76],[-.3,.85,1.83],[-.9,.82,1.79],[-1.35,.76,1.66],[-1.86]],ws:.95,rear:-1.86,roofFront:.12,roofBack:-1.05,b:-.42,c:[-.98,-1.45,-1.3]};
  const ctx=standardCar(k,P),L=ctx.body,F=k.onFront(L),R=k.onRear(L);
  arches(k,ctx,W);mirrors(k,.75,1.38,1.08);
  doorLines(k,ctx,[.9,-.42,-1.5],{handles:[[.25,1.12],[-1.05,1.14]]});
  for(const s of [-1,1]){
   // Twin kidney grille between angular twin-lamp headlights; L-shaped tail lamps; twin exhausts.
   k.decal('chrome','#d0d5d9',k.rrect(s*.04,.64,s*.44,.93,.07),F);
   k.decal('gloss','#0b0d0f',k.rrect(s*.07,.67,s*.41,.9,.05),k.onFront(L,.018));
   for(let i=1;i<4;i++){const x=s*(.07+i*.085);k.decal('chrome','#9aa3a9',[[x-.008,.68],[x+.008,.68],[x+.008,.89],[x-.008,.89]],k.onFront(L,.024));}
   k.decal('gloss',DARK,[[s*.46,0.85],[s*.52,0.94],[s*1.12,0.97],[s*1.17,0.89],[s*1.0,0.8],[s*.5,0.8]],F);
   for(const x of [.62,.9])k.decal('lamp','#ffffff',k.ellipse(s*x,.875,.1,.045,14),k.onFront(L,.02));
   k.decal('lamp','#ffffff',[[s*.5,0.82],[s*1.0,0.82],[s*1.04,0.83],[s*.5,0.835]],k.onFront(L,.02));
   k.decal('tail',null,[[s*.46,1.26],[s*1.08,1.25],[s*1.12,1.04],[s*1.0,1.04],[s*.98,1.17],[s*.46,1.18]],R);
   k.decal('matte',RUB,[[s*.72,.33],[s*1.1,.36],[s*1.08,.62],[s*.98,.62],[s*.95,.44],[s*.72,.42]],F);
   const ez=L.rear(s*.75,.37);k.cyl('chrome','#cfd5d9',s*.75,.37,ez-.02,.06,.12,14,'z');k.cyl('matte','#0c0d0e',s*.75,.37,ez-.075,.045,.02,14,'z');
  }
  k.decal('matte',RUB,[[-.48,.34],[.48,.34],[.42,.48],[-.42,.48]],F);
  k.decal('matte',RUB,[[-1.0,.44],[1.0,.44],[.9,.55],[-.9,.55]],R);
  // BMW roundel: black ring, blue and white quarters.
  const roundel=(map,cx,cy,r)=>{k.decal('gloss','#121416',k.ellipse(cx,cy,r,r,20),map(.016));for(let q=0;q<4;q++)k.decal('gloss',q%2?'#f4f6f7':'#2a6fd0',[[cx,cy],...k.ellipse(cx,cy,r*.68,r*.68,6,q*Math.PI/2,(q+1)*Math.PI/2)],map(.022));};
  roundel(o=>k.onTop(L,o),0,2.74,.08);roundel(o=>k.onRear(L,o),0,1.22,.065);
  plates(k,L,.52,1.02);
  return {ctx,W};
 },
 mercedes(k){
  const W={R:.42,tw:.32,fz:1.95,rz:-1.67,x:1.14,rim:'merc'};
  const P={body:[[-3,.98,.4,1.28,.76],[-2.85,1.15,.33,1.32,.94,.03],[-2.3,1.26,.25,1.34,1.04,.04],[-1.67,1.3,.22,1.32,1.1,.01],[-.6,1.3,.21,1.28,1.12],[1.0,1.3,.21,1.24,1.1,.03],[1.9,1.29,.22,1.12,1.08,.09],[2.5,1.25,.23,1.02,1.02,.08],[2.9,1.14,.26,.96,.86,.04],[3,.92,.32,.9,.62,.02]],
   glass:[[1.0],[.25,.86,1.74],[-.35,.85,1.83],[-1.0,.8,1.78],[-1.5,.72,1.62],[-2.02]],ws:1.0,rear:-2.02,roofFront:.15,roofBack:-1.15,b:-.4,c:[-1.1,-1.48,-1.62]};
  const ctx=standardCar(k,P),L=ctx.body,F=k.onFront(L),R=k.onRear(L);
  arches(k,ctx,W);mirrors(k,.8,1.38,1.08);
  doorLines(k,ctx,[.95,-.4,-1.55],{handles:[[.3,1.12],[-1.1,1.14]]});
  // Wide grille with the big three-pointed star; slim lamps with a DRL eyebrow; two-piece tails.
  k.decal('chrome','#d0d5d9',[[-.6,0.9],[.6,0.9],[.52,0.56],[-.52,0.56]],F);
  k.decal('gloss','#0c0e10',[[-.56,0.87],[.56,0.87],[.49,0.59],[-.49,0.59]],k.onFront(L,.018));
  for(const s of [-1,0.97])k.decal('chrome','#aeb6bb',[[s*.2,0.75],[s*.55,0.75],[s*.54,0.73],[s*.2,0.73]],k.onFront(L,.024));
  const star=(map,cx,cy,r,o)=>{k.decal('chrome','#e4e8ea',k.ellipse(cx,cy,r,r,22),map(o),[k.ellipse(cx,cy,r*.82,r*.82,22)]);for(let i=0;i<3;i++){const a=Math.PI/2+i*Math.PI*2/3,b=a+Math.PI/2;k.decal('chrome','#e4e8ea',[[cx+Math.cos(a)*r*.82,cy+Math.sin(a)*r*.82],[cx+Math.cos(b)*r*.12,cy+Math.sin(b)*r*.12],[cx-Math.cos(b)*r*.12,cy-Math.sin(b)*r*.12]],map(o));}};
  star(o=>k.onFront(L,o),0,.75,.13,.03);star(o=>k.onRear(L,o),0,1.17,.06,.018);
  for(const s of [-1,1]){
   k.decal('gloss',DARK,[[s*.6,0.84],[s*1.14,0.94],[s*1.2,0.88],[s*1.0,0.8],[s*.62,0.78]],F);
   k.decal('lamp','#ffffff',[[s*.64,0.84],[s*1.12,0.93],[s*1.14,0.91],[s*.66,0.82]],k.onFront(L,.022));
   k.decal('lamp','#ffffff',k.ellipse(s*.88,.84,.08,.03,12),k.onFront(L,.02));
   k.decal('tail',null,[[s*.36,1.23],[s*1.08,1.22],[s*1.12,1.1],[s*.64,1.11]],R);
   k.decal('chrome','#cfd5d9',k.rrect(s*.56,.33,s*.98,.43,.03),R);k.decal('matte','#0c0d0e',k.rrect(s*.6,.35,s*.94,.41,.02),k.onRear(L,.018));
   k.decal('matte',RUB,[[s*.68,.36],[s*1.08,.38],[s*1.04,.55],[s*.7,.5]],F);
  }
  k.decal('matte',RUB,[[-.45,.36],[.45,.36],[.42,.5],[-.42,.5]],F);
  plates(k,L,.5,.68);
  return {ctx,W};
 },
 toyota(k){
  const W={R:.42,tw:.32,fz:1.72,rz:-1.9,x:1.16,rim:'toyota'};
  const P={body:[[-3,1.04,.46,1.4,.8],[-2.9,1.15,.4,1.46,.9],[-2.6,1.26,.32,1.48,1.0,.02],[-1.9,1.32,.25,1.46,1.1],[-1.2,1.32,.23,1.4,1.12],[0,1.32,.22,1.32,1.12],[1.2,1.32,.22,1.27,1.1,.02],[1.75,1.31,.22,1.18,1.08,.06],[2.5,1.27,.23,1.04,1.02,.07],[2.86,1.14,.26,.94,.88,.05],[3,.92,.3,.88,.62,.02]],
   glass:[[1.2],[.5,.86,1.76],[0,.86,1.87],[-.8,.84,1.88],[-1.75,.78,1.85],[-2.2,.72,1.7],[-2.62]],ws:1.2,rear:-2.62,roofFront:.35,roofBack:-1.85,b:-.32,seat:.05,c:[-1.55,-1.82,-1.98]};
  const ctx=standardCar(k,P),L=ctx.body,F=k.onFront(L),R=k.onRear(L);
  k.rbox('gloss',DARK,0,1.86,-1.93,1.62,.05,.28,.02);
  arches(k,ctx,W);mirrors(k,.85,1.4,1.1);
  doorLines(k,ctx,[1.15,-.3,-1.5],{handles:[[.45,1.17],[-.95,1.25]]});
  // Thin upper grille between swept lamps, the big trapezoid lower grille, boomerang tails.
  k.decal('gloss','#0d0f11',[[-.44,0.82],[.44,0.82],[.4,0.87],[-.4,0.87]],F);
  k.decal('gloss','#0d0f11',[[-.78,.7],[.78,.7],[.62,.32],[-.62,.32]],F);
  for(let i=0;i<6;i++)k.decal('matte','#26292c',[[-.7+i*.02,.65-i*.055],[.7-i*.02,.65-i*.055],[.7-i*.02,.64-i*.055],[-.7+i*.02,.64-i*.055]],k.onFront(L,.02));
  for(const s of [-1,1]){
   k.decal('gloss',DARK,[[s*.44,0.83],[s*1.14,0.94],[s*1.2,0.87],[s*.96,0.76],[s*.46,0.78]],F);
   k.decal('lamp','#ffffff',[[s*.5,0.82],[s*1.1,0.91],[s*1.13,0.89],[s*.52,0.8]],k.onFront(L,.02));
   k.decal('lamp','#ffffff',k.ellipse(s*.8,.82,.08,.035,12),k.onFront(L,.02));
   k.decal('tail',null,[[s*.5,1.36],[s*1.18,1.36],[s*1.22,1.22],[s*.92,1.24],[s*.56,1.3]],R);
   k.decal('matte',RUB,[[s*.86,.4],[s*1.14,.46],[s*1.1,.66],[s*.88,.6]],F);
  }
  k.decal('matte',RUB,[[-1.05,.48],[1.05,.48],[.95,.62],[-.95,.62]],R);
  const emblem=(map,cx,cy,r,o)=>{k.decal('chrome','#e1e5e8',k.ellipse(cx,cy,r,r*.66,20),map(o),[k.ellipse(cx,cy,r*.84,r*.52,20)]);k.decal('chrome','#e1e5e8',k.ellipse(cx,cy+r*.05,r*.24,r*.5,14),map(o+.004),[k.ellipse(cx,cy+r*.05,r*.13,r*.4,14)]);k.decal('chrome','#e1e5e8',k.ellipse(cx,cy+r*.3,r*.6,r*.2,16),map(o+.004),[k.ellipse(cx,cy+r*.3,r*.48,r*.11,16)]);};
  emblem(o=>k.onFront(L,o),0,.78,.11,.026);emblem(o=>k.onRear(L,o),0,1.26,.09,.018);
  plates(k,L,.56,1.05);
  return {ctx,W};
 },
 ford(k){
  const W={R:.48,tw:.4,fz:2.01,rz:-1.75,x:1.3,rim:'ford',rr:.34};
  const P={section:boxSection,body:[[-.96,1.46,.54,1.68,1.34],[.9,1.46,.52,1.68,1.34],[1.0,1.46,.52,1.68,1.36,.04],[2.0,1.46,.5,1.62,1.36,.06],[2.9,1.44,.48,1.58,1.36,.03],[3,1.36,.56,1.48,1.28,.01]],
   glass:[[.9],[.35,1.12,2.22],[-.7,1.12,2.25],[-.9,1.12,2.23],[-.96]],ws:.9,rear:-.96,roofFront:.3,roofBack:-.9,b:-.38,seat:-.1,c:[-.78,-.78,-.78]};
  const ctx=standardCar(k,P),L=ctx.body,F=k.onFront(L);
  // Open cargo box: chassis, bed floor, walls and tailgate; tall tail lamps on the bed corners.
  const bed=k.loft([{z:-3,w:1.4,b:.6,t:1.0,tw:1.36,c:0},{z:-.9,w:1.46,b:.56,t:1.0,tw:1.4,c:0}],boxSection,{linear:true,step:1});
  k.box('matte','#24272a',0,1.02,-1.93,2.6,.03,2.02);
  for(const s of [-1,1]){k.rbox('paint',null,s*1.39,1.33,-1.93,.14,.7,2.12,.04);k.box('matte',RUB,s*1.39,1.69,-1.93,.16,.03,2.12);k.box('tail',null,s*1.39,1.3,-2.995,.15,.56,.04);k.box('lamp','#ffffff',s*1.39,1.08,-2.995,.15,.08,.042);}
  k.rbox('paint',null,0,1.33,-.96,2.92,.7,.12,.03);k.rbox('paint',null,0,1.32,-2.95,2.64,.66,.1,.03);
  k.decal('gloss','#1b1e21',k.rrect(-.18,1.52,.18,1.6,.02),(u,v)=>[u,v,-3.006]);
  k.rbox('chrome','#c2c7cb',0,.67,-2.96,2.86,.24,.14,.04);k.box('matte',RUB,0,.79,-2.97,1.0,.02,.1);
  k.cyl('chrome','#cfd5d9',-.72,.5,-2.95,.055,.14,12,'z');
  const square=(z,y,r,b)=>[[z+r*1.05,b],[z+r*1.05,y+r*.45],[z+r*.8,y+r*.98],[z-r*.8,y+r*.98],[z-r*1.05,y+r*.45],[z-r*1.05,b]];
  const whole={...L,side:(z,y)=>z< -.92?bed.side(z,Math.min(y,.98))??1.46:L.side(z,y),at:z=>z< -.92?bed.at(z):L.at(z)};
  arches(k,{body:whole},W,{shape:square,lip:'matte',lipColor:'#26292c',lipW:.12});
  mirrors(k,.72,1.86,1.24,{role:'gloss',c:TRIM,size:1.35});
  doorLines(k,ctx,[.85,-.08,-.9],{handles:[[.15,1.55],[-.75,1.55]],top:1.64});
  for(const s of [-1,1])k.box('matte',RUB,s*1.5,.47,.12,.16,.05,2.7);
  // Big grille with chrome bars and the blue oval; C-clamp lamp signature; heavy chrome bumper.
  k.decal('chrome','#cfd5d9',k.rrect(-.84,.8,.84,1.5,.06),F);
  k.decal('gloss','#0d0f11',k.rrect(-.76,.86,.76,1.44,.04),k.onFront(L,.018));
  for(const y of [1.0,1.15,1.3])k.decal('chrome','#c5cbd0',[[-.76,y-.025],[.76,y-.025],[.76,y+.025],[-.76,y+.025]],k.onFront(L,.024));
  k.decal('chrome','#d9dee1',k.ellipse(0,1.15,.19,.095,22),k.onFront(L,.03));k.decal('gloss','#1d4ba3',k.ellipse(0,1.15,.17,.08,22),k.onFront(L,.036));
  for(const s of [-1,1]){
   k.decal('gloss',DARK,k.rrect(s*.86,1.1,s*1.36,1.5,.05),F);
   k.decal('lamp','#ffffff',[[s*.9,1.46],[s*1.32,1.46],[s*1.32,1.14],[s*.9,1.14],[s*.9,1.19],[s*1.27,1.19],[s*1.27,1.41],[s*.9,1.41]],k.onFront(L,.022));
   k.decal('lamp','#ffffff',k.rrect(s*.98,1.25,s*1.2,1.34,.02),k.onFront(L,.022));
  }
  k.rbox('chrome','#c2c7cb',0,.66,2.96,2.86,.28,.16,.05);k.box('matte',RUB,0,.54,2.98,1.6,.08,.12);
  plates(k,L,null,1.0,-3.004);k.put(new k.T.BoxGeometry(.62,.14,.02).translate(0,.66,3.045),'plate');
  return {ctx,W};
 },
 vw(k){
  const W={R:.44,tw:.3,fz:1.74,rz:-1.63,x:1.26,rim:'vw',rr:.3};
  const lower=[[-3,1.2,.62,1.4,1.1],[-2.92,1.32,.45,1.46,1.26],[-2.6,1.37,.38,1.47,1.33],[2.6,1.37,.36,1.47,1.33],[2.93,1.32,.4,1.46,1.25],[3,1.18,.55,1.4,1.08]];
  const body=k.loft(lower.map(([z,w,b,t,tw])=>({z,w,b,t,tw,c:0,r:.18})),boxSection,{step:.2}),ctx={body};
  // White upper body with a rounded roof: the classic split-window bus.
  const upper=k.loft([[-2.97,1.2,2.3,.9],[-2.85,1.3,2.5,1.1],[-2.5,1.35,2.58,1.2],[2.4,1.35,2.58,1.2],[2.8,1.33,2.52,1.12],[2.97,1.24,2.36,.95]].map(([z,w,t,tw])=>({z,w,t,tw})),s=>mirrorHalf([0,s.t],[[s.tw*.6,s.t],[s.tw,s.t-.04],[s.w-.05,s.t-.3],[s.w,1.75],[s.w,1.46]],[0,1.4]),{role:'gloss',c:'#f1efe6',step:.25});
  const UF=k.onFront(upper,.012),UR=k.onRear(upper,.012),F=k.onFront(body),R=k.onRear(body);
  for(const s of [-1,1])k.decal('glass','#2b3f4b',k.rrect(s*.07,1.66,s*1.08,2.22,.1),UF);
  k.decal('gloss','#f1efe6',[[-1.33,1.47],[1.33,1.47],[.2,.98],[-.2,.98]],k.onFront(body,.006));
  k.decal('chrome','#e6eaec',k.ellipse(0,1.12,.24,.24,26),k.onFront(body,.014),[k.ellipse(0,1.12,.2,.2,26)]);
  const onNose=pts=>pts.map(([x,y])=>{const p=F(x,y);p[2]+=.006;return p;});
  k.line('chrome','#e6eaec',onNose([[-.14,1.27],[0,1.0],[.14,1.27]]),.03,.02,[0,0,1]);
  k.line('chrome','#e6eaec',onNose([[-.18,1.06],[-.09,.95],[0,1.05],[.09,.95],[.18,1.06]]),.03,.02,[0,0,1]);
  for(const s of [-1,1]){
   k.decal('chrome','#e6eaec',k.ellipse(s*.98,1.16,.17,.17,20),F);k.decal('lamp','#ffffff',k.ellipse(s*.98,1.16,.135,.135,20),k.onFront(body,.02));
   k.decal('gloss','#f29a2e',k.ellipse(s*1.05,1.62,.05,.05,10),UF);
   k.decal('tail',null,k.ellipse(s*1.05,1.05,.07,.1,14),R);
   const map=k.onSide(upper,s,.012);
   for(let i=0;i<6;i++)k.decal('matte','#2a2c2e',[[-2.1-i*.09,2.0],[-2.14-i*.09,2.0],[-2.14-i*.09,1.75],[-2.1-i*.09,1.75]],map);
   for(const [z0,z1] of [[1.65,2.45],[.75,1.5],[-.15,.6],[-1.05,-.3],[-1.9,-1.2]])k.decal('glass','#2b3f4b',k.rrect(z0,1.66,z1,2.22,.1),map);
   for(const z of [-1.5,-.6,.3,1.2,2.1])k.decal('glass','#2b3f4b',k.rrect(z-.25,2.4,z+.25,2.48,.03),map);
  }
  k.decal('glass','#2b3f4b',k.rrect(-.55,1.9,.55,2.25,.08),UR);k.decal('matte','#2a2c2e',k.rrect(-.5,1.05,.5,1.4,.05),R);
  for(const z of [2.99,-2.99])k.rbox('chrome','#e6eaec',0,.62,z,2.72,.12,.08,.04);
  for(const z of [2.99,-2.99])for(const s of [-1,1])k.rbox('chrome','#e6eaec',s*.9,.66,z+Math.sign(z)*.03,.07,.26,.07,.02);
  k.cyl('chrome','#cfd5d9',.55,.45,-2.95,.04,.18,10,'z');
  arches(k,ctx,W);mirrors(k,2.65,1.75,1.36,{role:'chrome',c:'#d5dade',size:.7});
  doorLines(k,ctx,[2.4,1.55,.3,-.95],{handles:[[1.65,1.38]],top:1.45});
  plates(k,body,.85,1.25);
  return {ctx,W};
 }
};

export function buildCar(T,part,box,tube,brandId,color){
 const id=CAR_BRANDS[brandId]?brandId:'model3',b=CAR_BRANDS[id],paint=color||b.colors[0];
 if(!models.has(id)){
  const k=kit(T),{ctx,W}=MODELS[id](k),entries=k.merged(),L=ctx.body,g=ctx.glass;
  // Paint stays first to preserve the existing car outfit contract.
  entries.sort((a,c)=>(c.role==='paint')-(a.role==='paint'));
  const wheels=[];for(const side of [-1,1])for(const z of [W.rz,W.fz])wheels.push({side,x:side*W.x,y:W.R+.3,z});
  // Anchor points for the garage accessories, measured on the body (shell coordinates, y includes the .3 lift).
  const topAt=(x,z)=>(L.top(x,z)??1)+.3,P=ctx.P;
  const roof=g?{y:Math.max(...g.st.map(s=>s.s.ry))+.33,front:P.roofFront,back:P.roofBack,w:Math.min(...g.st.filter(s=>s.z<=P.roofFront&&s.z>=P.roofBack).map(s=>s.s.rw))}
   :id==='vw'?{y:2.91,front:2.2,back:-2.3,w:1.15}:{y:2.43,front:.95,back:-.65,w:.85};
  const hoodZ=Math.min(2.55,(W.fz+3)/2),deckZ=id==='ford'?-2.95:-2.68;
  const anchors={roof,hood:{z:hoodZ,y:topAt(0,hoodZ),slope:Math.atan2(topAt(0,hoodZ-.4)-topAt(0,hoodZ+.4),.8)},
   deck:{z:deckZ,y:id==='ford'?2.0:id==='vw'?roof.y:topAt(0,deckZ)},tail:{z:id==='ford'?-3.05:L.rear(0,.9),y:1.15},sill:.3+L.at(0).b,side:L.at(0).w,wheelRadius:W.R};
  models.set(id,{entries,wheels,W,anchors});
 }
 const shell=new T.Group();
 const {entries,wheels,W,anchors}=models.get(id);
 for(const {geometry,role} of entries){
  const material=role==='paint'?finish(T,b.steel?'steel':'paint',paint):role==='glass'?finish(T,'glass',b.glass,b.mark==='T'?.93:.78):finish(T,role);
  const mesh=new T.Mesh(geometry,material);mesh.position.y=.3;mesh.userData.carShared=true;if(material.emissive?.r>.2&&material.emissive?.g<.3)mesh.userData.tail=true;shell.add(mesh);
 }
 shell.userData.wheelRoll=0;
 shell.userData.wheelSteer=0;
 shell.userData.wheelRadius=W.R;
 shell.userData.wheels=wheels.map(({side,x,y,z})=>{
  const meshes=wheelParts(T,id,side,W).map(({geometry,role})=>{
   const mesh=new T.Mesh(geometry,finish(T,role));
   mesh.position.set(x,y,z);mesh.userData.carShared=true;shell.add(mesh);
   return mesh;
  });
  return {front:z>0,meshes};
 });
 shell.userData.anchors=anchors;
 shell.userData.brand=id;shell.userData.body=shell.children[0];shell.userData.roofHeight=new T.Box3().setFromObject(shell).max.y;shell.userData.detail='sculpted-pbr';return shell;
}
