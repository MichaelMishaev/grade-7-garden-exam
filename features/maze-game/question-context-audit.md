# Maze question context audit — 2026-10-30

Audited every bundled maze question: **62 questions across 7 banks**. 29 maze-only display adaptations; 33 self-contained measurement/conversion questions preserved exactly. This changes no canonical prompt, option, correct index, question ID, scoring, save key or exam. No question is dropped.

## Source evidence and findings

- `garden-exam.html:103–109`, especially paragraphs1–3: actual class garden story, plants, reading before planting, watering rota and flower proposal. `practice.js:8–42` supplies canonical grammar/classification task wording. Facts are logically classifiable without reading the passage, but the vague “מה זה?” loses the task intent; the display now separates its verbatim statement and explicit fact/opinion prompt. Question-word tasks name the local scenario and sought information. Instruction tasks show their exact command, rather than implying that an unseen worksheet question is required.
- `assets/materials/physics-measurements-grade-7.pdf`, pages5–6: rendered and visually inspected because this scan has no extractable text. Page5 shows45° sight line, right isosceles triangle, horizontal distance, eye height and level-ground condition; page6 shows hollow cylinder,45° triangle, tape measure, setup, measurement steps and6m+1.4m example. Pole questions omit this shared setup when shuffled into a trap. Each now shows the minimum relevant setup visibly above the prompt.
- `practice.js:44–111` and bundled source snapshot: the other33 physics questions contain their own measurement data or ask standalone conceptual/units questions; preserved. All numeric outcomes retain source choices and indices.
- Adaptations require exact ID/prompt/choices/correct/ref equality with the reviewed snapshot. Modified live/saved or unknown questions fall back to their original prompt without attaching stale data. Normalized extra metadata and shuffled display options are supported. Essential setup belongs outside collapsed source/details UI.
- No source missing for the62 reviewed questions. The pole apparatus can be described in one short visible sentence; no diagram or answer-revealing label is required. The angle answer is not printed in pole01 context; the ground-condition answer is not printed in pole06 context.

## Per-question review

### facts — 6 questions

| ID | Source | Decision | Visible context | Display prompt |
| --- | --- | --- | --- | --- |
| facts-01 | garden-passage: פסקה 1 | Adapted display; original academic data retained | „בפעילות השתתפו שלוש כיתות.” | עובדה או דעה? |
| facts-02 | garden-passage: פסקה 3 | Adapted display; original academic data retained | „שיעורים בגינה מעניינים יותר משיעורים בכיתה.” | עובדה או דעה? |
| facts-03 | garden-passage: פסקה 1 | Adapted display; original academic data retained | „התלמידים שתלו נענע, רוזמרין וחסה.” | עובדה או דעה? |
| facts-04 | garden-passage: whole task/command | Adapted display; original academic data retained | „נענע היא הצמח הכי מוצלח בגינה.” | עובדה או דעה? |
| facts-05 | garden-passage: פסקה 1 | Adapted display; original academic data retained | „כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” | עובדה או דעה? |
| facts-06 | garden-passage: whole task/command | Adapted display; original academic data retained | „לדעתי, הפעילות בגינה נהדרת.” | עובדה או דעה? |

### questions — 6 questions

| ID | Source | Decision | Visible context | Display prompt |
| --- | --- | --- | --- | --- |
| questions-01 | garden-passage: פסקה 1 | Adapted display; original academic data retained | רוצים לברר את זמן הקמת הגינה בבית הספר. | באיזו מילת שאלה נשתמש? |
| questions-02 | garden-passage: פסקה 1 | Adapted display; original academic data retained | רוצים לברר את מספר הכיתות שהשתתפו בהקמת הגינה. | באיזו מילת שאלה נשתמש? |
| questions-03 | garden-passage: פסקה 2 | Adapted display; original academic data retained | התלמידים קראו על צמחים לפני השתילה. | איזו מילת שאלה מבקשת סיבה? |
| questions-04 | garden-passage: פסקה 1 | Adapted display; original academic data retained | תלמידים הקימו גינה בבית הספר. | איזו מילת שאלה מבקשת מקום? |
| questions-05 | garden-passage: פסקה 1 | Adapted display; original academic data retained | שלוש כיתות חילקו ביניהן את ימי ההשקיה. | איזו מילת שאלה מבקשת דרך פעולה? |
| questions-06 | garden-passage: פסקה 3 | Adapted display; original academic data retained | עלתה הצעה להוסיף פרחים לגינה. | איזו מילת שאלה מבקשת לזהות אדם? |

