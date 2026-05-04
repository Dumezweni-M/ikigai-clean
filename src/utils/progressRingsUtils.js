export function calculateStats(completions) {
  const totals = { love: 0, wealth: 0, skill: 0, needs: 0 };
  if (!completions) return totals;

  completions.forEach(c => {
    const p = c.pillar?.toLowerCase();
    if (totals.hasOwnProperty(p)) {
      totals[p] += c.intensity || 1;
    }
  });

  const getProgress = (points) => (points % 500) / 500;

  return {
    love:   getProgress(totals.love),
    wealth: getProgress(totals.wealth),
    skill:  getProgress(totals.skill),
    needs:  getProgress(totals.needs),
  };
}

export function getSortedPillars(stats) {
  const basePillars = [
    { label: 'love',   value: stats.love },
    { label: 'skill',  value: stats.skill },
    { label: 'wealth', value: stats.wealth },
    { label: 'needs',  value: stats.needs },
  ];

  const sorted = [...basePillars].sort((a, b) => b.value - a.value);
  const youValue = (stats.love + stats.wealth + stats.skill + stats.needs) / 4;

  return [{ label: 'Balance', value: youValue }, ...sorted];
}