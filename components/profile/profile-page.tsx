"use client";

import ProfileUserInfo from "./profileUserInfo/profile-userInfo";
import ProfileDetail from "./profile-detail";
import Loading from "@/app/loading";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import useProfilePage from "@/hooks/profile/useProfilePage";

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";

interface IProps {
  my?: boolean;
}

export default function ProfilePage({ my }: IProps) {
  const {
    profileMenu,
    profileData,
    myProfileData,
    isLoading,
    error,
    handleClickMenu,
  } = useProfilePage();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Empty
        message={
          (isAxiosError<{ message: string }>(error) &&
            error.response?.data.message) ||
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
