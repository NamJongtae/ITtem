import useNotificationInfiniteQuery from "../hooks/queries/useNotificationInfiniteQuery";
import Spinner from "@/shared/common/components/Spinner";
import Item from "./Item";
import Empty from "@/shared/common/components/Empty";
import Btns from "./Btns";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import { useMemo } from "react";
import useListVirtualizer from "@/shared/common/hooks/useListVirtualizer";

export default function List() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNotificationInfiniteQuery();

  const items = useMemo(() => data ?? [], [data]);

  const { parentRef, virtualizer, virtualItems, totalSize, getRowStyle } =
    useListVirtualizer({
      items,
      scrollMargin: 45,
      estimateSize: 92.5,
      overscan: 3
    });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (data?.length === 0) {
    return (
      <Empty message={"알림 메세지가 없어요."} messageSize="sm" iconSize={50} />
    );
  }

  return (
    <div className="h-[380px] overflow-auto p-5 pt-2" ref={parentRef}>
      {data && (
        <Btns messageData={data} lastMessageKey={data[data.length - 1].id} />
      )}

      <ul className="relative w-full" style={{ height: totalSize }}>
        {virtualItems.map((vItem) => (
          <li
            key={vItem.key}
            data-index={vItem.index}
            ref={virtualizer.measureElement}
            className="absolute left-0 top-0 w-full"
            style={getRowStyle(vItem.start)}
          >
            <Item data={items[vItem.index]} />
          </li>
        ))}
      </ul>

      {isFetchingNextPage && (
        <div className="flex justify-center w-full">
          <Spinner />
        </div>
      )}

      <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
    </div>
  );
}
