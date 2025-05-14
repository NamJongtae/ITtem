import { profileQueryKey, queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";

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
import { useParams } from "next/navigation";
export default function useProfileProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
  productIds
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
  productIds: string[];
}) {
  const params = useParams();
  const { user } = useAuthStore();
  const uid = productListType === "MY_PROFILE" ? user?.uid : params.uid || "";

  const queryKeyConfig =
    productListType === "MY_PROFILE"
      ? queryKeys.profile.my._ctx.products({
          category,
          limit,
          productIds
        })
      : profileQueryKey
          .user(uid as string)
          ._ctx.products({ category, limit, productIds });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey:
      productListType === "MY_PROFILE"
        ? queryKeyConfig.queryKey
        : queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      QueryKey,
      unknown
    >,
    enabled:
      (productListType === "PROFILE" || productListType === "MY_PROFILE") &&
      !!uid,
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
