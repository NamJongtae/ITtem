"use client";

import UserInfo from "./user-info/user-info";
import Detail from "./detail/profile-detail";
import useProfileMenu from "@/hooks/profile/useProfileMenu";
import useMyProfileSuspenseQuery from "@/hooks/react-query/queries/profile/useMyProfileSuspenseQuery";
import Empty from "../commons/empty";

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
