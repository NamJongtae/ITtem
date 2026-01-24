import { useEffect, useMemo, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import useProductManageMedia from "./useProductManageMedia";
import { useScrollMargin } from "@/domains/product/shared/hooks/useScrollMargin";

type IParams = {
  itemCount: number;
  overscan?: number;
};

export function useProductManageVirtualizer({
  itemCount,
  overscan = 3
}: IParams) {
  const isSmUp = useProductManageMedia();
  const rowHeight = isSmUp ? 217 : 169;

  const listRef = useRef<HTMLUListElement | null>(null);
  const { scrollMargin } = useScrollMargin(listRef);

  const virtualizer = useWindowVirtualizer({
    count: itemCount,
    estimateSize: () => rowHeight,
    overscan,
    scrollMargin
  });

  useEffect(() => {
    virtualizer.measure();
  }, [rowHeight, virtualizer]);

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  const getRowStyle = useMemo(
    () => (start: number) => ({
      transform: `translateY(${start - scrollMargin}px)`
    }),
    [scrollMargin]
  );

  return {
    listRef,
    isSmUp,
    rowHeight,
    scrollMargin,
    virtualizer,
    virtualItems,
    totalSize,
    getRowStyle
  };
}
