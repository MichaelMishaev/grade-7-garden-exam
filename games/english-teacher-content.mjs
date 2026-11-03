import { readFileSync } from 'node:fs';

export const teacherSources = JSON.parse(readFileSync(new URL('./english-teacher-sources.json', import.meta.url), 'utf8'));

function fillChoices(item) {
  const verb = /\((\w+)\)/.exec(item.prompt)?.[1];
  if (verb === 'be') return [item.answer, ...['am', 'is', 'are'].filter(x => x !== item.answer)];
  const third = verb === 'have' ? 'has' : /[^aeiou]y$/.test(verb) ? verb.slice(0,-1)+'ies' : /(?:ch|sh|s|x|o)$/.test(verb) ? verb+'es' : verb+'s';
  const ing = /^(get|swim)$/.test(verb) ? verb+verb.at(-1)+'ing' : verb.endsWith('e') ? verb.slice(0,-1)+'ing' : verb+'ing';
  return [...new Set([item.answer, verb, third, ing])];
}

function grammarExplanation(source, item, correct) {
  if (source.id.includes('parts')) {
    const category = item.category || (/verb/i.test(item.prompt) ? 'Verb' : /noun/i.test(item.prompt) ? 'Noun' : /adjective/i.test(item.prompt) ? 'Adjective' : 'Adverb');
    const labels = { Noun: 'שם עצם', Verb: 'פועל', Adjective: 'שם תואר', Adverb: 'תואר הפועל' };
    return { he: `המילה “${item.term || correct}” מסווגת בתרגיל כ־${category} (${labels[category]}).`, en: `In this activity, ${item.term || correct} is classified as ${category.toLowerCase()}.` };
  }
  if (source.id === 'english-negative-1' && item.index === 8) return { he: 'בנאי (builder) עובד באתר בנייה.', en: 'A builder works on a building site.' };
  const answer = correct.toLowerCase();
  const rule = /doesn't/.test(answer) ? ["עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.", "Use doesn't plus the base verb with he/she/it."]
    : /don't/.test(answer) ? ["עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.", "Use don't plus the base verb with I/you/we/they."]
    : source.id.includes('questions') ? ["בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.", "Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."]
    : /\(be\)/.test(item.prompt || '') ? ["ל־be בהווה הצורות am עם I, הצורה is עם he/she/it, והצורה are עם you/we/they.", "Be takes am with I, is with he/she/it, and are with you/we/they."]
    : ["בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.", "Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."];
  return { he: `התשובה היא ${correct}. ${rule[0]}`, en: `The answer is ${correct}. ${rule[1]}` };
}

export function englishTeacherQuizzes() {
  return teacherSources.sources.map(source => {
    const items = source.items.filter(item => !item.excluded);
    const questions = items.map(item => {
      let prompt = item.prompt, choices = item.choices, correct = item.correct, explanation, context;
      if (source.kind === 'vocabulary') {
        prompt = `מה פירוש הביטוי “${item.term}”?`;
        choices = [item.meaning, ...items.filter(other => other.meaning !== item.meaning).slice(0, 3).map(other => other.meaning)];
        correct = 0;
        explanation = { he: `בתרגול המורה: ${item.term} — ${item.meaning}.`, en: `The teacher's vocabulary pair is ${item.term} — ${item.meaning}.` };
      } else if (source.kind === 'sort') {
        prompt = `לאיזו קבוצת חלקי דיבר שייכת המילה “${item.term}” בתרגיל המורה?`;
        choices = ['Noun', 'Verb', 'Adjective'];
        correct = choices.indexOf(item.category);
      } else if (source.kind === 'fill') {
        choices = fillChoices(item); correct = 0;
        context = 'השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים.';
      }
      explanation ||= grammarExplanation(source, item, choices[correct]);
      if (source.id.startsWith('english-negative-')) context = source.id === 'english-negative-1' && item.index === 8
        ? 'בחרו את בעל המקצוע המתאים.' : /don't|doesn't/.test(choices[correct]) ? 'השלימו בשלילה בהווה פשוט.' : 'השלימו בחיוב בהווה פשוט.';
      return {
        id: `${source.id}-${String(item.index).padStart(2, '0')}`, position: item.index,
        type: 'mcq', topic: source.title, difficulty: 'medium', prompt, choices, correct, explanation,
        ref: { id: source.id, part: source.part },
        ...(context ? { context } : {}),
        ...(item.image ? { image: item.image, imageAlt: 'תמונת ההקשר מתוך תרגיל המורה' } : {})
      };
    });
    return {
      id: source.id, subject_id: 'english', exam_id: 'english-v1-practice', title: source.title,
      description: `כל הפריטים התקינים בתרגיל המורה · ${questions.length} שאלות`,
      references: [{ id: source.id, kind: 'site', title: source.title, url: source.url, attribution: 'תרגול שקושר במסמך המורה', parts: [{ part: source.part, title: source.part }] }], questions
    };
  });
}
