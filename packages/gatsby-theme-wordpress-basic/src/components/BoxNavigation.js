import { H } from "@jfrk/react-heading-levels";
import {
  Button as DefaultButton,
  Link as DefaultLink,
} from "@whitespace/components";
import withComponentDefaults from "@whitespace/components/dist/withComponentDefaults";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./BoxNavigation.module.css";

BoxNavigation.propTypes = {
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      uri: PropTypes.string,
    }),
  ),
  link: PropTypes.any,
  preamble: PropTypes.node,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.node,
};

export default withComponentDefaults(BoxNavigation, "boxNavigation");

function BoxNavigation({
  className,
  components: { Link = DefaultLink, Button = DefaultButton } = {
    Link: DefaultLink,
    Button: DefaultButton,
  },
  items,
  link,
  preamble,
  styles = defaultStyles,
  title,
  ...restProps
}) {
  if (items.length === 0) {
    return null;
  }
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      {title || preamble ? (
        <div className={clsx(styles.header)}>
          {title ? (
            link ? (
              <Link className={clsx(styles.title)} to={link}>
                {title}
              </Link>
            ) : (
              <H className={clsx(styles.title)}>{title}</H>
            )
          ) : null}
          {preamble ? (
            <p className={clsx(styles.preamble)}>{preamble}</p>
          ) : null}
        </div>
      ) : null}
      {items && items.length ? (
        <div className={clsx(styles.body)}>
          <ul className={clsx(styles.list)}>
            {items.map(({ title, uri }, index) => {
              return (
                <li key={index} className={clsx(styles.item)}>
                  <Button className={clsx(styles.link)} to={uri}>
                    {title}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
