import { Link as GatsbyLink } from "gatsby";
import React from "react";

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
