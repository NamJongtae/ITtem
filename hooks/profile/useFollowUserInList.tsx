import useMyProfileFollowMutate from "@/hooks/react-query/mutations/profile/useMyProfileFollowMutate";
import useMyProfileUnfollowMutate from "@/hooks/react-query/mutations/profile/useMyProfileUnfollowMutate";
import useUserProfileFollowMutate from "@/hooks/react-query/mutations/profile/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "@/hooks/react-query/mutations/profile/useUserProfileUnfollowMutate";
import { ProfileData } from "@/types/auth-types";
import { toast } from "react-toastify";

export default function useFollowUserInList({
  myProfileData,
  userProfileData,
  followProfileData
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

  const isMyProfilePage = userProfileData?.uid === myProfileData?.uid;

  const isNotMyProfile = myProfileData?.uid !== followProfileData?.uid;

  const onClickFollow = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isFollow) {
      if (isMyProfilePage) {
        myProfileUnfollowMutate();
      } else {
        userUnfollowMutate();
      }
    } else {
      if (isMyProfilePage) {
        myProfilefollowMutate();
      } else {
        userFollowMutate();
      }
    }
  };

  return { isFollow, isNotMyProfile, onClickFollow };
}
