// Free-roam activities in Bay City: street time trials, passenger rides and express parcels,
// hidden festival stars and timed star showers. Pure rules: the 3D scene only draws this state.
// Coordinates follow the city: x east, z south, streets every 56 m.
export const MEDALS=['','ארד','כסף','זהב'],MEDAL_ICON=['','🥉','🥈','🥇'];
const race=(id,name,detail,points)=>{
 const [start,...checkpoints]=points.map(([x,z])=>({x,z}));
 let length=0,from=start;for(const p of checkpoints){length+=Math.hypot(p.x-from.x,p.z-from.z);from=p;}
 // Medal times are fixed, so a faster car (earned through learning tasks) makes gold reachable.
 return {id,name,detail,start,checkpoints,length:Math.round(length),times:[0,Math.round(length/16),Math.round(length/25),Math.round(length/34)]};
};
export const RACES=[
 race('gardens','סיבוב הגנים','הקפה סביב שכונת הגנים, דרך הטיילת.',[[-56,96],[-56,168],[-168,168],[-168,56],[-56,56],[-56,96]]),
 race('market','זיגזג השוק','פניות חדות בין הספרייה לשוק הפרחים.',[[112,-16],[112,-112],[0,-112],[0,-168],[168,-168],[168,-56]]),
 race('boardwalk','דהרת הטיילת','קו ישר לאורך הים. כאן המהירות קובעת.',[[-208,168],[-112,168],[0,168],[112,168],[212,168]]),
 race('station','מעגל התחנה','הקפה ברובע הצפון, מהתחנה לתחנת הכיבוי.',[[-112,-262],[-112,-336],[56,-336],[56,-280],[-112,-280]]),
 race('cranes','מסלול המנופים','בין המכולות של נמל המזרח.',[[280,-140],[280,-56],[336,-56],[336,112],[280,112],[280,20]])
];
export function medalFor(r,time){return time<=r.times[3]?3:time<=r.times[2]?2:time<=r.times[1]?1:0;}
export const formatTime=s=>Math.floor(s/60)+':'+(s%60).toFixed(1).padStart(4,'0');
export const zoneOf=(x,z)=>x>224?'east':z< -224?'north':'central';
export const ZONE_NAMES={central:'מרכז העיר',north:'רובע הצפון',east:'נמל המזרח'};
export const ZONE_BONUS=25;

// Candidate star positions: one per chosen city block, on a lawn, corner or back alley,
// plus a few hand-placed finds. The world drops any that fall inside a building.
export function starCandidates(){
 const spots=[[10,10],[46,11],[28,48],[9,45],[28,7],[47,44],[16,30],[40,38]],stars=[];
 for(let ix=-4;ix<=5;ix++)for(let iz=-6;iz<=2;iz++){
  const h=((ix+4)*31+(iz+6)*17+(ix+4)*(iz+6)*7)%9;if(h>=4)continue;
  const [dx,dz]=spots[((ix+4)*3+(iz+6)*5)%spots.length];
  stars.push({id:'s-'+(ix+4)+'-'+(iz+6),x:ix*56+dx,z:iz*56+dz});
 }
 const special=[[24,178],[-190,180],[150,180],[-137,96],[-28,-259],[-128,-312],[318,160],[330,-20],[100,-318],[-232,-100]];
 special.forEach(([x,z],i)=>stars.push({id:'s-20-'+i,x,z}));
 return stars.map(s=>({...s,zone:zoneOf(s.x,s.z)}));
}

const riders=['תיירת עם מצלמה','סבא יוסי','נגנית מהלהקה','שחקן כדורסל','צלמת הפסטיבל','שף מהשוק','מדריכת טיולים','מתנדב מהמרפאה','ציירת רחוב','טכנאי הבמה','ספרנית','דייג מהמזח'];
const parcels=['עוגת יום הולדת','תרופה דחופה','מיקרופון חלופי','זר פרחים','חלק חילוף לבמה','תיק שנשכח','מפתחות האולם','כרטיסים למופע'];
function random(seed){let s=seed>>>0||1;return ()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}

