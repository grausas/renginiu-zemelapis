// Adds a given number of days to a given date and returns the resulting timestamp.

export function addDays(date: number, days: number): number {
  return date + days * 86400000;
}
