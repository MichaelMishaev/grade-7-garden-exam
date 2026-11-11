// Long-term progress in Bay City: rank, daily challenges and badges. Pure data rules, no DOM.
// Learning is deliberately the fastest source of experience; side activities add variety.
export const RANKS=[
 [0,'מתלמדים'],[60,'שליחי שכונה'],[150,'מכירי הרחובות'],[280,'נהגי העיר'],[450,'סיירי המפרץ'],[680,'אלופי הטיילת'],
 [980,'מומחי הקיצורים'],[1350,'כוכבי הפסטיבל'],[1800,'אגדות הנמל'],[2400,'אלופי העיר'],[3200,'שומרי המפרץ'],[4200,'אגדת המפרץ']
];
export const XP={correct:10,delivery:30,shift:60,scoreStar:20,ride:20,cleanRide:10,express:25,raceFinish:10,medal:[0,20,35,60],star:6,showerStar:3,witness:10,contract:25,daily:40};
const STATS=['correct','delivery','shifts','perfect','rides','cleanRide','express','stars','showerStars','race','medal','gold','witness','metres','crashes','contracts'];

// Every day has one learning challenge and two city challenges.
const LEARNING=[
 {stat:'correct',goal:8,label:'ענו נכון על 8 שאלות תרגול',icon:'📚'},
 {stat:'delivery',goal:2,label:'השלימו 2 מסירות עם התרגול שלהן',icon:'📦'},
 {stat:'correct',goal:12,label:'ענו נכון על 12 שאלות תרגול',icon:'📚'}
];
const CITY=[
 {stat:'rides',goal:2,label:'הסיעו 2 נוסעים ליעד',icon:'🚕'},
 {stat:'stars',goal:5,label:'אספו 5 כוכבי פסטיבל',icon:'⭐'},
 {stat:'race',goal:1,label:'סיימו מרוץ רחוב',icon:'🏁'},
 {stat:'medal',goal:1,label:'זכו במדליה במרוץ רחוב',icon:'🥇'},
 {stat:'witness',goal:1,label:'דווחו כעדים על אירוע בעיר',icon:'📝'},
 {stat:'metres',goal:2000,label:'נהגו 2 ק״מ ברחבי העיר',icon:'🛣️',unit:'m'},
 {stat:'cleanRide',goal:1,label:'הסעה שלמה בלי אף התנגשות',icon:'✨'},
 {stat:'express',goal:1,label:'מסרו משלוח דחוף בזמן',icon:'⚡'}
];
export const DAILY_COINS=20,DAILY_SWEEP_COINS=30;