### instructions — 6 questions

| ID | Source | Decision | Visible context | Display prompt |
| --- | --- | --- | --- | --- |
| instructions-01 | garden-passage: whole task/command | Adapted display; original academic data retained | ההוראה: ״העתיקו מהטקסט עובדה״. | מה צריך לעשות? |
| instructions-02 | garden-passage: whole task/command | Adapted display; original academic data retained | ההוראה: ״נמקו״. | מה צריך להוסיף לתשובה? |
| instructions-03 | garden-passage: whole task/command | Adapted display; original academic data retained | ההוראה: ״ציינו״. | איזו תשובה מתאימה? |
| instructions-04 | garden-passage: whole task/command | Adapted display; original academic data retained | ההוראה: ״הסבירו״. | מה צריך לעשות? |
| instructions-05 | garden-passage: whole task/command | Adapted display; original academic data retained | ההוראה: ״נסחו שאלה מלאה״. | איזו תשובה מקיימת את ההוראה? |
| instructions-06 | garden-passage: whole task/command | Adapted display; original academic data retained | ההוראה: ״הביעו את דעתכם וכתבו נימוק״. | מה צריך לכתוב? |

### physics-basics — 11 questions

| ID | Source | Decision | Visible context | Display prompt |
| --- | --- | --- | --- | --- |
| physics-basics-01 | physics-pdf: עמוד 1 | Self-contained; unchanged | None needed | מה חייבים לציין בתוצאת מדידה? |
| physics-basics-02 | physics-pdf: עמוד 1 | Self-contained; unchanged | None needed | מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו? |
| physics-basics-03 | physics-pdf: עמוד 1 | Self-contained; unchanged | None needed | מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו? |
| physics-basics-04 | physics-pdf: עמוד 3 | Self-contained; unchanged | None needed | איך מחשבים עובי ממוצע של דף בערימה? |
| physics-basics-05 | physics-pdf: עמוד 3 | Self-contained; unchanged | None needed | ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף? |
| physics-basics-06 | physics-pdf: עמוד 3 | Self-contained; unchanged | None needed | למה כדאי למדוד ערימה של דפים מאותו סוג? |
| physics-basics-07 | physics-pdf: עמוד 1 | Self-contained; unchanged | None needed | מהי מדידה? |
| physics-basics-08 | physics-pdf: עמוד 1 | Self-contained; unchanged | None needed | מה מתאים לתיאור אורך עיפרון? |
| physics-basics-09 | physics-pdf: עמוד 1 | Self-contained; unchanged | None needed | איזו פעולה היא מדידה עקיפה? |
| physics-basics-10 | physics-pdf: עמוד 3 | Self-contained; unchanged | None needed | ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע? |
| physics-basics-11 | physics-pdf: עמוד 3 | Self-contained; unchanged | None needed | למה מודדים ערימת דפים בלי הכריכה? |

### physics-units — 11 questions

| ID | Source | Decision | Visible context | Display prompt |
| --- | --- | --- | --- | --- |
| physics-units-01 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה סנטימטרים יש במטר אחד? |
| physics-units-02 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה מילימטרים יש בסנטימטר אחד? |
| physics-units-03 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה מטרים יש ב־2 קילומטרים? |
| physics-units-04 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה סנטימטרים הם 2.4 מטרים? |
| physics-units-05 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה מטרים הם 350 סנטימטרים? |
| physics-units-06 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה הם מטר אחד ועוד 25 ס״מ? |
| physics-units-07 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה מילימטרים הם 3 ס״מ? |
| physics-units-08 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה סנטימטרים הם 12 מ״מ? |
| physics-units-09 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | כמה קילומטרים הם 1,500 מטרים? |
| physics-units-10 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | מה ארוך יותר: 90 ס״מ או מטר אחד? |
| physics-units-11 | physics-pdf: עמוד 2 | Self-contained; unchanged | None needed | מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ? |

