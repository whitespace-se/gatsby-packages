import { useContext, createContext } from "react";

export const pageContext = createContext([{}, () => {}]);

export function usePageContext() {
  return useContext(pageContext);
}

export const PageContextProvider = pageContext.Provider;
