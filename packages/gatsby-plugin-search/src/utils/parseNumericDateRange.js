export default function parseNumericDateRange(string) {
  return string
    ?.split(":")
    .map((value) => (value ? new Date(Number(value)) : undefined));
}
