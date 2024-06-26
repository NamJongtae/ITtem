import { readAllNotificationMessage } from "@/lib/api/notification";
import { queryKeys } from "@/queryKeys";
import { NotificationMessageData } from "@/types/notification";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useReadAllNotificationMessagesMutate() {
  const queryClient = useQueryClient();
  const notificationQueryKey = queryKeys.notification._def;

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
      await queryClient.cancelQueries({ queryKey: notificationQueryKey });

      const previousMessages = queryClient.getQueryData(
        notificationQueryKey
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
              isRead: true,
            })),
          };
        }
      );

      queryClient.setQueryData(notificationQueryKey, {
        ...previousMessages,
        pages: newPages,
      });

      return { previousMessages };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKey });
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(notificationQueryKey, ctx?.previousMessages);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { mutate, isPending, error };
}
