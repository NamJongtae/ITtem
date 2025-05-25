import useProductDetailFollowMutate from "./mutations/useProductDetailFollowMutate";
import useProductDetailUnfollowMutate from "./mutations/useProductDetailUnfollowMutate";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

interface IParams {
  uid: string;
  authFollowers: string[];
  myProfileData: ProfileData | undefined;
}

export default function useFollowUserInProduct({
  uid,
  authFollowers,
  myProfileData
}: IParams) {
  const { productDetailfollowMutate } = useProductDetailFollowMutate(uid);

  const { productDetailUnfollowMutate } = useProductDetailUnfollowMutate(uid);

  const isFollowing =
    !!myProfileData?.followings?.includes(uid) &&
    !!authFollowers.includes(myProfileData?.uid);

  const followHandler = () => {
    if (isFollowing) {
      productDetailUnfollowMutate();
    } else {
      productDetailfollowMutate();
    }
  };

  const isMyProfile = uid === myProfileData?.uid;

  return { isMyProfile, isFollowing, followHandler };
}
