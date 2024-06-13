import { enterChatRoom } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useEnterChatRoomMutate() {
  const { mutateAsync: enterChatRoomMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    string
  >({
    mutationFn: (chatRoomId) => enterChatRoom(chatRoomId),

  });

  return { enterChatRoomMutate };
}
