// The "Write code" stage: an Apple-style editor + terminal where learners type real
// Python if / else programs, run them with the safe interpreter and follow missions.
import { runProgram, describeError, missions, indentLine, suggestions } from './code-runner.js';

const copy = {
  en: {
    mission: 'MISSION', of: 'of', hint: '💡 Hint', hide_hint: '💡 Hide hint', show: '👀 Show me', reset: '↺ Reset code',
    run: '▶ Run', indent: '⇥ Indent', ideas: '💡 Try a change:', back: '← Back', next: 'Next mission →', finish: 'Finish ✓',
    todo: 'Not done yet', done: '✓ Mission done!', done_step: '🎉 Done! Tap Next mission →', auto_hint: '💡 Here is a hint:', waiting: 'Nothing yet. Press ▶ Run and the computer will answer here.',
    running: '▶ Running your code…', editor_badge: 'YOUR CODE · tap to edit', output_badge: 'THE COMPUTER ANSWERS',
    success: '✓ Mission done! The computer printed exactly what we wanted.', nothing: '(the program printed nothing)',
    not_yet: 'Your code works! But the mission is not done yet. Look at the green card above: what should the computer print? Change the code and press Run again.',
    all_done: 'You wrote real Python with if / else. Next: the quick check.', run_label: 'Run the program', editor_label: 'Python code editor'
  },
  he: {
    mission: 'משימה', of: 'מתוך', hint: '💡 רמז', hide_hint: '💡 הסתרת הרמז', show: '👀 הראו לי', reset: '↺ איפוס הקוד',
    run: '▶ הפעלה', indent: '⇥ הזחה', ideas: '💡 נסו שינוי:', back: '→ חזרה', next: 'למשימה הבאה ←', finish: 'סיום ✓',
    todo: 'עוד לא הושלם', done: '✓ המשימה הושלמה!', done_step: '🎉 כל הכבוד! לחצו על למשימה הבאה', auto_hint: '💡 הנה רמז:', waiting: 'עדיין כלום. לחצו על ▶ הפעלה והמחשב יענה כאן.',
    running: '▶ מריץ את הקוד שלכם…', editor_badge: 'הקוד שלכם · לחצו כדי לערוך', output_badge: 'המחשב עונה',
    success: '✓ המשימה הושלמה! המחשב הדפיס בדיוק מה שרצינו.', nothing: '(התוכנית לא הדפיסה כלום)',
    not_yet: 'הקוד שלכם עובד! אבל המשימה עוד לא הושלמה. הסתכלו בכרטיס הירוק למעלה: מה המחשב צריך להדפיס? שנו את הקוד ולחצו שוב על הפעלה.',
    all_done: 'כתבתם Python אמיתי עם if / else. הלאה: הבדיקה המהירה.', run_label: 'הפעלת התוכנית', editor_label: 'עורך קוד Python'
  }
};

