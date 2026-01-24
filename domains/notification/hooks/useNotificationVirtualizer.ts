import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useRef } from "react";
import { NotificationMessageData } from "../types/notificationTypes";

export default function useNotificationVirtualizer({
  items
}: {
  items: NotificationMessageData[];
}) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const scrollMargin = 45;

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 92.5,
    overscan: 3,
    scrollMargin
  });

  const getRowStyle = useCallback(
    (start: number) => ({
      transform: `translateY(${start - scrollMargin}px)`
    }),
    []
  );
  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return {
    parentRef,
    scrollMargin,
    virtualizer,
    virtualItems,
    totalSize,
    getRowStyle
  };
}
