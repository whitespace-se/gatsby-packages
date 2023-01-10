import { parseISO as parseDate } from "date-fns";

export default function parseFormattedDateRange(string) {
  return string
    ?.split(":")
    .map((value) => (value ? parseDate(value) : undefined));
}
