export const getWeekDays = (startDate: string, endDate: string) => {
  const days = [];

  // Set both start and end dates to the beginning of the day
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  // Iterate through the dates
  const currentDate = new Date(start);
  while (currentDate <= end) {
    days.push(new Date(currentDate).getDay());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return [...new Set(days)];
};
