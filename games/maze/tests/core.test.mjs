import test from 'node:test';
import assert from 'node:assert/strict';
import { MAZE, START, EXIT, CLUE, TREASURE, ENCOUNTERS, EXTRA_ENCOUNTERS, encountersFor, CREATURES, creaturePosition, isWalkable, pathTo, createState, transition, currentQuestion, progress, restoreState } from '../core.js';

// Synthetic questions carry no student data and never call a provider or server.
const QUESTIONS = Array.from({ length: 6 }, (_, index) => ({ id: `fixture-${index}`, prompt: `שאלת בדיקה ${index + 1}`, choices: ['אפשרות א', 'אפשרות ב', 'אפשרות ג'], correct: index % 3, difficulty: index < 2 ? 'easy' : index < 4 ? 'medium' : 'hard', explanation: { he: 'הסבר בדיקה', en: 'Fixture explanation' }, ref: { id: 'fixture', part: '1' } }));
const fresh = () => createState(QUESTIONS, () => 0.999999);
const act = (state, type, detail = {}) => transition(state, { type, ...detail }, QUESTIONS);
const wrongChoice = question => (question.correct + 1) % question.choices.length;

function settle(state, correctness, reviewCorrect = false) {
  for (let safety = 0; state.phase !== 'explore' && state.phase !== 'complete' && safety < 100; safety++) {
    if (state.phase === 'question') {
      const question = currentQuestion(state, QUESTIONS);
      state = act(state, 'answer', { choice: correctness(question) ? question.correct : wrongChoice(question) });
    } else if (state.phase === 'feedback' || state.phase === 'review-feedback') state = act(state, 'continue');
    else if (state.phase === 'capture') state = act(state, 'skip-capture');
    else if (state.phase === 'review') {
      const question = currentQuestion(state, QUESTIONS);
      state = question ? act(state, 'review-answer', { choice: reviewCorrect ? question.correct : wrongChoice(question) }) : act(state, 'guided-continue');
    }
  }
  assert.ok(state.phase === 'explore' || state.phase === 'complete', 'every encounter has a bounded release');
  return state;
}
function travel(state, destination, correctness = () => true, reviewCorrect = false) {
  for (let step = 0; step < 300; step++) {
    state = settle(state, correctness, reviewCorrect);
    if (state.player.x === destination.x && state.player.y === destination.y) return state;
    const path = pathTo(state.player, destination);
    assert.ok(path?.length, 'destination is reachable');
    state = act(state, 'move', { dx: path[0].x - state.player.x, dy: path[0].y - state.player.y });
  }
  assert.fail('travel must not loop indefinitely');
}
function finish(correctness, reviewCorrect = false) {
  let state = fresh();
  for (const room of ENCOUNTERS) state = travel(state, room, correctness, reviewCorrect);
  state = travel(state, EXIT, correctness, reviewCorrect);
  assert.equal(state.phase, 'complete');
  return state;
}
function atQuestion(state = fresh()) {
  const room = ENCOUNTERS[0], path = pathTo(state.player, room);
  for (const point of path) state = act(state, 'move', { dx: point.x - state.player.x, dy: point.y - state.player.y });
  assert.equal(state.phase, 'question');
  return state;
}
function captured() {
  let state = fresh();
  for (const room of ENCOUNTERS) {
    const path = pathTo(state.player, room);
    for (const point of path) {
      state = act(state, 'move', { dx: point.x - state.player.x, dy: point.y - state.player.y });
      if (state.phase === 'question') break;
    }
    while (state.phase === 'question' || state.phase === 'feedback') {
      if (state.phase === 'feedback') state = act(state, 'continue');
      else state = act(state, 'answer', { choice: wrongChoice(currentQuestion(state, QUESTIONS)) });
    }
    if (state.phase === 'capture') return state;
  }
  assert.fail('fixture should reach capture');
}

