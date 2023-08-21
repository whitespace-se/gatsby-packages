/** @jsx jsx */
import { css, jsx } from "@emotion/react";
// import { useSearchSettings } from "@municipio/gatsby-theme-basic/src/hooks";
import styled from "@emotion/styled";
import { useID } from "@whitespace/components";
import formatDate from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useInstantSearch, useRange } from "react-instantsearch-hooks-web";

const StyledField = styled(Field)`
  grid-column: 1;
  grid-row: 1;
  z-index: ${(props) => (props.hideLabel ? 3 : 1)};
  &:focus {
    z-index: 3;
  }

  width: var(--form-input-width);
  height: var(--form-input-height);
  margin: var(--form-input-margin);
  padding: var(--form-input-padding);
  border: var(--form-input-border);
  border-radius: var(--form-input-border-radius);
  background: var(--form-input-background, white);
  box-shadow: var(--form-input-box-shadow);
  font-family: var(--form-input-font-family);
  font-weight: var(--form-input-font-weight);
  font-size: var(--form-input-font-size);
  letter-spacing: var(--form-input-letter-spacing);
  line-height: var(--form-input-line-height);
  color: var(--form-input-color);
  box-sizing: var(--form-input-box-sizing);

  /* border-color: var(--select-field-control-border-color, #dfe1e4);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px; */
  /* cursor: default; */
  /* min-height: 38px; */
  outline: 0 !important;
  transition: all 100ms;
  /* color: var(--select-field-control-color, #3d4148);
  font-size: var(--select-field-font-size, 1rem);
  font-weight: var(--select-field-font-weight, 400);
  padding: 0 0.25rem; */
  /* @media (max-width: 32rem) {
    width: 280px;
    height: 40px;
  } */
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  grid-column: 1;
  grid-row: 1;
  z-index: 2;
  /* border-color: transparent;
  border-style: solid;
  border-width: 1px;
  outline: 0 !important;
  transition: all 100ms;
  box-sizing: border-box;
  color: var(--select-field-control-color, #3d4148);
  font-size: var(--select-field-font-size, 1rem);
  font-weight: var(--select-field-font-weight, 400);
  padding: 0 0.5rem;
  pointer-events: none;
  margin: 2px;
  background: white; */

  pointer-events: none;
  width: var(--form-input-width);
  height: var(--form-input-height);
  margin: var(--form-input-margin);
  padding: var(--form-input-padding);
  border: var(--form-input-border);
  border-radius: var(--form-input-border-radius);
  background: var(--form-input-background, white);
  box-shadow: var(--form-input-box-shadow);
  font-family: var(--form-input-font-family);
  font-weight: var(--form-input-font-weight);
  font-size: var(--form-input-font-size);
  letter-spacing: var(--form-input-letter-spacing);
  line-height: var(--form-input-line-height);
  color: var(--form-input-color);
  box-sizing: var(--form-input-box-sizing);
`;

SearchRangeInput.propTypes = {
  attribute: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  searchAsYouType: PropTypes.oneOf(false),
  submitLabel: PropTypes.node,
};

export default function SearchRangeInput(props) {
  let {
    attribute,
    // label,
    // hideLabel,
    id,
    ...restProps
  } = props;
  const {
    start,
    range,
    // canRefine,
    refine,
    // sendEvent,
  } = useRange(props);
  const { t } = useTranslation();
  const generateID = useID();
  const {
    results,
    // indexUiState,
  } = useInstantSearch();

  const name = attribute.replace(/\./g, "_");

  if (!results || results.intercepted) {
    return null;
  }

  id = id || generateID(name);

  let min = Number.isFinite(range.min)
    ? formatDate(new Date(range.min), "yyyy-MM-dd")
    : "";

  let max = Number.isFinite(range.max)
    ? formatDate(new Date(range.max), "yyyy-MM-dd")
    : "";

  let initialValues = {
    [name]: {
      min: Number.isFinite(start[0])
        ? formatDate(new Date(start[0]), "yyyy-MM-dd")
        : "",
      max: Number.isFinite(start[1])
        ? formatDate(new Date(start[1]), "yyyy-MM-dd")
        : "",
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        let { min, max } = values[name];

        let newValue = [min, max]
          .map((value) => (value.length ? parseISO(value).valueOf() : null))
          .map((value) => (Number.isFinite(value) ? value : undefined));

        refine(newValue);
      }}
    >
      {({ submitForm, setFieldValue, values }) => (
        <Form
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: inherit;
          `}
          {...restProps}
        >
          {/* <pre>
            <code>{JSON.stringify(indexUiState, null, 2)}</code>
          </pre> */}
          <div
            css={css`
              display: grid;
            `}
          >
            <StyledLabel htmlFor={`${id}-min`}>
              {t(["datePicker.placeholder.from", "From date"])}
            </StyledLabel>
            <StyledField
              type="date"
              name={`${name}.min`}
              id={`${id}-min`}
              // placeholder={t(["datePicker.placeholder.from", "From date"])}
              onChange={(event) => {
                setFieldValue(`${name}.min`, event.target.value);
                setTimeout(submitForm, 0);
              }}
              min={min}
              max={max}
              hideLabel={values[name].min}
            />
          </div>
          <div
            css={css`
              display: grid;
            `}
          >
            <StyledLabel htmlFor={`${id}-max`}>
              {t(["datePicker.placeholder.to", "To date"])}
            </StyledLabel>
            <StyledField
              type="date"
              name={`${name}.max`}
              id={`${id}-max`}
              // placeholder={t(["datePicker.placeholder.to", "To date"])}
              onChange={(event) => {
                setFieldValue(`${name}.max`, event.target.value);
                setTimeout(submitForm, 0);
              }}
              min={min}
              max={max}
              hideLabel={values[name].max}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
