import { ProfileData } from "../types/profileTypes";
import useUserProfileFollowMutate from "./mutations/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "./mutations/useUserProfileUnfollowMutate";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

interface IParams {
  profileData: ProfileData | undefined;
}

export default function useFollowUserInProfile({ profileData }: IParams) {
  const queryClient = useQueryClient();
  const myProfileData = queryClient.getQueryData(
    queryKeys.profile.my.queryKey
  ) as ProfileData | undefined;

  const { userFollowMutate } = useUserProfileFollowMutate(
    profileData?.uid || ""
  );

  const { userUnfollowMutate } = useUserProfileUnfollowMutate(
    profileData?.uid || ""
  );

  const isFollow =
    !!myProfileData?.followings?.includes(profileData?.uid || "") &&
    !!profileData?.followers?.includes(myProfileData?.uid);

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

  return { isFollow, isNotMyProfile, followHandler };
}
