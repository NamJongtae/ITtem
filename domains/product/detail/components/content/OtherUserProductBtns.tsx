import { ProductDetailData } from "../../types/productDetailTypes";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import WishBtn from "./WishBtn";
import ChattingBtn from "./ChattingBtn";
import PurchaseBtn from "./PurchaseBtn";

interface IProps {
  productDetailData: ProductDetailData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function OtherUserProductBtns({
  productDetailData,
  myProfileData
}: IProps) {
  return (
    <>
      <WishBtn
        productDetailData={productDetailData}
        myProfileData={myProfileData}
      />
      <ChattingBtn
        productStatus={productDetailData?.status}
        productUserId={productDetailData?.uid}
        productId={productDetailData?._id}
      />
      <PurchaseBtn productStatus={productDetailData?.status} />
    </>
  );
}
