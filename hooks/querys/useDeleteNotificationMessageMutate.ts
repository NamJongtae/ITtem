import { deleteNotificationMessage } from "@/lib/api/notification";
import { NotificationMessageData } from "@/types/notification";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useDeleteNotificationMessageMutate() {
  const queryClient = useQueryClient();

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
    mutationFn: (messageId: string) =>
      deleteNotificationMessage(messageId),
    onMutate: async (messageId) => {
      await queryClient.cancelQueries({ queryKey: ["notification"] });

      const previousMessages = queryClient.getQueryData(["notification"]) as
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
            messages: page.messages.filter(
              (messageData) => messageData.id !== messageId
            ),
          };
        }
      );

      queryClient.setQueryData(["notification"], {
        ...previousMessages,
        pages: newPages,
      });

      return { previousMessages };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(["notification"], ctx?.previousMessages);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { mutate, isPending, error };
}
