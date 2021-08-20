import parseDate from "date-fns/parse";
import capitalize from "lodash/capitalize";
import kebabCase from "lodash/kebabCase";

export function makeUri(...candidates) {
  return candidates
    .map((candidate) =>
      candidate
        ? ("/" + candidate).replace(/\/([^/]*)/g, (match, str) =>
            str.length > 0 ? "/" + kebabCase(str) : "",
          )
        : "",
    )
    .find((candidate) => candidate.length > 0);
}

export function getMainArchivePagePathFromPageContext({
  contentType: {
    uri,
    labels: { menuName },
  },
}) {
  uri = makeUri(uri, menuName);
  return uri;
}

export function getMainArchivePageLabelFromPageContext({
  contentType: {
    labels: { menuName },
  },
}) {
  return menuName;
}

export function getMainArchivePageTitleFromPageContext({
  contentType: {
    labels: { archives },
  },
}) {
  return `${archives}`;
}

export function getYearArchivePageTitleFromPageContext({
  year,
  contentType: {
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
  contentType: {
    uri,
    labels: { menuName },
  },
}) {
  uri = makeUri(uri, menuName);
  if (year == null && month != null) {
    year = month.substring(0, 4);
  }
  return `${uri}/${year}`;
}

export function getMonthArchivePageTitleFromPageContext({
  month,
  contentType: {
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
  contentType: {
    uri,
    labels: { menuName },
  },
}) {
  uri = makeUri(uri, menuName);
  return `${uri}/${month}`;
}

export function getArchiveURLPatternFromPageContext({
  contentType: {
    uri,
    labels: { menuName },
  },
}) {
  uri = makeUri(uri, menuName);
  return `${uri}/:year(\\d+)?/:month(\\d+)?`;
}
