
export const getEmptyCounts = () => ({
  All:    [0, 0, 0, 0, 0, 0, 0],
  Love:   [0, 0, 0, 0, 0, 0, 0],
  Skill:  [0, 0, 0, 0, 0, 0, 0],
  World:  [0, 0, 0, 0, 0, 0, 0],
  Wealth: [0, 0, 0, 0, 0, 0, 0],
});

export const normalisePillar = (pillar) => {
  if (!pillar) return null;
  return pillar.charAt(0).toUpperCase() + pillar.slice(1).toLowerCase();
};

export const getDayIndex = (completedAt) => {
  if (!completedAt) return null;
  const date = new Date(completedAt.replace(' ', 'T'));
  let dayIndex = date.getDay() - 1;
  if (dayIndex === -1) dayIndex = 6;
  return dayIndex;
};


export const processLineCompletions = (completions) => {
  const counts = getEmptyCounts();

  if (!completions || completions.length === 0) return counts;

  completions.forEach((c) => {
    if (!c.completedAt || !c.pillar) return;

    const dayIndex = getDayIndex(c.completedAt);
    const pillar = normalisePillar(c.pillar);

    if (dayIndex !== null && counts[pillar]) {
      counts[pillar][dayIndex] += 1;
      counts.All[dayIndex] += 1;
    }
  });

  counts.All = counts.All.map(v => v / 4);

  return counts;
};