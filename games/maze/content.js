import snapshot from './content-snapshot.js';

export const DEFAULT_QUIZ_ID = 'facts';
export const MAZE_QUIZZES = snapshot.quizzes.map(({ id, title, subject_id, questions }) => ({ id, title, subjectId: subject_id, count: questions.length }));
const weights = { easy: 1, medium: 1.5, hard: 2 };
const validId = value => typeof value === 'string' && /^[a-z0-9-]+$/.test(value);

function referenceUrl(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Invalid reference URL');
  const url = new URL(value, `${globalThis.location?.origin || 'https://prepx.invalid'}/`);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid reference URL');
  return url.href;
}

export function normalizeMazeContent(raw, { source = raw?.source || 'snapshot', pinned = false } = {}) {
  const expected = MAZE_QUIZZES.find(quiz => quiz.id === raw?.id);
  if (!expected || typeof raw.title !== 'string' || !raw.title.trim() || !Array.isArray(raw.questions) || (pinned ? raw.questions.length < 1 || raw.questions.length > 30 : raw.questions.length !== expected.count) || !Array.isArray(raw.references)) throw new Error('Invalid maze content');
  const references = raw.references.map(reference => {
    if (!validId(reference.id) || typeof reference.title !== 'string') throw new Error('Invalid question reference');
    return { ...reference, url: referenceUrl(reference.url) };
  });
  if (new Set(references.map(reference => reference.id)).size !== references.length) throw new Error('Duplicate reference');
  const questions = raw.questions.map(question => {
    const reference = references.find(item => item.id === question.ref?.id);
    if (!validId(question.id) || question.type !== 'mcq' || typeof question.prompt !== 'string' || !question.prompt.trim() || !Array.isArray(question.choices) || question.choices.length < 2 || question.choices.length > 8 || question.choices.some(choice => typeof choice !== 'string' || !choice.trim()) || !Number.isInteger(question.correct) || question.correct < 0 || question.correct >= question.choices.length || typeof question.explanation?.he !== 'string' || !question.explanation.he.trim() || !reference || !(question.ref.part === null || typeof question.ref.part === 'string')) throw new Error('Invalid practice question');
    if (question.ref.part && !reference.parts?.some(part => part.part === question.ref.part)) throw new Error('Unknown reference part');
    const difficulty = Object.hasOwn(weights, question.difficulty) ? question.difficulty : 'medium';
    return {
      id: question.id, type: 'mcq', prompt: question.prompt, choices: [...question.choices], correct: question.correct,
      difficulty, weight: weights[difficulty], topic: question.topic || null,
      explanation: { he: question.explanation.he, en: typeof question.explanation.en === 'string' ? question.explanation.en : '' },
      ref: { id: question.ref.id, part: question.ref.part },
      reference: { id: reference.id, title: reference.title, url: reference.url, part: question.ref.part }
    };
  });
  if (new Set(questions.map(question => question.id)).size !== questions.length) throw new Error('Duplicate question');
  const content = { id: raw.id, title: raw.title, description: typeof raw.description === 'string' ? raw.description : '', subjectId: raw.subject_id || raw.subjectId || expected.subjectId, questions, references, source: source === 'live' ? 'live' : 'snapshot', offline: source !== 'live' };
  let hash = 2166136261;
  const academic = JSON.stringify(questions.map(({ id, prompt, choices, correct, difficulty, explanation, ref }) => ({ id, prompt, choices, correct, difficulty, explanation, ref })));
  for (const character of academic) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return { ...content, version: `maze-v1-${(hash >>> 0).toString(16)}` };
}

export function validateMazeContent(raw) {
  try { normalizeMazeContent(raw); return true; } catch { return false; }
}

export async function loadMazeContent({ quizId = DEFAULT_QUIZ_ID, fetchImpl = globalThis.fetch } = {}) {
  const fallback = snapshot.quizzes.find(quiz => quiz.id === quizId);
  if (!fallback) throw new Error('Unknown maze quiz');
  const controller = new AbortController();
  let timer;
  try {
    const timeout = new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error('Content timeout')); }, 2500); });
    const response = await Promise.race([Promise.resolve().then(() => fetchImpl(new URL(`/api/quizzes/${encodeURIComponent(quizId)}`, `${globalThis.location?.origin || 'https://prepx.invalid'}/`).href, { signal: controller.signal, credentials: 'omit' })), timeout]);
    if (!response.ok) throw new Error('Content unavailable');
    const raw = await Promise.race([response.json(), timeout]);
    if (raw?.id !== quizId) throw new Error('Content mismatch');
    return normalizeMazeContent(raw, { source: 'live' });
  } catch {
    return normalizeMazeContent(fallback, { source: 'snapshot' });
  } finally { clearTimeout(timer); }
}
