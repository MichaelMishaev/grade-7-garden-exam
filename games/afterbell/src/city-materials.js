// Surface materials, sky lighting and organic shapes for Bay City.
// Every static surface samples one small tiling noise texture by world position, so a single
// instanced batch per surface kind gets grain, wear and wet-road shine without per-object UVs.
import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// Tiling value noise. period = lattice cells across the texture.
function lattice(period,seed){
 const cells=new Float32Array(period*period);let s=seed>>>0;
 for(let i=0;i<cells.length;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;cells[i]=s/4294967296;}
 const at=(i,j)=>cells[((j%period+period)%period)*period+((i%period+period)%period)];
 return (u,v)=>{
  const x=u*period,y=v*period,x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
  return (at(x0,y0)*(1-sx)+at(x0+1,y0)*sx)*(1-sy)+(at(x0,y0+1)*(1-sx)+at(x0+1,y0+1)*sx)*sy;
 };
}
// R: fine grain. G: large blotches. B: medium clumps.
export function noiseTexture(size=128){
 const fine=[lattice(64,7),lattice(32,19)],blotch=[lattice(5,43),lattice(11,71)],clump=[lattice(16,5),lattice(37,29)];
 const data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=x/size,v=y/size,i=(y*size+x)*4;
  data[i]=255*(.6*fine[0](u,v)+.4*fine[1](u,v));
  data[i+1]=255*(.65*blotch[0](u,v)+.35*blotch[1](u,v));
  data[i+2]=255*(.6*clump[0](u,v)+.4*clump[1](u,v));
  data[i+3]=255;
 }
 const t=new T.DataTexture(data,size,size,T.RGBAFormat);
 t.wrapS=t.wrapT=T.RepeatWrapping;t.magFilter=T.LinearFilter;t.minFilter=T.LinearMipmapLinearFilter;t.generateMipmaps=true;t.needsUpdate=true;
 return t;
}

const GROUNDED='mix(GROUND,1.,clamp(dTop+smoothstep(0.,2.4,vWp.y),0.,1.))';
// color: runs after the base colour is known. rough: runs after the base roughness is known.
const KINDS={
 plain:{roughness:.8,
  color:`diffuseColor.rgb*=(.93+dA.r*.14)*(.94+dB.g*.12)*${GROUNDED.replace('GROUND','.76')};`},
 wall:{roughness:.9,
  // Plaster: soft blotches, rain streaks under the roof line and a darker foot where the wall meets the ground.
  color:`float dS=texture2D(uDetail,vec2(dUv.x*.07,dUv.y*.012)).b;
   diffuseColor.rgb*=(.94+dA.r*.12)*(.9+dB.g*.2)*mix(1.-.1*smoothstep(.45,.8,dS),1.,dTop)*${GROUNDED.replace('GROUND','.64')};`},
 asphalt:{roughness:.93,
  // Rain darkens the road and leaves puddles that mirror the sky.
  color:`float dP=dTop*uWet*smoothstep(.36,.62,dB.g+dB.b*.3);
   diffuseColor.rgb*=(.84+dA.r*.3)*(.9+dB.b*.2)*(1.-.09*smoothstep(.6,.64,dB.g))*(1.-.22*uWet);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.36,.43,.5),dP*.42);`,
  rough:`roughnessFactor=mix(roughnessFactor,.05,max(dP,dTop*uWet*.4));`},
 pave:{roughness:.86,
  // Paving slabs: joints every 1.6 m and a slightly different tone per slab.
  color:`vec2 dG=vWp.xz/1.6,dF=abs(fract(dG)-.5);
   float dJ=max(smoothstep(.455,.5,dF.x),smoothstep(.455,.5,dF.y))*dTop;
   float dH=fract(sin(dot(floor(dG),vec2(12.9898,78.233)))*43758.5453);
   diffuseColor.rgb*=(.9+dA.r*.2)*(.95+dH*.1*dTop)*(1.-.2*dJ)*(1.-.18*uWet);`,
  rough:`roughnessFactor=mix(roughnessFactor,.25,dTop*uWet*.6);`},
 grass:{roughness:.95,
  color:`diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.3,1.12,.62),smoothstep(.3,.7,dB.g));
   diffuseColor.rgb*=(.74+dA.r*.3+dA.b*.22)*(.82+dB.b*.36);`},
 sand:{roughness:.95,
  color:`diffuseColor.rgb*=(.9+dA.r*.16)*(.92+dB.b*.16)*(1.-.2*uWet);`},
 tile:{roughness:.78,
  // Roof tiles: courses that follow the slope.
  color:`float dR=fract(vWp.y*1.7);diffuseColor.rgb*=(.78+.22*smoothstep(0.,.3,dR))*(.88+dA.b*.24);`},
 leaf:{roughness:.86,vertexColors:true,
  color:`diffuseColor.rgb*=(.84+dA.b*.3);`},
 glass:{roughness:.1,metalness:.35},
 water:{roughness:.08,metalness:.1,
  // Two noise layers drift across each other; their slopes bend the reflection of the sky.
  color:`vec2 wU=vWp.xz*.03;
   vec3 w1=texture2D(uDetail,wU+uTime*vec2(.011,.007)).rgb,w2=texture2D(uDetail,wU*2.7-uTime*vec2(.016,-.012)).rgb;
   float wF=smoothstep(5.,0.,vWp.z-188.-sin(uTime*.7+vWp.x*.13)*1.4)*step(184.,vWp.z)*step(vWp.x,356.)*step(-244.,vWp.x);
   diffuseColor.rgb=mix(diffuseColor.rgb*(.8+.4*w1.g),vec3(.82,.93,.92),wF*(.35+.5*w2.b));`,
  normal:`normal=normalize((viewMatrix*vec4(normalize(vec3((w1.b+w2.b-1.)*.5,1.,(w1.g+w2.r-1.)*.5)),0.)).xyz);`}
};

