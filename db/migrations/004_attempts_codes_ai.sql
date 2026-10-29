-- Test codes, attempt numbers and AI grading results (docs/TESTING.md §1, §6, §9). Additive only: new nullable columns.
-- exams.code is the permanent test code, seeded from db/extract.mjs; NULL is allowed and not unique.
ALTER TABLE exams ADD COLUMN code text;
CREATE UNIQUE INDEX exams_code_key ON exams (code);

-- submissions.exam_code / attempt: what the email showed (NULL for legacy payloads without `exam`).
-- ai_status: none (no open questions), ok, failed; NULL = never recorded (rows written before this migration).
-- ai_scores: { "<questionId>": { "score": n, "max": n, "reason": "..." } }; the reasons are for the teacher only.
ALTER TABLE submissions
  ADD COLUMN exam_code text,
  ADD COLUMN attempt int,
  ADD COLUMN ai_status text CHECK (ai_status IN ('none', 'ok', 'failed')),
  ADD COLUMN ai_scores jsonb,
  ADD COLUMN ai_total numeric,
  ADD COLUMN ai_updated_at timestamptz;
