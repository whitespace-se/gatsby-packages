import { isEmpty } from "lodash";

export default function isEmptySearch({
  sortBy,
  sortOrder,
  from,
  size,
  ...params
}) {
  void sortBy;
  void sortOrder;
  void from;
  void size;
  return Object.values(params).every(isEmpty);
}
