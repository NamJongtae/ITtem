import { ProfileData } from "@/types/authTypes";
import ProfileUserInfoFollowBtn from "./profile-userInfo-follow-btn";
import ProfileUserInfoCardChangePwBtn from "./profile-userInfo-card-changePw-btn";
import ProfileUserInfoCardEditProfileBtn from "./profile-userInfo-card-edit-profile-btn";

interface IProps {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
}

export default function ProfileUserInfoCardBtns({
  myProfileData,
  userProfileData,
}: IProps) {
  return myProfileData?.uid === userProfileData?.uid ? (
    <>
      <ProfileUserInfoCardEditProfileBtn />
      <ProfileUserInfoCardChangePwBtn />
    </>
  ) : (
    <ProfileUserInfoFollowBtn
      userProfileData={userProfileData}
      myProfileData={myProfileData}
    />
  );
}
