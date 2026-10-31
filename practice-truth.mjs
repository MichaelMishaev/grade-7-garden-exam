// Server-side truth for a practice round: whether each answer is right comes from the stored question key (the original
// choice index the page reports), and the score and stars are computed from that, never taken from the browser.
import { extractContent } from './db/extract.mjs';
import './quiz-core.js';
import './numeric-answer.js';

let keys;
function keyFor(quizId) {
  keys ??= Map.groupBy(extractContent().questions.filter((q) => q.quiz_id), (q) => q.quiz_id);
  return new Map((keys.get(quizId) ?? []).map((q) => [q.id, q]));
}

// `value` is the cleaned result of PracticeHistory.validatePracticeResult. Returns the same shape with the server's
// `correct` flags, score and stars.
export function judgePractice(value) {
  const key = keyFor(value.quizId);
  const answers = value.answers.map((a) => {
    const q = key.get(a.questionId);
    return { ...a, correct: Boolean(q && (q.type === 'fill' ? globalThis.NumericAnswer.checkNumber(a.answer, q.correct) === true : Number.isInteger(a.choice) && a.choice >= 0 && a.choice < (q.choices?.length ?? 0) && a.choice === q.correct)) };
  });
  const { scoreQuiz, starsFor } = globalThis.QuizCore;
  const { earned, percent } = scoreQuiz(answers.map((a) => ({ id: a.questionId, type: 'mcq', difficulty: 'medium' })),
    Object.fromEntries(answers.map((a) => [a.questionId, a.correct ? 1 : 0])));
  return { ...value, answers, score: earned, stars: starsFor(percent) };
}
