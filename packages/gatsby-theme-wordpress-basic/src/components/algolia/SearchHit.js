/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
import * as hitComponents from "@whitespace/gatsby-plugin-search/src/components/search-hits";
import { getMostRelevantDate } from "@whitespace/gatsby-plugin-search/src/utils";
import { camelCase, upperFirst } from "lodash-es";
import PropTypes from "prop-types";

SearchHit.propTypes = {
  hit: PropTypes.object,
};

export default function SearchHit(props) {
  let {
    hit: { dates, ...hit },
  } = props;
  const { contentType } = hit;
  let componentName =
    contentType && `${upperFirst(camelCase(contentType))}SearchHit`;
  let Component =
    // eslint-disable-next-line import/namespace
    (componentName && hitComponents[componentName]) ||
    hitComponents.DefaultSearchHit;
  return (
    <Component
      hit={{
        ...hit,
        date: getMostRelevantDate(
          dates.map((date) => date.formatted),
          // TODO: Add interval from context
        ),
      }}
    />
  );
}
