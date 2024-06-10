import Image from "next/image";
import useDropdownMenu from "@/hooks/commons/useDropDownMenu";
import useExitChatRoomMutate from "@/hooks/querys/useExitChatRoomMutate";
import useMyProfileQuery from "@/hooks/querys/useMyProfileQuery";
import useMyProfileFollowMutate from "@/hooks/querys/useMyProfileFollowMutate";
import ChatRoomExitBtn from "./chat-room-exit-btn";
import ChatRoomFollowBtn from "./chat-room-follow-btn";

interface IProps {
  otherUserId: string;
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function ChatRoomMenu({
  otherUserId,
  handleChatRoomExit,
  resetChatRoomExit,
}: IProps) {
  const { isOpenMenu, toggleMenu, closeMenu, menuRef } = useDropdownMenu();
  const { myProfileData } = useMyProfileQuery();

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
            <ChatRoomExitBtn
              handleChatRoomExit={handleChatRoomExit}
              resetChatRoomExit={resetChatRoomExit}
            />
          </li>
          <li>
            <ChatRoomFollowBtn
              otherUserId={otherUserId}
              myFollowings={myProfileData?.followings}
              closeMenu={closeMenu}
            />
          </li>
        </ul>
      )}
    </div>
  );
}
