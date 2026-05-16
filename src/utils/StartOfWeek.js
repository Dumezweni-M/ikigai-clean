// Helper to get current Monday
const today = new Date();
const day = today.getDay() || 7; 
const monday = new Date(today);
if (day !== 1) monday.setHours(-24 * (day - 1));

// Process only for this week
const weeklyData = processLineCompletions(data.completions, monday);