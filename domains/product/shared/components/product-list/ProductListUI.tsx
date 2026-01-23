"use client";

import ProductListItem from "./ProductListItem";
import { ProductCategory, ProductData } from "../../types/productTypes";
import Empty from "@/shared/common/components/Empty";
import ProductItemSkeletonUI from "./ProductItemSkeletonUI";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import { useProductListVirtualizer } from "../../hooks/useProductListVirtualizer";
interface IProps {
  data: ProductData[] | undefined;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  emptyMessage: string;
  productCategory?: ProductCategory;
}

const FetchingSkeletonUI = () => (
  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
    {Array.from({ length: 8 }).map((_, index) => (
      <ProductItemSkeletonUI key={index} />
    ))}
  </div>
);

export default function ProductListUI({
  data,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  emptyMessage,
  productCategory
}: IProps) {
  const flatData = data ?? [];

  const { ref: loadMoreRef } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  const {
    listRef,
    columns,
    virtualItems,
    totalSize,
    virtualizer,
    getRowStyle
  } = useProductListVirtualizer(flatData.length, {
    gap: 20,
    overscan: 2,
    throttleMs: 100
  });

  if (flatData.length === 0) {
    return (
      <div ref={listRef} className="max-w-[1024px] mx-auto pb-12 px-8 mt-6">
        <Empty message={emptyMessage} />
      </div>
    );
  }

  return (
    <div ref={listRef} className="max-w-[1024px] mx-auto pb-12 px-8 mt-6">
      
      <ul
        aria-label="상품 목록"
        className="relative w-full list-none p-0 m-0"
        style={{ height: `${totalSize}px` }} // 가상화 스크롤 높이
      >
        {virtualItems.map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const rowItems = flatData.slice(startIndex, startIndex + columns);

          return (
            <li
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              className="absolute top-0 left-0 w-full"
              style={getRowStyle(virtualRow.start)}
            >
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {rowItems.map((item) => (
                  <ProductListItem
                    key={item._id}
                    data={item}
                    category={productCategory}
                  />
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      <InfiniteScrollTarget ref={loadMoreRef} hasNextPage={hasNextPage} />

      {isFetchingNextPage && <FetchingSkeletonUI />}

      <InfiniteScrollEndMessage
        message="더 이상 상품이 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
