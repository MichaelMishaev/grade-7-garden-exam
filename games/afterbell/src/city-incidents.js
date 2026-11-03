// World coordinates use x east and z south. Heading follows the van convention.
const SOUTH=0,EAST=Math.PI/2,NORTH=Math.PI,WEST=-Math.PI/2;
function site(place,district,x,z,laneX,laneZ,heading,observerX,observerZ){
 return {place,district,x,z,heading,lane:{x:laneX,z:laneZ,heading},observer:{x:observerX,z:observerZ}};
}

// Incidents occupy mid-block lanes or sidewalks. The observation points sit on the
// opposite shoulder or beyond the work zone, clear of delivery and building entrances.
const sites={
 gardens:site('רחוב הגנים','שכונת הגנים',-6,30,-2,30,SOUTH,6,34),
 eastUtility:site('ארון החשמל בדרך המספנות','רובע המספנות',309,-50,309,-54,EAST,309,-63),
 market:site('הדרך לשוק הפרחים','רובע השוק',2,-82,2,-82,NORTH,-7,-79),
 port:site('דרך המשאיות','נמל המזרח',282,84,282,84,NORTH,286,100),
 station:site('הרחבה ליד תחנת הרכבת','רובע התחנה',-140,-286,-140,-282,WEST,-139,-274),
 radio:site('ארון החשמל ברחוב הרדיו','שכונת הגנים',-50,-32,-54,-32,NORTH,-63,-30),
 quay:site('דרך רציף המטענים','נמל המזרח',309,114,309,114,EAST,312,105),
 depot:site('דרך בית המלאכה','רובע המלאכה',170,85,170,85,NORTH,162,81)
};
// mode: sidewalk = road stays open, drivers slow by the crowd; closure = the lane is coned
// off once the crew arrives; platoon = a marshal releases short queues. softStart lets
// traffic crawl past during the first report before the closure takes effect.
const cases={
 fight:{title:'קטטה ברחוב',responder:'police',mode:'sidewalk',durations:[10,13,45,13],details:[
  'ויכוח בין שני הולכי רגל הידרדר לדחיפות. עוברי אורח התרחקו מהמדרכה.',
  'ניידת הוזעקה. עד ראייה ממתין על המדרכה ממול.',
  'השוטרים הפרידו בין המעורבים ומשוחחים עם כל אחד בנפרד.',
  'המעורבים עוזבים בנפרד. המדרכה נפתחת שוב למעבר.'
 ]},
 fire:{title:'שריפה בארון חשמל',responder:'fire',mode:'closure',softStart:true,durations:[12,17,85,14],details:[
  'עשן עולה מארון חשמל סמוך למדרכה. התושבים פינו את הסביבה.',
  'כבאית בדרך. צוות החשמל מנתק את הזרם לארון.',
  'הזרם נותק. הכבאים מכבים את האש ומרחיקים את הקהל.',
  'האש כובתה. הכבאים בודקים נקודות חמות ומפנים את הציוד.'
 ]},
 crash:{title:'תאונת דרכים',responder:'tow',mode:'closure',durations:[12,17,76,14],details:[
  'רכב פגע מאחור ברכב משלוחים שעצר. שני הנהגים יצאו למדרכה.',
  'הנהגים מסרו ששניהם עומדים מחוץ לרכב. גרר בדרכו לנתיב החסום.',
  'הגרר מעמיס את הרכב שניזוק. התנועה ממתינה לפני התאונה.',
  'הרכב הפגוע פונה. הנתיב נבדק לפני חזרת התנועה.'
 ]},
 jam:{title:'עומס תנועה בעבודות בדרך',responder:'traffic',mode:'platoon',durations:[11,14,76,14],details:[
  'צוות תשתיות צמצם את הכביש לנתיב אחד. תור נוצר מאחורי הקונוסים.',
  'מכוון תנועה בדרך למקום כדי להסדיר את המעבר.',
  'מכוון התנועה מעביר כלי רכב בתורות דרך אזור העבודות.',
  'הצוות אוסף את הקונוסים. כלי הרכב חוזרים בהדרגה לקצב הרגיל.'
 ]},
 spill:{title:'מטען שנפל על הכביש',responder:'traffic',mode:'closure',softStart:true,durations:[11,15,60,14],details:[
  'ארגזים נפלו מטנדר שבלם בפתאומיות. הנהג עצר בצד ומסמן לרכבים להאט.',
  'מכוון תנועה בדרך. הנהג מזיז את הארגזים הקרובים אל המדרכה.',
  'הנתיב נסגר בקונוסים. המכוון והנהג אוספים את הארגזים אחד־אחד.',
  'הכביש נקי. הקונוסים נאספים והטנדר ממשיך בדרכו.'
 ]},
 rescue:{title:'חתול תקוע על עץ',responder:'fire',mode:'sidewalk',durations:[12,16,50,13],details:[
  'חתול טיפס לצמרת עץ ליד המדרכה ולא מצליח לרדת. ילדה מהשכונה קוראת לעזרה.',
  'כבאית בדרך עם סולם. השכנים שומרים מרחק מהעץ.',
  'הכבאי מטפס בסולם ומושיט יד לחתול. הקהל מתבקש לשמור על שקט.',
  'החתול ירד בשלום לידיים של הילדה. הסולם נאסף.'
 ]}
};
const phases=['reported','responding','working','clearing'];
const cycle=480;
// Ten calls per round, at most three at a time; a site hosts two calls only when the first has cleared.
const calls=[
 [0,'fight','gardens'],[40,'fire','eastUtility'],[90,'crash','market'],[140,'jam','port'],
 [185,'fight','station'],[225,'spill','depot'],[270,'fire','radio'],[315,'rescue','gardens'],
 [355,'crash','quay'],[400,'jam','market']
];

