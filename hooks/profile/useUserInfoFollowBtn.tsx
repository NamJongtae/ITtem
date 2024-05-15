import useUserProfileFollowMutate from "@/hooks/querys/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "@/hooks/querys/useUserProfileUnfollowMutate";
import { ProfileData } from "@/types/authTypes";
import { toast } from "react-toastify";

export default function useUserInfoFollowBtn({
  myProfileData,
  userProfileData,
}: {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
}) {
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
