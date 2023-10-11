/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useThemeProps } from "@wsui/base";
import { Helmet } from "react-helmet";

import { useOpenGraphContent, useSiteMetadata } from "../../hooks";

export default function Seo(props) {
  props = useThemeProps({ props, name: "Seo" });
  let { description, isFrontPage = false, meta = [], title = "" } = props;
  const { title: siteTitle, author } = useSiteMetadata();

  const { metaTitle, metaDescription, metaImage, metaUrl } =
    useOpenGraphContent(useSiteMetadata(), {
      description,
      lang,
      meta,
      title,
    });
  const { i18n } = useTranslation();

  return (
    <Helmet
      htmlAttributes={{
        lang: i18n.language,
      }}
      title={title}
      titleTemplate={isFrontPage ? siteTitle : `%s – ${siteTitle}`}
      defaultTitle={siteTitle}
      // link={[
      //   {
      //     rel: `icon`,
      //     type: `image/svg+xml`,
      //     href: `/favicon.svg`,
      //   },
      //   {
      //     rel: `alternate icon`,
      //     href: `/favicon.ico`,
      //   },
      //   {
      //     rel: `mask-icon`,
      //     href: `/safari-pinned-tab.svg`,
      //     color: `#004071`,
      //   },
      // ]}
      meta={[
        {
          name: `referrer`,
          content: `no-referrer`,
        },
        {
          name: `apple-mobile-web-app-capable`,
          content: `yes`,
        },
        {
          name: `apple-mobile-web-app-status-bar-style`,
          content: `white`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: metaUrl,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          metaImage
            ? [
                {
                  property: "og:image",
                  content: metaImage.src,
                },
                {
                  property: "og:image:width",
                  content: metaImage.width,
                },
                {
                  property: "og:image:height",
                  content: metaImage.height,
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image",
                },
              ]
            : [],
        )
        .concat(meta)}
    />
  );
}
