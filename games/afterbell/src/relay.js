// Authored on the campus footpaths. Each edition moves the challenges to new landmarks.
const sites = [
  { name:'רחבת הכניסה', x:0, z:10 }, { name:'שביל הספרייה', x:-10, z:1 },
  { name:'גינת החממה', x:9, z:-5 }, { name:'דרך המגדל', x:10, z:13 },
  { name:'מצפה הצפון', x:7, z:-16 }, { name:'שביל הגחליליות', x:-7, z:20 }
];
export const editions = [
  { title:'מסילת הכוכבים', story:'באמצע מופע הכיתה כבה המקרן. שלושה פנסי שמיים התפזרו ברחבי הקמפוס. חברו אותם כדי לצייר שוב כוכבים מעל בית הספר.', sites:[0,2,4], tasks:['sparks','ring','mirror'], sequence:[1,0,2] },
  { title:'מצעד הגחליליות', story:'הגחליליות יצאו מהאגם לפני שהפנסים נדלקו. הדליקו להן שלוש תחנות אור שיובילו את המצעד עד השער.', sites:[1,3,5], tasks:['mirror','sparks','ring'], sequence:[2,1,0] },
  { title:'האות מהמצפה', story:'המצפה קלט אות מקוטע. שלוש משואות בקמפוס מחזיקות חלקים ממנו. חברו את האות כדי לחשוף את קבוצת הכוכבים שממנה הגיע.', sites:[3,4,1], tasks:['ring','mirror','sparks'], sequence:[0,2,1] }
];
export const names = { sparks:'שובל הניצוצות', ring:'טבעת הרוח', mirror:'מראות הירח' };
export const symbols = ['ירח ☾','שמש ☀','כוכב ✧'];
export function newRelay(previous, rng=Math.random) {
  const choices=editions.map((_,i)=>i).filter(i=>i!==previous);
  return {edition:choices[Math.floor(rng()*choices.length)], steps:[0,0,0]};
}
export function station(relay,i){
  const edition=editions[relay.edition], task=edition.tasks[i];
  return {...sites[edition.sites[i]], task, title:names[task], index:i};
}
export function charged(relay,i){
  const task=station(relay,i).task;
  return relay.steps[i]===({sparks:7,ring:1,mirror:3})[task];
}
export function validRelay(relay){
  return !!relay && Number.isInteger(relay.edition) && !!editions[relay.edition] &&
    Array.isArray(relay.steps) && relay.steps.length===3 && relay.steps.every((n,i)=>
      Number.isInteger(n)&&n>=0&&n<=({sparks:7,ring:1,mirror:3})[station(relay,i).task]);
}
export function sparksAt(site){
  return [[-2,2],[2,1],[0,-2.5]].map(([dx,dz],bit)=>({x:site.x+dx,z:site.z+dz,bit}));
}
export function relayGoal(r,remaining,preferred,position){
  if(!remaining.length)return null;
  const i=remaining.includes(preferred)?preferred:remaining.sort((a,b)=>{
    const distance=index=>{const s=station(r,index);return Math.hypot(s.x-position.x,s.z-position.z);};
    return distance(a)-distance(b);
  })[0];
  const s=station(r,i),done=charged(r,i);
  const spark=!done&&s.task==='sparks'&&sparksAt(s).find(p=>!(r.steps[i]&(1<<p.bit)));
  const hint=done?'האור מוכן. הפעילו את הפנס וענו על שאלות התרגול.':
    {sparks:'אספו שלושה ניצוצות בשטח, בכל סדר.',ring:'קפצו לתוך הטבעת, או הפעילו את המתג בבסיס שלה.',mirror:'כוונו שלוש מראות לפי סדר הסמלים שעל הלוח.'}[s.task];
  return {...s,...(spark||{}), id:'relay-'+i+'-'+r.steps[i], title:s.title+' · '+s.name, hint, action:'אל הפנס'};
}
