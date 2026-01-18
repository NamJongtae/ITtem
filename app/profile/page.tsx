import MyProfileScreen from "@/domains/user/profile/components/MyProfileScreen";
import ProfileTabsSSRSkeletonUI from "@/domains/user/profile/components/tabs/ProfileTabsSSRSkeletonUI";
import UserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
import { Suspense } from "react";

export default function MyProfile() {
  return (
    <Suspense
      fallback={
        <>
          <UserInfoSkeletonUI />
          <ProfileTabsSSRSkeletonUI isMyProfile={true} />
        </>
      }
    >
      <MyProfileScreen />
    </Suspense>
  );
}
