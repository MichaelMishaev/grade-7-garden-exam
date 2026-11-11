// Static scenery shares the instanced city meshes and the same street grid as navigation.
import {CITY_BOUNDS,STREET_STEP,northSouthStreets,eastWestStreets,streetEnds,places} from './city-data.js';

// block.<kind> picks a surface material in the game; a plain function (tests) draws everything alike.
export function drawCityGroundAndRoads(block,glow=block){
 const {west,east,north,south}=CITY_BOUNDS,w=east-west,cx=(west+east)/2;
 const roadLength=streetEnds.south-streetEnds.north,roadZ=(streetEnds.north+streetEnds.south)/2;
 const grass=block.grass||block,road=block.asphalt||block,pave=block.pave||block,sand=block.sand||block;
 const ASPHALT='#4b5057',PAVING='#bdb8aa',KERB='#d5d2c8',LINE='#e9e7dc';
 // The land ends at the waterline; the sea itself is drawn by the world.
 grass('#5c8448',cx,-.6,(north-4+188)/2,w+10,1,188-north+4);sand('#dcc79a',cx,.05,180,w+6,.22,16);
 for(const x of northSouthStreets){
   pave(PAVING,x,.08,roadZ,12,.15,roadLength);road(ASPHALT,x,.18,roadZ,8,.15,roadLength);
   for(let z=streetEnds.north+6;z<178;z+=14)block(LINE,x,.29,z,.22,.1,4);
 }
 for(const z of eastWestStreets){
   pave(PAVING,cx,.12,z,w+6,.18,12);road(ASPHALT,cx,.25,z,w+6,.14,8);
   for(let x=west+5;x<east;x+=14)block(LINE,x,.35,z,4,.08,.22);
 }
 // Raised sidewalks with a kerb stone, laid block by block so they stop at every junction.
 const spans=(streets,from,to)=>[from-4,...streets,to+4].slice(0,-1).map((a,i,all)=>[a+4,([...streets,to+4][i])-4]).filter(([a,b])=>b-a>1);
 for(const x of northSouthStreets)for(const [a,b] of spans(eastWestStreets,streetEnds.north,streetEnds.south))for(const side of [-1,1]){
   pave(PAVING,x+side*5,.3,(a+b)/2,2,.36,b-a);block(KERB,x+side*4.12,.31,(a+b)/2,.26,.4,b-a);
 }
 for(const z of eastWestStreets)for(const [a,b] of spans(northSouthStreets,west-3,east+3))for(const side of [-1,1]){
   pave(PAVING,(a+b)/2,.3,z+side*5,b-a,.36,2);block(KERB,(a+b)/2,.31,z+side*4.12,b-a,.4,.26);
 }
 for(const x of northSouthStreets)for(const z of eastWestStreets){
   // Zebra crossings on all four arms, a lamp on one corner.
   for(const side of [-1,1])for(let k=-3;k<=3;k++){block(LINE,x+k,.43,z+side*5.4,.6,.07,1.6);block(LINE,x+side*5.4,.43,z+k,1.6,.07,.6);}
   block('#59686b',x+7,2.9,z+7,.26,5.8,.26);block('#59686b',x+6.6,5.75,z+7,1.1,.14,.2);glow('#fff0c2',x+6.3,5.6,z+7,1.5,.3,.6);
 }
}

function container(block,x,z,color){
 block(color,x,1.8,z,9,3.3,4);block('#657477',x,3.51,z,9.2,.17,4.15);
 for(let rib=-3;rib<=3;rib+=1.5)block('#99a09a',x+rib,1.8,z+2,.12,3.05,.14);
}

export function drawOuterDistricts({block,solid,tree,house,windows}){
 const wall=block.wall||block,pave=block.pave||block;
 // Fill only the added blocks. Keep named forecourts clear for pedestrians and incident staging.
 for(const xRoad of northSouthStreets.slice(0,-1))for(const zRoad of eastWestStreets.slice(0,-1)){
   if(xRoad<224&&zRoad>=-224)continue;
   const x=xRoad+STREET_STEP/2,z=zRoad+STREET_STEP/2;
   if(Object.values(places).some(p=>Math.abs(x-p.x)<27&&Math.abs(z-p.z)<28))continue;
   if(xRoad>=224){
     const color=zRoad<0?'#9cb1aa':'#9da6ae';
     pave('#b9b4a2',x,.18,z,37,.34,35);
     wall(color,x,3.8,z-4,20,7.6,13);solid(x,z-4,20,13);
     block('#e0d5b6',x,7.8,z-4,21,.6,14);block('#527276',x,2.1,z+2.55,8,4.2,.2);
     container(block,x-7,z+11,'#a7684f');solid(x-7,z+11,9,4);
     tree(x+14,z+13,'#77a789');
   }else{
     house(x-8,z-7,'#d5b098',12,7);
     if(zRoad===-336){
       wall('#d1baaa',x+11,5,z-5,11,10,12);solid(x+11,z-5,11,12);windows(x+11,6.8,z+1.1,11,3);
       block('#f3e3cb',x+11,10.3,z-5,12,.6,13);
     }
     tree(x+9,z+13,'#83ae8b');tree(x-12,z+15,'#76a78c');
   }
 }
 // Working waterfront beyond the old eastern seawall.
 for(let x=225;x<350;x+=15)block('#a77457',x,.85,187,14,1.2,3);
 block('#baa17c',306,.62,193,5,1.1,16);
 block('#296c76',310,1.1,203,13,2.5,5);block('#faf1cf',310,3.8,203,9,2.6,4.3);
 for(let x=307;x<=313;x+=2)block('#567e92',x,4,205.2,1.3,1,.1);
}

