/** @jsx jsx */
import { jsx } from "@emotion/react";
import { H, Section } from "@jfrk/react-heading-levels";
import { withComponentDefaults } from "@whitespace/components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import SiteIndexContent from "./SiteIndexContent";
import SiteIndexList from "./SiteIndexList";
import SiteIndexNav from "./SiteIndexNav";
import SiteIndexTeaser from "./SiteIndexTeaser";
import SiteIndexWrapper from "./SiteIndexWrapper";

SiteIndex.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      context: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  ),
  currentChar: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string.isRequired,
      path: PropTypes.string,
      label: PropTypes.string.isRequired,
    }),
  ),
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default withComponentDefaults(SiteIndex, "siteIndex");

function SiteIndex({
  currentChar,
  pages,
  options,
  label,
  language,
  ...restProps
}) {
  const { t } = useTranslation();

  return (
    <SiteIndexWrapper {...restProps}>
      <SiteIndexNav
        options={options}
        currentChar={currentChar}
        language={language}
      />
      <SiteIndexContent>
        <H>{label}</H>
        <Section>
          {pages?.length ? (
            <SiteIndexList>
              {pages.map((page, index) => {
                return <SiteIndexTeaser key={index} page={page} />;
              })}
            </SiteIndexList>
          ) : (
            <p>{t(["siteIndex.emptyResult", "No pages"])}</p>
          )}
        </Section>
      </SiteIndexContent>
    </SiteIndexWrapper>
  );
}
