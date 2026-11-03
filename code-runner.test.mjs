import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runProgram, describeError, missions, indentLine, suggestions } from './code-runner.js';

const starter = `score = 75
if score >= 60:
    print("You passed!")
else:
    print("Keep practicing!")
print("Next lesson")`;

test('runs the lesson program and takes exactly one branch', () => {
  const result = runProgram(starter);
  assert.equal(result.ok, true);
  assert.deepEqual(result.output, ['You passed!', 'Next lesson']);
  assert.deepEqual(runProgram(starter.replace('75', '40')).output, ['Keep practicing!', 'Next lesson']);
  assert.deepEqual(runProgram(starter.replace('75', '60')).output, ['You passed!', 'Next lesson']);
});

test('supports all six comparisons, variables on both sides and elif chains', () => {
  for (const [operator, expected] of [['>=', 'yes'], ['>', 'no'], ['==', 'yes'], ['<', 'no'], ['<=', 'yes'], ['!=', 'no']]) {
    const program = `a = 5\nb = 5\nif a ${operator} b:\n    print("yes")\nelse:\n    print("no")`;
    assert.deepEqual(runProgram(program).output, [expected], operator);
  }
  const chain = `score = 70\nif score >= 80:\n    print("Great")\nelif score >= 60:\n    print("Passed")\nelse:\n    print("Again")`;
  assert.deepEqual(runProgram(chain).output, ['Passed']);
  assert.deepEqual(runProgram(chain.replace('70', '90')).output, ['Great']);
  assert.deepEqual(runProgram(chain.replace('70', '10')).output, ['Again']);
});

test('prints strings, numbers, variables and simple arithmetic; if without else is fine', () => {
  const program = `age = 13\nprint(age)\nprint("Age:", age)\nif age >= 13:\n    print("Teen")\nprint(age + 1)\nprint('single')`;
  assert.deepEqual(runProgram(program).output, ['13', 'Age: 13', 'Teen', '14', 'single']);
  assert.deepEqual(runProgram('x = 10\nif x > 20:\n    print("big")\nprint("done")').output, ['done']);
  assert.deepEqual(runProgram('print(True)\nprint(3 > 2)').output, ['True', 'True']);
});

test('blank lines and comments are ignored, two-space indentation is accepted', () => {
  const program = `# my first program\n\nscore = 40\nif score >= 60:\n  print("You passed!")\nelse:\n  print("Keep practicing!")  # nope\n`;
  assert.deepEqual(runProgram(program).output, ['Keep practicing!']);
});

test('kid-friendly errors name the line and the mistake', () => {
  const cases = [
    ['score = 75\nif score >= 60\n    print("hi")', 2, 'missing_colon'],
    ['score = 75\nif score >= 60:\nprint("hi")', 3, 'expect_indent'],
    ['if score >= 60:\n    print("hi")', 1, 'unknown_name'],
    ['else:\n    print("hi")', 1, 'else_without_if'],
    ['x = 1\nelif x == 1:\n    print("hi")', 2, 'else_without_if'],
    ['print("hi)', 1, 'unterminated_string'],
    ['x = 1\n    print(x)', 2, 'unexpected_indent'],
    ['x = 1\nx', 2, 'bad_line'],
    ['x = 1\nif x = 1:\n    print(x)', 2, 'bad_condition'],
    ['x = 1\nif x > 0:\n    print(x)\nelse:\n    print(x)\nelse:\n    print(x)', 6, 'else_without_if'],
    ['print(hello)', 1, 'unknown_name'],
    ['x = 1\nif x > 0:', 2, 'empty_block'],
    ['', 1, 'empty_program'],
    ['x = 1\nprint x', 2, 'bad_line']
  ];
  for (const [program, line, code] of cases) {
    const result = runProgram(program);
    assert.equal(result.ok, false, program);
    assert.equal(result.error.code, code, program);
    assert.equal(result.error.line, line, program);
    assert.ok(describeError(result.error, 'en').toLowerCase().includes(`line ${line}`), code);
    assert.ok(/שורה/.test(describeError(result.error, 'he')), code);
  }
});

test('runaway programs and dangerous input stay harmless', () => {
  const lines = Array.from({ length: 3000 }, (_, i) => `print(${i})`).join('\n');
  const result = runProgram(lines);
  assert.equal(result.ok, false);
  assert.equal(result.error.code, 'too_long');
  assert.equal(runProgram('print(constructor)').error.code, 'unknown_name');
  assert.equal(runProgram('__proto__ = 1\nprint(__proto__)').ok, true);
  assert.equal(runProgram('x = 1\nprint(toString)').error.code, 'unknown_name');
});

test('missions have solutions that pass their own checks and starters that do not', () => {
  assert.equal(missions.length, 6);
  assert.equal(missions.filter((m) => m.startsSolved).length, 1, 'only the first mission is pre-solved');
  for (const mission of missions) {
    assert.ok(mission.title.en && mission.title.he && mission.hint.en && mission.hint.he);
    const solved = runProgram(mission.solution);
    assert.equal(solved.ok, true, mission.id);
    assert.equal(mission.check(solved.output, mission.solution), true, mission.id);
    assert.ok(mission.step.en && mission.step.he, mission.id);
    const starter = runProgram(mission.starter);
    if (!mission.startsSolved) assert.equal(starter.ok && mission.check(starter.output, mission.starter), false, `${mission.id} starter must not already pass`);
  }
});

test('indentLine inserts four spaces at the caret', () => {
  assert.deepEqual(indentLine('ab', 1), { value: 'a    b', caret: 5 });
});

test('try-a-change suggestions edit the lesson program into runnable code and decline when they do not fit', () => {
  const program = 'score = 75\nif score >= 60:\n    print("You passed!")\nelse:\n    print("Keep practicing!")\nprint("Next lesson")';
  const expected = {
    number: ['Keep practicing!', 'Next lesson'],
    comparison: ['You passed!', 'Next lesson'],
    elif: ['You passed!', 'Next lesson'],
    message: ['Well done!', 'Next lesson'],
    after: ['You passed!', 'Next lesson', 'Done'],
    skeleton: ['You passed!', 'Next lesson', 'big']
  };
  for (const suggestion of suggestions) {
    const change = suggestion.apply(program);
    assert.ok(change && change.note.en && change.note.he, suggestion.id);
    assert.ok(suggestion.label.en && suggestion.label.he);
    const result = runProgram(change.source);
    assert.equal(result.ok, true, suggestion.id);
    assert.deepEqual(result.output, expected[suggestion.id], suggestion.id);
  }
  assert.deepEqual(runProgram(suggestions.find((s) => s.id === 'elif').apply(program).source.replace('75', '50')).output, ['Almost!', 'Next lesson']);
  assert.deepEqual(runProgram(suggestions.find((s) => s.id === 'comparison').apply(program).source.replace('75', '60')).output, ['Keep practicing!', 'Next lesson']);
  const byId = Object.fromEntries(suggestions.map((s) => [s.id, s]));
  assert.equal(byId.number.apply('print("hi")'), null);
  assert.equal(byId.comparison.apply('x = 1\nprint(x)'), null);
  assert.equal(byId.elif.apply('x = 1\nif x > 0:\n    print(x)'), null, 'needs an else');
  assert.equal(byId.elif.apply(byId.elif.apply(program).source), null, 'only one elif is suggested');
  assert.equal(byId.message.apply('x = 1'), null);
  assert.equal(byId.after.apply('x = 1'), null);
  assert.deepEqual(runProgram(byId.skeleton.apply('').source).output, ['big']);
});
