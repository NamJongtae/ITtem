import {
  getFollowersQueryKey,
  getFollowingsQueryKey,
} from "@/constants/constant";
import { getFollowers, getFollowings } from "@/lib/api/auth";
import { ProfileData } from "@/types/authTypes";
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
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery<ProfileData[], AxiosError, InfiniteData<ProfileData>>({
    queryKey: isFollowers
      ? getFollowersQueryKey(uid as string)
      : getFollowingsQueryKey(uid as string),
    queryFn: async ({ pageParam }) => {
      if (isFollowers) {
        const response = await getFollowers({
          cursor: pageParam,
          limit,
          userIds,
        });
        return response.data.followers;
      } else {
        const response = await getFollowings({
          cursor: pageParam,
          limit,
          userIds,
        });
        return response.data.followings;
      }
    },
    initialPageParam: null,
    enabled: !!uid,
    retry: 0,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1].uid;
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
