import { getNotificationMessage } from "@/lib/api/notification";
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
    { messages: NotificationMessageData[]; nextKey: string },
    Error,
    InfiniteData<{ messages: NotificationMessageData; nextKey: string }>
  >({
    queryKey: ["notification"],
    queryFn: async ({ pageParam }) => {
      const response = await getNotificationMessage({
        lastKey: pageParam,
        limit,
      });

      return {
        messages: response.data.messages,
        nextKey: response.data.nextKey,
      };
    },
    enabled: !!user,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextKey || undefined,
  });

  return {
    data: data?.pages.map((page) => page?.messages).flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
}
