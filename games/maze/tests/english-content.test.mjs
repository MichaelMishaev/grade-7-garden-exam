import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { englishGameQuiz } from '../../english-content.mjs';
import snapshot from '../content-snapshot.js';
import { normalizeMazeContent, loadMazeContent } from '../content.js';
import { createArcade, arcadeQuestion } from '../arcade-core.js';
import { makeRound, answer, academicScore, validQuiz, restoreRound } from '../../afterbell/src/core.js';
import { validateAttempt, contentHash } from '../../afterbell/service.mjs';

test('both game catalogs contain all 13 self-contained English choices verbatim from ENG-001', async () => {
  const expected = englishGameQuiz();
  const city = JSON.parse(await readFile(new URL('../../afterbell/src/content-snapshot.json', import.meta.url)));
  assert.equal(expected.questions.length, 13);
  assert.deepEqual(expected.questions.map(q => q.id), Array.from({length:13}, (_,i) => `english-${String(i+6).padStart(2,'0')}`));
  for (const catalog of [snapshot, city]) assert.deepEqual(catalog.quizzes.find(q => q.id === expected.id), expected);
  assert.ok(validQuiz(expected));
  const offline = await loadMazeContent({quizId:expected.id, fetchImpl:async()=>{throw new Error('offline');}});
  assert.equal(offline.questions.length, 13);
  assert.equal(offline.subjectId, 'english');
  const live = await loadMazeContent({quizId:expected.id, fetchImpl:async()=>({ok:true,json:async()=>expected})});
  assert.equal(live.source, 'live');
  assert.deepEqual(live.questions, normalizeMazeContent(expected).questions);
});

test('English rounds shuffle, lock, restore and retain weighted grading and game-save validation', () => {
  const quiz = englishGameQuiz(), round = makeRound(quiz);
  for (const q of round.questions) {
    assert.equal(answer(round,q.id,q.correct).correct,true);
    assert.equal(answer(round,q.id,q.correct),null);
  }
  assert.equal(academicScore(round),100);
  assert.deepEqual(restoreRound(JSON.stringify(round),quiz).answers,round.answers);
  assert.ok(validateAttempt({id:round.attemptId,name:'QA',quizId:quiz.id,contentHash:contentHash(quiz),startedAt:round.startedAt,answers:quiz.questions.map(q=>({id:q.id,choice:q.correct}))}));
  const arcade = createArcade(normalizeMazeContent(quiz));
  assert.equal(arcade.selected.length,3);
  assert.ok(arcadeQuestion(arcade).id.startsWith('english-'));
});

test('every game entry exposes the English subject selector', async () => {
  for (const file of ['afterbell/src/city.js','afterbell/src/main.js','maze/main.js','maze/arcade-main.js']) {
    assert.match(await readFile(new URL(`../../${file}`, import.meta.url),'utf8'), /english:'אנגלית'/,file);
  }
});
