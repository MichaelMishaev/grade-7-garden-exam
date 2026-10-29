// Permanent test codes PRA-001… for these quizzes live in practice-history.js (QUIZZES): the mapping is fixed in that
// order (facts, questions, instructions, physics-basics, physics-units, physics-precision, physics-pole) and never
// renumbered. A new quiz here gets the next free code there (db/extract.test.mjs fails until it does).
const quizzes = {
  facts: {
    title: 'עובדה או דעה?',
    description: 'מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.',
    questions: [
      { text: '„בפעילות השתתפו שלוש כיתות.” מה זה?', choices: ['עובדה', 'דעה'], correct: 0, he: 'אפשר לבדוק כמה כיתות השתתפו בפעילות.', en: 'The number of participating classes can be checked.', ref: { id: 'garden-passage', part: 'פסקה 1' } },
      { text: '„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?', choices: ['עובדה', 'דעה'], correct: 1, he: '„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.', en: '“More interesting” is a personal judgment, so this is an opinion.', ref: { id: 'garden-passage', part: 'פסקה 3' } },
      { text: '„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?', choices: ['עובדה', 'דעה'], correct: 0, he: 'אפשר לבדוק אילו צמחים נשתלו בגינה.', en: 'The plants in the garden can be checked.', ref: { id: 'garden-passage', part: 'פסקה 1' } },
      { text: '„נענע היא הצמח הכי מוצלח בגינה.” מה זה?', choices: ['עובדה', 'דעה'], correct: 1, he: '„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.', en: '“The best” is a personal evaluation, not a defined measurable fact here.', ref: { id: 'garden-passage', part: null } },
      { text: '„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?', choices: ['עובדה', 'דעה'], correct: 0, he: 'אפשר לבדוק את לוח ההשקיה של הכיתות.', en: 'The class watering schedule can be checked.', ref: { id: 'garden-passage', part: 'פסקה 1' } },
      { text: '„לדעתי, הפעילות בגינה נהדרת.” מה זה?', choices: ['עובדה', 'דעה'], correct: 1, he: 'המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.', en: 'The word “in my opinion” clearly signals an opinion.', ref: { id: 'garden-passage', part: null } }
    ]
  },
  questions: {
    title: 'מילות שאלה',
    description: 'בוחרים את מילת השאלה המתאימה למידע שמחפשים.',
    questions: [
      { text: 'איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?', choices: ['מתי', 'מי', 'כמה'], correct: 0, he: '„מתי” מבקשת זמן או מועד.', en: '“When” asks about a time or date.', ref: { id: 'garden-passage', part: 'פסקה 1' } },
      { text: 'איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?', choices: ['כיצד', 'כמה', 'היכן'], correct: 1, he: '„כמה” מבקשת מספר או כמות.', en: '“How many” asks for a number or quantity.', ref: { id: 'garden-passage', part: 'פסקה 1' } },
      { text: 'איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?', choices: ['מדוע', 'מתי', 'מי'], correct: 0, he: '„מדוע” מבקשת סיבה: למה עשו זאת?', en: '“Why” asks for the reason something happened.', ref: { id: 'garden-passage', part: 'פסקה 2' } },
      { text: 'איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?', choices: ['כמה', 'היכן', 'כיצד'], correct: 1, he: '„היכן” מבקשת מקום.', en: '“Where” asks about a place.', ref: { id: 'garden-passage', part: 'פסקה 1' } },
      { text: 'איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?', choices: ['כיצד', 'מתי', 'מי'], correct: 0, he: '„כיצד” מבקשת דרך או אופן פעולה.', en: '“How” asks about the way something was done.', ref: { id: 'garden-passage', part: 'פסקה 1' } },
      { text: 'איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?', choices: ['היכן', 'מי', 'מדוע'], correct: 1, he: '„מי” מבקשת לזהות אדם.', en: '“Who” asks which person did something.', ref: { id: 'garden-passage', part: 'פסקה 3' } }
    ]
  },
  instructions: {
    title: 'מבינים הוראות',
    description: 'מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.',
    questions: [
      { text: 'בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?', choices: ['לכתוב את המילים בדיוק כפי שהן בטקסט', 'להמציא עובדה חדשה', 'לכתוב מה חושבים'], correct: 0, he: '„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.', en: '“Copy” means use the wording from the passage.', ref: { id: 'garden-passage', part: null } },
      { text: 'בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?', choices: ['כותרת בלבד', 'סיבה שמסבירה את הבחירה', 'תאריך הפרסום בלבד'], correct: 1, he: '„נמקו” מבקשת לתת סיבה או ראיה לבחירה.', en: '“Justify” asks for a reason or evidence.', ref: { id: 'garden-passage', part: null } },
      { text: 'בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?', choices: ['תשובה קצרה וברורה', 'סיפור ארוך שלא קשור לשאלה', 'שאלה חדשה'], correct: 0, he: '„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.', en: '“State” usually asks for the requested detail briefly.', ref: { id: 'garden-passage', part: null } },
      { text: 'בשאלה כתוב „הסבירו”. מה צריך לעשות?', choices: ['לכתוב מילה אחת בלבד', 'לתאר בפירוט כיצד או מדוע', 'להעתיק את הכותרת'], correct: 1, he: '„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.', en: '“Explain” asks for details about how or why.', ref: { id: 'garden-passage', part: null } },
      { text: 'בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?', choices: ['„שלוש כיתות”', '„כמה כיתות השתתפו בפעילות?”', '„כיתות”'], correct: 1, he: 'שאלה מלאה כוללת מילת שאלה ומשפט שלם.', en: 'A full question includes a question word and a complete sentence.', ref: { id: 'garden-passage', part: null } },
      { text: 'בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?', choices: ['רק עובדה מהטקסט', 'עמדה אישית וסיבה שתומכת בה', 'רק את שם הכותבת'], correct: 1, he: 'צריך לציין מה חושבים ולתת סיבה אחת לפחות.', en: 'State your view and give at least one supporting reason.', ref: { id: 'garden-passage', part: null } }
    ]
  }
};


