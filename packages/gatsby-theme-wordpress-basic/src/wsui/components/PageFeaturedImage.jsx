/** @jsx jsx */
import { jsx } from "@emotion/react";
import {
  PageSection,
  // useComponentWidth,
} from "@wsui/base";

import Image from "../../components/Image";
import { usePageContext } from "../../hooks";

export default function PageFeaturedImage({ ...restProps }) {
  const pageContext = usePageContext();
  // let [componentWidth, ref] = useComponentWidth(320);

  if (!pageContext?.displaySettings?.postSingleShowFeaturedImage) {
    return null;
  }

  let featuredImage = pageContext?.featuredImage?.node;

  if (!featuredImage) {
    return null;
  }
  // const { height, width } = featuredImage;

  return (
    <PageSection
      background={null}
      spacing={0}
      // ref={ref}
    >
      <Image
        {...featuredImage}
        caption={null}
        credit={null}
        // width={componentWidth}
        // height={710}
        aspectRatio={1440 / 710}
        borderRadius={0}
        {...restProps}
      />
    </PageSection>
  );
}
