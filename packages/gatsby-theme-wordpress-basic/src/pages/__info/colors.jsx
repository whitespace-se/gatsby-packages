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
  Icon,
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
  width: ${(props) => (props.wide ? "8rem" : "5rem")};
  height: 3rem;
  text-align: center;
  display: flex;
  place-content: center;
  place-items: center;
  border-radius: 0.25rem;
  border: 1px solid #0002;
  background-color: ${(props) => props.theme.getColor(props.color)};
  color: ${(props) =>
    props.theme.getColor(props.textColor || [props.color, "text"])};
`;
export default function ColorsInfoPage(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "DefaultTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let { defaultColspan = 12 } = omit(["spacing"], props);

  if (!theme.getColor) {
    return null;
  }

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
                      <Heading>{color}</Heading>
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
                <Heading
                  css={css`
                    margin-top: ${theme.getLength([10, 20])};
                  `}
                >
                  Contrasts
                </Heading>
                <Section>
                  <Stack
                    spacing={[5, 10]}
                    css={css`
                      margin-top: ${theme.getLength([5, 10])};
                    `}
                  >
                    {Object.keys(theme.colors).map((bgColor) => (
                      <Stack key={bgColor} spacing={[3, 6]} alignItems="start">
                        <Heading>{bgColor}</Heading>
                        <table
                          css={css`
                            border-spacing: 1rem;
                          `}
                        >
                          <tr>
                            <th>Text color</th>
                            <th>Contrast</th>
                            <th>Small text</th>
                            <th>Large text</th>
                          </tr>
                          {Object.keys(theme.colors).map((fgColor) => {
                            let contrast = chroma.contrast(
                              theme.getColor(bgColor),
                              theme.getColor(fgColor),
                            );
                            return (
                              <tr key={fgColor}>
                                <td>
                                  <Swatch
                                    color={[bgColor]}
                                    textColor={fgColor}
                                    wide
                                  >
                                    {fgColor}
                                  </Swatch>
                                </td>
                                <td>
                                  {contrast.toLocaleString("sv", {
                                    maximumFractionDigits: 2,
                                  })}
                                  :1
                                </td>
                                <td>
                                  {contrast >= 4.5 ? (
                                    <span
                                      css={css`
                                        color: green;
                                      `}
                                    >
                                      <Icon name="checkbox" /> Pass
                                    </span>
                                  ) : (
                                    <span
                                      css={css`
                                        color: red;
                                      `}
                                    >
                                      <Icon name="close" /> Fail
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {contrast >= 3 ? (
                                    <span
                                      css={css`
                                        color: green;
                                      `}
                                    >
                                      <Icon name="checkbox" /> Pass
                                    </span>
                                  ) : (
                                    <span
                                      css={css`
                                        color: red;
                                      `}
                                    >
                                      <Icon name="close" /> Fail
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </Stack>
                    ))}
                  </Stack>
                </Section>
              </Section>
            </PageGridItem>
          </PageGrid>
        </PageSection>
      </Fragment>
    </article>
  );
}
