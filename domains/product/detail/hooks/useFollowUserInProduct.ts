import useProductDetailFollowMutate from "./mutations/useProductDetailFollowMutate";
import useProductDetailUnFollowMutate from "./mutations/useProductDetailUnFollowMutate";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

interface IParams {
  uid: string;
  isFollow: boolean | undefined;
  myProfileData: ProfileData | undefined;
}

export default function useFollowUserInProduct({
  uid,
  isFollow,
  myProfileData
}: IParams) {
  const { productDetailfollowMutate } = useProductDetailFollowMutate(uid);

  const { productDetailUnfollowMutate } = useProductDetailUnFollowMutate(uid);

  const followHandler = () => {
    if (isFollow) {
      productDetailUnfollowMutate();
    } else {
      productDetailfollowMutate();
    }
  };

  const isMyProfile = uid === myProfileData?.uid;

  return { isMyProfile, followHandler };
}
