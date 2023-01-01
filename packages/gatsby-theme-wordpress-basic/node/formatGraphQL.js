const prettierGraphQLParser = require("prettier/parser-graphql");
const { format } = require("prettier/standalone");

module.exports = function formatGraphQL(code) {
  return format(code, {
    parser: "graphql",
    plugins: [prettierGraphQLParser],
  });
};
