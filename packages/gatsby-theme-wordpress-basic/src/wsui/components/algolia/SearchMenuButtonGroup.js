/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useID } from "@whitespace/components";
import { normalizeOptions } from "@whitespace/gatsby-plugin-search/src/utils";
import { Formik, Form } from "formik";
import { kebabCase } from "lodash-es";
import PropTypes from "prop-types";
import { useMenu, useInstantSearch } from "react-instantsearch-hooks-web";

import ToggleButtonGroup from "../../../components/ToggleButtonGroup";

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

SearchMenuButtonGroup.propTypes = {
  attribute: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  options: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          count: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        }),
      ]),
    ),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          count: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
          value: PropTypes.number,
        }),
      ]),
    ),
  ]),
  searchAsYouType: PropTypes.oneOf(false),
  submitLabel: PropTypes.node,
};

export default function SearchMenuButtonGroup(props) {
  let { attribute, label, options, hideLabel, ...restProps } = props;
  const generateID = useID();
  const {
    items,
    // createURL,
    refine,
    // canRefine,
    // isShowingMore,
    // toggleShowMore,
    // canToggleShowMore,
    // sendEvent,
  } = useMenu(props);
  const { results } = useInstantSearch();

  let forwardedOptions;

  if (options) {
    forwardedOptions = normalizeOptions(options).map((item) => {
      let {
        value,
        label,
        count,
        // isRefined,
      } = { ...items.find((i) => i.value === item.value), ...item };
      return {
        value,
        label: typeof label === "function" ? label(item, items) : label,
        count: typeof count === "function" ? count(item, items) : count,
      };
    });
  } else {
    forwardedOptions = items;
  }

  forwardedOptions = forwardedOptions.map(
    ({
      value,
      label,
      count,
      // isRefined,
    }) => ({
      value,
      label: `${label} (${Number(count) || 0})`,
    }),
  );

  const value = items.find((item) => item.isRefined)?.value || "";
  const name = attribute.replace(/\./g, "_");

  if (!results || results.intercepted) {
    return null;
  }

  return (
    <Formik
      initialValues={{ [name]: value }}
      onSubmit={async (values) => {
        refine(values[name] || null);
      }}
    >
      {({ submitForm }) => (
        <Form>
          <Label
            visuallyHidden={hideLabel}
            id={generateID(`search-menu-${kebabCase(name)}-label`)}
          >
            {label}
          </Label>
          <ToggleButtonGroup
            aria-labelledby={generateID(`search-menu-${kebabCase(name)}-label`)}
            id={generateID(`search-menu-${kebabCase(name)}`)}
            options={forwardedOptions}
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
