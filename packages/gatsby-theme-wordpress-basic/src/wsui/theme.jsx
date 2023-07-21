/** @jsx jsx */
import { jsx } from "@emotion/react";
import { createTheme } from "@wsui/base";
import camelCase from "lodash/fp/camelCase";
import upperFirst from "lodash/fp/upperFirst";
import { Highlight } from "react-instantsearch-hooks-web";

import DefaultHit from "./algolia/DefaultHit.jsx";
import Image from "./components/Image.jsx";

export default createTheme({
  colors: {},
  typography: {
    variants: {
      meta: {
        fontSize: 3.5,
        color: "gray.600",
      },
    },
  },
  components: {
    PageGrid: {
      defaultProps: {
        maxColspan: 7,
      },
    },
    Image: {
      defaultProps: {
        handler: Image,
      },
    },
    AlgoliaHitController: {
      defaultProps: {
        transformHit: (hit) => {
          let contentTypeName = hit.contentType?.name;
          let isFile = contentTypeName === "file";
          return {
            ...hit,
            // date: hit.dates && getMostRelevantDate(hit.dates),
            contentTypeName,
            // contentTypeLabel: t(`contentTypes.${hit.contentType?.name}.name`, {
            //   count: 1,
            // }),
            title: <Highlight attribute={"title"} hit={hit} />,
            text: isFile ? (
              <Highlight attribute={"file.attachment.content"} hit={hit} />
            ) : (
              <Highlight attribute={"textContent"} hit={hit} />
            ),
            url: hit.path,
          };
        },
        componentMapping: ({ hit }) => {
          let contentType = hit.contentType?.name;
          return [`${upperFirst(camelCase(contentType))}Hit`];
        },
        components: {
          DefaultHit,
        },
      },
    },
  },
});
