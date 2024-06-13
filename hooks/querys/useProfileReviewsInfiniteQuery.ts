import { queryKeys } from "@/queryKeys";
import { ProfileReviewData } from "@/types/authTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProfileReviewsInfiniteQuery({
  uid,
  limit = 10,
}: {
  uid: string;
  limit?: number;
}) {
  const queryKeyConfing = queryKeys.product.review(uid as string);

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
