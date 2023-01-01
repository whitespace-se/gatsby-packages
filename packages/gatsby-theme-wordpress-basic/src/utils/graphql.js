const gql = require("graphql-tag");
const { cloneDeep } = require("lodash");
const traverse = require("traverse");

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

const getQueryName = (query) => {
  query = getQuery(query);
  let definitions = query.definitions;
  if (!definitions) {
    return;
  }
  let node = definitions.find(
    (def) => def.kind === "OperationDefinition" && def.operation === "query",
  );
  if (!node) {
    return;
  }
  return node.name.value;
};

const mergeQueries = (querySources) => {
  const doc = {
    kind: "Document",
    definitions: querySources.flatMap(
      (document) => getQuery(document).definitions,
    ),
  };
  return doc;
};

const getIsolatedQuery = (querySource, fieldName, typeName) => {
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

module.exports = {
  getQuery,
  getQueryName,
  mergeQueries,
  getIsolatedQuery,
};
