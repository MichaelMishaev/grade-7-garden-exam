CREATE TABLE subjects (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  art_path text,
  sort_order int NOT NULL
);

CREATE TABLE passages (
  id text PRIMARY KEY,
  title text NOT NULL,
  body_html text NOT NULL,
  source_file text NOT NULL
);

CREATE TABLE exams (
  id text PRIMARY KEY,
  subject_id text NOT NULL REFERENCES subjects(id),
  title text NOT NULL,
  detail text NOT NULL,
  date_label text,
  href text NOT NULL,
  passage_id text REFERENCES passages(id),
  question_count int NOT NULL,
  sort_order int NOT NULL,
  status text NOT NULL DEFAULT 'live'
);

CREATE TABLE quizzes (
  id text PRIMARY KEY,
  subject_id text NOT NULL REFERENCES subjects(id),
  exam_id text REFERENCES exams(id),
  title text NOT NULL,
  description text NOT NULL,
  list_title text,
  list_detail text,
  sort_order int NOT NULL
);

CREATE TABLE questions (
  id text PRIMARY KEY,
  exam_id text REFERENCES exams(id),
  quiz_id text REFERENCES quizzes(id),
  position int NOT NULL,
  type text NOT NULL CHECK (type IN ('mcq', 'truefalse', 'match', 'order', 'fill', 'open')),
  topic text,
  difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard')),
  prompt text NOT NULL,
  choices jsonb,
  correct jsonb,
  explanation_he text,
  explanation_en text,
  source_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (num_nonnulls(exam_id, quiz_id) = 1),
  UNIQUE (exam_id, position),
  UNIQUE (quiz_id, position)
);

CREATE TABLE submissions (
  id bigserial PRIMARY KEY,
  exam_id text REFERENCES exams(id),
  dedupe_key text NOT NULL UNIQUE,
  student_name text NOT NULL,
  started_at timestamptz,
  finished_at timestamptz,
  first_received_at timestamptz NOT NULL DEFAULT now(),
  last_attempt_at timestamptz NOT NULL DEFAULT now(),
  attempt_count int NOT NULL DEFAULT 1,
  email_status text NOT NULL DEFAULT 'pending' CHECK (email_status IN ('pending', 'accepted', 'failed')),
  resend_id text,
  email_http_status int
);

CREATE TABLE submission_answers (
  submission_id bigint NOT NULL REFERENCES submissions(id),
  position int NOT NULL,
  question_id text REFERENCES questions(id),
  question_text text NOT NULL,
  answer_text text NOT NULL,
  auto_correct boolean,
  PRIMARY KEY (submission_id, position)
);
