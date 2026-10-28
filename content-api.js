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
    questions: quiz.questions.map((q) => ({ text: q.prompt, choices: q.choices, correct: q.correct, he: q.explanation.he, en: q.explanation.en,
      ...(q.ref ? { ref: { id: q.ref.id, part: q.ref.part ?? null } } : {}) }))
  });

  // Same question count as the inline quiz, and every question is answerable.
  const quizMatches = (quiz, expectedCount) => Array.isArray(quiz?.questions) && quiz.questions.length === expectedCount
    && quiz.questions.every((q) => typeof q?.prompt === 'string' && Array.isArray(q.choices) && Number.isInteger(q.correct)
      && q.correct >= 0 && q.correct < q.choices.length && typeof q.explanation?.he === 'string');

  // Structural equality for plain JSON data (key order does not matter).
  const sameData = (a, b) => {
    if (a === b) return true;
    if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((v, i) => sameData(v, b[i]));
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || Array.isArray(b)) return false;
    const keys = Object.keys(a);
    return keys.length === Object.keys(b).length && keys.every((k) => Object.hasOwn(b, k) && sameData(a[k], b[k]));
  };

  // API exam question -> the library-exam.js shape (fields that are null in the database are left out, as inline).
  const examQuestionFromApi = (q) => {
    const out = { id: q.id, type: q.type };
    if (q.topic != null) out.topic = q.topic;
    if (q.difficulty != null) out.difficulty = q.difficulty;
    out.prompt = q.prompt;
    if (q.choices != null) out.choices = q.choices;
    if (q.correct != null) out.correct = q.correct;
    if (q.explanation?.he != null || q.explanation?.en != null) {
      out.explanation = {};
      if (q.explanation.he != null) out.explanation.he = q.explanation.he;
      if (q.explanation.en != null) out.explanation.en = q.explanation.en;
    }
    if (q.ref != null) out.ref = { id: q.ref.id, part: q.ref.part ?? null };
    return out;
  };

  // GET /api/exams/:id -> the inline questions array (prompt strings when the inline array is strings, objects
  // otherwise), or null unless the result is identical to the inline array (count, order, ids, prompts, answers).
  // Drafts are keyed by index (garden) or id (library), and the server recognises an exam by its prompt strings.
  function examFromApi(exam, inline) {
    try {
      if (!Array.isArray(exam?.questions) || !Array.isArray(inline) || exam.questions.length !== inline.length) return null;
      const ids = exam.questions.map((q) => q.id);
      if (!ids.every((id) => typeof id === 'string') || new Set(ids).size !== ids.length) return null;
      const strings = inline.every((q) => typeof q === 'string');
      const mapped = strings
        ? (exam.questions.every((q) => q.type === 'open') ? exam.questions.map((q) => q.prompt) : null)
        : exam.questions.map(examQuestionFromApi);
      return mapped && sameData(mapped, inline) ? mapped : null;
    } catch {
      return null;
    }
  }

  // GET /api/subjects/:id -> the subject.html `subjects[key]` shape, or null unless the exams (count, hrefs, linked
  // practice quizzes) and the listed quiz ids match the inline subject. Only texts may differ.
  function subjectFromApi(data, inline) {
    try {
      const text = (v) => typeof v === 'string';
      if (!text(data?.title) || !text(data.description) || !Array.isArray(data.exams) || !Array.isArray(data.quizzes)) return null;
      if (data.exams.length !== inline.variants.length) return null;
      const variants = data.exams.map((exam, i) => {
        const v = inline.variants[i];
        const linked = data.quizzes.filter((q) => q.exam_id === exam.id).map((q) => q.id);
        // A version without a date inline (physics) has no date in the database either.
        const dateOk = v.date === undefined ? exam.date_label == null : text(exam.date_label);
        // References (study material) stay inline-authoritative; the API must list the same ones in the same order.
        const refIds = Array.isArray(exam.references ?? []) ? (exam.references ?? []).map((r) => r?.id) : null;
        if (exam.href !== v.href || (v.id !== undefined && exam.id !== v.id) || !text(exam.title) || !text(exam.detail) || !dateOk
          || !Number.isInteger(exam.question_count) || !sameData(linked, v.practiceQuizzes ?? [])
          || !sameData(refIds, (v.references ?? []).map((r) => r.id))) return null;
        return { ...(v.id !== undefined ? { id: v.id } : {}), title: exam.title, detail: exam.detail,
          ...(v.date !== undefined ? { date: exam.date_label } : {}), count: `${exam.question_count} שאלות`, href: exam.href,
          ...(v.practiceQuizzes ? { practiceQuizzes: v.practiceQuizzes } : {}), ...(v.references ? { references: v.references } : {}) };
      });
      if (variants.includes(null)) return null;
      const out = { title: data.title, description: data.description, variants };
      if (inline.quizzes) {
        if (!sameData(data.quizzes.map((q) => q.id), inline.quizzes.map(([id]) => id))) return null;
        if (!data.quizzes.every((q) => text(q.list_title) && text(q.list_detail))) return null;
        out.quizzes = inline.quizzes.map(([id, , , number], i) => [id, data.quizzes[i].list_title, data.quizzes[i].list_detail, number]);
      }
      return out;
    } catch {
      return null;
    }
  }

  // ?source=inline forces the inline data (debugging); otherwise pages use the API with the inline fallback.
  const useApi = () => new URLSearchParams(root.location?.search ?? '').get('source') !== 'inline';

  const api = { loadContent, quizFromApi, quizMatches, sameData, examQuestionFromApi, examFromApi, subjectFromApi, useApi };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ContentApi = api;
})(typeof window !== 'undefined' ? window : globalThis);
