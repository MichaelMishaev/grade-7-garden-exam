import test from 'node:test';
import assert from 'node:assert/strict';
import snapshot from '../content-snapshot.js';
import { englishTeacherQuizzes, teacherSources } from '../../english-teacher-content.mjs';
import { extractContent } from '../../../db/extract.mjs';
import { normalizeMazeContent } from '../content.js';
import { questionMedia } from '../../english-question-media.js';
import { validQuiz, makeRound, answer, academicScore, restoreRound } from '../../afterbell/src/core.js';
import { contentHash, validateAttempt } from '../../afterbell/service.mjs';

const quizzes = englishTeacherQuizzes();
test('all ten readable teacher links have a complete bank, with three explicit faulty-source exclusions', () => {
  assert.deepEqual(quizzes.map(q => q.questions.length), [25,25,17,29,10,9,12,15,15,12]);
  assert.equal(quizzes.flatMap(q => q.questions).length,169);
  assert.deepEqual(teacherSources.sources.flatMap(s => s.items.filter(i => i.excluded).map(i => i.term)), ['pepper','salt','tierd']);
  assert.equal(teacherSources.unavailable.length,1);
  assert.match(teacherSources.unavailable[0].url,/elt\.oup\.com/);
});

test('every nonexcluded source item appears once, with the exact source prompt/options/key and registered reference', () => {
  const references = extractContent().study_references;
  for (const source of teacherSources.sources) {
    const quiz = quizzes.find(q => q.id === source.id);
    assert.deepEqual(snapshot.quizzes.find(q => q.id === quiz.id),quiz);
    const items = source.items.filter(i => !i.excluded);
    assert.deepEqual(quiz.questions.map(q => q.position),items.map(i => i.index));
    for (const item of items) {
      const q = quiz.questions.find(q => q.position === item.index);
      assert.ok(q.explanation.he && q.explanation.en);
      assert.ok(references.find(r => r.id === q.ref.id)?.parts.some(p => p.part === q.ref.part));
      assert.equal(new Set(q.choices).size,q.choices.length);
      if (source.kind === 'choice') {
        assert.equal(q.prompt,item.prompt); assert.deepEqual(q.choices,item.choices); assert.equal(q.correct,item.correct);
        if (item.image) { assert.equal(q.image,item.image); assert.ok(q.context); assert.match(questionMedia(q), /<img /); }
      } else if (source.kind === 'fill') {
        assert.equal(q.prompt,item.prompt); assert.equal(q.choices[q.correct],item.answer);
      } else {
        assert.ok(q.prompt.includes(item.term)); assert.equal(q.choices[q.correct], item.meaning || item.category);
      }
    }
  }
});

test('every bank supports both game engines, pinned context/images, locked scoring, reload and validated result saves', () => {
  for (const quiz of quizzes) {
    assert.ok(validQuiz(quiz),quiz.id);
    const normalized = normalizeMazeContent(quiz);
    assert.deepEqual(normalizeMazeContent(JSON.parse(JSON.stringify(normalized)),{pinned:true}),normalized);
    for (const q of quiz.questions) {
      assert.equal(normalized.questions.find(n => n.id === q.id).context,q.context);
      assert.equal(normalized.questions.find(n => n.id === q.id).image,q.image);
    }
    const round = makeRound(quiz);
    for (const q of round.questions) { answer(round,q.id,q.correct); assert.equal(answer(round,q.id,q.correct),null); }
    assert.equal(academicScore(round),100); assert.ok(restoreRound(JSON.stringify(round),quiz));
    const result = validateAttempt({id:round.attemptId,name:'QA',quizId:quiz.id,startedAt:round.startedAt,contentHash:contentHash(quiz),answers:quiz.questions.map(q=>({id:q.id,choice:q.correct}))});
    assert.equal(result.score,100);
  }
});

test('source media is escaped and image URLs are restricted to the verified public source host', () => {
  assert.equal(questionMedia({image:'javascript:alert(1)'}),'');
  assert.equal(questionMedia({image:'https://evil.example/image'}),'');
  assert.ok(!questionMedia({context:'<script>hello</script>'}).includes('<script>'));
});
