import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";
import MyProfileScreen from "@/domains/user/profile/components/MyProfileScreen";
import ProfileTabsSSRSkeletonUI from "@/domains/user/profile/components/tabs/ProfileTabsSSRSkeletonUI";
import UserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  ...BASE_METADATA,
  metadataBase: new URL(`${BASE_URL}/profile`),
  title: "ITtem | 프로필",
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${BASE_URL}/profile`,
    title: "ITtem | 프로필"
  }
};

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
