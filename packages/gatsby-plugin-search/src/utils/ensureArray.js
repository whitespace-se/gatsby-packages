export default function ensureArray(value, isEmpty = (value) => value === "") {
  if (isEmpty(value)) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
