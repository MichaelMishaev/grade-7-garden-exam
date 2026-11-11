import {CAR_SPEED,CAR_HANDLING} from './city-discovery.js';
// Car performance upgrades: five lines, three tiers each. Coins buy a tier, completed missions
// (career.done.length) open it, so learning stays the way forward. Tiers apply to whichever car is driven.
export const MISSIONS=[1,4,6];
export const UPGRADES=[
 {id:'engine',icon:'⚙️',name:'מנוע',detail:'מהירות שיא ותאוצה',price:[25,50,90],
  steps:['+4% מהירות שיא, +8% תאוצה','+8% מהירות שיא, +16% תאוצה','+12% מהירות שיא, +25% תאוצה']},
 {id:'turbo',icon:'🔥',name:'טורבו',detail:'טורבו ארוך יותר ונטען מהר יותר',price:[20,45,80],
  steps:['טורבו ארוך ב־8%, נטען מהר ב־7%','טורבו ארוך ב־17%, נטען מהר ב־14%','טורבו ארוך ב־25%, נטען מהר ב־20%']},
 {id:'brakes',icon:'🛑',name:'בלמים',detail:'עוצרים במרחק קצר יותר',price:[15,35,65],
  steps:['בלימה חזקה ב־8%','בלימה חזקה ב־16%','בלימה חזקה ב־25%']},
 {id:'tyres',icon:'🛞',name:'צמיגי גשם',detail:'פחות החלקה בכביש רטוב',price:[15,35,65],
  steps:['10% פחות איבוד אחיזה בגשם','20% פחות איבוד אחיזה בגשם','30% פחות איבוד אחיזה בגשם']},
 {id:'bumper',icon:'🛡️',name:'פגוש מחוזק',detail:'פחות הדף בתאונה ונסיעה נוחה יותר לנוסעים',price:[15,30,55],
  steps:['10% פחות הדף ופגיעה בנוחות','18% פחות הדף ופגיעה בנוחות','25% פחות הדף ופגיעה בנוחות']}
];
export const MAX_TIER=3;
// Index = tier. Top tiers stay in the 12–25% band so a fully upgraded Toyota (25 m/s → 28) still trails the Ford (31).
const TABLE={
 speed:[1,1.04,1.08,1.12],accel:[1,1.08,1.16,1.25],
 boostTime:[1,1.08,1.17,1.25],recharge:[1,1.07,1.14,1.2],
 brake:[1,1.08,1.16,1.25],
 rainLoss:[1,.9,.8,.7],
 bounce:[1,.9,.82,.75],comfort:[1,.9,.82,.75]
};

// Accepts anything read from storage: unknown lines and bad values are dropped, tiers clamp to 0–3.
export function upgradesFrom(value){
 const out={};
 for(const {id} of UPGRADES){const n=Number(value?.[id]);out[id]=Number.isInteger(n)?Math.max(0,Math.min(MAX_TIER,n)):0;}
 return out;
}
export const tierOf=(wallet,line)=>upgradesFrom(wallet?.upgrades)[line];

// What buying the next tier would need. state: 'max' | 'locked' | 'poor' | 'ready'.
export function nextTier(wallet,line,missions){
 const def=UPGRADES.find(u=>u.id===line);if(!def)return null;
 const tier=tierOf(wallet,line);
 if(tier>=MAX_TIER)return {tier,state:'max'};
 const price=def.price[tier],need=MISSIONS[tier],step=def.steps[tier];
 const state=(missions||0)<need?'locked':(wallet?.coins||0)<price?'poor':'ready';
 return {tier,next:tier+1,price,need,step,state};
}

// Buys one tier in place. Returns true only when the wallet changed.
export function buyUpgrade(wallet,line,missions){
 const n=nextTier(wallet,line,missions);
 if(!n||n.state!=='ready')return false;
 wallet.upgrades={...upgradesFrom(wallet.upgrades),[line]:n.next};
 wallet.coins-=n.price;
 return true;
}

// Multipliers the world applies. All are 1 for a wallet without upgrades.
export function carStats(upgrades){
 const u=upgradesFrom(upgrades);
 return {speed:TABLE.speed[u.engine],accel:TABLE.accel[u.engine],boostTime:TABLE.boostTime[u.turbo],recharge:TABLE.recharge[u.turbo],
  brake:TABLE.brake[u.brakes],rainLoss:TABLE.rainLoss[u.tyres],bounce:TABLE.bounce[u.bumper],comfort:TABLE.comfort[u.bumper]};
}
// Rain grip with tyres: they cut the part of the grip that rain takes away.
export const tyreGrip=(grip,stats)=>1-(1-grip)*(stats?.rainLoss??1);
export const totalTiers=upgrades=>Object.values(upgradesFrom(upgrades)).reduce((a,b)=>a+b,0);

// 0–1 ratings for the stat bars: speed against the fully upgraded Cybertruck, handling as the mean of
// acceleration, braking, turning and wet grip (each against its best possible value), floored so the bus still shows a bar.
export function carRating(brand,upgrades){
 const s=carStats(upgrades),h=CAR_HANDLING[brand]||CAR_HANDLING.toyota,best=CAR_HANDLING.cybertruck,top=carStats({engine:3,turbo:3,brakes:3,tyres:3,bumper:3});
 const raw=(h.accel*s.accel/(best.accel*top.accel)+h.brake*s.brake/(best.brake*top.brake)+h.turn/best.turn+h.grip/s.rainLoss/(best.grip/top.rainLoss))/4;
 return {speed:Math.min(1,(CAR_SPEED[brand]||25)*s.speed/(CAR_SPEED.cybertruck*top.speed)),handling:Math.min(1,Math.max(.1,.15+.85*(raw-.5)/.5))};
}
