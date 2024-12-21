import { exitChatRoom } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";

export default function useExitChatRoomMutate() {
  const params = useParams();
  const chatRoomId = params.chatRoomId;
  const { mutateAsync: exitChatRoomMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError
  >({
    mutationFn: () => exitChatRoom(chatRoomId as string)
  });

  return { exitChatRoomMutate };
}
