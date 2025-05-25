import ContentMenu from "./ContentMenu";
import Content from "./Content";
import { ProfileData, ProfileMenu } from "../../types/profileTypes";

interface IProps {
  profileMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

export default function ProfileDetail({
  profileMenu,
  handleClickMenu,
  profileData,
  isMyProfile
}: IProps) {
  return (
    <section className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8">
      <ContentMenu
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        isMyProfile={isMyProfile}
      />
      <Content
        profileMenu={profileMenu}
        profileData={profileData}
        isMyProfile={isMyProfile}
      />
    </section>
  );
}
