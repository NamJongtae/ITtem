import joinChatRoom from "../../api/joinChatRoom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useJoinChatRoomMutate() {
  const { mutateAsync: joinChatRoomMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    string
  >({
    mutationFn: (chatRoomId) => joinChatRoom(chatRoomId)
  });

  return { joinChatRoomMutate };
}
