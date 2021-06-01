import { useTicker } from "@whitespace/gatsby-hooks";
import capitalizeString from "lodash/capitalize";
import React from "react";

import timeAgo from "../utils/time-ago.js";

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

function Ago({ date }) {
  useTicker(30 * 1000);
  return timeAgo.format(date);
}

export default function Time({
  date,
  format,
  ago = false,
  capitalize,
  ...restProps
}) {
  date = new Date(date);
  if (isNaN(date)) {
    return <span>{null}</span>;
  }

  const humanDate = date.toLocaleString("sv-SE", format);

  let precision =
    ago || !format || format.timeStyle || format.second
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
  const machineDate = getMachineDateString(date, precision);

  return (
    <time dateTime={machineDate} {...restProps}>
      {ago ? (
        <>
          <Ago date={date} capitalize={capitalize} />
          {format ? ` (${humanDate})` : null}
        </>
      ) : capitalize ? (
        capitalizeString(humanDate)
      ) : (
        humanDate
      )}
    </time>
  );
}
