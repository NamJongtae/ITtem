import { toast } from "react-toastify";
import useProductDetailFollowMutate from "../reactQuery/mutations/product/useProductDetailFollowMutate";
import useProductDetailUnfollowMutate from "../reactQuery/mutations/product/useProductDetailUnfollowMutate";
import { ProfileData } from "@/types/authTypes";
import useMyProfileQuery from '../reactQuery/querys/profile/useMyProfileQuery';

export default function useProductDetailFollowBtn({
  uid,
  authFollowers,
}: {
  uid: string;
  authFollowers: string[];
}) {
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
