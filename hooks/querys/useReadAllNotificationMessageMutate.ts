import { readAllNotificationMessage } from "@/lib/api/notification";
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

  const { mutate, isPending, error } = useMutation<
    void,
    AxiosError,
    undefined,
    {
      previousMessages:
        | InfiniteData<
            { messages: NotificationMessageData[]; nextKey: string },
            unknown
          >
        | undefined;
    }
  >({
    mutationFn: readAllNotificationMessage,
    onMutate: async () => {
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
            messages: page.messages.map((messageData) => ({
              ...messageData,
              isRead: true,
            })),
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
