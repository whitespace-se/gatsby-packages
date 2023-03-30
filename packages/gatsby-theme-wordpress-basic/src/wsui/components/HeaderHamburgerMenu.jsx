/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, SlidePanel } from "@wsui/base";
import { Fragment, Suspense, lazy, useState, useEffect } from "react";

const HeaderHamburgerMenuPanel = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("./HeaderHamburgerMenuPanel.jsx");
});

function LoadHandler({ onMount, onUnmount }) {
  useEffect(() => {
    console.log("loading…");
    onMount();
    return () => {
      console.log("done loading");
      onUnmount();
    };
  }, []);
  return "Laddar";
}

export default function HeaderHamburgerMenu({ id, ...restProps }) {
  return (
    <SlidePanel title="Menu" id={id} {...restProps}>
      <Suspense fallback={<div>Loading…</div>}>
        <HeaderHamburgerMenuPanel />
      </Suspense>
    </SlidePanel>
  );
}
