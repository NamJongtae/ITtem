import { exitChatRoom } from "@/lib/api/chat";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useExitChatRoomMutate() {
  const params = useParams();
  const chatRoomId = params.chatRoomId;
  const { actions } = useGlobalLoadingStore();
  const { mutateAsync: exitChatRoomMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError
  >({
    mutationFn: () => exitChatRoom(chatRoomId as string),
    onMutate: () => {
      actions.startLoading();
    },
    onError: (error) => {
      console.error(error);
      toast.warn("채팅방 나가기에 실패했어요.");
    },
    onSettled: () => {
      actions.stopLoading();
    }
  });


  return { exitChatRoomMutate };
}
