import { getNotificationMessage } from "@/lib/api/firebase";
import { RootState } from "@/store/store";
import { NotificationMessageData } from "@/types/notification";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function useNotificationInfiniteQuery(limit: number = 10) {
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<
    { items: NotificationMessageData[]; nextKey: string | null },
    Error,
    InfiniteData<{ items: NotificationMessageData; nextKey: string | null }>
  >({
    queryKey: ["notification"],
    queryFn: async ({ pageParam }) => {
      const response = await getNotificationMessage({
        userId: user?.uid || "",
        lastKey: pageParam,
        limit,
      });

      return response;
    },
    enabled: !!user,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextKey || undefined,
  });

  return {
    data: data?.pages.map((page) => page?.items).flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
}
