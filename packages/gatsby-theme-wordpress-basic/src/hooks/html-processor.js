import { useContext } from "react";

import htmlProcessorContext from "../contexts/htmlProcessorContext";

export function useHTMLProcessor() {
  return useContext(htmlProcessorContext).htmlProcessor;
}
