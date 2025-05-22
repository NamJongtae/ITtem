import MyProfileContainer from "@/domains/user/components/profile/my-profile-container";
import ProfileDetailSkeletonUI from "@/domains/user/components/profile/detail/profile-detail-skeletonUI";
import ProfileUserInfoSkeletonUI from "@/domains/user/components/profile/user-info/profile-user-info-skeletonUI";
import { BASE_URL } from "@/constants/constant";
import { Suspense } from "react";

export async function generateMetadata() {
  const title = `ITtem | 나의 프로필`;
  const url = `${BASE_URL}/profile`;
  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default function MyProfile() {
  return (
    <Suspense
      fallback={
        <>
          <ProfileUserInfoSkeletonUI isMyProfile={true} />
          <ProfileDetailSkeletonUI isMyProfile={true} />
        </>
      }
    >
      <MyProfileContainer />
    </Suspense>
  );
}