export const BADGES=[
 {id:'first-ride',icon:'🚕',name:'נסיעה ראשונה',detail:'הסיעו נוסע אחד ליעד.',test:p=>p.stats.rides>=1},
 {id:'driver-10',icon:'🚖',name:'נהגי העיר',detail:'10 הסעות.',test:p=>p.stats.rides>=10},
 {id:'gentle',icon:'✨',name:'נהיגה חלקה',detail:'5 הסעות בלי התנגשות.',test:p=>p.stats.cleanRide>=5},
 {id:'express-5',icon:'⚡',name:'שליחי הבזק',detail:'5 משלוחים דחופים בזמן.',test:p=>p.stats.express>=5},
 {id:'stars-10',icon:'⭐',name:'ציידי כוכבים',detail:'10 כוכבי פסטיבל.',test:p=>p.stars.length>=10},
 {id:'stars-all',icon:'🌟',name:'כל הכוכבים',detail:'כל כוכבי הפסטיבל בעיר.',test:(p,c)=>c.totalStars>0&&p.stars.length>=c.totalStars},
 {id:'racer',icon:'🏁',name:'קו הסיום',detail:'סיימו מרוץ רחוב.',test:p=>p.stats.race>=1},
 {id:'gold-1',icon:'🥇',name:'זהב ראשון',detail:'מדליית זהב במרוץ.',test:p=>Object.values(p.races).some(r=>r.medal===3)},
 {id:'gold-all',icon:'🏆',name:'אלופי המסלולים',detail:'זהב בכל המרוצים.',test:(p,c)=>c.totalRaces>0&&Object.values(p.races).filter(r=>r.medal===3).length>=c.totalRaces},
 {id:'scholar-50',icon:'📚',name:'50 תשובות נכונות',detail:'50 תשובות נכונות בתרגול.',test:p=>p.stats.correct>=50},
 {id:'scholar-200',icon:'🎓',name:'200 תשובות נכונות',detail:'200 תשובות נכונות בתרגול.',test:p=>p.stats.correct>=200},
 {id:'shifts-3',icon:'🎪',name:'שלוש משמרות',detail:'השלימו 3 משמרות.',test:p=>p.stats.shifts>=3},
 {id:'shifts-10',icon:'🎡',name:'עשר משמרות',detail:'השלימו 10 משמרות.',test:p=>p.stats.shifts>=10},
 {id:'perfect',icon:'💯',name:'משמרת מושלמת',detail:'משמרת שלמה בלי אף טעות.',test:p=>p.stats.perfect>=1},
 {id:'witness-5',icon:'📝',name:'עיני העיר',detail:'5 דיווחי עדים.',test:p=>p.stats.witness>=5},
 {id:'km-10',icon:'🛣️',name:'10 ק״מ',detail:'נהגו 10 ק״מ בעיר.',test:p=>p.stats.metres>=10000},
 {id:'km-42',icon:'🏅',name:'מרתון על גלגלים',detail:'נהגו 42 ק״מ בעיר.',test:p=>p.stats.metres>=42000},
 {id:'level-5',icon:'🎖️',name:'סיירי המפרץ',detail:'הגיעו לדרגה 5.',test:p=>levelFor(p.xp).level>=5},
 {id:'level-10',icon:'👑',name:'אלופי העיר',detail:'הגיעו לדרגה 10.',test:p=>levelFor(p.xp).level>=10},
 {id:'days-5',icon:'📅',name:'חמישה ימים בעיר',detail:'השלימו אתגר יומי ב־5 ימים שונים.',test:p=>p.days>=5}
];
export const BADGE_COINS=15;

