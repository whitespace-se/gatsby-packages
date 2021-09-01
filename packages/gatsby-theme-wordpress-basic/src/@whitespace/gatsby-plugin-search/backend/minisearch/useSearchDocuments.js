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
  const data =
    useStaticQuery(graphql`
      query WPNodesForMiniSearch {
        pages: graphQlQuery(name: { eq: "WPPagesForMiniSearch" }) {
          data
        }
        posts: graphQlQuery(name: { eq: "WPPostsForMiniSearch" }) {
          data
        }
      }
    `).graphQlQuery?.data?.contentNodes?.nodes || [];

  return [
    data.pages.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
    })),
    data.posts.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
      tags: source.tags?.nodes,
    })),
  ];
}
