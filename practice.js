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


// Teacher chapters copied verbatim; physics-practice.test.mjs checks the original fixture.
const physicsLessons = {
  "physics-basics": {
    "title": "יחידות וסדרי גודל",
    "description": "בפיזיקה מתארים תכונות של גופים באמצעות גדלים מדידים. בחלק זה תבחרו יחידות המתאימות לאורכים שונים ותשוו בין גדלים מהעולם שסביבנו. קראו את כל תיאור המצב לפני בחירת התשובה.",
    "questions": [
      {
        "text": "תלמידים מכינים תערוכה בבית הספר ומתבקשים לבחור לכל מדידה את יחידת האורך המתאימה ביותר. אין צורך לבצע חישוב.<br><br>באיזו יחידה נוח לתאר את עוביו של כרטיס פלסטיק?",
        "type": "mcq",
        "correct": 0,
        "he": "כרטיס פלסטיק דק מאוד. מילימטר מתאים לתיאור עובי קטן כזה, בלי להשתמש בשבר קטן מאוד של מטר.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "לצורך התקנת וילון מודדים את גובה החלון בכיתה, שהוא מעט יותר מיחידה אחת של מטר. באיזו יחידה נוח לתאר את הגובה?",
        "type": "mcq",
        "correct": 2,
        "he": "גובה חלון הוא בסדר גודל של מטרים. לכן מטר הוא יחידה נוחה כאן.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "קבוצת תלמידים מתכננת נסיעה מנתניה לחיפה. באיזו יחידה נוח לתאר את המרחק בין הערים?",
        "type": "mcq",
        "correct": 3,
        "he": "מרחק בין ערים הוא לרוב עשרות קילומטרים. תיאור בקילומטרים נותן מספר נוח לקריאה ולהשוואה.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "לצורך עטיפת ספר לימוד רוצים למדוד את אורכו. באיזו יחידה נוח למסור את התוצאה?",
        "type": "mcq",
        "correct": 1,
        "he": "אורך ספר לימוד הוא לרוב כמה עשרות סנטימטרים, ולכן סנטימטר מתאים.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "במסגרת פרויקט נמדד גובה עמוד התאורה שבחצר בית הספר. באיזו יחידה נוח לתאר את הגובה?",
        "type": "mcq",
        "correct": 2,
        "he": "גובה עמוד תאורה הוא בדרך כלל כמה מטרים. מטר היא היחידה הנוחה מתוך האפשרויות.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "שני תלמידים דיווחו על תוצאת מדידה: האחד כתב רק 35, והאחר כתב 35 סנטימטרים. מדוע חשוב לציין יחידה לצד תוצאת המדידה? הסבירו מה חסר בדיווח הראשון.",
        "type": "open",
        "correct": "המספר לבדו אינו מבהיר מהו האורך שנמדד.",
        "he": "תשובה לדוגמה: בלי יחידה אי אפשר לדעת אם הכוונה ל־35 מ״מ, ס״מ או מטרים. אלה אורכים שונים מאוד.<br><strong>בדקו:</strong> האם ציינתם שלמספר וליחידה יש משמעות משותפת? האם הסברתם את אי־הבהירות?",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        }
      },
      {
        "text": "לפניכם חמישה גדלים: עובי שערה, אורך גרגר אורז, גובה ילד, גובה מגדל מים וקוטר הירח. בחרו את הסדר מהקטן ביותר לגדול ביותר.",
        "type": "mcq",
        "correct": 0,
        "he": "שערה דקה מגרגר אורז; גרגר אורז קצר מגובה ילד; מגדל מים גבוה מילד; קוטר הירח גדול בהרבה מגובה המגדל.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "שערה ← גרגר אורז ← ילד ← מגדל מים ← הירח",
          "גרגר אורז ← שערה ← ילד ← מגדל מים ← הירח",
          "שערה ← ילד ← גרגר אורז ← הירח ← מגדל מים"
        ]
      },
      {
        "text": "באיזו יחידה מבין האפשרויות נוח לתאר את עובייה של שערה?",
        "type": "mcq",
        "correct": 0,
        "he": "עובי שערה קטן ממילימטר, אך אפשר לתאר אותו כשבר עשרוני של מילימטר. מבין היחידות הנתונות, זו היחידה הנוחה.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "באיזו יחידה נוח לתאר את גובהו של ילד, כאשר רוצים לציין מספר שלם בלי שבר עשרוני?",
        "type": "mcq",
        "correct": 1,
        "he": "למשל 145 ס״מ. מטר יכול לתאר את אותו אורך, אך בדרך כלל נדרש בו שבר עשרוני. שימו לב לתנאי שבשאלה.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "באיזו יחידה נוח לתאר את קוטר הירח?",
        "type": "mcq",
        "correct": 3,
        "he": "זהו אורך גדול מאוד, ולכן קילומטר מתאים יותר ממטר, מסנטימטר או ממילימטר.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        },
        "choices": [
          "מילימטר",
          "סנטימטר",
          "מטר",
          "קילומטר"
        ]
      },
      {
        "text": "תלמיד טוען שאפשר לתאר את המרחק בין שתי ערים גם במילימטרים. הטענה נכונה מבחינה מתמטית. למרות זאת, מדוע תיאור כזה אינו נוח לשימוש?",
        "type": "open",
        "correct": "המספר שיתקבל גדול מאוד וקשה יותר לקרוא ולהשוות אותו.",
        "he": "תשובה לדוגמה: במילימטרים מתקבל מספר גדול מאוד עם ספרות רבות, ולכן קל יותר לטעות בקריאה או בכתיבה. קילומטרים מאפשרים תיאור נוח יותר.<br><strong>בדקו:</strong> האם הבהרתם שההמרה אפשרית, אך היחידה פחות נוחה?",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 1"
        }
      }
    ]
  },
  "physics-units": {
    "title": "המרות יחידות",
    "description": "בהמרת יחידות האורך עצמו אינו משתנה, אלא המספר והיחידה שבהם מתארים אותו. זכרו: מטר אחד הוא 100 סנטימטרים; סנטימטר אחד הוא 10 מילימטרים; קילומטר אחד הוא 1,000 מטרים. בכל סעיף כתבו את התוצאה ביחידה המבוקשת. אפשר לכתוב דרך חישוב בשדה שמתחת לתשובה.",
    "questions": [
      {
        "text": "סרט בד שאורכו 3.25 מטרים נועד לקישוט הכיתה. השלימו את אורכו בסנטימטרים.",
        "type": "fill",
        "correct": {
          "value": 325,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "ממטרים לסנטימטרים כופלים ב־100: <bdi dir=\"ltr\">3.25 × 100 = 325</bdi> ס״מ.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 2"
        },
        "notes": true
      },
      {
        "text": "אורכו של חבל הוא 570 סנטימטרים. מהו אורכו במטרים?",
        "type": "fill",
        "correct": {
          "value": 5.7,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "מסנטימטרים למטרים מחלקים ב־100: <bdi dir=\"ltr\">570 ÷ 100 = 5.7</bdi> מטרים.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 2"
        },
        "notes": true
      },
      {
        "text": "קבוצת תלמידים צעדה במסלול שאורכו 2.4 קילומטרים. מה אורך המסלול במטרים?",
        "type": "fill",
        "correct": {
          "value": 2400,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "מקילומטרים למטרים כופלים ב־1,000: <bdi dir=\"ltr\">2.4 × 1,000 = 2,400</bdi> מטרים.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 2"
        },
        "notes": true
      },
      {
        "text": "אורך בורג הוא 96 מילימטרים. מה אורכו בסנטימטרים?",
        "type": "fill",
        "correct": {
          "value": 9.6,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "ממילימטרים לסנטימטרים מחלקים ב־10: <bdi dir=\"ltr\">96 ÷ 10 = 9.6</bdi> ס״מ.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 2"
        },
        "notes": true
      },
      {
        "text": "לקראת תערוכה מכינים שלט שאורכו צריך להיות 0.85 מטר. בית הדפוס מבקש לקבל את המידה בסנטימטרים. איזו מידה תמסרו לבית הדפוס? כתבו מספר בסנטימטרים והציגו דרך חישוב.",
        "type": "fill",
        "correct": {
          "value": 85,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "<bdi dir=\"ltr\">0.85 × 100 = 85</bdi> ס״מ. אין לשנות את הגודל המתוכנן של השלט, רק את היחידה שבה הוא מתואר.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 2"
        },
        "notes": true
      }
    ]
  },
  "physics-precision": {
    "title": "מודדים כמו פיזיקאים",
    "description": "לא תמיד אפשר לקרוא את הגודל המבוקש ישירות מן הסרגל. בחלק זה תחשבו על נקודת תחילת המדידה, על מדידת אוסף עצמים ועל חישוב הגודל של עצם יחיד. קראו את תיאור הניסוי והבחינו בין הגודל הכולל ובין הגודל של פריט אחד.",
    "questions": [
      {
        "text": "רצועת פלסטיק הונחה על סרגל, אך הקצה השמאלי שלה אינו בנקודת 0. התבוננו באיור וקבעו את אורך הרצועה בסנטימטרים. כתבו גם כיצד חישבתם את האורך.",
        "type": "fill",
        "correct": {
          "value": 5.8,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "הקצה השמאלי נמצא ב־2.4 ס״מ והקצה הימני ב־8.2 ס״מ. האורך הוא ההפרש: <bdi dir=\"ltr\">8.2 − 2.4 = 5.8</bdi> ס״מ. הקריאה בקצה הימני לבדה אינה אורך הרצועה.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 3"
        },
        "figure": "<svg class=\"diagram\" viewBox=\"0 0 760 220\" role=\"img\" aria-label=\"סרגל בסנטימטרים שעליו רצועה כתומה\"><rect x=\"40\" y=\"110\" width=\"660\" height=\"60\" rx=\"7\" fill=\"#fff1cf\"/><path d=\"M50.0 110v24\" stroke=\"#85653c\"/><text x=\"50.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">0</text><path d=\"M56.4 110v7\" stroke=\"#85653c\"/><path d=\"M62.8 110v7\" stroke=\"#85653c\"/><path d=\"M69.2 110v7\" stroke=\"#85653c\"/><path d=\"M75.6 110v7\" stroke=\"#85653c\"/><path d=\"M82.0 110v14\" stroke=\"#85653c\"/><path d=\"M88.4 110v7\" stroke=\"#85653c\"/><path d=\"M94.80000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M101.2 110v7\" stroke=\"#85653c\"/><path d=\"M107.6 110v7\" stroke=\"#85653c\"/><path d=\"M114.0 110v24\" stroke=\"#85653c\"/><text x=\"114.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">1</text><path d=\"M120.4 110v7\" stroke=\"#85653c\"/><path d=\"M126.80000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M133.2 110v7\" stroke=\"#85653c\"/><path d=\"M139.60000000000002 110v7\" stroke=\"#85653c\"/><path d=\"M146.0 110v14\" stroke=\"#85653c\"/><path d=\"M152.4 110v7\" stroke=\"#85653c\"/><path d=\"M158.8 110v7\" stroke=\"#85653c\"/><path d=\"M165.2 110v7\" stroke=\"#85653c\"/><path d=\"M171.60000000000002 110v7\" stroke=\"#85653c\"/><path d=\"M178.0 110v24\" stroke=\"#85653c\"/><text x=\"178.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">2</text><path d=\"M184.4 110v7\" stroke=\"#85653c\"/><path d=\"M190.8 110v7\" stroke=\"#85653c\"/><path d=\"M197.20000000000002 110v7\" stroke=\"#85653c\"/><path d=\"M203.60000000000002 110v7\" stroke=\"#85653c\"/><path d=\"M210.0 110v14\" stroke=\"#85653c\"/><path d=\"M216.4 110v7\" stroke=\"#85653c\"/><path d=\"M222.8 110v7\" stroke=\"#85653c\"/><path d=\"M229.20000000000002 110v7\" stroke=\"#85653c\"/><path d=\"M235.60000000000002 110v7\" stroke=\"#85653c\"/><path d=\"M242.0 110v24\" stroke=\"#85653c\"/><text x=\"242.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">3</text><path d=\"M248.4 110v7\" stroke=\"#85653c\"/><path d=\"M254.8 110v7\" stroke=\"#85653c\"/><path d=\"M261.20000000000005 110v7\" stroke=\"#85653c\"/><path d=\"M267.6 110v7\" stroke=\"#85653c\"/><path d=\"M274.0 110v14\" stroke=\"#85653c\"/><path d=\"M280.4 110v7\" stroke=\"#85653c\"/><path d=\"M286.8 110v7\" stroke=\"#85653c\"/><path d=\"M293.20000000000005 110v7\" stroke=\"#85653c\"/><path d=\"M299.6 110v7\" stroke=\"#85653c\"/><path d=\"M306.0 110v24\" stroke=\"#85653c\"/><text x=\"306.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">4</text><path d=\"M312.40000000000003 110v7\" stroke=\"#85653c\"/><path d=\"M318.8 110v7\" stroke=\"#85653c\"/><path d=\"M325.2 110v7\" stroke=\"#85653c\"/><path d=\"M331.6 110v7\" stroke=\"#85653c\"/><path d=\"M338.0 110v14\" stroke=\"#85653c\"/><path d=\"M344.40000000000003 110v7\" stroke=\"#85653c\"/><path d=\"M350.8 110v7\" stroke=\"#85653c\"/><path d=\"M357.20000000000005 110v7\" stroke=\"#85653c\"/><path d=\"M363.6 110v7\" stroke=\"#85653c\"/><path d=\"M370.0 110v24\" stroke=\"#85653c\"/><text x=\"370.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">5</text><path d=\"M376.40000000000003 110v7\" stroke=\"#85653c\"/><path d=\"M382.8 110v7\" stroke=\"#85653c\"/><path d=\"M389.20000000000005 110v7\" stroke=\"#85653c\"/><path d=\"M395.6 110v7\" stroke=\"#85653c\"/><path d=\"M402.0 110v14\" stroke=\"#85653c\"/><path d=\"M408.40000000000003 110v7\" stroke=\"#85653c\"/><path d=\"M414.8 110v7\" stroke=\"#85653c\"/><path d=\"M421.20000000000005 110v7\" stroke=\"#85653c\"/><path d=\"M427.6 110v7\" stroke=\"#85653c\"/><path d=\"M434.0 110v24\" stroke=\"#85653c\"/><text x=\"434.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">6</text><path d=\"M440.40000000000003 110v7\" stroke=\"#85653c\"/><path d=\"M446.8 110v7\" stroke=\"#85653c\"/><path d=\"M453.20000000000005 110v7\" stroke=\"#85653c\"/><path d=\"M459.6 110v7\" stroke=\"#85653c\"/><path d=\"M466.0 110v14\" stroke=\"#85653c\"/><path d=\"M472.40000000000003 110v7\" stroke=\"#85653c\"/><path d=\"M478.8 110v7\" stroke=\"#85653c\"/><path d=\"M485.20000000000005 110v7\" stroke=\"#85653c\"/><path d=\"M491.6 110v7\" stroke=\"#85653c\"/><path d=\"M498.0 110v24\" stroke=\"#85653c\"/><text x=\"498.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">7</text><path d=\"M504.40000000000003 110v7\" stroke=\"#85653c\"/><path d=\"M510.8 110v7\" stroke=\"#85653c\"/><path d=\"M517.2 110v7\" stroke=\"#85653c\"/><path d=\"M523.6 110v7\" stroke=\"#85653c\"/><path d=\"M530.0 110v14\" stroke=\"#85653c\"/><path d=\"M536.4000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M542.8 110v7\" stroke=\"#85653c\"/><path d=\"M549.2 110v7\" stroke=\"#85653c\"/><path d=\"M555.6 110v7\" stroke=\"#85653c\"/><path d=\"M562.0 110v24\" stroke=\"#85653c\"/><text x=\"562.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">8</text><path d=\"M568.4 110v7\" stroke=\"#85653c\"/><path d=\"M574.8000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M581.2 110v7\" stroke=\"#85653c\"/><path d=\"M587.6 110v7\" stroke=\"#85653c\"/><path d=\"M594.0 110v14\" stroke=\"#85653c\"/><path d=\"M600.4 110v7\" stroke=\"#85653c\"/><path d=\"M606.8000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M613.2 110v7\" stroke=\"#85653c\"/><path d=\"M619.6 110v7\" stroke=\"#85653c\"/><path d=\"M626.0 110v24\" stroke=\"#85653c\"/><text x=\"626.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">9</text><path d=\"M632.4 110v7\" stroke=\"#85653c\"/><path d=\"M638.8000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M645.2 110v7\" stroke=\"#85653c\"/><path d=\"M651.6 110v7\" stroke=\"#85653c\"/><path d=\"M658.0 110v14\" stroke=\"#85653c\"/><path d=\"M664.4000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M670.8000000000001 110v7\" stroke=\"#85653c\"/><path d=\"M677.2 110v7\" stroke=\"#85653c\"/><path d=\"M683.6 110v7\" stroke=\"#85653c\"/><path d=\"M690.0 110v24\" stroke=\"#85653c\"/><text x=\"690.0\" y=\"158\" text-anchor=\"middle\" font-size=\"18\">10</text><rect x=\"203.6\" y=\"66\" width=\"371.2\" height=\"30\" rx=\"6\" fill=\"#ee9b47\"/><path d=\"M203.6 64V110M574.8 64V110\" stroke=\"#b26030\" stroke-dasharray=\"4 3\"/><text x=\"380\" y=\"35\" text-anchor=\"middle\">רצועת פלסטיק</text><text x=\"380\" y=\"202\" text-anchor=\"middle\">המספרים על הסרגל מציינים סנטימטרים</text></svg>",
        "notes": true
      },
      {
        "text": "בספרייה רוצים לדעת את עוביו של דף אחד. כדי להימנע ממדידת דף דק יחיד, מדדו ערימה של 250 דפים, ללא הכריכות, וקיבלו עובי כולל של 22.5 מילימטרים. חשבו את עוביו הממוצע של דף אחד במילימטרים והציגו דרך חישוב.",
        "type": "fill",
        "correct": {
          "value": 0.09,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "מחלקים את עובי הערימה במספר הדפים: <bdi dir=\"ltr\">22.5 ÷ 250 = 0.09</bdi> מ״מ לדף. אין לכפול במספר הדפים. הנתון הוא מספר דפים, ולא מספר עמודים מודפסים.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 3"
        },
        "figure": "<svg class=\"diagram\" viewBox=\"0 0 600 180\" role=\"img\" aria-label=\"ערימת דפים ללא כריכות, 250 דפים בעובי 22.5 מילימטר\"><rect x=\"150\" y=\"30\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"36\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"42\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"48\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"54\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"60\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"66\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"72\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"78\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"84\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"90\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"96\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"102\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"108\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"114\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><rect x=\"150\" y=\"120\" width=\"230\" height=\"5\" fill=\"white\" stroke=\"#477b98\"/><path d=\"M420 30V125m-6 -89l6 -6 6 6m-12 83l6 6 6 -6\" fill=\"none\" stroke=\"#5d4a9c\" stroke-width=\"2\"/><text x=\"480\" y=\"85\" text-anchor=\"middle\">22.5 מ״מ</text><text x=\"260\" y=\"160\" text-anchor=\"middle\">250 דפים ללא כריכות</text></svg>",
        "notes": true
      },
      {
        "text": "המירו את העובי הממוצע של דף אחד שמצאתם בסעיף הקודם לסנטימטרים.",
        "type": "fill",
        "correct": {
          "value": 0.009,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "מספר המילימטרים מחולק ב־10: <bdi dir=\"ltr\">0.09 ÷ 10 = 0.009</bdi> ס״מ. במעבר ליחידה גדולה יותר הערך המספרי קטן.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 3"
        },
        "notes": true,
        "context": "בספרייה רוצים לדעת את עוביו של דף אחד. כדי להימנע ממדידת דף דק יחיד, מדדו ערימה של 250 דפים, ללא הכריכות, וקיבלו עובי כולל של 22.5 מילימטרים. חשבו את עוביו הממוצע של דף אחד במילימטרים והציגו דרך חישוב."
      },
      {
        "text": "תלמיד אחר ניסה למדוד דף יחיד בעזרת סרגל שהמרווח הקטן ביותר המסומן עליו הוא מילימטר אחד. הוא דיווח שעובי הדף הוא 1 מילימטר. איזו תוצאה צפויה להיות אמינה יותר: מדידת הדף היחיד או מדידת הערימה וחלוקה במספר הדפים? הסבירו.",
        "type": "open",
        "correct": "מדידת הערימה וחלוקה במספר הדפים צפויה להיות אמינה יותר.",
        "he": "תשובה לדוגמה: דף יחיד דק בהרבה ממילימטר, ולכן קשה למדוד אותו בסרגל הזה. ערימה יוצרת עובי כולל גדול יותר שקל לקרוא. חלוקה במספר הדפים נותנת עובי ממוצע ומקטינה את השפעת שגיאת הקריאה היחסית.<br><strong>בדקו:</strong> ציינתם את מגבלת הסרגל, את היתרון במדידת ערימה ואת החלוקה במספר הדפים?",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 3"
        }
      },
      {
        "text": "תלמידה רוצה למדוד את עוביו של תיל דק, אך אין ברשותה מכשיר מיוחד. היא כורכת את התיל בצפיפות סביב עיפרון. 20 ליפופים צמודים, ללא רווחים וללא חפיפה, תופסים יחד רוחב של 8 מילימטרים. חשבו את עובי התיל במילימטרים.",
        "type": "fill",
        "correct": {
          "value": 0.4,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "20 ליפופים מייצגים 20 פעמים את עובי התיל. לכן <bdi dir=\"ltr\">8 ÷ 20 = 0.4</bdi> מ״מ. יש למדוד לרוחב הליפופים, לאורך העיפרון, ולא את אורך התיל המלופף.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 3"
        },
        "figure": "<svg class=\"diagram\" viewBox=\"0 0 600 160\" role=\"img\" aria-label=\"20 ליפופים צמודים של תיל סביב עיפרון\"><rect x=\"70\" y=\"50\" width=\"450\" height=\"36\" rx=\"9\" fill=\"#ffe6aa\"/><path d=\"M155 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M165 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M175 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M185 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M195 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M205 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M215 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M225 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M235 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M245 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M255 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M265 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M275 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M285 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M295 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M305 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M315 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M325 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M335 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M345 40v57\" stroke=\"#087c83\" stroke-width=\"5\"/><path d=\"M150 116h200\" stroke=\"#493781\" stroke-width=\"2\"/><text x=\"250\" y=\"143\" text-anchor=\"middle\">20 ליפופים ברוחב כולל של 8 מ״מ</text></svg>",
        "notes": true
      },
      {
        "text": "מדוע שיטת הליפופים טובה יותר מניסיון למדוד את עובי התיל ישירות בסרגל? הסבירו גם מדוע חשוב שהליפופים יהיו צמודים זה לזה ולא יעלו זה על זה.",
        "type": "open",
        "correct": "מודדים רוחב כולל גדול יותר ומחלקים במספר הליפופים; יש למנוע רווחים וחפיפות.",
        "he": "תשובה לדוגמה: עובי תיל יחיד קטן וקשה לקריאה בסרגל. כמה ליפופים צמודים יוצרים רוחב גדול יותר. מחלקים אותו במספר הליפופים. רווחים מוסיפים לרוחב הנמדד וגורמים להערכת יתר; חפיפה מונעת מצב שבו כל ליפוף תורם עובי אחד לרוחב הכולל.<br><strong>בדקו:</strong> הסברתם את המדידה הכוללת, את החלוקה ואת התנאים לסידור הליפופים?",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 3"
        }
      }
    ]
  },
  "physics-pole": {
    "title": "מיישמים ומתכננים",
    "description": "כעת תשתמשו ברעיונות המדידה במצבים חדשים. בשאלות הפתוחות כתבו הסבר במילים שלכם. בסיום תוכלו להשוות את תשובתכם לפתרון לדוגמה ולבדוק אילו מרכיבים מופיעים בה ואילו חסרים. הנימוקים עצמם אינם מקבלים ציון אוטומטי.",
    "questions": [
      {
        "text": "תלמידה הזמינה לוח לפרויקט וכתבה לספק רק את המידות 150 × 90, ללא יחידות. כשהלוח הגיע הוא היה קטן בהרבה מכפי שתכננה.<br><br>מה הייתה הטעות הפיזיקלית בהזמנה, וכיצד היא יכולה להסביר את ההבדל בין הלוח שתכננה ללוח שקיבלה?",
        "type": "open",
        "correct": "הושמטו יחידות האורך, ולכן הספק יכול היה לפרש את המידות ביחידה אחרת.",
        "he": "תשובה לדוגמה: המספרים נכתבו בלי יחידות, ולכן לא הוגדר אורך חד־משמעי. התלמידה יכלה להתכוון לסנטימטרים והספק למילימטרים.<br><strong>בדקו:</strong> האם קישרתם בין יחידה חסרה ובין מידות פיזיות שונות?",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 4"
        }
      },
      {
        "text": "התלמידה התכוונה ללוח באורך 150 סנטימטרים וברוחב 90 סנטימטרים. הספק ייצר לוח באורך 150 מילימטרים וברוחב 90 מילימטרים.<br><br>פי כמה קטן כל אחד מממדי הלוח שקיבלה לעומת הממד המתוכנן? השאלה מתייחסת לכל אורך בנפרד, ולא לשטח.",
        "type": "fill",
        "correct": {
          "value": 10,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "150 מ״מ = 15 ס״מ, ולכן היחס הוא <bdi dir=\"ltr\">150 ÷ 15 = 10</bdi>. גם 90 מ״מ = 9 ס״מ, והיחס <bdi dir=\"ltr\">90 ÷ 9 = 10</bdi>. כל ממד קטן פי 10; השטח קטן פי 100, אך זה אינו מה שנשאל.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 4"
        },
        "notes": true
      },
      {
        "text": "כתבו מחדש את ההזמנה של התלמידה כך שלא יהיה מקום לאי־הבנה. ציינו במפורש את האורך ואת הרוחב ואת היחידות של כל אחד מהם.",
        "type": "open",
        "correct": "נא להכין לוח שאורכו 150 סנטימטרים ורוחבו 90 סנטימטרים.",
        "he": "אפשר גם: אורך 1.5 מטר ורוחב 0.9 מטר. שתי ההזמנות מתארות אותו לוח.<br><strong>בדקו:</strong> האם נכתב איזה מספר הוא האורך ואיזה הרוחב? האם לכל מידה יש יחידה? האם ההמרה, אם ביצעתם, נכונה?",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 4"
        }
      },
      {
        "text": "על השולחן מונחים סרגל והרבה גרגרי שעועית דומים. אתם רוצים למצוא את האורך הממוצע של גרגר בצורה מדויקת יותר ממדידה של גרגר יחיד.<br><br>תארו שיטת מדידה: כמה גרגרים תיקחו, כיצד תסדרו אותם, מה תמדדו ואיזה חישוב תבצעו. התייחסו גם לאופן שבו אפשר לשפר את אמינות התוצאה.",
        "type": "open",
        "correct": "מסדרים מספר ידוע של גרגרים מקצה לקצה באותו כיוון, מודדים את האורך הכולל ומחלקים במספרם.",
        "he": "תשובה לדוגמה: נבחר 20 גרגרים ונניח אותם בשורה ישרה, באותו כיוון, מקצה לקצה וללא רווחים או חפיפות. נמדוד את אורך השורה בסרגל ונחלק ב־20. נקבל אורך ממוצע של גרגר. נחזור על המדידה עם קבוצות נוספות ונחשב ממוצע.<br><strong>בדקו:</strong> מספר גרגרים ידוע; סידור בכיוון האורך; ללא רווחים וחפיפות; מדידת אורך כולל; חלוקה במספר הגרגרים; יחידות; חזרות לשיפור האמינות.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 4"
        }
      },
      {
        "text": "בבדיקת השיטה סידרו 24 גרגרים בשורה ישרה ומדדו אורך כולל של 16.8 סנטימטרים. מהו האורך הממוצע של גרגר אחד במילימטרים? הציגו את שלבי החישוב.",
        "type": "fill",
        "correct": {
          "value": 7,
          "tolerance": 1e-08,
          "unit": ""
        },
        "he": "תחילה: <bdi dir=\"ltr\">16.8 ÷ 24 = 0.7</bdi> ס״מ לגרגר. לאחר מכן: <bdi dir=\"ltr\">0.7 × 10 = 7</bdi> מ״מ. אפשר גם להמיר תחילה: 16.8 ס״מ = 168 מ״מ, ואז <bdi dir=\"ltr\">168 ÷ 24 = 7</bdi> מ״מ.",
        "en": "",
        "ref": {
          "id": "physics-site",
          "part": "פרק 4"
        },
        "notes": true
      }
    ]
  }
};
Object.assign(quizzes, physicsLessons);

