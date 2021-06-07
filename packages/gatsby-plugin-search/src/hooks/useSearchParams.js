import { useContext } from "react";

import context from "../params/context";

export default function useSearchParams() {
  return useContext(context);
}
