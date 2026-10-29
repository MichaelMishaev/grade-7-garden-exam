// The test codes live in two places that must agree: `examCodes` in db/extract.mjs (seeds exams.code) and the `exams`
// table in server.mjs (the email). docs/TESTING.md §1: a code is permanent, unique and never reused.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exams } from '../server.mjs';
import { examCodes, extractContent } from './extract.mjs';

test('the server exams table and the extractor carry the same exam ids and codes', () => {
  assert.deepEqual(Object.fromEntries(Object.entries(exams).map(([id, exam]) => [id, exam.code])), examCodes);
});

test('codes are unique, well formed, and every extracted exam gets its code', () => {
  const codes = Object.values(examCodes);
  assert.equal(new Set(codes).size, codes.length);
  assert.ok(codes.every(code => /^(HEB|PHY)-\d{3}$/.test(code)));
  const content = extractContent();
  for (const id of Object.keys(examCodes)) assert.equal(content.exams.find(exam => exam.id === id)?.code, examCodes[id], id);
  assert.ok(content.exams.every(exam => exam.code === (examCodes[exam.id] ?? null)));
});
