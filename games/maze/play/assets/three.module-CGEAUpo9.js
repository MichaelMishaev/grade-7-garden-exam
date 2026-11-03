(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Ts=n=>String(n||"").replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`);function Qp(n){const e=n.context?`<p dir="auto">${Ts(n.context)}</p>`:"",t=typeof n.image=="string"&&/^https:\/\/user\.cdn\.wordwall\.net\/content-images\/[a-zA-Z0-9/_-]+$/.test(n.image)?`<img src="${Ts(n.image)}" alt="${Ts(n.imageAlt)}" referrerpolicy="no-referrer" style="display:block;max-width:100%;width:auto;height:100px;object-fit:contain;margin:8px auto">`:"";return e+t}const gs={quizzes:[{id:"facts",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"עובדה או דעה?",description:"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"facts-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"„בפעילות השתתפו שלוש כיתות.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק כמה כיתות השתתפו בפעילות.",en:"The number of participating classes can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.",en:"“More interesting” is a personal judgment, so this is an opinion."},ref:{id:"garden-passage",part:"פסקה 3"}},{id:"facts-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק אילו צמחים נשתלו בגינה.",en:"The plants in the garden can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.",en:"“The best” is a personal evaluation, not a defined measurable fact here."},ref:{id:"garden-passage",part:null}},{id:"facts-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק את לוח ההשקיה של הכיתות.",en:"The class watering schedule can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"„לדעתי, הפעילות בגינה נהדרת.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.",en:"The word “in my opinion” clearly signals an opinion."},ref:{id:"garden-passage",part:null}}]},{id:"questions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מילות שאלה",description:"בוחרים את מילת השאלה המתאימה למידע שמחפשים.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"questions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?",choices:["מתי","מי","כמה"],correct:0,explanation:{he:"„מתי” מבקשת זמן או מועד.",en:"“When” asks about a time or date."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?",choices:["כיצד","כמה","היכן"],correct:1,explanation:{he:"„כמה” מבקשת מספר או כמות.",en:"“How many” asks for a number or quantity."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?",choices:["מדוע","מתי","מי"],correct:0,explanation:{he:"„מדוע” מבקשת סיבה: למה עשו זאת?",en:"“Why” asks for the reason something happened."},ref:{id:"garden-passage",part:"פסקה 2"}},{id:"questions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?",choices:["כמה","היכן","כיצד"],correct:1,explanation:{he:"„היכן” מבקשת מקום.",en:"“Where” asks about a place."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?",choices:["כיצד","מתי","מי"],correct:0,explanation:{he:"„כיצד” מבקשת דרך או אופן פעולה.",en:"“How” asks about the way something was done."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?",choices:["היכן","מי","מדוע"],correct:1,explanation:{he:"„מי” מבקשת לזהות אדם.",en:"“Who” asks which person did something."},ref:{id:"garden-passage",part:"פסקה 3"}}]},{id:"instructions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מבינים הוראות",description:"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"instructions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?",choices:["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],correct:0,explanation:{he:"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.",en:"“Copy” means use the wording from the passage."},ref:{id:"garden-passage",part:null}},{id:"instructions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?",choices:["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],correct:1,explanation:{he:"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.",en:"“Justify” asks for a reason or evidence."},ref:{id:"garden-passage",part:null}},{id:"instructions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?",choices:["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],correct:0,explanation:{he:"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.",en:"“State” usually asks for the requested detail briefly."},ref:{id:"garden-passage",part:null}},{id:"instructions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הסבירו”. מה צריך לעשות?",choices:["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],correct:1,explanation:{he:"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.",en:"“Explain” asks for details about how or why."},ref:{id:"garden-passage",part:null}},{id:"instructions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?",choices:["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],correct:1,explanation:{he:"שאלה מלאה כוללת מילת שאלה ומשפט שלם.",en:"A full question includes a question word and a complete sentence."},ref:{id:"garden-passage",part:null}},{id:"instructions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?",choices:["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],correct:1,explanation:{he:"צריך לציין מה חושבים ולתת סיבה אחת לפחות.",en:"State your view and give at least one supporting reason."},ref:{id:"garden-passage",part:null}}]},{id:"physics-basics",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מדידה ושיטות מדידה",description:"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-basics-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מה חייבים לציין בתוצאת מדידה?",choices:["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?",choices:["ישירה","עקיפה","לא מדידה"],correct:0,explanation:{he:"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?",choices:["ישירה","עקיפה","הערכה ללא מדידה"],correct:1,explanation:{he:"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איך מחשבים עובי ממוצע של דף בערימה?",choices:["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],correct:0,explanation:{he:"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?",choices:["0.1 מ״מ","1 מ״מ","10 מ״מ"],correct:0,explanation:{he:"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"למה כדאי למדוד ערימה של דפים מאותו סוג?",choices:["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],correct:0,explanation:{he:"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"מהי מדידה?",choices:["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],correct:0,explanation:{he:"מדידה משווה גודל ליחידת מידה מוסכמת.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה מתאים לתיאור אורך עיפרון?",choices:["14 ס״מ","14 בלבד","ס״מ בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזו פעולה היא מדידה עקיפה?",choices:["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],correct:0,explanation:{he:"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?",choices:["0.1 מ״מ","10 מ״מ","1 מ״מ"],correct:0,explanation:{he:"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה מודדים ערימת דפים בלי הכריכה?",choices:["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],correct:0,explanation:{he:"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}}]},{id:"physics-units",subject_id:"physics",exam_id:"physics-v1-assessment",title:"המרת יחידות אורך",description:"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-units-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים יש במטר אחד?",choices:["10","100","1,000"],correct:1,explanation:{he:"מטר אחד שווה ל־100 סנטימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים יש בסנטימטר אחד?",choices:["10","100","1,000"],correct:0,explanation:{he:"סנטימטר אחד שווה ל־10 מילימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים יש ב־2 קילומטרים?",choices:["200","2,000","20,000"],correct:1,explanation:{he:"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 2.4 מטרים?",choices:["24","240","2,400"],correct:1,explanation:{he:"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים הם 350 סנטימטרים?",choices:["3.5","35","0.35"],correct:0,explanation:{he:"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"כמה הם מטר אחד ועוד 25 ס״מ?",choices:["1.25 מטרים","26 מטרים","1.025 מטרים"],correct:0,explanation:{he:"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים הם 3 ס״מ?",choices:["30 מ״מ","3 מ״מ","300 מ״מ"],correct:0,explanation:{he:"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 12 מ״מ?",choices:["1.2 ס״מ","12 ס״מ","120 ס״מ"],correct:0,explanation:{he:"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"כמה קילומטרים הם 1,500 מטרים?",choices:["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],correct:0,explanation:{he:"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה ארוך יותר: 90 ס״מ או מטר אחד?",choices:["מטר אחד","90 ס״מ","הם שווים"],correct:0,explanation:{he:"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?",choices:["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],correct:0,explanation:{he:"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}}]},{id:"physics-precision",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים נכון",description:"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-precision-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מאיזו נקודה בסרגל מתחילים למדוד אורך?",choices:["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],correct:0,explanation:{he:"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?",choices:["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?",choices:["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],correct:0,explanation:{he:"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים יותר למדידת אורך של חדר?",choices:["סרט מדידה","סרגל קצר בלבד","שעון"],correct:0,explanation:{he:"סרט מדידה מתאים יותר לאורכו של חדר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"מה מאפשרות שנתות קטנות יותר על כלי מדידה?",choices:["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],correct:0,explanation:{he:"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"מדוע חוזרים על מדידה?",choices:["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],correct:0,explanation:{he:"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?",choices:["6 ס״מ","9 ס״מ","12 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"למה לא תמיד מתחילים למדוד מקצה הסרגל?",choices:["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],correct:0,explanation:{he:"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים למדידת אורך של עיפרון?",choices:["סרגל עם שנתות קטנות","שעון עצר","מדחום"],correct:0,explanation:{he:"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה חזרה על מדידה אינה מתקנת בהכרח?",choices:["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],correct:0,explanation:{he:"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה כדאי לבדוק לפני שרושמים תוצאה?",choices:["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],correct:0,explanation:{he:"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}}]},{id:"physics-pole",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים גובה של עמוד",description:"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-pole-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?",choices:["45°","90°","180°"],correct:0,explanation:{he:"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מה שווה למרחק האופקי לעמוד בשיטת 45°?",choices:["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],correct:0,explanation:{he:"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?",choices:["7.4 מטרים","6 מטרים","4.6 מטרים"],correct:0,explanation:{he:"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה מרחק מודדים לצורך החישוב?",choices:["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],correct:0,explanation:{he:"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזה גובה מוסיפים למרחק האופקי?",choices:["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],correct:0,explanation:{he:"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזה תנאי נדרש לשיטה המתוארת?",choices:["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],correct:0,explanation:{he:"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?",choices:["5.5 מטרים","4 מטרים","2.5 מטרים"],correct:0,explanation:{he:"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?",choices:["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],correct:0,explanation:{he:"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"מהו תפקיד המשולש בעל זווית 45°?",choices:["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],correct:0,explanation:{he:"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?",choices:["5 מטרים","10 מטרים","2.5 מטרים"],correct:0,explanation:{he:"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה זו מדידה עקיפה?",choices:["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],correct:0,explanation:{he:"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}}]},{id:"english-v1-practice",subject_id:"english",exam_id:"english-v1-practice",title:"אנגלית · אוצר מילים ודקדוק",description:"תרגול למבחן 9.11: אוצר מילים, חלקי דיבר והווה פשוט. הבנת הנקרא וכתיבה במבחן המלא.",references:[{id:"english-teacher-material",kind:"site",title:"חומר המורה ודוגמאות התרגול למבחן באנגלית",url:"https://docs.google.com/document/d/1feJMJs_EXvdRq6xC-TQj_Nzcf6Rh7uYNHxxrG81j1qU/edit",attribution:null,parts:[{part:"חלקי דיבר",title:"חלקי דיבר"},{part:"הווה פשוט — חיוב",title:"הווה פשוט — חיוב"},{part:"הווה פשוט — שלילה",title:"הווה פשוט — שלילה"},{part:"הווה פשוט — שאלות",title:"הווה פשוט — שאלות"},{part:"כתיבה — אדם שאני מעריך",title:"כתיבה — אדם שאני מעריך"}]},{id:"english-vocabulary-12",kind:"site",title:"אוצר מילים — תרגול המורה לעמוד 12",url:"https://wordwall.net/resource/36327179",attribution:null,parts:[{part:"אוצר מילים — עמוד 12",title:"אוצר מילים — עמוד 12"}]},{id:"english-vocabulary-20",kind:"site",title:"אוצר מילים — תרגול המורה לעמוד 20",url:"https://wordwall.net/resource/36327199",attribution:null,parts:[{part:"אוצר מילים — עמוד 20",title:"אוצר מילים — עמוד 20"}]},{id:"english-vocabulary-28",kind:"site",title:"אוצר מילים — תרגול המורה לעמוד 28",url:"https://wordwall.net/resource/36327212",attribution:null,parts:[{part:"אוצר מילים — עמוד 28",title:"אוצר מילים — עמוד 28"}]}],questions:[{id:"english-06",position:6,type:"mcq",topic:"אוצר מילים",difficulty:"easy",prompt:"Choose the Hebrew meaning of “journey”.",choices:["מסע","גשר","בחירה","סכנה"],correct:0,explanation:{he:"בתרגול אוצר המילים בעמוד 12, journey פירושו מסע.",en:""},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-07",position:7,type:"mcq",topic:"אוצר מילים",difficulty:"easy",prompt:"Choose the word that means “זהיר”.",choices:["careful","wide","usual","possible"],correct:0,explanation:{he:"בתרגול עמוד 12, careful פירושו זהיר.",en:""},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-08",position:8,type:"mcq",topic:"אוצר מילים",difficulty:"easy",prompt:"Choose the word that means “ארוחה”.",choices:["meal","bowl","guide","world"],correct:0,explanation:{he:"בתרגול עמוד 20, meal פירושו ארוחה.",en:""},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-09",position:9,type:"mcq",topic:"אוצר מילים",difficulty:"medium",prompt:"Choose the best word: “I want to ___ the school club.”",choices:["join","feed","receive","serve"],correct:0,explanation:{he:"בתרגול עמוד 28, join פירושו להצטרף; מצטרפים למועדון.",en:""},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-10",position:10,type:"mcq",topic:"חלקי דיבר",difficulty:"medium",prompt:"In “The guide helps visitors”, what is the part of speech of “guide”?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"guide מציין אדם ולכן הוא שם עצם במשפט הזה.",en:""},ref:{id:"english-teacher-material",part:"חלקי דיבר"}},{id:"english-11",position:11,type:"mcq",topic:"חלקי דיבר",difficulty:"medium",prompt:"In “The children walk to school”, what is the part of speech of “walk”?",choices:["Verb","Noun","Adjective"],correct:0,explanation:{he:"walk מתאר פעולה ולכן הוא פועל.",en:""},ref:{id:"english-teacher-material",part:"חלקי דיבר"}},{id:"english-12",position:12,type:"mcq",topic:"חלקי דיבר",difficulty:"medium",prompt:"In “She is a careful guide”, what is the part of speech of “careful”?",choices:["Adjective","Noun","Verb"],correct:0,explanation:{he:"careful מתאר את המדריכה ולכן הוא שם תואר.",en:""},ref:{id:"english-teacher-material",part:"חלקי דיבר"}},{id:"english-13",position:13,type:"mcq",topic:"הווה פשוט — חיוב",difficulty:"medium",prompt:"Choose the correct form: “My aunt ___ near the river every day.”",choices:["walks","walk","walking","are walk"],correct:0,explanation:{he:"בהווה פשוט מוסיפים s לפועל עם נושא בגוף שלישי יחיד, כמו my aunt.",en:""},ref:{id:"english-teacher-material",part:"הווה פשוט — חיוב"}},{id:"english-14",position:14,type:"mcq",topic:"הווה פשוט — חיוב",difficulty:"medium",prompt:"Choose the correct form: “The children ___ English at school.”",choices:["study","studies","studying","is study"],correct:0,explanation:{he:"עם נושא ברבים משתמשים בצורת הבסיס study.",en:""},ref:{id:"english-teacher-material",part:"הווה פשוט — חיוב"}},{id:"english-15",position:15,type:"mcq",topic:"הווה פשוט — שלילה",difficulty:"medium",prompt:"Choose the correct form: “Maya ___ work on Sundays.”",choices:["doesn’t","don’t","isn’t","aren’t"],correct:0,explanation:{he:"עם Maya משתמשים ב־doesn’t ואחריו פועל בצורת הבסיס.",en:""},ref:{id:"english-teacher-material",part:"הווה פשוט — שלילה"}},{id:"english-16",position:16,type:"mcq",topic:"הווה פשוט — שלילה",difficulty:"medium",prompt:"Is this sentence grammatically correct? “They don’t lives in a city.”",choices:["True","False"],correct:1,explanation:{he:"אחרי don’t הפועל בצורת הבסיס: They don’t live in a city.",en:""},ref:{id:"english-teacher-material",part:"הווה פשוט — שלילה"}},{id:"english-17",position:17,type:"mcq",topic:"הווה פשוט — שאלות",difficulty:"hard",prompt:"Choose the correct question.",choices:["Does your aunt help visitors?","Does your aunt helps visitors?","Do your aunt help visitors?","Your aunt does help visitors?"],correct:0,explanation:{he:"שאלה עם your aunt נפתחת ב־Does ואחריו הנושא ופועל הבסיס help.",en:""},ref:{id:"english-teacher-material",part:"הווה פשוט — שאלות"}},{id:"english-18",position:18,type:"mcq",topic:"הווה פשוט — שאלות",difficulty:"hard",prompt:"Is this sentence grammatically correct? “Do the children study English every day?”",choices:["True","False"],correct:0,explanation:{he:"עם children משתמשים ב־Do, ואחריו הנושא ופועל הבסיס study.",en:""},ref:{id:"english-teacher-material",part:"הווה פשוט — שאלות"}}]},{id:"english-vocabulary-12",subject_id:"english",exam_id:"english-v1-practice",title:"אוצר מילים — תרגול המורה לעמוד 12",description:"כל הפריטים התקינים בתרגיל המורה · 25 שאלות",references:[{id:"english-vocabulary-12",kind:"site",title:"אוצר מילים — תרגול המורה לעמוד 12",url:"https://wordwall.net/he/resource/36327179?wwmethod=link",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"אוצר מילים — עמוד 12",title:"אוצר מילים — עמוד 12"}]}],questions:[{id:"english-vocabulary-12-01",position:1,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “activity”?",choices:["פעילות","גשר","בחירה, ברירה","סכנה"],correct:0,explanation:{he:"בתרגול המורה: activity — פעילות.",en:"The teacher's vocabulary pair is activity — פעילות."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-02",position:2,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “bridge”?",choices:["גשר","פעילות","בחירה, ברירה","סכנה"],correct:0,explanation:{he:"בתרגול המורה: bridge — גשר.",en:"The teacher's vocabulary pair is bridge — גשר."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-03",position:3,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “choice”?",choices:["בחירה, ברירה","פעילות","גשר","סכנה"],correct:0,explanation:{he:"בתרגול המורה: choice — בחירה, ברירה.",en:"The teacher's vocabulary pair is choice — בחירה, ברירה."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-04",position:4,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “danger”?",choices:["סכנה","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: danger — סכנה.",en:"The teacher's vocabulary pair is danger — סכנה."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-05",position:5,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “journey”?",choices:["מסע","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: journey — מסע.",en:"The teacher's vocabulary pair is journey — מסע."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-06",position:6,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “mountain”?",choices:["הר","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: mountain — הר.",en:"The teacher's vocabulary pair is mountain — הר."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-07",position:7,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “river”?",choices:["נהר","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: river — נהר.",en:"The teacher's vocabulary pair is river — נהר."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-08",position:8,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “village”?",choices:["כפר","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: village — כפר.",en:"The teacher's vocabulary pair is village — כפר."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-09",position:9,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “continue”?",choices:["להמשיך","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: continue — להמשיך.",en:"The teacher's vocabulary pair is continue — להמשיך."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-10",position:10,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “depend on”?",choices:["להסתמך על","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: depend on — להסתמך על.",en:"The teacher's vocabulary pair is depend on — להסתמך על."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-11",position:11,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “fix”?",choices:["לתקן","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: fix — לתקן.",en:"The teacher's vocabulary pair is fix — לתקן."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-12",position:12,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “imagine”?",choices:["לדמיין, להאמין","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: imagine — לדמיין, להאמין.",en:"The teacher's vocabulary pair is imagine — לדמיין, להאמין."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-13",position:13,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “prefer”?",choices:["להעדיף","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: prefer — להעדיף.",en:"The teacher's vocabulary pair is prefer — להעדיף."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-14",position:14,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “realize”?",choices:["להבין, לקלוט","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: realize — להבין, לקלוט.",en:"The teacher's vocabulary pair is realize — להבין, לקלוט."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-15",position:15,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “careful”?",choices:["זהיר","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: careful — זהיר.",en:"The teacher's vocabulary pair is careful — זהיר."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-16",position:16,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “dangerous”?",choices:["מסוכן","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: dangerous — מסוכן.",en:"The teacher's vocabulary pair is dangerous — מסוכן."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-17",position:17,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “possible”?",choices:["אפשרי","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: possible — אפשרי.",en:"The teacher's vocabulary pair is possible — אפשרי."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-18",position:18,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “unusual”?",choices:["יוצא דופן","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: unusual — יוצא דופן.",en:"The teacher's vocabulary pair is unusual — יוצא דופן."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-19",position:19,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “usual”?",choices:["רגיל","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: usual — רגיל.",en:"The teacher's vocabulary pair is usual — רגיל."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-20",position:20,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “wide”?",choices:["רחב","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: wide — רחב.",en:"The teacher's vocabulary pair is wide — רחב."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-21",position:21,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “across”?",choices:["מעבר","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: across — מעבר.",en:"The teacher's vocabulary pair is across — מעבר."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-22",position:22,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “any”?",choices:["איזשהו, כל","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: any — איזשהו, כל.",en:"The teacher's vocabulary pair is any — איזשהו, כל."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-23",position:23,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “anybody”?",choices:["כל אחד","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: anybody — כל אחד.",en:"The teacher's vocabulary pair is anybody — כל אחד."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-24",position:24,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “directly”?",choices:["ישירות","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: directly — ישירות.",en:"The teacher's vocabulary pair is directly — ישירות."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}},{id:"english-vocabulary-12-25",position:25,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 12",difficulty:"medium",prompt:"מה פירוש הביטוי “next to”?",choices:["ליד","פעילות","גשר","בחירה, ברירה"],correct:0,explanation:{he:"בתרגול המורה: next to — ליד.",en:"The teacher's vocabulary pair is next to — ליד."},ref:{id:"english-vocabulary-12",part:"אוצר מילים — עמוד 12"}}]},{id:"english-vocabulary-20",subject_id:"english",exam_id:"english-v1-practice",title:"אוצר מילים — תרגול המורה לעמוד 20",description:"כל הפריטים התקינים בתרגיל המורה · 25 שאלות",references:[{id:"english-vocabulary-20",kind:"site",title:"אוצר מילים — תרגול המורה לעמוד 20",url:"https://wordwall.net/he/resource/36327199?wwmethod=link",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"אוצר מילים — עמוד 20",title:"אוצר מילים — עמוד 20"}]}],questions:[{id:"english-vocabulary-20-01",position:1,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “bowl”?",choices:["קערה","מדריך","היסטוריה","עבודה"],correct:0,explanation:{he:"בתרגול המורה: bowl — קערה.",en:"The teacher's vocabulary pair is bowl — קערה."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-02",position:2,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “guide”?",choices:["מדריך","קערה","היסטוריה","עבודה"],correct:0,explanation:{he:"בתרגול המורה: guide — מדריך.",en:"The teacher's vocabulary pair is guide — מדריך."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-03",position:3,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “history”?",choices:["היסטוריה","קערה","מדריך","עבודה"],correct:0,explanation:{he:"בתרגול המורה: history — היסטוריה.",en:"The teacher's vocabulary pair is history — היסטוריה."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-04",position:4,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “job”?",choices:["עבודה","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: job — עבודה.",en:"The teacher's vocabulary pair is job — עבודה."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-05",position:5,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “lemon”?",choices:["לימון","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: lemon — לימון.",en:"The teacher's vocabulary pair is lemon — לימון."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-06",position:6,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “meal”?",choices:["ארוחה","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: meal — ארוחה.",en:"The teacher's vocabulary pair is meal — ארוחה."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-07",position:7,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “nation”?",choices:["אומה","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: nation — אומה.",en:"The teacher's vocabulary pair is nation — אומה."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-08",position:8,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “oil”?",choices:["שמן","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: oil — שמן.",en:"The teacher's vocabulary pair is oil — שמן."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-11",position:11,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “world”?",choices:["עולם","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: world — עולם.",en:"The teacher's vocabulary pair is world — עולם."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-12",position:12,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “amaze”?",choices:["להדהים","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: amaze — להדהים.",en:"The teacher's vocabulary pair is amaze — להדהים."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-13",position:13,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “fall (fell) in love”?",choices:["להתאהב","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: fall (fell) in love — להתאהב.",en:"The teacher's vocabulary pair is fall (fell) in love — להתאהב."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-14",position:14,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “feed”?",choices:["להאכיל","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: feed — להאכיל.",en:"The teacher's vocabulary pair is feed — להאכיל."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-15",position:15,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “follow”?",choices:["ללכת בעקבות","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: follow — ללכת בעקבות.",en:"The teacher's vocabulary pair is follow — ללכת בעקבות."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-16",position:16,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “open”?",choices:["לפתוח","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: open — לפתוח.",en:"The teacher's vocabulary pair is open — לפתוח."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-17",position:17,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “receive”?",choices:["לקבל","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: receive — לקבל.",en:"The teacher's vocabulary pair is receive — לקבל."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-18",position:18,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “serve”?",choices:["לשרת, להגיש","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: serve — לשרת, להגיש.",en:"The teacher's vocabulary pair is serve — לשרת, להגיש."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-19",position:19,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “shake hands”?",choices:["ללחוץ ידיים","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: shake hands — ללחוץ ידיים.",en:"The teacher's vocabulary pair is shake hands — ללחוץ ידיים."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-20",position:20,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “welcome”?",choices:["להגיד שלום, לקבל בברכה","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: welcome — להגיד שלום, לקבל בברכה.",en:"The teacher's vocabulary pair is welcome — להגיד שלום, לקבל בברכה."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-21",position:21,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “amazing”?",choices:["מדהים","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: amazing — מדהים.",en:"The teacher's vocabulary pair is amazing — מדהים."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-22",position:22,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “certain”?",choices:["בטוח","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: certain — בטוח.",en:"The teacher's vocabulary pair is certain — בטוח."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-23",position:23,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “lovely”?",choices:["נעים, נחמד","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: lovely — נעים, נחמד.",en:"The teacher's vocabulary pair is lovely — נעים, נחמד."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-24",position:24,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “main”?",choices:["עיקרי","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: main — עיקרי.",en:"The teacher's vocabulary pair is main — עיקרי."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-25",position:25,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “typical”?",choices:["טיפוסי","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: typical — טיפוסי.",en:"The teacher's vocabulary pair is typical — טיפוסי."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-26",position:26,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “warm”?",choices:["חם (התנהגות)","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: warm — חם (התנהגות).",en:"The teacher's vocabulary pair is warm — חם (התנהגות)."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}},{id:"english-vocabulary-20-27",position:27,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 20",difficulty:"medium",prompt:"מה פירוש הביטוי “according to”?",choices:["לפי","קערה","מדריך","היסטוריה"],correct:0,explanation:{he:"בתרגול המורה: according to — לפי.",en:"The teacher's vocabulary pair is according to — לפי."},ref:{id:"english-vocabulary-20",part:"אוצר מילים — עמוד 20"}}]},{id:"english-vocabulary-28",subject_id:"english",exam_id:"english-v1-practice",title:"אוצר מילים — תרגול המורה לעמוד 28",description:"כל הפריטים התקינים בתרגיל המורה · 17 שאלות",references:[{id:"english-vocabulary-28",kind:"site",title:"אוצר מילים — תרגול המורה לעמוד 28",url:"https://wordwall.net/he/resource/36327212?wwmethod=link",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"אוצר מילים — עמוד 28",title:"אוצר מילים — עמוד 28"}]}],questions:[{id:"english-vocabulary-28-01",position:1,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “band”?",choices:["להקה","מועדון","טופס","רשימה"],correct:0,explanation:{he:"בתרגול המורה: band — להקה.",en:"The teacher's vocabulary pair is band — להקה."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-02",position:2,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “club”?",choices:["מועדון","להקה","טופס","רשימה"],correct:0,explanation:{he:"בתרגול המורה: club — מועדון.",en:"The teacher's vocabulary pair is club — מועדון."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-03",position:3,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “form”?",choices:["טופס","להקה","מועדון","רשימה"],correct:0,explanation:{he:"בתרגול המורה: form — טופס.",en:"The teacher's vocabulary pair is form — טופס."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-04",position:4,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “list”?",choices:["רשימה","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: list — רשימה.",en:"The teacher's vocabulary pair is list — רשימה."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-05",position:5,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “office”?",choices:["משרד","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: office — משרד.",en:"The teacher's vocabulary pair is office — משרד."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-06",position:6,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “team”?",choices:["קבוצה","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: team — קבוצה.",en:"The teacher's vocabulary pair is team — קבוצה."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-07",position:7,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “theater”?",choices:["תיאטרון","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: theater — תיאטרון.",en:"The teacher's vocabulary pair is theater — תיאטרון."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-08",position:8,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “variety”?",choices:["מגוון","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: variety — מגוון.",en:"The teacher's vocabulary pair is variety — מגוון."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-09",position:9,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “writing”?",choices:["כתיבה","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: writing — כתיבה.",en:"The teacher's vocabulary pair is writing — כתיבה."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-10",position:10,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “fill in”?",choices:["למלא","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: fill in — למלא.",en:"The teacher's vocabulary pair is fill in — למלא."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-11",position:11,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “join”?",choices:["להצטרף","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: join — להצטרף.",en:"The teacher's vocabulary pair is join — להצטרף."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-12",position:12,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “interested (in)”?",choices:["מעוניין ב...","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: interested (in) — מעוניין ב....",en:"The teacher's vocabulary pair is interested (in) — מעוניין ב...."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-13",position:13,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “around here”?",choices:["כאן בסביבה","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: around here — כאן בסביבה.",en:"The teacher's vocabulary pair is around here — כאן בסביבה."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-14",position:14,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “I’d love to”?",choices:["אשמח ל-","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: I’d love to — אשמח ל-.",en:"The teacher's vocabulary pair is I’d love to — אשמח ל-."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-15",position:15,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “Nice to meet you.”?",choices:["נעים להכיר","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: Nice to meet you. — נעים להכיר.",en:"The teacher's vocabulary pair is Nice to meet you. — נעים להכיר."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-16",position:16,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “What about … ?”?",choices:["מה לגבי...?","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: What about … ? — מה לגבי...?.",en:"The teacher's vocabulary pair is What about … ? — מה לגבי...?."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}},{id:"english-vocabulary-28-17",position:17,type:"mcq",topic:"אוצר מילים — תרגול המורה לעמוד 28",difficulty:"medium",prompt:"מה פירוש הביטוי “would you like … ?”?",choices:["האם תרצה...?","להקה","מועדון","טופס"],correct:0,explanation:{he:"בתרגול המורה: would you like … ? — האם תרצה...?.",en:"The teacher's vocabulary pair is would you like … ? — האם תרצה...?."},ref:{id:"english-vocabulary-28",part:"אוצר מילים — עמוד 28"}}]},{id:"english-parts-sort",subject_id:"english",exam_id:"english-v1-practice",title:"חלקי דיבר — מיון המורה",description:"כל הפריטים התקינים בתרגיל המורה · 29 שאלות",references:[{id:"english-parts-sort",kind:"site",title:"חלקי דיבר — מיון המורה",url:"https://wordwall.net/he/resource/10462641?wwmethod=link",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"התרגיל המקורי",title:"התרגיל המקורי"}]}],questions:[{id:"english-parts-sort-01",position:1,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “ball” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “ball” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, ball is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-02",position:2,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “dog” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “dog” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, dog is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-03",position:3,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “table” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “table” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, table is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-04",position:4,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “chair” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “chair” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, chair is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-05",position:5,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “door” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “door” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, door is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-06",position:6,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “window” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “window” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, window is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-07",position:7,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “book” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “book” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, book is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-08",position:8,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “pen” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “pen” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, pen is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-09",position:9,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “glass” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “glass” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, glass is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-10",position:10,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “picture” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:0,explanation:{he:"המילה “picture” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, picture is classified as noun."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-11",position:11,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “walk” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “walk” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, walk is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-12",position:12,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “go” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “go” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, go is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-13",position:13,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “drive” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “drive” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, drive is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-14",position:14,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “eat” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “eat” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, eat is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-15",position:15,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “run” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “run” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, run is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-16",position:16,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “swim” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “swim” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, swim is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-17",position:17,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “look” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “look” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, look is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-18",position:18,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “speak” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “speak” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, speak is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-19",position:19,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “buy” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “buy” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, buy is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-20",position:20,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “like” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:1,explanation:{he:"המילה “like” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, like is classified as verb."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-21",position:21,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “red” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “red” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, red is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-22",position:22,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “tall” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “tall” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, tall is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-23",position:23,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “short” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “short” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, short is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-24",position:24,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “beautiful” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “beautiful” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, beautiful is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-26",position:26,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “happy” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “happy” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, happy is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-27",position:27,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “sad” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “sad” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, sad is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-28",position:28,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “black” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “black” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, black is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-29",position:29,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “thin” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “thin” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, thin is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}},{id:"english-parts-sort-30",position:30,type:"mcq",topic:"חלקי דיבר — מיון המורה",difficulty:"medium",prompt:"לאיזו קבוצת חלקי דיבר שייכת המילה “fat” בתרגיל המורה?",choices:["Noun","Verb","Adjective"],correct:2,explanation:{he:"המילה “fat” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, fat is classified as adjective."},ref:{id:"english-parts-sort",part:"התרגיל המקורי"}}]},{id:"english-parts-quiz",subject_id:"english",exam_id:"english-v1-practice",title:"חלקי דיבר — שאלון המורה",description:"כל הפריטים התקינים בתרגיל המורה · 10 שאלות",references:[{id:"english-parts-quiz",kind:"site",title:"חלקי דיבר — שאלון המורה",url:"https://wordwall.net/he/resource/95521835?wwmethod=link",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"התרגיל המקורי",title:"התרגיל המקורי"}]}],questions:[{id:"english-parts-quiz-01",position:1,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Which of these is a verb?",choices:["Run","Table","Blue","Quickly"],correct:0,explanation:{he:"המילה “Run” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, Run is classified as verb."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-02",position:2,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Identify the noun.",choices:["Jump","Happiness","Bright","Swiftly"],correct:1,explanation:{he:"המילה “Happiness” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, Happiness is classified as noun."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-03",position:3,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Select the adjective.",choices:["Green","Sing","Dog","Carefully"],correct:0,explanation:{he:"המילה “Green” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, Green is classified as adjective."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-04",position:4,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Which word is a verb?",choices:["Dance","Chair","Red","Slowly"],correct:0,explanation:{he:"המילה “Dance” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, Dance is classified as verb."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-05",position:5,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Choose the noun.",choices:["Joy","Run","Tall","Quickly"],correct:0,explanation:{he:"המילה “Joy” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, Joy is classified as noun."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-06",position:6,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Identify the adjective.",choices:["Soft","Eat","Car","Loudly"],correct:0,explanation:{he:"המילה “Soft” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, Soft is classified as adjective."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-07",position:7,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Which of these is a verb?",choices:["Write","Book","Yellow","Gently"],correct:0,explanation:{he:"המילה “Write” מסווגת בתרגיל כ־Verb (פועל).",en:"In this activity, Write is classified as verb."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-08",position:8,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Select the noun.",choices:["Cat","Run","Bright","Quickly"],correct:0,explanation:{he:"המילה “Cat” מסווגת בתרגיל כ־Noun (שם עצם).",en:"In this activity, Cat is classified as noun."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-09",position:9,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Choose the adjective.",choices:["Happy","Jump","Tree","Slowly"],correct:0,explanation:{he:"המילה “Happy” מסווגת בתרגיל כ־Adjective (שם תואר).",en:"In this activity, Happy is classified as adjective."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}},{id:"english-parts-quiz-10",position:10,type:"mcq",topic:"חלקי דיבר — שאלון המורה",difficulty:"medium",prompt:"Which word belongs to 'others'?",choices:["Quickly","Sing","Joy","Soft"],correct:0,explanation:{he:"המילה “Quickly” מסווגת בתרגיל כ־Adverb (תואר הפועל).",en:"In this activity, Quickly is classified as adverb."},ref:{id:"english-parts-quiz",part:"התרגיל המקורי"}}]},{id:"english-negative-1",subject_id:"english",exam_id:"english-v1-practice",title:"הווה פשוט — חיוב ושלילה 1",description:"כל הפריטים התקינים בתרגיל המורה · 9 שאלות",references:[{id:"english-negative-1",kind:"site",title:"הווה פשוט — חיוב ושלילה 1",url:"https://wordwall.net/resource/8818577?wwmethod=link",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"התרגיל המקורי",title:"התרגיל המקורי"}]}],questions:[{id:"english-negative-1-01",position:1,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"She ..... at the office.",choices:["doesn't work","work","don't work","works"],correct:3,explanation:{he:"התשובה היא works. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is works. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-0",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-1-02",position:2,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"My father ..... ....... cigarettes. (NOT)",choices:["smokes","smoke","doesn't smoke","don't smoke"],correct:2,explanation:{he:"התשובה היא doesn't smoke. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't smoke. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-1",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-1-03",position:3,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"I .... .... meat. (NOT)",choices:["doesn't eat","don't eat","eat","does eat"],correct:1,explanation:{he:"התשובה היא don't eat. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.",en:"The answer is don't eat. Use don't plus the base verb with I/you/we/they."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-2",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-1-04",position:4,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"We ..... to the radio.",choices:["live","listen","drink","listens"],correct:1,explanation:{he:"התשובה היא listen. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is listen. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-3",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-1-05",position:5,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"Alice and Mark .... ..... in London. (NOT)",choices:["isn't living","doesn't live","don't live","lives"],correct:2,explanation:{he:"התשובה היא don't live. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.",en:"The answer is don't live. Use don't plus the base verb with I/you/we/they."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-4",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-1-06",position:6,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"You ..... to the cinema at weekends.",choices:["go","play","goes","plays"],correct:0,explanation:{he:"התשובה היא go. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is go. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-5",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-1-07",position:7,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"A teacher ________ in a school.",choices:["doesn't work","work","don't work","works"],correct:3,explanation:{he:"התשובה היא works. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is works. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-6",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-1-08",position:8,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"A ___________ works on a building site.",choices:["farmer","builder","doctor","teacher"],correct:1,explanation:{he:"בנאי (builder) עובד באתר בנייה.",en:"A builder works on a building site."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"בחרו את בעל המקצוע המתאים."},{id:"english-negative-1-09",position:9,type:"mcq",topic:"הווה פשוט — חיוב ושלילה 1",difficulty:"medium",prompt:"A waiter _________ in a shop.",choices:["works","work","doesn't work","don't work"],correct:2,explanation:{he:"התשובה היא doesn't work. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't work. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-1",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-7",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"}]},{id:"english-negative-2",subject_id:"english",exam_id:"english-v1-practice",title:"הווה פשוט — שלילה 2",description:"כל הפריטים התקינים בתרגיל המורה · 12 שאלות",references:[{id:"english-negative-2",kind:"site",title:"הווה פשוט — שלילה 2",url:"https://wordwall.net/resource/30802053?wwmethod=link",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"התרגיל המקורי",title:"התרגיל המקורי"}]}],questions:[{id:"english-negative-2-01",position:1,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"John ...................................computer games everyday.",choices:["don't plays","dosen't play","doesn't play"],correct:2,explanation:{he:"התשובה היא doesn't play. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't play. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-0",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-02",position:2,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"She .............................. a book in the morning.",choices:["doesn't read","not reads","don't read"],correct:0,explanation:{he:"התשובה היא doesn't read. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't read. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-1",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-03",position:3,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"Phil and Susan ............................. tennis at weekends.",choices:["don't plays","doesn't play","don't play"],correct:2,explanation:{he:"התשובה היא don't play. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.",en:"The answer is don't play. Use don't plus the base verb with I/you/we/they."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-2",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-04",position:4,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"I  ................................... at the weekends",choices:["dosen't do karate","doesn't do karate","don't do karate"],correct:2,explanation:{he:"התשובה היא don't do karate. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.",en:"The answer is don't do karate. Use don't plus the base verb with I/you/we/they."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-3",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-05",position:5,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"My mum ............................................ at 10PM every night.",choices:["doesn't goes to bed","doesn't go to bed","don't goes to bed"],correct:1,explanation:{he:"התשובה היא doesn't go to bed. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't go to bed. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-4",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-06",position:6,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"They ...................................................... cycling in the mornings.",choices:["don't goes","don't go","not go"],correct:1,explanation:{he:"התשובה היא don't go. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.",en:"The answer is don't go. Use don't plus the base verb with I/you/we/they."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-5",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-07",position:7,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"He ................................................. in the evenings.",choices:["doesn't play","doesn't plays","doesn't plais"],correct:0,explanation:{he:"התשובה היא doesn't play. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't play. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-6",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-08",position:8,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"They...................................... yoga on Mondays.",choices:["don't does","don't do","doesn't do"],correct:1,explanation:{he:"התשובה היא don't do. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.",en:"The answer is don't do. Use don't plus the base verb with I/you/we/they."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-7",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-09",position:9,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"Peter .......................................... swimming on Wednesdays.",choices:["doesn't go","don't goes","doesn't goes"],correct:0,explanation:{he:"התשובה היא doesn't go. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't go. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-8",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-10",position:10,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"Bill ............................................... TV at night.",choices:["don't watches","doesn't watch","doesn't watches"],correct:1,explanation:{he:"התשובה היא doesn't watch. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't watch. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-9",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-11",position:11,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"We...............  the homework at the weekends",choices:["don't do","doesn't do","doesn't does"],correct:0,explanation:{he:"התשובה היא don't do. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.",en:"The answer is don't do. Use don't plus the base verb with I/you/we/they."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-10",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"},{id:"english-negative-2-12",position:12,type:"mcq",topic:"הווה פשוט — שלילה 2",difficulty:"medium",prompt:"My dad.............with my brothers",choices:["doesn't watches TV","don't watch TV","doesn't watch TV"],correct:2,explanation:{he:"התשובה היא doesn't watch TV. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.",en:"The answer is doesn't watch TV. Use doesn't plus the base verb with he/she/it."},ref:{id:"english-negative-2",part:"התרגיל המקורי"},context:"השלימו בשלילה בהווה פשוט.",image:"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-11",imageAlt:"תמונת ההקשר מתוך תרגיל המורה"}]},{id:"english-affirmative-1",subject_id:"english",exam_id:"english-v1-practice",title:"הווה פשוט — חיוב 1",description:"כל הפריטים התקינים בתרגיל המורה · 15 שאלות",references:[{id:"english-affirmative-1",kind:"site",title:"הווה פשוט — חיוב 1",url:"https://www.english-room.com/grammar/presentsimpletense_affirmative_1.htm",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"התרגיל המקורי",title:"התרגיל המקורי"}]}],questions:[{id:"english-affirmative-1-01",position:1,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"She ___ noodles every Monday. (eat)",choices:["eats","eat","eating"],correct:0,explanation:{he:"התשובה היא eats. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is eats. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-02",position:2,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"Wichai ___ computer every day. (play)",choices:["plays","play","playing"],correct:0,explanation:{he:"התשובה היא plays. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is plays. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-03",position:3,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"They ___ English well. (speak)",choices:["speak","speaks","speaking"],correct:0,explanation:{he:"התשובה היא speak. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is speak. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-04",position:4,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"He ___ television every morning. (watch)",choices:["watches","watch","watching"],correct:0,explanation:{he:"התשובה היא watches. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is watches. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-05",position:5,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"I ___ up late. (get)",choices:["get","gets","getting"],correct:0,explanation:{he:"התשובה היא get. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is get. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-06",position:6,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"We ___ pictures every week. (draw)",choices:["draw","draws","drawing"],correct:0,explanation:{he:"התשובה היא draw. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is draw. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-07",position:7,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"The boys ___ in the pool. (swim)",choices:["swim","swims","swimming"],correct:0,explanation:{he:"התשובה היא swim. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is swim. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-08",position:8,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"My father ___ a new car. (drive)",choices:["drives","drive","driving"],correct:0,explanation:{he:"התשובה היא drives. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is drives. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-09",position:9,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"You ___ in the office. (work)",choices:["work","works","working"],correct:0,explanation:{he:"התשובה היא work. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is work. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-10",position:10,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"Mr. Manit ___ to London. (fly)",choices:["flies","fly","flying"],correct:0,explanation:{he:"התשובה היא flies. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is flies. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-11",position:11,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"I ___ my homework. (do)",choices:["do","does","doing"],correct:0,explanation:{he:"התשובה היא do. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is do. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-12",position:12,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"The teacher ___ to school every day. (walk)",choices:["walks","walk","walking"],correct:0,explanation:{he:"התשובה היא walks. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is walks. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-13",position:13,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"Jack ___ his bicycle. (ride)",choices:["rides","ride","riding"],correct:0,explanation:{he:"התשובה היא rides. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is rides. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-14",position:14,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"His mother ___ some fruit. (buy)",choices:["buys","buy","buying"],correct:0,explanation:{he:"התשובה היא buys. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is buys. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-1-15",position:15,type:"mcq",topic:"הווה פשוט — חיוב 1",difficulty:"medium",prompt:"The baby ___ every night. (cry)",choices:["cries","cry","crying"],correct:0,explanation:{he:"התשובה היא cries. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is cries. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-1",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."}]},{id:"english-affirmative-2",subject_id:"english",exam_id:"english-v1-practice",title:"הווה פשוט — חיוב 2",description:"כל הפריטים התקינים בתרגיל המורה · 15 שאלות",references:[{id:"english-affirmative-2",kind:"site",title:"הווה פשוט — חיוב 2",url:"https://www.english-4u.de/en/tenses-exercises/present-simple.htm",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"התרגיל המקורי",title:"התרגיל המקורי"}]}],questions:[{id:"english-affirmative-2-01",position:1,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"My sister ___(read) a book.",choices:["reads","read","reading"],correct:0,explanation:{he:"התשובה היא reads. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is reads. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-02",position:2,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"Frank ___(like) dogs.",choices:["likes","like","liking"],correct:0,explanation:{he:"התשובה היא likes. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is likes. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-03",position:3,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"My parents ___(do) the shopping.",choices:["do","does","doing"],correct:0,explanation:{he:"התשובה היא do. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is do. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-04",position:4,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"We sometimes ___(meet) in front of the cinema.",choices:["meet","meets","meeting"],correct:0,explanation:{he:"התשובה היא meet. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is meet. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-05",position:5,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"Uncle George ___(go) to the doctor's.",choices:["goes","go","going"],correct:0,explanation:{he:"התשובה היא goes. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is goes. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-06",position:6,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"Our friends ___(play) football in the park.",choices:["play","plays","playing"],correct:0,explanation:{he:"התשובה היא play. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is play. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-07",position:7,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"She ___(go) to the park every Friday.",choices:["goes","go","going"],correct:0,explanation:{he:"התשובה היא goes. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is goes. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-08",position:8,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"He ___(ride) his bike every day.",choices:["rides","ride","riding"],correct:0,explanation:{he:"התשובה היא rides. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is rides. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-09",position:9,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"We ___(have) the best ideas.",choices:["have","has","having"],correct:0,explanation:{he:"התשובה היא have. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is have. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-10",position:10,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"Carol ___(say) goodbye.",choices:["says","say","saying"],correct:0,explanation:{he:"התשובה היא says. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is says. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-11",position:11,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"She ___(be) the best singer in our class.",choices:["is","am","are"],correct:0,explanation:{he:"התשובה היא is. ל־be בהווה הצורות am עם I, הצורה is עם he/she/it, והצורה are עם you/we/they.",en:"The answer is is. Be takes am with I, is with he/she/it, and are with you/we/they."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-12",position:12,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"My sister ___(live) in a big house.",choices:["lives","live","living"],correct:0,explanation:{he:"התשובה היא lives. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is lives. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-13",position:13,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"The children ___(eat) hamburgers.",choices:["eat","eats","eating"],correct:0,explanation:{he:"התשובה היא eat. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is eat. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-14",position:14,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"Bill ___(have) got two notebooks.",choices:["has","have","having"],correct:0,explanation:{he:"התשובה היא has. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.",en:"The answer is has. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{id:"english-affirmative-2-15",position:15,type:"mcq",topic:"הווה פשוט — חיוב 2",difficulty:"medium",prompt:"I ___(be) at home.",choices:["am","is","are"],correct:0,explanation:{he:"התשובה היא am. ל־be בהווה הצורות am עם I, הצורה is עם he/she/it, והצורה are עם you/we/they.",en:"The answer is am. Be takes am with I, is with he/she/it, and are with you/we/they."},ref:{id:"english-affirmative-2",part:"התרגיל המקורי"},context:"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."}]},{id:"english-questions-1",subject_id:"english",exam_id:"english-v1-practice",title:"הווה פשוט — שאלות do / does",description:"כל הפריטים התקינים בתרגיל המורה · 12 שאלות",references:[{id:"english-questions-1",kind:"site",title:"הווה פשוט — שאלות do / does",url:"https://agendaweb.org/exercises/verbs/do-does.htm",attribution:"תרגול שקושר במסמך המורה",parts:[{part:"התרגיל המקורי",title:"התרגיל המקורי"}]}],questions:[{id:"english-questions-1-01",position:1,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"What time ___ you go to bed ?",choices:["do","does"],correct:0,explanation:{he:"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-02",position:2,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"___ your dog like bread ?",choices:["Do","Does"],correct:1,explanation:{he:"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-03",position:3,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"Where ___ he go on hollidays ?",choices:["do","does"],correct:1,explanation:{he:"התשובה היא does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-04",position:4,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"___ your mum read comics ?",choices:["Do","Does"],correct:1,explanation:{he:"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-05",position:5,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"What ___ you do on Mondays ?",choices:["do","does"],correct:0,explanation:{he:"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-06",position:6,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"Why ___ I drink so much milk ?",choices:["do","does"],correct:0,explanation:{he:"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-07",position:7,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"When ___ your parents have lunch ?",choices:["do","does"],correct:0,explanation:{he:"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-08",position:8,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"___ she like pizza ?",choices:["Do","Does"],correct:1,explanation:{he:"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-09",position:9,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"___ they teach Spanish ?",choices:["Do","Does"],correct:0,explanation:{he:"התשובה היא Do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is Do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-10",position:10,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"___ Susan work every day ?",choices:["Do","Does"],correct:1,explanation:{he:"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-11",position:11,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"How ___ the children go to school ?",choices:["do","does"],correct:0,explanation:{he:"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}},{id:"english-questions-1-12",position:12,type:"mcq",topic:"הווה פשוט — שאלות do / does",difficulty:"medium",prompt:"How many days a week ___ she work ?",choices:["do","does"],correct:1,explanation:{he:"התשובה היא does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.",en:"The answer is does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},ref:{id:"english-questions-1",part:"התרגיל המקורי"}}]}]},yc="facts",bc=gs.quizzes.map(({id:n,title:e,subject_id:t,questions:i})=>({id:n,title:e,subjectId:t,count:i.length})),ga={easy:1,medium:1.5,hard:2},_a=n=>typeof n=="string"&&/^[a-z0-9-]+$/.test(n);function Mc(n){var t;if(typeof n!="string"||!n.trim())throw new Error("Invalid reference URL");const e=new URL(n,`${((t=globalThis.location)==null?void 0:t.origin)||"https://prepx.invalid"}/`);if(!["https:","http:"].includes(e.protocol))throw new Error("Invalid reference URL");return e.href}function va(n,{source:e=(n==null?void 0:n.source)||"snapshot",pinned:t=!1}={}){const i=bc.find(c=>c.id===(n==null?void 0:n.id));if(!i||typeof n.title!="string"||!n.title.trim()||!Array.isArray(n.questions)||(t?n.questions.length<1||n.questions.length>30:n.questions.length!==i.count)||!Array.isArray(n.references))throw new Error("Invalid maze content");const s=n.references.map(c=>{if(!_a(c.id)||typeof c.title!="string")throw new Error("Invalid question reference");return{...c,url:Mc(c.url)}});if(new Set(s.map(c=>c.id)).size!==s.length)throw new Error("Duplicate reference");const r=n.questions.map(c=>{var f,p;const u=s.find(x=>{var v;return x.id===((v=c.ref)==null?void 0:v.id)});if(!_a(c.id)||c.type!=="mcq"||typeof c.prompt!="string"||!c.prompt.trim()||!Array.isArray(c.choices)||c.choices.length<2||c.choices.length>8||c.choices.some(x=>typeof x!="string"||!x.trim())||!Number.isInteger(c.correct)||c.correct<0||c.correct>=c.choices.length||typeof((f=c.explanation)==null?void 0:f.he)!="string"||!c.explanation.he.trim()||!u||!(c.ref.part===null||typeof c.ref.part=="string"))throw new Error("Invalid practice question");if(c.ref.part&&!((p=u.parts)!=null&&p.some(x=>x.part===c.ref.part)))throw new Error("Unknown reference part");const d=Object.hasOwn(ga,c.difficulty)?c.difficulty:"medium";return{id:c.id,type:"mcq",prompt:c.prompt,choices:[...c.choices],correct:c.correct,difficulty:d,weight:ga[d],topic:c.topic||null,explanation:{he:c.explanation.he,en:typeof c.explanation.en=="string"?c.explanation.en:""},ref:{id:c.ref.id,part:c.ref.part},...typeof c.context=="string"?{context:c.context}:{},...typeof c.image=="string"?{image:c.image,imageAlt:c.imageAlt||""}:{},reference:{id:u.id,title:u.title,url:u.url,part:c.ref.part}}});if(new Set(r.map(c=>c.id)).size!==r.length)throw new Error("Duplicate question");const a={id:n.id,title:n.title,description:typeof n.description=="string"?n.description:"",subjectId:n.subject_id||n.subjectId||i.subjectId,questions:r,references:s,source:e==="live"?"live":"snapshot",offline:e!=="live"};let o=2166136261;const l=JSON.stringify(r.map(({id:c,prompt:u,choices:d,correct:f,difficulty:p,explanation:x,ref:v})=>({id:c,prompt:u,choices:d,correct:f,difficulty:p,explanation:x,ref:v})));for(const c of l)o=Math.imul(o^c.charCodeAt(0),16777619);return{...a,version:`maze-v1-${(o>>>0).toString(16)}`}}async function em({quizId:n=yc,fetchImpl:e=globalThis.fetch}={}){const t=gs.quizzes.find(r=>r.id===n);if(!t)throw new Error("Unknown maze quiz");const i=new AbortController;let s;try{const r=new Promise((l,c)=>{s=setTimeout(()=>{i.abort(),c(new Error("Content timeout"))},2500)}),a=await Promise.race([Promise.resolve().then(()=>{var l;return e(new URL(`/api/quizzes/${encodeURIComponent(n)}`,`${((l=globalThis.location)==null?void 0:l.origin)||"https://prepx.invalid"}/`).href,{signal:i.signal,credentials:"omit"})}),r]);if(!a.ok)throw new Error("Content unavailable");const o=await Promise.race([a.json(),r]);if((o==null?void 0:o.id)!==n)throw new Error("Content mismatch");return va(o,{source:"live"})}catch{return va(t,{source:"snapshot"})}finally{clearTimeout(s)}}const Sc=new Map(gs.quizzes.flatMap(n=>n.questions).map(n=>[n.id,n])),Co={"questions-01":{context:"רוצים לברר את זמן הקמת הגינה בבית הספר.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-02":{context:"רוצים לברר את מספר הכיתות שהשתתפו בהקמת הגינה.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-03":{context:"התלמידים קראו על צמחים לפני השתילה.",prompt:"איזו מילת שאלה מבקשת סיבה?"},"questions-04":{context:"תלמידים הקימו גינה בבית הספר.",prompt:"איזו מילת שאלה מבקשת מקום?"},"questions-05":{context:"שלוש כיתות חילקו ביניהן את ימי ההשקיה.",prompt:"איזו מילת שאלה מבקשת דרך פעולה?"},"questions-06":{context:"עלתה הצעה להוסיף פרחים לגינה.",prompt:"איזו מילת שאלה מבקשת לזהות אדם?"},"instructions-01":{context:"ההוראה: ״העתיקו מהטקסט עובדה״.",prompt:"מה צריך לעשות?"},"instructions-02":{context:"ההוראה: ״נמקו״.",prompt:"מה צריך להוסיף לתשובה?"},"instructions-03":{context:"ההוראה: ״ציינו״.",prompt:"איזו תשובה מתאימה?"},"instructions-04":{context:"ההוראה: ״הסבירו״.",prompt:"מה צריך לעשות?"},"instructions-05":{context:"ההוראה: ״נסחו שאלה מלאה״.",prompt:"איזו תשובה מקיימת את ההוראה?"},"instructions-06":{context:"ההוראה: ״הביעו את דעתכם וכתבו נימוק״.",prompt:"מה צריך לכתוב?"},"physics-pole-01":{context:"מודדים גובה עמוד בעזרת גליל חלול ומשולש ישר־זווית ושווה־שוקיים.",prompt:"באיזו זווית לאופק מכוונים לראש העמוד?"},"physics-pole-02":{context:"מביטים לראש עמוד בזווית 45° לאופק, על קרקע אופקית.",prompt:"מה שווה למרחק האופקי לעמוד?"},"physics-pole-03":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 6 מ׳. גובה העיניים: 1.4 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-04":{context:"מודדים גובה עמוד בעזרת גליל המכוון לראשו ב־45° לאופק.",prompt:"איזה מרחק מודדים לצורך החישוב?"},"physics-pole-05":{context:"מביטים לראש עמוד ב־45° לאופק, על קרקע אופקית.",prompt:"איזה גובה מוסיפים למרחק האופקי?"},"physics-pole-06":{context:"מביטים לראש עמוד ב־45°. מחשבים את גובהו ממרחק אופקי וגובה העיניים.",prompt:"איזה תנאי קרקע נדרש לחישוב?"},"physics-pole-07":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 4 מ׳. גובה העיניים: 1.5 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-08":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה צריך לראות דרך הגליל?"},"physics-pole-09":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה תפקיד המשולש?"},"physics-pole-10":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי לעמוד: 5 מ׳.",prompt:"מה גובה ראש העמוד מעל העיניים?"},"physics-pole-11":{context:"מודדים מרחק אופקי לעמוד וגובה עיניים, ואז מחשבים את גובה העמוד.",prompt:"למה זו מדידה עקיפה?"}};for(const n of gs.quizzes.find(e=>e.id==="facts").questions)Co[n.id]={context:n.prompt.slice(0,-7),prompt:"עובדה או דעה?"};function Ec(n,e){var t,i;return e&&n.prompt===e.prompt&&n.correct===e.correct&&JSON.stringify(n.choices)===JSON.stringify(e.choices)&&((t=n.ref)==null?void 0:t.id)===e.ref.id&&((i=n.ref)==null?void 0:i.part)===e.ref.part}function tm(n){const e={prompt:typeof(n==null?void 0:n.prompt)=="string"?n.prompt:"",context:"",sourceLabel:"",adapted:!1},t=Sc.get(n==null?void 0:n.id);if(!Ec(n,t))return e;const i=Co[n.id],s=n.id.startsWith("english-")?`אנגלית · ${n.ref.part}`:n.ref.id==="garden-passage"?"הגינה בבית הספר":`מדידות · ${n.ref.part}`;return{...e,...i,sourceLabel:s,adapted:!!i}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yr="181",Tc=0,ya=1,wc=2,Po=1,Ac=2,ni=3,_i=0,wt=1,si=2,ai=0,Zi=1,ba=2,Ma=3,Sa=4,Rc=5,Ri=100,Cc=101,Pc=102,Ic=103,Dc=104,Lc=200,Uc=201,Nc=202,Fc=203,sr=204,rr=205,Oc=206,Bc=207,zc=208,Vc=209,kc=210,Gc=211,Hc=212,Wc=213,qc=214,ar=0,or=1,cr=2,en=3,lr=4,hr=5,dr=6,ur=7,Io=0,Xc=1,Yc=2,gi=0,jc=1,$c=2,Kc=3,Zc=4,Jc=5,Qc=6,el=7,Do=300,tn=301,nn=302,fr=303,pr=304,_s=306,mr=1e3,ri=1001,xr=1002,Dt=1003,tl=1004,Un=1005,Ot=1006,ws=1007,Pi=1008,jt=1009,Lo=1010,Uo=1011,Tn=1012,jr=1013,Ii=1014,Xt=1015,on=1016,$r=1017,Kr=1018,wn=1020,No=35902,Fo=35899,Oo=1021,Bo=1022,Gt=1023,An=1026,Rn=1027,Zr=1028,Jr=1029,Qr=1030,ea=1031,ta=1033,os=33776,cs=33777,ls=33778,hs=33779,gr=35840,_r=35841,vr=35842,yr=35843,br=36196,Mr=37492,Sr=37496,Er=37808,Tr=37809,wr=37810,Ar=37811,Rr=37812,Cr=37813,Pr=37814,Ir=37815,Dr=37816,Lr=37817,Ur=37818,Nr=37819,Fr=37820,Or=37821,Br=36492,zr=36494,Vr=36495,kr=36283,Gr=36284,Hr=36285,Wr=36286,il=3200,nl=3201,zo=0,sl=1,mi="",Nt="srgb",sn="srgb-linear",us="linear",Ke="srgb",Ni=7680,Ea=519,rl=512,al=513,ol=514,Vo=515,cl=516,ll=517,hl=518,dl=519,Ta=35044,wa="300 es",Yt=2e3,fs=2001;function ko(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ps(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ul(){const n=ps("canvas");return n.style.display="block",n}const Aa={};function Ra(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ce(...n){const e="THREE."+n.shift();console.warn(e,...n)}function ht(...n){const e="THREE."+n.shift();console.error(e,...n)}function Cn(...n){const e=n.join(" ");e in Aa||(Aa[e]=!0,Ce(...n))}function fl(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}class cn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const _t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ca=1234567;const Ji=Math.PI/180,rn=180/Math.PI;function ln(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_t[n&255]+_t[n>>8&255]+_t[n>>16&255]+_t[n>>24&255]+"-"+_t[e&255]+_t[e>>8&255]+"-"+_t[e>>16&15|64]+_t[e>>24&255]+"-"+_t[t&63|128]+_t[t>>8&255]+"-"+_t[t>>16&255]+_t[t>>24&255]+_t[i&255]+_t[i>>8&255]+_t[i>>16&255]+_t[i>>24&255]).toLowerCase()}function ke(n,e,t){return Math.max(e,Math.min(t,n))}function ia(n,e){return(n%e+e)%e}function pl(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function ml(n,e,t){return n!==e?(t-n)/(e-n):0}function En(n,e,t){return(1-t)*n+t*e}function xl(n,e,t,i){return En(n,e,1-Math.exp(-t*i))}function gl(n,e=1){return e-Math.abs(ia(n,e*2)-e)}function _l(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function vl(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function yl(n,e){return n+Math.floor(Math.random()*(e-n+1))}function bl(n,e){return n+Math.random()*(e-n)}function Ml(n){return n*(.5-Math.random())}function Sl(n){n!==void 0&&(Ca=n);let e=Ca+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function El(n){return n*Ji}function Tl(n){return n*rn}function wl(n){return(n&n-1)===0&&n!==0}function Al(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Rl(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Cl(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),f=a((e-i)/2),p=r((i-e)/2),x=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*x,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*x,o*c);break;case"ZYZ":n.set(l*x,l*p,o*u,o*c);break;default:Ce("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const im={DEG2RAD:Ji,RAD2DEG:rn,generateUUID:ln,clamp:ke,euclideanModulo:ia,mapLinear:pl,inverseLerp:ml,lerp:En,damp:xl,pingpong:gl,smoothstep:_l,smootherstep:vl,randInt:yl,randFloat:bl,randFloatSpread:Ml,seededRandom:Sl,degToRad:El,radToDeg:Tl,isPowerOfTwo:wl,ceilPowerOfTwo:Al,floorPowerOfTwo:Rl,setQuaternionFromProperEuler:Cl,normalize:bt,denormalize:Ki};class Ne{constructor(e=0,t=0){Ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Pn{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],f=r[a+0],p=r[a+1],x=r[a+2],v=r[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=f,e[t+1]=p,e[t+2]=x,e[t+3]=v;return}if(d!==v||l!==f||c!==p||u!==x){let m=l*f+c*p+u*x+d*v;m<0&&(f=-f,p=-p,x=-x,v=-v,m=-m);let h=1-o;if(m<.9995){const M=Math.acos(m),S=Math.sin(M);h=Math.sin(h*M)/S,o=Math.sin(o*M)/S,l=l*h+f*o,c=c*h+p*o,u=u*h+x*o,d=d*h+v*o}else{l=l*h+f*o,c=c*h+p*o,u=u*h+x*o,d=d*h+v*o;const M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],f=r[a+1],p=r[a+2],x=r[a+3];return e[t]=o*x+u*d+l*p-c*f,e[t+1]=l*x+u*f+c*d-o*p,e[t+2]=c*x+u*p+o*f-l*d,e[t+3]=u*x-o*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),f=l(i/2),p=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=f*u*d+c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d-f*p*x;break;case"YXZ":this._x=f*u*d+c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d+f*p*x;break;case"ZXY":this._x=f*u*d-c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d-f*p*x;break;case"ZYX":this._x=f*u*d-c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d+f*p*x;break;case"YZX":this._x=f*u*d+c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d-f*p*x;break;case"XZY":this._x=f*u*d-c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d+f*p*x;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return As.copy(this).projectOnVector(e),this.sub(As)}reflect(e){return this.sub(As.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const As=new L,Pa=new Pn;class Le{constructor(e,t,i,s,r,a,o,l,c){Le.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],x=i[8],v=s[0],m=s[3],h=s[6],M=s[1],S=s[4],T=s[7],A=s[2],E=s[5],C=s[8];return r[0]=a*v+o*M+l*A,r[3]=a*m+o*S+l*E,r[6]=a*h+o*T+l*C,r[1]=c*v+u*M+d*A,r[4]=c*m+u*S+d*E,r[7]=c*h+u*T+d*C,r[2]=f*v+p*M+x*A,r[5]=f*m+p*S+x*E,r[8]=f*h+p*T+x*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,f=o*l-u*r,p=c*r-a*l,x=t*d+i*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return e[0]=d*v,e[1]=(s*c-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=f*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Rs.makeScale(e,t)),this}rotate(e){return this.premultiply(Rs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rs=new Le,Ia=new Le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Da=new Le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pl(){const n={enabled:!0,workingColorSpace:sn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ke&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ke&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?us:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Cn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Cn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[sn]:{primaries:e,whitePoint:i,transfer:us,toXYZ:Ia,fromXYZ:Da,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:i,transfer:Ke,toXYZ:Ia,fromXYZ:Da,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),n}const qe=Pl();function oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Fi;class Il{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Fi===void 0&&(Fi=ps("canvas")),Fi.width=e.width,Fi.height=e.height;const s=Fi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Fi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ps("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=oi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(oi(t[i]/255)*255):t[i]=oi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dl=0;class na{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dl++}),this.uuid=ln(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Cs(s[a].image)):r.push(Cs(s[a]))}else r=Cs(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Cs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Il.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let Ll=0;const Ps=new L;class St extends cn{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,i=ri,s=ri,r=Ot,a=Pi,o=Gt,l=jt,c=St.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ll++}),this.uuid=ln(),this.name="",this.source=new na(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ps).x}get height(){return this.source.getSize(Ps).y}get depth(){return this.source.getSize(Ps).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Do)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mr:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case xr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mr:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case xr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=Do;St.DEFAULT_ANISOTROPY=1;class Ze{constructor(e=0,t=0,i=0,s=1){Ze.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],x=l[9],v=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,T=(p+1)/2,A=(h+1)/2,E=(u+f)/4,C=(d+v)/4,D=(x+m)/4;return S>T&&S>A?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=E/i,r=C/i):T>A?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=E/s,r=D/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=C/r,s=D/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-x)*(m-x)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-x)/M,this.y=(d-v)/M,this.z=(f-u)/M,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ul extends cn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new St(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new na(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends Ul{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Go extends St{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Nl extends St{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Li{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,zt):zt.fromBufferAttribute(r,a),zt.applyMatrix4(e.matrixWorld),this.expandByPoint(zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Nn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Nn.copy(i.boundingBox)),Nn.applyMatrix4(e.matrixWorld),this.union(Nn)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,zt),zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pn),Fn.subVectors(this.max,pn),Oi.subVectors(e.a,pn),Bi.subVectors(e.b,pn),zi.subVectors(e.c,pn),li.subVectors(Bi,Oi),hi.subVectors(zi,Bi),bi.subVectors(Oi,zi);let t=[0,-li.z,li.y,0,-hi.z,hi.y,0,-bi.z,bi.y,li.z,0,-li.x,hi.z,0,-hi.x,bi.z,0,-bi.x,-li.y,li.x,0,-hi.y,hi.x,0,-bi.y,bi.x,0];return!Is(t,Oi,Bi,zi,Fn)||(t=[1,0,0,0,1,0,0,0,1],!Is(t,Oi,Bi,zi,Fn))?!1:(On.crossVectors(li,hi),t=[On.x,On.y,On.z],Is(t,Oi,Bi,zi,Fn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Zt=[new L,new L,new L,new L,new L,new L,new L,new L],zt=new L,Nn=new Li,Oi=new L,Bi=new L,zi=new L,li=new L,hi=new L,bi=new L,pn=new L,Fn=new L,On=new L,Mi=new L;function Is(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Mi.fromArray(n,r);const o=s.x*Math.abs(Mi.x)+s.y*Math.abs(Mi.y)+s.z*Math.abs(Mi.z),l=e.dot(Mi),c=t.dot(Mi),u=i.dot(Mi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Fl=new Li,mn=new L,Ds=new L;class hn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Fl.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mn.subVectors(e,this.center);const t=mn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(mn,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ds.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mn.copy(e.center).add(Ds)),this.expandByPoint(mn.copy(e.center).sub(Ds))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Jt=new L,Ls=new L,Bn=new L,di=new L,Us=new L,zn=new L,Ns=new L;class sa{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Jt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jt.copy(this.origin).addScaledVector(this.direction,t),Jt.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ls.copy(e).add(t).multiplyScalar(.5),Bn.copy(t).sub(e).normalize(),di.copy(this.origin).sub(Ls);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Bn),o=di.dot(this.direction),l=-di.dot(Bn),c=di.lengthSq(),u=Math.abs(1-a*a);let d,f,p,x;if(u>0)if(d=a*l-o,f=a*o-l,x=r*u,d>=0)if(f>=-x)if(f<=x){const v=1/u;d*=v,f*=v,p=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-x?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c):f<=x?(d=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ls).addScaledVector(Bn,f),p}intersectSphere(e,t){Jt.subVectors(e.center,this.origin);const i=Jt.dot(this.direction),s=Jt.dot(Jt)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Jt)!==null}intersectTriangle(e,t,i,s,r){Us.subVectors(t,e),zn.subVectors(i,e),Ns.crossVectors(Us,zn);let a=this.direction.dot(Ns),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;di.subVectors(this.origin,e);const l=o*this.direction.dot(zn.crossVectors(di,zn));if(l<0)return null;const c=o*this.direction.dot(Us.cross(di));if(c<0||l+c>a)return null;const u=-o*di.dot(Ns);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,i,s,r,a,o,l,c,u,d,f,p,x,v,m){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,f,p,x,v,m)}set(e,t,i,s,r,a,o,l,c,u,d,f,p,x,v,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=x,h[11]=v,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Vi.setFromMatrixColumn(e,0).length(),r=1/Vi.setFromMatrixColumn(e,1).length(),a=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=a*u,p=a*d,x=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+x*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=x+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,x=c*u,v=c*d;t[0]=f+v*o,t[4]=x*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-x,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,x=c*u,v=c*d;t[0]=f-v*o,t[4]=-a*d,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*u,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,p=a*d,x=o*u,v=o*d;t[0]=l*u,t[4]=x*c-p,t[8]=f*c+v,t[1]=l*d,t[5]=v*c+f,t[9]=p*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,x=o*l,v=o*c;t[0]=l*u,t[4]=v-f*d,t[8]=x*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+x,t[10]=f-v*d}else if(e.order==="XZY"){const f=a*l,p=a*c,x=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+v,t[5]=a*u,t[9]=p*d-x,t[2]=x*d-p,t[6]=o*u,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ol,e,Bl)}lookAt(e,t,i){const s=this.elements;return Ct.subVectors(e,t),Ct.lengthSq()===0&&(Ct.z=1),Ct.normalize(),ui.crossVectors(i,Ct),ui.lengthSq()===0&&(Math.abs(i.z)===1?Ct.x+=1e-4:Ct.z+=1e-4,Ct.normalize(),ui.crossVectors(i,Ct)),ui.normalize(),Vn.crossVectors(Ct,ui),s[0]=ui.x,s[4]=Vn.x,s[8]=Ct.x,s[1]=ui.y,s[5]=Vn.y,s[9]=Ct.y,s[2]=ui.z,s[6]=Vn.z,s[10]=Ct.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],x=i[2],v=i[6],m=i[10],h=i[14],M=i[3],S=i[7],T=i[11],A=i[15],E=s[0],C=s[4],D=s[8],y=s[12],_=s[1],I=s[5],F=s[9],B=s[13],G=s[2],X=s[6],W=s[10],ie=s[14],H=s[3],te=s[7],re=s[11],be=s[15];return r[0]=a*E+o*_+l*G+c*H,r[4]=a*C+o*I+l*X+c*te,r[8]=a*D+o*F+l*W+c*re,r[12]=a*y+o*B+l*ie+c*be,r[1]=u*E+d*_+f*G+p*H,r[5]=u*C+d*I+f*X+p*te,r[9]=u*D+d*F+f*W+p*re,r[13]=u*y+d*B+f*ie+p*be,r[2]=x*E+v*_+m*G+h*H,r[6]=x*C+v*I+m*X+h*te,r[10]=x*D+v*F+m*W+h*re,r[14]=x*y+v*B+m*ie+h*be,r[3]=M*E+S*_+T*G+A*H,r[7]=M*C+S*I+T*X+A*te,r[11]=M*D+S*F+T*W+A*re,r[15]=M*y+S*B+T*ie+A*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],x=e[3],v=e[7],m=e[11],h=e[15];return x*(+r*l*d-s*c*d-r*o*f+i*c*f+s*o*p-i*l*p)+v*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*u-r*l*u)+m*(+t*c*d-t*o*p-r*a*d+i*a*p+r*o*u-i*c*u)+h*(-s*o*u-t*l*d+t*o*f+s*a*d-i*a*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],x=e[12],v=e[13],m=e[14],h=e[15],M=d*m*c-v*f*c+v*l*p-o*m*p-d*l*h+o*f*h,S=x*f*c-u*m*c-x*l*p+a*m*p+u*l*h-a*f*h,T=u*v*c-x*d*c+x*o*p-a*v*p-u*o*h+a*d*h,A=x*d*l-u*v*l-x*o*f+a*v*f+u*o*m-a*d*m,E=t*M+i*S+s*T+r*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return e[0]=M*C,e[1]=(v*f*r-d*m*r-v*s*p+i*m*p+d*s*h-i*f*h)*C,e[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*h+i*l*h)*C,e[3]=(d*l*r-o*f*r-d*s*c+i*f*c+o*s*p-i*l*p)*C,e[4]=S*C,e[5]=(u*m*r-x*f*r+x*s*p-t*m*p-u*s*h+t*f*h)*C,e[6]=(x*l*r-a*m*r-x*s*c+t*m*c+a*s*h-t*l*h)*C,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*p+t*l*p)*C,e[8]=T*C,e[9]=(x*d*r-u*v*r-x*i*p+t*v*p+u*i*h-t*d*h)*C,e[10]=(a*v*r-x*o*r+x*i*c-t*v*c-a*i*h+t*o*h)*C,e[11]=(u*o*r-a*d*r-u*i*c+t*d*c+a*i*p-t*o*p)*C,e[12]=A*C,e[13]=(u*v*s-x*d*s+x*i*f-t*v*f-u*i*m+t*d*m)*C,e[14]=(x*o*s-a*v*s-x*i*l+t*v*l+a*i*m-t*o*m)*C,e[15]=(a*d*s-u*o*s+u*i*l-t*d*l-a*i*f+t*o*f)*C,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,f=r*c,p=r*u,x=r*d,v=a*u,m=a*d,h=o*d,M=l*c,S=l*u,T=l*d,A=i.x,E=i.y,C=i.z;return s[0]=(1-(v+h))*A,s[1]=(p+T)*A,s[2]=(x-S)*A,s[3]=0,s[4]=(p-T)*E,s[5]=(1-(f+h))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(x+S)*C,s[9]=(m-M)*C,s[10]=(1-(f+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Vi.set(s[0],s[1],s[2]).length();const a=Vi.set(s[4],s[5],s[6]).length(),o=Vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Vt.copy(this);const c=1/r,u=1/a,d=1/o;return Vt.elements[0]*=c,Vt.elements[1]*=c,Vt.elements[2]*=c,Vt.elements[4]*=u,Vt.elements[5]*=u,Vt.elements[6]*=u,Vt.elements[8]*=d,Vt.elements[9]*=d,Vt.elements[10]*=d,t.setFromRotationMatrix(Vt),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Yt,l=!1){const c=this.elements,u=2*r/(t-e),d=2*r/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s);let x,v;if(l)x=r/(a-r),v=a*r/(a-r);else if(o===Yt)x=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===fs)x=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Yt,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-s),f=-(t+e)/(t-e),p=-(i+s)/(i-s);let x,v;if(l)x=1/(a-r),v=a/(a-r);else if(o===Yt)x=-2/(a-r),v=-(a+r)/(a-r);else if(o===fs)x=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Vi=new L,Vt=new Qe,Ol=new L(0,0,0),Bl=new L(1,1,1),ui=new L,Vn=new L,Ct=new L,La=new Qe,Ua=new Pn;class $t{constructor(e=0,t=0,i=0,s=$t.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return La.makeRotationFromQuaternion(e),this.setFromRotationMatrix(La,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ua.setFromEuler(this),this.setFromQuaternion(Ua,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$t.DEFAULT_ORDER="XYZ";class ra{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zl=0;const Na=new L,ki=new Pn,Qt=new Qe,kn=new L,xn=new L,Vl=new L,kl=new Pn,Fa=new L(1,0,0),Oa=new L(0,1,0),Ba=new L(0,0,1),za={type:"added"},Gl={type:"removed"},Gi={type:"childadded",child:null},Fs={type:"childremoved",child:null};class ut extends cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zl++}),this.uuid=ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();const e=new L,t=new $t,i=new Pn,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qe},normalMatrix:{value:new Le}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.multiply(ki),this}rotateOnWorldAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.premultiply(ki),this}rotateX(e){return this.rotateOnAxis(Fa,e)}rotateY(e){return this.rotateOnAxis(Oa,e)}rotateZ(e){return this.rotateOnAxis(Ba,e)}translateOnAxis(e,t){return Na.copy(e).applyQuaternion(this.quaternion),this.position.add(Na.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fa,e)}translateY(e){return this.translateOnAxis(Oa,e)}translateZ(e){return this.translateOnAxis(Ba,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qt.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?kn.copy(e):kn.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),xn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qt.lookAt(xn,kn,this.up):Qt.lookAt(kn,xn,this.up),this.quaternion.setFromRotationMatrix(Qt),s&&(Qt.extractRotation(s.matrixWorld),ki.setFromRotationMatrix(Qt),this.quaternion.premultiply(ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ht("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(za),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null):ht("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gl),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(za),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xn,e,Vl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xn,kl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}ut.DEFAULT_UP=new L(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kt=new L,ei=new L,Os=new L,ti=new L,Hi=new L,Wi=new L,Va=new L,Bs=new L,zs=new L,Vs=new L,ks=new Ze,Gs=new Ze,Hs=new Ze;class Ft{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),kt.subVectors(e,t),s.cross(kt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){kt.subVectors(s,t),ei.subVectors(i,t),Os.subVectors(e,t);const a=kt.dot(kt),o=kt.dot(ei),l=kt.dot(Os),c=ei.dot(ei),u=ei.dot(Os),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,p=(c*l-o*u)*f,x=(a*u-o*l)*f;return r.set(1-p-x,x,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(a,ti.y),l.addScaledVector(o,ti.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return ks.setScalar(0),Gs.setScalar(0),Hs.setScalar(0),ks.fromBufferAttribute(e,t),Gs.fromBufferAttribute(e,i),Hs.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ks,r.x),a.addScaledVector(Gs,r.y),a.addScaledVector(Hs,r.z),a}static isFrontFacing(e,t,i,s){return kt.subVectors(i,t),ei.subVectors(e,t),kt.cross(ei).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kt.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),kt.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ft.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ft.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Ft.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Ft.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ft.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Hi.subVectors(s,i),Wi.subVectors(r,i),Bs.subVectors(e,i);const l=Hi.dot(Bs),c=Wi.dot(Bs);if(l<=0&&c<=0)return t.copy(i);zs.subVectors(e,s);const u=Hi.dot(zs),d=Wi.dot(zs);if(u>=0&&d<=u)return t.copy(s);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Hi,a);Vs.subVectors(e,r);const p=Hi.dot(Vs),x=Wi.dot(Vs);if(x>=0&&p<=x)return t.copy(r);const v=p*c-l*x;if(v<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(i).addScaledVector(Wi,o);const m=u*x-p*d;if(m<=0&&d-u>=0&&p-x>=0)return Va.subVectors(r,s),o=(d-u)/(d-u+(p-x)),t.copy(s).addScaledVector(Va,o);const h=1/(m+v+f);return a=v*h,o=f*h,t.copy(i).addScaledVector(Hi,a).addScaledVector(Wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ho={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},Gn={h:0,s:0,l:0};function Ws(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class He{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=qe.workingColorSpace){if(e=ia(e,1),t=ke(t,0,1),i=ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ws(a,r,e+1/3),this.g=Ws(a,r,e),this.b=Ws(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function i(r){r!==void 0&&parseFloat(r)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){const i=Ho[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return qe.workingToColorSpace(vt.copy(this),e),Math.round(ke(vt.r*255,0,255))*65536+Math.round(ke(vt.g*255,0,255))*256+Math.round(ke(vt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(vt.copy(this),t);const i=vt.r,s=vt.g,r=vt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(vt.copy(this),t),e.r=vt.r,e.g=vt.g,e.b=vt.b,e}getStyle(e=Nt){qe.workingToColorSpace(vt.copy(this),e);const t=vt.r,i=vt.g,s=vt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(Gn);const i=En(fi.h,Gn.h,t),s=En(fi.s,Gn.s,t),r=En(fi.l,Gn.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vt=new He;He.NAMES=Ho;let Hl=0;class dn extends cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hl++}),this.uuid=ln(),this.name="",this.type="Material",this.blending=Zi,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sr,this.blendDst=rr,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=en,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ea,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(i.blending=this.blending),this.side!==_i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sr&&(i.blendSrc=this.blendSrc),this.blendDst!==rr&&(i.blendDst=this.blendDst),this.blendEquation!==Ri&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==en&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ea&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wo extends dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.combine=Io,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new L,Hn=new Ne;let Wl=0;class Ht{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wl++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ta,this.updateRanges=[],this.gpuType=Xt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Hn.fromBufferAttribute(this,t),Hn.applyMatrix3(e),this.setXY(t,Hn.x,Hn.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ta&&(e.usage=this.usage),e}}class qo extends Ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Xo extends Ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Xe extends Ht{constructor(e,t,i){super(new Float32Array(e),t,i)}}let ql=0;const Ut=new Qe,qs=new ut,qi=new L,Pt=new Li,gn=new Li,mt=new L;class gt extends cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ql++}),this.uuid=ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ko(e)?Xo:qo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Le().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ut.makeRotationFromQuaternion(e),this.applyMatrix4(Ut),this}rotateX(e){return Ut.makeRotationX(e),this.applyMatrix4(Ut),this}rotateY(e){return Ut.makeRotationY(e),this.applyMatrix4(Ut),this}rotateZ(e){return Ut.makeRotationZ(e),this.applyMatrix4(Ut),this}translate(e,t,i){return Ut.makeTranslation(e,t,i),this.applyMatrix4(Ut),this}scale(e,t,i){return Ut.makeScale(e,t,i),this.applyMatrix4(Ut),this}lookAt(e){return qs.lookAt(e),qs.updateMatrix(),this.applyMatrix4(qs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xe(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Pt.setFromBufferAttribute(r),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Pt.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Pt.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Pt.min),this.boundingBox.expandByPoint(Pt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ht('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(Pt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];gn.setFromBufferAttribute(o),this.morphTargetsRelative?(mt.addVectors(Pt.min,gn.min),Pt.expandByPoint(mt),mt.addVectors(Pt.max,gn.max),Pt.expandByPoint(mt)):(Pt.expandByPoint(gn.min),Pt.expandByPoint(gn.max))}Pt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)mt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(mt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)mt.fromBufferAttribute(o,c),l&&(qi.fromBufferAttribute(e,c),mt.add(qi)),s=Math.max(s,i.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ht('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ht("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new L,l[D]=new L;const c=new L,u=new L,d=new L,f=new Ne,p=new Ne,x=new Ne,v=new L,m=new L;function h(D,y,_){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,y),d.fromBufferAttribute(i,_),f.fromBufferAttribute(r,D),p.fromBufferAttribute(r,y),x.fromBufferAttribute(r,_),u.sub(c),d.sub(c),p.sub(f),x.sub(f);const I=1/(p.x*x.y-x.x*p.y);isFinite(I)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(I),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(I),o[D].add(v),o[y].add(v),o[_].add(v),l[D].add(m),l[y].add(m),l[_].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let D=0,y=M.length;D<y;++D){const _=M[D],I=_.start,F=_.count;for(let B=I,G=I+F;B<G;B+=3)h(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const S=new L,T=new L,A=new L,E=new L;function C(D){A.fromBufferAttribute(s,D),E.copy(A);const y=o[D];S.copy(y),S.sub(A.multiplyScalar(A.dot(y))).normalize(),T.crossVectors(E,y);const I=T.dot(l[D])<0?-1:1;a.setXYZW(D,S.x,S.y,S.z,I)}for(let D=0,y=M.length;D<y;++D){const _=M[D],I=_.start,F=_.count;for(let B=I,G=I+F;B<G;B+=3)C(e.getX(B+0)),C(e.getX(B+1)),C(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let f=0,p=e.count;f<p;f+=3){const x=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let p=0,x=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let h=0;h<u;h++)f[x++]=c[p++]}return new Ht(f,u,d)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ka=new Qe,Si=new sa,Wn=new hn,Ga=new L,qn=new L,Xn=new L,Yn=new L,Xs=new L,jn=new L,Ha=new L,$n=new L;class Kt extends ut{constructor(e=new gt,t=new Wo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){jn.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(Xs.fromBufferAttribute(d,e),a?jn.addScaledVector(Xs,u):jn.addScaledVector(Xs.sub(t),u))}t.add(jn)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wn.copy(i.boundingSphere),Wn.applyMatrix4(r),Si.copy(e.ray).recast(e.near),!(Wn.containsPoint(Si.origin)===!1&&(Si.intersectSphere(Wn,Ga)===null||Si.origin.distanceToSquared(Ga)>(e.far-e.near)**2))&&(ka.copy(r).invert(),Si.copy(e.ray).applyMatrix4(ka),!(i.boundingBox!==null&&Si.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Si)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const m=f[x],h=a[m.materialIndex],M=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let T=M,A=S;T<A;T+=3){const E=o.getX(T),C=o.getX(T+1),D=o.getX(T+2);s=Kn(this,h,e,i,c,u,d,E,C,D),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=x,h=v;m<h;m+=3){const M=o.getX(m),S=o.getX(m+1),T=o.getX(m+2);s=Kn(this,a,e,i,c,u,d,M,S,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const m=f[x],h=a[m.materialIndex],M=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let T=M,A=S;T<A;T+=3){const E=T,C=T+1,D=T+2;s=Kn(this,h,e,i,c,u,d,E,C,D),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=x,h=v;m<h;m+=3){const M=m,S=m+1,T=m+2;s=Kn(this,a,e,i,c,u,d,M,S,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Xl(n,e,t,i,s,r,a,o){let l;if(e.side===wt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===_i,o),l===null)return null;$n.copy(o),$n.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo($n);return c<t.near||c>t.far?null:{distance:c,point:$n.clone(),object:n}}function Kn(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,qn),n.getVertexPosition(l,Xn),n.getVertexPosition(c,Yn);const u=Xl(n,e,t,i,qn,Xn,Yn,Ha);if(u){const d=new L;Ft.getBarycoord(Ha,qn,Xn,Yn,d),s&&(u.uv=Ft.getInterpolatedAttribute(s,o,l,c,d,new Ne)),r&&(u.uv1=Ft.getInterpolatedAttribute(r,o,l,c,d,new Ne)),a&&(u.normal=Ft.getInterpolatedAttribute(a,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};Ft.getNormal(qn,Xn,Yn,f.normal),u.face=f,u.barycoord=d}return u}class In extends gt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let f=0,p=0;x("z","y","x",-1,-1,i,t,e,a,r,0),x("z","y","x",1,-1,i,t,-e,a,r,1),x("x","z","y",1,1,e,i,t,s,a,2),x("x","z","y",1,-1,e,i,-t,s,a,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Xe(c,3)),this.setAttribute("normal",new Xe(u,3)),this.setAttribute("uv",new Xe(d,2));function x(v,m,h,M,S,T,A,E,C,D,y){const _=T/C,I=A/D,F=T/2,B=A/2,G=E/2,X=C+1,W=D+1;let ie=0,H=0;const te=new L;for(let re=0;re<W;re++){const be=re*I-B;for(let Ge=0;Ge<X;Ge++){const Ye=Ge*_-F;te[v]=Ye*M,te[m]=be*S,te[h]=G,c.push(te.x,te.y,te.z),te[v]=0,te[m]=0,te[h]=E>0?1:-1,u.push(te.x,te.y,te.z),d.push(Ge/C),d.push(1-re/D),ie+=1}}for(let re=0;re<D;re++)for(let be=0;be<C;be++){const Ge=f+be+X*re,Ye=f+be+X*(re+1),et=f+(be+1)+X*(re+1),tt=f+(be+1)+X*re;l.push(Ge,Ye,tt),l.push(Ye,et,tt),H+=6}o.addGroup(p,H,y),p+=H,f+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new In(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function an(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Mt(n){const e={};for(let t=0;t<n.length;t++){const i=an(n[t]);for(const s in i)e[s]=i[s]}return e}function Yl(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Yo(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const jl={clone:an,merge:Mt};var $l=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$l,this.fragmentShader=Kl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=an(e.uniforms),this.uniformsGroups=Yl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class jo extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Yt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new L,Wa=new Ne,qa=new Ne;class It extends jo{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ji*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rn*2*Math.atan(Math.tan(Ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,Wa,qa),t.subVectors(qa,Wa)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ji*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Xi=-90,Yi=1;class Zl extends ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new It(Xi,Yi,e,t);s.layers=this.layers,this.add(s);const r=new It(Xi,Yi,e,t);r.layers=this.layers,this.add(r);const a=new It(Xi,Yi,e,t);a.layers=this.layers,this.add(a);const o=new It(Xi,Yi,e,t);o.layers=this.layers,this.add(o);const l=new It(Xi,Yi,e,t);l.layers=this.layers,this.add(l);const c=new It(Xi,Yi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Yt)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class $o extends St{constructor(e=[],t=tn,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Jl extends Di{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new $o(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new In(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:an(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wt,blending:ai});r.uniforms.tEquirect.value=t;const a=new Kt(s,r),o=t.minFilter;return t.minFilter===Pi&&(t.minFilter=Ot),new Zl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}class Zn extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ql={type:"move"};class Ys{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),h=this._getHandJoint(c,v);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,x=.005;c.inputState.pinching&&f>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ql)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Zn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Ko{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new He(e),this.near=t,this.far=i}clone(){return new Ko(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class nm extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $t,this.environmentIntensity=1,this.environmentRotation=new $t,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Zo extends St{constructor(e=null,t=1,i=1,s,r,a,o,l,c=Dt,u=Dt,d,f){super(null,a,o,l,c,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xa extends Ht{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ji=new Qe,Ya=new Qe,Jn=[],ja=new Li,eh=new Qe,_n=new Kt,vn=new hn;class sm extends Kt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xa(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,eh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ji),ja.copy(e.boundingBox).applyMatrix4(ji),this.boundingBox.union(ja)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ji),vn.copy(e.boundingSphere).applyMatrix4(ji),this.boundingSphere.union(vn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(_n.geometry=this.geometry,_n.material=this.material,_n.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vn.copy(this.boundingSphere),vn.applyMatrix4(i),e.ray.intersectsSphere(vn)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ji),Ya.multiplyMatrices(i,ji),_n.matrixWorld=Ya,_n.raycast(e,Jn);for(let a=0,o=Jn.length;a<o;a++){const l=Jn[a];l.instanceId=r,l.object=this,t.push(l)}Jn.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Zo(new Float32Array(s*this.count),s,this.count,Zr,Xt));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const js=new L,th=new L,ih=new Le;class Ai{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=js.subVectors(i,t).cross(th.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(js),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ih.getNormalMatrix(e),s=this.coplanarPoint(js).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new hn,nh=new Ne(.5,.5),Qn=new L;class aa{constructor(e=new Ai,t=new Ai,i=new Ai,s=new Ai,r=new Ai,a=new Ai){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Yt,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],f=r[6],p=r[7],x=r[8],v=r[9],m=r[10],h=r[11],M=r[12],S=r[13],T=r[14],A=r[15];if(s[0].setComponents(c-a,p-u,h-x,A-M).normalize(),s[1].setComponents(c+a,p+u,h+x,A+M).normalize(),s[2].setComponents(c+o,p+d,h+v,A+S).normalize(),s[3].setComponents(c-o,p-d,h-v,A-S).normalize(),i)s[4].setComponents(l,f,m,T).normalize(),s[5].setComponents(c-l,p-f,h-m,A-T).normalize();else if(s[4].setComponents(c-l,p-f,h-m,A-T).normalize(),t===Yt)s[5].setComponents(c+l,p+f,h+m,A+T).normalize();else if(t===fs)s[5].setComponents(l,f,m,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(e){Ei.center.set(0,0,0);const t=nh.distanceTo(e.center);return Ei.radius=.7071067811865476+t,Ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Qn.x=s.normal.x>0?e.max.x:e.min.x,Qn.y=s.normal.y>0?e.max.y:e.min.y,Qn.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Qn)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class sh extends dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ms=new L,xs=new L,$a=new Qe,yn=new sa,es=new hn,$s=new L,Ka=new L;class rh extends ut{constructor(e=new gt,t=new sh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ms.fromBufferAttribute(t,s-1),xs.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ms.distanceTo(xs);e.setAttribute("lineDistance",new Xe(i,1))}else Ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),es.copy(i.boundingSphere),es.applyMatrix4(s),es.radius+=r,e.ray.intersectsSphere(es)===!1)return;$a.copy(s).invert(),yn.copy(e.ray).applyMatrix4($a);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=p,m=x-1;v<m;v+=c){const h=u.getX(v),M=u.getX(v+1),S=ts(this,e,yn,l,h,M,v);S&&t.push(S)}if(this.isLineLoop){const v=u.getX(x-1),m=u.getX(p),h=ts(this,e,yn,l,v,m,x-1);h&&t.push(h)}}else{const p=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let v=p,m=x-1;v<m;v+=c){const h=ts(this,e,yn,l,v,v+1,v);h&&t.push(h)}if(this.isLineLoop){const v=ts(this,e,yn,l,x-1,p,x-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ts(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(ms.fromBufferAttribute(o,s),xs.fromBufferAttribute(o,r),t.distanceSqToSegment(ms,xs,$s,Ka)>i)return;$s.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo($s);if(!(c<e.near||c>e.far))return{distance:c,point:Ka.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Za=new L,Ja=new L;class rm extends rh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Za.fromBufferAttribute(t,s),Ja.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Za.distanceTo(Ja);e.setAttribute("lineDistance",new Xe(i,1))}else Ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jo extends St{constructor(e,t,i=Ii,s,r,a,o=Dt,l=Dt,c,u=An,d=1){if(u!==An&&u!==Rn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new na(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Qo extends St{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ec extends gt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],u=t/2,d=Math.PI/2*e,f=t,p=2*d+f,x=i*2+r,v=s+1,m=new L,h=new L;for(let M=0;M<=x;M++){let S=0,T=0,A=0,E=0;if(M<=i){const y=M/i,_=y*Math.PI/2;T=-u-e*Math.cos(_),A=e*Math.sin(_),E=-e*Math.cos(_),S=y*d}else if(M<=i+r){const y=(M-i)/r;T=-u+y*t,A=e,E=0,S=d+y*f}else{const y=(M-i-r)/i,_=y*Math.PI/2;T=u+e*Math.sin(_),A=e*Math.cos(_),E=e*Math.sin(_),S=d+f+y*d}const C=Math.max(0,Math.min(1,S/p));let D=0;M===0?D=.5/s:M===x&&(D=-.5/s);for(let y=0;y<=s;y++){const _=y/s,I=_*Math.PI*2,F=Math.sin(I),B=Math.cos(I);h.x=-A*B,h.y=T,h.z=A*F,o.push(h.x,h.y,h.z),m.set(-A*B,E,A*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(_+D,C)}if(M>0){const y=(M-1)*v;for(let _=0;_<s;_++){const I=y+_,F=y+_+1,B=M*v+_,G=M*v+_+1;a.push(I,F,B),a.push(F,G,B)}}}this.setIndex(a),this.setAttribute("position",new Xe(o,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class tc extends gt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new L,u=new Ne;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const p=i+d/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Xe(a,3)),this.setAttribute("normal",new Xe(o,3)),this.setAttribute("uv",new Xe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class oa extends gt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],p=[];let x=0;const v=[],m=i/2;let h=0;M(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Xe(d,3)),this.setAttribute("normal",new Xe(f,3)),this.setAttribute("uv",new Xe(p,2));function M(){const T=new L,A=new L;let E=0;const C=(t-e)/i;for(let D=0;D<=r;D++){const y=[],_=D/r,I=_*(t-e)+e;for(let F=0;F<=s;F++){const B=F/s,G=B*l+o,X=Math.sin(G),W=Math.cos(G);A.x=I*X,A.y=-_*i+m,A.z=I*W,d.push(A.x,A.y,A.z),T.set(X,C,W).normalize(),f.push(T.x,T.y,T.z),p.push(B,1-_),y.push(x++)}v.push(y)}for(let D=0;D<s;D++)for(let y=0;y<r;y++){const _=v[y][D],I=v[y+1][D],F=v[y+1][D+1],B=v[y][D+1];(e>0||y!==0)&&(u.push(_,I,B),E+=3),(t>0||y!==r-1)&&(u.push(I,F,B),E+=3)}c.addGroup(h,E,0),h+=E}function S(T){const A=x,E=new Ne,C=new L;let D=0;const y=T===!0?e:t,_=T===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,m*_,0),f.push(0,_,0),p.push(.5,.5),x++;const I=x;for(let F=0;F<=s;F++){const G=F/s*l+o,X=Math.cos(G),W=Math.sin(G);C.x=y*W,C.y=m*_,C.z=y*X,d.push(C.x,C.y,C.z),f.push(0,_,0),E.x=X*.5+.5,E.y=W*.5*_+.5,p.push(E.x,E.y),x++}for(let F=0;F<s;F++){const B=A+F,G=I+F;T===!0?u.push(G,G+1,B):u.push(G+1,G,B),D+=3}c.addGroup(h,D,T===!0?1:2),h+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ic extends oa{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ic(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ca extends gt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new Xe(r,3)),this.setAttribute("normal",new Xe(r.slice(),3)),this.setAttribute("uv",new Xe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const S=new L,T=new L,A=new L;for(let E=0;E<t.length;E+=3)p(t[E+0],S),p(t[E+1],T),p(t[E+2],A),l(S,T,A,M)}function l(M,S,T,A){const E=A+1,C=[];for(let D=0;D<=E;D++){C[D]=[];const y=M.clone().lerp(T,D/E),_=S.clone().lerp(T,D/E),I=E-D;for(let F=0;F<=I;F++)F===0&&D===E?C[D][F]=y:C[D][F]=y.clone().lerp(_,F/I)}for(let D=0;D<E;D++)for(let y=0;y<2*(E-D)-1;y++){const _=Math.floor(y/2);y%2===0?(f(C[D][_+1]),f(C[D+1][_]),f(C[D][_])):(f(C[D][_+1]),f(C[D+1][_+1]),f(C[D+1][_]))}}function c(M){const S=new L;for(let T=0;T<r.length;T+=3)S.x=r[T+0],S.y=r[T+1],S.z=r[T+2],S.normalize().multiplyScalar(M),r[T+0]=S.x,r[T+1]=S.y,r[T+2]=S.z}function u(){const M=new L;for(let S=0;S<r.length;S+=3){M.x=r[S+0],M.y=r[S+1],M.z=r[S+2];const T=m(M)/2/Math.PI+.5,A=h(M)/Math.PI+.5;a.push(T,1-A)}x(),d()}function d(){for(let M=0;M<a.length;M+=6){const S=a[M+0],T=a[M+2],A=a[M+4],E=Math.max(S,T,A),C=Math.min(S,T,A);E>.9&&C<.1&&(S<.2&&(a[M+0]+=1),T<.2&&(a[M+2]+=1),A<.2&&(a[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function p(M,S){const T=M*3;S.x=e[T+0],S.y=e[T+1],S.z=e[T+2]}function x(){const M=new L,S=new L,T=new L,A=new L,E=new Ne,C=new Ne,D=new Ne;for(let y=0,_=0;y<r.length;y+=9,_+=6){M.set(r[y+0],r[y+1],r[y+2]),S.set(r[y+3],r[y+4],r[y+5]),T.set(r[y+6],r[y+7],r[y+8]),E.set(a[_+0],a[_+1]),C.set(a[_+2],a[_+3]),D.set(a[_+4],a[_+5]),A.copy(M).add(S).add(T).divideScalar(3);const I=m(A);v(E,_+0,M,I),v(C,_+2,S,I),v(D,_+4,T,I)}}function v(M,S,T,A){A<0&&M.x===1&&(a[S]=M.x-1),T.x===0&&T.z===0&&(a[S]=A/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function h(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.vertices,e.indices,e.radius,e.details)}}const is=new L,ns=new L,Ks=new L,ss=new Ft;class am extends gt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(Ji*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),f={},p=[];for(let x=0;x<l;x+=3){a?(c[0]=a.getX(x),c[1]=a.getX(x+1),c[2]=a.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);const{a:v,b:m,c:h}=ss;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),h.fromBufferAttribute(o,c[2]),ss.getNormal(Ks),d[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){const S=(M+1)%3,T=d[M],A=d[S],E=ss[u[M]],C=ss[u[S]],D=`${T}_${A}`,y=`${A}_${T}`;y in f&&f[y]?(Ks.dot(f[y].normal)<=r&&(p.push(E.x,E.y,E.z),p.push(C.x,C.y,C.z)),f[y]=null):D in f||(f[D]={index0:c[M],index1:c[S],normal:Ks.clone()})}}for(const x in f)if(f[x]){const{index0:v,index1:m}=f[x];is.fromBufferAttribute(o,v),ns.fromBufferAttribute(o,m),p.push(is.x,is.y,is.z),p.push(ns.x,ns.y,ns.z)}this.setAttribute("position",new Xe(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class nc extends ca{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new nc(e.radius,e.detail)}}class vs extends gt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,f=t/l,p=[],x=[],v=[],m=[];for(let h=0;h<u;h++){const M=h*f-a;for(let S=0;S<c;S++){const T=S*d-r;x.push(T,-M,0),v.push(0,0,1),m.push(S/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let M=0;M<o;M++){const S=M+c*h,T=M+c*(h+1),A=M+1+c*(h+1),E=M+1+c*h;p.push(S,T,E),p.push(T,A,E)}this.setIndex(p),this.setAttribute("position",new Xe(x,3)),this.setAttribute("normal",new Xe(v,3)),this.setAttribute("uv",new Xe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.widthSegments,e.heightSegments)}}class sc extends gt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let d=e;const f=(t-e)/s,p=new L,x=new Ne;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const h=r+m/i*a;p.x=d*Math.cos(h),p.y=d*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,u.push(x.x,x.y)}d+=f}for(let v=0;v<s;v++){const m=v*(i+1);for(let h=0;h<i;h++){const M=h+m,S=M,T=M+i+1,A=M+i+2,E=M+1;o.push(S,T,E),o.push(T,A,E)}}this.setIndex(o),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(c,3)),this.setAttribute("uv",new Xe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class rc extends gt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new L,f=new L,p=[],x=[],v=[],m=[];for(let h=0;h<=i;h++){const M=[],S=h/i;let T=0;h===0&&a===0?T=.5/t:h===i&&l===Math.PI&&(T=-.5/t);for(let A=0;A<=t;A++){const E=A/t;d.x=-e*Math.cos(s+E*r)*Math.sin(a+S*o),d.y=e*Math.cos(a+S*o),d.z=e*Math.sin(s+E*r)*Math.sin(a+S*o),x.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),m.push(E+T,1-S),M.push(c++)}u.push(M)}for(let h=0;h<i;h++)for(let M=0;M<t;M++){const S=u[h][M+1],T=u[h][M],A=u[h+1][M],E=u[h+1][M+1];(h!==0||a>0)&&p.push(S,T,E),(h!==i-1||l<Math.PI)&&p.push(T,A,E)}this.setIndex(p),this.setAttribute("position",new Xe(x,3)),this.setAttribute("normal",new Xe(v,3)),this.setAttribute("uv",new Xe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ac extends gt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],u=new L,d=new L,f=new L;for(let p=0;p<=i;p++)for(let x=0;x<=s;x++){const v=x/s*r,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(v),d.y=(e+t*Math.cos(m))*Math.sin(v),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(x/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let x=1;x<=s;x++){const v=(s+1)*p+x-1,m=(s+1)*(p-1)+x-1,h=(s+1)*(p-1)+x,M=(s+1)*p+x;a.push(v,m,M),a.push(m,h,M)}this.setIndex(a),this.setAttribute("position",new Xe(o,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class om extends dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zo,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ah extends dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=il,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class oh extends dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ys extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class cm extends ys{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Zs=new Qe,Qa=new L,eo=new L;class la{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=jt,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new aa,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Qa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qa),eo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(eo),t.updateMatrixWorld(),Zs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zs,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Zs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ch extends la{constructor(){super(new It(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=rn*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class lm extends ys{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new ch}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const to=new Qe,bn=new L,Js=new L;class lh extends la{constructor(){super(new It(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ne(4,2),this._viewportCount=6,this._viewports=[new Ze(2,1,1,1),new Ze(0,1,1,1),new Ze(3,1,1,1),new Ze(1,1,1,1),new Ze(3,0,1,1),new Ze(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),bn.setFromMatrixPosition(e.matrixWorld),i.position.copy(bn),Js.copy(i.position),Js.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Js),i.updateMatrixWorld(),s.makeTranslation(-bn.x,-bn.y,-bn.z),to.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(to,i.coordinateSystem,i.reversedDepth)}}class hm extends ys{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new lh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class oc extends jo{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hh extends la{constructor(){super(new oc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dm extends ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new hh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class dh extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const io=new Qe;class um{constructor(e,t,i=0,s=1/0){this.ray=new sa(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new ra,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ht("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return io.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(io),this}intersectObject(e,t=!0,i=[]){return qr(e,this,i,t),i.sort(no),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)qr(e[s],this,i,t);return i.sort(no),i}}function no(n,e){return n.distance-e.distance}function qr(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)qr(r[a],e,t,!0)}}function so(n,e,t,i){const s=uh(i);switch(t){case Oo:return n*e;case Zr:return n*e/s.components*s.byteLength;case Jr:return n*e/s.components*s.byteLength;case Qr:return n*e*2/s.components*s.byteLength;case ea:return n*e*2/s.components*s.byteLength;case Bo:return n*e*3/s.components*s.byteLength;case Gt:return n*e*4/s.components*s.byteLength;case ta:return n*e*4/s.components*s.byteLength;case os:case cs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ls:case hs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _r:case yr:return Math.max(n,16)*Math.max(e,8)/4;case gr:case vr:return Math.max(n,8)*Math.max(e,8)/2;case br:case Mr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Er:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Tr:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case wr:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ar:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Rr:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Cr:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Pr:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ir:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Dr:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Lr:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ur:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Nr:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Fr:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Or:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Br:case zr:case Vr:return Math.ceil(n/4)*Math.ceil(e/4)*16;case kr:case Gr:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Hr:case Wr:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uh(n){switch(n){case jt:case Lo:return{byteLength:1,components:1};case Tn:case Uo:case on:return{byteLength:2,components:1};case $r:case Kr:return{byteLength:2,components:4};case Ii:case jr:case Xt:return{byteLength:4,components:1};case No:case Fo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yr}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yr);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function cc(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function fh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,x)=>p.start-x.start);let f=0;for(let p=1;p<d.length;p++){const x=d[f],v=d[p];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++f,d[f]=v)}d.length=f+1;for(let p=0,x=d.length;p<x;p++){const v=d[p];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ph=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_h=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Th=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ah=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ph=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ih=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Uh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Oh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Vh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wh="gl_FragColor = linearToOutputTexel( gl_FragColor );",qh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Yh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,jh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$h=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ed=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,td=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,id=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ad=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ld=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ud=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,md=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Md=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Td=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ad=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Pd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Id=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Dd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ld=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Od=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$d=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,tu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,su=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ru=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,au=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ou=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,du=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,uu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_u=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Su=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Eu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tu=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Au=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ru=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Du=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Uu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Nu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ou=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bu=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vu=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ku=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hu=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wu=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qu=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:ph,alphahash_pars_fragment:mh,alphamap_fragment:xh,alphamap_pars_fragment:gh,alphatest_fragment:_h,alphatest_pars_fragment:vh,aomap_fragment:yh,aomap_pars_fragment:bh,batching_pars_vertex:Mh,batching_vertex:Sh,begin_vertex:Eh,beginnormal_vertex:Th,bsdfs:wh,iridescence_fragment:Ah,bumpmap_pars_fragment:Rh,clipping_planes_fragment:Ch,clipping_planes_pars_fragment:Ph,clipping_planes_pars_vertex:Ih,clipping_planes_vertex:Dh,color_fragment:Lh,color_pars_fragment:Uh,color_pars_vertex:Nh,color_vertex:Fh,common:Oh,cube_uv_reflection_fragment:Bh,defaultnormal_vertex:zh,displacementmap_pars_vertex:Vh,displacementmap_vertex:kh,emissivemap_fragment:Gh,emissivemap_pars_fragment:Hh,colorspace_fragment:Wh,colorspace_pars_fragment:qh,envmap_fragment:Xh,envmap_common_pars_fragment:Yh,envmap_pars_fragment:jh,envmap_pars_vertex:$h,envmap_physical_pars_fragment:ad,envmap_vertex:Kh,fog_vertex:Zh,fog_pars_vertex:Jh,fog_fragment:Qh,fog_pars_fragment:ed,gradientmap_pars_fragment:td,lightmap_pars_fragment:id,lights_lambert_fragment:nd,lights_lambert_pars_fragment:sd,lights_pars_begin:rd,lights_toon_fragment:od,lights_toon_pars_fragment:cd,lights_phong_fragment:ld,lights_phong_pars_fragment:hd,lights_physical_fragment:dd,lights_physical_pars_fragment:ud,lights_fragment_begin:fd,lights_fragment_maps:pd,lights_fragment_end:md,logdepthbuf_fragment:xd,logdepthbuf_pars_fragment:gd,logdepthbuf_pars_vertex:_d,logdepthbuf_vertex:vd,map_fragment:yd,map_pars_fragment:bd,map_particle_fragment:Md,map_particle_pars_fragment:Sd,metalnessmap_fragment:Ed,metalnessmap_pars_fragment:Td,morphinstance_vertex:wd,morphcolor_vertex:Ad,morphnormal_vertex:Rd,morphtarget_pars_vertex:Cd,morphtarget_vertex:Pd,normal_fragment_begin:Id,normal_fragment_maps:Dd,normal_pars_fragment:Ld,normal_pars_vertex:Ud,normal_vertex:Nd,normalmap_pars_fragment:Fd,clearcoat_normal_fragment_begin:Od,clearcoat_normal_fragment_maps:Bd,clearcoat_pars_fragment:zd,iridescence_pars_fragment:Vd,opaque_fragment:kd,packing:Gd,premultiplied_alpha_fragment:Hd,project_vertex:Wd,dithering_fragment:qd,dithering_pars_fragment:Xd,roughnessmap_fragment:Yd,roughnessmap_pars_fragment:jd,shadowmap_pars_fragment:$d,shadowmap_pars_vertex:Kd,shadowmap_vertex:Zd,shadowmask_pars_fragment:Jd,skinbase_vertex:Qd,skinning_pars_vertex:eu,skinning_vertex:tu,skinnormal_vertex:iu,specularmap_fragment:nu,specularmap_pars_fragment:su,tonemapping_fragment:ru,tonemapping_pars_fragment:au,transmission_fragment:ou,transmission_pars_fragment:cu,uv_pars_fragment:lu,uv_pars_vertex:hu,uv_vertex:du,worldpos_vertex:uu,background_vert:fu,background_frag:pu,backgroundCube_vert:mu,backgroundCube_frag:xu,cube_vert:gu,cube_frag:_u,depth_vert:vu,depth_frag:yu,distanceRGBA_vert:bu,distanceRGBA_frag:Mu,equirect_vert:Su,equirect_frag:Eu,linedashed_vert:Tu,linedashed_frag:wu,meshbasic_vert:Au,meshbasic_frag:Ru,meshlambert_vert:Cu,meshlambert_frag:Pu,meshmatcap_vert:Iu,meshmatcap_frag:Du,meshnormal_vert:Lu,meshnormal_frag:Uu,meshphong_vert:Nu,meshphong_frag:Fu,meshphysical_vert:Ou,meshphysical_frag:Bu,meshtoon_vert:zu,meshtoon_frag:Vu,points_vert:ku,points_frag:Gu,shadow_vert:Hu,shadow_frag:Wu,sprite_vert:qu,sprite_frag:Xu},ae={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},qt={basic:{uniforms:Mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new He(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Mt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Mt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new He(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Mt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Mt([ae.points,ae.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Mt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Mt([ae.common,ae.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Mt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Mt([ae.sprite,ae.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:Mt([ae.common,ae.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:Mt([ae.lights,ae.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};qt.physical={uniforms:Mt([qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const rs={r:0,b:0,g:0},Ti=new $t,Yu=new Qe;function ju(n,e,t,i,s,r,a){const o=new He(0);let l=r===!0?0:1,c,u,d=null,f=0,p=null;function x(S){let T=S.isScene===!0?S.background:null;return T&&T.isTexture&&(T=(S.backgroundBlurriness>0?t:e).get(T)),T}function v(S){let T=!1;const A=x(S);A===null?h(o,l):A&&A.isColor&&(h(A,1),T=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,T){const A=x(T);A&&(A.isCubeTexture||A.mapping===_s)?(u===void 0&&(u=new Kt(new In(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:an(qt.backgroundCube.uniforms),vertexShader:qt.backgroundCube.vertexShader,fragmentShader:qt.backgroundCube.fragmentShader,side:wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,C,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ti.copy(T.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Yu.makeRotationFromEuler(Ti)),u.material.toneMapped=qe.getTransfer(A.colorSpace)!==Ke,(d!==A||f!==A.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=A,f=A.version,p=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Kt(new vs(2,2),new ci({name:"BackgroundMaterial",uniforms:an(qt.background.uniforms),vertexShader:qt.background.vertexShader,fragmentShader:qt.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=qe.getTransfer(A.colorSpace)!==Ke,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||f!==A.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=A,f=A.version,p=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function h(S,T){S.getRGB(rs,Yo(n)),i.buffers.color.setClear(rs.r,rs.g,rs.b,T,a)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,T=1){o.set(S),l=T,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,h(o,l)},render:v,addToRenderList:m,dispose:M}}function $u(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(_,I,F,B,G){let X=!1;const W=d(B,F,I);r!==W&&(r=W,c(r.object)),X=p(_,B,F,G),X&&x(_,B,F,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,T(_,I,F,B),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function u(_){return n.deleteVertexArray(_)}function d(_,I,F){const B=F.wireframe===!0;let G=i[_.id];G===void 0&&(G={},i[_.id]=G);let X=G[I.id];X===void 0&&(X={},G[I.id]=X);let W=X[B];return W===void 0&&(W=f(l()),X[B]=W),W}function f(_){const I=[],F=[],B=[];for(let G=0;G<t;G++)I[G]=0,F[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:B,object:_,attributes:{},index:null}}function p(_,I,F,B){const G=r.attributes,X=I.attributes;let W=0;const ie=F.getAttributes();for(const H in ie)if(ie[H].location>=0){const re=G[H];let be=X[H];if(be===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(be=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(be=_.instanceColor)),re===void 0||re.attribute!==be||be&&re.data!==be.data)return!0;W++}return r.attributesNum!==W||r.index!==B}function x(_,I,F,B){const G={},X=I.attributes;let W=0;const ie=F.getAttributes();for(const H in ie)if(ie[H].location>=0){let re=X[H];re===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(re=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(re=_.instanceColor));const be={};be.attribute=re,re&&re.data&&(be.data=re.data),G[H]=be,W++}r.attributes=G,r.attributesNum=W,r.index=B}function v(){const _=r.newAttributes;for(let I=0,F=_.length;I<F;I++)_[I]=0}function m(_){h(_,0)}function h(_,I){const F=r.newAttributes,B=r.enabledAttributes,G=r.attributeDivisors;F[_]=1,B[_]===0&&(n.enableVertexAttribArray(_),B[_]=1),G[_]!==I&&(n.vertexAttribDivisor(_,I),G[_]=I)}function M(){const _=r.newAttributes,I=r.enabledAttributes;for(let F=0,B=I.length;F<B;F++)I[F]!==_[F]&&(n.disableVertexAttribArray(F),I[F]=0)}function S(_,I,F,B,G,X,W){W===!0?n.vertexAttribIPointer(_,I,F,G,X):n.vertexAttribPointer(_,I,F,B,G,X)}function T(_,I,F,B){v();const G=B.attributes,X=F.getAttributes(),W=I.defaultAttributeValues;for(const ie in X){const H=X[ie];if(H.location>=0){let te=G[ie];if(te===void 0&&(ie==="instanceMatrix"&&_.instanceMatrix&&(te=_.instanceMatrix),ie==="instanceColor"&&_.instanceColor&&(te=_.instanceColor)),te!==void 0){const re=te.normalized,be=te.itemSize,Ge=e.get(te);if(Ge===void 0)continue;const Ye=Ge.buffer,et=Ge.type,tt=Ge.bytesPerElement,Y=et===n.INT||et===n.UNSIGNED_INT||te.gpuType===jr;if(te.isInterleavedBufferAttribute){const K=te.data,ue=K.stride,De=te.offset;if(K.isInstancedInterleavedBuffer){for(let _e=0;_e<H.locationSize;_e++)h(H.location+_e,K.meshPerAttribute);_.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let _e=0;_e<H.locationSize;_e++)m(H.location+_e);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let _e=0;_e<H.locationSize;_e++)S(H.location+_e,be/H.locationSize,et,re,ue*tt,(De+be/H.locationSize*_e)*tt,Y)}else{if(te.isInstancedBufferAttribute){for(let K=0;K<H.locationSize;K++)h(H.location+K,te.meshPerAttribute);_.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let K=0;K<H.locationSize;K++)m(H.location+K);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let K=0;K<H.locationSize;K++)S(H.location+K,be/H.locationSize,et,re,be*tt,be/H.locationSize*K*tt,Y)}}else if(W!==void 0){const re=W[ie];if(re!==void 0)switch(re.length){case 2:n.vertexAttrib2fv(H.location,re);break;case 3:n.vertexAttrib3fv(H.location,re);break;case 4:n.vertexAttrib4fv(H.location,re);break;default:n.vertexAttrib1fv(H.location,re)}}}}M()}function A(){D();for(const _ in i){const I=i[_];for(const F in I){const B=I[F];for(const G in B)u(B[G].object),delete B[G];delete I[F]}delete i[_]}}function E(_){if(i[_.id]===void 0)return;const I=i[_.id];for(const F in I){const B=I[F];for(const G in B)u(B[G].object),delete B[G];delete I[F]}delete i[_.id]}function C(_){for(const I in i){const F=i[I];if(F[_.id]===void 0)continue;const B=F[_.id];for(const G in B)u(B[G].object),delete B[G];delete F[_.id]}}function D(){y(),a=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Ku(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=u[x];t.update(p,i,1)}function l(c,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<c.length;x++)a(c[x],u[x],f[x]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let x=0;for(let v=0;v<d;v++)x+=u[v]*f[v];t.update(x,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Zu(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Gt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const D=C===on&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==jt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Xt&&!D)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ce("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=x>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:T,vertexTextures:A,maxSamples:E}}function Ju(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Ai,o=new Le,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||s;return s=f,i=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const x=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!s||x===null||x.length===0||r&&!m)r?u(null):c();else{const M=r?0:i,S=M*4;let T=h.clippingState||null;l.value=T,T=u(x,f,S,p);for(let A=0;A!==S;++A)T[A]=t[A];h.clippingState=T,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,x){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,x!==!0||m===null){const h=p+v*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<h)&&(m=new Float32Array(h));for(let S=0,T=p;S!==v;++S,T+=4)a.copy(d[S]).applyMatrix4(M,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Qu(n){let e=new WeakMap;function t(a,o){return o===fr?a.mapping=tn:o===pr&&(a.mapping=nn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===fr||o===pr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Jl(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const xi=4,ro=[.125,.215,.35,.446,.526,.582],Ci=20,ef=256,Mn=new oc,ao=new He;let Qs=null,er=0,tr=0,ir=!1;const tf=new L;class oo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=tf}=r;Qs=this._renderer.getRenderTarget(),er=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel(),ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ho(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qs,er,tr),this._renderer.xr.enabled=ir,e.scissorTest=!1,$i(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===tn||e.mapping===nn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qs=this._renderer.getRenderTarget(),er=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel(),ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:on,format:Gt,colorSpace:sn,depthBuffer:!1},s=co(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=co(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=nf(r)),this._blurMaterial=rf(r,e,t),this._ggxMaterial=sf(r,e,t)}return s}_compileMaterial(e){const t=new Kt(new gt,e);this._renderer.compile(t,Mn)}_sceneToCubeUV(e,t,i,s,r){const l=new It(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(ao),d.toneMapping=gi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new In,new Wo({name:"PMREM.Background",side:wt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let h=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,h=!0):(m.color.copy(ao),h=!0);for(let S=0;S<6;S++){const T=S%3;T===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[S],r.y,r.z)):T===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[S]));const A=this._cubeSize;$i(s,T*A,S>2?A:0,A,A),d.setRenderTarget(s),h&&d.render(v,l),d.render(e,l)}d.toneMapping=p,d.autoClear=f,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===tn||e.mapping===nn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ho()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;$i(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Mn)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=.05+c*.95,p=d*f,{_lodMax:x}=this,v=this._sizeLods[i],m=3*v*(i>x-xi?i-x+xi:0),h=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=x-t,$i(r,m,h,3*v,2*v),s.setRenderTarget(r),s.render(o,Mn),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,$i(e,m,h,3*v,2*v),s.setRenderTarget(e),s.render(o,Mn)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ht("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=c;const f=c.uniforms,p=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ci-1),v=r/x,m=isFinite(r)?1+Math.floor(u*v):Ci;m>Ci&&Ce(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ci}`);const h=[];let M=0;for(let C=0;C<Ci;++C){const D=C/v,y=Math.exp(-D*D/2);h.push(y),C===0?M+=y:C<m&&(M+=2*y)}for(let C=0;C<h.length;C++)h[C]=h[C]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=x,f.mipInt.value=S-i;const T=this._sizeLods[s],A=3*T*(s>S-xi?s-S+xi:0),E=4*(this._cubeSize-T);$i(t,A,E,3*T,2*T),l.setRenderTarget(t),l.render(d,Mn)}}function nf(n){const e=[],t=[],i=[];let s=n;const r=n-xi+1+ro.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-xi?l=ro[a-n+xi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,x=6,v=3,m=2,h=1,M=new Float32Array(v*x*p),S=new Float32Array(m*x*p),T=new Float32Array(h*x*p);for(let E=0;E<p;E++){const C=E%3*2/3-1,D=E>2?0:-1,y=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];M.set(y,v*x*E),S.set(f,m*x*E);const _=[E,E,E,E,E,E];T.set(_,h*x*E)}const A=new gt;A.setAttribute("position",new Ht(M,v)),A.setAttribute("uv",new Ht(S,m)),A.setAttribute("faceIndex",new Ht(T,h)),i.push(new Kt(A,null)),s>xi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function co(n,e,t){const i=new Di(n,e,t);return i.texture.mapping=_s,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $i(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function sf(n,e,t){return new ci({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ef,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function rf(n,e,t){const i=new Float32Array(Ci),s=new L(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:Ci,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function lo(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function ho(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function bs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function af(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===fr||l===pr,u=l===tn||l===nn;if(c||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new oo(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new oo(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function of(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Cn("WebGLRenderer: "+i+" extension not supported."),s}}}function cf(n,e,t,i){const s={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function c(d){const f=[],p=d.index,x=d.attributes.position;let v=0;if(p!==null){const M=p.array;v=p.version;for(let S=0,T=M.length;S<T;S+=3){const A=M[S+0],E=M[S+1],C=M[S+2];f.push(A,E,E,C,C,A)}}else if(x!==void 0){const M=x.array;v=x.version;for(let S=0,T=M.length/3-1;S<T;S+=3){const A=S+0,E=S+1,C=S+2;f.push(A,E,E,C,C,A)}}else return;const m=new(ko(f)?Xo:qo)(f,1);m.version=v;const h=r.get(d);h&&e.remove(h),r.set(d,m)}function u(d){const f=r.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function lf(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*a),t.update(p,i,1)}function c(f,p,x){x!==0&&(n.drawElementsInstanced(i,p,r,f*a,x),t.update(p,i,x))}function u(f,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,x);let m=0;for(let h=0;h<x;h++)m+=p[h];t.update(m,i,1)}function d(f,p,x,v){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/a,p[h],v[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,v,0,x);let h=0;for(let M=0;M<x;M++)h+=p[M]*v[M];t.update(h,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function hf(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:ht("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function df(n,e,t){const i=new WeakMap,s=new Ze;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let y=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),x===!0&&(S=2),v===!0&&(S=3);let T=o.attributes.position.count*S,A=1;T>e.maxTextureSize&&(A=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const E=new Float32Array(T*A*4*d),C=new Go(E,T,A,d);C.type=Xt,C.needsUpdate=!0;const D=S*4;for(let _=0;_<d;_++){const I=m[_],F=h[_],B=M[_],G=T*A*4*_;for(let X=0;X<I.count;X++){const W=X*D;p===!0&&(s.fromBufferAttribute(I,X),E[G+W+0]=s.x,E[G+W+1]=s.y,E[G+W+2]=s.z,E[G+W+3]=0),x===!0&&(s.fromBufferAttribute(F,X),E[G+W+4]=s.x,E[G+W+5]=s.y,E[G+W+6]=s.z,E[G+W+7]=0),v===!0&&(s.fromBufferAttribute(B,X),E[G+W+8]=s.x,E[G+W+9]=s.y,E[G+W+10]=s.z,E[G+W+11]=B.itemSize===4?s.w:1)}}f={count:d,texture:C,size:new Ne(T,A)},i.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function uf(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const lc=new St,uo=new Jo(1,1),hc=new Go,dc=new Nl,uc=new $o,fo=[],po=[],mo=new Float32Array(16),xo=new Float32Array(9),go=new Float32Array(4);function un(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=fo[s];if(r===void 0&&(r=new Float32Array(s),fo[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ms(n,e){let t=po[e];t===void 0&&(t=new Int32Array(e),po[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ff(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function pf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2fv(this.addr,e),pt(t,e)}}function mf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;n.uniform3fv(this.addr,e),pt(t,e)}}function xf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4fv(this.addr,e),pt(t,e)}}function gf(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;go.set(i),n.uniformMatrix2fv(this.addr,!1,go),pt(t,i)}}function _f(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;xo.set(i),n.uniformMatrix3fv(this.addr,!1,xo),pt(t,i)}}function vf(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;mo.set(i),n.uniformMatrix4fv(this.addr,!1,mo),pt(t,i)}}function yf(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function bf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2iv(this.addr,e),pt(t,e)}}function Mf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3iv(this.addr,e),pt(t,e)}}function Sf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4iv(this.addr,e),pt(t,e)}}function Ef(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Tf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2uiv(this.addr,e),pt(t,e)}}function wf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3uiv(this.addr,e),pt(t,e)}}function Af(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4uiv(this.addr,e),pt(t,e)}}function Rf(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(uo.compareFunction=Vo,r=uo):r=lc,t.setTexture2D(e||r,s)}function Cf(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||dc,s)}function Pf(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||uc,s)}function If(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||hc,s)}function Df(n){switch(n){case 5126:return ff;case 35664:return pf;case 35665:return mf;case 35666:return xf;case 35674:return gf;case 35675:return _f;case 35676:return vf;case 5124:case 35670:return yf;case 35667:case 35671:return bf;case 35668:case 35672:return Mf;case 35669:case 35673:return Sf;case 5125:return Ef;case 36294:return Tf;case 36295:return wf;case 36296:return Af;case 35678:case 36198:case 36298:case 36306:case 35682:return Rf;case 35679:case 36299:case 36307:return Cf;case 35680:case 36300:case 36308:case 36293:return Pf;case 36289:case 36303:case 36311:case 36292:return If}}function Lf(n,e){n.uniform1fv(this.addr,e)}function Uf(n,e){const t=un(e,this.size,2);n.uniform2fv(this.addr,t)}function Nf(n,e){const t=un(e,this.size,3);n.uniform3fv(this.addr,t)}function Ff(n,e){const t=un(e,this.size,4);n.uniform4fv(this.addr,t)}function Of(n,e){const t=un(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Bf(n,e){const t=un(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zf(n,e){const t=un(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Vf(n,e){n.uniform1iv(this.addr,e)}function kf(n,e){n.uniform2iv(this.addr,e)}function Gf(n,e){n.uniform3iv(this.addr,e)}function Hf(n,e){n.uniform4iv(this.addr,e)}function Wf(n,e){n.uniform1uiv(this.addr,e)}function qf(n,e){n.uniform2uiv(this.addr,e)}function Xf(n,e){n.uniform3uiv(this.addr,e)}function Yf(n,e){n.uniform4uiv(this.addr,e)}function jf(n,e,t){const i=this.cache,s=e.length,r=Ms(t,s);ft(i,r)||(n.uniform1iv(this.addr,r),pt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||lc,r[a])}function $f(n,e,t){const i=this.cache,s=e.length,r=Ms(t,s);ft(i,r)||(n.uniform1iv(this.addr,r),pt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||dc,r[a])}function Kf(n,e,t){const i=this.cache,s=e.length,r=Ms(t,s);ft(i,r)||(n.uniform1iv(this.addr,r),pt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||uc,r[a])}function Zf(n,e,t){const i=this.cache,s=e.length,r=Ms(t,s);ft(i,r)||(n.uniform1iv(this.addr,r),pt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hc,r[a])}function Jf(n){switch(n){case 5126:return Lf;case 35664:return Uf;case 35665:return Nf;case 35666:return Ff;case 35674:return Of;case 35675:return Bf;case 35676:return zf;case 5124:case 35670:return Vf;case 35667:case 35671:return kf;case 35668:case 35672:return Gf;case 35669:case 35673:return Hf;case 5125:return Wf;case 36294:return qf;case 36295:return Xf;case 36296:return Yf;case 35678:case 36198:case 36298:case 36306:case 35682:return jf;case 35679:case 36299:case 36307:return $f;case 35680:case 36300:case 36308:case 36293:return Kf;case 36289:case 36303:case 36311:case 36292:return Zf}}class Qf{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Df(t.type)}}class ep{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jf(t.type)}}class tp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const nr=/(\w+)(\])?(\[|\.)?/g;function _o(n,e){n.seq.push(e),n.map[e.id]=e}function ip(n,e,t){const i=n.name,s=i.length;for(nr.lastIndex=0;;){const r=nr.exec(i),a=nr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){_o(t,c===void 0?new Qf(o,n,e):new ep(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new tp(o),_o(t,d)),t=d}}}class ds{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);ip(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function vo(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const np=37297;let sp=0;function rp(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const yo=new Le;function ap(n){qe._getMatrix(yo,qe.workingColorSpace,n);const e=`mat3( ${yo.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case us:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function bo(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+rp(n.getShaderSource(e),o)}else return r}function op(n,e){const t=ap(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function cp(n,e){let t;switch(e){case jc:t="Linear";break;case $c:t="Reinhard";break;case Kc:t="Cineon";break;case Zc:t="ACESFilmic";break;case Qc:t="AgX";break;case el:t="Neutral";break;case Jc:t="Custom";break;default:Ce("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const as=new L;function lp(){qe.getLuminanceCoefficients(as);const n=as.x.toFixed(4),e=as.y.toFixed(4),t=as.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hp(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sn).join(`
`)}function dp(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function up(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Sn(n){return n!==""}function Mo(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function So(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xr(n){return n.replace(fp,mp)}const pp=new Map;function mp(n,e){let t=Ue[e];if(t===void 0){const i=pp.get(e);if(i!==void 0)t=Ue[i],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Xr(t)}const xp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eo(n){return n.replace(xp,gp)}function gp(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function To(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function _p(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Po?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ac?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ni&&(e="SHADOWMAP_TYPE_VSM"),e}function vp(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case tn:case nn:e="ENVMAP_TYPE_CUBE";break;case _s:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yp(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case nn:e="ENVMAP_MODE_REFRACTION";break}return e}function bp(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Io:e="ENVMAP_BLENDING_MULTIPLY";break;case Xc:e="ENVMAP_BLENDING_MIX";break;case Yc:e="ENVMAP_BLENDING_ADD";break}return e}function Mp(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Sp(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=_p(t),c=vp(t),u=yp(t),d=bp(t),f=Mp(t),p=hp(t),x=dp(r),v=s.createProgram();let m,h,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Sn).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Sn).join(`
`),h.length>0&&(h+=`
`)):(m=[To(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sn).join(`
`),h=[To(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?Ue.tonemapping_pars_fragment:"",t.toneMapping!==gi?cp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,op("linearToOutputTexel",t.outputColorSpace),lp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Sn).join(`
`)),a=Xr(a),a=Mo(a,t),a=So(a,t),o=Xr(o),o=Mo(o,t),o=So(o,t),a=Eo(a),o=Eo(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=M+m+a,T=M+h+o,A=vo(s,s.VERTEX_SHADER,S),E=vo(s,s.FRAGMENT_SHADER,T);s.attachShader(v,A),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(I){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",B=s.getShaderInfoLog(A)||"",G=s.getShaderInfoLog(E)||"",X=F.trim(),W=B.trim(),ie=G.trim();let H=!0,te=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,E);else{const re=bo(s,A,"vertex"),be=bo(s,E,"fragment");ht("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+X+`
`+re+`
`+be)}else X!==""?Ce("WebGLProgram: Program Info Log:",X):(W===""||ie==="")&&(te=!1);te&&(I.diagnostics={runnable:H,programLog:X,vertexShader:{log:W,prefix:m},fragmentShader:{log:ie,prefix:h}})}s.deleteShader(A),s.deleteShader(E),D=new ds(s,v),y=up(s,v)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(v,np)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sp++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=E,this}let Ep=0;class Tp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new wp(e),t.set(e,i)),i}}class wp{constructor(e){this.id=Ep++,this.code=e,this.usedTimes=0}}function Ap(n,e,t,i,s,r,a){const o=new ra,l=new Tp,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,_,I,F,B){const G=F.fog,X=B.geometry,W=y.isMeshStandardMaterial?F.environment:null,ie=(y.isMeshStandardMaterial?t:e).get(y.envMap||W),H=ie&&ie.mapping===_s?ie.image.height:null,te=x[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&Ce("WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const re=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,be=re!==void 0?re.length:0;let Ge=0;X.morphAttributes.position!==void 0&&(Ge=1),X.morphAttributes.normal!==void 0&&(Ge=2),X.morphAttributes.color!==void 0&&(Ge=3);let Ye,et,tt,Y;if(te){const je=qt[te];Ye=je.vertexShader,et=je.fragmentShader}else Ye=y.vertexShader,et=y.fragmentShader,l.update(y),tt=l.getVertexShaderID(y),Y=l.getFragmentShaderID(y);const K=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),De=B.isInstancedMesh===!0,_e=B.isBatchedMesh===!0,Oe=!!y.map,xt=!!y.matcap,Fe=!!ie,st=!!y.aoMap,R=!!y.lightMap,Be=!!y.bumpMap,ze=!!y.normalMap,it=!!y.displacementMap,me=!!y.emissiveMap,rt=!!y.metalnessMap,ye=!!y.roughnessMap,Ie=y.anisotropy>0,w=y.clearcoat>0,g=y.dispersion>0,O=y.iridescence>0,q=y.sheen>0,$=y.transmission>0,k=Ie&&!!y.anisotropyMap,ge=w&&!!y.clearcoatMap,oe=w&&!!y.clearcoatNormalMap,Me=w&&!!y.clearcoatRoughnessMap,xe=O&&!!y.iridescenceMap,Z=O&&!!y.iridescenceThicknessMap,ee=q&&!!y.sheenColorMap,we=q&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,he=!!y.specularColorMap,Re=!!y.specularIntensityMap,P=$&&!!y.transmissionMap,ce=$&&!!y.thicknessMap,ne=!!y.gradientMap,se=!!y.alphaMap,J=y.alphaTest>0,j=!!y.alphaHash,fe=!!y.extensions;let Pe=gi;y.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Pe=n.toneMapping);const nt={shaderID:te,shaderType:y.type,shaderName:y.name,vertexShader:Ye,fragmentShader:et,defines:y.defines,customVertexShaderID:tt,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:_e,batchingColor:_e&&B._colorsTexture!==null,instancing:De,instancingColor:De&&B.instanceColor!==null,instancingMorph:De&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:sn,alphaToCoverage:!!y.alphaToCoverage,map:Oe,matcap:xt,envMap:Fe,envMapMode:Fe&&ie.mapping,envMapCubeUVHeight:H,aoMap:st,lightMap:R,bumpMap:Be,normalMap:ze,displacementMap:f&&it,emissiveMap:me,normalMapObjectSpace:ze&&y.normalMapType===sl,normalMapTangentSpace:ze&&y.normalMapType===zo,metalnessMap:rt,roughnessMap:ye,anisotropy:Ie,anisotropyMap:k,clearcoat:w,clearcoatMap:ge,clearcoatNormalMap:oe,clearcoatRoughnessMap:Me,dispersion:g,iridescence:O,iridescenceMap:xe,iridescenceThicknessMap:Z,sheen:q,sheenColorMap:ee,sheenRoughnessMap:we,specularMap:Ee,specularColorMap:he,specularIntensityMap:Re,transmission:$,transmissionMap:P,thicknessMap:ce,gradientMap:ne,opaque:y.transparent===!1&&y.blending===Zi&&y.alphaToCoverage===!1,alphaMap:se,alphaTest:J,alphaHash:j,combine:y.combine,mapUv:Oe&&v(y.map.channel),aoMapUv:st&&v(y.aoMap.channel),lightMapUv:R&&v(y.lightMap.channel),bumpMapUv:Be&&v(y.bumpMap.channel),normalMapUv:ze&&v(y.normalMap.channel),displacementMapUv:it&&v(y.displacementMap.channel),emissiveMapUv:me&&v(y.emissiveMap.channel),metalnessMapUv:rt&&v(y.metalnessMap.channel),roughnessMapUv:ye&&v(y.roughnessMap.channel),anisotropyMapUv:k&&v(y.anisotropyMap.channel),clearcoatMapUv:ge&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:oe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:we&&v(y.sheenRoughnessMap.channel),specularMapUv:Ee&&v(y.specularMap.channel),specularColorMapUv:he&&v(y.specularColorMap.channel),specularIntensityMapUv:Re&&v(y.specularIntensityMap.channel),transmissionMapUv:P&&v(y.transmissionMap.channel),thicknessMapUv:ce&&v(y.thicknessMap.channel),alphaMapUv:se&&v(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(ze||Ie),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!X.attributes.uv&&(Oe||se),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ue,skinning:B.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Ge,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Oe&&y.map.isVideoTexture===!0&&qe.getTransfer(y.map.colorSpace)===Ke,decodeVideoTextureEmissive:me&&y.emissiveMap.isVideoTexture===!0&&qe.getTransfer(y.emissiveMap.colorSpace)===Ke,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===si,flipSided:y.side===wt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:fe&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&y.extensions.multiDraw===!0||_e)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return nt.vertexUv1s=c.has(1),nt.vertexUv2s=c.has(2),nt.vertexUv3s=c.has(3),c.clear(),nt}function h(y){const _=[];if(y.shaderID?_.push(y.shaderID):(_.push(y.customVertexShaderID),_.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)_.push(I),_.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(M(_,y),S(_,y),_.push(n.outputColorSpace)),_.push(y.customProgramCacheKey),_.join()}function M(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)}function S(y,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),y.push(o.mask)}function T(y){const _=x[y.type];let I;if(_){const F=qt[_];I=jl.clone(F.uniforms)}else I=y.uniforms;return I}function A(y,_){let I;for(let F=0,B=u.length;F<B;F++){const G=u[F];if(G.cacheKey===_){I=G,++I.usedTimes;break}}return I===void 0&&(I=new Sp(n,_,y,r),u.push(I)),I}function E(y){if(--y.usedTimes===0){const _=u.indexOf(y);u[_]=u[u.length-1],u.pop(),y.destroy()}}function C(y){l.remove(y)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:T,acquireProgram:A,releaseProgram:E,releaseShaderCache:C,programs:u,dispose:D}}function Rp(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Cp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function wo(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ao(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,f,p,x,v,m){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:x,renderOrder:d.renderOrder,z:v,group:m},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=x,h.renderOrder=d.renderOrder,h.z=v,h.group=m),e++,h}function o(d,f,p,x,v,m){const h=a(d,f,p,x,v,m);p.transmission>0?i.push(h):p.transparent===!0?s.push(h):t.push(h)}function l(d,f,p,x,v,m){const h=a(d,f,p,x,v,m);p.transmission>0?i.unshift(h):p.transparent===!0?s.unshift(h):t.unshift(h)}function c(d,f){t.length>1&&t.sort(d||Cp),i.length>1&&i.sort(f||wo),s.length>1&&s.sort(f||wo)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Pp(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Ao,n.set(i,[a])):s>=r.length?(a=new Ao,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Ip(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new He};break;case"SpotLight":t={position:new L,direction:new L,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function Dp(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Lp=0;function Up(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Np(n){const e=new Ip,t=Dp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,r=new Qe,a=new Qe;function o(c){let u=0,d=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,x=0,v=0,m=0,h=0,M=0,S=0,T=0,A=0,E=0,C=0;c.sort(Up);for(let y=0,_=c.length;y<_;y++){const I=c[y],F=I.color,B=I.intensity,G=I.distance,X=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=F.r*B,d+=F.g*B,f+=F.b*B;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],B);C++}else if(I.isDirectionalLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,H=t.get(I);H.shadowIntensity=ie.intensity,H.shadowBias=ie.bias,H.shadowNormalBias=ie.normalBias,H.shadowRadius=ie.radius,H.shadowMapSize=ie.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=I.shadow.matrix,M++}i.directional[p]=W,p++}else if(I.isSpotLight){const W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(F).multiplyScalar(B),W.distance=G,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[v]=W;const ie=I.shadow;if(I.map&&(i.spotLightMap[A]=I.map,A++,ie.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[v]=ie.matrix,I.castShadow){const H=t.get(I);H.shadowIntensity=ie.intensity,H.shadowBias=ie.bias,H.shadowNormalBias=ie.normalBias,H.shadowRadius=ie.radius,H.shadowMapSize=ie.mapSize,i.spotShadow[v]=H,i.spotShadowMap[v]=X,T++}v++}else if(I.isRectAreaLight){const W=e.get(I);W.color.copy(F).multiplyScalar(B),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=W,m++}else if(I.isPointLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const ie=I.shadow,H=t.get(I);H.shadowIntensity=ie.intensity,H.shadowBias=ie.bias,H.shadowNormalBias=ie.normalBias,H.shadowRadius=ie.radius,H.shadowMapSize=ie.mapSize,H.shadowCameraNear=ie.camera.near,H.shadowCameraFar=ie.camera.far,i.pointShadow[x]=H,i.pointShadowMap[x]=X,i.pointShadowMatrix[x]=I.shadow.matrix,S++}i.point[x]=W,x++}else if(I.isHemisphereLight){const W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(B),W.groundColor.copy(I.groundColor).multiplyScalar(B),i.hemi[h]=W,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const D=i.hash;(D.directionalLength!==p||D.pointLength!==x||D.spotLength!==v||D.rectAreaLength!==m||D.hemiLength!==h||D.numDirectionalShadows!==M||D.numPointShadows!==S||D.numSpotShadows!==T||D.numSpotMaps!==A||D.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=x,i.hemi.length=h,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=T+A-E,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,D.directionalLength=p,D.pointLength=x,D.spotLength=v,D.rectAreaLength=m,D.hemiLength=h,D.numDirectionalShadows=M,D.numPointShadows=S,D.numSpotShadows=T,D.numSpotMaps=A,D.numLightProbes=C,i.version=Lp++)}function l(c,u){let d=0,f=0,p=0,x=0,v=0;const m=u.matrixWorldInverse;for(let h=0,M=c.length;h<M;h++){const S=c[h];if(S.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),d++}else if(S.isSpotLight){const T=i.spot[p];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const T=i.rectArea[x];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){const T=i.point[f];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const T=i.hemi[v];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function Ro(n){const e=new Np(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Fp(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Ro(n),e.set(s,[o])):r>=a.length?(o=new Ro(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Op=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zp(n,e,t){let i=new aa;const s=new Ne,r=new Ne,a=new Ze,o=new ah({depthPacking:nl}),l=new oh,c={},u=t.maxTextureSize,d={[_i]:wt,[wt]:_i,[si]:si},f=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:Op,fragmentShader:Bp}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const x=new gt;x.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Kt(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Po;let h=this.type;this.render=function(E,C,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const y=n.getRenderTarget(),_=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),F=n.state;F.setBlending(ai),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=h!==ni&&this.type===ni,G=h===ni&&this.type!==ni;for(let X=0,W=E.length;X<W;X++){const ie=E[X],H=ie.shadow;if(H===void 0){Ce("WebGLShadowMap:",ie,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const te=H.getFrameExtents();if(s.multiply(te),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,H.mapSize.y=r.y)),H.map===null||B===!0||G===!0){const be=this.type!==ni?{minFilter:Dt,magFilter:Dt}:{};H.map!==null&&H.map.dispose(),H.map=new Di(s.x,s.y,be),H.map.texture.name=ie.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const re=H.getViewportCount();for(let be=0;be<re;be++){const Ge=H.getViewport(be);a.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),F.viewport(a),H.updateMatrices(ie,be),i=H.getFrustum(),T(C,D,H.camera,ie,this.type)}H.isPointLightShadow!==!0&&this.type===ni&&M(H,D),H.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(y,_,I)};function M(E,C){const D=e.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Di(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,D,f,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,D,p,v,null)}function S(E,C,D,y){let _=null;const I=D.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)_=I;else if(_=D.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=_.uuid,B=C.uuid;let G=c[F];G===void 0&&(G={},c[F]=G);let X=G[B];X===void 0&&(X=_.clone(),G[B]=X,C.addEventListener("dispose",A)),_=X}if(_.visible=C.visible,_.wireframe=C.wireframe,y===ni?_.side=C.shadowSide!==null?C.shadowSide:C.side:_.side=C.shadowSide!==null?C.shadowSide:d[C.side],_.alphaMap=C.alphaMap,_.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,_.map=C.map,_.clipShadows=C.clipShadows,_.clippingPlanes=C.clippingPlanes,_.clipIntersection=C.clipIntersection,_.displacementMap=C.displacementMap,_.displacementScale=C.displacementScale,_.displacementBias=C.displacementBias,_.wireframeLinewidth=C.wireframeLinewidth,_.linewidth=C.linewidth,D.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const F=n.properties.get(_);F.light=D}return _}function T(E,C,D,y,_){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&_===ni)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,E.matrixWorld);const B=e.update(E),G=E.material;if(Array.isArray(G)){const X=B.groups;for(let W=0,ie=X.length;W<ie;W++){const H=X[W],te=G[H.materialIndex];if(te&&te.visible){const re=S(E,te,y,_);E.onBeforeShadow(n,E,C,D,B,re,H),n.renderBufferDirect(D,null,B,re,E,H),E.onAfterShadow(n,E,C,D,B,re,H)}}}else if(G.visible){const X=S(E,G,y,_);E.onBeforeShadow(n,E,C,D,B,X,null),n.renderBufferDirect(D,null,B,X,E,null),E.onAfterShadow(n,E,C,D,B,X,null)}}const F=E.children;for(let B=0,G=F.length;B<G;B++)T(F[B],C,D,y,_)}function A(E){E.target.removeEventListener("dispose",A);for(const D in c){const y=c[D],_=E.target.uuid;_ in y&&(y[_].dispose(),delete y[_])}}}const Vp={[ar]:or,[cr]:dr,[lr]:ur,[en]:hr,[or]:ar,[dr]:cr,[ur]:lr,[hr]:en};function kp(n,e){function t(){let P=!1;const ce=new Ze;let ne=null;const se=new Ze(0,0,0,0);return{setMask:function(J){ne!==J&&!P&&(n.colorMask(J,J,J,J),ne=J)},setLocked:function(J){P=J},setClear:function(J,j,fe,Pe,nt){nt===!0&&(J*=Pe,j*=Pe,fe*=Pe),ce.set(J,j,fe,Pe),se.equals(ce)===!1&&(n.clearColor(J,j,fe,Pe),se.copy(ce))},reset:function(){P=!1,ne=null,se.set(-1,0,0,0)}}}function i(){let P=!1,ce=!1,ne=null,se=null,J=null;return{setReversed:function(j){if(ce!==j){const fe=e.get("EXT_clip_control");j?fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.ZERO_TO_ONE_EXT):fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.NEGATIVE_ONE_TO_ONE_EXT),ce=j;const Pe=J;J=null,this.setClear(Pe)}},getReversed:function(){return ce},setTest:function(j){j?K(n.DEPTH_TEST):ue(n.DEPTH_TEST)},setMask:function(j){ne!==j&&!P&&(n.depthMask(j),ne=j)},setFunc:function(j){if(ce&&(j=Vp[j]),se!==j){switch(j){case ar:n.depthFunc(n.NEVER);break;case or:n.depthFunc(n.ALWAYS);break;case cr:n.depthFunc(n.LESS);break;case en:n.depthFunc(n.LEQUAL);break;case lr:n.depthFunc(n.EQUAL);break;case hr:n.depthFunc(n.GEQUAL);break;case dr:n.depthFunc(n.GREATER);break;case ur:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}se=j}},setLocked:function(j){P=j},setClear:function(j){J!==j&&(ce&&(j=1-j),n.clearDepth(j),J=j)},reset:function(){P=!1,ne=null,se=null,J=null,ce=!1}}}function s(){let P=!1,ce=null,ne=null,se=null,J=null,j=null,fe=null,Pe=null,nt=null;return{setTest:function(je){P||(je?K(n.STENCIL_TEST):ue(n.STENCIL_TEST))},setMask:function(je){ce!==je&&!P&&(n.stencilMask(je),ce=je)},setFunc:function(je,Wt,Bt){(ne!==je||se!==Wt||J!==Bt)&&(n.stencilFunc(je,Wt,Bt),ne=je,se=Wt,J=Bt)},setOp:function(je,Wt,Bt){(j!==je||fe!==Wt||Pe!==Bt)&&(n.stencilOp(je,Wt,Bt),j=je,fe=Wt,Pe=Bt)},setLocked:function(je){P=je},setClear:function(je){nt!==je&&(n.clearStencil(je),nt=je)},reset:function(){P=!1,ce=null,ne=null,se=null,J=null,j=null,fe=null,Pe=null,nt=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,p=[],x=null,v=!1,m=null,h=null,M=null,S=null,T=null,A=null,E=null,C=new He(0,0,0),D=0,y=!1,_=null,I=null,F=null,B=null,G=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ie=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=ie>=1):H.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=ie>=2);let te=null,re={};const be=n.getParameter(n.SCISSOR_BOX),Ge=n.getParameter(n.VIEWPORT),Ye=new Ze().fromArray(be),et=new Ze().fromArray(Ge);function tt(P,ce,ne,se){const J=new Uint8Array(4),j=n.createTexture();n.bindTexture(P,j),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let fe=0;fe<ne;fe++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,se,0,n.RGBA,n.UNSIGNED_BYTE,J):n.texImage2D(ce+fe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,J);return j}const Y={};Y[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(n.DEPTH_TEST),a.setFunc(en),Be(!1),ze(ya),K(n.CULL_FACE),st(ai);function K(P){u[P]!==!0&&(n.enable(P),u[P]=!0)}function ue(P){u[P]!==!1&&(n.disable(P),u[P]=!1)}function De(P,ce){return d[P]!==ce?(n.bindFramebuffer(P,ce),d[P]=ce,P===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ce),P===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function _e(P,ce){let ne=p,se=!1;if(P){ne=f.get(ce),ne===void 0&&(ne=[],f.set(ce,ne));const J=P.textures;if(ne.length!==J.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let j=0,fe=J.length;j<fe;j++)ne[j]=n.COLOR_ATTACHMENT0+j;ne.length=J.length,se=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,se=!0);se&&n.drawBuffers(ne)}function Oe(P){return x!==P?(n.useProgram(P),x=P,!0):!1}const xt={[Ri]:n.FUNC_ADD,[Cc]:n.FUNC_SUBTRACT,[Pc]:n.FUNC_REVERSE_SUBTRACT};xt[Ic]=n.MIN,xt[Dc]=n.MAX;const Fe={[Lc]:n.ZERO,[Uc]:n.ONE,[Nc]:n.SRC_COLOR,[sr]:n.SRC_ALPHA,[kc]:n.SRC_ALPHA_SATURATE,[zc]:n.DST_COLOR,[Oc]:n.DST_ALPHA,[Fc]:n.ONE_MINUS_SRC_COLOR,[rr]:n.ONE_MINUS_SRC_ALPHA,[Vc]:n.ONE_MINUS_DST_COLOR,[Bc]:n.ONE_MINUS_DST_ALPHA,[Gc]:n.CONSTANT_COLOR,[Hc]:n.ONE_MINUS_CONSTANT_COLOR,[Wc]:n.CONSTANT_ALPHA,[qc]:n.ONE_MINUS_CONSTANT_ALPHA};function st(P,ce,ne,se,J,j,fe,Pe,nt,je){if(P===ai){v===!0&&(ue(n.BLEND),v=!1);return}if(v===!1&&(K(n.BLEND),v=!0),P!==Rc){if(P!==m||je!==y){if((h!==Ri||T!==Ri)&&(n.blendEquation(n.FUNC_ADD),h=Ri,T=Ri),je)switch(P){case Zi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ba:n.blendFunc(n.ONE,n.ONE);break;case Ma:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sa:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ht("WebGLState: Invalid blending: ",P);break}else switch(P){case Zi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ba:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ma:ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sa:ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ht("WebGLState: Invalid blending: ",P);break}M=null,S=null,A=null,E=null,C.set(0,0,0),D=0,m=P,y=je}return}J=J||ce,j=j||ne,fe=fe||se,(ce!==h||J!==T)&&(n.blendEquationSeparate(xt[ce],xt[J]),h=ce,T=J),(ne!==M||se!==S||j!==A||fe!==E)&&(n.blendFuncSeparate(Fe[ne],Fe[se],Fe[j],Fe[fe]),M=ne,S=se,A=j,E=fe),(Pe.equals(C)===!1||nt!==D)&&(n.blendColor(Pe.r,Pe.g,Pe.b,nt),C.copy(Pe),D=nt),m=P,y=!1}function R(P,ce){P.side===si?ue(n.CULL_FACE):K(n.CULL_FACE);let ne=P.side===wt;ce&&(ne=!ne),Be(ne),P.blending===Zi&&P.transparent===!1?st(ai):st(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const se=P.stencilWrite;o.setTest(se),se&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),me(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(P){_!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),_=P)}function ze(P){P!==Tc?(K(n.CULL_FACE),P!==I&&(P===ya?n.cullFace(n.BACK):P===wc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ue(n.CULL_FACE),I=P}function it(P){P!==F&&(W&&n.lineWidth(P),F=P)}function me(P,ce,ne){P?(K(n.POLYGON_OFFSET_FILL),(B!==ce||G!==ne)&&(n.polygonOffset(ce,ne),B=ce,G=ne)):ue(n.POLYGON_OFFSET_FILL)}function rt(P){P?K(n.SCISSOR_TEST):ue(n.SCISSOR_TEST)}function ye(P){P===void 0&&(P=n.TEXTURE0+X-1),te!==P&&(n.activeTexture(P),te=P)}function Ie(P,ce,ne){ne===void 0&&(te===null?ne=n.TEXTURE0+X-1:ne=te);let se=re[ne];se===void 0&&(se={type:void 0,texture:void 0},re[ne]=se),(se.type!==P||se.texture!==ce)&&(te!==ne&&(n.activeTexture(ne),te=ne),n.bindTexture(P,ce||Y[P]),se.type=P,se.texture=ce)}function w(){const P=re[te];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function g(){try{n.compressedTexImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function q(){try{n.texSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function $(){try{n.texSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function k(){try{n.compressedTexSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function ge(){try{n.compressedTexSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function oe(){try{n.texStorage2D(...arguments)}catch(P){P("WebGLState:",P)}}function Me(){try{n.texStorage3D(...arguments)}catch(P){P("WebGLState:",P)}}function xe(){try{n.texImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function Z(){try{n.texImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function ee(P){Ye.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),Ye.copy(P))}function we(P){et.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),et.copy(P))}function Ee(P,ce){let ne=c.get(ce);ne===void 0&&(ne=new WeakMap,c.set(ce,ne));let se=ne.get(P);se===void 0&&(se=n.getUniformBlockIndex(ce,P.name),ne.set(P,se))}function he(P,ce){const se=c.get(ce).get(P);l.get(ce)!==se&&(n.uniformBlockBinding(ce,se,P.__bindingPointIndex),l.set(ce,se))}function Re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},te=null,re={},d={},f=new WeakMap,p=[],x=null,v=!1,m=null,h=null,M=null,S=null,T=null,A=null,E=null,C=new He(0,0,0),D=0,y=!1,_=null,I=null,F=null,B=null,G=null,Ye.set(0,0,n.canvas.width,n.canvas.height),et.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:ue,bindFramebuffer:De,drawBuffers:_e,useProgram:Oe,setBlending:st,setMaterial:R,setFlipSided:Be,setCullFace:ze,setLineWidth:it,setPolygonOffset:me,setScissorTest:rt,activeTexture:ye,bindTexture:Ie,unbindTexture:w,compressedTexImage2D:g,compressedTexImage3D:O,texImage2D:xe,texImage3D:Z,updateUBOMapping:Ee,uniformBlockBinding:he,texStorage2D:oe,texStorage3D:Me,texSubImage2D:q,texSubImage3D:$,compressedTexSubImage2D:k,compressedTexSubImage3D:ge,scissor:ee,viewport:we,reset:Re}}function Gp(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ne,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,g){return p?new OffscreenCanvas(w,g):ps("canvas")}function v(w,g,O){let q=1;const $=Ie(w);if(($.width>O||$.height>O)&&(q=O/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const k=Math.floor(q*$.width),ge=Math.floor(q*$.height);d===void 0&&(d=x(k,ge));const oe=g?x(k,ge):d;return oe.width=k,oe.height=ge,oe.getContext("2d").drawImage(w,0,0,k,ge),Ce("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+k+"x"+ge+")."),oe}else return"data"in w&&Ce("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),w;return w}function m(w){return w.generateMipmaps}function h(w){n.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,g,O,q,$=!1){if(w!==null){if(n[w]!==void 0)return n[w];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let k=g;if(g===n.RED&&(O===n.FLOAT&&(k=n.R32F),O===n.HALF_FLOAT&&(k=n.R16F),O===n.UNSIGNED_BYTE&&(k=n.R8)),g===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(k=n.R8UI),O===n.UNSIGNED_SHORT&&(k=n.R16UI),O===n.UNSIGNED_INT&&(k=n.R32UI),O===n.BYTE&&(k=n.R8I),O===n.SHORT&&(k=n.R16I),O===n.INT&&(k=n.R32I)),g===n.RG&&(O===n.FLOAT&&(k=n.RG32F),O===n.HALF_FLOAT&&(k=n.RG16F),O===n.UNSIGNED_BYTE&&(k=n.RG8)),g===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(k=n.RG8UI),O===n.UNSIGNED_SHORT&&(k=n.RG16UI),O===n.UNSIGNED_INT&&(k=n.RG32UI),O===n.BYTE&&(k=n.RG8I),O===n.SHORT&&(k=n.RG16I),O===n.INT&&(k=n.RG32I)),g===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(k=n.RGB8UI),O===n.UNSIGNED_SHORT&&(k=n.RGB16UI),O===n.UNSIGNED_INT&&(k=n.RGB32UI),O===n.BYTE&&(k=n.RGB8I),O===n.SHORT&&(k=n.RGB16I),O===n.INT&&(k=n.RGB32I)),g===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(k=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(k=n.RGBA16UI),O===n.UNSIGNED_INT&&(k=n.RGBA32UI),O===n.BYTE&&(k=n.RGBA8I),O===n.SHORT&&(k=n.RGBA16I),O===n.INT&&(k=n.RGBA32I)),g===n.RGB&&(O===n.UNSIGNED_INT_5_9_9_9_REV&&(k=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(k=n.R11F_G11F_B10F)),g===n.RGBA){const ge=$?us:qe.getTransfer(q);O===n.FLOAT&&(k=n.RGBA32F),O===n.HALF_FLOAT&&(k=n.RGBA16F),O===n.UNSIGNED_BYTE&&(k=ge===Ke?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(k=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(k=n.RGB5_A1)}return(k===n.R16F||k===n.R32F||k===n.RG16F||k===n.RG32F||k===n.RGBA16F||k===n.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function T(w,g){let O;return w?g===null||g===Ii||g===wn?O=n.DEPTH24_STENCIL8:g===Xt?O=n.DEPTH32F_STENCIL8:g===Tn&&(O=n.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Ii||g===wn?O=n.DEPTH_COMPONENT24:g===Xt?O=n.DEPTH_COMPONENT32F:g===Tn&&(O=n.DEPTH_COMPONENT16),O}function A(w,g){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Dt&&w.minFilter!==Ot?Math.log2(Math.max(g.width,g.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?g.mipmaps.length:1}function E(w){const g=w.target;g.removeEventListener("dispose",E),D(g),g.isVideoTexture&&u.delete(g)}function C(w){const g=w.target;g.removeEventListener("dispose",C),_(g)}function D(w){const g=i.get(w);if(g.__webglInit===void 0)return;const O=w.source,q=f.get(O);if(q){const $=q[g.__cacheKey];$.usedTimes--,$.usedTimes===0&&y(w),Object.keys(q).length===0&&f.delete(O)}i.remove(w)}function y(w){const g=i.get(w);n.deleteTexture(g.__webglTexture);const O=w.source,q=f.get(O);delete q[g.__cacheKey],a.memory.textures--}function _(w){const g=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(g.__webglFramebuffer[q]))for(let $=0;$<g.__webglFramebuffer[q].length;$++)n.deleteFramebuffer(g.__webglFramebuffer[q][$]);else n.deleteFramebuffer(g.__webglFramebuffer[q]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[q])}else{if(Array.isArray(g.__webglFramebuffer))for(let q=0;q<g.__webglFramebuffer.length;q++)n.deleteFramebuffer(g.__webglFramebuffer[q]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let q=0;q<g.__webglColorRenderbuffer.length;q++)g.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[q]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const O=w.textures;for(let q=0,$=O.length;q<$;q++){const k=i.get(O[q]);k.__webglTexture&&(n.deleteTexture(k.__webglTexture),a.memory.textures--),i.remove(O[q])}i.remove(w)}let I=0;function F(){I=0}function B(){const w=I;return w>=s.maxTextures&&Ce("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),I+=1,w}function G(w){const g=[];return g.push(w.wrapS),g.push(w.wrapT),g.push(w.wrapR||0),g.push(w.magFilter),g.push(w.minFilter),g.push(w.anisotropy),g.push(w.internalFormat),g.push(w.format),g.push(w.type),g.push(w.generateMipmaps),g.push(w.premultiplyAlpha),g.push(w.flipY),g.push(w.unpackAlignment),g.push(w.colorSpace),g.join()}function X(w,g){const O=i.get(w);if(w.isVideoTexture&&rt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){const q=w.image;if(q===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,w,g);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+g)}function W(w,g){const O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Y(O,w,g);return}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+g)}function ie(w,g){const O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Y(O,w,g);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+g)}function H(w,g){const O=i.get(w);if(w.version>0&&O.__version!==w.version){K(O,w,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+g)}const te={[mr]:n.REPEAT,[ri]:n.CLAMP_TO_EDGE,[xr]:n.MIRRORED_REPEAT},re={[Dt]:n.NEAREST,[tl]:n.NEAREST_MIPMAP_NEAREST,[Un]:n.NEAREST_MIPMAP_LINEAR,[Ot]:n.LINEAR,[ws]:n.LINEAR_MIPMAP_NEAREST,[Pi]:n.LINEAR_MIPMAP_LINEAR},be={[rl]:n.NEVER,[dl]:n.ALWAYS,[al]:n.LESS,[Vo]:n.LEQUAL,[ol]:n.EQUAL,[hl]:n.GEQUAL,[cl]:n.GREATER,[ll]:n.NOTEQUAL};function Ge(w,g){if(g.type===Xt&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Ot||g.magFilter===ws||g.magFilter===Un||g.magFilter===Pi||g.minFilter===Ot||g.minFilter===ws||g.minFilter===Un||g.minFilter===Pi)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,te[g.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,te[g.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,te[g.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,re[g.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,re[g.minFilter]),g.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,be[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Dt||g.minFilter!==Un&&g.minFilter!==Pi||g.type===Xt&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Ye(w,g){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,g.addEventListener("dispose",E));const q=g.source;let $=f.get(q);$===void 0&&($={},f.set(q,$));const k=G(g);if(k!==w.__cacheKey){$[k]===void 0&&($[k]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),$[k].usedTimes++;const ge=$[w.__cacheKey];ge!==void 0&&($[w.__cacheKey].usedTimes--,ge.usedTimes===0&&y(g)),w.__cacheKey=k,w.__webglTexture=$[k].texture}return O}function et(w,g,O){return Math.floor(Math.floor(w/O)/g)}function tt(w,g,O,q){const k=w.updateRanges;if(k.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,O,q,g.data);else{k.sort((Z,ee)=>Z.start-ee.start);let ge=0;for(let Z=1;Z<k.length;Z++){const ee=k[ge],we=k[Z],Ee=ee.start+ee.count,he=et(we.start,g.width,4),Re=et(ee.start,g.width,4);we.start<=Ee+1&&he===Re&&et(we.start+we.count-1,g.width,4)===he?ee.count=Math.max(ee.count,we.start+we.count-ee.start):(++ge,k[ge]=we)}k.length=ge+1;const oe=n.getParameter(n.UNPACK_ROW_LENGTH),Me=n.getParameter(n.UNPACK_SKIP_PIXELS),xe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let Z=0,ee=k.length;Z<ee;Z++){const we=k[Z],Ee=Math.floor(we.start/4),he=Math.ceil(we.count/4),Re=Ee%g.width,P=Math.floor(Ee/g.width),ce=he,ne=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Re),n.pixelStorei(n.UNPACK_SKIP_ROWS,P),t.texSubImage2D(n.TEXTURE_2D,0,Re,P,ce,ne,O,q,g.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,oe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Me),n.pixelStorei(n.UNPACK_SKIP_ROWS,xe)}}function Y(w,g,O){let q=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(q=n.TEXTURE_3D);const $=Ye(w,g),k=g.source;t.bindTexture(q,w.__webglTexture,n.TEXTURE0+O);const ge=i.get(k);if(k.version!==ge.__version||$===!0){t.activeTexture(n.TEXTURE0+O);const oe=qe.getPrimaries(qe.workingColorSpace),Me=g.colorSpace===mi?null:qe.getPrimaries(g.colorSpace),xe=g.colorSpace===mi||oe===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let Z=v(g.image,!1,s.maxTextureSize);Z=ye(g,Z);const ee=r.convert(g.format,g.colorSpace),we=r.convert(g.type);let Ee=S(g.internalFormat,ee,we,g.colorSpace,g.isVideoTexture);Ge(q,g);let he;const Re=g.mipmaps,P=g.isVideoTexture!==!0,ce=ge.__version===void 0||$===!0,ne=k.dataReady,se=A(g,Z);if(g.isDepthTexture)Ee=T(g.format===Rn,g.type),ce&&(P?t.texStorage2D(n.TEXTURE_2D,1,Ee,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,Ee,Z.width,Z.height,0,ee,we,null));else if(g.isDataTexture)if(Re.length>0){P&&ce&&t.texStorage2D(n.TEXTURE_2D,se,Ee,Re[0].width,Re[0].height);for(let J=0,j=Re.length;J<j;J++)he=Re[J],P?ne&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,he.width,he.height,ee,we,he.data):t.texImage2D(n.TEXTURE_2D,J,Ee,he.width,he.height,0,ee,we,he.data);g.generateMipmaps=!1}else P?(ce&&t.texStorage2D(n.TEXTURE_2D,se,Ee,Z.width,Z.height),ne&&tt(g,Z,ee,we)):t.texImage2D(n.TEXTURE_2D,0,Ee,Z.width,Z.height,0,ee,we,Z.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){P&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Ee,Re[0].width,Re[0].height,Z.depth);for(let J=0,j=Re.length;J<j;J++)if(he=Re[J],g.format!==Gt)if(ee!==null)if(P){if(ne)if(g.layerUpdates.size>0){const fe=so(he.width,he.height,g.format,g.type);for(const Pe of g.layerUpdates){const nt=he.data.subarray(Pe*fe/he.data.BYTES_PER_ELEMENT,(Pe+1)*fe/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,Pe,he.width,he.height,1,ee,nt)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,Z.depth,ee,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,Ee,he.width,he.height,Z.depth,0,he.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?ne&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,Z.depth,ee,we,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,Ee,he.width,he.height,Z.depth,0,ee,we,he.data)}else{P&&ce&&t.texStorage2D(n.TEXTURE_2D,se,Ee,Re[0].width,Re[0].height);for(let J=0,j=Re.length;J<j;J++)he=Re[J],g.format!==Gt?ee!==null?P?ne&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,he.width,he.height,ee,he.data):t.compressedTexImage2D(n.TEXTURE_2D,J,Ee,he.width,he.height,0,he.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?ne&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,he.width,he.height,ee,we,he.data):t.texImage2D(n.TEXTURE_2D,J,Ee,he.width,he.height,0,ee,we,he.data)}else if(g.isDataArrayTexture)if(P){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Ee,Z.width,Z.height,Z.depth),ne)if(g.layerUpdates.size>0){const J=so(Z.width,Z.height,g.format,g.type);for(const j of g.layerUpdates){const fe=Z.data.subarray(j*J/Z.data.BYTES_PER_ELEMENT,(j+1)*J/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,Z.width,Z.height,1,ee,we,fe)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ee,we,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,Z.width,Z.height,Z.depth,0,ee,we,Z.data);else if(g.isData3DTexture)P?(ce&&t.texStorage3D(n.TEXTURE_3D,se,Ee,Z.width,Z.height,Z.depth),ne&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ee,we,Z.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,Z.width,Z.height,Z.depth,0,ee,we,Z.data);else if(g.isFramebufferTexture){if(ce)if(P)t.texStorage2D(n.TEXTURE_2D,se,Ee,Z.width,Z.height);else{let J=Z.width,j=Z.height;for(let fe=0;fe<se;fe++)t.texImage2D(n.TEXTURE_2D,fe,Ee,J,j,0,ee,we,null),J>>=1,j>>=1}}else if(Re.length>0){if(P&&ce){const J=Ie(Re[0]);t.texStorage2D(n.TEXTURE_2D,se,Ee,J.width,J.height)}for(let J=0,j=Re.length;J<j;J++)he=Re[J],P?ne&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ee,we,he):t.texImage2D(n.TEXTURE_2D,J,Ee,ee,we,he);g.generateMipmaps=!1}else if(P){if(ce){const J=Ie(Z);t.texStorage2D(n.TEXTURE_2D,se,Ee,J.width,J.height)}ne&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee,we,Z)}else t.texImage2D(n.TEXTURE_2D,0,Ee,ee,we,Z);m(g)&&h(q),ge.__version=k.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function K(w,g,O){if(g.image.length!==6)return;const q=Ye(w,g),$=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+O);const k=i.get($);if($.version!==k.__version||q===!0){t.activeTexture(n.TEXTURE0+O);const ge=qe.getPrimaries(qe.workingColorSpace),oe=g.colorSpace===mi?null:qe.getPrimaries(g.colorSpace),Me=g.colorSpace===mi||ge===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const xe=g.isCompressedTexture||g.image[0].isCompressedTexture,Z=g.image[0]&&g.image[0].isDataTexture,ee=[];for(let j=0;j<6;j++)!xe&&!Z?ee[j]=v(g.image[j],!0,s.maxCubemapSize):ee[j]=Z?g.image[j].image:g.image[j],ee[j]=ye(g,ee[j]);const we=ee[0],Ee=r.convert(g.format,g.colorSpace),he=r.convert(g.type),Re=S(g.internalFormat,Ee,he,g.colorSpace),P=g.isVideoTexture!==!0,ce=k.__version===void 0||q===!0,ne=$.dataReady;let se=A(g,we);Ge(n.TEXTURE_CUBE_MAP,g);let J;if(xe){P&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,se,Re,we.width,we.height);for(let j=0;j<6;j++){J=ee[j].mipmaps;for(let fe=0;fe<J.length;fe++){const Pe=J[fe];g.format!==Gt?Ee!==null?P?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,0,0,Pe.width,Pe.height,Ee,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,Re,Pe.width,Pe.height,0,Pe.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,0,0,Pe.width,Pe.height,Ee,he,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,Re,Pe.width,Pe.height,0,Ee,he,Pe.data)}}}else{if(J=g.mipmaps,P&&ce){J.length>0&&se++;const j=Ie(ee[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,se,Re,j.width,j.height)}for(let j=0;j<6;j++)if(Z){P?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ee[j].width,ee[j].height,Ee,he,ee[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Re,ee[j].width,ee[j].height,0,Ee,he,ee[j].data);for(let fe=0;fe<J.length;fe++){const nt=J[fe].image[j].image;P?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,0,0,nt.width,nt.height,Ee,he,nt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,Re,nt.width,nt.height,0,Ee,he,nt.data)}}else{P?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ee,he,ee[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Re,Ee,he,ee[j]);for(let fe=0;fe<J.length;fe++){const Pe=J[fe];P?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,0,0,Ee,he,Pe.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,Re,Ee,he,Pe.image[j])}}}m(g)&&h(n.TEXTURE_CUBE_MAP),k.__version=$.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function ue(w,g,O,q,$,k){const ge=r.convert(O.format,O.colorSpace),oe=r.convert(O.type),Me=S(O.internalFormat,ge,oe,O.colorSpace),xe=i.get(g),Z=i.get(O);if(Z.__renderTarget=g,!xe.__hasExternalTextures){const ee=Math.max(1,g.width>>k),we=Math.max(1,g.height>>k);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,k,Me,ee,we,g.depth,0,ge,oe,null):t.texImage2D($,k,Me,ee,we,0,ge,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),me(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,$,Z.__webglTexture,0,it(g)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,$,Z.__webglTexture,k),t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(w,g,O){if(n.bindRenderbuffer(n.RENDERBUFFER,w),g.depthBuffer){const q=g.depthTexture,$=q&&q.isDepthTexture?q.type:null,k=T(g.stencilBuffer,$),ge=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=it(g);me(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,k,g.width,g.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,k,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,k,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ge,n.RENDERBUFFER,w)}else{const q=g.textures;for(let $=0;$<q.length;$++){const k=q[$],ge=r.convert(k.format,k.colorSpace),oe=r.convert(k.type),Me=S(k.internalFormat,ge,oe,k.colorSpace),xe=it(g);O&&me(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,Me,g.width,g.height):me(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe,Me,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,Me,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function _e(w,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(g.depthTexture);q.__renderTarget=g,(!q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),X(g.depthTexture,0);const $=q.__webglTexture,k=it(g);if(g.depthTexture.format===An)me(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,k):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(g.depthTexture.format===Rn)me(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,k):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Oe(w){const g=i.get(w),O=w.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==w.depthTexture){const q=w.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),q){const $=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),g.__depthDisposeCallback=$}g.__boundDepthTexture=q}if(w.depthTexture&&!g.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const q=w.texture.mipmaps;q&&q.length>0?_e(g.__webglFramebuffer[0],w):_e(g.__webglFramebuffer,w)}else if(O){g.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[q]),g.__webglDepthbuffer[q]===void 0)g.__webglDepthbuffer[q]=n.createRenderbuffer(),De(g.__webglDepthbuffer[q],w,!1);else{const $=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=g.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,k),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,k)}}else{const q=w.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),De(g.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,k),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,k)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function xt(w,g,O){const q=i.get(w);g!==void 0&&ue(q.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Oe(w)}function Fe(w){const g=w.texture,O=i.get(w),q=i.get(g);w.addEventListener("dispose",C);const $=w.textures,k=w.isWebGLCubeRenderTarget===!0,ge=$.length>1;if(ge||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=g.version,a.memory.textures++),k){O.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer[oe]=[];for(let Me=0;Me<g.mipmaps.length;Me++)O.__webglFramebuffer[oe][Me]=n.createFramebuffer()}else O.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer=[];for(let oe=0;oe<g.mipmaps.length;oe++)O.__webglFramebuffer[oe]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ge)for(let oe=0,Me=$.length;oe<Me;oe++){const xe=i.get($[oe]);xe.__webglTexture===void 0&&(xe.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&me(w)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let oe=0;oe<$.length;oe++){const Me=$[oe];O.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[oe]);const xe=r.convert(Me.format,Me.colorSpace),Z=r.convert(Me.type),ee=S(Me.internalFormat,xe,Z,Me.colorSpace,w.isXRRenderTarget===!0),we=it(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,ee,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,O.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),De(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(k){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Ge(n.TEXTURE_CUBE_MAP,g);for(let oe=0;oe<6;oe++)if(g.mipmaps&&g.mipmaps.length>0)for(let Me=0;Me<g.mipmaps.length;Me++)ue(O.__webglFramebuffer[oe][Me],w,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Me);else ue(O.__webglFramebuffer[oe],w,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(g)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let oe=0,Me=$.length;oe<Me;oe++){const xe=$[oe],Z=i.get(xe);let ee=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ee=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ee,Z.__webglTexture),Ge(ee,xe),ue(O.__webglFramebuffer,w,xe,n.COLOR_ATTACHMENT0+oe,ee,0),m(xe)&&h(ee)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(oe=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,q.__webglTexture),Ge(oe,g),g.mipmaps&&g.mipmaps.length>0)for(let Me=0;Me<g.mipmaps.length;Me++)ue(O.__webglFramebuffer[Me],w,g,n.COLOR_ATTACHMENT0,oe,Me);else ue(O.__webglFramebuffer,w,g,n.COLOR_ATTACHMENT0,oe,0);m(g)&&h(oe),t.unbindTexture()}w.depthBuffer&&Oe(w)}function st(w){const g=w.textures;for(let O=0,q=g.length;O<q;O++){const $=g[O];if(m($)){const k=M(w),ge=i.get($).__webglTexture;t.bindTexture(k,ge),h(k),t.unbindTexture()}}}const R=[],Be=[];function ze(w){if(w.samples>0){if(me(w)===!1){const g=w.textures,O=w.width,q=w.height;let $=n.COLOR_BUFFER_BIT;const k=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(w),oe=g.length>1;if(oe)for(let xe=0;xe<g.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const Me=w.texture.mipmaps;Me&&Me.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let xe=0;xe<g.length;xe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[xe]);const Z=i.get(g[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Z,0)}n.blitFramebuffer(0,0,O,q,0,0,O,q,$,n.NEAREST),l===!0&&(R.length=0,Be.length=0,R.push(n.COLOR_ATTACHMENT0+xe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(R.push(k),Be.push(k),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Be)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,R))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let xe=0;xe<g.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,ge.__webglColorRenderbuffer[xe]);const Z=i.get(g[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,Z,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const g=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function it(w){return Math.min(s.maxSamples,w.samples)}function me(w){const g=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function rt(w){const g=a.render.frame;u.get(w)!==g&&(u.set(w,g),w.update())}function ye(w,g){const O=w.colorSpace,q=w.format,$=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==sn&&O!==mi&&(qe.getTransfer(O)===Ke?(q!==Gt||$!==jt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ht("WebGLTextures: Unsupported texture color space:",O)),g}function Ie(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=ie,this.setTextureCube=H,this.rebindTextures=xt,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=me}function Hp(n,e){function t(i,s=mi){let r;const a=qe.getTransfer(s);if(i===jt)return n.UNSIGNED_BYTE;if(i===$r)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Kr)return n.UNSIGNED_SHORT_5_5_5_1;if(i===No)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fo)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Lo)return n.BYTE;if(i===Uo)return n.SHORT;if(i===Tn)return n.UNSIGNED_SHORT;if(i===jr)return n.INT;if(i===Ii)return n.UNSIGNED_INT;if(i===Xt)return n.FLOAT;if(i===on)return n.HALF_FLOAT;if(i===Oo)return n.ALPHA;if(i===Bo)return n.RGB;if(i===Gt)return n.RGBA;if(i===An)return n.DEPTH_COMPONENT;if(i===Rn)return n.DEPTH_STENCIL;if(i===Zr)return n.RED;if(i===Jr)return n.RED_INTEGER;if(i===Qr)return n.RG;if(i===ea)return n.RG_INTEGER;if(i===ta)return n.RGBA_INTEGER;if(i===os||i===cs||i===ls||i===hs)if(a===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===os)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===os)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===cs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ls)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===gr||i===_r||i===vr||i===yr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===gr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_r)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===br||i===Mr||i===Sr)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===br||i===Mr)return a===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Sr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Er||i===Tr||i===wr||i===Ar||i===Rr||i===Cr||i===Pr||i===Ir||i===Dr||i===Lr||i===Ur||i===Nr||i===Fr||i===Or)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Er)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Tr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ar)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Cr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ir)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Dr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Lr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ur)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Fr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Or)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Br||i===zr||i===Vr)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Br)return a===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===kr||i===Gr||i===Hr||i===Wr)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===kr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Gr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Hr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===wn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Wp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Qo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ci({vertexShader:Wp,fragmentShader:qp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new vs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yp extends cn{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,x=null;const v=typeof XRWebGLBinding<"u",m=new Xp,h={},M=t.getContextAttributes();let S=null,T=null;const A=[],E=[],C=new Ne;let D=null;const y=new It;y.viewport=new Ze;const _=new It;_.viewport=new Ze;const I=[y,_],F=new dh;let B=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let K=A[Y];return K===void 0&&(K=new Ys,A[Y]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Y){let K=A[Y];return K===void 0&&(K=new Ys,A[Y]=K),K.getGripSpace()},this.getHand=function(Y){let K=A[Y];return K===void 0&&(K=new Ys,A[Y]=K),K.getHandSpace()};function X(Y){const K=E.indexOf(Y.inputSource);if(K===-1)return;const ue=A[K];ue!==void 0&&(ue.update(Y.inputSource,Y.frame,c||a),ue.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",ie);for(let Y=0;Y<A.length;Y++){const K=E[Y];K!==null&&(E[Y]=null,A[Y].disconnect(K))}B=null,G=null,m.reset();for(const Y in h)delete h[Y];e.setRenderTarget(S),p=null,f=null,d=null,s=null,T=null,tt.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",W),s.addEventListener("inputsourceschange",ie),M.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,De=null,_e=null;M.depth&&(_e=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=M.stencil?Rn:An,De=M.stencil?wn:Ii);const Oe={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(Oe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new Di(f.textureWidth,f.textureHeight,{format:Gt,type:jt,depthTexture:new Jo(f.textureWidth,f.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ue={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new Di(p.framebufferWidth,p.framebufferHeight,{format:Gt,type:jt,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),tt.setContext(s),tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(Y){for(let K=0;K<Y.removed.length;K++){const ue=Y.removed[K],De=E.indexOf(ue);De>=0&&(E[De]=null,A[De].disconnect(ue))}for(let K=0;K<Y.added.length;K++){const ue=Y.added[K];let De=E.indexOf(ue);if(De===-1){for(let Oe=0;Oe<A.length;Oe++)if(Oe>=E.length){E.push(ue),De=Oe;break}else if(E[Oe]===null){E[Oe]=ue,De=Oe;break}if(De===-1)break}const _e=A[De];_e&&_e.connect(ue)}}const H=new L,te=new L;function re(Y,K,ue){H.setFromMatrixPosition(K.matrixWorld),te.setFromMatrixPosition(ue.matrixWorld);const De=H.distanceTo(te),_e=K.projectionMatrix.elements,Oe=ue.projectionMatrix.elements,xt=_e[14]/(_e[10]-1),Fe=_e[14]/(_e[10]+1),st=(_e[9]+1)/_e[5],R=(_e[9]-1)/_e[5],Be=(_e[8]-1)/_e[0],ze=(Oe[8]+1)/Oe[0],it=xt*Be,me=xt*ze,rt=De/(-Be+ze),ye=rt*-Be;if(K.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ye),Y.translateZ(rt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),_e[10]===-1)Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Ie=xt+rt,w=Fe+rt,g=it-ye,O=me+(De-ye),q=st*Fe/w*Ie,$=R*Fe/w*Ie;Y.projectionMatrix.makePerspective(g,O,q,$,Ie,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function be(Y,K){K===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(K.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let K=Y.near,ue=Y.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),F.near=_.near=y.near=K,F.far=_.far=y.far=ue,(B!==F.near||G!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),B=F.near,G=F.far),F.layers.mask=Y.layers.mask|6,y.layers.mask=F.layers.mask&3,_.layers.mask=F.layers.mask&5;const De=Y.parent,_e=F.cameras;be(F,De);for(let Oe=0;Oe<_e.length;Oe++)be(_e[Oe],De);_e.length===2?re(F,y,_):F.projectionMatrix.copy(y.projectionMatrix),Ge(Y,F,De)};function Ge(Y,K,ue){ue===null?Y.matrix.copy(K.matrixWorld):(Y.matrix.copy(ue.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(K.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=rn*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return h[Y]};let Ye=null;function et(Y,K){if(u=K.getViewerPose(c||a),x=K,u!==null){const ue=u.views;p!==null&&(e.setRenderTargetFramebuffer(T,p.framebuffer),e.setRenderTarget(T));let De=!1;ue.length!==F.cameras.length&&(F.cameras.length=0,De=!0);for(let Fe=0;Fe<ue.length;Fe++){const st=ue[Fe];let R=null;if(p!==null)R=p.getViewport(st);else{const ze=d.getViewSubImage(f,st);R=ze.viewport,Fe===0&&(e.setRenderTargetTextures(T,ze.colorTexture,ze.depthStencilTexture),e.setRenderTarget(T))}let Be=I[Fe];Be===void 0&&(Be=new It,Be.layers.enable(Fe),Be.viewport=new Ze,I[Fe]=Be),Be.matrix.fromArray(st.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(st.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(R.x,R.y,R.width,R.height),Fe===0&&(F.matrix.copy(Be.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),De===!0&&F.cameras.push(Be)}const _e=s.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const Fe=d.getDepthInformation(ue[0]);Fe&&Fe.isValid&&Fe.texture&&m.init(Fe,s.renderState)}if(_e&&_e.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Fe=0;Fe<ue.length;Fe++){const st=ue[Fe].camera;if(st){let R=h[st];R||(R=new Qo,h[st]=R);const Be=d.getCameraImage(st);R.sourceTexture=Be}}}}for(let ue=0;ue<A.length;ue++){const De=E[ue],_e=A[ue];De!==null&&_e!==void 0&&_e.update(De,K,c||a)}Ye&&Ye(Y,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),x=null}const tt=new cc;tt.setAnimationLoop(et),this.setAnimationLoop=function(Y){Ye=Y},this.dispose=function(){}}}const wi=new $t,jp=new Qe;function $p(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Yo(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,M,S,T){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(m,h):h.isMeshToonMaterial?(r(m,h),d(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h)):h.isMeshStandardMaterial?(r(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,T)):h.isMeshMatcapMaterial?(r(m,h),x(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),v(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,M,S):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===wt&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===wt&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const M=e.get(h),S=M.envMap,T=M.envMapRotation;S&&(m.envMap.value=S,wi.copy(T),wi.x*=-1,wi.y*=-1,wi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),m.envMapRotation.value.setFromMatrix4(jp.makeRotationFromEuler(wi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,M,S){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*M,m.scale.value=S*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,M){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===wt&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,h){h.matcap&&(m.matcap.value=h.matcap)}function v(m,h){const M=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Kp(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,S){const T=S.program;i.uniformBlockBinding(M,T)}function c(M,S){let T=s[M.id];T===void 0&&(x(M),T=u(M),s[M.id]=T,M.addEventListener("dispose",m));const A=S.program;i.updateUBOMapping(M,A);const E=e.render.frame;r[M.id]!==E&&(f(M),r[M.id]=E)}function u(M){const S=d();M.__bindingPointIndex=S;const T=n.createBuffer(),A=M.__size,E=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,A,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,T),T}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const S=s[M.id],T=M.uniforms,A=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let E=0,C=T.length;E<C;E++){const D=Array.isArray(T[E])?T[E]:[T[E]];for(let y=0,_=D.length;y<_;y++){const I=D[y];if(p(I,E,y,A)===!0){const F=I.__offset,B=Array.isArray(I.value)?I.value:[I.value];let G=0;for(let X=0;X<B.length;X++){const W=B[X],ie=v(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,F+G,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,G),G+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,S,T,A){const E=M.value,C=S+"_"+T;if(A[C]===void 0)return typeof E=="number"||typeof E=="boolean"?A[C]=E:A[C]=E.clone(),!0;{const D=A[C];if(typeof E=="number"||typeof E=="boolean"){if(D!==E)return A[C]=E,!0}else if(D.equals(E)===!1)return D.copy(E),!0}return!1}function x(M){const S=M.uniforms;let T=0;const A=16;for(let C=0,D=S.length;C<D;C++){const y=Array.isArray(S[C])?S[C]:[S[C]];for(let _=0,I=y.length;_<I;_++){const F=y[_],B=Array.isArray(F.value)?F.value:[F.value];for(let G=0,X=B.length;G<X;G++){const W=B[G],ie=v(W),H=T%A,te=H%ie.boundary,re=H+te;T+=te,re!==0&&A-re<ie.storage&&(T+=A-re),F.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=T,T+=ie.storage}}}const E=T%A;return E>0&&(T+=A-E),M.__size=T,M.__cache={},this}function v(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ce("WebGLRenderer: Unsupported uniform value type.",M),S}function m(M){const S=M.target;S.removeEventListener("dispose",m);const T=a.indexOf(S.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function h(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:h}}const Zp=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let ii=null;function Jp(){return ii===null&&(ii=new Zo(Zp,32,32,Qr,on),ii.minFilter=Ot,ii.magFilter=Ot,ii.wrapS=ri,ii.wrapT=ri,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class fm{constructor(e={}){const{canvas:t=ul(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const x=new Set([ta,ea,Jr]),v=new Set([jt,Ii,Tn,wn,$r,Kr]),m=new Uint32Array(4),h=new Int32Array(4);let M=null,S=null;const T=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let C=!1;this._outputColorSpace=Nt;let D=0,y=0,_=null,I=-1,F=null;const B=new Ze,G=new Ze;let X=null;const W=new He(0);let ie=0,H=t.width,te=t.height,re=1,be=null,Ge=null;const Ye=new Ze(0,0,H,te),et=new Ze(0,0,H,te);let tt=!1;const Y=new aa;let K=!1,ue=!1;const De=new Qe,_e=new L,Oe=new Ze,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function st(){return _===null?re:1}let R=i;function Be(b,U){return t.getContext(b,U)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yr}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",fe,!1),R===null){const U="webgl2";if(R=Be(U,b),R===null)throw Be(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw b("WebGLRenderer: "+b.message),b}let ze,it,me,rt,ye,Ie,w,g,O,q,$,k,ge,oe,Me,xe,Z,ee,we,Ee,he,Re,P,ce;function ne(){ze=new of(R),ze.init(),Re=new Hp(R,ze),it=new Zu(R,ze,e,Re),me=new kp(R,ze),it.reversedDepthBuffer&&f&&me.buffers.depth.setReversed(!0),rt=new hf(R),ye=new Rp,Ie=new Gp(R,ze,me,ye,it,Re,rt),w=new Qu(E),g=new af(E),O=new fh(R),P=new $u(R,O),q=new cf(R,O,rt,P),$=new uf(R,q,O,rt),we=new df(R,it,Ie),xe=new Ju(ye),k=new Ap(E,w,g,ze,it,P,xe),ge=new $p(E,ye),oe=new Pp,Me=new Fp(ze),ee=new ju(E,w,g,me,$,p,l),Z=new zp(E,$,it),ce=new Kp(R,rt,it,me),Ee=new Ku(R,ze,rt),he=new lf(R,ze,rt),rt.programs=k.programs,E.capabilities=it,E.extensions=ze,E.properties=ye,E.renderLists=oe,E.shadowMap=Z,E.state=me,E.info=rt}ne();const se=new Yp(E,R);this.xr=se,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const b=ze.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ze.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(b){b!==void 0&&(re=b,this.setSize(H,te,!1))},this.getSize=function(b){return b.set(H,te)},this.setSize=function(b,U,z=!0){if(se.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}H=b,te=U,t.width=Math.floor(b*re),t.height=Math.floor(U*re),z===!0&&(t.style.width=b+"px",t.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(H*re,te*re).floor()},this.setDrawingBufferSize=function(b,U,z){H=b,te=U,re=z,t.width=Math.floor(b*z),t.height=Math.floor(U*z),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(B)},this.getViewport=function(b){return b.copy(Ye)},this.setViewport=function(b,U,z,V){b.isVector4?Ye.set(b.x,b.y,b.z,b.w):Ye.set(b,U,z,V),me.viewport(B.copy(Ye).multiplyScalar(re).round())},this.getScissor=function(b){return b.copy(et)},this.setScissor=function(b,U,z,V){b.isVector4?et.set(b.x,b.y,b.z,b.w):et.set(b,U,z,V),me.scissor(G.copy(et).multiplyScalar(re).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(b){me.setScissorTest(tt=b)},this.setOpaqueSort=function(b){be=b},this.setTransparentSort=function(b){Ge=b},this.getClearColor=function(b){return b.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor(...arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha(...arguments)},this.clear=function(b=!0,U=!0,z=!0){let V=0;if(b){let N=!1;if(_!==null){const Q=_.texture.format;N=x.has(Q)}if(N){const Q=_.texture.type,le=v.has(Q),pe=ee.getClearColor(),de=ee.getClearAlpha(),Te=pe.r,Ae=pe.g,ve=pe.b;le?(m[0]=Te,m[1]=Ae,m[2]=ve,m[3]=de,R.clearBufferuiv(R.COLOR,0,m)):(h[0]=Te,h[1]=Ae,h[2]=ve,h[3]=de,R.clearBufferiv(R.COLOR,0,h))}else V|=R.COLOR_BUFFER_BIT}U&&(V|=R.DEPTH_BUFFER_BIT),z&&(V|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),ee.dispose(),oe.dispose(),Me.dispose(),ye.dispose(),w.dispose(),g.dispose(),$.dispose(),P.dispose(),ce.dispose(),k.dispose(),se.dispose(),se.removeEventListener("sessionstart",ha),se.removeEventListener("sessionend",da),vi.stop()};function J(b){b.preventDefault(),Ra("WebGLRenderer: Context Lost."),C=!0}function j(){Ra("WebGLRenderer: Context Restored."),C=!1;const b=rt.autoReset,U=Z.enabled,z=Z.autoUpdate,V=Z.needsUpdate,N=Z.type;ne(),rt.autoReset=b,Z.enabled=U,Z.autoUpdate=z,Z.needsUpdate=V,Z.type=N}function fe(b){ht("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Pe(b){const U=b.target;U.removeEventListener("dispose",Pe),nt(U)}function nt(b){je(b),ye.remove(b)}function je(b){const U=ye.get(b).programs;U!==void 0&&(U.forEach(function(z){k.releaseProgram(z)}),b.isShaderMaterial&&k.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,z,V,N,Q){U===null&&(U=xt);const le=N.isMesh&&N.matrixWorld.determinant()<0,pe=pc(b,U,z,V,N);me.setMaterial(V,le);let de=z.index,Te=1;if(V.wireframe===!0){if(de=q.getWireframeAttribute(z),de===void 0)return;Te=2}const Ae=z.drawRange,ve=z.attributes.position;let Ve=Ae.start*Te,$e=(Ae.start+Ae.count)*Te;Q!==null&&(Ve=Math.max(Ve,Q.start*Te),$e=Math.min($e,(Q.start+Q.count)*Te)),de!==null?(Ve=Math.max(Ve,0),$e=Math.min($e,de.count)):ve!=null&&(Ve=Math.max(Ve,0),$e=Math.min($e,ve.count));const ct=$e-Ve;if(ct<0||ct===1/0)return;P.setup(N,V,pe,z,de);let lt,Je=Ee;if(de!==null&&(lt=O.get(de),Je=he,Je.setIndex(lt)),N.isMesh)V.wireframe===!0?(me.setLineWidth(V.wireframeLinewidth*st()),Je.setMode(R.LINES)):Je.setMode(R.TRIANGLES);else if(N.isLine){let Se=V.linewidth;Se===void 0&&(Se=1),me.setLineWidth(Se*st()),N.isLineSegments?Je.setMode(R.LINES):N.isLineLoop?Je.setMode(R.LINE_LOOP):Je.setMode(R.LINE_STRIP)}else N.isPoints?Je.setMode(R.POINTS):N.isSprite&&Je.setMode(R.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Cn("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Je.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))Je.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Se=N._multiDrawStarts,at=N._multiDrawCounts,We=N._multiDrawCount,At=de?O.get(de).bytesPerElement:1,Ui=ye.get(V).currentProgram.getUniforms();for(let Rt=0;Rt<We;Rt++)Ui.setValue(R,"_gl_DrawID",Rt),Je.render(Se[Rt]/At,at[Rt])}else if(N.isInstancedMesh)Je.renderInstances(Ve,ct,N.count);else if(z.isInstancedBufferGeometry){const Se=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,at=Math.min(z.instanceCount,Se);Je.renderInstances(Ve,ct,at)}else Je.render(Ve,ct)};function Wt(b,U,z){b.transparent===!0&&b.side===si&&b.forceSinglePass===!1?(b.side=wt,b.needsUpdate=!0,Ln(b,U,z),b.side=_i,b.needsUpdate=!0,Ln(b,U,z),b.side=si):Ln(b,U,z)}this.compile=function(b,U,z=null){z===null&&(z=b),S=Me.get(z),S.init(U),A.push(S),z.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(S.pushLight(N),N.castShadow&&S.pushShadow(N))}),b!==z&&b.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(S.pushLight(N),N.castShadow&&S.pushShadow(N))}),S.setupLights();const V=new Set;return b.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const Q=N.material;if(Q)if(Array.isArray(Q))for(let le=0;le<Q.length;le++){const pe=Q[le];Wt(pe,z,N),V.add(pe)}else Wt(Q,z,N),V.add(Q)}),S=A.pop(),V},this.compileAsync=function(b,U,z=null){const V=this.compile(b,U,z);return new Promise(N=>{function Q(){if(V.forEach(function(le){ye.get(le).currentProgram.isReady()&&V.delete(le)}),V.size===0){N(b);return}setTimeout(Q,10)}ze.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Bt=null;function fc(b){Bt&&Bt(b)}function ha(){vi.stop()}function da(){vi.start()}const vi=new cc;vi.setAnimationLoop(fc),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(b){Bt=b,se.setAnimationLoop(b),b===null?vi.stop():vi.start()},se.addEventListener("sessionstart",ha),se.addEventListener("sessionend",da),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(U),U=se.getCamera()),b.isScene===!0&&b.onBeforeRender(E,b,U,_),S=Me.get(b,A.length),S.init(U),A.push(S),De.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(De,Yt,U.reversedDepth),ue=this.localClippingEnabled,K=xe.init(this.clippingPlanes,ue),M=oe.get(b,T.length),M.init(),T.push(M),se.enabled===!0&&se.isPresenting===!0){const Q=E.xr.getDepthSensingMesh();Q!==null&&Ss(Q,U,-1/0,E.sortObjects)}Ss(b,U,0,E.sortObjects),M.finish(),E.sortObjects===!0&&M.sort(be,Ge),Fe=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Fe&&ee.addToRenderList(M,b),this.info.render.frame++,K===!0&&xe.beginShadows();const z=S.state.shadowsArray;Z.render(z,b,U),K===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=M.opaque,N=M.transmissive;if(S.setupLights(),U.isArrayCamera){const Q=U.cameras;if(N.length>0)for(let le=0,pe=Q.length;le<pe;le++){const de=Q[le];fa(V,N,b,de)}Fe&&ee.render(b);for(let le=0,pe=Q.length;le<pe;le++){const de=Q[le];ua(M,b,de,de.viewport)}}else N.length>0&&fa(V,N,b,U),Fe&&ee.render(b),ua(M,b,U);_!==null&&y===0&&(Ie.updateMultisampleRenderTarget(_),Ie.updateRenderTargetMipmap(_)),b.isScene===!0&&b.onAfterRender(E,b,U),P.resetDefaultState(),I=-1,F=null,A.pop(),A.length>0?(S=A[A.length-1],K===!0&&xe.setGlobalState(E.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?M=T[T.length-1]:M=null};function Ss(b,U,z,V){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){V&&Oe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(De);const le=$.update(b),pe=b.material;pe.visible&&M.push(b,le,pe,z,Oe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){const le=$.update(b),pe=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Oe.copy(b.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Oe.copy(le.boundingSphere.center)),Oe.applyMatrix4(b.matrixWorld).applyMatrix4(De)),Array.isArray(pe)){const de=le.groups;for(let Te=0,Ae=de.length;Te<Ae;Te++){const ve=de[Te],Ve=pe[ve.materialIndex];Ve&&Ve.visible&&M.push(b,le,Ve,z,Oe.z,ve)}}else pe.visible&&M.push(b,le,pe,z,Oe.z,null)}}const Q=b.children;for(let le=0,pe=Q.length;le<pe;le++)Ss(Q[le],U,z,V)}function ua(b,U,z,V){const{opaque:N,transmissive:Q,transparent:le}=b;S.setupLightsView(z),K===!0&&xe.setGlobalState(E.clippingPlanes,z),V&&me.viewport(B.copy(V)),N.length>0&&Dn(N,U,z),Q.length>0&&Dn(Q,U,z),le.length>0&&Dn(le,U,z),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function fa(b,U,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[V.id]===void 0&&(S.state.transmissionRenderTarget[V.id]=new Di(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?on:jt,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const Q=S.state.transmissionRenderTarget[V.id],le=V.viewport||B;Q.setSize(le.z*E.transmissionResolutionScale,le.w*E.transmissionResolutionScale);const pe=E.getRenderTarget(),de=E.getActiveCubeFace(),Te=E.getActiveMipmapLevel();E.setRenderTarget(Q),E.getClearColor(W),ie=E.getClearAlpha(),ie<1&&E.setClearColor(16777215,.5),E.clear(),Fe&&ee.render(z);const Ae=E.toneMapping;E.toneMapping=gi;const ve=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),S.setupLightsView(V),K===!0&&xe.setGlobalState(E.clippingPlanes,V),Dn(b,z,V),Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let $e=0,ct=U.length;$e<ct;$e++){const lt=U[$e],{object:Je,geometry:Se,material:at,group:We}=lt;if(at.side===si&&Je.layers.test(V.layers)){const At=at.side;at.side=wt,at.needsUpdate=!0,pa(Je,z,V,Se,at,We),at.side=At,at.needsUpdate=!0,Ve=!0}}Ve===!0&&(Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q))}E.setRenderTarget(pe,de,Te),E.setClearColor(W,ie),ve!==void 0&&(V.viewport=ve),E.toneMapping=Ae}function Dn(b,U,z){const V=U.isScene===!0?U.overrideMaterial:null;for(let N=0,Q=b.length;N<Q;N++){const le=b[N],{object:pe,geometry:de,group:Te}=le;let Ae=le.material;Ae.allowOverride===!0&&V!==null&&(Ae=V),pe.layers.test(z.layers)&&pa(pe,U,z,de,Ae,Te)}}function pa(b,U,z,V,N,Q){b.onBeforeRender(E,U,z,V,N,Q),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),N.onBeforeRender(E,U,z,V,b,Q),N.transparent===!0&&N.side===si&&N.forceSinglePass===!1?(N.side=wt,N.needsUpdate=!0,E.renderBufferDirect(z,U,V,N,b,Q),N.side=_i,N.needsUpdate=!0,E.renderBufferDirect(z,U,V,N,b,Q),N.side=si):E.renderBufferDirect(z,U,V,N,b,Q),b.onAfterRender(E,U,z,V,N,Q)}function Ln(b,U,z){U.isScene!==!0&&(U=xt);const V=ye.get(b),N=S.state.lights,Q=S.state.shadowsArray,le=N.state.version,pe=k.getParameters(b,N.state,Q,U,z),de=k.getProgramCacheKey(pe);let Te=V.programs;V.environment=b.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(b.isMeshStandardMaterial?g:w).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Te===void 0&&(b.addEventListener("dispose",Pe),Te=new Map,V.programs=Te);let Ae=Te.get(de);if(Ae!==void 0){if(V.currentProgram===Ae&&V.lightsStateVersion===le)return xa(b,pe),Ae}else pe.uniforms=k.getUniforms(b),b.onBeforeCompile(pe,E),Ae=k.acquireProgram(pe,de),Te.set(de,Ae),V.uniforms=pe.uniforms;const ve=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ve.clippingPlanes=xe.uniform),xa(b,pe),V.needsLights=xc(b),V.lightsStateVersion=le,V.needsLights&&(ve.ambientLightColor.value=N.state.ambient,ve.lightProbe.value=N.state.probe,ve.directionalLights.value=N.state.directional,ve.directionalLightShadows.value=N.state.directionalShadow,ve.spotLights.value=N.state.spot,ve.spotLightShadows.value=N.state.spotShadow,ve.rectAreaLights.value=N.state.rectArea,ve.ltc_1.value=N.state.rectAreaLTC1,ve.ltc_2.value=N.state.rectAreaLTC2,ve.pointLights.value=N.state.point,ve.pointLightShadows.value=N.state.pointShadow,ve.hemisphereLights.value=N.state.hemi,ve.directionalShadowMap.value=N.state.directionalShadowMap,ve.directionalShadowMatrix.value=N.state.directionalShadowMatrix,ve.spotShadowMap.value=N.state.spotShadowMap,ve.spotLightMatrix.value=N.state.spotLightMatrix,ve.spotLightMap.value=N.state.spotLightMap,ve.pointShadowMap.value=N.state.pointShadowMap,ve.pointShadowMatrix.value=N.state.pointShadowMatrix),V.currentProgram=Ae,V.uniformsList=null,Ae}function ma(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=ds.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function xa(b,U){const z=ye.get(b);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function pc(b,U,z,V,N){U.isScene!==!0&&(U=xt),Ie.resetTextureUnits();const Q=U.fog,le=V.isMeshStandardMaterial?U.environment:null,pe=_===null?E.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:sn,de=(V.isMeshStandardMaterial?g:w).get(V.envMap||le),Te=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ae=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ve=!!z.morphAttributes.position,Ve=!!z.morphAttributes.normal,$e=!!z.morphAttributes.color;let ct=gi;V.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(ct=E.toneMapping);const lt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Je=lt!==void 0?lt.length:0,Se=ye.get(V),at=S.state.lights;if(K===!0&&(ue===!0||b!==F)){const yt=b===F&&V.id===I;xe.setState(V,b,yt)}let We=!1;V.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==at.state.version||Se.outputColorSpace!==pe||N.isBatchedMesh&&Se.batching===!1||!N.isBatchedMesh&&Se.batching===!0||N.isBatchedMesh&&Se.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Se.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Se.instancing===!1||!N.isInstancedMesh&&Se.instancing===!0||N.isSkinnedMesh&&Se.skinning===!1||!N.isSkinnedMesh&&Se.skinning===!0||N.isInstancedMesh&&Se.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Se.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Se.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Se.instancingMorph===!1&&N.morphTexture!==null||Se.envMap!==de||V.fog===!0&&Se.fog!==Q||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==xe.numPlanes||Se.numIntersection!==xe.numIntersection)||Se.vertexAlphas!==Te||Se.vertexTangents!==Ae||Se.morphTargets!==ve||Se.morphNormals!==Ve||Se.morphColors!==$e||Se.toneMapping!==ct||Se.morphTargetsCount!==Je)&&(We=!0):(We=!0,Se.__version=V.version);let At=Se.currentProgram;We===!0&&(At=Ln(V,U,N));let Ui=!1,Rt=!1,fn=!1;const ot=At.getUniforms(),Et=Se.uniforms;if(me.useProgram(At.program)&&(Ui=!0,Rt=!0,fn=!0),V.id!==I&&(I=V.id,Rt=!0),Ui||F!==b){me.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ot.setValue(R,"projectionMatrix",b.projectionMatrix),ot.setValue(R,"viewMatrix",b.matrixWorldInverse);const Tt=ot.map.cameraPosition;Tt!==void 0&&Tt.setValue(R,_e.setFromMatrixPosition(b.matrixWorld)),it.logarithmicDepthBuffer&&ot.setValue(R,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ot.setValue(R,"isOrthographic",b.isOrthographicCamera===!0),F!==b&&(F=b,Rt=!0,fn=!0)}if(N.isSkinnedMesh){ot.setOptional(R,N,"bindMatrix"),ot.setOptional(R,N,"bindMatrixInverse");const yt=N.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),ot.setValue(R,"boneTexture",yt.boneTexture,Ie))}N.isBatchedMesh&&(ot.setOptional(R,N,"batchingTexture"),ot.setValue(R,"batchingTexture",N._matricesTexture,Ie),ot.setOptional(R,N,"batchingIdTexture"),ot.setValue(R,"batchingIdTexture",N._indirectTexture,Ie),ot.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&ot.setValue(R,"batchingColorTexture",N._colorsTexture,Ie));const Lt=z.morphAttributes;if((Lt.position!==void 0||Lt.normal!==void 0||Lt.color!==void 0)&&we.update(N,z,At),(Rt||Se.receiveShadow!==N.receiveShadow)&&(Se.receiveShadow=N.receiveShadow,ot.setValue(R,"receiveShadow",N.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Et.envMap.value=de,Et.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(Et.envMapIntensity.value=U.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=Jp()),Rt&&(ot.setValue(R,"toneMappingExposure",E.toneMappingExposure),Se.needsLights&&mc(Et,fn),Q&&V.fog===!0&&ge.refreshFogUniforms(Et,Q),ge.refreshMaterialUniforms(Et,V,re,te,S.state.transmissionRenderTarget[b.id]),ds.upload(R,ma(Se),Et,Ie)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ds.upload(R,ma(Se),Et,Ie),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ot.setValue(R,"center",N.center),ot.setValue(R,"modelViewMatrix",N.modelViewMatrix),ot.setValue(R,"normalMatrix",N.normalMatrix),ot.setValue(R,"modelMatrix",N.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const yt=V.uniformsGroups;for(let Tt=0,Es=yt.length;Tt<Es;Tt++){const yi=yt[Tt];ce.update(yi,At),ce.bind(yi,At)}}return At}function mc(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function xc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(b,U,z){const V=ye.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),ye.get(b.texture).__webglTexture=U,ye.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,U){const z=ye.get(b);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0};const gc=R.createFramebuffer();this.setRenderTarget=function(b,U=0,z=0){_=b,D=U,y=z;let V=!0,N=null,Q=!1,le=!1;if(b){const de=ye.get(b);if(de.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(R.FRAMEBUFFER,null),V=!1;else if(de.__webglFramebuffer===void 0)Ie.setupRenderTarget(b);else if(de.__hasExternalTextures)Ie.rebindTextures(b,ye.get(b.texture).__webglTexture,ye.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ve=b.depthTexture;if(de.__boundDepthTexture!==ve){if(ve!==null&&ye.has(ve)&&(b.width!==ve.image.width||b.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(b)}}const Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(le=!0);const Ae=ye.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ae[U])?N=Ae[U][z]:N=Ae[U],Q=!0):b.samples>0&&Ie.useMultisampledRTT(b)===!1?N=ye.get(b).__webglMultisampledFramebuffer:Array.isArray(Ae)?N=Ae[z]:N=Ae,B.copy(b.viewport),G.copy(b.scissor),X=b.scissorTest}else B.copy(Ye).multiplyScalar(re).floor(),G.copy(et).multiplyScalar(re).floor(),X=tt;if(z!==0&&(N=gc),me.bindFramebuffer(R.FRAMEBUFFER,N)&&V&&me.drawBuffers(b,N),me.viewport(B),me.scissor(G),me.setScissorTest(X),Q){const de=ye.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,de.__webglTexture,z)}else if(le){const de=U;for(let Te=0;Te<b.textures.length;Te++){const Ae=ye.get(b.textures[Te]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Te,Ae.__webglTexture,z,de)}}else if(b!==null&&z!==0){const de=ye.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,de.__webglTexture,z)}I=-1},this.readRenderTargetPixels=function(b,U,z,V,N,Q,le,pe=0){if(!(b&&b.isWebGLRenderTarget)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=ye.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){me.bindFramebuffer(R.FRAMEBUFFER,de);try{const Te=b.textures[pe],Ae=Te.format,ve=Te.type;if(!it.textureFormatReadable(Ae)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(ve)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-V&&z>=0&&z<=b.height-N&&(b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pe),R.readPixels(U,z,V,N,Re.convert(Ae),Re.convert(ve),Q))}finally{const Te=_!==null?ye.get(_).__webglFramebuffer:null;me.bindFramebuffer(R.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(b,U,z,V,N,Q,le,pe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=ye.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de)if(U>=0&&U<=b.width-V&&z>=0&&z<=b.height-N){me.bindFramebuffer(R.FRAMEBUFFER,de);const Te=b.textures[pe],Ae=Te.format,ve=Te.type;if(!it.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ve),R.bufferData(R.PIXEL_PACK_BUFFER,Q.byteLength,R.STREAM_READ),b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pe),R.readPixels(U,z,V,N,Re.convert(Ae),Re.convert(ve),0);const $e=_!==null?ye.get(_).__webglFramebuffer:null;me.bindFramebuffer(R.FRAMEBUFFER,$e);const ct=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await fl(R,ct,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Ve),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,Q),R.deleteBuffer(Ve),R.deleteSync(ct),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,U=null,z=0){const V=Math.pow(2,-z),N=Math.floor(b.image.width*V),Q=Math.floor(b.image.height*V),le=U!==null?U.x:0,pe=U!==null?U.y:0;Ie.setTexture2D(b,0),R.copyTexSubImage2D(R.TEXTURE_2D,z,0,0,le,pe,N,Q),me.unbindTexture()};const _c=R.createFramebuffer(),vc=R.createFramebuffer();this.copyTextureToTexture=function(b,U,z=null,V=null,N=0,Q=null){Q===null&&(N!==0?(Cn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=N,N=0):Q=0);let le,pe,de,Te,Ae,ve,Ve,$e,ct;const lt=b.isCompressedTexture?b.mipmaps[Q]:b.image;if(z!==null)le=z.max.x-z.min.x,pe=z.max.y-z.min.y,de=z.isBox3?z.max.z-z.min.z:1,Te=z.min.x,Ae=z.min.y,ve=z.isBox3?z.min.z:0;else{const Lt=Math.pow(2,-N);le=Math.floor(lt.width*Lt),pe=Math.floor(lt.height*Lt),b.isDataArrayTexture?de=lt.depth:b.isData3DTexture?de=Math.floor(lt.depth*Lt):de=1,Te=0,Ae=0,ve=0}V!==null?(Ve=V.x,$e=V.y,ct=V.z):(Ve=0,$e=0,ct=0);const Je=Re.convert(U.format),Se=Re.convert(U.type);let at;U.isData3DTexture?(Ie.setTexture3D(U,0),at=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ie.setTexture2DArray(U,0),at=R.TEXTURE_2D_ARRAY):(Ie.setTexture2D(U,0),at=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const We=R.getParameter(R.UNPACK_ROW_LENGTH),At=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ui=R.getParameter(R.UNPACK_SKIP_PIXELS),Rt=R.getParameter(R.UNPACK_SKIP_ROWS),fn=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,lt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,lt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Te),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ae),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ve);const ot=b.isDataArrayTexture||b.isData3DTexture,Et=U.isDataArrayTexture||U.isData3DTexture;if(b.isDepthTexture){const Lt=ye.get(b),yt=ye.get(U),Tt=ye.get(Lt.__renderTarget),Es=ye.get(yt.__renderTarget);me.bindFramebuffer(R.READ_FRAMEBUFFER,Tt.__webglFramebuffer),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,Es.__webglFramebuffer);for(let yi=0;yi<de;yi++)ot&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ye.get(b).__webglTexture,N,ve+yi),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ye.get(U).__webglTexture,Q,ct+yi)),R.blitFramebuffer(Te,Ae,le,pe,Ve,$e,le,pe,R.DEPTH_BUFFER_BIT,R.NEAREST);me.bindFramebuffer(R.READ_FRAMEBUFFER,null),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(N!==0||b.isRenderTargetTexture||ye.has(b)){const Lt=ye.get(b),yt=ye.get(U);me.bindFramebuffer(R.READ_FRAMEBUFFER,_c),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,vc);for(let Tt=0;Tt<de;Tt++)ot?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Lt.__webglTexture,N,ve+Tt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Lt.__webglTexture,N),Et?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,yt.__webglTexture,Q,ct+Tt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,yt.__webglTexture,Q),N!==0?R.blitFramebuffer(Te,Ae,le,pe,Ve,$e,le,pe,R.COLOR_BUFFER_BIT,R.NEAREST):Et?R.copyTexSubImage3D(at,Q,Ve,$e,ct+Tt,Te,Ae,le,pe):R.copyTexSubImage2D(at,Q,Ve,$e,Te,Ae,le,pe);me.bindFramebuffer(R.READ_FRAMEBUFFER,null),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Et?b.isDataTexture||b.isData3DTexture?R.texSubImage3D(at,Q,Ve,$e,ct,le,pe,de,Je,Se,lt.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(at,Q,Ve,$e,ct,le,pe,de,Je,lt.data):R.texSubImage3D(at,Q,Ve,$e,ct,le,pe,de,Je,Se,lt):b.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,Q,Ve,$e,le,pe,Je,Se,lt.data):b.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,Q,Ve,$e,lt.width,lt.height,Je,lt.data):R.texSubImage2D(R.TEXTURE_2D,Q,Ve,$e,le,pe,Je,Se,lt);R.pixelStorei(R.UNPACK_ROW_LENGTH,We),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,At),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ui),R.pixelStorei(R.UNPACK_SKIP_ROWS,Rt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,fn),Q===0&&U.generateMipmaps&&R.generateMipmap(at),me.unbindTexture()},this.initRenderTarget=function(b){ye.get(b).__webglFramebuffer===void 0&&Ie.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ie.setTextureCube(b,0):b.isData3DTexture?Ie.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ie.setTexture2DArray(b,0):Ie.setTexture2D(b,0),me.unbindTexture()},this.resetState=function(){D=0,y=0,_=null,me.reset(),P.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}export{Zc as A,In as B,He as C,dm as D,am as E,Ko as F,Zn as G,cm as H,sm as I,rm as L,om as M,oc as O,hm as P,um as R,Nt as S,ac as T,L as V,fm as W,nm as a,ic as b,nc as c,sh as d,rc as e,Wo as f,vs as g,Kt as h,bc as i,yc as j,Qp as k,em as l,Ai as m,va as n,Qe as o,sc as p,tm as q,oa as r,tc as s,It as t,lm as u,ec as v,Ne as w,im as x};
