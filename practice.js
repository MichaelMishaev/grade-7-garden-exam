const quizzes = {
  facts: {
    title: 'עובדה או דעה?',
    description: 'מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.',
    questions: [
      { text: '„בפעילות השתתפו שלוש כיתות.” מה זה?', choices: ['עובדה', 'דעה'], correct: 0, he: 'אפשר לבדוק כמה כיתות השתתפו בפעילות.', en: 'The number of participating classes can be checked.' },
      { text: '„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?', choices: ['עובדה', 'דעה'], correct: 1, he: '„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.', en: '“More interesting” is a personal judgment, so this is an opinion.' },
      { text: '„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?', choices: ['עובדה', 'דעה'], correct: 0, he: 'אפשר לבדוק אילו צמחים נשתלו בגינה.', en: 'The plants in the garden can be checked.' },
      { text: '„נענע היא הצמח הכי מוצלח בגינה.” מה זה?', choices: ['עובדה', 'דעה'], correct: 1, he: '„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.', en: '“The best” is a personal evaluation, not a defined measurable fact here.' },
      { text: '„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?', choices: ['עובדה', 'דעה'], correct: 0, he: 'אפשר לבדוק את לוח ההשקיה של הכיתות.', en: 'The class watering schedule can be checked.' },
      { text: '„לדעתי, הפעילות בגינה נהדרת.” מה זה?', choices: ['עובדה', 'דעה'], correct: 1, he: 'המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.', en: 'The word “in my opinion” clearly signals an opinion.' }
    ]
  },
  questions: {
    title: 'מילות שאלה',
    description: 'בוחרים את מילת השאלה המתאימה למידע שמחפשים.',
    questions: [
      { text: 'איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?', choices: ['מתי', 'מי', 'כמה'], correct: 0, he: '„מתי” מבקשת זמן או מועד.', en: '“When” asks about a time or date.' },
      { text: 'איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?', choices: ['כיצד', 'כמה', 'היכן'], correct: 1, he: '„כמה” מבקשת מספר או כמות.', en: '“How many” asks for a number or quantity.' },
      { text: 'איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?', choices: ['מדוע', 'מתי', 'מי'], correct: 0, he: '„מדוע” מבקשת סיבה: למה עשו זאת?', en: '“Why” asks for the reason something happened.' },
      { text: 'איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?', choices: ['כמה', 'היכן', 'כיצד'], correct: 1, he: '„היכן” מבקשת מקום.', en: '“Where” asks about a place.' },
      { text: 'איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?', choices: ['כיצד', 'מתי', 'מי'], correct: 0, he: '„כיצד” מבקשת דרך או אופן פעולה.', en: '“How” asks about the way something was done.' },
      { text: 'איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?', choices: ['היכן', 'מי', 'מדוע'], correct: 1, he: '„מי” מבקשת לזהות אדם.', en: '“Who” asks which person did something.' }
    ]
  },
  instructions: {
    title: 'מבינים הוראות',
    description: 'מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.',
    questions: [
      { text: 'בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?', choices: ['לכתוב את המילים בדיוק כפי שהן בטקסט', 'להמציא עובדה חדשה', 'לכתוב מה חושבים'], correct: 0, he: '„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.', en: '“Copy” means use the wording from the passage.' },
      { text: 'בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?', choices: ['כותרת בלבד', 'סיבה שמסבירה את הבחירה', 'תאריך הפרסום בלבד'], correct: 1, he: '„נמקו” מבקשת לתת סיבה או ראיה לבחירה.', en: '“Justify” asks for a reason or evidence.' },
      { text: 'בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?', choices: ['תשובה קצרה וברורה', 'סיפור ארוך שלא קשור לשאלה', 'שאלה חדשה'], correct: 0, he: '„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.', en: '“State” usually asks for the requested detail briefly.' },
      { text: 'בשאלה כתוב „הסבירו”. מה צריך לעשות?', choices: ['לכתוב מילה אחת בלבד', 'לתאר בפירוט כיצד או מדוע', 'להעתיק את הכותרת'], correct: 1, he: '„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.', en: '“Explain” asks for details about how or why.' },
      { text: 'בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?', choices: ['„שלוש כיתות”', '„כמה כיתות השתתפו בפעילות?”', '„כיתות”'], correct: 1, he: 'שאלה מלאה כוללת מילת שאלה ומשפט שלם.', en: 'A full question includes a question word and a complete sentence.' },
      { text: 'בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?', choices: ['רק עובדה מהטקסט', 'עמדה אישית וסיבה שתומכת בה', 'רק את שם הכותבת'], correct: 1, he: 'צריך לציין מה חושבים ולתת סיבה אחת לפחות.', en: 'State your view and give at least one supporting reason.' }
    ]
  }
};


