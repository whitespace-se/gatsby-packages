import { css } from "@emotion/react";
import { useHasMounted } from "@whitespace/gatsby-hooks";
import { ConfirmDialog, useThemeProps } from "@wsui/base";
import differenceInMonths from "date-fns/differenceInMonths";
import React, { useEffect } from "react";

import { useStore } from "../../hooks/store";

export default function CookieDialog(props) {
  props = useThemeProps({ props, name: "CookieDialog" });
  let { active = true, position, color = "white", ...restProps } = props;
  let [store, setStore] = useStore();

  const hasMounted = useHasMounted();

  useEffect(() => {
    if (store?.answer === "accept") {
      window.yett?.unblock();
    }
  }, [store?.answer]);

  if (!hasMounted) return null;

  if (
    !active ||
    (store?.answer &&
      store?.answeredAt &&
      differenceInMonths(new Date(), new Date(store.answeredAt)) < 12)
  ) {
    return null;
  }

  return (
    <ConfirmDialog
      css={css`
        position: fixed;
        top: ${position.includes("top") ? 0 : null};
        right: ${position.includes("right") ? 0 : null};
        bottom: ${position.includes("bottom") ? 0 : null};
        left: ${position.includes("left") ? 0 : null};
        margin: 1rem;
        z-index: 1;
      `}
      color={color}
      keepPadding
      shadow
      onConfirm={() => {
        setStore((store) => {
          store.answer = "accept";
          store.answeredAt = new Date().toISOString();
        });
      }}
      onDeny={() => {
        setStore((store) => {
          store.answer = "deny";
          store.answeredAt = new Date().toISOString();
        });
      }}
      {...restProps}
    />
  );
}
