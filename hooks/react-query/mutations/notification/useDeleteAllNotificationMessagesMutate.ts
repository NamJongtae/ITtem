import { deleteAllNotificationMessage } from "@/lib/api/notification";
import { queryKeys } from "@/queryKeys";
import { NotificationMessageData } from "@/types/notification";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useDeleteAllNotificationMessagesMutate() {
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
    mutationFn: (endKey) => deleteAllNotificationMessage(endKey),
    onMutate: async () => {
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

      queryClient.setQueryData(notificationMessagesQueryKey, {
        pageParams: [],
        pages: [{ messages: [], nextKey: null }],
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
