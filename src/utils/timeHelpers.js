export const isCheckedInCurrentCycle = (lastCheckedAt, resetHour = 0, resetMinute = 0) => {
  if (!lastCheckedAt) return false;

  const now = new Date();
  const lastChecked = new Date(lastCheckedAt);
  const anchor = new Date(now);
  
  // Set the anchor for custom hour AND minute
  anchor.setHours(resetHour, resetMinute, 0, 0);

  
  if (now < anchor) {
    anchor.setDate(anchor.getDate() - 1);
  }

  return lastChecked >= anchor;
};