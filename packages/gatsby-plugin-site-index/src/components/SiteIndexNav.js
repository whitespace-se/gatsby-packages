/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, PageGridItem } from "@whitespace/components";
import PropTypes from "prop-types";

SiteIndexNav.propTypes = {
  currentChar: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string.isRequired,
      hasPages: PropTypes.bool,
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  ),
};

export default function SiteIndexNav({ options, currentChar, ...restProps }) {
  return (
    <PageGridItem>
      <ul
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(2.5rem, 1fr));
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 0.25rem;
        `}
        {...restProps}
      >
        {options.map(({ char, hasPages, label, path }) => {
          return (
            <li
              key={char}
              css={css`
                padding: 0;
                marging: 0;
              `}
            >
              <Button
                to={hasPages ? path : null}
                aria-current={char === currentChar && "page"}
                css={css`
                  width: 100%;
                `}
              >
                {label}
              </Button>
            </li>
          );
        })}
      </ul>
    </PageGridItem>
  );
}
