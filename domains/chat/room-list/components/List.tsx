"use client";

import useChatRoomListLogic from "../../room/hooks/useChatRoomListLogic";
import Item from "./Item";
import Empty from "@/shared/common/components/Empty";
import SkeletonUI from "./SkeletonUI";
import { useMemo } from "react";
import useListVirtualizer from "@/shared/common/hooks/useListVirtualizer";

export default function List() {
  const { chatRoomData, isLoading } = useChatRoomListLogic();

  const items = useMemo(
    () => Object.entries(chatRoomData ?? {}),
    [chatRoomData]
  );
  const isEmpty = items.length === 0;
  const { parentRef, virtualizer, virtualItems, totalSize, getRowStyle } =
    useListVirtualizer({
      items,
      gap: 20,
      scrollMargin: 52,
      estimateSize: 80,
      overscan: 3
    });

  if (isLoading) {
    return <SkeletonUI />;
  }

  return (
    <div
      ref={parentRef}
      className="overflow-y-auto p-5 max-h-[calc(100vh-301px)] md:max-h-[calc(100vh-237px)]"
    >
      {isEmpty ? (
        <Empty message="채팅방 목록이 존재하지 않아요." />
      ) : (
        <ul className="relative w-full" style={{ height: totalSize }}>
          {virtualItems.map((vItem) => {
            const [id, data] = items[vItem.index];

            return (
              <li
                key={vItem.key}
                data-index={vItem.index}
                ref={virtualizer.measureElement}
                className="absolute left-0 top-0 w-full"
                style={getRowStyle(vItem.start)}
              >
                <Item data={{ ...(data as any), id }} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
