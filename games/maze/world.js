// Friendly world interactions are fictional exploration content, separate from learning scores.
export const WORLD_ENTITIES = [
  { id: 'scout', kind: 'human', name: 'אורי · סייר השבילים', title: 'סייר השבילים', actionLabel: 'לדבר עם אורי', x: 3, y: 7, path: [{ x: 3, y: 7 }, { x: 2, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }] },
  { id: 'keeper', kind: 'human', name: 'מיה · שומרת הגן', title: 'שומרת הגן', actionLabel: 'לדבר עם מיה', x: 19, y: 3, path: [{ x: 19, y: 3 }, { x: 20, y: 3 }, { x: 21, y: 3 }, { x: 20, y: 3 }] },
  { id: 'fox', kind: 'fox', name: 'שועל הגן', title: 'שועל הגן', actionLabel: 'להתקרב לשועל', x: 19, y: 7 },
  { id: 'rabbit', kind: 'rabbit', name: 'ארנב בין השיחים', title: 'ארנב בין השיחים', actionLabel: 'להתקרב בשקט', x: 21, y: 11 },
  { id: 'owl', kind: 'owl', name: 'ינשוף החורבות', title: 'ינשוף החורבות', actionLabel: 'להביט בינשוף', x: 15, y: 15 },
  { id: 'pump', kind: 'pump', name: 'משאבת הגן', title: 'משאבת הגן', actionLabel: 'למלא את קערת המים', x: 17, y: 11 },
  { id: 'lamp', kind: 'lamp', name: 'פנס הגן', title: 'פנס הגן', actionLabel: 'להדליק את הפנס', x: 21, y: 3 },
  { id: 'bench', kind: 'bench', name: 'ספסל בין החורבות', title: 'ספסל בין החורבות', actionLabel: 'לנוח לרגע', x: 9, y: 15 }
];
export const WATER_BOWL = { x: 19, y: 11 };
const flagNames = ['scoutGuided', 'lightsOn', 'waterFilled', 'foxFollowing', 'foxDrinking', 'rabbitCalm', 'rabbitFed', 'rabbitFollowing', 'owlObserved', 'benchRested', 'playerResting'];
const samePoint = (a, b) => a.x === b.x && a.y === b.y;
const validPoint = point => point && Number.isInteger(point.x) && Number.isInteger(point.y) && point.x >= 1 && point.x <= 21 && point.y >= 1 && point.y <= 15;
const copy = value => JSON.parse(JSON.stringify(value));

export function createWorld() {
  return { version: 1, ...Object.fromEntries(flagNames.map(flag => [flag, false])), interactions: {}, dialogue: null,
    fox: { x: 19, y: 7, previous: { x: 19, y: 7 }, startedMs: 0 }, foxMoveMs: 0,
    rabbit: { x: 21, y: 11, previous: { x: 21, y: 11 }, startedMs: 0 }, rabbitMoveMs: 0 };
}
export function normalizeWorld(raw, walkable = () => true, elapsedMs = Infinity) {
  const result = createWorld();
  if (!raw || raw.version !== 1) return result;
  for (const flag of flagNames) result[flag] = raw[flag] === true;
  for (const entity of WORLD_ENTITIES) if (raw.interactions?.[entity.id] === 1) result.interactions[entity.id] = 1;
  if (validPoint(raw.fox) && walkable(raw.fox.x, raw.fox.y)) {
    result.fox = { x: raw.fox.x, y: raw.fox.y,
      previous: validPoint(raw.fox.previous) && walkable(raw.fox.previous.x, raw.fox.previous.y) && Math.abs(raw.fox.previous.x - raw.fox.x) + Math.abs(raw.fox.previous.y - raw.fox.y) <= 1 ? { ...raw.fox.previous } : { x: raw.fox.x, y: raw.fox.y },
      startedMs: Number.isFinite(raw.fox.startedMs) && raw.fox.startedMs >= 0 && raw.fox.startedMs < 1e12 && raw.fox.startedMs <= elapsedMs ? raw.fox.startedMs : 0 };
  }
  result.foxMoveMs = Number.isFinite(raw.foxMoveMs) && raw.foxMoveMs >= 0 && raw.foxMoveMs < 1e12 && raw.foxMoveMs <= elapsedMs ? raw.foxMoveMs : 0;
  if (validPoint(raw.rabbit) && walkable(raw.rabbit.x, raw.rabbit.y)) {
    result.rabbit = { x: raw.rabbit.x, y: raw.rabbit.y,
      previous: validPoint(raw.rabbit.previous) && walkable(raw.rabbit.previous.x, raw.rabbit.previous.y) && Math.abs(raw.rabbit.previous.x - raw.rabbit.x) + Math.abs(raw.rabbit.previous.y - raw.rabbit.y) <= 1 ? { ...raw.rabbit.previous } : { x: raw.rabbit.x, y: raw.rabbit.y },
      startedMs: Number.isFinite(raw.rabbit.startedMs) && raw.rabbit.startedMs >= 0 && raw.rabbit.startedMs < 1e12 && raw.rabbit.startedMs <= elapsedMs ? raw.rabbit.startedMs : 0 };
  }
  result.rabbitMoveMs = Number.isFinite(raw.rabbitMoveMs) && raw.rabbitMoveMs >= 0 && raw.rabbitMoveMs < 1e12 && raw.rabbitMoveMs <= elapsedMs ? raw.rabbitMoveMs : 0;
  result.rabbitFollowing = result.rabbitFollowing && result.rabbitFed;
  result.rabbitCalm = result.rabbitCalm || result.rabbitFed;
  result.foxFollowing = result.foxFollowing && result.waterFilled;
  result.foxDrinking = result.waterFilled && !result.foxFollowing && samePoint(result.fox, WATER_BOWL);
  // Dialogue is reconstructed by the next local interaction; do not render saved arbitrary text.
  return result;
}

