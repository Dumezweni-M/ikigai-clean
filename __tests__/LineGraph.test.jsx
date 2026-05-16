// __tests__/lineGraphUtils.test.js
import {
  normalisePillar,
  getEmptyCounts,
  getDayIndex,
  processLineCompletions,
} from '../src/utils/lineGraphUtils';

const PAST_MONDAY = new Date('2020-01-01T00:00:00')

// ─── normalisePillar ──────────────────────────────────────────────────────────

describe('normalisePillar', () => {

  // Verify lowercase is capitalised correctly
  test('capitalises lowercase pillar', () => {
    expect(normalisePillar('love')).toBe('Love');
  });

  // Verify uppercase is lowercased correctly
  test('lowercases uppercase pillar', () => {
    expect(normalisePillar('SKILL')).toBe('Skill');
  });

  // Verify already correct casing passes through unchanged
  test('handles already normalised pillar', () => {
    expect(normalisePillar('World')).toBe('World');
  });

  // Verify null input returns null safely
  test('returns null for null input', () => {
    expect(normalisePillar(null)).toBeNull();
  });

  // Verify undefined input returns null safely
  test('returns null for undefined input', () => {
    expect(normalisePillar(undefined)).toBeNull();
  });

});

// ─── getEmptyCounts ───────────────────────────────────────────────────────────

describe('getEmptyCounts', () => {

  // Verify all pillars are present
  test('returns all 5 pillars', () => {
    const counts = getEmptyCounts();
    expect(Object.keys(counts)).toEqual(['All', 'Love', 'Skill', 'World', 'Wealth']);
  });

  // Verify each pillar has 7 days
  test('each pillar has 7 day slots', () => {
    const counts = getEmptyCounts();
    Object.values(counts).forEach(days => {
      expect(days).toHaveLength(7);
    });
  });

  // Verify all values start at zero
  test('all values initialised to zero', () => {
    const counts = getEmptyCounts();
    Object.values(counts).forEach(days => {
      days.forEach(val => expect(val).toBe(0));
    });
  });

  // Verify each call returns a fresh object (no shared state)
  test('returns a new object on each call', () => {
    const a = getEmptyCounts();
    const b = getEmptyCounts();
    a.Love[0] = 99;
    expect(b.Love[0]).toBe(0);
  });

});

// ─── getDayIndex ──────────────────────────────────────────────────────────────

describe('getDayIndex', () => {

  // Monday should return 0
  test('returns 0 for Monday', () => {
    expect(getDayIndex('2026-04-27T10:00:00')).toBe(0);
  });

  // Sunday should return 6 (not -1)
  test('returns 6 for Sunday', () => {
    expect(getDayIndex('2026-04-26T10:00:00')).toBe(6);
  });

  // Verify space separator is handled
  test('handles space separated date string', () => {
    expect(getDayIndex('2026-04-27 10:00:00')).toBe(0);
  });

  // Verify null input returns null safely
  test('returns null for null input', () => {
    expect(getDayIndex(null)).toBeNull();
  });

});

// ─── processLineCompletions ───────────────────────────────────────────────────

