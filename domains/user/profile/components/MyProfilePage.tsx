"use client";

import UserInfo from "./user-info/UserInfo";
import Detail from "./detail/ProfileDetail";
import useProfileMenu from "../hooks/useProfileMenu";
import useMyProfileSuspenseQuery from "../hooks/queries/useMyProfileSuspenseQuery";
import Empty from "../../../../shared/common/components/Empty";

export default function MyProfilePage() {
  const { myProfileData } = useMyProfileSuspenseQuery();
  const { profileMenu, onClickMenu } = useProfileMenu();

  if (!myProfileData) {
    <Empty message="나의 프로필 정보를 불러올 수 없습니다." />;
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
