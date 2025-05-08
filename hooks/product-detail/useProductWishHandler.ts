import { ProfileData } from "@/types/auth-types";
import useAddWishMutate from "../react-query/mutations/profile/useAddWishMutate";
import useDeleteWishMutate from "../react-query/mutations/profile/useDeleteWishMutate";
import { toast } from "react-toastify";
import { ProductDetailData } from "@/types/product-types";

interface IParams {
  productDetailData: ProductDetailData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function useProductWishHandler({
  productDetailData,
  myProfileData
}: IParams) {
  const { addWishMutate, addWishPending } = useAddWishMutate();
  const { deleteWishMutate, deleteWishPending } = useDeleteWishMutate();
  const isWish =
    !!myProfileData?.wishProductIds.includes(productDetailData?._id || "") &&
    !!productDetailData?.wishUserIds.includes(myProfileData?.uid || "");

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

  return { handleClickWish, isWish, addWishPending, deleteWishPending };
}
