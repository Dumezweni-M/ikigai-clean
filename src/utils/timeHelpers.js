
export const isCheckedInCurrentCycle = (lastCheckedAt, resetHour = 0) => {
  if (!lastCheckedAt) return false;

  const now = new Date();
  const lastChecked = new Date(lastCheckedAt);
  const anchor = new Date(now);
  
  anchor.setHours(resetHour, 0, 0, 0);

  if (now < anchor) {
    anchor.setDate(anchor.getDate() - 1);
  }

  return lastChecked >= anchor;
};