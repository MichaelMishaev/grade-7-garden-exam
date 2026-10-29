(() => {
  const questions = [
    { id: 'library-01', type: 'mcq', topic: 'הבנת הנקרא', difficulty: 'easy', prompt: 'באילו ימים הספרייה נפתחת בהפסקה הגדולה?', choices: ['שני ורביעי', 'ראשון ושלישי', 'בכל ימות השבוע', 'רק ביום שישי'], correct: 0, explanation: { he: 'בפסקה הראשונה נאמר שהספרייה נפתחת בהפסקה בימים שני ורביעי.' }, ref: { id: 'library-passage', part: 'פסקה 1' } },
    { id: 'library-02', type: 'mcq', topic: 'תעודת הזהות של הטקסט', difficulty: 'easy', prompt: 'מי כתבה את הטקסט?', choices: ['נועה לוי', 'מאיה', 'הספרנית', 'מועצת התלמידים'], correct: 0, explanation: { he: 'שם הכותבת, נועה לוי, מופיע בשורת הפרטים שמתחת לכותרת.' }, ref: { id: 'library-passage', part: 'הכותרת ושורת הפרטים' } },
    { id: 'library-03', type: 'truefalse', topic: 'הבנת הנקרא', difficulty: 'easy', prompt: 'בסקר השתתפו 60 תלמידי שכבת ז׳.', choices: ['נכון', 'לא נכון'], correct: 0, explanation: { he: 'בפסקה השנייה מצוין שהסקר נערך בקרב 60 תלמידי שכבת ז׳.' }, ref: { id: 'library-passage', part: 'פסקה 2' } },
    { id: 'library-04', type: 'truefalse', topic: 'הבנת הנקרא', difficulty: 'easy', prompt: 'מותר לאכול בספרייה במהלך ההפסקה.', choices: ['נכון', 'לא נכון'], correct: 1, explanation: { he: 'כדי לשמור על השקט נקבע שמותר לקרוא ולשאול ספרים, אך אסור לאכול בספרייה.' }, ref: { id: 'library-passage', part: 'פסקה 3' } },
    { id: 'library-05', type: 'mcq', topic: 'מילות שאלה', difficulty: 'easy', prompt: 'איזו מילת שאלה מתאימה לבירור מספר התלמידים שהשתתפו בסקר?', choices: ['כמה', 'מתי', 'היכן', 'מדוע'], correct: 0, explanation: { he: 'המילה „כמה” מבקשת מידע על מספר או כמות.' }, ref: { id: 'library-passage', part: 'פסקה 2' } },
    { id: 'library-06', type: 'mcq', topic: 'עובדה ודעה', difficulty: 'easy', prompt: 'איזו מילה בדברי מאיה מסמנת במפורש הבעת דעה?', choices: ['לדעתי', 'הקריאה', 'בהפסקה', 'משחק'], correct: 0, explanation: { he: 'מאיה פותחת במילה „לדעתי”, המציגה את העדפתה האישית.' }, ref: { id: 'library-passage', part: 'פסקה 4' } },
    { id: 'library-07', type: 'truefalse', topic: 'עובדה ודעה', difficulty: 'easy', prompt: 'המשפט „בשבוע הראשון נרשמו 18 ביקורים” הוא עובדה שניתן לבדוק ברישומים.', choices: ['נכון', 'לא נכון'], correct: 0, explanation: { he: 'זהו נתון מספרי שאפשר לאמת בעזרת רישומי הביקורים.' }, ref: { id: 'library-passage', part: 'פסקה 4' } },
    { id: 'library-08', type: 'truefalse', topic: 'הבנת הנקרא', difficulty: 'easy', prompt: 'לפני הניסוי הייתה הספרייה פתוחה לתלמידים רק בתום יום הלימודים.', choices: ['נכון', 'לא נכון'], correct: 0, explanation: { he: 'הפסקה הראשונה משווה בין זמני הפתיחה לפני השינוי ובמהלכו.' }, ref: { id: 'library-passage', part: 'פסקה 1' } },
    { id: 'library-09', type: 'mcq', topic: 'הבנת הנקרא', difficulty: 'medium', prompt: 'מדוע הוצע לפתוח את הספרייה גם בהפסקה?', choices: ['תלמידים חיפשו מקום שקט לקריאה', 'המשחקים בחצר בוטלו', 'כל התלמידים ביקשו להפסיק ללמוד', 'הספרייה נסגרה בתום הלימודים'], correct: 0, explanation: { he: 'ההצעה באה בעקבות בקשות של תלמידים למקום שקט לקריאה; המשחקים בחצר נמשכו כרגיל.' }, ref: { id: 'library-passage', part: 'פסקה 1' } },
    { id: 'library-10', type: 'mcq', topic: 'כותרות', difficulty: 'medium', prompt: 'איזו כותרת חלופית מביעה עמדה חיובית, בשונה מהכותרת המידעית של הטקסט?', choices: ['פתיחת הספרייה בהפסקה — רעיון נפלא!', 'הספרייה נפתחת בימים שני ורביעי', 'מועצת התלמידים בודקת את הביקורים', 'ניסוי בספריית בית הספר'], correct: 0, explanation: { he: 'הצירוף „רעיון נפלא” מביע הערכה חיובית. יתר הכותרות מציגות מידע בלי הערכה כזאת.' }, ref: { id: 'library-passage', part: 'הכותרת ושורת הפרטים' } },
    { id: 'library-11', type: 'mcq', topic: 'מילות הוראה', difficulty: 'medium', prompt: 'מה נדרש בהוראה „נמקו מדוע דברי מאיה הם דעה”?', choices: ['לציין שזו העדפה אישית ולהסביר מדוע אינה עובדה מוסכמת', 'להעתיק את מספר הביקורים בלבד', 'לכתוב רק „דעה” בלי הסבר', 'לשנות את שם הכותבת'], correct: 0, explanation: { he: '„נמקו” דורש לתת סיבה לקביעה, ולא רק לציין את הקביעה עצמה.' }, ref: { id: 'library-passage', part: 'פסקה 4' } },
    { id: 'library-12', type: 'truefalse', topic: 'הסקת מסקנות', difficulty: 'medium', prompt: 'מהסקר אפשר להסיק בוודאות שכל 42 התלמידים שהביעו רצון לבקר אכן ביקרו בספרייה.', choices: ['נכון', 'לא נכון'], correct: 1, explanation: { he: 'הספרנית הבחינה בין הבעת רצון בסקר לבין ביקור בפועל.' }, ref: { id: 'library-passage', part: 'פסקה 2' } },
    { id: 'library-13', type: 'truefalse', topic: 'הסקת מסקנות', difficulty: 'medium', prompt: 'הנתון „27 ביקורים” מוכיח שבשבוע השני הגיעו 27 תלמידים שונים.', choices: ['נכון', 'לא נכון'], correct: 1, explanation: { he: 'נספרו ביקורים, ותלמיד שביקר פעמיים נספר פעמיים. לכן אי אפשר לקבוע כמה תלמידים שונים הגיעו.' }, ref: { id: 'library-passage', part: 'פסקה 4' } },
    { id: 'library-14', type: 'truefalse', topic: 'הבנת הנקרא', difficulty: 'medium', prompt: 'בעת פרסום הטקסט כבר הוחלט לפתוח את הספרייה בכל ימות השבוע.', choices: ['נכון', 'לא נכון'], correct: 1, explanation: { he: 'בסוף הטקסט נאמר שטרם הוחלט על פתיחה בכל ימות השבוע.' }, ref: { id: 'library-passage', part: 'פסקה 5' } },
    { id: 'library-15', type: 'open', topic: 'מילות שאלה', difficulty: 'medium', prompt: 'נסחו שאלה מלאה שמתחילה במילה „מתי” והתשובה עליה נמצאת בפסקה האחרונה.', ref: { id: 'library-passage', part: 'פסקה 5' } },
    { id: 'library-16', type: 'open', topic: 'מילות הוראה', difficulty: 'medium', prompt: 'ציינו שני תפקידים של המתנדבים, לפי הטקסט. כתבו את שני התפקידים בקצרה.', ref: { id: 'library-passage', part: 'פסקה 3' } },
    { id: 'library-17', type: 'mcq', topic: 'הסקת מסקנות', difficulty: 'hard', prompt: 'מהי המסקנה המבוססת ביותר מהעלייה מ־18 ביקורים ל־27 ביקורים?', choices: ['נרשמו יותר ביקורים בשבוע השני, אך אין לדעת כמה תלמידים שונים הגיעו', 'בדיוק תשעה תלמידים חדשים הגיעו לספרייה', 'כל תלמידי השכבה מעדיפים קריאה על משחק', 'הניסוי מוכיח שחייבים לפתוח בכל יום'], correct: 0, explanation: { he: 'מספר הביקורים עלה בתשעה. מכיוון שנספרו ביקורים ולא אנשים שונים, אין בסיס לשאר המסקנות.' }, ref: { id: 'library-passage', part: 'פסקה 4' } },
    { id: 'library-18', type: 'truefalse', topic: 'הסקת מסקנות', difficulty: 'hard', prompt: 'מספר הביקורים וחוות הדעת יכולים לסייע בהחלטה אם להמשיך בניסוי, אך אינם מוכיחים לבדם שכל תלמידי בית הספר מרוצים.', choices: ['נכון', 'לא נכון'], correct: 0, explanation: { he: 'הנתונים נוגעים לביקורים ולחוות הדעת שנאספו. אין בטקסט מידע על דעתם של כל תלמידי בית הספר.' }, ref: { id: 'library-passage', part: 'פסקה 5' } },
    { id: 'library-19', type: 'open', topic: 'עובדה ודעה', difficulty: 'hard', prompt: 'העתיקו מן הטקסט עובדה אחת ודעה אחת. הסבירו כיצד אפשר לבדוק את העובדה ומדוע הדעה היא עמדה אישית.', ref: { id: 'library-passage', part: 'הטקסט כולו' } },
    { id: 'library-20', type: 'open', topic: 'כתיבת טיעון', difficulty: 'hard', prompt: 'האם לדעתכם כדאי להמשיך לפתוח את הספרייה בהפסקה? כתבו עמדה, נימוק המבוסס על פרט מהטקסט והצעה אחת להמשך.', ref: { id: 'library-passage', part: 'הטקסט כולו' } }
  ];
  const $ = id => document.getElementById(id);
  // Questions come from GET /api/exams/hebrew-v2-library only when identical to the inline array above
  // (drafts are keyed by question id and the server recognises the exam by the prompts); otherwise inline is used.
  const inlineQuestions = questions;
  const contentApi = window.ContentApi;
  (contentApi && contentApi.useApi()
    ? contentApi.loadContent('exams/hebrew-v2-library', null, { valid: exam => contentApi.examFromApi(exam, inlineQuestions) !== null })
      .then(exam => (exam && contentApi.examFromApi(exam, inlineQuestions)) || inlineQuestions, () => inlineQuestions)
    : Promise.resolve(inlineQuestions)
  ).then(questions => {
  const storageKey = 'library-exam-draft-v1';
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem(storageKey)) || {}; } catch (_) {}
  const validOrder = Array.isArray(saved.order) && saved.order.length === questions.length && new Set(saved.order).size === questions.length && saved.order.every(id => questions.some(q => q.id === id));
  const order = validOrder ? saved.order : ['easy', 'medium', 'hard'].flatMap(level => QuizCore.shuffled(questions.filter(q => q.difficulty === level)).map(q => q.id));
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
  if (!$('student-name').value) $('student-name').value = typeof saved.name === 'string' ? saved.name.slice(0, 100) : '';
  $('article-copy').innerHTML = $('article').innerHTML;
  const answered = q => q.type === 'open' ? typeof answers[q.id] === 'string' && answers[q.id].trim().length > 0 : Number.isInteger(answers[q.id]) && answers[q.id] >= 0 && answers[q.id] < q.choices.length;
  const answerText = q => !answered(q) ? 'לא נכתבה תשובה' : q.type === 'open' ? answers[q.id].trim() : q.choices[answers[q.id]];
  function persist() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ name: $('student-name').value, order, choiceOrders, answers, flags: [...flags], current, finished, startedAt, finishedAt })); } catch (_) {}
  }
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
    $('choice-feedback').textContent = `${ok ? '✓ נכון מאוד!' : '✕ לא נכון.'} ${ok ? '' : `התשובה הנכונה: ${q.choices[q.correct]}. `}${q.explanation.he}`;
    $('choice-feedback').classList.toggle('incorrect', !ok);
    $('choice-feedback').hidden = false;
  }
  function questionAt(index) {
    current = index;
    const q = ordered[index];
    $('counter').textContent = `שאלה ${index + 1} מתוך 20`;
    $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`;
    $('progress').style.width = `${(index + 1) * 5}%`;
    $('progress-bar').setAttribute('aria-valuenow', index + 1);
    $('question-topic').textContent = q.topic;
    $('question-title').textContent = q.prompt;
    $('choices').replaceChildren(); $('choice-feedback').hidden = true;
    $('open-answer').hidden = q.type !== 'open';
    $('choices').hidden = q.type === 'open';
    if (q.type === 'open') $('answer').value = typeof answers[q.id] === 'string' ? answers[q.id] : '';
    else choiceOrders[q.id].forEach(i => {
      const label = document.createElement('label'); label.className = 'choice';
      const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'choice'; radio.value = i; radio.checked = answers[q.id] === i;
      const text = document.createElement('span'); text.textContent = q.choices[i];
      radio.addEventListener('change', () => { answers[q.id] = i; persist(); $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`; showFeedback(q); });
      label.append(radio, text); $('choices').append(label);
    });
    if (q.type !== 'open' && answered(q)) showFeedback(q);
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
    const fractions = Object.fromEntries(questions.filter(q => q.type !== 'open').map(q => [q.id, answers[q.id] === q.correct ? 1 : 0]));
    const score = lastScore = QuizCore.scoreQuiz(questions, fractions);
    $('score').textContent = `ציון חלקי: ${score.earned} מתוך ${100 - score.pending} נקודות · ${score.pending} נקודות ממתינות לבדיקה ב־4 שאלות פתוחות.`;
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
      const feedback = document.createElement('p'); feedback.textContent = q.type === 'open' ? '✎ ממתינה לבדיקת המורה' : `${fractions[q.id] ? '✓ תשובה נכונה' : '✕ תשובה שגויה'} · התשובה הנכונה: ${q.choices[q.correct]}. ${q.explanation.he}`;
      card.append(title, answer, feedback);
      if (q.ref?.part) {
        const source = document.createElement('p'); source.className = 'source-line';
        source.textContent = `מקור: ${q.ref.part} בטקסט`; card.append(source);
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
  $('answer').addEventListener('input', () => { answers[ordered[current].id] = $('answer').value; persist(); $('answered').textContent = `${ordered.filter(answered).length} תשובות מולאו`; });
  $('flag').addEventListener('change', () => { const id = ordered[current].id; $('flag').checked ? flags.add(id) : flags.delete(id); persist(); });
  $('previous').addEventListener('click', () => current === 0 ? show('start', 'page-title') : questionAt(current - 1));
  $('next').addEventListener('click', () => current === 19 ? review() : questionAt(current + 1));
  $('review-button').addEventListener('click', review);
  $('back-to-questions').addEventListener('click', () => questionAt(current));
  $('finish').addEventListener('click', () => {
    if (ordered.some(q => !answered(q))) { $('review-error').textContent = 'יש להשלים את כל התשובות לפני הסיום. השאלות החסרות מסומנות ברשימה.'; return; }
    finished = true; if (!finishedAt) finishedAt = new Date().toISOString(); persist(); results();
  });
  $('retry').addEventListener('click', () => { if (sending) return; try { sessionStorage.removeItem(storageKey); } catch (_) {} location.reload(); });
  $('send').addEventListener('click', async () => {
    if (sending) return;
    sending = true; $('send').disabled = true; $('retry').disabled = true;
    $('send-status').textContent = 'שולחים…';
    try {
      const response = await fetch(location.hostname === 'michaelmishaev.github.io' ? 'https://hitech.agnon.online/api/submit-exam' : '/api/submit-exam', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: $('student-name').value.trim(), answers: ordered.map(q => ({ question: `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`, answer: answerText(q), ...(q.type === 'open' ? {} : { correct: answers[q.id] === q.correct }) })), score: { earned: lastScore.earned, pending: lastScore.pending }, ...(startedAt && finishedAt ? { startedAt, finishedAt } : {}) }), signal: AbortSignal.timeout(20000)
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error('Submission failed');
      // Every exam ends the same way: draft cleared, result summary stored, thanks.html (like garden and physics).
      try { sessionStorage.removeItem(storageKey); sessionStorage.setItem('library-exam-result-v1', JSON.stringify({ startedAt, finishedAt, total: 20, score: { earned: lastScore.earned, pending: lastScore.pending } })); } catch (_) {}
      window.location.assign('thanks.html');
    } catch (_) {
      $('send-status').textContent = 'לא התקבל אישור שליחה. הטיוטה נשמרה. בקשו מהמורה לבדוק אם ההודעה הגיעה לפני ניסיון נוסף.';
      $('send').disabled = false;
    } finally { sending = false; $('retry').disabled = false; }
  });
  if (finished && ordered.every(answered)) results();
  });
})();
