const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

const fmt = new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const duration = (start, end) => {
  const mins = Math.max(1, Math.round((Date.parse(end) - Date.parse(start)) / 60000));
  return mins === 1 ? 'דקה אחת' : `${mins} דקות`;
};

export function timeLines({ startedAt, finishedAt } = {}) {
  if (!startedAt) return '';
  return `התחלה: ${fmt.format(new Date(startedAt))}\nסיום: ${fmt.format(new Date(finishedAt))}\nמשך: ${duration(startedAt, finishedAt)}\n`;
}

// `final` (every open answer was graded by the AI) turns the partial score into the full total.
export const scoreLine = ({ earned, pending, final } = {}) => earned === undefined ? '' : final ? `ציון כולל (כולל בדיקת AI): ${earned} מתוך 100` :
  `ציון חלקי: ${earned} מתוך ${100 - pending}` + (pending ? ` · ${pending} נקודות ממתינות לבדיקה בשאלות פתוחות` : '');
// "HEB-002" or "HEB-002 · ניסיון 3": the test code and which attempt this was (docs/TESTING.md §1).
export const testLabel = (code, attempt) => attempt ? `${code} · ניסיון ${attempt}` : code;
// Plain-text lines for an answer's options and reference (the HTML email shows the same in the card).
export const answerDetails = ({ options, reference } = {}) =>
  (options?.length ? '\n' + options.map(option => `• ${option}`).join('\n') : '') + (reference ? `\nמקור: ${reference}` : '');
// "AI: 3.5/5.36 — reason" for open answers graded by the AI; the label alone when `withReason` is false.
export const aiLine = ({ score, max, reason }, withReason = true) => `AI: ${score}/${max}${withReason && reason ? ` — ${reason}` : ''}`;
// Student-written text in the email of a table exam: control characters and Unicode bidi override/isolate characters
// (which could reorder or hide text) are removed; LRM/RLM stay. Line breaks stay in answers; the name is one line.
// (Built from code points: U+202A-202E and U+2066-2069 are the bidi controls, U+2028/2029 the line and paragraph separators.)
const span = (from, to) => `${String.fromCodePoint(from)}-${String.fromCodePoint(to)}`;
const unsafe = new RegExp(`[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F-\\x9F${span(0x202A, 0x202E)}${span(0x2066, 0x2069)}]`, 'g');
const lineBreaks = new RegExp(`\\r\\n?|[${span(0x2028, 0x2029)}]`, 'g');
export const cleanText = value => String(value).replace(lineBreaks, '\n').replace(unsafe, '');
export const cleanLine = value => cleanText(value).replace(/\s+/g, ' ').trim();
// Plain-text part: every line after the first is indented, so student text cannot start a line that looks like the
// score line or the next numbered answer.
export const indentLines = (value, pad = '   ') => cleanText(value).split('\n').join('\n' + pad);

// Plain-text part of the exam email. Without `safe` (the original Hebrew exams) the output is exactly the original.
export function renderExamText({ code, attempt, name, times, score, aiNote, notes = [], answers, safe = false }) {
  const text = safe ? indentLines : value => value;
  const details = ({ options, reference } = {}) => (options?.length ? '\n' + options.map(option => `• ${text(option)}`).join('\n') : '') + (reference ? `\nמקור: ${text(reference)}` : '');
  return `${code ? `מבחן: ${testLabel(code, attempt)}\n` : ''}שם התלמיד/ה: ${name}\n${timeLines(times)}${score ? scoreLine(score) + '\n' : ''}${aiNote ? aiNote + '\n' : ''}${notes.map(note => note + '\n').join('')}\n` +
    answers.map((item, i) => `${i + 1}. ${item.correct === true ? '✓ ' : item.correct === false ? '✕ ' : ''}${text(item.question)}${details(item)}\n${safe ? '   ' : ''}${text(item.answer)}${(item.flags ?? []).map(flag => `\n${flag}`).join('')}${item.ai ? `\n${aiLine(item.ai)}` : ''}${item.correctAnswer ? `\nתשובה נכונה: ${text(item.correctAnswer)}` : ''}`).join('\n\n');
}

const mark = correct => correct === true ? '✓ ' : correct === false ? '✕ ' : '';

