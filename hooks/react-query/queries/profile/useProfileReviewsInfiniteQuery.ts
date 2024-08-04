import { queryKeys } from "@/query-keys/query-keys";
import { ProfileReviewData } from "@/types/auth-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProfileReviewsInfiniteQuery({
  uid,
  limit = 10,
}: {
  uid: string;
  limit?: number;
}) {
  const queryKeyConfing = queryKeys.profile
    .user(uid as string)
    ._ctx.reviews({ limit });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<
    ProfileReviewData[],
    AxiosError,
    InfiniteData<ProfileReviewData>
  >({
    queryKey: queryKeyConfing.queryKey,
    queryFn: queryKeyConfing.queryFn as any,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?.createdAt;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
    retry: 0,
  });

  return {
    data: data?.pages.flat(),
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  };
}
