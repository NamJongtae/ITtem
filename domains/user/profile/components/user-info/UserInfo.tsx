import Introduce from "./Introduce";
import UserInfoCard from "./card/UserInfoCard";
import { ProfileData, ProfileMenu } from "../../types/profileTypes";

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
}

export default function UserInfo({ handleClickMenu, profileData }: IProps) {
  return (
    <div className="mt-5 max-w-[1024px] px-4 md:px-8 mx-auto">
      <h2 className="sr-only">유저 프로필</h2>
      <div className="flex flex-col gap-5 md:flex-row border py-5">
        <UserInfoCard
          handleClickMenu={handleClickMenu}
          profileData={profileData}
        />
        <Introduce introuduce={profileData?.introduce} />
      </div>
    </div>
  );
}
