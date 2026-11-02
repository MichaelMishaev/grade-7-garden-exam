// One coordinate model for geography, travel, draft recovery and the atlas.
export const WORLD_EDGE=108;
export const HOME={id:'campus',name:'קמפוס שי עגנון',x:0,z:9};
export const regions=[
  {name:'ביצות הגאות',color:'#719f9c',sites:[
    {id:'mill',name:'טחנת הגאות',x:59,z:12},{id:'dock',name:'רציף הפנסים',x:84,z:54}]},
  {name:'מחצבת הענבר',color:'#cc9a62',sites:[
    {id:'arch',name:'קשת הענבר',x:-62,z:14},{id:'mine',name:'מכרה הגבישים',x:-86,z:60}]},
  {name:'רכס הכוכבים',color:'#a3a6d9',sites:[
    {id:'dome',name:'מצפה השחר',x:-15,z:-72},{id:'array',name:'מעגל האנטנות',x:62,z:-82}]}
];
export const landmarks=regions.flatMap(r=>r.sites.map(s=>({...s,region:r.name,color:r.color})));
export const roads=[
 [[19,12],[27,12],[45,12],[59,12],[73,28],[84,54]],
 [[-10,1],[-20,0],[-27,0],[-40,0],[-62,14],[-76,33],[-86,60]],
 [[7,-24],[0,-27],[-6,-44],[-15,-72],[9,-86],[44,-82],[62,-82]],
 [[62,-82],[73,-56],[62,-26],[59,12]],
 [[-86,60],[-60,83],[-20,80],[0,67],[0,27],[0,25]],
 [[0,67],[35,58],[45,54],[84,54]]
];
export const bridges=[12,54];
export function inRiver(x,z){
  return Math.abs(x-45)<3.6 && z>-40 && z<91 && bridges.every(b=>Math.abs(z-b)>2.1);
}
export function regionAt(x,z){
  if(Math.max(Math.abs(x),Math.abs(z))<=27)return HOME.name;
  if(z<-38)return regions[2].name;
  return x<0?regions[1].name:regions[0].name;
}
export function knownStones(value){
  return Array.isArray(value)?landmarks.filter(s=>value.includes(s.id)).map(s=>s.id):[];
}

// Jump gates form a second, optional route through the three regions.
export const skyGates=[[33,12],[50,12],[73,28],[-36,0],[-54,10],[-76,33],[-5,-42],[-14,-64],[25,-84]];
