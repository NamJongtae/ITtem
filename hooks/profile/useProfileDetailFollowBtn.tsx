import useMyProfileFollowMutate from "@/hooks/querys/useMyProfileFollowMutate";
import useMyProfileUnfollowMutate from "@/hooks/querys/useMyProfileUnfollowMutate";
import useUserProfileFollowMutate from "@/hooks/querys/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "@/hooks/querys/useUserProfileUnfollowMutate";
import { ProfileData } from "@/types/authTypes";
import { toast } from "react-toastify";
export default function useProfileDetailFollowBtn({
  myProfileData,
  userProfileData,
  followProfileData,
}: {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
  followProfileData: ProfileData | undefined;
}) {
  const { myProfilefollowMutate } = useMyProfileFollowMutate(
    followProfileData?.uid || ""
  );
  const { myProfileUnfollowMutate } = useMyProfileUnfollowMutate(
    followProfileData?.uid || ""
  );

  const { userFollowMutate } = useUserProfileFollowMutate(
    followProfileData?.uid || ""
  );
  const { userUnfollowMutate } = useUserProfileUnfollowMutate(
    followProfileData?.uid || ""
  );

  const isFollow =
    !!myProfileData?.followings?.includes(followProfileData?.uid || "") &&
    !!followProfileData?.followers?.includes(myProfileData?.uid);

  const handleClickfollow = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isFollow) {
      if (userProfileData?.uid === myProfileData?.uid) {
        myProfileUnfollowMutate();
      } else {
        userUnfollowMutate();
      }
    } else {
      if (userProfileData?.uid === myProfileData?.uid) {
        myProfilefollowMutate();
      } else {
        userFollowMutate();
      }
    }
  };

  return { isFollow, handleClickfollow };
}
