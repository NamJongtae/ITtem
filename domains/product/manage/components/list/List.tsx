"use client";

import { useMemo } from "react";
import { isAxiosError } from "axios";
import useTradeInfiniteQuery from "../../hooks/queries/useTradeInfiniteQuery";
import Empty from "@/shared/common/components/Empty";
import Item from "../item/Item";
import ListSkeletonUI from "./ListSkeletonUI";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import {
  ProductManageMenuType,
  ProductManageStatusType
} from "../../types/productManageTypes";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import { useProductManageVirtualizer } from "../../hooks/useProductManageVirtualizer";

interface IProps {
  menu: ProductManageMenuType;
  productManageStatus: ProductManageStatusType;
}

export default function List({ menu, productManageStatus }: IProps) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useTradeInfiniteQuery();

  const items = useMemo(() => data ?? [], [data]);

  const { ref: loadMoreRef } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    threshold: 0
  });

  const { listRef, virtualizer, virtualItems, totalSize, getRowStyle } =
    useProductManageVirtualizer({ itemCount: items.length, overscan: 3 });

  if (isLoading) return <ListSkeletonUI />;

  if (error || items.length === 0) {
    return (
      <Empty
        message={
          isAxiosError<{ message: string }>(error)
            ? error.response?.data.message || ""
            : `${productManageStatus} 목록이 없어요.`
        }
      />
    );
  }

  return (
    <>
      <ul
        ref={listRef}
        className="relative w-full"
        style={{ height: totalSize }}
      >
        {virtualItems.map((vItem) => (
          <li
            key={vItem.key}
            data-index={vItem.index}
            ref={virtualizer.measureElement}
            className="absolute left-0 top-0 w-full"
            style={getRowStyle(vItem.start)}
          >
            <Item
              tradingData={items[vItem.index]}
              menu={menu}
              productManageStatus={productManageStatus}
            />
          </li>
        ))}
      </ul>

      <InfiniteScrollTarget ref={loadMoreRef} hasNextPage={hasNextPage} />
      {isFetchingNextPage && <ListSkeletonUI />}
      <InfiniteScrollEndMessage
        message={`더 이상 ${productManageStatus} 상품이 없어요.`}
        data={items}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
