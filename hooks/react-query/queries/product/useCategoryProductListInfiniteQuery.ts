import { queryKeys } from "@/query-keys/query-keys";
import { RootState } from "@/store/store";
import {
  ProductCategory,
  ProductData,
  ProductListType,
} from "@/types/product-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useCategoryProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
}) {
  const location = useSelector((state: RootState) => state.location.location);
  const querKeyConfing = queryKeys.product.list({
    produdctCategory: category,
    location,
    limit,
  });

  const {
    data: categoryProductListData,
    hasNextPage: hasNextPageCategoryProductList,
    fetchNextPage: fetchNextPageCategoryProductList,
    isFetchingNextPage: isFetchingNextPageCategoryProductList,
    isLoading: isLoadingCategoryProductList,
    error: categoryProductListError,
  } = useInfiniteQuery<
    ProductData[],
    AxiosError,
    InfiniteData<ProductData>,
    any
  >({
    queryKey: querKeyConfing.queryKey,
    queryFn: querKeyConfing.queryFn as any,
    enabled: productListType === "CATEGORY",
    retry: 0,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?.createdAt;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
  });

  return {
    categoryProductListData: categoryProductListData?.pages.flat(),
    hasNextPageCategoryProductList,
    fetchNextPageCategoryProductList,
    isFetchingNextPageCategoryProductList,
    isLoadingCategoryProductList,
    categoryProductListError,
  };
}
