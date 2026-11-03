export const items = [
  {id:'cap', name:'כובע מצחייה', detail:'כובע טורקיז עם מצחייה רחבה.', price:10},
  {id:'jacket', name:'מעיל פסטיבל', detail:'מעיל סגול לצוות הפסטיבל.', price:20},
  {id:'drone', name:'רחפן ניווט', detail:'מלווה אתכם ברגל וברכב ומכוון את החץ ליעד.', price:35},
  {id:'scarf', name:'צעיף פסים', detail:'צעיף אדום עם פס זהוב.', price:8},
  {id:'glasses', name:'משקפי שמש', detail:'משקפיים כהים עם מסגרת כחולה.', price:12},
  {id:'pack', name:'תיק שליחים', detail:'תיק גב כתום עם כיס קדמי.', price:18},
  {id:'beacon', name:'פנס גג', detail:'פנס ענברי לגג רכב המשמרת.', price:25, vehicle:true},
  {id:'stripes', name:'פסי ראלי', detail:'שני פסים כחולים על מכסה המנוע והגג.', price:10, vehicle:true},
  {id:'spare', name:'גלגל שטח', detail:'גלגל חלופי עם חישוק אלמוג בגב הרכב.', price:14, vehicle:true},
  {id:'spoiler', name:'כנף מרוץ', detail:'כנף אחורית שחורה עם קצוות אדומים.', price:20, vehicle:true},
  {id:'underglow', name:'תאורת ניאון', detail:'פסי טורקיז והילה מאירה מתחת לרכב.', price:24, vehicle:true},
  {id:'surfboard', name:'גלשן המפרץ', detail:'גלשן ורוד עם סנפיר על מתקן צד בגג.', price:30, vehicle:true}
];

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

export function toggleItem(wallet, id) {
  const item = items.find(item=>item.id===id);
  if (!item) return;
  if (!wallet.owned.includes(id)) {
    if (wallet.coins < item.price) return;
    wallet.coins -= item.price;
    wallet.owned.push(id);
  }
  if (wallet.equipped.includes(id)) wallet.equipped = wallet.equipped.filter(x=>x!==id);
  else wallet.equipped.push(id);
}
