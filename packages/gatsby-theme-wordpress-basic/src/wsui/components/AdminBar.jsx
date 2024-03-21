/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Fragment, useContext } from "react";

import adminContext from "../../contexts/adminContext";
import { usePageContext } from "../../hooks";
import { useTranslation } from "react-i18next";
import { Icon } from "@wsui/base";

const Item = styled("span")`
  display: inline-flex;
  gap: 0.375em;
  padding: 0.5rem;
  color: inherit;
  &:is(a) {
    text-decoration: none;
    &:hover {
      background-color: #fff1;
      text-decoration: underline;
    }
  }
`;

export default function AdminBar({ ...restProps }) {
  const { user, editPostUrl, getEditPostUrl, dashboardUrl } =
    useContext(adminContext);
  const page = usePageContext();
  const { t } = useTranslation();
  if (!user) return <div />;
  return (
    <div
      css={css`
        background: #000d;
        color: #fffd;
        display: flex;
        gap: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        align-items: center;
        backdrop-filter: blur(5px);
      `}
      {...restProps}
    >
      {!!dashboardUrl && (
        <Item as="a" href={dashboardUrl} target="_blank">
          <Icon name="wordpress" size="1.375em" /> {t("adminBar.dashboard")}
        </Item>
      )}
      {!!page && !!page.databaseId && !!editPostUrl && (
        <Item as="a" href={getEditPostUrl(page.databaseId)} target="_blank">
          <Icon name="edit" size="1.375em" />{" "}
          {t("adminBar.editPost", {
            contentType: t(
              [
                `contentTypes.${page.contentType?.name || "page"}.name`,
                page.contentType.labels?.singularName ??
                  page.contentType?.name ??
                  "page",
              ],
              { count: 1 },
            ),
          })}
        </Item>
      )}
      <Item
        css={css`
          margin-left: auto;
        `}
      >
        {user?.nicename} <Icon name="person" size="1.375em" />
      </Item>
    </div>
  );
}
