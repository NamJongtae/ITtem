import { useGetQuerys } from "@/hooks/useGetQuerys";
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/domains/auth/store/auth-store";
import {
  ProductCategory,
  ProductData,
  ProductListType
} from "@/domains/product/types/product-types";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import profileQueryKey from "../../../query-keys/profile-query-keys";
export default function useProfileProductListInfiniteQuery({
  limit = 10,
  productListType,
  productIds
}: {
  limit?: number;
  productListType: ProductListType;
  productIds: string[];
}) {
  const params = useParams();
  const { category } = useGetQuerys("category");
  const { user } = useAuthStore();
  const uid = productListType === "MY_PROFILE" ? user?.uid : params.uid || "";

  const queryKeyConfig =
    productListType === "MY_PROFILE"
      ? queryKeys.profile.my._ctx.products({
          category: category as ProductCategory,
          limit,
          productIds
        })
      : profileQueryKey.user(uid as string)._ctx.products({
          category: category as ProductCategory,
          limit,
          productIds
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
    queryKey:
      productListType === "MY_PROFILE"
        ? queryKeyConfig.queryKey
        : queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      QueryKey,
      unknown
    >,
    retry: 0,
    staleTime: 0,
    refetchOnMount: true,
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
