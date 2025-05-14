import { ProductDetailData, ProductStatus } from "@/types/product-types";
import useMyProfileQuery from "@/hooks/react-query/queries/profile/useMyProfileQuery";
import MyProductBtns from "./my-product-btns";
import OtherUserProductBtns from "./other-user-product-btns";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailContentBtns({
  productDetailData
}: IProps) {
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();
  const isSoldout = productDetailData?.status === ProductStatus.soldout;
  const isMyProduct = productDetailData?.uid === myProfileData?.uid;

  if (loadMyProfileLoading || isSoldout) return null;

  return (
    <div className="flex items-center mt-6 gap-3 flex-wrap">
      {isMyProduct ? (
        <MyProductBtns productStatus={productDetailData?.status} />
      ) : (
        <OtherUserProductBtns
          productDetailData={productDetailData}
          myProfileData={myProfileData}
        />
      )}
    </div>
  );
}
