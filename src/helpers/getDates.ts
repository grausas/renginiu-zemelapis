// get all dates between two dates and check if checked weekdays are included
export const getDates = (
  startDate: string,
  endDate: string,
  weekDays: string
) => {
  console.log("weekDays", weekDays);
  const dates: string[] = [];
  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const weekDaysArray = weekDays.split(",");
  console.log("weekDaysArray", weekDaysArray.length);
  if (weekDaysArray.length === 7) {
    return dates;
  }
  while (d1 <= d2) {
    const newDate = new Date(d1);
    if (weekDaysArray.includes(newDate.getDay().toString())) {
      dates.push(newDate.toISOString());
    }
    d1.setDate(d1.getDate() + 1);
  }
  return dates;
};
