// The "Write code" stage: an Apple-style editor + terminal where learners type real
// Python if / else programs, run them with the safe interpreter and follow missions.
import { runProgram, describeError, missions, indentLine, suggestions } from './code-runner.js?v=3';

const copy = {
  en: {
    mission_help: 'Need a hand?', extra_tools: 'More things to try (optional)', output_title: 'Program result', expected: 'What you should see', run_task: '▶ Run the code',
    mission: 'MISSION', of: 'of', hint: '💡 Hint', hide_hint: '💡 Hide hint', show: '👀 Show me', reset: '↺ Reset code',
    run: '▶ Run', indent: '⇥ Indent', ideas: '💡 Try a change:', back: '← Back', next: 'Next mission →', finish: 'Finish ✓',
    todo: 'Not done yet', done: '✓ Mission done!', done_step: '🎉 Done! Tap Next mission →', auto_hint: '💡 Here is a hint:', waiting: 'Nothing yet. Press ▶ Run and the computer will answer here.',
    running: '▶ Running your code…', editor_badge: 'YOUR CODE · tap to edit', output_badge: 'THE COMPUTER ANSWERS',
    success: '✓ Mission done! The computer printed exactly what we wanted.', nothing: '(the program printed nothing)',
    not_yet: 'Your code works! But the mission is not done yet. Look at the green card above: what should the computer print? Change the code and press Run again.',
    all_done: 'You wrote real Python with if / else. Next: the quick check.', run_label: 'Run the program', editor_label: 'Python code editor'
  },
  he: {
    mission_help: 'רוצים עזרה?', extra_tools: 'עוד דברים שאפשר לנסות (לא חובה)', output_title: 'תוצאת ההרצה', expected: 'מה אמור להופיע?', run_task: '▶ הפעלת הקוד',
    mission: 'משימה', of: 'מתוך', hint: '💡 רמז', hide_hint: '💡 הסתרת הרמז', show: '👀 הראו לי', reset: '↺ איפוס הקוד',
    run: '▶ הפעלה', indent: '⇥ הזחה', ideas: '💡 נסו שינוי:', back: '→ חזרה', next: 'למשימה הבאה ←', finish: 'סיום ✓',
    todo: 'אפשר לנסות בנחת', done: '✓ המשימה הושלמה!', done_step: '🎉 כל הכבוד! לחצו על למשימה הבאה', auto_hint: '💡 הנה רמז:', waiting: 'עדיין כלום. לחצו על ▶ הפעלה והמחשב יענה כאן.',
    running: '▶ מריץ את הקוד שלכם…', editor_badge: 'הקוד שלכם · לחצו כדי לערוך', output_badge: 'המחשב עונה',
    success: '✓ המשימה הושלמה! המחשב הדפיס בדיוק מה שרצינו.', nothing: '(התוכנית לא הדפיסה כלום)',
    not_yet: 'הקוד פועל. ננסה עוד שינוי קטן לפי השלבים שבכרטיס. אפשר לפתוח את העזרה בכל רגע.',
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
  let ideaNote = null; // { en, he, before, after } after a suggestion was applied
  let changeAnimation = null;
  let editorChange = null;
  let editorAnimation = null;
  const attempts = missions.map(() => 0); // unsuccessful runs per mission, for the automatic hint

  const language = () => (getLanguage() === 'he' ? 'he' : 'en');
  const text = (key) => copy[language()][key];

  function taskText(node, value) {
    node.replaceChildren(...value.split(/(`[^`]+`)/g).map(part => {
      if (!part.startsWith('`')) return document.createTextNode(part);
      const code = document.createElement('bdi');
      code.dir = 'ltr';
      code.className = 'task-code';
      code.textContent = part.slice(1, -1);
      return code;
    }));
  }

  function clearEditorChange() {
    editorAnimation?.cancel();
    editorAnimation = null;
    editorChange?.remove();
    editorChange = null;
    editor.classList.remove('showing-code-change');
  }

  function syncEditorChange() {
    if (editorChange) editorChange.firstElementChild.style.transform = `translate(${-editor.scrollLeft}px, ${-editor.scrollTop}px)`;
  }

  function showEditorChange(before, after, animate) {
    clearEditorChange();
    let start = 0;
    let end = 0;
    while (start < before.length && start < after.length && before[start] === after[start]) start++;
    while (end < before.length - start && end < after.length - start && before.at(-1 - end) === after.at(-1 - end)) end++;
    if (start === before.length && start === after.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const layer = document.createElement('div');
    layer.className = 'editor-change-view';
    layer.setAttribute('aria-hidden', 'true');
    const code = document.createElement('pre');
    layer.append(code);
    editor.parentElement.append(layer);
    editorChange = layer;
    editor.classList.add('showing-code-change');
    const paint = (source, kind) => {
      const mark = document.createElement('mark');
      mark.className = `editor-change-${kind}`;
      mark.textContent = source.slice(start, source.length - end);
      code.replaceChildren(source.slice(0, start), mark, end ? source.slice(-end) : '', '\n');
      return mark;
    };
    // Reveal the edited line even when a suggestion appends code below the fold.
    const style = getComputedStyle(editor);
    const line = after.slice(0, start).split('\n').length - 1;
    const lineHeight = parseFloat(style.lineHeight);
    const column = start - (after.lastIndexOf('\n', start - 1) + 1);
    editor.scrollTop = Math.max(0, line * lineHeight - editor.clientHeight / 3);
    editor.scrollLeft = Math.max(0, column * parseFloat(style.fontSize) * .6 - editor.clientWidth / 2);
    gutter.scrollTop = editor.scrollTop;
    byId('editor-shell').scrollIntoView({ block: 'center', behavior: 'instant' });
    syncEditorChange();
    const reveal = () => {
      if (editorChange !== layer) return;
      const mark = paint(after, 'after');
      syncEditorChange();
      if (animate && !reduced) editorAnimation = mark.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 600, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
      );
    };
    if (animate && !reduced && before.length > start + end) {
      const mark = paint(before, 'before');
      syncEditorChange();
      // Teaching pace: hold the old token for 1.2s, then fade out/in over 0.6s each.
      // Only the presentation is delayed: Run and editing always use the new code.
      editorAnimation = mark.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { delay: 1200, duration: 600, fill: 'forwards', easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
      );
      editorAnimation.onfinish = reveal;
    } else reveal();
  }

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
    for (const id of ['mission-card', 'idea-row']) {
      byId(id).dir = hebrew ? 'rtl' : 'ltr';
      byId(id).lang = lang;
    }
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
    document.querySelector('.lesson-nav').dir = hebrew ? 'rtl' : 'ltr';
    taskText(byId('mission-title'), mission.title[lang]);
    taskText(byId('mission-task'), mission.task[lang]);
    const steps = byId('mission-step');
    steps.replaceChildren();
    if (completed.has(index)) steps.textContent = text('done_step');
    else {
      const list = document.createElement('ol');
      for (const step of mission.steps[lang]) {
        const item = document.createElement('li');
        taskText(item, step);
        list.append(item);
      }
      steps.append(list);
    }
    const expected = byId('mission-expected');
    const label = document.createElement('strong');
    label.textContent = text('expected');
    const result = document.createElement('span');
    taskText(result, mission.expected[lang]);
    expected.replaceChildren(label, result);
    const actionId = { change: 'number', elif: 'elif', free: 'skeleton' }[mission.id];
    const action = byId('mission-action');
    action.hidden = !actionId || completed.has(index);
    action.dataset.ideaTarget = actionId || '';
    action.textContent = actionId ? suggestions.find(s => s.id === actionId).label[lang] : '';
    action.disabled = actionId ? suggestions.find(s => s.id === actionId).apply(editor.value) === null : false;
    byId('mission-run').textContent = text('run_task');
    byId('mission-run').hidden = completed.has(index);
    byId('mission-run').classList.toggle('primary-button', !actionId);
    byId('mission-continue').textContent = index === missions.length - 1 ? text('finish') : text('next');
    byId('mission-continue').hidden = !completed.has(index);
    if (hintOpen) document.querySelector('.mission-support').open = true;
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
    taskText(hintText, (attempts[index] >= 2 && !completed.has(index) ? text('auto_hint') + ' ' : '') + mission.hint[lang]);
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
    if (!ideaNote) clearEditorChange();
    changeAnimation?.cancel();
    changeAnimation = null;
    note.replaceChildren();
    if (ideaNote) {
      const explanation = document.createElement('span');
      explanation.textContent = ideaNote[lang];
      note.append(explanation);
      const before = ideaNote.before.split('\n');
      const after = ideaNote.after.split('\n');
      let start = 0;
      while (start < before.length && start < after.length && before[start] === after[start]) start++;
      let endBefore = before.length;
      let endAfter = after.length;
      while (endBefore > start && endAfter > start && before[endBefore - 1] === after[endAfter - 1]) { endBefore--; endAfter--; }
      const oldCode = before.slice(start, endBefore).join('\n');
      const newCode = after.slice(start, endAfter).join('\n');
      let prefix = 0;
      let suffix = 0;
      while (prefix < oldCode.length && prefix < newCode.length && oldCode[prefix] === newCode[prefix]) prefix++;
      while (suffix < oldCode.length - prefix && suffix < newCode.length - prefix && oldCode.at(-1 - suffix) === newCode.at(-1 - suffix)) suffix++;
      for (const [kind, code, label] of [
        ['before', oldCode, lang === 'he' ? '− לפני השינוי' : '− Before'],
        ['after', newCode, lang === 'he' ? '+ אחרי השינוי' : '+ After']
      ]) {
        const card = document.createElement('span');
        card.className = `code-change code-change-${kind}`;
        const heading = document.createElement('strong');
        heading.textContent = label;
        const snippet = document.createElement('code');
        snippet.dir = 'ltr';
        if (!code) snippet.textContent = lang === 'he' ? '(אין שורות)' : '(no lines)';
        else {
          const mark = document.createElement('mark');
          mark.textContent = code.slice(prefix, code.length - suffix);
          snippet.append(code.slice(0, prefix), mark, suffix ? code.slice(-suffix) : '');
        }
        card.append(heading, snippet);
        note.append(card);
      }
    }
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
  editor.addEventListener('scroll', () => { gutter.scrollTop = editor.scrollTop; syncEditorChange(); });
  editor.addEventListener('pointerdown', clearEditorChange);
  editor.addEventListener('focus', clearEditorChange);
  editor.addEventListener('keydown', (event) => {
    clearEditorChange();
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
  byId('mission-run').addEventListener('click', () => { ideaNote = null; run(); byId('terminal-shell').scrollIntoView({ block: 'nearest', behavior: 'instant' }); });
  byId('mission-continue').addEventListener('click', () => nextButton.click());
  byId('mission-action').addEventListener('click', (event) => {
    const button = ideaButtons.find(button => button.dataset.idea === byId('mission-action').dataset.ideaTarget);
    if (button && !button.disabled) button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: event.detail }));
  });
  const ideaRow = byId('idea-buttons');
  const ideaButtons = suggestions.map((suggestion) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.idea = suggestion.id;
    button.addEventListener('click', (event) => {
      const before = editor.value;
      const change = suggestion.apply(editor.value);
      if (!change) return;
      editor.value = change.source;
      ideaNote = { ...change.note, before, after: change.source };
      lastRun = null;
      render();
      const note = byId('idea-note');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (event.detail > 0) {
        // Keep the old lines readable, then reveal the replacement. The comparison
        // remains visible afterwards; reading it never depends on animation speed.
        const replacement = note.querySelector('.code-change-after');
        changeAnimation = replacement.animate(
          reduced ? [{ opacity: .5 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: reduced ? 120 : 240, delay: reduced ? 0 : 250, fill: 'backwards', easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
        );
      }
      showEditorChange(before, change.source, event.detail > 0);
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
