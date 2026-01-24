import { useCallback, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

type UseListVirtualizerOptions<T, TEl extends HTMLElement = HTMLDivElement> = {
  items: T[];
  estimateSize: number | ((index: number) => number);
  scrollMargin?: number;
  overscan?: number;
  gap?: number;
  scrollRef?: React.RefObject<TEl | null>;
};

export default function useListVirtualizer<
  T,
  TEl extends HTMLElement = HTMLDivElement
>({
  items,
  estimateSize,
  scrollMargin = 0,
  overscan = 3,
  gap = 0,
  scrollRef
}: UseListVirtualizerOptions<T, TEl>) {
  const innerRef = useRef<TEl | null>(null);
  const parentRef = scrollRef ?? innerRef;

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
    parentRef, // ✅ 항상 이걸 쓰면 됨 (내부 or 외부)
    scrollMargin,
    virtualizer,
    virtualItems,
    totalSize,
    getRowStyle
  };
}
