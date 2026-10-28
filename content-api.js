// Loads content from the PrepX API and falls back to the inline data on any failure,
// so GitHub Pages, outages and slow networks behave exactly like the static pages.
(function (root) {
  const apiBase = () => (/\.github\.io$/.test(root.location?.hostname ?? '') ? 'https://hitech.agnon.online' : '');

  async function loadContent(path, fallback, { timeout = 1500, valid = () => true, fetchImpl = root.fetch } = {}) {
    try {
      const response = await fetchImpl(`${apiBase()}/api/${path}`, { signal: AbortSignal.timeout(timeout) });
      if (!response.ok) return fallback;
      const data = await response.json();
      return valid(data) ? data : fallback;
    } catch {
      return fallback;
    }
  }

  // API quiz {title, description, questions:[{prompt, choices, correct, explanation:{he,en}}]} -> the practice.js shape.
  const quizFromApi = (quiz) => ({
    title: quiz.title,
    description: quiz.description,
    questions: quiz.questions.map((q) => ({ text: q.prompt, choices: q.choices, correct: q.correct, he: q.explanation.he, en: q.explanation.en }))
  });

  // Same question count as the inline quiz, and every question is answerable.
  const quizMatches = (quiz, expectedCount) => Array.isArray(quiz?.questions) && quiz.questions.length === expectedCount
    && quiz.questions.every((q) => typeof q?.prompt === 'string' && Array.isArray(q.choices) && Number.isInteger(q.correct)
      && q.correct >= 0 && q.correct < q.choices.length && typeof q.explanation?.he === 'string');

  const api = { loadContent, quizFromApi, quizMatches };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ContentApi = api;
})(typeof window !== 'undefined' ? window : globalThis);
