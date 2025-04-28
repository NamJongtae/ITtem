import Loading from "@/components/commons/loading";
import ProfileDetailSkeletonUI from "@/components/profile/detail/profile-detail-skeletonUI";
import ProfileUserInfoSkeletonUI from "@/components/profile/user-info/profile-user-info-skeletonUI";
import { Suspense } from "react";

interface IProps {
  children: React.ReactNode;
  edit: React.ReactNode;
  passwordChange: React.ReactNode;
}

export default function Layout({ children, edit, passwordChange }: IProps) {
  return (
    <Suspense fallback={<Loading />}>
      {edit}
      {passwordChange}
      <Suspense
        fallback={
          <>
            <ProfileUserInfoSkeletonUI my={true} />
            <ProfileDetailSkeletonUI my={true} />
          </>
        }
      >
        {children}
      </Suspense>
    </Suspense>
  );
}
