import { initTerminal } from './code-terminal.js';

const comparisons = {
  '>=': { test: (a, b) => a >= b, words: 'at least' },
  '>': { test: (a, b) => a > b, words: 'greater than' },
  '==': { test: (a, b) => a === b, words: 'equal to' },
  '<': { test: (a, b) => a < b, words: 'less than' },
  '<=': { test: (a, b) => a <= b, words: 'at most' },
  '!=': { test: (a, b) => a !== b, words: 'not equal to' }
};

export function evaluateExample(scoreText, operator, thresholdText) {
  const values = [scoreText, thresholdText];
  if (values.some((value) => String(value).trim() === '' || !Number.isInteger(Number(value)) || Number(value) < 0 || Number(value) > 100)) return null;
  if (!Object.hasOwn(comparisons, operator)) return null;
  const [score, threshold] = values.map(Number);
  const result = comparisons[operator].test(score, threshold);
  return { score, threshold, operator, result, words: comparisons[operator].words, branch: result ? 'if' : 'else', output: result ? 'You passed!' : 'Keep practicing!' };
}

export function executionSteps(example, language = 'en') {
  const { score, threshold, operator, result, branch, output } = example;
  if (language === 'he') return [
    { line: 'input', description: `שלב 1 · שומרים ${score} במשתנה score.` },
    { line: 'condition', description: `שלב 2 · ${score} ${hebrewComparisons[operator]} ${threshold}? התנאי ${result ? 'מתקיים (True)' : 'אינו מתקיים (False)'}.` },
    { line: result ? 'true' : 'false', description: `שלב 3 · מבצעים ${branch}: “${output}”. מדלגים על הענף האחר.` },
    { line: 'end', description: 'שלב 4 · מדפיסים “Next lesson” אחרי כל אחד מהענפים.' }
  ];
  return [
    { line: 'input', description: `1 of 4 · Store ${score} in score.` },
    { line: 'condition', description: `2 of 4 · ${score} ${operator} ${threshold} is ${result ? 'True' : 'False'}.` },
    { line: result ? 'true' : 'false', description: `3 of 4 · Run ${branch}: “${output}”. Skip the other branch.` },
    { line: 'end', description: '4 of 4 · Print “Next lesson”, whichever branch ran.' }
  ];
}

const hebrewComparisons = {
  '>=': 'גדול או שווה ל־', '>': 'גדול מ־', '==': 'שווה ל־',
  '<': 'קטן מ־', '<=': 'קטן או שווה ל־', '!=': 'שונה מ־'
};

export const checkpoints = [
  { id: 'condition', prompt: 'What kind of answer does a condition give?', choices: ['True or False', 'Any sentence', 'A random number'], correct: 0, explanation: 'A condition is either True or False. That answer decides which branch runs.', source: 'idea', sourceLabel: 'The idea' },
  { id: 'false', prompt: 'score is 40. The condition is score >= 60. Which branch runs?', choices: ['The if branch', 'The else branch', 'Both branches'], correct: 1, explanation: '40 is below 60, so 40 >= 60 is False. The program skips if and runs else: “Keep practicing!”', source: 'playground', sourceLabel: 'Try below the mark' },
  { id: 'boundary', prompt: 'score is exactly 60. Is score >= 60 True or False?', choices: ['True', 'False'], correct: 0, explanation: 'The >= operator includes equality: 60 is at least 60. The if branch prints “You passed!” With > instead, equality would be False.', source: 'playground', sourceLabel: 'Try exactly the mark' },
  { id: 'exclusive', prompt: 'In this single if / else block, can both branches run on the same check?', choices: ['Yes', 'No'], correct: 1, explanation: 'Only one branch runs per check: if for True, else for False. The condition cannot be both True and False at once.', source: 'idea', sourceLabel: 'The idea' },
  { id: 'continuation', prompt: 'The score is 40. What does the final, unindented line print?', choices: ['Nothing — the program stops at else', 'Next lesson', 'You passed!'], correct: 1, explanation: 'It prints “Next lesson”. This line is outside both branches because it is not indented. It runs after either branch.', source: 'python-notes', sourceLabel: 'Reading the code' }
];

