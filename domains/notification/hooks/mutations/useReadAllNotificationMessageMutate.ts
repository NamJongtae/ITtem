import readAllNotificationMessage from "../../api/readAllNotificationMessage";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { NotificationMessageData } from "../../types/notificationTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useReadAllNotificationMessagesMutate() {
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
    mutationFn: (endKey) => readAllNotificationMessage(endKey),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: notificationMessagesQueryKey
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
            messages: page.messages.map((messageData) => ({
              ...messageData,
              isRead: true
            }))
          };
        }
      );

      queryClient.setQueryData(notificationMessagesQueryKey, {
        ...previousMessages,
        pages: newPages
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
    }
  });

  return { mutate, isPending, error };
}
