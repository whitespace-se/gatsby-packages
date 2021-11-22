import { withComponentDefaults } from "@whitespace/components";
import { LazyMinisearchSearchBackendProvider } from "@whitespace/gatsby-plugin-search";
import { flow } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

DefaultSearchBackendProvider.propTypes = {
  preload: PropTypes.any,
  settings: PropTypes.any,
  transformParams: PropTypes.func,
};

export default withComponentDefaults(
  DefaultSearchBackendProvider,
  "defaultSearchBackendProvider",
);

function DefaultSearchBackendProvider({
  preload = true,
  settings = {
    attributesForFaceting: ["contentType", "tags", "month"],
  },
  transformParams = (params) => params,
  ...restProps
}) {
  return (
    <LazyMinisearchSearchBackendProvider
      preload={preload}
      settings={settings}
      transformParams={flow([
        transformParams,
        ({ date, ...params }) => ({
          ...params,
          ...(/^\d{4}$/.test(date) && {
            month: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
            ].map((m) => `${date}-${m}`),
          }),
          ...(/^\d{4}-\d{2}$/.test(date) && { month: [date] }),
        }),
      ])}
      {...restProps}
    />
  );
}
