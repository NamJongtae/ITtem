import ProfileDetailSkeletonUI from "@/domains/user/profile/components/detail/ProfileDetailSkeletonUI";
import ProfileUserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
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
