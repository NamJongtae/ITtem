import { queryKeys } from "@/queryKeys";
import { ProductData, ProductListType } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProductTodayListInfiniteQuery({
  limit = 10,
  productListType,
}: {
  limit?: number;
  productListType: ProductListType;
}) {
  const queryKeysConfig = queryKeys.product.list({ productListType, limit });

  const {
    data: todayProductListData,
    hasNextPage: hasNextPageTodayProductList,
    fetchNextPage: fetchNextPageTodayProductList,
    isFetchingNextPage: isFetchingNextPageTodayProductList,
    isLoading: isLoadingTodayProductList,
    error: todayProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: queryKeysConfig.queryKey,
    queryFn: queryKeysConfig.queryFn as any,
    enabled: productListType === "TODAY",
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
    todayProductListData: todayProductListData?.pages.flat(),
    hasNextPageTodayProductList,
    fetchNextPageTodayProductList,
    isFetchingNextPageTodayProductList,
    isLoadingTodayProductList,
    todayProductListError,
  };
}
