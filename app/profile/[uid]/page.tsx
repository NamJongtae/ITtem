import ProfileDetailSkeletonUI from "@/domains/user/profile/components/detail/ProfileDetailSkeletonUI";
import ProfileUserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
import UserProfileContainer from "@/domains/user/profile/components/UserProfileContainer";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";

interface IProps {
  params: Promise<{ uid: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
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
