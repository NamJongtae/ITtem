// Content.tsx
import type { ProfileData, ProfileMenu } from "../../types/profileTypes";
import type { ProfileTab } from "./ProfileTabs";

interface Props {
  tabs: readonly ProfileTab[];
  activeKey: ProfileMenu;
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

export default function Content({
  tabs,
  activeKey,
  profileData,
  isMyProfile
}: Props) {
  const tab = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return <>{tab?.render({ profileData, isMyProfile })}</>;
}
