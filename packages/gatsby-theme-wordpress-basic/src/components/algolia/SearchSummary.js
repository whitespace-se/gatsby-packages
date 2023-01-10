/** @jsx jsx */
import { css, jsx } from "@emotion/react";
// import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useInstantSearch } from "react-instantsearch-hooks-web";

SearchSummary.propTypes = {};

export default function SearchSummary() {
  const {
    // indexUiState,
    // setIndexUiState,
    results,
    // use,
  } = useInstantSearch({
    catchError: true,
  });
  const { t } = useTranslation();

  if (!results || results.intercepted) {
    return null;
  }

  return (
    <div
      css={css`
        font-size: var(--search-form-label-font-size, 0.875rem);
        color: var(--search-form-hits-label-color, #000000);
      `}
    >
      {t(`searchHits`)}
      {": "}
      <span
        css={css`
          color: var(--search-form-hits-label-span-color, gray);
        `}
      >
        {results.nbHits}
      </span>
    </div>
  );
}
