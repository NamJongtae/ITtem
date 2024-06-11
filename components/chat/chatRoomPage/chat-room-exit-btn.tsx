import useDeleteChatRoomMutate from "@/hooks/querys/useDeleteChatRoomMutate";
import useExitChatRoomMutate from "@/hooks/querys/useExitChatRoomMutate";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface IProps {
  participantIDs: string[];
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function ChatRoomExitBtn({
  participantIDs,
  handleChatRoomExit,
  resetChatRoomExit,
}: IProps) {
  const router = useRouter();
  const { exitChatRoomMutate } = useExitChatRoomMutate();
  const { deleteChatRoomMutate } = useDeleteChatRoomMutate();

  const exitChatRoom = async () => {
    const isExit = confirm(
      "정말 채팅방을 나가겠어요?\n채팅방의 인원이 없는 경우 채팅내용과 채팅방은 삭제됩니다."
    );

    if (isExit) {
      handleChatRoomExit();
      try {
        await exitChatRoomMutate();
        router.push("/chat");
        if (participantIDs.length === 1) {
          deleteChatRoomMutate();
        }
      } catch (error) {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
        resetChatRoomExit();
      }
    }
  };

  return (
    <button
      type="button"
      onClick={exitChatRoom}
      className="py-2 px-4 w-full text-sm text-left betterhover:hover:bg-gray-100"
    >
      나가기
    </button>
  );
}
