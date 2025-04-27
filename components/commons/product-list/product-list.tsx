"use client";

import { Fragment } from "react";
import ProductListItem from "./product-list-item";
import { ProductCategory, ProductListType } from "@/types/product-types";
import ProductListError from "./product-list-error";
import useProductList from "@/hooks/commons/useProductList";
import Empty from "../empty";
import ProductListSkeletonUI from "./product-list-skeletonUI";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "../InfiniteScrollTarget";
import InfiniteScrollEndMessage from "../InfiniteScrollEndMessage";

interface IProps {
  productListType: ProductListType;
  productIds?: string[];
  profileProductCategory?: ProductCategory;
}

export default function ProductList({
  productListType,
  productIds,
  profileProductCategory
}: IProps) {
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    emptyMessage
  } = useProductList(productListType, productIds, profileProductCategory);

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
              <Fragment key={item._id}>
                <ProductListItem
                  data={item}
                  category={profileProductCategory}
                />
              </Fragment>
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