test('all walkable tiles, landmarks and creature paths connect to the exit', () => {
  assert.equal(new Set(MAZE.map(row => row.length)).size, 1);
  for (let y = 0; y < MAZE.length; y++) for (let x = 0; x < MAZE[y].length; x++) if (isWalkable(x, y)) assert.ok(pathTo({ x, y }, EXIT), `tile ${x},${y}`);
  for (const landmark of [START, EXIT, CLUE, TREASURE, ...ENCOUNTERS, ...CREATURES.flatMap(creature => creature.path)]) assert.ok(isWalkable(landmark.x, landmark.y));
  assert.equal(pathTo(START, { x: 0, y: 0 }), null);
});

test('movement cannot clip walls, skip cells, move diagonally or move during a question', () => {
  const state = fresh();
  for (const delta of [{ dx: -1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 2, dy: 0 }, { dx: 1, dy: 1 }, { dx: NaN, dy: 0 }]) assert.equal(act(state, 'move', delta), state);
  const question = atQuestion();
  assert.equal(act(question, 'move', { dx: 1, dy: 0 }), question);
});

test('question order and option permutations preserve every original source index', () => {
  const state = createState(QUESTIONS, () => 0);
  assert.deepEqual([...state.order].sort(), QUESTIONS.map(q => q.id).sort());
  for (const q of QUESTIONS) assert.deepEqual([...state.choiceOrders[q.id]].sort(), [0, 1, 2]);
  const question = currentQuestion(atQuestion(state), QUESTIONS);
  assert.ok(question.options.every(option => option.text === question.choices[option.original]));
});

test('correct answer pays once and locks first answer without mutating prior state', () => {
  const state = atQuestion(), question = currentQuestion(state, QUESTIONS);
  const answered = act(state, 'answer', { choice: question.correct });
  assert.equal(answered.coins, 10); assert.equal(answered.hearts, 3); assert.equal(answered.phase, 'feedback');
  assert.deepEqual(state.answers, {});
  assert.equal(act(answered, 'answer', { choice: wrongChoice(question) }), answered);
  const restored = restoreState(JSON.stringify(answered), QUESTIONS);
  assert.equal(restored.coins, 10); assert.equal(restored.phase, 'feedback');
  assert.equal(act(restored, 'answer', { choice: question.correct }), restored);
});

test('invalid choices do not consume a heart, answer or reward', () => {
  const state = atQuestion();
  for (const choice of [-1, 99, 0.5, null, '1', NaN]) assert.equal(act(state, 'answer', { choice }), state);
});

test('wrong answers lose one heart, pay no coins and still earn room seals', () => {
  let state = atQuestion();
  state = settle(state, () => false);
  assert.equal(state.hearts, 1); assert.equal(state.coins, 0); assert.deepEqual(state.seals, ['floor']);
  assert.equal(Object.keys(state.answers).length, 2);
  const again = act(state, 'interact');
  assert.equal(again, state, 'resolved room cannot reopen and farm coins');
});

test('zero hearts captures exactly once and freezes hazards until guided recovery', () => {
  const state = captured();
  assert.equal(state.hearts, 0); assert.equal(state.captureCount, 1);
  assert.equal(act(state, 'answer', { choice: 0 }), state);
  assert.equal(act(state, 'move', { dx: 1, dy: 0 }), state);
  const timed = act(state, 'tick', { ms: 2999 }); assert.equal(timed.phase, 'capture');
  const review = act(timed, 'tick', { ms: 1 }); assert.equal(review.phase, 'review');
  assert.equal(review.review.ids.length, 2);
  assert.ok(review.review.ids.every(id => review.answers[id].correct === false));
});

test('all-wrong review is bounded and never changes original score, coins or seals', () => {
  const state = captured(), originalAnswers = JSON.stringify(state.answers), seals = [...state.seals];
  const recovered = settle(state, () => false);
  assert.equal(recovered.hearts, 3); assert.equal(recovered.graceMs, 5000);
  assert.equal(JSON.stringify(recovered.answers), originalAnswers); assert.deepEqual(recovered.seals, seals); assert.equal(recovered.coins, 0);
  assert.equal(progress(recovered, QUESTIONS).score, 0);
  assert.ok(isWalkable(recovered.player.x, recovered.player.y));
  assert.ok(!CREATURES.some(creature => creature.path.some(point => point.x === recovered.player.x && point.y === recovered.player.y)));
  assert.ok(!ENCOUNTERS.some(room => room.x === recovered.player.x && room.y === recovered.player.y));
});

