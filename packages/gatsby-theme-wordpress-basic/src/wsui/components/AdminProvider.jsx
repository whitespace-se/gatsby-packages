/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import adminContext from "../../contexts/adminContext";

export default function AdminProvider({
  children,
  iframeUrl,
  dashboardUrl,
  editPostUrl,
}) {
  const { Provider } = adminContext;
  const [user, setUser] = useState(null);
  const iframeRef = useRef(null);
  let value = {
    user,
    dashboardUrl,
    editPostUrl,
    getEditPostUrl: (id) =>
      (!!editPostUrl &&
        !!id &&
        editPostUrl.replace(/\{\{id\}\}/, encodeURIComponent(id))) ||
      null,
  };

  // const iframeRef = useRef(null);
  const [iframeId] = useState(() =>
    Math.random().toString(36).substring(2, 11),
  );
  const iframeOrigin = iframeUrl && new URL(iframeUrl).origin;
  const iframeLoadHandler = () => {
    iframeRef.current.contentWindow.postMessage(
      {
        type: "getUser",
        iframeId,
      },
      iframeOrigin,
    );
    window.addEventListener("message", (event) => {
      if (event.data?.iframeId === iframeId) {
        setUser(event.data.user);
      }
    });
  };

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframeRef.current = iframe;
    iframe.style =
      "position:absolute;pointer-events:none;width:0;height:0;border:none;clip:rect(0,0,0,0);";
    iframe.tabIndex = -1;
    document.body.appendChild(iframe);
    iframe.addEventListener("load", iframeLoadHandler);
    iframe.src = iframeUrl;
    return () => {
      iframe.removeEventListener("load", iframeLoadHandler);
      document.body.removeChild(iframe);
    };
  }, [iframeUrl]);

  return <Provider value={value}>{children}</Provider>;
}
