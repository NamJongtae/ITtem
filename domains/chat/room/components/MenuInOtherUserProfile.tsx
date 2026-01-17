import Image from "next/image";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import FollowBtn from "./FollowBtn";

interface IProps {
  otherUserProfileData: ProfileData | undefined;
}

export default function MenuInOtherUserProfile({
  otherUserProfileData
}: IProps) {
  return (
    <>
      <div className="flex gap-3 items-center">
        <Image
          className="rounded-xl w-[30px] h-[30px]"
          src={otherUserProfileData?.profileImg || "/icons/user-icon.svg"}
          alt={otherUserProfileData?.nickname || ""}
          width={30}
          height={30}
        />
        <span className="font-medium">{otherUserProfileData?.nickname}</span>
        <FollowBtn otherUserId={otherUserProfileData?.uid} />
      </div>
    </>
  );
}
