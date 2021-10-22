export default function normalizeOption(option) {
  if (typeof option !== "object") {
    return { value: option, label: option };
  }
  return option;
}
