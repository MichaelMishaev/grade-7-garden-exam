import { attemptId } from './browser-crypto.js';
import { normalizeEnvironment } from './environment-state.js';
export const NPCS = [
  { id: 'owl', name: 'נועה', role: 'צוות התוכנה · הספרייה', system: 'מסוף הגישה', color: '#91b6c5', x: -13, z: -9,
    line: 'המסוף נתקע וכולם שולחים לי הוראות שונות. אני צריכה לבדוק מה באמת קרה, לא עוד עשר השערות. אפשר לעבור איתי על הדברים אחד־אחד?',
    choices: ['נקשיב למה שכבר בדקה ונבחר יחד צעד אחד', 'ננסה לשנות הכול בבת אחת', 'נחליט שהיא לא מבינה ונתפוס פיקוד'], need: 0,
    reply: 'מעולה. סוף סוף מישהו שלא מציע לכבות ולהדליק את כל בית הספר.', wrong: 'נועה מצביעה על רשימת הבדיקות. היא מבקשת שיתוף פעולה וסדר, לא עוד רעש.' },
  { id: 'pigeon', name: 'איתי', role: 'צוות הרובוטיקה · החממה', system: 'מערכת הגיבוי', color: '#b5bd9d', x: 13, z: -7,
    line: 'אני מחזיק את בקר הגיבוי כבר רבע שעה, ואף אחד לא שאל אם אני צריך עזרה. לא, הכול בסדר. ברור. רק קצת נגמרות לי הידיים.',
    choices: ['נשאל מה אפשר לקחת ממנו ונתחלק במשימה', 'נגיד לו להפסיק להתלונן', 'נתחיל להסביר לו איך לעבוד מהר יותר'], need: 0,
    reply: 'קחו את החלק של למצוא ציוד. אני אקח את החלק של לא להפיל את הפרויקט של כל הכיתה.', wrong: 'הוא מסתכל על הציוד שבידיים שלו. הבעיה היא עומס, לא חוסר ידע.' },
  { id: 'raccoon', name: 'אדם', role: 'צוות התקשורת · מגדל הקשר', system: 'ערוץ הקשר', color: '#c6aa83', x: 10, z: 14,
    line: 'שמעתם את הרעש מהיער? אני יודע שזאת כנראה חיה. עדיין, מעדיף לא לעבור שם לבד. לא צריך להכריז על זה בקבוצת הכיתה.',
    choices: ['נציע להתקדם יחד ולשמור את זה בינינו', 'נצלם אותו כדי להצחיק את הקבוצה', 'נגיד שאין שום סיבה להרגיש ככה'], need: 0,
    reply: 'תודה. מסתבר שעבודת צוות היא גם לצאת מהמצגת וללכת ביחד.', wrong: 'אדם ביקש חברה ודיסקרטיות. אפשר לעזור בלי לבטל את מה שהוא מרגיש.' }
];
export const EQUIPMENT = [
  { id: 'card', name: 'כרטיס צוות איינשטיין', short: 'כרטיס גישה', x: -21, z: -3, npc: 0, hint: 'על שולחן העבודה שממערב לספרייה, ליד השביל לאגם.', clue: 'על הכרטיס כתוב: צוות איינשטיין — כיתת הייטק. בגב הכרטיס רשומה הערה: נוהל היציאה דורש אימות של שלושת מסופי הפרויקט.', report: 'כרטיס הגישה נמצא. המסוף בספרייה יכול להתחבר עכשיו למערכת התרגול.' },
  { id: 'fuse', name: 'יחידת גיבוי לפרויקט', short: 'יחידת גיבוי', x: 21, z: 3, npc: 1, hint: 'בארגז הציוד שממזרח לחממה. חפשו את הסימון הצהוב.', clue: 'זו יחידת גיבוי לימודית של הרובוטיקה. על המדבקה: מי שלוקח — מחזיר. מתחת, מישהו הוסיף: כן, גם אם זה עובד.', report: 'יחידת הגיבוי נמצאה. איתי יוכל להפעיל את התחנה אחרי בדיקת התרגול.' },
  { id: 'antenna', name: 'אנטנת תחנת הקשר', short: 'אנטנה', x: -8, z: 22, npc: 2, hint: 'ליד עמדת הקשר הישנה, בדרום־מערב המתחם.', clue: 'מחברת פתוחה ליד האנטנה: צוות התקשורת, ז׳ איינשטיין. כששלוש התחנות פעילות, השער חוזר למצב יציאה. ברקע נשמע רעש — הפעם באמת ברווז.', report: 'האנטנה נמצאה. חוזרים לאדם במגדל ומשלימים את בדיקת הקשר.' }
];
export const EXIT = { x: 0, z: -25 };
export const shuffle = (items, rng = Math.random) => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
export function validQuiz(q) {
  return !!q && typeof q.id === 'string' && typeof q.title === 'string' && Array.isArray(q.references) && Array.isArray(q.questions) && q.questions.length > 0 && q.questions.length <= 30
    && new Set(q.questions.map(x => x.id)).size === q.questions.length
    && q.questions.every(x => typeof x.id === 'string' && typeof x.prompt === 'string' && x.type === 'mcq' && Array.isArray(x.choices) && x.choices.length >= 2 && x.choices.every(c => typeof c === 'string')
      && Number.isInteger(x.correct) && x.correct >= 0 && x.correct < x.choices.length && typeof x.explanation?.he === 'string'
      && q.references.some(r => r.id === x.ref?.id && (!x.ref.part || r.parts?.some(p => p.part === x.ref.part))));
}
export function makeRound(quiz, rng = Math.random) {
  if (!validQuiz(quiz)) throw new Error('Invalid quiz');
  const questions = shuffle(quiz.questions, rng).map(q => ({ ...q, options: shuffle(q.choices.map((text, original) => ({ text, original })), rng) }));
  return { quizId: quiz.id, questions, assignments: NPCS.map((_, i) => questions.filter((__, j) => j % 3 === i).map(q => q.id)), environment: normalizeEnvironment(), answers: {}, understood: [], seals: [], items: [], collected: [], elapsed: 0, player: { x: 0, z: 9 }, startedAt: Date.now(), attemptId: attemptId() };
}
export function answer(round, id, original) {
  if (Object.hasOwn(round.answers, id)) return null;
  const q = round.questions.find(q => q.id === id);
  if (!q || !Number.isInteger(original) || original < 0 || original >= q.choices.length) return null;
  const result = { choice: original, correct: original === q.correct };
  round.answers[id] = result;
  return result;
}
export function progress(round, npcIndex) {
  const ids = round.assignments[npcIndex];
  return { answered: ids.filter(id => Object.hasOwn(round.answers, id)).length, total: ids.length, next: ids.find(id => !Object.hasOwn(round.answers, id)) };
}
export function academicScore(round) {
  const weights = { easy: 1, medium: 1.5, hard: 2 };
  const total = round.questions.reduce((n, q) => n + (weights[q.difficulty] || 1.5), 0);
  return Math.round(round.questions.reduce((n, q) => n + (round.answers[q.id]?.correct ? weights[q.difficulty] || 1.5 : 0), 0) / total * 100);
}
export const starsFor = score => score >= 90 ? 3 : score >= 75 ? 2 : score >= 50 ? 1 : 0;
export function canEscape(round) { return round.seals.length === 3 && Object.keys(round.answers).length === round.questions.length; }
export function restoreRound(raw, quiz) {
  try {
    const r = JSON.parse(raw);
    if (!r || r.quizId !== quiz.id || typeof r.attemptId !== 'string' || !Number.isFinite(r.startedAt) || !Number.isFinite(r.elapsed) || r.elapsed < 0 || !Array.isArray(r.questions) || r.questions.length !== quiz.questions.length) return null;
    if (!r.player || !Number.isFinite(r.player.x) || !Number.isFinite(r.player.z) || Math.abs(r.player.x) > 27 || Math.abs(r.player.z) > 27) return null;
    if(r.participantName!==undefined&&(typeof r.participantName!=='string'||!r.participantName.trim()||r.participantName.length>60))return null;
    const ids = new Set();
    for (const q of r.questions) {
      const source = quiz.questions.find(s => s.id === q.id);
      if (!source || ids.has(q.id) || JSON.stringify({ ...q, options: undefined }) !== JSON.stringify(source)) return null;
      ids.add(q.id);
      if (!Array.isArray(q.options) || q.options.length !== source.choices.length || new Set(q.options.map(o => o.original)).size !== q.options.length || q.options.some(o => source.choices[o.original] !== o.text)) return null;
    }
    if (!r.answers || typeof r.answers !== 'object') return null;
    for (const [id, a] of Object.entries(r.answers)) {
      const q = quiz.questions.find(q => q.id === id);
      if (!q || !Number.isInteger(a.choice) || a.choice < 0 || a.choice >= q.choices.length || a.correct !== (a.choice === q.correct)) return null;
    }
    r.assignments = NPCS.map((_, i) => r.questions.filter((__, j) => j % 3 === i).map(q => q.id));
    if (!Array.isArray(r.understood) || r.understood.some(id => !NPCS.some(n => n.id === id))) return null;
    r.items = Array.isArray(r.items) ? [...new Set(r.items.filter(id=>EQUIPMENT.some(e=>e.id===id)))] : [];
    r.seals = NPCS.filter((n, i) => r.understood.includes(n.id) && r.items.includes(EQUIPMENT[i].id) && progress(r, i).answered === progress(r, i).total).map(n => n.id);
    r.collected = Array.isArray(r.collected) ? [...new Set(r.collected.filter(n => Number.isInteger(n) && n >= 0 && n < 12))] : [];
    r.environment = normalizeEnvironment(r.environment);
    return r;
  } catch { return null; }
}
