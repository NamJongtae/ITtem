import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useLocationStore from "@/shared/common/store/locationStore";
import { ProductCategory, ProductData } from "../../types/productTypes";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCategoryProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체
}: {
  limit?: number;
  category?: ProductCategory;
} = {}) {
  const location = useLocationStore((state) => state.location);
  const queryKeyConfig = queryKeys.product.category({
    category,
    location,
    limit
  });

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
    retry: 0,
    initialPageParam: null,
    staleTime: 60 * 1000,
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
