import useProductDetailWishBtn from "@/hooks/product-detail/useProductDetailWishBtn";
import { ProfileData } from "@/types/auth-types";
import { ProductDetailData } from "@/types/product-types";
import Image from "next/image";

interface IProps {
  productDetailData: ProductDetailData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProductDetailWishBtn({
  productDetailData,
  myProfileData,
}: IProps) {
  const { handleClickWish, isWish } = useProductDetailWishBtn({
    productDetailData,
    myProfileData,
  });

  return (
    <button
      type="button"
      onClick={handleClickWish}
      className="flex gap-2 items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:betterhover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
    >
      <Image
        src={isWish ? "/icons/heart-icon.svg" : "/icons/heart-unfill-icon.svg"}
        width={12}
        height={12}
        alt={isWish ? "찜해제" : "찜하기"}
      />{" "}
      {isWish ? "찜해제" : "찜하기"}
    </button>
  );
}
