import { H, Section } from "@jfrk/react-heading-levels";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";
import uniq from "lodash/uniq";
import React from "react";

import { getMonthArchivePageTitleFromPageContext } from "../contentType";

import ArchivePost from "./ArchivePost";
import SEO from "./SEO";

export default function StaticMonthArchive() {
  const pageContext = usePageContext();
  const { posts, month } = pageContext;

  let days = new Set();

  const postsByDay = {};

  posts.forEach((post) => {
    post.archiveDates.forEach((date) => {
      let day = formatDate(new Date(date), "yyyy/MM/dd");
      if (!day.startsWith(month)) {
        return;
      }
      days.add(day);
      postsByDay[day] = postsByDay[day] || [];
      postsByDay[day].push(post);
    });
  });

  const sortedDays = [...days];
  sortedDays.sort();
  const title = getMonthArchivePageTitleFromPageContext(pageContext);

  return (
    <>
      <SEO title={title} />
      <div className="c-article o-margin-top-large">
        <div className="o-grid">
          <div className="o-grid-row">
            <div className="o-grid-block o-grid-block--inherit">
              <H className="c-article__title">{title}</H>
              <Section>
                <ul className="c-list c-list__search-result">
                  {sortedDays.flatMap((day) => {
                    let date = parseDate(day, "yyyy/MM/dd", new Date());
                    return uniq(postsByDay[day]).map((post, index) => {
                      return (
                        <ArchivePost
                          key={`${day}-${index}`}
                          post={post}
                          date={date}
                        />
                      );
                    });
                  })}
                </ul>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
