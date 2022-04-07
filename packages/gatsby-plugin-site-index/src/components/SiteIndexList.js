/** @jsx jsx */
import { jsx } from "@emotion/react";
import { RuledList } from "@whitespace/components";
import PropTypes from "prop-types";

SiteIndexList.propTypes = { children: PropTypes.node };

export default function SiteIndexList({ children, ...restProps }) {
  return (
    <RuledList ruleTop ruleBottom {...restProps}>
      {children}
    </RuledList>
  );
}
