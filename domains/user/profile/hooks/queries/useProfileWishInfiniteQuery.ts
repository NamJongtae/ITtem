import getWishlistProductData from "../../api/getWishlistProductData";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductData } from "@/domains/product/shared/types/productTypes";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProfileWishInfiniteQuery({
  wishProductIds,
  limit = 10
}: {
  wishProductIds: string[];
  limit?: number;
}) {
  const myProfileQueryKey = queryKeys.profile.my._ctx.wish._def;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useSuspenseInfiniteQuery<
    ProductData[],
    AxiosError,
    InfiniteData<ProductData>
  >({
    queryKey: myProfileQueryKey,
    queryFn: async ({ pageParam }) => {
      const response = await getWishlistProductData({
        wishProductIds,
        cursor: pageParam,
        limit
      });
      return response.data.products;
    },
    initialPageParam: null,
    retry: 0,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?._id;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    }
  });
  return {
    data: data?.pages.flat(),
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error
  };
}
