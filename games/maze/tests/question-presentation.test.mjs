import test from 'node:test';
import assert from 'node:assert/strict';
import snapshot from '../content-snapshot.js';
import { normalizeMazeContent } from '../content.js';
import { questionPresentation } from '../question-presentation.js';

const questions = snapshot.quizzes.flatMap(quiz => quiz.questions);
const question = id => structuredClone(questions.find(question => question.id === id));

test('all 62 source questions are audited and display without mutating academic content', () => {
  assert.equal(questions.length, 62);
  const before = JSON.stringify(snapshot);
  for (const raw of snapshot.quizzes) {
    const normalized = normalizeMazeContent(raw);
    for (const q of normalized.questions) {
      const display = questionPresentation({ ...q, options: q.choices.map((text, original) => ({ text, original })) });
      assert.ok(display.prompt.trim(), q.id);
      assert.ok(display.sourceLabel.trim(), q.id);
      assert.ok((display.prompt + display.context).length < 150, `${q.id} remains compact without truncating data`);
      assert.equal(display.adapted, /^(facts|questions|instructions|physics-pole)-/.test(q.id));
    }
  }
  assert.equal(JSON.stringify(snapshot), before);
});

test('fact and opinion statements remain visible verbatim with an explicit classification question', () => {
  for (const q of questions.filter(q => q.id.startsWith('facts-'))) {
    const display = questionPresentation(q);
    assert.equal(display.prompt, 'עובדה או דעה?');
    assert.equal(display.context + ' מה זה?', q.prompt);
  }
});

test('question-word and instruction questions name their scenario or exact command without a missing passage', () => {
  for (const q of questions.filter(q => /^(questions|instructions)-/.test(q.id))) {
    const display = questionPresentation(q);
    assert.ok(display.context);
    assert.ok(display.prompt.length <= 40);
  }
  assert.match(questionPresentation(question('instructions-01')).context, /העתיקו מהטקסט עובדה/);
  assert.match(questionPresentation(question('questions-03')).context, /קראו על צמחים לפני השתילה/);
});

test('all pole questions provide visible setup rather than referring to an unseen method', () => {
  for (const q of questions.filter(q => q.id.startsWith('physics-pole-'))) {
    const display = questionPresentation(q);
    assert.ok(display.context);
    assert.doesNotMatch(display.prompt, /בשיטה זו|לשיטה המתוארת|שיטת העמוד/);
  }
  for (const id of ['03', '07', '10']) {
    const { context } = questionPresentation(question(`physics-pole-${id}`));
    assert.match(context, /45°/);
    assert.match(context, /קרקע אופקית/);
    assert.match(context, /המרחק האופקי/);
  }
  assert.match(questionPresentation(question('physics-pole-03')).context, /6 מ׳.*1\.4 מ׳/);
  assert.match(questionPresentation(question('physics-pole-07')).context, /4 מ׳.*1\.5 מ׳/);
  assert.match(questionPresentation(question('physics-pole-10')).context, /5 מ׳/);
});

test('required setup does not directly reveal the angle or ground-condition answers being asked', () => {
  assert.doesNotMatch(questionPresentation(question('physics-pole-01')).context, /45/);
  assert.doesNotMatch(questionPresentation(question('physics-pole-06')).context, /קרקע אופקית|אותו מפלס/);
  assert.doesNotMatch(questionPresentation(question('physics-pole-08')).context, /ראש העמוד/);
  assert.doesNotMatch(questionPresentation(question('physics-pole-09')).context, /לכוון|למדוד ישירות/);
});

test('unknown IDs and changed live or saved academic variants keep their original wording without stale context', () => {
  const base = question('physics-pole-03');
  for (const changed of [
    { ...base, id: 'new-question' }, { ...base, prompt: 'מרחק אחר: 10 מטרים. מה הגובה?' },
    { ...base, choices: ['11.4 מטרים', '10 מטרים', '8.6 מטרים'] }, { ...base, correct: 1 },
    { ...base, ref: { ...base.ref, part: 'עמוד 1' } }, { ...base, ref: undefined }
  ]) {
    const display = questionPresentation(changed);
    assert.equal(display.prompt, changed.prompt);
    assert.equal(display.context, '');
    assert.equal(display.adapted, false);
  }
  assert.deepEqual(questionPresentation(null), { prompt: '', context: '', sourceLabel: '', adapted: false });
});

test('self-contained arithmetic and measurement prompts are preserved exactly', () => {
  for (const q of questions.filter(q => /^physics-(basics|units|precision)-/.test(q.id))) {
    const display = questionPresentation(q);
    assert.equal(display.prompt, q.prompt);
    assert.equal(display.context, '');
    assert.equal(display.adapted, false);
  }
});