const physicsLessons = {
  'physics-basics': ['מדידה ושיטות מדידה', 'מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.', [
    ['מה חייבים לציין בתוצאת מדידה?', ['מספר ויחידת מידה', 'מספר בלבד', 'שם כלי המדידה בלבד'], 0, 'תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.'],
    ['מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?', ['ישירה', 'עקיפה', 'לא מדידה'], 0, 'במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.'],
    ['מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?', ['ישירה', 'עקיפה', 'הערכה ללא מדידה'], 1, 'מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.'],
    ['איך מחשבים עובי ממוצע של דף בערימה?', ['עובי הערימה חלקי מספר הדפים', 'מספר הדפים חלקי עובי הערימה', 'עובי הערימה כפול מספר הדפים'], 0, 'מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.'],
    ['ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?', ['0.1 מ״מ', '1 מ״מ', '10 מ״מ'], 0, 'מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.'],
    ['למה כדאי למדוד ערימה של דפים מאותו סוג?', ['כדי להעריך את העובי הממוצע של דף מהסוג הזה', 'כי אין צורך לספור את הדפים', 'כדי לקבל תמיד תוצאה מדויקת לגמרי'], 0, 'דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.']
  ]],
  'physics-units': ['המרת יחידות אורך', 'מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.', [
    ['כמה סנטימטרים יש במטר אחד?', ['10', '100', '1,000'], 1, 'מטר אחד שווה ל־100 סנטימטרים.'],
    ['כמה מילימטרים יש בסנטימטר אחד?', ['10', '100', '1,000'], 0, 'סנטימטר אחד שווה ל־10 מילימטרים.'],
    ['כמה מטרים יש ב־2 קילומטרים?', ['200', '2,000', '20,000'], 1, 'קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.'],
    ['כמה סנטימטרים הם 2.4 מטרים?', ['24', '240', '2,400'], 1, 'ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.'],
    ['כמה מטרים הם 350 סנטימטרים?', ['3.5', '35', '0.35'], 0, 'מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.'],
    ['כמה הם מטר אחד ועוד 25 ס״מ?', ['1.25 מטרים', '26 מטרים', '1.025 מטרים'], 0, 'ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.']
  ]],
  'physics-precision': ['מודדים נכון', 'בוחרים כלי מתאים וקוראים את הסרגל בזהירות.', [
    ['מאיזו נקודה בסרגל מתחילים למדוד אורך?', ['מסימון האפס', 'תמיד מקצה הסרגל', 'מהמספר 1'], 0, 'מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.'],
    ['גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?', ['6.2 ס״מ', '8.2 ס״מ', '10.2 ס״מ'], 0, 'מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.'],
    ['איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?', ['בניצב לסולם', 'באלכסון ככל האפשר', 'ממרחק גדול'], 0, 'מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.'],
    ['איזה כלי מתאים יותר למדידת אורך של חדר?', ['סרט מדידה', 'סרגל קצר בלבד', 'שעון'], 0, 'סרט מדידה מתאים יותר לאורכו של חדר.'],
    ['מה מאפשרות שנתות קטנות יותר על כלי מדידה?', ['קריאה מפורטת יותר', 'ביטול מוחלט של כל טעות', 'שינוי האורך של הגוף'], 0, 'שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.'],
    ['מדוע חוזרים על מדידה?', ['כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות', 'כדי לתקן בהכרח כלי פגום', 'כדי לשנות את גודל הגוף'], 0, 'חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.']
  ]],
  'physics-pole': ['מודדים גובה של עמוד', 'מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.', [
    ['בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?', ['45°', '90°', '180°'], 0, 'מכוונים את קו הראייה בזווית של 45° ביחס לאופק.'],
    ['מה שווה למרחק האופקי לעמוד בשיטת 45°?', ['גובה ראש העמוד מעל גובה העיניים', 'גובה העמוד כולו', 'גובה העיניים'], 0, 'במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.'],
    ['המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?', ['7.4 מטרים', '6 מטרים', '4.6 מטרים'], 0, 'מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.'],
    ['איזה מרחק מודדים לצורך החישוב?', ['המרחק האופקי אל בסיס העמוד', 'אורך קו הראייה האלכסוני', 'המרחק מראש העמוד לקרקע באומדן'], 0, 'מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.'],
    ['איזה גובה מוסיפים למרחק האופקי?', ['גובה העיניים מעל הקרקע', 'גובה התלמיד כולו', 'גובה המשולש שביד'], 0, 'מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.'],
    ['איזה תנאי נדרש לשיטה המתוארת?', ['קרקע אופקית ובסיס העמוד באותו מפלס', 'העמוד חייב להיות נמוך מהתלמיד', 'אין צורך לדעת את זווית הראייה'], 0, 'הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.']
  ]]
};
const extraPhysicsQuestions = {
  'physics-basics': [
    ['מהי מדידה?', ['השוואה ליחידת מידה מוסכמת', 'ניחוש ללא השוואה', 'כתיבת שם הגוף'], 0, 'מדידה משווה גודל ליחידת מידה מוסכמת.'],
    ['מה מתאים לתיאור אורך עיפרון?', ['14 ס״מ', '14 בלבד', 'ס״מ בלבד'], 0, 'תוצאת מדידה כוללת גם מספר וגם יחידת מידה.'],
    ['איזו פעולה היא מדידה עקיפה?', ['מדידת ערימת דפים וחלוקה במספר הדפים', 'קריאת אורך עיפרון מסרגל', 'קריאת הטמפרטורה ממדחום'], 0, 'מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.'],
    ['ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?', ['0.1 מ״מ', '10 מ״מ', '1 מ״מ'], 0, 'מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.'],
    ['למה מודדים ערימת דפים בלי הכריכה?', ['כדי שהכריכה לא תוסיף עובי לתוצאה', 'כדי לשנות את מספר הדפים', 'כי הכריכה מחליפה את הסרגל'], 0, 'הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.']
  ],
  'physics-units': [
    ['כמה מילימטרים הם 3 ס״מ?', ['30 מ״מ', '3 מ״מ', '300 מ״מ'], 0, 'כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.'],
    ['כמה סנטימטרים הם 12 מ״מ?', ['1.2 ס״מ', '12 ס״מ', '120 ס״מ'], 0, 'מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.'],
    ['כמה קילומטרים הם 1,500 מטרים?', ['1.5 ק״מ', '15 ק״מ', '0.15 ק״מ'], 0, 'מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.'],
    ['מה ארוך יותר: 90 ס״מ או מטר אחד?', ['מטר אחד', '90 ס״מ', 'הם שווים'], 0, 'מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.'],
    ['מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?', ['האורך נשאר זהה', 'האורך גדל פי 10', 'האורך קטן פי 10'], 0, 'הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.']
  ],
  'physics-precision': [
    ['גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?', ['6 ס״מ', '9 ס״מ', '12 ס״מ'], 0, 'מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.'],
    ['למה לא תמיד מתחילים למדוד מקצה הסרגל?', ['כי סימון האפס יכול להיות רחוק מהקצה', 'כי הסרגל תמיד מתחיל ב־1', 'כי אסור להשתמש בסימון האפס'], 0, 'חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.'],
    ['איזה כלי מתאים למדידת אורך של עיפרון?', ['סרגל עם שנתות קטנות', 'שעון עצר', 'מדחום'], 0, 'סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.'],
    ['מה חזרה על מדידה אינה מתקנת בהכרח?', ['שיטה שגויה או כלי פגום', 'טעות אקראית בודדת', 'תוצאה חריגה שאפשר לזהות'], 0, 'חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.'],
    ['מה כדאי לבדוק לפני שרושמים תוצאה?', ['את היחידה, נקודת האפס וזווית ההסתכלות', 'רק את צבע כלי המדידה', 'רק את שם הגוף'], 0, 'יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.']
  ],
  'physics-pole': [
    ['המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?', ['5.5 מטרים', '4 מטרים', '2.5 מטרים'], 0, 'מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.'],
    ['מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?', ['את ראש העמוד', 'את בסיס העמוד בלבד', 'את הקרקע מתחת לעיניים'], 0, 'מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.'],
    ['מהו תפקיד המשולש בעל זווית 45°?', ['לעזור לכוון את הגליל בזווית הנכונה לאופק', 'למדוד ישירות את גובה העמוד', 'למדוד את עובי העמוד'], 0, 'המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.'],
    ['אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?', ['5 מטרים', '10 מטרים', '2.5 מטרים'], 0, 'בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.'],
    ['למה זו מדידה עקיפה?', ['כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד', 'כי קוראים את גובה העמוד ישירות מסרגל', 'כי אין צורך למדוד דבר'], 0, 'גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.']
  ]
};
for (const [key, questions] of Object.entries(extraPhysicsQuestions)) physicsLessons[key][2].push(...questions);

