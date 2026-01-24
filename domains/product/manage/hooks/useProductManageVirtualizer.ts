import { useMemo, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useScrollMargin } from "@/domains/product/shared/hooks/useScrollMargin";

type IParams = {
  itemCount: number;
  overscan?: number;
};

export function useProductManageVirtualizer({
  itemCount,
  overscan = 3
}: IParams) {

  const listRef = useRef<HTMLUListElement | null>(null);
  const { scrollMargin } = useScrollMargin(listRef);

  const virtualizer = useWindowVirtualizer({
    count: itemCount,
    estimateSize: () => 216,
    overscan,
    scrollMargin
  });

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
    scrollMargin,
    virtualizer,
    virtualItems,
    totalSize,
    getRowStyle
  };
}
