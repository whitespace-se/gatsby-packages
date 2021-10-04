import { unblock } from "@jeanfredrik/yett";
import { useHasMounted } from "@whitespace/gatsby-hooks/src";
import differenceInMonths from "date-fns/differenceInMonths";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { useStore } from "../hooks/store";

import CookieConsent from "./CookieConsent";
import "./CookieConsent.module.css";

CookieConsentContainer.propTypes = {
  active: PropTypes.bool,
  position: PropTypes.string,
  cookieConsentSettings: PropTypes.objectOf(PropTypes.string),
};

export default function CookieConsentContainer({
  active,
  position,
  cookieConsentSettings,
  ...restProps
}) {
  let [store, setStore] = useStore();

  const hasMounted = useHasMounted();

  useEffect(() => {
    if (store.answer === "accept") {
      unblock();
    }
  }, [store.answer]);

  if (!hasMounted) return null;

  if (
    !active ||
    (store &&
      store.answer &&
      store.answeredAt &&
      differenceInMonths(new Date(), new Date(store.answeredAt)) < 12)
  ) {
    return null;
  }

  return (
    <CookieConsent
      {...cookieConsentSettings}
      position={position}
      onAccept={() => {
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
