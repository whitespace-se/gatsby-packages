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
} from "@wsui/base";
import chroma from "chroma-js";
import { omit } from "lodash/fp";
import { Fragment } from "react";

function getLightness(color) {
  color = chroma(color.toString());
  return Math.round(1000 - color.get("oklch.l") * 1000);
}

const Swatch = styled.div`
  width: 4rem;
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
                <table
                  css={css`
                    margin-block: 2rem;
                  `}
                >
                  <tbody>
                    {Object.keys(theme.colors).map((color) => (
                      <tr key={color}>
                        <th scope="row">{color}</th>
                        {["main", "hover"].map((shade) => (
                          <td key={shade}>
                            <Swatch color={[color, shade]}>
                              <div>
                                {shade}
                                <br />
                                <small>
                                  {`(${getLightness(
                                    theme.getColor([color, shade]),
                                  )})`}
                                </small>
                              </div>
                            </Swatch>
                          </td>
                        ))}
                        {[
                          20, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800,
                        ].map((shade) => (
                          <td key={shade}>
                            <Swatch color={[color, shade]}>
                              <div>
                                {shade}
                                {/* <br />
                                  {getLightness(theme.getColor([color, shade]))} */}
                              </div>
                            </Swatch>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Section>
            </PageGridItem>
          </PageGrid>
        </PageSection>
      </Fragment>
    </article>
  );
}