const physicsLessons = {
  'physics-basics': ['מדידה ושיטות מדידה', 'מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.', [
    ['מה חייבים לציין בתוצאת מדידה?', ['מספר ויחידת מידה', 'מספר בלבד', 'שם כלי המדידה בלבד'], 0, 'תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.', { id: 'physics-pdf', part: 'עמוד 1' }],
    ['מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?', ['ישירה', 'עקיפה', 'לא מדידה'], 0, 'במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.', { id: 'physics-pdf', part: 'עמוד 1' }],
    ['מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?', ['ישירה', 'עקיפה', 'הערכה ללא מדידה'], 1, 'מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.', { id: 'physics-pdf', part: 'עמוד 1' }],
    ['איך מחשבים עובי ממוצע של דף בערימה?', ['עובי הערימה חלקי מספר הדפים', 'מספר הדפים חלקי עובי הערימה', 'עובי הערימה כפול מספר הדפים'], 0, 'מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.', { id: 'physics-pdf', part: 'עמוד 3' }],
    ['ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?', ['0.1 מ״מ', '1 מ״מ', '10 מ״מ'], 0, 'מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.', { id: 'physics-pdf', part: 'עמוד 3' }],
    ['למה כדאי למדוד ערימה של דפים מאותו סוג?', ['כדי להעריך את העובי הממוצע של דף מהסוג הזה', 'כי אין צורך לספור את הדפים', 'כדי לקבל תמיד תוצאה מדויקת לגמרי'], 0, 'דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.', { id: 'physics-pdf', part: 'עמוד 3' }]
  ]],
  'physics-units': ['המרת יחידות אורך', 'מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.', [
    ['כמה סנטימטרים יש במטר אחד?', ['10', '100', '1,000'], 1, 'מטר אחד שווה ל־100 סנטימטרים.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['כמה מילימטרים יש בסנטימטר אחד?', ['10', '100', '1,000'], 0, 'סנטימטר אחד שווה ל־10 מילימטרים.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['כמה מטרים יש ב־2 קילומטרים?', ['200', '2,000', '20,000'], 1, 'קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['כמה סנטימטרים הם 2.4 מטרים?', ['24', '240', '2,400'], 1, 'ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['כמה מטרים הם 350 סנטימטרים?', ['3.5', '35', '0.35'], 0, 'מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['כמה הם מטר אחד ועוד 25 ס״מ?', ['1.25 מטרים', '26 מטרים', '1.025 מטרים'], 0, 'ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.', { id: 'physics-pdf', part: 'עמוד 2' }]
  ]],
  'physics-precision': ['מודדים נכון', 'בוחרים כלי מתאים וקוראים את הסרגל בזהירות.', [
    ['מאיזו נקודה בסרגל מתחילים למדוד אורך?', ['מסימון האפס', 'תמיד מקצה הסרגל', 'מהמספר 1'], 0, 'מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?', ['6.2 ס״מ', '8.2 ס״מ', '10.2 ס״מ'], 0, 'מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?', ['בניצב לסולם', 'באלכסון ככל האפשר', 'ממרחק גדול'], 0, 'מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['איזה כלי מתאים יותר למדידת אורך של חדר?', ['סרט מדידה', 'סרגל קצר בלבד', 'שעון'], 0, 'סרט מדידה מתאים יותר לאורכו של חדר.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['מה מאפשרות שנתות קטנות יותר על כלי מדידה?', ['קריאה מפורטת יותר', 'ביטול מוחלט של כל טעות', 'שינוי האורך של הגוף'], 0, 'שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['מדוע חוזרים על מדידה?', ['כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות', 'כדי לתקן בהכרח כלי פגום', 'כדי לשנות את גודל הגוף'], 0, 'חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.', { id: 'physics-pdf', part: 'עמוד 4' }]
  ]],
  'physics-pole': ['מודדים גובה של עמוד', 'מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.', [
    ['בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?', ['45°', '90°', '180°'], 0, 'מכוונים את קו הראייה בזווית של 45° ביחס לאופק.', { id: 'physics-pdf', part: 'עמוד 5' }],
    ['מה שווה למרחק האופקי לעמוד בשיטת 45°?', ['גובה ראש העמוד מעל גובה העיניים', 'גובה העמוד כולו', 'גובה העיניים'], 0, 'במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.', { id: 'physics-pdf', part: 'עמוד 5' }],
    ['המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?', ['7.4 מטרים', '6 מטרים', '4.6 מטרים'], 0, 'מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.', { id: 'physics-pdf', part: 'עמוד 6' }],
    ['איזה מרחק מודדים לצורך החישוב?', ['המרחק האופקי אל בסיס העמוד', 'אורך קו הראייה האלכסוני', 'המרחק מראש העמוד לקרקע באומדן'], 0, 'מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.', { id: 'physics-pdf', part: 'עמוד 6' }],
    ['איזה גובה מוסיפים למרחק האופקי?', ['גובה העיניים מעל הקרקע', 'גובה התלמיד כולו', 'גובה המשולש שביד'], 0, 'מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.', { id: 'physics-pdf', part: 'עמוד 6' }],
    ['איזה תנאי נדרש לשיטה המתוארת?', ['קרקע אופקית ובסיס העמוד באותו מפלס', 'העמוד חייב להיות נמוך מהתלמיד', 'אין צורך לדעת את זווית הראייה'], 0, 'הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.', { id: 'physics-pdf', part: 'עמוד 5' }]
  ]]
};
const extraPhysicsQuestions = {
  'physics-basics': [
    ['מהי מדידה?', ['השוואה ליחידת מידה מוסכמת', 'ניחוש ללא השוואה', 'כתיבת שם הגוף'], 0, 'מדידה משווה גודל ליחידת מידה מוסכמת.', { id: 'physics-pdf', part: 'עמוד 1' }],
    ['מה מתאים לתיאור אורך עיפרון?', ['14 ס״מ', '14 בלבד', 'ס״מ בלבד'], 0, 'תוצאת מדידה כוללת גם מספר וגם יחידת מידה.', { id: 'physics-pdf', part: 'עמוד 1' }],
    ['איזו פעולה היא מדידה עקיפה?', ['מדידת ערימת דפים וחלוקה במספר הדפים', 'קריאת אורך עיפרון מסרגל', 'קריאת הטמפרטורה ממדחום'], 0, 'מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.', { id: 'physics-pdf', part: 'עמוד 1' }],
    ['ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?', ['0.1 מ״מ', '10 מ״מ', '1 מ״מ'], 0, 'מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.', { id: 'physics-pdf', part: 'עמוד 3' }],
    ['למה מודדים ערימת דפים בלי הכריכה?', ['כדי שהכריכה לא תוסיף עובי לתוצאה', 'כדי לשנות את מספר הדפים', 'כי הכריכה מחליפה את הסרגל'], 0, 'הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.', { id: 'physics-pdf', part: 'עמוד 3' }]
  ],
  'physics-units': [
    ['כמה מילימטרים הם 3 ס״מ?', ['30 מ״מ', '3 מ״מ', '300 מ״מ'], 0, 'כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['כמה סנטימטרים הם 12 מ״מ?', ['1.2 ס״מ', '12 ס״מ', '120 ס״מ'], 0, 'מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['כמה קילומטרים הם 1,500 מטרים?', ['1.5 ק״מ', '15 ק״מ', '0.15 ק״מ'], 0, 'מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['מה ארוך יותר: 90 ס״מ או מטר אחד?', ['מטר אחד', '90 ס״מ', 'הם שווים'], 0, 'מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.', { id: 'physics-pdf', part: 'עמוד 2' }],
    ['מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?', ['האורך נשאר זהה', 'האורך גדל פי 10', 'האורך קטן פי 10'], 0, 'הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.', { id: 'physics-pdf', part: 'עמוד 2' }]
  ],
  'physics-precision': [
    ['גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?', ['6 ס״מ', '9 ס״מ', '12 ס״מ'], 0, 'מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['למה לא תמיד מתחילים למדוד מקצה הסרגל?', ['כי סימון האפס יכול להיות רחוק מהקצה', 'כי הסרגל תמיד מתחיל ב־1', 'כי אסור להשתמש בסימון האפס'], 0, 'חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['איזה כלי מתאים למדידת אורך של עיפרון?', ['סרגל עם שנתות קטנות', 'שעון עצר', 'מדחום'], 0, 'סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['מה חזרה על מדידה אינה מתקנת בהכרח?', ['שיטה שגויה או כלי פגום', 'טעות אקראית בודדת', 'תוצאה חריגה שאפשר לזהות'], 0, 'חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.', { id: 'physics-pdf', part: 'עמוד 4' }],
    ['מה כדאי לבדוק לפני שרושמים תוצאה?', ['את היחידה, נקודת האפס וזווית ההסתכלות', 'רק את צבע כלי המדידה', 'רק את שם הגוף'], 0, 'יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.', { id: 'physics-pdf', part: 'עמוד 4' }]
  ],
  'physics-pole': [
    ['המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?', ['5.5 מטרים', '4 מטרים', '2.5 מטרים'], 0, 'מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.', { id: 'physics-pdf', part: 'עמוד 5' }],
    ['מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?', ['את ראש העמוד', 'את בסיס העמוד בלבד', 'את הקרקע מתחת לעיניים'], 0, 'מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.', { id: 'physics-pdf', part: 'עמוד 6' }],
    ['מהו תפקיד המשולש בעל זווית 45°?', ['לעזור לכוון את הגליל בזווית הנכונה לאופק', 'למדוד ישירות את גובה העמוד', 'למדוד את עובי העמוד'], 0, 'המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.', { id: 'physics-pdf', part: 'עמוד 6' }],
    ['אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?', ['5 מטרים', '10 מטרים', '2.5 מטרים'], 0, 'בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.', { id: 'physics-pdf', part: 'עמוד 5' }],
    ['למה זו מדידה עקיפה?', ['כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד', 'כי קוראים את גובה העמוד ישירות מסרגל', 'כי אין צורך למדוד דבר'], 0, 'גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.', { id: 'physics-pdf', part: 'עמוד 6' }]
  ]
};
for (const [key, questions] of Object.entries(extraPhysicsQuestions)) physicsLessons[key][2].push(...questions);

for (const [key, [title, description, questions]] of Object.entries(physicsLessons)) {
  quizzes[key] = { title, description, questions: questions.map(([text, choices, correct, he, ref]) => ({ text, choices, correct, he, en: '', ref })) };
}

// Study material the questions follow (the same references as the exam versions in subject.html).
const references = {
  'garden-passage': { kind: 'passage', title: 'הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”', url: 'garden-exam.html#article' },
  'physics-pdf': { kind: 'pdf', title: 'סיכום נושא מדידות (PDF)', url: 'assets/materials/physics-measurements-grade-7.pdf' }
};
const sourceIn = { pdf: 'בסיכום', passage: 'בטקסט', site: 'באתר התרגול' };

const byId = id => document.getElementById(id);
const quizKey = new URLSearchParams(location.search).get('quiz');
const inlineQuiz = Object.hasOwn(quizzes, quizKey) ? quizzes[quizKey] : undefined;
let selectedQuiz = inlineQuiz;
// API by default (<meta name="prepx-content-source" content="api"> or ?source=api); ?source=inline forces the inline data.
// Inline data is always the fallback.
const contentSource = new URLSearchParams(location.search).get('source');
const useApi = contentSource !== 'inline' && (contentSource === 'api'
  || document.querySelector('meta[name="prepx-content-source"]')?.content === 'api');
const { NAME_KEY, AUTO_ADVANCE_MS, cleanName, buildPayload, endpointFor, reviewItem } = PracticeHistory;
const { scoreQuiz, starsFor, feedbackTier, shuffled, shuffleChoices, missedQuestions, scheduleReask, streakCelebrates } = QuizCore;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

let roundQuestions = [];
let queue = [];
let results = {};
let position = 0;
let streak = 0;
let answered = false;
let fullRound = true;
let roundAnswers = [];
let picks = [];
let reviewItems = [];
let view = 0;
let advanceTimer;
let posted = false;

const bestKey = `prepx-best-${quizKey}`;
const readBest = () => { try { const raw = localStorage.getItem(bestKey); return /^\d{1,3}$/.test(raw) && Number(raw) <= 100 ? Number(raw) : 0; } catch { return 0; } };
const saveBest = value => { try { localStorage.setItem(bestKey, String(value)); } catch { /* storage unavailable */ } };

// Student name (stored once in this browser) and the best-effort history of finished rounds.
const readName = () => { try { return cleanName(localStorage.getItem(NAME_KEY) || ''); } catch { return ''; } };
const saveName = name => { try { name ? localStorage.setItem(NAME_KEY, name) : localStorage.removeItem(NAME_KEY); } catch { /* storage unavailable */ } };
const nameSkipped = () => { try { return sessionStorage.getItem('prepx-name-skipped') === '1'; } catch { return false; } };
const skipName = () => { try { sessionStorage.setItem('prepx-name-skipped', '1'); } catch { /* storage unavailable */ } };

function renderNameBox() {
  const name = readName();
  const known = Boolean(name);
  byId('name-form').hidden = known || nameSkipped();
  byId('name-current').hidden = !known;
  byId('name-current-text').textContent = known ? `מתרגלים בשם: ${name}` : '';
  byId('name-error').textContent = '';
  byId('history-note').textContent = known
    ? 'התוצאה של כל סבב מלא נשמרת בשם הזה, כדי שאפשר יהיה לראות היסטוריה.'
    : 'בלי שם התוצאה לא נשמרת בהיסטוריה. התרגול עצמו עובד כרגיל.';
}

byId('name-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = cleanName(byId('name-input').value);
  if (!name) { byId('name-error').textContent = 'כתבו שם (עד 60 תווים).'; byId('name-input').focus(); return; }
  saveName(name);
  renderNameBox();
});
byId('name-skip').addEventListener('click', () => { skipName(); renderNameBox(); });
byId('name-change').addEventListener('click', () => {
  byId('name-input').value = readName();
  byId('name-current').hidden = true;
  byId('name-form').hidden = false;
  byId('name-input').focus();
});

// Posts one finished full round, once. Never blocks or breaks the quiz: every failure is swallowed.
function postRound(earned, stars) {
  if (posted || !fullRound) return;
  posted = true;
  const payload = buildPayload({ quizId: quizKey, name: readName(), answers: roundAnswers, score: earned, stars });
  if (!payload) return;
  try {
    fetch(endpointFor(location.hostname), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true })
      .catch(() => {});
  } catch { /* history is best effort */ }
}

async function init() {
  renderNameBox();
  if (useApi && inlineQuiz && window.ContentApi) {
    const { loadContent, quizFromApi, quizMatches } = ContentApi;
    const data = await loadContent(`quizzes/${quizKey}`, null, { valid: quiz => quizMatches(quiz, inlineQuiz.questions.length) });
    if (data) selectedQuiz = quizFromApi(data);
  }
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
}
init();

function startRound(questions, full = true) {
  roundQuestions = questions;
  fullRound = full;
  queue = shuffled(questions).map(q => shuffleChoices(q));
  results = {};
  roundAnswers = [];
  picks = [];
  reviewItems = [];
  clearTimeout(advanceTimer);
  posted = false;
  position = 0;
  streak = 0;
  byId('result-screen').hidden = true;
  byId('confetti').replaceChildren();
  byId('quiz-screen').hidden = false;
  showQuestion();
  byId('question-text').focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

// Shows the question at queue index `index`. The current question (view === position) is answerable until a choice is
// clicked; every answered question, including earlier ones the student went back to, is locked and read-only.
function showQuestion(index = position) {
  view = index;
  answered = picks[view] !== undefined;
  const question = queue[view];
  const total = queue.length;
  const readOnly = view < position;
  byId('progress-count').textContent = `שאלה ${view + 1} מתוך ${total}`;
  byId('question-index').textContent = `${question.reask ? 'שאלה לחזרה' : `שאלה ${view + 1}`}${readOnly ? ' · צפייה בלבד' : ''}`;
  byId('question-text').textContent = question.text;
  byId('feedback').hidden = true;
  byId('feedback').classList.remove('incorrect');
  byId('streak-badge').hidden = true;
  byId('next-button').hidden = !answered;
  byId('next-button').textContent = view === total - 1 ? 'לסיכום התרגול' : 'לשאלה הבאה';
  byId('back-button').hidden = view === 0;
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
  if (answered) showVerdict(question, picks[view], false);
}

function selectChoice(index) {
  if (answered || view !== position) return;
  answered = true;
  picks[position] = index;
  const question = queue[position];
  const correct = index === question.correct;
  // Only the first attempt counts; a re-asked question is for learning, not score.
  if (!question.reask) {
    results[question.id] = correct ? 1 : 0;
    roundAnswers.push({ index: Number(question.id.slice(1)), choice: question.order[index], correct });
    reviewItems.push(reviewItem(question, index));
    streak = correct ? streak + 1 : 0;
    if (!correct) queue = scheduleReask(queue, position, shuffleChoices(question));
  }
  showVerdict(question, index, true);
  byId('next-button').hidden = false;
  byId('next-button').textContent = position === queue.length - 1 ? 'לסיכום התרגול' : 'לשאלה הבאה';
  // The verdict and explanation stay on screen for a moment, then the next question opens by itself.
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(advance, AUTO_ADVANCE_MS);
}

function showVerdict(question, index, fresh) {
  const correct = index === question.correct;
  [...byId('choices').children].forEach((button, choiceIndex) => {
    button.disabled = true;
    if (choiceIndex === question.correct) button.classList.add('correct');
    if (choiceIndex === index && !correct) button.classList.add('incorrect');
  });
  byId('feedback-title').textContent = correct ? 'נכון מאוד!' : 'כמעט!';
  byId('feedback-he').textContent = !correct && !question.reask ? `${question.he} נחזור לשאלה הזאת עוד מעט.` : question.he;
  byId('feedback-en').textContent = question.en ? `${correct ? 'Correct! ' : 'Not quite. '}${question.en}` : '';
  byId('feedback-en').hidden = !question.en;
  showSource(question.ref);
  byId('feedback').classList.toggle('incorrect', !correct);
  byId('feedback').hidden = false;
  byId('streak-badge').hidden = !(fresh && correct && !question.reask && streakCelebrates(streak));
  if (!byId('streak-badge').hidden) byId('streak-badge').textContent = `${streak} ברצף!`;
  if (fresh) byId('feedback').focus({ preventScroll: true });
}

// "מקור: עמוד 3 בסיכום" with a link to the reference, shown after answering.
function showSource(ref) {
  const line = byId('feedback-source');
  const reference = ref && Object.hasOwn(references, ref.id) ? references[ref.id] : null;
  line.hidden = !reference;
  if (!reference) return;
  const link = byId('feedback-source-link');
  link.href = reference.url;
  link.textContent = ref.part ? `${ref.part} ${sourceIn[reference.kind]}` : reference.title;
  if (reference.kind === 'passage') { link.removeAttribute('target'); link.removeAttribute('rel'); }
  else { link.target = '_blank'; link.rel = 'noopener'; }
}

// Moves from the current question to the next one (or to the summary after the last).
function advance() {
  clearTimeout(advanceTimer);
  if (!selectedQuiz || picks[position] === undefined) return;
  if (position < queue.length - 1) {
    position++;
    showQuestion(position);
    byId('question-text').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } else {
    showResult();
  }
}

byId('next-button').addEventListener('click', () => {
  clearTimeout(advanceTimer);
  if (view < position) { showQuestion(view + 1); byId('question-text').focus({ preventScroll: true }); } else advance();
});

// Going back is read-only and pauses the automatic advance; "next" returns forward.
byId('back-button').addEventListener('click', () => {
  clearTimeout(advanceTimer);
  if (view > 0) { showQuestion(view - 1); byId('question-text').focus({ preventScroll: true }); }
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
  const { earned, percent } = scoreQuiz(roundQuestions, results);
  const missed = missedQuestions(roundQuestions, results);
  const correctCount = roundQuestions.length - missed.length;
  const tier = fullRound ? feedbackTier(percent) : 'review';
  const stars = starsFor(percent);
  const previousBest = readBest();
  if (fullRound && earned > previousBest) saveBest(earned);
  postRound(earned, stars);

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
  renderReview();
  byId('missed-button').hidden = missed.length === 0;
  byId('missed-button').textContent = `לחזור רק על הטעויות (${missed.length})`;
  if (tier === 'great' && !reducedMotion) launchConfetti();
  window.scrollTo(0, 0);
  byId('result-title').focus();
}

// Every question of the round with the student's answer, the right answer and the explanation, so the explanations
// that flashed by during the pause are not lost.
function renderReview() {
  const list = byId('review-list');
  list.replaceChildren();
  reviewItems.forEach(item => {
    const li = document.createElement('li');
    li.className = item.correct ? 'review-item right' : 'review-item wrong';
    const add = (tag, text, className, dir) => {
      const el = document.createElement(tag);
      el.textContent = text;
      if (className) el.className = className;
      if (dir) el.dir = dir;
      li.append(el);
    };
    add('strong', item.text);
    add('p', `${item.correct ? '✓ ענית נכון' : '✕ ענית'}: ${item.picked}`);
    if (!item.correct) add('p', `התשובה הנכונה: ${item.right}`);
    add('p', item.he);
    if (item.en) add('p', item.en, 'english', 'ltr');
    list.append(li);
  });
  byId('review').hidden = reviewItems.length === 0;
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
