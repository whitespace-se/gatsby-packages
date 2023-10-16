import {
  TeaserCard,
  CardContent,
  CardTitle,
  useThemeProps,
  Excerpt,
  Typography,
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
    ...restProps
  } = props;

  const { t } = useTranslation();

  const { title, url, text, contentTypeName, image } = hit;

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
        <CardTitle />
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
