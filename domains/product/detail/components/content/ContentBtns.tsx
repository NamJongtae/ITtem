import { ProductStatus } from "../../../shared/types/productTypes";
import { ProductDetailData } from "../../types/productDetailTypes";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";
import MyProductBtns from "./MyProductBtns";
import OtherUserProductBtns from "./OtherUserProductBtns";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ContentBtns({
  productDetailData
}: IProps) {
  const { myProfileData, myProfilePending } = useMyProfileQuery();
  const isSoldout = productDetailData?.status === ProductStatus.soldout;
  const isMyProduct = productDetailData?.uid === myProfileData?.uid;

  if (myProfilePending || isSoldout) return null;

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
