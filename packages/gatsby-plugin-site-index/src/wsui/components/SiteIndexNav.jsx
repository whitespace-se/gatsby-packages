/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button } from "@wsui/base";

export default function SiteIndexNav({ options, currentChar, ...restProps }) {
  return (
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
  );
}
