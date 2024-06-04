import { deleteAllNotificationMessage } from "@/lib/api/notification";
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
      await queryClient.cancelQueries({ queryKey: ["notification"] });

      const previousMessages = queryClient.getQueryData(["notification"]) as
        | InfiniteData<
            { messages: NotificationMessageData[]; nextKey: string },
            unknown
          >
        | undefined;

      queryClient.setQueryData(["notification"], {
        pageParams: [],
        pages: [{ messages: [], nextKey: null }],
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
