// Branded cars for Bay City. Every model keeps the shared 3.6 x 6 footprint so collision,
// yielding and the garage accessories (roof beacon, spoiler, surfboard) fit all of them.
// Front of a car is +z. children[0] of the shell is always the paint body.
export const CAR_BRANDS={
 model3:{make:'Tesla',name:'Tesla Model 3',style:'sedan',colors:['#f4f5f4','#c8312f','#8e9aa3'],glass:'#1b2530',tail:'bar',mark:'T'},
 modelY:{make:'Tesla',name:'Tesla Model Y',style:'suv',colors:['#2f5fa8','#f4f5f4','#2a2e33'],glass:'#1b2530',tail:'bar',mark:'T'},
 cybertruck:{make:'Tesla',name:'Tesla Cybertruck',style:'wedge',colors:['#aeb6bb'],glass:'#12181d',tail:'bar',mark:'T'},
 bmw:{make:'BMW',name:'BMW סדרה 3',style:'sedan',colors:['#254f9c','#1f2326'],glass:'#27343e',grille:'kidney',mark:'BMW'},
 mercedes:{make:'Mercedes-Benz',name:'Mercedes C-Class',style:'sedan',colors:['#c9ced2','#1d2328'],glass:'#27343e',grille:'star',mark:'Mercedes'},
 toyota:{make:'Toyota',name:'Toyota Corolla',style:'hatch',colors:['#d7d9d6','#b4322f','#31506d'],glass:'#3d5565',grille:'slim',mark:'TOYOTA'},
 ford:{make:'Ford',name:'Ford F-150',style:'pickup',colors:['#2c4f87','#c7cbc9'],glass:'#3d5565',grille:'wide',mark:'FORD'},
 vw:{make:'Volkswagen',name:'Volkswagen Bus',style:'bus',colors:['#e3b24f','#69b3a6'],glass:'#3d5565',grille:'vee',mark:'VW'}
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

const plates=new Map();
// Canvas wordmark on a thin plane; falls back to nothing outside the browser (unit tests).
function plate(T,text,w,bg='#161b1f',fg='#f3f5f4'){
 if(typeof document==='undefined')return null;
 const key=text+bg+fg;
 if(!plates.has(key)){
  const c=document.createElement('canvas');c.width=256;c.height=96;
  const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,256,96);x.fillStyle=fg;
  x.font='700 '+(text.length>5?50:text.length>2?62:78)+'px Arial,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(text,128,52);
  const tex=new T.CanvasTexture(c);if('colorSpace' in tex)tex.colorSpace=T.SRGBColorSpace;plates.set(key,tex);
 }
 return new T.Mesh(new T.PlaneGeometry(w,w*96/256),new T.MeshBasicMaterial({map:plates.get(key)}));
}

