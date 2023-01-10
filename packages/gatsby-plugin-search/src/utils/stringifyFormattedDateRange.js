import { format as formatDate } from "date-fns";

export default function stringifyFormattedDateRange(range) {
  let string = range
    ?.map((date) => (date ? formatDate(date, "yyyy-MM-dd") : ""))
    .join(":");
  return string === ":" ? undefined : string;
}
