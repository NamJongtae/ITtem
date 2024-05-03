import { ProductData } from "@/types/productTypes";
import ProductDetailContentBtns from "./product-detail-content-btns";
import ProductDetailContentInfo from "./product-detail-content-info";
import ProductDetailContentImg from "./product-detail-content-img";

interface IProps {
  productData: ProductData | undefined;
}

export default function PrductDateilContent({ productData }: IProps) {
  
  return (
    <div className="md:flex block">
      <ProductDetailContentImg
        productData={productData}
      />
      <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <ProductDetailContentInfo productData={productData} />
        <ProductDetailContentBtns />
      </div>
    </div>
  );
}
