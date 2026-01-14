import ContentMenu from "./ContentMenu";
import Content from "./Content";
import { ProfileData, ProfileMenu } from "../../types/profileTypes";

interface IProps {
  currentMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

export default function ProfileDetail({
  currentMenu,
  handleClickMenu,
  profileData,
  isMyProfile
}: IProps) {
  return (
    <section className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8">
      <ContentMenu
        currentMenu={currentMenu}
        handleClickMenu={handleClickMenu}
        isMyProfile={isMyProfile}
      />
      <Content
        currentMenu={currentMenu}
        profileData={profileData}
        isMyProfile={isMyProfile}
      />
    </section>
  );
}
