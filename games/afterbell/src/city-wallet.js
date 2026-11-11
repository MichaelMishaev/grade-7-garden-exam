// `tasks` is the number of completed missions (career.done.length) that puts an item
// on sale, so the shop grows with play: something new after nearly each of the first ten.
export const items = [
  {id:'cap', name:'כובע מצחייה', detail:'כובע טורקיז עם מצחייה רחבה.', price:10, tasks:0},
  {id:'scarf', name:'צעיף פסים', detail:'צעיף אדום עם פס זהוב.', price:8, tasks:0},
  {id:'glasses', name:'משקפי שמש', detail:'משקפיים כהים עם מסגרת כחולה.', price:12, tasks:0},
  {id:'jacket', name:'מעיל פסטיבל', detail:'מעיל סגול לצוות הפסטיבל.', price:20, tasks:1},
  {id:'headphones', name:'אוזניות DJ', detail:'אוזניות ורודות עם קשת לבנה.', price:15, tasks:1},
  {id:'drone', name:'רחפן ניווט', detail:'מלווה אתכם ברגל וברכב ומכוון את החץ ליעד.', price:35, tasks:2},
  {id:'pack', name:'תיק שליחים', detail:'תיק גב כתום עם כיס קדמי.', price:18, tasks:2},
  {id:'kicks', name:'נעלי ניאון', detail:'נעלי ריצה לבנות עם זוהר ורוד.', price:16, tasks:3},
  {id:'cape', name:'גלימת גיבורים', detail:'גלימה אדומה שמתנופפת מאחור.', price:28, tasks:4},
  {id:'balloon', name:'בלון הפסטיבל', detail:'בלון זהוב שמרחף מעל הראש.', price:22, tasks:6},
  {id:'crown', name:'כתר הפסטיבל', detail:'כתר זהב עם אבני חן.', price:45, tasks:8},
  {id:'medal', name:'מדליית השליחים', detail:'מדליית זהב על סרט כחול.', price:24, tasks:9},
  {id:'stripes', name:'פסי ראלי', detail:'שני פסים כחולים על מכסה המנוע והגג.', price:10, vehicle:true, tasks:0},
  {id:'spare', name:'גלגל שטח', detail:'גלגל חלופי עם חישוק אלמוג בגב הרכב.', price:14, vehicle:true, tasks:1},
  {id:'roofbox', name:'ארגז גג', detail:'ארגז נסיעות לבן על הגג.', price:22, vehicle:true, tasks:3},
  {id:'spoiler', name:'כנף מרוץ', detail:'כנף אחורית שחורה עם קצוות אדומים.', price:20, vehicle:true, tasks:4},
  {id:'flags', name:'דגלוני אוהדים', detail:'שני דגלונים צבעוניים על החלונות.', price:18, vehicle:true, tasks:5},
  {id:'underglow', name:'תאורת ניאון', detail:'פסי טורקיז והילה מאירה מתחת לרכב.', price:24, vehicle:true, tasks:6},
  {id:'antenna', name:'אנטנת דגל', detail:'אנטנה גבוהה עם דגלון כתום.', price:16, vehicle:true, tasks:7},
  {id:'beacon', name:'פנס גג', detail:'פנס ענברי לגג רכב המשמרת.', price:25, vehicle:true, tasks:7},
  {id:'bullbar', name:'מגן שטח', detail:'מגן קדמי שחור עם שני פנסי ערפל.', price:26, vehicle:true, tasks:9},
  {id:'surfboard', name:'גלשן המפרץ', detail:'גלשן ורוד עם סנפיר על מתקן צד בגג.', price:30, vehicle:true, tasks:9},
  {id:'exhaust', name:'צינורות כרום', detail:'זוג צינורות פליטה מבריקים מאחור.', price:28, vehicle:true, tasks:10},
  {id:'lightbar', name:'פס לדים', detail:'פס אור לבן בקדמת הגג.', price:32, vehicle:true, tasks:10},
  // Paint follows you into every car you take. Only one paint is on at a time.
  {id:'paint-coral', name:'צבע אלמוג', detail:'אדום־כתום מבריק לכל רכב שתיקחו.', price:30, vehicle:true, paint:'#ef5d4a', tasks:0},
  {id:'paint-teal', name:'צבע טורקיז', detail:'טורקיז עמוק בצבעי המפרץ.', price:30, vehicle:true, paint:'#17a7a0', tasks:2},
  {id:'paint-sun', name:'צהוב שמש', detail:'צהוב חזק שרואים מכל רחוב.', price:35, vehicle:true, paint:'#f5c22b', tasks:5},
  {id:'paint-mint', name:'ירוק מנטה', detail:'מנטה רכה וטרייה.', price:40, vehicle:true, paint:'#7fdcb0', level:4, tasks:6},
  {id:'paint-violet', name:'סגול לילה', detail:'סגול כהה שנוצץ מתחת לפנסים.', price:40, vehicle:true, paint:'#6d4fc4', tasks:8},
  {id:'paint-black', name:'שחור מט', detail:'שחור עמוק ושקט.', price:55, vehicle:true, paint:'#1b1e22', level:6, tasks:8},
  {id:'paint-gold', name:'זהב אלופים', detail:'למי שמכיר כל רחוב.', price:90, vehicle:true, paint:'#d8a933', level:9, tasks:10}
];

