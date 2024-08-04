import { readNotificationMessage } from "@/lib/api/notification";
import { queryKeys } from "@/query-keys/query-keys";
import { NotificationMessageData } from "@/types/notification-types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useReadNotificationMessageMutate() {
  const queryClient = useQueryClient();
  const notificationMessagesQueryKey =
    queryKeys.notification.messages().queryKey;

  const { mutate, isPending, error } = useMutation<
    void,
    AxiosError,
    string,
    {
      previousMessages:
        | InfiniteData<
            { messages: NotificationMessageData[]; nextKey: string },
            unknown
          >
        | undefined;
    }
  >({
    mutationFn: (messageId: string) => readNotificationMessage(messageId),
    onMutate: async (messageId) => {
      await queryClient.cancelQueries({
        queryKey: notificationMessagesQueryKey,
      });

      const previousMessages = queryClient.getQueryData(
        notificationMessagesQueryKey
      ) as
        | InfiniteData<
            { messages: NotificationMessageData[]; nextKey: string },
            unknown
          >
        | undefined;

      const newPages = previousMessages?.pages.map(
        (page: {
          messages: NotificationMessageData[];
          nextKey: string | null;
        }) => {
          return {
            ...page,
            messages: page.messages.map((messageData) => {
              if (messageData.id === messageId) {
                return {
                  ...messageData,
                  isRead: true,
                };
              } else {
                return messageData;
              }
            }),
          };
        }
      );

      queryClient.setQueryData(notificationMessagesQueryKey, {
        ...previousMessages,
        pages: newPages,
      });

      return { previousMessages };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationMessagesQueryKey });
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(
        notificationMessagesQueryKey,
        ctx?.previousMessages
      );
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { mutate, isPending, error };
}
