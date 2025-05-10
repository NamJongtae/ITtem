import useFollowHandler from "./useProductDetailFollowHandler";
import useUnFollowHandler from "./useProductDetailUnfollowHandler";
import { ProfileData } from "@/types/auth-types";
import useCheckFollowing from "./useCheckFollowing";

interface IParams {
  uid: string;
  authFollowers: string[];
  myProfileData: ProfileData | undefined;
}

export default function useProductDetailFollowBtnLogic({
  uid,
  authFollowers,
  myProfileData
}: IParams) {
  const { onClickFollow } = useFollowHandler({
    uid,
    myProfileData
  });

  const { onClickUnfollow } = useUnFollowHandler({
    uid,
    myProfileData
  });

  const { isFollowing } = useCheckFollowing({
    uid,
    authFollowers,
    myProfileData
  });

  const followHandler = isFollowing ? onClickUnfollow : onClickFollow;

  const isMyProfile = uid === myProfileData?.uid;

  return { isMyProfile, isFollowing, followHandler };
}
