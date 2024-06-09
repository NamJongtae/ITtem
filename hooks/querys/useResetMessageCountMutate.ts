import { resetChatMessageCount } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useResetChatMessageCountMutate() {
  const { mutate: resetChatMessageCountMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    string
  >({
    mutationFn: (chatRoomId) => resetChatMessageCount(chatRoomId),
  });

  return { resetChatMessageCountMutate };
}