export function emptyProgress(){
 return {xp:0,stats:Object.fromEntries(STATS.map(s=>[s,0])),stars:[],races:{},badges:[],ledger:{},days:0,daily:{day:'',counts:{},claimed:[],sweep:false}};
}
const count=v=>Number.isFinite(v)&&v>0?Math.floor(v):0;
const ids=(v,pattern,limit)=>Array.isArray(v)?[...new Set(v.filter(id=>typeof id==='string'&&pattern.test(id)))].slice(0,limit):[];
// Stored progress comes from localStorage: keep only well-formed values.
export function progressFrom(value){
 const p=emptyProgress();if(!value||typeof value!=='object')return p;
 p.xp=count(value.xp);p.days=count(value.days);
 for(const s of STATS)p.stats[s]=count(value.stats?.[s]);
 p.stars=ids(value.stars,/^s-\d{1,2}-\d{1,2}$/,200);
 p.badges=ids(value.badges,/^[a-z0-9-]{3,20}$/,60).filter(id=>BADGES.some(b=>b.id===id));
 for(const [id,r] of Object.entries(value.races&&typeof value.races==='object'?value.races:{}).slice(0,20)){
  if(/^[a-z-]{3,20}$/.test(id)&&Number.isFinite(r?.best)&&r.best>0)p.races[id]={best:r.best,medal:Math.min(3,count(r.medal))};
 }
 for(const [id,total] of Object.entries(value.ledger&&typeof value.ledger==='object'?value.ledger:{}).slice(-30))if(count(total))p.ledger[id]=count(total);
 const d=value.daily;
 if(d&&typeof d.day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d.day)){
  p.daily.day=d.day;p.daily.sweep=d.sweep===true;
  p.daily.claimed=Array.isArray(d.claimed)?[...new Set(d.claimed.filter(i=>i===0||i===1||i===2))]:[];
  for(const s of STATS)if(count(d.counts?.[s]))p.daily.counts[s]=count(d.counts[s]);
 }
 return p;
}
export function levelFor(xp){
 let i=0;while(i+1<RANKS.length&&xp>=RANKS[i+1][0])i++;
 const floor=RANKS[i][0],next=RANKS[i+1]?.[0]??null;
 return {level:i+1,title:RANKS[i][1],into:xp-floor,span:next===null?0:next-floor,next,max:next===null};
}
export const levelCoins=level=>10*level;
export function dayKey(date=new Date()){
 return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
}
function hash(text){let h=2166136261;for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
export function dailyFor(day){
 const h=hash(day),first=h%CITY.length;let second=(h>>>8)%(CITY.length-1);if(second>=first)second++;
 // "Finish a race" with "win a medal", or two ride goals, would be one activity counted twice.
 const pair=(a,b)=>[a.stat,b.stat].sort().join();
 while(second===first||['medal,race','cleanRide,rides'].includes(pair(CITY[first],CITY[second])))second=(second+1)%CITY.length;
 return [LEARNING[(h>>>16)%LEARNING.length],CITY[first],CITY[second]];
}
export function dailyStatus(p,day=dayKey()){
 const current=p.daily.day===day;
 return dailyFor(day).map((c,i)=>({...c,index:i,have:Math.min(c.goal,current?p.daily.counts[c.stat]||0:0),done:current&&p.daily.claimed.includes(i)}));
}

// Add experience and statistics in one step. Returns what the player should be told about:
// {type:'level'|'daily'|'sweep'|'badge', ...} and the coins those events pay.
export function apply(p,{xp=0,stats={}},context={},day=dayKey()){
 const events=[];let coins=0;
 if(p.daily.day!==day)p.daily={day,counts:{},claimed:[],sweep:false};
 for(const [stat,amount] of Object.entries(stats)){
  if(!STATS.includes(stat)||!(amount>0))continue;
  p.stats[stat]+=amount;p.daily.counts[stat]=(p.daily.counts[stat]||0)+amount;
 }
 const hadDaily=p.daily.claimed.length;
 dailyFor(day).forEach((c,i)=>{
  if(p.daily.claimed.includes(i)||(p.daily.counts[c.stat]||0)<c.goal)return;
  p.daily.claimed.push(i);xp+=XP.daily;coins+=DAILY_COINS;events.push({type:'daily',icon:c.icon,label:c.label,coins:DAILY_COINS,xp:XP.daily});
 });
 if(!hadDaily&&p.daily.claimed.length)p.days++;
 if(p.daily.claimed.length===3&&!p.daily.sweep){p.daily.sweep=true;coins+=DAILY_SWEEP_COINS;events.push({type:'sweep',coins:DAILY_SWEEP_COINS});}
 const before=levelFor(p.xp).level;p.xp+=Math.max(0,Math.round(xp));
 const after=levelFor(p.xp);
 for(let level=before+1;level<=after.level;level++){coins+=levelCoins(level);events.push({type:'level',level,title:RANKS[level-1][1],coins:levelCoins(level)});}
 for(const b of BADGES){
  if(p.badges.includes(b.id)||!b.test(p,context))continue;
  p.badges.push(b.id);coins+=BADGE_COINS;events.push({type:'badge',icon:b.icon,name:b.name,coins:BADGE_COINS});
 }
 return {events,coins,xp:Math.max(0,Math.round(xp))};
}

// Experience from the practice round, reconciled against what was already granted so a
// reload or a retried save never pays twice. Returns the new experience and statistics.
export function learningGain(p,round,stage,result=null){
 const correct=Object.values(round.answers).filter(a=>a.correct).length;
 const total=correct*XP.correct+stage*XP.delivery+(result?XP.shift+result.stars*XP.scoreStar:0);
 const key=round.attemptId,previous=p.ledger[key]||0,seen=p.ledger[key+':n']||0;
 if(total<=previous)return null;
 p.ledger[key]=total;
 // The companion entry remembers counted answers, deliveries and the finished shift.
 const code=correct+stage*1000+(result?100000:0);p.ledger[key+':n']=code;
 const stats={correct:correct-seen%1000,delivery:stage-Math.floor(seen%100000/1000)};
 if(result&&seen<100000){stats.shifts=1;if(result.perfect)stats.perfect=1;}
 const keys=Object.keys(p.ledger);for(const old of keys.slice(0,Math.max(0,keys.length-30)))delete p.ledger[old];
 return {xp:total-previous,stats};
}
export function recordRace(p,id,time,medal){
 const old=p.races[id],improved=!old||time<old.best,better=medal>(old?.medal||0);
 p.races[id]={best:improved?time:old.best,medal:Math.max(medal,old?.medal||0)};
 return {improved,better,previous:old?.best??null};
}
