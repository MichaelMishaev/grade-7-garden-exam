const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

const fmt = new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const duration = (start, end) => `${Math.max(1, Math.round((Date.parse(end) - Date.parse(start)) / 60000))} דקות`;

export function timeLines({ startedAt, finishedAt } = {}) {
  if (!startedAt) return '';
  return `התחלה: ${fmt.format(new Date(startedAt))}\nסיום: ${fmt.format(new Date(finishedAt))}\nמשך: ${duration(startedAt, finishedAt)}\n`;
}

// Table layout with inline styles only: mail clients ignore <style> blocks and modern CSS.
export function renderExamEmail({ name, answers, startedAt, finishedAt, origin: rawOrigin }) {
  const origin = escape(rawOrigin.replace(/\/+$/, ''));
  const font = "font-family:Arial,'Noto Sans Hebrew',sans-serif;";
  const cards = answers.map((item, i) => `
    <tr><td style="padding:0 24px 14px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #e5e9ec;border-radius:16px;">
        <tr><td style="padding:14px 16px 6px;${font}font-size:13px;font-weight:bold;color:#46a302;">שאלה ${i + 1}</td></tr>
        <tr><td style="padding:0 16px 8px;${font}font-size:16px;font-weight:bold;line-height:1.6;color:#273541;">${escape(item.question)}</td></tr>
        <tr><td style="padding:0 16px 16px;"><div style="padding:12px 14px;background:#e9fbdc;border-radius:12px;${font}font-size:16px;line-height:1.7;color:#273541;white-space:pre-wrap;" dir="auto">${escape(item.answer)}</div></td></tr>
      </table>
    </td></tr>`).join('');
  return `<!doctype html>
<html lang="he" dir="rtl"><body style="margin:0;padding:0;background:#f3f6f1;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6f1;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" dir="rtl" style="width:100%;max-width:600px;background:#ffffff;border-radius:22px;">
    <tr><td align="center" style="padding:28px 24px 8px;"><a href="${origin}/"><img src="${origin}/assets/branding/prepx-logo.png" width="150" alt="PrepX" style="display:block;border:0;height:auto;"></a></td></tr>
    <tr><td align="center" style="padding:12px 24px 4px;${font}"><h1 style="margin:0;font-size:24px;line-height:1.3;color:#273541;">תשובות למבחן הבנת הנקרא</h1><p style="margin:6px 0 0;font-size:14px;color:#687987;">כיתה ז׳2 · שי עגנון, נתניה</p></td></tr>
    <tr><td style="padding:18px 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9fbdc;border-radius:16px;"><tr><td style="padding:14px 18px;${font}font-size:13px;color:#5e7164;">שם התלמיד/ה<div style="margin-top:4px;font-size:22px;font-weight:bold;color:#273541;">${escape(name)}</div>${startedAt ? `<div style="margin-top:10px;font-size:14px;line-height:1.7;color:#273541;">התחלה: ${fmt.format(new Date(startedAt))} · סיום: ${fmt.format(new Date(finishedAt))} · משך: ${duration(startedAt, finishedAt)}</div>` : ''}</td></tr></table></td></tr>
    ${cards}
    <tr><td align="center" style="padding:10px 24px 28px;${font}font-size:13px;line-height:1.7;color:#708273;"><a href="${origin}/" style="color:#1587c2;font-weight:bold;text-decoration:none;">${origin.replace(/^https?:\/\//, '')}</a><br>נשלח אוטומטית מאתר PrepX</td></tr>
  </table>
</td></tr></table>
</body></html>`;
}
