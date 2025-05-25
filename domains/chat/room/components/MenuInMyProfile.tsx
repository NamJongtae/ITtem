import Image from "next/image";
import FollowBtn from "./FollowBtn";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

interface IProps {
  myProfileData: ProfileData | undefined;
  otherUserId: string;
}

export default function MenuInMyProfile({
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

      <FollowBtn
        otherUserId={otherUserId}
        myFollowings={myProfileData?.followings}
      />
    </>
  );
}
