"use client";

import UserInfo from "./user-info/user-info";
import Detail from "./detail/profile-detail";
import useProfileMenu from "@/hooks/profile/useProfileMenu";
import useMyProfileQuery from "@/hooks/react-query/queries/profile/useMyProfileQuery";

export default function MyProfilePage() {
  const { myProfileData } = useMyProfileQuery();
  const { profileMenu, onClickMenu } = useProfileMenu();

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