export function buildCar(T,part,box,tube,brandId,color){
 const b=CAR_BRANDS[brandId]||CAR_BRANDS.model3,shell=new T.Group();
 const paint=color||b.colors[0],dark='#2a3036',lamp='#fff1c4';
 const S=b.style;
 // Paint body first: outfit() and traffic recolour children[0].
 const body=part(shell,box,paint,0,1.26,0,3.6,S==='bus'?2.2:1.45,6);
 const bodyTop=S==='bus'?2.36:1.99;
 // Cabin by silhouette: [z centre, depth, height, width]
 const cabins={sedan:[-.45,3.5,1.3,3.1],hatch:[-.7,3.8,1.4,3.15],suv:[-.55,4.1,1.55,3.2],pickup:[.55,2.5,1.5,3.15],bus:[0,5.5,1.2,3.3]};
 if(S==='wedge'){
  // Cybertruck: flat steel slab with one long raked windscreen-to-tailgate roofline.
  part(shell,box,paint,0,2.2,-.2,3.5,1.1,4.6);
  const rake=part(shell,box,paint,0,2.62,-.45,3.4,.2,4.2);rake.rotation.x=.2;
  const glass=part(shell,box,b.glass,0,2.5,1.05,3.0,.95,.14);glass.rotation.x=-.62;
  part(shell,box,b.glass,0,2.5,-.2,3.52,.5,2.2);
  part(shell,box,'#e9eef0',0,1.83,3.02,3.3,.1,.1).material.emissive.set('#ffffff');
 }else{
  const [cz,cd,ch,cw]=cabins[S];
  const cy=bodyTop+ch/2-.05;
  part(shell,box,S==='bus'?paint:b.glass,0,cy,cz,cw,ch,cd);
  if(S==='bus'||S==='pickup'){
   // Painted roof and pillars over the glass.
   part(shell,box,paint,0,cy+ch/2,cz,cw+.08,.14,cd+.06);
  }else{
   part(shell,box,paint,0,cy+ch/2-.02,cz,cw-.12,.14,cd-.1);
  }
  if(S==='pickup'){
   // Open bed: floor plus three walls.
   part(shell,box,dark,0,bodyTop-.08,-1.9,3.2,.12,2.2);
   part(shell,box,paint,0,bodyTop+.25,-3.0,3.4,.6,.14);
   for(const side of [-1,1])part(shell,box,paint,side*1.64,bodyTop+.25,-1.9,.14,.6,2.3);
  }
  if(S==='bus'){
   part(shell,box,'#f4efe2',0,1.55,0,3.64,.5,6.02);
   part(shell,box,'#f4efe2',0,2.8,1.4,3.5,.12,.08);
  }
 }
 // Lights: Teslas get a full-width tail bar, everything else paired tail lamps.
 const tailY=S==='bus'?1.9:S==='wedge'?2.1:1.8;
 if(b.tail==='bar'){
  const bar=part(shell,box,'#ff2f3f',0,tailY,-3.03,3.2,.16,.08);bar.material.emissive.set('#ff1020');
  const strip=part(shell,box,'#ffffff',0,1.62,3.03,2.9,.07,.08);strip.material.emissive.set('#ffffff');
 }else{
  for(const side of [-1,1]){const l=part(shell,box,'#e5382f',side*1.35,tailY-.1,-3.03,.7,.34,.08);l.material.emissive.set('#a01a14');}
 }
 for(const side of [-1,1]){
  const hl=part(shell,box,lamp,side*1.25,1.45,3.04,.8,.3,.1);hl.material.emissive.set('#ffe9a0');
  for(const z of [-1.88,1.88])part(shell,box,'#242c31',side*1.82,.69,z,.46,1.18,1.15);
 }
 // Grille treatments make brands readable from the isometric camera.
 if(b.grille==='kidney'){
  for(const side of [-1,1])part(shell,box,'#0e1113',side*.38,1.28,3.03,.62,.5,.1);
 }else if(b.grille==='star'){
  part(shell,box,'#0e1113',0,1.3,3.03,1.9,.62,.1);part(shell,box,'#d9dde0',0,1.3,3.1,.22,.22,.06);
 }else if(b.grille==='wide'){
  part(shell,box,'#d4d8d9',0,1.28,3.03,2.5,.6,.1);part(shell,box,'#25496f',0,1.28,3.1,.9,.3,.06);
 }else if(b.grille==='vee'){
  part(shell,box,'#f4efe2',0,1.5,3.03,.14,.9,.1);part(shell,box,'#2a5f9e',0,1.72,3.1,.6,.6,.06);
 }else if(b.grille==='slim'){
  part(shell,box,'#14181a',0,1.2,3.03,2.0,.28,.1);
 }
 // Brand mark: logo plate at the nose plus a wordmark across the tailgate.
 const nose=plate(T,b.mark,.9);if(nose){nose.position.set(0,S==='bus'?2.35:S==='wedge'?1.82:1.78,3.1);shell.add(nose);}
 const rear=plate(T,b.make==='Tesla'?'TESLA':b.mark.toUpperCase(),1.2);
 if(rear){rear.position.set(0,S==='bus'?1.1:1.65,-3.1);rear.rotation.y=Math.PI;shell.add(rear);}
 shell.userData.brand=brandId;
 shell.userData.body=body;
 return shell;
}
