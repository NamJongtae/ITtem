import { toast } from "react-toastify";
import { ProfileData } from "@/types/auth-types";
import useProductDetailUnfollowMutate from "../react-query/mutations/product/useProductDetailUnfollowMutate";

interface IParams {
  uid: string;
  myProfileData: ProfileData | undefined;
}

export default function useUnFollowHandler({
  uid,
  myProfileData
}: IParams) {
  const { productDetailUnfollowMutate } = useProductDetailUnfollowMutate(uid);

  const handleClickUnfollow = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }

    productDetailUnfollowMutate();
  };

  return { myProfileData, handleClickUnfollow };
}
