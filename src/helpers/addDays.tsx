export const addDays = (date: number, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.getTime();
};
