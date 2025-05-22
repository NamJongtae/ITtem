import ProfileDetailSkeletonUI from "@/domains/user/components/profile/detail/profile-detail-skeletonUI";
import ProfileUserInfoSkeletonUI from "@/domains/user/components/profile/user-info/profile-user-info-skeletonUI";
import { Suspense } from "react";

interface IProps {
  children: React.ReactNode;
  edit: React.ReactNode;
  changePassword: React.ReactNode;
}

export default function Layout({ children, edit, changePassword }: IProps) {
  return (
    <>
      <Suspense fallback={<></>}>{edit}</Suspense>
      <Suspense fallback={<></>}>{changePassword}</Suspense>
      <Suspense
        fallback={
          <>
            <ProfileUserInfoSkeletonUI isMyProfile={true} />
            <ProfileDetailSkeletonUI isMyProfile={true} />
          </>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
