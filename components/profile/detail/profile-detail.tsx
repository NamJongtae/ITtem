import ProfileDetailMenu from "./profile-detail-menu";
import ProfileDetailContent from "./profile-detail-content";
import { ProfileMenu } from "../profile-page";
import { ProfileData } from "@/types/auth-types";

interface IProps {
  profileMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function ProfileDetail({
  profileMenu,
  handleClickMenu,
  userProfileData,
  myProfileData,
  isMyProfile
}: IProps) {
  return (
    <section className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8">
      <ProfileDetailMenu
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        isMyProfile={isMyProfile}
      />
      <ProfileDetailContent
        profileMenu={profileMenu}
        userProfileData={userProfileData}
        myProfileData={myProfileData}
        isMyProfile={isMyProfile}
      />
    </section>
  );
}
