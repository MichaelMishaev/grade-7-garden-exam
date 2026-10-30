import snapshot from './content-snapshot.js';

// Maze-only display copy. Canonical prompts, choices, answers and save identities
// remain in the source catalog. Apply a reviewed adaptation only to that exact
// academic question, including restored expeditions and equivalent live content.
const originals = new Map(snapshot.quizzes.flatMap(quiz => quiz.questions).map(question => [question.id, question]));
const presentations = {
  'questions-01': { context: 'רוצים לברר את זמן הקמת הגינה בבית הספר.', prompt: 'באיזו מילת שאלה נשתמש?' },
  'questions-02': { context: 'רוצים לברר את מספר הכיתות שהשתתפו בהקמת הגינה.', prompt: 'באיזו מילת שאלה נשתמש?' },
  'questions-03': { context: 'התלמידים קראו על צמחים לפני השתילה.', prompt: 'איזו מילת שאלה מבקשת סיבה?' },
  'questions-04': { context: 'תלמידים הקימו גינה בבית הספר.', prompt: 'איזו מילת שאלה מבקשת מקום?' },
  'questions-05': { context: 'שלוש כיתות חילקו ביניהן את ימי ההשקיה.', prompt: 'איזו מילת שאלה מבקשת דרך פעולה?' },
  'questions-06': { context: 'עלתה הצעה להוסיף פרחים לגינה.', prompt: 'איזו מילת שאלה מבקשת לזהות אדם?' },
  'instructions-01': { context: 'ההוראה: ״העתיקו מהטקסט עובדה״.', prompt: 'מה צריך לעשות?' },
  'instructions-02': { context: 'ההוראה: ״נמקו״.', prompt: 'מה צריך להוסיף לתשובה?' },
  'instructions-03': { context: 'ההוראה: ״ציינו״.', prompt: 'איזו תשובה מתאימה?' },
  'instructions-04': { context: 'ההוראה: ״הסבירו״.', prompt: 'מה צריך לעשות?' },
  'instructions-05': { context: 'ההוראה: ״נסחו שאלה מלאה״.', prompt: 'איזו תשובה מקיימת את ההוראה?' },
  'instructions-06': { context: 'ההוראה: ״הביעו את דעתכם וכתבו נימוק״.', prompt: 'מה צריך לכתוב?' },
  'physics-pole-01': { context: 'מודדים גובה עמוד בעזרת גליל חלול ומשולש ישר־זווית ושווה־שוקיים.', prompt: 'באיזו זווית לאופק מכוונים לראש העמוד?' },
  'physics-pole-02': { context: 'מביטים לראש עמוד בזווית 45° לאופק, על קרקע אופקית.', prompt: 'מה שווה למרחק האופקי לעמוד?' },
  'physics-pole-03': { context: 'מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 6 מ׳. גובה העיניים: 1.4 מ׳.', prompt: 'מה גובה העמוד?' },
  'physics-pole-04': { context: 'מודדים גובה עמוד בעזרת גליל המכוון לראשו ב־45° לאופק.', prompt: 'איזה מרחק מודדים לצורך החישוב?' },
  'physics-pole-05': { context: 'מביטים לראש עמוד ב־45° לאופק, על קרקע אופקית.', prompt: 'איזה גובה מוסיפים למרחק האופקי?' },
  'physics-pole-06': { context: 'מביטים לראש עמוד ב־45°. מחשבים את גובהו ממרחק אופקי וגובה העיניים.', prompt: 'איזה תנאי קרקע נדרש לחישוב?' },
  'physics-pole-07': { context: 'מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 4 מ׳. גובה העיניים: 1.5 מ׳.', prompt: 'מה גובה העמוד?' },
  'physics-pole-08': { context: 'למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.', prompt: 'מה צריך לראות דרך הגליל?' },
  'physics-pole-09': { context: 'למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.', prompt: 'מה תפקיד המשולש?' },
  'physics-pole-10': { context: 'מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי לעמוד: 5 מ׳.', prompt: 'מה גובה ראש העמוד מעל העיניים?' },
  'physics-pole-11': { context: 'מודדים מרחק אופקי לעמוד וגובה עיניים, ואז מחשבים את גובה העמוד.', prompt: 'למה זו מדידה עקיפה?' }
};

for (const question of snapshot.quizzes.find(quiz => quiz.id === 'facts').questions) {
  presentations[question.id] = { context: question.prompt.slice(0, -' מה זה?'.length), prompt: 'עובדה או דעה?' };
}

function sameAcademicQuestion(question, original) {
  return original && question.prompt === original.prompt && question.correct === original.correct
    && JSON.stringify(question.choices) === JSON.stringify(original.choices)
    && question.ref?.id === original.ref.id && question.ref?.part === original.ref.part;
}

export function questionPresentation(question) {
  const fallback = { prompt: typeof question?.prompt === 'string' ? question.prompt : '', context: '', sourceLabel: '', adapted: false };
  const original = originals.get(question?.id);
  if (!sameAcademicQuestion(question, original)) return fallback;
  const copy = presentations[question.id];
  const sourceLabel = question.ref.id === 'garden-passage' ? 'הגינה בבית הספר' : `מדידות · ${question.ref.part}`;
  return { ...fallback, ...copy, sourceLabel, adapted: !!copy };
}
