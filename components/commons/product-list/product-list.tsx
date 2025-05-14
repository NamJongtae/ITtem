"use client";

import { Fragment } from "react";
import ProductListItem from "./product-list-item";
import { ProductCategory, ProductListType } from "@/types/product-types";
import ProductListError from "./product-list-error";
import useInfiniteProductList from "@/hooks/commons/useInfiniteProductList";
import Empty from "../empty";
import ProductListSkeletonUI from "./product-list-skeletonUI";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "../InfiniteScrollTarget";
import InfiniteScrollEndMessage from "../InfiniteScrollEndMessage";

interface IProps {
  productListType: ProductListType;
  productIds?: string[];
  productCategory?: ProductCategory;
}

export default function ProductList({
  productListType,
  productIds,
  productCategory
}: IProps) {
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    emptyMessage
  } = useInfiniteProductList(productListType, productIds, productCategory);

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (error) {
    return <ProductListError productListType={productListType} />;
  }

  if (!isLoading && data?.length === 0) {
    return <Empty message={emptyMessage} />;
  }

  return (
    <div className="max-w-[1024px] mx-auto pb-12">
      <ul className="grid gap-5 grid-cols-autoFill mt-6 px-8">
        {isLoading ? (
          <ProductListSkeletonUI listCount={8} />
        ) : (
          <>
            {data?.map((item) => (
              <ProductListItem
                key={item._id}
                data={item}
                category={productCategory}
              />
            ))}
            {isFetchingNextPage && <ProductListSkeletonUI listCount={12} />}
            {<InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />}
          </>
        )}
      </ul>

      <InfiniteScrollEndMessage
        message="더 이상 상품이 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
