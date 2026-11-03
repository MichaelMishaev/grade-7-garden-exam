import { writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { englishGameQuiz } from '../../english-content.mjs';
const ids = ['facts', 'questions', 'instructions', 'physics-basics', 'physics-units', 'physics-precision', 'physics-pole'];
const quizzes = await Promise.all(ids.map(async id => {
  const response = await fetch(`https://hitech.agnon.online/api/quizzes/${id}`, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Content sync failed: ${id} (${response.status})`);
  const quiz = await response.json();
  if (quiz.id !== id || !Array.isArray(quiz.questions) || !quiz.questions.length) throw new Error('Invalid content');
  return quiz;
}));
quizzes.push(englishGameQuiz());
const content = { capturedAt: new Date().toISOString(), source: 'https://hitech.agnon.online/api/quizzes', quizzes };
await writeFile(new URL('../src/content-snapshot.json', import.meta.url), JSON.stringify(content, null, 2) + '\n');
await writeFile(new URL('../../maze/content-snapshot.js', import.meta.url), '// Public practice content copied verbatim from ../afterbell/src/content-snapshot.json.\n// No student data. Refresh only from the existing source-backed question catalog.\nexport default ' + JSON.stringify(content, null, 2) + ';\n');
console.log(`Synced ${quizzes.length} quizzes / ${quizzes.reduce((n, q) => n + q.questions.length, 0)} questions; sha256 ${createHash('sha256').update(JSON.stringify(quizzes)).digest('hex')}`);
