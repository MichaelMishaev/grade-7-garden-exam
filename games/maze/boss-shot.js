// Presentation only: accepted hits remain authoritative in arcade-core.
export const SHOT_FLIGHT_MS = 240;
export const SHOT_IMPACT_MS = 240;
export const SHOT_DURATION_MS = SHOT_FLIGHT_MS + SHOT_IMPACT_MS;

export function acceptedBossShot(before, after) {
  if (after.boss.hits.length !== before.boss.hits.length + 1) return null;
  return { elapsedMs: 0, from: { ...before.player }, hit: after.boss.hits.length };
}

export function advanceBossShot(shot, ms) {
  if (!shot) return null;
  const elapsedMs = shot.elapsedMs + ms;
  return elapsedMs >= SHOT_DURATION_MS ? null : { ...shot, elapsedMs };
}

export function bossShotPose(shot, reducedMotion = false) {
  if (!shot) return null;
  const flight = Math.min(1, shot.elapsedMs / SHOT_FLIGHT_MS);
  const impact = Math.max(0, (shot.elapsedMs - SHOT_FLIGHT_MS) / SHOT_IMPACT_MS);
  return { flight, impact, inFlight: !reducedMotion && flight < 1,
    impactVisible: reducedMotion || flight >= 1, recoil: reducedMotion ? 0 : Math.sin(impact * Math.PI) * .22 };
}