export function worldEntityPosition(entity, elapsedMs = 0, world = createWorld()) {
  if (entity.id === 'fox' || entity.id === 'rabbit') {
    const animal = world[entity.id] || createWorld()[entity.id];
    const previous = animal.previous || animal, t = Math.max(0, Math.min(1, (elapsedMs - animal.startedMs) / (entity.id === 'rabbit' ? 420 : 550)));
    return { x: previous.x + (animal.x - previous.x) * t, y: previous.y + (animal.y - previous.y) * t,
      heading: Math.atan2(animal.x - previous.x, animal.y - previous.y), moving: t < 1 && !samePoint(previous, animal) };
  }
  if (entity.path?.length) {
    const step = Math.floor(elapsedMs / 2400) % entity.path.length;
    const from = entity.path[step], to = entity.path[(step + 1) % entity.path.length], t = (elapsedMs % 2400) / 2400;
    return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t, heading: Math.atan2(to.x - from.x, to.y - from.y), moving: true };
  }
  return { x: entity.x, y: entity.y, heading: 0, moving: false };
}

export function nearbyWorldEntity(player, world, elapsedMs = 0) {
  if (!player || !Number.isFinite(player.x) || !Number.isFinite(player.y)) return null;
  return WORLD_ENTITIES.map(entity => ({ entity, position: worldEntityPosition(entity, elapsedMs, world) }))
    .map(item => ({ ...item, distance: Math.abs(item.position.x - player.x) + Math.abs(item.position.y - player.y) }))
    .filter(item => item.distance <= 1.5).sort((a, b) => a.distance - b.distance)[0]?.entity || null;
}

