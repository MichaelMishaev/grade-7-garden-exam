export const items = [
  {id:'cap', name:'כובע מצחייה', detail:'כובע טורקיז עם מצחייה רחבה.', price:10},
  {id:'jacket', name:'מעיל פסטיבל', detail:'מעיל סגול לצוות הפסטיבל.', price:20},
  {id:'drone', name:'רחפן ניווט', detail:'מלווה אתכם ברגל וברכב ומכוון את החץ ליעד.', price:35},
  {id:'scarf', name:'צעיף פסים', detail:'צעיף אדום עם פס זהוב.', price:8},
  {id:'glasses', name:'משקפי שמש', detail:'משקפיים כהים עם מסגרת כחולה.', price:12},
  {id:'pack', name:'תיק שליחים', detail:'תיק גב כתום עם כיס קדמי.', price:18},
  {id:'beacon', name:'פנס גג', detail:'פנס ענברי לגג רכב המשמרת.', price:25}
];

export function emptyWallet() {
  return {coins:0, owned:[], equipped:[], earnings:{}};
}

// Reconcile the draft against the last paid total, including after a reload.
export function pay(wallet, round, stage) {
  const total = Object.values(round.answers).filter(a=>a.correct).length * 5 + stage * 15;
  const previous = wallet.earnings[round.attemptId] || 0;
  if (total > previous) {
    wallet.coins += total - previous;
    wallet.earnings[round.attemptId] = total;
  }
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
