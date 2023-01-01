const { parse: parseDate } = require("date-fns");
const capitalize = require("lodash/capitalize");
const kebabCase = require("lodash/kebabCase");

function makeUri(...candidates) {
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

function getMainArchivePagePathFromPageContext({
  contentType: {
    uri,
    labels: { menuName },
  },
}) {
  uri = makeUri(uri, menuName);
  return uri;
}

function getMainArchivePageLabelFromPageContext({
  contentType: {
    labels: { menuName },
  },
}) {
  return menuName;
}

function getMainArchivePageTitleFromPageContext({
  contentType: {
    labels: { archives },
  },
}) {
  return `${archives}`;
}

function getYearArchivePageTitleFromPageContext({
  year,
  contentType: {
    labels: { archives },
  },
}) {
  return `${archives} för ${year}`;
}

function getYearArchivePageLabelFromPageContext({ year, month }) {
  if (year == null && month != null) {
    year = month.substring(0, 4);
  }
  return year;
}

function getYearArchivePagePathFromPageContext({
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

function getMonthArchivePageTitleFromPageContext({
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

function getMonthArchivePageLabelFromPageContext({ month }) {
  let date = parseDate(month, "yyyy/MM", new Date());
  return capitalize(
    date.toLocaleString("sv", {
      month: "long",
    }),
  );
}

function getMonthArchivePagePathFromPageContext({
  month,
  contentType: {
    uri,
    labels: { menuName },
  },
}) {
  uri = makeUri(uri, menuName);
  return `${uri}/${month}`;
}

function getArchiveURLPatternFromPageContext({
  contentType: {
    uri,
    labels: { menuName },
  },
}) {
  uri = makeUri(uri, menuName);
  return `${uri}/:year(\\d+)?/:month(\\d+)?`;
}

module.exports = {
  makeUri,
  getMainArchivePagePathFromPageContext,
  getMainArchivePageLabelFromPageContext,
  getMainArchivePageTitleFromPageContext,
  getYearArchivePageTitleFromPageContext,
  getYearArchivePageLabelFromPageContext,
  getYearArchivePagePathFromPageContext,
  getMonthArchivePageTitleFromPageContext,
  getMonthArchivePageLabelFromPageContext,
  getMonthArchivePagePathFromPageContext,
  getArchiveURLPatternFromPageContext,
};
