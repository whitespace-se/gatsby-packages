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
  const data = useStaticQuery(graphql`
    query SearchDocumentsForMiniSearch {
      wp {
        pages: contentNodes(first: 10000, where: { contentTypes: [PAGE] }) {
          nodes {
            ...WP_ContentNodeForSearch
          }
        }
        posts: contentNodes(first: 10000, where: { contentTypes: [POST] }) {
          nodes {
            ...WP_ContentNodeForSearch
          }
        }
      }
    }
  `);

  return [
    data.wp.pages.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
    })),
    data.wp.posts.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
      tags: source.tags?.nodes,
    })),
  ];
}
