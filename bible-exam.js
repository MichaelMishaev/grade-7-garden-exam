(() => {
  const questions = [
    {"id": "bible-01", "type": "mcq", "topic": "משפחת אלקנה והעלייה לשילה", "difficulty": "easy", "prompt": "איזה תיאור מתאים למשפחתו של אלקנה?", "ref": {"id": "bible-samuel-study", "part": "א׳ 1–8"}, "choices": ["לפנינה היו ילדים, ולחנה לא היו ילדים.", "לחנה היו ילדים, ולפנינה לא היו ילדים.", "לחנה ולפנינה היו ילדים.", "לחנה ולפנינה לא היו ילדים."], "correct": 0, "explanation": {"he": "בשמואל א׳ א׳ 1–8: לפנינה היו ילדים, ולחנה לא היו ילדים בתחילת הסיפור."}},
    {"id": "bible-02", "type": "mcq", "topic": "משפחת אלקנה והעלייה לשילה", "difficulty": "easy", "prompt": "לשם מה עלה אלקנה לשילה מדי שנה?", "ref": {"id": "bible-samuel-study", "part": "א׳ 1–8"}, "choices": ["להשתחוות ולזבוח לה׳.", "לפגוש שם את משפחתו מהר אפרים.", "למנות כוהנים חדשים.", "לקנות מזון למשפחתו."], "correct": 0, "explanation": {"he": "בשמואל א׳ א׳ 1–8: אלקנה עלה לשילה בקביעות כדי להשתחוות ולזבוח לה׳."}},
    {"id": "bible-03", "type": "truefalse", "topic": "משפחת אלקנה והעלייה לשילה", "difficulty": "easy", "prompt": "אלקנה מתואר בתחילת הסיפור כבן ירוחם.", "ref": {"id": "bible-samuel-study", "part": "א׳ 1–8"}, "choices": ["נכון", "לא נכון"], "correct": 0, "explanation": {"he": "בשמואל א׳ א׳ 1–8: הפסוק הראשון מציג את אלקנה כבן ירוחם."}},
    {"id": "bible-04", "type": "truefalse", "topic": "התפילה, הנדר והשיחה עם עלי", "difficulty": "easy", "prompt": "עלי שמע את קולה של חנה כשעמדה והתפללה.", "ref": {"id": "bible-samuel-study", "part": "א׳ 9–18"}, "choices": ["נכון", "לא נכון"], "correct": 1, "explanation": {"he": "בשמואל א׳ א׳ 9–18: עלי ראה את שפתיה נעות, אבל קולה של חנה לא נשמע."}},
    {"id": "bible-05", "type": "mcq", "topic": "לידת שמואל וקיום הנדר", "difficulty": "easy", "prompt": "למה חנה קראה לבנה שמואל?", "ref": {"id": "bible-samuel-study", "part": "א׳ 19–28"}, "choices": ["מפני שביקשה אותו מה׳.", "מפני שעלי בחר לו את השם.", "מפני שנולד בשילה.", "מפני שזה היה שמו של אביה."], "correct": 0, "explanation": {"he": "בשמואל א׳ א׳ 19–28: חנה קישרה את השם לבקשתה: ״כי מה׳ שאלתיו״."}},
    {"id": "bible-06", "type": "mcq", "topic": "לידת שמואל וקיום הנדר", "difficulty": "medium", "prompt": "מה הביאה חנה לשילה לצד שמואל לאחר שנגמל?", "ref": {"id": "bible-samuel-study", "part": "א׳ 19–28"}, "choices": ["שלושה פרים, איפה קמח ונבל יין.", "פר אחד, שני כבשים וכד שמן.", "שני כבשים, איפה חיטה ונבל יין.", "שלושה פרים, איפה שעורה וכד שמן."], "correct": 0, "explanation": {"he": "בשמואל א׳ א׳ 19–28: בפסוק כ״ד נמנים שלושה פרים, איפה אחת קמח ונבל יין."}},
    {"id": "bible-07", "type": "mcq", "topic": "תפילת ההודיה של חנה", "difficulty": "easy", "prompt": "איזה משפט בתפילת חנה מדגיש את קדושת ה׳?", "ref": {"id": "bible-samuel-study", "part": "ב׳ 1–10"}, "choices": ["״אין קדוש כה׳ כי אין בלתך״.", "״עד ייגמל הנער״.", "״לכי לשלום״.", "״כי מה׳ שאלתיו״."], "correct": 0, "explanation": {"he": "בשמואל א׳ ב׳ 1–10: חנה אומרת שאין קדוש כמו ה׳."}},
    {"id": "bible-08", "type": "mcq", "topic": "תפילת ההודיה של חנה", "difficulty": "medium", "prompt": "מה הרעיון המרכזי בתפילת חנה בפרק ב׳?", "ref": {"id": "bible-samuel-study", "part": "ב׳ 1–10"}, "choices": ["הודיה לה׳ והכרה בכוחו לשנות את מצב האדם.", "בקשה שה׳ ייתן לחנה את בנה הראשון.", "בקשה ששמואל יחזור הביתה.", "תלונה לפני עלי על מנהגי הכוהנים."], "correct": 0, "explanation": {"he": "בשמואל א׳ ב׳ 1–10: חנה מודה לה׳ ומתארת איך הוא משנה את מצבם של בני אדם."}},
    {"id": "bible-09", "type": "mcq", "topic": "שמואל ומעשי נער הכוהן", "difficulty": "easy", "prompt": "מה עשה נער הכוהן במזלג בעל שלוש השיניים?", "ref": {"id": "bible-samuel-study", "part": "ב׳ 11–16"}, "choices": ["העלה בשר מתוך כלי הבישול.", "הקטיר את החֵלֶב על המזבח.", "חתך את הבשר לצלייה.", "חילק את הבשר למשפחת המקריב."], "correct": 0, "explanation": {"he": "בשמואל א׳ ב׳ 11–16: הנער הכניס את המזלג לכלי, והכוהן לקח את מה שעלה בו."}},
    {"id": "bible-10", "type": "truefalse", "topic": "שמואל ומעשי נער הכוהן", "difficulty": "easy", "prompt": "לאחר שאלקנה חזר לביתו, שמואל שירת את ה׳ לפני עלי.", "ref": {"id": "bible-samuel-study", "part": "ב׳ 11–16"}, "choices": ["נכון", "לא נכון"], "correct": 0, "explanation": {"he": "בשמואל א׳ ב׳ 11–16: בפסוק י״א נאמר שהנער שירת את ה׳ לפני עלי הכוהן."}},
    {"id": "bible-11", "type": "truefalse", "topic": "שמואל ומעשי נער הכוהן", "difficulty": "medium", "prompt": "נער הכוהן חיכה להקטרת החֵלֶב לפני שדרש בשר חי לצלייה.", "ref": {"id": "bible-samuel-study", "part": "ב׳ 11–16"}, "choices": ["נכון", "לא נכון"], "correct": 1, "explanation": {"he": "בשמואל א׳ ב׳ 11–16: הנער דרש בשר חי עוד לפני הקטרת החֵלֶב."}},
    {"id": "bible-12", "type": "truefalse", "topic": "הניגוד בין שמואל לבני עלי", "difficulty": "medium", "prompt": "בני עלי שינו את התנהגותם לאחר שעלי הוכיח אותם.", "ref": {"id": "bible-samuel-study", "part": "ב׳ 17–26"}, "choices": ["נכון", "לא נכון"], "correct": 1, "explanation": {"he": "בשמואל א׳ ב׳ 17–26: עלי דיבר אליהם על מעשיהם, אבל הם לא שמעו בקולו."}},
    {"id": "bible-13", "type": "checkbox", "topic": "התפילה, הנדר והשיחה עם עלי", "difficulty": "medium", "prompt": "אילו שני דברים התחייבה חנה לעשות אם ייוולד לה בן? סמנו שתי תשובות.", "ref": {"id": "bible-samuel-study", "part": "א׳ 9–18"}, "choices": ["להקדיש אותו לה׳ לכל חייו.", "לא להעביר תער על ראשו.", "להביא אותו לשילה מיד אחרי הלידה.", "לבקש מעלי לבחור לו שם."], "correct": [0, 1], "explanation": {"he": "בשמואל א׳ א׳ 9–18: הנדר כלל הקדשה לכל החיים ואיסור להעלות תער על ראש הבן."}},
    {"id": "bible-14", "type": "checkbox", "topic": "שמואל ומעשי נער הכוהן", "difficulty": "hard", "prompt": "אילו שתי פעולות מתוארות בנוגע לנער הכוהן ולבשר הקרבן? סמנו שתי תשובות.", "ref": {"id": "bible-samuel-study", "part": "ב׳ 11–16"}, "choices": ["הנער העלה בשר מכלי הבישול במזלג.", "הנער דרש בשר חי לצלייה לפני ההקטרה.", "הנער הבטיח להמתין עד להקטרת החֵלֶב.", "הנער ביקש לקבל רק חֵלֶב במקום בשר."], "correct": [0, 1], "explanation": {"he": "בשמואל א׳ ב׳ 11–16: מתוארות לקיחת בשר מכלי הבישול ודרישה לבשר חי עוד לפני הקטרת החֵלֶב."}},
    {"id": "bible-15", "type": "checkbox", "topic": "הניגוד בין שמואל לבני עלי", "difficulty": "medium", "prompt": "אילו שני צמדים של דמות ומעשה נכונים? סמנו שתי תשובות.", "ref": {"id": "bible-samuel-study", "part": "ב׳ 17–26"}, "choices": ["חנה — הביאה לשמואל מעיל קטן.", "עלי — הוכיח את בניו על מעשיהם.", "שמואל — סירב לשמוע בקול עלי.", "חופני ופינחס — שמרו על כבוד הקרבן."], "correct": [0, 1], "explanation": {"he": "בשמואל א׳ ב׳ 17–26: חנה הביאה לשמואל מעיל מדי שנה, ועלי העיר לבניו על התנהגותם."}},
    {"id": "bible-16", "type": "open", "topic": "התפילה, הנדר והשיחה עם עלי", "difficulty": "medium", "prompt": "מה חשב עלי כשראה את חנה מתפללת, ואיך חנה תיקנה את הרושם שלו?", "ref": {"id": "bible-samuel-study", "part": "א׳ 9–18"}},
    {"id": "bible-17", "type": "open", "topic": "תפילת ההודיה של חנה", "difficulty": "hard", "prompt": "הסבירו במילים שלכם את הפסוק ״ה׳ מוריש ומעשיר, משפיל אף מרומם״. מה אפשר ללמוד ממנו על גאווה?", "ref": {"id": "bible-samuel-study", "part": "ב׳ 1–10"}},
    {"id": "bible-18", "type": "open", "topic": "שמואל ומעשי נער הכוהן", "difficulty": "hard", "prompt": "תארו את שני המעשים של נער הכוהן בעניין בשר הקרבן. הסבירו מה היה פסול בדרישה השנייה.", "ref": {"id": "bible-samuel-study", "part": "ב׳ 11–16"}},
    {"id": "bible-19", "type": "open", "topic": "הניגוד בין שמואל לבני עלי", "difficulty": "medium", "prompt": "מה מלמד המעיל שחנה הביאה לשמואל מדי שנה על הקשר ביניהם? הסבירו את התשובה לפי המעשה שלה.", "ref": {"id": "bible-samuel-study", "part": "ב׳ 17–26"}},
    {"id": "bible-20", "type": "open", "topic": "הנבואה על בית עלי", "difficulty": "hard", "prompt": "איש האלוהים הוכיח את בית עלי בעניין הקרבנות. מה היה העיקרון שבני המשפחה הפרו, ומה היה האות לכך שהנבואה תתקיים?", "ref": {"id": "bible-samuel-study", "part": "ב׳ 27–36"}}
  ];

  const $ = id => document.getElementById(id);
  // Questions come from GET /api/exams/bible-v1-samuel only when identical to the inline array above
  // (drafts are keyed by question id and the server recognises the exam by the prompts); otherwise inline is used.
  const inlineQuestions = questions;
  const contentApi = window.ContentApi;
  (contentApi && contentApi.useApi()
    ? contentApi.loadContent('exams/bible-v1-samuel', null, { valid: exam => contentApi.examFromApi(exam, inlineQuestions) !== null })
      .then(exam => (exam && contentApi.examFromApi(exam, inlineQuestions)) || inlineQuestions, () => inlineQuestions)
    : Promise.resolve(inlineQuestions)
  ).then(questions => {
  const storageKey = 'bible-exam-draft-v1';
  const examId = 'bible-v1-samuel';
  const refNames = { 'bible-samuel-study': 'שמואל א׳' };
  // Test details for the teacher's email (docs/TESTING.md §8) and the attempt number for this name (docs/TESTING.md §1).
  const attemptKey = 'prepx-attempts-v1';
  const attemptNumber = (id, name) => { try { return (JSON.parse(localStorage.getItem(attemptKey) || '{}')[`${id}/${name.toLowerCase()}`] || 0) + 1; } catch (_) { return 1; } };
  const countAttempt = (id, name) => { try { const all = JSON.parse(localStorage.getItem(attemptKey) || '{}'); all[`${id}/${name.toLowerCase()}`] = attemptNumber(id, name); localStorage.setItem(attemptKey, JSON.stringify(all)); } catch (_) {} };
  const answerDetails = q => ({ ...(q.choices ? { options: q.choices } : {}), ...(typeof q.correct === 'number' ? { correctAnswer: q.choices[q.correct] } : Array.isArray(q.correct) ? { correctAnswer: q.correct.map(i => q.choices[i]).join(' · ') } : q.correct && typeof q.correct === 'object' ? { correctAnswer: `${q.correct.value}${q.correct.unit ? ` ${q.correct.unit}` : ''}` } : typeof q.correct === 'string' ? { correctAnswer: q.correct } : {}), ...(q.ref ? { reference: `${refNames[q.ref.id] || q.ref.id}, ${q.ref.part}` } : {}) });
  // Checkbox questions (docs/TESTING.md §2): select several, graded all or nothing. The answer is the list of ORIGINAL option indexes, ascending.
  const checkboxCorrect = (selected, correct) => Array.isArray(selected) && Array.isArray(correct) && new Set(selected).size === selected.length && selected.length === correct.length && correct.every(i => selected.includes(i));
  const checkboxTexts = (q, list) => list.map(i => q.choices[i]).join(' · ');
  const validPick = (q, value) => Array.isArray(value) && value.length > 0 && new Set(value).size === value.length && value.every(i => Number.isInteger(i) && i >= 0 && i < q.choices.length);
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem(storageKey)) || {}; } catch (_) {}
  const validOrder = Array.isArray(saved.order) && saved.order.length === questions.length && new Set(saved.order).size === questions.length && saved.order.every(id => questions.some(q => q.id === id));
  // docs/TESTING.md §4: questions and choices are always shuffled, per student.
  const order = validOrder ? saved.order : QuizCore.shuffled(questions).map(q => q.id);
  const ordered = order.map(id => questions.find(q => q.id === id));
  const answers = validOrder && saved.answers && typeof saved.answers === 'object' ? saved.answers : {};
  const flags = new Set(validOrder && Array.isArray(saved.flags) ? saved.flags : []);
  const choiceOrders = {};
  ordered.filter(q => q.choices).forEach(q => {
    const previous = validOrder && saved.choiceOrders?.[q.id];
    choiceOrders[q.id] = Array.isArray(previous) && previous.length === q.choices.length && new Set(previous).size === previous.length && previous.every(i => Number.isInteger(i) && i >= 0 && i < q.choices.length) ? previous : QuizCore.shuffled(q.choices.map((_, i) => i));
  });
  let current = validOrder && Number.isInteger(saved.current) ? Math.max(0, Math.min(19, saved.current)) : 0;
  let finished = validOrder && saved.finished === true;
  const validStamp = v => typeof v === 'string' && Number.isFinite(Date.parse(v));
  let startedAt = validOrder && validStamp(saved.startedAt) ? saved.startedAt : '';
  let finishedAt = finished && validStamp(saved.finishedAt) ? saved.finishedAt : '';
  let sending = false;
  let lastScore = { earned: 0, pending: 0 };
  // Locking (docs/TESTING.md §3): a picked choice locks at once; open and numeric answers lock on "אישור".
  const locked = new Set(validOrder && Array.isArray(saved.locked) ? saved.locked.filter(id => questions.some(q => q.id === id)) : []);
  let sent = validOrder && saved.sent === true;
  let resultToken = finished ? saved.resultToken : undefined;
  let grading = validOrder && saved.grading && typeof saved.grading === 'object' ? saved.grading : { status: 'none', scores: {} };
  let advanceTimer = 0;
  if (!$('student-name').value) $('student-name').value = typeof saved.name === 'string' ? saved.name.slice(0, 100) : '';
  $('article-copy').innerHTML = $('article').innerHTML;
  const verseSummary = $('article-copy').querySelector('[data-verse-summary]');
  verseSummary.replaceWith(...[...verseSummary.children].slice(1));
  const countAnswered = () => { $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`; };
  // The teacher's explanations carry her own markup (<bdi>, <br>, <strong>): show them as HTML, like the summary does.
  // The verdict text in front of them stays plain text.
  const showVerdict = (prefix, html) => { const why = document.createElement('span'); why.innerHTML = html; $('choice-feedback').replaceChildren(prefix, why); };
  const answered = q => q.type === 'checkbox' ? validPick(q, answers[q.id]) : q.type === 'open' ? typeof answers[q.id] === 'string' && answers[q.id].trim().length > 0 : Number.isInteger(answers[q.id]) && answers[q.id] >= 0 && answers[q.id] < q.choices.length;
  const answerText = q => !answered(q) ? 'לא נכתבה תשובה' : q.type === 'checkbox' ? checkboxTexts(q, answers[q.id]) : q.type === 'open' ? answers[q.id].trim() : q.choices[answers[q.id]];
  const isCorrect = q => q.type === 'checkbox' ? checkboxCorrect(answers[q.id], q.correct) : answers[q.id] === q.correct;
  const correctText = q => q.type === 'checkbox' ? checkboxTexts(q, q.correct) : q.choices[q.correct];
  const isLocked = q => q.type === 'open' ? locked.has(q.id) : q.type === 'checkbox' ? locked.has(q.id) && answered(q) : answered(q);
  function persist() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ name: $('student-name').value, order, choiceOrders, answers, flags: [...flags], locked: [...locked], current, finished, sent, grading, startedAt, finishedAt, resultToken })); } catch (_) {}
  }
  // Visible timer (docs/TESTING.md §6): counts up from the stored start time, so a reload keeps it running.
  const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
  setInterval(() => { if (startedAt && !finished) $('timer').textContent = clock(Date.now() - Date.parse(startedAt)); }, 1000);
  // After a submitted answer the verdict stays on screen for a moment, then the next question opens.
  const advance = q => { clearTimeout(advanceTimer); advanceTimer = setTimeout(() => { if (ordered[current] === q) current === 19 ? review() : questionAt(current + 1); }, 1500); };
  function show(id, focusId) {
    document.querySelectorAll('.stage').forEach(el => el.classList.toggle('active', el.id === id));
    window.scrollTo(0, 0);
    if (focusId) $(focusId).focus({ preventScroll: true });
  }
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
    $('confirm').hidden = q.type !== 'open' && q.type !== 'checkbox';
    $('confirm').disabled = isLocked(q) || !answered(q);
  }
  function confirmAnswer() {
    const q = ordered[current];
    if ((q.type !== 'open' && q.type !== 'checkbox') || isLocked(q) || !answered(q)) return;
    locked.add(q.id); persist(); syncConfirm(q); $('answer').disabled = true;
    if (q.type === 'checkbox') showCheckboxFeedback(q);
    advance(q);
  }
  function questionAt(index) {
    clearTimeout(advanceTimer);
    current = index;
    const q = ordered[index];
    if (startedAt && !finished) $('timer').textContent = clock(Date.now() - Date.parse(startedAt));
    $('counter').textContent = `שאלה ${index + 1} מתוך 20`;
    $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`;
    $('progress').style.width = `${(index + 1) * 5}%`;
    $('progress-bar').setAttribute('aria-valuenow', index + 1);
    $('question-topic').textContent = q.topic;
    $('question-title').textContent = q.prompt;
    $('choices').replaceChildren(); $('choice-feedback').hidden = true;
    $('open-answer').hidden = q.type !== 'open';
    $('choices').hidden = q.type === 'open';
    if (q.type === 'open') { $('answer').value = typeof answers[q.id] === 'string' ? answers[q.id] : ''; $('answer').disabled = isLocked(q); }
    else if (q.type === 'checkbox') renderCheckboxes(q);
    else choiceOrders[q.id].forEach(i => {
      const label = document.createElement('label'); label.className = 'choice';
      const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'choice'; radio.value = i; radio.checked = answers[q.id] === i;
      const text = document.createElement('span'); text.textContent = q.choices[i];
      radio.disabled = isLocked(q);
      radio.addEventListener('change', () => { if (isLocked(q)) return; answers[q.id] = i; persist(); $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`; showFeedback(q); advance(q); });
      label.append(radio, text); $('choices').append(label);
    });
    if (q.type !== 'open' && q.type !== 'checkbox' && answered(q)) showFeedback(q);
    syncConfirm(q);
    $('flag').checked = flags.has(q.id);
    $('previous').textContent = index === 0 ? 'חזרה לטקסט' : 'לשאלה הקודמת';
    $('next').textContent = index === 19 ? 'לבדיקת התשובות' : 'לשאלה הבאה';
    persist(); show('question-stage', 'question-title');
  }
  function review() {
    const missing = ordered.filter(q => !answered(q)).length;
    $('review-status').textContent = `${missing} שאלות ללא תשובה · ${flags.size} שאלות מסומנות לבדיקה. אפשר ללחוץ על כל שאלה כדי לחזור אליה.`;
    $('review-list').replaceChildren(); $('review-error').textContent = '';
    ordered.forEach((q, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'review-item';
      const title = document.createElement('strong'); title.textContent = `${i + 1}. ${q.prompt}${flags.has(q.id) ? ' · ⚑ לבדיקה חוזרת' : ''}`;
      const answer = document.createElement('span'); answer.textContent = answerText(q);
      button.append(title, answer); button.addEventListener('click', () => questionAt(i)); $('review-list').append(button);
    });
    show('review', 'review-title');
  }
  function results() {
    const fractions = Object.fromEntries(questions.filter(q => q.type !== 'open').map(q => [q.id, isCorrect(q) ? 1 : 0]));
    const score = lastScore = QuizCore.scoreQuiz(questions, fractions);
    ExamResult.renderConclusion($('ai-conclusion'), grading);
    $('score').textContent = ExamResult.scoreText(grading, score.earned, questions.filter(q => q.type === 'open').map(q => q.id));
    $('done-banner').hidden = !sent; $('retry').hidden = !sent; $('regrade').hidden = !(sent && grading.status === 'failed');
    if (sent) {
      const queued = grading.status === 'pending';
      $('done-banner').querySelector('strong').textContent = queued || grading.emailSent === false ? 'סיימתם! התשובות נשמרו.' : 'סיימתם! התשובות נשלחו למורה.';
      $('send-status').textContent = '';
    }
    if (startedAt && finishedAt) {
      const mins = Math.max(1, Math.round((Date.parse(finishedAt) - Date.parse(startedAt)) / 60000));
      $('score').textContent += ` זמן המבחן: ${mins === 1 ? 'דקה אחת' : mins + ' דקות'}.`;
    }
    $('topics').replaceChildren(); $('explanations').replaceChildren();
    [...new Set(questions.map(q => q.topic))].forEach(topic => {
      const group = questions.filter(q => q.topic === topic); const graded = group.filter(q => q.type !== 'open');
      const item = document.createElement('li'); item.textContent = `${topic}: ${graded.filter(q => fractions[q.id]).length} מתוך ${graded.length} תשובות אוטומטיות נכונות · ${group.length - graded.length} פתוחות לבדיקה`;
      $('topics').append(item);
    });
    ordered.forEach((q, i) => {
      const card = document.createElement('article'); card.className = 'card result-detail';
      const title = document.createElement('h2'); title.textContent = `${i + 1}. ${q.prompt}`;
      const answer = document.createElement('p'); answer.textContent = `התשובה שלי: ${answerText(q)}`;
      const feedback = document.createElement('p'); feedback.textContent = q.type === 'open' ? (grading.scores[q.id] ? `ניקוד: ${grading.scores[q.id].score} מתוך ${grading.scores[q.id].max}` : '') : `${fractions[q.id] ? '✓ תשובה נכונה' : '✕ תשובה שגויה'} · התשובה הנכונה: ${correctText(q)}. ${q.explanation.he}`;
      card.append(title, answer, feedback);
      if (q.ref?.part) {
        const source = document.createElement('p'); source.className = 'source-line';
        source.textContent = `מקור: שמואל א׳ ${q.ref.part}`; card.append(source);
      }
      $('explanations').append(card);
    });
    if (!$('results').classList.contains('active')) show('results', 'results-title');
  }
  $('student-name').addEventListener('input', persist);
  $('begin').addEventListener('click', () => {
    if (!$('student-name').value.trim()) { $('name-error').textContent = 'יש לכתוב שם לפני שמתחילים.'; $('student-name').focus(); return; }
    $('name-error').textContent = ''; if (!startedAt) startedAt = new Date().toISOString(); persist(); questionAt(current);
  });
  $('answer').addEventListener('input', () => { const q = ordered[current]; if (isLocked(q)) return; answers[q.id] = $('answer').value; persist(); $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`; syncConfirm(q); });
  $('confirm').addEventListener('click', confirmAnswer);
  $('flag').addEventListener('change', () => { const id = ordered[current].id; $('flag').checked ? flags.add(id) : flags.delete(id); persist(); });
  $('previous').addEventListener('click', () => current === 0 ? show('start', 'page-title') : questionAt(current - 1));
  $('next').addEventListener('click', () => current === 19 ? review() : questionAt(current + 1));
  $('review-button').addEventListener('click', review);
  $('back-to-questions').addEventListener('click', () => questionAt(current));
  $('finish').addEventListener('click', () => {
    if (ordered.some(q => !answered(q) || !isLocked(q))) { $('review-error').textContent = 'יש להשלים את כל התשובות לפני הסיום. השאלות החסרות מסומנות ברשימה.'; return; }
    // Finishing sends at once and locks everything (docs/TESTING.md §6): there is no way back to edit.
    ordered.forEach(q => locked.add(q.id));
    resultToken = ExamResult.newToken();
    finished = true; if (!finishedAt) finishedAt = new Date().toISOString(); persist(); results(); sendExam();
  });
  $('retry').addEventListener('click', () => { if (sending) return; try { sessionStorage.removeItem(storageKey); } catch (_) {} location.reload(); });
  $('send').addEventListener('click', () => sendExam());
  async function sendExam() {
    if (sending || sent) return;
    sending = true; $('send').hidden = true; $('retry').disabled = true;
    $('send-status').textContent = 'שולחים…';
    try {
      const response = await fetch(location.hostname === 'michaelmishaev.github.io' ? 'https://hitech.agnon.online/api/submit-exam' : '/api/submit-exam', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ exam: examId, name: $('student-name').value.trim(), resultToken, attempt: attemptNumber(examId, $('student-name').value.trim()), answers: ordered.map(q => ({ questionId: q.id, question: q.prompt, answer: answerText(q), ...answerDetails(q), ...(q.type === 'open' ? {} : { correct: isCorrect(q) }) })), score: { earned: lastScore.earned, pending: lastScore.pending }, ...(startedAt && finishedAt ? { startedAt, finishedAt } : {}) }), signal: AbortSignal.timeout(45000)
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error('Submission failed');
      countAttempt(examId, $('student-name').value.trim());
      // Keep the saved attempt as a locked summary, including its private result receipt.
      sent = true;
      grading = data.grading && typeof data.grading === 'object' ? { ...data.grading, scores: data.grading.scores || {}, submissionRef: typeof data.submissionRef === 'string' ? data.submissionRef : '' } : { status: 'none', scores: {} };
      try { sessionStorage.setItem('bible-exam-result-v1', JSON.stringify({ exam: examId, startedAt, finishedAt, total: questions.length })); } catch (_) {}
      persist(); results(); watchResult();
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
        body: JSON.stringify({ exam: examId, ...(grading.submissionRef ? { submissionRef: grading.submissionRef } : {}), answers: ordered.filter(q => q.type === 'open').map(q => ({ questionId: q.id, question: q.prompt, answer: answerText(q) })) }), signal: AbortSignal.timeout(45000)
      });
      const data = await response.json();
      if (!response.ok || data.grading?.status !== 'ok') throw new Error('Grading failed');
      grading = { ...data.grading, scores: data.grading.scores || {}, submissionRef: grading.submissionRef }; persist(); results();
    } catch (_) { $('send-status').textContent = 'הבדיקה לא הצליחה. אפשר לנסות שוב.'; }
    finally { $('regrade').disabled = false; }
  });
  function watchResult() {
    ExamResult.watch(grading, resultToken, result => { grading = result; persist(); results(); });
  }
  if (finished && ordered.every(answered)) { results(); if (sent) watchResult(); else sendExam(); }
  else if (startedAt) questionAt(current);
  });
})();