export function interactWorld(world, entityId, player, elapsedMs = 0, intent = 'approach') {
  if (intent !== 'approach' && !(intent === 'feed' && entityId === 'rabbit')) return null;
  const entity = WORLD_ENTITIES.find(entity => entity.id === entityId);
  if (!entity || !player || !Number.isFinite(player.x) || !Number.isFinite(player.y)) return null;
  const position = worldEntityPosition(entity, elapsedMs, world);
  if (Math.abs(position.x - player.x) + Math.abs(position.y - player.y) > 1.5) return null;
  const next = copy(world); next.interactions[entity.id] = 1;
  let text;
  if (entity.id === 'scout') {
    next.scoutGuided = true;
    text = 'שלושה חותמים, ומלכודות קצרות של עד שלוש שאלות. שביל הגן מתחבר לחורבות מדרום — אפשר להקיף ולחזור. סימנתי את הדרך ביומן שלכם.';
  } else if (entity.id === 'keeper') {
    next.lightsOn = true;
    text = 'טוב שהגעתם. הדלקתי בשבילכם את פנסי הגן. ליד החורבות יש משאבה וקערת מים — השועל יעריך את זה.';
  } else if (entity.id === 'pump') {
    next.waterFilled = true;
    text = 'המשאבה זורמת וקערת המים התמלאה. השועל מתקדם אליה בשבילי הגן.';
  } else if (entity.id === 'fox') {
    if (next.waterFilled) {
      next.foxFollowing = true; next.foxDrinking = false;
      text = 'השועל מזהה שעזרתם למלא מים, ומתקרב כדי ללכת אתכם. הוא יישאר על השבילים, במרחק בטוח.';
    } else text = 'השועל מרחרח את האוויר ומביט לכיוון המשאבה. נראה שהוא מחפש מים.';
  } else if (entity.id === 'rabbit') {
    next.rabbitCalm = true;
    if (intent === 'feed') {
      next.rabbitFed = true; next.rabbitFollowing = true;
      text = 'הארנב מכרסם את הגזר. עכשיו יש לכם חבר לדרך — הוא ילך אחריכם בשביל!';
    } else text = next.rabbitFed ? 'הארנב מזהה אתכם ומזיז את האוזניים. הוא ממשיך ללוות אתכם בשביל.' : 'הארנב מתקרב ומרים את האוזניים. לתת לו גזר?';
  } else if (entity.id === 'owl') {
    next.owlObserved = true;
    text = 'הינשוף מסובב את ראשו אל המעבר הצפוני של החורבות. הדרך חוזרת למבוך — זו אינה דרך ללא מוצא.';
  } else if (entity.id === 'lamp') {
    next.lightsOn = true;
    text = 'הפנס נדלק, ואור חם מתפשט לאורך שבילי הגן.';
  } else {
    next.benchRested = true; next.playerResting = true;
    text = 'רגע שקט בין החורבות. שום התקדמות לא אבדה. אפשר לקום ולהמשיך בכל רגע.';
  }
  next.dialogue = { entityId: entity.id, title: entity.name, text };
  return { world: next, notice: text, entity };
}

function updateFox(world, event, routeFinder) {
  if (!world || !event) return world;
  if (event.type === 'move') {
    if (!world.playerResting) return world;
    return { ...world, playerResting: false };
  }
  if (event.type !== 'tick' || !Number.isFinite(event.elapsedMs) || typeof routeFinder !== 'function') return world;
  const target = world.foxFollowing ? event.player : world.waterFilled ? WATER_BOWL : null;
  if (!target) return world;
  const at = { x: world.fox.x, y: world.fox.y }, path = routeFinder(at, target);
  if (!path) return world;
  const followingDistance = world.foxFollowing ? 1 : 0;
  if (path.length <= followingDistance) {
    const drinking = world.waterFilled && !world.foxFollowing && samePoint(at, WATER_BOWL);
    return drinking === world.foxDrinking ? world : { ...world, foxDrinking: drinking };
  }
  if (event.elapsedMs - world.foxMoveMs < 650) return world;
  const point = path[0];
  return { ...world, foxDrinking: false, foxMoveMs: event.elapsedMs,
    fox: { ...point, previous: at, startedMs: event.elapsedMs } };
}


export function updateWorld(world, event, routeFinder) {
  const next = updateFox(world, event, routeFinder);
  if (!next || event?.type !== 'tick' || !Number.isFinite(event.elapsedMs) || typeof routeFinder !== 'function' || !next.rabbitFollowing || !next.rabbitFed || !event.player) return next;
  const rabbit = next.rabbit || createWorld().rabbit;
  const at = { x: rabbit.x, y: rabbit.y }, path = routeFinder(at, event.player);
  if (!path || path.length <= 1 || event.elapsedMs - (next.rabbitMoveMs || 0) < 480) return next;
  // Every committed hop traverses one neighboring walkable tile; rendering interpolates it.
  return { ...next, rabbitMoveMs: event.elapsedMs,
    rabbit: { ...path[0], previous: at, startedMs: event.elapsedMs } };
}
