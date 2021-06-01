import styled from "@emotion/styled";
import qs from "query-string";
import React, { Suspense } from "react";
import useSSR from "use-ssr";

import { WPPreviewLoadingScreen, LazyWPPreview } from "../components";

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
  background: var(--color-info);
  color: var(--color-light);
  min-width: 25vw;
  text-align: center;
`;

export default function PreviewPage({ location }) {
  const { isBrowser } = useSSR();
  if (!isBrowser) {
    return <div>Preview only works with Javascript enabled</div>;
  }
  const { id, wpnonce, user } = qs.parse(location.search);

  return (
    <Suspense
      fallback={
        <WPPreviewLoadingScreen label={"Aktiverar förhandsgranskning"} />
      }
    >
      <PreviewIndicator>
        <PreviewIndicatorInner>Förhandsgranskning</PreviewIndicatorInner>
      </PreviewIndicator>
      <LazyWPPreview id={id} wpnonce={wpnonce} user={user} />
    </Suspense>
  );
}
