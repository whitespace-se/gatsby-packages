import React from "react";
import { IDContextProvider } from "@jfrk/react-id";

export function withReactIDContext(storyFn) {
  return <IDContextProvider>{storyFn()}</IDContextProvider>;
}
