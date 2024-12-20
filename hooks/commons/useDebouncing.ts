import { useRef } from "react";

export default function useDebouncing() {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncing = <T extends (...args: any[]) => void>(
    callback: T,
    throttleTime: number
  ) => {
    return (...args: Parameters<T>): void => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        callback(...args);
      }, throttleTime);
    };
  };

  return debouncing;
}