// On sale: both the rank and the mission count are reached.
export const itemOpen = (item, level = Infinity, tasks = Infinity) => !(item.level > level) && !((item.tasks || 0) > tasks);

// Items a mission just put on sale. Comparing counts (not a stored flag) means a reload,
// which replays nothing, announces nothing.
export function newlyUnlocked(before, after, level = Infinity) {
  return items.filter(item => (item.tasks || 0) > before && (item.tasks || 0) <= after && !(item.level > level));
}

// The next mission count that adds items, and those items; null once everything is open.
export function nextUnlock(tasks) {
  const next = Math.min(...items.map(item => item.tasks || 0).filter(n => n > tasks));
  return Number.isFinite(next) ? {tasks: next, items: items.filter(item => item.tasks === next)} : null;
}

export function emptyWallet() {
  return {coins:0, owned:[], equipped:[], earnings:{}};
}

// Every third correct answer in a row is worth 5 bonus coins. Answers keep their
// insertion order through the draft, so a reload reproduces the same bonus.
export function streakBonus(round) {
  let run = 0, bonus = 0;
  for (const a of Object.values(round.answers)) {
    if (a.correct) { run++; if (run % 3 === 0) bonus += 5; } else run = 0;
  }
  return bonus;
}
export function bestStreak(round) {
  let run = 0, best = 0;
  for (const a of Object.values(round.answers)) { run = a.correct ? run + 1 : 0; best = Math.max(best, run); }
  return best;
}

// Reconcile the draft against the last paid total, including after a reload.
export function pay(wallet, round, stage) {
  const total = Object.values(round.answers).filter(a=>a.correct).length * 5 + stage * 15 + streakBonus(round);
  const previous = wallet.earnings[round.attemptId] || 0;
  if (total > previous) {
    wallet.coins += total - previous;
    wallet.earnings[round.attemptId] = total;
  }
}

// Reaching an incident's observation point once per shift pays a witness report.
export function witness(wallet, round, eventId) {
  const key = round.attemptId + ':witness:' + eventId;
  if (wallet.earnings[key]) return false;
  wallet.earnings[key] = 10;
  wallet.coins += 10;
  return true;
}

// Buying needs the coins, the rank and the missions; an owned item stays usable regardless.
export function toggleItem(wallet, id, level = Infinity, tasks = Infinity) {
  const item = items.find(item=>item.id===id);
  if (!item) return;
  if (!wallet.owned.includes(id)) {
    if (wallet.coins < item.price || !itemOpen(item, level, tasks)) return;
    wallet.coins -= item.price;
    wallet.owned.push(id);
  }
  if (wallet.equipped.includes(id)) wallet.equipped = wallet.equipped.filter(x=>x!==id);
  else {
    if (item.paint) wallet.equipped = wallet.equipped.filter(x=>!items.find(other=>other.id===x)?.paint);
    wallet.equipped.push(id);
  }
}
