import useUserProfileFollowMutate from "@/hooks/react-query/mutations/profile/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "@/hooks/react-query/mutations/profile/useUserProfileUnfollowMutate";
import { ProfileData } from "@/types/auth-types";
import { toast } from "react-toastify";

interface IParams {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
}

export default function useUserInfoFollowBtn({
  myProfileData,
  userProfileData,
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

  const handleClickfollow = () => {
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

  return { isFollow, handleClickfollow };
}
