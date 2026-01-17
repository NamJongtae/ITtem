import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { FollowUserData } from "../../types/profileTypes";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

export default function useMyFollowListInfiniteQuery({
  listType,
  limit = 10
}: {
  listType: "followers" | "followings";
  limit?: number;
}) {
  const user = useAuthStore((s) => s.user);

  const queryKeyConfing =
    listType === "followers"
      ? queryKeys.profile.my._ctx.followers({
          uid: user?.uid || "",
          limit
        })
      : queryKeys.profile.my._ctx.followings({
          uid: user?.uid || "",
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