test('every original-correctness combination completes including every answer wrong', () => {
  for (let mask = 0; mask < 64; mask++) {
    const state = finish(question => !!(mask & (1 << QUESTIONS.findIndex(q => q.id === question.id))));
    assert.equal(Object.keys(state.answers).length, QUESTIONS.length);
    assert.equal(state.seals.length, 3);
    assert.equal(state.coins, Object.values(state.answers).filter(answer => answer.correct).length * 10);
  }
  const allWrong = finish(() => false, true);
  assert.equal(progress(allWrong, QUESTIONS).score, 0, 'correct review cannot repair an original score');
  assert.equal(allWrong.coins, 0); assert.equal(allWrong.captureCount, 2);
});

test('weighted academic score follows first original answers only', () => {
  const state = finish(q => q.difficulty === 'hard');
  assert.equal(progress(state, QUESTIONS).score, 44);
  assert.equal(progress(state, QUESTIONS).correct, 2);
});

test('pause freezes movement, capture, elapsed time and grace countdown', () => {
  const state = act(fresh(), 'pause');
  assert.equal(act(state, 'tick', { ms: 50000 }), state);
  assert.equal(act(state, 'move', { dx: 1, dy: 0 }), state);
  const unpaused = act(state, 'resume'); assert.equal(unpaused.paused, false);
  const pausedCapture = act(captured(), 'pause'); assert.equal(act(pausedCapture, 'tick', { ms: 3000 }), pausedCapture);
  const recovery = settle(captured(), () => false);
  assert.equal(act(act(recovery, 'pause'), 'tick', { ms: 5000 }).graceMs, 5000);
  assert.equal(act(recovery, 'tick', { ms: 2000 }).graceMs, 3000);
});

test('reload resumes locked feedback, capture and both review phases without payout duplication', () => {
  let state = captured();
  for (let i = 0; i < 13; i++) {
    const restored = restoreState(JSON.stringify(state), QUESTIONS);
    assert.ok(restored); assert.equal(restored.phase, state.phase); assert.deepEqual(restored.answers, state.answers); assert.equal(restored.coins, state.coins);
    state = restored;
    if (state.phase === 'capture') state = act(state, 'skip-capture');
    else if (state.phase === 'review') state = act(state, 'review-answer', { choice: wrongChoice(currentQuestion(state, QUESTIONS)) });
    else if (state.phase === 'review-feedback') state = act(state, 'continue');
    else break;
  }
  assert.equal(state.phase, 'explore'); assert.equal(state.hearts, 3);
});

test('corrupt recovery queue and invalid position repair without erasing valid progress', () => {
  const state = captured(); state.phase = 'review-feedback'; state.review = { ids: [], index: 18, wrong: 99 };
  state.player = { x: 0, y: 0 }; state.coins = 9999; state.seals = ['fake'];
  const restored = restoreState(state, QUESTIONS);
  assert.ok(restored); assert.equal(restored.phase, 'review'); assert.equal(restored.review.ids.length, 2);
  assert.deepEqual(restored.answers, state.answers); assert.equal(restored.coins, 0); assert.ok(isWalkable(restored.player.x, restored.player.y));
  assert.equal(settle(restored, () => false).hearts, 3);
});

test('empty valid review pool gets an environmental guided escape instead of a dead screen', () => {
  const state = fresh(); state.hearts = 0; state.phase = 'capture';
  const review = act(restoreState(state, QUESTIONS), 'skip-capture');
  assert.equal(review.review.guided, true); assert.equal(currentQuestion(review, QUESTIONS), null);
  const escaped = act(review, 'guided-continue'); assert.equal(escaped.hearts, 3); assert.equal(escaped.phase, 'explore');
});

