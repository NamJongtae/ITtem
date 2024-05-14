import ProfileDetailMenu from "./profile-detail-menu";
import ProfileDetailContent from "./profile-detail-content";
import { ProfileMenu } from "./profile-page";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  profileMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
  my?: boolean;
}

export default function ProfileDetail({
  profileMenu,
  handleClickMenu,
  profileData,
  myProfileData,
  my,
}: IProps) {
  return (
    <section className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8">
      <ProfileDetailMenu
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        my={my}
      />
      <ProfileDetailContent
        profileMenu={profileMenu}
        profileData={profileData}
        myProfileData={myProfileData}
        my={my}
      />
    </section>
  );
}
