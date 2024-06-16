import { ProfileData } from "@/types/authTypes";
import useAddWishMutate from "../reactQuery/mutations/profile/useAddWishMutate";
import useDeleteWishMutate from "../reactQuery/mutations/profile/useDeleteWishMutate";
import { toast } from "react-toastify";
import { ProductDetailData } from "@/types/productTypes";

interface IPrarms {
  productDetailData: ProductDetailData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function useProductDetailWishBtn({
  productDetailData,
  myProfileData,
}: IPrarms) {
  const { addWishMutate } = useAddWishMutate();
  const { deleteWishMutate } = useDeleteWishMutate();
  const isWish =
    !!myProfileData?.wishProductIds.includes(productDetailData?._id || "") &&
    !!productDetailData?.wishUserIds.includes(myProfileData?.uid || "");

  const handleClickWish = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isWish) {
      deleteWishMutate(undefined);
    } else {
      addWishMutate(undefined);
    }
  };

  return { handleClickWish, isWish };
}
