/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
// import styled from "@emotion/styled";
import { Pagination } from "@whitespace/components";
// import { useSearchSettings } from "@municipio/gatsby-theme-basic/src/hooks";
// import { useID, Icon } from "@whitespace/components";
import PropTypes from "prop-types";
// import { Fragment, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { usePagination } from "react-instantsearch-hooks-web";

SearchPagination.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  submitLabel: PropTypes.node,
  searchAsYouType: PropTypes.oneOf(false),
};

export default function SearchPagination(props) {
  // let { id, label, submitLabel, ...restProps } = props;
  // const { searchPlaceholderText, searchLabelText, searchButtonText } =
  //   useSearchSettings();
  // const { t } = useTranslation();
  const {
    // pages,
    currentRefinement,
    // nbHits,
    nbPages,
    // isFirstPage,
    // isLastPage,
    canRefine,
    refine,
    // createURL,
  } = usePagination(props);

  if (!canRefine) {
    return null;
  }

  return (
    <Pagination
      totalPages={nbPages}
      page={currentRefinement}
      onButtonClick={(page) => {
        refine(page);
      }}
    />
  );

  // return (
  //   <ul>
  //     {pages.map((page) => (
  //       <li key={page}>
  //         <a
  //           href={createURL(page)}
  //           onClick={(event) => {
  //             event.preventDefault();
  //             refine(page);
  //           }}
  //         >
  //           {page + 1}
  //         </a>
  //       </li>
  //     ))}
  //   </ul>
  // );
}
