import { ProductData, ProductDetailData } from "@/types/productTypes";
import dynamic from "next/dynamic";
import ProductDetailContentInfo from "./product-detail-content-info";
import ProductDetailContentImg from "./product-detail-content-img";
const ProductDetailContentBtns = dynamic(
  () => import("./product-detail-content-btns"),
  {
    ssr: false,
  }
);

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function PrductDateilContent({ productDetailData }: IProps) {
  return (
    <div className="md:flex block">
      <ProductDetailContentImg productDetailData={productDetailData} />
      <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <ProductDetailContentInfo productDetailData={productDetailData} />
        <ProductDetailContentBtns productDetailData={productDetailData} isWish={productDetailData?.isWish} />
      </div>
    </div>
  );
}
