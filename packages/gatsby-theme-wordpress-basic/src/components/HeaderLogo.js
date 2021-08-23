import { Link } from "@whitespace/components";
import withComponentDefaults from "@whitespace/components/dist/withComponentDefaults";
import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./HeaderLogo.module.css";

HeaderLogo.propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  linkProps: PropTypes.object,
  linkTo: PropTypes.any,
  styles: PropTypes.objectOf(PropTypes.string),
};

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
  "aria-label": ariaLabel,
  className,
  components: { Logo = DefaultLogo } = {
    Logo: DefaultLogo,
  },
  linkProps: { ...linkRestProps } = {},
  linkTo,
  styles = defaultStyles,
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
