import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import useAddWishMutate from "./mutations/useAddWishMutate";
import useDeleteWishMutate from "./mutations/useDeleteWishMutate";
import { toast } from "react-toastify";
import { ProductDetailData } from "../types/productDetailTypes";

interface IParams {
  isWish: boolean | undefined;
  myProfileData: ProfileData | undefined;
}

export default function useProductWishHandler({
  isWish,
  myProfileData
}: IParams) {
  const { addWishMutate, addWishPending } = useAddWishMutate();
  const { deleteWishMutate, deleteWishPending } = useDeleteWishMutate();

  const handleClickWish = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isWish) {
      deleteWishMutate();
    } else {
      addWishMutate();
    }
  };

  return { handleClickWish, addWishPending, deleteWishPending };
}
