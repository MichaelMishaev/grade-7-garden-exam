import { WORLD_ENTITIES, worldEntityPosition } from './world.js';

const enterDistance = 1.65;
const leaveDistance = 2.35;
const cooldownMs = 12000;
const durationMs = 3400;
const livingKinds = new Set(['human', 'fox', 'rabbit', 'owl']);

export function createGreetings() {
  return { clockMs: 0, sequence: 0, nearby: {}, lastSpoken: {}, active: null };
}

function greetingText(entity, world) {
  if (entity.id === 'scout') return 'היי! אני אורי. צריכים עזרה למצוא דרך?';
  if (entity.id === 'keeper') return 'שלום! אני מיה. ברוכים הבאים לגן.';
  if (entity.id === 'fox') return world?.foxFollowing ? 'השועל מכשכש בזנב ומתקרב אליכם.' : world?.waterFilled ? 'השועל מרים את ראשו ומרחרח לשלום.' : 'השועל מרים אוזניים ומרחרח לעברכם.';
  if (entity.id === 'rabbit') return world?.rabbitCalm ? 'הארנב מזהה אתכם ומציץ מבין השיחים.' : 'הארנב מזקיף אוזניים ומביט בכם.';
  return 'הוּ־הוּ! הינשוף מסובב אליכם את ראשו.';
}

// Greetings are transient scene feedback, never academic progress or saved world
// state. A nearby resident greets once per approach; lingering cannot restart it.
export function advanceGreetings(current, { dt = 0, player, world, elapsedMs = 0, phase = 'explore', paused = false } = {}) {
  if (phase !== 'explore') return current.active ? { ...current, active: null } : current;
  if (paused || !player || !Number.isFinite(player.x) || !Number.isFinite(player.y) || !Number.isFinite(dt) || dt < 0) return current;
  const elapsed = Math.min(dt, 60000), clockMs = current.clockMs + elapsed;
  const next = { ...current, clockMs, nearby: { ...current.nearby }, lastSpoken: { ...current.lastSpoken } };
  next.active = current.active && current.active.remainingMs > elapsed ? { ...current.active, remainingMs: current.active.remainingMs - elapsed } : null;
  if (next.active) {
    const speaker = WORLD_ENTITIES.find(entity => entity.id === next.active.entityId);
    const position = worldEntityPosition(speaker, elapsedMs, world);
    if (Math.abs(position.x - player.x) + Math.abs(position.y - player.y) >= leaveDistance) next.active = null;
  }
  const entering = [];
  for (const entity of WORLD_ENTITIES.filter(entity => livingKinds.has(entity.kind))) {
    const position = worldEntityPosition(entity, elapsedMs, world);
    const distance = Math.abs(position.x - player.x) + Math.abs(position.y - player.y);
    if (distance >= leaveDistance) next.nearby[entity.id] = false;
    else if (distance <= enterDistance && !current.nearby[entity.id]) {
      next.nearby[entity.id] = true;
      if (current.lastSpoken[entity.id] === undefined || clockMs - current.lastSpoken[entity.id] >= cooldownMs) {
        entering.push({ entity, distance });
        // An unheard arrival stays eligible until the current speaker finishes.
        // Otherwise a following animal could permanently swallow an NPC hello.
        next.nearby[entity.id] = false;
      }
    }
  }
  // Keep a readable message stable instead of replacing it as another animal
  // crosses the edge of the greeting radius.
  if (!next.active && entering.length) {
    const { entity } = entering.sort((a, b) => a.distance - b.distance)[0];
    next.sequence++;
    next.nearby[entity.id] = true;
    next.lastSpoken[entity.id] = clockMs;
    next.active = { entityId: entity.id, kind: entity.kind, name: entity.name, text: greetingText(entity, world), sequence: next.sequence, remainingMs: durationMs };
  }
  return next;
}
