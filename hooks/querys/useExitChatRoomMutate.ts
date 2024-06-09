import { exitChatRoom } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

export default function useExitChatRoomMutate(resetChatRoomExit: () => void) {
  const router = useRouter();
  const chatRoomId = router.query?.chatRoomId;

  const { mutate: exitChatRoomMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError
  >({
    mutationFn: () => exitChatRoom(chatRoomId as string),
    onSuccess: () => {
      router.push("/chat");
    },
    onError: () => {
      resetChatRoomExit();
    },
  });

  return { exitChatRoomMutate };
}
