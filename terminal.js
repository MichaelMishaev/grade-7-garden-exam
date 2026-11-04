import { runProgram, describeError, indentLine } from './code-runner.js';

const editor = document.getElementById('code-editor');
const gutter = document.getElementById('code-gutter');
const output = document.getElementById('terminal-output');
const draftKey = 'prepx-terminal-free-v1';
const starter = `score = 75
if score >= 60:
    print("כל הכבוד!")
else:
    print("ננסה שוב")
`;
let errorLine = 0;
editor.value = starter;

function storageUnavailable() {
  document.getElementById('draft-notice').textContent = 'הקוד רץ במכשיר שלכם ואינו נשלח למורה. שמירת הטיוטה אינה זמינה בדפדפן הזה; העתיקו את הקוד לפני היציאה.';
}
try { editor.value = sessionStorage.getItem(draftKey) ?? starter; } catch { storageUnavailable(); }

function save() {
  try { sessionStorage.setItem(draftKey, editor.value); } catch { storageUnavailable(); }
}
function renderGutter() {
  gutter.replaceChildren(...editor.value.split('\n').map((_, i) => {
    const line = document.createElement('span');
    line.textContent = String(i + 1);
    if (i + 1 === errorLine) line.className = 'gutter-error';
    return line;
  }));
  gutter.scrollTop = editor.scrollTop;
}
function message(text, className = 'terminal-muted') {
  const line = document.createElement('span');
  line.className = `${className} status-text`;
  line.dir = 'rtl';
  line.lang = 'he';
  line.textContent = text;
  output.replaceChildren(line);
}
function edited() {
  errorLine = 0;
  renderGutter();
  save();
  message('הקוד השתנה. לחצו על ▶ הפעלה כדי לראות את הפלט החדש.');
}
function run() {
  save();
  const result = runProgram(editor.value);
  errorLine = result.ok ? 0 : result.error.line;
  renderGutter();
  if (!result.ok) message('✕ ' + describeError(result.error, 'he'), 'terminal-error');
  else if (!result.output.length) message('התוכנית הסתיימה ללא פלט. כדי להציג משהו השתמשו ב־print(...).');
  else output.textContent = result.output.join('\n');
}
function indent() {
  const result = indentLine(editor.value, editor.selectionStart);
  editor.value = result.value;
  editor.setSelectionRange(result.caret, result.caret);
  edited();
  editor.focus({ preventScroll: true });
}
editor.addEventListener('input', edited);
editor.addEventListener('scroll', () => { gutter.scrollTop = editor.scrollTop; });
editor.addEventListener('keydown', event => {
  if (event.key === 'Tab' && !event.shiftKey) {
    event.preventDefault();
    indent();
  } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    run();
  } else if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    const before = editor.value.slice(0, editor.selectionStart);
    const line = before.slice(before.lastIndexOf('\n') + 1);
    const spaces = /^[ ]*/.exec(line)[0] + (line.trimEnd().endsWith(':') ? '    ' : '');
    editor.setRangeText('\n' + spaces, editor.selectionStart, editor.selectionEnd, 'end');
    edited();
  }
});
document.getElementById('indent').addEventListener('click', indent);
document.getElementById('run').addEventListener('click', run);
document.getElementById('reset-code').addEventListener('click', () => {
  editor.value = starter;
  edited();
});
function route() {
  const free = location.hash === '#free';
  document.getElementById('subject-picker').hidden = free;
  document.getElementById('free-workspace').hidden = !free;
  document.title = `${free ? 'כתיבה חופשית' : 'מסוף קוד'} | PrepX`;
  if (free) document.getElementById('free-title').focus({ preventScroll: true });
}
window.addEventListener('hashchange', route);
renderGutter();
message('לחצו על ▶ הפעלה. הפלט של התוכנית יופיע כאן.');
route();
