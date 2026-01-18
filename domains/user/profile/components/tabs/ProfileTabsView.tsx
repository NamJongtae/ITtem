import ContentMenu from "./ContentMenu";
import Content from "./Content";
import { ProfileData, ProfileMenu } from "../../types/profileTypes";
import { PROFILE_TABS } from "./ProfileTabs";

interface IProps {
  currentMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

export default function ProfileTabsView({
  currentMenu,
  handleClickMenu,
  profileData,
  isMyProfile
}: IProps) {
  const ctx = { profileData, isMyProfile };

  const visibleTabs = PROFILE_TABS.filter((t) =>
    t.visible ? t.visible(ctx) : true
  );

  const isValid = visibleTabs.some((t) => t.key === currentMenu);
  const activeKey = isValid ? currentMenu : (visibleTabs[0]?.key ?? "products");

  return (
    <section className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8">
      <ContentMenu
        tabs={visibleTabs}
        activeKey={activeKey}
        onChange={handleClickMenu}
      />
      <Content
        tabs={visibleTabs}
        activeKey={activeKey}
        profileData={profileData}
        isMyProfile={isMyProfile}
      />
    </section>
  );
}
