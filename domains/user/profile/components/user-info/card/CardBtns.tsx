import { ProfileData } from "../../../types/profileTypes";
import FollowBtn from "../FollowBtn";
import ChangePasswordBtn from "./ChangePasswordBtn";
import EditProfileBtn from "./EditProfileBtn";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

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
      <EditProfileBtn />
      <ChangePasswordBtn />
    </>
  );
}
