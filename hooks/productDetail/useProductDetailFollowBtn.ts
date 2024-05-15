import { toast } from "react-toastify";
import useProductDetailFollowMutate from "../querys/useProductDetailFollowMutate";
import useProductDetailUnfollowMutate from "../querys/useProductDetailUnfollowMutate";
import { ProfileData } from "@/types/authTypes";

export default function useProductDetailFollowBtn({
  uid,
  authFollowers,
  myProfileData,
}: {
  uid: string;
  authFollowers: string[];
  myProfileData: ProfileData | undefined;
}) {
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

  return { isFollow, handleClickfollow };
}
