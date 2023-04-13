/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useID, Icon, FormInputField } from "@whitespace/components";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useSearchBox } from "react-instantsearch-hooks-web";

SearchBox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  searchAsYouType: PropTypes.oneOf(false),
  submitLabel: PropTypes.node,
};

export default function SearchBox(props) {
  let { id, label, submitLabel, placeholder, searchAsYouType, ...restProps } =
    props;
  const { t } = useTranslation();
  const {
    query,
    refine,
    clear,
    // isSearchStalled,
  } = useSearchBox(props);

  label = label || t(["search.queryFieldLabel", "Search query"]);
  submitLabel = submitLabel || t(["search.submitLabel", "Search"]);
  const generateID = useID();

  return (
    <Formik
      initialValues={{ query }}
      onSubmit={async ({ query }) => {
        refine(query);
      }}
      onReset={async () => {
        clear();
      }}
    >
      {() => (
        <Form
          css={css`
            position: relative;
            --icon-color: var(--color-foreground);
          `}
        >
          <FormInputField
            label={label}
            id={id || generateID("search-query")}
            name="query"
            placeholder={
              placeholder || t(["search.searchBoxPlaceholder", "Search…"])
            }
            css={css`
              --form-input-width: var(--search-form-input-width, 100%);
              --form-input-padding: var(--search-form-padding-default, 1rem);
              --form-input-border: var(--search-form-border, none);
              --form-input-border-radius: var(
                --search-form-border-radius,
                0.25rem
              );
              --form-input-background: var(--search-form-background, #ffffff);
              --form-input-font-family: var(--search-form-font-family, inherit);
              --form-input-font-size: var(--search-form-font-size, 100%);
              --form-input-color: var(--search-form-surface, #000000);

              & > label {
                position: absolute;
                clip: rect(0, 0, 0, 0);
                pointer-events: none;
              }
            `}
            {...restProps}
          />
          <button
            type="submit"
            aria-label={submitLabel}
            css={css`
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              border: 2px solid transparent;
              box-sizing: border-box;
              background: var(
                --search-form-submit-background-color,
                transparent
              );
              margin: 0.375rem;
              padding: 0.75rem;
              color: var(--search-form-submit-color, #ffffff);
              border-radius: calc(var(--search-form-spacing, 1rem) * 0.25);
              display: flex;
              align-items: center;
              cursor: pointer;

              &:focus {
                border: var(--search-form-focus-border, 2px solid #000000);
              }

              &:hover {
                background: var(
                  --search-form-submit-hover-background-color,
                  #000000
                );
              }
            `}
          >
            <Icon name="search" />
          </button>
        </Form>
      )}
    </Formik>
  );
}
