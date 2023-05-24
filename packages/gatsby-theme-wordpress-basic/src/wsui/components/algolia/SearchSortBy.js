/** @jsx jsx */
import { css, jsx } from "@emotion/react";
// import { useSearchSettings } from "@municipio/gatsby-theme-basic/src/hooks";
import styled from "@emotion/styled";
import { useID } from "@whitespace/components";
import { Formik, Form } from "formik";
import { kebabCase } from "lodash-es";
import PropTypes from "prop-types";
import { useSortBy, useInstantSearch } from "react-instantsearch-hooks-web";

import ToggleButtonGroup from "../ToggleButtonGroup";

const Label = styled.div`
  ${(props) =>
    props.visuallyHidden
      ? css`
          position: absolute;
          clip: rect(0, 0, 0, 0);
          pointer-events: none;
        `
      : null}
`;

SearchMenu.propTypes = {
  hideLabel: PropTypes.bool,
  label: PropTypes.node,
};

export default function SearchMenu(props) {
  let { label, hideLabel, ...restProps } = props;
  // const { t } = useTranslation();
  const generateID = useID();
  const {
    // initialIndex,
    currentRefinement,
    options,
    refine,
    // canRefine,
  } = useSortBy(props);
  const { results } = useInstantSearch();

  const name = "sortBy";

  if (!results || results.intercepted) {
    return null;
  }

  return (
    <Formik
      initialValues={{ [name]: currentRefinement }}
      onSubmit={async (values) => {
        refine(values[name] || null);
      }}
    >
      {({ submitForm }) => (
        <Form
          css={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.5rem;
          `}
        >
          {label ? (
            <Label
              visuallyHidden={hideLabel}
              id={generateID(`search-sort-by-${kebabCase(name)}-label`)}
            >
              {label}:
            </Label>
          ) : null}
          <ToggleButtonGroup
            itemAppearance="link"
            aria-labelledby={
              label
                ? generateID(`search-sort-by-${kebabCase(name)}-label`)
                : null
            }
            id={generateID(`search-sort-by-${kebabCase(name)}`)}
            options={options}
            name={name}
            onMouseUp={() => {
              setTimeout(submitForm, 0);
            }}
            {...restProps}
          />
        </Form>
      )}
    </Formik>
  );
}
