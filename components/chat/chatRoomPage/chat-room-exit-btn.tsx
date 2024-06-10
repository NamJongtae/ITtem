import useExitChatRoomMutate from "@/hooks/querys/useExitChatRoomMutate";

interface IProps {
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function ChatRoomExitBtn({
  handleChatRoomExit,
  resetChatRoomExit,
}: IProps) {
  const { exitChatRoomMutate } = useExitChatRoomMutate(resetChatRoomExit);

  const exitChatRoom = () => {
    const isExit = confirm("정말 채팅방을 나가겠어요?");
    if (isExit) {
      handleChatRoomExit();
      exitChatRoomMutate();
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
