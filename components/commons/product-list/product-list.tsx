"use client";

import { Fragment } from "react";
import ProductListItem from "./product-list-item";
import InfiniteScroll from "react-infinite-scroller";
import { ProductCategory, ProductListType } from "@/types/product-types";
import ProductListError from "./product-list-error";
import useProductList from "@/hooks/commons/useProductList";
import Empty from "../empty";
import ProductListSkeletonUI from "./product-list-skeletonUI";

interface IProps {
  productListType: ProductListType;
  productIds?: string[];
  profileProductCategory?: ProductCategory;
}

export default function ProductList({
  productListType,
  productIds,
  profileProductCategory,
}: IProps) {
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    emptyMessage,
  } = useProductList(productListType, productIds, profileProductCategory);

  if (error) {
    return <ProductListError productListType={productListType} />;
  }

  if (data?.length === 0) {
    return <Empty message={emptyMessage} />;
  }

  return (
    <InfiniteScroll
      hasMore={hasNextPage && !error}
      loadMore={() => {
        if (!isFetchingNextPage) fetchNextPage();
      }}
    >
      <div className="max-w-[1024px] mx-auto pb-12">
        <ul className="grid gap-5 grid-cols-autoFill mt-6 px-8 ">
          {isLoading ? (
            <ProductListSkeletonUI listCount={8} />
          ) : (
            data?.map((item) => (
              <Fragment key={item._id}>
                <ProductListItem
                  data={item}
                  category={profileProductCategory}
                />
              </Fragment>
            ))
          )}
          {isFetchingNextPage && <ProductListSkeletonUI listCount={12} />}
        </ul>
      </div>
    </InfiniteScroll>
  );
}
