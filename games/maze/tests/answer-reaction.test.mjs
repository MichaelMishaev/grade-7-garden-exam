import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answerReactionPose, ANSWER_REACTION_MS } from '../answer-reaction.js';

test('both answer reactions start and settle in the neutral pose', () => {
  const neutral = answerReactionPose(null);
  for (const correct of [true, false]) {
    for (const elapsedMs of [0, ANSWER_REACTION_MS, ANSWER_REACTION_MS + 100]) {
      for (const value of Object.values(answerReactionPose({ correct, elapsedMs }))) assert.ok(Math.abs(value) < 1e-12);
    }
    assert.deepEqual(answerReactionPose({correct, elapsedMs:300}, true), neutral);
  }
});

test('correct answers hop and lift arms; wrong answers shake head and lower arms', () => {
  const happy = answerReactionPose({correct:true, elapsedMs:300});
  const wrong = answerReactionPose({correct:false, elapsedMs:225});
  assert.ok(happy.lift > 0.1 && happy.arms > 0.5);
  assert.equal(happy.headYaw, 0);
  assert.ok(wrong.lift < 0 && wrong.arms < 0 && Math.abs(wrong.headYaw) > 0.1);
  assert.ok(wrong.headYaw * answerReactionPose({correct:false,elapsedMs:450}).headYaw < 0);
});
