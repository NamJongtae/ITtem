import UserInfo from "./user-info/UserInfo";
import { ProfileData } from "../types/profileTypes";
import UserProfileTabView from "./tabs/UserProfileTabView";
import Empty from "@/shared/common/components/Empty";

export default function UserProfileScreen({
  initProfileData
}: {
  initProfileData: ProfileData | undefined;
}) {
  if (!initProfileData) {
    return <Empty message="유저 정보를 불러올 수 없어요." />;
  }

  return (
    <>
      <UserInfo profileData={initProfileData} isMyProfile={false} />
      <UserProfileTabView />
    </>
  );
}
