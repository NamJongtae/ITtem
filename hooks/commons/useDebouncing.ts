import { useRef, useCallback } from "react";

export default function useDebouncing() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = useCallback((callback: () => void, delay: number) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(callback, delay);
  }, []);

  return debounce;
}
