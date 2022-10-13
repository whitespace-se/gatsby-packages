import { H, Section } from "@jfrk/react-heading-levels";
import { Link } from "@whitespace/components";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import parseDate from "date-fns/parse";
import sortBy from "lodash/sortBy";
import React from "react";

import { getYearArchivePageTitleFromPageContext } from "../contentType";

import SEO from "./SEO";

export default function StaticYearArchive() {
  const pageContext = usePageContext();
  const { months } = pageContext;

  let sortedMonths = sortBy(months, "month");

  const title = getYearArchivePageTitleFromPageContext(pageContext);
  return (
    <>
      <SEO title={title} />
      <div className="c-article o-margin-top-large">
        <div className="o-grid">
          <div className="o-grid-row">
            <div className="o-grid-block o-grid-block--inherit">
              <H className="c-article__title">{title}</H>
              <Section>
                {months.length ? (
                  <ul className="c-list">
                    {sortedMonths.map(({ month, url, postCount }) => {
                      let date = parseDate(month, "yyyy/MM", new Date());
                      return (
                        <li key={month} className="c-archive__result">
                          <Link to={url}>
                            <Time
                              date={date}
                              format={{ month: "long" }}
                              capitalize={true}
                            />
                          </Link>
                          <span className="u-visually-hidden">
                            Antal poster:{" "}
                          </span>
                          {` (${postCount})`}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </Section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
