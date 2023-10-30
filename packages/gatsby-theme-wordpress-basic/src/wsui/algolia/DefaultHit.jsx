import {
  TeaserCard,
  CardContent,
  CardTitle,
  useThemeProps,
  Excerpt,
  Typography,
  CardMeta,
  Time,
} from "@wsui/base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function DefaultHit(props) {
  props = useThemeProps({ props, name: "AlgoliaDefaultHit" });
  props = useThemeProps({ props, name: "AlgoliaHit" });
  let {
    hit,
    horizontalContentMaxWidth = "100%",
    hideImage,
    // eslint-disable-next-line no-unused-vars
    hitsOwnerState,
    titleProps = {},
    dateFormat = {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    metaProps = {},
    showPublishDate = false,
    ...restProps
  } = props;

  const { t } = useTranslation();

  const { title, url, text, contentTypeName, publishDate, image } = hit;

  let contentTypeLabel = hitsOwnerState?.contentType
    ? null
    : t(`contentTypes.${contentTypeName}.name`, {
        count: 1,
      });

  return (
    <TeaserCard
      link={{ url }}
      title={title}
      image={hideImage ? undefined : image || {}}
      mirrored
      mediaColspan={3}
      as="li"
      horizontalContentMaxWidth={horizontalContentMaxWidth}
      {...restProps}
    >
      <CardContent>
        <CardTitle {...titleProps} />
        {!!(showPublishDate && publishDate) && (
          <CardMeta {...metaProps}>
            <Time date={publishDate} format={dateFormat} />
          </CardMeta>
        )}
        <Excerpt variant="description" lines={2}>
          {text}
        </Excerpt>
        {!!contentTypeLabel && (
          <Typography variant="meta">{contentTypeLabel}</Typography>
        )}
      </CardContent>
    </TeaserCard>
  );
}