// Driven by the shift's simulation clock. Looking up a time directly (e.g. after
// reload or a QA time jump) produces the same incidents as advancing frame by frame.
export function cityIncidentsAt(seconds){
 if(!Number.isFinite(seconds)||seconds<0)return [];
 const elapsed=seconds+4,round=Math.floor(elapsed/cycle),now=elapsed%cycle,active=[];
 for(const [start,type,location] of calls){
   const previous=now<start,occurrence=previous?round-1:round;
   if(occurrence<0)continue;
   const age=previous?now+cycle-start:now-start;
   const info=cases[type],duration=info.durations.reduce((sum,value)=>sum+value,0);
   if(age>=duration)continue;
   let stage=0,local=age;
   while(local>=info.durations[stage])local-=info.durations[stage++];
   active.push({...sites[location],id:occurrence+'-'+location+'-'+type,type,age,duration,phase:phases[stage],
    phaseProgress:local/info.durations[stage],stageAge:local,workDuration:info.durations[2],title:info.title,detail:info.details[stage],responder:info.responder,mode:info.mode,softStart:Boolean(info.softStart)});
 }
 return active;
}

// Distance along the affected lane is negative on its approach. A parallel
// vehicle in the opposite lane or a cross street should keep moving normally.
function lanePosition(e,x,z){
 const sx=Math.sin(e.heading),sz=Math.cos(e.heading),dx=x-e.lane.x,dz=z-e.lane.z;
 return {along:dx*sx+dz*sz,across:Math.abs(dx*sz-dz*sx)};
}
export function incidentLaneBlocked(events,x,z){
 return events.some(e=>{
   if(e.mode!=='closure'||e.phase==='clearing')return false;
   if(e.softStart&&e.phase==='reported')return false;
   const {along,across}=lanePosition(e,x,z);
   // Include the guided van's footprint, while leaving the opposite lane open.
   return across<3.55&&along>-9&&along<10;
 });
}
export function incidentTrafficAt(events,x,z,heading){
 let factor=1;
 for(const event of events){
   if(Math.cos(heading-event.heading)<.68)continue;
   const {along,across}=lanePosition(event,x,z);
   if(across>2.45||along<-32||along>10)continue;
   // A fight remains on the sidewalk. Drivers slow near the crowd but can pass.
   if(event.mode==='sidewalk'){factor=Math.min(factor,.72);continue;}
   if(event.softStart&&event.phase==='reported'){factor=Math.min(factor,.7);continue;}
   if(event.phase==='clearing'){factor=Math.min(factor,.5+.5*event.phaseProgress);continue;}
   if(along>=7)continue;
   if(event.mode==='platoon'){
     // A marshal releases short platoons. Already inside the taper, keep
     // crawling through instead of stopping midway when the signal changes.
     const flowing=event.phase==='working'&&event.stageAge%10<5;
     const speed=(along>=-6||flowing) ? .42 : Math.max(0,Math.min(.6,(-along-7)/25));
     factor=Math.min(factor,speed);
   }else{
     // Never trap a vehicle already inside a freshly reported closure.
     const speed=along>=-5 ? .4 : Math.max(0,Math.min(.85,(-along-7)/25));
     factor=Math.min(factor,speed);
   }
 }
 return factor;
}
