import { Link as WrappedLink } from "@whitespace/components";
import React from "react";

export default function Link(props) {
  console.warn(
    new Error(
      "Using <Link> from @whitespace/gatsby-theme-wordpress-basic is deprecated. Use @whitespace/components instead.",
    ).stack,
  );
  return <WrappedLink {...props} />;
}