// Table layout with inline styles only: mail clients ignore <style> blocks and modern CSS.
// title/subtitle default to the original Hebrew exam heading; markPending labels answers without a `correct` mark
// (written tasks) as waiting for the teacher. The defaults render byte-identically to the original template.
export function renderExamEmail({ name, answers, startedAt, finishedAt, score, origin: rawOrigin,
  title = 'תשובות למבחן הבנת הנקרא', subtitle = 'כיתה ז׳2 · שי עגנון, נתניה', markPending = false, code, attempt, aiNote, notes }) {
  const origin = escape(rawOrigin.replace(/\/+$/, ''));
  const font = "font-family:Arial,'Noto Sans Hebrew',sans-serif;";
  const cards = answers.map((item, i) => `
    <tr><td style="padding:0 24px 14px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #e5e9ec;border-radius:16px;">
        <tr><td style="padding:14px 16px 6px;${font}font-size:13px;font-weight:bold;color:#46a302;">שאלה ${i + 1}${item.correct === true ? ' · <span style="color:#2b8a3e;">✓ נכון</span>' : item.correct === false ? ' · <span style="color:#c92a2a;">✕ שגוי</span>' : item.ai ? ` · <span style="color:#1587c2;">${escape(aiLine(item.ai, false))}</span>` : markPending ? ' · <span style="color:#1587c2;">✎ ממתינה לבדיקת המורה</span>' : ''}</td></tr>
        <tr><td style="padding:0 16px 8px;${font}font-size:16px;font-weight:bold;line-height:1.6;color:#273541;">${escape(item.question)}</td></tr>${item.options?.length ? `
        <tr><td style="padding:0 16px 8px;${font}font-size:14px;line-height:1.7;color:#516070;">${item.options.map(option => `• ${escape(option)}`).join('<br>')}</td></tr>` : ''}
        <tr><td style="padding:0 16px 16px;"><div style="padding:12px 14px;background:#e9fbdc;border-radius:12px;${font}font-size:16px;line-height:1.7;color:#273541;white-space:pre-wrap;" dir="auto">${escape(item.answer)}</div></td></tr>${item.flags?.length ? `
        <tr><td style="padding:0 16px 16px;${font}font-size:14px;line-height:1.6;color:#c92a2a;" dir="auto">${item.flags.map(escape).join('<br>')}</td></tr>` : ''}${item.ai?.reason ? `
        <tr><td style="padding:0 16px 16px;${font}font-size:14px;line-height:1.6;color:#1587c2;" dir="auto">${escape(aiLine(item.ai))}</td></tr>` : ''}${item.correctAnswer ? `
        <tr><td style="padding:0 16px 16px;${font}font-size:14px;line-height:1.6;color:#2b8a3e;" dir="auto">תשובה נכונה: ${escape(item.correctAnswer)}</td></tr>` : ''}${item.reference ? `
        <tr><td style="padding:0 16px 14px;${font}font-size:12px;color:#708273;">מקור: ${escape(item.reference)}</td></tr>` : ''}
      </table>
    </td></tr>`).join('');
  return `<!doctype html>
<html lang="he" dir="rtl"><body style="margin:0;padding:0;background:#f3f6f1;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6f1;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" dir="rtl" style="width:100%;max-width:600px;background:#ffffff;border-radius:22px;">
    <tr><td align="center" style="padding:28px 24px 8px;"><a href="${origin}/"><img src="${origin}/assets/branding/prepx-logo.png" width="150" alt="PrepX" style="display:block;border:0;height:auto;"></a></td></tr>
    <tr><td align="center" style="padding:12px 24px 4px;${font}"><h1 style="margin:0;font-size:24px;line-height:1.3;color:#273541;">${escape(title)}</h1><p style="margin:6px 0 0;font-size:14px;color:#687987;">${escape(subtitle)}</p>${code ? `<p style="margin:10px 0 0;font-size:15px;font-weight:bold;color:#273541;" dir="auto">${escape(testLabel(code, attempt))}</p>` : ''}</td></tr>
    <tr><td style="padding:18px 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9fbdc;border-radius:16px;"><tr><td style="padding:14px 18px;${font}font-size:13px;color:#5e7164;">שם התלמיד/ה<div style="margin-top:4px;font-size:22px;font-weight:bold;color:#273541;">${escape(name)}</div>${startedAt ? `<div style="margin-top:10px;font-size:14px;line-height:1.7;color:#273541;">התחלה: ${fmt.format(new Date(startedAt))} · סיום: ${fmt.format(new Date(finishedAt))} · משך: ${duration(startedAt, finishedAt)}</div>` : ''}${score ? `<div style="margin-top:10px;font-size:16px;font-weight:bold;color:#273541;">${escape(scoreLine(score))}</div>` : ''}${aiNote ? `<div style="margin-top:6px;font-size:14px;color:#c92a2a;">${escape(aiNote)}</div>` : ''}${(notes ?? []).map(note => `<div style="margin-top:6px;font-size:14px;color:#c92a2a;">${escape(note)}</div>`).join('')}</td></tr></table></td></tr>
    ${cards}
    <tr><td align="center" style="padding:10px 24px 28px;${font}font-size:13px;line-height:1.7;color:#708273;"><a href="${origin}/" style="color:#1587c2;font-weight:bold;text-decoration:none;">${origin.replace(/^https?:\/\//, '')}</a><br>נשלח אוטומטית מאתר PrepX</td></tr>
  </table>
</td></tr></table>
</body></html>`;
}
