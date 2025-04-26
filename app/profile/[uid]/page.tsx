import ProfileDetailSkeletonUI from "@/components/profile/detail/profile-detail-skeletonUI";
import ProfileUserInfoSkeletonUI from "@/components/profile/user-info/profile-user-info-skeletonUI";
import UserProfileContainer from "@/components/profile/user-profile-container";
import { BASE_URL } from "@/constants/constant";
import React, { Suspense } from "react";

interface IProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata() {
  const title = `ITtem | 프로필`;
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

export default async function UserProfile({ params }: IProps) {
  const { uid } = await params;

  return (
    <>
      <Suspense
        fallback={
          <>
            <ProfileUserInfoSkeletonUI />
            <ProfileDetailSkeletonUI />
          </>
        }
      >
        <UserProfileContainer uid={uid} />
      </Suspense>
    </>
  );
}
