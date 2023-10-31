/** @jsx jsx */
import { jsx, useTheme, css } from "@emotion/react";
import { H, Time, Typography, useThemeProps } from "@wsui/base";
import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { usePageContext } from "../../hooks/page-context";
import usePageContent from "../../hooks/usePageContent";

import TextContent from "./TextContent.jsx";

export default function PageHeading(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "PageHeading" });
  let {
    hideTitle = false,
    marginAfter,
    showDates = null,
    datesTextColor = "gray.600",
    dateFormat = {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
    ...restProps
  } = props;
  const { t } = useTranslation();
  const { title, dateGmt, modifiedGmt, contentType } = usePageContext();
  const { heading } = usePageContent();

  const publishedDate = dateGmt && parseISO(dateGmt);
  const modifiedDate = modifiedGmt && parseISO(modifiedGmt);
  const showModifiedDate = !!(
    modifiedDate &&
    publishedDate &&
    !isSameDay(modifiedDate, publishedDate)
  );

  showDates ??= contentType?.name === "post";

  return (
    <Fragment>
      <TextContent
        css={() =>
          hideTitle && !heading ? theme.styleUtils.visuallyHidden : null
        }
        marginAfter={marginAfter}
        {...restProps}
      >
        {heading || <H>{title}</H>}
      </TextContent>
      {!!(showDates && publishedDate) && (
        <div
          css={css`
            color: ${theme.getColor(datesTextColor)};
            margin-block-end: ${marginAfter && theme.getLength(7.5)};
          `}
        >
          {publishedDate && (
            <Typography variant="h4" as="span">
              <Time
                capitalize={true}
                date={publishedDate}
                format={dateFormat}
              />
              {showModifiedDate && (
                <span
                  css={css`
                    padding-inline: 0.5em;
                  `}
                >
                  |
                </span>
              )}
            </Typography>
          )}
          {showModifiedDate && (
            <Typography variant="description" as="span">
              {`${t(["lastUpdated", "Last updated"])}: `}
              <Time capitalize={true} date={modifiedDate} format={dateFormat} />
            </Typography>
          )}
        </div>
      )}
    </Fragment>
  );
}