test('a single available mistake may be reused for both clearly separate review steps', () => {
  const state = atQuestion(); const question = currentQuestion(state, QUESTIONS);
  const oneWrong = act(state, 'answer', { choice: wrongChoice(question) }); oneWrong.hearts = 0; oneWrong.phase = 'capture';
  const review = act(oneWrong, 'skip-capture');
  assert.deepEqual(review.review.ids, [question.id, question.id]);
  assert.equal(settle(review, () => false).phase, 'explore');
});

test('content identity mismatch is rejected rather than silently replacing the attempt bank', () => {
  const state = fresh(); const modified = QUESTIONS.map(q => ({ ...q })); modified[0].correct = 2;
  assert.equal(restoreState(state, modified), null);
  assert.equal(restoreState('{bad json', QUESTIONS), null);
  assert.throws(() => createState([]));
});

test('clue and optional treasure can be discovered without changing academic score or coins', () => {
  let state = travel(fresh(), CLUE);
  assert.deepEqual(state.clues, ['route']);
  state = travel(state, TREASURE);
  assert.equal(state.treasureCollected, true);
  const coins = state.coins; state = travel(state, CLUE); state = travel(state, TREASURE);
  assert.equal(state.coins, coins);
});

test('exit is reachable but remains locked until all original questions and three seals are complete', () => {
  // Move directly to the gate via a path that avoids question rooms.
  let state = fresh();
  for (const point of pathTo(START, EXIT)) {
    state = settle(state, () => true);
    if (state.player.x === point.x && state.player.y === point.y) continue;
    state = act(state, 'move', { dx: point.x - state.player.x, dy: point.y - state.player.y });
  }
  assert.notEqual(state.phase, 'complete');
  assert.ok(state.notice?.includes('חותמים'));
});

test('every supported bank size remains completable when every original and review answer is wrong', () => {
  for (let count = 1; count <= 30; count++) {
    const questions = Array.from({ length: count }, (_, index) => ({ ...QUESTIONS[index % QUESTIONS.length], id: `size-${count}-q-${index}` }));
    let state = createState(questions, () => 0.999999);
    for (let safety = 0; safety < 1500 && state.phase !== 'complete'; safety++) {
      let action;
      if (state.phase === 'question') action = { type: 'answer', choice: wrongChoice(currentQuestion(state, questions)) };
      else if (state.phase === 'feedback' || state.phase === 'review-feedback') action = { type: 'continue' };
      else if (state.phase === 'capture') action = { type: 'skip-capture' };
      else if (state.phase === 'review') action = currentQuestion(state, questions) ? { type: 'review-answer', choice: wrongChoice(currentQuestion(state, questions)) } : { type: 'guided-continue' };
      else {
        const target = encountersFor(questions).find(room => !state.resolved.includes(room.id)) || EXIT;
        const path = pathTo(state.player, target);
        action = path.length ? { type: 'move', dx: path[0].x - state.player.x, dy: path[0].y - state.player.y } : { type: 'interact' };
      }
      state = transition(state, action, questions);
      // Every single state boundary can survive a JSON save/reload.
      state = restoreState(JSON.stringify(state), questions);
      assert.ok(state, `size ${count} transition restores`);
    }
    assert.equal(state.phase, 'complete', `bank size ${count} must escape`);
    assert.equal(progress(state, questions).score, 0);
    assert.equal(Object.keys(state.answers).length, count);
    assert.equal(state.coins, 0);
  }
});


test('patrol contact starts an ordinary question encounter without passive or stacked heart loss', () => {
  let state = fresh(); state.player = { x: 9, y: 5 };
  const caught = act(state, 'move', { dx: 1, dy: 0 });
  assert.equal(caught.phase, 'question'); assert.equal(caught.activeEncounter, 'cage');
  assert.equal(caught.hearts, 3); assert.equal(caught.coins, 0);
  assert.equal(act(caught, 'tick', { ms: 60000 }), caught, 'patrol and danger freeze while answering');
  const question = currentQuestion(caught, QUESTIONS);
  const wrong = act(caught, 'answer', { choice: wrongChoice(question) });
  assert.equal(wrong.hearts, 2);
  assert.equal(act(wrong, 'tick', { ms: 60000 }), wrong, 'feedback cannot stack contact penalties');
});

