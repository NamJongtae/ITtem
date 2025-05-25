import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { NotificationMessageData } from "../../types/notificationTypes";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";

export default function useNotificationInfiniteQuery(limit: number = 10) {
  const queryKeyConfig = queryKeys.notification.messages(limit);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useSuspenseInfiniteQuery<
    { messages: NotificationMessageData[]; nextKey: string },
    Error,
    InfiniteData<{ messages: NotificationMessageData; nextKey: string }>
  >({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      { messages: NotificationMessageData[]; nextKey: string },
      QueryKey,
      unknown
    >,
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
