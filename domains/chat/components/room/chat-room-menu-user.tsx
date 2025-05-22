import { ProfileData } from "@/domains/user/types/profile-types";
import useChatOpponentProfile from "../../hooks/chat-room/useChatOpponentProfile";
import ChatRoomMenuMyProfile from "./chat-room-menu-my-profile";
import ChatRoomMenuOtherUserProfile from "./chat-room-menu-other-user-profile";

interface IProps {
  participantIDs: string[];
  myProfileData: ProfileData | undefined;
}
export default function ChatRoomMenuUser({
  participantIDs,
  myProfileData
}: IProps) {
  const { isMe, otherUserId, otherUserProfileData } = useChatOpponentProfile({
    participantIDs,
    myProfileData
  });

  return (
    <ul className="flex flex-col p-3 gap-3 text-sm">
      {participantIDs.map((id) => (
        <li key={id} className="flex gap-3 items-center justify-between w-full">
          {isMe(id) ? (
            <ChatRoomMenuMyProfile
              myProfileData={myProfileData}
              otherUserId={otherUserId}
            />
          ) : (
            <ChatRoomMenuOtherUserProfile
              otherUserProfileData={otherUserProfileData}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
