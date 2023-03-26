import { css } from "@emotion/react";
import {
  createContext,
  useContext,
  useState,
  memo,
  forwardRef,
  useEffect,
} from "react";

export const locationContext = createContext([
  new URL(location.origin),
  () => {},
]);

export function LocationProvider({ children, ...restProps }) {
  const [pathname, setPathname] = useState("/");
  return (
    <locationContext.Provider
      value={[new URL(pathname, location.origin), setPathname]}
    >
      {children}
    </locationContext.Provider>
  );
}

export function LocationStatus({ ...restProps }) {
  const [location, setPathname] = useContext(locationContext);
  const [value, setValue] = useState(location.pathname);
  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);
  return (
    <form
      {...restProps}
      onSubmit={(event) => {
        event.preventDefault();
        setPathname(value);
      }}
      css={css`
        padding: 0.5rem;
        font-size: 0.75rem;
        background-color: #eee;
      `}
    >
      <label htmlFor="sb-location-status-input">Current location:</label>{" "}
      <input
        id="sb-location-status-input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
}

export const InternalLinkElement = forwardRef(
  ({ href, onClick, children, ...restProps }, ref) => {
    const [location, setPathname] = useContext(locationContext);
    return (
      <a
        href={href}
        aria-current={location.pathname === href ? "page" : null}
        {...restProps}
        onClick={(event) => {
          event.preventDefault();
          setPathname(href);
          if (onClick) {
            onClick(event);
          }
        }}
        ref={ref}
      >
        {children}
      </a>
    );
  },
);

export function useLocation() {
  return useContext(locationContext);
}
