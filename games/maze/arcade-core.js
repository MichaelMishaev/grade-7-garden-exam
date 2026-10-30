// Arcade state is separate from the full-bank maze and never writes exam scores.
export const ARCADE_KEY = 'prepx-shadow-maze-arcade-v1';
export const LANES = [-1.5, 0, 1.5];
export const ACTIVE_PHASES = ['bridge', 'boss'];
const phases = ['staging', 'bridge', 'question', 'feedback', 'boss-ready', 'boss', 'victory'];
const clone = value => JSON.parse(JSON.stringify(value));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const finite = (x, a, b) => Number.isFinite(x) && x >= a && x <= b;
const integer = (x, a, b) => Number.isInteger(x) && x >= a && x <= b;
const shuffle = (items, rng) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
};
export const completed = state => state.answers.filter(Boolean).length;
export const crystals = state => completed(state) - state.boss.hits.length;
export const diamonds = state => state.claimed.length + (state.phase === 'victory' ? 1 : 0) - state.purchases.length;
export const readyCharge = (state, item) => state.purchases.find(p => p.item === item && p.status === 'ready');
export const isSafe = state => state.phase === 'staging' || state.phase === 'boss-ready';
export function createArcade(content, rng = Math.random) {
  if (!content || content.questions.length < 3 || content.questions.some(q => q.type !== 'mcq' || !integer(q.correct, 0, q.choices.length - 1))) throw new Error('Three compatible questions required');
  const selected = shuffle(content.questions, rng).slice(0, 3);
  return {
    version: 1, mode: 'arcade-v1', runId: globalThis.crypto?.randomUUID?.() || `arcade-${Date.now()}-${rng()}`,
    content, selected: selected.map(q => q.id), choices: selected.map(q => shuffle(q.choices.map((_, i) => i), rng)),
    phase: 'staging', stage: 0, answers: [null, null, null], claimed: [], purchases: [], hearts: 3,
    player: { x: 0, z: 1 }, clock: 0, activeMs: 0, slowMs: 0, protectionMs: 0, recoverMs: 0,
    boss: { hits: [], window: 0, clock: 0 }, failures: 0, assist: false, paused: false, generation: 0,
    notice: 'אספו שלושה גבישים כדי להגיע לשומר. אין צורך לענות נכון כדי להמשיך.',
  };
}
export const arcadeQuestion = state => state.content.questions.find(q => q.id === state.selected[state.stage]);
export function arcadeScore(state) {
  let total = 0, earned = 0;
  state.selected.forEach((id, i) => { const q = state.content.questions.find(q => q.id === id), w = q.weight || 1.5; total += w; if (state.answers[i]?.correct) earned += w; });
  return Math.round(earned / total * 100);
}
export const coins = state => state.answers.filter(a => a?.correct).length * 10;
export function bridgeTile(state, row) {
  if (state.assist) return 'open';
  const t = (state.clock + row * state.stage * 70) % 4000;
  const closedAt = 3600 - state.stage * 200;
  return t < closedAt - 800 ? 'open' : t < closedAt ? 'warning' : 'closed';
}
export function bossPhase(state) {
  if (state.assist) return 'exposed';
  return state.boss.clock < 900 ? 'telegraph' : state.boss.clock < 1300 ? 'attack' : state.boss.clock < 4300 ? 'exposed' : 'expired';
}
export const attackLane = state => LANES[state.boss.window % 3];
export const canFire = state => state.phase === 'boss' && !state.paused && state.recoverMs === 0 && bossPhase(state) === 'exposed' && state.player.z >= 6.5 && state.player.z <= 8.5 && Math.abs(state.player.x) <= 1.9 && crystals(state) > 0;
function generation(state) { state.generation += 1; }
function newWindow(state) { state.boss.window += 1; state.boss.clock = 0; }
function bossCheckpoint(state) { state.player = { x: 0, z: 2 }; }
function fail(state) {
  state.failures += 1;
  if (state.failures >= 3) state.assist = true;
}
function damage(state) {
  if (state.protectionMs > 0 || state.assist) return;
  const shield = readyCharge(state, 'shield');
  if (shield) {
    shield.status = 'used'; state.protectionMs = 1200; state.notice = 'המגן עצר פגיעה אחת!'; return;
  }
  state.hearts -= 1;
  if (state.hearts === 0) state.hearts = 3;
  fail(state);
  state.recoverMs = 900; state.protectionMs = 2100;
  state.notice = state.assist ? 'מצב עזרה פעיל: הדרך פתוחה והבוס לא פוגע. ההתקדמות נשמרה.' : 'חוזרים לנקודה בטוחה. הגבישים וההתקדמות נשארים איתכם.';
  if (state.phase === 'boss') { newWindow(state); bossCheckpoint(state); }
  else state.player = { x: 0, z: 1 };
  generation(state);
}
function win(state) {
  state.phase = 'victory'; state.claimed = [0, 1, 2]; state.notice = 'השומר הובס! כל המתנות נאספו, וקיבלתם יהלום בונוס.'; generation(state);
}
// Every return value is a complete snapshot. The caller persists it with one setItem.
export function arcadeTransition(state, action) {
  if (!state || !action) return state;
  if (action.type === 'pause') return state.paused || state.phase === 'victory' ? state : { ...state, paused: true, generation: state.generation + 1 };
  if (action.type === 'resume') {
    if (!state.paused) return state;
    const next = clone(state); next.paused = false; generation(next);
    if (next.phase === 'boss') { newWindow(next); bossCheckpoint(next); next.recoverMs = 500; next.protectionMs = Math.max(1700, next.protectionMs); }
    if (next.phase === 'bridge') { next.recoverMs = 500; next.protectionMs = Math.max(1700, next.protectionMs); }
    return next;
  }
  if (action.type === 'claim') {
    const i = action.stage;
    if (!integer(i, 0, 2) || !state.answers[i] || state.claimed.includes(i)) return state;
    return { ...state, claimed: [...state.claimed, i], notice: 'מתנה נוספה לאוסף וגם יהלום אחד לשדרוגים!' };
  }
  if (action.type === 'buy') {
    if (!state.paused || !isSafe(state) || diamonds(state) < 1 || !['shield', 'slow'].includes(action.item) || readyCharge(state, action.item)) return state;
    return { ...state, purchases: [...state.purchases, { item: action.item, status: 'ready' }], notice: action.item === 'shield' ? 'מגן חד־פעמי מוכן לפגיעה הבאה.' : 'הילוך איטי מוכן. הפעילו אותו בזמן אתגר.' };
  }
  if (state.paused || state.phase === 'victory') return state;
  if (action.generation !== undefined && action.generation !== state.generation) return state;
  const next = clone(state);
  if (action.type === 'assist' && ACTIVE_PHASES.includes(next.phase)) { next.assist = true; next.notice = 'מצב עזרה: הגשר פתוח והבוס לא פוגע. הציון לא משתנה.'; return next; }
  if (action.type === 'start' && isSafe(next)) {
    if (next.phase === 'boss-ready' && completed(next) !== 3) return state;
    next.phase = next.phase === 'boss-ready' ? 'boss' : 'bridge'; next.clock = 0; generation(next);
    if (next.phase === 'boss') { newWindow(next); bossCheckpoint(next); }
    else next.player = { x: 0, z: 1 };
    next.notice = next.phase === 'boss' ? 'התרחקו מהמסלול האדום. כשהמגן נפתח, הגיעו לעיגולי הירי ושגרו גביש.' : 'חצו כשהאבנים מוארות. זהב = עומד להיסגר, חושך = לא לדרוך.';
    return next;
  }
  if (action.type === 'answer' && next.phase === 'question') {
    const q = arcadeQuestion(next);
    if (next.answers[next.stage] || !integer(action.choice, 0, q.choices.length - 1)) return state;
    const correct = action.choice === q.correct;
    next.answers[next.stage] = { stage: next.stage, choice: action.choice, correct, crystalId: `stage-${next.stage}`, giftId: `stage-${next.stage}` };
    if (!correct) { next.hearts -= 1; if (next.hearts === 0) next.hearts = 3; }
    next.phase = 'feedback'; generation(next); return next;
  }
  if (action.type === 'continue' && next.phase === 'feedback') {
    const missing = next.answers.findIndex(a => !a);
    next.phase = missing < 0 ? 'boss-ready' : 'staging'; next.stage = missing < 0 ? 2 : missing;
    next.failures = 0; next.player = { x: 0, z: 1 }; generation(next); return next;
  }
  if (action.type === 'slow' && ACTIVE_PHASES.includes(next.phase) && next.recoverMs === 0 && next.slowMs === 0) {
    const charge = readyCharge(next, 'slow'); if (!charge) return state;
    charge.status = 'used'; next.slowMs = 5000; next.notice = 'הילוך איטי פעיל לחמש שניות משחק.'; return next;
  }
  // A shot is validated before this frame's damage/expiry. Its visual flight is cosmetic.
  if (action.type === 'fire') {
    if (!canFire(next) || action.window !== next.boss.window) return state;
    next.boss.hits.push(next.boss.window);
    if (next.boss.hits.length === 3) { win(next); return next; }
    next.failures = 0; newWindow(next); bossCheckpoint(next); next.recoverMs = 450; next.protectionMs = 1650; generation(next);
    next.notice = 'שכבת מגן נשברה! הגבישים שנותרו מספיקים להמשך.'; return next;
  }
  if (action.type !== 'tick' || !ACTIVE_PHASES.includes(next.phase) || !finite(action.ms, 0.001, 100)) return state;
  const dt = action.ms;
  next.protectionMs = Math.max(0, next.protectionMs - dt);
  if (next.recoverMs > 0) { next.recoverMs = Math.max(0, next.recoverMs - dt); return next; }
  next.activeMs += dt;
  // Integrate a boost-expiry boundary without stretching its five-second duration.
  const slowed = Math.min(dt, next.slowMs), hazardDt = slowed * 0.5 + dt - slowed;
  next.slowMs = Math.max(0, next.slowMs - dt);
  const dx = finite(action.dx, -1, 1) ? action.dx : 0, dz = finite(action.dz, -1, 1) ? action.dz : 0;
  const length = Math.max(1, Math.hypot(dx, dz)), speed = 3.2 * dt / 1000;
  next.player.x = clamp(next.player.x + dx / length * speed, -2.15, 2.15);
  next.player.z = clamp(next.player.z + dz / length * speed, 0.7, next.phase === 'boss' ? 8.5 : 10.2);
  if (next.phase === 'bridge') {
    next.clock += hazardDt;
    if (next.player.z >= 9.8) { next.phase = 'question'; next.recoverMs = 0; generation(next); return next; }
    if (next.player.z >= 3 && next.player.z <= 9) {
      const row = clamp(Math.floor((next.player.z - 3) / 1.5), 0, 3);
      const onLane = LANES.some(x => Math.abs(next.player.x - x) <= 0.55);
      if (!onLane || bridgeTile(next, row) === 'closed') damage(next);
    }
  } else {
    next.boss.clock += hazardDt;
    // Damage wins over timed restart; this branch can schedule only one new window.
    if (bossPhase(next) === 'attack' && next.player.z >= 3.5 && Math.abs(next.player.x - attackLane(next)) < 0.62) damage(next);
    else if (bossPhase(next) === 'expired') {
      fail(next); newWindow(next); generation(next);
      if (next.assist) next.notice = 'מצב עזרה הופעל: המטרה נשארת פתוחה עד שתשגרו גביש.';
    }
  }
  return next;
}
export function restoreArcade(raw, content) {
  try {
    if (raw?.version !== 1 || raw.mode !== 'arcade-v1' || !phases.includes(raw.phase) || raw.content?.version !== content.version || !Array.isArray(raw.selected) || raw.selected.length !== 3 || new Set(raw.selected).size !== 3) return null;
    const known = raw.selected.map(id => content.questions.find(q => q.id === id)); if (known.some(q => !q)) return null;
    if (!Array.isArray(raw.answers) || raw.answers.length !== 3 || !integer(raw.stage, 0, 2)) return null;
    const state = createArcade(content, () => .999999); state.selected = [...raw.selected]; state.runId = typeof raw.runId === 'string' && raw.runId.length < 150 ? raw.runId : state.runId;
    state.choices = known.map((q, i) => { const order = raw.choices?.[i]; if (!Array.isArray(order) || order.length !== q.choices.length || new Set(order).size !== order.length || order.some(v => !integer(v, 0, q.choices.length - 1))) throw new Error('Invalid choices'); return [...order]; });
    state.answers = raw.answers.map((a, i) => {
      if (a === null) return null;
      if (!integer(a?.choice, 0, known[i].choices.length - 1) || a.stage !== i || a.crystalId !== `stage-${i}` || a.giftId !== `stage-${i}`) throw new Error('Invalid stage');
      return { stage: i, choice: a.choice, correct: a.choice === known[i].correct, crystalId: `stage-${i}`, giftId: `stage-${i}` };
    });
    if (!Array.isArray(raw.boss?.hits) || raw.boss.hits.length > 3 || new Set(raw.boss.hits).size !== raw.boss.hits.length || raw.boss.hits.some(v => !integer(v, 0, 1e9)) || !integer(raw.boss.window, 0, 1e9) || raw.boss.hits.some(v => v > raw.boss.window)) return null;
    if (raw.boss.hits.length && completed(state) !== 3) return null;
    state.boss = { hits: [...raw.boss.hits], window: raw.boss.window, clock: 0 };
    if (!Array.isArray(raw.claimed) || raw.claimed.some(i => !integer(i, 0, 2) || !state.answers[i])) return null;
    state.claimed = [...new Set(raw.claimed)];
    state.phase = raw.phase; state.stage = raw.stage;
    if (state.boss.hits.length === 3) { state.phase = 'victory'; state.claimed = [0, 1, 2]; }
    else if (state.phase === 'victory') state.phase = 'boss';
    if (!Array.isArray(raw.purchases) || raw.purchases.length > state.claimed.length + (state.phase === 'victory' ? 1 : 0)) return null;
    state.purchases = raw.purchases.map(p => { if (!['shield', 'slow'].includes(p?.item) || !['ready', 'used'].includes(p.status)) throw new Error('Invalid purchase'); return { item: p.item, status: p.status }; });
    for (const item of ['shield', 'slow']) if (state.purchases.filter(p => p.item === item && p.status === 'ready').length > 1) return null;
    if (!finite(raw.slowMs, 0, 5000) || raw.slowMs > 0 && !state.purchases.some(p => p.item === 'slow' && p.status === 'used')) return null;
    state.slowMs = raw.slowMs; state.hearts = integer(raw.hearts, 1, 3) ? raw.hearts : 3;
    state.activeMs = finite(raw.activeMs, 0, 1e12) ? raw.activeMs : 0; state.clock = finite(raw.clock, 0, 1e12) ? raw.clock : 0;
    state.failures = integer(raw.failures, 0, 1e9) ? raw.failures : 0; state.assist = raw.assist === true || state.failures >= 3;
    state.generation = integer(raw.generation, 0, 1e9) ? raw.generation + 1 : 1;
    state.player = finite(raw.player?.x, -2.15, 2.15) && finite(raw.player?.z, .7, 10.2) ? { ...raw.player } : { x: 0, z: 1 };
    const missing = state.answers.findIndex(a => !a);
    if (missing >= 0 && (['boss', 'boss-ready', 'victory'].includes(state.phase) || state.stage > missing)) { state.phase = 'staging'; state.stage = missing; }
    if (['bridge', 'question', 'staging'].includes(state.phase) && state.answers[state.stage]) { state.phase = missing < 0 ? 'boss-ready' : 'staging'; state.stage = missing < 0 ? 2 : missing; }
    if (state.phase === 'feedback' && !state.answers[state.stage]) { state.phase = 'staging'; state.stage = missing < 0 ? 2 : missing; }
    if (state.phase === 'boss') { newWindow(state); bossCheckpoint(state); }
    state.notice = state.phase === 'boss' ? `הקרב נמשך. נותרו ${3-state.boss.hits.length} שכבות מגן ו-${crystals(state)} גבישים. מתחילים בנקודה בטוחה.` : state.phase === 'victory' ? 'הסבב הושלם! כל המתנות והבונוס באוסף שלכם.' : state.phase === 'feedback' ? 'התשובה והגביש נשמרו. אפשר לקרוא ולהמשיך בבטחה.' : state.phase === 'question' ? 'השאלה מחכה לכם ללא הגבלת זמן. ההתקדמות נשמרה.' : 'חזרתם לנקודה בטוחה. הגבישים, המתנות וההתקדמות נשמרו.';
    state.paused = state.phase !== 'victory'; state.protectionMs = 1200; state.recoverMs = 0;
    return state;
  } catch { return null; }
}
