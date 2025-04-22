import { queryKeys } from "@/query-keys/query-keys";
import useLocationStore from "@/store/location-store";
import {
  ProductCategory,
  ProductData,
  ProductListType
} from "@/types/product-types";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCategoryProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
}) {
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
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      QueryKey,
      unknown
    >,
    enabled: productListType === "CATEGORY",
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
