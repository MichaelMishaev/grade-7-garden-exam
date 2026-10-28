// Inputs for legacy-email-snapshots.json: payloads WITHOUT the `exam` field (garden and library) and direct
// renderExamEmail calls with the original signature. The snapshots were recorded from the code before the per-exam
// table existed (origin/main 305bbaf), so server.exams.test.mjs proves garden and library emails stay byte-identical.
const answers20 = (make) => Array.from({ length: 20 }, (_, i) => make(i));

export const legacyPayloads = [
  // garden-exam.html shape: question = prompt, open answers only, start/finish times
  {
    name: 'תלמיד גינה <b>', startedAt: '2026-10-28T10:00:00.000Z', finishedAt: '2026-10-28T10:31:00.000Z',
    answers: answers20((i) => ({ question: `שאלה גינה ${i + 1} "&"`, answer: `תשובה ${i + 1}\nשורה שנייה <img src=x>` }))
  },
  // minimal garden payload, no times
  { name: 'Student', answers: answers20((i) => ({ question: `q${i + 1}`, answer: 'a' })) },
  // library-exam.js shape: prefixed question, correct on choice questions, score, times
  {
    name: 'תלמידת ספרייה', startedAt: '2026-10-28T09:00:00.000Z', finishedAt: '2026-10-28T09:00:30.000Z',
    score: { earned: 41, pending: 25 },
    answers: answers20((i) => ({ question: `גרסה 2 · הספרייה בהפסקה · שאלה ${i + 1}`, answer: `בחירה ${i}`, ...(i % 5 === 4 ? {} : { correct: i % 3 === 0 }) }))
  },
  // still rejected exactly as before
  { name: 'x', answers: answers20(() => ({ question: 'q', answer: 'a' })).slice(1) }
];

export const renderCalls = [
  { name: 'א', answers: [{ question: 'ש', answer: 'ת' }], origin: 'https://hitech.agnon.online/' },
  {
    name: "O'Brien & <co>", startedAt: '2026-10-28T10:00:00.000Z', finishedAt: '2026-10-28T11:05:00.000Z', score: { earned: 10, pending: 0 },
    answers: [{ question: 'q1', answer: 'a1', correct: true }, { question: 'q2', answer: 'a2', correct: false }, { question: 'q3', answer: 'a3' }],
    origin: 'http://localhost:3000'
  }
];
