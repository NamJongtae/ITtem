import { ProfileData } from "@/types/authTypes";
import ChatRoomFollowBtn from "./chat-room-follow-btn";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useProfileQuery from "@/hooks/querys/useProfileQuery";
import Image from "next/image";

interface IProps {
  participantIDs: string[];
  myProfileData: ProfileData | undefined;
}
export default function ChatRoomMenuUser({
  participantIDs,
  myProfileData,
}: IProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid || "";
  const isMe = (id: string) => {
    return id === myProfileData?.uid;
  };
  const otherUserId = participantIDs.filter((id) => id !== myUid)[0];
  const { profileData: otherUserProfileData } = useProfileQuery(otherUserId);

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
