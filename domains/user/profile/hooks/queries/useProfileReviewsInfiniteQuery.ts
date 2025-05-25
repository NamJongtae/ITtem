import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileReviewData } from "../../types/profileTypes";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProfileReviewsInfiniteQuery({
  uid,
  limit = 10
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
    error
  } = useSuspenseInfiniteQuery<
    ProfileReviewData[],
    AxiosError,
    InfiniteData<ProfileReviewData>
  >({
    queryKey: queryKeyConfing.queryKey,
    queryFn: queryKeyConfing.queryFn as QueryFunction<
      ProfileReviewData[],
      QueryKey,
      unknown
    >,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?.createdAt;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
    retry: 0
  });

  return {
    data: data?.pages.flat(),
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  };
}
