import { MY_PROFILE_WISH_QUERY_KEY } from "@/constants/constant";
import { getProfileWish } from "@/lib/api/auth";
import { ProductData } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProfileWishInfiniteQuery({
  wishProductIds,
  limit = 10,
}: {
  wishProductIds: string[];
  limit?: number;
}) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: MY_PROFILE_WISH_QUERY_KEY,
    queryFn: async ({ pageParam }) => {
      const response = await getProfileWish({
        wishProductIds,
        cursor: pageParam,
        limit,
      });
      return response.data.products;
    },
    initialPageParam: null,
    retry: 0,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?._id;
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
