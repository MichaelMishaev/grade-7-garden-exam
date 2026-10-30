// Cosmetic, per-answer feedback. Never stored with learning progress.
export const ANSWER_REACTION_MS = 900;

export function answerReactionPose(reaction, reducedMotion = false) {
  const neutral = { lift: 0, tilt: 0, headYaw: 0, headPitch: 0, arms: 0 };
  if (!reaction || reducedMotion) return neutral;
  const t = Math.max(0, Math.min(1, reaction.elapsedMs / ANSWER_REACTION_MS));
  const envelope = Math.sin(Math.PI * t);
  if (reaction.correct) return {
    lift: Math.sin(Math.PI * Math.min(1, t * 1.5)) * 0.22 * (1 - t),
    tilt: Math.sin(t * Math.PI * 2) * envelope * 0.06,
    headYaw: 0, headPitch: Math.sin(t * Math.PI * 2) * envelope * 0.16,
    arms: envelope * 0.9,
  };
  return {
    lift: -envelope * 0.05, tilt: 0,
    headYaw: Math.sin(t * Math.PI * 6) * envelope * 0.38,
    headPitch: envelope * 0.16, arms: -envelope * 0.25,
  };
}
