-- Study material ("חומר לימוד") that students may open: each exam version has its own references,
-- and every question points at the reference and the part of it (page, paragraph, chapter) it follows.
-- Additive only: a new table and two nullable columns. `references` is reserved in SQL, hence study_references.
CREATE TABLE study_references (
  id text PRIMARY KEY,
  subject_id text NOT NULL REFERENCES subjects(id),
  exam_id text REFERENCES exams(id),
  quiz_id text REFERENCES quizzes(id),
  kind text NOT NULL CHECK (kind IN ('pdf', 'site', 'passage')),
  title text NOT NULL,
  url text,
  attribution text,
  parts jsonb,
  sort_order int NOT NULL
);

ALTER TABLE questions ADD COLUMN reference_id text REFERENCES study_references(id);
ALTER TABLE questions ADD COLUMN reference_part text;

CREATE INDEX study_references_exam_idx ON study_references (exam_id);
CREATE INDEX questions_reference_idx ON questions (reference_id);