for (const [key, [title, description, questions]] of Object.entries(physicsLessons)) {
  quizzes[key] = { title, description, questions: questions.map(([text, choices, correct, he]) => ({ text, choices, correct, he, en: '' })) };
}

const byId = id => document.getElementById(id);
const quizKey = new URLSearchParams(location.search).get('quiz');
const selectedQuiz = Object.hasOwn(quizzes, quizKey) ? quizzes[quizKey] : undefined;
const { scoreQuiz, starsFor, feedbackTier, shuffled, shuffleChoices, missedQuestions, scheduleReask, streakCelebrates } = QuizCore;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

let roundQuestions = [];
let queue = [];
let results = {};
let position = 0;
let streak = 0;
let answered = false;
let fullRound = true;

const bestKey = `prepx-best-${quizKey}`;
const readBest = () => { try { const raw = localStorage.getItem(bestKey); return /^\d{1,3}$/.test(raw) && Number(raw) <= 100 ? Number(raw) : 0; } catch { return 0; } };
const saveBest = value => { try { localStorage.setItem(bestKey, String(value)); } catch { /* storage unavailable */ } };

if (!selectedQuiz) {
  byId('quiz-title').textContent = 'התרגול לא נמצא';
  byId('quiz-description').textContent = 'חזרו לדף הראשי ובחרו תרגול מהרשימה.';
  byId('progress-count').textContent = '';
  byId('question-text').textContent = '';
  byId('progress-fill').parentElement.hidden = true;
  byId('question-index').hidden = true;
} else {
  if (quizKey.startsWith('physics-')) {
    document.querySelectorAll('a[href="subject.html?subject=hebrew"]').forEach(link => { link.href = 'subject.html?subject=physics'; link.textContent = 'לתרגולים בפיזיקה'; });
  }
  document.title = `${selectedQuiz.title} | PrepX`;
  byId('quiz-title').textContent = selectedQuiz.title;
  byId('quiz-description').textContent = selectedQuiz.description;
  startRound(selectedQuiz.questions.map((q, i) => ({ ...q, id: `q${i}`, type: 'mcq', difficulty: q.difficulty || 'medium' })));
}

