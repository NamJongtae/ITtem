import ProfileDetailMenu from "./profile-detail-menu";
import ProfileDetailContent from "./profile-detail-content";
import { ProfileMenu } from "./profile-page";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  profileMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
}

export default function ProfileDetail({
  profileMenu,
  handleClickMenu,
  profileData,
}: IProps) {
  return (
    <section className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8">
      <ProfileDetailMenu
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        uid={profileData?.uid}
      />
      <ProfileDetailContent
        profileMenu={profileMenu}
        profileData={profileData}
      />
    </section>
  );
}
