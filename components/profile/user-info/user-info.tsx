import { ProfileMenu } from "../profile-page";
import Introduce from "./user-info-introduce";
import Card from "./card/user-info-card";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function UserInfo({
  handleClickMenu,
  userProfileData,
  myProfileData,
}: IProps) {
  return (
    <div className="mt-5 max-w-[1024px] px-4 md:px-8 mx-auto">
      <h2 className="sr-only">유저 프로필</h2>
      <div className="flex flex-col gap-5 md:flex-row border py-5">
        <Card
          handleClickMenu={handleClickMenu}
          userProfileData={userProfileData}
          myProfileData={myProfileData}
        />
        <Introduce introuduce={userProfileData?.introduce} />
      </div>
    </div>
  );
}
