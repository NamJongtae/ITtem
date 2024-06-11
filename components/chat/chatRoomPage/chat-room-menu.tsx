import Image from "next/image";
import useDropdownMenu from "@/hooks/commons/useDropDownMenu";
import useMyProfileQuery from "@/hooks/querys/useMyProfileQuery";
import ChatRoomExitBtn from "./chat-room-exit-btn";
import ChatRoomFollowBtn from "./chat-room-follow-btn";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

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
  const { isOpenMenu, toggleMenu, closeMenu, menuRef } = useDropdownMenu();
  const { myProfileData } = useMyProfileQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid || "";
  const otherUserId = participantIDs.filter((id) => id !== myUid)[0];

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
              participantIDs={participantIDs}
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
