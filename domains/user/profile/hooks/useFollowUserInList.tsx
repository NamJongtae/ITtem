import useMyProfileFollowInListMutate from "./mutations/useMyProfileFollowInListMutate";
import useMyProfileUnfollowInListMutate from "./mutations/useMyProfileUnfollowInListMutate";
import { FollowUserData, ProfileData } from "../types/profileTypes";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useUserProfileFollowInListMutate from "./mutations/useUserProfileFollowInListMutate";
import useUserProfileUnFollowInListMutate from "./mutations/useUserProfileUnFollowInListMutate";
import { useParams } from "next/navigation";

export default function useFollowUserInList({
  followProfileData,
  listType
}: {
  followProfileData: FollowUserData | undefined;
  listType: "followers" | "followings";
}) {
  const { myProfilefollowMutate } = useMyProfileFollowInListMutate(
    followProfileData?.uid || ""
  );
  const { myProfileUnfollowMutate } = useMyProfileUnfollowInListMutate(
    followProfileData?.uid || ""
  );

  const { userFollowMutate } = useUserProfileFollowInListMutate({
    uid: followProfileData?.uid || "",
    listType
  });
  const { userUnfollowMutate } = useUserProfileUnFollowInListMutate({
    uid: followProfileData?.uid || "",
    listType
  });

  const queryClient = useQueryClient();
  const myProfileData = queryClient.getQueryData(
    queryKeys.profile.my.queryKey
  ) as ProfileData | undefined;

  const isFollow = followProfileData?.isFollow;

  const { uid } = useParams();

  const isMyProfilePage = !!!uid;

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
