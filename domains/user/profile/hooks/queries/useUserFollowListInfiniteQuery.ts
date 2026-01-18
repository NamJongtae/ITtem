import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { FollowUserData } from "../../types/profileTypes";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useUserFollowListInfiniteQuery({
  listType,
  uid,
  limit = 10
}: {
  listType: "followers" | "followings";
  uid: string | undefined;
  limit?: number;
}) {
  const queryKeyConfing =
    listType === "followers"
      ? queryKeys.profile.user(uid || "")._ctx.followers({
          uid: uid as string,
          limit
        })
      : queryKeys.profile.user(uid || "")._ctx.followings({
          uid: uid as string,
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
    FollowUserData[],
    AxiosError,
    InfiniteData<FollowUserData>
  >({
    queryKey: queryKeyConfing.queryKey,
    queryFn: queryKeyConfing.queryFn as QueryFunction<
      FollowUserData[],
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
