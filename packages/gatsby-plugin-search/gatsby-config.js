const { createContentDigest } = require("gatsby-core-utils");
const taggedTemplateNoop = require("tagged-template-noop");

module.exports = ({ algolia } = {}) => {
  let gql;
  gql = taggedTemplateNoop;

  return {
    plugins: algolia
      ? [
          {
            // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
            resolve: `gatsby-plugin-algolia`,
            options: {
              ...algolia,
              queries: algolia.queries?.map(
                ({ query, transformer, ...rest }) => ({
                  query: query && gql([query]),
                  ...rest,
                  transformer: (input) => {
                    // console.log(data.pages.nodes.map((page) => page.path));
                    return transformer(input).map((item) => ({
                      ...item,
                      internal: {
                        ...item.internal,
                        contentDigest:
                          item.contentDigest || createContentDigest(item),
                      },
                    }));
                  },
                }),
              ),
            },
          },
        ]
      : [],
  };
};
