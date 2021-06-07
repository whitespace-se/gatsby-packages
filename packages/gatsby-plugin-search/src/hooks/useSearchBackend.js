import { useContext } from "react";

import searchBackendContext from "../backend/context";

export default function useSearchBackend() {
  return useContext(searchBackendContext);
}
