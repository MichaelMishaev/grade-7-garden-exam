-- Practice history (docs/TESTING.md §7): one row per finished full practice round, saved under the student's name,
-- and one row per question of that round. Additive only: two new tables and an index, nothing existing is changed.
CREATE TABLE practice_results (
  id bigserial PRIMARY KEY,
  quiz_id text NOT NULL,
  quiz_code text NOT NULL,
  student_name text NOT NULL,
  score int NOT NULL CHECK (score BETWEEN 0 AND 100),
  stars int NOT NULL CHECK (stars BETWEEN 0 AND 3),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE practice_result_answers (
  result_id bigint NOT NULL REFERENCES practice_results(id),
  position int NOT NULL,
  question_id text NOT NULL,
  choice int NOT NULL,
  correct boolean NOT NULL,
  PRIMARY KEY (result_id, position)
);

CREATE INDEX practice_results_student_idx ON practice_results (lower(student_name), created_at);
