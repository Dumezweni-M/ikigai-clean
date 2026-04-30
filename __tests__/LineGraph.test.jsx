
import {
  normalisePillar,
  getEmptyCounts,
  getDayIndex,
  processLineCompletions,
} from '../src/utils/lineGraphUtils';

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