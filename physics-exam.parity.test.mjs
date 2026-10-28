// All exams share one flow: start → questions → review → results → send → thanks.html. The physics page must be the
// library page (library-exam.html + library-exam.js) with physics content: same screens, ids, classes, button labels,
// name box, results actions and CSS. Only the content-specific elements listed in `physicsOnly` may be added.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { extractContent } from './db/extract.mjs';
import { plainText, matchExam } from './db/submissions.mjs';

const read = (file) => readFileSync(new URL(file, import.meta.url), 'utf8');
const libraryHtml = read('library-exam.html');
const physicsHtml = read('physics-exam.html');
const libraryJs = read('library-exam.js');
const physicsJs = read('physics-exam.js');
const thanks = read('thanks.html');

const body = (html) => html.slice(html.indexOf('<body'));
const attr = (tag, name) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1] ?? null;
const tags = (html, name) => [...body(html).matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map((m) => m[0]);
const stages = (html) => tags(html, 'section').map((t) => [attr(t, 'id'), attr(t, 'class'), attr(t, 'aria-labelledby')]);
const buttons = (html) => [...body(html).matchAll(/<button\b([^>]*)>([^<]*)<\/button>/g)].map(([, a, label]) => [attr(a, 'id'), attr(a, 'class'), attr(a, 'type'), label]);
const ids = (html) => [...body(html).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const section = (html, id) => { const start = body(html).indexOf(`<section id="${id}"`); return body(html).slice(start, body(html).indexOf('</section>', start)); };
const div = (html, cls) => new RegExp(`<div class="${cls}">[\\s\\S]*?</div>`).exec(html)?.[0];
const style = (html) => /<style>[\s\S]*?<\/style>/.exec(html)[0];
// The only additions allowed: the teacher's figure and the numeric answer (number + working).
const physicsOnly = ['figure', 'number-answer-box', 'number-answer', 'work'];

test('same stage sections, in the same order, with the same classes and labels', () => {
  assert.deepEqual(stages(physicsHtml), stages(libraryHtml));
  assert.deepEqual(stages(physicsHtml).map((s) => s[0]), ['start', 'question-stage', 'review', 'results']);
});

test('same buttons: ids, classes, types and labels, in the same order', () => {
  assert.deepEqual(buttons(physicsHtml), buttons(libraryHtml));
  assert.deepEqual(buttons(physicsHtml).map((b) => b[0]), ['begin', 'previous', 'next', 'review-button', 'back-to-questions', 'finish', 'send', 'retry']);
  assert.doesNotMatch(physicsHtml, /primary-button|secondary-button|practice\.css/);
});

test('same element ids; physics adds only its figure and numeric answer field', () => {
  const physics = ids(physicsHtml);
  assert.deepEqual(physics.filter((id) => !physicsOnly.includes(id)), ids(libraryHtml));
  for (const id of physicsOnly) assert.ok(physics.includes(id), id);
});

test('same name box on the start screen, and no name input anywhere else', () => {
  assert.equal(div(physicsHtml, 'name-box'), div(libraryHtml, 'name-box'));
  assert.ok(section(physicsHtml, 'start').includes('id="student-name"'));
  assert.equal(physicsHtml.match(/id="student-name"/g).length, 1);
  for (const id of ['question-stage', 'review', 'results']) assert.doesNotMatch(section(physicsHtml, id), /<input[^>]*(student-name|autocomplete="name")/, id);
});

test('same review and results screens; results differ only in the answer count and the subject link', () => {
  assert.equal(section(physicsHtml, 'review'), section(libraryHtml, 'review'));
  const libraryResults = section(libraryHtml, 'results').replace('subject.html?subject=hebrew">לגרסאות בעברית', 'subject.html?subject=physics">לגרסאות במדעים').replace('כל 20 התשובות', 'כל 27 התשובות');
  assert.equal(section(physicsHtml, 'results'), libraryResults);
  assert.match(section(physicsHtml, 'results'), /השם וכל 27 התשובות נשלחים בדוא״ל למורה באמצעות Resend/);
});

test('same question card structure (progress, study material, topic, title, choices, open answer, flag, actions)', () => {
  const strip = (html) => section(html, 'question-stage')
    .replace(/<div id="figure" hidden><\/div>\n?/, '').replace(/<div id="number-answer-box"[\s\S]*?<\/textarea><\/div>\n?/, '')
    .replace(/<summary>[^<]*<\/summary>/, '<summary/>').replace(/aria-valuemax="\d+"/, '');
  assert.equal(strip(physicsHtml), strip(libraryHtml));
  assert.match(physicsHtml, /aria-valuemax="27"/);
});

test('same CSS: the library style block verbatim, same branding sheet, same header and footer', () => {
  assert.equal(style(physicsHtml), style(libraryHtml));
  assert.match(physicsHtml, /branding\.css\?v=1/);
  const chrome = (html) => [/<a class="prepx-brand"[^\n]*/.exec(html)[0], /<footer[^\n]*/.exec(html)[0], /<header><a class="brand"/.test(html)];
  assert.deepEqual(chrome(physicsHtml), chrome(libraryHtml));
  assert.doesNotMatch(physicsHtml, /אינן נשלחות|לא נשלח|בדיקה עצמית/);
});

test('same behaviour in the scripts: draft, review gate, send, timeout, error text, thanks redirect', () => {
  const same = [
    "if (!$('student-name').value.trim()) { $('name-error').textContent = 'יש לכתוב שם לפני שמתחילים.'; $('student-name').focus(); return; }",
    "if (ordered.some(q => !answered(q))) { $('review-error').textContent = 'יש להשלים את כל התשובות לפני הסיום. השאלות החסרות מסומנות ברשימה.'; return; }",
    "location.hostname === 'michaelmishaev.github.io' ? 'https://hitech.agnon.online/api/submit-exam' : '/api/submit-exam'",
    'signal: AbortSignal.timeout(20000)',
    "if (!response.ok || data.success !== true) throw new Error('Submission failed');",
    "$('send-status').textContent = 'לא התקבל אישור שליחה. הטיוטה נשמרה. בקשו מהמורה לבדוק אם ההודעה הגיעה לפני ניסיון נוסף.';",
    "sending = true; $('send').disabled = true; $('retry').disabled = true;",
    "window.location.assign('thanks.html');",
    "$('retry').addEventListener('click', () => { if (sending) return; try { sessionStorage.removeItem(storageKey); } catch (_) {} location.reload(); });",
    "$('flag').addEventListener('change', () => { const id = ordered[current].id; $('flag').checked ? flags.add(id) : flags.delete(id); persist(); });",
    "${flags.has(q.id) ? ' · ⚑ לבדיקה חוזרת' : ''}",
    "source.className = 'source-line';"
  ];
  for (const line of same) {
    assert.ok(libraryJs.includes(line), `library: ${line}`);
    assert.ok(physicsJs.includes(line), `physics: ${line}`);
  }
  assert.match(physicsJs, /exam: examId, name: \$\('student-name'\)\.value\.trim\(\)/);
  assert.match(physicsJs, /sessionStorage\.setItem\('physics-exam-result-v1'/);
  assert.match(libraryJs, /sessionStorage\.setItem\('library-exam-result-v1'/);
  const results = (js) => js.slice(js.indexOf('function results()'), js.indexOf("$('student-name').addEventListener"));
  for (const js of [libraryJs, physicsJs]) assert.doesNotMatch(results(js), /createElement\('a'\)|show\('start'/); // source lines are plain text
});

test('thanks.html clears every exam draft and shows the summary of the exam sent last', () => {
  for (const key of ['garden-exam-draft-v1', 'library-exam-draft-v1', 'physics-exam-draft-v1']) assert.match(thanks, new RegExp(`removeItem\\('${key}'\\)`));
  for (const key of ['garden-exam-result-v1', 'library-exam-result-v1', 'physics-exam-result-v1']) assert.ok(thanks.includes(`'${key}'`), key);
});

test('physics sends plain-text prompts that the database recognises as the physics exam', () => {
  const pagePlainText = runInNewContext(`${/const plainText = html => .*;/.exec(physicsJs)[0]}\nplainText;`); // the page's own line
  const rows = extractContent().questions.filter((q) => q.exam_id);
  const physics = rows.filter((q) => q.exam_id === 'physics-v1-assessment');
  for (const q of physics) {
    assert.equal(pagePlainText(q.prompt), plainText(q.prompt), q.id);
    assert.doesNotMatch(pagePlainText(q.prompt), /[<>]/, q.id);
    assert.ok(pagePlainText(q.prompt).length <= 1000, q.id);
  }
  const answers = physics.map((q) => ({ question: pagePlainText(q.prompt), answer: 'x' }));
  const { examId, matched } = matchExam(rows, answers, 'physics-v1-assessment');
  assert.equal(examId, 'physics-v1-assessment');
  assert.deepEqual(matched.map((q) => q.id), physics.map((q) => q.id));
  assert.equal(matchExam(rows, answers).examId, 'physics-v1-assessment'); // also without the exam hint
});

test('physics script link carries a version newer than the one first deployed (cache busting)', () => {
  const html = readFileSync(new URL('./physics-exam.html', import.meta.url), 'utf8');
  const version = Number(/physics-exam\.js\?v=(\d+)/.exec(html)?.[1]);
  assert.ok(version >= 3, `physics-exam.js?v=${version} must be bumped past v=2, which production already serves with the old page structure`);
});
