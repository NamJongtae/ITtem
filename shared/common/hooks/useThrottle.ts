import { useCallback, useEffect, useRef } from "react";

export function useThrottle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
) {
  const isThrottled = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback(
    (...args: Args) => {
      if (isThrottled.current) return;

      callback(...args);
      isThrottled.current = true;

      timerRef.current = window.setTimeout(() => {
        isThrottled.current = false;
      }, delay);
    },
    [callback, delay]
  );
}
