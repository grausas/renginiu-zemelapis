// get all dates between two dates and check if checked weekdays are included
export const getDates = (
  startDate: string,
  endDate: string,
  weekDays: string
) => {
  const dates: { startDate: string; endDate: string }[] = [];
  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const weekDaysArray = weekDays.split(",");
  if (weekDaysArray.length === 7) {
    dates.push({
      startDate,
      endDate,
    });
  }

  while (d1 <= d2 && weekDaysArray.length !== 7) {
    const newDate = new Date(d1);
    if (weekDaysArray.includes(newDate.getDay().toString())) {
      const date = newDate.getDate();
      const end = new Date(d2);
      dates.push({
        startDate: newDate.toISOString(),
        endDate: new Date(end.setDate(date)).toISOString(),
      });
    }
    d1.setDate(d1.getDate() + 1);
  }
  return dates;
};
