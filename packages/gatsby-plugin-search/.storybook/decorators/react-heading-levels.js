import React from "react";
import { HeadingLevelProvider } from "@jfrk/react-heading-levels";

export function withReactHeadingLevels(storyFn) {
  return <HeadingLevelProvider>{storyFn()}</HeadingLevelProvider>;
}
