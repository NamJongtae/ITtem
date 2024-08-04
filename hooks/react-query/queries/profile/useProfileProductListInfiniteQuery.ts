import { profileQueryKey, queryKeys } from "@/queryKeys";
import { ProfileData } from "@/types/authTypes";
import {
  ProductCategory,
  ProductData,
  ProductListType,
} from "@/types/productTypes";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
export default function useProfileProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
  productIds,
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
  productIds: string[];
}) {
  const search = useSearchParams();
  const queryClient = useQueryClient();
  const myProfile = queryClient.getQueryData(queryKeys.profile.my.queryKey) as
    | ProfileData
    | undefined;
  const uid =
    productListType === "MY_PROFILE" ? myProfile?.uid : search.get("uid") || "";

  const queryKeyConfig =
    productListType === "MY_PROFILE"
      ? queryKeys.profile.my._ctx.products({
          category,
          limit,
          productIds,
        })
      : profileQueryKey
          .user(uid as string)
          ._ctx.products({ category, limit, productIds });

  const {
    data: profileProductListData,
    hasNextPage: hasNextPageProfileProductList,
    fetchNextPage: fetchNextPageProfileProductList,
    isFetchingNextPage: isFetchingNextPageProfileProductList,
    isLoading: isLoadingProfileProductList,
    error: profileProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey:
      productListType === "MY_PROFILE"
        ? queryKeyConfig.queryKey
        : queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as any,
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
    },
  });

  return {
    profileProductListData: profileProductListData?.pages.flat(),
    hasNextPageProfileProductList,
    fetchNextPageProfileProductList,
    isFetchingNextPageProfileProductList,
    isLoadingProfileProductList,
    profileProductListError,
  };
}
