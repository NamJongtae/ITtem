import useChatRoomExitBtn from "@/hooks/chat-room/useChatRoomExitBtn";
import Image from "next/image";

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
  const { exitChatRoom } = useChatRoomExitBtn({
    participantIDs,
    handleChatRoomExit,
    resetChatRoomExit,
  });

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
