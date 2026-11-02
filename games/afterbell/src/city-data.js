export const CITY_BOUNDS={west:-240,east:352,north:-352,south:188};
// The shared pathfinder uses a square search grid and inCity clips it to the coastline.
export const CITY_EDGE=352;
export const STREET_STEP=56;
export const northSouthStreets=Array.from({length:11},(_,i)=>(i-4)*STREET_STEP);
export const eastWestStreets=Array.from({length:10},(_,i)=>(i-6)*STREET_STEP);
export const streetEnds={north:CITY_BOUNDS.north+6,south:CITY_BOUNDS.south-2};
export const places={
 home:{name:'בית הצוות',district:'שכונת הגנים',x:-16,z:18,color:'#f2ac76',kind:'house'},
 radio:{name:'רדיו המפרץ',district:'שכונת הגנים',x:-72,z:-40,color:'#ff966f',kind:'studio'},
 market:{name:'שוק הפרחים',district:'רובע השוק',x:40,z:-96,color:'#e77093',kind:'market'},
 clinic:{name:'מרפאת העיר',district:'גבעת האור',x:-152,z:-152,color:'#76c5c4',kind:'clinic'},
 library:{name:'הספרייה',district:'רובע השוק',x:112,z:-40,color:'#a7a4d9',kind:'library'},
 depot:{name:'בית המלאכה',district:'רובע המלאכה',x:160,z:72,color:'#eeb45f',kind:'depot'},
 park:{name:'גן הפסלים',district:'שכונת הגנים',x:-128,z:98,color:'#88b981',kind:'park'},
 pier:{name:'במת המזח',district:'טיילת המפרץ',x:24,z:160,color:'#58b2be',kind:'stage'},
 station:{name:'תחנת הרכבת הצפונית',district:'רובע התחנה',x:-140,z:-298,color:'#6296a9',kind:'station'},
 court:{name:'מגרש השכונה',district:'רובע התחנה',x:-28,z:-248,color:'#73ad83',kind:'court'},
 firehouse:{name:'תחנת הכיבוי',district:'גבעת הצפון',x:82,z:-300,color:'#bd6453',kind:'firehouse'},
 shipworks:{name:'סדנת המספנה',district:'רובע המספנות',x:308,z:-72,color:'#699391',kind:'shipworks'},
 freight:{name:'מסוף המטענים',district:'נמל המזרח',x:306,z:94,color:'#d99a5a',kind:'freight'},
 ferry:{name:'רציף המעבורת',district:'נמל המזרח',x:306,z:158,color:'#65abad',kind:'ferry'}
};
export const roles={
 courier:{name:'שליחים',icon:'📦',vehicle:'רכב משלוחים',color:'#ec9c40',jobs:[
 ['home','market','ארגז שלטים','רוני מהשוק'],['radio','park','רמקול נייד','מיה מהגן'],['depot','pier','שרשרת דגלים','נועם מהמזח']]},
 tech:{name:'טכנאים',icon:'🔧',vehicle:'ניידת שירות',color:'#4fa6ae',jobs:[
 ['home','radio','כבל שידור','תמר מהרדיו'],['depot','library','מקרן','אורי מהספרייה'],['market','pier','פנסי במה','נועם מהמזח']]},
 press:{name:'כתבים',icon:'📷',vehicle:'ניידת שידור',color:'#a98acd',jobs:[
 ['home','clinic','מצלמה','יעל מהמרפאה'],['library','radio','הקלטת ריאיון','תמר מהרדיו'],['park','pier','תמונות מהפסטיבל','נועם מהמזח']]}
};
const lateShift={
 courier:[['home','library','כרזות לפסטיבל','אורי מהספרייה'],['market','clinic','סל פירות','יעל מהמרפאה'],['park','pier','קישוטי חוץ','נועם מהמזח']],
 tech:[['home','library','שלט תאורה','אורי מהספרייה'],['clinic','depot','סוללת גיבוי','גל מבית המלאכה'],['radio','pier','מיקרופון להופעה','נועם מהמזח']],
 press:[['home','park','מצלמת שטח','מיה מהגן'],['market','library','תצלומי השוק','אורי מהספרייה'],['radio','pier','הקלטת פתיחה','נועם מהמזח']]
};
export function currentJob(city){return (city.edition===1?lateShift[city.role]:roles[city.role].jobs)[city.stage];}
export function objective(city){
 if(city.stage===3)return {place:'pier',title:'פתחו את פסטיבל המפרץ',action:'להדליק את הבמה'};
 const [from,to,item,person]=currentJob(city);
 if(city.phase==='pickup')return {place:from,title:'אספו '+item+' · '+places[from].name,action:'לאסוף '+item};
 return {place:to,title:'מסרו '+item+' ל'+person,action:'למסור '+item};
}
export function inCity(x,z){return x>=CITY_BOUNDS.west&&x<=CITY_BOUNDS.east&&z>=CITY_BOUNDS.north&&z<=CITY_BOUNDS.south;}
