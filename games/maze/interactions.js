// Scene-only state: these actions cannot change answers, rewards or recovery.
export const allowedActions = Object.freeze(['look-left', 'look-center', 'look-right', 'lantern', 'rattle', 'inspect']);
export const interactionLabels = Object.freeze({
  'look-left': 'מבט שמאלה', 'look-center': 'מבט קדימה', 'look-right': 'מבט ימינה',
  lantern: 'הרמה / הורדה של הפנס', rattle: 'ניעור הסורגים', inspect: 'בדיקת המנעול',
});
export const interactionHelp = 'אפשר להביט סביב, להרים את הפנס, לנער את הסורגים ולבדוק את המנעול. הדרך להמשיך היא לענות על השאלות.';

const scenePhases = new Set(['question', 'feedback', 'capture', 'review', 'review-feedback']);
const maxYaw = 0.42;
const yawStep = 0.21;
const rattleDuration = 480;

export function createInteractions() {
  return { lookYaw: 0, lanternRaised: false, rattleMs: 0, lockInspected: false, notice: '' };
}

export function reduceInteraction(state, action, context = {}) {
  const type = typeof action === 'string' ? action : action?.type;
  if (type === 'reset') return createInteractions();
  if (context.paused || !scenePhases.has(context.phase)) return state;
  if (type === 'tick') {
    const ms = action.ms ?? action.dt;
    if (!Number.isFinite(ms) || ms <= 0 || state.rattleMs === 0) return state;
    return { ...state, rattleMs: context.reducedMotion ? 0 : Math.max(0, state.rattleMs - ms) };
  }
  if (!allowedActions.includes(type)) return state;
  if (type.startsWith('look-')) {
    const lookYaw = type === 'look-center' ? 0 : Math.max(-maxYaw, Math.min(maxYaw, state.lookYaw + (type === 'look-left' ? yawStep : -yawStep)));
    return { ...state, lookYaw, notice: interactionLabels[type] };
  }
  if (type === 'lantern') {
    const lanternRaised = !state.lanternRaised;
    return { ...state, lanternRaised, notice: lanternRaised ? 'הפנס מורם ומאיר את הסורגים והמנעול.' : 'הפנס הונמך.' };
  }
  if (type === 'rattle') {
    return { ...state, rattleMs: context.reducedMotion ? 0 : rattleDuration, notice: 'הסורגים חזקים. השומר שמע את הרעש והביט לכאן. השאלות הן הדרך החוצה.' };
  }
  const total = Math.max(0, Math.floor(Number(context.total) || 0));
  const answered = Math.min(total, Math.max(0, Math.floor(Number(context.answered) || 0)));
  const reviewStage = Math.max(1, Math.floor(Number(context.reviewIndex) || 0) + 1);
  const notice = context.phase === 'capture'
    ? 'המנעול סגור. שלבי החילוץ ייפתחו מיד; אפשר לדלג על סצנת הלכידה.'
    : context.phase.startsWith('review')
      ? `המנעול מחכה לשלב חילוץ ${reviewStage}. ממשיכים דרך שאלות החזרה.`
      : `נענו ${answered} מתוך ${total} שאלות. המנעול ייפתח בסיום שאלות המלכודת.`;
  return { ...state, lockInspected: true, notice };
}
