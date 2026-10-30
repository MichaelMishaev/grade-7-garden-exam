import { buildMazeLayouts } from './layouts.js';
import { createWorld, normalizeWorld, interactWorld, updateWorld } from './world.js';
// The maze uses tile coordinates: (0, 0) is the upper-left; x grows right, y down.
const ORIGINAL_MAZE = [
  '#######################',
  '#S..#.....#....X#.....#',
  '#.#.#.###.#.###.#.###.#',
  '#.#...#...#...........#',
  '#.#####.#####.#.#.#.#.#',
  '#...A...#..B..#.#.#...#',
  '###.#.###.#.###.#.###.#',
  '#...#.....#...........#',
  '#.#######.#####.#.#.#.#',
  '#...C...#...G...#.#...#',
  '#.###.#.###.#.#.#.###.#',
  '#.....#.....#T........#',
  '###.#####.#####.#.###.#',
  '#.....#.....#.........#',
  '#.###.#.###.#.#####.#.#',
  '#.....................#',
  '#######################'
];
export const MAZE_LAYOUTS = buildMazeLayouts(ORIGINAL_MAZE);
export let MAZE = MAZE_LAYOUTS[0].tiles;
let activeLayoutId = 'classic';
export function selectMazeLayout(id = 'classic') {
  const layout = MAZE_LAYOUTS.find(layout => layout.id === id);
  if (!layout) throw new Error('Unknown maze layout');
  MAZE = layout.tiles; activeLayoutId = layout.id;
  return layout;
}
export const START = { x: 1, y: 1 };
export const EXIT = { x: 15, y: 1 };
export const CLUE = { x: 4, y: 9 };
export const TREASURE = { x: 13, y: 11 };
export const ENCOUNTERS = [
  { id: 'floor', x: 4, y: 5, kind: 'floor', title: 'רצפת הסודות' },
  { id: 'cage', x: 11, y: 5, kind: 'cage', title: 'כלוב הצללים' },
  { id: 'guardian', x: 12, y: 9, kind: 'guardian', title: 'שומר החותם' }
];
export const EXTRA_ENCOUNTERS = [
  { id: 'embers', x: 3, y: 3, kind: 'floor', title: 'גשר הגחלים' },
  { id: 'echo', x: 7, y: 1, kind: 'cage', title: 'מסדרון ההד' },
  { id: 'whisper', x: 9, y: 3, kind: 'guardian', title: 'שער הלחישות' },
  { id: 'runes', x: 1, y: 7, kind: 'floor', title: 'אבני הרונות' },
  { id: 'well', x: 5, y: 11, kind: 'cage', title: 'באר הצללים' },
  { id: 'arch', x: 9, y: 11, kind: 'guardian', title: 'קשת הסודות' },
  { id: 'vault', x: 15, y: 7, kind: 'cage', title: 'חדר הכספת' }
];
const ALL_ENCOUNTERS = [...ENCOUNTERS, ...EXTRA_ENCOUNTERS];
export function encountersFor(questions) {
  return ALL_ENCOUNTERS.slice(0, Math.max(3, Math.ceil(questions.length / 3)));
}
function assignmentsFor(order) {
  const rooms = encountersFor(order);
  return Object.fromEntries(rooms.map((room, i) => [room.id, order.filter((_, index) => Math.min(rooms.length - 1, Math.floor(index * rooms.length / order.length)) === i)]));
}
export const CREATURES = [
  { id: 'prowler', kind: 'shadow', encounter: 'cage', path: [{ x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }, { x: 13, y: 5 }] },
  { id: 'warden', kind: 'guardian', encounter: 'guardian', path: [{ x: 11, y: 9 }, { x: 12, y: 9 }, { x: 13, y: 9 }, { x: 14, y: 9 }, { x: 15, y: 9 }] }
];
const creatureCadence = creature => creature.id === 'warden' ? 1900 : 1600;
export function creaturePosition(creature, elapsedMs = 0) {
  if (!creature?.path?.length) return null;
  const length = creature.path.length;
  if (length === 1) return { ...creature.path[0] };
  const step = Math.floor(Math.max(0, elapsedMs) / creatureCadence(creature)) % (length * 2 - 2);
  return { ...creature.path[step < length ? step : length * 2 - 2 - step] };
}
const PHASES = new Set(['explore', 'question', 'feedback', 'capture', 'review', 'review-feedback', 'complete']);
const DIRECTIONS = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
const copy = value => JSON.parse(JSON.stringify(value));
const sameTile = (a, b) => a.x === b.x && a.y === b.y;
const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const has = (state, id) => Object.hasOwn(state.answers, id);
const fingerprint = questions => JSON.stringify(questions.map(q => [q.id, q.prompt, q.choices, q.correct, q.difficulty, q.explanation, q.ref]));
const shuffle = (values, rng) => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
export const isWalkable = (x, y) => Number.isInteger(x) && Number.isInteger(y) && !!MAZE[y]?.[x] && MAZE[y][x] !== '#';

