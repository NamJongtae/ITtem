import useProductDetailFollowMutate from "../react-query/mutations/product/useProductDetailFollowMutate";
import useProductDetailUnfollowMutate from '../react-query/mutations/product/useProductDetailUnfollowMutate';
import { ProfileData } from "@/types/auth-types";

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
