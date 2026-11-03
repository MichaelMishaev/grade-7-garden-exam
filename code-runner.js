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
    missing_colon: 'Line {line}: add a colon  :  at the end of this line.',
    expect_indent: 'Line {line}: tap ⇥ Indent to push this line in. It belongs to the line above.',
    unexpected_indent: 'Line {line}: this line is indented, but there is no if or else above it. Remove the spaces.',
    empty_block: 'Line {line}: after the colon, write at least one indented line.',
    else_without_if: 'Line {line}: else / elif needs an if right before it.',
    unknown_name: 'Line {line}: “{detail}” is not set yet. Write  {detail} = ...  first, or put text in quotes.',
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
    missing_colon: 'שורה {line}: הוסיפו נקודתיים  :  בסוף השורה.',
    expect_indent: 'שורה {line}: לחצו ⇥ הזחה כדי לדחוף את השורה פנימה. היא שייכת לשורה שמעליה.',
    unexpected_indent: 'שורה {line}: השורה מוזחת, אבל אין מעליה if או else. מחקו את הרווחים.',
    empty_block: 'שורה {line}: אחרי הנקודתיים כותבים לפחות שורה אחת מוזחת.',
    else_without_if: 'שורה {line}: else / elif צריך if ממש לפניו.',
    unknown_name: 'שורה {line}: ״{detail}״ עוד לא הוגדר. כתבו קודם  {detail} = ...  או שימו טקסט במירכאות.',
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
    title: { en: 'Just press Run', he: 'רק לחצו על הפעלה' },
    task: { en: 'Nothing to type. Press the green ▶ Run button and read what the computer says in the bottom window.', he: 'אין מה להקליד. לחצו על הכפתור הירוק ▶ הפעלה וקראו מה המחשב אומר בחלון התחתון.' },
    step: { en: '👉 Press ▶ Run', he: '👉 לחצו על ▶ הפעלה' },
    starter: lessonProgram,
    startsSolved: true,
    hint: { en: 'The green ▶ Run button is right under the code window.', he: 'הכפתור הירוק ▶ הפעלה נמצא ממש מתחת לחלון הקוד.' },
    solution: lessonProgram,
    check: (output) => output[0] === 'You passed!' && output[1] === 'Next lesson'
  },
  {
    id: 'change',
    title: { en: 'Make it say “Keep practicing!”', he: 'גרמו לו להגיד “Keep practicing!”' },
    task: { en: 'The score is 75, so the computer says “You passed!”. Make the score smaller than 60 and run again.', he: 'הציון הוא 75, ולכן המחשב אומר “You passed!”. הקטינו את הציון מתחת ל־60 והריצו שוב.' },
    step: { en: '👉 Tap 🔢 Change the number, then ▶ Run', he: '👉 לחצו על 🔢 שנו את המספר, ואז ▶ הפעלה' },
    starter: lessonProgram,
    hint: { en: 'Line 1 sets the score. Any number below 60 makes the rule False, so the else path runs.', he: 'שורה 1 קובעת את הציון. כל מספר מתחת ל־60 הופך את התנאי ל־False, ולכן מסלול else רץ.' },
    solution: lessonProgram.replace('75', '40'),
    check: (output) => output[0] === 'Keep practicing!' && output[1] === 'Next lesson'
  },
  {
    id: 'fix',
    title: { en: 'Fix the broken program', he: 'תקנו את התוכנית השבורה' },
    task: { en: 'Two small mistakes hide in this code. Run it, read the red line, fix that line, run again. Repeat until it says “You passed!”.', he: 'בקוד מסתתרות שתי טעויות קטנות. הריצו, קראו את השורה האדומה, תקנו את השורה, הריצו שוב. חזרו על זה עד שיודפס “You passed!”.' },
    step: { en: '👉 Press ▶ Run and read the red line', he: '👉 לחצו על ▶ הפעלה וקראו את השורה האדומה' },
    starter: `score = 75
if score >= 60
    print("You passed!")
else:
print("Keep practicing!")
print("Next lesson")`,
    hint: { en: 'Line 2 needs a colon  :  at the end. Line 5 needs ⇥ Indent so it belongs to else.', he: 'שורה 2 צריכה נקודתיים  :  בסוף. שורה 5 צריכה ⇥ הזחה כדי להשתייך ל־else.' },
    solution: lessonProgram,
    check: (output) => output[0] === 'You passed!' && output[1] === 'Next lesson'
  },
  {
    id: 'write',
    title: { en: 'Write your own if / else', he: 'כתבו if / else משלכם' },
    task: { en: 'age is 13. Print “Teen” when age is at least 13, and “Kid” otherwise. Type it under line 1.', he: 'age הוא 13. הדפיסו “Teen” כשהגיל לפחות 13, ו־“Kid” אחרת. הקלידו מתחת לשורה 1.' },
    step: { en: '👉 Type  if age >= 13:  then Enter. Stuck? Tap 👀 Show me', he: '👉 הקלידו  if age >= 13:  ואז Enter. נתקעתם? לחצו על 👀 הראו לי' },
    starter: `age = 13
`,
    hint: { en: 'Four lines: if age >= 13:  /  print("Teen") pushed in  /  else:  /  print("Kid") pushed in.', he: 'ארבע שורות: if age >= 13:  /  print("Teen") מוזח  /  else:  /  print("Kid") מוזח.' },
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
    task: { en: 'temperature is 30. Print “Hot” at 30 or more, “Nice” at 20 or more, “Cold” otherwise. Add the middle path with elif.', he: 'temperature הוא 30. הדפיסו “Hot” מ־30 ומעלה, “Nice” מ־20 ומעלה, ו־“Cold” אחרת. הוסיפו את המסלול האמצעי עם elif.' },
    step: { en: '👉 Tap ➕ Add an elif path, then change its number to 20 and its word to Nice', he: '👉 לחצו על ➕ הוסיפו מסלול elif, ואז שנו את המספר ל־20 ואת המילה ל־Nice' },
    starter: `temperature = 30
if temperature >= 30:
    print("Hot")
else:
    print("Cold")`,
    hint: { en: 'Between the if block and else: add  elif temperature >= 20:  and under it print("Nice") pushed in.', he: 'בין בלוק ה־if ל־else: הוסיפו  elif temperature >= 20:  ומתחתיו print("Nice") מוזח.' },
    solution: `temperature = 30
if temperature >= 30:
    print("Hot")
elif temperature >= 20:
    print("Nice")
else:
    print("Cold")`,
    check: (output, source) => output.length === 1 && output[0] === 'Hot' && /^elif\b/m.test(source) && /^else\b/m.test(source) && /"Nice"|'Nice'/.test(source)
  },
  {
    id: 'free',
    title: { en: 'Your turn: invent a program', he: 'תורכם: המציאו תוכנית' },
    task: { en: 'Make up your own if / else. Any variable, any rule, any messages. It counts when it runs and prints at least one line.', he: 'המציאו if / else משלכם. כל משתנה, כל כלל, כל הודעה. זה נחשב כשהתוכנית רצה ומדפיסה לפחות שורה אחת.' },
    step: { en: '👉 Tap 🧱 Insert a new if / else, then change the words', he: '👉 לחצו על 🧱 הכניסו if / else חדש, ואז שנו את המילים' },
    starter: `# your idea here. For example:
# pet = "cat"
# if pet == "cat":
#     print("Meow")
# else:
#     print("Woof")
`,
    hint: { en: 'Pick something you like: a pet, a game score, the weather. Set it with =, then if ... : and else: with a print in each.', he: 'בחרו משהו שאתם אוהבים: חיית מחמד, ניקוד במשחק, מזג אוויר. קבעו אותו עם =, ואז if ... : ו־else: עם print בכל אחד.' },
    solution: `pet = "cat"
if pet == "cat":
    print("Meow")
else:
    print("Woof")`,
    check: (output, source) => output.length > 0 && /^if\b/m.test(source) && /^else\b/m.test(source)
  }
];

