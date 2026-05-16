import { calculateStats } from '../src/utils/progressRingsUtils';

describe('Ikigai Decay Logic (calculateStats)', () => {
  
  test('returns zero stats when no completions exist', () => {
    const result = calculateStats([]);
    expect(result.stats.love).toBe(0);
    expect(result.levels.love).toBe(0);
  });

  test('applies exponential decay correctly over 10 days', () => {
    const mockTime = new Date('2026-05-10');
    const oldTask = [{
      pillar: 'love',
      intensity: 100,
      updatedAt: '2026-04-30' // 10 days prior
    }];

    const result = calculateStats(oldTask, mockTime);
    
    // N = 100 * e^(-0.025 * 10) ≈ 77.88
    // Progress = (77.88 % 500) / 500 ≈ 0.155
    expect(result.stats.love).toBeCloseTo(0.155, 2);
  });

  test('maps "world" pillar to "needs" correctly', () => {
    const task = [{ pillar: 'world', intensity: 100 }];
    const result = calculateStats(task);
    expect(result.stats.needs).toBeGreaterThan(0);
  });
});