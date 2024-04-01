/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import React, { Suspense, useState } from "react";
import { useHasMounted } from "@whitespace/gatsby-hooks";
import WpPreviewLoadingScreen from "./WpPreviewLoadingScreen.jsx";
import {
  Box,
  Button,
  PageGrid,
  PageGridItem,
  PageSection,
  Typography,
} from "@wsui/base";
import { useTranslation } from "react-i18next";

const WpRestrictedPageHandler = React.lazy(() =>
  import("./WpRestrictedPageHandler.jsx"),
);

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 1;
`;

// const PreviewIndicator = styled.span`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: 1;
//   display: grid;
//   justify-content: center;
// `;

// const PreviewIndicatorInner = styled.span`
//   padding: 1rem;
//   border-radius: 0 0 0.5rem 0.5rem;
//   background: #000b;
//   backdrop-filter: blur(8px);
//   color: #fff;
//   min-width: 25vw;
//   text-align: center;
// `;

export default function WpRestrictedPage({ pageContext: { id } }) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const hasMounted = useHasMounted();
  const { t } = useTranslation();

  if (!hasMounted) {
    return null;
  }

  if (!enteredPassword) {
    return (
      <PageSection background="transparent">
        <PageGrid>
          <PageGridItem>
            <Box>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setEnteredPassword(event.target.querySelector("input").value);
                }}
              >
                <Typography marginAfter>
                  {t([
                    "restrictedPageFormInstruction",
                    "This page is restricted. Please enter the password.",
                  ])}
                </Typography>
                <div
                  css={css`
                    display: grid;
                    grid-template-columns: 1fr max-content;
                    gap: 1rem;
                  `}
                >
                  <Input type="password" autoComplete="off" autoFocus />
                  <Button type="submit" variant="submit">
                    {t(["ok", "OK"])}
                  </Button>
                </div>
              </form>
            </Box>
          </PageGridItem>
        </PageGrid>
      </PageSection>
    );
  }

  return (
    <Suspense fallback={<WpPreviewLoadingScreen label={"Laddar innehåll…"} />}>
      {/* <PreviewIndicator>
        <PreviewIndicatorInner>Förhandsgranskning</PreviewIndicatorInner>
      </PreviewIndicator> */}
      <WpRestrictedPageHandler id={id} password={enteredPassword} />
    </Suspense>
  );
}
