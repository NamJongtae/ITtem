import MyProfileContainer from "@/domains/user/profile/components/MyProfileContainer";
import ProfileDetailSkeletonUI from "@/domains/user/profile/components/detail/ProfileDetailSkeletonUI";
import ProfileUserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
import { BASE_URL } from "@/shared/common/constants/constant";
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
