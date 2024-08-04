import { queryKeys } from "@/query-keys/query-keys";
import { ProfileData } from "@/types/auth-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useFollowListInfiniteQuery({
  isFollowers,
  userIds,
  uid,
  limit = 10,
}: {
  isFollowers: boolean;
  userIds: string[] | undefined;
  uid: string | undefined;
  limit?: number;
}) {
  const queryKeyConfing = isFollowers
    ? queryKeys.profile.my._ctx.followers({
        userIds: userIds as string[],
        limit,
      })
    : queryKeys.profile.my._ctx.followings({
        userIds: userIds as string[],
        limit,
      });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery<ProfileData[], AxiosError, InfiniteData<ProfileData>>({
    queryKey: queryKeyConfing.queryKey,
    queryFn: queryKeyConfing.queryFn as any,
    initialPageParam: null,
    enabled: !!uid,
    retry: 0,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?.uid;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
  });

  return {
    data: data?.pages.flat(),
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  };
}
