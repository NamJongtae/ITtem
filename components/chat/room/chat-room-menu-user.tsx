import { ProfileData } from "@/types/authTypes";
import ChatRoomFollowBtn from "./chat-room-follow-btn";
import Image from "next/image";
import useChatRoomMenuUser from "@/hooks/chat-room/useChatRoomMenuUser";

interface IProps {
  participantIDs: string[];
  myProfileData: ProfileData | undefined;
}
export default function ChatRoomMenuUser({
  participantIDs,
  myProfileData,
}: IProps) {
  const { isMe, otherUserId, otherUserProfileData } = useChatRoomMenuUser({
    participantIDs,
    myProfileData,
  });

  return (
    <ul className="flex flex-col p-3 gap-3 text-sm">
      {participantIDs.map((id) => (
        <li key={id} className="flex gap-3 items-center justify-between w-full">
          <div className="flex gap-3 items-center">
            <Image
              className="rounded-xl w-[30px] h-[30px]"
              src={
                (isMe(id)
                  ? myProfileData?.profileImg
                  : otherUserProfileData?.profileImg) || "/icons/user_icon.svg"
              }
              alt={
                (isMe(id)
                  ? myProfileData?.nickname
                  : otherUserProfileData?.nickname) || ""
              }
              width={30}
              height={30}
            />
            <span className="font-medium">
              {isMe(id)
                ? myProfileData?.nickname
                : otherUserProfileData?.nickname}
            </span>
          </div>

          {!isMe(id) && (
            <ChatRoomFollowBtn
              otherUserId={otherUserId}
              myFollowings={myProfileData?.followings}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
