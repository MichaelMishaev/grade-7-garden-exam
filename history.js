// Teacher history view. The teacher code lives only in sessionStorage of this tab and goes only in the Authorization
// header (never in a URL). Everything from the server is written with textContent: names and answers are untrusted.
(() => {
  const KEY = 'prepx-teacher-token-v1';
  const apiBase = /\.github\.io$/.test(location.hostname) ? 'https://hitech.agnon.online' : '';
  const practiceCodes = ['PRA-001', 'PRA-002', 'PRA-003', 'PRA-004', 'PRA-005', 'PRA-006', 'PRA-007'];
  const examCodes = ['HEB-001', 'HEB-002', 'PHY-001'];
  const $ = (id) => document.getElementById(id);
  let tab = 'practice';

  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  };
  const when = (iso) => (iso ? new Date(iso).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' }) : '—');
  const stars = (count) => '★'.repeat(count) + '☆'.repeat(3 - count);
  const field = (list, label, value) => { list.append(el('dt', label), el('dd', value)); };

  async function api(path) {
    const response = await fetch(`${apiBase}/api/teacher/${path}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem(KEY)}` }, cache: 'no-store' });
    if (response.status === 401) { logout('הקוד שגוי'); throw new Error('unauthorized'); }
    if (response.status === 429) throw new Error('יותר מדי ניסיונות, נסו שוב בעוד דקה');
    if (response.status === 404) throw new Error('ההיסטוריה אינה זמינה בשרת הזה');
    if (!response.ok) throw new Error('שגיאה בטעינה, נסו שוב');
    return response.json();
  }

  function logout(message = '') {
    sessionStorage.removeItem(KEY);
    $('token').value = '';
    $('app').hidden = true;
    $('logout').hidden = true;
    $('login').hidden = false;
    $('login-error').textContent = message;
    $('panel').replaceChildren();
  }

  function fillCodes() {
    const select = $('filter-code');
    const codes = tab === 'practice' ? practiceCodes : examCodes;
    $('filter-code-label').textContent = tab === 'practice' ? 'קוד תרגול' : 'קוד מבחן';
    select.replaceChildren(new Option('הכול', ''), ...codes.map((code) => new Option(code, code)));
  }

  function renderPractice(data) {
    const panel = $('panel');
    panel.replaceChildren();
    if (!data.results.length) { $('status').textContent = 'אין תוצאות.'; return; }
    $('status').textContent = `${data.results.length} תוצאות, מהחדשה לישנה`;
    panel.append(el('h2', 'הציון הטוב ביותר', 'section-title'));
    const best = el('ul', null, 'cards');
    for (const row of data.best) {
      const card = el('li', null, 'card');
      card.append(el('h3', row.name));
      const list = el('dl');
      field(list, 'תרגול', row.quizCode);
      field(list, 'הציון הטוב ביותר', row.score);
      field(list, 'סבבים', row.rounds);
      card.append(list);
      best.append(card);
    }
    panel.append(best, el('h2', 'כל הסבבים', 'section-title'));
    const all = el('ul', null, 'cards');
    for (const row of data.results) {
      const card = el('li', null, 'card');
      card.append(el('h3', row.name));
      const list = el('dl');
      field(list, 'תרגול', row.quizCode);
      field(list, 'ציון', row.score);
      field(list, 'כוכבים', stars(row.stars));
      field(list, 'מתי', when(row.createdAt));
      card.append(list);
      all.append(card);
    }
    panel.append(all);
  }

  async function showDetail(card, id, button) {
    button.disabled = true;
    try {
      const { submission } = await api(`submissions/${encodeURIComponent(id)}`);
      const list = el('ol', null, 'answers');
      for (const answer of submission.answers) {
        const item = el('li');
        item.append(el('strong', `${answer.position}. ${answer.question}`), document.createElement('br'), document.createTextNode(answer.answer));
        if (answer.ai) item.append(document.createElement('br'), document.createTextNode(`ציון AI: ${answer.ai.score}/${answer.ai.max} · ${answer.ai.reason ?? ''}`));
        list.append(item);
      }
      button.replaceWith(list);
    } catch (error) {
      button.disabled = false;
      $('status').textContent = error.message;
    }
  }

  function renderExams(data) {
    const panel = $('panel');
    panel.replaceChildren();
    if (!data.submissions.length) { $('status').textContent = 'אין הגשות.'; return; }
    $('status').textContent = `${data.submissions.length} הגשות, מהחדשה לישנה`;
    const cards = el('ul', null, 'cards');
    for (const row of data.submissions) {
      const card = el('li', null, 'card');
      card.append(el('h3', row.name));
      const list = el('dl');
      field(list, 'מבחן', `${row.examCode ?? '—'}${row.attempt ? ` · ניסיון ${row.attempt}` : ''}`);
      field(list, 'התחלה', when(row.startedAt));
      field(list, 'סיום', when(row.finishedAt ?? row.receivedAt));
      field(list, 'מייל', row.emailStatus);
      field(list, 'בדיקת AI', row.aiStatus ?? '—');
      if (row.aiTotal !== null) field(list, 'סך AI', row.aiTotal);
      if (row.aiScores) field(list, 'ציוני שאלות', Object.values(row.aiScores).map((s) => `${s.score}/${s.max}`).join(' · '));
      card.append(list);
      const button = el('button', 'הצגת התשובות', 'link-button');
      button.type = 'button';
      button.addEventListener('click', () => showDetail(card, row.id, button));
      card.append(button);
      cards.append(card);
    }
    panel.append(cards);
  }

  async function load() {
    // The student's name never goes into a URL (URLs end up in logs and history): the server returns the newest rows
    // up to its limit and the name is matched here.
    const name = $('filter-name').value.trim().toLocaleLowerCase();
    const code = $('filter-code').value;
    const params = new URLSearchParams({ limit: tab === 'practice' ? '200' : '100' });
    if (code) params.set(tab === 'practice' ? 'quiz' : 'code', code);
    $('status').textContent = 'טוענים…';
    const wanted = tab;
    const matches = (row) => !name || String(row.name).toLocaleLowerCase().includes(name);
    try {
      const data = await api(`${wanted === 'practice' ? 'practice' : 'submissions'}?${params}`);
      if (wanted !== tab) return;
      if (wanted === 'practice') renderPractice({ results: data.results.filter(matches), best: data.best.filter(matches) });
      else renderExams({ submissions: data.submissions.filter(matches) });
    } catch (error) {
      if (error.message !== 'unauthorized') { $('status').textContent = error.message; $('panel').replaceChildren(); }
    }
  }

  function setTab(next) {
    tab = next;
    $('tab-practice').setAttribute('aria-selected', String(next === 'practice'));
    $('tab-exams').setAttribute('aria-selected', String(next === 'exams'));
    fillCodes();
    load();
  }

  function enter() {
    $('login').hidden = true;
    $('app').hidden = false;
    $('logout').hidden = false;
    setTab('practice');
  }

  $('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $('token').value.trim();
    if (!value) return;
    sessionStorage.setItem(KEY, value);
    $('login-error').textContent = '';
    enter();
  });
  $('logout').addEventListener('click', () => logout());
  $('tab-practice').addEventListener('click', () => setTab('practice'));
  $('tab-exams').addEventListener('click', () => setTab('exams'));
  $('filters').addEventListener('submit', (event) => { event.preventDefault(); load(); });
  if (sessionStorage.getItem(KEY)) enter();
})();
