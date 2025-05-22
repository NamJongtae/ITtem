import Image from "next/image";
import ChatRoomFollowBtn from "./chat-room-follow-btn";
import { ProfileData } from "@/domains/user/types/profile-types";

interface IProps {
  myProfileData: ProfileData | undefined;
  otherUserId: string;
}

export default function ChatRoomMenuMyProfile({
  myProfileData,
  otherUserId
}: IProps) {
  return (
    <>
      <div className="flex gap-3 items-center">
        <Image
          className="rounded-xl w-[30px] h-[30px]"
          src={myProfileData?.profileImg || "/icons/user-icon.svg"}
          alt={myProfileData?.nickname || ""}
          width={30}
          height={30}
        />
        <span className="font-medium">{myProfileData?.nickname}</span>
      </div>

      <ChatRoomFollowBtn
        otherUserId={otherUserId}
        myFollowings={myProfileData?.followings}
      />
    </>
  );
}
