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

// garden-exam.html keeps its questions as a plain string array (the submit payload), so its references are mapped
// here by rule: every garden question follows the garden passage, at this part (index = question number - 1).
const gardenParts = [
  'הטקסט כולו', 'הכותרת ושורת הפרטים', 'הכותרת ושורת הפרטים', 'הכותרת ושורת הפרטים', 'פסקה 1', 'פסקה 3', 'הטקסט כולו',
  'פסקה 3', 'פסקה 1', 'פסקה 2', 'פסקה 2', 'פסקה 1', 'פסקה 3', 'פסקה 2', 'פסקה 1', 'פסקה 1', 'הטקסט כולו', null,
  'הכותרת ושורת הפרטים', 'הטקסט כולו'
];
const passageByExam = { 'hebrew-v1-garden': 'garden', 'hebrew-v2-library': 'library' };
// Permanent test codes (docs/TESTING.md §1): the single source for exams.code in the database. The `exams` table in
// server.mjs repeats them for the email; db/exam-codes.test.mjs fails if the two ever differ.
export const examCodes = { 'hebrew-v1-garden': 'HEB-001', 'hebrew-v2-library': 'HEB-002', 'physics-v1-assessment': 'PHY-001' };

export function extractContent(root = defaultRoot) {
  const read = (file) => readFileSync(new URL(file, root), 'utf8');
  const gardenHtml = read('garden-exam.html');
  const libraryHtml = read('library-exam.html');
  const libraryJs = read('library-exam.js');
  const practiceJs = read('practice.js');
  const subjectHtml = read('subject.html');
  const physicsJs = read('physics-exam.js');

  const gardenPrompts = evaluate(between(gardenHtml, 'const questions = [', '];') + '];\nquestions;');
  const libraryQuestions = evaluate(between(libraryJs, 'const questions', 'const $') + '\nquestions;');
  const physicsQuestions = evaluate(between(physicsJs, 'const questions', 'const sections') + '\nquestions;');
  const quizSource = evaluate(practiceJs.slice(0, practiceJs.indexOf('const byId')) + '\nquizzes;');
  const subjectSource = evaluate(between(subjectHtml, 'const subjects = {', 'const key =') + '\nsubjects;');

  const article = (html) => /<article[^>]*id="article"[^>]*>([\s\S]*?)<\/article>/.exec(html)[1].trim();
  const passages = [
    { id: 'garden', title: 'תלמידי כיתה ז׳ הקימו גינה בבית הספר', body_html: article(gardenHtml), source_file: 'garden-exam.html' },
    { id: 'library', title: 'הספרייה נפתחת גם בהפסקה', body_html: article(libraryHtml), source_file: 'library-exam.html' }
  ];

  const art = { hebrew: 'assets/books.png', physics: 'assets/atom.png' };
  const subjects = Object.entries(subjectSource).map(([id, s], i) => ({
    id, title: s.title, description: s.description, art_path: art[id] ?? null, sort_order: i + 1
  }));

  const variants = Object.entries(subjectSource).flatMap(([subjectId, s]) => s.variants.map((v) => ({ subjectId, v })));
  const exams = variants.map(({ subjectId, v }, i) => ({
    id: v.id, code: examCodes[v.id] ?? null, subject_id: subjectId, title: v.title, detail: v.detail, date_label: v.date ?? null,
    href: v.href, passage_id: passageByExam[v.id] ?? null, question_count: Number.parseInt(v.count, 10), sort_order: i + 1
  }));
  const references = variants.flatMap(({ subjectId, v }) => (v.references ?? []).map((r) => ({ ...r, subjectId, examId: v.id })))
    .map((r, i) => ({
      id: r.id, subject_id: r.subjectId, exam_id: r.examId, quiz_id: null, kind: r.kind, title: r.title,
      url: r.url ?? null, attribution: r.attribution ?? null, parts: r.parts ?? null, sort_order: i + 1
    }));
  const gardenRef = subjectSource.hebrew.variants.find((v) => v.id === 'hebrew-v1-garden').references[0].id;

  const hebrewRows = [...subjectHtml.matchAll(/href="practice\.html\?quiz=([\w-]+)"[\s\S]*?<strong>(.*?)<\/strong><small>(.*?) · \d+ שאלות<\/small>/g)]
    .map(([, id, title, detail]) => ({ id, list_title: title, list_detail: detail }));
  const physicsList = subjectSource.physics.quizzes.map(([id, title, detail]) => ({ id, list_title: title, list_detail: detail }));
  const listing = new Map([...hebrewRows, ...physicsList].map((r) => [r.id, r]));
  const quizExam = new Map(variants.flatMap(({ v }) => (v.practiceQuizzes ?? []).map((quizId) => [quizId, v.id])));
  const quizzes = Object.entries(quizSource).map(([id, q], i) => ({
    id, subject_id: id.startsWith('physics-') ? 'physics' : 'hebrew',
    exam_id: quizExam.get(id) ?? null,
    title: q.title, description: q.description,
    list_title: listing.get(id)?.list_title ?? null, list_detail: listing.get(id)?.list_detail ?? null,
    sort_order: i + 1
  }));

  const ref = (r) => ({ reference_id: r?.id ?? null, reference_part: r?.part ?? null });
  const examQuestion = (examId) => (q, i) => ({
    id: q.id, exam_id: examId, quiz_id: null, position: i + 1, type: q.type,
    topic: q.topic ?? null, difficulty: q.difficulty ?? null, prompt: q.prompt,
    choices: q.choices ?? null, correct: q.correct ?? null,
    explanation_he: q.explanation?.he ?? null, explanation_en: q.explanation?.en ?? null, ...ref(q.ref)
  });
  const questions = [
    ...gardenPrompts.map((prompt, i) => ({
      id: `garden-${pad(i + 1)}`, exam_id: 'hebrew-v1-garden', quiz_id: null, position: i + 1, type: 'open',
      topic: null, difficulty: null, prompt, choices: null, correct: null, explanation_he: null, explanation_en: null,
      ...ref({ id: gardenRef, part: gardenParts[i] })
    })),
    ...libraryQuestions.map(examQuestion('hebrew-v2-library')),
    ...physicsQuestions.map(examQuestion('physics-v1-assessment')),
    ...Object.entries(quizSource).flatMap(([quizId, quiz]) => quiz.questions.map((q, i) => ({
      id: `${quizId}-${pad(i + 1)}`, exam_id: null, quiz_id: quizId, position: i + 1, type: q.type || 'mcq',
      topic: null, difficulty: null, prompt: q.text, choices: q.choices ?? null, correct: q.correct,
      explanation_he: q.he ?? null, explanation_en: q.en ?? null, ...ref(q.ref)
    })))
  ].map((q) => ({ ...q, source_hash: hash([q.id, q.exam_id, q.quiz_id, q.position, q.type, q.topic, q.difficulty, q.prompt, q.choices, q.correct, q.explanation_he, q.explanation_en, q.reference_id, q.reference_part]) }));

  return { subjects, passages, exams, quizzes, study_references: references, questions };
}

// One hash over everything, used as the content version (API ETag) and by verify.mjs.
export const contentHash = (content) => hash([
  content.subjects, content.passages, content.exams, content.quizzes, content.study_references, content.questions.map((q) => [q.id, q.source_hash])
]);