export function initTerminal({ getLanguage, onFinish }) {
  const byId = (id) => document.getElementById(id);
  const editor = byId('code-editor');
  const gutter = byId('code-gutter');
  const screen = byId('terminal-output');
  const hintText = byId('mission-hint-text');
  const hintButton = byId('mission-hint');
  const nextButton = byId('mission-next');
  const previousButton = byId('mission-previous');
  const drafts = missions.map((mission) => mission.starter);
  const completed = new Set();
  let index = 0;
  let hintOpen = false;
  let lastRun = null; // { result, passed } for the current mission
  let ideaNote = null; // { en, he } after a suggestion was applied
  const attempts = missions.map(() => 0); // unsuccessful runs per mission, for the automatic hint

  const language = () => (getLanguage() === 'he' ? 'he' : 'en');
  const text = (key) => copy[language()][key];

  function renderGutter() {
    const count = Math.max(1, editor.value.split('\n').length);
    const errorLine = lastRun && !lastRun.result.ok ? lastRun.result.error.line : 0;
    gutter.replaceChildren(...Array.from({ length: count }, (_, i) => {
      const number = document.createElement('span');
      number.textContent = String(i + 1);
      if (i + 1 === errorLine) number.className = 'gutter-error';
      return number;
    }));
    gutter.scrollTop = editor.scrollTop;
  }

  function renderScreen() {
    screen.replaceChildren();
    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.lang = language();
    prompt.dir = language() === 'he' ? 'rtl' : 'ltr';
    prompt.textContent = lastRun ? text('running') : '';
    if (lastRun) screen.append(prompt, '\n');
    if (!lastRun) {
      const idle = document.createElement('span');
      idle.className = 'terminal-muted';
      idle.lang = language();
      idle.dir = language() === 'he' ? 'rtl' : 'ltr';
      idle.textContent = text('waiting');
      screen.append(idle);
      return;
    }
    const { result, passed } = lastRun;
    if (result.ok) {
      if (result.output.length === 0) {
        const empty = document.createElement('span');
        empty.className = 'terminal-muted';
        empty.textContent = text('nothing');
        screen.append(empty, '\n');
      }
      for (const line of result.output) screen.append(line, '\n');
      const verdict = document.createElement('span');
      verdict.className = passed ? 'terminal-success' : 'terminal-note';
      verdict.lang = language();
      verdict.dir = language() === 'he' ? 'rtl' : 'ltr';
      verdict.textContent = passed ? text('success') : text('not_yet');
      screen.append(verdict);
    } else {
      const error = document.createElement('span');
      error.className = 'terminal-error';
      error.lang = language();
      error.dir = language() === 'he' ? 'rtl' : 'ltr';
      error.textContent = '✕ ' + describeError(result.error, language());
      screen.append(error);
    }
  }

  function render() {
    const mission = missions[index];
    const lang = language();
    const hebrew = lang === 'he';
    const finished = index === missions.length;
    byId('mission-card').hidden = finished;
    byId('terminal-complete').hidden = !finished;
    byId('editor-shell').hidden = finished;
    byId('idea-row').hidden = finished;
    byId('terminal-shell').hidden = finished;
    byId('mission-nav').hidden = finished;
    for (const node of document.querySelectorAll('#terminal [data-terminal-copy]')) {
      node.textContent = text(node.dataset.terminalCopy);
      node.lang = lang;
      node.dir = hebrew ? 'rtl' : 'ltr';
    }
    byId('terminal-complete-text').textContent = text('all_done');
    byId('terminal-complete-text').lang = lang;
    byId('terminal-complete-text').dir = hebrew ? 'rtl' : 'ltr';
    if (finished) return;
    byId('mission-label').textContent = `${text('mission')} ${index + 1} ${text('of')} ${missions.length}`;
    byId('mission-title').textContent = mission.title[lang];
    byId('mission-task').textContent = mission.task[lang];
    byId('mission-step').textContent = completed.has(index) ? text('done_step') : mission.step[lang];
    byId('mission-card').dataset.done = String(completed.has(index));
    for (const id of ['mission-label', 'mission-title', 'mission-task', 'mission-step']) { byId(id).lang = lang; byId(id).dir = hebrew ? 'rtl' : 'ltr'; }
    const status = byId('mission-status');
    status.textContent = completed.has(index) ? text('done') : text('todo');
    status.dataset.done = String(completed.has(index));
    status.lang = lang;
    status.dir = hebrew ? 'rtl' : 'ltr';
    hintButton.textContent = hintOpen ? text('hide_hint') : text('hint');
    hintButton.setAttribute('aria-expanded', String(hintOpen));
    hintText.hidden = !hintOpen;
    hintText.textContent = (attempts[index] >= 2 && !completed.has(index) ? text('auto_hint') + ' ' : '') + mission.hint[lang];
    hintText.lang = lang;
    hintText.dir = hebrew ? 'rtl' : 'ltr';
    byId('mission-solution').textContent = text('show');
    byId('mission-reset').textContent = text('reset');
    byId('run').textContent = text('run');
    byId('run').setAttribute('aria-label', text('run_label'));
    byId('indent').textContent = text('indent');
    editor.setAttribute('aria-label', text('editor_label'));
    previousButton.textContent = text('back');
    previousButton.disabled = index === 0;
    nextButton.textContent = index === missions.length - 1 ? text('finish') : text('next');
    nextButton.disabled = !completed.has(index);
    for (const button of [hintButton, byId('mission-solution'), byId('mission-reset'), byId('run'), byId('indent'), previousButton, nextButton]) {
      button.lang = lang;
      button.dir = hebrew ? 'rtl' : 'ltr';
    }
    document.querySelectorAll('[data-mission-dot]').forEach((dot, i) => {
      dot.classList.toggle('done', completed.has(i));
      dot.classList.toggle('current', i === index);
    });
    renderIdeas();
    renderGutter();
    renderScreen();
  }

  function renderIdeas() {
    const lang = language();
    const hebrew = lang === 'he';
    for (const button of ideaButtons) {
      const suggestion = suggestions.find((candidate) => candidate.id === button.dataset.idea);
      button.textContent = suggestion.label[lang];
      button.disabled = suggestion.apply(editor.value) === null;
      button.lang = lang;
      button.dir = hebrew ? 'rtl' : 'ltr';
    }
    const note = byId('idea-note');
    note.hidden = !ideaNote;
    note.textContent = ideaNote ? ideaNote[lang] : '';
    note.lang = lang;
    note.dir = hebrew ? 'rtl' : 'ltr';
  }

  function loadMission(newIndex, focus = false) {
    if (index < missions.length) drafts[index] = editor.value;
    index = newIndex;
    hintOpen = false;
    lastRun = null;
    ideaNote = null;
    if (index < missions.length) editor.value = drafts[index];
    render();
    if (focus && index < missions.length) editor.focus({ preventScroll: true });
    byId('terminal').scrollIntoView({ block: 'start' });
  }

  function run() {
    const mission = missions[index];
    const result = runProgram(editor.value);
    const passed = result.ok && mission.check(result.output, editor.value);
    if (passed) completed.add(index);
    else if (!completed.has(index)) { attempts[index] += 1; if (attempts[index] >= 2) hintOpen = true; }
    lastRun = { result, passed };
    render();
    if (passed) byId('mission-card').scrollIntoView({ block: 'nearest' });
    if (!result.ok && result.error.line) {
      // Put the caret on the offending line so the learner sees where to look.
      const lines = editor.value.split('\n');
      const start = lines.slice(0, result.error.line - 1).reduce((sum, line) => sum + line.length + 1, 0);
      editor.setSelectionRange(start, start + (lines[result.error.line - 1]?.length ?? 0));
    }
  }

  function insertAtCaret(insert) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.setRangeText(insert, start, end, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }

  editor.addEventListener('input', () => { if (lastRun && !lastRun.result.ok) lastRun = null; ideaNote = null; renderGutter(); renderIdeas(); });
  editor.addEventListener('scroll', () => { gutter.scrollTop = editor.scrollTop; });
  editor.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      const { value, caret } = indentLine(editor.value, editor.selectionStart);
      editor.value = value;
      editor.setSelectionRange(caret, caret);
      renderGutter();
    } else if (event.key === 'Enter' && !event.shiftKey && !(event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      const before = editor.value.slice(0, editor.selectionStart);
      const currentLine = before.slice(before.lastIndexOf('\n') + 1);
      const indent = /^[ ]*/.exec(currentLine)[0] + (currentLine.trimEnd().endsWith(':') ? '    ' : '');
      insertAtCaret('\n' + indent);
    } else if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      run();
    }
  });
  byId('indent').addEventListener('click', () => {
    const { value, caret } = indentLine(editor.value, editor.selectionStart);
    editor.value = value;
    editor.setSelectionRange(caret, caret);
    renderGutter();
    editor.focus({ preventScroll: true });
  });
  byId('run').addEventListener('click', () => { ideaNote = null; run(); });
  const ideaRow = byId('idea-buttons');
  const ideaButtons = suggestions.map((suggestion) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.idea = suggestion.id;
    button.addEventListener('click', () => {
      const change = suggestion.apply(editor.value);
      if (!change) return;
      editor.value = change.source;
      ideaNote = change.note;
      lastRun = null;
      render();
      editor.focus({ preventScroll: true });
    });
    ideaRow.append(button);
    return button;
  });
  hintButton.addEventListener('click', () => { hintOpen = !hintOpen; render(); });
  byId('mission-solution').addEventListener('click', () => {
    editor.value = missions[index].solution;
    lastRun = null;
    ideaNote = null;
    render();
    editor.focus({ preventScroll: true });
  });
  byId('mission-reset').addEventListener('click', () => {
    editor.value = missions[index].starter;
    lastRun = null;
    ideaNote = null;
    render();
    editor.focus({ preventScroll: true });
  });
  previousButton.addEventListener('click', () => loadMission(index - 1, true));
  nextButton.addEventListener('click', () => {
    if (index === missions.length - 1) { loadMission(missions.length); onFinish?.(); }
    else loadMission(index + 1, true);
  });
  byId('terminal-restart').addEventListener('click', () => {
    completed.clear();
    attempts.fill(0);
    drafts.forEach((_, i) => { drafts[i] = missions[i].starter; });
    editor.value = missions[0].starter;
    index = 0;
    hintOpen = false;
    lastRun = null;
    ideaNote = null;
    render();
  });

  const dots = document.querySelector('.mission-dots');
  dots.replaceChildren(...missions.map(() => { const dot = document.createElement('span'); dot.setAttribute('data-mission-dot', ''); return dot; }));
  byId('terminal-complete-heading').textContent = `if_else.py — ${missions.length} / ${missions.length}`;
  editor.value = missions[0].starter;
  render();
  return { render };
}
