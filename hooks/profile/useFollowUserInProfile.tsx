import { ProfileData } from "@/types/auth-types";
import useUserProfileFollowMutate from "../react-query/mutations/profile/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "../react-query/mutations/profile/useUserProfileUnfollowMutate";
import { toast } from "react-toastify";

interface IParams {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
}

export default function useFollowUserInProfile({
  myProfileData,
  userProfileData
}: IParams) {
  const { userFollowMutate } = useUserProfileFollowMutate(
    userProfileData?.uid || ""
  );

  const { userUnfollowMutate } = useUserProfileUnfollowMutate(
    userProfileData?.uid || ""
  );

  const isFollow =
    !!myProfileData?.followings?.includes(userProfileData?.uid || "") &&
    !!userProfileData?.followers?.includes(myProfileData?.uid);

  const isNotMyProfile = myProfileData?.uid !== userProfileData?.uid;

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

  return { isFollow, isNotMyProfile, followHandler };
}
