import formatDate from "date-fns/format";
import parseDate from "date-fns/parseJSON";
import { graphql, useStaticQuery } from "gatsby";

function htmlToText(html) {
  return html && html.replace(/(<([^>]+)>)/gi, "");
}

function defaultContentNodeFields(source) {
  let contentType = source.contentType?.node.name;
  let dates =
    contentType !== "page" ? source.dateGmt && [source.dateGmt] : null;
  let date = dates?.[0];
  return {
    id: source.id,
    url: source.url || source.uri,
    contentType,
    label: source.title,
    dates,
    date,
    year: date && formatDate(parseDate(date), "yyyy"),
    month: date && formatDate(parseDate(date), "yyyy-MM"),
    years: dates && dates.map((date) => formatDate(parseDate(date), "yyyy")),
    months:
      dates && dates.map((date) => formatDate(parseDate(date), "yyyy-MM")),
    publishDate: source.dateGmt,
    image: source.featuredImage?.node,
    text: [
      // Post content
      htmlToText(source.content),
    ],
  };
}

export default function useSearchDocuments() {
  const {
    graphQlQuery: { data },
  } = useStaticQuery(graphql`
    query WPNodesForMiniSearch {
      graphQlQuery(name: { eq: "WPContentNodesForMiniSearch" }) {
        data
      }
    }
  `);

  return [
    data.contentNodes.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
      tags: source.tags?.nodes?.map((tag) => tag?.slug),
    })),
  ];
}
