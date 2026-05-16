// __tests__/isCheckedInCurrentCycle.test.js
import { isCheckedInCurrentCycle } from '../src/utils/timeHelpers';

describe('isCheckedInCurrentCycle', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // --- null / falsy input ---

  test('returns false when lastCheckedAt is null', () => {
    expect(isCheckedInCurrentCycle(null)).toBe(false);
  });

  test('returns false when lastCheckedAt is undefined', () => {
    expect(isCheckedInCurrentCycle(undefined)).toBe(false);
  });

  test('returns false when lastCheckedAt is empty string', () => {
    expect(isCheckedInCurrentCycle('')).toBe(false);
  });

  // --- default reset (midnight 00:00) ---

  test('returns true when checked after midnight today', () => {
    // now = 10:00, checked at 09:00 today — both after midnight anchor
    jest.setSystemTime(new Date('2025-01-15T10:00:00'));
    const checkedAt = new Date('2025-01-15T09:00:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt)).toBe(true);
  });

  test('returns false when checked before midnight (yesterday)', () => {
    // now = 10:00 on the 15th, checked at 23:59 on the 14th — before anchor
    jest.setSystemTime(new Date('2025-01-15T10:00:00'));
    const checkedAt = new Date('2025-01-14T23:59:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt)).toBe(false);
  });

  // --- custom reset hour (19:40 — the app's anchor) ---

  test('returns true when checked after 19:40 reset and now is after 19:40', () => {
    // now = 20:00, anchor = 19:40 today, checked at 19:45 — valid
    jest.setSystemTime(new Date('2025-01-15T20:00:00'));
    const checkedAt = new Date('2025-01-15T19:45:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 19, 40)).toBe(true);
  });

  test('returns false when checked before 19:40 reset and now is after 19:40', () => {
    // now = 20:00, anchor = 19:40 today, checked at 18:00 — stale
    jest.setSystemTime(new Date('2025-01-15T20:00:00'));
    const checkedAt = new Date('2025-01-15T18:00:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 19, 40)).toBe(false);
  });

  test('returns true when now is before 19:40 and checked after yesterday 19:40', () => {
    // now = 09:00 on the 15th — anchor rolls back to 19:40 on the 14th
    // checked at 21:00 on the 14th — still in current cycle
    jest.setSystemTime(new Date('2025-01-15T09:00:00'));
    const checkedAt = new Date('2025-01-14T21:00:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 19, 40)).toBe(true);
  });

  test('returns false when now is before 19:40 and checked before yesterday 19:40', () => {
    // now = 09:00 on the 15th — anchor = 19:40 on the 14th
    // checked at 18:00 on the 14th — before anchor, stale
    jest.setSystemTime(new Date('2025-01-15T09:00:00'));
    const checkedAt = new Date('2025-01-14T18:00:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 19, 40)).toBe(false);
  });

  // --- boundary / edge cases ---

  test('returns true when checked exactly at the reset anchor time', () => {
    // Checked precisely at 19:40:00 — should be treated as in-cycle (>=)
    jest.setSystemTime(new Date('2025-01-15T20:00:00'));
    const checkedAt = new Date('2025-01-15T19:40:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 19, 40)).toBe(true);
  });

  test('returns false when checked one second before the reset anchor', () => {
    jest.setSystemTime(new Date('2025-01-15T20:00:00'));
    const checkedAt = new Date('2025-01-15T19:39:59').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 19, 40)).toBe(false);
  });

  test('returns true when checked at exactly the same millisecond as now', () => {
    jest.setSystemTime(new Date('2025-01-15T20:00:00'));
    const checkedAt = new Date('2025-01-15T20:00:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 19, 40)).toBe(true);
  });

  test('handles midnight reset hour 0 minute 0 correctly', () => {
    jest.setSystemTime(new Date('2025-01-15T00:30:00'));
    const checkedAt = new Date('2025-01-15T00:10:00').toISOString();
    expect(isCheckedInCurrentCycle(checkedAt, 0, 0)).toBe(true);
  });

});