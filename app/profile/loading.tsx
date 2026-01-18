import ProfileTabsCSRSkeletonUI from "@/domains/user/profile/components/tabs/ProfileTabsCSRSkeletonUI";
import UserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";

export default function MyProfileLoading() {
  return (
    <>
      <UserInfoSkeletonUI isMyProfile={true} />
      <ProfileTabsCSRSkeletonUI isMyProfile={true} />
    </>
  );
}
