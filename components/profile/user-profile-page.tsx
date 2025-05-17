"use client";

import UserInfo from "./user-info/user-info";
import Detail from "./detail/profile-detail";
import useProfileMenu from "@/hooks/profile/useProfileMenu";
import useUserProfilePageQueries from "@/hooks/profile/useUserProfilePageQueries";

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
