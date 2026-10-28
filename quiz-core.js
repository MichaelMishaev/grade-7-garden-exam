(function (root) {
  const WEIGHT = { easy: 1, medium: 1.5, hard: 2 };

  const weightOf = q => WEIGHT[q && q.difficulty] || WEIGHT.medium;
  const clamp01 = n => (Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0);

  function scoreQuiz(questions, results) {
    const list = questions || [];
    const res = results || {};
    const total = list.reduce((sum, q) => sum + weightOf(q), 0);
    if (!total) return { earned: 0, pending: 0, max: 100, percent: 0 };
    let earned = 0;
    let pending = 0;
    for (const q of list) {
      const points = weightOf(q) / total * 100;
      if (q.type === 'open') pending += points;
      else earned += clamp01(res[q.id]) * points;
    }
    earned = Math.round(earned);
    pending = Math.round(pending);
    const gradable = 100 - pending;
    const percent = gradable > 0 ? Math.min(100, Math.round(earned / gradable * 100)) : 0;
    return { earned, pending, max: 100, percent };
  }

  function starsFor(percent) {
    if (percent >= 90) return 3;
    if (percent >= 75) return 2;
    if (percent >= 50) return 1;
    return 0;
  }

  function feedbackTier(percent) {
    if (percent >= 90) return 'great';
    if (percent >= 50) return 'ok';
    return 'low';
  }

  function shuffled(array, rng = Math.random) {
    const out = array.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function shuffleChoices(question, rng = Math.random) {
    // shuffle original indexes so duplicate choice strings stay distinct
    const order = shuffled(question.choices.map((_, i) => i), rng);
    return {
      ...question,
      choices: order.map(i => question.choices[i]),
      correct: order.indexOf(question.correct)
    };
  }

  function missedQuestions(questions, results) {
    const res = results || {};
    return questions.filter(q => q.type !== 'open' && !(clamp01(res[q.id]) >= 1));
  }

  function scheduleReask(queue, position, question, gap = 3) {
    const out = queue.slice();
    out.splice(Math.min(position + 1 + gap, queue.length), 0, { ...question, reask: true });
    return out;
  }

  function streakCelebrates(streak) {
    return streak > 0 && streak % 3 === 0;
  }

  root.QuizCore = {
    WEIGHT, scoreQuiz, starsFor, feedbackTier, shuffled, shuffleChoices,
    missedQuestions, scheduleReask, streakCelebrates
  };
})(globalThis);