export function pathTo(from, to) {
  if (!from || !to || !isWalkable(from.x, from.y) || !isWalkable(to.x, to.y)) return null;
  const queue = [{ ...from, path: [] }], seen = new Set([`${from.x},${from.y}`]);
  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    if (sameTile(current, to)) return current.path;
    for (const direction of DIRECTIONS) {
      const next = { x: current.x + direction.x, y: current.y + direction.y }, key = `${next.x},${next.y}`;
      if (isWalkable(next.x, next.y) && !seen.has(key)) {
        seen.add(key); queue.push({ ...next, path: [...current.path, next] });
      }
    }
  }
  return null;
}

function validateQuestions(questions) {
  if (!Array.isArray(questions) || questions.length < 1 || questions.length > 30 || new Set(questions.map(q => q.id)).size !== questions.length
    || questions.some(q => typeof q.id !== 'string' || !Array.isArray(q.choices) || q.choices.length < 2 || !Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.choices.length)) throw new Error('Invalid maze question content');
}
const assigned = (state, encounterId) => state.assignments[encounterId] || [];
const nextId = state => assigned(state, state.activeEncounter).find(id => !has(state, id));
const completeRoom = (state, encounterId) => assigned(state, encounterId).every(id => has(state, id));
function syncSeals(state) {
  state.resolved = ALL_ENCOUNTERS.filter(room => Object.hasOwn(state.assignments, room.id) && completeRoom(state, room.id)).map(room => room.id);
  state.sealProofs ||= {};
  for (const room of ENCOUNTERS) {
    if (state.resolved.includes(room.id) && !Object.hasOwn(state.sealProofs, room.id)) state.sealProofs[room.id] = [...assigned(state, room.id)];
  }
  // A new question allocation may reopen a trap, but cannot take an earned seal.
  state.seals = ENCOUNTERS.filter(room => state.seals.includes(room.id) || state.resolved.includes(room.id)).map(room => room.id);
}
function restoreEarnedSeals(state, raw) {
  const legacyAssignments = Object.fromEntries(ENCOUNTERS.map((room, i) => [room.id, state.order.filter((_, index) => Math.min(2, Math.floor(index * 3 / state.order.length)) === i)]));
  const equalIds = (a, b) => Array.isArray(a) && a.length === b.length && a.every((id, i) => id === b[i]);
  const matchesAssignments = expected => raw.assignments && Object.keys(raw.assignments).length === Object.keys(expected).length && Object.entries(expected).every(([id, ids]) => equalIds(raw.assignments[id], ids));
  const oldMapping = matchesAssignments(legacyAssignments), currentMapping = matchesAssignments(state.assignments);
  state.seals = []; state.sealProofs = {};
  for (const room of ENCOUNTERS) {
    if (!Array.isArray(raw.seals) || !raw.seals.includes(room.id)) continue;
    const proof = raw.sealProofs?.[room.id];
    const expectedOld = legacyAssignments[room.id], expectedCurrent = assigned(state, room.id);
    let earnedIds = null;
    if (equalIds(proof, expectedOld) || equalIds(proof, expectedCurrent)) earnedIds = proof;
    else if (oldMapping) earnedIds = expectedOld;
    else if (currentMapping) earnedIds = expectedCurrent;
    if (earnedIds && earnedIds.every(id => has(state, id))) {
      state.seals.push(room.id); state.sealProofs[room.id] = [...earnedIds];
    }
  }
}
function safeTile(from, checkpoint) {
  // A patrol can occupy a whole narrow corridor. Search beyond immediate
  // neighbors so recovery stays near capture instead of returning to the start.
  const occupied = new Set([...ALL_ENCOUNTERS, ...CREATURES.flatMap(c => c.path)].map(point => `${point.x},${point.y}`));
  const isSafe = point => point && isWalkable(point.x, point.y) && !occupied.has(`${point.x},${point.y}`);
  const origin = from && isWalkable(from.x, from.y) ? from : checkpoint;
  const queue = origin ? [{ ...origin }] : [], visited = new Set();
  for (let i = 0; i < queue.length; i++) {
    const point = queue[i], key = `${point.x},${point.y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (isSafe(point)) return point;
    for (const direction of DIRECTIONS) {
      const neighbor = { x: point.x + direction.x, y: point.y + direction.y };
      if (isWalkable(neighbor.x, neighbor.y) && !visited.has(`${neighbor.x},${neighbor.y}`)) queue.push(neighbor);
    }
  }
  if (isSafe(checkpoint)) return { ...checkpoint };
  // Every valid tile in the fixed maze connects to a safe tile; map tests pin it.
  throw new Error('No reachable recovery tile');
}
function enterRoom(state, room) {
  if (completeRoom(state, room.id)) return;
  state.activeEncounter = room.id;
  state.phase = 'question';
  state.notice = null;
}

function creatureEncounter(state, fromMs = state.elapsedMs, toMs = state.elapsedMs) {
  // Account for a large deterministic time step without letting a patrol pass through
  // the player between sampled frames. Return the earliest eligible contact.
  if (state.phase !== 'explore' || state.graceMs > toMs - fromMs) return null;
  const firstEligible = fromMs + state.graceMs;
  let earliest = null;
  for (const creature of CREATURES) {
    const room = ENCOUNTERS.find(room => room.id === creature.encounter);
    if (completeRoom(state, room.id)) continue;
    const cadence = creatureCadence(creature);
    for (let step = Math.floor(firstEligible / cadence); step <= Math.floor(toMs / cadence); step++) {
      const time = Math.max(firstEligible, step * cadence);
      if (sameTile(state.player, creaturePosition(creature, time)) && (!earliest || time < earliest.time)) earliest = { room, time };
    }
  }
  return earliest;
}

function beginReview(state, questions) {
  const missed = state.order.filter(id => state.answers[id]?.correct === false && questions.some(q => q.id === id));
  const ids = missed.length ? [missed.at(-1), missed.length > 1 ? missed.at(-2) : missed[0]] : [];
  state.review = { ids, index: 0, wrong: 0, hint: 0, correct: null, guided: ids.length === 0 };
  state.phase = 'review';
}
function finishRecovery(state) {
  state.hearts = 3;
  state.player = safeTile(state.capturePosition || state.player, state.checkpoint);
  state.checkpoint = { ...state.player };
  state.graceMs = 5000;
  state.phase = 'explore';
  state.activeEncounter = null;
  state.review = null;
  state.captureMs = 0;
  state.notice = 'הצלחתם להשתחרר! ההתקדמות נשמרה. אפשר להמשיך מאותה מלכודת.';
}

export function createState(questions, rng = Math.random) {
  validateQuestions(questions);
  const order = shuffle(questions.map(q => q.id), rng);
  const assignments = assignmentsFor(order);
  const state = {
    version: 1, layoutId: activeLayoutId, giftsSeen: [], rewardPurchases: [], contentKey: fingerprint(questions), order,
    choiceOrders: Object.fromEntries(questions.map(q => [q.id, shuffle(q.choices.map((_, i) => i), rng)])), assignments,
    world: createWorld(), phase: 'explore', paused: false, player: { ...START }, checkpoint: { ...START },
    hearts: 3, coins: 0, seals: [], sealProofs: {}, resolved: [], answers: {}, activeEncounter: null, lastAnswer: null,
    review: null, capturePosition: null, captureMs: 0, captureCount: 0, graceMs: 0, elapsedMs: 0,
    clues: [], treasureCollected: false, visited: [`${START.x},${START.y}`], notice: null
  };
  syncSeals(state);
  return state;
}

export function currentQuestion(state, questions) {
  const id = state.phase === 'review' || state.phase === 'review-feedback' ? state.review?.ids[state.review.index] : state.phase === 'feedback' ? state.lastAnswer?.id : nextId(state);
  const question = questions.find(q => q.id === id);
  return question ? { ...question, options: (state.choiceOrders[id] || question.choices.map((_, i) => i)).map(original => ({ text: question.choices[original], original })) } : null;
}

export function progress(state, questions) {
  const weights = { easy: 1, medium: 1.5, hard: 2 };
  const totalWeight = questions.reduce((sum, q) => sum + (weights[q.difficulty] || 1.5), 0);
  const earned = questions.reduce((sum, q) => sum + (state.answers[q.id]?.correct ? (weights[q.difficulty] || 1.5) : 0), 0);
  const answered = questions.filter(q => has(state, q.id)).length;
  return { answered, total: questions.length, trapsResolved: encountersFor(questions).filter(room => state.resolved.includes(room.id)).length, trapsTotal: encountersFor(questions).length, correct: questions.filter(q => state.answers[q.id]?.correct).length, score: totalWeight ? Math.round(earned / totalWeight * 100) : 0, complete: answered === questions.length && state.seals.length === 3 };
}

export function rewardBalance(state) {
  return Math.max(0, (state.giftsSeen?.length || 0) - (state.rewardPurchases?.length || 0));
}

export function transition(state, action, questions) {
  if (!state || !action || typeof action.type !== 'string') return state;
  if (action.type === 'buy-reward') {
    const item=action.item,purchases=state.rewardPurchases || [];
    if(state.phase!=='explore'||!state.paused||rewardBalance(state)<1||!['compass','lantern','heart'].includes(item))return state;
    if(item==='heart' ? state.hearts<=0||state.hearts>=3 : purchases.includes(item))return state;
    return {...state,rewardPurchases:[...purchases,item],hearts:state.hearts+(item==='heart'?1:0),notice:item==='heart'?'לב נוסף לדרך!':item==='compass'?'המצפן מצייר שביל אל היעד הבא.':'פנס האור המשופר מאיר את הדרך!'};
  }
  if (action.type === 'pause') return state.paused || state.phase === 'complete' ? state : { ...state, paused: true };
  if (action.type === 'collect-gift') {
    const id = action.id;
    return state.resolved.includes(id) && !state.giftsSeen.includes(id) ? { ...state, giftsSeen: [...state.giftsSeen, id] } : state;
  }
  if (action.type === 'resume') return state.paused ? { ...state, paused: false } : state;
  if (state.paused || state.phase === 'complete') return state;
  const next = copy(state);
  if (action.type === 'world-interact' && next.phase === 'explore') {
    const interaction = interactWorld(next.world, action.entityId, next.player, next.elapsedMs, action.intent);
    if (!interaction) return state;
    next.world = interaction.world; next.notice = interaction.notice;
    return next;
  }
  if (action.type === 'tick') {
    if (!Number.isFinite(action.ms) || action.ms <= 0) return state;
    const ms = Math.min(action.ms, 60000);
    if (next.phase === 'explore') {
      const contact = action.moving === true ? null : creatureEncounter(next, next.elapsedMs, next.elapsedMs + ms);
      next.elapsedMs = contact ? contact.time : next.elapsedMs + ms;
      next.graceMs = contact ? 0 : Math.max(0, next.graceMs - ms);
      next.world = updateWorld(next.world, { type: 'tick', elapsedMs: next.elapsedMs, player: next.player }, pathTo);
      if (contact) enterRoom(next, contact.room);
    }
    else if (next.phase === 'capture') { next.captureMs += ms; if (next.captureMs >= 3000) beginReview(next, questions); }
    else return state;
    return next;
  }
  if (action.type === 'skip-capture' && next.phase === 'capture') { beginReview(next, questions); return next; }
  if (action.type === 'move' && next.phase === 'explore') {
    if (!Number.isInteger(action.dx) || !Number.isInteger(action.dy) || Math.abs(action.dx) + Math.abs(action.dy) !== 1) return state;
    const destination = { x: next.player.x + action.dx, y: next.player.y + action.dy };
    if (!isWalkable(destination.x, destination.y)) return state;
    next.checkpoint = { ...next.player }; next.player = destination; next.notice = null;
    next.world = updateWorld(next.world, { type: 'move', player: next.player }, pathTo);
    const key = `${destination.x},${destination.y}`;
    if (!next.visited.includes(key)) next.visited.push(key);
    if (sameTile(destination, CLUE) && !next.clues.includes('route')) { next.clues.push('route'); next.notice = 'חריטה על הקיר: שלושה חותמים והשלמת המלכודות פותחים את השער. גם אחרי טעות, הדרך נשארת פתוחה.'; }
    if (sameTile(destination, TREASURE) && !next.treasureCollected) { next.treasureCollected = true; next.notice = 'מצאתם חדר אוצר סודי! התיבה שומרת אור לדרך חזרה.'; }
    const room = encountersFor(questions).find(room => sameTile(room, destination));
    if (room) enterRoom(next, room);
    if (next.phase === 'explore' && next.graceMs === 0) {
      const contact = creatureEncounter(next);
      if (contact) enterRoom(next, contact.room);
    }
    if (sameTile(destination, EXIT)) {
      if (progress(next, questions).complete) next.phase = 'complete';
      else next.notice = 'כדי לפתוח את השער, אספו את שלושת החותמים והשלימו את המלכודות. לא צריך לענות נכון על הכול.';
    }
    return next;
  }
  if (action.type === 'interact' && next.phase === 'explore') {
    const room = encountersFor(questions).find(room => distance(room, next.player) <= 1 && !completeRoom(next, room.id));
    if (room) { enterRoom(next, room); return next; }
    if (distance(next.player, EXIT) <= 1) {
      if (progress(next, questions).complete) next.phase = 'complete';
      else next.notice = 'השער מחכה לשלושת החותמים ולהשלמת המלכודות. אפשר לטעות ולהמשיך.';
      return next;
    }
    return state;
  }
  if (action.type === 'answer' && next.phase === 'question') {
    const question = currentQuestion(next, questions);
    if (!question || has(next, question.id) || !Number.isInteger(action.choice) || action.choice < 0 || action.choice >= question.choices.length) return state;
    const correct = action.choice === question.correct;
    next.answers[question.id] = { choice: action.choice, correct };
    next.lastAnswer = { id: question.id, choice: action.choice, correct };
    if (correct) next.coins += 10;
    else next.hearts = Math.max(0, next.hearts - 1);
    syncSeals(next);
    if (next.hearts === 0) {
      next.phase = 'capture'; next.capturePosition = { ...next.player }; next.captureMs = 0; next.captureCount += 1;
    } else next.phase = 'feedback';
    return next;
  }
  if (action.type === 'continue' && next.phase === 'feedback') {
    if (nextId(next)) next.phase = 'question';
    else { next.phase = 'explore'; next.activeEncounter = null; next.notice = 'החותם שלכם. הדרך פתוחה — ממשיכים לחקור!'; }
    return next;
  }
  if (action.type === 'review-answer' && next.phase === 'review') {
    const question = currentQuestion(next, questions);
    if (!question || next.review.guided || !Number.isInteger(action.choice) || action.choice < 0 || action.choice >= question.choices.length) return state;
    next.review.correct = action.choice === question.correct;
    if (!next.review.correct) { next.review.wrong += 1; next.review.hint = Math.min(2, next.review.wrong); }
    next.phase = 'review-feedback';
    return next;
  }
  if ((action.type === 'continue' || action.type === 'guided-continue') && (next.phase === 'review-feedback' || (next.phase === 'review' && next.review?.guided))) {
    if (next.review.guided || next.review.correct || next.review.wrong >= 2) {
      if (next.review.guided || next.review.index === 1) finishRecovery(next);
      else { next.review.index += 1; next.review.wrong = 0; next.review.hint = 0; next.review.correct = null; next.phase = 'review'; }
    } else { next.review.correct = null; next.phase = 'review'; }
    return next;
  }
  return state;
}

export function restoreState(saved, questions) {
  try {
    validateQuestions(questions);
    const raw = typeof saved === 'string' ? JSON.parse(saved) : copy(saved);
    if (!raw || raw.version !== 1 || raw.contentKey !== fingerprint(questions) || !Array.isArray(raw.order) || raw.order.length !== questions.length || new Set(raw.order).size !== questions.length || raw.order.some(id => !questions.some(q => q.id === id))) return null;
    selectMazeLayout(raw.layoutId || 'classic');
    const state = createState(questions, () => 0.999999);
    if(Number.isInteger(raw.completionArt)&&raw.completionArt>=0&&raw.completionArt<3)state.completionArt=raw.completionArt;
    state.order = raw.order;
    state.assignments = assignmentsFor(state.order);
    state.choiceOrders = {};
    for (const question of questions) {
      const values = raw.choiceOrders?.[question.id];
      state.choiceOrders[question.id] = Array.isArray(values) && values.length === question.choices.length && new Set(values).size === values.length && values.every(value => Number.isInteger(value) && value >= 0 && value < values.length) ? values : question.choices.map((_, i) => i);
    }
    if (!raw.answers || typeof raw.answers !== 'object' || Array.isArray(raw.answers)) return null;
    state.answers = {};
    for (const [id, answer] of Object.entries(raw.answers)) {
      const question = questions.find(q => q.id === id);
      if (!question || !Number.isInteger(answer?.choice) || answer.choice < 0 || answer.choice >= question.choices.length) return null;
      state.answers[id] = { choice: answer.choice, correct: answer.choice === question.correct };
    }
    const validPoint = point => point && isWalkable(point.x, point.y);
    state.player = validPoint(raw.player) ? raw.player : validPoint(raw.checkpoint) ? raw.checkpoint : { ...START };
    state.checkpoint = validPoint(raw.checkpoint) ? raw.checkpoint : { ...START };
    state.hearts = Number.isInteger(raw.hearts) ? Math.min(3, Math.max(0, raw.hearts)) : 3;
    state.coins = Object.values(state.answers).filter(answer => answer.correct).length * 10;
    state.clues = Array.isArray(raw.clues) && raw.clues.includes('route') ? ['route'] : [];
    state.treasureCollected = raw.treasureCollected === true;
    state.visited = Array.isArray(raw.visited) ? [...new Set(raw.visited.filter(key => typeof key === 'string' && /^\d+,\d+$/.test(key) && isWalkable(...key.split(',').map(Number))))] : [];
    if (!state.visited.includes(`${state.player.x},${state.player.y}`)) state.visited.push(`${state.player.x},${state.player.y}`);
    // Huge corrupted timers can make patrol-loop increments stop advancing.
    state.elapsedMs = Number.isFinite(raw.elapsedMs) && raw.elapsedMs >= 0 && raw.elapsedMs <= Number.MAX_SAFE_INTEGER ? raw.elapsedMs : 0;
    state.world = normalizeWorld(raw.world, isWalkable, state.elapsedMs);
    state.graceMs = Number.isFinite(raw.graceMs) ? Math.max(0, Math.min(5000, raw.graceMs)) : 0;
    state.captureCount = Number.isInteger(raw.captureCount) && raw.captureCount >= 0 ? raw.captureCount : 0;
    state.capturePosition = validPoint(raw.capturePosition) ? raw.capturePosition : { ...state.player };
    state.captureMs = Number.isFinite(raw.captureMs) ? Math.max(0, Math.min(3000, raw.captureMs)) : 0;
    state.phase = PHASES.has(raw.phase) ? raw.phase : 'explore';
    state.paused = raw.paused === true;
    state.activeEncounter = encountersFor(questions).some(room => room.id === raw.activeEncounter) ? raw.activeEncounter : null;
    state.lastAnswer = raw.lastAnswer && has(state, raw.lastAnswer.id) ? { id: raw.lastAnswer.id, ...state.answers[raw.lastAnswer.id] } : null;
    restoreEarnedSeals(state, raw);
    syncSeals(state);
    state.giftsSeen = Array.isArray(raw.giftsSeen) ? [...new Set(raw.giftsSeen.filter(id => state.resolved.includes(id)))] : [...state.resolved];
    state.rewardPurchases=[];
    for(const item of Array.isArray(raw.rewardPurchases)?raw.rewardPurchases:[]){
      if(state.rewardPurchases.length>=state.giftsSeen.length)break;
      if(['compass','lantern','heart'].includes(item)&&(item==='heart'||!state.rewardPurchases.includes(item)))state.rewardPurchases.push(item);
    }
    if (state.phase === 'complete' && !progress(state, questions).complete) state.phase = 'explore';
    if (state.phase === 'question' && !nextId(state)) { state.phase = 'explore'; state.activeEncounter = null; }
    if (state.phase === 'feedback' && !state.lastAnswer) { state.phase = 'explore'; state.activeEncounter = null; }
    if (state.phase === 'capture' || state.phase === 'review' || state.phase === 'review-feedback' || (state.hearts === 0 && state.phase !== 'complete')) {
      if (state.phase !== 'capture') {
        beginReview(state, questions);
        const review = raw.review;
        const validIds = Array.isArray(review?.ids) && review.ids.length === 2 && review.ids.every(id => state.answers[id]?.correct === false);
        if (validIds) {
          state.review.ids = review.ids; state.review.index = review.index === 1 ? 1 : 0;
          state.review.wrong = Number.isInteger(review.wrong) ? Math.max(0, Math.min(2, review.wrong)) : 0;
          state.review.hint = state.review.wrong;
          state.review.correct = review.correct === true ? true : review.correct === false ? false : null;
          if (raw.phase === 'review-feedback' && state.review.correct !== null) state.phase = 'review-feedback';
        }
      }
    }
    return state;
  } catch { return null; }
}
