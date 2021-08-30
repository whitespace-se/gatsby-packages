import prettierGraphQLParser from "prettier/parser-graphql";
import { format } from "prettier/standalone";

export default function formatGraphQL(code) {
  return format(code, {
    parser: "graphql",
    plugins: [prettierGraphQLParser],
  });
}
