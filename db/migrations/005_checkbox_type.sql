-- Allow the 'checkbox' question type. Replaces the questions.type CHECK with the old list plus
-- 'checkbox'; no rows or columns change. Existing rows already satisfy the wider list.
ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_type_check;
ALTER TABLE questions ADD CONSTRAINT questions_type_check
  CHECK (type IN ('mcq', 'truefalse', 'match', 'order', 'fill', 'open', 'checkbox'));
