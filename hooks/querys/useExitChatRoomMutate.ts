import { exitChatRoom } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

export default function useExitChatRoomMutate() {
  const router = useRouter();
  const chatRoomId = router.query?.chatRoomId;

  const { mutateAsync: exitChatRoomMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError
  >({
    mutationFn: () => exitChatRoom(chatRoomId as string),
  });

  return { exitChatRoomMutate };
}
