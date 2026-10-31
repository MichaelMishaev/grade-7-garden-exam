(function (root) {
  // Permanent practice test codes (docs/TESTING.md §1). Assigned once, in this order; NEVER renumber or reuse.
  // A new quiz gets the next free number. `count` is the number of questions in one full round.
  const QUIZZES = Object.assign(Object.create(null), {
    'facts': { code: 'PRA-001', count: 6 },
    'questions': { code: 'PRA-002', count: 6 },
    'instructions': { code: 'PRA-003', count: 6 },
    'physics-basics': { code: 'PRA-004', count: 11, open: [5, 10] },
    'physics-units': { code: 'PRA-005', count: 5, numeric: [0, 1, 2, 3, 4] },
    'physics-precision': { code: 'PRA-006', count: 6, numeric: [0, 1, 2, 4], open: [3, 5] },
    'physics-pole': { code: 'PRA-007', count: 5, numeric: [1, 4], open: [0, 2, 3] }
  });

  // Pause between a clicked answer and the next question (docs/TESTING.md §3).
  const AUTO_ADVANCE_MS = 1500;
  const NAME_KEY = 'prepx-student-name-v1';
  const NAME_MAX = 60;

  // Collapses whitespace; returns '' for anything that is not a usable name.
  function cleanName(raw) {
    if (typeof raw !== 'string') return '';
    const name = raw.replace(/\s+/g, ' ').trim();
    return name.length <= NAME_MAX && !/[\u0000-\u001f\u007f]/.test(name) ? name : '';
  }

  const pad = n => String(n).padStart(2, '0');
  // Same ids the database seed uses: `<quiz>-01`.
  const questionId = (quizId, index) => `${quizId}-${pad(index + 1)}`;

  const endpointFor = hostname => (hostname === 'michaelmishaev.github.io' ? 'https://hitech.agnon.online/api/practice-result' : '/api/practice-result');

  // answers: [{ index (0-based question number), choice (original choice index), correct }] for the first attempt of
  // every question of a full round. Returns null when there is nothing valid to send (no name, unknown quiz).
  function buildPayload({ quizId, name, answers, score, stars }) {
    const clean = cleanName(name);
    if (!clean || !Object.hasOwn(QUIZZES, quizId)) return null;
    return {
      quiz: quizId, name: clean, score, stars,
      answers: answers.map(a => ({ questionId: questionId(quizId, a.index), ...(typeof a.answer === 'string' ? { answer: a.answer } : { choice: a.choice }), correct: a.correct }))
    };
  }

  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const sameKeys = (value, keys) => Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));

  // Strict server-side check. Returns { ok: true, value } with a cleaned copy, or { ok: false }.
  // The score and stars must be exactly what the client scoring gives for the sent answers.
  function validatePracticeResult(payload) {
    const bad = { ok: false };
    if (!isObject(payload) || !sameKeys(payload, ['quiz', 'name', 'score', 'stars', 'answers'])) return bad;
    if (typeof payload.quiz !== 'string' || !Object.hasOwn(QUIZZES, payload.quiz)) return bad;
    const { code, count, numeric = [], open = [] } = QUIZZES[payload.quiz];
    const name = cleanName(payload.name);
    if (!name) return bad;
    if (!Number.isInteger(payload.score) || payload.score < 0 || payload.score > 100) return bad;
    if (!Number.isInteger(payload.stars) || payload.stars < 0 || payload.stars > 3) return bad;
    if (!Array.isArray(payload.answers) || payload.answers.length !== count - open.length) return bad;
    const seen = new Set();
    const answers = [];
    for (const item of payload.answers) {
      if (!isObject(item)) return bad;
      const match = typeof item.questionId === 'string' ? /^(.+)-(\d{2})$/.exec(item.questionId) : null;
      const number = match ? Number(match[2]) : 0;
      if (!match || match[1] !== payload.quiz || number < 1 || number > count || seen.has(item.questionId)) return bad;
      if (open.includes(number - 1) || typeof item.correct !== 'boolean') return bad;
      const typed = numeric.includes(number - 1);
      if (!sameKeys(item, typed ? ['questionId', 'answer', 'correct'] : ['questionId', 'choice', 'correct'])) return bad;
      if (typed ? typeof item.answer !== 'string' || !item.answer.trim() || item.answer.length > 100 : !Number.isInteger(item.choice) || item.choice < 0 || item.choice > 9) return bad;
      seen.add(item.questionId);
      answers.push({ questionId: item.questionId, choice: typed ? -1 : item.choice, ...(typed ? { answer: item.answer } : {}), correct: item.correct });
    }
    const { scoreQuiz, starsFor } = root.QuizCore;
    const questions = answers.map(a => ({ id: a.questionId, type: 'mcq', difficulty: 'medium' }));
    const results = Object.fromEntries(answers.map(a => [a.questionId, a.correct ? 1 : 0]));
    const { earned, percent } = scoreQuiz(questions, results);
    if (payload.score !== earned || payload.stars !== starsFor(percent)) return bad;
    return { ok: true, value: { quizId: payload.quiz, quizCode: code, name, score: earned, stars: payload.stars, answers } };
  }

  // One line of the end-of-round review. `question` is the shuffled question that was shown, `picked` the displayed index.
  const reviewItem = (question, picked) => ({
    text: question.text, picked: question.choices[picked], right: question.choices[question.correct],
    correct: picked === question.correct, he: question.he || '', en: question.en || ''
  });

  root.PracticeHistory = { QUIZZES, AUTO_ADVANCE_MS, reviewItem, NAME_KEY, NAME_MAX, cleanName, questionId, endpointFor, buildPayload, validatePracticeResult };
})(globalThis);
