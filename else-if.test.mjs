import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluateExample, executionSteps, checkpoints } from './else-if.js';

test('else-if boundaries select exactly the first matching path', () => {
  for (const [score, branch] of [[0,'else'],[59,'else'],[60,'elif'],[79,'elif'],[80,'if'],[90,'if'],[100,'if']]) {
    const value = evaluateExample(String(score));
    assert.equal(value.branch, branch);
    assert.equal(value.output, { if:'Great work!', elif:'You passed!', else:'Keep practicing!' }[branch]);
    assert.equal(value.secondResult, branch === 'if' ? null : branch === 'elif');
  }
});
test('overlapping comparisons skip elif instead of reporting False', () => {
  const value = evaluateExample('95');
  assert.equal(value.firstResult, true); assert.equal(value.secondResult, null);
  assert.deepEqual(executionSteps(value).map(step => step.id), ['input','check-if','if','end']);
});
test('all outcomes continue after one branch, with the optional second check in both languages', () => {
  for (const score of ['40','70','90']) for (const language of ['en','he']) {
    const value = evaluateExample(score);
    const trace = executionSteps(value, language);
    assert.equal(trace.at(-1).id, 'end');
    assert.equal(trace.filter(step => ['if','elif','else'].includes(step.id)).length, 1);
    assert.equal(trace.some(step => step.id === 'check-elif'), value.branch !== 'if');
    assert.ok(trace.every(step => step.description.length > 8));
  }
});
test('invalid inputs and unreachable middle-range rules are rejected; valid custom rules work', () => {
  for (const bad of ['', ' ', 'abc', 'Infinity', '-1', '101', '2.5']) {
    assert.equal(evaluateExample(bad), null);
    assert.equal(evaluateExample('70',bad,'60'), null);
    assert.equal(evaluateExample('70','80',bad), null);
  }
  assert.equal(evaluateExample('70','60','60'), null);
  assert.equal(evaluateExample('70','50','60'), null);
  assert.equal(evaluateExample('70','90','70').branch, 'elif');
});
test('five bilingual checkpoints have valid keys and local lesson sources', () => {
  const html = readFileSync(new URL('./else-if.html',import.meta.url),'utf8');
  assert.equal(checkpoints.length,5);
  for (const question of checkpoints) for (const language of ['en','he']) {
    assert.ok(question[language].choices[question.correct]);
    assert.ok(question[language].explanation.length > 30);
    assert.ok(html.includes(`id="${question.source}"`));
  }
});
