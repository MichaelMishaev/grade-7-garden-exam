import { test } from 'node:test';
import assert from 'node:assert/strict';
import './numeric-answer.js';

const { parseNumber, checkNumber } = globalThis.NumericAnswer;
const exact = (value) => ({ value, tolerance: 1e-8, unit: null });

test('parses numbers like the teacher site: dot or first comma as decimal mark, minus signs, fractions', () => {
  assert.equal(parseNumber('5.7'), 5.7);
  assert.equal(parseNumber(' 5,7 '), 5.7);
  assert.equal(parseNumber('.09'), 0.09);
  assert.equal(parseNumber('0,009'), 0.009);
  assert.equal(parseNumber('−3'), -3);
  assert.equal(parseNumber('–3'), -3);
  assert.equal(parseNumber('+4'), 4);
  assert.equal(parseNumber('29/5'), 5.8);
  assert.equal(parseNumber('22.5 / 250'), 0.09);
  assert.ok(Number.isNaN(parseNumber('1/0')));
});

test('rejects units, words, thousands separators that are not decimals, and blanks', () => {
  for (const bad of ['325 ס״מ', '325cm', 'שלוש', '3 25', '1.2.3', '', '  ', '5..7', '2,400.5']) assert.ok(Number.isNaN(parseNumber(bad)), bad);
  // like the site, the first comma is a decimal mark, so "2,400" is 2.4
  assert.equal(parseNumber('2,400'), 2.4);
});

test('checks with the site tolerance (exact up to 1e-8)', () => {
  assert.equal(checkNumber('325', exact(325)), true);
  assert.equal(checkNumber('325,0', exact(325)), true);
  assert.equal(checkNumber('5,7', exact(5.7)), true);
  assert.equal(checkNumber('0.09', exact(0.09)), true);
  assert.equal(checkNumber('0,009', exact(0.009)), true);
  assert.equal(checkNumber('2400', exact(2400)), true);
  assert.equal(checkNumber('2,400', exact(2400)), false);
  assert.equal(checkNumber('5.71', exact(5.7)), false);
  assert.equal(checkNumber('32.5', exact(325)), false);
  assert.equal(checkNumber('325 ס״מ', exact(325)), false);
  assert.equal(checkNumber('', exact(1)), 'empty');
  assert.equal(checkNumber('   ', exact(1)), 'empty');
  assert.equal(checkNumber('0.3', { value: 0.1 + 0.2 }), true, 'default tolerance absorbs float noise');
});

test('every numeric task of the physics exam is accepted with its own answer, with dot and comma', async () => {
  const { readFileSync } = await import('node:fs');
  const { runInNewContext } = await import('node:vm');
  const src = readFileSync(new URL('./physics-exam.js', import.meta.url), 'utf8');
  const questions = runInNewContext(src.slice(src.indexOf('const questions'), src.indexOf('const sections')) + '\nquestions;');
  const fills = questions.filter((q) => q.type === 'fill');
  assert.equal(fills.length, 11);
  for (const q of fills) {
    const text = String(q.correct.value);
    assert.equal(checkNumber(text, q.correct), true, q.id);
    assert.equal(checkNumber(text.replace('.', ','), q.correct), true, q.id);
    assert.equal(checkNumber(String(q.correct.value * 10), q.correct), false, q.id);
  }
});
