import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import mime from "mime/lite";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import SearchTeaser from "../SearchTeaser";
import SearchTeaserContent from "../SearchTeaserContent";
import SearchTeaserExcerpt from "../SearchTeaserExcerpt";
import SearchTeaserMedia from "../SearchTeaserMedia";
import SearchTeaserMeta from "../SearchTeaserMeta";
import SearchTeaserTitle from "../SearchTeaserTitle";

FileSearchHit.propTypes = {
  dateFormat: PropTypes.objectOf(PropTypes.string),
  hit: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    text: PropTypes.node,
    image: PropTypes.object,
    label: PropTypes.node,
    // taxonomies: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default function FileSearchHit({
  dateFormat = {
    dateStyle: "short",
  },
  hit,
  ...restProps
}) {
  const { t, i18n } = useTranslation();
  console.log(hit);
  const {
    date,
    text,
    image,
    label,
    file,
    // taxonomies,
  } = hit;

  return (
    <SearchTeaser as="li" {...restProps}>
      <SearchTeaserContent>
        <SearchTeaserTitle link={{ url: file.url, target: "_blank" }}>
          {label}
        </SearchTeaserTitle>
        {text && <SearchTeaserExcerpt>{text}</SearchTeaserExcerpt>}
        <SearchTeaserMeta>
          <span>
            {!!file.attachment?.content_type &&
              t("fileType", {
                extension: mime
                  .getExtension(file.attachment.content_type)
                  .toLocaleUpperCase(i18n.language),
              })}
          </span>
          {date && <Time date={date} format={dateFormat} />}
        </SearchTeaserMeta>
      </SearchTeaserContent>
      {image && (
        <SearchTeaserMedia
          image={{
            ...image,
            aspectRatio: 155 / 80,
          }}
        />
      )}
    </SearchTeaser>
  );
}
