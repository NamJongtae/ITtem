import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { InfiniteData, QueryFunction, QueryKey, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { WishlistProductData } from "../../types/profileTypes";

export default function useProfileWishInfiniteQuery({
  limit = 10
}: {
  limit?: number;
}) {
  const queryKeyConfing = queryKeys.profile.my._ctx.wish({ limit });

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
    queryKey: queryKeyConfing.queryKey,
    queryFn: queryKeyConfing.queryFn as QueryFunction<
      WishlistProductData[],
      QueryKey,
      unknown
    >,
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
