import { queryKeys } from "@/query-keys/query-keys";
import useLocationStore from "@/store/location-store";
import {
  ProductCategory,
  ProductData,
  ProductListType
} from "@/types/product-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
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
  const querKeyConfing = queryKeys.product.list({
    produdctCategory: category,
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
