import Image from "next/image";
import useDropdownMenu from "@/hooks/commons/useDropDownMenu";
import useExitChatRoomMutate from "@/hooks/querys/useExitChatRoomMutate";

interface IProps {
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}
export default function ChatRoomMenu({
  handleChatRoomExit,
  resetChatRoomExit,
}: IProps) {
  const { isOpenMenu, toggleMenu, menuRef } = useDropdownMenu();
  const { exitChatRoomMutate } = useExitChatRoomMutate(resetChatRoomExit);

  const exitChatRoom = () => {
    const isExit = confirm("정말 채팅방을 나가겠어요?");
    if (isExit) {
      handleChatRoomExit();
      exitChatRoomMutate();
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <button onClick={toggleMenu}>
        <Image src="/icons/dots_icon.svg" alt="나가기" width={20} height={20} />
      </button>

      {isOpenMenu && (
        <ul
          className="absolute top-14 right-4 h-auto bg-white border rounded-md shadow-lg animate-entering"
          ref={menuRef}
        >
          <li>
            <button
              type="button"
              onClick={exitChatRoom}
              className="py-2 px-4 w-full text-sm text-left betterhover:hover:bg-gray-100"
            >
              나가기
            </button>
          </li>
          <li>
            <button className="py-2 px-4 w-full text-sm text-left betterhover:hover:bg-gray-100">
              팔로우
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
