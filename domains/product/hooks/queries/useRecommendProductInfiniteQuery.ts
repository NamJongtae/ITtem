import { queryKeys } from "@/query-keys/query-keys";
import { ProductData } from "../../types/product-types";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useRecommendProductInfiniteQuery(props?: {
  limit?: number;
}) {
  const limit = props?.limit ?? 10;
  const queryKeyConfig = queryKeys.product.recommend();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useSuspenseInfiniteQuery<
    ProductData[],
    AxiosError,
    InfiniteData<ProductData>
  >({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      QueryKey,
      unknown
    >,
    staleTime: 60 * 1000,
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
