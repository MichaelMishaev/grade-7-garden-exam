import { sha256 } from 'js-sha256';

export function quizFingerprint(q) {
  return sha256(JSON.stringify(q.questions.map(({id,prompt,choices,correct,difficulty}) => ({id,prompt,choices,correct,difficulty:difficulty??null}))));
}
