import { Link as GatsbyLink } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

InternalLinkElement.propTypes = { href: PropTypes.any };

function InternalLinkElement({ href, ...restProps }) {
  return <GatsbyLink to={href} {...restProps} />;
}

export default {
  default: {},
  breadcrumbs: {},
  link: {
    components: {
      InternalLinkElement,
    },
  },
};
