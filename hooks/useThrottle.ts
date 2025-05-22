import { useCallback, useRef } from "react";

export function useThrottle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  const isThrottled = useRef(false);

  return useCallback(
    (...args: Args) => {
      if (!isThrottled.current) {
        callback(...args);
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
}
