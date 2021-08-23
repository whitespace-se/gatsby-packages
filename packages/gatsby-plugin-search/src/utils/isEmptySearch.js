import { isEmpty } from "lodash";

export default function isEmptySearch({
  // sortBy,
  // sortOrder,
  // from,
  // size,
  ...params
}) {
  return Object.values(params).every(isEmpty);
}
