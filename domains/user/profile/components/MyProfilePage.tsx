"use client";

import UserInfo from "./user-info/UserInfo";
import Detail from "./detail/ProfileDetail";
import useProfileMenu from "../hooks/useProfileMenu";
import ProfileUserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
import Empty from "../../../../shared/common/components/Empty";
import useMyProfileQuery from "../hooks/queries/useMyProfileQuery";
import ProfileDetailSkeletonUI from "./detail/ProfileDetailSkeletonUI";

export default function MyProfilePage() {
  const { myProfileData, myProfilePending, myProfileError } =
    useMyProfileQuery();
  const { profileMenu, onClickMenu } = useProfileMenu();

  if (myProfilePending) {
    return (
      <>
        <ProfileUserInfoSkeletonUI isMyProfile={true} />
        <ProfileDetailSkeletonUI isMyProfile={true} />
      </>
    );
  }

  if (!myProfileData || myProfileError) {
    return <Empty message="나의 프로필 정보를 불러올 수 없습니다." />;
  }

  return (
    <>
      <UserInfo handleClickMenu={onClickMenu} profileData={myProfileData} />
      <Detail
        profileMenu={profileMenu}
        handleClickMenu={onClickMenu}
        profileData={myProfileData}
        isMyProfile={true}
      />
    </>
  );
}
