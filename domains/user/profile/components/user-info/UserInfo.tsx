import Introduce from "./Introduce";
import UserInfoCard from "./card/UserInfoCard";
import { ProfileData } from "../../types/profileTypes";

interface IProps {
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

export default function UserInfo({ profileData, isMyProfile }: IProps) {
  return (
    <div className="mt-5 max-w-[1024px] px-4 md:px-8 mx-auto">
      <h2 className="sr-only">유저 프로필</h2>
      <div className="flex flex-col gap-5 md:flex-row border py-5">
        <UserInfoCard profileData={profileData} isMyProfile={isMyProfile} />
        <Introduce introuduce={profileData?.introduce} />
      </div>
    </div>
  );
}
