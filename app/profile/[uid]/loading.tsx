import ProfileTabsCSRSkeletonUI from "@/domains/user/profile/components/tabs/ProfileTabsCSRSkeletonUI";
import UserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";

export default function UserProfileLoading() {
  return (
    <>
      <UserInfoSkeletonUI isMyProfile={false} />
      <ProfileTabsCSRSkeletonUI isMyProfile={false} />
    </>
  );
}
