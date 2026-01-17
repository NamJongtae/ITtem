import useMyProfileFollowInListMutate from "./mutations/useMyProfileFollowInListMutate";
import useMyProfileUnfollowInListMutate from "./mutations/useMyProfileUnfollowInListMutate";
import { FollowUserData, ProfileData } from "../types/profileTypes";
import { toast } from "react-toastify";
import useUserProfileFollowInListMutate from "./mutations/useUserProfileFollowInListMutate";
import useUserProfileUnFollowInListMutate from "./mutations/useUserProfileUnFollowInListMutate";
import { useParams } from "next/navigation";

export default function useFollowUserInList({
  followProfileData,
  myProfileData,
  listType
}: {
  followProfileData: FollowUserData | undefined;
  myProfileData: ProfileData | undefined;
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


  const isFollow = followProfileData?.isFollow;

  const { uid } = useParams();

  const isMyProfilePage = !!uid === false;

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
