import { useContext } from "react";

import mustacheContext from "../contexts/mustacheContext";

export default function useMustacheData() {
  return useContext(mustacheContext);
}
