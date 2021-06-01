import gql from "graphql-tag";
import { cloneDeep } from "lodash";
import traverse from "traverse";

const getQuery = (query) => {
  if (typeof query === "object" && query.definitions) {
    return query;
  } else if (typeof query === "string") {
    return gql(query);
  } else if (typeof query === "object" && query.source) {
    return gql(query.source);
  } else {
    throw new Error("Could not parse query: " + query);
  }
};

export const mergeQueries = (querySources) => {
  const doc = {
    kind: "Document",
    definitions: querySources.flatMap(
      (document) => getQuery(document).definitions,
    ),
  };
  return doc;
};

export const getIsolatedQuery = (querySource, fieldName, typeName) => {
  const query = getQuery(querySource);
  const updatedQuery = cloneDeep(query);

  updatedQuery.definitions.forEach((definition) => {
    if (definition.kind === "OperationDefinition") {
      const updatedRoot = definition.selectionSet.selections.find(
        (selection) =>
          selection.name &&
          selection.name.kind === "Name" &&
          selection.name.value === fieldName,
      );

      if (updatedRoot) {
        definition.selectionSet.selections =
          updatedRoot.selectionSet.selections;
      } else if (fieldName) {
        console.warn("Failed to update query root");
        return;
      }
    }
  });

  traverse(updatedQuery).forEach(function (x) {
    if (this.isLeaf && this.parent && this.parent.key === "name") {
      if (this.parent.parent && this.parent.parent.node.kind === "NamedType") {
        if (typeof x === "string" && x.indexOf(`${typeName}_`) === 0) {
          this.update(x.substr(typeName.length + 1));
        }
      }
    }
  });

  return updatedQuery;
};
