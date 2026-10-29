// What the SERVER knows about a table exam's answers (docs/TESTING.md §8): the verdict of every auto-gradable answer and
// the partial score are computed here from the question keys, never taken from the browser, and the details shown in the
// email (options, correct answer, source) come from the key too. Needs no database: the keys are read from the page
// sources by db/extract.mjs, which stay the source of truth. Answers that match no question fall back to what the
// browser claimed and are marked as unverified.
import { extractContent } from './db/extract.mjs';
import { autoCorrect, plainText } from './db/submissions.mjs';
import './quiz-core.js';

// Same prefix db/submissions.mjs strips: the library page puts its version and title before every prompt.
const libraryPrefix = 'גרסה 2 · הספרייה בהפסקה · ';
// Source names as the exam pages print them (library-exam.js, physics-exam.js).
const refNames = { 'library-passage': 'הקטע', 'physics-pdf': 'סיכום המורה', 'physics-site': 'אתר התרגול' };

let rows;
const indexes = new Map();
function indexFor(examId) {
  if (indexes.has(examId)) return indexes.get(examId);
  rows ??= extractContent().questions;
  const questions = rows.filter((q) => q.exam_id === examId);
  const lookup = new Map(questions.map((q) => [q.prompt, q]));
  // Same forms db/submissions.mjs `matchExam` accepts, including the first physics page version (each <br> -> one space).
  for (const q of questions) for (const text of [plainText(q.prompt), q.prompt.replace(/<br\s*\/?>/gi, ' ').trim()]) if (!lookup.has(text)) lookup.set(text, q);
  const index = { questions, lookup };
  indexes.set(examId, index);
  return index;
}

const keyText = (q) => typeof q.correct === 'number' ? q.choices?.[q.correct]
  : Array.isArray(q.correct) ? q.correct.map((i) => q.choices?.[i]).join(' · ')
  : q.correct && typeof q.correct === 'object' ? `${q.correct.value} ${q.correct.unit ?? ''}`.trim()
  : typeof q.correct === 'string' ? q.correct : undefined;
const referenceText = (q) => q.reference_id ? (q.reference_part ? `${refNames[q.reference_id] || q.reference_id}, ${q.reference_part}` : refNames[q.reference_id] || q.reference_id) : undefined;
const symbol = (verdict) => verdict === true ? '✓' : verdict === false ? '✕' : '✎ ממתינה';

// answers: [{ question, answer, correct? }] as the browser sent them (trimmed). Returns
// { answers: [{ matched, correct, options?, correctAnswer?, reference?, flags: [string] }], score, notes: [string] }
// in the same order. `score` is { earned, pending } or undefined for an exam with nothing auto-gradable (garden).
export function judgeAnswers(examId, answers) {
  const { questions, lookup } = indexFor(examId);
  const used = new Set();
  let mismatches = 0;
  let unmatched = 0;
  const results = Object.fromEntries(questions.filter((q) => q.type !== 'open').map((q) => [q.id, 0]));
  const judged = answers.map((item) => {
    const q = lookup.get(item.question.startsWith(libraryPrefix) ? item.question.slice(libraryPrefix.length) : item.question);
    if (!q || used.has(q.id)) {
      unmatched++;
      return { matched: false, correct: item.correct, flags: ['⚠ לא זוהתה שאלה: התשובה והסימון לא אומתו בשרת'] };
    }
    used.add(q.id);
    // Only a key can mark an answer; a missing key (open task) stays unchecked. The browser's mark is used by
    // autoCorrect for a numeric task without a numeric key, exactly like the database layer.
    const verdict = autoCorrect(q, item.answer, item.correct) ?? undefined;
    if (q.type !== 'open' && verdict === true) results[q.id] = 1;
    const flags = [];
    if (typeof item.correct === 'boolean' && item.correct !== verdict) {
      mismatches++;
      flags.push(`⚠ הדפדפן דיווח ${symbol(item.correct)}, השרת חישב ${symbol(verdict)}`);
    }
    return { matched: true, questionId: q.id, correct: verdict, ...(q.choices ? { options: q.choices } : {}), correctAnswer: keyText(q), reference: referenceText(q), flags };
  });
  const gradable = questions.some((q) => q.type !== 'open');
  const { earned, pending } = globalThis.QuizCore.scoreQuiz(questions.map(({ id, type, difficulty }) => ({ id, type, difficulty })), results);
  const notes = [];
  if (mismatches) notes.push(`⚠ ב־${mismatches} תשובות הדפדפן דיווח תוצאה שונה מחישוב השרת (הציון והסימונים כאן חושבו בשרת)`);
  if (unmatched) notes.push(`⚠ ${unmatched} תשובות לא זוהו מול השאלות (לא זוהתה שאלה), ולכן הציון עשוי להיות נמוך מהאמיתי`);
  return { answers: judged, score: gradable ? { earned, pending } : undefined, notes };
}
