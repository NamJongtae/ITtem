import { queryKeys } from "@/query-keys/query-keys";
import { ProductData, ProductListType } from "@/types/product-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProductTodayListInfiniteQuery({
  limit = 10,
  productListType
}: {
  limit?: number;
  productListType: ProductListType;
}) {
  const queryKeysConfig = queryKeys.product.list({ productListType, limit });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
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
    }
  });

  return {
    data: data?.pages.flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  };
}
