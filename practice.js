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

const byId = id => document.getElementById(id);
const selectedQuiz = quizzes[new URLSearchParams(location.search).get('quiz')];
let position = 0;
let score = 0;
let answered = false;

if (!selectedQuiz) {
  byId('quiz-title').textContent = 'התרגול לא נמצא';
  byId('quiz-description').textContent = 'חזרו לדף הראשי ובחרו תרגול מהרשימה.';
  byId('progress-count').textContent = '';
  byId('question-text').textContent = '';
  byId('progress-fill').parentElement.hidden = true;
  byId('question-index').hidden = true;
} else {
  document.title = `${selectedQuiz.title} | מתכוננים למבחן`;
  byId('quiz-title').textContent = selectedQuiz.title;
  byId('quiz-description').textContent = selectedQuiz.description;
  showQuestion();
}

function showQuestion() {
  answered = false;
  const question = selectedQuiz.questions[position];
  const total = selectedQuiz.questions.length;
  byId('progress-count').textContent = `שאלה ${position + 1} מתוך ${total}`;
  byId('question-index').textContent = `שאלה ${position + 1}`;
  byId('question-text').textContent = question.text;
  byId('feedback').hidden = true;
  byId('feedback').classList.remove('incorrect');
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
  const question = selectedQuiz.questions[position];
  const correct = index === question.correct;
  if (correct) score++;

  [...byId('choices').children].forEach((button, choiceIndex) => {
    button.disabled = true;
    if (choiceIndex === question.correct) button.classList.add('correct');
    if (choiceIndex === index && !correct) button.classList.add('incorrect');
  });
  byId('feedback-title').textContent = correct ? 'נכון מאוד!' : 'כמעט!';
  byId('feedback-he').textContent = question.he;
  byId('feedback-en').textContent = `${correct ? 'Correct! ' : 'Not quite. '}${question.en}`;
  byId('feedback').classList.toggle('incorrect', !correct);
  byId('feedback').hidden = false;
  byId('next-button').hidden = false;
}

byId('next-button').addEventListener('click', () => {
  if (!answered || !selectedQuiz) return;
  if (position < selectedQuiz.questions.length - 1) {
    position++;
    showQuestion();
    window.scrollTo(0, 0);
  } else {
    showResult();
  }
});

function showResult() {
  const total = selectedQuiz.questions.length;
  byId('quiz-screen').hidden = true;
  byId('result-screen').hidden = false;
  byId('result-score').textContent = `${score} מתוך ${total} תשובות נכונות`;
  byId('result-message').textContent = score === total
    ? 'מצוין! אפשר לבחור תרגול נוסף או לחזור על השאלות.'
    : 'כל תרגול עוזר ללמוד. נסו שוב וקראו את ההסברים אחרי כל שאלה.';
  window.scrollTo(0, 0);
  byId('result-title').focus();
}

byId('retry-button').addEventListener('click', () => {
  position = 0;
  score = 0;
  byId('result-screen').hidden = true;
  byId('quiz-screen').hidden = false;
  showQuestion();
  window.scrollTo(0, 0);
});
