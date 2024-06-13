import useDeleteChatRoomMutate from "@/hooks/reactQuery/mutations/chat/useDeleteChatRoomMutate";
import useExitChatRoomMutate from "@/hooks/reactQuery/mutations/chat/useExitChatRoomMutate";
import { isAxiosError } from "axios";
import Image from "next/image";
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
      className="flex gap-2 py-2 px-4 text-sm"
    >
      <Image
        src={"/icons/logout_icon.svg"}
        alt="나가기"
        width={20}
        height={20}
      />
      나가기
    </button>
  );
}
