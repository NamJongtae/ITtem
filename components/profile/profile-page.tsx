"use client";

import UserInfo from "./user-info/user-info";
import Detail from "./detail/profile-detail";
import Empty from "../commons/empty";
import { isAxiosError } from "axios";
import useProfilePage from "@/hooks/profile/useProfilePage";
import ProfileUserInfoSkeletonUI from "./user-info/profile-user-info-skeletonUI";
import ProfileDetailSkeletonUI from "./detail/profile-detail-skeletonUI";

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
    handleClickMenu
  } = useProfilePage();

  if (isLoading) {
    return (
      <>
        <ProfileUserInfoSkeletonUI my={my} />
        <ProfileDetailSkeletonUI my={my} />
      </>
    );
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
      <UserInfo
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
      />
      <Detail
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
        my={my}
      />
    </>
  );
}
