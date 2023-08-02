export const formatStartDate = (startDate: string, endDate: string) => {
  const today = new Date();
  const dateStart = new Date(startDate);
  const dateEnd = new Date(endDate);

  if (today < dateStart || today > dateEnd) {
    return dateStart.toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (dateStart.toDateString() === today.toDateString()) {
    return dateStart.toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    dateStart.setHours(0, 0, 0, 0);
    return dateStart.toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};
export const formatEndDate = (startDate: string, endDate: string) => {
  const today = new Date();
  const dateStart = new Date(startDate);
  const dateEnd = new Date(endDate);

  if (today < dateStart || today > dateEnd) {
    return dateEnd.toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (dateEnd.toDateString() === today.toDateString()) {
    return dateEnd.toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    dateEnd.setHours(23, 59, 59, 59);
    return dateEnd.toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};
