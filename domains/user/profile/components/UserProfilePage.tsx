"use client";

import UserInfo from "./user-info/UserInfo";
import Detail from "./detail/ProfileDetail";
import useProfileMenu from "../hooks/useProfileMenu";
import UserInfoSkeletonUI from "./user-info/UserInfoSkeletonUI";
import ProfileDetailSkeletonUI from "./detail/ProfileDetailSkeletonUI";
import useProfileQuery from "../hooks/queries/useProfileQuery";

export default function UserProfilePage() {
  const { profileData, showCSRSkeleton } = useProfileQuery();
  const { currentMenu, onClickMenu } = useProfileMenu();

  if (showCSRSkeleton)
    return (
      <>
        <UserInfoSkeletonUI />
        <ProfileDetailSkeletonUI />
      </>
    );

  return (
    <>
      <UserInfo handleClickMenu={onClickMenu} profileData={profileData} />
      <Detail
        currentMenu={currentMenu}
        handleClickMenu={onClickMenu}
        profileData={profileData}
        isMyProfile={false}
      />
    </>
  );
}
