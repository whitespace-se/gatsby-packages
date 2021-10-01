import produce from "immer";
import PropTypes from "prop-types";
import React, { createContext, useContext, useCallback } from "react";
import createPersistedState from "use-persisted-state";

export const STORE_NAME = process.env.GATSBY_STORE_NAME || "gatsby/store";

const useStoreState = (...args) => {
  return createPersistedState(STORE_NAME)(...args);
};

export const storeContext = createContext([null, () => {}]);

StoreProvider.propTypes = {
  initialState: PropTypes.object,
  localStorageKey: PropTypes.string,
};

export function StoreProvider({ initialState, localStorageKey, ...props }) {
  const Provider = storeContext.Provider;
  const [state, setState] = useStoreState(localStorageKey, initialState);
  return (
    <Provider
      {...props}
      value={[
        state == null ? initialState : state,
        useCallback((updater) => {
          setState((state) =>
            produce(state == null ? initialState : state, updater),
          );
        }, []),
      ]}
    />
  );
}

export function useStore() {
  return useContext(storeContext);
}
