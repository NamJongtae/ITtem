"use client";

import UserInfo from "./user-info/user-info";
import Detail from "./detail/profile-detail";
import Empty from "../commons/empty";
import { isAxiosError } from "axios";
import ProfileUserInfoSkeletonUI from "./user-info/profile-user-info-skeletonUI";
import ProfileDetailSkeletonUI from "./detail/profile-detail-skeletonUI";
import useProfileMenu from "@/hooks/profile/useProfileMenu";
import useProfilePageData from "@/hooks/profile/useProfilePageData";

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";

interface IProps {
  my?: boolean;
}

export default function ProfilePage({ my }: IProps) {
  const { profileData, myProfileData, isLoading, isError } =
    useProfilePageData();
  const { profileMenu, onClickMenu } = useProfileMenu();

  if (isLoading) {
    return (
      <>
        <ProfileUserInfoSkeletonUI my={my} />
        <ProfileDetailSkeletonUI my={my} />
      </>
    );
  }

  if (isError) {
    return (
      <Empty
        message={
          (isAxiosError<{ message: string }>(isError) &&
            isError.response?.data.message) ||
          ""
        }
      />
    );
  }
  return (
    <>
      <UserInfo
        handleClickMenu={onClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
      />
      <Detail
        profileMenu={profileMenu}
        handleClickMenu={onClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
        my={my}
      />
    </>
  );
}
