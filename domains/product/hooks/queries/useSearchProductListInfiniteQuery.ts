import { useGetQuerys } from "@/hooks/useGetQuerys";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductCategory, ProductData } from "../../types/product-types";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useSearchProductListInfiniteQuery({
  limit = 10
}: {
  limit?: number;
} = {}) {
  const { category, keyword } = useGetQuerys(["category", "keyword"]);

  const queryKeyConfig = queryKeys.product.search({
    keyword: keyword as string,
    category: category ? (category as ProductCategory) : ProductCategory.전체,
    limit
  });

  const {
    data,
    isFetching,
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
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  };
}
