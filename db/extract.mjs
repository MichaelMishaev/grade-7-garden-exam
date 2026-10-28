import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';

const defaultRoot = new URL('../', import.meta.url);

// Evaluates a slice of a browser source file and returns plain, realm-free data.
const evaluate = (code) => JSON.parse(JSON.stringify(runInNewContext(code)));
const between = (text, start, end, from = 0) => {
  const a = text.indexOf(start, from);
  const b = text.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Source marker not found: ${start} … ${end}`);
  return text.slice(a, b);
};
const hash = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const pad = (n) => String(n).padStart(2, '0');

export function extractContent(root = defaultRoot) {
  const read = (file) => readFileSync(new URL(file, root), 'utf8');
  const gardenHtml = read('garden-exam.html');
  const libraryHtml = read('library-exam.html');
  const libraryJs = read('library-exam.js');
  const practiceJs = read('practice.js');
  const subjectHtml = read('subject.html');

  const gardenPrompts = evaluate(between(gardenHtml, 'const questions = [', '];') + '];\nquestions;');
  const libraryQuestions = evaluate(between(libraryJs, 'const questions', 'const $') + '\nquestions;');
  const quizSource = evaluate(practiceJs.slice(0, practiceJs.indexOf('const byId')) + '\nquizzes;');
  const subjectSource = evaluate(between(subjectHtml, 'const subjects = {', 'const key =') + '\nsubjects;');
  const physicsRows = evaluate(between(subjectHtml, 'innerHTML = [', '].map(').replace('innerHTML = ', '') + ']');

  const article = (html) => /<article[^>]*id="article"[^>]*>([\s\S]*?)<\/article>/.exec(html)[1].trim();
  const passages = [
    { id: 'garden', title: 'תלמידי כיתה ז׳ הקימו גינה בבית הספר', body_html: article(gardenHtml), source_file: 'garden-exam.html' },
    { id: 'library', title: 'הספרייה נפתחת גם בהפסקה', body_html: article(libraryHtml), source_file: 'library-exam.html' }
  ];

  const art = { hebrew: 'assets/books.png', physics: 'assets/atom.png' };
  const subjects = Object.entries(subjectSource).map(([id, s], i) => ({
    id, title: s.title, description: s.description, art_path: art[id] ?? null, sort_order: i + 1
  }));

  const examIds = ['hebrew-v1-garden', 'hebrew-v2-library'];
  const passageIds = ['garden', 'library'];
  const exams = subjectSource.hebrew.variants.map((v, i) => ({
    id: examIds[i], subject_id: 'hebrew', title: v.title, detail: v.detail, date_label: v.date,
    href: v.href, passage_id: passageIds[i], question_count: Number.parseInt(v.count, 10), sort_order: i + 1
  }));

  const hebrewRows = [...subjectHtml.matchAll(/href="practice\.html\?quiz=([\w-]+)"[\s\S]*?<strong>(.*?)<\/strong><small>(.*?) · \d+ שאלות<\/small>/g)]
    .map(([, id, title, detail]) => ({ id, list_title: title, list_detail: detail }));
  const physicsList = physicsRows.map(([id, title, detail]) => ({ id, list_title: title, list_detail: detail }));
  const listing = new Map([...hebrewRows, ...physicsList].map((r) => [r.id, r]));
  const exam1Quizzes = new Set(subjectSource.hebrew.variants[0].practiceQuizzes);
  const quizzes = Object.entries(quizSource).map(([id, q], i) => ({
    id, subject_id: id.startsWith('physics-') ? 'physics' : 'hebrew',
    exam_id: exam1Quizzes.has(id) ? examIds[0] : null,
    title: q.title, description: q.description,
    list_title: listing.get(id)?.list_title ?? null, list_detail: listing.get(id)?.list_detail ?? null,
    sort_order: i + 1
  }));

  const questions = [
    ...gardenPrompts.map((prompt, i) => ({
      id: `garden-${pad(i + 1)}`, exam_id: examIds[0], quiz_id: null, position: i + 1, type: 'open',
      topic: null, difficulty: null, prompt, choices: null, correct: null, explanation_he: null, explanation_en: null
    })),
    ...libraryQuestions.map((q, i) => ({
      id: q.id, exam_id: examIds[1], quiz_id: null, position: i + 1, type: q.type,
      topic: q.topic ?? null, difficulty: q.difficulty ?? null, prompt: q.prompt,
      choices: q.choices ?? null, correct: q.correct ?? null,
      explanation_he: q.explanation?.he ?? null, explanation_en: q.explanation?.en ?? null
    })),
    ...Object.entries(quizSource).flatMap(([quizId, quiz]) => quiz.questions.map((q, i) => ({
      id: `${quizId}-${pad(i + 1)}`, exam_id: null, quiz_id: quizId, position: i + 1, type: 'mcq',
      topic: null, difficulty: null, prompt: q.text, choices: q.choices, correct: q.correct,
      explanation_he: q.he ?? null, explanation_en: q.en ?? null
    })))
  ].map((q) => ({ ...q, source_hash: hash([q.id, q.exam_id, q.quiz_id, q.position, q.type, q.topic, q.difficulty, q.prompt, q.choices, q.correct, q.explanation_he, q.explanation_en]) }));

  return { subjects, passages, exams, quizzes, questions };
}

// One hash over everything, used as the content version (API ETag) and by verify.mjs.
export const contentHash = (content) => hash([
  content.subjects, content.passages, content.exams, content.quizzes, content.questions.map((q) => [q.id, q.source_hash])
]);
