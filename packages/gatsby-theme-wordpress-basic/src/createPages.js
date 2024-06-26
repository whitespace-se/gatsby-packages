const {
  getLanguageFromPathname,
} = require("@whitespace/gatsby-plugin-i18next");
const formatDate = require("date-fns/format");
const omit = require("lodash/omit");

const formatGraphQL = require("../node/formatGraphQL");

const {
  getMainArchivePagePathFromPageContext,
  getYearArchivePagePathFromPageContext,
  getMonthArchivePagePathFromPageContext,
  getMainArchivePageTitleFromPageContext,
} = require("./contentType");

const MainArchivePageTemplate = require.resolve(
  "./templates/MainArchiveTemplate",
);
const YearArchivePageTemplate = require.resolve(
  "./templates/YearArchiveTemplate",
);
const MonthArchivePageTemplate = require.resolve(
  "./templates/MonthArchiveTemplate",
);
const ContentTypeTemplate = require.resolve("./templates/ContentTypeTemplate");
const WsuiContentTypeTemplate = require.resolve(
  "./wsui/templates/ContentTypeTemplate.jsx",
);

const SingleTemplate = require.resolve("./templates/SingleTemplate");

const WsuiTemplate = require.resolve("./wsui/templates/TemplateController.jsx");

const WpRestrictedPage = require.resolve(
  "./wsui/components/WpRestrictedPage.jsx",
);

