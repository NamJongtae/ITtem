import { ProfileData } from "@/domains/user/types/profile-types";
import FollowBtn from "../user-info-follow-btn";
import UserInfoCardChangePasswordBtn from "./user-info-card-change-password-btn";
import UserInfoCardEditProfileBtn from "./user-info-card-edit-profile-btn";
import { useGetQuerys } from "@/hooks/useGetQuerys";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function UserInfoCardBtns({ profileData }: IProps) {
  const { uid } = useGetQuerys("uid");

  const isUserProfile = !!uid;

  return isUserProfile ? (
    <FollowBtn profileData={profileData} />
  ) : (
    <>
      <UserInfoCardEditProfileBtn />
      <UserInfoCardChangePasswordBtn />
    </>
  );
}
