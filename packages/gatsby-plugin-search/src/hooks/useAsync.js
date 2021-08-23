import { useState, useMemo } from "react";

export default function useAsync(maker, deps) {
  const [isResolved, setIsResolved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [result, setResult] = useState();

  const promise = useMemo(() => {
    setIsResolved(false);
    setIsRejected(false);
    setResult();

    return maker();
  }, deps);

  promise.then((result) => {
    setIsResolved(true);
    setResult(result);
  });

  const isPending = !isResolved && !isRejected;

  return {
    isResolved,
    isPending,
    isRejected,
    result,
  };
}
