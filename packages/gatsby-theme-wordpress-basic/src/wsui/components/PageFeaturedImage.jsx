/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import Image from "../../components/Image";
import { usePageContext } from "../../hooks";

const PageFeaturedImageRoot = styled.div`
  margin-bottom: 3rem;
  position: relative;
  z-index: -1;
  @media (max-width: 40rem) {
    margin-bottom: -2.375rem;
    &:after {
      content: "";
      display: block;
      margin: 0 var(--spacing-sm);
      background-color: white;
      margin-top: -4.375rem;
      height: 4.375rem;
      position: relative;
    }
  }
`;

export default function PageFeaturedImage({ ...restProps }) {
  const pageContext = usePageContext();

  if (!pageContext?.displaySettings?.postSingleShowFeaturedImage) {
    return null;
  }

  let featuredImage = pageContext?.featuredImage?.node;

  if (!featuredImage) {
    return null;
  }
  const { height, width } = featuredImage;

  return (
    <PageFeaturedImageRoot>
      <Image
        {...featuredImage}
        caption={null}
        credit={null}
        width={width}
        height={height}
        maxWidth={636}
        aspectRatio={width / height}
        borderRadius={10}
        {...restProps}
      />
    </PageFeaturedImageRoot>
  );
}
