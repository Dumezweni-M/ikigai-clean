export const processCompletions = (taskCompletions) => {
  if (!taskCompletions || taskCompletions.length === 0) return [];

  const map = {};

  taskCompletions.forEach(c => {
    if (!c.completedAt) return;
    const date = c.completedAt.split(/[ T]/)[0];
    const base = 5;
    const effort = (c.intensity || 1) * 10;
    map[date] = (map[date] || 0) + (base + effort);
  });

  return Object.keys(map).map(date => ({
    date,
    count: map[date]
  }));
};

/**
 * Calculates the horizontal scroll offset to centre
 * the graph on the current week of the year.
 */
export const getCurrentWeekOffset = (squareSize = 10, gutterSize = 1) => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diffInDays = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.floor(diffInDays / 7);
  return currentWeek * (squareSize + gutterSize);
};