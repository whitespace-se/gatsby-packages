/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getMostRelevantDate } from "@whitespace/gatsby-plugin-search/src/utils";
import PropTypes from "prop-types";
import { useCallback } from "react";
// import { useTranslation } from "react-i18next";
import { useHits, Highlight } from "react-instantsearch-hooks-web";

SearchHits.propTypes = {
  hitComponent: PropTypes.elementType,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default function SearchHits({ children, ...props }) {
  let { hits, results, sendEvent } = useHits(props);
  const { hitComponent: Hit, emptyResultsMessage } = props;
  // const { t } = useTranslation();

  const transformHit = useCallback((hit) => {
    let isFile = hit.contentType?.name === "file";
    return {
      ...hit,
      date: hit.dates && getMostRelevantDate(hit.dates),
      contentType: hit.contentType?.name,
      // contentTypeLabel: t(`contentTypes.${hit.contentType?.name}.name`, {
      //   count: 1,
      // }),
      label: <Highlight attribute={"title"} hit={hit} />,
      text: isFile ? (
        <Highlight attribute={"file.attachment.content"} hit={hit} />
      ) : (
        <Highlight attribute={"textContent"} hit={hit} />
      ),
      url: hit.path,
    };
  }, []);

  hits = hits.map(transformHit);

  if (typeof children === "function") {
    return children({ hits, results, sendEvent });
  }

  if (!results) {
    return null;
  }

  if (!results.__isArtificial && !results.intercepted && !hits?.length) {
    return emptyResultsMessage;
  }

  return (
    <ol
      css={css`
        list-style: none;
        padding-left: 0;
        list-style: none;
        margin: 0;
        margin-top: 2rem;
        display: grid;
        align-content: start;

        --focus-outset: calc(
          (var(--search-hit-gap, 2rem) - var(--search-hit-rule-width, 1px)) / 2
        );
      `}
    >
      {hits.map((hit, index) => {
        return <Hit hit={hit} key={index} />;
      })}
    </ol>
  );
}