function startRound(questions, full = true) {
  roundQuestions = questions;
  fullRound = full;
  queue = shuffled(questions).map(q => shuffleChoices(q));
  results = {};
  position = 0;
  streak = 0;
  byId('result-screen').hidden = true;
  byId('confetti').replaceChildren();
  byId('quiz-screen').hidden = false;
  showQuestion();
  byId('question-text').focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function showQuestion() {
  answered = false;
  const question = queue[position];
  const total = queue.length;
  byId('progress-count').textContent = `שאלה ${position + 1} מתוך ${total}`;
  byId('question-index').textContent = question.reask ? 'שאלה לחזרה' : `שאלה ${position + 1}`;
  byId('question-text').textContent = question.text;
  byId('feedback').hidden = true;
  byId('feedback').classList.remove('incorrect');
  byId('streak-badge').hidden = true;
  byId('next-button').hidden = true;
  byId('next-button').textContent = position === total - 1 ? 'לסיכום התרגול' : 'לשאלה הבאה';
  const progress = Math.round((position / total) * 100);
  byId('progress-fill').style.width = `${progress}%`;
  byId('progress-fill').parentElement.setAttribute('aria-valuenow', String(progress));

  const choices = byId('choices');
  choices.replaceChildren();
  question.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice';
    button.textContent = choice;
    button.addEventListener('click', () => selectChoice(index));
    choices.append(button);
  });
}

