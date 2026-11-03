import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateExample, executionSteps, checkpoints } from './if-else.js';
import { readFileSync } from 'node:fs';

test('all six comparisons select the right branch below, at and above the boundary', () => {
  const expected = {
    '>=': [false, true, true], '>': [false, false, true],
    '==': [false, true, false], '<': [true, false, false],
    '<=': [true, true, false], '!=': [true, false, true]
  };
  for (const [operator, results] of Object.entries(expected)) {
    [40, 60, 75].forEach((score, i) => {
      const example = evaluateExample(String(score), operator, '60');
      assert.equal(example.result, results[i], `${score} ${operator} 60`);
      assert.equal(example.branch, results[i] ? 'if' : 'else');
      assert.equal(example.output, results[i] ? 'You passed!' : 'Keep practicing!');
    });
  }
  assert.equal(evaluateExample('0', '>=', '0').result, true);
  assert.equal(evaluateExample('100', '>', '100').result, false);
});

test('invalid input produces no execution result, valid values recover', () => {
  for (const invalid of ['', ' ', 'abc', 'NaN', 'Infinity', '-1', '101', '5.5']) {
    assert.equal(evaluateExample(invalid, '>=', '60'), null);
    assert.equal(evaluateExample('75', '>=', invalid), null);
  }
  assert.equal(evaluateExample('75', 'toString', '60'), null);
  assert.equal(evaluateExample('75', '=', '60'), null);
  assert.equal(evaluateExample('75', '>=', '60').result, true);
});

test('trace executes exactly one branch then continues for true and false', () => {
  for (const [score, branch] of [['75', 'true'], ['40', 'false']]) {
    const steps = executionSteps(evaluateExample(score, '>=', '60'));
    assert.deepEqual(steps.map((step) => step.line), ['input', 'condition', branch, 'end']);
    assert.match(steps[3].description, /whichever branch/);
  }
});

test('teaching checkpoint answers and source anchors are coherent', () => {
  const html = readFileSync(new URL('./if-else.html', import.meta.url), 'utf8');
  assert.equal(checkpoints.length, 5);
  for (const question of checkpoints) {
    assert.ok(question.correct >= 0 && question.correct < question.choices.length);
    assert.ok(question.explanation.length > 30);
    assert.ok(html.includes(`id="${question.source}"`));
  }
  assert.equal(checkpoints.find((q) => q.id === 'false').choices[1], 'The else branch');
  assert.equal(checkpoints.find((q) => q.id === 'boundary').choices[0], 'True');
  assert.equal(checkpoints.find((q) => q.id === 'exclusive').choices[1], 'No');
});

test('Hebrew instructions describe the same execution path for both outcomes', () => {
  for (const score of ['40', '60', '75']) {
    for (const operator of ['>=', '>', '==', '<', '<=', '!=']) {
      const example = evaluateExample(score, operator, '60');
      const hebrew = executionSteps(example, 'he');
      assert.deepEqual(hebrew.map((step) => step.line), executionSteps(example).map((step) => step.line));
      assert.ok(hebrew.every((step) => /שלב/.test(step.description)));
      assert.ok(hebrew[1].description.includes(example.result ? 'מתקיים (True)' : 'אינו מתקיים (False)'));
      assert.ok(hebrew[2].description.includes(example.output));
    }
  }
});
