(function (root) {
  const ready = grade => grade?.status === 'ok' && Number.isInteger(grade.finalScore) && grade.finalScore >= 0 && grade.finalScore <= 100;
  const newToken = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');

  function scoreText(grade, autoPoints, openIds) {
    if (ready(grade)) return `ציון סופי: ${grade.finalScore} מתוך 100.`;
    if (grade.status === 'pending') return 'התשובות נבדקות. הציון הסופי יוצג כאן לאחר השלמת הבדיקה.';
    // Older drafts and the legacy retry response contain marks, but no server total.
    const marks = grade.scores ?? {};
    if (grade.status === 'ok' && Object.keys(marks).length === openIds.length &&
        openIds.every(id => Number.isFinite(marks[id]?.score) && marks[id].score >= 0 && marks[id].score <= marks[id].max)) {
      const points = openIds.reduce((sum, id) => sum + marks[id].score, 0);
      return `ציון סופי: ${Math.min(100, autoPoints + Math.round(points))} מתוך 100.`;
    }
    return 'התשובות עדיין לא נבדקו במלואן. הציון הסופי יוצג כאן לאחר השלמת הבדיקה.';
  }

  function renderConclusion(element, grade) {
    const conclusion = grade.status === 'ok' && typeof grade.conclusion === 'string' ? grade.conclusion : '';
    element.textContent = conclusion ? `סיכום בדיקת הבינה המלאכותית: ${conclusion}` : '';
    element.hidden = !conclusion;
  }

  function renderCompletion(missing, flagged) {
    const message = missing ? `נותרו ${missing} שאלות ללא תשובה.` : 'כל התשובות מולאו. אפשר לסיים את המבחן ולקבל סיכום.';
    document.getElementById('review-status').textContent = flagged ? `${message} סומנו ${flagged} שאלות לבדיקה חוזרת.` : message;
    document.getElementById('review-error').textContent = '';
  }

  function startSubmission() {
    document.getElementById('review-title').textContent = 'שמירת המבחן';
    for (const id of ['review-status', 'review-error', 'back-to-questions', 'finish', 'send']) {
      document.getElementById(id).hidden = true;
    }
    document.getElementById('submission-status').textContent = 'שומרים את התשובות…';
  }

  function renderQuestions(container, questions, scores = {}) {
    const expanded = new Set([...container.querySelectorAll('details[open]')].map(card => card.dataset.questionId));
    const focusId = document.activeElement?.closest('details')?.dataset.questionId;
    const cards = questions.map(({ id, question, answer, correct, explanation, source, flagged, figure }, index) => {
      const card = document.createElement('details');
      card.className = 'card result-detail';
      card.dataset.questionId = id;
      card.open = expanded.has(id);
      const title = document.createElement('summary');
      title.textContent = `${index + 1}. ${question}${flagged ? ' · ⚑' : ''}`;
      const body = document.createElement('div');
      body.className = 'result-detail-body';
      const addLine = (text, className = '') => {
        const line = document.createElement('p');
        line.className = className;
        line.textContent = text;
        body.append(line);
      };
      if (figure) body.append(figure);
      addLine(`התשובה שלי: ${answer}`);
      if (correct !== undefined) {
        addLine(correct === true ? '✓ תשובה נכונה' : `✕ תשובה שגויה · התשובה הנכונה: ${correct}`);
        if (typeof explanation === 'string') addLine(explanation);
        else if (explanation) body.append(explanation);
      } else {
        const mark = scores[id];
        addLine(mark ? `ניקוד: ${mark.score} מתוך ${mark.max}` : 'התשובה עדיין לא נבדקה.');
        if (mark?.score < mark?.max) {
          addLine(mark.correction ? `תשובה נכונה לפי בדיקת הבינה המלאכותית: ${mark.correction}` : 'תשובה לדוגמה אינה זמינה לבדיקה זו.');
          if (explanation) body.append(explanation);
        }
      }
      if (source) addLine(source, 'source-line');
      card.append(title, body);
      return card;
    });
    container.replaceChildren(...cards);
    cards.find(card => card.dataset.questionId === focusId)?.querySelector('summary').focus({ preventScroll: true });
  }

  function watch(grade, token, onReady) {
    if (grade.status !== 'pending' || !token) return;
    const endpoint = location.hostname === 'michaelmishaev.github.io'
      ? 'https://hitech.agnon.online/api/exam-result' : '/api/exam-result';
    let delay = 5000;
    async function check() {
      try {
        const response = await fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resultToken: token }), signal: AbortSignal.timeout(8000)
        });
        const { grading } = response.ok ? await response.json() : {};
        if (ready(grading)) { onReady(grading); return; }
      } catch (_) { /* The saved attempt is safe; try again after a connection failure. */ }
      delay = Math.min(60000, delay * 2);
      setTimeout(check, delay);
    }
    setTimeout(check, delay);
  }

  root.ExamResult = { newToken, scoreText, renderConclusion, renderCompletion, startSubmission, renderQuestions, watch };
})(globalThis);