// Study material the questions follow (the same references as the exam versions in subject.html).
const references = {
  'garden-passage': { kind: 'passage', title: 'הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”', url: 'garden-exam.html#article' },
  'physics-site': { kind: 'site', title: 'אתר התרגול „מתרגלים פיזיקה ז׳”', url: 'https://physics7-measurement-sarit.sarityarongaya.chatgpt.site/' },
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

const isPhysics = quizKey?.startsWith('physics-');
const bestKey = `prepx-best-${quizKey}${isPhysics ? '-sarit-v1' : ''}`;
const prepareQuestions = () => selectedQuiz.questions.map((q, i) => ({ ...q, id: `q${i}`, type: q.type || 'mcq', difficulty: q.difficulty || 'medium' }));
const shuffleQuestion = q => q.type === 'mcq' ? shuffleChoices(q) : { ...q };

// Physics has figures and written/numeric tasks. Keep its verified inline content
// authoritative until the API contains exactly the same fields supported by the DB.
function physicsQuizMatches(data) {
  const expected = inlineQuiz.questions.map(q => ({ prompt: q.text, type: q.type, choices: q.choices ?? null, correct: q.correct, he: q.he, ref: q.ref }));
  const actual = data?.questions?.map(q => ({ prompt: q.prompt, type: q.type, choices: q.choices ?? null, correct: q.correct, he: q.explanation?.he, ref: q.ref }));
  return ContentApi.sameData(actual, expected) && data.title === inlineQuiz.title && data.description === inlineQuiz.description;
}
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
    const data = await loadContent(`quizzes/${quizKey}`, null, { valid: quiz => isPhysics ? physicsQuizMatches(quiz) : quizMatches(quiz, inlineQuiz.questions.length) });
    if (data && !isPhysics) selectedQuiz = quizFromApi(data);
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
    startRound(prepareQuestions());
  }
}
init();

