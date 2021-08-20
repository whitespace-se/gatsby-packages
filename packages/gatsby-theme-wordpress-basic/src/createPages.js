import formatDate from "date-fns/format";
import omit from "lodash/omit";
import prettierGraphQLParser from "prettier/parser-graphql";
import { format } from "prettier/standalone";

import {
  getMainArchivePagePathFromPageContext,
  getYearArchivePagePathFromPageContext,
  getMonthArchivePagePathFromPageContext,
} from "./contentType";

const MainArchivePageTemplate = require.resolve(
  "./templates/MainArchiveTemplate",
);
const YearArchivePageTemplate = require.resolve(
  "./templates/YearArchiveTemplate",
);
const MonthArchivePageTemplate = require.resolve(
  "./templates/MonthArchiveTemplate",
);

const SingleTemplate = require.resolve("./templates/SingleTemplate");

function formatGraphQL(code) {
  return format(code, {
    parser: "graphql",
    plugins: [prettierGraphQLParser],
  });
}

export default ({ contentType, query }) =>
  async ({ actions, graphql, reporter }) => {
    const allContentNodes = [];
    const allContentNodesByYear = {};
    const allContentNodesByMonth = {};
    let archivePageContext;

    let pageNumber = 0;
    let pageCount = 0;
    const itemsPerPage = Number(process.env.WORDPRESS_PAGES_PER_FETCH) || 10;
    const commonVariables = {
      contentTypes: [contentType.enum],
      nameIn:
        (process.env.WORDPRESS_SPECIFIC_POSTS &&
          process.env.WORDPRESS_SPECIFIC_POSTS.split(",")) ||
        [],
    };
    const { createPage } = actions;

    reporter.info(`${itemsPerPage} items per page`);

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

          if (contentType.hasArchive && pageNumber === 0) {
            archivePageContext = {
              contentType,
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
            return fetchPages({ first: itemsPerPage, after: endCursor });
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
    await fetchPages({ first: itemsPerPage, after: null });

    allContentNodes.map((contentNode) => {
      let path = contentNode.uri;
      let component = SingleTemplate;

      createPage({
        path,
        component,
        context: {
          contentNode,
        },
      });
      pageCount++;

      reporter.info(
        `page created for ${contentType.labels.singularName}: ${path}`,
      );
    });

    if (archivePageContext) {
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
    }

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

    reporter.info(`# -----> PAGES TOTAL: ${pageCount}`);
  };
