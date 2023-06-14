import styled from "@emotion/styled";
import qs from "query-string";
import React, { Suspense } from "react";
import useSSR from "use-ssr";

import LazyWpPreview from "./LazyWpPreview.jsx";
import WpPreviewLoadingScreen from "./WpPreviewLoadingScreen.jsx";

const PreviewIndicator = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: grid;
  justify-content: center;
`;

const PreviewIndicatorInner = styled.span`
  padding: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  background: #000b;
  backdrop-filter: blur(8px);
  color: #fff;
  min-width: 25vw;
  text-align: center;
`;

export default function WpPreviewPage({ location }) {
  const { isBrowser } = useSSR();
  if (!isBrowser) {
    return <div>Preview only works with Javascript enabled</div>;
  }
  const { id, wpnonce, user } = qs.parse(location.search);

  return (
    <Suspense
      fallback={
        <WpPreviewLoadingScreen label={"Aktiverar förhandsgranskning"} />
      }
    >
      <PreviewIndicator>
        <PreviewIndicatorInner>Förhandsgranskning</PreviewIndicatorInner>
      </PreviewIndicator>
      <LazyWpPreview id={id} wpnonce={wpnonce} user={user} />
    </Suspense>
  );
}
