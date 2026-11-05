// Story progress is separate from academic points. Only completed tasks award access.
export const CAR_TASKS={toyota:0,vw:0,ford:1,modelY:1,model3:3,bmw:3,mercedes:5,cybertruck:7};
export const CAR_SPEED={toyota:25,vw:22,ford:31,modelY:35,model3:42,bmw:45,mercedes:53,cybertruck:62};
export const contracts=[
 {id:'radio-walk',place:'radio',name:'הסמטאות של הרדיו',detail:'הגיעו ברגל לרדיו המפרץ.',drive:false},
 {id:'park-drive',place:'park',name:'נסיעת הבכורה',detail:'הגיעו ברכב לגן הפסלים.',drive:true},
 {id:'market-walk',place:'market',name:'מגלים את השוק',detail:'הגיעו ברגל לשוק הפרחים.',drive:false},
 {id:'station-drive',place:'station',name:'הדרך צפונה',detail:'הגיעו ברכב לתחנת הרכבת הצפונית.',drive:true},
 {id:'court-walk',place:'court',name:'היכרות עם השכונה',detail:'הגיעו ברגל למגרש השכונה.',drive:false},
 {id:'ferry-drive',place:'ferry',name:'מסע לנמל המזרח',detail:'הגיעו ברכב לרציף המעבורת.',drive:true}
];
export function careerFrom(value){
 const done=Array.isArray(value?.done)?[...new Set(value.done.filter(id=>typeof id==='string'&&(/^[\w-]+:delivery:[0-2]$/.test(id)||contracts.some(c=>c.id===id))))]:[];
 return {done,legacyNorth:value?.legacyNorth===true,legacyEast:value?.legacyEast===true};
}
export const learningTasks=c=>c.done.filter(id=>id.includes(':delivery:')).length;
export const carAvailable=(c,brand)=>Object.hasOwn(CAR_TASKS,brand)&&c.done.length>=CAR_TASKS[brand];
export function districtRequirement(x,z){return x>224?{name:'נמל המזרח',tasks:6,learning:2}:z< -224?{name:'רובע הצפון',tasks:3,learning:1}:null;}
export function districtOpen(c,x,z){
 const r=districtRequirement(x,z);
 return !r||(x>224?c.legacyEast:c.legacyNorth)||(c.done.length>=r.tasks&&learningTasks(c)>=r.learning);
}
export function awardTask(c,id){
 if(c.done.includes(id)||!careerFrom({done:[id]}).done.length)return false;
 c.done.push(id);return true;
}
export function completeContract(c,id,city,places){
 const task=contracts.find(t=>t.id===id),p=task&&places[task.place];
 if(!p||!districtOpen(c,p.x,p.z)||Boolean(city.driving)!==task.drive||Math.hypot(city.x-p.x,city.z-p.z)>4.3)return false;
 return awardTask(c,id);
}
