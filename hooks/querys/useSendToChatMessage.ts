import { sendToChatMessage } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useSendToChatMessage(scrollToBottom: () => void) {
  const { mutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    { chatRoomId: string; message: string }
  >({
    mutationFn: ({ chatRoomId, message }) =>
      sendToChatMessage({ chatRoomId, message }),
    onSuccess: () => {
      scrollToBottom();
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { mutate };
}
