import { getProfileReviewsQueryKey } from "@/constants/constant";
import { getProfileReviews } from "@/lib/api/auth";
import { ReviewData } from "@/types/authTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProfileReviewsInfiniteQuery({
  uid,
  limit = 10,
}: {
  uid: string;
  limit?: number;
}) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<ReviewData[], AxiosError, InfiniteData<ReviewData>>({
    queryKey: getProfileReviewsQueryKey(uid as string),
    queryFn: async ({ pageParam }) => {
      const response = getProfileReviews({ uid, cursor: pageParam, limit });
      return (await response).data.reviews;
    },
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
