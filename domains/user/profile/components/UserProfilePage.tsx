"use client";

import UserInfo from "./user-info/UserInfo";
import Detail from "./detail/ProfileDetail";
import useProfileMenu from "../hooks/useProfileMenu";
import useUserProfilePageQueries from "../hooks/queries/useUserProfilePageQueries";

export default function UserProfilePage() {
  const { profileData } = useUserProfilePageQueries();
  const { profileMenu, onClickMenu } = useProfileMenu();

  return (
    <>
      <UserInfo handleClickMenu={onClickMenu} profileData={profileData} />
      <Detail
        profileMenu={profileMenu}
        handleClickMenu={onClickMenu}
        profileData={profileData}
        isMyProfile={false}
      />
    </>
  );
}
