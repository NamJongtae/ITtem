"use client";

import UserInfo from "./user-info/UserInfo";
import Detail from "./tabs/ProfileTabsView";
import useProfileMenu from "../hooks/useProfileMenu";
import UserInfoSkeletonUI from "./user-info/UserInfoSkeletonUI";
import ProfileTabsSSRSkeletonUI from "./tabs/ProfileTabsSSRSkeletonUI";
import useProfileQuery from "../hooks/queries/useProfileQuery";

export default function UserProfileScreen() {
  const { profileData, showCSRSkeleton } = useProfileQuery();
  const { currentMenu, onClickMenu } = useProfileMenu();

  if (showCSRSkeleton)
    return (
      <>
        <UserInfoSkeletonUI />
        <ProfileTabsSSRSkeletonUI isMyProfile={false} />
      </>
    );

  return (
    <>
      <UserInfo
        handleClickMenu={onClickMenu}
        profileData={profileData}
        isMyProfile={false}
      />
      <Detail
        currentMenu={currentMenu}
        handleClickMenu={onClickMenu}
        profileData={profileData}
        isMyProfile={false}
      />
    </>
  );
}
