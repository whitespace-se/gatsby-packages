export default function stringifyNumericDateRange(range) {
  let string = range?.map((date) => (date ? date.valueOf() : "")).join(":");
  return string === ":" ? undefined : string;
}
