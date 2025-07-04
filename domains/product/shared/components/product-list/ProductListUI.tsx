"use client";

import ProductListItem from "./ProductListItem";
import { ProductCategory, ProductData } from "../../types/productTypes";
import Empty from "@/shared/common/components/Empty";
import ProductItemSkeletonUI from "./ProductItemSkeletonUI";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";

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
