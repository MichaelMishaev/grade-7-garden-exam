// A tiny, safe interpreter for the Python subset used in the if / else lesson:
// assignments, print(), if / elif / else with comparisons and simple arithmetic.
// Nothing is ever passed to eval; learner code is parsed into plain data and walked.

export const MAX_LINES = 200;
const MAX_STEPS = 5000;

class CodeError extends Error {
  constructor(code, line, detail = '') { super(code); this.code = code; this.line = line; this.detail = detail; }
}

function stripComment(text) {
  let quote = null;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quote) { if (char === quote) quote = null; continue; }
    if (char === '"' || char === "'") quote = char;
    else if (char === '#') return text.slice(0, i);
  }
  return text;
}

function tokenize(text, line, code) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    if (char === ' ' || char === '\t') { i++; continue; }
    if (char === '"' || char === "'") {
      const end = text.indexOf(char, i + 1);
      if (end === -1) throw new CodeError('unterminated_string', line);
      tokens.push({ type: 'string', value: text.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    const number = /^\d+(\.\d+)?/.exec(text.slice(i));
    if (number) { tokens.push({ type: 'number', value: Number(number[0]) }); i += number[0].length; continue; }
    const name = /^[A-Za-z_]\w*/.exec(text.slice(i));
    if (name) { tokens.push({ type: 'name', value: name[0] }); i += name[0].length; continue; }
    const operator = /^(>=|<=|==|!=|[-+*/%<>(),])/.exec(text.slice(i));
    if (operator) { tokens.push({ type: 'op', value: operator[0] }); i += operator[0].length; continue; }
    throw new CodeError(code, line, char);
  }
  return tokens;
}

// Recursive-descent expression parser producing a small AST.
function parseExpression(text, line, code) {
  const tokens = tokenize(text, line, code);
  let position = 0;
  const peek = () => tokens[position];
  const take = () => tokens[position++];
  const fail = () => { throw new CodeError(code, line, text.trim()); };
  function primary() {
    const token = take();
    if (!token) fail();
    if (token.type === 'number' || token.type === 'string') return { type: 'literal', value: token.value };
    if (token.type === 'name') {
      if (token.value === 'True') return { type: 'literal', value: true };
      if (token.value === 'False') return { type: 'literal', value: false };
      return { type: 'name', value: token.value };
    }
    if (token.value === '(') {
      const inner = comparison();
      if (!peek() || take().value !== ')') fail();
      return inner;
    }
    if (token.value === '-') return { type: 'negate', operand: primary() };
    fail();
  }
  function term() {
    let left = primary();
    while (peek()?.type === 'op' && ['*', '/', '%'].includes(peek().value)) left = { type: 'binary', operator: take().value, left, right: primary() };
    return left;
  }
  function sum() {
    let left = term();
    while (peek()?.type === 'op' && ['+', '-'].includes(peek().value)) left = { type: 'binary', operator: take().value, left, right: term() };
    return left;
  }
  function comparison() {
    const left = sum();
    if (peek()?.type === 'op' && ['>=', '<=', '==', '!=', '>', '<'].includes(peek().value)) return { type: 'binary', operator: take().value, left, right: sum() };
    return left;
  }
  function list() {
    const items = [];
    if (!peek()) return items;
    items.push(comparison());
    while (peek()?.value === ',') { take(); items.push(comparison()); }
    return items;
  }
  const result = code === 'bad_arguments' ? list() : comparison();
  if (position !== tokens.length) fail();
  return result;
}

function parseLines(source) {
  const lines = source.split(/\r?\n/).map((raw, index) => {
    const text = stripComment(raw).replace(/\s+$/, '');
    return { number: index + 1, indent: /^[ \t]*/.exec(text)[0].replace(/\t/g, '    ').length, text: text.trim() };
  }).filter((line) => line.text !== '');
  if (lines.length === 0) throw new CodeError('empty_program', 1);
  if (lines.length > MAX_LINES) throw new CodeError('too_long', MAX_LINES + 1);
  if (lines[0].indent !== 0) throw new CodeError('unexpected_indent', lines[0].number);
  let index = 0;
  function parseStatement(line) {
    const header = /^(if|elif|else)\b\s*(.*)$/.exec(line.text);
    if (header) {
      const [, keyword, rest] = header;
      if (!rest.endsWith(':')) throw new CodeError('missing_colon', line.number);
      const body = rest.slice(0, -1).trim();
      if (keyword === 'else') {
        if (body !== '') throw new CodeError('bad_condition', line.number, body);
        return { type: 'else', line: line.number };
      }
      if (body === '') throw new CodeError('bad_condition', line.number, body);
      return { type: keyword, line: line.number, condition: parseExpression(body, line.number, 'bad_condition') };
    }
    const print = /^print\s*\((.*)\)$/.exec(line.text);
    if (print) return { type: 'print', line: line.number, args: parseExpression(print[1], line.number, 'bad_arguments') };
    if (/^print\s*\(/.test(line.text)) throw new CodeError('missing_paren', line.number);
    const assign = /^([A-Za-z_]\w*)\s*=(?!=)\s*(.*)$/.exec(line.text);
    if (assign) {
      if (assign[2] === '') throw new CodeError('bad_expression', line.number, line.text);
      return { type: 'assign', line: line.number, name: assign[1], value: parseExpression(assign[2], line.number, 'bad_expression') };
    }
    throw new CodeError('bad_line', line.number, line.text);
  }
  function parseBlock(indent) {
    const statements = [];
    while (index < lines.length && lines[index].indent === indent) {
      const line = lines[index++];
      const statement = parseStatement(line);
      if (statement.type === 'if' || statement.type === 'elif' || statement.type === 'else') {
        const previous = statements[statements.length - 1];
        if (statement.type !== 'if' && (!previous || previous.type !== 'if' || previous.closed)) throw new CodeError('else_without_if', line.number);
        const next = lines[index];
        if (!next || next.indent <= indent) throw new CodeError(next && next.indent === indent ? 'expect_indent' : 'empty_block', next && next.indent === indent ? next.number : line.number);
        statement.body = parseBlock(next.indent);
        if (statement.type === 'if') { statement.branches = [{ condition: statement.condition, body: statement.body }]; statement.closed = false; statements.push(statement); }
        else if (statement.type === 'elif') previous.branches.push({ condition: statement.condition, body: statement.body });
        else { previous.otherwise = statement.body; previous.closed = true; }
      } else statements.push(statement);
    }
    if (index < lines.length && lines[index].indent > indent) throw new CodeError('unexpected_indent', lines[index].number);
    return statements;
  }
  const program = parseBlock(0);
  if (index < lines.length) throw new CodeError('unexpected_indent', lines[index].number);
  return program;
}

function format(value) {
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  return String(value);
}

function evaluate(node, env, line) {
  switch (node.type) {
    case 'literal': return node.value;
    case 'name':
      if (!env.has(node.value)) throw new CodeError('unknown_name', line, node.value);
      return env.get(node.value);
    case 'negate': {
      const value = evaluate(node.operand, env, line);
      if (typeof value !== 'number') throw new CodeError('type_error', line);
      return -value;
    }
    case 'binary': {
      const left = evaluate(node.left, env, line);
      const right = evaluate(node.right, env, line);
      const op = node.operator;
      if (op === '==') return left === right;
      if (op === '!=') return left !== right;
      if (op === '+' && typeof left === 'string' && typeof right === 'string') return left + right;
      const same = typeof left === typeof right && (typeof left === 'number' || typeof left === 'string');
      if (['<', '>', '<=', '>='].includes(op)) {
        if (!same) throw new CodeError('type_error', line);
        return op === '<' ? left < right : op === '>' ? left > right : op === '<=' ? left <= right : left >= right;
      }
      if (typeof left !== 'number' || typeof right !== 'number') throw new CodeError('type_error', line);
      if (op === '+') return left + right;
      if (op === '-') return left - right;
      if (op === '*') return left * right;
      if (op === '/') { if (right === 0) throw new CodeError('divide_by_zero', line); return left / right; }
      if (right === 0) throw new CodeError('divide_by_zero', line);
      return ((left % right) + right) % right;
    }
    default: throw new CodeError('bad_expression', line);
  }
}

function execute(statements, env, output, counter) {
  for (const statement of statements) {
    if (++counter.steps > MAX_STEPS) throw new CodeError('too_long', statement.line);
    if (statement.type === 'assign') env.set(statement.name, evaluate(statement.value, env, statement.line));
    else if (statement.type === 'print') output.push(statement.args.map((arg) => format(evaluate(arg, env, statement.line))).join(' '));
    else if (statement.type === 'if') {
      const branch = statement.branches.find((candidate) => Boolean(evaluate(candidate.condition, env, statement.line)));
      if (branch) execute(branch.body, env, output, counter);
      else if (statement.otherwise) execute(statement.otherwise, env, output, counter);
    }
  }
}

export function runProgram(source) {
  try {
    const program = parseLines(String(source ?? ''));
    const output = [];
    execute(program, new Map(), output, { steps: 0 });
    return { ok: true, output };
  } catch (error) {
    if (error instanceof CodeError) return { ok: false, error: { code: error.code, line: error.line, detail: error.detail } };
    return { ok: false, error: { code: 'bad_line', line: 1, detail: '' } };
  }
}

const messages = {
  en: {
    missing_colon: 'Line {line}: an if, elif or else line must end with a colon  :',
    expect_indent: 'Line {line}: this line must be indented (press ⇥ Indent) so it belongs to the branch above.',
    unexpected_indent: 'Line {line}: this line is indented, but there is no if or else above it. Remove the spaces.',
    empty_block: 'Line {line}: after the colon, write at least one indented line.',
    else_without_if: 'Line {line}: else / elif needs an if right before it.',
    unknown_name: 'Line {line}: I don’t know a name called “{detail}”. Did you set it with = first? Text needs quotes.',
    unterminated_string: 'Line {line}: a quote was opened but never closed. Text needs quotes on both sides: "like this".',
    bad_condition: 'Line {line}: I can’t read this condition. Use a comparison like score >= 60 (two = signs for equal: ==).',
    bad_expression: 'Line {line}: I can’t read the value after =. Try a number like 75 or text in quotes.',
    bad_arguments: 'Line {line}: I can’t read what to print. Try print("Hi") or print(score).',
    missing_paren: 'Line {line}: print needs brackets on both sides: print("Hi").',
    bad_line: 'Line {line}: I don’t understand this line. Try name = value, print(...), if ...:, elif ...: or else:.',
    type_error: 'Line {line}: you can’t mix text and numbers here.',
    divide_by_zero: 'Line {line}: dividing by zero is impossible.',
    empty_program: 'Line {line}: write some code first, then press Run.',
    too_long: 'Line {line}: that program is too long for this little terminal.'
  },
  he: {
    missing_colon: 'שורה {line}: שורת if, elif או else חייבת להסתיים בנקודתיים  :',
    expect_indent: 'שורה {line}: השורה הזו צריכה הזחה (לחצו ⇥ הזחה) כדי שתשתייך לענף שמעליה.',
    unexpected_indent: 'שורה {line}: השורה מוזחת, אבל אין מעליה if או else. מחקו את הרווחים.',
    empty_block: 'שורה {line}: אחרי הנקודתיים כותבים לפחות שורה אחת מוזחת.',
    else_without_if: 'שורה {line}: else / elif צריך if ממש לפניו.',
    unknown_name: 'שורה {line}: אני לא מכיר שם בשם ״{detail}״. הגדרתם אותו עם = קודם? טקסט צריך מירכאות.',
    unterminated_string: 'שורה {line}: פתחתם מירכאות ולא סגרתם. טקסט צריך מירכאות משני הצדדים: "ככה".',
    bad_condition: 'שורה {line}: לא הצלחתי לקרוא את התנאי. השתמשו בהשוואה כמו score >= 60 (שוויון נכתב עם ==).',
    bad_expression: 'שורה {line}: לא הצלחתי לקרוא את הערך אחרי =. נסו מספר כמו 75 או טקסט במירכאות.',
    bad_arguments: 'שורה {line}: לא הצלחתי לקרוא מה להדפיס. נסו print("Hi") או print(score).',
    missing_paren: 'שורה {line}: print צריך סוגריים משני הצדדים: print("Hi").',
    bad_line: 'שורה {line}: לא הבנתי את השורה. נסו name = value, print(...), if ...:, elif ...: או else:.',
    type_error: 'שורה {line}: אי אפשר לערבב טקסט ומספרים כאן.',
    divide_by_zero: 'שורה {line}: אי אפשר לחלק באפס.',
    empty_program: 'שורה {line}: כתבו קודם קוד, ואז לחצו על הפעלה.',
    too_long: 'שורה {line}: התוכנית ארוכה מדי לטרמינל הקטן הזה.'
  }
};

export function describeError(error, language = 'en') {
  const table = messages[language] ?? messages.en;
  const template = table[error.code] ?? table.bad_line;
  return template.replace('{line}', String(error.line)).replace('{detail}', String(error.detail ?? ''));
}

export function indentLine(value, caret) {
  return { value: value.slice(0, caret) + '    ' + value.slice(caret), caret: caret + 4 };
}

const lessonProgram = `score = 75
if score >= 60:
    print("You passed!")
else:
    print("Keep practicing!")
print("Next lesson")`;

export const missions = [
  {
    id: 'run',
    title: { en: 'Run it, then change it', he: 'הריצו, ואז שנו' },
    task: { en: 'Press Run and read what the computer says. Then change the score so it prints “Keep practicing!”.', he: 'לחצו על הפעלה וקראו מה המחשב אומר. אחר כך שנו את הציון כך שיודפס “Keep practicing!”.' },
    starter: lessonProgram,
    hint: { en: 'Line 1 sets the score. Any number below 60 makes the condition False, so the else branch runs.', he: 'שורה 1 קובעת את הציון. כל מספר מתחת ל־60 הופך את התנאי ל־False, ולכן ענף else מתבצע.' },
    solution: lessonProgram.replace('75', '40'),
    check: (output) => output[0] === 'Keep practicing!' && output[1] === 'Next lesson'
  },
  {
    id: 'fix',
    title: { en: 'Fix the broken program', he: 'תקנו את התוכנית השבורה' },
    task: { en: 'This program has two mistakes. Press Run, read the red message, fix it, and run again until it prints “You passed!”.', he: 'בתוכנית יש שתי טעויות. לחצו על הפעלה, קראו את ההודעה האדומה, תקנו והריצו שוב עד שיודפס “You passed!”.' },
    starter: `score = 75
if score >= 60
    print("You passed!")
else:
print("Keep practicing!")
print("Next lesson")`,
    hint: { en: 'Every if and else line ends with a colon. Every line inside a branch is pushed in with ⇥ Indent.', he: 'כל שורת if ו־else מסתיימת בנקודתיים. כל שורה בתוך ענף נדחפת פנימה עם ⇥ הזחה.' },
    solution: lessonProgram,
    check: (output) => output[0] === 'You passed!' && output[1] === 'Next lesson'
  },
  {
    id: 'write',
    title: { en: 'Write your own if / else', he: 'כתבו if / else משלכם' },
    task: { en: 'age is 13. Write an if / else that prints “Teen” when age is at least 13, and “Kid” otherwise.', he: 'age הוא 13. כתבו if / else שמדפיס “Teen” כשהגיל לפחות 13, ו־“Kid” אחרת.' },
    starter: `age = 13
# write your if / else below
`,
    hint: { en: 'Start with: if age >= 13:  then an indented print("Teen"), then else: and an indented print("Kid").', he: 'התחילו עם: if age >= 13:  ואז print("Teen") מוזח, אחר כך else: ו־print("Kid") מוזח.' },
    solution: `age = 13
if age >= 13:
    print("Teen")
else:
    print("Kid")`,
    check: (output) => output.length === 1 && output[0] === 'Teen'
  },
  {
    id: 'elif',
    title: { en: 'Three paths with elif', he: 'שלושה מסלולים עם elif' },
    task: { en: 'temperature is 30. Print “Hot” when it is at least 30, “Nice” when it is at least 20, and “Cold” otherwise.', he: 'temperature הוא 30. הדפיסו “Hot” כשהטמפרטורה לפחות 30, “Nice” כשהיא לפחות 20, ו־“Cold” אחרת.' },
    starter: `temperature = 30
if temperature >= 30:
    print("Hot")
`,
    hint: { en: 'After the if block add  elif temperature >= 20:  with print("Nice"), then  else:  with print("Cold"). Only one path runs.', he: 'אחרי ה־if הוסיפו  elif temperature >= 20:  עם print("Nice"), ואז  else:  עם print("Cold"). רק מסלול אחד מתבצע.' },
    solution: `temperature = 30
if temperature >= 30:
    print("Hot")
elif temperature >= 20:
    print("Nice")
else:
    print("Cold")`,
    check: (output, source) => output.length === 1 && output[0] === 'Hot' && /^elif\b/m.test(source) && /^else\b/m.test(source)
  },
  {
    id: 'free',
    title: { en: 'Your turn: invent a program', he: 'תורכם: המציאו תוכנית' },
    task: { en: 'Make up your own if / else. Any variable, any rule, any messages. It counts when it runs and prints at least one line.', he: 'המציאו if / else משלכם. כל משתנה, כל כלל, כל הודעה. זה נחשב כשהתוכנית רצה ומדפיסה לפחות שורה אחת.' },
    starter: `# your idea here. For example:\n# pet = "cat"\n# if pet == "cat":\n#     print("Meow")\n# else:\n#     print("Woof")\n`,
    hint: { en: 'Pick something you like: a pet, a game score, the weather. Set it with =, then if ... : and else: with a print in each.', he: 'בחרו משהו שאתם אוהבים: חיית מחמד, ניקוד במשחק, מזג אוויר. קבעו אותו עם =, ואז if ... : ו־else: עם print בכל אחד.' },
    solution: `pet = "cat"\nif pet == "cat":\n    print("Meow")\nelse:\n    print("Woof")`,
    check: (output, source) => output.length > 0 && /^if\b/m.test(source) && /^else\b/m.test(source)
  }
];
