import React, { useRef } from "react";

export default function useDebouncing() {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncing = <T extends Function>(
    callback: T,
    throttleTime: number
  ) => {
    return (...args: any) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        callback.apply(null, args);
      }, throttleTime);
    };
  };

  return debouncing;
}