describe('processLineCompletions', () => {

  // Empty input returns zeroed counts
  test('returns empty counts for empty array', () => {
    const result = processLineCompletions([]);
    expect(result).toEqual(getEmptyCounts());
  });

  // Undefined input returns zeroed counts
  test('returns empty counts for undefined', () => {
    const result = processLineCompletions(undefined);
    expect(result).toEqual(getEmptyCounts());
  });

  // Verify a valid completion increments the correct pillar and day
  test('increments correct pillar and day', () => {
    const result = processLineCompletions([
      { completedAt: '2026-04-27T10:00:00', pillar: 'Love' }, // Monday = index 0
    ]);
    expect(result.Love[0]).toBe(1);
  });

  // Verify All is also incremented
  test('increments All when pillar is incremented', () => {
    const result = processLineCompletions([
      { completedAt: '2026-04-27T10:00:00', pillar: 'Love' },
    ]);
    expect(result.All[0]).toBeGreaterThan(0);
  });

  // Verify All is divided by 4
  test('divides All counts by 4', () => {
    const result = processLineCompletions([
      { completedAt: '2026-04-27T10:00:00', pillar: 'Love' },
      { completedAt: '2026-04-27T10:00:00', pillar: 'Love' },
      { completedAt: '2026-04-27T10:00:00', pillar: 'Love' },
      { completedAt: '2026-04-27T10:00:00', pillar: 'Love' },
    ]);
    expect(result.All[0]).toBe(1); // 4 / 4 = 1
  });

  // Verify completions with missing fields are skipped
  test('skips completions with missing completedAt', () => {
    const result = processLineCompletions([
      { completedAt: null, pillar: 'Love' },
    ]);
    expect(result.Love).toEqual([0, 0, 0, 0, 0, 0, 0]);
  });

  // Verify completions with missing pillar are skipped
  test('skips completions with missing pillar', () => {
    const result = processLineCompletions([
      { completedAt: '2026-04-27T10:00:00', pillar: null },
    ]);
    expect(result.All).toEqual([0, 0, 0, 0, 0, 0, 0]);
  });

  // Verify unknown pillars are ignored
  test('ignores unknown pillars', () => {
    const result = processLineCompletions([
      { completedAt: '2026-04-27T10:00:00', pillar: 'Unknown' },
    ]);
    expect(result.All[0]).toBe(0);
  });

  // Verify lowercase pillar is normalised and counted correctly
  test('normalises pillar casing', () => {
    const result = processLineCompletions([
      { completedAt: '2026-04-27T10:00:00', pillar: 'love' },
    ]);
    expect(result.Love[0]).toBe(1);
  });

});

// ─── Monday anchor (weeklyData) ───────────────────────────────────────────────

describe('Monday anchor calculation', () => {

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  // Helper: runs the monday-anchor logic and returns the monday Date
  const getMondayAnchor = () => {
    const today = new Date();
    const day = today.getDay() || 7;
    const monday = new Date(today);
    if (day !== 1) monday.setHours(-24 * (day - 1));
    return monday;
  };

  // Returns same day when today is already Monday
  test('returns same day when today is Monday', () => {
    jest.setSystemTime(new Date('2025-01-13T10:00:00'));
    const monday = getMondayAnchor();
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(13);
  });

  // Wednesday rolls back to Monday
  test('rolls back to Monday when today is Wednesday', () => {
    jest.setSystemTime(new Date('2025-01-15T10:00:00'));
    const monday = getMondayAnchor();
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(13);
  });

  // Friday rolls back to Monday
  test('rolls back to Monday when today is Friday', () => {
    jest.setSystemTime(new Date('2025-01-17T10:00:00'));
    const monday = getMondayAnchor();
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(13);
  });

  // Sunday edge case — getDay() returns 0, coerced to 7 by || 7
  test('rolls back 6 days when today is Sunday', () => {
    jest.setSystemTime(new Date('2025-01-19T10:00:00'));
    const monday = getMondayAnchor();
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(13);
  });

  // Saturday rolls back 5 days
  test('rolls back 5 days when today is Saturday', () => {
    jest.setSystemTime(new Date('2025-01-18T10:00:00'));
    const monday = getMondayAnchor();
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(13);
  });

  // Monday that falls on the 1st of a month
  test('correctly handles Monday at start of month', () => {
    jest.setSystemTime(new Date('2025-02-03T10:00:00'));
    const monday = getMondayAnchor();
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(3);
    expect(monday.getMonth()).toBe(1); // February
  });

  // Week spans a month boundary — Wednesday in Feb, Monday still in Feb
  test('rolls back into previous month when week spans month boundary', () => {
    jest.setSystemTime(new Date('2025-02-05T10:00:00'));
    const monday = getMondayAnchor();
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(3);
    expect(monday.getMonth()).toBe(1);
  });

  // Anchor on Sunday end-of-day should not bleed into next week
  test('monday anchor does not bleed into next week on Sunday night', () => {
    jest.setSystemTime(new Date('2025-01-19T23:59:59'));
    const monday = getMondayAnchor();
    expect(monday.getDate()).toBe(13);
  });

  // processLineCompletions receives a Monday as its second argument
  test('passes a Monday anchor to processLineCompletions', () => {
    jest.setSystemTime(new Date('2025-01-15T10:00:00')); // Wednesday
    const monday = getMondayAnchor();
    const mockCompletions = [{ completedAt: '2025-01-14T10:00:00', pillar: 'Love' }];
    processLineCompletions(mockCompletions, monday);
    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(13);
  });

});