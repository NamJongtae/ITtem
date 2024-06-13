import ProductDetailBuyBtn from "./product-detail-buyBtn";
import ProductDetailChattingBtn from "./product-detail-chattingBtn";
import ProductDetailWishBtn from "./product-detail-wishBtn";
import { ProductDetailData } from "@/types/productTypes";
import ProductDetailDeleteBtn from "./product-detail-deleteBtn";
import ProductDetailEditBtn from "./product-detail-EditBtn";
import useMyProfileQuery from "@/hooks/reactQuery/querys/profile/useMyProfileQuery";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailContentBtns({
  productDetailData,
}: IProps) {
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();

  return (
    !loadMyProfileLoading && (
      <div className="flex items-center mt-6 gap-3 flex-wrap">
        {productDetailData?.uid === myProfileData?.uid ? (
          <>
            <ProductDetailEditBtn productStatus={productDetailData?.status} />
            <ProductDetailDeleteBtn productStatus={productDetailData?.status} />
          </>
        ) : (
          <>
            <ProductDetailWishBtn
              productDetailData={productDetailData}
              myProfileData={myProfileData}
            />
            <ProductDetailChattingBtn
              productStatus={productDetailData?.status}
              userId={productDetailData?.uid}
              productId={productDetailData?._id}
            />
            <ProductDetailBuyBtn productStatus={productDetailData?.status} />
          </>
        )}
      </div>
    )
  );
}
