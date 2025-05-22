import { ProductDetailData } from "../../../types/product-types";
import ProductDetailBuyBtn from "../product-detail-buy-btn";
import ProductDetailChattingBtn from "../product-detail-chatting-btn";
import ProductDetailWishBtn from "../product-detail-wish-btn";
import { ProfileData } from "@/domains/user/types/profile-types";

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
      <ProductDetailWishBtn
        productDetailData={productDetailData}
        myProfileData={myProfileData}
      />
      <ProductDetailChattingBtn
        productStatus={productDetailData?.status}
        productUserId={productDetailData?.uid}
        productId={productDetailData?._id}
      />
      <ProductDetailBuyBtn productStatus={productDetailData?.status} />
    </>
  );
}
