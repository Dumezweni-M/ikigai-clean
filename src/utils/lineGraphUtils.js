    
export const normalisePillar = (pillar) => {
  if (!pillar) return null;
  return pillar.charAt(0).toUpperCase() + pillar.slice(1).toLowerCase();
};

/**
 * Returns a fresh zeroed counts object for all pillars
 */
export const getEmptyCounts = () => ({
  All:    [0, 0, 0, 0, 0, 0, 0],
  Love:   [0, 0, 0, 0, 0, 0, 0],
  Skill:  [0, 0, 0, 0, 0, 0, 0],
  World:  [0, 0, 0, 0, 0, 0, 0],
  Wealth: [0, 0, 0, 0, 0, 0, 0],
});

/**
 * Converts a completedAt string to a 0-indexed day (Mon=0, Sun=6)
 */
export const getDayIndex = (completedAt) => {
  if (!completedAt) return null;
  const date = new Date(completedAt.replace(' ', 'T'));
  let dayIndex = date.getDay() - 1;
  if (dayIndex === -1) dayIndex = 6;
  return dayIndex;
};

/**
 * Processes raw completions into a per-pillar, per-day count map.
 * All is the average across 4 pillars.
 */
export const processLineCompletions = (completions) => {
  if (!completions || completions.length === 0) return getEmptyCounts();

  const counts = getEmptyCounts();

  completions.forEach((c) => {
    if (!c.completedAt || !c.pillar) return;

    const dayIndex = getDayIndex(c.completedAt);
    if (dayIndex === null) return;

    const pillar = normalisePillar(c.pillar);
    if (!counts[pillar]) return;

    counts[pillar][dayIndex] += 1;
    counts.All[dayIndex] += 1;
  });

  counts.All = counts.All.map(dayTotal => dayTotal / 4);

  return counts;
};