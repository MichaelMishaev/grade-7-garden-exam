// Optional campus play never enters the question bank or the academic score.
export const ENVIRONMENT = [
  { id: 'bench', name: 'הספסל ליד האגם', x: -6, z: 10, range: 3, kind: 'rest', description: 'פסק זמן קטן. הספסל לא ישאל מה הספקתם היום.', action: 'לשבת לרגע' },
  { id: 'door', name: 'דלת המבואה', x: -2, z: -15.5, range: 2.8, kind: 'toggle', description: 'הדלת הידנית של המבואה עדיין עובדת. בפנים: מקום שקט ולוח הפרויקט.', action: 'לפתוח את הדלת' },
  { id: 'lamp', name: 'פנס הרחבה', x: -2, z: 10, range: 2.4, kind: 'toggle', description: 'מפסק מקומי. לפחות דבר אחד כאן לא דורש סיסמה.', action: 'לכבות את הפנס' },
  { id: 'basketball', name: 'עמדת הקליעה', x: 12, z: 22, range: 2.8, kind: 'play', description: 'הכדור נמצא על הקו. זריקה רגועה, בלי שעון ובלי טבלת דירוג.', action: 'לזרוק לסל' },
  { id: 'locker', name: 'ארונית צוות איינשטיין', x: -10, z: -13, range: 2.5, kind: 'inspect', description: 'על הדלת: ״ציוד משותף. רעיונות פחות״. בפנים נשאר פתק מסבב העבודה האחרון.', action: 'לפתוח את הארונית' },
  { id: 'noticeboard', name: 'לוח ההאקתון', x: -4, z: 5, range: 2.4, kind: 'clue', description: 'רשימת סוף יום: כרטיס הגישה עבר מערבה מהספרייה; הגיבוי הונח ממזרח למעבדה; האנטנה נשארה בדרום־מערב. אף אחד לא סימן ״החזרתי״.', action: 'לתעד את הרמז ביומן' },
  { id: 'telescope', name: 'עמדת תצפית לאגם', x: -8, z: 16.7, range: 2.5, kind: 'observe', description: 'עדשה מכוונת לאגם. אפשר להתקרב למראה בלי לרדוף אחרי בעלי החיים.', action: 'להביט דרך העדשה' },
  { id: 'water', name: 'קערת המים', x: -8.5, z: 8, range: 2.5, kind: 'care', description: 'קערה נקייה בפינת הטבע. ממלאים מים ונותנים לבעלי החיים לבחור אם להתקרב.', action: 'למלא מים' },
  { id: 'planter', name: 'ערוגת המעבדה', x: 23, z: -6, range: 2.5, kind: 'care', description: 'פרויקט השקיה שעובד גם בלי Wi-Fi. העלים קצת שמוטים; המשפך עדיין כאן.', action: 'להשקות את הערוגה' },
  { id: 'recycling', name: 'פינת המחזור', x: 5, z: 10, range: 2.5, kind: 'help', description: 'שלוש פחיות נשארו אחרי ההאקתון. ״מישהו יאסוף״ עדיין לא הגיע.', action: 'לאסוף את הפחיות למחזור' },
  { id: 'solar', name: 'לוח תאורת השביל', x: 19, z: 8, range: 2.6, kind: 'puzzle', description: 'שלושה מתגים, שלושה סימונים. הדליקו רק ירח ועץ כדי להאיר את פינת הטבע. אין קנס ואין לחץ זמן.', action: 'לכוון את המתגים' },
  { id: 'bike', name: 'עמדת האופניים', x: -21, z: -8.5, range: 2.5, kind: 'play', description: 'הפעמון תקוע בזווית. מיישרים, בודקים צלצול ומקווים שהשומר לא יחשוב שכבר בוקר.', action: 'לבדוק את הפעמון' }
];

export function normalizeEnvironment(input = {}) {
  const s = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  const count = key => Number.isSafeInteger(s[key]) ? Math.max(0, Math.min(9999, s[key])) : 0;
  const ids = list => Array.isArray(list) ? [...new Set(list.filter(id => ENVIRONMENT.some(e => e.id === id)))] : [];
  return { visited: ids(s.visited), doorOpen: s.doorOpen === true, lampOn: s.lampOn !== false,
    lockerOpen: s.lockerOpen === true, waterFilled: s.waterFilled === true, watered: s.watered === true,
    recycled: s.recycled === true, switches: [0,1,2].map(i => Array.isArray(s.switches) && s.switches[i] === true),
    shots: count('shots'), observations: count('observations'), bells: count('bells'),
    helped: Array.isArray(s.helped) ? [...new Set(s.helped.filter(id => ['owl','pigeon','raccoon'].includes(id)))] : [],
    animalNotes: Array.isArray(s.animalNotes) ? [...new Set(s.animalNotes.filter(i => Number.isInteger(i) && i >= 0 && i < 19))] : [],
    following: Number.isInteger(s.following) && s.following >= 0 && s.following < 16 ? s.following : null,
    seated: s.seated === true };
}
export const puzzleSolved = s => s.switches[0] && !s.switches[1] && s.switches[2];
export function environmentStatus(e, s) {
  return ({ bench: s.seated ? 'יושבים' : 'פנוי', door: s.doorOpen ? 'פתוחה' : 'סגורה', lamp: s.lampOn ? 'דולק' : 'כבוי', basketball: `${s.shots} קליעות`, locker: s.lockerOpen ? 'פתוחה' : 'סגורה', noticeboard: s.visited.includes('noticeboard') ? 'הרמז תועד' : 'רמז חדש', telescope: `${s.observations} תצפיות`, water: s.waterFilled ? 'הקערה מלאה' : 'הקערה ריקה', planter: s.watered ? 'הערוגה הושקתה' : 'זקוקה למים', recycling: s.recycled ? 'הרחבה נקייה' : '3 פחיות בשטח', solar: puzzleSolved(s) ? 'השביל מואר' : 'התאורה כבויה', bike: `${s.bells} צלצולים` })[e.id];
}
export function environmentAction(e, s) {
  return ({ bench: s.seated ? 'לקום ולהמשיך' : e.action, door: s.doorOpen ? 'לסגור את הדלת' : e.action, lamp: s.lampOn ? e.action : 'להדליק את הפנס', locker: s.lockerOpen ? 'לסגור את הארונית' : e.action, water: s.waterFilled ? 'לצפות ליד קערת המים' : e.action, planter: s.watered ? 'לבדוק את העלים' : e.action, recycling: s.recycled ? 'לבדוק את הפינה הנקייה' : e.action, noticeboard: s.visited.includes('noticeboard') ? 'לקרוא שוב את הרמז' : e.action })[e.id] || e.action;
}

// Static parts join the world's existing material batches. Only moving parts stay separate.
