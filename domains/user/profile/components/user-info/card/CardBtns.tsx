import { useEffect } from "react";
import { ProfileData } from "../../../types/profileTypes";
import FollowBtn from "../FollowBtn";
import ChangePasswordBtn from "./ChangePasswordBtn";
import EditProfileBtn from "./EditProfileBtn";
import { useParams } from "next/navigation";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function UserInfoCardBtns({ profileData }: IProps) {
  const { uid } = useParams();

  const isUserProfile = !!uid;


  return isUserProfile ? (
    <FollowBtn profileData={profileData} />
  ) : (
    <>
      <EditProfileBtn />
      <ChangePasswordBtn />
    </>
  );
}