test('swept patrol contact is detected on deterministic large time steps', () => {
  const state = fresh(); state.player = { x: 12, y: 5 };
  const caught = act(state, 'tick', { ms: 10000 });
  assert.equal(caught.phase, 'question'); assert.equal(caught.activeEncounter, 'cage');
  assert.equal(caught.elapsedMs, 3200, 'stop the world at the first contact instead of a later visual tile');
  assert.deepEqual(creaturePosition(CREATURES[0], caught.elapsedMs), caught.player);
  assert.equal(caught.hearts, 3);
});

test('post-capture grace suppresses roaming creatures but never permanently blocks encounters', () => {
  let state = fresh(); state.player = { x: 12, y: 5 }; state.graceMs = 5000;
  state = act(state, 'tick', { ms: 4000 });
  assert.equal(state.phase, 'explore'); assert.equal(state.graceMs, 1000);
  state = act(state, 'tick', { ms: 10000 });
  assert.equal(state.phase, 'question'); assert.equal(state.elapsedMs, 6400);
  assert.equal(state.hearts, 3);
});

test('resolved room creatures never reopen their encounter or pay again', () => {
  let state = fresh(); state.player = { x: 9, y: 5 };
  state = settle(act(state, 'move', { dx: 1, dy: 0 }), () => true);
  assert.ok(state.seals.includes('cage'));
  const coins = state.coins;
  state = act(state, 'tick', { ms: 20000 });
  assert.equal(state.phase, 'explore'); assert.equal(state.coins, coins); assert.equal(state.hearts, 3);
});

test('creature ping-pong remains on collision-safe tiles without an end-to-start teleport', () => {
  for (const creature of CREATURES) {
    let previous = creaturePosition(creature, 0);
    for (let time = 100; time <= 30000; time += 100) {
      const current = creaturePosition(creature, time);
      assert.ok(isWalkable(current.x, current.y));
      assert.ok(Math.abs(current.x - previous.x) + Math.abs(current.y - previous.y) <= 1);
      previous = current;
    }
  }
});


test('capture returns to the nearest safe reachable tile beyond a narrow patrol corridor, never the entrance', () => {
  for (const origin of [...ENCOUNTERS, ...EXTRA_ENCOUNTERS, ...CREATURES.flatMap(creature => creature.path)]) {
    let state = fresh();
    state.player = { x: origin.x, y: origin.y };
    state.capturePosition = { ...state.player };
    state.phase = 'capture'; state.hearts = 0;
    state = settle(state, () => false);
    const route = pathTo(origin, state.player);
    assert.ok(route && route.length <= 5, `recovery from ${origin.x},${origin.y} stays nearby`);
    assert.notDeepEqual(state.player, START, 'capture far from entrance never returns there');
    assert.ok(![...ENCOUNTERS, ...EXTRA_ENCOUNTERS].some(room => room.x === state.player.x && room.y === state.player.y));
    assert.ok(!CREATURES.flatMap(creature => creature.path).some(point => point.x === state.player.x && point.y === state.player.y));
    assert.equal(state.graceMs, 5000);
  }
  let cage = fresh(); cage.player = { x: 12, y: 5 }; cage.capturePosition = { ...cage.player }; cage.phase = 'capture'; cage.hearts = 0;
  cage = settle(cage, () => false);
  assert.equal(pathTo({ x: 12, y: 5 }, cage.player).length, 2, 'patrol corridor recovery searches two tiles to a safe corridor');
});


