import { useCallback, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

type UseListVirtualizerOptions<T> = {
  items: T[];
  estimateSize: number | ((index: number) => number);
  scrollMargin?: number;
  overscan?: number;
  gap?: number;
};

export default function useListVirtualizer<T>({
  items,
  estimateSize,
  scrollMargin = 0,
  overscan = 3,
  gap = 0
}: UseListVirtualizerOptions<T>) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize:
      typeof estimateSize === "number" ? () => estimateSize : estimateSize,
    overscan,
    gap,
    scrollMargin
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  const getRowStyle = useCallback(
    (start: number): React.CSSProperties => ({
      transform: `translateY(${start - scrollMargin}px)`
    }),
    [scrollMargin]
  );

  return {
    parentRef,
    scrollMargin,
    virtualizer,
    virtualItems,
    totalSize,
    getRowStyle
  };
}
