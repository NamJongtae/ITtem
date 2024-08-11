import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";
import { NotificationMessageData } from "@/types/notification-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export default function useNotificationInfiniteQuery(limit: number = 10) {
  const user = useAuthStore((state) => state.user);
  const queryKeyConfig = queryKeys.notification.messages(limit);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery<
    { messages: NotificationMessageData[]; nextKey: string },
    Error,
    InfiniteData<{ messages: NotificationMessageData; nextKey: string }>
  >({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as any,
    enabled: !!user,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextKey || undefined
  });

  return {
    data: data?.pages.map((page) => page?.messages).flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  };
}
