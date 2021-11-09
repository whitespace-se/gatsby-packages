import normalizeOption from "./normalizeOption";

export default function normalizeOptions(options) {
  if (!Array.isArray(options)) {
    return Object.entries(options).map(([value, rest]) => ({
      ...normalizeOption(rest),
      value,
    }));
  }
  return options && options.map(normalizeOption);
}
