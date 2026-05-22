/**
 * Calculates decayed progress with pillar-specific rates.
 * @param {Array} completions - Array of task objects from GraphQL
 * @param {Date} currentTime - Reference time
 */
export function calculateStats(completions, currentTime = new Date()) {
  const totals = { love: 0, wealth: 0, skill: 0, needs: 0 };
  const levels = { love: 0, wealth: 0, skill: 0, needs: 0 };

  // Pillar-specific decay constants
  const DECAY_RATES = {
    love: 0.025,   // High decay: Relationships require constant attention
    needs: 0.020,  // Medium-High: Social needs and community fade quickly
    wealth: 0.010,  // Medium-Low: Habits and expertise have "stickiness"
    skill: 0.005, // Low: Financial/Resource energy is most stable
  };

  if (!completions || completions.length === 0) {
    return { stats: totals, levels };
  }

  completions.forEach(c => {
    const p = c.pillar?.toLowerCase();
    const key = (p === 'world' || p === 'needs') ? 'needs' : p;

    if (totals.hasOwnProperty(key)) {
      const baseIntensity = c.intensity || 1;
      const decayRate = DECAY_RATES[key];
      
      // Calculate Time Delta
      const updatedDate = c.updatedAt ? new Date(c.updatedAt) : new Date();
      const daysPassed = Math.max(0, (currentTime - updatedDate) / (1000 * 60 * 60 * 24));

      // Exponential Decay: N = N0 * e^(-λt)
      const decayedIntensity = baseIntensity * Math.exp(-decayRate * daysPassed);
      
      totals[key] += decayedIntensity;
    }
  });

  const processMetric = (points) => ({
    progress: (points % 500) / 500,
    level: Math.floor(points / 500)
  });

  const loveM = processMetric(totals.love);
  const wealthM = processMetric(totals.wealth);
  const skillM = processMetric(totals.skill);
  const needsM = processMetric(totals.needs);

  return {
    stats: { love: loveM.progress, wealth: wealthM.progress, skill: skillM.progress, needs: needsM.progress },
    levels: { love: loveM.level, wealth: wealthM.level, skill: skillM.level, needs: needsM.level }
  };
}

export function getSortedPillars(stats) {
  const basePillars = [
    { label: 'love', value: stats.love },
    { label: 'skill', value: stats.skill },
    { label: 'wealth', value: stats.wealth },
    { label: 'needs', value: stats.needs },
  ];

  const sorted = [...basePillars].sort((a, b) => b.value - a.value);
  const youValue = (stats.love + stats.wealth + stats.skill + stats.needs) / 4;

  return [{ label: 'Balance', value: youValue }, ...sorted];
}