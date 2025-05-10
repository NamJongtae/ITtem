import { toast } from "react-toastify";
import useProductDetailFollowMutate from "../react-query/mutations/product/useProductDetailFollowMutate";
import { ProfileData } from "@/types/auth-types";

interface IParams {
  uid: string;
  myProfileData: ProfileData | undefined;
}

export default function useProductDetailFollowHandler({ uid, myProfileData }: IParams) {
  const { productDetailfollowMutate } = useProductDetailFollowMutate(uid);

  const onClickFollow = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }

    productDetailfollowMutate();
  };

  return { myProfileData, onClickFollow };
}
