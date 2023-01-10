const { isAfter, isBefore, parseISO } = require("date-fns");

const numericCompare = (a, b) => Number(a) - Number(b);

module.exports = function getMostRelevantDate(dates, interval = []) {
  let [fromDate, toDate] = interval;
  dates = dates.map((date) => parseISO(date));
  if (fromDate || toDate) {
    dates = dates.filter((date) => {
      return (
        (!fromDate || !isBefore(date, fromDate)) &&
        (!toDate || isBefore(date, toDate))
      );
    });
  }
  if (dates.length === 0) {
    return;
  }
  // First look at upcoming dates and pick the first one
  let upcomingDates = dates.filter((date) => isAfter(date, new Date()));
  upcomingDates.sort(numericCompare);
  if (upcomingDates.length) {
    return upcomingDates[0];
  }
  // Then look at past dates and pick the most recent one
  let pastDates = dates.filter((date) => isBefore(date, new Date()));
  pastDates.sort(numericCompare);
  return pastDates[pastDates.length - 1];
};
