/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
// import PropTypes from "prop-types";
import { useInstantSearch } from "react-instantsearch-hooks-web";

SearchDebug.propTypes = {};

export default function SearchDebug() {
  const {
    indexUiState,
    // setIndexUiState,
    results,
    // use,
  } = useInstantSearch({
    catchError: true,
  });
  return (
    <pre>
      <code>{JSON.stringify({ indexUiState, results }, null, 2)}</code>
    </pre>
  );
}
