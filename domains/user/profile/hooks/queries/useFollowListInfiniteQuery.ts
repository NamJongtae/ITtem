import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileData } from "../../types/profileTypes";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useFollowListInfiniteQuery({
  isFollowers,
  userIds,
  limit = 10
}: {
  isFollowers: boolean;
  userIds: string[] | undefined;
  uid: string | undefined;
  limit?: number;
}) {
  const queryKeyConfing = isFollowers
    ? queryKeys.profile.my._ctx.followers({
        userIds: userIds as string[],
        limit
      })
    : queryKeys.profile.my._ctx.followings({
        userIds: userIds as string[],
        limit
      });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error
  } = useSuspenseInfiniteQuery<
    ProfileData[],
    AxiosError,
    InfiniteData<ProfileData>
  >({
    queryKey: queryKeyConfing.queryKey,
    queryFn: queryKeyConfing.queryFn as QueryFunction<
      ProfileData[],
      QueryKey,
      unknown
    >,
    initialPageParam: null,
    retry: 0,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?.uid;
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
