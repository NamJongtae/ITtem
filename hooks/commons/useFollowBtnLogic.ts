import useFollowHandler from "./useFollowHandler";
import useUnFollowHandler from "./useUnfollowHandler";
import { ProfileData } from "@/types/auth-types";
import useCheckFollowing from "./useCheckFollowing";

interface IParams {
  uid: string;
  authFollowers: string[];
  myProfileData: ProfileData | undefined;
}

export default function useFollowBtnLogic({
  uid,
  authFollowers,
  myProfileData
}: IParams) {
  const { handleClickfollow } = useFollowHandler({
    uid,
    myProfileData
  });

  const { handleClickUnfollow } = useUnFollowHandler({
    uid,
    myProfileData
  });

  const { isFollowing } = useCheckFollowing({
    uid,
    authFollowers,
    myProfileData
  });

  const handleClickFollow = isFollowing
    ? handleClickUnfollow
    : handleClickfollow;

  const isMyProfile = uid === myProfileData?.uid;

  return { isMyProfile, isFollowing, handleClickFollow };
}
