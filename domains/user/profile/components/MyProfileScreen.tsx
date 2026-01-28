"use client";

import UserInfo from "./user-info/UserInfo";
import ProfileTabsView from "./tabs/ProfileTabsView";
import ProfileUserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
import Empty from "../../../../shared/common/components/Empty";
import useMyProfileQuery from "../hooks/queries/useMyProfileQuery";
import ProfileTabsCSRSkeletonUI from "./tabs/ProfileTabsCSRSkeletonUI";

export default function MyProfileScreen() {
  const { myProfileData, myProfilePending, myProfileError } =
    useMyProfileQuery();

  if (myProfilePending) {
    return (
      <>
        <ProfileUserInfoSkeletonUI isMyProfile={true} />
        <ProfileTabsCSRSkeletonUI isMyProfile={true} />
      </>
    );
  }

  if (!myProfileData || myProfileError) {
    return <Empty message="나의 프로필 정보를 불러올 수 없습니다." />;
  }

  return (
    <>
      <UserInfo profileData={myProfileData} isMyProfile={true} />
      <ProfileTabsView profileData={myProfileData} isMyProfile={true} />
    </>
  );
}
