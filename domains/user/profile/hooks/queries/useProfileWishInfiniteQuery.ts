import getWishlistProductData from "../../api/getWishlistProductData";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { WishlistProductData } from "../../types/profileTypes";

export default function useProfileWishInfiniteQuery({
  limit = 10
}: {
  limit?: number;
}) {
  const myProfileQueryKey = queryKeys.profile.my._ctx.wish({ limit }).queryKey;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useSuspenseInfiniteQuery<
    WishlistProductData[],
    AxiosError,
    InfiniteData<WishlistProductData>
  >({
    queryKey: myProfileQueryKey,
    queryFn: async ({ pageParam }) => {
      const response = await getWishlistProductData({
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
