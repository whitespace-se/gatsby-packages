/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";

export default function PageElementWrapper({ ...restProps }) {
  return <div {...restProps}>{/* contents */}</div>;
}
