import { processCompletions, getCurrentWeekOffset } from '../src/utils/activityGraphUtils';

// ─── processCompletions ───────────────────────────────────────────────────────

describe('processCompletions', () => {

  // Guard clause — empty input returns empty array
  test('returns empty array when given no completions', () => {
    expect(processCompletions([])).toEqual([]);
  });

  // Guard clause — undefined input returns empty array
  test('returns empty array when given undefined', () => {
    expect(processCompletions(undefined)).toEqual([]);
  });

  // Verify date extraction works with T separator (ISO format)
  test('extracts date correctly from ISO string', () => {
    const result = processCompletions([{ completedAt: '2026-04-01T10:00:00', intensity: 1 }]);
    expect(result[0].date).toBe('2026-04-01');
  });

  // Verify date extraction works with space separator
  test('extracts date correctly from space separated string', () => {
    const result = processCompletions([{ completedAt: '2026-04-01 10:00:00', intensity: 1 }]);
    expect(result[0].date).toBe('2026-04-01');
  });

  // Verify count is calculated correctly (base 5 + intensity * 10)
  test('calculates count correctly from intensity', () => {
    const result = processCompletions([{ completedAt: '2026-04-01T10:00:00', intensity: 2 }]);
    expect(result[0].count).toBe(25); // 5 + (2 * 10)
  });

  // Verify default intensity of 1 is used when intensity is missing
  test('defaults intensity to 1 when not provided', () => {
    const result = processCompletions([{ completedAt: '2026-04-01T10:00:00' }]);
    expect(result[0].count).toBe(15); // 5 + (1 * 10)
  });

  // Verify multiple completions on same date are accumulated
  test('accumulates counts for same date', () => {
    const result = processCompletions([
      { completedAt: '2026-04-01T10:00:00', intensity: 1 },
      { completedAt: '2026-04-01T12:00:00', intensity: 1 },
    ]);
    expect(result[0].count).toBe(30); // (5 + 10) + (5 + 10)
  });

  // Verify completions with no date are skipped
  test('skips completions with no completedAt', () => {
    const result = processCompletions([
      { completedAt: null, intensity: 1 },
      { completedAt: '2026-04-01T10:00:00', intensity: 1 },
    ]);
    expect(result).toHaveLength(1);
  });

  // Verify different dates produce separate entries
  test('produces separate entries for different dates', () => {
    const result = processCompletions([
      { completedAt: '2026-04-01T10:00:00', intensity: 1 },
      { completedAt: '2026-04-02T10:00:00', intensity: 1 },
    ]);
    expect(result).toHaveLength(2);
  });

});

// ─── getCurrentWeekOffset ─────────────────────────────────────────────────────

describe('getCurrentWeekOffset', () => {

  // Verify return type is a number
  test('returns a number', () => {
    expect(typeof getCurrentWeekOffset()).toBe('number');
  });

  // Verify offset is positive
  test('returns a positive offset', () => {
    expect(getCurrentWeekOffset()).toBeGreaterThan(0);
  });

  // Verify custom squareSize and gutterSize are applied
  test('scales offset with custom squareSize and gutterSize', () => {
    const defaultOffset = getCurrentWeekOffset(10, 1);
    const largerOffset = getCurrentWeekOffset(20, 2);
    expect(largerOffset).toBeGreaterThan(defaultOffset);
  });

  // Verify offset at start of year is 0
  test('returns 0 offset for first week of year', () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-01-01'));
    expect(getCurrentWeekOffset(10, 1)).toBe(0);
    jest.useRealTimers();
  });

  // Verify offset increases week by week
  test('returns higher offset for later weeks', () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-06-01'));
    const midYearOffset = getCurrentWeekOffset(10, 1);
    jest.useFakeTimers().setSystemTime(new Date('2026-01-08'));
    const earlyOffset = getCurrentWeekOffset(10, 1);
    expect(midYearOffset).toBeGreaterThan(earlyOffset);
    jest.useRealTimers();
  });

});