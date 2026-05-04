export const isCheckedInCurrentCycle = (lastCheckedAt, resetHour = 0, resetMinute = 0) => {
  if (!lastCheckedAt) return false;

  const now = new Date();
  const lastChecked = new Date(lastCheckedAt);
  const anchor = new Date(now);
  
  // Set the anchor to your custom hour AND minute
  anchor.setHours(resetHour, resetMinute, 0, 0);

  // If we haven't reached the reset time yet today, 
  // the "start" of the current cycle was actually yesterday.
  if (now < anchor) {
    anchor.setDate(anchor.getDate() - 1);
  }

  return lastChecked >= anchor;
};