export function createSurfaces(){
 const uniforms={uDetail:{value:noiseTexture()},uWet:{value:0},uTime:{value:0}};
 const materials=new Map();
 function surface(kind,extra={}){
  const key=kind+JSON.stringify(extra);if(materials.has(key))return materials.get(key);
  const k=KINDS[kind]||KINDS.plain;
  const m=new T.MeshStandardMaterial({roughness:k.roughness,metalness:k.metalness||0,vertexColors:Boolean(k.vertexColors),...extra});
  if(k.color){
   m.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,uniforms);
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWp;varying vec3 vWn;')
     .replace('#include <begin_vertex>',`#include <begin_vertex>
      vec4 dWp=vec4(transformed,1.);vec3 dWn=objectNormal;
      #ifdef USE_INSTANCING
       dWp=instanceMatrix*dWp;dWn=mat3(instanceMatrix)*dWn;
      #endif
      vWp=(modelMatrix*dWp).xyz;vWn=normalize(mat3(modelMatrix)*dWn);`);
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vWp;varying vec3 vWn;uniform sampler2D uDetail;uniform float uWet;uniform float uTime;')
     .replace('#include <color_fragment>',`#include <color_fragment>
      vec3 dN=abs(vWn);float dTop=step(.55,vWn.y);
      vec2 dUv=dN.y>.55?vWp.xz:(dN.x>dN.z?vWp.zy:vWp.xy);
      vec3 dA=texture2D(uDetail,dUv*.11).rgb,dB=texture2D(uDetail,dUv*.013+.37).rgb;
      ${k.color}`)
     .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\n'+(k.rough||''))
     .replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n'+(k.normal||''));
   };
   m.customProgramCacheKey=()=>'bay-surface-'+kind;
  }
  materials.set(key,m);return m;
 }
 return {surface,uniforms};
}

// Outdoor light for reflections and soft fill: a blue zenith, a bright horizon, warm ground bounce and a sun.
export function skyEnvironment(renderer){
 const scene=new T.Scene(),c=document.createElement('canvas');c.width=8;c.height=256;
 const ctx=c.getContext('2d'),g=ctx.createLinearGradient(0,0,0,256);
 for(const [stop,color] of [[0,'#2f6fd0'],[.3,'#6ea6e6'],[.47,'#dcebf7'],[.5,'#f3f1e6'],[.53,'#9c9682'],[1,'#57584c']])g.addColorStop(stop,color);
 ctx.fillStyle=g;ctx.fillRect(0,0,8,256);
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;
 const dome=new T.Mesh(new T.SphereGeometry(100,24,16),new T.MeshBasicMaterial({map,side:T.BackSide}));
 const sun=new T.Mesh(new T.SphereGeometry(7,12,8),new T.MeshBasicMaterial({color:new T.Color(38,34,27)}));sun.position.set(-48,70,38);
 scene.add(dome,sun);
 const pmrem=new T.PMREMGenerator(renderer),texture=pmrem.fromScene(scene,.03).texture;
 pmrem.dispose();map.dispose();dome.geometry.dispose();dome.material.dispose();sun.geometry.dispose();sun.material.dispose();
 return texture;
}

// A tree crown: overlapping lumpy blobs, shaded darker underneath and inside. Fits a unit sphere.
export function canopyGeometry(){
 const blobs=[[0,.1,0,.8],[.5,-.16,.26,.54],[-.46,-.2,.3,.52],[.04,-.08,-.54,.56]];
 const parts=blobs.map(([x,y,z,r],b)=>{
  const g=new T.IcosahedronGeometry(r,1),p=g.attributes.position,n=g.attributes.normal,colors=new Float32Array(p.count*3),v=new T.Vector3(),out=new T.Vector3();
  for(let i=0;i<p.count;i++){
   v.fromBufferAttribute(p,i);
   // The lump depends only on direction, so vertices shared between faces stay joined.
   const lump=1+.13*Math.sin(v.x*9.1+b*2.3)*Math.sin(v.y*8.3+b)*Math.sin(v.z*7.7-b*1.7);
   v.multiplyScalar(lump).add(out.set(x,y,z));p.setXYZ(i,v.x,v.y,v.z);
   // Shade from the whole crown as well as from the blob, so the tree reads as one soft mass.
   out.copy(v).normalize().lerp(new T.Vector3().fromBufferAttribute(n,i),.55).normalize();n.setXYZ(i,out.x,out.y,out.z);
   const shade=Math.min(1,.5+.34*(v.y+.75)+.22*Math.min(1,v.length()));
   colors[i*3]=colors[i*3+1]=colors[i*3+2]=shade;
  }
  g.setAttribute('color',new T.BufferAttribute(colors,3));return g;
 });
 const merged=mergeGeometries(parts);for(const g of parts)g.dispose();return merged;
}

// Body shapes for residents. Each fits a unit box, so they scale like the boxes they replace.
export function bodyShapes(){
 // Kept light: a resident is about 500 triangles, and there are dozens on screen with their shadows.
 const limb=new T.CapsuleGeometry(.5,1,2,6).scale(1,.5,1);
 const head=new T.IcosahedronGeometry(.5,1);
 const hair=new T.SphereGeometry(.5,8,4,0,Math.PI*2,0,Math.PI*.56);
 const torso=new RoundedBoxGeometry(1,1,1,1,.22);
 return {limb,head,hair,torso};
}