export function drawDistrictLandmark(p,{block,prop,tube,ball,solid,tree}){
 const x=p.x,z=p.z-11,wall=block.wall||block,pave=block.pave||block;
 switch(p.kind){
 case 'station':
   pave('#c5b8a1',x,.35,z,33,.7,17);
   wall('#b69b82',x-7,3.3,z-2,11,6.6,10);solid(x-7,z-2,11,10);
   for(const dx of [-14,0,14])block('#537776',x+dx,3.2,z+3,.72,6.4,.72);
   block('#55939b',x,6.7,z+2,34,.7,8);
   for(const dz of [-9,-11])block('#616b6c',x,.35,z+dz,38,.25,.24);
   for(let dx=-18;dx<=18;dx+=2)block('#9b8067',x+dx,.19,z-10,.7,.2,4.1);
   break;
 case 'court':
   block('#c88363',x,.35,z,27,.45,17);block('#578f79',x,.62,z,24,.12,14);
   for(const dz of [-6.7,6.7])block('#eee8ce',x,.7,z+dz,23,.08,.14);
   for(const dx of [-11.5,0,11.5])block('#eee8ce',x+dx,.7,z,.14,.08,13.5);
   for(const side of [-1,1]){
     block('#576c71',x+side*12.4,2.2,z,.24,4.4,.24);
     block('#fff3cf',x+side*11.9,4.1,z,.25,1.45,2.35);
     prop(tube,'#df8453',x+side*11.3,3.64,z,.52,.12,.52);
   }
   break;
 case 'firehouse':
   wall('#b65b4a',x,4.3,z,24,8.6,13);solid(x,z,24,13);
   for(const dx of [-7,0,7]){
     block('#586570',x+dx,2.7,z+6.55,5.6,5.4,.22);
     for(const dy of [1,2.4,3.8])block('#849393',x+dx,dy,z+6.74,5.3,.12,.08);
   }
   block('#fbdfac',x,8.8,z,25,.7,14);
   block('#a95646',x+8,11.3,z-3,4.4,5.2,4.4);block('#f8dfad',x+8,14,z-3,5,.5,5);
   prop(tube,'#f5c04e',x-9,8.95,z+4,.55,.65,.55);
   break;
 case 'shipworks':
   wall('#718f92',x,4,z,24,8,14);solid(x,z,24,14);
   block('#4d686b',x,2.6,z+7.1,10,5.2,.25);block('#dfc5a0',x,8.3,z,25,.6,15);
   for(const dx of [-9,-3,3,9])block('#b6d7cf',x+dx,6.15,z+7.2,3.1,1.3,.23);
   for(const dx of [-7,7])block('#9a6f55',x+dx,10.3,z-3,1.5,4,1.5);
   break;
 case 'freight':
   pave('#b9ae99',x,.25,z,32,.5,21);
   for(const dx of [-9,1,11]){
     container(block,x+dx,z-3,dx===1?'#6992a8':'#b87857');solid(x+dx,z-3,9,4);
   }
   for(const dx of [-10,10])block('#d6a056',x+dx,6.2,z+4,.9,12.4,1.1);
   block('#e7b265',x,12.5,z+4,24,1,1.4);
   block('#647477',x+4,9.8,z+4,.26,4.4,.26);block('#596b71',x+4,7.5,z+4,2.2,.45,.55);
   break;
 case 'ferry':
   block('#ddb88b',x,.42,z,27,.84,13);
   for(const dx of [-11,-4,4,11])block('#437c7e',x+dx,2.7,z,.5,5.4,.5);
   block('#67a7ad',x,5.65,z,27,.7,10);block('#f7e8c8',x-8,2,z,5.5,4,4);
   block('#39686b',x-8,2.35,z+2.1,3,1.55,.14);tree(x+13,z-5,'#73a98d');
   break;
 default:return false;
 }
 return true;
}
