// FAKE rubric content for tests (public, invented text): same shape as the private file, one record per open question.
// Importing `./use-fake-rubrics.mjs` puts it in OPEN_RUBRICS_JSON, so tests never depend on open-rubrics.private.json.
import { openQuestionStructure } from '../open-rubrics.mjs';

export const fakeRubrics = () => Object.fromEntries(['hebrew-v2-library', 'physics-v1-assessment'].map(examId => [
  examId,
  Object.fromEntries(Object.keys(openQuestionStructure(examId)).map(id => [id, {
    modelAnswer: `FAKE model answer for ${id}`,
    rubric: [`FAKE point one of ${id}`, `FAKE point two of ${id}`]
  }]))
]));
