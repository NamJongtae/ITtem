import ProfileUserInfo from "./profileUserInfo/profile-userInfo";
import ProfileDetail from "./profile-detail";
import { useState } from "react";
import useProfileQuery from "@/hooks/reactQuery/querys/profile/useProfileQuery";
import Loading from "../commons/loading";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import useMyProfileQuery from "@/hooks/reactQuery/querys/profile/useMyProfileQuery";

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";

interface IProps {
  my?: boolean;
}

export default function ProfilePage({ my }: IProps) {
  const [profileMenu, setProfileMenu] = useState<ProfileMenu>("판매상품");
  const { profileData, loadProfileDataLoading, loadProfileDataError } =
    useProfileQuery();

  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();

  const handleClickMenu = (menu: ProfileMenu) => {
    setProfileMenu(menu);
  };

  if (loadProfileDataLoading || loadMyProfileLoading) {
    return <Loading />;
  }

  if (loadProfileDataError) {
    return (
      <Empty
        message={
          (isAxiosError<{ message: string }>(loadProfileDataError) &&
            loadProfileDataError.response?.data.message) ||
          ""
        }
      />
    );
  }
  return (
    <>
      <ProfileUserInfo
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
      />
      <ProfileDetail
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
        my={my}
      />
    </>
  );
}