module.exports = ({ contentType, query, nodesPerFetch }) => {
  let { skipPage = false } = contentType;
  if (typeof skipPage !== "function") {
    let skipPageValue = skipPage;
    skipPage = () => skipPageValue;
  }
  return async (
    { actions, graphql, reporter },
    {
      i18next,
      disableDefaultArchivePages,
      search: { algolia: algoliaOptions } = {},
      wsui,
    },
  ) => {
    const { defaultLanguage = "en", languages = ["en"] } = i18next;
    const allContentNodes = [];
    const allContentNodesByYear = {};
    const allContentNodesByMonth = {};
    let archivePageContext;

    let pageNumber = 0;
    let pageCount = 0;
    const commonVariables = {
      contentTypes: [contentType.enum],
      nameIn:
        (process.env.WORDPRESS_SPECIFIC_POSTS &&
          process.env.WORDPRESS_SPECIFIC_POSTS.split(",")) ||
        [],
    };
    const { createPage } = actions;

    reporter.info(`${nodesPerFetch} items per page`);

    const fetchPages = async (variables) =>
      await graphql(query, { ...commonVariables, ...variables })
        .then(({ errors, data }) => {
          if (errors) {
            throw new Error(errors[0].message);
          }
          reporter.info(
            `fetch page ${pageNumber + 1} of ${contentType.name}...`,
          );

          const {
            wp: {
              contentNodes: {
                nodes,
                pageInfo: { hasNextPage, endCursor },
              },
            },
          } = data;

          if (
            !disableDefaultArchivePages &&
            contentType.hasArchive &&
            pageNumber === 0
          ) {
            archivePageContext = {
              contentType,
              contentTypeName: contentType.name,
              isArchivePage: true,
            };
          }

          nodes.forEach((node) => {
            allContentNodes.push(node);
            if (contentType.hasArchive) {
              const years = [
                ...new Set(
                  node.archiveDates.map((archiveDate) =>
                    formatDate(new Date(archiveDate), "yyyy"),
                  ),
                ),
              ];
              years.forEach((year) => {
                allContentNodesByYear[year] = allContentNodesByYear[year] || [];
                allContentNodesByYear[year].push(node);
              });
              const months = [
                ...new Set(
                  node.archiveDates.map((archiveDate) =>
                    formatDate(new Date(archiveDate), "yyyy/MM"),
                  ),
                ),
              ];
              months.forEach((month) => {
                allContentNodesByMonth[month] =
                  allContentNodesByMonth[month] || [];
                allContentNodesByMonth[month].push(node);
              });
            }
          });

          if (hasNextPage) {
            pageNumber++;
            return fetchPages({ first: nodesPerFetch, after: endCursor });
          }
        })
        .catch((error) => {
          let formattedQuery = formatGraphQL(query);
          reporter.error(
            `Query error when creating pages: ${error}

Query:
${formattedQuery}

Variables:
${JSON.stringify({ ...commonVariables, ...variables }, null, 2)}`,
          );
          throw error;
        });

    /**
     * Kick off our `fetchPages` method which will get us all
     * the pages we need to create individual pages.
     */
    await fetchPages({ first: nodesPerFetch, after: null });

    allContentNodes.map((contentNode) => {
      let path = contentNode.uri;
      let component = wsui
        ? contentNode.isRestricted
          ? WpRestrictedPage
          : WsuiTemplate
        : SingleTemplate;
      let language =
        contentNode.language ||
        getLanguageFromPathname(path, languages, defaultLanguage);

      let page = {
        path,
        component,
        context: {
          ...contentNode,
          language,
          contentNode,
          contentType,
        },
      };

      if (!skipPage(page)) {
        createPage(page);
        pageCount++;
        reporter.info(
          `page created for ${contentType.labels.singularName}: ${path}`,
        );
      } else {
        reporter.info(
          `skipped page for ${contentType.labels.singularName}: ${path}`,
        );
      }
    });

    if (!disableDefaultArchivePages && archivePageContext) {
      if (algoliaOptions) {
        let path = getMainArchivePagePathFromPageContext(archivePageContext);
        let title = getMainArchivePageTitleFromPageContext(archivePageContext);
        let component = wsui ? WsuiContentTypeTemplate : ContentTypeTemplate;

        createPage({
          path,
          component,
          context: {
            ...archivePageContext,
            title,
          },
        });
        pageCount++;

        reporter.info(
          `Archive page created for ${contentType.labels.singularName}: ${path}`,
        );
      } else {
        let path = getMainArchivePagePathFromPageContext(archivePageContext);
        let component = MainArchivePageTemplate;
        let years = Object.entries(allContentNodesByYear).map(
          ([year, posts]) => ({
            year,
            postCount: posts.length,
            url: getYearArchivePagePathFromPageContext({
              year,
              ...archivePageContext,
            }),
            months: Object.entries(allContentNodesByMonth)
              .filter(([month]) => month.startsWith(year))
              .map(([month, posts]) => ({
                month,
                postCount: posts.length,
                url: getMonthArchivePagePathFromPageContext({
                  month,
                  ...archivePageContext,
                }),
              })),
          }),
        );

        createPage({
          path,
          component,
          context: {
            ...archivePageContext,
            years,
            postCount: allContentNodes.length,
          },
        });
        pageCount++;

        reporter.info(
          `main archive page created for ${contentType.labels.singularName}: ${path}`,
        );

        Object.entries(allContentNodesByYear).map(([year, posts]) => {
          let path = getYearArchivePagePathFromPageContext({
            year,
            ...archivePageContext,
          });
          let component = YearArchivePageTemplate;
          let months = Object.entries(allContentNodesByMonth).map(
            ([month, posts]) => ({
              month,
              postCount: posts.length,
              url: getMonthArchivePagePathFromPageContext({
                month,
                ...archivePageContext,
              }),
            }),
          );

          createPage({
            path,
            component,
            context: {
              ...archivePageContext,
              year,
              months,
              postCount: posts.length,
            },
          });
          pageCount++;

          reporter.info(
            `year archive page created for ${contentType.labels.singularName} ${year}: ${path}`,
          );
        });

        Object.entries(allContentNodesByMonth).map(([month, posts]) => {
          let path = getMonthArchivePagePathFromPageContext({
            month,
            ...archivePageContext,
          });
          let component = MonthArchivePageTemplate;

          createPage({
            path,
            component,
            context: {
              ...archivePageContext,
              month,
              posts: posts.map((post) => omit(post, ["modularityModules"])),
            },
          });
          pageCount++;

          reporter.info(
            `month archive page created for ${contentType.labels.singularName} ${month}: ${path}`,
          );
        });
      }
    }

    reporter.info(`# -----> PAGES TOTAL: ${pageCount}`);
  };
};
