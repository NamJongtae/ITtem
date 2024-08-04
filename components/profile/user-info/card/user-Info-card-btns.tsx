import { ProfileData } from "@/types/authTypes";
import FollowBtn from "../user-info-follow-btn";
import UserInfoCardChangePasswordBtn from "./user-info-card-change-password-btn";
import UserInfoCardEditProfileBtn from "./user-info-card-edit-profile-btn";

interface IProps {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
}

export default function UserInfoCardBtns({
  myProfileData,
  userProfileData,
}: IProps) {
  return myProfileData?.uid === userProfileData?.uid ? (
    <>
      <UserInfoCardEditProfileBtn />
      <UserInfoCardChangePasswordBtn />
    </>
  ) : (
    <FollowBtn
      userProfileData={userProfileData}
      myProfileData={myProfileData}
    />
  );
}
