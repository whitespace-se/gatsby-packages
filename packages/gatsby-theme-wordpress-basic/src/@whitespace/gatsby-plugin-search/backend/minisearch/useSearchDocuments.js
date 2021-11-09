import formatDate from "date-fns/format";
import parseDate from "date-fns/parseJSON";
import { graphql, useStaticQuery } from "gatsby";

function htmlToText(html) {
  return html && html.replace(/(<([^>]+)>)/gi, "");
}

function defaultContentNodeFields(source) {
  return {
    id: source.id,
    url: source.url || source.uri,
    contentType: source.contentType?.node.name,
    label: source.title,
    date: source.dateGmt,
    publishDate: source.dateGmt,
    year: source.dateGmt && formatDate(parseDate(source.dateGmt), "yyyy"),
    month: source.dateGmt && formatDate(parseDate(source.dateGmt), "yyyy-MM"),
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
