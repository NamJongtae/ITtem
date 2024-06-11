import { deleteChatRoom } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useDeleteChatRoomMutate() {
  const router = useRouter();
  const chatRoomId = router.query?.chatRoomId || "";
  const { mutate: deleteChatRoomMutate } = useMutation({
    mutationFn: () => deleteChatRoom(chatRoomId as string),
    onSuccess: () => {
      toast.success("채팅방 인원이 없어 채팅방이 삭제됬어요.");
    },
    onError: (error) => {
      console.error(error);
      toast.warn("채팅방 삭제에 실패했어요.");
    },
  });
  return { deleteChatRoomMutate };
}
