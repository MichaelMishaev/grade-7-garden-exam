import { NPCS, EQUIPMENT, EXIT, progress, canEscape } from './core.js';
import { ENVIRONMENT, puzzleSolved } from './environment-state.js';
export function nextObjective(round, preferred, position=round.player) {
  if(canEscape(round))return {id:'exit',kind:'exit',...EXIT,title:'השער פתוח — יוצאים הביתה',hint:'לכו בעקבות השביל המואר ולחצו על כפתור היציאה ליד השער.',action:'לשער היציאה'};
  const unfinished=NPCS.map((n,i)=>i).filter(i=>!round.seals.includes(NPCS[i].id));
  const started=unfinished.filter(i=>round.understood.includes(NPCS[i].id)||round.items.includes(EQUIPMENT[i].id));
  const candidates=started.length?started:unfinished;
  const index=unfinished.includes(preferred)?preferred:candidates.sort((a,b)=>Math.hypot(position.x-NPCS[a].x,position.z-NPCS[a].z)-Math.hypot(position.x-NPCS[b].x,position.z-NPCS[b].z))[0];
  const n=NPCS[index],e=EQUIPMENT[index];
  if(!round.understood.includes(n.id))return {id:n.id+':meet',kind:'npc',index,x:n.x,z:n.z,title:`דברו עם ${n.name}`,hint:`${['ליד הספרייה','ליד החממה','ליד מגדל הקשר'][index]} — התקרבו ולחצו על שיחה. ${n.name} מחכה לכם.`,action:`אל ${n.name}`};
  if(!round.items.includes(e.id))return {id:e.id+':find',kind:'equipment',index,x:e.x,z:e.z,title:`מצאו ובדקו ${e.short}`,hint:e.hint,action:'לציוד החסר'};
  const p=progress(round,index);return {id:n.id+':return',kind:'npc',index,x:n.x,z:n.z,title:`החזירו את הציוד ל${n.name}`,hint:`הציוד איתכם. חזרו לתחנה והשלימו ${p.total-p.answered} שאלות כדי להפעיל את ${n.system}.`,action:`חזרה ל${n.name}`};
}
export const SIDE_MISSIONS=[
 {id:'water',title:'עזרה בפינת הטבע',hint:'מלאו את קערת המים ותנו לארנב להתקרב.',done:s=>s.waterFilled},
 {id:'locker',title:'הפתק שנשאר מאחור',hint:'פתחו את ארונית הצוות כדי לחשוף רמז לאנטנה.',done:s=>s.visited.includes('locker')},
 {id:'solar',title:'להחזיר אור לשביל',hint:'כוונו את מתגי התאורה לפי הסימונים שעל המכסה.',done:s=>puzzleSolved(s)},
 {id:'basketball',title:'שלוש זריקות להפסקה',hint:'קלעו שלוש פעמים. אפילו השומר צריך הפסקה.',done:s=>s.shots>=3},
 {id:'telescope',title:'מי מסתובב באגם?',hint:'השתמשו בעמדת התצפית וגלו מי ממשיך בסיור.',done:s=>s.observations>0}
];
export function sideMission(round){const s=SIDE_MISSIONS.find(m=>!m.done(round.environment));return s?{...s,...ENVIRONMENT.find(e=>e.id===s.id),title:s.title,hint:s.hint}:null;}
export const EQUIPMENT_CHECKS={
 card:{title:'שחזור קוד הגישה',hint:'על הסורק חרוט הסדר: משולש ← ריבוע ← עיגול. לחצו על הסמלים באותו סדר.',options:['משולש △','ריבוע □','עיגול ○'],sequence:[0,1,2]},
 fuse:{title:'בדיקת יחידת ההדגמה',hint:'לפי המדבקה: מחברים את הכבל, מפעילים בדיקה, ואז נועלים את המכסה.',options:['בדיקה ◇','נעילת מכסה ▣','חיבור כבל ↔'],sequence:[2,0,1]},
 antenna:{title:'כיוון האות',hint:'במחברת מסומן ערוץ 5. כוונו את החוגה עד שהאות יציב, ואז אשרו.'}
};
export function checkOperation(id,step,choice){return EQUIPMENT_CHECKS[id]?.sequence?.[step]===choice;}
