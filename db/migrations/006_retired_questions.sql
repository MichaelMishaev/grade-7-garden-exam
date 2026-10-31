-- Keep superseded practice questions as historical records, outside the active catalog.
ALTER TABLE questions ADD COLUMN retired boolean NOT NULL DEFAULT false;
