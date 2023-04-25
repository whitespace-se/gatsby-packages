const formatDate = require("date-fns/format");
const parseDate = require("date-fns/parseJSON");
// const { createContentDigest } = require( "gatsby-core-utils");
const { decode: decodeHtmlEntities } = require("html-entities");
const {
  produce,
  setAutoFreeze,
  // current,
} = require("immer");
const { flattenDeep, isEmpty, negate, isEqual } = require("lodash");
// const gql = require( "tagged-template-noop");
const traverse = require("traverse");

const getMostRelevantDate = require("./src/utils/getMostRelevantDate");

setAutoFreeze(false);

const isNotEmpty = negate(isEmpty);

function htmlToText(html) {
  return html && decodeHtmlEntities(html.replace(/(<([^>]+)>)/gi, ""));
}

function extractAllStrings(obj) {
  return typeof obj === "object"
    ? traverse(obj)
        .nodes()
        .filter((node) => typeof node === "string" || typeof node === "number")
        .join(" ")
    : obj;
}

function defaultContentNodeFields(source) {
  // source = current(source);
  let contentType = source.contentType?.node?.name;
  let dates =
    contentType !== "page"
      ? source.archiveDatesGmt || (source.dateGmt && [source.dateGmt]) || []
      : [];
  let date = getMostRelevantDate(dates);
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
    image: source.featuredImage && source.featuredImage.node,
    textContent: [
      // Post content
      htmlToText(source.content),
      // Modularity modules
      source.contentArea &&
        source.contentArea.modules.map(({ module }) => [
          // Module title if not hidden
          module && module.hideTitle && module.title,
          // Module content (in text modules etc)
          htmlToText(module && module.content),
          // Manual input in Posts module
          module &&
            module.modPostsDataSource &&
            module.modPostsDataSource.data &&
            module.modPostsDataSource.data.map((data) => [
              data.postTitle,
              htmlToText(data.postContent),
            ]),
          // Values in Contacts module
          module &&
            module.modContactsOptions &&
            module.modContactsOptions.contacts &&
            module.modContactsOptions.contacts.map(
              ({
                firstName,
                lastName,
                workTitle,
                administrationUnit,
                email,
                phoneNumbers,
                address,
                visitingAddress,
                other,
              }) => [
                `${firstName} ${lastName}`,
                workTitle,
                administrationUnit,
                email,
                phoneNumbers && phoneNumbers.map(({ number }) => [number]),
                address,
                visitingAddress,
                other,
              ],
            ),
          // Values in Fileslist module
          extractAllStrings(module && module.modFileslistOptions),
          // Text in Notice module
          module &&
            module.modNoticeOptions &&
            module.modNoticeOptions.noticeText,
        ]),
    ],
  };
}

// function normalizeDocuments(documents) {
//   return flattenDeep(documents)
//     .filter(isNotEmpty)
//     .map((document) => ({
//       ...document,
//       textContent:
//         (Array.isArray(document.textContent)
//           ? flattenDeep(document.textContent).filter(isNotEmpty).join("\n")
//           : document.textContent) || "",
//     }));
// }

function normalizeDocument(document) {
  return {
    ...document,
    textContent:
      (Array.isArray(document.textContent)
        ? flattenDeep(document.textContent).filter(isNotEmpty).join("\n")
        : document.textContent) || "",
  };
}

// const myQuery = gql`
//   query {
//     pages: allSitePage {
//       nodes {
//         # querying id is required
//         id
//         # component
//         path
//         # componentChunkName
//         context {
//           title
//         }
//         internal {
//           # querying internal.contentDigest is required
//           contentDigest
//           # type
//           # owner
//         }
//       }
//     }
//   }
// `;

// const queries = [
//   {
//     // query: myQuery,
//     query: gql`
//       query WPNodesForAlgolia {
//         graphQlQuery(name: { eq: "WPContentNodesForMiniSearch" }) {
//           data
//         }
//       }
//     `,
//     queryVariables: {}, // optional. Allows you to use graphql query variables in the query
//     transformer: (result) => {
//       let data = result.data.graphQlQuery.data;
//       return normalizeDocuments(
//         data.contentNodes.nodes.map((source) => ({
//           ...defaultContentNodeFields(source),
//           tags:
//             source.tags ||
//             source.tags.nodes ||
//             source.tags.nodes.map((tag) => tag || tag.slug),
//         })),
//       ).map((item) => ({
//         ...item,
//         internal: { contentDigest: createContentDigest(item) },
//       }));
//     }, // optional
//     // indexName: "", // overrides main index name, optional
//     // settings: {
//     //   // optional, any index settings
//     //   // Note: by supplying settings, you will overwrite all existing settings on the index
//     // },
//     // mergeSettings: false, // optional, defaults to false. See notes on mergeSettings below
//   },
// ];

const addTextContent = () => (page) => {
  if (page.context.contentNode) {
    let { textContent } = normalizeDocument(
      defaultContentNodeFields(page.context.contentNode),
    );
    page.context.textContent = textContent;
  }
};

const markPageAsSearchable =
  ({
    includeInSearch = (page) =>
      page.context.contentType &&
      !page.context.isFrontPage &&
      !page.context.isArchivePage,
  }) =>
  (page) => {
    let isIncludedInSearch = includeInSearch(page);
    if (isIncludedInSearch) {
      page.context.isIncludedInSearch = true;
    }
  };

exports.onCreatePage = ({ page, actions, reporter }, pluginOptions) => {
  const { createPage, deletePage } = actions;
  let newPage = [addTextContent, markPageAsSearchable]
    .map((callback) => callback(pluginOptions, { reporter }))
    .reduce((page, callback) => produce(page, callback), page);

  if (!isEqual(page, newPage)) {
    // try {
    deletePage(page);
    createPage(newPage);
    // } catch (error) {
    //   console.log(page, newPage);
    //   throw error;
    // }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  // isArchivePage: Boolean
  const typeDefs = `
    type SitePageContext {
      textContent: String
      isIncludedInSearch: Boolean
    }
  `;
  createTypes(typeDefs);
};