test('each nonempty trap contains one to three questions while the full source bank is preserved', () => {
  for (let count = 1; count <= 30; count++) {
    const questions = Array.from({ length: count }, (_, index) => ({ ...QUESTIONS[index % QUESTIONS.length], id: `cap-${count}-${index}` }));
    const state = createState(questions, () => 0.999999), rooms = encountersFor(questions);
    assert.equal(rooms.length, Math.max(3, Math.ceil(count / 3)));
    const assignments = Object.values(state.assignments);
    assert.ok(assignments.every(ids => ids.length <= 3));
    assert.ok(assignments.filter(ids => ids.length).every(ids => ids.length >= 1));
    const flattened = assignments.flat();
    assert.equal(flattened.length, count);
    assert.deepEqual([...flattened].sort(), questions.map(q => q.id).sort());
    assert.equal(new Set(flattened).size, count, 'no duplicate or dropped originals');
    assert.ok(rooms.every(room => pathTo(START, room) && pathTo(room, EXIT)));
  }
  assert.deepEqual(Object.values(fresh().assignments).map(ids => ids.length), [2, 2, 2], 'default six-question round stays three two-question rooms');
  assert.equal(new Set([...ENCOUNTERS, ...EXTRA_ENCOUNTERS].map(room => `${room.x},${room.y}`)).size, 10);
});

test('old eleven-question saves migrate to capped assignments without losing original answers or feedback', () => {
  const questions = Array.from({ length: 11 }, (_, index) => ({ ...QUESTIONS[index % QUESTIONS.length], id: `legacy-${index}` }));
  const saved = createState(questions, () => 0.999999);
  saved.assignments = Object.fromEntries(ENCOUNTERS.map((room, i) => [room.id, saved.order.filter((_, index) => Math.min(2, Math.floor(index * 3 / saved.order.length)) === i)]));
  for (const id of saved.assignments.floor) {
    const q = questions.find(q => q.id === id);
    saved.answers[id] = { choice: q.correct, correct: true };
  }
  saved.phase = 'feedback'; saved.player = { x: 4, y: 5 }; saved.activeEncounter = 'floor';
  saved.lastAnswer = { id: 'legacy-3', ...saved.answers['legacy-3'] }; saved.coins = 40; saved.seals = ['floor'];
  const restored = restoreState(saved, questions);
  assert.ok(restored); assert.equal(restored.phase, 'feedback'); assert.deepEqual(restored.answers, saved.answers);
  assert.deepEqual(restored.player, saved.player); assert.equal(restored.coins, 40);
  assert.deepEqual(Object.values(restored.assignments).map(ids => ids.length), [3, 3, 3, 2]);
  assert.equal(Object.values(restored.assignments).flat().length, 11);
  assert.equal(currentQuestion(restored, questions).id, 'legacy-3', 'locked feedback keeps the original source question');
  const continued = transition(restored, { type: 'continue' }, questions);
  assert.equal(continued.phase, 'explore'); assert.equal(Object.keys(continued.answers).length, 4);
});

test('old pending question at a remapped finished room releases safely without answering it twice', () => {
  const questions = Array.from({ length: 11 }, (_, index) => ({ ...QUESTIONS[index % QUESTIONS.length], id: `pending-${index}` }));
  const saved = createState(questions, () => 0.999999);
  for (const q of questions.slice(0, 3)) saved.answers[q.id] = { choice: q.correct, correct: true };
  saved.phase = 'question'; saved.activeEncounter = 'floor'; saved.player = { x: 4, y: 5 };
  const restored = restoreState(saved, questions);
  assert.equal(restored.phase, 'explore'); assert.equal(restored.activeEncounter, null);
  assert.equal(Object.keys(restored.answers).length, 3); assert.equal(restored.coins, 30);
  assert.ok(restored.assignments.cage.includes('pending-3'), 'unanswered original remains assigned to its new room');
});