// "Try a change" suggestions: each inspects the learner's code and returns an edited
// version plus a short note, or null when the change does not fit the current code.
const conditionLine = /^(\s*)(if|elif)\s+(.+?)\s*:\s*$/m;
export const suggestions = [
  {
    id: 'number',
    label: { en: '🔢 Change the number', he: '🔢 שנו את המספר' },
    apply(source) {
      const match = /^([A-Za-z_]\w*)\s*=\s*(\d+)\s*$/m.exec(source);
      if (!match) return null;
      const value = Number(match[2]);
      const next = value >= 60 ? 40 : 75;
      return {
        source: source.replace(match[0], `${match[1]} = ${next}`),
        note: { en: `${match[1]} is now ${next}. Press Run: does the other path run this time?`, he: `${match[1]} הוא עכשיו ${next}. לחצו על הפעלה: האם הפעם רץ המסלול השני?` }
      };
    }
  },
  {
    id: 'comparison',
    label: { en: '↔ Flip the comparison', he: '↔ הפכו את ההשוואה' },
    apply(source) {
      const match = conditionLine.exec(source);
      if (!match) return null;
      const swaps = [['>=', '>'], ['>', '>='], ['<=', '<'], ['<', '<='], ['==', '!='], ['!=', '==']];
      const pair = swaps.find(([from]) => match[3].includes(from));
      if (!pair) return null;
      const condition = match[3].replace(pair[0], pair[1]);
      return {
        source: source.replace(match[0], `${match[1]}${match[2]} ${condition}:`),
        note: { en: `The rule is now ${condition}. Run it with the number exactly on the edge to feel the difference.`, he: `התנאי הוא עכשיו ${condition}. הריצו עם מספר בדיוק על הגבול כדי להרגיש את ההבדל.` }
      };
    }
  },
  {
    id: 'elif',
    label: { en: '➕ Add an elif path', he: '➕ הוסיפו מסלול elif' },
    apply(source) {
      const match = conditionLine.exec(source);
      const elseLine = /^else\s*:\s*$/m.exec(source);
      if (!match || !elseLine || /^elif\b/m.test(source)) return null;
      const name = /^[A-Za-z_]\w*/.exec(match[3])?.[0];
      if (!name) return null;
      const block = `elif ${name} >= 40:\n    print("Almost!")\n`;
      return {
        source: source.slice(0, elseLine.index) + block + source.slice(elseLine.index),
        note: { en: 'A middle path was added. Try a number between 40 and 59: only elif should run.', he: 'נוסף מסלול אמצעי. נסו מספר בין 40 ל־59: רק elif אמור לרוץ.' }
      };
    }
  },
  {
    id: 'message',
    label: { en: '💬 Change what it prints', he: '💬 שנו מה מודפס' },
    apply(source) {
      const match = /print\((["'])(.*?)\1\)/.exec(source);
      if (!match) return null;
      const next = match[2] === 'Well done!' ? 'Nice!' : 'Well done!';
      return {
        source: source.replace(match[0], `print("${next}")`),
        note: { en: `The first message is now “${next}”. The computer prints exactly what is inside the quotes.`, he: `ההודעה הראשונה היא עכשיו “${next}”. המחשב מדפיס בדיוק מה שבתוך המירכאות.` }
      };
    }
  },
  {
    id: 'after',
    label: { en: '⬇ Add a line after both paths', he: '⬇ הוסיפו שורה אחרי שני המסלולים' },
    apply(source) {
      if (!conditionLine.test(source)) return null;
      const trimmed = source.replace(/\s+$/, '');
      return {
        source: `${trimmed}\nprint("Done")\n`,
        note: { en: 'A line with no spaces in front is outside the branches, so it runs every time.', he: 'שורה בלי רווחים בהתחלה נמצאת מחוץ לענפים, ולכן היא רצה תמיד.' }
      };
    }
  },
  {
    id: 'skeleton',
    label: { en: '🧱 Insert a new if / else', he: '🧱 הכניסו if / else חדש' },
    apply(source) {
      const trimmed = source.replace(/\s+$/, '');
      const block = `number = 10\nif number > 5:\n    print("big")\nelse:\n    print("small")\n`;
      return {
        source: trimmed ? `${trimmed}\n\n${block}` : block,
        note: { en: 'A complete if / else was added at the end. Change number, the rule or the messages, then Run.', he: 'נוסף if / else שלם בסוף. שנו את number, את התנאי או את ההודעות, ואז הפעלה.' }
      };
    }
  }
];
