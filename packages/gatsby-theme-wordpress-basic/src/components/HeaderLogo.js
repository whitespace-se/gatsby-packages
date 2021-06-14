import { Link } from "@whitespace/components";
import withComponentDefaults from "@whitespace/components/dist/withComponentDefaults";
import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import * as defaultStyles from "./HeaderLogo.module.css";

function DefaultLogo({ ...restProps }) {
  let title = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site?.siteMetadata?.title;
  return <span {...restProps}>{title}</span>;
}

export default withComponentDefaults(HeaderLogo, "headerLogo");

function HeaderLogo({
  // color = "currentColor",
  // align = "left",
  styles = defaultStyles,
  className,
  linkTo,
  linkProps: { ...linkRestProps } = {},
  "aria-label": ariaLabel,
  components: { Logo = DefaultLogo } = {
    Logo: DefaultLogo,
  },
  ...restProps
}) {
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <Link
        to={linkTo}
        className={clsx(styles.link)}
        // fallbackElement="span"
        aria-label={ariaLabel}
        {...linkRestProps}
      >
        <Logo className={styles.text} />
      </Link>
    </div>
  );
}
