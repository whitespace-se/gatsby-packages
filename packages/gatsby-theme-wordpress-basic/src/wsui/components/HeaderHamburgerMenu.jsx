/** @jsx jsx */
import { jsx } from "@emotion/react";
import { IsomorphicSuspense, SlidePanel } from "@wsui/base";
import { lazy } from "react";

const HeaderHamburgerMenuPanel = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("./HeaderHamburgerMenuPanel.jsx");
});

export default function HeaderHamburgerMenu({ id, ...restProps }) {
  return (
    <SlidePanel title="Menu" id={id} {...restProps}>
      <IsomorphicSuspense fallback={<div>Loading…</div>}>
        <HeaderHamburgerMenuPanel />
      </IsomorphicSuspense>
    </SlidePanel>
  );
}
