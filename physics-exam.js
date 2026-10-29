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
  // The prompt as plain text for the teacher email; same one-liner as plainText in db/submissions.mjs (tested).
  const plainText = html => String(html).replace(/\s*(?:<br\s*\/?>\s*)+/gi, '\n').replace(/<[^>]*>/g, '').trim();
  const contentApi = window.ContentApi;
  (contentApi && contentApi.useApi()
    ? contentApi.loadContent('exams/physics-v1-assessment', null, { valid: exam => contentApi.examFromApi(exam, inlineQuestions) !== null })
      .then(exam => (exam && contentApi.examFromApi(exam, inlineQuestions)) || inlineQuestions, () => inlineQuestions)
    : Promise.resolve(inlineQuestions)
  ).then(questions => {
  // Same flow, screens and behaviour as library-exam.js (start → questions → review → finish sends and locks → summary);
  // physics-exam.parity.test.mjs keeps the two pages in step. Differences are content only: numeric answers with
  // working, her figures, model answers and self-check lists. Every text, option and answer is verbatim; only the
  // order of the tasks and of the options is shuffled per student (docs/TESTING.md §4).
  const storageKey = 'physics-exam-draft-v1';
  const examId = 'physics-v1-assessment';
  const refNames = { 'physics-pdf': 'סיכום המורה', 'physics-site': 'אתר התרגול' };
  // Test details for the teacher's email (docs/TESTING.md §8) and the attempt number for this name (docs/TESTING.md §1).
  const attemptKey = 'prepx-attempts-v1';
  const attemptNumber = (id, name) => { try { return (JSON.parse(localStorage.getItem(attemptKey) || '{}')[`${id}/${name.toLowerCase()}`] || 0) + 1; } catch (_) { return 1; } };
  const countAttempt = (id, name) => { try { const all = JSON.parse(localStorage.getItem(attemptKey) || '{}'); all[`${id}/${name.toLowerCase()}`] = attemptNumber(id, name); localStorage.setItem(attemptKey, JSON.stringify(all)); } catch (_) {} };
  const answerDetails = q => ({ ...(q.choices ? { options: q.choices } : {}), ...(typeof q.correct === 'number' ? { correctAnswer: q.choices[q.correct] } : Array.isArray(q.correct) ? { correctAnswer: q.correct.map(i => q.choices[i]).join(' · ') } : q.correct && typeof q.correct === 'object' ? { correctAnswer: `${q.correct.value}${q.correct.unit ? ` ${q.correct.unit}` : ''}` } : typeof q.correct === 'string' ? { correctAnswer: q.correct } : {}), ...(q.ref ? { reference: `${refNames[q.ref.id] || q.ref.id}, ${q.ref.part}` } : {}) });
  const total = questions.length;
  const ids = new Set(questions.map(q => q.id));
  // Checkbox questions (docs/TESTING.md §2): select several, graded all or nothing. The answer is the list of ORIGINAL option indexes, ascending.
  const checkboxCorrect = (selected, correct) => Array.isArray(selected) && Array.isArray(correct) && new Set(selected).size === selected.length && selected.length === correct.length && correct.every(i => selected.includes(i));
  const checkboxTexts = (q, list) => list.map(i => q.choices[i]).join(' · ');
  const validPick = (q, value) => Array.isArray(value) && value.length > 0 && new Set(value).size === value.length && value.every(i => Number.isInteger(i) && i >= 0 && i < q.choices.length);
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem(storageKey)) || {}; } catch (_) {}
  const known = obj => obj && typeof obj === 'object' && !Array.isArray(obj) ? Object.fromEntries(Object.entries(obj).filter(([id]) => ids.has(id))) : {};
  const validOrder = Array.isArray(saved.order) && saved.order.length === total && new Set(saved.order).size === total && saved.order.every(id => ids.has(id));
  // A draft written before the shuffle existed has no order: the student saw the teacher's order and the choices as written,
  // so keep both instead of reshuffling under the saved answers and position.
  const legacyDraft = !validOrder && (saved.finished === true || [saved.answers, saved.work].some(obj => obj && typeof obj === 'object' && Object.keys(obj).length));
  const order = validOrder ? saved.order : legacyDraft ? questions.map(q => q.id) : QuizCore.shuffled(questions).map(q => q.id);
  const ordered = order.map(id => questions.find(q => q.id === id));
  const choiceOrders = {};
  ordered.filter(q => q.choices).forEach(q => {
    const previous = validOrder && saved.choiceOrders?.[q.id];
    choiceOrders[q.id] = Array.isArray(previous) && previous.length === q.choices.length && new Set(previous).size === previous.length && previous.every(i => Number.isInteger(i) && i >= 0 && i < q.choices.length) ? previous : legacyDraft ? q.choices.map((_, i) => i) : QuizCore.shuffled(q.choices.map((_, i) => i));
  });
  const answers = known(saved.answers);
  const work = known(saved.work);
  const flags = new Set(Array.isArray(saved.flags) ? saved.flags.filter(id => ids.has(id)) : []);
  let current = Number.isInteger(saved.current) ? Math.max(0, Math.min(total - 1, saved.current)) : 0;
  let finished = saved.finished === true;
  const validStamp = v => typeof v === 'string' && Number.isFinite(Date.parse(v));
  let startedAt = validStamp(saved.startedAt) ? saved.startedAt : '';
  let finishedAt = finished && validStamp(saved.finishedAt) ? saved.finishedAt : '';
  let sending = false;
  let lastScore = { earned: 0, pending: 0 };
  // Locking (docs/TESTING.md §3): a picked choice locks at once; open and numeric answers lock on "אישור".
  const locked = new Set(Array.isArray(saved.locked) ? saved.locked.filter(id => ids.has(id)) : []);
  let sent = saved.sent === true;
  let grading = saved.grading && typeof saved.grading === 'object' ? saved.grading : { status: 'none', scores: {} };
  let advanceTimer = 0;
  if (!$('student-name').value) $('student-name').value = typeof saved.name === 'string' ? saved.name.slice(0, 100) : '';
  sections.forEach((section, i) => {
    const p = document.createElement('p'); const title = document.createElement('strong');
    title.textContent = `פרק ${i + 1} · ${section.title}. `; p.append(title, section.intro); $('article').append(p);
  });
  $('article-copy').innerHTML = $('article').innerHTML;
  const sectionOf = q => sections.findIndex(s => s.title === q.topic);
  const answered = q => q.type === 'checkbox' ? validPick(q, answers[q.id]) : q.type === 'mcq' ? Number.isInteger(answers[q.id]) && answers[q.id] >= 0 && answers[q.id] < q.choices.length : typeof answers[q.id] === 'string' && answers[q.id].trim().length > 0;
  const isCorrect = q => q.type === 'checkbox' ? checkboxCorrect(answers[q.id], q.correct) : q.type === 'mcq' ? answers[q.id] === q.correct : NumericAnswer.checkNumber(answers[q.id], q.correct) === true;
  // The number is the first line (the server grades it again); the written working follows.
  const answerText = q => {
    if (!answered(q)) return 'לא נכתבה תשובה';
    if (q.type === 'checkbox') return checkboxTexts(q, answers[q.id]);
    if (q.type === 'mcq') return q.choices[answers[q.id]];
    const steps = q.type === 'fill' && typeof work[q.id] === 'string' ? work[q.id].trim() : '';
    return steps ? `${answers[q.id].trim()}\nדרך חישוב: ${steps}` : answers[q.id].trim();
  };
  const correctText = q => q.type === 'checkbox' ? checkboxTexts(q, q.correct) : q.type === 'mcq' ? q.choices[q.correct] : `${q.correct.value}${q.correct.unit ? ` ${q.correct.unit}` : ''}`;
  // The teacher's "בדקו:" list inside the model answer, shown as a list in the results.
  const checklist = q => {
    const html = q.explanation.he;
    const at = html.indexOf('<strong>בדקו:</strong>');
    if (at < 0) return { model: html, items: [] };
    const rest = html.slice(at + '<strong>בדקו:</strong>'.length).trim();
    const items = rest.split(/(?<=\?)\s+|;\s*/).map(s => s.trim()).filter(Boolean);
    return { model: html.slice(0, at).replace(/<br>\s*$/, ''), items };
  };
  const isLocked = q => q.type === 'mcq' ? answered(q) : q.type === 'checkbox' ? locked.has(q.id) && answered(q) : locked.has(q.id);
  function persist() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ name: $('student-name').value, order, choiceOrders, answers, work, flags: [...flags], locked: [...locked], current, finished, sent, grading, startedAt, finishedAt })); } catch (_) {}
  }
  // Visible timer (docs/TESTING.md §6): counts up from the stored start time, so a reload keeps it running.
  const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
  setInterval(() => { if (startedAt && !finished) $('timer').textContent = clock(Date.now() - Date.parse(startedAt)); }, 1000);
  // After a submitted answer the verdict stays on screen for a moment, then the next question opens.
  const advance = q => { clearTimeout(advanceTimer); advanceTimer = setTimeout(() => { if (ordered[current] === q) current === total - 1 ? review() : questionAt(current + 1); }, 1500); };
  function show(id, focusId) {
    document.querySelectorAll('.stage').forEach(el => el.classList.toggle('active', el.id === id));
    window.scrollTo(0, 0);
    if (focusId) $(focusId).focus({ preventScroll: true });
  }
  const countAnswered = () => { $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`; };
  // The teacher's explanations carry her own markup (<bdi>, <br>, <strong>): show them as HTML, like the summary does.
  // The verdict text in front of them stays plain text.
  const showVerdict = (prefix, html) => { const why = document.createElement('span'); why.innerHTML = html; $('choice-feedback').replaceChildren(prefix, why); };
  // Instant feedback: once a choice is picked the question locks, so the shown answer can't be swapped for the right one.
  function showFeedback(q) {
    const ok = answers[q.id] === q.correct;
    document.querySelectorAll('#choices .choice').forEach(label => {
      const input = label.querySelector('input'); const i = Number(input.value);
      input.disabled = true;
      label.classList.toggle('correct', i === q.correct);
      label.classList.toggle('incorrect', i === answers[q.id] && !ok);
    });
    showVerdict(`${ok ? '✓ נכון מאוד!' : '✕ לא נכון.'} ${ok ? '' : `התשובה הנכונה: ${q.choices[q.correct]}. `}`, q.explanation.he);
    $('choice-feedback').classList.toggle('incorrect', !ok);
    $('choice-feedback').hidden = false;
  }
  function showNumberFeedback(q) {
    const ok = isCorrect(q);
    $('number-answer').disabled = true;
    showVerdict(`${ok ? '✓ נכון מאוד!' : '✕ לא נכון.'} ${ok ? '' : `התשובה הנכונה: ${correctText(q)}. `}`, q.explanation.he);
    $('choice-feedback').classList.toggle('incorrect', !ok);
    $('choice-feedback').hidden = false;
  }
  function showCheckboxFeedback(q) {
    const ok = checkboxCorrect(answers[q.id], q.correct);
    document.querySelectorAll('#choices .choice').forEach(label => {
      const input = label.querySelector('input'); const i = Number(input.value);
      input.disabled = true;
      label.classList.toggle('correct', q.correct.includes(i));
      label.classList.toggle('incorrect', answers[q.id].includes(i) && !q.correct.includes(i));
    });
    showVerdict(`${ok ? '✓ נכון מאוד!' : '✕ לא נכון.'} ${ok ? '' : `התשובות הנכונות: ${checkboxTexts(q, q.correct)}. `}`, q.explanation.he);
    $('choice-feedback').classList.toggle('incorrect', !ok);
    $('choice-feedback').hidden = false;
  }
  function renderCheckboxes(q) {
    const picked = validPick(q, answers[q.id]) ? answers[q.id] : [];
    choiceOrders[q.id].forEach(i => {
      const label = document.createElement('label'); label.className = 'choice';
      const box = document.createElement('input'); box.type = 'checkbox'; box.value = i; box.checked = picked.includes(i);
      const text = document.createElement('span'); text.textContent = q.choices[i];
      box.disabled = isLocked(q);
      box.addEventListener('change', () => {
        if (isLocked(q)) return;
        const ticked = [...$('choices').querySelectorAll('input:checked')].map(input => Number(input.value)).sort((a, b) => a - b);
        if (ticked.length) answers[q.id] = ticked; else delete answers[q.id];
        persist(); countAnswered(); syncConfirm(q);
      });
      label.append(box, text); $('choices').append(label);
    });
    if (isLocked(q)) showCheckboxFeedback(q);
  }
  // "אישור" is for answers typed by hand: it is disabled until something is written and locks the answer.
  function syncConfirm(q) {
    $('confirm').hidden = q.type === 'mcq';
    $('confirm').disabled = isLocked(q) || !answered(q);
  }
  function confirmAnswer() {
    const q = ordered[current];
    if (q.type === 'mcq' || isLocked(q) || !answered(q)) return;
    locked.add(q.id); persist(); syncConfirm(q);
    $('answer').disabled = true; $('number-answer').disabled = true; $('work').disabled = true;
    if (q.type === 'fill') showNumberFeedback(q);
    if (q.type === 'checkbox') showCheckboxFeedback(q);
    advance(q);
  }
  function questionAt(index) {
    clearTimeout(advanceTimer);
    current = index;
    const q = ordered[index];
    if (startedAt && !finished) $('timer').textContent = clock(Date.now() - Date.parse(startedAt));
    $('counter').textContent = `שאלה ${index + 1} מתוך ${total}`;
    countAnswered();
    $('progress').style.width = `${(index + 1) / total * 100}%`;
    $('progress-bar').setAttribute('aria-valuenow', index + 1);
    $('question-topic').textContent = `פרק ${sectionOf(q) + 1} · ${q.topic}`;
    $('question-title').innerHTML = q.prompt; // the teacher's text, verbatim (contains <br>)
    $('figure').innerHTML = figures[q.id] || '';
    $('figure').hidden = !figures[q.id];
    $('choices').replaceChildren(); $('choice-feedback').hidden = true;
    $('choices').hidden = q.type !== 'mcq' && q.type !== 'checkbox';
    $('open-answer').hidden = q.type !== 'open';
    $('number-answer-box').hidden = q.type !== 'fill';
    if (q.type === 'open') { $('answer').value = typeof answers[q.id] === 'string' ? answers[q.id] : ''; $('answer').disabled = isLocked(q); }
    else if (q.type === 'fill') {
      $('number-answer').value = typeof answers[q.id] === 'string' ? answers[q.id] : '';
      $('number-answer').disabled = isLocked(q);
      if (isLocked(q)) showNumberFeedback(q);
      $('work').value = typeof work[q.id] === 'string' ? work[q.id] : '';
      $('work').disabled = isLocked(q);
    } else if (q.type === 'checkbox') renderCheckboxes(q);
    else choiceOrders[q.id].forEach(i => {
      const label = document.createElement('label'); label.className = 'choice';
      const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'choice'; radio.value = i; radio.checked = answers[q.id] === i;
      const text = document.createElement('span'); text.textContent = q.choices[i];
      radio.disabled = isLocked(q);
      radio.addEventListener('change', () => { if (isLocked(q)) return; answers[q.id] = i; persist(); countAnswered(); showFeedback(q); advance(q); });
      label.append(radio, text); $('choices').append(label);
    });
    if (q.type === 'mcq' && answered(q)) showFeedback(q);
    syncConfirm(q);
    $('flag').checked = flags.has(q.id);
    $('previous').textContent = index === 0 ? 'חזרה לטקסט' : 'לשאלה הקודמת';
    $('next').textContent = index === total - 1 ? 'לבדיקת התשובות' : 'לשאלה הבאה';
    persist(); show('question-stage', 'question-title');
  }
  function review() {
    const missing = ordered.filter(q => !answered(q)).length;
    $('review-status').textContent = `${missing} שאלות ללא תשובה · ${flags.size} שאלות מסומנות לבדיקה. אפשר ללחוץ על כל שאלה כדי לחזור אליה.`;
    $('review-list').replaceChildren(); $('review-error').textContent = '';
    ordered.forEach((q, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'review-item';
      const title = document.createElement('strong'); title.textContent = `${i + 1}. ${plainText(q.prompt).replace(/\n/g, ' ')}${flags.has(q.id) ? ' · ⚑ לבדיקה חוזרת' : ''}`;
      const answer = document.createElement('span'); answer.textContent = answerText(q).replace(/\n/g, ' · ');
      button.append(title, answer); button.addEventListener('click', () => questionAt(i)); $('review-list').append(button);
    });
    show('review', 'review-title');
  }
  function results() {
    const graded = questions.filter(q => q.type !== 'open');
    const fractions = Object.fromEntries(graded.map(q => [q.id, isCorrect(q) ? 1 : 0]));
    const score = lastScore = QuizCore.scoreQuiz(questions, fractions);
    const openCount = questions.length - graded.length;
    // Final score once the open answers were checked (auto points + the checker's points); otherwise a partial score.
    const checked = grading.status === 'ok';
    const aiPoints = checked ? Object.values(grading.scores).reduce((sum, item) => sum + (Number(item.score) || 0), 0) : 0;
    $('score').textContent = checked ? `ציון: ${Math.round((score.earned + aiPoints) * 10) / 10} מתוך 100.`
      : `ציון חלקי: ${score.earned} מתוך ${100 - score.pending} נקודות · ${score.pending} נקודות מהשאלות הפתוחות (${openCount} שאלות) עדיין לא נבדקו.`;
    $('done-banner').hidden = !sent; $('retry').hidden = !sent; $('regrade').hidden = !(sent && grading.status === 'failed');
    if (sent) $('send-status').textContent = '';
    if (startedAt && finishedAt) {
      const mins = Math.max(1, Math.round((Date.parse(finishedAt) - Date.parse(startedAt)) / 60000));
      $('score').textContent += ` זמן המבחן: ${mins === 1 ? 'דקה אחת' : mins + ' דקות'}.`;
    }
    $('topics').replaceChildren(); $('explanations').replaceChildren();
    sections.forEach(({ title: topic }) => {
      const group = questions.filter(q => q.topic === topic); const auto = group.filter(q => q.type !== 'open');
      const item = document.createElement('li'); item.textContent = `${topic}: ${auto.filter(q => fractions[q.id]).length} מתוך ${auto.length} תשובות אוטומטיות נכונות · ${group.length - auto.length} פתוחות לבדיקה`;
      $('topics').append(item);
    });
    ordered.forEach((q, i) => {
      const card = document.createElement('article'); card.className = 'card result-detail';
      const title = document.createElement('h2'); title.textContent = `${i + 1}. ${plainText(q.prompt).replace(/\n/g, ' ')}`;
      const answer = document.createElement('p'); answer.textContent = `התשובה שלי: ${answerText(q).replace(/\n/g, ' · ')}`;
      const feedback = document.createElement('p');
      card.append(title, answer, feedback);
      if (q.type === 'open') {
        feedback.textContent = grading.scores[q.id] ? `ניקוד: ${grading.scores[q.id].score} מתוך ${grading.scores[q.id].max}` : '';
        const { model, items } = checklist(q); // the teacher's model answer and her "בדקו:" list, verbatim
        const sample = document.createElement('p'); sample.className = 'model-answer'; sample.innerHTML = model; card.append(sample);
        if (items.length) {
          const heading = document.createElement('p'); heading.className = 'model-answer'; heading.textContent = 'בדקו:';
          const list = document.createElement('ul'); list.className = 'self-check';
          items.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
          card.append(heading, list);
        }
      } else {
        feedback.textContent = `${fractions[q.id] ? '✓ תשובה נכונה' : '✕ תשובה שגויה'} · התשובה הנכונה: ${correctText(q)}. `;
        const why = document.createElement('span'); why.innerHTML = q.explanation.he; feedback.append(why); // her text, contains <bdi>
      }
      const reference = q.ref && references[q.ref.id];
      if (reference) {
        const source = document.createElement('p'); source.className = 'source-line';
        source.textContent = `מקור: ${q.ref.part} ${sourceIn[reference.kind]}`; card.append(source);
      }
      $('explanations').append(card);
    });
    show('results', 'results-title');
  }
  $('student-name').addEventListener('input', persist);
  $('begin').addEventListener('click', () => {
    if (!$('student-name').value.trim()) { $('name-error').textContent = 'יש לכתוב שם לפני שמתחילים.'; $('student-name').focus(); return; }
    $('name-error').textContent = ''; if (!startedAt) startedAt = new Date().toISOString(); persist(); questionAt(current);
  });
  $('answer').addEventListener('input', () => { const q = ordered[current]; if (isLocked(q)) return; answers[q.id] = $('answer').value; persist(); countAnswered(); syncConfirm(q); });
  $('number-answer').addEventListener('input', () => { const q = ordered[current]; if (isLocked(q)) return; answers[q.id] = $('number-answer').value; persist(); countAnswered(); syncConfirm(q); });
  $('number-answer').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); confirmAnswer(); } });
  $('work').addEventListener('input', () => { const q = ordered[current]; if (isLocked(q)) return; work[q.id] = $('work').value; persist(); });
  $('confirm').addEventListener('click', confirmAnswer);
  $('flag').addEventListener('change', () => { const id = ordered[current].id; $('flag').checked ? flags.add(id) : flags.delete(id); persist(); });
  $('previous').addEventListener('click', () => current === 0 ? show('start', 'page-title') : questionAt(current - 1));
  $('next').addEventListener('click', () => current === total - 1 ? review() : questionAt(current + 1));
  $('review-button').addEventListener('click', review);
  $('back-to-questions').addEventListener('click', () => questionAt(current));
  $('finish').addEventListener('click', () => {
    if (ordered.some(q => !answered(q))) { $('review-error').textContent = 'יש להשלים את כל התשובות לפני הסיום. השאלות החסרות מסומנות ברשימה.'; return; }
    // Finishing sends at once and locks everything (docs/TESTING.md §6): there is no way back to edit.
    ordered.forEach(q => locked.add(q.id));
    finished = true; if (!finishedAt) finishedAt = new Date().toISOString(); persist(); results(); sendExam();
  });
  $('retry').addEventListener('click', () => { if (sending) return; try { sessionStorage.removeItem(storageKey); } catch (_) {} location.reload(); });
  $('send').addEventListener('click', () => sendExam());
  // Same endpoint, origin logic, 45s timeout and error text as library-exam.js; `exam` selects the physics entry of
  // the server's exam table (27 answers, own subject line, same Resend account and teacher).
  async function sendExam() {
    if (sending || sent) return;
    sending = true; $('send').hidden = true; $('retry').disabled = true;
    $('send-status').textContent = 'שולחים…';
    try {
      const response = await fetch(location.hostname === 'michaelmishaev.github.io' ? 'https://hitech.agnon.online/api/submit-exam' : '/api/submit-exam', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ exam: examId, name: $('student-name').value.trim(), attempt: attemptNumber(examId, $('student-name').value.trim()), answers: ordered.map(q => ({ questionId: q.id, question: plainText(q.prompt), answer: answerText(q), ...answerDetails(q), ...(q.type === 'open' ? {} : { correct: isCorrect(q) }) })), score: { earned: lastScore.earned, pending: lastScore.pending }, ...(startedAt && finishedAt ? { startedAt, finishedAt } : {}) }), signal: AbortSignal.timeout(45000)
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error('Submission failed');
      countAttempt(examId, $('student-name').value.trim());
      // The answers are with the teacher: the draft stays only as a locked, read-only summary (a reload shows it again).
      sent = true;
      grading = data.grading && typeof data.grading === 'object' ? { status: data.grading.status, scores: data.grading.scores || {}, submissionRef: typeof data.submissionRef === 'string' ? data.submissionRef : '' } : { status: 'none', scores: {} };
      try { sessionStorage.setItem('physics-exam-result-v1', JSON.stringify({ startedAt, finishedAt, total, score: { earned: lastScore.earned, pending: lastScore.pending } })); } catch (_) {}
      persist(); results();
    } catch (_) {
      $('send-status').textContent = 'לא התקבל אישור שליחה. הטיוטה נשמרה. בקשו מהמורה לבדוק אם ההודעה הגיעה לפני ניסיון נוסף.';
      $('send').hidden = false;
    } finally { sending = false; $('retry').disabled = false; }
  }
  // The open answers could not be checked: ask again without sending anything else (answers are already locked).
  $('regrade').addEventListener('click', async () => {
    $('regrade').disabled = true; $('send-status').textContent = 'בודקים את התשובות הפתוחות…';
    try {
      const response = await fetch(location.hostname === 'michaelmishaev.github.io' ? 'https://hitech.agnon.online/api/grade-open' : '/api/grade-open', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ exam: examId, ...(grading.submissionRef ? { submissionRef: grading.submissionRef } : {}), answers: ordered.filter(q => q.type === 'open').map(q => ({ questionId: q.id, question: plainText(q.prompt), answer: answerText(q) })) }), signal: AbortSignal.timeout(45000)
      });
      const data = await response.json();
      if (!response.ok || data.grading?.status !== 'ok') throw new Error('Grading failed');
      grading = { status: 'ok', scores: data.grading.scores || {}, submissionRef: grading.submissionRef }; persist(); results();
    } catch (_) { $('send-status').textContent = 'הבדיקה לא הצליחה. אפשר לנסות שוב.'; }
    finally { $('regrade').disabled = false; }
  });
  if (finished && ordered.every(answered) && $('student-name').value.trim()) { results(); if (!sent) sendExam(); }
  });
})();
