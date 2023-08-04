const options: Intl.DateTimeFormatOptions | undefined | undefined = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export const formatStartDate = (startDate: string, endDate: string) => {
  const today = new Date();
  const dateStart = new Date(startDate);
  const dateEnd = new Date(endDate);

  if (today < dateStart || today > dateEnd) {
    return dateStart.toLocaleString("lt-LT", options);
  }

  if (dateStart.toDateString() === today.toDateString()) {
    return dateStart.toLocaleString("lt-LT", options);
  } else {
    dateStart.setHours(0, 0, 0, 0);
    return dateStart.toLocaleString("lt-LT", options);
  }
};
export const formatEndDate = (startDate: string, endDate: string) => {
  const today = new Date();
  const dateStart = new Date(startDate);
  const dateEnd = new Date(endDate);

  if (today < dateStart || today > dateEnd) {
    return dateEnd.toLocaleString("lt-LT", options);
  }

  if (dateEnd.toDateString() === today.toDateString()) {
    return dateEnd.toLocaleString("lt-LT", options);
  } else {
    dateEnd.setHours(23, 59, 59, 59);
    return dateEnd.toLocaleString("lt-LT", options);
  }
};
