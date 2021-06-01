import React from "react";

function getMachineDateString(date, precision) {
  const { [precision]: length } = {
    year: 4, // YYYY
    month: 7, // YYYY-MM
    day: 10, // YYYY-MM-DD
    hour: 13, // YYYY-MM-DD HH
    minute: 16, // YYYY-MM-DD HH:MM
    second: 19, // YYYY-MM-DD HH:MM:SS
  };
  return date.toISOString().substr(0, length);
}

function areSameDate(a, b) {
  return a.toISOString().substr(0, 10) === b.toISOString().substr(0, 10);
}

export default function TimeInterval({
  startDate,
  endDate,
  format = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  },
  ...restProps
}) {
  // https://stackoverflow.com/questions/54726314/safari-returns-incorrect-value-for-date-toisostring
  startDate = new Date(startDate.replace(/-/g, "/").replace("T", " "));
  endDate = new Date(endDate.replace(/-/g, "/").replace("T", " "));

  const humanStartDate = startDate.toLocaleString("sv-SE", format);
  const humanEndDate = areSameDate(startDate, endDate)
    ? endDate.toLocaleString(
        "sv-SE",
        format
          ? {
              timeStyle: format.timeStyle,
              second: format.second,
              minute: format.minute,
              hour: format.hour,
            }
          : { format },
      )
    : endDate.toLocaleString("sv-SE", format);

  let precision =
    !format || format.timeStyle || format.second
      ? "second"
      : format.minute
      ? "minute"
      : format.hour
      ? "hour"
      : format.dateStyle || format.day
      ? "day"
      : format.month
      ? "month"
      : "year";
  const machineStartDate = getMachineDateString(startDate, precision);
  const machineEndDate = getMachineDateString(endDate, precision);

  return (
    <>
      <time dateTime={machineStartDate} {...restProps}>
        {humanStartDate}
      </time>
      {" – "}
      <time dateTime={machineEndDate} {...restProps}>
        {humanEndDate}
      </time>
    </>
  );
}
