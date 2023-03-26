import PropTypes from "prop-types";
import React, { useContext } from "react";
import Helmet from "react-helmet";

import pluginOptionsContext from "../contexts/pluginOptionsContext";
import useOpenGraphContent from "../hooks/useOpenGraphContent";
import useSiteMetadata from "../hooks/useSiteMetadata";

SEO.propTypes = {
  description: PropTypes.string,
  isFrontPage: PropTypes.bool,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

function SEO({
  description,
  isFrontPage = false,
  lang,
  meta = [],
  title = "",
}) {
  const { title: siteTitle, author } = useSiteMetadata();

  const { metaTitle, metaDescription, metaImage, metaUrl } =
    useOpenGraphContent(useSiteMetadata(), {
      description,
      lang,
      meta,
      title,
    });

  const { enableSEO } = useContext(pluginOptionsContext);

  if (!enableSEO) {
    return null;
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={isFrontPage ? siteTitle : `%s - ${siteTitle}`}
      defaultTitle={siteTitle}
      link={[
        {
          rel: `icon`,
          type: `image/svg+xml`,
          href: `/favicon.svg`,
        },
        {
          rel: `alternate icon`,
          href: `/favicon.ico`,
        },
        {
          rel: `mask-icon`,
          href: `/safari-pinned-tab.svg`,
          color: `#004071`,
        },
      ]}
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

export default SEO;
