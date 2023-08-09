/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  PageSection,
  Heading,
  Stack,
} from "@wsui/base";
import chroma from "chroma-js";
import { omit } from "lodash/fp";
import { Fragment } from "react";

function getLightness(color) {
  color = chroma(color.toString());
  return Math.round(1000 - color.get("oklch.l") * 1000);
}

const SwatchList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Swatch = styled.div`
  width: 5rem;
  height: 3rem;
  text-align: center;
  display: flex;
  place-content: center;
  place-items: center;
  border-radius: 0.25rem;
  border: 1px solid #0002;
  background-color: ${(props) => props.theme.getColor(props.color)};
  color: ${(props) => props.theme.getColor([props.color, "text"])};
`;
export default function ColorsInfoPage(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "DefaultTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let { defaultColspan = 12 } = omit(["spacing"], props);
  return (
    <article>
      <Fragment>
        <PageSection background="transparent">
          <PageGrid>
            <PageGridItem colspan={defaultColspan}>
              <Heading>Colors</Heading>
              <Section>
                <Stack
                  spacing={[5, 10]}
                  css={css`
                    margin-top: ${theme.getLength([5, 10])};
                  `}
                >
                  {Object.keys(theme.colors).map((color) => (
                    <Stack key={color} spacing={[3, 6]}>
                      <Heading scope="row">{color}</Heading>
                      <SwatchList>
                        {["main", "hover", "active", "active.hover"].map(
                          (shade) => (
                            <Stack key={shade}>
                              <Swatch color={[color, shade]} />
                              <div>
                                {shade}{" "}
                                {`(≈${
                                  Math.round(
                                    getLightness(
                                      theme.getColor([color, shade]),
                                    ) / 5,
                                  ) * 5
                                })`}
                                <br />
                                <code>{theme.getColor([color, shade])}</code>
                              </div>
                            </Stack>
                          ),
                        )}
                      </SwatchList>
                      <SwatchList>
                        {[
                          20, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800,
                        ].map((shade) => (
                          <Stack key={shade}>
                            <Swatch color={[color, shade]} />
                            <div>
                              {shade}
                              {/* <br />
                                    {getLightness(theme.getColor([color, shade]))} */}
                              <br />
                              <code>{theme.getColor([color, shade])}</code>
                            </div>
                          </Stack>
                        ))}
                      </SwatchList>
                    </Stack>
                  ))}
                </Stack>
              </Section>
            </PageGridItem>
          </PageGrid>
        </PageSection>
      </Fragment>
    </article>
  );
}
