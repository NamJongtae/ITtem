import { toast } from "react-toastify";
import useProductDetailFollowMutate from "../react-query/mutations/product/useProductDetailFollowMutate";
import useProductDetailUnfollowMutate from "../react-query/mutations/product/useProductDetailUnfollowMutate";
import useMyProfileQuery from "../react-query/queries/profile/useMyProfileQuery";

interface IParams {
  uid: string;
  authFollowers: string[];
}

export default function useProductDetailFollowBtn({
  uid,
  authFollowers,
}: IParams) {
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();

  const { productDetailfollowMutate } = useProductDetailFollowMutate(uid);
  const { productDetailUnfollowMutate } = useProductDetailUnfollowMutate(uid);

  const isFollow =
    !!myProfileData?.followings?.includes(uid) &&
    !!authFollowers.includes(myProfileData?.uid);

  const handleClickfollow = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isFollow) {
      productDetailUnfollowMutate();
    } else {
      productDetailfollowMutate();
    }
  };

  return { loadMyProfileLoading, myProfileData, isFollow, handleClickfollow };
}
