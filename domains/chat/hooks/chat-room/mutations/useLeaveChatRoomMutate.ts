import leaveChatRoom from '../../../api/leaveChatRoom';
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useLeaveChatRoomMutate() {
  const { mutateAsync: leaveChatRoomMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    string
  >({
    mutationFn: (chatRoomId) => leaveChatRoom(chatRoomId),
  });

  return { leaveChatRoomMutate };
}