function selectChoice(index) {
  if (answered) return;
  answered = true;
  const question = queue[position];
  const correct = index === question.correct;
  // Only the first attempt counts; a re-asked question is for learning, not score.
  if (!question.reask) {
    results[question.id] = correct ? 1 : 0;
    streak = correct ? streak + 1 : 0;
    if (!correct) queue = scheduleReask(queue, position, shuffleChoices(question));
  }

  [...byId('choices').children].forEach((button, choiceIndex) => {
    button.disabled = true;
    if (choiceIndex === question.correct) button.classList.add('correct');
    if (choiceIndex === index && !correct) button.classList.add('incorrect');
  });
  byId('feedback-title').textContent = correct ? 'נכון מאוד!' : 'כמעט!';
  byId('feedback-he').textContent = !correct && !question.reask ? `${question.he} נחזור לשאלה הזאת עוד מעט.` : question.he;
  byId('feedback-en').textContent = question.en ? `${correct ? 'Correct! ' : 'Not quite. '}${question.en}` : '';
  byId('feedback-en').hidden = !question.en;
  byId('feedback').classList.toggle('incorrect', !correct);
  byId('feedback').hidden = false;
  byId('streak-badge').hidden = !(correct && !question.reask && streakCelebrates(streak));
  if (!byId('streak-badge').hidden) byId('streak-badge').textContent = `${streak} ברצף!`;
  byId('next-button').hidden = false;
  byId('feedback').focus({ preventScroll: true });
  byId('next-button').textContent = position === queue.length - 1 ? 'לסיכום התרגול' : 'לשאלה הבאה';
}

byId('next-button').addEventListener('click', () => {
  if (!answered || !selectedQuiz) return;
  if (position < queue.length - 1) {
    position++;
    showQuestion();
    byId('question-text').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } else {
    showResult();
  }
});

const messages = {
  low: 'זו התחלה, ובדיוק בשביל זה מתרגלים! קראו שוב את ההסברים ונסו עוד פעם. בכל ניסיון תשתפרו.',
  ok: 'כל הכבוד! עוד סבב קצר על הטעויות ותגיעו לציון גבוה יותר.',
  great: 'מצוין! שלטתם בחומר. אפשר לבחור תרגול נוסף.',
  review: 'יפה מאוד על החזרה! אפשר לתרגל שוב את כל השאלות ולשפר את הציון.'
};

const messagesEn = {
  low: 'A good start, and that is exactly what practice is for. Read the explanations and try again.',
  ok: 'Well done! One short round on your mistakes will raise your score.',
  great: 'Excellent! You know this material.',
  review: 'Nice work reviewing! Practice all the questions again to improve your score.'
};

function showResult() {
  const { earned } = scoreQuiz(roundQuestions, results);
  const missed = missedQuestions(roundQuestions, results);
  const correctCount = roundQuestions.length - missed.length;
  const tier = fullRound ? feedbackTier(earned) : 'review';
  const stars = starsFor(earned);
  const previousBest = readBest();
  if (fullRound && earned > previousBest) saveBest(earned);

  byId('quiz-screen').hidden = true;
  const panel = byId('result-screen');
  panel.hidden = false;
  panel.dataset.tier = tier;
  byId('result-stars').hidden = !fullRound;
  byId('result-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  byId('result-stars').setAttribute('aria-label', `${stars} כוכבים מתוך 3`);
  byId('result-score').textContent = fullRound ? `${earned} מתוך 100` : `תיקנתם ${correctCount} מתוך ${roundQuestions.length} טעויות`;
  byId('result-count').textContent = fullRound ? `${correctCount} מתוך ${roundQuestions.length} תשובות נכונות בניסיון הראשון` : 'סבב חזרה על הטעויות. הציון הקודם נשמר.';
  byId('confetti').replaceChildren();
  byId('result-message').textContent = messages[tier];
  byId('result-message-en').textContent = messagesEn[tier];
  const improvement = fullRound && previousBest > 0 && earned > previousBest ? earned - previousBest : 0;
  byId('result-improvement').textContent = improvement ? `שיפרתם ב-${improvement} נקודות מהניסיון הטוב ביותר הקודם!` : '';
  byId('result-improvement').hidden = !improvement;
  byId('missed-button').hidden = missed.length === 0;
  byId('missed-button').textContent = `לחזור רק על הטעויות (${missed.length})`;
  if (tier === 'great' && !reducedMotion) launchConfetti();
  window.scrollTo(0, 0);
  byId('result-title').focus();
}

function launchConfetti() {
  const layer = byId('confetti');
  layer.replaceChildren();
  for (let i = 0; i < 18; i++) {
    const piece = document.createElement('span');
    piece.style.setProperty('--x', `${Math.round(Math.random() * 100)}%`);
    piece.style.setProperty('--delay', `${Math.round(Math.random() * 300)}ms`);
    piece.style.setProperty('--hue', String(80 + Math.round(Math.random() * 120)));
    layer.append(piece);
  }
}

byId('retry-button').addEventListener('click', () => startRound(selectedQuiz.questions.map((q, i) => ({ ...q, id: `q${i}`, type: 'mcq', difficulty: q.difficulty || 'medium' }))));
byId('missed-button').addEventListener('click', () => startRound(missedQuestions(roundQuestions, results), false));
