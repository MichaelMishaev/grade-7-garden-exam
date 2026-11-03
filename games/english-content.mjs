import { extractContent } from '../db/extract.mjs';

// Games use single-choice, self-contained tasks. Keep reading and written
// responses in the full exam, where the passage and teacher grading exist.
export function englishGameQuiz() {
  const content = extractContent();
  const questions = content.questions.filter(q => q.exam_id === 'english-v1-practice'
    && ['mcq', 'truefalse'].includes(q.type) && q.reference_id !== 'english-reading');
  const referenceIds = new Set(questions.map(q => q.reference_id));
  return {
    id: 'english-v1-practice', subject_id: 'english', exam_id: 'english-v1-practice',
    title: 'אנגלית · אוצר מילים ודקדוק',
    description: 'תרגול למבחן 9.11: אוצר מילים, חלקי דיבר והווה פשוט. הבנת הנקרא וכתיבה במבחן המלא.',
    references: content.study_references.filter(r => referenceIds.has(r.id)).map(r => ({
      id: r.id, kind: r.kind, title: r.title, url: r.url, attribution: r.attribution, parts: r.parts
    })),
    questions: questions.map(q => ({
      id: q.id, position: q.position, type: 'mcq', topic: q.topic, difficulty: q.difficulty,
      prompt: q.prompt, choices: q.choices, correct: q.correct,
      explanation: { he: q.explanation_he, en: q.explanation_en || '' },
      ref: { id: q.reference_id, part: q.reference_part }
    }))
  };
}
