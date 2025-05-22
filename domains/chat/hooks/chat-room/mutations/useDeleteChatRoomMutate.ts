import deleteChatRoom from '../../../api/deleteChatRoom';
import useGlobalLoadingStore from "@/store/global-loging-store";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useDeleteChatRoomMutate() {
  const params = useParams();
  const chatRoomId = params.chatRoomId || "";
  const { actions } = useGlobalLoadingStore();
  const { mutateAsync: deleteChatRoomMutate } = useMutation({
    mutationFn: () => deleteChatRoom(chatRoomId as string),
    onMutate: () => {
      actions.startLoading();
    },
    onSuccess: () => {
      toast.success("채팅방 인원이 없어 채팅방이 삭제됬어요.");
    },
    onError: (error) => {
      console.error(error);
      toast.warn("채팅방 삭제에 실패했어요.");
    },
    onSettled: () => {
      actions.stopLoading();
    }
  });

  return { deleteChatRoomMutate };
}
