import { test } from 'node:test';
import assert from 'node:assert/strict';
import { israelDate } from './exam-calendar.js';

test('calendar changes day at Israel midnight, independent of the browser timezone', () => {
  assert.equal(israelDate(new Date('2026-11-02T21:59:59Z')), '2026-11-02');
  assert.equal(israelDate(new Date('2026-11-02T22:00:00Z')), '2026-11-03');
});

test('calendar handles Israel daylight saving and the year boundary', () => {
  assert.equal(israelDate(new Date('2026-07-01T21:00:00Z')), '2026-07-02');
  assert.equal(israelDate(new Date('2026-12-31T22:00:00Z')), '2027-01-01');
});
