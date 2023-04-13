import SearchTeaser from "@whitespace/gatsby-plugin-search/src/components/SearchTeaser";
import SearchTeaserContent from "@whitespace/gatsby-plugin-search/src/components/SearchTeaserContent";
import SearchTeaserExcerpt from "@whitespace/gatsby-plugin-search/src/components/SearchTeaserExcerpt";
import SearchTeaserMedia from "@whitespace/gatsby-plugin-search/src/components/SearchTeaserMedia";
import SearchTeaserMeta from "@whitespace/gatsby-plugin-search/src/components/SearchTeaserMeta";
import SearchTeaserTitle from "@whitespace/gatsby-plugin-search/src/components/SearchTeaserTitle";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import mime from "mime/lite";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

DefaultSearchHit.propTypes = {
  dateFormat: PropTypes.objectOf(PropTypes.string),
  hit: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    text: PropTypes.node,
    image: PropTypes.object,
    label: PropTypes.node,
    // taxonomies: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default function DefaultSearchHit({
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
