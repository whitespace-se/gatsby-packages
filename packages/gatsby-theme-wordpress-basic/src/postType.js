import parseDate from "date-fns/parse";
import capitalize from "lodash/capitalize";

export function getMainArchivePagePathFromPageContext({
  postTypeInfo: { uri },
}) {
  return uri;
}

export function getMainArchivePageLabelFromPageContext({
  postTypeInfo: {
    labels: { menuName },
  },
}) {
  return menuName;
}

export function getMainArchivePageTitleFromPageContext({
  postTypeInfo: {
    labels: { archives },
  },
}) {
  return `${archives}`;
}

export function getYearArchivePageTitleFromPageContext({
  year,
  postTypeInfo: {
    labels: { archives },
  },
}) {
  return `${archives} för ${year}`;
}

export function getYearArchivePageLabelFromPageContext({ year, month }) {
  if (year == null && month != null) {
    year = month.substring(0, 4);
  }
  return year;
}

export function getYearArchivePagePathFromPageContext({
  year,
  month,
  postTypeInfo: { uri },
}) {
  if (year == null && month != null) {
    year = month.substring(0, 4);
  }
  return `${uri}/${year}`;
}

export function getMonthArchivePageTitleFromPageContext({
  month,
  postTypeInfo: {
    labels: { archives },
  },
}) {
  let date = parseDate(month, "yyyy/MM", new Date());
  return `${archives} för ${date.toLocaleString("sv", {
    month: "long",
    year: "numeric",
  })}`;
}

export function getMonthArchivePageLabelFromPageContext({ month }) {
  let date = parseDate(month, "yyyy/MM", new Date());
  return capitalize(
    date.toLocaleString("sv", {
      month: "long",
    }),
  );
}

export function getMonthArchivePagePathFromPageContext({
  month,
  postTypeInfo: { uri },
}) {
  return `${uri}/${month}`;
}

export function getArchiveURLPatternFromPageContext({ postTypeInfo: { uri } }) {
  return `${uri}/:year(\\d+)?/:month(\\d+)?`;
}
