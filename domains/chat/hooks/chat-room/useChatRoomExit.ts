import { useRouter } from "next/navigation";
import useExitChatRoomMutate from './mutations/useExitChatRoomMutate';
import useDeleteChatRoomMutate from './mutations/useDeleteChatRoomMutate';
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface IParams {
  participantIDs: string[];
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function useChatRoomExit({
  participantIDs,
  handleChatRoomExit,
  resetChatRoomExit
}: IParams) {
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
        if (participantIDs.length === 1) {
          await deleteChatRoomMutate();
        }
        router.push("/chat");
      } catch (error) {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
        resetChatRoomExit();
      }
    }
  };

  return { exitChatRoom };
}
