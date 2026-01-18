import { ProfileData } from "../../../types/profileTypes";
import FollowBtn from "../FollowBtn";
import ChangePasswordBtn from "./ChangePasswordBtn";
import EditProfileBtn from "./EditProfileBtn";

interface IProps {
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

export default function UserInfoCardBtns({ profileData, isMyProfile }: IProps) {
  return isMyProfile ? (
    <>
      <EditProfileBtn />
      <ChangePasswordBtn />
    </>
  ) : (
    <FollowBtn profileData={profileData} />
  );
}
