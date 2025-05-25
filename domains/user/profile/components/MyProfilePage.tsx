"use client";

import UserInfo from "./user-info/UserInfo";
import Detail from "./detail/ProfileDetail";
import useProfileMenu from "../hooks/useProfileMenu";
import useMyProfileSuspenseQuery from "../hooks/queries/useMyProfileSuspenseQuery";
import Empty from "../../../../shared/common/components/empty";

export default function MyProfilePage() {
  const { myProfileData } = useMyProfileSuspenseQuery();
  const { profileMenu, onClickMenu } = useProfileMenu();

  if (!myProfileData) {
    <Empty message="존재하지 않는 유저에요." />;
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
