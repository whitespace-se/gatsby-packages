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
            hideLabel
            id={id || generateID("search-query")}
            name="query"
            placeholder={
              placeholder || t(["search.searchBoxPlaceholder", "Search…"])
            }
            css={css`
              --form-input-width: 100%;
              // --form-input-height: ;
              // --form-input-margin: ;
              --form-input-padding: var(--search-form-padding-default, 1rem);
              --form-input-border: none;
              --form-input-border-radius: 0.25rem;
              --form-input-background: var(--search-form-background, #ffffff);
              // --form-input-box-shadow: ;
              --form-input-font-family: inherit;
              // --form-input-font-weight: 500;
              --form-input-font-size: 100%;
              // --form-input-letter-spacing: ;
              // --form-input-line-height: ;
              --form-input-color: var(--search-form-surface, #000000);
              // --form-input-box-sizing: ;

              // display: block;
            `}
            {...restProps}
          />
          {/* {!!value.length && (
            <IconButton
              type="reset"
              aria-label={t("search.clearQuery", "Clear")}
              css={css`
                grid-row: 1;
                grid-column: 1;
                justify-self: end;
              `}
            >
              <Icon name="dismiss" />
            </IconButton>
          )} */}
          {/* <IconButton type="submit" aria-label={submitLabel} color="primary">
          <Icon name="search" />
        </IconButton> */}
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
