import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { extractContent } from './db/extract.mjs';
import { matchExam, autoCorrect } from './db/submissions.mjs';
const js = readFileSync(new URL('./english-exam.js', import.meta.url), 'utf8');
const questions = JSON.parse(JSON.stringify(runInNewContext(js.slice(js.indexOf('const questions'), js.indexOf('const $')) + '\nquestions;')));
const content = extractContent();
const rows = content.questions.filter(q => q.exam_id === 'english-v1-practice');

test('English has 20 stable questions, three types, 40/40/20 difficulty and all teacher sections', () => {
  assert.equal(questions.length, 20);
  assert.deepEqual(questions.map(q => q.id), Array.from({ length: 20 }, (_, i) => `english-${String(i + 1).padStart(2, '0')}`));
  assert.deepEqual(Object.fromEntries(Object.entries(Object.groupBy(questions, q => q.difficulty)).map(([k,v]) => [k,v.length])), { easy: 8, medium: 8, hard: 4 });
  assert.deepEqual(new Set(questions.map(q => q.type)), new Set(['mcq', 'truefalse', 'open']));
  for (const topic of ['הבנת הנקרא', 'אוצר מילים', 'חלקי דיבר', 'הווה פשוט — חיוב', 'הווה פשוט — שלילה', 'הווה פשוט — שאלות', 'כתיבה']) assert.ok(questions.some(q => q.topic === topic), topic);
  for (const q of questions) {
    const ref = content.study_references.find(r => r.id === q.ref.id);
    assert.ok(ref?.parts.some(p => p.part === q.ref.part), q.id);
    if (q.type === 'open') assert.ok(q.modelAnswer && q.rubric.length >= 2 && q.maxScore > 0, q.id);
    else assert.ok(q.choices[q.correct] && q.explanation.he, q.id);
  }
});
test('all shuffled English prompts match only their exam, with server grading and teacher-graded writing', () => {
  const answers = [...rows].reverse().map(q => ({ question: q.prompt, answer: q.choices ? q.choices[q.correct] : 'Written response' }));
  const matched = matchExam(content.questions.filter(q => q.exam_id), answers, 'english-v1-practice');
  assert.equal(matched.examId, 'english-v1-practice');
  assert.equal(new Set(matched.matched.map(q => q.id)).size, 20);
  matched.matched.forEach((q, i) => assert.equal(autoCorrect(q, answers[i].answer, true), q.type === 'open' ? null : true));
  assert.equal(matchExam(rows, [{ question: 'missing task' }], 'english-v1-practice').examId, null);
});
test('five source spot checks: passage details, vocabulary meanings and third-person grammar', () => {
  const passage = content.passages.find(p => p.id === 'english-reading').body_html;
  assert.match(passage, /small village near a river/);
  assert.match(passage, /does not work on Sundays/);
  assert.equal(questions[0].choices[questions[0].correct], 'In a village near a river.');
  assert.equal(questions[2].choices[questions[2].correct], 'False');
  assert.equal(questions[5].choices[questions[5].correct], 'מסע'); // Teacher's linked p12 vocabulary.
  assert.equal(questions[7].choices[questions[7].correct], 'meal'); // Teacher's linked p20 vocabulary.
  assert.equal(questions[16].choices[questions[16].correct], 'Does your aunt help visitors?');
});
