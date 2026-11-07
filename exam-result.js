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

  root.ExamResult = { newToken, scoreText, watch };
})(globalThis);
