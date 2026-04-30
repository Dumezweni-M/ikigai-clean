// __tests__/pillarUtils.test.js
import { getPillarFrequencies, getActivePillarsCount } from '../src/utils/pillarUtils';

const mockTasks = [
    { pillar: 'Love' },
    { pillar: 'Skill' },
    { pillar: 'Wealth' },
    { pillar: 'World' },
    { pillar: null },
];

test('counts frequency of each pillar', () => {
    const result = getPillarFrequencies(mockTasks);
    expect(result).toEqual({ love: 1, skill: 1, wealth: 1, world: 1 });
});

test('ignores tasks with no pillar', () => {
    const result = getPillarFrequencies(mockTasks);
    expect(Object.keys(result)).not.toContain(null);
});

// Expects four pillars based on IKIGAI
test('counts unique active pillars', () => {
    expect(getActivePillarsCount(mockTasks)).toBe(4);
});

test('returns 0 when no tasks', () => {
    expect(getActivePillarsCount([])).toBe(0);
});

test('treats same pillar with different casing as one', () => {
    const tasks = [{ pillar: 'Health' }, { pillar: 'health' }, { pillar: 'HEALTH' }];
    expect(getActivePillarsCount(tasks)).toBe(1);
});