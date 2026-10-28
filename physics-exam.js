(() => {
  // "מתרגלים פיזיקה ז׳ · מדידות" by the teacher שרית שרת: all 4 chapters and 27 tasks of her practice site, VERBATIM
  // (texts, options, answers, explanations, figures, order). physics-exam.test.mjs compares this file with
  // test-fixtures/sarit-physics7-sections.json (her original data). Never edit the texts here.
  // DB type mapping: choice -> mcq (correct = index of her answer), num -> fill (correct = { value, tolerance, unit },
  // checked by numeric-answer.js like her site; unit is informational only), text -> open (correct = her short key,
  // explanation.he = her model answer incl. the "בדקו:" self-check list). ref = { id, part } into the study material.
  const questions = [
    { id: 'physics-exam-01', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'תלמידים מכינים תערוכה בבית הספר ומתבקשים לבחור לכל מדידה את יחידת האורך המתאימה ביותר. אין צורך לבצע חישוב.<br><br>באיזו יחידה נוח לתאר את עוביו של כרטיס פלסטיק?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 0, explanation: { he: 'כרטיס פלסטיק דק מאוד. מילימטר מתאים לתיאור עובי קטן כזה, בלי להשתמש בשבר קטן מאוד של מטר.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-02', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'לצורך התקנת וילון מודדים את גובה החלון בכיתה, שהוא מעט יותר מיחידה אחת של מטר. באיזו יחידה נוח לתאר את הגובה?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 2, explanation: { he: 'גובה חלון הוא בסדר גודל של מטרים. לכן מטר הוא יחידה נוחה כאן.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-03', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'קבוצת תלמידים מתכננת נסיעה מנתניה לחיפה. באיזו יחידה נוח לתאר את המרחק בין הערים?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 3, explanation: { he: 'מרחק בין ערים הוא לרוב עשרות קילומטרים. תיאור בקילומטרים נותן מספר נוח לקריאה ולהשוואה.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-04', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'לצורך עטיפת ספר לימוד רוצים למדוד את אורכו. באיזו יחידה נוח למסור את התוצאה?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 1, explanation: { he: 'אורך ספר לימוד הוא לרוב כמה עשרות סנטימטרים, ולכן סנטימטר מתאים.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-05', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'במסגרת פרויקט נמדד גובה עמוד התאורה שבחצר בית הספר. באיזו יחידה נוח לתאר את הגובה?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 2, explanation: { he: 'גובה עמוד תאורה הוא בדרך כלל כמה מטרים. מטר היא היחידה הנוחה מתוך האפשרויות.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-06', type: 'open', topic: 'יחידות וסדרי גודל', prompt: 'שני תלמידים דיווחו על תוצאת מדידה: האחד כתב רק 35, והאחר כתב 35 סנטימטרים. מדוע חשוב לציין יחידה לצד תוצאת המדידה? הסבירו מה חסר בדיווח הראשון.', correct: 'המספר לבדו אינו מבהיר מהו האורך שנמדד.', explanation: { he: 'תשובה לדוגמה: בלי יחידה אי אפשר לדעת אם הכוונה ל־35 מ״מ, ס״מ או מטרים. אלה אורכים שונים מאוד.<br><strong>בדקו:</strong> האם ציינתם שלמספר וליחידה יש משמעות משותפת? האם הסברתם את אי־הבהירות?' }, ref: { id: 'physics-pdf', part: 'עמוד 1' } },
    { id: 'physics-exam-07', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'לפניכם חמישה גדלים: עובי שערה, אורך גרגר אורז, גובה ילד, גובה מגדל מים וקוטר הירח. בחרו את הסדר מהקטן ביותר לגדול ביותר.', choices: ['שערה ← גרגר אורז ← ילד ← מגדל מים ← הירח', 'גרגר אורז ← שערה ← ילד ← מגדל מים ← הירח', 'שערה ← ילד ← גרגר אורז ← הירח ← מגדל מים'], correct: 0, explanation: { he: 'שערה דקה מגרגר אורז; גרגר אורז קצר מגובה ילד; מגדל מים גבוה מילד; קוטר הירח גדול בהרבה מגובה המגדל.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-08', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'באיזו יחידה מבין האפשרויות נוח לתאר את עובייה של שערה?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 0, explanation: { he: 'עובי שערה קטן ממילימטר, אך אפשר לתאר אותו כשבר עשרוני של מילימטר. מבין היחידות הנתונות, זו היחידה הנוחה.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-09', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'באיזו יחידה נוח לתאר את גובהו של ילד, כאשר רוצים לציין מספר שלם בלי שבר עשרוני?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 1, explanation: { he: 'למשל 145 ס״מ. מטר יכול לתאר את אותו אורך, אך בדרך כלל נדרש בו שבר עשרוני. שימו לב לתנאי שבשאלה.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-10', type: 'mcq', topic: 'יחידות וסדרי גודל', prompt: 'באיזו יחידה נוח לתאר את קוטר הירח?', choices: ['מילימטר', 'סנטימטר', 'מטר', 'קילומטר'], correct: 3, explanation: { he: 'זהו אורך גדול מאוד, ולכן קילומטר מתאים יותר ממטר, מסנטימטר או ממילימטר.' }, ref: { id: 'physics-site', part: 'פרק 1' } },
    { id: 'physics-exam-11', type: 'open', topic: 'יחידות וסדרי גודל', prompt: 'תלמיד טוען שאפשר לתאר את המרחק בין שתי ערים גם במילימטרים. הטענה נכונה מבחינה מתמטית. למרות זאת, מדוע תיאור כזה אינו נוח לשימוש?', correct: 'המספר שיתקבל גדול מאוד וקשה יותר לקרוא ולהשוות אותו.', explanation: { he: 'תשובה לדוגמה: במילימטרים מתקבל מספר גדול מאוד עם ספרות רבות, ולכן קל יותר לטעות בקריאה או בכתיבה. קילומטרים מאפשרים תיאור נוח יותר.<br><strong>בדקו:</strong> האם הבהרתם שההמרה אפשרית, אך היחידה פחות נוחה?' }, ref: { id: 'physics-pdf', part: 'עמוד 2' } },
    { id: 'physics-exam-12', type: 'fill', topic: 'המרות יחידות', prompt: 'סרט בד שאורכו 3.25 מטרים נועד לקישוט הכיתה. השלימו את אורכו בסנטימטרים.', correct: { value: 325, tolerance: 1e-8, unit: 'ס״מ' }, explanation: { he: 'ממטרים לסנטימטרים כופלים ב־100: <bdi dir="ltr">3.25 × 100 = 325</bdi> ס״מ.' }, ref: { id: 'physics-pdf', part: 'עמוד 2' } },
    { id: 'physics-exam-13', type: 'fill', topic: 'המרות יחידות', prompt: 'אורכו של חבל הוא 570 סנטימטרים. מהו אורכו במטרים?', correct: { value: 5.7, tolerance: 1e-8, unit: 'מטרים' }, explanation: { he: 'מסנטימטרים למטרים מחלקים ב־100: <bdi dir="ltr">570 ÷ 100 = 5.7</bdi> מטרים.' }, ref: { id: 'physics-pdf', part: 'עמוד 2' } },
    { id: 'physics-exam-14', type: 'fill', topic: 'המרות יחידות', prompt: 'קבוצת תלמידים צעדה במסלול שאורכו 2.4 קילומטרים. מה אורך המסלול במטרים?', correct: { value: 2400, tolerance: 1e-8, unit: 'מטרים' }, explanation: { he: 'מקילומטרים למטרים כופלים ב־1,000: <bdi dir="ltr">2.4 × 1,000 = 2,400</bdi> מטרים.' }, ref: { id: 'physics-pdf', part: 'עמוד 2' } },
    { id: 'physics-exam-15', type: 'fill', topic: 'המרות יחידות', prompt: 'אורך בורג הוא 96 מילימטרים. מה אורכו בסנטימטרים?', correct: { value: 9.6, tolerance: 1e-8, unit: 'ס״מ' }, explanation: { he: 'ממילימטרים לסנטימטרים מחלקים ב־10: <bdi dir="ltr">96 ÷ 10 = 9.6</bdi> ס״מ.' }, ref: { id: 'physics-pdf', part: 'עמוד 2' } },
    { id: 'physics-exam-16', type: 'fill', topic: 'המרות יחידות', prompt: 'לקראת תערוכה מכינים שלט שאורכו צריך להיות 0.85 מטר. בית הדפוס מבקש לקבל את המידה בסנטימטרים. איזו מידה תמסרו לבית הדפוס? כתבו מספר בסנטימטרים והציגו דרך חישוב.', correct: { value: 85, tolerance: 1e-8, unit: 'ס״מ' }, explanation: { he: '<bdi dir="ltr">0.85 × 100 = 85</bdi> ס״מ. אין לשנות את הגודל המתוכנן של השלט, רק את היחידה שבה הוא מתואר.' }, ref: { id: 'physics-pdf', part: 'עמוד 2' } },
    { id: 'physics-exam-17', type: 'fill', topic: 'מודדים כמו פיזיקאים', prompt: 'רצועת פלסטיק הונחה על סרגל, אך הקצה השמאלי שלה אינו בנקודת 0. התבוננו באיור וקבעו את אורך הרצועה בסנטימטרים. כתבו גם כיצד חישבתם את האורך.', correct: { value: 5.8, tolerance: 1e-8, unit: 'ס״מ' }, explanation: { he: 'הקצה השמאלי נמצא ב־2.4 ס״מ והקצה הימני ב־8.2 ס״מ. האורך הוא ההפרש: <bdi dir="ltr">8.2 − 2.4 = 5.8</bdi> ס״מ. הקריאה בקצה הימני לבדה אינה אורך הרצועה.' }, ref: { id: 'physics-pdf', part: 'עמוד 4' } },
    { id: 'physics-exam-18', type: 'fill', topic: 'מודדים כמו פיזיקאים', prompt: 'בספרייה רוצים לדעת את עוביו של דף אחד. כדי להימנע ממדידת דף דק יחיד, מדדו ערימה של 250 דפים, ללא הכריכות, וקיבלו עובי כולל של 22.5 מילימטרים. חשבו את עוביו הממוצע של דף אחד במילימטרים והציגו דרך חישוב.', correct: { value: 0.09, tolerance: 1e-8, unit: 'מ״מ' }, explanation: { he: 'מחלקים את עובי הערימה במספר הדפים: <bdi dir="ltr">22.5 ÷ 250 = 0.09</bdi> מ״מ לדף. אין לכפול במספר הדפים. הנתון הוא מספר דפים, ולא מספר עמודים מודפסים.' }, ref: { id: 'physics-pdf', part: 'עמוד 3' } },
    { id: 'physics-exam-19', type: 'fill', topic: 'מודדים כמו פיזיקאים', prompt: 'המירו את העובי הממוצע של דף אחד שמצאתם בסעיף הקודם לסנטימטרים.', correct: { value: 0.009, tolerance: 1e-8, unit: 'ס״מ' }, explanation: { he: 'מספר המילימטרים מחולק ב־10: <bdi dir="ltr">0.09 ÷ 10 = 0.009</bdi> ס״מ. במעבר ליחידה גדולה יותר הערך המספרי קטן.' }, ref: { id: 'physics-pdf', part: 'עמוד 3' } },
    { id: 'physics-exam-20', type: 'open', topic: 'מודדים כמו פיזיקאים', prompt: 'תלמיד אחר ניסה למדוד דף יחיד בעזרת סרגל שהמרווח הקטן ביותר המסומן עליו הוא מילימטר אחד. הוא דיווח שעובי הדף הוא 1 מילימטר. איזו תוצאה צפויה להיות אמינה יותר: מדידת הדף היחיד או מדידת הערימה וחלוקה במספר הדפים? הסבירו.', correct: 'מדידת הערימה וחלוקה במספר הדפים צפויה להיות אמינה יותר.', explanation: { he: 'תשובה לדוגמה: דף יחיד דק בהרבה ממילימטר, ולכן קשה למדוד אותו בסרגל הזה. ערימה יוצרת עובי כולל גדול יותר שקל לקרוא. חלוקה במספר הדפים נותנת עובי ממוצע ומקטינה את השפעת שגיאת הקריאה היחסית.<br><strong>בדקו:</strong> ציינתם את מגבלת הסרגל, את היתרון במדידת ערימה ואת החלוקה במספר הדפים?' }, ref: { id: 'physics-pdf', part: 'עמוד 3' } },
    { id: 'physics-exam-21', type: 'fill', topic: 'מודדים כמו פיזיקאים', prompt: 'תלמידה רוצה למדוד את עוביו של תיל דק, אך אין ברשותה מכשיר מיוחד. היא כורכת את התיל בצפיפות סביב עיפרון. 20 ליפופים צמודים, ללא רווחים וללא חפיפה, תופסים יחד רוחב של 8 מילימטרים. חשבו את עובי התיל במילימטרים.', correct: { value: 0.4, tolerance: 1e-8, unit: 'מ״מ' }, explanation: { he: '20 ליפופים מייצגים 20 פעמים את עובי התיל. לכן <bdi dir="ltr">8 ÷ 20 = 0.4</bdi> מ״מ. יש למדוד לרוחב הליפופים, לאורך העיפרון, ולא את אורך התיל המלופף.' }, ref: { id: 'physics-pdf', part: 'עמוד 3' } },
    { id: 'physics-exam-22', type: 'open', topic: 'מודדים כמו פיזיקאים', prompt: 'מדוע שיטת הליפופים טובה יותר מניסיון למדוד את עובי התיל ישירות בסרגל? הסבירו גם מדוע חשוב שהליפופים יהיו צמודים זה לזה ולא יעלו זה על זה.', correct: 'מודדים רוחב כולל גדול יותר ומחלקים במספר הליפופים; יש למנוע רווחים וחפיפות.', explanation: { he: 'תשובה לדוגמה: עובי תיל יחיד קטן וקשה לקריאה בסרגל. כמה ליפופים צמודים יוצרים רוחב גדול יותר. מחלקים אותו במספר הליפופים. רווחים מוסיפים לרוחב הנמדד וגורמים להערכת יתר; חפיפה מונעת מצב שבו כל ליפוף תורם עובי אחד לרוחב הכולל.<br><strong>בדקו:</strong> הסברתם את המדידה הכוללת, את החלוקה ואת התנאים לסידור הליפופים?' }, ref: { id: 'physics-pdf', part: 'עמוד 3' } },
    { id: 'physics-exam-23', type: 'open', topic: 'מיישמים ומתכננים', prompt: 'תלמידה הזמינה לוח לפרויקט וכתבה לספק רק את המידות 150 × 90, ללא יחידות. כשהלוח הגיע הוא היה קטן בהרבה מכפי שתכננה.<br><br>מה הייתה הטעות הפיזיקלית בהזמנה, וכיצד היא יכולה להסביר את ההבדל בין הלוח שתכננה ללוח שקיבלה?', correct: 'הושמטו יחידות האורך, ולכן הספק יכול היה לפרש את המידות ביחידה אחרת.', explanation: { he: 'תשובה לדוגמה: המספרים נכתבו בלי יחידות, ולכן לא הוגדר אורך חד־משמעי. התלמידה יכלה להתכוון לסנטימטרים והספק למילימטרים.<br><strong>בדקו:</strong> האם קישרתם בין יחידה חסרה ובין מידות פיזיות שונות?' }, ref: { id: 'physics-pdf', part: 'עמוד 1' } },
    { id: 'physics-exam-24', type: 'fill', topic: 'מיישמים ומתכננים', prompt: 'התלמידה התכוונה ללוח באורך 150 סנטימטרים וברוחב 90 סנטימטרים. הספק ייצר לוח באורך 150 מילימטרים וברוחב 90 מילימטרים.<br><br>פי כמה קטן כל אחד מממדי הלוח שקיבלה לעומת הממד המתוכנן? השאלה מתייחסת לכל אורך בנפרד, ולא לשטח.', correct: { value: 10, tolerance: 1e-8, unit: null }, explanation: { he: '150 מ״מ = 15 ס״מ, ולכן היחס הוא <bdi dir="ltr">150 ÷ 15 = 10</bdi>. גם 90 מ״מ = 9 ס״מ, והיחס <bdi dir="ltr">90 ÷ 9 = 10</bdi>. כל ממד קטן פי 10; השטח קטן פי 100, אך זה אינו מה שנשאל.' }, ref: { id: 'physics-pdf', part: 'עמוד 2' } },
    { id: 'physics-exam-25', type: 'open', topic: 'מיישמים ומתכננים', prompt: 'כתבו מחדש את ההזמנה של התלמידה כך שלא יהיה מקום לאי־הבנה. ציינו במפורש את האורך ואת הרוחב ואת היחידות של כל אחד מהם.', correct: 'נא להכין לוח שאורכו 150 סנטימטרים ורוחבו 90 סנטימטרים.', explanation: { he: 'אפשר גם: אורך 1.5 מטר ורוחב 0.9 מטר. שתי ההזמנות מתארות אותו לוח.<br><strong>בדקו:</strong> האם נכתב איזה מספר הוא האורך ואיזה הרוחב? האם לכל מידה יש יחידה? האם ההמרה, אם ביצעתם, נכונה?' }, ref: { id: 'physics-pdf', part: 'עמוד 1' } },
    { id: 'physics-exam-26', type: 'open', topic: 'מיישמים ומתכננים', prompt: 'על השולחן מונחים סרגל והרבה גרגרי שעועית דומים. אתם רוצים למצוא את האורך הממוצע של גרגר בצורה מדויקת יותר ממדידה של גרגר יחיד.<br><br>תארו שיטת מדידה: כמה גרגרים תיקחו, כיצד תסדרו אותם, מה תמדדו ואיזה חישוב תבצעו. התייחסו גם לאופן שבו אפשר לשפר את אמינות התוצאה.', correct: 'מסדרים מספר ידוע של גרגרים מקצה לקצה באותו כיוון, מודדים את האורך הכולל ומחלקים במספרם.', explanation: { he: 'תשובה לדוגמה: נבחר 20 גרגרים ונניח אותם בשורה ישרה, באותו כיוון, מקצה לקצה וללא רווחים או חפיפות. נמדוד את אורך השורה בסרגל ונחלק ב־20. נקבל אורך ממוצע של גרגר. נחזור על המדידה עם קבוצות נוספות ונחשב ממוצע.<br><strong>בדקו:</strong> מספר גרגרים ידוע; סידור בכיוון האורך; ללא רווחים וחפיפות; מדידת אורך כולל; חלוקה במספר הגרגרים; יחידות; חזרות לשיפור האמינות.' }, ref: { id: 'physics-pdf', part: 'עמוד 3' } },
    { id: 'physics-exam-27', type: 'fill', topic: 'מיישמים ומתכננים', prompt: 'בבדיקת השיטה סידרו 24 גרגרים בשורה ישרה ומדדו אורך כולל של 16.8 סנטימטרים. מהו האורך הממוצע של גרגר אחד במילימטרים? הציגו את שלבי החישוב.', correct: { value: 7, tolerance: 1e-8, unit: 'מ״מ' }, explanation: { he: 'תחילה: <bdi dir="ltr">16.8 ÷ 24 = 0.7</bdi> ס״מ לגרגר. לאחר מכן: <bdi dir="ltr">0.7 × 10 = 7</bdi> מ״מ. אפשר גם להמיר תחילה: 16.8 ס״מ = 168 מ״מ, ואז <bdi dir="ltr">168 ÷ 24 = 7</bdi> מ״מ.' }, ref: { id: 'physics-pdf', part: 'עמוד 3' } }
  ];
  const sections = [
    { title: 'יחידות וסדרי גודל', intro: 'בפיזיקה מתארים תכונות של גופים באמצעות גדלים מדידים. בחלק זה תבחרו יחידות המתאימות לאורכים שונים ותשוו בין גדלים מהעולם שסביבנו. קראו את כל תיאור המצב לפני בחירת התשובה.' },
    { title: 'המרות יחידות', intro: 'בהמרת יחידות האורך עצמו אינו משתנה, אלא המספר והיחידה שבהם מתארים אותו. זכרו: מטר אחד הוא 100 סנטימטרים; סנטימטר אחד הוא 10 מילימטרים; קילומטר אחד הוא 1,000 מטרים. בכל סעיף כתבו את התוצאה ביחידה המבוקשת. אפשר לכתוב דרך חישוב בשדה שמתחת לתשובה.' },
    { title: 'מודדים כמו פיזיקאים', intro: 'לא תמיד אפשר לקרוא את הגודל המבוקש ישירות מן הסרגל. בחלק זה תחשבו על נקודת תחילת המדידה, על מדידת אוסף עצמים ועל חישוב הגודל של עצם יחיד. קראו את תיאור הניסוי והבחינו בין הגודל הכולל ובין הגודל של פריט אחד.' },
    { title: 'מיישמים ומתכננים', intro: 'כעת תשתמשו ברעיונות המדידה במצבים חדשים. בשאלות הפתוחות כתבו הסבר במילים שלכם. בסיום תוכלו להשוות את תשובתכם לפתרון לדוגמה ולבדוק אילו מרכיבים מופיעים בה ואילו חסרים. הנימוקים עצמם אינם מקבלים ציון אוטומטי.' }
  ];
  const $ = id => document.getElementById(id);
  // Study material the questions follow (the same references as this version in subject.html).
  const references = {
    'physics-pdf': { kind: 'pdf', title: 'סיכום נושא מדידות (PDF)', url: 'assets/materials/physics-measurements-grade-7.pdf' },
    'physics-site': { kind: 'site', title: 'אתר התרגול „מתרגלים פיזיקה ז׳”', url: 'https://physics7-measurement-sarit.sarityarongaya.chatgpt.site/' }
  };
  const sourceIn = { pdf: 'בסיכום', site: 'באתר התרגול של המורה' };

  // The teacher's figures, copied verbatim from her site (task index 5), keyed by question id.
  const figures = {
    'physics-exam-17': '<svg class="diagram" viewBox="0 0 760 220" role="img" aria-label="סרגל בסנטימטרים שעליו רצועה כתומה"><rect x="40" y="110" width="660" height="60" rx="7" fill="#fff1cf"/><path d="M50.0 110v24" stroke="#85653c"/><text x="50.0" y="158" text-anchor="middle" font-size="18">0</text><path d="M56.4 110v7" stroke="#85653c"/><path d="M62.8 110v7" stroke="#85653c"/><path d="M69.2 110v7" stroke="#85653c"/><path d="M75.6 110v7" stroke="#85653c"/><path d="M82.0 110v14" stroke="#85653c"/><path d="M88.4 110v7" stroke="#85653c"/><path d="M94.80000000000001 110v7" stroke="#85653c"/><path d="M101.2 110v7" stroke="#85653c"/><path d="M107.6 110v7" stroke="#85653c"/><path d="M114.0 110v24" stroke="#85653c"/><text x="114.0" y="158" text-anchor="middle" font-size="18">1</text><path d="M120.4 110v7" stroke="#85653c"/><path d="M126.80000000000001 110v7" stroke="#85653c"/><path d="M133.2 110v7" stroke="#85653c"/><path d="M139.60000000000002 110v7" stroke="#85653c"/><path d="M146.0 110v14" stroke="#85653c"/><path d="M152.4 110v7" stroke="#85653c"/><path d="M158.8 110v7" stroke="#85653c"/><path d="M165.2 110v7" stroke="#85653c"/><path d="M171.60000000000002 110v7" stroke="#85653c"/><path d="M178.0 110v24" stroke="#85653c"/><text x="178.0" y="158" text-anchor="middle" font-size="18">2</text><path d="M184.4 110v7" stroke="#85653c"/><path d="M190.8 110v7" stroke="#85653c"/><path d="M197.20000000000002 110v7" stroke="#85653c"/><path d="M203.60000000000002 110v7" stroke="#85653c"/><path d="M210.0 110v14" stroke="#85653c"/><path d="M216.4 110v7" stroke="#85653c"/><path d="M222.8 110v7" stroke="#85653c"/><path d="M229.20000000000002 110v7" stroke="#85653c"/><path d="M235.60000000000002 110v7" stroke="#85653c"/><path d="M242.0 110v24" stroke="#85653c"/><text x="242.0" y="158" text-anchor="middle" font-size="18">3</text><path d="M248.4 110v7" stroke="#85653c"/><path d="M254.8 110v7" stroke="#85653c"/><path d="M261.20000000000005 110v7" stroke="#85653c"/><path d="M267.6 110v7" stroke="#85653c"/><path d="M274.0 110v14" stroke="#85653c"/><path d="M280.4 110v7" stroke="#85653c"/><path d="M286.8 110v7" stroke="#85653c"/><path d="M293.20000000000005 110v7" stroke="#85653c"/><path d="M299.6 110v7" stroke="#85653c"/><path d="M306.0 110v24" stroke="#85653c"/><text x="306.0" y="158" text-anchor="middle" font-size="18">4</text><path d="M312.40000000000003 110v7" stroke="#85653c"/><path d="M318.8 110v7" stroke="#85653c"/><path d="M325.2 110v7" stroke="#85653c"/><path d="M331.6 110v7" stroke="#85653c"/><path d="M338.0 110v14" stroke="#85653c"/><path d="M344.40000000000003 110v7" stroke="#85653c"/><path d="M350.8 110v7" stroke="#85653c"/><path d="M357.20000000000005 110v7" stroke="#85653c"/><path d="M363.6 110v7" stroke="#85653c"/><path d="M370.0 110v24" stroke="#85653c"/><text x="370.0" y="158" text-anchor="middle" font-size="18">5</text><path d="M376.40000000000003 110v7" stroke="#85653c"/><path d="M382.8 110v7" stroke="#85653c"/><path d="M389.20000000000005 110v7" stroke="#85653c"/><path d="M395.6 110v7" stroke="#85653c"/><path d="M402.0 110v14" stroke="#85653c"/><path d="M408.40000000000003 110v7" stroke="#85653c"/><path d="M414.8 110v7" stroke="#85653c"/><path d="M421.20000000000005 110v7" stroke="#85653c"/><path d="M427.6 110v7" stroke="#85653c"/><path d="M434.0 110v24" stroke="#85653c"/><text x="434.0" y="158" text-anchor="middle" font-size="18">6</text><path d="M440.40000000000003 110v7" stroke="#85653c"/><path d="M446.8 110v7" stroke="#85653c"/><path d="M453.20000000000005 110v7" stroke="#85653c"/><path d="M459.6 110v7" stroke="#85653c"/><path d="M466.0 110v14" stroke="#85653c"/><path d="M472.40000000000003 110v7" stroke="#85653c"/><path d="M478.8 110v7" stroke="#85653c"/><path d="M485.20000000000005 110v7" stroke="#85653c"/><path d="M491.6 110v7" stroke="#85653c"/><path d="M498.0 110v24" stroke="#85653c"/><text x="498.0" y="158" text-anchor="middle" font-size="18">7</text><path d="M504.40000000000003 110v7" stroke="#85653c"/><path d="M510.8 110v7" stroke="#85653c"/><path d="M517.2 110v7" stroke="#85653c"/><path d="M523.6 110v7" stroke="#85653c"/><path d="M530.0 110v14" stroke="#85653c"/><path d="M536.4000000000001 110v7" stroke="#85653c"/><path d="M542.8 110v7" stroke="#85653c"/><path d="M549.2 110v7" stroke="#85653c"/><path d="M555.6 110v7" stroke="#85653c"/><path d="M562.0 110v24" stroke="#85653c"/><text x="562.0" y="158" text-anchor="middle" font-size="18">8</text><path d="M568.4 110v7" stroke="#85653c"/><path d="M574.8000000000001 110v7" stroke="#85653c"/><path d="M581.2 110v7" stroke="#85653c"/><path d="M587.6 110v7" stroke="#85653c"/><path d="M594.0 110v14" stroke="#85653c"/><path d="M600.4 110v7" stroke="#85653c"/><path d="M606.8000000000001 110v7" stroke="#85653c"/><path d="M613.2 110v7" stroke="#85653c"/><path d="M619.6 110v7" stroke="#85653c"/><path d="M626.0 110v24" stroke="#85653c"/><text x="626.0" y="158" text-anchor="middle" font-size="18">9</text><path d="M632.4 110v7" stroke="#85653c"/><path d="M638.8000000000001 110v7" stroke="#85653c"/><path d="M645.2 110v7" stroke="#85653c"/><path d="M651.6 110v7" stroke="#85653c"/><path d="M658.0 110v14" stroke="#85653c"/><path d="M664.4000000000001 110v7" stroke="#85653c"/><path d="M670.8000000000001 110v7" stroke="#85653c"/><path d="M677.2 110v7" stroke="#85653c"/><path d="M683.6 110v7" stroke="#85653c"/><path d="M690.0 110v24" stroke="#85653c"/><text x="690.0" y="158" text-anchor="middle" font-size="18">10</text><rect x="203.6" y="66" width="371.2" height="30" rx="6" fill="#ee9b47"/><path d="M203.6 64V110M574.8 64V110" stroke="#b26030" stroke-dasharray="4 3"/><text x="380" y="35" text-anchor="middle">רצועת פלסטיק</text><text x="380" y="202" text-anchor="middle">המספרים על הסרגל מציינים סנטימטרים</text></svg>',
    'physics-exam-18': '<svg class="diagram" viewBox="0 0 600 180" role="img" aria-label="ערימת דפים ללא כריכות, 250 דפים בעובי 22.5 מילימטר"><rect x="150" y="30" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="36" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="42" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="48" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="54" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="60" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="66" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="72" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="78" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="84" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="90" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="96" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="102" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="108" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="114" width="230" height="5" fill="white" stroke="#477b98"/><rect x="150" y="120" width="230" height="5" fill="white" stroke="#477b98"/><path d="M420 30V125m-6 -89l6 -6 6 6m-12 83l6 6 6 -6" fill="none" stroke="#5d4a9c" stroke-width="2"/><text x="480" y="85" text-anchor="middle">22.5 מ״מ</text><text x="260" y="160" text-anchor="middle">250 דפים ללא כריכות</text></svg>',
    'physics-exam-21': '<svg class="diagram" viewBox="0 0 600 160" role="img" aria-label="20 ליפופים צמודים של תיל סביב עיפרון"><rect x="70" y="50" width="450" height="36" rx="9" fill="#ffe6aa"/><path d="M155 40v57" stroke="#087c83" stroke-width="5"/><path d="M165 40v57" stroke="#087c83" stroke-width="5"/><path d="M175 40v57" stroke="#087c83" stroke-width="5"/><path d="M185 40v57" stroke="#087c83" stroke-width="5"/><path d="M195 40v57" stroke="#087c83" stroke-width="5"/><path d="M205 40v57" stroke="#087c83" stroke-width="5"/><path d="M215 40v57" stroke="#087c83" stroke-width="5"/><path d="M225 40v57" stroke="#087c83" stroke-width="5"/><path d="M235 40v57" stroke="#087c83" stroke-width="5"/><path d="M245 40v57" stroke="#087c83" stroke-width="5"/><path d="M255 40v57" stroke="#087c83" stroke-width="5"/><path d="M265 40v57" stroke="#087c83" stroke-width="5"/><path d="M275 40v57" stroke="#087c83" stroke-width="5"/><path d="M285 40v57" stroke="#087c83" stroke-width="5"/><path d="M295 40v57" stroke="#087c83" stroke-width="5"/><path d="M305 40v57" stroke="#087c83" stroke-width="5"/><path d="M315 40v57" stroke="#087c83" stroke-width="5"/><path d="M325 40v57" stroke="#087c83" stroke-width="5"/><path d="M335 40v57" stroke="#087c83" stroke-width="5"/><path d="M345 40v57" stroke="#087c83" stroke-width="5"/><path d="M150 116h200" stroke="#493781" stroke-width="2"/><text x="250" y="143" text-anchor="middle">20 ליפופים ברוחב כולל של 8 מ״מ</text></svg>'
  };

  // Questions come from GET /api/exams/physics-v1-assessment only when identical to the inline array; otherwise inline.
  const inlineQuestions = questions;
  const contentApi = window.ContentApi;
  (contentApi && contentApi.useApi()
    ? contentApi.loadContent('exams/physics-v1-assessment', null, { valid: exam => contentApi.examFromApi(exam, inlineQuestions) !== null })
      .then(exam => (exam && contentApi.examFromApi(exam, inlineQuestions)) || inlineQuestions, () => inlineQuestions)
    : Promise.resolve(inlineQuestions)
  ).then(questions => {
    // Self-graded: nothing is sent anywhere. The draft lives only in this tab.
    const storageKey = 'physics-exam-draft-v1';
    const total = questions.length;
    const ids = new Set(questions.map(q => q.id));
    let saved = {};
    try { saved = JSON.parse(sessionStorage.getItem(storageKey)) || {}; } catch (_) { saved = {}; }
    const known = obj => Object.fromEntries(Object.entries(obj && typeof obj === 'object' ? obj : {}).filter(([id]) => ids.has(id)));
    const state = {
      answers: known(saved.answers), work: known(saved.work), checks: known(saved.checks), first: known(saved.first), selfChecks: known(saved.selfChecks),
      current: Number.isInteger(saved.current) ? Math.max(0, Math.min(total - 1, saved.current)) : 0,
      started: saved.started === true, finished: saved.finished === true
    };
    const persist = () => { try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) {} };
    const sectionOf = q => sections.findIndex(s => s.title === q.topic);
    const isAuto = q => q.type !== 'open';
    const hasAnswer = q => q.type === 'mcq' ? Number.isInteger(state.answers[q.id]) : typeof state.answers[q.id] === 'string' && state.answers[q.id].trim() !== '';
    const grade = q => {
      if (!hasAnswer(q)) return 'empty';
      if (q.type === 'open') return 'self';
      if (q.type === 'mcq') return state.answers[q.id] === q.correct;
      return NumericAnswer.checkNumber(state.answers[q.id], q.correct);
    };
    // The teacher's "בדקו:" list inside the model answer becomes a self-check list.
    const checklist = q => {
      const html = q.explanation.he;
      const at = html.indexOf('<strong>בדקו:</strong>');
      if (at < 0) return { model: html, items: [] };
      const rest = html.slice(at + '<strong>בדקו:</strong>'.length).trim();
      const items = rest.split(/(?<=\?)\s+|;\s*/).map(s => s.trim()).filter(Boolean);
      return { model: html.slice(0, at).replace(/<br>\s*$/, ''), items };
    };

    function show(stage, focusId) {
      document.querySelectorAll('.stage').forEach(el => { el.hidden = el.id !== stage; });
      window.scrollTo(0, 0);
      if (focusId) $(focusId).focus({ preventScroll: true });
    }

    function sourceLine(q) {
      const reference = q.ref && references[q.ref.id];
      if (!reference) return null;
      const line = document.createElement('p');
      line.className = 'source-line';
      const link = document.createElement('a');
      link.href = reference.url; link.target = '_blank'; link.rel = 'noopener';
      link.textContent = `${q.ref.part} ${sourceIn[reference.kind]}`;
      line.append('מקור: ', link);
      if (reference.kind === 'site') line.append(' (הנושא אינו מופיע בסיכום ה־PDF)');
      return line;
    }

    function renderFeedback(q) {
      const result = state.checks[q.id];
      const box = $('feedback');
      box.replaceChildren();
      box.hidden = result === undefined;
      box.classList.toggle('incorrect', result === false);
      box.classList.toggle('self', result === 'self');
      if (result === undefined) return;
      const title = document.createElement('strong');
      title.textContent = result === 'self' ? 'השוואה עצמית' : result ? '✓ תשובה נכונה' : 'עדיין לא. בואו נבדוק את הדרך.';
      box.append(title);
      if (q.type === 'open') {
        const { model, items } = checklist(q);
        const answer = document.createElement('div'); answer.className = 'model-answer'; answer.innerHTML = model;
        box.append(answer);
        if (items.length) {
          const fieldset = document.createElement('fieldset'); fieldset.className = 'self-check';
          const legend = document.createElement('legend'); legend.textContent = 'בדקו:';
          fieldset.append(legend);
          const ticks = Array.isArray(state.selfChecks[q.id]) ? state.selfChecks[q.id] : [];
          items.forEach((item, i) => {
            const label = document.createElement('label');
            const box2 = document.createElement('input'); box2.type = 'checkbox'; box2.checked = ticks[i] === true;
            box2.addEventListener('change', () => {
              const next = items.map((_, j) => (j === i ? box2.checked : ticks[j] === true));
              ticks.splice(0, ticks.length, ...next); state.selfChecks[q.id] = next; persist();
            });
            const text = document.createElement('span'); text.textContent = item;
            label.append(box2, text); fieldset.append(label);
          });
          box.append(fieldset);
        }
      } else {
        const p = document.createElement('p'); p.innerHTML = q.explanation.he; box.append(p);
        if (q.type === 'fill') { // the teacher's tasks with a notes field (index 6) are exactly the numeric ones
          const note = document.createElement('p'); note.className = 'small-note';
          note.textContent = 'דרך החישוב או ההסבר שכתבתם אינם נבדקים אוטומטית. השוו לפתרון: האם השתמשתם בנתונים, בחישוב וביחידות המתאימים?';
          box.append(note);
        }
      }
      const source = sourceLine(q);
      if (source) box.append(source);
    }

    function record(q, value) {
      state.answers[q.id] = value;
      delete state.checks[q.id];
      $('feedback').hidden = true;
      $('check-error').textContent = '';
      persist();
    }

    function questionAt(index) {
      state.current = index; persist();
      const q = questions[index];
      const section = sectionOf(q);
      $('counter').textContent = `שאלה ${index + 1} מתוך ${total}`;
      $('section-name').textContent = q.topic;
      $('progress-fill').style.width = `${Math.round(((index + 1) / total) * 100)}%`;
      $('progress-track').setAttribute('aria-valuenow', String(index + 1));
      $('section-intro').textContent = sections[section].intro;
      $('section-details').open = index === 0 || sectionOf(questions[index - 1]) !== section;
      $('question-index').textContent = `פרק ${section + 1} מתוך ${sections.length}`;
      $('question-text').innerHTML = `${index + 1}. ${q.prompt}`;
      $('figure').innerHTML = figures[q.id] || '';
      $('figure').hidden = !figures[q.id];
      const area = $('answer-area');
      area.replaceChildren();
      if (q.type === 'mcq') {
        const group = document.createElement('div'); group.className = 'choices'; group.setAttribute('role', 'radiogroup'); group.setAttribute('aria-labelledby', 'question-text');
        q.choices.forEach((choice, i) => {
          const label = document.createElement('label'); label.className = 'choice option';
          const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'choice'; radio.checked = state.answers[q.id] === i;
          radio.addEventListener('change', () => record(q, i));
          const text = document.createElement('span'); text.textContent = choice;
          label.append(radio, text); group.append(label);
        });
        area.append(group);
      } else if (q.type === 'fill') {
        const input = document.createElement('input'); input.id = 'number-answer'; input.className = 'answer'; input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off';
        input.setAttribute('aria-label', `תשובה לשאלה ${index + 1}`); input.placeholder = 'התשובה שלכם';
        input.value = typeof state.answers[q.id] === 'string' ? state.answers[q.id] : '';
        input.addEventListener('input', () => record(q, input.value));
        input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
        const work = document.createElement('textarea'); work.id = 'work'; work.maxLength = 2000; work.placeholder = 'כתבו דרך חישוב או הסבר…';
        work.setAttribute('aria-label', 'נימוק');
        work.value = typeof state.work[q.id] === 'string' ? state.work[q.id] : '';
        work.addEventListener('input', () => { state.work[q.id] = work.value; persist(); });
        area.append(input, work);
      } else {
        const text = document.createElement('textarea'); text.id = 'text-answer'; text.maxLength = 3000; text.placeholder = 'כתבו את ההסבר שלכם…';
        text.setAttribute('aria-label', `תשובה לשאלה ${index + 1}`);
        text.value = typeof state.answers[q.id] === 'string' ? state.answers[q.id] : '';
        text.addEventListener('input', () => record(q, text.value));
        area.append(text);
      }
      $('check').textContent = q.type === 'open' ? 'לפתרון ולהשוואה עצמית' : 'בדיקת תשובה';
      $('check-error').textContent = '';
      renderFeedback(q);
      $('previous').textContent = index === 0 ? 'חזרה לפתיחה' : 'לשאלה הקודמת';
      $('next').textContent = index === total - 1 ? 'לסיכום ולציון' : 'לשאלה הבאה';
      show('question-stage', 'question-text');
    }

    function check() {
      const q = questions[state.current];
      const result = grade(q);
      if (result === 'empty') { $('check-error').textContent = 'מלאו תשובה לפני הבדיקה.'; return; }
      state.checks[q.id] = result;
      if (state.first[q.id] === undefined) state.first[q.id] = result; // the score counts the first check only
      persist(); renderFeedback(q);
      $('feedback').focus({ preventScroll: true });
      $('feedback').scrollIntoView({ block: 'nearest' });
    }

    // Like the teacher's report(): every answered task is checked, then current and first-check counts are shown.
    function results() {
      questions.forEach(q => {
        const r = grade(q);
        if (r !== 'empty') { state.checks[q.id] = r; if (state.first[q.id] === undefined) state.first[q.id] = r; }
      });
      state.finished = true; persist();
      const auto = questions.filter(isAuto);
      const correct = auto.filter(q => state.checks[q.id] === true).length;
      const first = auto.filter(q => state.first[q.id] === true).length;
      $('score').textContent = `בתשובות הנוכחיות: ${correct} מתוך ${auto.length} סעיפים עם בדיקה אוטומטית נכונים.`;
      $('score-note').textContent = `נכונים בבדיקה הראשונה: ${first} מתוך ${auto.length}. הסברים מילוליים מיועדים להשוואה עצמית.`;
      const list = $('result-list'); list.replaceChildren();
      sections.forEach((section, s) => {
        const block = document.createElement('section'); block.className = 'result-section';
        const heading = document.createElement('h2'); heading.textContent = `פרק ${s + 1} · ${section.title}`;
        block.append(heading);
        questions.filter(q => sectionOf(q) === s).forEach(q => {
          const index = questions.indexOf(q);
          const r = grade(q);
          const item = document.createElement('div'); item.className = 'result-item';
          const button = document.createElement('button'); button.type = 'button'; button.className = 'result-open';
          const tmp = document.createElement('div'); tmp.innerHTML = q.prompt.replace(/<br>/g, ' ');
          const title = document.createElement('strong'); title.textContent = `${index + 1}. ${tmp.textContent.slice(0, 90)}${tmp.textContent.length > 90 ? '…' : ''}`;
          const status = document.createElement('span'); status.textContent = r === 'empty' ? 'לא נענתה' : r === 'self' ? 'להשוואה עצמית' : r ? '✓ נכון' : 'יש לתקן';
          status.className = r === false ? 'wrong' : '';
          button.append(title, status);
          button.addEventListener('click', () => questionAt(index));
          item.append(button);
          const source = sourceLine(q); if (source) item.append(source);
          block.append(item);
        });
        list.append(block);
      });
      show('results', 'results-title');
    }

    $('begin').textContent = state.started ? 'ממשיכים מהמקום שעצרתם' : 'מתחילים';
    $('begin').addEventListener('click', () => { state.started = true; persist(); questionAt(state.current); });
    $('check').addEventListener('click', check);
    $('previous').addEventListener('click', () => (state.current === 0 ? show('start', 'page-title') : questionAt(state.current - 1)));
    $('next').addEventListener('click', () => (state.current === total - 1 ? results() : questionAt(state.current + 1)));
    $('finish').addEventListener('click', results);
    $('back-to-questions').addEventListener('click', () => questionAt(state.current));
    $('retry').addEventListener('click', () => { try { sessionStorage.removeItem(storageKey); } catch (_) {} location.reload(); });
    if (state.finished) results();
    else if (state.started) questionAt(state.current);
  });
})();
