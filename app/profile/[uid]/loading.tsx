import ProfileTabsSSRSkeletonUI from "@/domains/user/profile/components/tabs/ProfileTabsSSRSkeletonUI";
import UserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";

export default function UserProfileLoading() {
  return (
    <>
      <UserInfoSkeletonUI isMyProfile={false} />
      <ProfileTabsSSRSkeletonUI isMyProfile={false} />
    </>
  );
}
