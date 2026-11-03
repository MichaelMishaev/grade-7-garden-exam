const outputs = { if: 'Great work!', elif: 'You passed!', else: 'Keep practicing!' };
const whole = value => String(value).trim() !== '' && Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) <= 100;
export function evaluateExample(scoreText, firstText = '80', secondText = '60') {
  if (![scoreText, firstText, secondText].every(whole)) return null;
  const [score, first, second] = [scoreText, firstText, secondText].map(Number);
  if (second >= first) return null;
  const firstResult = score >= first;
  const secondResult = firstResult ? null : score >= second;
  const branch = firstResult ? 'if' : secondResult ? 'elif' : 'else';
  return { score, first, second, firstResult, secondResult, branch, output: outputs[branch] };
}
export function executionSteps(example, language = 'en') {
  const he = language === 'he';
  const steps = [
    { id: 'input', description: he ? `שומרים ${example.score} במשתנה score.` : `Store ${example.score} in score.` },
    { id: 'check-if', description: he ? `בודקים if: ${example.score} גדול או שווה ל־${example.first}? ${example.firstResult ? 'כן' : 'לא'}.` : `Check if: ${example.score} >= ${example.first} is ${example.firstResult ? 'True' : 'False'}.` }
  ];
  if (!example.firstResult) steps.push({ id: 'check-elif', description: he ? `בודקים elif: ${example.score} גדול או שווה ל־${example.second}? ${example.secondResult ? 'כן' : 'לא'}.` : `Check elif: ${example.score} >= ${example.second} is ${example.secondResult ? 'True' : 'False'}.` });
  steps.push({ id: example.branch, description: he ? `מבצעים רק ${example.branch}: “${example.output}”.` : `Run only ${example.branch}: “${example.output}”.` });
  steps.push({ id: 'end', description: he ? 'ממשיכים אחרי התנאי: “Next lesson”.' : 'After any path, print “Next lesson”.' });
  return steps;
}
export const checkpoints = [
  { id: 'keyword', correct: 1, source: 'idea', en: { prompt: 'How does Python write “else if”?', choices: ['else if', 'elif', 'elseif'], explanation: 'Python uses elif as one word. It asks another question only after an earlier check is False.' }, he: { prompt: 'איך כותבים “else if” ב־Python?', choices: ['else if', 'elif', 'elseif'], explanation: 'ב־Python כותבים elif כמילה אחת. בודקים אותו רק אחרי שהתנאי הקודם לא התקיים.' } },
  { id: 'first-boundary', correct: 0, source: 'playground', en: { prompt: 'Score 80: which path runs?', choices: ['if', 'elif', 'else'], explanation: '80 >= 80 is True. The if path runs, and elif is not checked.' }, he: { prompt: 'הציון 80: איזה מסלול מתבצע?', choices: ['if', 'elif', 'else'], explanation: '80 גדול או שווה ל־80. מסלול if מתבצע, והתנאי של elif כלל לא נבדק.' } },
  { id: 'second-boundary', correct: 1, source: 'playground', en: { prompt: 'Score 60: which path runs?', choices: ['if', 'elif', 'else'], explanation: '60 >= 80 is False, then 60 >= 60 is True. Only elif runs.' }, he: { prompt: 'הציון 60: איזה מסלול מתבצע?', choices: ['if', 'elif', 'else'], explanation: '60 קטן מ־80, אבל גדול או שווה ל־60. רק מסלול elif מתבצע.' } },
  { id: 'fallback', correct: 2, source: 'playground', en: { prompt: 'Score 40: what is printed first?', choices: ['Great work!', 'You passed!', 'Keep practicing!'], explanation: 'Both checks are False, so else prints “Keep practicing!” The next line then prints “Next lesson”.' }, he: { prompt: 'הציון 40: מה יודפס קודם?', choices: ['Great work!', 'You passed!', 'Keep practicing!'], explanation: 'שני התנאים לא התקיימו. מסלול else מדפיס “Keep practicing!”, ואחריו מודפס “Next lesson”.' } },
  { id: 'first-match', correct: 0, source: 'idea', en: { prompt: 'Score 95 meets both marks. What happens?', choices: ['Only if runs; elif is not checked', 'Both if and elif run', 'Only else runs'], explanation: 'Checks run in order. Once if is True, the rest of this chain is skipped—even though 95 is also at least 60.' }, he: { prompt: 'הציון 95 עובר את שני הספים. מה קורה?', choices: ['רק if מתבצע; elif לא נבדק', 'גם if וגם elif מתבצעים', 'רק else מתבצע'], explanation: 'בודקים לפי הסדר. ברגע שתנאי if מתקיים, מדלגים על שאר השרשרת, גם אם 95 גדול מ־60.' } }
];

