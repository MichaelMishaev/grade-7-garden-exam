(() => {
  const questions = [
  {
    "id": "english-01",
    "type": "mcq",
    "topic": "הבנת הנקרא",
    "difficulty": "easy",
    "prompt": "Where does Maya live?",
    "ref": {
      "id": "english-reading",
      "part": "פסקה 1"
    },
    "choices": [
      "In a village near a river.",
      "In a large city.",
      "On a mountain.",
      "Next to a theater."
    ],
    "correct": 0,
    "explanation": {
      "he": "בפסקה 1 נאמר שמאיה גרה בכפר ליד נהר."
    }
  },
  {
    "id": "english-02",
    "type": "mcq",
    "topic": "הבנת הנקרא",
    "difficulty": "easy",
    "prompt": "What does Maya’s aunt do?",
    "ref": {
      "id": "english-reading",
      "part": "פסקה 1"
    },
    "choices": [
      "She is a guide.",
      "She is a doctor.",
      "She is a singer.",
      "She is a teacher."
    ],
    "correct": 0,
    "explanation": {
      "he": "בפסקה 1 נאמר שדודתה של מאיה מדריכה."
    }
  },
  {
    "id": "english-03",
    "type": "truefalse",
    "topic": "הבנת הנקרא",
    "difficulty": "easy",
    "prompt": "Maya’s aunt works on Sundays.",
    "ref": {
      "id": "english-reading",
      "part": "פסקה 2"
    },
    "choices": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": {
      "he": "בפסקה 2 נאמר שהיא אינה עובדת בימי ראשון."
    }
  },
  {
    "id": "english-04",
    "type": "mcq",
    "topic": "הבנת הנקרא",
    "difficulty": "easy",
    "prompt": "What does Maya do before a journey?",
    "ref": {
      "id": "english-reading",
      "part": "פסקה 2"
    },
    "choices": [
      "She fills in a form.",
      "She buys a boat.",
      "She closes the club.",
      "She cooks a meal."
    ],
    "correct": 0,
    "explanation": {
      "he": "בפסקה 2 נאמר שלפני כל מסע מאיה ממלאת טופס."
    }
  },
  {
    "id": "english-05",
    "type": "open",
    "topic": "הבנת הנקרא",
    "difficulty": "easy",
    "prompt": "Why does Maya admire her aunt? Give TWO reasons from the text.",
    "ref": {
      "id": "english-reading",
      "part": "פסקה 3"
    },
    "modelAnswer": "Her aunt is careful and helps people. She listens to everyone and makes each person feel welcome.",
    "rubric": [
      "מציין שתי סיבות שונות מתוך פסקה 3",
      "מסביר אותן באנגלית במשפטים מובנים"
    ],
    "maxScore": 10
  },
  {
    "id": "english-06",
    "type": "mcq",
    "topic": "אוצר מילים",
    "difficulty": "easy",
    "prompt": "Choose the Hebrew meaning of “journey”.",
    "ref": {
      "id": "english-vocabulary-12",
      "part": "אוצר מילים — עמוד 12"
    },
    "choices": [
      "מסע",
      "גשר",
      "בחירה",
      "סכנה"
    ],
    "correct": 0,
    "explanation": {
      "he": "בתרגול אוצר המילים בעמוד 12, journey פירושו מסע."
    }
  },
  {
    "id": "english-07",
    "type": "mcq",
    "topic": "אוצר מילים",
    "difficulty": "easy",
    "prompt": "Choose the word that means “זהיר”.",
    "ref": {
      "id": "english-vocabulary-12",
      "part": "אוצר מילים — עמוד 12"
    },
    "choices": [
      "careful",
      "wide",
      "usual",
      "possible"
    ],
    "correct": 0,
    "explanation": {
      "he": "בתרגול עמוד 12, careful פירושו זהיר."
    }
  },
  {
    "id": "english-08",
    "type": "mcq",
    "topic": "אוצר מילים",
    "difficulty": "easy",
    "prompt": "Choose the word that means “ארוחה”.",
    "ref": {
      "id": "english-vocabulary-20",
      "part": "אוצר מילים — עמוד 20"
    },
    "choices": [
      "meal",
      "bowl",
      "guide",
      "world"
    ],
    "correct": 0,
    "explanation": {
      "he": "בתרגול עמוד 20, meal פירושו ארוחה."
    }
  },
  {
    "id": "english-09",
    "type": "mcq",
    "topic": "אוצר מילים",
    "difficulty": "medium",
    "prompt": "Choose the best word: “I want to ___ the school club.”",
    "ref": {
      "id": "english-vocabulary-28",
      "part": "אוצר מילים — עמוד 28"
    },
    "choices": [
      "join",
      "feed",
      "receive",
      "serve"
    ],
    "correct": 0,
    "explanation": {
      "he": "בתרגול עמוד 28, join פירושו להצטרף; מצטרפים למועדון."
    }
  },
  {
    "id": "english-10",
    "type": "mcq",
    "topic": "חלקי דיבר",
    "difficulty": "medium",
    "prompt": "In “The guide helps visitors”, what is the part of speech of “guide”?",
    "ref": {
      "id": "english-teacher-material",
      "part": "חלקי דיבר"
    },
    "choices": [
      "Noun",
      "Verb",
      "Adjective"
    ],
    "correct": 0,
    "explanation": {
      "he": "guide מציין אדם ולכן הוא שם עצם במשפט הזה."
    }
  },
  {
    "id": "english-11",
    "type": "mcq",
    "topic": "חלקי דיבר",
    "difficulty": "medium",
    "prompt": "In “The children walk to school”, what is the part of speech of “walk”?",
    "ref": {
      "id": "english-teacher-material",
      "part": "חלקי דיבר"
    },
    "choices": [
      "Verb",
      "Noun",
      "Adjective"
    ],
    "correct": 0,
    "explanation": {
      "he": "walk מתאר פעולה ולכן הוא פועל."
    }
  },
  {
    "id": "english-12",
    "type": "mcq",
    "topic": "חלקי דיבר",
    "difficulty": "medium",
    "prompt": "In “She is a careful guide”, what is the part of speech of “careful”?",
    "ref": {
      "id": "english-teacher-material",
      "part": "חלקי דיבר"
    },
    "choices": [
      "Adjective",
      "Noun",
      "Verb"
    ],
    "correct": 0,
    "explanation": {
      "he": "careful מתאר את המדריכה ולכן הוא שם תואר."
    }
  },
  {
    "id": "english-13",
    "type": "mcq",
    "topic": "הווה פשוט — חיוב",
    "difficulty": "medium",
    "prompt": "Choose the correct form: “My aunt ___ near the river every day.”",
    "ref": {
      "id": "english-teacher-material",
      "part": "הווה פשוט — חיוב"
    },
    "choices": [
      "walks",
      "walk",
      "walking",
      "are walk"
    ],
    "correct": 0,
    "explanation": {
      "he": "בהווה פשוט מוסיפים s לפועל עם נושא בגוף שלישי יחיד, כמו my aunt."
    }
  },
  {
    "id": "english-14",
    "type": "mcq",
    "topic": "הווה פשוט — חיוב",
    "difficulty": "medium",
    "prompt": "Choose the correct form: “The children ___ English at school.”",
    "ref": {
      "id": "english-teacher-material",
      "part": "הווה פשוט — חיוב"
    },
    "choices": [
      "study",
      "studies",
      "studying",
      "is study"
    ],
    "correct": 0,
    "explanation": {
      "he": "עם נושא ברבים משתמשים בצורת הבסיס study."
    }
  },
  {
    "id": "english-15",
    "type": "mcq",
    "topic": "הווה פשוט — שלילה",
    "difficulty": "medium",
    "prompt": "Choose the correct form: “Maya ___ work on Sundays.”",
    "ref": {
      "id": "english-teacher-material",
      "part": "הווה פשוט — שלילה"
    },
    "choices": [
      "doesn’t",
      "don’t",
      "isn’t",
      "aren’t"
    ],
    "correct": 0,
    "explanation": {
      "he": "עם Maya משתמשים ב־doesn’t ואחריו פועל בצורת הבסיס."
    }
  },
  {
    "id": "english-16",
    "type": "truefalse",
    "topic": "הווה פשוט — שלילה",
    "difficulty": "medium",
    "prompt": "Is this sentence grammatically correct? “They don’t lives in a city.”",
    "ref": {
      "id": "english-teacher-material",
      "part": "הווה פשוט — שלילה"
    },
    "choices": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": {
      "he": "אחרי don’t הפועל בצורת הבסיס: They don’t live in a city."
    }
  },
  {
    "id": "english-17",
    "type": "mcq",
    "topic": "הווה פשוט — שאלות",
    "difficulty": "hard",
    "prompt": "Choose the correct question.",
    "ref": {
      "id": "english-teacher-material",
      "part": "הווה פשוט — שאלות"
    },
    "choices": [
      "Does your aunt help visitors?",
      "Does your aunt helps visitors?",
      "Do your aunt help visitors?",
      "Your aunt does help visitors?"
    ],
    "correct": 0,
    "explanation": {
      "he": "שאלה עם your aunt נפתחת ב־Does ואחריו הנושא ופועל הבסיס help."
    }
  },
  {
    "id": "english-18",
    "type": "truefalse",
    "topic": "הווה פשוט — שאלות",
    "difficulty": "hard",
    "prompt": "Is this sentence grammatically correct? “Do the children study English every day?”",
    "ref": {
      "id": "english-teacher-material",
      "part": "הווה פשוט — שאלות"
    },
    "choices": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": {
      "he": "עם children משתמשים ב־Do, ואחריו הנושא ופועל הבסיס study."
    }
  },
  {
    "id": "english-19",
    "type": "open",
    "topic": "הווה פשוט — שאלות ושלילה",
    "difficulty": "hard",
    "prompt": "Use “Maya visits the village every week.” Write (1) a negative sentence and (2) a Yes/No question.",
    "ref": {
      "id": "english-teacher-material",
      "part": "הווה פשוט — שאלות"
    },
    "modelAnswer": "Maya does not visit the village every week. Does Maya visit the village every week?",
    "rubric": [
      "שלילה עם does not או doesn’t ו־visit בצורת הבסיס",
      "שאלה עם Does ואז Maya ו־visit",
      "שומר על משמעות המשפט וסימני פיסוק"
    ],
    "maxScore": 10
  },
  {
    "id": "english-20",
    "type": "open",
    "topic": "כתיבה",
    "difficulty": "hard",
    "prompt": "A person I admire: Write 5–6 sentences in English about a person you admire. Say who the person is, describe what they do regularly, and explain why you admire them. Use the Present Simple.",
    "ref": {
      "id": "english-teacher-material",
      "part": "כתיבה — אדם שאני מעריך"
    },
    "modelAnswer": "I admire my sister. She is kind and careful. She studies every day. She helps me with my homework. She does not give up when work is difficult. I admire her because she always helps other people.",
    "rubric": [
      "מציג את האדם והקשר אליו",
      "מתאר פעילות שגרתית בהווה פשוט",
      "נותן סיבה להערכה",
      "כותב 5–6 משפטים באנגלית מובנת",
      "משתמש נכון ככל האפשר בצורות ההווה הפשוט"
    ],
    "maxScore": 10
  }
];
  const $ = id => document.getElementById(id);
  // Questions come from GET /api/exams/english-v1-practice only when identical to the inline array above
  // (drafts are keyed by question id and the server recognises the exam by the prompts); otherwise inline is used.
  const inlineQuestions = questions;
  const apiQuestions = questions.map(({ modelAnswer, rubric, maxScore, ...question }) => question);
  const contentApi = window.ContentApi;
  (contentApi && contentApi.useApi()
    ? contentApi.loadContent('exams/english-v1-practice', null, { valid: exam => contentApi.examFromApi(exam, apiQuestions) !== null })
      .then(() => inlineQuestions, () => inlineQuestions)
    : Promise.resolve(inlineQuestions)
  ).then(questions => {
  const storageKey = 'english-exam-draft-v1';
  const examId = 'english-v1-practice';
  const refNames = { 'english-reading': 'טקסט התרגול', 'english-teacher-material': 'חומר המורה', 'english-vocabulary-12': 'אוצר מילים בעמוד 12', 'english-vocabulary-20': 'אוצר מילים בעמוד 20', 'english-vocabulary-28': 'אוצר מילים בעמוד 28' };
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
  let grading = validOrder && saved.grading && typeof saved.grading === 'object' ? saved.grading : { status: 'none', scores: {} };
  let advanceTimer = 0;
  if (!$('student-name').value) $('student-name').value = typeof saved.name === 'string' ? saved.name.slice(0, 100) : '';
  $('article-copy').innerHTML = $('article').innerHTML;
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
    try { sessionStorage.setItem(storageKey, JSON.stringify({ name: $('student-name').value, order, choiceOrders, answers, flags: [...flags], locked: [...locked], current, finished, sent, grading, startedAt, finishedAt })); } catch (_) {}
  }
  // Visible timer (docs/TESTING.md §6): counts up from the stored start time, so a reload keeps it running.
  const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
  setInterval(() => { if (startedAt && !finished) $('timer').textContent = clock(Date.now() - Date.parse(startedAt)); }, 1000);
  // After a submitted answer the verdict stays on screen for a moment, then the next question opens.
  const advance = q => { clearTimeout(advanceTimer); advanceTimer = setTimeout(() => { if (ordered[current] === q) current === 19 ? review() : questionAt(current + 1); }, 1500); };
  function show(id, focusId) {
    clearTimeout(advanceTimer);
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
    $('question-title').dir = 'ltr'; $('choices').dir = 'ltr'; $('answer').dir = 'ltr';
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
    const missing = ordered.filter(q => !answered(q) || !isLocked(q)).length;
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
    // Final score once the open answers were checked (auto points + the checker's points); otherwise a partial score.
    const checked = grading.status === 'ok';
    const aiPoints = checked ? Object.values(grading.scores).reduce((sum, item) => sum + (Number(item.score) || 0), 0) : 0;
    $('score').textContent = checked ? `ציון: ${Math.min(100, Math.max(0, score.earned + Math.round(aiPoints)))} מתוך 100.`
      : `ציון חלקי: ${score.earned} מתוך ${100 - score.pending} נקודות · ${score.pending} נקודות מהשאלות הפתוחות עדיין לא נבדקו.`;
    $('done-banner').hidden = !sent; $('retry').hidden = !sent; $('regrade').hidden = !(sent && grading.status === 'failed');
    if (sent) {
      const queued = grading.status === 'pending';
      $('done-banner').querySelector('strong').textContent = queued ? 'סיימתם! התשובות נשמרו.' : 'סיימתם! התשובות נשלחו למורה.';
      $('send-status').textContent = queued ? 'התשובות נבדקות. המורה תקבל את הציון הסופי בדוא״ל לאחר השלמת הבדיקה.' : '';
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
        source.textContent = `מקור: ${q.ref.part} בחומר הלימוד`; card.append(source);
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
        body: JSON.stringify({ exam: examId, name: $('student-name').value.trim(), attempt: attemptNumber(examId, $('student-name').value.trim()), answers: ordered.map(q => ({ questionId: q.id, question: q.prompt, answer: answerText(q), ...answerDetails(q), ...(q.type === 'open' ? {} : { correct: isCorrect(q) }) })), score: { earned: lastScore.earned, pending: lastScore.pending }, ...(startedAt && finishedAt ? { startedAt, finishedAt } : {}) }), signal: AbortSignal.timeout(45000)
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error('Submission failed');
      countAttempt(examId, $('student-name').value.trim());
      // The answers are with the teacher: the draft stays only as a locked, read-only summary (a reload shows it again).
      sent = true;
      grading = data.grading && typeof data.grading === 'object' ? { status: data.grading.status, scores: data.grading.scores || {}, submissionRef: typeof data.submissionRef === 'string' ? data.submissionRef : '' } : { status: 'none', scores: {} };
      try { sessionStorage.setItem('english-exam-result-v1', JSON.stringify({ startedAt, finishedAt, total: 20, score: { earned: lastScore.earned, pending: lastScore.pending } })); } catch (_) {}
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
        body: JSON.stringify({ exam: examId, ...(grading.submissionRef ? { submissionRef: grading.submissionRef } : {}), answers: ordered.filter(q => q.type === 'open').map(q => ({ questionId: q.id, question: q.prompt, answer: answerText(q) })) }), signal: AbortSignal.timeout(45000)
      });
      const data = await response.json();
      if (!response.ok || data.grading?.status !== 'ok') throw new Error('Grading failed');
      grading = { status: 'ok', scores: data.grading.scores || {}, submissionRef: grading.submissionRef }; persist(); results();
    } catch (_) { $('send-status').textContent = 'הבדיקה לא הצליחה. אפשר לנסות שוב.'; }
    finally { $('regrade').disabled = false; }
  });
  if (finished && ordered.every(answered)) { results(); if (!sent) sendExam(); }
  });
})();
