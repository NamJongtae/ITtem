import { ProfileData } from "@/types/authTypes";
import ProductDetailBuyBtn from "./product-detail-buyBtn";
import ProductDetailChattingBtn from "./product-detail-chattingBtn";
import ProductDetailWishBtn from "./product-detail-wishBtn";
import { ProductDetailData } from "@/types/productTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductDetailDeleteBtn from "./product-detail-deleteBtn";
import ProductDetailEditBtn from "./product-detail-EditBtn";

interface IProps {
  productDetailData: ProductDetailData | undefined;
  isWish: boolean | undefined;
}

export default function ProductDetailContentBtns({
  productDetailData,
  isWish,
}: IProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex items-center mt-6 gap-3 flex-wrap">
      {productDetailData?.uid === user?.uid ? (
        <>
          <ProductDetailEditBtn />
          <ProductDetailDeleteBtn />
        </>
      ) : (
        <>
          <ProductDetailWishBtn isWish={isWish} />
          <ProductDetailChattingBtn />
          <ProductDetailBuyBtn />
        </>
      )}
    </div>
  );
}
