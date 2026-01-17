import { ProfileData } from "../types/profileTypes";
import useUserProfileFollowMutate from "./mutations/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "./mutations/useUserProfileUnfollowMutate";
import { toast } from "react-toastify";

interface IParams {
  profileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
  isFollow: boolean | undefined;
}

export default function useFollowUserInProfile({
  profileData,
  myProfileData,
  isFollow
}: IParams) {
  const { userFollowMutate } = useUserProfileFollowMutate(
    profileData?.uid || ""
  );

  const { userUnfollowMutate } = useUserProfileUnfollowMutate(
    profileData?.uid || ""
  );

  const isNotMyProfile = myProfileData?.uid !== profileData?.uid;

  const followHandler = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isFollow) {
      userUnfollowMutate();
    } else {
      userFollowMutate();
    }
  };

  return { isNotMyProfile, followHandler };
}