function startRound(questions, full = true) {
  roundQuestions = questions;
  fullRound = full;
  queue = (isPhysics ? questions : shuffled(questions)).map(shuffleQuestion);
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
  if (isPhysics) byId('question-text').innerHTML = question.text;
  else byId('question-text').textContent = question.text;
  byId('question-figure').innerHTML = question.figure || '';
  byId('question-figure').hidden = !question.figure;
  byId('question-context').hidden = !question.context;
  byId('context-text').innerHTML = question.context || '';
  byId('answer-hint').textContent = question.type === 'mcq' ? 'בחרו תשובה אחת' : question.type === 'fill' ? 'כתבו מספר ודרך חישוב' : 'כתבו תשובה מנומקת';
  byId('written-answer').hidden = question.type === 'mcq';
  byId('numeric-label').hidden = question.type !== 'fill';
  byId('numeric-answer').value = picks[view]?.value || '';
  byId('numeric-answer').disabled = answered;
  byId('response-label').textContent = question.type === 'fill' ? 'דרך חישוב (לא חובה)' : 'התשובה שלכם';
  byId('text-answer').value = question.type === 'open' ? picks[view]?.value || '' : picks[view]?.work || '';
  byId('text-answer').disabled = answered;
  byId('confirm-answer').disabled = true;
  byId('feedback').hidden = true;
  byId('feedback').classList.remove('incorrect', 'self-check');
  byId('streak-badge').hidden = true;
  byId('next-button').hidden = !answered;
  byId('next-button').textContent = view === total - 1 ? 'לסיכום התרגול' : 'לשאלה הבאה';
  byId('back-button').hidden = view === 0;
  const progress = Math.round((position / total) * 100);
  byId('progress-fill').style.width = `${progress}%`;
  byId('progress-fill').parentElement.setAttribute('aria-valuenow', String(progress));

  const choices = byId('choices');
  choices.replaceChildren();
  (question.choices || []).forEach((choice, index) => {
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
    if (!correct) queue = scheduleReask(queue, position, shuffleQuestion(question));
  }
  showVerdict(question, index, true);
  byId('next-button').hidden = false;
  byId('next-button').textContent = position === queue.length - 1 ? 'לסיכום התרגול' : 'לשאלה הבאה';
  // The verdict and explanation stay on screen for a moment, then the next question opens by itself.
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(advance, AUTO_ADVANCE_MS);
}

function confirmAnswer(event) {
  event.preventDefault();
  if (answered || view !== position || byId('confirm-answer').disabled) return;
  const question = queue[position];
  byId('numeric-answer').disabled = true;
  byId('text-answer').disabled = true;
  byId('confirm-answer').disabled = true;
  const pick = { value: question.type === 'open' ? byId('text-answer').value : byId('numeric-answer').value, work: question.type === 'fill' ? byId('text-answer').value : '' };
  picks[position] = pick;
  answered = true;
  const correct = question.type === 'open' ? null : NumericAnswer.checkNumber(pick.value, question.correct) === true;
  if (!question.reask) {
    if (question.type !== 'open') {
      results[question.id] = correct ? 1 : 0;
      roundAnswers.push({ index: Number(question.id.slice(1)), answer: pick.value, correct });
      streak = correct ? streak + 1 : 0;
      if (!correct) queue = scheduleReask(queue, position, shuffleQuestion(question));
    }
    reviewItems.push({ text: question.text, picked: pick.value + (pick.work ? `\nדרך חישוב: ${pick.work}` : ''), right: question.type === 'fill' ? String(question.correct.value) : question.correct, correct, he: question.he, en: question.en });
  }
  showVerdict(question, pick, true);
  byId('next-button').hidden = false;
  byId('next-button').textContent = position === queue.length - 1 ? 'לסיכום התרגול' : 'לשאלה הבאה';
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(advance, AUTO_ADVANCE_MS);
}
byId('written-answer').addEventListener('submit', confirmAnswer);
const updateConfirm = () => {
  const field = queue[position]?.type === 'fill' ? 'numeric-answer' : 'text-answer';
  byId('confirm-answer').disabled = answered || !byId(field).value.trim();
};
byId('numeric-answer').addEventListener('input', updateConfirm);
byId('text-answer').addEventListener('input', updateConfirm);
byId('numeric-answer').addEventListener('keydown', event => {
  if (event.key === 'Enter') confirmAnswer(event);
});

function showVerdict(question, picked, fresh) {
  const written = question.type === 'open';
  const correct = written ? null : question.type === 'fill' ? NumericAnswer.checkNumber(picked.value, question.correct) === true : picked === question.correct;
  [...byId('choices').children].forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) button.classList.add('correct');
    if (index === picked && !correct) button.classList.add('incorrect');
  });
  byId('feedback-title').textContent = written ? 'השוו לפתרון לדוגמה' : correct ? 'נכון מאוד!' : 'כמעט!';
  if (isPhysics) byId('feedback-he').innerHTML = question.he;
  else byId('feedback-he').textContent = !correct && !question.reask ? `${question.he} נחזור לשאלה הזאת עוד מעט.` : question.he;
  byId('feedback-en').textContent = question.en ? `${correct ? 'Correct! ' : 'Not quite. '}${question.en}` : '';
  byId('feedback-en').hidden = !question.en;
  showSource(question.ref);
  byId('feedback').classList.toggle('incorrect', !written && !correct);
  byId('feedback').classList.toggle('self-check', written);
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
  const { earned, percent } = scoreQuiz(isPhysics ? roundQuestions.filter(q => q.type !== 'open') : roundQuestions, results);
  const missed = missedQuestions(roundQuestions, results);
  const gradedCount = roundQuestions.filter(q => q.type !== 'open').length;
  const writtenCount = roundQuestions.length - gradedCount;
  const correctCount = gradedCount - missed.length;
  const savedScore = isPhysics ? percent : earned;
  const tier = fullRound ? feedbackTier(percent) : 'review';
  const stars = starsFor(percent);
  const previousBest = readBest();
  if (fullRound && savedScore > previousBest) saveBest(savedScore);
  postRound(savedScore, stars);

  byId('quiz-screen').hidden = true;
  const panel = byId('result-screen');
  panel.hidden = false;
  panel.dataset.tier = tier;
  byId('result-stars').hidden = !fullRound;
  byId('result-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  byId('result-stars').setAttribute('aria-label', `${stars} כוכבים מתוך 3`);
  byId('result-score').textContent = fullRound ? `${savedScore} מתוך 100${writtenCount ? ' · בשאלות הנבדקות אוטומטית' : ''}` : `תיקנתם ${correctCount} מתוך ${roundQuestions.length} טעויות`;
  byId('result-count').textContent = fullRound ? `${correctCount} מתוך ${gradedCount} תשובות נכונות בניסיון הראשון${writtenCount ? ` · ${writtenCount} תשובות כתובות לבדיקה עצמית לפי הפתרון לדוגמה` : ''}` : 'סבב חזרה על הטעויות. הציון הקודם נשמר.';
  byId('confetti').replaceChildren();
  byId('result-message').textContent = messages[tier];
  byId('result-message-en').textContent = messagesEn[tier];
  byId('result-message-en').hidden = isPhysics;
  const improvement = fullRound && previousBest > 0 && savedScore > previousBest ? savedScore - previousBest : 0;
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
    li.className = item.correct === null ? 'review-item' : item.correct ? 'review-item right' : 'review-item wrong';
    const add = (tag, text, className, dir, trustedHtml = false) => {
      const el = document.createElement(tag);
      if (isPhysics && trustedHtml) el.innerHTML = text;
      else el.textContent = text;
      if (className) el.className = className;
      if (dir) el.dir = dir;
      li.append(el);
    };
    add('strong', item.text, null, null, true);
    add('p', `${item.correct === null ? 'התשובה שלכם' : item.correct ? '✓ ענית נכון' : '✕ ענית'}: ${item.picked}`);
    if (item.correct === false) add('p', `התשובה הנכונה: ${item.right}`);
    add('p', item.he, null, null, true);
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

byId('retry-button').addEventListener('click', () => startRound(prepareQuestions()));
byId('missed-button').addEventListener('click', () => startRound(missedQuestions(roundQuestions, results), false));
