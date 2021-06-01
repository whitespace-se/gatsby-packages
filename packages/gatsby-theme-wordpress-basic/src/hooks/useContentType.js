import useContentTypes from "./useContentTypes";

export default function useContentType(name) {
  return useContentTypes().find((contentType) => contentType.name === name);
}