// places: {id:{name,district,x,z}}. isOpen(x,z): district unlocked. isFree(x,z): standable ground.
export function createPlay({places,stars=[],races=RACES,collected=[],isOpen=()=>true,isFree=()=>true,seed=1}){
 const rand=random(seed),taken=new Set(collected),placeIds=Object.keys(places);
 let offers=[],offerSerial=0,run=null,gig=null,clock=0,shower=null,showerAt=70,showerSerial=0,onFoot=0;
 const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
 function makeOffer(){
  const open=placeIds.filter(id=>isOpen(places[id].x,places[id].z)&&!offers.some(o=>o.from===id)&&gig?.from!==id);
  for(let attempt=0;attempt<12&&open.length>1;attempt++){
   const from=open[Math.floor(rand()*open.length)],targets=placeIds.filter(id=>id!==from&&isOpen(places[id].x,places[id].z)&&dist(places[from],places[id])>=110);
   if(!targets.length)continue;
   const to=targets[Math.floor(rand()*targets.length)],a=places[from],b=places[to],metres=Math.round(dist(a,b)*1.3);
   const kind=offerSerial%3===2?'express':'ride',who=(kind==='ride'?riders:parcels)[Math.floor(rand()*(kind==='ride'?riders:parcels).length)];
   return {id:'g'+(offerSerial++),kind,from,to,who,x:a.x-4,z:a.z+2,metres,fare:Math.round(5+metres/45),par:Math.round(metres/13+12)};
  }
  return null;
 }
 function fillOffers(){while(offers.length<3){const o=makeOffer();if(!o)break;offers.push(o);}}
 function target(){
  if(run){const p=run.race.checkpoints[run.next];return {x:p.x,z:p.z,name:run.next===run.race.checkpoints.length-1?'קו הסיום':'נקודה '+(run.next+1)+'/'+run.race.checkpoints.length,district:run.race.name,auto:true};}
  if(gig){const p=places[gig.to];return {x:p.x,z:p.z,name:p.name,district:p.district,auto:true};}
  return null;
 }
 function near({x,z,driving}){
  if(run||gig)return null;
  const me={x,z};
  const r=races.filter(r=>isOpen(r.start.x,r.start.z)&&dist(me,r.start)<=11).sort((a,b)=>dist(me,a.start)-dist(me,b.start))[0];
  if(r)return driving?{kind:'race',id:r.id,label:'🏁 להתחיל: '+r.name}:{kind:'hint',label:'🏁 הביאו רכב כדי להתחרות',text:'מרוץ רחוב מתחיל מתוך רכב. קחו רכב וחזרו לקו הזינוק.'};
  const o=offers.filter(o=>dist(me,o)<=12).sort((a,b)=>dist(me,a)-dist(me,b))[0];
  if(o)return driving?{kind:'gig',id:o.id,label:o.kind==='ride'?'🚕 לאסוף: '+o.who:'⚡ לקחת: '+o.who}:{kind:'hint',label:o.kind==='ride'?'🚕 הביאו רכב כדי להסיע':'⚡ הביאו רכב למשלוח',text:'הסעות ומשלוחים דחופים יוצאים ברכב. קחו רכב וחזרו לכאן.'};
  return null;
 }
 function act(player){
  const a=near(player);if(!a)return [];
  if(a.kind==='hint')return [{type:'hint',text:a.text}];
  if(a.kind==='race'){const r=races.find(r=>r.id===a.id);run={race:r,next:0,time:0,idle:0};return [{type:'race-start',race:r}];}
  const o=offers.find(o=>o.id===a.id);offers=offers.filter(v=>v!==o);
  gig={...o,time:0,comfort:100,crashes:0};onFoot=0;fillOffers();
  return [{type:'gig-board',gig}];
 }
 function cancel(reason='player'){
  if(run){const r=run.race;run=null;return [{type:'race-cancel',race:r,reason}];}
  if(gig){const g=gig;gig=null;fillOffers();return [{type:'gig-cancel',gig:g,reason}];}
  return [];
 }
 // cushion < 1 comes from a reinforced bumper and softens the comfort loss.
 function crash(power,cushion=1){if(!gig)return;gig.crashes++;if(gig.kind==='ride')gig.comfort=Math.max(0,Math.round(gig.comfort-(15+35*power)*cushion));}
 function startShower(){
  const open=placeIds.filter(id=>isOpen(places[id].x,places[id].z));if(!open.length)return [];
  const id=open[Math.floor(rand()*open.length)],p=places[id],list=[];
  for(let i=0;i<24&&list.length<8;i++){
   const angle=rand()*Math.PI*2,r=14+rand()*34,x=Math.round(p.x+Math.sin(angle)*r),z=Math.round(p.z+Math.cos(angle)*r);
   if(isFree(x,z)&&isOpen(x,z)&&!list.some(s=>dist(s,{x,z})<6))list.push({id:'w-'+showerSerial+'-'+list.length,x,z});
  }
  if(list.length<4)return [];
  shower={serial:showerSerial++,place:id,x:p.x,z:p.z,name:p.name,stars:list,total:list.length,got:0,left:80};
  return [{type:'shower-start',shower}];
 }
 function tick({x,z,dt,driving,speed=0}){
  const events=[],me={x,z};clock+=dt;
  if(!offers.length&&!gig)fillOffers();
  const reach=driving?4.6:3.2;
  for(const s of stars){if(!taken.has(s.id)&&Math.abs(s.x-x)<reach&&dist(s,me)<reach&&isOpen(s.x,s.z)){taken.add(s.id);events.push({type:'star',star:s});}}
  if(shower){
   shower.left-=dt;
   for(const s of shower.stars)if(!s.got&&dist(s,me)<reach+.6){s.got=true;shower.got++;events.push({type:'star',star:s,shower:true});}
   if(shower.left<=0||shower.got===shower.total){events.push({type:'shower-end',got:shower.got,total:shower.total});shower=null;showerAt=clock+150;}
  }else if(clock>=showerAt&&!run){const started=startShower();if(started.length)events.push(...started);else showerAt=clock+30;}
  if(run){
   if(!driving)return [...events,...cancel('left')];
   run.time+=dt;run.idle+=dt;
   if(dist(me,run.race.checkpoints[run.next])<=10){
    run.next++;run.idle=0;
    if(run.next===run.race.checkpoints.length){
     const {race:r,time}=run;run=null;events.push({type:'race-finish',race:r,time:Math.round(time*10)/10,medal:medalFor(r,time)});
    }else events.push({type:'checkpoint',n:run.next,total:run.race.checkpoints.length});
   }else if(run.idle>50)events.push(...cancel('timeout'));
  }
  if(gig){
   gig.time+=dt;onFoot=driving?0:onFoot+dt;
   if(onFoot>8)events.push(...cancel('left'));
   else if(driving&&speed<5&&dist(me,places[gig.to])<=12){
    const g=gig,inTime=g.time<=g.par,clean=g.crashes===0;gig=null;
    const coins=g.kind==='ride'?Math.round(g.fare*(g.comfort>=90?1.25:g.comfort>=60?1:.6))+(inTime?3:0):inTime?g.fare+5:Math.round(g.fare*.6);
    events.push({type:'gig-done',gig:g,coins,clean,inTime});fillOffers();
   }
  }
  return events;
 }
 return {tick,near,act,cancel,crash,target,
  state:()=>({run:run&&{id:run.race.id,name:run.race.name,next:run.next,total:run.race.checkpoints.length,time:run.time,times:run.race.times,checkpoints:run.race.checkpoints},
   gig:gig&&{...gig,toName:places[gig.to].name,onFoot:onFoot>0},offers,shower,collected:taken,clock}),
  setCollected(list){taken.clear();for(const id of list)taken.add(id);},busy:()=>Boolean(run||gig),racing:()=>Boolean(run)};
}
