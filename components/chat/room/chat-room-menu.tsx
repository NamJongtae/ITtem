import Image from "next/image";
import ChatRoomExitBtn from "./chat-room-exit-btn";
import useChatRoomMenu from "@/hooks/chat-room/useChatRoomMenu";
import ChatRoomMenuUser from "./chat-room-menu-user";

interface IProps {
  participantIDs: string[];
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function ChatRoomMenu({
  participantIDs,
  handleChatRoomExit,
  resetChatRoomExit,
}: IProps) {
  const { isOpenMenu, toggleMenu, menuRef, myProfileData } = useChatRoomMenu();

  return (
    <div className="flex gap-3 items-center">
      <button onClick={toggleMenu}>
        <Image src="/icons/dots-icon.svg" alt="나가기" width={20} height={20} />
      </button>

      {isOpenMenu && (
        <div className="absolute inset-0 z-20">
          <div
            onClick={toggleMenu}
            className="absolute bg-black bg-opacity-50 inset-0"
            role="backdrop"
          />

          <div
            className="absolute w-[280px] h-full right-0 bg-white animate-slideOutLeft"
            ref={menuRef}
          >
            <h2 className="font-semibold border-b p-3">채팅방 메뉴</h2>
            <ChatRoomMenuUser
              participantIDs={participantIDs}
              myProfileData={myProfileData}
            />
            <div className="absolute bottom-0 border-t w-full">
              <ChatRoomExitBtn
                participantIDs={participantIDs}
                handleChatRoomExit={handleChatRoomExit}
                resetChatRoomExit={resetChatRoomExit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