function initLesson() {
  const $ = id => document.getElementById(id);
  const heCopy = {
    back: 'להסברים →', learn: 'לומדים', try: 'מתנסים', check: 'בודקים', idea_title: 'עוד שאלה. עדיין רק מסלול אחד.',
    idea_body: 'אם התנאי הראשון לא מתקיים, elif בודק שאלה נוספת. התנאי הראשון שמתקיים קובע.', first: 'בודקים קודם', second: 'רק אם הראשון לא מתקיים', last: 'אם שניהם לא מתקיימים',
    spelling: 'ב־Python כותבים “else if” במילה אחת: elif.', start: 'נסו בעצמכם ←', task: 'שנו את הציון. עקבו אחרי הבדיקות.', score: 'ציון', rules: 'שינוי הספים', first_threshold: 'הסף הראשון', second_threshold: 'הסף השני', threshold_hint: 'הסף השני חייב להיות קטן מהראשון.',
    help: 'איך זה עובד?', help_body: 'נסו 90. שתי ההשוואות יכולות להתקיים, אבל elif לא נבדק: if כבר נבחר.', pace: 'כל שלב נמשך 3 שניות.', input: 'ערך', path: 'מסלול', continue: 'המשך', code: 'קוד Python', board: 'לוח הבחירה', after: 'אחרי כל מסלול', output: 'המחשב אומר', ready: 'לשאלה הבאה ←', question_title: 'איזה מסלול מתבצע?', question_hint: 'בחרו תשובה וגלו למה.', question_rules: 'בשאלות האלה משתמשים בספים ההתחלתיים: קודם 80, ואז 60.', complete: 'שרשרת אחת. מסלול אחד שנבחר.', again: 'מתרגלים שוב', footer: 'בודקים לפי הסדר. מבצעים רק מסלול אחד.'
  };
  const staticCopy = [...document.querySelectorAll('[data-copy]')].map(node => ({ node, english: node.innerHTML }));
  const score = $('score'), first = $('first-threshold'), second = $('second-threshold'), slider = $('score-slider');
  let language = new URLSearchParams(location.search).get('lang') === 'he' ? 'he' : 'en';
  let example = null, position = -1, timer = null, questionIndex = 0;
  const answers = Array(checkpoints.length).fill(null);
  const he = () => language === 'he';
  const text = (en, hebrew) => he() ? hebrew : en;
  const status = value => value === null ? text('Not checked', 'לא נבדק') : value ? 'True' : 'False';
  const pause = () => { clearTimeout(timer); timer = null; $('play').textContent = playLabel(); };
  const playLabel = () => timer !== null ? text('Ⅱ Pause', 'Ⅱ עצירה') : position === (example ? executionSteps(example).length - 1 : -2) ? text('↻ Play again', '↻ שוב') : text('▶ Play', '▶ הפעלה');

  function render() {
    const live = position === -1, trace = example ? executionSteps(example, language) : [];
    const current = !live && example ? trace[position].id : null;
    const phase = id => example && (live || trace.findIndex(step => step.id === id) <= position);
    const firstChecked = phase('check-if');
    const secondChecked = example && !example.firstResult && phase('check-elif');
    const branchRun = example && (live || position >= trace.length - 2);
    const done = example && (live || current === 'end');
    if (whole(score.value)) slider.value = score.value;
    $('code-score').textContent = example ? example.score : '?';
    $('code-first').textContent = whole(first.value) ? first.value : '?';
    $('code-second').textContent = whole(second.value) ? second.value : '?';
    $('first-condition').textContent = example ? `${example.score} >= ${example.first}` : '—';
    $('second-condition').textContent = example ? `${example.score} >= ${example.second}` : '—';
    $('first-result').textContent = firstChecked ? status(example.firstResult) : text('Waiting', 'ממתינים');
    $('second-result').textContent = example?.firstResult && firstChecked ? status(null) : secondChecked ? status(example.secondResult) : text('Waiting', 'ממתינים');
    document.querySelector('[data-node="check-if"]').dataset.result = firstChecked ? String(example.firstResult) : 'unchecked';
    document.querySelector('[data-node="check-elif"]').dataset.result = secondChecked ? String(example.secondResult) : 'unchecked';
    $('check-connection').textContent = !example ? text('Enter a score to start.', 'הזינו ציון כדי להתחיל.') : !firstChecked ? text('Check if first.', 'בודקים קודם את if.') : example.firstResult ? text('if wins → elif is not checked', 'if נבחר ← elif לא נבדק') : text('First False → check elif', 'הראשון לא מתקיים ← בודקים elif');
    for (const branch of ['if', 'elif', 'else']) {
      const card = $(`${branch}-path`), chosen = branchRun && example.branch === branch;
      card.classList.toggle('selected', chosen);
      card.classList.toggle('inactive', branchRun && !chosen);
      card.querySelector('.branch-state').textContent = !branchRun ? text('Waiting', 'ממתינים') : chosen ? live ? text('Chosen', 'נבחר') : text('Runs', 'מתבצע') : text('Skipped', 'מדלגים');
    }
    document.querySelectorAll('[data-node]').forEach(node => node.classList.toggle('current', node.dataset.node === current));
    document.querySelectorAll('[data-line]').forEach(line => {
      const id = line.dataset.line;
      line.classList.toggle('current', id === current);
      line.classList.toggle('skipped', !!branchRun && (['if', 'elif', 'else'].includes(id) && id !== example.branch || example.firstResult && ['check-elif', 'else-keyword'].includes(id) || example.branch === 'elif' && id === 'else-keyword'));
    });
    document.querySelectorAll('[data-progress]').forEach(node => {
      const id = node.dataset.progress === 'branch' ? example?.branch : node.dataset.progress;
      const index = trace.findIndex(step => step.id === id);
      node.classList.toggle('active', current === id);
      node.classList.toggle('done', example && !live && index >= 0 && index < position);
      node.classList.toggle('bypassed', example && node.dataset.progress === 'check-elif' && example.firstResult && firstChecked);
      if (current === id) node.setAttribute('aria-current', 'step'); else node.removeAttribute('aria-current');
    });
    $('output-branch').textContent = branchRun ? example.output : text('No output yet', 'עדיין אין פלט');
    $('output-end').textContent = done ? 'Next lesson' : '';
    document.querySelector('.result-next').hidden = !done;
    document.querySelector('.output-panel').dataset.result = branchRun ? (example.branch === 'if' ? 'true' : 'false') : 'waiting';
    $('code-phase').textContent = live ? text('Live preview', 'תצוגה מיידית') : current || '';
    $('step-description').lang = language; $('step-description').dir = he() ? 'rtl' : 'ltr';
    $('step-description').textContent = !example ? text('Use whole numbers 0–100; second mark below first.', 'הזינו מספרים שלמים 0–100; הסף השני קטן מהראשון.') : live ? text(`Live preview: ${example.score} → ${example.branch}. One path.`, `תצוגה מיידית: ${example.score} ← ${example.branch}. רק מסלול אחד.`) : `${text('Step', 'שלב')} ${position + 1}/${trace.length} · ${trace[position].description}`;
    $('play').disabled = $('restart').disabled = !example;
    $('step').disabled = !example || position === trace.length - 1;
    $('play').textContent = playLabel(); $('step').textContent = text('Next step →', 'השלב הבא ←'); $('restart').textContent = text('↺ Reset', '↺ התחלה מחדש');
    for (const id of ['play', 'step', 'restart']) { $(id).lang = language; $(id).dir = he() ? 'rtl' : 'ltr'; }
    $('input-error').hidden = !!example;
    $('input-error').lang = language; $('input-error').dir = he() ? 'rtl' : 'ltr';
    $('input-error').textContent = example ? '' : text('Use whole numbers 0–100. The second mark must be below the first.', 'הזינו מספרים שלמים בין 0 ל־100. הסף השני חייב להיות קטן מהראשון.');
    for (const button of document.querySelectorAll('[data-preset]')) button.setAttribute('aria-pressed', String(example?.score === Number(button.dataset.preset) && example.first === 80 && example.second === 60));
  }
  function update() {
    pause(); position = -1; example = evaluateExample(score.value, first.value, second.value);
    for (const input of [score, first, second]) input.setAttribute('aria-invalid', String(!whole(input.value) || input !== score && whole(first.value) && whole(second.value) && Number(second.value) >= Number(first.value)));
    render();
  }
  function advance() { position = Math.min(position + 1, executionSteps(example).length - 1); render(); }
  function schedule() { timer = setTimeout(() => { advance(); if (position < executionSteps(example).length - 1) schedule(); else pause(); }, 3000); }
  $('play').addEventListener('click', () => {
    if (timer !== null) return pause();
    if (position === executionSteps(example).length - 1) position = -1;
    if (position === -1) advance();
    schedule(); render();
  });
  $('step').addEventListener('click', () => { pause(); advance(); });
  $('restart').addEventListener('click', () => { pause(); position = 0; render(); });
  for (const input of [score, first, second]) input.addEventListener('input', update);
  slider.addEventListener('input', () => { score.value = slider.value; update(); });
  document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => { score.value = button.dataset.preset; first.value = '80'; second.value = '60'; update(); }));
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    document.querySelector('.execution-layout').dataset.mobileView = button.dataset.view;
    document.querySelectorAll('[data-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
  function applyLanguage() {
    for (const { node, english } of staticCopy) { node.innerHTML = he() ? heCopy[node.dataset.copy] : english; node.lang = language; node.dir = he() ? 'rtl' : 'ltr'; }
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    document.querySelectorAll('.hub-back').forEach(link => { link.href = `explanations.html?lang=${language}#computer-science`; });
    slider.setAttribute('aria-label', text('Score slider', 'בחירת ציון'));
    document.title = text('else if / elif | PrepX', 'תנאי נוסף · elif | PrepX');
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.language; const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url);
    applyLanguage(); render(); showQuestion();
  }));
  function showStage() {
    const stage = ['idea', 'playground', 'questions'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'idea';
    document.querySelectorAll('.lesson-section').forEach(section => { section.hidden = section.id !== stage; });
    document.querySelectorAll('.lesson-nav a').forEach(link => { if (link.hash === `#${stage}`) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current'); });
    if (stage !== 'playground') pause();
  }
  window.addEventListener('hashchange', showStage);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); }); window.addEventListener('pagehide', pause);

  function showQuestion(focus = false) {
    const finished = questionIndex === checkpoints.length;
    $('check-complete').hidden = !finished; $('question-controls').hidden = finished; $('question-card').hidden = finished;
    $('question-progress').value = answers.filter(answer => answer !== null).length;
    $('question-progress-label').textContent = finished ? text('5 of 5 explored', 'סיימתם 5 שאלות') : text(`Question ${questionIndex + 1} of 5`, `שאלה ${questionIndex + 1} מתוך 5`);
    if (finished) return;
    const question = checkpoints[questionIndex], copy = question[language], answer = answers[questionIndex];
    $('question-card').lang = language; $('question-card').dir = he() ? 'rtl' : 'ltr';
    $('question-card').innerHTML = `<fieldset><legend tabindex="-1">${copy.prompt}</legend><div class="answer-options">${copy.choices.map((choice, index) => `<label class="answer-option ${answer !== null && index === question.correct ? 'correct-answer' : answer === index ? 'wrong-answer' : ''}"><input type="radio" name="elif-question" value="${index}" ${answer !== null ? 'disabled' : ''} ${answer === index ? 'checked' : ''}><span dir="auto">${choice}</span><span class="answer-marker" aria-hidden="true">${answer !== null && index === question.correct ? '✓' : answer === index ? '✕' : ''}</span></label>`).join('')}</div></fieldset><div class="answer-feedback ${answer !== null && answer !== question.correct ? 'incorrect' : ''}" role="status" aria-live="polite" aria-atomic="true">${answer === null ? '' : `<strong>${answer === question.correct ? text('✓ Correct!', '✓ נכון!') : text('✕ Not quite.', '✕ לא בדיוק.')} ${text('Answer:', 'התשובה:')} ${copy.choices[question.correct]}</strong><p>${copy.explanation}</p><a href="#${question.source}">${text('See the explanation ↑', 'להסבר ↑')}</a><br><button type="button" data-retry>${text('Try again', 'מנסים שוב')}</button>`}</div>`;
    $('previous-question').disabled = questionIndex === 0;
    $('previous-question').textContent = text('← Back', 'חזרה →');
    $('next-question').disabled = answer === null;
    $('next-question').textContent = questionIndex === 4 ? text('Finish check ✓', 'סיום ✓') : text('Continue →', 'ממשיכים ←');
    if (focus) $('question-card').querySelector('legend').focus({ preventScroll: true });
  }
  $('question-card').addEventListener('change', event => {
    if (!event.target.matches('input[type="radio"]') || answers[questionIndex] !== null) return;
    answers[questionIndex] = Number(event.target.value); showQuestion(); $('next-question').focus({ preventScroll: true });
  });
  $('question-card').addEventListener('click', event => { if (event.target.matches('[data-retry]')) { answers[questionIndex] = null; showQuestion(); $('question-card').querySelector('input').focus({ preventScroll: true }); } });
  $('previous-question').addEventListener('click', () => { questionIndex--; showQuestion(true); });
  $('next-question').addEventListener('click', () => { questionIndex++; showQuestion(true); });
  $('restart-questions').addEventListener('click', () => { answers.fill(null); questionIndex = 0; showQuestion(true); });
  applyLanguage(); update(); showStage(); showQuestion();
}
if (typeof document !== 'undefined') initLesson();
