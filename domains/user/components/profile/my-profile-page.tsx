"use client";

import UserInfo from "./user-info/user-info";
import Detail from "./detail/profile-detail";
import useProfileMenu from "@/domains/user/hooks/profile/useProfileMenu";
import useMyProfileSuspenseQuery from "@/domains/user/hooks/profile/queries/useMyProfileSuspenseQuery";
import Empty from "../../../../components/empty";

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