### physics-precision — 11 questions

| ID | Source | Decision | Visible context | Display prompt |
| --- | --- | --- | --- | --- |
| physics-precision-01 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | מאיזו נקודה בסרגל מתחילים למדוד אורך? |
| physics-precision-02 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו? |
| physics-precision-03 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה? |
| physics-precision-04 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | איזה כלי מתאים יותר למדידת אורך של חדר? |
| physics-precision-05 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | מה מאפשרות שנתות קטנות יותר על כלי מדידה? |
| physics-precision-06 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | מדוע חוזרים על מדידה? |
| physics-precision-07 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו? |
| physics-precision-08 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | למה לא תמיד מתחילים למדוד מקצה הסרגל? |
| physics-precision-09 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | איזה כלי מתאים למדידת אורך של עיפרון? |
| physics-precision-10 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | מה חזרה על מדידה אינה מתקנת בהכרח? |
| physics-precision-11 | physics-pdf: עמוד 4 | Self-contained; unchanged | None needed | מה כדאי לבדוק לפני שרושמים תוצאה? |

### physics-pole — 11 questions

| ID | Source | Decision | Visible context | Display prompt |
| --- | --- | --- | --- | --- |
| physics-pole-01 | physics-pdf: עמוד 5 | Adapted display; original academic data retained | מודדים גובה עמוד בעזרת גליל חלול ומשולש ישר־זווית ושווה־שוקיים. | באיזו זווית לאופק מכוונים לראש העמוד? |
| physics-pole-02 | physics-pdf: עמוד 5 | Adapted display; original academic data retained | מביטים לראש עמוד בזווית 45° לאופק, על קרקע אופקית. | מה שווה למרחק האופקי לעמוד? |
| physics-pole-03 | physics-pdf: עמוד 6 | Adapted display; original academic data retained | מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 6 מ׳. גובה העיניים: 1.4 מ׳. | מה גובה העמוד? |
| physics-pole-04 | physics-pdf: עמוד 6 | Adapted display; original academic data retained | מודדים גובה עמוד בעזרת גליל המכוון לראשו ב־45° לאופק. | איזה מרחק מודדים לצורך החישוב? |
| physics-pole-05 | physics-pdf: עמוד 6 | Adapted display; original academic data retained | מביטים לראש עמוד ב־45° לאופק, על קרקע אופקית. | איזה גובה מוסיפים למרחק האופקי? |
| physics-pole-06 | physics-pdf: עמוד 5 | Adapted display; original academic data retained | מביטים לראש עמוד ב־45°. מחשבים את גובהו ממרחק אופקי וגובה העיניים. | איזה תנאי קרקע נדרש לחישוב? |
| physics-pole-07 | physics-pdf: עמוד 5 | Adapted display; original academic data retained | מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 4 מ׳. גובה העיניים: 1.5 מ׳. | מה גובה העמוד? |
| physics-pole-08 | physics-pdf: עמוד 6 | Adapted display; original academic data retained | למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה. | מה צריך לראות דרך הגליל? |
| physics-pole-09 | physics-pdf: עמוד 6 | Adapted display; original academic data retained | למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה. | מה תפקיד המשולש? |
| physics-pole-10 | physics-pdf: עמוד 5 | Adapted display; original academic data retained | מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי לעמוד: 5 מ׳. | מה גובה ראש העמוד מעל העיניים? |
| physics-pole-11 | physics-pdf: עמוד 6 | Adapted display; original academic data retained | מודדים מרחק אופקי לעמוד וגובה עיניים, ואז מחשבים את גובה העמוד. | למה זו מדידה עקיפה? |

## Verification

`node --test games/maze/tests/question-presentation.test.mjs`:7passed,0failed. Tests cover all62 canonical and normalized questions, compact visible content, required setup and numeric preservation, no direct angle/ground answer leaks, unknown/live/save variant fallback, and snapshot non-mutation. This agent performed source review and pure tests; browser integration is owned and verified by the parent/UX agent.