function initLesson() {
  const byId = (id) => document.getElementById(id);
  const scoreInput = byId('score');
  const thresholdInput = byId('threshold');
  const operatorInput = byId('operator');
  const play = byId('play');
  const step = byId('step');
  const restart = byId('restart');
  const hebrewInstructions = byId('hebrew-instructions');
  const scoreSlider = byId('score-slider');
  const hebrewCopy = {
    task: 'שנו את הציון ולחצו על הפעלה.', score: 'ציון', rule: 'שינוי התנאי',
    comparison: 'השוואה', threshold: 'סף', help: 'איך זה עובד?',
    input_help: 'מספרים שלמים: 0–100.', preset75: '75', preset40: '40', preset60: '60',
    view_code: 'קוד Python', view_path: 'לוח הבחירה', code_heading: 'PYTHON', output_heading: 'המחשב אומר',
    step_input: 'ערך', step_check: 'בדיקה', step_branch: 'בחירה', step_continue: 'המשך',
    learn_label: 'לומדים', playground_label: 'מתנסים', write_label: 'כותבים קוד', check_label: 'בודקים',
    terminal_title: 'עכשיו אתם כותבים את הקוד.', terminal_body: 'Python אמיתי, משימה קטנה אחת בכל פעם. בראשונות לא צריך להקליד בכלל.',
    terminal_step1: 'קראו את הכרטיס הירוק. השורה עם 👉 אומרת על מה ללחוץ.', terminal_step2: 'שנו את הקוד: לחצו על הצעה 💡, או לחצו על שורה והקלידו.', terminal_step3: 'לחצו על ▶ הפעלה וקראו את התשובה של המחשב בחלון התחתון.',
    terminal_what: 'מה שני החלונות הכהים האלה?', terminal_what_body: 'העליון הוא הקוד שלכם: ההוראות שאתם נותנים למחשב, שורה אחרי שורה. התחתון הוא התשובה של המחשב: כשלוחצים על הפעלה הוא קורא את הקוד מלמעלה למטה ומדפיס שם. טקסט אדום אומר שהוא לא הבין שורה אחת, והוא אומר איזו.',
    terminal_to_questions: 'לבדיקה המהירה ←',
    flow_start: 'הציון שלכם', flow_end: 'אחרי כל אחד מהמסלולים', rule_question: 'האם התנאי מתקיים?', yes_path: 'כן · TRUE', no_path: 'לא · FALSE', ready: 'עכשיו כותבים את הקוד ←', question_hint: 'בחרו תשובה וגלו למה.',
    basics_title: 'תנאי אחד. ענף אחד.', basics_body: 'אם התנאי מתקיים (True), מבצעים if. אחרת, מבצעים else.',
    notes_title: 'שני דברים לזכור', note_indent: 'שורות מוזחות שייכות לענף.',
    note_end: 'השורה האחרונה מתבצעת אחרי כל אחד מהענפים.', try_playground: 'נסו בעצמכם ←'
  };
  const instructionNodes = [...document.querySelectorAll('[data-copy]')].map((node) => ({ node, english: node.innerHTML }));
  const comparisonLabels = [...operatorInput.options].map((option) => option.textContent);
  function translateInstructions() {
    const hebrew = instructionLanguage === 'he';
    for (const { node, english } of instructionNodes) {
      node.innerHTML = hebrew ? hebrewCopy[node.dataset.copy] ?? english : english;
      node.lang = instructionLanguage;
      node.dir = hebrew ? 'rtl' : 'ltr';
    }
    [...operatorInput.options].forEach((option, index) => {
      option.textContent = hebrew ? `${option.value} ${hebrewComparisons[option.value]}` : comparisonLabels[index];
    });
  }
  function playbackLabel() {
    const hebrew = instructionLanguage === 'he';
    return timer !== null ? (hebrew ? 'Ⅱ עצירה' : 'Ⅱ Pause')
      : position === 3 ? (hebrew ? '↻ שוב' : '↻ Play again')
        : hebrew ? '▶ הפעלה' : '▶ Play';
  }
  let instructionLanguage = new URLSearchParams(location.search).get('lang') === 'he' ? 'he' : 'en';
  let example;
  let position = -1;
  let timer = null;

  function pause() {
    clearTimeout(timer);
    timer = null;
    play.textContent = playbackLabel();
  }

  function render() {
    const valid = example !== null;
    const live = position === -1;
    const conditionVisible = valid && (live || position >= 1);
    const branchVisible = valid && (live || position >= 2);
    const done = valid && (live || position === 3);
    const hebrew = instructionLanguage === 'he';
    const steps = valid ? executionSteps(example, hebrew ? 'he' : 'en') : [];
    const current = !live && valid ? steps[position].line : null;
    document.querySelectorAll('[data-execution-step]').forEach((item) => {
      const active = valid && !live && Number(item.dataset.executionStep) === position;
      item.classList.toggle('active', active);
      item.classList.toggle('done', valid && !live && Number(item.dataset.executionStep) < position);
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-preset]').forEach((button) => button.setAttribute('aria-pressed', String(valid && example.score === Number(button.dataset.preset) && example.threshold === 60 && example.operator === '>=')));
    if (scoreInput.value !== '' && scoreInput.validity.valid) scoreSlider.value = scoreInput.value;
    byId('rule-summary').textContent = `score ${operatorInput.value} ${thresholdInput.value || '?'}`;
    byId('flow-input').textContent = valid ? `${example.score}` : hebrew ? 'בחרו ציון' : 'Enter a score';
    byId('flow-input').dataset.empty = String(!valid);
    byId('flow-condition').textContent = valid ? `${example.score} ${example.operator} ${example.threshold}` : hebrew ? 'ממתינים למספרים תקינים' : 'Waiting for valid numbers';
    byId('condition-result').textContent = conditionVisible ? (example.result ? 'True' : 'False') : hebrew ? 'עוד לא בדקנו' : 'Not checked yet';
    byId('output-branch').textContent = branchVisible ? example.output : valid ? (hebrew ? 'עדיין אין פלט' : 'No output yet') : (hebrew ? 'הזינו מספרים תקינים' : 'Enter valid numbers to see output.');
    byId('output-end').textContent = done ? 'Next lesson' : '';
    const resultPanel = document.querySelector('.output-panel');
    resultPanel.dataset.result = branchVisible ? (example.result ? 'true' : 'false') : 'waiting';
    byId('result-symbol').textContent = branchVisible ? (example.result ? '✓' : '↻') : '…';
    document.querySelector('.result-next').hidden = !done;
    byId('code-phase').textContent = current ? (hebrew ? ['ערך', 'בדיקה', 'בחירה', 'המשך'][position] : ['Input', 'Check', 'Chosen path', 'Continue'][position]) : (hebrew ? 'דוגמה חיה' : 'Live example');
    byId('code-phase').lang = instructionLanguage;
    document.querySelector('.decision-board').dataset.active = current || 'live';
    document.querySelector('.decision-board').dataset.result = conditionVisible ? String(example.result) : 'waiting';
    byId('code-score').textContent = valid ? example.score : '?';
    byId('code-threshold').textContent = valid ? example.threshold : '?';
    byId('code-operator').textContent = operatorInput.value;
    document.querySelectorAll('[data-line]').forEach((line) => {
      line.classList.toggle('current', line.dataset.line === current);
      line.classList.toggle('skipped', branchVisible && (example.result ? ['else', 'false'] : ['true']).includes(line.dataset.line));
    });
    document.querySelectorAll('[data-node]').forEach((node) => node.classList.toggle('current', node.dataset.node === current));
    for (const [id, truth] of [['true-path', true], ['false-path', false]]) {
      const path = byId(id);
      const selected = conditionVisible && example.result === truth;
      path.classList.toggle('selected', selected);
      path.classList.toggle('inactive', conditionVisible && !selected);
      const state = path.querySelector('.branch-state');
      state.textContent = conditionVisible ? (selected ? (branchVisible ? (hebrew ? 'מתבצע' : 'Runs') : (hebrew ? 'יתבצע' : 'Will run')) : (hebrew ? 'מדלגים' : 'Skipped')) : (hebrew ? 'ממתינים' : 'Waiting');
      state.lang = instructionLanguage;
      state.dir = hebrew ? 'rtl' : 'ltr';
    }
    const description = byId('step-description');
    description.lang = hebrew ? 'he' : 'en';
    description.dir = hebrew ? 'rtl' : 'ltr';
    const invalidMessage = hebrew ? 'הזינו מספר שלם בין 0 ל־100.' : 'Use a whole number: 0–100.';
    description.textContent = !valid ? invalidMessage : live
      ? hebrew ? `התנאי ${example.result ? 'מתקיים (True)' : 'אינו מתקיים (False)'} · ענף ${example.branch}`
        : `${example.score} ${example.operator} ${example.threshold} → ${example.result ? 'True' : 'False'} → ${example.branch}`
      : steps[position].description;
    const error = byId('input-error');
    error.textContent = valid ? '' : invalidMessage;
    error.lang = instructionLanguage;
    error.dir = hebrew ? 'rtl' : 'ltr';
    play.disabled = !valid;
    play.textContent = playbackLabel();
    step.textContent = hebrew ? 'השלב הבא ←' : 'Next step →';
    step.lang = restart.lang = play.lang = instructionLanguage;
    step.dir = restart.dir = play.dir = hebrew ? 'rtl' : 'ltr';
    restart.textContent = hebrew ? '↺ התחלה מחדש' : '↺ Reset';
    restart.setAttribute('aria-label', hebrew ? 'התחלת האנימציה מחדש' : 'Restart animation');
    step.disabled = !valid || position === 3;
    restart.disabled = !valid;
  }

  function update() {
    pause();
    position = -1;
    example = evaluateExample(scoreInput.value, operatorInput.value, thresholdInput.value);
    byId('input-error').hidden = example !== null;
    for (const input of [scoreInput, thresholdInput]) {
      const valid = input.value !== '' && input.validity.valid;
      input.setAttribute('aria-invalid', String(!valid));
    }
    render();
  }

  function advance() {
    position = Math.min(3, position + 1);
    render();
  }

  function schedule() {
    timer = setTimeout(() => {
      advance();
      if (position < 3) schedule();
      else pause();
    }, 3000);
  }

  play.addEventListener('click', () => {
    if (timer !== null) return pause();
    document.querySelector('.execution-layout').scrollIntoView({ block: 'start' });
    if (position === 3) position = -1;
    if (position === -1) advance();
    schedule();
    play.textContent = playbackLabel();
  });
  step.addEventListener('click', () => { pause(); advance(); });
  restart.addEventListener('click', () => { pause(); position = 0; render(); });
  for (const input of [scoreInput, thresholdInput, operatorInput]) input.addEventListener('input', update);
  scoreSlider.addEventListener('input', () => { scoreInput.value = scoreSlider.value; update(); });
  document.querySelectorAll('[data-preset]').forEach((button) => button.addEventListener('click', () => {
    scoreInput.value = button.dataset.preset;
    thresholdInput.value = '60';
    operatorInput.value = '>=';
    update();
  }));
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('pagehide', pause);
  function applyInstructionLanguage() {
    document.querySelectorAll('[data-language]').forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.language === instructionLanguage)));
    hebrewInstructions.hidden = instructionLanguage !== 'he';
    byId('english-instructions').hidden = instructionLanguage === 'he';
    document.querySelectorAll('a[href^="explanations.html"]').forEach((link) => { link.href = `explanations.html?lang=${instructionLanguage}#computer-science`; });
    translateInstructions();
  }
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
    instructionLanguage = button.dataset.language;
    const url = new URL(location.href);
    url.searchParams.set('lang', instructionLanguage);
    history.replaceState(null, '', url);
    applyInstructionLanguage();
    render();
    terminal.render();
  }));
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
    document.querySelector('.execution-layout').dataset.mobileView = button.dataset.view;
    document.querySelectorAll('[data-view]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  }));
  const stageIds = ['idea', 'playground', 'terminal', 'questions'];
  function showStage() {
    const anchor = location.hash.slice(1);
    const active = anchor === 'python-notes' ? 'idea' : stageIds.includes(anchor) ? anchor : 'idea';
    document.querySelectorAll('.lesson-section').forEach((section) => {
      section.hidden = section.id !== active && !(active === 'idea' && section.id === 'python-notes');
    });
    document.querySelectorAll('.lesson-nav a').forEach((link) => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    if (active !== 'playground') pause();
    if (stageIds.includes(anchor) || anchor === 'python-notes') byId(anchor).scrollIntoView({ block: 'start' });
  }
  const terminal = initTerminal({ getLanguage: () => instructionLanguage });
  window.addEventListener('hashchange', showStage);
  showStage();
  applyInstructionLanguage();
  update();

  let questionIndex = 0;
  const answered = new Set();
  const questionCards = [];
  const nextQuestion = byId('next-question');
  function showQuestion(focus = false) {
    const finished = questionIndex === checkpoints.length;
    questionCards.forEach((card, i) => { card.hidden = i !== questionIndex; });
    byId('check-complete').hidden = !finished;
    byId('question-controls').hidden = finished;
    byId('question-progress-label').textContent = finished ? '5 of 5 explored' : `Question ${questionIndex + 1} of ${checkpoints.length}`;
    byId('question-progress').value = answered.size;
    byId('previous-question').disabled = questionIndex === 0;
    nextQuestion.disabled = !answered.has(questionIndex);
    nextQuestion.textContent = questionIndex === checkpoints.length - 1 ? 'Finish check ✓' : 'Continue →';
    if (focus) {
      const target = finished ? byId('check-complete') : questionCards[questionIndex].querySelector('legend');
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'nearest' });
    }
  }
  byId('previous-question').addEventListener('click', () => { questionIndex--; showQuestion(true); });
  nextQuestion.addEventListener('click', () => { questionIndex++; showQuestion(true); });
  byId('restart-questions').addEventListener('click', () => {
    for (const card of questionCards) {
      card.querySelectorAll('input').forEach((radio) => { radio.disabled = false; radio.checked = false; });
      card.querySelectorAll('label').forEach((label) => label.classList.remove('correct-answer', 'wrong-answer'));
      card.querySelectorAll('.answer-marker').forEach((marker) => { marker.textContent = ''; });
      card.querySelector('.answer-feedback').replaceChildren();
    }
    answered.clear();
    questionIndex = 0;
    showQuestion(true);
  });
  for (const [index, question] of checkpoints.entries()) {
    const card = document.createElement('article');
    card.className = 'question-card';
    // All markup comes from this module's fixed lesson content, never learner input.
    card.innerHTML = `<div class="question-count">QUESTION ${index + 1} / ${checkpoints.length}</div><fieldset><legend>${question.prompt}</legend><div class="answer-options">${question.choices.map((choice, i) => `<label class="answer-option"><input type="radio" name="${question.id}" value="${i}"><span>${choice}</span><span class="answer-marker" aria-hidden="true"></span></label>`).join('')}</div></fieldset><div class="answer-feedback" role="status" aria-live="polite" aria-atomic="true"></div>`;
    const feedback = card.querySelector('.answer-feedback');
    const radios = [...card.querySelectorAll('input')];
    card.addEventListener('change', (event) => {
      if (!radios.includes(event.target)) return;
      const selected = Number(event.target.value);
      radios.forEach((radio, i) => {
        radio.disabled = true;
        const label = radio.closest('label');
        label.classList.toggle('correct-answer', i === question.correct);
        label.classList.toggle('wrong-answer', i === selected && selected !== question.correct);
        label.querySelector('.answer-marker').textContent = i === question.correct ? '✓' : i === selected ? '✕' : '';
      });
      answered.add(index);
      showQuestion();
      feedback.classList.toggle('incorrect', selected !== question.correct);
      feedback.innerHTML = `<strong>${selected === question.correct ? '✓ Correct!' : '✕ Not quite.'} The answer: ${question.choices[question.correct]}.</strong><p>${question.explanation}</p><a href="#${question.source}">Revisit: ${question.sourceLabel} ↑</a><br><button type="button">Try again</button>`;
      const retry = feedback.querySelector('button');
      // Keep keyboard users next to the feedback after the selected radio locks.
      nextQuestion.focus({ preventScroll: true });
      retry.addEventListener('click', () => {
        for (const radio of radios) {
          radio.disabled = false;
          radio.checked = false;
          radio.closest('label').classList.remove('correct-answer', 'wrong-answer');
          radio.closest('label').querySelector('.answer-marker').textContent = '';
        }
        feedback.replaceChildren();
        answered.delete(index);
        showQuestion();
        radios[0].focus({ preventScroll: true });
      });
    });
    byId('question-list').append(card);
    questionCards.push(card);
  }
  showQuestion();
}

if (typeof document !== 'undefined') initLesson();
