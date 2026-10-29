// Server-side ONLY grading data for open questions (docs/TESTING.md §9). Never served to browsers: `types` in
// server.mjs does not include .mjs, and nothing here is imported by a page.
//
// The repository is public (GitHub Pages serves all of it), so this file holds only the STRUCTURE: per exam the open
// question ids, their `max` points and, for the library, the article paragraph each question follows (`part`, already
// public in the questions' references). The CONTENT (`modelAnswer`, `rubric` points, optional `context`) is private and
// loaded when first needed, from the first of:
//   1. env OPEN_RUBRICS_JSON  - the JSON text, or `base64:<base64 of the JSON>`
//   2. env OPEN_RUBRICS_FILE  - path to a JSON file
//   3. open-rubrics.private.json next to this module (gitignored, local only)
// The shape is described in open-rubrics.schema.md. A question with no private content has no rubric here
// (openRubricFor returns undefined), so it is not graded by AI: the exam behaves as if AI grading were off for it.
//
// `max` is the points the question is worth in QuizCore.scoreQuiz (quiz-core.js): every question has a weight
// (easy 1, medium 1.5, hard 2; a question without difficulty counts as medium) and is worth weight / sum of weights * 100.
//   library (sum 28):  library-15, 16 = 1.5/28*100 = 5.36;  library-19, 20 = 2/28*100 = 7.14
//   physics (sum 40.5, 27 tasks without difficulty): each open task = 1.5/40.5*100 = 3.70
// Rounded to 2 decimals, so auto earned + sum of AI scores stays within the scoreQuiz `pending` points and never
// exceeds 100. open-rubrics.test.mjs recomputes these numbers from the real pages with QuizCore.
//
// `context` is the study-material passage sent with the question. Library: the article paragraph named by the
// question's `part` (read from library-exam.html). Physics has no machine-readable study text, so its context is
// the private model answer; a private record may also give its own `context`.
import { readFileSync } from 'node:fs';

let libraryParagraphs;
let readLibraryHtml = () => readFileSync(new URL('./library-exam.html', import.meta.url), 'utf8');
// For tests only: replaces how the page is read (and forgets what was parsed).
export function setLibraryHtmlReader(reader) { readLibraryHtml = reader ?? (() => readFileSync(new URL('./library-exam.html', import.meta.url), 'utf8')); libraryParagraphs = undefined; }
// '' when the page is missing or its markup changed: the question is then graded without article context at worst, never a crash.
function libraryText(part) {
  try {
    if (!libraryParagraphs) {
      const html = readLibraryHtml();
      const article = /<article[^>]*id="article"[^>]*>([\s\S]*?)<\/article>/.exec(html)[1];
      const strip = value => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const title = strip(/<h2>([\s\S]*?)<\/h2>/.exec(article)?.[1] ?? '');
      // Paragraph 1 is the first <p> after the byline ("פסקה N" in the questions' references).
      const body = [...article.matchAll(/<p(?![^>]*class="byline")[^>]*>([\s\S]*?)<\/p>/g)].map(match => strip(match[1]));
      libraryParagraphs = { title, body };
    }
    const number = /^פסקה (\d+)$/.exec(part)?.[1];
    if (number && libraryParagraphs.body[number - 1]) return `${libraryParagraphs.title}\n${libraryParagraphs.body[number - 1]}`;
    return `${libraryParagraphs.title}\n${libraryParagraphs.body.map((text, i) => `פסקה ${i + 1}: ${text}`).join('\n')}`;
  } catch (error) {
    console.error('library context unavailable', error?.code ?? error?.name);
    return '';
  }
}

const libraryStructure = {
  'library-15': { max: 5.36, part: 'פסקה 5' },
  'library-16': { max: 5.36, part: 'פסקה 3' },
  'library-19': { max: 7.14, part: 'הטקסט כולו' },
  'library-20': { max: 7.14, part: 'הטקסט כולו' }
};
const physicsStructure = Object.fromEntries(['06', '11', '20', '22', '23', '25', '26'].map(n => [`physics-exam-${n}`, { max: 3.7 }]));

const structures = {
  'hebrew-v2-library': { structure: libraryStructure, contextOf: (part, rest) => rest.context ?? libraryText(part) },
  'physics-v1-assessment': { structure: physicsStructure, contextOf: (_part, rest) => rest.context ?? `תשובה לדוגמה של המורה: ${rest.modelAnswer}` }
};

// Public: the open question ids and max points per exam (no content).
export const openQuestionStructure = examId =>
  Object.hasOwn(structures, examId) ? Object.fromEntries(Object.entries(structures[examId].structure).map(([id, { max }]) => [id, max])) : {};

const validText = value => typeof value === 'string' && value.trim() !== '';
const validRecord = record => record && typeof record === 'object' && validText(record.modelAnswer)
  && Array.isArray(record.rubric) && record.rubric.length > 0 && record.rubric.every(validText)
  && (record.context === undefined || validText(record.context));

function parsePrivate(text) {
  const json = text.startsWith('base64:') ? Buffer.from(text.slice(7), 'base64').toString('utf8') : text;
  const data = JSON.parse(json);
  return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
}

// First available source, or null. Never logs content: only which source failed.
function readPrivate(env) {
  const sources = [
    ['OPEN_RUBRICS_JSON', () => (validText(env.OPEN_RUBRICS_JSON) ? env.OPEN_RUBRICS_JSON.trim() : null)],
    ['OPEN_RUBRICS_FILE', () => (validText(env.OPEN_RUBRICS_FILE) ? readFileSync(env.OPEN_RUBRICS_FILE.trim(), 'utf8') : null)],
    ['open-rubrics.private.json', () => {
      try { return readFileSync(new URL('./open-rubrics.private.json', import.meta.url), 'utf8'); } catch (error) { if (error?.code === 'ENOENT') return null; throw error; }
    }]
  ];
  for (const [name, read] of sources) {
    try {
      const text = read();
      if (text === null) continue;
      const data = parsePrivate(text.trim());
      if (data) return data;
      console.error('open rubrics ignored (not an object)', name);
    } catch (error) {
      console.error('open rubrics unreadable', name, error?.code ?? error?.name);
    }
  }
  return null;
}

// Parsed once per distinct configuration (so tests can change the env); frozen records only for ids and exams we know.
let cacheKey;
let cache = new Map();
const tablesFor = () => {
  const env = process.env;
  const key = [env.OPEN_RUBRICS_JSON, env.OPEN_RUBRICS_FILE].join('\u0000');
  if (cacheKey !== key || !cache.has('private')) {
    cacheKey = key;
    cache = new Map([['private', readPrivate(env)]]);
  }
  return cache;
};

export const openRubricsFor = examId => {
  if (!Object.hasOwn(structures, examId)) return {};
  const tables = tablesFor();
  if (!tables.has(examId)) {
    const content = tables.get('private')?.[examId];
    const { structure, contextOf } = structures[examId];
    const built = {};
    for (const [id, { part, max }] of Object.entries(structure)) {
      const record = content && typeof content === 'object' && Object.hasOwn(content, id) ? content[id] : undefined;
      if (!validRecord(record)) continue;
      built[id] = Object.freeze({ max, modelAnswer: record.modelAnswer, rubric: Object.freeze([...record.rubric]), context: contextOf(part, record) });
    }
    tables.set(examId, Object.freeze(built));
  }
  return tables.get(examId);
};
export const openRubricFor = (examId, questionId) => {
  const table = openRubricsFor(examId);
  return Object.hasOwn(table, questionId) ? table[questionId] : undefined;
};
