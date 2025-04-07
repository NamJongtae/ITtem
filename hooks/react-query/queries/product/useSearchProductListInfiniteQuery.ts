import { queryKeys } from "@/query-keys/query-keys";
import {
  ProductCategory,
  ProductData,
  ProductListType
} from "@/types/product-types";
import { InfiniteData, QueryFunction, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

export default function useSearchProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
}) {
  const search = useSearchParams();
  const keyword = search.get("keyword");
  const queryKeyConfig = queryKeys.product.search({
    keyword: keyword as string,
    category,
    limit
  });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<ProductData[], QueryKey, unknown>,
    enabled: productListType === "SEARCH" && !!keyword,
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
