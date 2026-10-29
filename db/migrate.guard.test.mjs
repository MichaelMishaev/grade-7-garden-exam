import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assertAdditive } from './migrate.mjs';

const FILE = '005_checkbox_type.sql';
const stmt = 'ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_type_check;';

test('the shipped checkbox migration passes the guard', () => {
  assert.doesNotThrow(() => assertAdditive(FILE, readFileSync(new URL(`./migrations/${FILE}`, import.meta.url), 'utf8')));
});

test('the guard still rejects every other destructive statement, even in the checkbox file', () => {
  for (const text of [
    'DROP TABLE questions;',
    'ALTER TABLE questions DROP COLUMN prompt;',
    'DROP SCHEMA public CASCADE;',
    'DROP DATABASE prepx;',
    'TRUNCATE questions;',
    'DELETE FROM questions;',
    'ALTER TABLE exams DROP CONSTRAINT IF EXISTS questions_type_check;',
    'ALTER TABLE questions DROP CONSTRAINT questions_pkey;',
    `${stmt}\nDROP TABLE questions;`,
    `${stmt} DELETE FROM questions;`
  ]) assert.throws(() => assertAdditive(FILE, text), /destructive/, text);
});

test('the same constraint statement is rejected in any other file', () => {
  for (const file of ['006_checkbox_type.sql', '005_other.sql', '004_attempts_codes_ai.sql']) {
    assert.throws(() => assertAdditive(file, stmt), /destructive/, file);
  }
});
