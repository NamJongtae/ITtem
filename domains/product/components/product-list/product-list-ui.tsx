"use client";

import ProductListItem from "./product-list-item";
import { ProductCategory, ProductData } from "../../types/product-types";
import Empty from "@/components/empty";
import ProductItemSkeletonUI from "./product-item-skeletonUI";
import useInfiniteScrollObserver from "@/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/InfiniteScrollEndMessage";

interface IProps {
  data: ProductData[] | undefined;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  emptyMessage: string;
  productCategory?: ProductCategory;
}

export default function ProductListUI({
  data,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  emptyMessage,
  productCategory
}: IProps) {
  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  const FetchingSkeletonUI = () => {
    return Array.from({ length: 12 }).map((_, index) => (
      <ProductItemSkeletonUI key={index} />
    ));
  };

  if (data?.length === 0) {
    return <Empty message={emptyMessage} />;
  }

  return (
    <div className="max-w-[1024px] mx-auto pb-12">
      <ul className="grid gap-5 grid-cols-autoFill mt-6 px-8">
        <>
          {data?.map((item) => (
            <ProductListItem
              key={item._id}
              data={item}
              category={productCategory}
            />
          ))}
          {isFetchingNextPage && <FetchingSkeletonUI />}
          {<InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />}
        </>
      </ul>

      <InfiniteScrollEndMessage
        message="더 이상 상품이 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
