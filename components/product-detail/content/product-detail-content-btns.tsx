import ProductDetailBuyBtn from "../product-detail-buy-btn";
import ProductDetailChattingBtn from "../product-detail-chatting-btn";
import ProductDetailWishBtn from "../product-detail-wish-btn";
import { ProductDetailData, ProductStatus } from "@/types/productTypes";
import ProductDetailDeleteBtn from "../product-detail-delete-btn";
import ProductDetailEditBtn from "../product-detail-edit-btn";
import useMyProfileQuery from "@/hooks/react-query/queries/profile/useMyProfileQuery";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailContentBtns({
  productDetailData,
}: IProps) {
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();

  return (
    !loadMyProfileLoading &&
    productDetailData?.status === ProductStatus.sold && (
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