test('a previously earned legacy cage seal survives remapping, subsequent play and repeated reload', () => {
  const questions = Array.from({ length: 11 }, (_, index) => ({ ...QUESTIONS[index % QUESTIONS.length], id: `seal-${index}` }));
  const saved = createState(questions, () => 0.999999);
  saved.assignments = Object.fromEntries(ENCOUNTERS.map((room, i) => [room.id, saved.order.filter((_, index) => Math.min(2, Math.floor(index * 3 / saved.order.length)) === i)]));
  saved.sealProofs = undefined;
  for (const id of saved.assignments.cage) {
    const q = questions.find(q => q.id === id); saved.answers[id] = { choice: q.correct, correct: true };
  }
  saved.seals = ['cage']; saved.coins = 40; saved.player = { x: 11, y: 5 };
  let state = restoreState(saved, questions);
  assert.deepEqual(state.seals, ['cage'], 'migration cannot remove a legitimately earned seal');
  assert.deepEqual(state.sealProofs.cage, ['seal-4', 'seal-5', 'seal-6', 'seal-7']);
  assert.equal(state.resolved.includes('cage'), false, 'new cage question remains pending');
  assert.equal(progress(state, questions).complete, false);
  state = transition(state, { type: 'tick', ms: 1000 }, questions);
  state = restoreState(JSON.stringify(state), questions);
  assert.ok(state.seals.includes('cage'), 'monotonic seal survives a subsequent transition and save');
  assert.equal(state.resolved.includes('cage'), false);
  state = transition(state, { type: 'interact' }, questions);
  assert.equal(state.phase, 'question', 'pending capped cage encounter can still open');
  assert.equal(currentQuestion(state, questions).id, 'seal-3');
  state = transition(state, { type: 'answer', choice: wrongChoice(currentQuestion(state, questions)) }, questions);
  assert.ok(state.seals.includes('cage')); assert.ok(state.resolved.includes('cage'));
  assert.equal(state.answers['seal-3'].correct, false);
  state = restoreState(JSON.stringify(state), questions);
  assert.ok(state.seals.includes('cage')); assert.ok(state.resolved.includes('cage'));
  assert.equal(progress(state, questions).complete, false, 'earned seal never bypasses the unanswered originals');
});

test('unearned seal flags and invalid legacy proof IDs are never trusted on restore', () => {
  const questions = Array.from({ length: 11 }, (_, index) => ({ ...QUESTIONS[index % QUESTIONS.length], id: `invalid-seal-${index}` }));
  const saved = createState(questions, () => 0.999999);
  saved.seals = ['floor', 'cage', 'guardian'];
  saved.sealProofs = { floor: [], cage: ['not-a-question'], guardian: ['invalid-seal-1'] };
  saved.assignments = { cage: [] };
  const state = restoreState(saved, questions);
  assert.deepEqual(state.seals, []); assert.deepEqual(state.sealProofs, {});
});

test('corrupted huge saved timer cannot freeze patrols or erase original progress', () => {
  const saved = fresh(), question = QUESTIONS[0];
  saved.answers[question.id] = {choice:question.correct,correct:true};
  saved.coins = 10; saved.elapsedMs = Number.MAX_VALUE;
  const restored = restoreState(saved, QUESTIONS);
  assert.ok(restored);
  assert.equal(restored.elapsedMs, 0, 'unsafe timer repairs before any patrol tick');
  assert.deepEqual(restored.answers, saved.answers);
  assert.equal(restored.coins, 10);
  const advanced = act(restored, 'tick', {ms:16});
  assert.equal(advanced.elapsedMs, 16, 'patrol simulation advances normally');
  const fractional = fresh();fractional.elapsedMs=1000.25;
  assert.equal(restoreState(fractional, QUESTIONS).elapsedMs, 1000.25, 'normal frame timing remains intact');
});


test('physical movement suppresses stale-tile patrol hits while time advances until real arrival', () => {
  let state = fresh(); state.player = { x: 12, y: 5 };
  state = act(state, 'tick', { ms: 10000, moving: true });
  assert.equal(state.phase, 'explore'); assert.equal(state.elapsedMs, 10000);
  assert.equal(state.hearts, 3);
  // At 10000ms the prowler occupies x10; arriving there still opens its normal encounter.
  state.player = { x: 9, y: 5 };
  const arrival = act(state, 'move', { dx: 1, dy: 0 });
  assert.equal(arrival.phase, 'question'); assert.equal(arrival.activeEncounter, 'cage'); assert.equal(arrival.hearts, 3);
});
